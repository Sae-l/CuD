# Quellenabdeckung und verbleibende Grenzen

Stand: 15.10.2026, Version 0.2.0. **Alle 31 Aufgaben des vorhandenen Übungsskripts sind mit Arbeitsschritten, gestuften Hinweisen, Selbstkontrollen und getrennten eigenen Musterlösungen begleitet.** Das bestätigt die Aufgabenbegleitung, keinen Lernerfolg und keine vollständige Abdeckung zukünftiger Kursunterlagen.

## Übungsskript

| Modul | Original, PDF-Seiten | Geführte Aufgaben | Besonderheit |
| --- | --- | --- | --- |
| 1 · Einrichtung | 5 | 1.1–1.3 | Ordnercode erhält vorhandene Dateien; Installation und Interpreterauswahl auf dem eigenen Gerät prüfen |
| 2 · Variablen | 6 | 2.1–2.3 | Typen, f-Strings und Fahrenheit-Rechnung |
| 3 · Bedingungen | 7 | 3.1–3.3 | Beide Aktivzustände und Temperaturgrenzen getestet |
| 4 · Schleifen | 8 | 4.1–4.3 | while, range, continue und break mit unabhängigen Sollausgaben |
| 5 · Datenstrukturen | 9 | 5.1–5.4 | Listen, Schleifensumme, Dictionary und Liste von Dictionaries |
| 6 · CSV | 10–11 | 6.1–6.3 | Vorhandene messdaten.csv; inklusive Filtergrenze als unbestätigte Arbeitsannahme |
| 7 · NumPy | 12 | 7.1–7.3 | Importprüfung, Array und elementweise Rechnung |
| 8 · Statistik | 13 | 8.1–8.3 | Zahlenliste der Originalaufgabe; ihre ausdrückliche Maske lautet > 0 und <= 50 |
| 9 · Matplotlib | 14 | 9.1–9.3 | Rohdatenlinie und Vorher-/Nachher-Grafik; Achsen und Datenstruktur geprüft |
| 10 · Seaborn | 15 | 10.1–10.3 | Boxplot und vollständiger CSV-Report mit Histogramm |

Die 28 neuen Lösungen laufen unabhängig von der bestehenden Pipeline 6.1–6.3. Installationsaufgaben enthalten konkrete Terminalanweisungen und ausführbare Kontrollprogramme; sie belegen keine tatsächlich durchgeführte Installation auf jedem Gerät. Die Kontrollfragen des PDFs bleiben in der Originalquelle und ergänzen die eigenen Lernfragen.

## Vorlesungen und Begleitcode

Vorlesungen 001–003 sind in neun Etappen zusammengefasst. Eine zehnte Etappe ergänzt FFT, Abtastrate, Frequenzraster, einseitige Amplituden und echtes Clipping. Das eigene synthetische FFT-Beispiel wurde mit der offiziellen [rfft-Dokumentation](https://numpy.org/doc/stable/reference/generated/numpy.fft.rfft.html) und [rfftfreq-Dokumentation](https://numpy.org/doc/stable/reference/generated/numpy.fft.rfftfreq.html) abgeglichen. Das unveränderte Original 002_fftpy.sec enthält widersprüchliches Clipping und unbenutztes Rauschen; es wird nicht als korrektes Originalexperiment ausgegeben.

| Live-Übung 003 | Begleitung und Test | Grenze |
| --- | --- | --- |
| PDF-S. 10 · sicherer Mittelwert | Funktion, Warnungen, endliche Werte und Leerfall geprüft | Eigene Absicherung: None statt eines scheinbaren Messwerts 0 bei leeren Daten |
| PDF-S. 18 · Pandas | Schritte, Musterlösung und synthetischer Grenztest bei o2_ist < 0.5 | bb12024.csv fehlt; Originalkennzahlen unbestätigt |
| PDF-S. 26 · Zeitraster | Sortierter Zeitindex, 5-Minuten-Mittel, begrenzte innere Interpolation und Fehlerfälle | Limit ist eine didaktische Annahme; kein Originaldatennachweis |
| PDF-S. 31 · Klasse | Konstruktor, Aufbereitung und geschützter Report; zwei getrennte Instanzen | bb12024.csv fehlt; Originalreport unbestätigt |

Das eigene Projekt mit becken-mini.csv bleibt getrennt. Keine synthetische Datei wird als bb12024.csv ausgegeben. Sobald die Originaldatei vorliegt, müssen Header, Einheiten, Zeitraum, Fehlwerte und Originalresultate zusätzlich geprüft werden.

## Quellenabgleich

Für diese Erweiterung wurden alle Aufgabenseiten des Übungsskripts **PDF-S. 5–15** und die vier Live-Aufgabenseiten **003, PDF-S. 10, 18, 26, 31** am gerenderten Original angesehen und mit der Textfassung abgeglichen. Die Kontaktansichten liegen lokal im ausgeschlossenen Arbeitsordner. Die acht Originaldateien stimmen weiterhin mit den historischen SHA-256-Werten überein. Das ist keine vollständige visuelle Prüfung aller 80 unterschiedlichen PDF-Seiten.

Die Quellenwidersprüche bleiben nachvollziehbar: Modul 6 nennt teilweise sensor_messdaten_projekt.csv, vorhanden ist messdaten.csv; gedruckte Anzahlen passen nicht vollständig. Modul 8 verwendet ausdrücklich die abgedruckte Zahlenliste und eine andere Nullgrenze. Die Musterlösungen übernehmen diese Unterschiede sichtbar und testen die Rechnung an ihren tatsächlichen Daten. Eine Kursbestätigung der Sollwerte wird nicht vorgetäuscht.

## Was weiter offen bleibt

- Originaldatensatz bb12024.csv und Bestätigung der CSV-Zuordnung durch den Kurs.
- Gebrauchstest mit Anfängern, echte Geräte, Screenreader und Safari auf Apple-Hardware.
- Vollständige visuelle Abnahme sämtlicher Folien und fachliche Freigabe durch die Kursbetreuung.
- Zukünftige Vorlesungen und Übungen nach dem vorhandenen Quellenstand.

Technische Nachweise: [Prüfbericht](pruefung/PRUEFBERICHT.md). Neue Inhalte: [ERWEITERN.md](ERWEITERN.md).
