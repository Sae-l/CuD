---
title: "28 Komponenten und Einstiegspunkte"
description: "Aus den geprüften Dateien erzeugte Funktionskarte und Zuordnung von Änderungen zu Tests."
type: "note"
language: de
created: "2026-10-16"
updated: "2026-10-16"
status: "dokumentiert"
tags: ["cud", "wartung"]
reviewed_commit: "b784b9bed47ba9232c0e121b0f496a6dd75b119d"
---

# Den richtigen Eingriffspunkt finden

 Diese Karte bezieht sich auf den verlinkten Commit. Zeilennummern sind keine zeitlose API; bei neuem Code die Suche nach dem Funktionsnamen verwenden. Die Codeorte wurden aus den Dateien gelesen und nicht aus alten Chatantworten übernommen.

 | Änderung oder Untersuchung | Datei | Passende Prüfung |
 | --- | --- | --- |
 | Suchnormalisierung und Treffergewicht | app.js: normalize, findItems | Suchfälle in pruefen.cjs, inklusive Operatoren und Docstring |
 | Darstellung, Hinweise und Lösung | app.js: renderItem, sourceLinks | Betroffene Ansicht, Quellenverweise und Lösungsvorschau |
 | Quiz und Bearbeitungsmarke | app.js: renderQuiz, renderProgress | Richtige/falsche Option, Reload und blockierter Speicher |
 | Routen, Verlauf und Fokus | app.js: route, setNavigation | Tastatur, Zurück/Vorwärts und mobile Navigation |
 | Bewegung auf der Startseite | app.js: animateStart, syncMotion; styles.css | Reduzierte Bewegung und Trigger nach Seitenwechsel |
 | Neue Vorlesung | kurs.js: vorlesungen und Ableitungsschleife | Pflichtfelder, IDs, Quellen, Quiz und Beispielausgabe |
 | Neue Aufgabe | inhalte.js beziehungsweise kurs.js; testedSolutions | Eigener unabhängiger Python-Prüffall und Downloadbytes |
 | Fehlermeldung einer Lernlösung | scripts/uebungen_pruefen.py und jeweiliges Lösungsobjekt | Passende Daten- und Grenzfälle |
 | Integrität | scripts/manifest.py: entries | Vorhandener Manifest-Unit-Test und --check |
 | Release | scripts/release.py: pack | Vorhandener Release-Unit-Test und Paketreadback |
 | Gesamtes Browserlayout | kompatibilitaet.cjs | Engine-/Größenmatrix; echte Geräte getrennt |
 | Wissensbasis | Obsidian-CuD/Pruefung/vault_pruefen.py | Links, Erreichbarkeit, Canvas und Vaultmanifest |

 ## Gefundene Symbole

 | Symbol | Geprüfte Quellstelle |
 | --- | --- |
 | `syncMotion()` | [Lernwerkzeug/app.js, Zeile 10](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L10) |
| `normalize()` | [Lernwerkzeug/app.js, Zeile 31](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L31) |
| `findItems()` | [Lernwerkzeug/app.js, Zeile 35](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L35) |
| `el()` | [Lernwerkzeug/app.js, Zeile 50](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L50) |
| `section()` | [Lernwerkzeug/app.js, Zeile 57](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L57) |
| `textList()` | [Lernwerkzeug/app.js, Zeile 61](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L61) |
| `itemLinks()` | [Lernwerkzeug/app.js, Zeile 69](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L69) |
| `codeBlock()` | [Lernwerkzeug/app.js, Zeile 83](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L83) |
| `renderQuiz()` | [Lernwerkzeug/app.js, Zeile 91](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L91) |
| `renderProgress()` | [Lernwerkzeug/app.js, Zeile 115](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L115) |
| `sourceLinks()` | [Lernwerkzeug/app.js, Zeile 132](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L132) |
| `renderItem()` | [Lernwerkzeug/app.js, Zeile 167](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L167) |
| `renderStart()` | [Lernwerkzeug/app.js, Zeile 268](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L268) |
| `animateStart()` | [Lernwerkzeug/app.js, Zeile 371](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L371) |
| `actionLink()` | [Lernwerkzeug/app.js, Zeile 385](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L385) |
| `renderLectures()` | [Lernwerkzeug/app.js, Zeile 389](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L389) |
| `renderCoverage()` | [Lernwerkzeug/app.js, Zeile 413](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L413) |
| `renderExercise()` | [Lernwerkzeug/app.js, Zeile 434](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L434) |
| `renderCommands()` | [Lernwerkzeug/app.js, Zeile 448](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L448) |
| `renderConcept()` | [Lernwerkzeug/app.js, Zeile 479](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L479) |
| `selectedId()` | [Lernwerkzeug/app.js, Zeile 492](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L492) |
| `renderResults()` | [Lernwerkzeug/app.js, Zeile 494](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L494) |
| `route()` | [Lernwerkzeug/app.js, Zeile 509](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L509) |
| `setNavigation()` | [Lernwerkzeug/app.js, Zeile 538](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L538) |
| `resetSearch()` | [Lernwerkzeug/app.js, Zeile 555](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js#L555) |
| `entries()` | [scripts/manifest.py, Zeile 12](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/manifest.py#L12) |
| `main()` | [scripts/manifest.py, Zeile 27](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/manifest.py#L27) |
| `pack()` | [scripts/release.py, Zeile 12](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/release.py#L12) |
| `pruefe()` | [scripts/uebungen_pruefen.py, Zeile 10](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/uebungen_pruefen.py#L10) |

 ## Zwei Integritätsebenen

 `VAULT_MANIFEST.json` deckt die gewollten Vaultdateien ab und spart persönliche Workspace-/Cachedateien aus. `PROJEKT_MANIFEST.json` deckt die Projektdateien im Checkout ab. Der aktuelle Projektwalker besitzt eine andere Ausschlussliste als der Vaultprüfer: Persönliche Obsidian-Workspace-Dateien dürfen im Release-Checkout daher gar nicht erst als Paketinhalt liegen. Ein `.gitignore` allein ändert die Dateisammlung von `scripts/manifest.py` nicht.

 Beim bloßen Lesen in einem persönlichen Vault kann Obsidian Einstellungen verändern. Vor einem Upload solche Unterschiede sichten, Workspace-Dateien ausschließen und nur bewusst gewollte Einstellungen manifestieren. Eine fehlgeschlagene Integritätsprüfung benennt zunächst eine Byteabweichung, nicht automatisch einen Programmfehler.

## Geprüfte Projektquellen

- [Lernwerkzeug/app.js](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/app.js)
- [Lernwerkzeug/pruefen.cjs](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/pruefen.cjs)
- [Lernwerkzeug/kurs.js](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/kurs.js)
- [scripts/manifest.py](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/manifest.py)
- [scripts/release.py](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/release.py)

Weiter: [[03 Projektleitfaden]] · [[00 Start]] · [[94 Gesprächs- und Quellenabgleich]]
