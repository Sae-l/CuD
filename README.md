# CuD-1 · Programmieren lernen

Ein lokales Lernwerkzeug für Studierende im Kurs **Coding und Digitalisierung**, auch ohne Programmierkenntnisse: verständliche Vorlesungsetappen, eine Befehlsübersicht, Einrichtungsanleitungen und Begleitung zu den CSV-Aufgaben 6.1–6.3.

Diese Arbeitsfassung erweitert v0.1.0 um Verständnisfragen, lokale Bearbeitungsmarken, einen Abdeckungsplan und ein eigenes Transferprojekt. Der veröffentlichte Release v0.1.0 bleibt unverändert.

**Aufgabe → benötigtes Wissen → passender Befehl → selbst ausprobieren → Ergebnis prüfen**

## In drei Schritten starten

1. Lade den **gesamten Projektordner** über **Code → Download ZIP** herunter und entpacke ihn. Alternativ: `git clone https://github.com/Sae-l/CuD-1.git`. Für den früheren, fest versionierten Stand gibt es [Release v0.1.0](https://github.com/Sae-l/CuD-1/releases/tag/v0.1.0) mit ZIP und `SHA256SUMS`.
2. Öffne [Lernwerkzeug/index.html](Lernwerkzeug/index.html) aus dem entpackten Ordner im Browser. Die GitHub-Dateiansicht zeigt nur den Quelltext.
3. Wähle **Lernweg beginnen**, richte deine Python-Umgebung ein und beginne mit der ersten Vorlesung. **Aktuelle Übung** führt direkt zu Aufgaben 6.1–6.3.

Die Lernwebseite benötigt keine Installation, keinen Paketmanager und kein Konto. Nach dem Herunterladen funktioniert sie lokal und offline. Lass den gesamten Projektordner zusammen, damit die Quellenlinks funktionieren. Deinen Python-Code führst du selbst aus; die Webseite ist eine Lernbegleitung. Externe Downloads und Colab benötigen Internet.

## Handy, Tablet, Windows und Mac

Das Layout passt sich der Fensterbreite an. Auf einem Desktop-Rechner kannst du die Startdatei direkt im Browser öffnen. Auf iOS und Android hängt das Öffnen zusammengehöriger Dateien vom Browser und Dateimanager ab. Falls die lokale Ansicht nicht funktioniert, stelle den **gesamten Repository-Ordner** über einen statischen HTTP-Server bereit; nur `index.html` zu übertragen reicht nicht. [Gerätezugang und Anleitung](Lernwerkzeug/README.md#auf-deinem-gerät-öffnen).

Die automatisierten Browserprüfungen sind in [kompatibilitaet.json](Lernwerkzeug/pruefung/kompatibilitaet.json) dokumentiert: Chromium, Firefox und WebKit auf dem Prüfrechner sowie emulierte Handy- und Tabletgrößen. WebKit auf Windows ersetzt keinen Safari-Test auf einem Mac oder iPad. Echte Geräte, Screenreader und Betriebssysteminstallationen bleiben gesondert zu prüfen. Maßgeblich sind die gespeicherten Ergebnisse und der [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md).

## Was liegt wo?

| Pfad | Inhalt |
| --- | --- |
| [Lernwerkzeug/](Lernwerkzeug/) | Webseite: `index.html`, `styles.css`, `app.js`; Lerninhalte in `inhalte.js` und `kurs.js` |
| [Referenz/](Referenz/) | Unveränderte Kursunterlagen, CSV und Code-Begleitdatei |
| [Referenz_Sichtung/](Referenz_Sichtung/) | [Seitenindex](Referenz_Sichtung/Seitenindex.md), Textauszüge, Originalbilder und Herkunftsnachweise |
| [Lernwerkzeug/pruefung/](Lernwerkzeug/pruefung/) | Browser- und Python-Ergebnisse, Prüfbericht und Screenshots |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Entwicklung einrichten, Änderungen prüfen und beitragen |
| [Abdeckungsplan](Lernwerkzeug/ABDECKUNG.md) | Alle 31 Originalaufgaben, passende Lerntexte und verbleibende Lücken |
| [Erweiterungsanleitung](Lernwerkzeug/ERWEITERN.md) | Neue Vorlesungen, Übungen, eigene Daten und ihre Prüfungen ergänzen |
| [AUDIT.md](AUDIT.md) | Audit, behobene Probleme und verbleibende Grenzen |
| [PROJEKT_MANIFEST.json](PROJEKT_MANIFEST.json) | Dateiintegrität; Prüfung mit `python scripts/manifest.py --check` |

Für Lernende: [Bedienung](Lernwerkzeug/README.md), [Lernkonzept und Quellenabdeckung](Lernwerkzeug/LERNKONZEPT.md), [Gebrauchstest](Lernwerkzeug/GEBRAUCHSTEST.md). Für die Projektplanung: [Arbeitsplan](ARBEITSPLAN_Lernwerkzeug.md) und [Skill-Recherche](SKILL_RECHERCHE.md).

## Inhaltliche Grenzen

Hinweise und Musterlösungen öffnest du einzeln. Lösungstexte und Zahlenantworten erscheinen nicht in Suchvorschauen. Lerntexte, Miniübungen und Musterlösungen sind selbst erstellt und von Originalaufgaben unterschieden.

**Reicht das für alle Vorlesungen und Aufgaben? Noch nicht vollständig.** Drei von 31 Originalaufgaben sind geführt begleitet. Die Vorlesungen 001–003 werden kompakt erklärt; die übrigen Aufgaben brauchen eigene Bearbeitung. bb12024.csv fehlt, und FFT ist noch nicht als Lektion aufbereitet. Der [Abdeckungsplan](Lernwerkzeug/ABDECKUNG.md) zeigt die genaue Zuordnung.

Jede der neun Lektionen enthält eine Verständnisfrage mit begründeter Rückmeldung. Nach selbst geschriebener und geprüfter Miniübung kannst du eine Bearbeitungsmarke setzen. Sie wird nur im selben Browser gespeichert; bei blockierter Speicherung gilt sie für die Sitzung. Keine Anmeldung, Übertragung oder Synchronisation. Eine Marke ist deine Selbsteinschätzung, kein Kompetenznachweis.

Die Originalaufgabe nennt `sensor_messdaten_projekt.csv`; vorhanden ist `messdaten.csv`. Das Werkzeug verwendet diese vorhandene Datei. Ihre Zuordnung ist nicht vom Kurs bestätigt; die gedruckten Sollausgaben weichen ab. Die inklusive Filtergrenze **0 bis 50** ist eine dokumentierte Arbeitsannahme.

Technische Tests belegen keinen Lernnutzen. Gebrauchstest, vollständige visuelle Folienprüfung und Begleitung aller weiteren Originalaufgaben stehen aus. Für den fehlenden Datensatz `bb12024.csv` gibt es keinen Laufnachweis. `002_fftpy.sec` ist archiviert, aber nicht ausgeführt oder fachlich geprüft. PDF-Seitensprünge hängen vom Betrachter ab; verwendete Originalseiten sind zusätzlich als Bilder verlinkt.

## Aufbewahrung und Rechte

Dieses Repository dient als private Projektablage. Originalunterlagen behalten ihre jeweilige Herkunft; eine übergreifende Lizenz für fremde Kursmaterialien wird hier nicht vergeben. Originaldateien bleiben unverändert, einschließlich des byte-identischen doppelten Analyse-PDFs. `.gitattributes` verhindert automatische Zeilenumwandlungen beim Git-Transfer. Temporäre Arbeitsdateien und lokale Browserprotokolle werden über `.gitignore` ausgeschlossen.
