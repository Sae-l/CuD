# CuD-1

Lokales Lernwerkzeug für **Coding und Digitalisierung**. Aufgaben, Befehle, Erklärungen und Fehlerhilfe sind über dieselben Inhalte und eine gemeinsame Suche verbunden.

**Aufgabe → benötigtes Wissen → passender Befehl → selbst ausprobieren → Ergebnis prüfen**

## Starten

1. Lade das gesamte Repository über **Code → Download ZIP** herunter und entpacke es. Alternativ: `git clone https://github.com/Sae-l/CuD-1.git`.
2. Öffne **[Lernwerkzeug/index.html](Lernwerkzeug/index.html)** aus dem entpackten Ordner im Browser. Die GitHub-Dateiansicht führt die Webseite nicht aus.
3. Wähle Aufgabe 6.1 oder suche beispielsweise nach `CSV einlesen`, `6.2`, `Durchschnitt` oder `ValueError`.

Die Webseite funktioniert offline ohne Installation, Konto, Server oder externe Dienste. Der gesamte Ordner muss zusammenbleiben, damit die Quellenlinks funktionieren. Python-Code führst du selbst im Editor aus; die Webseite führt ihn nicht aus. [Ausführliche Bedienung und Testaufruf](Lernwerkzeug/README.md).

## Enthaltene Informationen

| Bereich | Einstieg | Inhalt |
| --- | --- | --- |
| Lernwebseite | [Startseite](Lernwerkzeug/index.html) | Pilot für Aufgaben 6.1–6.3, 15 Lernbausteine, 5 Fehlerhilfen, Arbeitsablauf und Quellenstand |
| Originalunterlagen | [Referenz](Referenz/) | 6 PDF-Dateien, vorhandene CSV und Code-Begleitdatei; unverändert übernommen |
| Quellenerschließung | [Seitenindex](Referenz_Sichtung/Seitenindex.md) | Seitenweise Textauszüge, ausgewählte Originalbilder und Herkunftsmanifest |
| Sichtungsumfang | [Sichtungsbericht](Referenz_Sichtung/Sichtungsbericht.md) | Tatsächlich gelesene bzw. angesehene Seiten und offene Quellenfragen |
| Planung | [Arbeitsplan](ARBEITSPLAN_Lernwerkzeug.md) | Ziel, Inhaltsstruktur, Arbeitspakete und Abnahmekriterien |
| Technische Nachweise | [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md) | Python-, Browser-, Link- und Originaldateiprüfungen; Screenshots und maschinenlesbares Ergebnis im selben Ordner |
| Gebrauchstest | [Testbogen](Lernwerkzeug/GEBRAUCHSTEST.md) | Fünf noch durchzuführende Such- und Lernfälle |
| Skill-Recherche | [Recherche](SKILL_RECHERCHE.md) | Vorgehen, überprüfter GitHub-Skill und vorhandene Werkzeuge |
| Dateiintegrität | [Projektmanifest](PROJEKT_MANIFEST.json) | Dateigrößen, SHA-256 und Git-Blob-Hashes der enthaltenen Projektdateien; das Manifest selbst ist ausgenommen |

Hinweise und Musterlösungen sind einzeln aufklappbar. Lösungstexte und Zahlenantworten werden nicht für Suchvorschauen verwendet. Begleittexte, Miniübungen und Musterlösungen sind selbst erstellt und von den Originalaufgaben unterschieden.

## Stand und Grenzen

Stand: **15.10.2026**. Der erste Pilot ist technisch geprüft: 17 Python-Beispiele, zusammenhängende Lösungen mit Randfällen, 12 Suchanfragen, 25 Inhaltsansichten und 36 lokale Verweise. Die Browserprüfung lief mit Chromium direkt per Datei im Offline-Modus, einschließlich 320 und 390 Pixel breiter Ansichten. Alle 8 Originaldateien stimmen mit den vorhandenen SHA-256-Werten überein. Weitere Browser und Screenreader sind nicht geprüft.

Die Originalaufgabe nennt `sensor_messdaten_projekt.csv`; vorhanden ist `messdaten.csv`. Der Pilot verwendet ausdrücklich diese vorhandene Datei. Ihre Zuordnung ist nicht vom Kurs bestätigt; auch die gedruckten Sollausgaben weichen ab. Die inklusive Filtergrenze **0 bis 50** ist eine sichtbar dokumentierte Arbeitsannahme. PDF-Ziele und Seitenanker sind geprüft; der tatsächliche Seitensprung im interaktiven PDF-Betrachter bleibt offen. Deshalb stehen die verwendeten Originalseiten zusätzlich als Bilder bereit.

Der Gebrauchstest und ein Nachweis des Lernnutzens stehen aus. Die restlichen Modulunterlagen sind noch nicht vollständig erschlossen. NumPy, Visualisierung, Pandas, Zeitreihen und OOP gehören zur geplanten Erweiterung. Für den fehlenden Datensatz `bb12024.csv` gibt es keinen Laufnachweis. Die Quelldatei `002_fftpy.sec` ist archiviert, aber nicht ausgeführt oder fachlich geprüft.

## Aufbewahrung und Rechte

Dieses Repository dient als private Projektablage. Originalunterlagen behalten ihre jeweilige Herkunft; eine übergreifende Lizenz für fremde Kursmaterialien wird hier nicht vergeben. Originaldateien bleiben unverändert, einschließlich des byte-identischen doppelten Analyse-PDFs. `.gitattributes` verhindert automatische Zeilenumwandlungen beim Git-Transfer.

Lokale Browserprotokolle und temporäre Upload-Arbeitsdateien gehören nicht zum Projektinhalt und werden über `.gitignore` ausgeschlossen.
