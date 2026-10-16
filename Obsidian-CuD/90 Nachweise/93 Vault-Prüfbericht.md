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
| Deutsche Markdown-Notizen | 36 |
| Aufgelöste Wikilinks | 256 |
| Nicht vom Start erreichbare Notizen | 0 |
| Notizen ohne eingehenden Link | 0 |
| Mermaid-Diagramme | 8 |
| Canvas-Dateikarten / Kanten | 29 / 30 |
| JSON-Konfiguration | Gültig |
| Community-Plugins | Keine |
| ECC-Aufgabenbeschreibungen | Vier eindeutige Befehle; Scope und Länge geprüft |
| Projektquellen an zitierten Commits | 56 Pfad-/Commitziele und 29 Zeilenanker geprüft |

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

## Erweiterung zur Hauptreferenz

Fünf Projektchats, ein nicht lesbarer Chat, 22 zentrale Projektdateien und der GitHub-Stand nach PR #11 wurden abgeglichen. [[94 Gesprächs- und Quellenabgleich]] nennt Umfang und Grenzen. Die isolierte Probe `node Obsidian-CuD/Pruefung/beispiel_pruefen.cjs` prüft das korrigierte Erweiterungsbeispiel einschließlich echter lokaler Quelle und unabhängiger Ausgabe; das Lernwerkzeug erhält dabei keine zusätzliche Lektion. [[Pruefung/Referenzabgleich.json|Referenzabgleich.json]] dokumentiert die Dateihashes und Unterschiede zur älteren Arbeitsablage.

## Korrektur der plattformabhängigen Manifestreihenfolge

Der erste Linux-CI-Lauf von PR #12 scheiterte ausschließlich an der Dateireihenfolge im Vaultmanifest; die gespeicherten Dateiinhalte waren gleich. Windows sortierte Path-Objekte anders als POSIX. Die Inventarliste wird jetzt ausdrücklich nach den relativen POSIX-Pfadzeichenfolgen sortiert. Ein Regressionstest mit gemischter Groß-/Kleinschreibung prüft diese Reihenfolge; eine reine Reihenfolgeabweichung erhält außerdem eine verständliche Fehlermeldung. Ausführen: `python -m unittest discover -s Obsidian-CuD/Pruefung -p "test_*.py"`. Die erneuten GitHub-Prüfungen sind der maßgebliche Nachweis für Windows und Linux.
