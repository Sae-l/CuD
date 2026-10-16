---
title: "40 Windows macOS und Android"
description: "**Die CuD-Lernseite ist als browserbasierte Anwendung für Windows, macOS und Android vorgesehen.** Die vorhandenen Nachweise erlauben noch keine uneingeschränkte Abnahme auf allen echten Geräten."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Kompatibilität nach Nutzung und Nachweis unterscheiden

**Die CuD-Lernseite ist als browserbasierte Anwendung für Windows, macOS und Android vorgesehen.** Die vorhandenen Nachweise erlauben noch keine uneingeschränkte Abnahme auf allen echten Geräten.

| Nutzung | Windows | macOS | Android |
| --- | --- | --- | --- |
| Öffentliche Website lesen | Über HTTPS erreichbar; Browser nötig | Über HTTPS nutzbar, echter Mac-Test offen | Über HTTPS nutzbar, echter Android-Test offen |
| Entpackten Ordner direkt öffnen | Chromium-Dateibetrieb im gespeicherten Test geprüft; Firefox-Dateiöffnung dokumentiert | Vom Browser abhängig; konkrete Dateiöffnung offen | Abhängig von Browser, Dateimanager und Zugriffsrechten |
| Ganze Ablage über HTTP bereitstellen | Möglicher Ausweichweg | Möglicher Ausweichweg | Zugriff auf erreichbaren Server statt komplizierter Dateiöffnung |
| Eigenes Python ausführen | Lokale Umgebung und Editor | Lokale Umgebung und Editor | Separates geeignetes Werkzeug oder bewusst gewähltes Cloud-Notebook |
| Gesamte Entwicklungsprüfung | Windows-Nachweise vorhanden | Einrichtung beschrieben, hier kein Mac-Lauf | Nicht als mobile Entwicklungsumgebung zugesagt |

Die zwei öffentlichen URLs lieferten am 16.10.2026 HTTP 200. Das prüft Erreichbarkeit und Titel, keine vollständige interaktive Bedienung auf diesen Plattformen.

## Was die Browsermatrix tatsächlich zeigt

Die gespeicherte Matrix lief auf Windows mit Chromium, Firefox und Playwright-WebKit. Sie erfasste sieben Fenstergrößen und Touch-Emulation bei Handy- und Tabletgrößen. WebKit ist ein Browser-Engine-Test; er ersetzt keinen Safari-Test auf einem Mac. Das entspricht der Unterscheidung in der [Playwright-Dokumentation](https://playwright.dev/docs/browsers).

320, 390 und 768 Pixel breite Ansichten sind Layoutnachweise, keine Prüfung von Android-Dateifreigaben, mobiler Tastatur oder Energiesparverhalten. Windows-WebKit konnte die lokale Datei nicht zuverlässig öffnen; die HTTP-Matrix bestand. Diese Unterschiede müssen in der Hilfe sichtbar bleiben.

## Obsidian separat betrachten

Für Windows, macOS und Android existieren offizielle Obsidian-Apps. Dieser Vault benötigt gewöhnliche lokale Dateien und die integrierten Funktionen für Links und Canvas. Die unterstützten Systeme stehen bei [Obsidian](https://obsidian.md/help/Getting%2Bstarted/Download%2Band%2Binstall%2BObsidian); Android-Dateizugriff wird [separat erläutert](https://obsidian.md/help/android). Der vorliegende Vault wurde strukturell geprüft, nicht in allen Obsidian-Apps auf echten Geräten geöffnet.

## Kurze echte Geräteprüfung

Betriebssystem, Browser beziehungsweise Obsidian-Version notieren. Online öffnen, Suche, Navigation, Lösungsklappen, CSV-Download und Bearbeitungsmarke prüfen. Danach die beabsichtigte lokale Nutzung mit dem vollständigen Ordner testen. Python zusätzlich getrennt starten. Tastatur, Zoom, Fokus, Hoch-/Querformat und Wiederöffnung prüfen. Resultate unter [[90 Stand und Nachweise]] ergänzen.

## Projektbelege

- [Lernwerkzeug/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/README.md)
- [Lernwerkzeug/pruefung/kompatibilitaet.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/kompatibilitaet.json)
- [Lernwerkzeug/pruefung/PRUEFBERICHT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/PRUEFBERICHT.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
