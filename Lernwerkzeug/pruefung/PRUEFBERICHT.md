# Prüfbericht 0.2.0

Stand: 15.10.2026. Lokaler Windows-Nachweis; maßgeblich sind Zeitpunkte und Status in [ergebnis.json](ergebnis.json) und [kompatibilitaet.json](kompatibilitaet.json). GitHub Actions liefert zusätzlich eigene Windows-/Linux-Nachweise am jeweiligen Commit.

| Prüfung | Umfang |
| --- | --- |
| Lernbeispiele | 27 ausführbare Python-Beispiele mit vorhandenen Sollausgaben |
| Befehlsbeispiele | 34 zusätzliche Beispiele; 49 Befehlsgruppen insgesamt |
| Originalaufgaben | Alle 31 des vorhandenen Übungsskripts begleitet; die drei CSV-Lösungen als Pipeline, 28 weitere Lösungen/Kontrollprogramme getrennt geprüft |
| Unabhängige Erwartungen | Typen, Fahrenheit, Temperaturgrenzen, Schleifenausgaben, Listen und Dictionaries; NumPy gegen Standard-Python-Statistik |
| Report und Diagramme | Daten der Linien/Balken, Achsenzahl, Beschriftungen, Boxplot und Histogramm; Leerfall, fehlerhafte Zahlen und Nullgrenze geprüft |
| Live-Übungen 003 | Vier Lösungen; Mittelwert-/NaN-/Leerfälle, Pandas-Grenze 0.5, Zeitraster, Interpolation und Report vor Aufbereitung |
| FFT | 50-Hz-Spitze, Amplitude 1.5, keine zusätzlichen Sinusspitzen, echtes Clipping und 150-Hz-Anteil |
| Bestehendes Transferprojekt | Eigene Mini-Daten, getrennte Instanzen, Restlücken, ungültige Zeit, fehlende Spalte und Report vor Aufbereitung |
| Oberfläche | 76 Ansichten × sieben Größen × drei Engines = 1596 Layoutprüfungen; keine horizontalen Seitenüberläufe |
| Bedienung | Zehn Lernfragen, Fortschrittsmarken, ungültige/gesperrte Speicherung, Touch-Emulation, Tastatur, Fokus, Verlauf und reduzierte Bewegung |
| Suche und Verweise | 18 Suchfälle, 116 lokale Verweise, getrennte Lösungen; vorhandene CSV-Downloads bytegleich |
| Originaldateien | Acht SHA-256-Werte unverändert |
| Unit-Tests | Manifeständerung/-löschung und Ausschlüsse; Release-Wiederholbarkeit, ZIP-Bytes und Ablehnung falscher Version/ungeprüfter Änderung |

## Umgebung und Sichtprüfung

Vorhandene lokale Laufzeiten: Node 24.19.0, Python 3.12.14, Playwright 1.62.1. Browser: Chromium 151.0.7922.34, Firefox 153.0 und Playwright-WebKit 26.5. Größen in CSS-Pixeln: 320×740, 390×844, 768×1024, 1024×768, 844×390, 1280×800, 1440×1000. Touch bei 390×844 und 768×1024 emuliert. Die gemeinsame Matrix nutzt nur HTTP an 127.0.0.1 und sperrt externe Anfragen. Chromium wird zusätzlich im Offline-Dateibetrieb geprüft; Firefox-Dateiöffnung besteht. Windows-WebKit-Dateiöffnung bleibt unbestätigt.

Alle Aufgabenseiten des Übungsskripts PDF-S. 5–15 und die vier Live-Aufgabenseiten 003, PDF-S. 10, 18, 26, 31 wurden am gerenderten Original angesehen. Die erzeugten Vergleichs-, Report- und FFT-Grafiken sowie aktuelle Oberflächenbilder wurden als Stichprobe angesehen. Die alten Dateien erweiterung.json und pruefer-regression.json belegen ihre früheren, ausdrücklich zeitlich begrenzten Erweiterungs-/Fehlerpfadprüfungen.

## Grenzen

bb12024.csv fehlt. Drei Live-Lösungen sind mit getrennten synthetischen Daten geprüft; die gedruckten Originalkennzahlen dafür sind nicht bestätigt. CSV-Zuordnung, Sollzahlen und unterschiedliche Filtergrenzen bleiben im Abdeckungsplan erklärt. Interpolation liefert Schätzungen unter einer didaktischen Annahme, keine freigegebenen realen Prozesswerte.

Installationsaufgaben prüfen Kontrollprogramme, keine universelle Geräteinstallation. Technische Tests und eigene Bearbeitungsmarken belegen weder Lernerfolg noch vollständige Prüfungsvorbereitung. Echte Geräte, Safari auf Apple-Hardware, Screenreader und vollständige visuelle Folienprüfung bleiben offen. [Abdeckungsplan](../ABDECKUNG.md).
