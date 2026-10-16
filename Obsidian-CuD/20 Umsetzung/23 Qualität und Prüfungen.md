---
title: "23 Qualität und Prüfungen"
description: "Der Prüfstand ist mehrstufig. Eine bestandene Stufe gilt nicht automatisch für die anderen. Die vorhandenen Softwareberichte stammen vom 15.10.2026; ihre vollständigen Läufe wurden für den Bau dieses Vaults nicht wiederh"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Welche Aussage ein Test tatsächlich erlaubt

Der Prüfstand ist mehrstufig. Eine bestandene Stufe gilt nicht automatisch für die anderen. Die vorhandenen Softwareberichte stammen vom 15.10.2026; ihre vollständigen Läufe wurden für den Bau dieses Vaults nicht wiederholt.

| Stufe | Nachweis im Projekt | Damit nicht bewiesen |
| --- | --- | --- |
| Integrität | SHA-256, Git-Blob-Hash und Manifest | Fachliche Richtigkeit oder Urheberrecht |
| Fachliche Beispiele | Ausgeführte Python-Programme mit Erwartungen und Randfällen | Resultate mit fehlenden Originaldaten |
| Webfunktion | Suche, Navigation, Lernfragen und Speicherung | Lernwirksamkeit |
| Browserlayout | Chromium, Firefox, WebKit und verschiedene Größen | Reale Mac-/Android-/Safari-Abnahme |
| Gebrauchstest | Vorhandene Anleitung für Anfänger | Noch keine ausgefüllten Ergebnisse |
| Lernwirksamkeit | Künftige Studie oder definierte Lernmessung | Derzeit kein direkter Nachweis |

## Gespeicherter Softwarestand

`ergebnis.json` meldet PASS: 27 Lernbeispiele, 34 ergänzende Befehlsbeispiele, CSV-Pipeline, Randfälle, Transferprojekt, 28 ergänzte Originalaufgabenlösungen, vier Live-Übungen und FFT. Die drei CSV-Aufgaben bleiben eine eigene Pipeline; die 28 Ergänzungen ergeben zusammen die 31 begleiteten Aufgaben.

Die Browserprüfung nennt 76 Ansichten, zehn Lernfragen, 49 Befehlsgruppen, 18 Suchfälle und 117 lokale Verweise. Die Matrix umfasst 76 × 7 × 3 = 1596 Ansicht-/Größe-/Engine-Kombinationen auf Windows. Das sind Softwareprüfungen mit emulierten Größen; keine 1596 unterschiedlichen Geräte. Der damalige Lauf meldete keine externen Anfragen.

## Für neue Inhalte prüfen

Das Beispiel muss mit den ausgelieferten Dateien ausführbar sein. Erwartungen zuerst unabhängig berechnen. Fehlerfälle wie leere Daten, ungültige Zahlen, fehlende Spalten, Zeitfehler und Restlücken passend zum Lernziel festlegen. Der Test darf nicht denselben fehlerhaften Rechenweg wie die Lösung als eigene Erwartung wiederholen.

Den sichtbaren Download bytegenau mit der Testdatei vergleichen. Aktuelle Inhalte mit Tastatur, schmalem Fenster, Touch-Emulation und reduzierter Bewegung ansehen. Bei Navigation Fokus und Zurück/Vorwärts prüfen. Eine neue Aufgaben-ID muss zur tatsächlich ausgeführten Lösung und zum eigenen Testfall passen.

## Noch ausstehende Produktabnahme

Echte Geräte, Safari auf Apple-Hardware, Screenreader, eigenständiges Arbeiten von Anfängern und Lernerfolg sind offen. Für einen Gebrauchstest konkrete Beobachtungen sammeln: Zeit bis zum ersten Programm, selbstständiges Finden des richtigen Befehls, Art der benötigten Hilfe und Ergebnis einer neuen Variante. Teilnahme und Datenerfassung sind gesondert zu organisieren.

Der aktuelle Manifest-Vorabcheck dieses Dokumentationsauftrags war bereits vor dem Vaultbau FAIL wegen `.claude/launch.json`. Er wurde nicht durch ein pauschales Neuschreiben verdeckt. Die unabhängige Dokumentationsprüfung steht unter [[93 Vault-Prüfbericht]].

## Projektbelege

- [Lernwerkzeug/pruefung/ergebnis.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/ergebnis.json)
- [Lernwerkzeug/pruefung/kompatibilitaet.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/kompatibilitaet.json)
- [Lernwerkzeug/pruefung/PRUEFBERICHT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/PRUEFBERICHT.md)
- [Lernwerkzeug/GEBRAUCHSTEST.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/GEBRAUCHSTEST.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
