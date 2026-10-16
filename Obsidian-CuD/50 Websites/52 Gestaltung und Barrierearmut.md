---
title: "52 Gestaltung und Barrierearmut"
description: "Der Lernraum verwendet eine ruhige helle Grundfläche, dunkelgrüne Aktionen und einen hellgrünen Akzent. Die lokal mitgelieferte Outfit-Schrift steht neben einer Monospace-Schrift für Code. Texte bleiben gut lesbar; breit"
type: note
language: de
created: 2026-10-16
updated: 2026-10-17
status: dokumentiert
tags: ["cud"]
---

# Gestaltung soll das Arbeiten unterstützen

Der Lernraum verwendet eine ruhige helle Grundfläche, dunkelgrüne Aktionen und einen hellgrünen Akzent. Die lokal mitgelieferte Outfit-Schrift steht neben einer Monospace-Schrift für Code. Texte bleiben gut lesbar; breite Tabellen und Codebereiche dürfen innerhalb ihres eigenen Bereichs seitlich scrollen.

## Im Projekt vorhandene Bedienhilfen

- Sprunglink zum Lerninhalt und semantische Navigationsbereiche.
- Sichtbarer Tastaturfokus und Fokusführung nach Seitenwechseln.
- Aufklappbare mobile Navigation mit Zustandsattributen und Escape-Verhalten.
- Lernfragen mit begründeter Rückmeldung statt eines bloßen Farbsignals.
- Von Hand bedienbares Lerntipp-Karussell und Hilfefelder.
- Berücksichtigung reduzierter Bewegung; Aufräumen von Animationen bei Seitenwechseln.

Diese Funktionen sind in Code und gespeicherten Prüfungen beschrieben. Eine umfassende Barrierefreiheitskonformität oder eine Screenreaderabnahme wurde nicht nachgewiesen. Begriffe wie „barrierefrei“ deshalb nicht pauschal als bestätigten Produktstatus verwenden.

## Dekoration und Bewegung

GSAP und ScrollTrigger unterstützen Bildbewegung und Kartenstaffelung im Lernraum. Bei reduzierter Bewegung soll der Inhalt vollständig sichtbar und bedienbar bleiben. Das dekorative Foto zeigt weder einen erforderlichen Gerätetyp noch einen realen Kursraum. Die Vorstellungsseite verwendet eigene CSS-Effekte und JavaScript; sie ist ein eigener Prüfgegenstand.

## Herkunft und Lizenzen

Outfit wird mit SIL Open Font License ausgeliefert. GSAP und ScrollTrigger haben eigene Lizenzhinweise. Fotoherkunft, Downloadadressen, Dateigrößen und Hashwerte sind im Assetverzeichnis dokumentiert. Eine Quellangabe ersetzt nicht die Prüfung des jeweils vorgesehenen Nutzungsumfangs. Beim Austausch Hinweise und Integritätswerte aktualisieren; nicht still auf externe Font- oder Bildserver wechseln.

## Gestaltung vor Rückschritten schützen

Vor einer Änderung Zweck, Hauptaktion, visuelle Referenz und Zielgrößen festhalten. Projektstartseite und Lernraum bei denselben schmalen und breiten Größen vor und nach der Änderung ansehen. Hierarchie, Textumbrüche, Abstände, Bildausschnitt, Kontrast, Tastaturfokus und mobile Menübedienung prüfen. Lange Titel und Code dürfen benachbarte Bedienelemente nicht verdrängen. Funktions- und Überlaufprüfungen allein erkennen keinen Wechsel zu einer älteren Gestaltung.

Leere Suche, unbekannte Route, Quizrückmeldung, blockierter Speicher und fehlende Originaldaten brauchen verständliche Rückmeldung und einen nächsten Schritt. Ein nicht geprüfter Zustand bleibt ungeprüft. Private Screenshots und das JSON-Protokoll der Skill-Prüfung liegen lokal unter `.upload-work/design-review/`; sie werden nicht veröffentlicht oder an externe Referenzdienste geschickt. Der reguläre Prüfbericht hält die tatsächlich gewonnenen Beobachtungen und Grenzen fest. Der Skill-Checker kontrolliert die Vollständigkeit des Protokolls, nicht die Qualität der Gestaltung.

## Sinnvolle nächste Nutzungsprüfung

Mit Tastatur alle Aktionen erreichen, bei 200 Prozent Zoom lesen und schmale Breiten kontrollieren. Auf realen Touchgeräten Download und Navigation ausprobieren. Mit Screenreader Überschriften, Links, Klappzustände und Rückmeldungen prüfen. Anschließend mit Anfängern beobachten, ob Design und Bewegung die Aufgabe erleichtern. [[23 Qualität und Prüfungen]] trennt die Nachweisarten.

## Projektbelege

- [Lernwerkzeug/styles.css](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/styles.css)
- [Lernwerkzeug/app.js](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/app.js)
- [Lernwerkzeug/assets/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/README.md)
- [Lernwerkzeug/assets/sources.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/sources.json)
- [Lernwerkzeug/pruefung/PRUEFBERICHT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/PRUEFBERICHT.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
