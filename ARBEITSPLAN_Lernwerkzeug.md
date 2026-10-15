# Arbeitsplan: Lernwerkzeug für Coding und Digitalisierung

Stand: 15.10.2026. Status: Bestehender Pilot zum Anfänger-Lernraum erweitert; Gebrauchstest und vollständige Begleitung aller Originalaufgaben offen.

## Aktuelle Designvorgabe und Erweiterung

Die neue Nutzervorgabe ersetzt den früheren suchezentrierten Einstieg: attraktive Willkommensseite, Vorlesungen in Quellenreihenfolge, separater Zugang zur aktuellen Übung, Befehlsübersicht mit Beispielen und Kontext sowie getrennte Python- und VS-Code-Anleitungen. Umgesetzt sind neun Vorlesungsetappen mit PRIMM-Miniübungen, zwei Einrichtungsanleitungen und 44 Befehlsgruppen. Aktuelle Übung bezeichnet den vorhandenen Block 6.1–6.3, keinen automatisch ermittelten Kurstermin.

Maßgebliche Beschreibung: [Lernkonzept und Abdeckung](Lernwerkzeug/LERNKONZEPT.md). Aktuelle Nachweise: [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md). Die nachstehenden Abschnitte dokumentieren auch die Ausgangsplanung des Piloten; ihre früheren Erweiterungsziele sind teilweise umgesetzt.

## Umgesetzter Pilot

Einstieg: [Lernwerkzeug/index.html](Lernwerkzeug/index.html), direkt lokal im Browser öffnen. [Bedienung und Testaufruf](Lernwerkzeug/README.md), [technischer Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md) und [Gebrauchstest](Lernwerkzeug/GEBRAUCHSTEST.md).

- Aufgaben 6.1–6.3 an den Originalseiten 10–11 abgeglichen; 15 gemeinsame Lernbausteine, 5 Fehlerhilfen, 1 Arbeitsablauf und Quellenstand aufbereitet.
- Suche, Filter, Aufgabenverknüpfungen, getrennt aufklappbare Hinweise und Musterlösungen sowie relative PDF-, Bild- und CSV-Verweise umgesetzt. Beispiele und Begleitung sind selbst erstellt und als solche eingeordnet.
- 17 Python-Beispiele und die zusammenhängenden Lösungen einschließlich Randfällen ausgeführt; Browserprüfung mit 12 Suchanfragen, allen 25 Ansichten und 36 lokalen Verweisen bestanden. Lokal per Datei, offline, Desktop und 320/390 Pixel breite Ansichten geprüft. Originaldateien gegen alle 8 vorhandenen SHA-256-Werte unverändert.
- Die vorhandene `messdaten.csv` wird ausdrücklich als lokale Arbeitsdatei verwendet; abweichender Dateiname und Sollausgaben bleiben sichtbar offen. Inklusive Intervallgrenzen sind als Arbeitsannahme bezeichnet.
- Die Erschließung der übrigen Quellen (Arbeitspaket 1 insgesamt), der Gebrauchstest und Arbeitspaket 6 sind nicht abgeschlossen. Lernnutzen und der Sprung des interaktiven PDF-Betrachters zur gewünschten Seite sind nicht nachgewiesen; die Originalseiten sind deshalb zusätzlich als Bilder erreichbar.

## Ziel und Leitentscheidung

Eine deutschsprachige, lokal nutzbare Webseite begleitet die Übungen des Moduls. Du findest über eine gemeinsame Suche Befehle, Begriffe, Arbeitsschritte und passende Aufgaben. Jeder übernommene Inhalt verweist auf Dokument, PDF-Seite und gegebenenfalls Aufgabennummer.

Der zentrale Zusammenhang lautet: **Aufgabe → benötigtes Wissen → passender Befehl → eigenes Ausprobieren → Ergebnis prüfen**. Die Suche und die Aufgabenansicht greifen auf denselben Inhalt zu. Ein Befehl wird einmal erklärt und aus mehreren Aufgaben verlinkt.

## Ausgangslage

