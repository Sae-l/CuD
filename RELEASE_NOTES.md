# CuD v0.2.3

Wartungsausgabe vom 17.10.2026: unmittelbares Bedienfeedback und nachvollziehbare Browsernachweise.

- Eine andere Quizantwort wählen entfernt die alte Bewertung. Prüfe die neue Auswahl erneut; das Einstiegsquiz markiert die gewählte Antwort zusätzlich sichtbar und für assistive Technik.
- Bearbeitungsmarken melden ausdrücklich, ob eine Lektion markiert ist. Die bestehende lokale Speicherung und ihr Sitzungsersatz bleiben erhalten.
- Die geprüften Navigations-, Filter-, Suchvorschlags- und Hilfsziele sind mindestens 44×44px groß. Feld- und Antwortgrenzen sind kontrastreicher. Kurze Druck- und Menüübergänge reagieren überwiegend in 160–240ms; dekorative Hover-Bewegungen gelten nur bei Mausbedienung. Reduzierte Bewegung bleibt berücksichtigt.
- Neue Regressionen prüfen Antwortwechsel, Tastaturauswahl, ausgewählte Bedienziele, Speicherfehler, ausgefallene Animationsdateien und HTML-artigen Suchtext. Keine neue Abhängigkeit oder externe Gestaltungsladung.
- README, Bedienungs- und Beitragsanleitung, Prüfbericht und deutsche Release-Notiz im Obsidian-Vault sind abgeglichen. Der CI-Nachweis nennt den tatsächlich geprüften Quellcommit und die Artefakte; lokale Windows-Signatursperren bleiben davon getrennt dokumentiert.

## v0.2.3 starten und prüfen

1. `CuD-1-v0.2.3.zip` und `SHA256SUMS` aus diesem Release herunterladen. Den SHA-256-Wert des ZIPs mit dem Eintrag in `SHA256SUMS` vergleichen.
2. Das ZIP vollständig entpacken und `index.html` öffnen; alternativ `Lernwerkzeug/index.html` direkt starten. Alle Unterordner zusammenlassen.
3. Python-Beispiele selbst im Editor ausführen. Die Lernwebseite benötigt weder Node.js noch Python.

Der Verhaltensstand `74ba715` bestand die vollständige Chromium-/Firefox-/WebKit-Matrix auf Windows und Linux mit 3192 Layoutprüfungen. Der finale Release-Commit wird zusätzlich durch die vorgeschriebenen CI-Jobs geprüft; der Tag-Workflow wiederholt Tests und veröffentlicht ausschließlich manifestgeprüfte Commit-Bytes mit `SHA256SUMS`. Konkrete Läufe stehen in GitHub Actions. Die lokale WebKit-Sperre bleibt ein eigener Umgebungsbefund; keine Schutzregel wurde abgeschaltet.

Unverändert enthalten: 31 begleitete Aufgaben, vier Live-Übungen und zehn Lektionen. `bb12024.csv` fehlt; die betroffenen Originalkennzahlen bleiben unbestätigt. Reale Geräte, Safari auf Apple-Hardware, Screenreader und Lernnutzen sind keine bestandenen Prüfungen dieses Releases. Die acht Originaldateien und ihre Rechte bleiben unverändert.

---

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
