# Lernraum für Studienanfänger

Stand: 15.10.2026. Umsetzung auf Basis des bestehenden Werkzeugs; Originalquellen unverändert.

## Ziel und Gestaltung

Studierende ohne Programmierkenntnisse beginnen mit einer Willkommensseite und Zugängen zu Vorlesungen, aktueller Übung, Befehlen, Einrichtung, eigenem Transferprojekt und Abdeckungsplan. Die erste kleine Vorhersageaufgabe gibt direkt Rückmeldung. Der aktuelle Übungszugang bezeichnet den aufbereiteten Block 6.1–6.3; es gibt keine Anbindung an einen Stundenplan.

Palette: Schrift #203e4a, Nebeninformationen #526c77, Aktionen #14665f, Hintergrund #ffffff, Navigationsfläche #f1f7f8, Hinweise #fff5dc. Lokale Segoe UI/Calibri und eine Monospace-Schrift für Code vermeiden externe Schriftanfragen. Links ausgerichtete Texte, kurze Absätze und ein breiter Inhaltsbereich für Übersichten; die Tabelle scrollt innerhalb ihres eigenen Bereichs. Keine dekorativen Animationen und keine zusätzlichen Web-Abhängigkeiten.

## Lernkonzept

Die Lektionen folgen **PRIMM**: Vorhersagen, Ausführen, Untersuchen, Verändern, Selbst schreiben. Das führt vom Lesen eines funktionierenden Beispiels zum eigenen Programm. Grundlage: [Raspberry Pi Foundation, PRIMM](https://www.raspberrypi.org/blog/using-primm-to-teach-programming-a-new-short-course-for-educators/) und [Computing pedagogy](https://www.raspberrypi.org/teach/pedagogy).

Jede Lektion nennt ein Lernziel, erklärt wenige zusammenhängende Begriffe, zeigt ein eigenständig ausführbares Mini-Beispiel und endet mit Änderungs- und Transferaufgaben. Beispielausgabe und Selbstkontrolle bleiben zunächst geschlossen. Die bestehenden Originalaufgaben behalten ihre gestuften Hinweise und getrennten Lösungen. Die Lernenden wiederholen die eigene Aufgabe am nächsten Tag und nach einer Woche ohne Vorlage; es gibt keine automatische Erinnerung oder behauptete Kompetenzmessung.

Nachträglich ergänzt: Eine Verständnisfrage je Lektion behandelt einen typischen Denkfehler und begründet jede Rückmeldung. Bearbeitungsmarken bleiben freiwillige lokale Selbsteinschätzungen. Das eigene Transferprojekt verbindet CSV, Zeitraster, begrenzte Interpolation und Klassen mit vier synthetischen Datenzeilen. Herkunft der Schätzungen bleibt als Maske sichtbar; Restlücken verhindern den Report. [Abdeckung und Ausbauweg](ABDECKUNG.md) begrenzen die Aussage über den gesamten Kurs.

Das Konzept ist eine begründete Auswahl. Technische Prüfungen belegen Funktion und ausführbare Beispiele, keinen Lernerfolg. Ein Gebrauchstest mit tatsächlichen Anfängern bleibt notwendig.

## Reihenfolge und Quellenabdeckung

Die Reihenfolge folgt 001, 002 und 003. Einrichtung wird als Voraussetzung vorgezogen. Organisation und Prüfungsangaben bleiben in den verlinkten vollständigen Original-PDFs. Die Lerntexte sind selbst verfasste Zusammenfassungen anhand der Textauszüge, keine vollständige Übertragung jeder Folie oder jedes Beispiels.

| Etappe | Inhalt | Original, PDF-Seiten |
| --- | --- | --- |
| Einrichtung | Python, Projektordner, venv, Editor, erster Test | 001: 16–20; 002: 6; offizielle aktuelle Anleitungen |
| 1 | Programm, Interpreter, Syntax, Kommentare, Einrückung | 001: 4–7, 16–20 |
| 2 | Variablen, Typen, Operatoren, Bedingungen | 001: 8–10, 15 |
| 3 | Schleifen, Listen, Tupel, Dictionaries, Module | 001: 11–14; 002: 3 |
| 4 | Klassische Analyse, Median, NumPy, Masken, Diagramme | 002: 3–6; Analysebeispiel: 1–3; Übung: 10–11 |
| 5 | DRY, Funktionen, Parameter, Rückgaben, Scope, Fehler | 003: 3–10 |
| 6 | DataFrame, Import, Struktur, Statistik, Auswahl | 003: 11–18 |
| 7 | NaN, Plausibilität, Löschen, Füllen, Schätzen | 003: 19–22 |
| 8 | Datetime, Zeitindex, Resampling, Zeitfenster | 003: 23–26 |
| 9 | Klassen, Attribute, Methoden, Analyseprojekt | 003: 27–32 |
| 10 | Abtastrate, Frequenzraster, FFT und Clipping | Begleitcode 002_fftpy.sec und offizielle NumPy-Dokumentation |

Seaborn, input, f-Strings und Diagnosehinweise ergänzen die Vorlesungsübersicht als eigene didaktische Hilfen. Abweichungen von vereinfachten Folienbeispielen sind bewusst: Leere Mittelwerte werden nicht als Messwert 0 ausgegeben; NaN braucht mehr als ValueError-Behandlung; Resampling wird nicht ausschließlich auf DatetimeIndex beschränkt. Bibliotheksbeispiele verwenden synthetische Daten. Die fehlende bb12024.csv und die offenen CSV-Widersprüche bleiben bestehen.

## Technischer Umfang

Betroffen sind `index.html` (Navigation), `app.js` (Ansichten und Suche), `styles.css` (Layout), `kurs.js` (Lektionen, Einrichtung, Abdeckungsplan und Befehlsdaten), das bestehende `pruefen.cjs`, Dokumentation und Integritätsmanifest. Alle bisherigen Inhalts-IDs und Originalaufgaben bleiben erreichbar. Die Tabelle verbindet die 15 vorhandenen Bausteine mit nun 34 zusätzlichen Befehlsgruppen; Kontext bedeutet geeignete Datentypen und Voraussetzungen, keine pauschale Kompatibilitätsgarantie. Die Suche erfasst jetzt auch die offen lesbaren Erklärungsblöcke; Hinweise, Lösungen und Quizantworten bleiben außerhalb des Suchindex.

## Einrichtung und Grenzen

Downloads und Hinweise wurden mit [Python für Windows](https://docs.python.org/3/using/windows.html), [Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial), [VS Code Web](https://code.visualstudio.com/docs/remote/vscode-web), [Colab FAQ](https://research.google.com/colaboratory/faq.html), [NumPy](https://numpy.org/doc/stable/user/absolute_beginners.html) und [Pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html) abgeglichen. iPad/Android erhalten einen ausdrücklich externen Browserweg mit Colab; Windows-Tablets folgen der PC-Anleitung. Der Webeditor allein stellt keine normale lokale Python-Installation bereit. Die tatsächliche Installation auf den Geräten wurde nicht durchgeführt.

Keine Anmeldung, Cloud-Speicherung oder Python-Laufzeit in der Lernseite ergänzt. Bearbeitungsmarken liegen nur im lokalen Browser; gesperrte Speicherung führt zum Sitzungsbetrieb. Python wird im eigenen Editor oder dem bewusst gewählten externen Notebook ausgeführt. Version 0.2.0 enthält die Lernkontrollen, alle 31 Aufgabenbegleitungen, vier Live-Übungen und eine eigene FFT-Einführung. Für fehlende Originaldaten und nicht geprüften Lernnutzen gelten weiterhin die Grenzen im Abdeckungsplan.
