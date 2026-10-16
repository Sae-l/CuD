---
title: "43 Sichtbarkeit für Besucher"
description: "Die Sichtbarkeit ist auf drei Ebenen zu prüfen: im Lerninterface, in der ausgelieferten Website und im Git-Repository einschließlich Geschichte. Eine eingeklappte Karte oder ein fehlender Navigationslink schützt keine Da"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Was sichtbar sein soll und was wirklich privat bleiben kann

Die Sichtbarkeit ist auf drei Ebenen zu prüfen: im Lerninterface, in der ausgelieferten Website und im Git-Repository einschließlich Geschichte. Eine eingeklappte Karte oder ein fehlender Navigationslink schützt keine Datei vor Abruf.

| Inhalt | Lernende sehen | Repositorybesucher sehen | Empfohlener Umgang |
| --- | --- | --- | --- |
| Projektzweck und Einstieg | Sofort auf Startseite | README und Website | Öffentlich verständlich und aktuell |
| Lerntexte und Beispiele | Direkt erreichbar | Quelltext ist lesbar | Eigene freigegebene Inhalte veröffentlichen |
| Hinweise und Musterlösungen | Erst nach bewusstem Öffnen | Ausgelieferter JS-Code bleibt lesbar | Didaktisch dosieren; keine Geheimhaltung versprechen |
| Abdeckung und Einschränkungen | Sichtbar verlinken | Dokumentation | Fehlende Daten und offene Nachweise nennen |
| Fremde Original-PDFs und Auszüge | Nur bei passender Freigabe | Im öffentlichen Repo grundsätzlich erreichbar | Herkunft und Veröffentlichungsumfang konkret klären |
| Lizenz- und Assethinweise | Verlinkt | Im Repository erhalten | Mit veröffentlichen |
| Prüfberichte | Zusammengefasst | Reproduzierbare technische Belege | Persönliche Pfade und Bilder prüfen |
| Schlüssel, Tokens, Passwörter | Nie | Nie | Nicht in Dateien oder Git-Historie ablegen |
| Nutzernamen, private Notizen, Rohbeobachtungen | Nur nach bewusstem Zweck | Nicht standardmäßig öffentlich | Separat privat aufbewahren |
| Lokaler Lernstand | Im eigenen Browser | Nicht automatisch im Repo | Lokale Selbsteinschätzung beibehalten |

## Was am aktuellen Stand zu korrigieren ist

Das öffentliche Repository und der Footer beziehungsweise Teile des README sprechen noch von einer privaten Projektablage. Diese Formulierung stellt keinen Zugriffsschutz her. Die Wissensbasis dokumentiert den Widerspruch; eine spätere Produktänderung soll Texte und tatsächlichen Veröffentlichungsumfang zusammen korrigieren.

Eine Seitenleiste darf für Lernende technische Prüfskripte ausblenden, um den Einstieg einfach zu halten. Das ist eine Informationsentscheidung. Soll eine Datei geheim bleiben, darf sie weder in ein öffentliches Repository noch in ein öffentliches Deployment gelangen.

## Kursmaterial und Geschichte

Eine öffentliche Repositorysichtbarkeit erteilt keine zusätzliche Lizenz für enthaltene fremde Unterlagen. Die Original-PDFs, Textauszüge, Folienbilder und zugehörige Downloadpakete gehören gemeinsam in die Prüfung des Veröffentlichungsumfangs. Die Rechte werden durch SHA-256 oder eine private Herkunftsnotiz nicht bestätigt.

Falls bisher veröffentlichte sensible oder nicht freigegebene Inhalte betroffen sind, reicht das Entfernen im neuesten Commit nicht als vollständige Entfernung aus allen Kopien. Releases, Pages-Ausgabe, Git-Historie, Artefakte und bereits angefertigte Kopien sind getrennt zu betrachten. Bei einem versehentlich veröffentlichten Zugang muss dieser Zugang zuerst ungültig gemacht werden. Konkrete Änderungen daran benötigen einen eigenen abgegrenzten Auftrag.

Technische Anforderungen: [[44 Sicherheit und Datenschutz]]. Strukturvorschlag: [[42 GitHub Repositoryplan]].

## Projektbelege

- [README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/README.md)
- [REPOSITORY_SETTINGS.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/REPOSITORY_SETTINGS.md)
- [.gitignore](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/.gitignore)
- [Lernwerkzeug/ABDECKUNG.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/ABDECKUNG.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
