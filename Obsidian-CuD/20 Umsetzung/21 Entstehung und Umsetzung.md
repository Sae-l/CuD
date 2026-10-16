---
title: "21 Entstehung und Umsetzung"
description: "Der folgende Ablauf beschreibt dokumentierte Arbeitsschritte. Er behauptet keine vollständige Rekonstruktion aller Chats oder aller Entscheidungen."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Der aus den Projektunterlagen rekonstruierte Entwicklungsweg

Der folgende Ablauf beschreibt dokumentierte Arbeitsschritte. Er behauptet keine vollständige Rekonstruktion aller Chats oder aller Entscheidungen.

## 1. Quellen erschließen

Originaldateien wurden in `Referenz/` erhalten und mit Hashwerten dokumentiert. `Referenz_Sichtung/Seitenindex.md` erschließt die PDFs nach Seiten. Textauszüge helfen beim Finden; Formeln, Screenshots und Aufgaben müssen an der gerenderten Originalseite geprüft werden. Der Index ist eine Suchhilfe, keine vollständige fachliche Abnahme.

## 2. Begrenzten CSV-Weg aufbauen

Die ursprüngliche Lernstrecke konzentrierte sich auf Aufgaben 6.1–6.3: Datei lesen, Daten filtern und auswerten. Aufgaben wurden mit benötigten Begriffen, kleinen Schritten, gestuften Hinweisen und getrennten Lösungen verbunden. CSV-Dateinamen und Sollzahlen wurden als Quellenkonflikte offengehalten.

## 3. Anfängerzugang ergänzen

Hinzu kamen Begrüßung, Einrichtung für Python und VS Code, geordnete Vorlesungsetappen und eine Befehlsübersicht. Die Daten für Lektionen wurden von der Darstellung getrennt. Die Lerntexte erhielten eigene Mini-Beispiele, Veränderungsaufträge und Transferaufgaben.

## 4. Bedienung und Tests verbessern

Suchoperatoren, Fokus nach Navigation, Tastaturzugang, mobile Navigation und reduzierte Bewegung wurden bearbeitet. Prüfungen führen Python-Beispiele aus, prüfen Querverweise und Downloads und untersuchen die Ansichten mit mehreren Browser-Engines. Manifest und Releasepaket kontrollieren die Dateiintegrität.

## 5. Inhaltliche Abdeckung erweitern

Version 0.2.1 begleitet alle 31 Aufgaben des vorhandenen Übungsblatts, vier Live-Übungen und zehn Etappen. Fehlende Originaldaten wurden nicht erfunden: Drei Live-Programme erhielten `live-mini.csv` als ausdrücklich synthetische Alternative. Die FFT-Einführung ist ein eigenes geprüftes Beispiel; der problematische Originalbegleitcode bleibt unverändert.

## 6. Gestaltung und öffentliche Startseite

Die Lernseite erhielt lokal ausgelieferte Schrift, Foto und GSAP-Unterstützung. Eine zusätzliche Root-Startseite stellt das Projekt vor und verlinkt zum Lernraum. Am 16.10.2026 waren beide aktuellen CuD-Adressen per HTTP erfolgreich erreichbar. Einzelheiten: [[50 Die Vorstellungswebsite]] und [[52 Gestaltung und Barrierearmut]].

## Für die weitere Arbeit beibehalten

Jede Erweiterung soll Herkunft, Lernziel, ausführbares Beispiel, unabhängige Erwartungen, Bedienprüfung und einen klar abgegrenzten Nachweis besitzen. Ein erzeugter Hash belegt Bytes; ein bestandener Softwaretest belegt seine Prüffälle. Beide ersetzen weder Rechteklärung noch Lernwirksamkeitsprüfung.

## Projektbelege

- [ARBEITSPLAN_Lernwerkzeug.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/ARBEITSPLAN_Lernwerkzeug.md)
- [AUDIT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/AUDIT.md)
- [RELEASE_NOTES.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/RELEASE_NOTES.md)
- [SKILL_RECHERCHE.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/SKILL_RECHERCHE.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