- Quellen: [Referenz](Referenz/), erschlossen durch [Seitenindex](Referenz_Sichtung/Seitenindex.md) und [Sichtungsbericht](Referenz_Sichtung/Sichtungsbericht.md).
- 6 PDF-Dateien mit 83 Seiten; 5 unterschiedliche Inhalte mit 80 Seiten. Das doppelte Analyse-Beispiel wird als ein Inhalt mit zwei Quelldateien geführt.
- Bisher wurden 19 Seiten als Text gelesen und 10 Originalseiten als Bild angesehen. Vollständige inhaltliche Erschließung steht aus.
- Bekannte offene Punkte: abweichender CSV-Dateiname, nicht vollständig passende Sollausgaben, fehlende `bb12024.csv`, verlorene Code-Einrückungen und Inhalte in Screenshots.
- Die Originaldateien bleiben erhalten. Der Seitenindex dient der Navigation; er ist noch kein geprüftes Lernmaterial.

## Aufbau aus Sicht des Lernenden

| Bereich | Deine Frage | Inhalt |
| --- | --- | --- |
| Suche | „Wie lese ich eine CSV ein?“ | Treffer aus allen Bereichen, mit kurzer Antwort und passender Aufgabe |
| Befehle & Begriffe | „Was macht `len()`? Was ist eine Liste?“ | Syntax, verständliche Erklärung, kleines Beispiel, Stolperstelle und Quelle |
| Übungen | „Was brauche ich für Aufgabe 6.2?“ | Lernziel, Voraussetzungen, verknüpfte Befehle, Arbeitsschritte, gestufte Hinweise und Selbstkontrolle |
| Arbeitsabläufe | „Wie gehe ich von einer Datei zum Diagramm?“ | Zusammenhängende Schritte mit Verweisen auf Befehle und Übungen |
| Fehlerhilfe | „Warum bekomme ich einen `ValueError`?“ | Fehlermeldung, typische Ursache, gezielte Prüfschritte und kleines Gegenbeispiel |

Die Startansicht zeigt den Willkommenstext, eine kleine Vorhersageaufgabe und die fünf Hauptzugänge. Die gemeinsame Suche bleibt von jeder Ansicht aus verfügbar. Vorlesungen führen Anfänger von der Einrichtung bis zu einem eigenen Analyseprojekt.

Desktop: links Themen und Übungen, in der Mitte Suchtreffer bzw. Lerninhalt, direkt beim Inhalt die zugehörigen Aufgaben und Quellen. Auf schmalen Bildschirmen stehen diese Bereiche untereinander. Navigation und Suche sind mit Tastatur bedienbar, Fokus und Beschriftungen sichtbar.

## Fachliche Themenstruktur

Die Gliederung folgt den vorhandenen Unterlagen; die genaue Zuordnung der einzelnen Aufgaben wird beim Lesen bestätigt.

1. **Arbeitsumgebung:** Python, Editor, Terminal, Dateien und Projektordner.
2. **Python-Grundlagen:** Variablen, Datentypen, Typumwandlung, Zeichenketten und Ausgabe.
3. **Programmlogik:** Bedingungen, Vergleiche, Schleifen, Listen und Dictionaries.
4. **Dateien und klassische Analyse:** CSV lesen, Daten umwandeln, filtern, zählen und Kennzahlen berechnen.
5. **NumPy:** Arrays, Rechenoperationen, boolesche Masken und Statistik.
6. **Visualisierung:** Matplotlib, Subplots, Achsen und Seaborn.
7. **Funktionen und Fehlerbehandlung:** Parameter, Rückgabewerte, Scope, `try` und `except`.
8. **Pandas:** DataFrames, Import, Sichtung, Auswahl und Datenbereinigung.
9. **Zeitreihen:** Zeitstempel, DatetimeIndex, Resampling und Interpolation.
10. **Objektorientierung:** Klassen, Konstruktoren, Attribute, Methoden und Abschlussübung.

Die Reihenfolge eines Lernwegs darf von der Reihenfolge der PDF-Dateien abweichen. Voraussetzungen werden sichtbar verlinkt.

