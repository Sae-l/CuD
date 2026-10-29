#!/usr/bin/env python3
"""Selbsttest für sichtung.py: python scripts/selbsttest.py (benötigt zusätzlich reportlab)."""
import hashlib, json, shutil, subprocess, sys, tempfile
from pathlib import Path

from reportlab.pdfgen import canvas
from PIL import Image

SKRIPT = Path(__file__).with_name("sichtung.py")


def lauf(*args):
    return subprocess.run([sys.executable, str(SKRIPT), *map(str, args)], capture_output=True, text=True, encoding="utf-8")


with tempfile.TemporaryDirectory() as tmp:
    tmp = Path(tmp)
    quelle = tmp / "quelle"
    quelle.mkdir()
    assert lauf("extract", quelle, tmp / "leer").returncode != 0
    assert not (tmp / "leer").exists(), "leere Quelle erzeugt einen scheinbar gültigen Index"
    assert lauf("extract", tmp / "fehlt", tmp / "leer").returncode != 0
    pdf = quelle / "Test.pdf"
    c = canvas.Canvas(str(pdf))
    for kopf, zeilen in [("Kapitel 1 Einführung in die Mechanik", ["Grundbegriffe der Kinematik"]),
                         ("Formeln", ["F = m · a, Einheit kg·m/s²", "Aufgabe 1: Kraft berechnen"]),
                         ("Endantworten:", ["12 N"]), (None, [])]:
        c.drawString(72, 800, "Mechanik Skript WS")  # Kopfzeile auf jeder Seite
        c.drawString(72, 40, "Seite 1")
        if kopf:
            c.drawString(72, 750, kopf)
            for i, z in enumerate(zeilen):
                c.drawString(72, 730 - 20 * i, z)
        c.showPage()
    c.save()
    shutil.copy(pdf, quelle / "Kopie.pdf")  # byte-identisches Duplikat

    r = lauf("extract", quelle, tmp / "out")
    assert r.returncode == 0, r.stdout + r.stderr
    index = (tmp / "out" / "Seitenindex.md").read_text(encoding="utf-8")
    zeilen = [z for z in index.splitlines() if z.startswith("- S.")]
    assert len(zeilen) == 4, index                                    # Duplikat nicht doppelt indiziert
    assert "Byte-identisch mit Kopie.pdf" in index or "Byte-identisch mit Test.pdf" in index
    assert "Mechanik Skript WS" not in index and "Seite 1" not in "".join(zeilen), index  # Kopfzeile kein Titel
    assert zeilen[0].startswith("- S. 1: Kapitel 1 Einführung")
    assert "Aufgabe/Beispiel" in zeilen[1] and "Aufgabe/Beispiel" not in zeilen[0]
    assert "Endantworten-Abschnitt" in zeilen[2] and "Endantworten-Abschnitt" not in zeilen[1]
    assert "wenig Text" in zeilen[3]  # Testseiten sind alle kurz; leere Seite muss es sicher sein
    manifest = json.loads((tmp / "out" / "manifest.json").read_text(encoding="utf-8"))
    seiten = next(d for d in manifest if "page_index" in d)["page_index"]
    assert seiten[0]["text_read"] is False and seiten[0]["subject_review"] == "offen"
    assert seiten[3]["image"] and (tmp / "out" / seiten[3]["image"]).exists()

    assert lauf("extract", quelle, tmp / "out").returncode != 0, "bestehender Index wurde nicht geschützt"
    assert lauf("check", tmp / "out").returncode == 0

    # Jede Mutation wird einzeln zurückgesetzt: ein früherer Fehler darf keinen späteren verdecken.
    mf = tmp / "out" / "manifest.json"
    manifest_bytes = mf.read_bytes()
    canonical = next(d for d in manifest if "page_index" in d)
    bild = tmp / "out" / seiten[3]["image"]
    bild_bytes = bild.read_bytes()
    bild.unlink()
    assert lauf("check", tmp / "out").returncode != 0, "fehlendes Bild übersehen"
    bild.write_bytes(bild_bytes)
    for invalid in ("{", "{}", "[]"):
        mf.write_text(invalid, encoding="utf-8")
        r = lauf("check", tmp / "out")
        assert r.returncode != 0 and "Traceback" not in r.stderr
    mf.write_bytes(manifest_bytes)
    for change in (lambda d: d[0]["page_index"][0].update(page=2),
                   lambda d: d[0]["page_index"][0].update(image="../fremd.png"),
                   lambda d: d[0].update(markdown="../fremd.md")):
        bad = json.loads(manifest_bytes)
        change(bad)
        mf.write_text(json.dumps(bad), encoding="utf-8")
        assert lauf("check", tmp / "out").returncode != 0
    mf.write_bytes(manifest_bytes)
    for broken in ("# Leer\n", index.replace("- S. 2:", "- S. 1:"), index.replace("[Markdown](md/", "[Markdown](falsch/")):
        (tmp / "out" / "Seitenindex.md").write_text(broken, encoding="utf-8")
        assert lauf("check", tmp / "out").returncode != 0
    (tmp / "out" / "Seitenindex.md").write_text(index, encoding="utf-8")
    rawpath = tmp / "out" / canonical["markdown"]
    rawbytes = rawpath.read_bytes()
    rawpath.write_bytes(rawbytes + b"\nFalscher Zusatz\n")
    assert lauf("check", tmp / "out").returncode != 0, "veränderten Rohtext übersehen"
    rawpath.write_bytes(rawbytes)
    assert lauf("check", tmp / "out").returncode == 0
    # Alle Metadaten können zueinander passen und trotzdem der Originalseitenzahl widersprechen.
    shortened = rawbytes.decode("utf-8").split("## PDF-Seite 4")[0]
    rawpath.write_text(shortened, encoding="utf-8")
    bad = json.loads(manifest_bytes)
    bad[0].update(pages=3, page_index=bad[0]["page_index"][:3], markdown_sha256=hashlib.sha256(rawpath.read_bytes()).hexdigest())
    mf.write_text(json.dumps(bad), encoding="utf-8")
    (tmp / "out" / "Seitenindex.md").write_text("\n".join(z for z in index.replace("(4 PDF-Seiten)", "(3 PDF-Seiten)").splitlines() if not z.startswith("- S. 4:")), encoding="utf-8")
    r = lauf("check", tmp / "out")
    assert r.returncode != 0 and "PDF-Seitenzahl" in r.stdout
    rawpath.write_bytes(rawbytes)
    mf.write_bytes(manifest_bytes)
    (tmp / "out" / "Seitenindex.md").write_text(index, encoding="utf-8")

    # Begrenzte Suche, seitenweises Lesen und ausdrückliches Einbeziehen von Lösungen.
    r = lauf("search", tmp / "out", "Kinematik")
    assert r.returncode == 0, r.stderr
    found = json.loads(r.stdout)
    assert found["gesamt"] == 1 and found["treffer"][0]["pdf_seite"] == 1
    numbered = json.loads(lauf("search", tmp / "out", "Aufgabe 1").stdout)
    assert numbered["gesamt"] == 1 and numbered["treffer"][0]["pdf_seite"] == 2
    verborgen = json.loads(lauf("search", tmp / "out", "12 N").stdout)
    assert verborgen["gesamt"] == 0 and verborgen["seiten_ausgeblendet"] >= 1, "Lösungsschutz verschweigt ausgeblendete Seiten"
    offen = json.loads(lauf("search", tmp / "out", "12 N", "--mit-antworten").stdout)
    assert offen["gesamt"] == 1 and offen["seiten_ausgeblendet"] == 0
    assert lauf("search", tmp / "out", "", "--limit", 0).returncode != 0
    page = json.loads(lauf("read", tmp / "out", canonical["pdf"], 3).stdout)
    assert "12 N" not in page["text"] and page["antworten_ausgeblendet"] and page["bild"] is None
    page = json.loads(lauf("read", tmp / "out", canonical["pdf"], 1).stdout)
    first = json.loads(lauf("read", tmp / "out", canonical["pdf"], 1, "--zeichen", 20).stdout)
    rest = json.loads(lauf("read", tmp / "out", canonical["pdf"], 1, "--offset", 20).stdout)
    assert first["naechster_offset"] == 20 and first["text"] + rest["text"] == page["text"]
    assert lauf("read", tmp / "out", canonical["pdf"], 99).returncode != 0
    assert lauf("read", tmp / "out", canonical["pdf"], 1, "--offset", 99999).returncode != 0

    note = tmp / "geprueft.md"
    note.write_text("# Kinematik\nArbeitsfassung mit Quellenbezug.\n", encoding="utf-8")
    r = lauf("save", tmp / "out", canonical["pdf"], 1, note, "--status", "original-geprüft")
    assert r.returncode == 0, r.stderr
    asset = Path(json.loads(r.stdout)["datei"])
    assert lauf("save", tmp / "out", canonical["pdf"], 1, note).returncode != 0
    reused = json.loads(lauf("read", tmp / "out", canonical["pdf"], 1, "--arbeitsfassung").stdout)
    assert reused["text"] == note.read_text(encoding="utf-8")
    assert reused["arbeitsfassung"]["status"] == "original-geprüft"
    assert json.loads(mf.read_text(encoding="utf-8")) == manifest, "Speichern erfindet keine Sichtungsmarken"
    asset.write_text("verändert", encoding="utf-8")
    assert lauf("read", tmp / "out", canonical["pdf"], 1, "--arbeitsfassung").returncode != 0
    assert lauf("save", tmp / "out", canonical["pdf"], 3, note).returncode != 0

    (tmp / "out" / "Seitenindex.md").unlink()
    r = lauf("check", tmp / "out")
    assert r.returncode != 0 and "Seitenindex.md" in r.stdout, "fehlender Seitenindex übersehen"
    (tmp / "out" / "Seitenindex.md").write_text(index, encoding="utf-8")

    shutil.copy(pdf, quelle / "Neu.pdf")
    r = lauf("check", tmp / "out")
    assert r.returncode != 0 and "Neu.pdf" in r.stdout, r.stdout
    (quelle / "Neu.pdf").unlink()

    md = tmp / "out" / next(d for d in manifest if "markdown" in d)["markdown"]
    original = md.read_text(encoding="utf-8")
    md.write_text(original.replace("## PDF-Seite 2", "## PDF-Seite 1"), encoding="utf-8")
    assert lauf("check", tmp / "out").returncode != 0, "doppelte Seitennummer übersehen"
    md.unlink()
    assert lauf("check", tmp / "out").returncode != 0, "fehlendes Markdown übersehen"
    md.write_text(original, encoding="utf-8")

    geschützt = tmp / "geschuetzt"
    geschützt.mkdir()
    (geschützt / "manifest.json").write_text("[]", encoding="utf-8")
    assert lauf("extract", quelle, geschützt).returncode != 0
    assert (geschützt / "manifest.json").read_text(encoding="utf-8") == "[]"
    assert lauf("check", geschützt).returncode != 0

    # Prüfstatus und handgerenderte Bilder werden mit --alt übernommen
    seiten[1].update(text_read=True, original_image_viewed=True, image="bilder/hand-S002.png")
    (tmp / "out" / "bilder" / "hand-S002.png").write_bytes(b"png")
    (tmp / "out" / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    r = lauf("extract", quelle, tmp / "neu", "--alt", tmp / "out")
    assert r.returncode == 0 and "Prüfstände übernommen" in r.stdout, r.stdout + r.stderr
    neu = next(d for d in json.loads((tmp / "neu" / "manifest.json").read_text(encoding="utf-8")) if "page_index" in d)
    assert neu["page_index"][1]["text_read"] is True and neu["page_index"][1]["original_image_viewed"] is True
    assert (tmp / "neu" / neu["page_index"][1]["image"]).read_bytes() == b"png"

    # Ohne alte Prüfsumme gibt es keinen Beleg für unveränderte Quellen.
    ohne_hash = json.loads((tmp / "out" / "manifest.json").read_text(encoding="utf-8"))
    for d in ohne_hash:
        d.pop("sha256", None)
    (tmp / "out" / "manifest.json").write_text(json.dumps(ohne_hash), encoding="utf-8")
    assert lauf("check", tmp / "out").returncode != 0
    r = lauf("extract", quelle, tmp / "ohne_hash", "--alt", tmp / "out")
    assert r.returncode == 0, r.stdout + r.stderr
    ohne = next(d for d in json.loads((tmp / "ohne_hash" / "manifest.json").read_text(encoding="utf-8")) if "page_index" in d)
    assert ohne["page_index"][1]["text_read"] is False
    assert ohne["page_index"][1]["original_image_viewed"] is False
    assert (tmp / "ohne_hash" / ohne["page_index"][1]["image"]).read_bytes() != b"png"

    # Geändertes PDF: check meldet VERALTET, alter Prüfstatus wird nicht übernommen
    pdf.write_bytes(pdf.read_bytes() + b"\n%geaendert\n")
    r = lauf("check", tmp / "neu")
    assert r.returncode != 0 and "VERALTET" in r.stdout, r.stdout
    lauf("extract", quelle, tmp / "neu2", "--alt", tmp / "neu")
    neu2 = json.loads((tmp / "neu2" / "manifest.json").read_text(encoding="utf-8"))
    test = next(d for d in neu2 if d["pdf"] == "Test.pdf")
    assert test["page_index"][1]["text_read"] is False, "Status eines geänderten PDFs wurde übernommen"

    r = lauf("render", pdf, 2, tmp / "bilder")
    assert r.returncode == 0 and (tmp / "bilder" / "Test-S002.png").exists(), r.stderr
    assert lauf("render", pdf, 9, tmp / "bilder").returncode != 0
    bild = tmp / "bilder" / "Test-S002.png"
    vorher = bild.stat().st_mtime_ns
    assert lauf("render", pdf, 2, tmp / "bilder").returncode == 0
    assert bild.stat().st_mtime_ns == vorher, "unverändertes Bild unnötig neu gerendert"
    assert lauf("render", pdf, 2, tmp / "bilder", "--scale", 3).returncode != 0
    assert bild.stat().st_mtime_ns == vorher, "abweichender Renderauftrag überschreibt ein Bild"
    for scale in ("0", "nan", "inf", "7"):
        assert lauf("render", pdf, 2, tmp / "bilder", "--scale", scale).returncode != 0

    pdf.unlink()
    assert lauf("check", tmp / "neu2").returncode != 0, "entfernte PDF übersehen"

    # Gleiche alte Bildnamen verschiedener PDFs dürfen einander nicht überschreiben.
    collision_source = tmp / "bildquellen"
    collision_source.mkdir()
    for name in ("A", "B"):
        c = canvas.Canvas(str(collision_source / f"{name}.pdf"))
        c.drawString(72, 750, f"Dokument {name}")
        c.showPage()
        c.save()
    old = tmp / "alte_bilder"
    r = lauf("extract", collision_source, old)
    assert r.returncode == 0, r.stdout + r.stderr
    old_records = json.loads((old / "manifest.json").read_text(encoding="utf-8"))
    expected = {}
    for doc, color in zip(old_records, ("red", "blue")):
        image = old / doc["pdf"] / "page.png"
        image.parent.mkdir()
        Image.new("RGB", (2, 2), color).save(image)
        expected[doc["pdf"]] = image.read_bytes()
        doc["page_index"][0].update(image=image.relative_to(old).as_posix(), original_image_viewed=True)
    (old / "manifest.json").write_text(json.dumps(old_records), encoding="utf-8")
    new = tmp / "neue_bilder"
    r = lauf("extract", collision_source, new, "--alt", old)
    assert r.returncode == 0, r.stdout + r.stderr
    new_records = json.loads((new / "manifest.json").read_text(encoding="utf-8"))
    assert len({d["page_index"][0]["image"] for d in new_records}) == 2, "übernommene Bilder kollidieren"
    for doc in new_records:
        page = doc["page_index"][0]
        assert page["original_image_viewed"] is True
        assert (new / page["image"]).read_bytes() == expected[doc["pdf"]], "übernommenes Bild verändert"

    # Erstseitenköpfe, gemischte Lösungsseiten und Fortsetzungsseiten ohne erneuten Marker.
    source = tmp / "gemischt"
    source.mkdir()
    for name in ("Algebra", "Mechanik"):
        c = canvas.Canvas(str(source / f"{name}.pdf"))
        c.drawString(50, 815, "Institut fuer Testunterlagen")
        c.drawString(50, 790, "Lehre und Forschung")
        c.drawString(50, 750, f"Aufgabe {name}: Thema {name}")
        c.drawString(50, 720, "Endantworten: Geheimwert 98765")
        c.showPage()
        c.drawString(50, 750, "Fortsetzung der Ergebnisse: Geheimwert 54321")
        c.save()
    out = tmp / "gemischte_sichtung"
    r = lauf("extract", source, out)
    assert r.returncode == 0, r.stderr
    idx = (out / "Seitenindex.md").read_text(encoding="utf-8")
    assert "Institut fuer" not in idx and "Lehre und Forschung" not in idx
    assert "Aufgabe Algebra" in idx and "98765" not in idx and "54321" not in idx
    for keyword in ("98765", "54321"):
        assert json.loads(lauf("search", out, keyword).stdout)["gesamt"] == 0
    mixed = json.loads(lauf("read", out, "Algebra.pdf", 1).stdout)
    assert "Aufgabe Algebra" in mixed["text"] and "98765" not in mixed["text"] and mixed["bild"] is None
    hits = json.loads(lauf("search", out, "Aufgabe", "--limit", 1).stdout)
    assert hits["gesamt"] == 2 and len(hits["treffer"]) == 1 and hits["naechster_offset"] == 1
    more = json.loads(lauf("search", out, "Aufgabe", "--limit", 1, "--offset", 1).stdout)
    assert more["treffer"][0]["pdf"] != hits["treffer"][0]["pdf"] and more["naechster_offset"] is None
    assert lauf("extract", source, source / "ausgabe").returncode != 0

    # Bild-/Vektorseiten ohne Text bleiben als visueller Prüfbedarf sichtbar.
    scan_source = tmp / "bildseiten"
    scan_source.mkdir()
    raster = tmp / "raster.png"
    Image.new("RGB", (80, 80), "green").save(raster)
    c = canvas.Canvas(str(scan_source / "Bild.pdf"))
    c.drawImage(str(raster), 60, 550, width=160, height=160)
    c.showPage()
    c.line(50, 500, 400, 500)
    c.line(50, 500, 50, 750)
    c.line(50, 500, 350, 700)
    c.save()
    scan_out = tmp / "bildsichtung"
    assert lauf("extract", scan_source, scan_out).returncode == 0
    result = json.loads(lauf("search", scan_out, "unbekanntes Thema").stdout)
    assert result["gesamt"] == 0 and result["seiten_mit_bildbedarf"] == 2
    for number in (1, 2):
        page = json.loads(lauf("read", scan_out, "Bild.pdf", number).stdout)
        assert page["bild"] and page["status"]["original_image_viewed"] is False
        with Image.open(page["bild"]) as image:
            assert image.width > 100 and image.height > 100
    r = lauf("save", scan_out, "Bild.pdf", 1, raster)
    assert r.returncode == 0, r.stderr
    note = json.loads(lauf("read", scan_out, "Bild.pdf", 1, "--arbeitsfassung").stdout)
    assert note["text"] == "" and Path(note["arbeitsfassung"]["datei"]).read_bytes() == raster.read_bytes()
    assert note["arbeitsfassung"]["status"] == "offen"
    invalid = tmp / "kaputt.png"
    invalid.write_bytes(b"kein Bild")
    assert lauf("save", scan_out, "Bild.pdf", 2, invalid).returncode != 0
    invalid = tmp / "kaputt.txt"
    invalid.write_bytes(b"\xff\xfe")
    assert lauf("save", scan_out, "Bild.pdf", 2, invalid).returncode != 0
    assert not (scan_out / "arbeitsfassung" / "Bild-S002.json").exists()

    # Ein Lösungskapitel im Inhaltsverzeichnis darf den Rest des Skripts nicht ausblenden.
    toc_source = tmp / "skript"
    toc_source.mkdir()
    c = canvas.Canvas(str(toc_source / "Skript.pdf"))
    for zeilen in (["Inhaltsverzeichnis", "Kapitel 1 Kinematik", "Lösungen", "Anhang"],
                   ["Kapitel 1 Kinematik", "Geschwindigkeit v = s/t"],
                   ["Kapitel 2 Energie", "E = 1/2 m v^2"],
                   ["Lösungen", "v = 3 m/s"]):
        for i, z in enumerate(zeilen):
            c.drawString(72, 760 - 20 * i, z)
        c.showPage()
    c.save()
    toc_out = tmp / "skriptsichtung"
    r = lauf("extract", toc_source, toc_out)
    assert r.returncode == 0, r.stdout + r.stderr
    energie = json.loads(lauf("search", toc_out, "Energie").stdout)
    assert energie["gesamt"] == 1 and energie["treffer"][0]["pdf_seite"] == 3, "Inhaltsverzeichnis sperrt das Skript"
    assert json.loads(lauf("search", toc_out, "3 m/s").stdout)["gesamt"] == 0, "echtes Lösungskapitel sichtbar"
    toc_doc = json.loads((toc_out / "manifest.json").read_text(encoding="utf-8"))[0]
    assert toc_doc["answer_start_page"] == 4

    # pdfium liefert Silbentrennung am Zeilenende als U+FFFE; getrennte Wörter müssen auffindbar bleiben.
    trenn_source = tmp / "trennung"
    trenn_source.mkdir()
    c = canvas.Canvas(str(trenn_source / "Trennung.pdf"))
    c.drawString(72, 760, "welche einzelne Code-")
    c.drawString(72, 740, "zeile fehlt")
    c.showPage()
    c.save()
    trenn_out = tmp / "trennsichtung"
    r = lauf("extract", trenn_source, trenn_out)
    assert r.returncode == 0, r.stdout + r.stderr
    assert "￾" not in (trenn_out / "md" / "Trennung.md").read_text(encoding="utf-8"), "U+FFFE im Markdown"
    assert json.loads(lauf("search", trenn_out, "Codezeile").stdout)["gesamt"] == 1, "getrenntes Wort nicht gefunden"

print("Selbsttest bestanden")
