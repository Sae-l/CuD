---
title: "31 Neue Übung hinzufügen"
description: "Zuerst entscheiden, ob eine Originalaufgabe begleitet oder eine eigene Aufgabe ergänzt wird. Eine Originalnummer muss mit Datei und PDF-Seite zusammen eindeutig bleiben. Für eigene Aufgaben die Herkunft ausdrücklich als "
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Eine Aufgabe mit Hilfe und eigenständigem Test ergänzen

Zuerst entscheiden, ob eine Originalaufgabe begleitet oder eine eigene Aufgabe ergänzt wird. Eine Originalnummer muss mit Datei und PDF-Seite zusammen eindeutig bleiben. Für eigene Aufgaben die Herkunft ausdrücklich als eigene Ergänzung kennzeichnen. Arbeitsblatt: [[Vorlage Übung]].

## Datenvertrag

Ein bestehender Übungseintrag in `inhalte.js`, etwa `aufgabe-6-1`, zeigt den tatsächlichen Aufbau. Vorhandene Schlüssel und Quellenobjekte übernehmen, nicht nur eine ähnliche sichtbare Karte bauen.

| Feld | Inhalt |
| --- | --- |
| `id` | Dauerhafte eindeutige Kennung, bei neuen Blättern mit Blattkennung |
| `number`, `kind`, `title`, `topic` | Originalnummer, Art `Übung`, verständlicher Titel und Thema |
| `sources` | Vorhandene Quellen-IDs; zugehöriges Quellenobjekt mit Datei und Seite ergänzen |
| `needs` | Existierende Wissens-IDs als Voraussetzungen |
| `summary`, `explanation` | Kurze Einführung ohne versteckte Lösungsantwort |
| `steps` | Konkrete Arbeitsschritte in sinnvoller Reihenfolge |
| `hints` | Vom kleinen Hinweis bis zur genaueren Hilfe |
| `checks` | Beobachtbare Eigenschaften und unabhängig bestimmte Ergebnisse |
| `solution` | Getrennter Code und Begründung der eigenen Musterlösung |
| `download` | Falls nötig: echter Dateilink und eindeutige Herkunft |

## Ein sicherer Erweiterungsablauf

1. Originalseite lesen; Eingaben, Ausgaben, Einheiten und Sonderfälle festhalten.
2. Eigene Erwartung separat berechnen. Für Diagramme auch dargestellte Daten und Achsen prüfen.
3. Einen passenden unabhängigen Prüffall in `scripts/uebungen_pruefen.py` oder der vorgesehenen Python-Prüfung ergänzen.
4. Übungsobjekt mit gestuften Hinweisen und getrenntem Lösungscode ergänzen.
5. In `pruefen.cjs` die tatsächliche Testzuordnung unter `testedSolutions` und gegebenenfalls das Inventar erweitern. Eine Liste mit einer neuen ID allein ersetzt keinen ausführenden Prüffall.
6. `abdeckung`, Quellen und Wissensverweise passend zum neuen Blatt erweitern.
7. Test, Download, Suche und Sichtbarkeit der Lösung prüfen; danach [[32 Entwicklung und Release]] befolgen.

## Die vorhandene CSV-Pipeline nicht versehentlich erweitern

Die drei IDs für 6.1–6.3 bilden eine zusammenhängende Pipeline über `pipelineIds`. Eine unabhängige neue Übung gehört nicht automatisch in diese Pipeline. Sie braucht ihre eigenen Voraussetzungen, Daten und Erwartungen. Der Test soll unbekannte ungeprüfte Lösungen ablehnen.

Die aktuelle Abdeckung zählt teilweise nach Aufgabennummern. Wenn ein weiteres Blatt ebenfalls eine Aufgabe 1.1 besitzt, reicht die Nummer nicht mehr. Vor Erweiterung die Zuordnung auf Blatt und Nummer beziehungsweise dauerhafte ID umstellen und beide gleich nummerierten Aufgaben getrennt testen.

## Dateien und fehlende Daten

Eigene Mini-Daten in `beispiele/` ablegen und eindeutig benennen. Keine synthetische Datei als fehlende Originaldatei ausgeben. Der sichtbare Download muss exakt der im Prüflauf verwendeten Datei entsprechen. Eine Kopierlösung muss auch mit ihrem ausgelieferten Hauptaufruf ausführbar sein.

Für neue CSV-Aufgaben passende Fehlerfälle wählen: leerer Inhalt, ungültige Zahl, fehlende Spalte, Grenzwerte und unerwartete Kodierung. Bei Zeitreihen zusätzlich ungültige oder unsortierte Zeiten sowie ungefüllte Restlücken betrachten. Fachliche Annahmen wie Interpolationsgrenzen explizit machen.

Abnahme: Aufgabe mit Herkunft, Hilfe und Lösung erreichbar; eigener Test führt den richtigen Code aus; Erwartungen stammen nicht aus derselben Implementierung; keine Antwort in Suchvorschauen.

## Projektbelege

- [Lernwerkzeug/ERWEITERN.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/ERWEITERN.md)
- [Lernwerkzeug/inhalte.js](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/inhalte.js)
- [Lernwerkzeug/pruefen.cjs](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefen.cjs)
- [scripts/uebungen_pruefen.py](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/scripts/uebungen_pruefen.py)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
