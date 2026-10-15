# CuD-1 v0.2.0

Alle 31 Aufgaben des vorhandenen Übungsskripts sind jetzt geführt begleitet. Vier Live-Übungen erhalten Schritte und eigene Musterlösungen; eine zehnte Lektion führt in FFT und echtes Clipping ein. Lernkontrollen, lokale Bearbeitungsmarken und das eigene CSV-/Pandas-/OOP-Projekt aus PR #2 sind enthalten.

Die Übungen bleiben über Suche und die gemeinsame Aufgabenübersicht erreichbar. Lösungen öffnen sich getrennt; ein Seitenwechsel schließt sie. Unterschiedliche Filtergrenzen und widersprüchliche Original-Sollwerte werden sichtbar erklärt. Alle acht Originaldateien bleiben unverändert.

## Starten

1. CuD-1-v0.2.0.zip vollständig entpacken.
2. Lernwerkzeug/index.html im Browser öffnen.
3. Mit der Einrichtung und der ersten Lektion beginnen. Python-Code führst du im eigenen Editor aus.

Die Webseite benötigt kein Konto und keine Installation. Alle Ordner zusammenlassen. Gerätezugang: Lernwerkzeug/README.md. SHA256SUMS enthält die Prüfsumme des ZIPs.

## Konfiguration und Nachweise

Node 24, Python 3.12 und festgelegte Testabhängigkeiten. GitHub Actions prüft Windows und Linux mit drei Browser-Engines. Workflows verwenden offizielle Actions mit festen Commit-IDs und minimalen Rechten. Der Release-Ablauf prüft vor dem Paketbau die Tests und das Dateimanifest. Das ZIP wird anhand aller Manifestdateien und SHA-256 geprüft.

Lokal: 76 Ansichten in sieben Größen und drei Engines, 1596 Layoutprüfungen. Python-Beispiele, 31 Aufgabenlösungen/Kontrollprogramme, vier Live-Lösungen mit synthetischen Prüfdaten, FFT, Suche, Fortschritt und Fehlerfälle geprüft. Maßgeblich sind die Prüfberichte und CI-Ergebnisse am Release-Commit.

## Grenzen

bb12024.csv fehlt; Originalkennzahlen dafür sind nicht bestätigt. Technische Tests belegen keinen Lernerfolg. Echte Geräte, Screenreader und Safari auf Apple-Hardware bleiben offen. Windows-WebKit ist über HTTP geprüft. Die Quellenrechte bleiben bei ihren jeweiligen Urhebern; das Repository bleibt privat.
