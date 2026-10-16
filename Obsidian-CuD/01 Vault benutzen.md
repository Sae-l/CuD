---
title: "01 Vault benutzen"
description: "Der gesamte Ordner `Obsidian-CuD` ist die neue, eigenständige Wurzel dieses Vaults. Ein vorhandener persönlicher Vault wird nicht benötigt. Dataview und andere Community-Erweiterungen sind nicht erforderlich; die Konfigu"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Den Vault öffnen und lesen

Der gesamte Ordner `Obsidian-CuD` ist die neue, eigenständige Wurzel dieses Vaults. Ein vorhandener persönlicher Vault wird nicht benötigt. Dataview und andere Community-Erweiterungen sind nicht erforderlich; die Konfiguration enthält keine Community-Plugins.

1. Obsidian öffnen und in der Vault-Verwaltung **Open folder as vault / Ordner als Vault öffnen** wählen.
2. Den Ordner `Obsidian-CuD` auswählen.
3. `00 Start.md` öffnen. Interne Verknüpfungen führen durch alle Themen.
4. `CuD Gesamtkarte.canvas` öffnen. Die Karten lassen sich verschieben und vergrößern; jede Dateikarte öffnet ihre Notiz.

Ein Vault besteht aus gewöhnlichen lokalen Dateien. Die offizielle Anleitung beschreibt das [Öffnen eines bestehenden Ordners](https://obsidian.md/help/Files%2Band%2Bfolders/Manage%2Bvaults). Canvas ist eine [integrierte Obsidian-Funktion](https://obsidian.md/help/Plugins/Canvas).

## Navigation ohne Zusatzinstallation

Nutze die Dateiliste, den Schnellwechsel, die Suche und Rückverweise. Der Graph zeigt die Beziehungen der Wissensseiten. Die [[02 Gesamtübersicht]] enthält zusätzlich Mermaid-Diagramme für die Leseansicht. Canvas und Wikilinks gehören zur Obsidian-Darstellung; eine GitHub-Dateiansicht ersetzt diese Darstellung nicht vollständig.

Die Notizen tragen einheitliche Eigenschaften: `title`, `type`, `language`, `created`, `updated`, `status`, `tags`. Die Typen unterscheiden Übersicht, Notiz und Vorlage. Vorlagen sind gewöhnliche Markdown-Dateien und lassen sich kopieren; ein Template-Plugin ist nicht nötig.

## Übertragung auf andere Geräte

Kopiere oder entpacke den **gesamten Vault**. Die internen Verknüpfungen und Canvas-Dateikarten verwenden relative Pfade. Externe Belege benötigen Internet; die Wissensseiten selbst lassen sich offline lesen. Auf Android muss der Ordner für Obsidian zugänglich sein. Plattformunterstützung von Obsidian und Prüfung des CuD-Lernwerkzeugs sind verschiedene Aussagen: [[40 Windows macOS und Android]].

Die bereitgestellte ZIP-Datei ist eine Momentaufnahme. Git oder ein später bewusst eingerichteter Synchronisationsdienst kann Änderungen übertragen. Es wurde kein Dienst aktiviert und kein Konto verbunden. Synchronisationsregeln stehen unter [[41 Lokal Cloud und Synchronisation]].

## Notizen pflegen

Quellen und Datum aktualisieren, Tatsachen von Vorschlägen trennen und betroffene Querverweise kontrollieren. Umbenennungen möglichst in Obsidian durchführen und das automatische Aktualisieren interner Links zulassen. Neue Notizen in `00 Start` und mindestens einer sachlich verwandten Notiz verlinken. Vor einer öffentlichen Veröffentlichung persönliche Arbeitsnotizen prüfen: [[43 Sichtbarkeit für Besucher]].

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