## Einheitliche Lernbausteine

### Befehls- und Begriffseintrag

Jeder Eintrag beantwortet knapp:

- **Wofür brauche ich das?** Eine konkrete Tätigkeit aus dem Modul.
- **Wie schreibe ich es?** Syntax und ein kleines, verständliches Beispiel; Terminalbefehl und Python-Code sind klar beschriftet.
- **Was passiert dabei?** Bedeutung wichtiger Parameter und Rückgabewerte, gegebenenfalls Ein- und Ausgabe.
- **Worauf muss ich achten?** Eine relevante Stolperstelle oder ein wichtiger Unterschied.
- **Wo brauche ich es?** Verknüpfte Übungen und verwandte Befehle.
- **Woher stammt es?** Originalquelle oder Kennzeichnung als selbst erstellte Ergänzung.

Beispiele für Einträge sind `print()`, `float()`, `len()`, `with open(...)`, Listen, `np.array()`, boolesche Masken und `pd.read_csv()`.

### Aufgabenbegleitung

Eine Aufgabenansicht enthält:

1. Aufgabennummer, Quelle und verständlich formuliertes Ziel.
2. Voraussetzungen und die relevanten Lernbausteine.
3. Vorgehen als überschaubare Arbeitsschritte.
4. Hinweise, die einzeln auf Wunsch geöffnet werden.
5. Eine Selbstkontrolle: Was soll der eigene Code leisten? Welche Randfälle sind sinnvoll?
6. Eine getrennt aufklappbare, erklärte Musterlösung, sobald sie geprüft ist.

Selbst erstellte Miniübungen werden als solche bezeichnet. Originalaufgaben behalten ihre Nummern. Suchtreffer und Aufgabenansichten zeigen Musterlösungen und Zahlenantworten standardmäßig nicht an.

### Durchgehender Arbeitsablauf

Der erste Ablauf lautet: **Datei finden → CSV einlesen → Spalten verstehen → Werte umwandeln → ungültige Werte behandeln → Kennzahlen berechnen**. Später kommen NumPy, Diagramme und Pandas hinzu. Hier wird auch die nötige Projektstruktur erklärt: Wo liegen Skript und Daten? Welcher Pfad wird im Programm verwendet?

## Suche

Die Suche verarbeitet Syntax und Alltagssprache. Beispiele:

| Eingabe | Gewünschter Zugang |
| --- | --- |
| `CSV einlesen`, `Datei öffnen`, `open` | Dateiimport und passende Aufgabe |
| `Mittelwert`, `Durchschnitt`, `mean` | Klassische Berechnung und NumPy im Vergleich |
| `Ausreißer`, `Ausreisser`, `filtern` | Filterbedingungen, Listen und boolesche Masken |
| `6.2` | Die konkrete Aufgabe mit benötigten Befehlen |
| `ValueError`, `float geht nicht` | Typumwandlung und Fehlerhilfe |

In Version 1 genügen gepflegte Suchbegriffe und eine einfache Gewichtung: exakte Aufgabennummer oder Syntax zuerst, danach Titel und Synonyme, anschließend Erklärungstext. Groß-/Kleinschreibung und Schreibweisen wie `ä/ae` bzw. `ß/ss` werden berücksichtigt. Mehrere Suchwörter werden gemeinsam ausgewertet.

Treffer zeigen Titel, Art des Inhalts, kurzen Kontext und die zugehörige Aufgabe. Es gibt Filter nach Thema und Inhaltsart. Bei keinem Treffer werden passende Suchbegriffe bzw. Themen angeboten. Versteckte Lösungstexte werden nicht als Antwortvorschau verwendet.

## Technische Umsetzung

Empfehlung für die erste Version: statische Webseite mit HTML, CSS und JavaScript. Sie soll direkt lokal im Browser funktionieren und ihre Inhalte ohne Internet laden. Für die vorhandene Materialmenge planen wir eine einfache Suche im Browser; deren Brauchbarkeit wird mit konkreten Suchfällen geprüft.

