#!/usr/bin/env python3
"""PDF-Text lokal speichern; im Chat genügt der knappe Seitenindex.

  sichtung.py extract <pdf-ordner> <neuer-ausgabeordner> [--alt <alter-sichtungsordner>] [--titel "<Überschrift>"]
  sichtung.py check   <ausgabeordner>
  sichtung.py render  <pdf-datei> <seite> <ausgabeordner> [--scale 2]
  sichtung.py search <sichtungsordner> <suchtext> [--limit 5] [--offset 0]
  sichtung.py read   <sichtungsordner> <pdf-name> <seite> [--arbeitsfassung]
  sichtung.py save   <sichtungsordner> <pdf-name> <seite> <arbeitsdatei> [--status offen]

Ausgabe (gleiches Layout wie der bisherige Projekt-Helfer):
  Seitenindex.md, manifest.json, md/<pdf>.md mit "## PDF-Seite N", bilder/<pdf>-S###.png
Benötigt: pypdfium2. Originale werden nur gelesen.
"""
from pathlib import Path
import argparse, collections, contextlib, hashlib, io, json, math, os, re, sys
from urllib.parse import quote, unquote

try:
    import pypdfium2 as pdfium
    from PIL import Image
except ImportError:
    sys.exit("PDF-Abhängigkeit fehlt: pypdfium2 und Pillow aus scripts/requirements.txt bereitstellen")

STATUS = dict(text_read=False, original_image_viewed=False, subject_review="offen")
SEITENZAHL = re.compile(r"^(Seite \d+( von \d+)?|\d+( / \d+)?|©.*)$")
ANTWORTEN = re.compile(r"(?im)^[ \t]*(?:Endantworten|Lösungen|Loesungen|Musterlösungen|Answers|Solutions)[ \t]*(?::|$)")
INHALT = re.compile(r"(?im)^[ \t]*(?:Inhaltsverzeichnis|Inhalt|Contents|Table of Contents)[ \t]*:?[ \t]*$")


def antwortmarker(raw):
    """Lösungsbeginn; ein Kapiteleintrag im Inhaltsverzeichnis ist keiner."""
    return None if INHALT.search(raw) else ANTWORTEN.search(raw)


def ausgabepfad(ordner, name):
    """Manifestpfade dürfen auch über Verknüpfungen nicht aus der Ausgabe führen."""
    root = Path(ordner).resolve()
    path = root / name
    if Path(name).is_absolute() or not path.resolve().is_relative_to(root) or path.resolve() == root:
        raise ValueError(f"Ungültiger Ausgabepfad: {name}")
    return path


def manifest_laden(ordner):
    daten = json.loads((Path(ordner) / "manifest.json").read_text(encoding="utf-8"))
    if not isinstance(daten, list) or not daten:
        raise ValueError("Manifest enthält keine PDF-Liste")
    namen = set()
    for doc in daten:
        name = doc["pdf"]
        if not isinstance(name, str) or "/" in name or "\\" in name or Path(name).suffix.lower() != ".pdf" or name in namen:
            raise ValueError("Ungültiger oder doppelter PDF-Name im Manifest")
        namen.add(name)
        if "duplicate_of" in doc:
            continue
        if type(doc["pages"]) is not int or doc["pages"] < 1:
            raise ValueError(f"Ungültige Seitenzahl: {name}")
        if (not isinstance(doc["page_index"], list) or any(type(p["page"]) is not int for p in doc["page_index"])
                or [p["page"] for p in doc["page_index"]] != list(range(1, doc["pages"] + 1))):
            raise ValueError(f"Manifest-Seitenfolge stimmt nicht: {name}")
        answer = doc.get("answer_start_page")
        if answer is not None and (type(answer) is not int or not 1 <= answer <= doc["pages"]):
            raise ValueError(f"Ungültiger Endantwortenbeginn: {name}")
        ausgabepfad(ordner, doc["markdown"])
        for page in doc["page_index"]:
            if not isinstance(page["flags"], list) or not all(isinstance(f, str) for f in page["flags"]):
                raise ValueError(f"Ungültige Seitenflags: {name}")
            for field in ("text_read", "original_image_viewed"):
                if type(page[field]) is not bool:
                    raise ValueError(f"Ungültiger Prüfstatus: {name}")
            if not isinstance(page["subject_review"], str):
                raise ValueError(f"Ungültige Fachprüfung: {name}")
            if page.get("image"):
                ausgabepfad(ordner, page["image"])
    for doc in daten:
        if "duplicate_of" in doc:
            original = next((d for d in daten if d["pdf"] == doc["duplicate_of"] and "duplicate_of" not in d), None)
            if original is None or (doc.get("sha256") and original.get("sha256") and doc["sha256"] != original["sha256"]):
                raise ValueError(f"Ungültiger Duplikatverweis: {doc['pdf']}")
    return daten


