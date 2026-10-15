# Prüfbericht zum Lernwerkzeug

Stand: 15.10.2026. Umfang: lokaler Pilot für Aufgaben 6.1–6.3.

Ergebnis: **PASS**, automatisiert am 15.10.2026 geprüft. Die Prüfung läuft mit `../pruefen.cjs`. Der maschinenlesbare Ausgang steht in `ergebnis.json`; maßgeblich ist dessen aktueller Status. Ein neuer Lauf setzt ihn zuerst auf RUNNING, damit ein abgebrochener Lauf keinen alten PASS stehen lässt.

## Technische Ergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| 17 selbst erstellte Python-Beispiele | Ausgeführt; feste Ausgaben abgeglichen, Arbeitsordner-Diagnose ausgeführt |
| Musterlösungen 6.1 → 6.2 → 6.3 | Zusammenhängend auf der vorhandenen CSV ausgeführt; Filterergebnisse und Mittelwert unabhängig mit `csv.DictReader` und `statistics.mean` verglichen |
| Randfälle | Leere Datei, Header ohne Daten, ausschließlich Ausreißer, ein gültiger Wert, Leerzeilen, Grenzen -1/0/50/51 und defekte Zahlen/Spalten geprüft |
| Gemeinsame Suche | 12 Eingaben einschließlich aller fünf fachlichen Suchzugänge, Synonyme, Großschreibung, Umlautschreibweise und Syntax; Aufgabennummer und `len()` an erster Stelle |
| Inhaltsansichten | Alle 25 Ansichten geöffnet; Verknüpfungen und eindeutige IDs geprüft |
| Hinweise und Lösungen | Anfangs geschlossen; Hinweis per Enter, Musterlösung per Klick geöffnet; bei Navigation und Zurück wieder geschlossen |
| Quellen und Dateien | 36 verschiedene lokale Links auf vorhandene Ziele geprüft; PDF-Seitenanker geprüft, Originalbild tatsächlich im Browser geöffnet; CSV-Download bytegleich |
| Tastatur | Skip-Link führt zum Inhalt, Hinweis lässt sich mit Enter öffnen; sichtbare Fokusmarkierung vorhanden |
| Schmale Bildschirme | 390 und 320 CSS-Pixel ohne horizontalen Seitenüberlauf; Suche und Aufgabenauswahl ausgeführt |
| Offlinebetrieb | Chromium per `file://` im Offline-Modus; keine externen HTTP-Anfragen und keine JavaScript-/Konsolenfehler |
| Quellen unverändert | Alle 8 SHA-256-Werte stimmen mit dem vorher bestehenden Sichtungsmanifest überein |

Desktop-Startansicht und Aufgabe 6.2 sowie die mobile Aufgabe 6.2 wurden als Screenshots gespeichert und tatsächlich angesehen. Die auf 320 Pixeln überlaufende Themenauswahl wurde korrigiert und erneut geprüft. Die Prüfung verwendet das vorhandene JavaScript-Playwright; nichts wurde installiert.

Der PDF-Betrachter steht im getesteten Headless-Chromium nicht zur Verfügung. Deshalb wurde **kein erfolgreicher Seitenwechsel im PDF-Betrachter behauptet**: Dateiziel und `#page=10` wurden geprüft, das Öffnen und Laden der entsprechenden Originalseite über den zusätzlichen Bildlink wurde tatsächlich ausgeführt. Das Verhalten des PDF-Betrachters im interaktiven Browser bleibt offen.

## Quellenabgleich

- CuD_Uebung 01, PDF-S. 10: Aufgaben 6.1 und 6.2 als Text gelesen und vorhandenes Originalbild angesehen. Einrückung des with-Blocks abgeglichen.
- CuD_Uebung 01, PDF-S. 11: Aufgabe 6.3 als Text gelesen, Originalseite gezielt gerendert und angesehen (`quelle-s11.png`). Mittelwert, Minimum und Maximum bestätigt; kein Median verlangt.
- Erläuterungen, Hinweise, Diagnosehilfen und Musterlösungen sind selbst erstellt. Die Quellenangaben bezeichnen ihren Aufgabenbezug, keine wörtliche Übernahme.
- Die 8 Originaldateien werden gegen die SHA-256-Werte aus dem vorhandenen `Referenz_Sichtung/manifest.json` geprüft.

## Offene fachliche Fragen

Die Aufgabenquelle nennt einen anderen CSV-Dateinamen. Die Sollanzahlen auf PDF-S. 10 passen nicht zur vorhandenen Datei. Das inklusive Intervall 0 bis 50 ist eine Arbeitsannahme; die vorhandenen Daten enthalten keinen dieser Grenzwerte. Die Python-Referenzrechnung belegt die Verarbeitung der vorhandenen CSV, nicht deren vom Kurs bestätigte Zuordnung. Zahlenantworten zur Originaldatei werden in diesem Bericht nicht ausgegeben.

## Prüfgrenzen

Ein technischer Test ist kein Gebrauchstest und kein Nachweis des Lernerfolgs. Weitere Browser, Screenreader und reale Lernzeiten sind nicht geprüft. Die restlichen Quellseiten und Modulthemen sind nicht vollständig erschlossen. Die bekannten Quellwidersprüche bleiben sichtbar offen.
