# Reicht der Lernraum für den ganzen Kurs?

**Als Begleitung und Nachschlagewerk ja; als alleiniger vollständiger Python-Kurs mit Begleitung aller Originalaufgaben noch nicht.** Ein gelesenes Beispiel, eine richtige Auswahlfrage oder eine Bearbeitungsmarke bestätigt noch nicht, dass du selbst programmieren kannst.

Stand des Abgleichs: 15.10.2026, nach Release v0.1.0 lokal erweitert. Maßgeblich für diese Arbeitsfassung sind die Dateien im Projektordner; das veröffentlichte v0.1.0 enthält die nachträglichen Verbesserungen noch nicht.

## Was du lernen und anwenden kannst

| Vorhandene Quelle | Lernbegleitung | Was für eine vollständige Anwendung noch fehlt |
| --- | --- | --- |
| 001, PDF-S. 4–20 | Lektionen 1–3, Einrichtung, Operatoren, Entscheidungen, Schleifen und Sammlungen | Mehr selbst geschriebene Programme; besonders while, mehrere Bedingungen und Listen von Dictionaries |
| 002, PDF-S. 3–6 | Lektion 4 und Befehlsbeispiele zu Arrays, Masken und Installation | Originalaufgaben ausführen und Unterschiede zur Listenverarbeitung selbst erklären |
| Analysebeispiel, PDF-S. 1–3 | Statistik und Diagrammgrundlagen in Lektion 4; beide Analyse-PDFs sind bytegleich | Klassischen Median sowie die vollständige Vorher-/Nachher-Visualisierung selbst aufbauen |
| 003, PDF-S. 3–10 | Funktionen, Rückgaben, Scope und gezielte Fehlerbehandlung in Lektion 5 | Zwischenübung auf PDF-S. 10 selbst umsetzen; alle Eingabefehler gezielt testen |
| 003, PDF-S. 11–26 | Pandas, Fehlwerte und Zeitreihen in Lektionen 6–8 | Originalübungen auf PDF-S. 18 und 26 benötigen den fehlenden Datensatz bb12024.csv |
| 003, PDF-S. 27–32 | Klassen in Lektion 9; eigenes CSV-/Pandas-/OOP-Transferprojekt ergänzt | Keine Abnahme der Original-Abschlussübung mit bb12024.csv; echte Prozessdaten erfordern eigene Qualitätsregeln |
| Code/002_fftpy.sec | Datei ist archiviert; Quelltext für dieses Audit gelesen | FFT, Abtastrate, Spektrum und Signalverarbeitung sind noch keine Lektionen |

In jeder der neun Lektionen gibt es jetzt eine eigene Verständnisfrage mit begründeter Rückmeldung. Die Bearbeitungsmarke setzt du erst, nachdem du die Miniübung selbst geschrieben und geprüft hast. Das eigene Transferprojekt verwendet vier ausdrücklich synthetische CSV-Zeilen und macht Schätzungen sichtbar. Es ist kein Ersatz für den fehlenden Originaldatensatz.

## Alle Originalaufgaben des vorhandenen Übungsblatts

Das Inhaltsverzeichnis und die Aufgabenabschnitte von `CuD_Uebung 01.pdf` ergeben **31 Aufgaben in zehn Modulen**. Kontrollfragen zählen hier zusätzlich und sind nicht in dieser Zahl enthalten. **3 der 31 Aufgaben** sind vollständig mit gestuften Hinweisen und getrennt aufklappbarer Lösung begleitet: 6.1–6.3. Die übrigen 28 haben passende Lerntexte oder Befehle, aber keine gleichwertige Aufgabenbegleitung. Die vier Live-Übungen aus Vorlesung 003 sind ebenfalls separat zu betrachten.