def seitenabschnitte(text):
    teile = re.split(r"(?m)^## PDF-Seite (\d+)\n", text)
    return [(int(teile[i]), teile[i + 1].strip().removeprefix("```text\n").removesuffix("```").rstrip())
            for i in range(1, len(teile), 2)]


def aufgabentext(raw, seite, antwortbeginn):
    marker = antwortmarker(raw)
    if marker:
        return raw[:marker.start()].rstrip(), True
    if antwortbeginn is not None and seite >= antwortbeginn:
        return "", True
    return raw, False


def erstseitenkoepfe(sources):
    """Nur wiederkehrende Zeilen im obersten Seitenband als Kopf behandeln."""
    zaehler, gesehen = collections.Counter(), set()
    for source in sources:
        hashwert = sha256(source)
        if hashwert in gesehen:
            continue
        gesehen.add(hashwert)
        with pdfium.PdfDocument(source) as doc:
            if not len(doc):
                raise ValueError(f"PDF enthält keine Seiten: {source.name}")
            page = doc[0]
            textpage = page.get_textpage()
            text = textpage.get_text_bounded(0, page.get_height() * .8, page.get_width(), page.get_height())
            zaehler.update({z.strip() for z in text.splitlines() if z.strip()
                            and not re.search(r"\b(Aufgabe|Beispiel|Kapitel|Chapter|Exercise)\b", z, re.I)})
            textpage.close()
            page.close()
    return {z for z, count in zaehler.items() if count >= max(2, len(gesehen) / 2)}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def alte_pruefungen(ordner):
    """Prüfstatus aus früheren manifest.json-Dateien, Schlüssel (PDF-Name, Seite)."""
    alt = {}
    for manifest in Path(ordner).rglob("manifest.json"):
        daten = manifest_laden(manifest.parent)
        for doc in daten if isinstance(daten, list) else []:
            for seite in doc.get("page_index", []):
                bild = ausgabepfad(manifest.parent, seite["image"]) if seite.get("image") else None
                key = (Path(doc["pdf"]).name, doc.get("sha256"), seite["page"])
                value = (doc.get("sha256"), {k: seite[k] for k in STATUS if k in seite}, bild)
                if key in alt and alt[key] != value:
                    raise ValueError(f"Mehrdeutige alte Prüfstände: {doc['pdf']}, Seite {seite['page']}")
                alt[key] = value
    return alt


