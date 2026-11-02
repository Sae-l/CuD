# Sichtungsbericht – 20262910 Coding und Digitalisierung

Stand: 29.10.2026. Werkzeug: `pdf-seitenweise-sichten` aus Sae-l/pdf-seitenweise-sichten, Commit `6d50075` (26.10.2026, nach 1.5.0) plus Fix-Branch `fix/silbentrennung-fffe` (PR #17). Originale wurden nur gelesen. Ausgabe liegt in `Referenz_Sichtung_20262910/<Gruppe>/` und wurde mit `check` technisch geprüft (alle 6 Gruppen OK).

## Umfang

| Gruppe | PDFs | Seiten | Neu gegenüber `Referenz_Sichtung/` |
| --- | --- | --- | --- |
| Vorlesungen | 7 (1 Duplikat) | 87 | 004_Git Versionsverwaltung (20 S.), 004b_Vererbung_Python (3 S.); 004b_Vererbung ist byte-identisch mit 004_Git |
| Uebung_01 | 1 | 16 | nichts (Hash gleich) |
| Uebung_02 | 1 | 36 | neu |
| Uebung_03 | 1 | 27 | neu |
| Klausur_TeilA | 1 | 19 | neu (40 Aufgaben, 6 Teile) |
| Anleitungen | 2 | 4 | neu (Git & VS Code, venv) |

Unverändert zur alten Sichtung: 001–003, Analyse-Beispiel, Übung 01, `messdaten.csv`, `002_fft.py`.

## Prüfstand (ehrlich)

- Indiziert und technisch geprüft: alle Seiten.
- Als Text gelesen: nur Indexvorschauen. Seitenweise Lektüre und Originalbild-Sichtung für Formeln, Code und Screenshots stehen noch aus und erfolgen je Etappe vor Übernahme.
- Fachlich geprüft: nichts.
- Keine Fachfreigabe aus Hashgleichheit oder `check` ableiten.

## Stichprobenprüfung der Extraktion (29.10.2026)

**Bildvergleich** (Originalseite bei Maßstab 1,5 gerendert und angesehen, Text per `read` verglichen):

| Dokument, PDF-Seite | Ergebnis |
| --- | --- |
| CuD_Exam_PartA_001, S. 10 | Text vollständig und wortgleich. `␣` steht so im Original. Code-Einrückung (`fehler_anzahl += 1` im Funktionsrumpf) geht verloren. |
| cud_ub_03, S. 5 | Listing 1 vollständig mit Zeilennummern 1–31. Einrückung verloren; zusätzliche Leerzeichen, die im Original fehlen (`ABC , abstractmethod`, `self. person_id`, `strip ()`). |
| 004_Git Versionsverwaltung, S. 6 | Fließtext, Abbildungsbeschriftungen und alle vier Dateizustände vollständig. Pfeilrichtungen der Abbildung 3.1 sind nur im Bild erkennbar. |
| 004b_Vererbung_Python, S. 2 | Extraktion getreu. **Quellfehler:** Das Original zeigt den Python-Code selbst als einen zusammengeflossenen Absatz ohne Zeilenumbrüche; so nicht ausführbar. Konsolenausgabe korrekt. |

**Unabhängige Gegenprüfungen:**

- Seitenzahl je PDF (Rohzählung `/Type /Page`) = `## PDF-Seite`-Abschnitte im Markdown: alle 12 Dokumente stimmen.
- `004b_Vererbung.pdf` per `cmp` byte-identisch mit `004_Git Versionsverwaltung.pdf`.
- Wortabdeckung gegen Poppler `pdftotext` 25.07: kein fehlender Inhalt gefunden. Alle gemeldeten Lücken waren Trennungs- oder Kodierungsartefakte.

**Werkzeugfehler gefunden:** pdfium liefert Silbentrennungen am Zeilenende als `U+FFFE` (z. B. `Code￾zeile`, `Verarbei￾tung`). Das Werkzeug lässt das Zeichen im Markdown stehen (213 Stellen, davon 92 in Übung 02). Folge: `search` findet solche Wörter nicht. Belegt: `Codezeile`, `Anzahl Personengruppe`, `Verarbeitung Zeile`, `Fehlerzähler` → 0 Treffer, `seiten_ausgeblendet` 0; Gegenprobe `Endlosschleife` → Treffer. **Behoben:** Fix in [Sae-l/pdf-seitenweise-sichten#17](https://github.com/Sae-l/pdf-seitenweise-sichten/pull/17) (Branch `fix/silbentrennung-fffe`, noch nicht gemergt). Diese Sichtung wurde am 29.10.2026 mit dem Fix-Branch vollständig neu extrahiert: `check` OK für alle 6 Gruppen, 0 × `U+FFFE`, die vier Suchwörter oben liefern je 1 Treffer.

Weitere Grenze: `extract` bricht ab, wenn Quelle und Ausgabe auf verschiedenen Laufwerken liegen (`path is on mount 'D:', start on mount 'C:'`). Ausgabe daher im Projekt auf D: anlegen.

## Auffälligkeiten

1. `004b_Vererbung.pdf` ist Duplikat von `004_Git Versionsverwaltung.pdf`; Dateiname passt nicht zum Inhalt. Mit dem Dozenten/Quelle klären, ob die echte Vererbungsfolie fehlt.
2. Dateinamen enthalten HTML-Entität `&amp;` (`Git &amp; VS Code …`); Ordner- und Linknamen beim Übernehmen beachten.
3. Übung 02 verlangt `bb12024.csv` (S. 19); Datei fehlt weiter im Referenzordner.
4. Code in Übung 02/03 und Klausur geht beim Extrahieren teils in Einrückung verloren (Klausur S. 10, 16 mit `␣`-Zeichen). Beim Abschreiben immer Originalseite ansehen.
5. Klausurkatalog verlangt: Lösungen nicht erfragen, nur Erklärungen. Übungsmodus beibehalten, keine Musterlösungen aus dem Katalog ableiten.

## Vorbereitung für die Webseite (Lernwerkzeug)

Datengetrieben: `kurs.js` (Vorlesungen), `inhalte.js` (Übungsobjekte), Abdeckung in `ABDECKUNG.md`. Reihenfolge nach Nutzen und Aufwand:

1. **Vorlesung 004 Git** (PDF S. 1–20) und **Anleitungen** (Git & VS Code, venv) → neue Etappe in `kurs.js`, eigene Beispiele.
2. **Vererbung** (`004b_Vererbung_Python`, S. 1–3) → Etappe; Übung 03 liefert Vertiefung.
3. **Übung 02** (36 S., Module 1–6: DRY, Funktionen, try/except, NumPy, Pandas) → Übungsobjekte nach Vorlage `aufgabe-6-1`; Blatt-Präfix in IDs wegen doppelter Aufgabennummern.
4. **Übung 03** (27 S., OOP, JSON, Tkinter) → Übungsobjekte; Tkinter läuft nicht im Browser, nur Lesen/Selbstkontrolle.
5. **Klausurkatalog Teil A** (40 Aufgaben) → Quiz-/Selbsttest-Pool; Teile 1–6 als Themenfilter.

Je Etappe: Seiten lesen → Originalbild bei Code/Formeln → Daten ergänzen → Browser-/Testprüfung nach `CONTRIBUTING.md` → Manifest/Hash erst danach aktualisieren.