| Modul / Aufgaben | PDF-Seiten | Passender Einstieg | Begleitung |
| --- | --- | --- | --- |
| 1: 1.1–1.3 | 5 | Python und VS Code einrichten | Anleitung vorhanden; Geräteinstallation offen |
| 2: 2.1–2.3 | 6 | Lektion 2 | Begriffe und Beispiele |
| 3: 3.1–3.3 | 7 | Lektion 2, if | Begriffe und Beispiele |
| 4: 4.1–4.3 | 8 | Lektion 3, Schleifenbefehle | Mehr eigenes Schleifentraining erforderlich |
| 5: 5.1–5.4 | 9 | Lektion 3, Listen | Liste von Dictionaries nicht separat geführt |
| 6: 6.1–6.3 | 10–11 | Aktuelle Übung | Drei geführte Aufgaben; Quellenwidersprüche bleiben |
| 7: 7.1–7.3 | 12 | Lektion 4 | NumPy-Befehle und Mini-Beispiele |
| 8: 8.1–8.3 | 13 | Lektion 4 | Masken, Median und jetzt auch Standardabweichung erklärt |
| 9: 9.1–9.3 | 14 | Lektion 4, Matplotlib-Befehle | Vollständiges Diagramm selbst erstellen |
| 10: 10.1–10.3 | 15 | Lektion 4, Seaborn-Befehle | Boxplot jetzt erklärt; vollständiger Report noch nicht geführt |

Die Webseite zeigt dieselbe Zuordnung unter **Abdeckung & nächste Schritte**, mit direkten Verweisen auf die Originalseiten. Die Anzahl geführter Aufgaben wird aus den tatsächlich vorhandenen Übungsobjekten ermittelt. Die Tests gleichen das Aufgabeninventar mit den vorhandenen Textabschnitten ab.

## Quellenprüfung und bekannte Grenzen

Für diesen Abgleich wurden gezielt ausgewählte Textabschnitte der Vorlesungen und die Aufgabenüberschriften ausgewertet. Die Diagramm-/Code-Schlüsselstellen von Vorlesung 003, PDF-S. 31, und Übungsblatt, PDF-S. 13, wurden zusätzlich im vorhandenen Originalbild angesehen. Das ist weiterhin keine vollständige visuelle Prüfung jeder der 80 unterschiedlichen PDF-Seiten. Der bisherige [Sichtungsbericht](../Referenz_Sichtung/Sichtungsbericht.md) bleibt als historischer Ausgangsnachweis erhalten.

Die Quellen verwenden unterschiedliche Filterregeln. Die inklusive Grenze 0 bis 50 gilt als Arbeitsannahme des vorhandenen CSV-Piloten; sie darf nicht automatisch auf andere Aufgaben übertragen werden. Der vom Aufgabenblatt verlangte CSV-Dateiname weicht von der vorhandenen Datei ab; gedruckte Sollwerte sind nicht verbindlich bestätigt.

In `002_fftpy.sec` stimmen Kommentare und Operationen nicht überall überein: Der Kommentar nennt Clipping auf ±0,75, die Operation begrenzt auf ±10. Ein Rauschvektor wird erzeugt, aber `y_noisy` verwendet ihn nicht. Die Originaldatei wurde weder geändert noch ausgeführt; daraus wird kein korrektes FFT-Lernbeispiel abgeleitet.

Die ergänzten Erläuterungen zu [NumPy-Standardabweichung](https://numpy.org/doc/stable/reference/generated/numpy.std.html) und [Seaborn-Boxplot](https://seaborn.pydata.org/generated/seaborn.boxplot.html) wurden an den offiziellen API-Dokumentationen gegengeprüft. Das Interpolationslimit im eigenen Transferprojekt ist eine didaktische Annahme; Restlücken führen zu einem sichtbaren Fehler vor dem Report.

## Sinnvolle Reihenfolge für den Ausbau

1. Gebrauchstest mit einem Anfänger durchführen: Einrichtung, eine Lektion, Originalaufgabe ohne Vorlage und Fehlersuche beobachten.
2. Fehlende Aufgabenbegleitung für Schleifen und Listen von Dictionaries ergänzen; dann NumPy-/Diagramm-Report 7–10 ausbauen.
3. bb12024.csv beim Kurs klären. Bis dahin eigene Mini-Daten ausdrücklich getrennt halten.
4. Die vier Live-Übungen aus 003 schrittweise aufbereiten, inklusive leerer Eingaben und Fehlerfällen.
5. FFT als eigenes Thema erst nach fachlichem Abgleich der Begleitdatei aufnehmen.

Das ist ein priorisierter Ausbauweg. Neue Inhalte können über den vorhandenen Datenvertrag ergänzt werden; die konkrete Anleitung und ihre technischen Grenzen stehen in [ERWEITERN.md](ERWEITERN.md).
