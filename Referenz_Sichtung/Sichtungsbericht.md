# Sichtungsbericht – Referenz

Stand: 15.10.2026. Einstieg: [Seitenindex](Seitenindex.md).

## Umfang und Nachweis

- 6 PDF-Dateien mit 83 Seiten vollständig extrahiert und indiziert. 5 unterschiedliche PDF-Inhalte mit 80 Seiten; die beiden dreiseitigen Analyse-Beispiele sind byte-identisch. Keine Datei entfernt.
- 19 Seitenabschnitte tatsächlich als Text gelesen; 10 Originalseiten als gerenderte Bilder angesehen. Die genaue Zuordnung steht pro Seite im Index und Manifest.
- 8 Quelldateien vor/nach der Arbeit per SHA-256 verglichen: unverändert. Seitenabschnittszahlen und lokale Linkziele geprüft.
- Vorhandenen Helfer `D:/Saeed/Projekts/Formelsammlung/pdf_sichten.py` mit expliziten, neuen Ausgabeordnern wiederverwendet. Herkunft und SHA-256 stehen im Manifest. Nur generierte Arbeitsunterlagen ergänzt.

## Beobachtungen und offene Punkte

1. **Dateiname der Übungsdaten:** `CuD_Uebung 01`, PDF-S. 10, Aufgabe 6.1, verlangt `sensor_messdaten_projekt.csv`. Im Quellordner liegt `messdaten.csv`. Die Spalten entsprechen dem Sensordaten-Thema; eine ausdrückliche Bestätigung, dass dies die vorgesehene Datei ist, fehlt. Keine Umbenennung vorgenommen.
2. **Sollausgaben stimmen nicht vollständig mit den Daten überein:** `CuD_Uebung 01`, PDF-S. 10, Aufgabe 6.2, und PDF-S. 13, Aufgabe 8.3. Beide Seiten wurden im Originalbild angesehen; der Abgleich mit der vorhandenen CSV wurde lokal mit der Standardbibliothek durchgeführt. Zahlenlösungen werden hier nicht vorweggenommen. Ebenfalls prüfen: die untere Filtergrenze wird auf S. 10 sprachlich anders als in der Maske auf S. 13 beschrieben; die Kontrollfrage 9.4 auf S. 13 verwendet nur eine obere Grenze.
3. **Weiterer Datensatz fehlt im Referenzordner:** Vorlesung `003_Coding und Digitalisierung`, PDF-S. 14 und 31, bezieht sich auf `bb12024.csv`. Diese Datei ist in `Referenz` nicht enthalten. Daher kein Laufnachweis für diese Datenanalyse.
4. **Bildinhalt fehlt im Text:** Vorlesung `001_Coding und Digitalisierung`, PDF-S. 19, zeigt die Auswahl einer Python-Umgebung in VS Code. Vorlesung `002_Coding und Digitalisierung`, PDF-S. 5, enthält einen Code-Screenshot zur Listenwiederholung gegenüber elementweiser Array-Multiplikation. Beide Originalbilder wurden angesehen; die bloße Textextraktion reicht dort nicht aus.
5. **Extraktion ist keine Code-Abschrift:** In den Analyse-Beispielen sowie Vorlesung 003 gehen Einrückungen, Zeilenumbrüche und teilweise Zeichen verloren. In Vorlesung 003 sind auf den angesehenen S. 22, 25 und 31 außerdem am rechten bzw. unteren Rand Inhalte angeschnitten oder umgebrochen. Zum Abschreiben immer das Originalbild heranziehen; fehlende Randinhalte bleiben offen.
6. **Begleitdateien:** `Pflicht Übungen/messdaten.csv` wurde für den Konsistenzabgleich gelesen. `Code/002_fftpy.sec` wurde nur inventarisiert und gehasht; nicht ausgeführt oder fachlich geprüft.

## Tatsächlich gelesene und angesehene Seiten

| Dokument | Als Text gelesen | Originalbild angesehen |
| --- | --- | --- |
| CuD_Uebung 01 | 3, 4, 10, 11, 13, 14, 15 | 10, 13 |
| 001_Coding und Digitalisierung | 2, 19 | 19 |
| 002_Beispiel Datenstrukturen - Analyse | 1, 2, 3 | 1, 2, 3 |
| 002_Coding und Digitalisierung | 4, 5 | 5 |
| 003_Coding und Digitalisierung | 10, 14, 22, 25, 31 | 22, 25, 31 |
| code 002_Beispiel Datenstrukturen - Analyse | keine separate Textsichtung | keine separate Bildsichtung; byte-identisches Duplikat |

## Prüfgrenze

Die übrigen Seiten sind indiziert, aber nicht vollständig gelesen oder visuell geprüft. Eine umfassende fachliche Prüfung der Vorlesungen, Übungen und Beispielprogramme sowie deren Ausführung ist offen. Es wurde nichts installiert. Kursangaben sind Aussagen der lokalen Unterlagen, keine live bestätigten Termine oder Prüfungsregeln.
