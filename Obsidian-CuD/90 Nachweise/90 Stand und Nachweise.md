---
title: "90 Stand und Nachweise"
description: "Diese Übersicht trennt aktuelle Abfragen, vorhandene Softwareberichte, lokale Arbeitsdateien und Vorschläge. Sie ist die Bezugsebene für die Wissensseiten."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Belegstand vom 16.10.2026

Diese Übersicht trennt aktuelle Abfragen, vorhandene Softwareberichte, lokale Arbeitsdateien und Vorschläge. Sie ist die Bezugsebene für die Wissensseiten.

| Gegenstand | Tatsächlich beobachtet | Einordnung |
| --- | --- | --- |
| GitHub-Metadaten | Sae-l/CuD, `visibility: public`, `default_branch: main` | Live-Abfrage per GitHub-Connector |
| Entfernter main-Stand | `bdff10b0918473d8a37e05141a85fdf37c762c4d` | Öffentliche Commit-API und lokaler Design-Checkout stimmten überein |
| Vorstellungsseite | HTTP 200, Titel „CuD · Programmieren lernen“ | Aktuelle HTTP-Abfrage; Root-Quelltext zusätzlich per Connector |
| Lernraum | HTTP 200, Titel „Coding · Lernwerkzeug“ | Aktuelle HTTP-Abfrage, keine neue vollständige UI-Matrix |
| Anwendungsversion | 0.2.1 in package.json und Projekttexten | Dateibefund |
| Begleitung | 31 Aufgaben, vier Live-Übungen, zehn Etappen | Aktuelle Daten und Abdeckungsdokumentation |
| Softwareprüfung | PASS-Dateien vom 15.10.2026 | Übernommene zeitlich begrenzte Belege |
| Plattformen | Gespeicherte win32-Matrix, drei Engines, sieben Größen | Emulation und Windows-Engineprüfung |
| Branchschutz und Hostingkonfiguration | Frühere Dokumentation vorhanden | Aktive heutige Konfiguration nicht vollständig neu gelesen |
| Root-Manifest vor Änderungen | FAIL: `.claude/launch.json` | Vorbestehender Befund, nicht automatisch bereinigt |

Die bereinigte Abfragezusammenfassung liegt zusätzlich in [[Pruefung/Bestandsaufnahme.json|Bestandsaufnahme.json]]. Sie enthält keine Zugangsdaten oder vollständigen Benutzerprofile.

## Zwei lokale Ebenen

Der vorgegebene Arbeitsordner enthält das Lernwerkzeug, aber keinen eigenen Git-Arbeitsbaum und keine Root-Startseite. Ein vorhandener Design-Checkout unter dem ausgeschlossenen Arbeitsbereich enthält die Root-Seite und zeigt auf CuD. Für die Erklärung der aktuellen Vorstellungswebsite wurde deshalb der entfernte Quelltext gelesen. Unterschiede zwischen Arbeitskopien dürfen nicht durch die Behauptung einer vollständigen lokalen Remote-Parität verdeckt werden.

Die Quellenlinks in dieser Wissensbasis zeigen auf den gelesenen Commit. Die beiden Websiteadressen sind dagegen veränderliche Live-Adressen. Bei einer späteren Aktualisierung beide Ebenen erneut prüfen.

## Bekannte inhaltliche Grenzen

`bb12024.csv` fehlt; synthetische Downloads ersetzen keine Originalergebnisse. CSV-Zuordnung und Sollzahlen sind nicht abschließend vom Kurs bestätigt. Der Filter für Block 6 ist eine Arbeitsannahme und unterscheidet sich an der Nullgrenze von anderen Aufgaben. Die Originalquellen wurden nicht vollständig visuell abgenommen.

Echte Geräte, Safari auf Apple-Hardware, Screenreader, Anfänger-Gebrauchstest und tatsächlicher Lernerfolg sind weiterhin offene Nachweise. Keine neue externe Freigabe wurde erteilt.

## Bekannter Dokumentationskonflikt

Das heutige Repository ist öffentlich; README, Footer und ältere Settingsbeschreibung nennen teilweise eine private Ablage beziehungsweise CuD-1. Diese älteren Formulierungen sind nicht als aktueller Zugriffsschutz zu lesen. Die Korrektur ist ein Punkt in [[33 Entwicklungsplan]].

## Abgrenzung dieses Ergebnisses

Der Auftrag erzeugt einen deutschen Vault, eine Canvas-Gesamtkarte, Vorlagen, Quellenverzeichnis, Prüfer und ein eigenständiges ZIP. Er installiert keine Plugins und führt keine ECC-Implementierungskette aus. Der spätere ausdrückliche Uploadauftrag betrifft die Dokumentation und ihre Integration in das Repository. Die Strukturprüfung dieses Ergebnisses ist unter [[93 Vault-Prüfbericht]] beschrieben. Das Projektmanifest des übergeordneten Arbeitsordners bleibt unverändert. Im sauberen Upload-Checkout wird ausschließlich die beabsichtigte Dokumentation integriert.

## Projektbelege

- [Lernwerkzeug/pruefung/ergebnis.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/ergebnis.json)
- [Lernwerkzeug/pruefung/kompatibilitaet.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/kompatibilitaet.json)
- [Lernwerkzeug/ABDECKUNG.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/ABDECKUNG.md)
- [README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/README.md)
- [REPOSITORY_SETTINGS.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/REPOSITORY_SETTINGS.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]

## Ergänzung zum Uploadauftrag

Nach Erstellung des ersten Bestands wurden Einstellungen und Canvas-Anordnung in Obsidian verändert. Diese Änderungen wurden vor der Übernahme gesichtet und bleiben erhalten. Das Vaultmanifest wird für diesen geprüften Stand erneuert. Die Bestandsaufnahme.json dokumentiert weiterhin den ursprünglichen Erstellungszeitpunkt; ihr damaliger Eintrag zum Veröffentlichungsstatus ist historisch. Veröffentlichungsziel ist der Branch [docs/obsidian-cud-vault](https://github.com/Sae-l/CuD/tree/docs/obsidian-cud-vault).

## Ergänzung: zentrale Projektreferenz

Die erneute Repositorysichtung verwendet main auf `b784b9b` nach dem Merge von PR #11. Fünf Projektchats wurden gelesen, ein weiterer war technisch nicht lesbar. Implementierung, Arbeitskopien und alte Gesprächsstände werden unter [[94 Gesprächs- und Quellenabgleich]] getrennt. Die neue Hauptreferenz ist [[03 Projektleitfaden]]. Die obenstehenden Angaben bleiben als Erstaufnahme erhalten.
