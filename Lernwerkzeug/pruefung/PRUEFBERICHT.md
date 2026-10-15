# Prüfbericht zum Lernraum

Stand: 15.10.2026. Umfang: vorhandener CSV-Pilot und neuer Lernraum für Anfänger.

Ergebnis: **PASS**, mit `../pruefen.cjs` geprüft. Der maschinenlesbare Ausgang steht in `ergebnis.json`; maßgeblich ist dessen aktueller Status. Jeder Lauf setzt ihn zunächst auf RUNNING.

| Prüfung | Ergebnis |
| --- | --- |
| Python-Lernbeispiele | 26 Beispiele einschließlich neun neuer Vorlesungsbeispiele ausgeführt; feste Ausgaben abgeglichen |
| Zusätzliche Befehlsbeispiele | Alle 29 Beispiele ausgeführt; input mit synthetischer Eingabe, Diagramme mit Agg-Backend ohne Fenster |
| CSV-Lösungen 6.1 → 6.2 → 6.3 | Zusammenhängend auf vorhandener CSV ausgeführt und unabhängig mit csv.DictReader und statistics.mean verglichen |
| CSV-Randfälle | Leere Datei, Header ohne Daten, nur Ausreißer, Einzelwert, Leerzeilen, -1/0/50/51, defekte Spalten und Zahlentexte geprüft |
| Suche | 15 Suchfälle einschließlich Synonyme, Umlautschreibung, Aufgabennummer, Syntax und Python-Operatoren bestanden |
| Ansichten | 36 Inhaltsansichten, vier Bereichsübersichten und Startseite: insgesamt 41; IDs, Verknüpfungen und Quellen geprüft |
| Hauptzugänge | Alle fünf Startseitenzugänge vorhanden; Kursreihenfolge 1–9 geprüft |
| Vorhersageaufgabe | Richtige und falsche Auswahl erzeugen passende Rückmeldung |
| Befehlsübersicht | 44 Zeilen, Filter nach Kontext und leere Suche geprüft; passende Verknüpfungen vorhanden |
| Lösungen | Anfangs geschlossen, Hinweise per Enter und Musterlösung per Klick geöffnet; Navigation schließt sie wieder |
| Lokale Verweise | 65 unterschiedliche lokale Verweise vorhanden; CSV-Download bytegleich; Originalseitenbild erfolgreich geöffnet |
| Tastatur | Skip-Link fokussiert Inhalt; Hinweis mit Enter bedienbar; sichtbarer Fokus |
| Schmale Bildschirme | 320 und 390 CSS-Pixel: Startseite, Vorlesungen, Tabelle, Einrichtung und Zeitreihenlektion ohne horizontalen Seitenüberlauf; Übungssuche bedienbar |
| Offlinebetrieb | Chromium per file://, offline; keine automatischen HTTP-Anfragen und keine JavaScript-/Konsolenfehler |
| Originaldateien | Alle acht SHA-256-Werte stimmen mit Referenz_Sichtung/manifest.json überein |

## Ergänzung: Audit und Kompatibilitätsprüfung

Das [Audit](../../AUDIT.md) dokumentiert Befunde, Zuständigkeiten und die lokal integrierten Änderungen. [kompatibilitaet.json](kompatibilitaet.json) enthält die aktuelle Browsermatrix: Chromium 151.0.7922.34, Firefox 153.0 und Playwright-WebKit 26.5 unter Windows. Je Engine wurden 41 Ansichten in sieben Größen geprüft: 320×740, 390×844, 768×1024, 1024×768, 844×390, 1280×800 und 1440×1000. Insgesamt 861 Ansichtsprüfungen ohne horizontalen Seitenüberlauf. Touch-Bedienung von Navigation und Hinweisen wurde zusätzlich bei 390×844 und 768×1024 emuliert.

Regressionen für mobile Menüöffnung/-schließung, Escape, Fokus, gleiche Route, Ctrl-/Cmd-/Shift-/Alt-Klick, Zurück/Vorwärts, unbekannte Route, Operatorsuche und fokussierbare Codefelder bestehen. Bei reduzierter Bewegung sind die berechneten Animationen und Übergänge abgeschaltet. Die Anfragen der Hauptansichten erzeugten keine externen HTTP-Zugriffe oder JavaScript-/Konsolenfehler.