Vorgesehene Dateien:

```text
Lernwerkzeug/
  index.html       Oberfläche und zugängliche Grundstruktur
  styles.css      Darstellung für Desktop und schmale Bildschirme
  app.js          Suche, Navigation und aufklappbare Hinweise
  inhalte.js      Gemeinsame Daten für Lernbausteine und Aufgaben
```

Inhalte werden über stabile IDs miteinander verknüpft. Ein Lernbaustein speichert Titel, Art, Thema, Suchbegriffe, Erklärung, Beispiel, Quellen und Prüfstatus. Aufgaben referenzieren benötigte Bausteine per ID. So lassen sich Erklärungen einmal korrigieren, ohne mehrere Kopien zu pflegen.

PDF-Verweise und Quellbilder bleiben relativ zum Projekt verlinkt. Vorhandene Windows-Pfadtrenner in generierten Links werden vor der Browsernutzung normalisiert und im Browser geprüft. Benutzertexte werden als Text dargestellt; Quellinhalte werden nicht als ausführbarer Code interpretiert.

## Arbeitspakete und Abnahme

| Schritt | Arbeit | Konkretes Ergebnis / Fertig, wenn … |
| --- | --- | --- |
| 1. Quellen zuordnen | Die 80 unterschiedlichen Seiten abschnittsweise lesen; relevante Code-Screenshots und Darstellungen ansehen; Aufgaben und Begriffe erfassen. | Jede fachlich relevante Seite hat zugeordnete Themen oder einen dokumentierten offenen Punkt. Duplikate sind zusammengeführt. |
| 2. Pilotinhalte erstellen | Zuerst Aufgaben 6.1–6.3 begleiten: CSV einlesen, filtern und auswerten. Etwa 10–15 benötigte Lernbausteine, ein Arbeitsablauf und passende Fehlerhilfe erstellen. | Alle drei Aufgaben sind von den benötigten Voraussetzungen bis zur Selbstkontrolle verbunden. Erklärungen und Code sind am Original geprüft. |
| 3. Suchbare Webseite bauen | Suche, Themenzugang, Aufgabenansicht, Quellverweise und gestufte Hinweise umsetzen. | Der Pilot funktioniert lokal; Navigation, mobile Darstellung und Tastaturbedienung sind geprüft. |
| 4. Inhalt und Verhalten prüfen | Kleine Beispiele ausführen; Suche mit festen Anfragen testen; Quellen, Links, Aufgabenverknüpfungen und verborgene Lösungen kontrollieren. | Beispiele haben nachvollziehbare Ergebnisse; Suche findet die vorgesehenen Einträge; ungelöste Quellwidersprüche sind sichtbar gekennzeichnet. |
| 5. Gebrauchstest | Du bearbeitest Aufgaben 6.1–6.3 mit dem Werkzeug. Wir halten fest, wo du trotzdem suchen oder nachfragen musst. | Die fünf Suchfälle unten wurden ausprobiert und die beobachteten Hürden korrigiert. Technische Tests allein bestätigen noch keinen Lernerfolg. |
| 6. Modul vollständig ergänzen | Das bewährte Muster auf die übrigen Übungen und Themen übertragen, einschließlich NumPy, Visualisierung, Pandas, Zeitreihen und OOP. | Eine Abdeckungstabelle ordnet alle vorhandenen Aufgaben und relevanten Themen ihren Lernbausteinen zu; Lücken sind ausdrücklich benannt. |

Schritte 2–5 sind die erste nutzbare Version. Schritt 6 gehört zum vollständigen Ziel und wird nach dem Gebrauchstest auf derselben Grundlage fortgesetzt.

### Fünf konkrete Such- und Gebrauchsfälle

1. „Wie öffne ich die CSV?“ führt zu einem passenden Lernbaustein und Aufgabe 6.1.
2. „6.2“ zeigt das Ziel, nötige Befehle und Hinweise, ohne die vollständige Lösung zu verraten.
3. „Durchschnitt“ findet denselben fachlichen Zugang wie „Mittelwert“.
4. Eine fehlgeschlagene Zahlenumwandlung lässt sich über `ValueError` und über Alltagssprache nachschlagen.
5. Von einem Lernbaustein lässt sich die richtige PDF-Quelle samt Seitenangabe öffnen.