def extract(quelle, ziel, alt_ordner=None, ueberschrift=None):
    quelle, ziel = Path(quelle), Path(ziel)
    sources = sorted(quelle.glob("*.pdf")) if quelle.is_dir() else []
    if not sources:
        sys.exit(f"Keine PDFs im Quellordner: {quelle}")
    if ziel.resolve().is_relative_to(quelle.resolve()):
        raise ValueError("Ausgabe muss außerhalb des Quellordners liegen")
    if (ziel / "Seitenindex.md").exists() or (ziel / "manifest.json").exists():
        sys.exit(f"Index oder Manifest in {ziel} existiert bereits. Neuen Ausgabeordner wählen und erst nach Vergleich übernehmen.")
    if ziel.exists() and any(ziel.iterdir()):
        raise FileExistsError("Ausgabeordner muss neu oder leer sein")
    (ziel / "md").mkdir(parents=True, exist_ok=True)
    (ziel / "bilder").mkdir(exist_ok=True)
    alt = alte_pruefungen(alt_ordner) if alt_ordner else {}
    kopfzeilen = erstseitenkoepfe(sources)
    records, gesehen, uebernommen = [], {}, 0
    index = [f"# {ueberschrift or 'Seitenindex: ' + quelle.name}", "",
             "Maschinelle Textextraktion zum Suchen. Formeln, Tabellen und Zeichnungen am Original prüfen.", ""]
    for source in sources:
        hashwert = sha256(source)
        if hashwert in gesehen:
            index += [f"## {source.stem}", f"Byte-identisch mit {gesehen[hashwert]}; nicht erneut indiziert.", ""]
            records.append(dict(pdf=source.name, sha256=hashwert, duplicate_of=gesehen[hashwert]))
            continue
        gesehen[hashwert] = source.name
        document = pdfium.PdfDocument(source)
        texte = []
        for number in range(1, len(document) + 1):
            textpage = document[number - 1].get_textpage()
            # pdfium markiert Silbentrennung am Zeilenende mit U+FFFE; entfernen, sonst findet die Suche getrennte Wörter nicht.
            texte.append(textpage.get_text_range().replace("\r\n", "\n").replace("\r", "\n").replace("￾", ""))
            textpage.close()
        # Zeilen auf mindestens der Hälfte der Seiten sind Kopf-/Fußzeilen und taugen nicht als Titel.
        zaehler = collections.Counter(z for t in texte for z in {l.strip() for l in t.splitlines() if l.strip()})
        wiederholt = {z for z, c in zaehler.items() if len(texte) >= 4 and c >= len(texte) / 2}
        relative_source = Path(os.path.relpath(source, ziel / "md")).as_posix()
        extracted = [f"# {source.stem}", "", f"Quelle: {relative_source}",
                     "Die Seitenzahlen unten sind PDF-Seiten, keine behaupteten Foliennummern.", ""]
        index += [f"## {source.stem} ({len(document)} PDF-Seiten)",
                  f"[Markdown]({quote('md/' + source.stem + '.md', safe='/')})", ""]
        pages, answer_start_page = [], None
        for number, raw in enumerate(texte, 1):
            marker = antwortmarker(raw)
            if marker and answer_start_page is None:
                answer_start_page = number
            sicherer_text, _ = aufgabentext(raw, number, answer_start_page)
            lines = [l.strip() for l in sicherer_text.splitlines() if l.strip()]
            meaningful = [l for l in lines if l not in wiederholt and not SEITENZAHL.match(l)
                          and not (number == 1 and l in kopfzeilen)]
            headings = [l for l in meaningful if re.search(r"[A-Za-zÄÖÜäöüß]{4}", l)]
            preview = " / ".join(headings[:2] or meaningful[:3])[:100].replace("|", "/")
            if not sicherer_text and answer_start_page is not None:
                preview = "Endantworten (ausgeblendet)"
            thin = len(re.sub(r"\s", "", raw)) < 80
            damaged = bool(re.search(r"[�-]", raw))
            tasks = bool(re.search(r"\b(Übung\w*|Aufgabe\w*|Beispiel\w*)\b", raw, re.I))
            flags = [label for yes, label in [(thin, "wenig Text"), (damaged, "Zeichen prüfen"), (tasks, "Aufgabe/Beispiel")] if yes]
            if answer_start_page is not None:
                flags.append("Endantworten-Abschnitt")
            extracted += [f"## PDF-Seite {number}", "", "```text", raw.strip(), "```", ""]
            index.append(f"- S. {number}: {preview}" + (" [" + ", ".join(flags) + "]" if flags else ""))
            image, status = None, dict(STATUS)
            alt_hash, alt_status, alt_bild = alt.get((source.name, hashwert, number), (None, None, None))
            if alt_status is not None and alt_hash == hashwert:
                status.update(alt_status)
                uebernommen += 1
                if alt_bild and alt_bild.is_file():  # bereits angesehenes Bild hat Vorrang vor neuem Rendern
                    image = f"bilder/{source.stem}-S{number:03}{alt_bild.suffix}"
                    (ziel / image).write_bytes(alt_bild.read_bytes())
            if image is None and (thin or damaged):
                image = f"bilder/{source.stem}-S{number:03}.png"
                page = document[number - 1]
                page.render(scale=1.5).to_pil().save(ziel / image)
                page.close()
            pages.append(dict(page=number, characters=len(raw), flags=flags, image=image, **status))
        target = ziel / "md" / f"{source.stem}.md"
        target.write_text("\n".join(extracted), encoding="utf-8")
        records.append(dict(pdf=source.name, sha256=hashwert, markdown_sha256=sha256(target), pages=len(document),
                            markdown=f"md/{source.stem}.md", answer_start_page=answer_start_page, page_index=pages))
        document.close()
        index.append("")
    (ziel / "Seitenindex.md").write_text("\n".join(index), encoding="utf-8")
    (ziel / "manifest.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    seiten = sum(r.get("pages", 0) for r in records)
    print(f"{len(records)} PDFs, {seiten} Seiten, {sum(1 for r in records if 'duplicate_of' in r)} Duplikate, "
          f"{sum(p['image'] is not None for r in records for p in r.get('page_index', []))} Bildfälle, "
          f"{uebernommen} Prüfstände übernommen.")
    return check(ziel, quelle)


def check(ziel, quelle=None):
    """Technische Integrität prüfen; kein Nachweis einer Bild- oder Fachprüfung."""
    ziel = Path(ziel)
    probleme = 0
    try:
        records = manifest_laden(ziel)
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(f"FEHLER Manifest: {error}")
        return 1
    index = (ziel / "Seitenindex.md").read_text(encoding="utf-8") if (ziel / "Seitenindex.md").is_file() else ""
    if not index:
        print("FEHLER: Seitenindex.md fehlt oder ist leer"); probleme += 1
    indexteile = re.split(r"(?m)^## (.+)\n", index)
    gruppen = list(zip(indexteile[1::2], indexteile[2::2]))
    if len(gruppen) != len(records):
        print("FEHLER: Dokumentanzahl im Seitenindex stimmt nicht"); probleme += 1
    for d in records:
        name = d["pdf"]
        if "duplicate_of" not in d:
            md = ausgabepfad(ziel, d["markdown"])
            if not md.is_file():
                print(f"FEHLER {md.name}: Markdown fehlt"); probleme += 1
                continue
            text = md.read_text(encoding="utf-8")
            sections = seitenabschnitte(text)
            if [n for n, _ in sections] != list(range(1, d["pages"] + 1)):
                print(f"FEHLER {md.name}: Seitenabschnitte fehlen, sind doppelt oder falsch geordnet"); probleme += 1
            answer = next((n for n, raw in sections if antwortmarker(raw)), None)
            if answer != d.get("answer_start_page"):
                print(f"FEHLER {md.name}: Endantwortenbeginn stimmt nicht; neu extrahieren"); probleme += 1
            if d.get("markdown_sha256") and sha256(md) != d["markdown_sha256"]:
                print(f"FEHLER {md.name}: Rohtext geändert; Korrekturen separat speichern"); probleme += 1
            source = re.search(r"(?m)^Quelle: (.+)$", text)
            original = (md.parent / source.group(1)).resolve() if source else None
            if quelle is None and original is not None:
                quelle = original.parent
            if original is None or quelle is None or original != (Path(quelle) / name).resolve():
                print(f"FEHLER {md.name}: Quellenverweis stimmt nicht"); probleme += 1
            header = f"{Path(name).stem} ({d['pages']} PDF-Seiten)"
            blocks = [block for title, block in gruppen if title == header]
            if len(blocks) != 1:
                print(f"FEHLER {name}: Index-Dokument fehlt oder ist doppelt"); probleme += 1
            else:
                numbers = [int(n) for n in re.findall(r"(?m)^- S\. (\d+):", blocks[0])]
                links = re.findall(r"\[Markdown\]\(([^\n]+)\)", blocks[0])
                if numbers != list(range(1, d["pages"] + 1)) or [unquote(l) for l in links] != [d["markdown"]]:
                    print(f"FEHLER {name}: Index-Seiten oder Markdown-Link stimmen nicht"); probleme += 1
            for page in d["page_index"]:
                if page.get("image") and not ausgabepfad(ziel, page["image"]).is_file():
                    print(f"FEHLER {name}, Seite {page['page']}: Bild fehlt"); probleme += 1
        else:
            blocks = [block for title, block in gruppen if title == Path(name).stem]
            if len(blocks) != 1 or f"Byte-identisch mit {d['duplicate_of']};" not in blocks[0]:
                print(f"FEHLER {name}: Duplikat im Index fehlt"); probleme += 1
    if quelle is None or not Path(quelle).is_dir():
        print("FEHLER: Quellordner fehlt oder ist nicht bestimmbar")
        return probleme + 1
    for name in sorted({p.name for p in Path(quelle).glob("*.pdf")} - {d["pdf"] for d in records}):
        print(f"VERALTET {name}: neue PDF, neu extrahieren"); probleme += 1
    for d in records:
        pdf = Path(quelle) / d["pdf"]
        if not pdf.exists():
            print(f"WARNUNG {d['pdf']}: Original nicht gefunden"); probleme += 1
        elif not d.get("sha256"):
            print(f"UNGEPRÜFT {d['pdf']}: SHA-256 fehlt, neu extrahieren"); probleme += 1
        elif sha256(pdf) != d["sha256"]:
            print(f"VERALTET {d['pdf']}: PDF geändert, neu extrahieren"); probleme += 1
        elif "duplicate_of" not in d:
            with pdfium.PdfDocument(pdf) as document:
                if len(document) != d["pages"]:
                    print(f"FEHLER {d['pdf']}: PDF-Seitenzahl stimmt nicht"); probleme += 1
    if not probleme:
        print("OK: Quellen, Seitenlisten, Indexlinks und eingetragene Bilddateien technisch geprüft.")
        if any("markdown_sha256" not in d for d in records if "duplicate_of" not in d):
            print("HINWEIS: Altbestand ohne Rohtext-Prüfsumme; Markdown-Inhaltsintegrität nicht belegt.")
    return probleme


def render(pdf, seite, ziel, scale):
    if not math.isfinite(scale) or not 0 < scale <= 6:
        raise ValueError("Rendermaßstab muss größer 0 und höchstens 6 sein")
    ziel = Path(ziel)
    if ziel.resolve() == Path(pdf).resolve().parent:
        raise ValueError("Bilder außerhalb des Quellordners speichern")
    with pdfium.PdfDocument(str(pdf)) as doc:
        if not 1 <= seite <= len(doc):
            raise ValueError(f"Seite {seite} außerhalb 1–{len(doc)}")
        ziel.mkdir(parents=True, exist_ok=True)
        out = ausgabepfad(ziel, f"{Path(pdf).stem}-S{seite:03}.png")
        meta = ausgabepfad(ziel, out.stem + ".json")
        expected = dict(pdf_sha256=sha256(pdf), page=seite, scale=scale)
        if out.exists() or meta.exists():
            if out.is_file() and meta.is_file():
                old = json.loads(meta.read_text(encoding="utf-8"))
                if old == dict(**expected, image_sha256=sha256(out)):
                    print(out.resolve()); return
            raise FileExistsError("Vorhandenes Bild bleibt erhalten; neuen Bildordner wählen")
        page = doc[seite - 1]
        page.render(scale=scale).to_pil().save(out)
        page.close()
        meta.write_text(json.dumps(dict(**expected, image_sha256=sha256(out)), indent=2), encoding="utf-8")
    print(out.resolve())


def gepruefte_gruppen(ordner):
    root = Path(ordner)
    manifests = [root / "manifest.json"] if (root / "manifest.json").is_file() else sorted(root.rglob("manifest.json"))
    if not manifests:
        raise ValueError("Kein manifest.json gefunden; zuerst extrahieren")
    for manifest in manifests:
        with contextlib.redirect_stdout(io.StringIO()) as log:
            probleme = check(manifest.parent)
        if probleme:
            raise ValueError(f"Sichtung nicht aktuell: {manifest.parent}\n{log.getvalue().strip()}")
        yield manifest.parent, manifest_laden(manifest.parent)


def dokumentseite(ordner, name, seite):
    treffer = [(group, doc) for group, docs in gepruefte_gruppen(ordner) for doc in docs if doc["pdf"] == name]
    if len(treffer) != 1:
        raise ValueError("PDF-Name fehlt oder ist mehrdeutig; Gruppenordner und vollständigen PDF-Namen verwenden")
    group, doc = treffer[0]
    if "duplicate_of" in doc:
        raise ValueError(f"Byte-identisch; stattdessen {doc['duplicate_of']} lesen")
    if not 1 <= seite <= doc["pages"]:
        raise ValueError(f"Seite außerhalb 1–{doc['pages']}")
    raw = dict(seitenabschnitte(ausgabepfad(group, doc["markdown"]).read_text(encoding="utf-8")))[seite]
    return group, doc, raw


def suche(ordner, suchtext, limit=5, offset=0, mit_antworten=False):
    aufgabe = re.search(r"\b(?:Aufgabe|Nr\.?|Nummer)\s*(\d+)\b", suchtext, re.I)
    woerter = re.findall(r"\w+", (suchtext[:aufgabe.start()] + suchtext[aufgabe.end():] if aufgabe else suchtext).casefold())
    task_pattern = re.compile(r"(?im)^[ \t]*(?:Aufgabe[ \t]+)?" + aufgabe[1] + r"(?:[.):]|[ \t]+)") if aufgabe else None
    if (not woerter and not aufgabe) or not 1 <= limit <= 50 or offset < 0:
        raise ValueError("Suchtext benötigt Wörter; limit 1–50, offset mindestens 0")
    treffer, bildbedarf, ausgeblendet = [], 0, 0
    for group, docs in gepruefte_gruppen(ordner):
        for doc in docs:
            if "duplicate_of" in doc:
                continue
            for number, raw in seitenabschnitte(ausgabepfad(group, doc["markdown"]).read_text(encoding="utf-8")):
                # Altbestände enthalten noch U+FFFE aus der Silbentrennung.
                text, verborgen = aufgabentext(raw.replace("￾", ""), number, doc.get("answer_start_page"))
                if mit_antworten:
                    text = raw
                ausgeblendet += int(verborgen and not mit_antworten)
                bildbedarf += int("wenig Text" in doc["page_index"][number - 1]["flags"])
                if not text:
                    continue
                task = task_pattern.search(text) if task_pattern else None
                if task_pattern and task is None:
                    continue
                titel = " ".join(text.splitlines()[:4])
                corpus = (doc["pdf"] + " " + text).casefold()
                if not all(w in corpus for w in woerter):
                    continue
                score = sum(3 * (w in doc["pdf"].casefold()) + 2 * (w in titel.casefold()) for w in woerter)
                flach = " ".join((text[task.start():] if task else text).split())
                start = max(0, min((flach.casefold().find(w) for w in woerter if w in flach.casefold()), default=0) - 45)
                treffer.append((score, dict(ordner=str(group.resolve()), pdf=doc["pdf"], pdf_seite=number,
                                           vorschau=flach[start:start + 160], antworten_ausgeblendet=verborgen and not mit_antworten)))
    treffer.sort(key=lambda item: (-item[0], item[1]["ordner"], item[1]["pdf"], item[1]["pdf_seite"]))
    return dict(gesamt=len(treffer), treffer=[hit for _, hit in treffer[offset:offset + limit]],
                naechster_offset=offset + limit if offset + limit < len(treffer) else None,
                seiten_mit_bildbedarf=bildbedarf, seiten_ausgeblendet=ausgeblendet,
                hinweis="Wortsuche, keine semantische Suche. Scans und Bildinhalte können ohne Text unauffindbar sein. Lösungsmarker sind heuristisch.")


def lesen(ordner, name, seite, mit_antworten=False, offset=0, zeichen=12000, arbeitsfassung=False):
    if offset < 0 or not 1 <= zeichen <= 50000:
        raise ValueError("offset mindestens 0; zeichen 1–50000")
    group, doc, raw = dokumentseite(ordner, name, seite)
    text, verborgen = aufgabentext(raw, seite, doc.get("answer_start_page"))
    if mit_antworten:
        text = raw
    page = doc["page_index"][seite - 1]
    result = dict(pdf=name, pdf_seite=seite, pdf_sha256=doc["sha256"],
                  flags=page["flags"], status={k: page[k] for k in STATUS},
                  antworten_ausgeblendet=verborgen and not mit_antworten,
                  bild=str(ausgabepfad(group, page["image"]).resolve()) if page.get("image") and (mit_antworten or not verborgen) else None,
                  hinweis="Formeln, Tabellen und Diagramme am Original ansehen, auch ohne Warnflag. Rendern ist keine Bildsichtung.")
    if arbeitsfassung:
        if verborgen and not mit_antworten:
            raise ValueError("Arbeitsfassung einer Lösungs-/Mischseite nur mit --mit-antworten lesen")
        meta = ausgabepfad(group, f"arbeitsfassung/{Path(name).stem}-S{seite:03}.json")
        note = json.loads(meta.read_text(encoding="utf-8"))
        asset = ausgabepfad(group, note["datei"])
        if (note["pdf_sha256"] != doc["sha256"] or note["pdf"] != name or note["pdf_seite"] != seite
                or note["markdown_sha256"] != sha256(ausgabepfad(group, doc["markdown"])) or note["datei_sha256"] != sha256(asset)):
            raise ValueError("Arbeitsfassung oder Quelle verändert; erneut prüfen, alte Fassung bleibt erhalten")
        result["arbeitsfassung"] = dict(datei=str(asset.resolve()), status=note["status"], hinweis="Vom Bearbeiter angegebener Prüfstatus, keine automatische Fachfreigabe")
        text = asset.read_text(encoding="utf-8") if asset.suffix.lower() in (".md", ".txt", ".csv", ".tex") else ""
    if offset > len(text):
        raise ValueError("offset liegt hinter dem Textende")
    result.update(text=text[offset:offset + zeichen], gesamtzeichen=len(text),
                  naechster_offset=offset + zeichen if offset + zeichen < len(text) else None)
    return result


def speichern(ordner, name, seite, arbeitsdatei, status="offen", mit_antworten=False):
    group, doc, raw = dokumentseite(ordner, name, seite)
    if aufgabentext(raw, seite, doc.get("answer_start_page"))[1] and not mit_antworten:
        raise ValueError("Arbeitsfassung einer Lösungs-/Mischseite nur mit --mit-antworten speichern")
    source = Path(arbeitsdatei)
    if source.suffix.lower() not in (".md", ".txt", ".csv", ".tex", ".png", ".jpg", ".jpeg"):
        raise ValueError("Arbeitsdatei muss Markdown, Text, CSV, LaTeX, PNG oder JPEG sein")
    payload = source.read_bytes()
    if source.suffix.lower() in (".md", ".txt", ".csv", ".tex"):
        payload.decode("utf-8")
    else:
        with Image.open(io.BytesIO(payload)) as image:
            image.verify()
    base = f"arbeitsfassung/{Path(name).stem}-S{seite:03}"
    asset, meta = ausgabepfad(group, base + source.suffix.lower()), ausgabepfad(group, base + ".json")
    if meta.exists() or asset.exists():
        raise FileExistsError("Arbeitsfassung bleibt erhalten; für eine Überarbeitung erst vergleichen und sichern")
    record = dict(pdf=name, pdf_seite=seite, pdf_sha256=doc["sha256"],
                  markdown_sha256=sha256(ausgabepfad(group, doc["markdown"])),
                  datei=asset.relative_to(group.resolve()).as_posix(),
                  datei_sha256=hashlib.sha256(payload).hexdigest(), status=status)
    asset.parent.mkdir(parents=True, exist_ok=True)
    with asset.open("xb") as file:
        file.write(payload)
    with meta.open("x", encoding="utf-8") as file:
        json.dump(record, file, ensure_ascii=False, indent=2)
    return dict(datei=str(asset.resolve()), nachweis=str(meta.resolve()), status=status)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    e = sub.add_parser("extract"); e.add_argument("quelle"); e.add_argument("ziel")
    e.add_argument("--alt", help="früherer Sichtungsordner, dessen Prüfstatus übernommen wird")
    e.add_argument("--titel", help="Überschrift des Seitenindex")
    c = sub.add_parser("check"); c.add_argument("ziel")
    r = sub.add_parser("render"); r.add_argument("pdf"); r.add_argument("seite", type=int)
    r.add_argument("ziel"); r.add_argument("--scale", type=float, default=2)
    s = sub.add_parser("search"); s.add_argument("ordner"); s.add_argument("suchtext")
    s.add_argument("--limit", type=int, default=5); s.add_argument("--offset", type=int, default=0)
    l = sub.add_parser("read"); l.add_argument("ordner"); l.add_argument("pdf"); l.add_argument("seite", type=int)
    l.add_argument("--offset", type=int, default=0); l.add_argument("--zeichen", type=int, default=12000)
    l.add_argument("--arbeitsfassung", action="store_true")
    p = sub.add_parser("save"); p.add_argument("ordner"); p.add_argument("pdf"); p.add_argument("seite", type=int)
    p.add_argument("arbeitsdatei"); p.add_argument("--status", choices=("offen", "original-geprüft", "fachlich-geprüft"), default="offen")
    for parser in (s, l, p):
        parser.add_argument("--mit-antworten", action="store_true", help="Lösungsbereiche ausdrücklich einbeziehen")
    a = ap.parse_args()
    try:
        if a.cmd == "extract":
            sys.exit(1 if extract(a.quelle, a.ziel, a.alt, a.titel) else 0)
        if a.cmd == "check":
            sys.exit(1 if check(a.ziel) else 0)
        if a.cmd == "render":
            render(a.pdf, a.seite, a.ziel, a.scale)
        elif a.cmd == "search":
            print(json.dumps(suche(a.ordner, a.suchtext, a.limit, a.offset, a.mit_antworten), ensure_ascii=False, indent=2))
        elif a.cmd == "read":
            print(json.dumps(lesen(a.ordner, a.pdf, a.seite, a.mit_antworten, a.offset, a.zeichen, a.arbeitsfassung), ensure_ascii=False, indent=2))
        elif a.cmd == "save":
            print(json.dumps(speichern(a.ordner, a.pdf, a.seite, a.arbeitsdatei, a.status, a.mit_antworten), ensure_ascii=False, indent=2))
    except (OSError, ValueError, KeyError, TypeError, pdfium.PdfiumError) as error:
        ap.exit(1, f"FEHLER: {error}\n")