Die gemeinsame Matrix läuft über HTTP an 127.0.0.1 und blockiert andere Ziele. Der separate Inhaltsprüflauf nutzt Chromium per Datei und offline; dort werden weiterhin Quellenlinks, Bilder und Downloads geprüft. Firefox konnte die lokale Startdatei öffnen. Der Windows-Port von WebKit scheiterte beim file://-Aufruf mit einem internen Fehler; für ihn ist nur die HTTP-Nutzung bestätigt. Touch- und Fensteremulation sind keine realen Geräte- oder Safari-Prüfungen.

[pruefer-regression.json](pruefer-regression.json) belegt die beiden isolierten Fehlerpfade: fehlender Pythonpfad und absichtlich falsche Sollausgabe trotz PYTHONOPTIMIZE=1. Beide erzeugen Exit 1 und Status FAIL. Das Integritätswerkzeug besitzt einen bestandenen Selbsttest für Bytes, Hashes und Ausschlüsse. `npm ci --ignore-scripts` und der vollständige `npm test`-Aufruf wurden mit der enthaltenen Lockdatei ausgeführt.

Zusätzliche visuell geprüfte Screenshots: `audit-390.png`, `audit-768.png` und `audit-1440.png`. Die maschinenlesbaren Berichte nennen ihren jeweiligen Prüfzeitpunkt in UTC.

Screenshots: `desktop.png`, `vorlesungen-desktop.png`, `befehle-desktop.png`, `start-mobil.png`, `aufgabe-desktop.png` und `mobil.png`. Neue Startseite, Vorlesungsübersicht, Befehlsübersicht und mobile Startseite wurden visuell angesehen.

Die Prüfung nutzt das vorhandene JavaScript-Playwright und die gebündelten Node-/Python-Laufzeiten. NumPy/Pandas waren vorhanden. Matplotlib 3.11.2, Seaborn 0.13.2 und benötigte Hilfspakete wurden von PyPI ausschließlich in `.test-packages/` ergänzt. Das fehlgeschlagene Anlegen einer Test-venv veränderte keine globale Laufzeit; `.test-env/` wurde anschließend entfernt. Für temporäre Daten wird der Projektordner verwendet. Weder Sicherheitsrichtlinien noch globale Python-Pakete wurden verändert.

## Quellen und fachliche Grenzen

Die CSV-Aufgaben wurden zuvor an Originalseiten 10–11 einschließlich Originalbildern abgeglichen. Die neuen Vorlesungslektionen sind eigene Zusammenfassungen anhand der vorhandenen Textauszüge; jede hat genaue PDF-Verweise. Zusätzliche Miniübungen und Bibliotheksdaten sind selbst erstellt. Die Lesung von Textauszügen ist keine vollständige visuelle Folienprüfung. Ausführung eines Beispiels bestätigt weder alle Aussagen der Vorlesung noch alle späteren Transferaufgaben.

Die Originalquelle nennt einen anderen CSV-Dateinamen, und gedruckte Sollanzahlen passen nicht zur vorhandenen Datei. 0 bis 50 einschließlich bleibt eine dokumentierte Arbeitsannahme. `bb12024.csv` fehlt weiterhin; keine Originalergebnisse dazu behauptet. Die weiteren Originalübungen sind nicht vollständig als Schritt-für-Schritt-Lösungen aufbereitet.

Der Headless-Browser hat hier keinen interaktiven PDF-Betrachter: Dateiziele und Seitenanker sind geprüft, tatsächliche Seitensprünge im interaktiven Betrachter bleiben offen. Diagrammcode wurde ausgeführt, dessen fachliche Gestaltung nicht visuell beurteilt.

Die offiziellen Einrichtungsanleitungen wurden zuvor online abgeglichen. Tatsächliche Installation auf Windows/macOS/Linux, reale Handy-/Tablet-Bedienung, Safari auf Apple-Hardware, Screenreader, Gebrauchstest und Lernerfolg sind nicht geprüft. Die Lernseite führt selbst keinen Python-Code aus.