Ziel für den Gebrauchstest: den passenden Einstieg jeweils innerhalb von ungefähr 30 Sekunden finden. Das ist ein Abnahmekriterium, noch kein gemessenes Ergebnis.

## Fachliche Qualität

- Für kopierbaren Code werden Einrückungen und Sonderzeichen am Original geprüft; Textauszüge werden nicht blind übernommen.
- Prüfzustände unterscheiden „aus Quelle übernommen“, „am Original abgeglichen“ und „Beispiel ausgeführt“. Eine technische Ausführung bestätigt nicht automatisch alle fachlichen Aussagen.
- Unstimmigkeiten bleiben als Quellhinweis erkennbar. Eigene Korrekturen werden begründet und nicht als Aussage der Vorlesung ausgegeben.
- Für fehlende Daten gibt es keinen behaupteten Laufnachweis. Kleine selbst erstellte Datensätze dürfen für Lernbeispiele verwendet werden, wenn sie ausdrücklich so bezeichnet sind.
- Kursbezogene Inhalte werden aus den vorhandenen Unterlagen erarbeitet. Versionsabhängiges Verhalten wird bei Bedarf mit offizieller Dokumentation abgeglichen.

## Passende Skills

Die Recherche mit `find-skills` hat zwei passende Skills ergeben, deren lokale Dateien bereits vorhanden und gelesen sind:

| Skill | Einsatz | Verzeichnisangabe bei Recherche |
| --- | --- | --- |
| [frontend-design](https://skills.sh/anthropics/skills/frontend-design) | Suchoberfläche, lesbare Codebeispiele, Navigation und Gestaltung | rund 989.000 Installationen |
| [webapp-testing](https://skills.sh/anthropics/skills/webapp-testing) | Prüfung von Suche, Navigation und Bedienung im Browser | rund 178.000 Installationen |

Beide werden im Verzeichnis `anthropics/skills` zugeordnet. Das [Quellrepository](https://github.com/anthropics/skills) wurde ebenfalls geprüft; es weist rund 181.000 Sterne aus. Diese Zahlen sind eine Momentaufnahme und kein Qualitätsnachweis für unsere Lerninhalte. Installation ist derzeit nicht erforderlich.

Die im Verzeichnis angegebenen Installationsbefehle für einen späteren Bedarf lauten:

```text
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/anthropics/skills --skill webapp-testing
```

`pdf-seitenweise-sichten` bleibt die Grundlage für die Quellenarbeit. Für Gestaltung und Browsertests werden die genannten Skills erst bei den entsprechenden Arbeitspaketen angewendet.

## Bewusst zurückgestellt

Für Version 1 sind Benutzerkonto, Cloud-Synchronisierung, KI-Chat, Python-Ausführung im Browser und ein umfangreiches Framework nicht eingeplant. Favoriten, eigene Notizen und Lernfortschritt können nach dem Gebrauchstest ergänzt werden; bei dauerhafter Speicherung gehört dann eine einfache Sicherungs- und Exportmöglichkeit dazu.

Nächster Schritt: den vorhandenen Pilot für Aufgaben 6.1–6.3 im Gebrauchstest erproben und beobachtete Hürden korrigieren. Danach die übrigen Quellen abschnittsweise erschließen und das Modul auf derselben Grundlage ergänzen.

Noch nicht geprüft: vollständige fachliche Abdeckung, weitere Browser, interaktives PDF-Betrachterverhalten und tatsächlicher Lernnutzen. Die Browserfunktion des Piloten ist im oben dokumentierten Chromium-Umfang geprüft. Bekannte Quellwidersprüche und fehlende Datensätze bleiben offen; die Musterlösungen sind sichtbar auf die vorhandene Datei und die dokumentierte Intervallannahme begrenzt.
