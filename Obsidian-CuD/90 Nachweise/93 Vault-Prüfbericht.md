---
title: "93 Vault-Prüfbericht"
description: "Strukturprüfung, Integrität und Grenzen der deutschen CuD-Wissensbasis."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud", "nachweise"]
---

# Prüfung dieser Wissensbasis

Die lokale Strukturprüfung meldet **PASS**. Sie prüft diese Dokumentationsdateien und ihre Beziehungen, keine neue Abnahme des gesamten Lernwerkzeugs.

| Prüfung | Ergebnis |
| --- | --- |
| Deutsche Markdown-Notizen | 29 |
| Aufgelöste Wikilinks | 190 |
| Nicht vom Start erreichbare Notizen | 0 |
| Notizen ohne eingehenden Link | 0 |
| Mermaid-Diagramme | 5 |
| Canvas-Dateikarten / Kanten | 22 / 23 |
| JSON-Konfiguration | Gültig |
| Community-Plugins | Keine |
| ECC-Aufgabenbeschreibungen | Vier eindeutige Befehle; Scope und Länge geprüft |
| Projektquellen am zitierten Commit | 33 Dateien vorhanden |

## Wiederholen

Mit einer vorhandenen Python-3-Installation im Vault-Ordner:

```sh
python Pruefung/vault_pruefen.py
```

Unter macOS/Linux bei Bedarf `python3` beziehungsweise einen absoluten Interpreterpfad verwenden. Der normale Aufruf prüft Links, Eigenschaften, Canvas-Pfade, Erreichbarkeit, geschlossene Codeblöcke und gespeicherte SHA-256-Werte. Er benötigt weder Internet noch Zusatzpakete und verändert keine Notizen.

Nach bewusst reviewten Änderungen kann `python Pruefung/vault_pruefen.py --write` ausschließlich das Vaultmanifest erneuern. Anschließend den normalen prüfenden Aufruf wiederholen. Die Zahlen dieses lesbaren Berichts sind bei inhaltlichen Erweiterungen gesondert zu aktualisieren. Das Vaultmanifest ist unabhängig vom vorhandenen Projektmanifest.

## Belege und Grenzen

[[Pruefung/Bestandsaufnahme.json|Bestandsaufnahme.json]] enthält die aktuelle Repository- und HTTP-Sichtung. [[Pruefung/Quellenabgleich.json|Quellenabgleich.json]] dokumentiert die Existenz der verlinkten Projektdateien am gelesenen Commit und ihren Bytevergleich mit dem gesichteten Design-Checkout. Das ist keine neue fachliche Prüfung der ganzen Anwendung.

Die ZIP-Erstellung liest jeden Archiveintrag wieder und vergleicht ihn bytegenau mit der lokalen Datei. Die Paketprüfsumme liegt neben dem ZIP. Das Archiv enthält einen obersten Ordner `Obsidian-CuD`; diesen Ordner als Vault öffnen. Fremde Kurs-PDFs, persönliche Browserprofile und Zugangsdaten wurden dem Vault nicht hinzugefügt.

Nicht ausgeführt: Öffnen in installierten Obsidian-Apps auf Windows, Mac und Android, visuelle Canvas-/Mermaid-Abnahme in Obsidian, vollständige neue CuD-Browsermatrix oder Lernwirksamkeitsprüfung. Gültiges JSON und vorhandene Linkziele sind begrenzte Strukturbelege.

Der Projektmanifest-Vorabcheck war schon vor der Dokumentation wegen `.claude/launch.json` fehlgeschlagen. Der Vorbefund bleibt im übergeordneten Arbeitsordner erhalten. Für den ausdrücklich angeforderten Upload wird die Wissensbasis in einem sauberen Checkout gezielt in das Projektmanifest integriert. README und CI erhalten einen Dokumentationseinstieg beziehungsweise eine Vaultprüfung; die Lernanwendung wird nicht geändert.

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
