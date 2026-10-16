---
title: "50 Die Vorstellungswebsite"
description: "**Adresse:** [sae-l.github.io/CuD/](https://sae-l.github.io/CuD/). **Datei:** Root-`index.html` im aktuellen GitHub-Repository. **Am 16.10.2026 geprüft:** HTTP 200, Titel „CuD · Programmieren lernen“. Der Quelltext wurde"
type: note
language: de
created: 2026-10-16
updated: 2026-10-17
status: dokumentiert
tags: ["cud"]
---

# Der öffentliche Einstieg erklärt das Angebot

**Adresse:** [sae-l.github.io/CuD/](https://sae-l.github.io/CuD/). **Datei:** Root-`index.html` im aktuellen GitHub-Repository. **Am 16.10.2026 geprüft:** HTTP 200, Titel „CuD · Programmieren lernen“. Der Quelltext wurde über den GitHub-Connector gelesen; dies ist keine neue vollständige visuelle oder mobile Abnahme.

## Ziel und Aufbau

Die Seite richtet sich an Personen, die das Projekt noch nicht kennen. Sie erklärt Nutzen, Umfang, Lernweg und lokalen Einstieg. Der sichtbare Hauptsatz lautet „Programmieren lernen, ganz ohne Vorwissen.“ Die primären Aktionen öffnen den Lernraum oder laden den vollständigen `main`-Projektstand als ZIP. Ein Branch-ZIP ist veränderlich; ein Releaseasset gehört zu seinem festen Tag.

| Abschnitt | Inhalt und Funktion |
| --- | --- |
| Navigation | Inhalt, Ablauf, lokaler Start, GitHub und direkter Lernraumzugang |
| Einstieg | Kurzer Zweck, dekoratives Laptopbild und kleines Codebeispiel |
| Kennzahlen und Inhaltskarten | Zehn Etappen, Aufgabenbegleitung, Befehle, Einrichtung, Bearbeitungsmarken und Transferprojekt |
| Ablauf | Aufgabe → Wissen → Befehl → Ausprobieren → Prüfen |
| Lokal starten | Vollständiges ZIP laden, entpacken, Lernstartdatei öffnen; alternativ Git |
| Grenzen | Fehlende Originaldaten, selbst erstellte Lerntexte und fehlender Kompetenznachweis |
| Abschluss und Footer | Lernraum, Abdeckungsplan und Gestaltungshinweise |

## Technischer Aufbau

Die Root-Seite enthält HTML, eigene CSS-Regeln und kleines JavaScript für Einblendungen und das mobile Menü. Schrift und Foto referenzieren `Lernwerkzeug/assets/`. Sie ist daher nicht unabhängig von diesem Assetordner. Ihre Gestaltung verwendet helle Flächen, dunkelgrüne Aktionen und einen hellgrünen Akzent.

Der Link `Lernwerkzeug/index.html` öffnet die eigentliche Anwendung auch im entpackten Dateibetrieb. Der GitHub-Link führt zum Quellrepository, der Downloadlink zum vollständigen Branch-ZIP. Eine GitHub-Dateiansicht führt die HTML-Seite nicht als Lernanwendung aus. Nur diese HTML-Datei zu speichern genügt nicht: lokale Schrift, Foto, Anwendung und Quellenordner gehören dazu.

Die Inhaltsüberschriften öffnen ihre passenden Lernbereiche direkt über `Lernwerkzeug/index.html#…`: Vorlesungen, Übungen, Befehle und Einrichtung. Im Footer des Lernraums führt **CuD Startseite** zurück zur Vorstellung. Beide Wege gehören zur Navigationsprüfung; auch die Tastatur muss die Überschriftenlinks erreichen können.

## Was sie erklären sollte

Besucher sollen sofort verstehen: Für wen ist CuD? Wie starte ich? Wo läuft Python? Welche Aufgaben sind begleitet? Welche Grenzen gelten? Die Seite sollte beim Umfang immer denselben Stand wie README und Abdeckungsplan nennen. Eine Aussage über garantierten Lernerfolg oder pauschal geprüfte Geräte wäre durch die derzeitigen Belege nicht gedeckt.

## Wartung und Prüfung

Die HTTP-Angabe vom 16.10.2026 oben bleibt ein datierter Nachweis. Bei jeder Veröffentlichung aktuelle URL, Hauptaktion, mobilen Menüweg, Offline-Einstieg und tatsächlichen Download prüfen. Der Footer muss den gültigen Projektzweck und Herkunftshinweise korrekt wiedergeben; ältere Angaben über eine private Ablage sind kein Zugriffsschutz. Der sichtbare Autorenname lautet **Mohamed Saeed Alhalak**; er ersetzt keine Quellen- und Lizenzangaben fremder Materialien.

Der interaktive Lernraum ist unter [[51 Das Lernwerkzeug]] beschrieben; die geplante Sichtbarkeit von Dateien unter [[43 Sichtbarkeit für Besucher]].

## Projektbelege

- [index.html](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/index.html)
- [README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/README.md)
- [Lernwerkzeug/assets/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/README.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
