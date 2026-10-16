# CuD v0.2.2

Wartungsausgabe vom 17.10.2026: konsistente Gestaltung und sichere Offline-Einstiege.

- Die veröffentlichte Gestaltung ist mit dem lokalen Lernraum abgeglichen. Ein älteres lokales Stylesheet wurde erkannt und wiederhergestellt; auf `main` war die neuere Gestaltung bereits vorhanden.
- Beide Webseiten tragen die Signatur **Mohamed Saeed Alhalak**. Direkte Inhaltslinks, eine ruhigere Hauptüberschrift und stabile Tablet-Navigation erleichtern den Einstieg.
- Das Mobilmenü führt den Tastaturfokus, sperrt den Hintergrund, schließt mit Escape und beim Wechsel zur Desktopbreite. Ohne JavaScript bleiben die Einstiegslinks der Vorstellungsseite sichtbar.
- Die Reparatur aus PR #13 bleibt erhalten: explizite HTML-Dateiverweise und Download des vollständigen Projektordners. Funktion, Gestaltung und Dateiintegrität werden getrennt geprüft.
- Bedienungs-, Architektur-, Erweiterungs- und Releaseanleitung sowie die deutschen Obsidian-Notizen sind aktualisiert. Neue Regressionen decken Signaturen, Form der Topleiste, Inhaltslinks und Menüzustände ab.

## Starten

1. `CuD-1-v0.2.2.zip` vollständig entpacken.
2. `index.html` öffnen und **Lernraum öffnen** wählen; alternativ `Lernwerkzeug/index.html` direkt öffnen.
3. Python-Beispiele selbst im Editor ausführen. Node.js und Python werden für die Lernwebseite nicht benötigt.

Das ZIP wird aus den manifestgeprüften Commit-Bytes erstellt und mit `SHA256SUMS` veröffentlicht. Windows-/Linux-CI und Release-Workflow prüfen den übernommenen Stand; ihre konkreten Ergebnisse stehen in GitHub Actions. Die abschließende lokale Prüfung bestand in Chromium und Firefox mit insgesamt 1064 Layoutprüfungen; WebKit scheiterte bereits beim Browserstart. Daraus wird kein lokaler WebKit-Erfolg abgeleitet.

## Grenzen

31 begleitete Aufgaben, vier Live-Übungen und zehn Lektionen bleiben enthalten. `bb12024.csv` fehlt; Originalkennzahlen sind unbestätigt. Synthetische Demo-Daten sind gekennzeichnet. Echte Geräte, Safari auf Apple-Hardware, Screenreader, vollständige visuelle Folienprüfung und Lernerfolg mit Anfängern bleiben offen. Die acht Originaldateien und ihre Rechte bleiben unverändert.
