---
title: "26 Wiederaufbau und Arbeitsumgebung"
description: "Das bestehende Projekt aus einem kontrollierten Stand wiederherstellen und entwickeln."
type: "note"
language: de
created: "2026-10-16"
updated: "2026-10-16"
status: "dokumentiert"
tags: ["cud", "wartung"]
reviewed_commit: "b784b9bed47ba9232c0e121b0f496a6dd75b119d"
---

# Das bestehende Projekt nachvollziehbar aufbauen

Es gibt keinen Frontend-Compiler und keinen verpflichtenden Bundle-Build. Für die Anzeige werden die vorhandenen Webdateien ausgeliefert. „Bauen“ bedeutet hier: Quellen und eigene Inhalte pflegen, vollständig bereitstellen, Beispiele prüfen und bei Bedarf ein reproduzierbares Paket erstellen.

## 1. Ausgangsstand bestimmen

Eine verlässliche Arbeitskopie ist ein tatsächlicher Git-Checkout. Im Projekt-Oberordner liegen auch ältere Arbeitsdateien und Obsidian-Einstellungen; er besitzt selbst kein `.git`. Ein fremder Arbeitsordner darf nicht mit dem aktuellen GitHub-Stand gleichgesetzt werden. Eigene Änderungen zuerst sichern und sichten.

```sh
git clone https://github.com/Sae-l/CuD.git
cd CuD
git status --short
git log -1 --oneline
git remote -v
```

Für eine exakt reproduzierbare Untersuchung einen separaten Checkout am dokumentierten Commit verwenden. `main`, Release-Tag und lokale Arbeitskopie getrennt benennen. Das Release v0.2.1 stammt vor dem später ergänzten Vault; sein ZIP ist kein Download der jeweils neuesten main-Dateien.

## 2. Ohne Entwicklungsumgebung ansehen

Den gesamten Ordner erhalten und `index.html` für die Vorstellung beziehungsweise `Lernwerkzeug/index.html` für die Anwendung öffnen. Bei nicht unterstützter Dateiöffnung einen einfachen Server vom Projektordner aus verwenden:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Unter Windows einen vorhandenen Interpreter, etwa `py -3.12`, statt `python3` verwenden. Die Loopbackadresse ist nur vom selben Rechner erreichbar. Quellen, Assets und Daten müssen im relativen Aufbau erhalten bleiben. Weitere Betriebswege: [[41 Lokal Cloud und Synchronisation]].

## 3. Eine passende Prüfumgebung einrichten

`.node-version`, `.python-version`, `package-lock.json` und `requirements-test.txt` sind die Vorgaben. Die vorhandene Anleitung in [[32 Entwicklung und Release]] enthält Windows- und macOS/Linux-Befehle. Vorhandene passende Laufzeiten bevorzugen. Node/npm prüfen die Webanwendung, Python die Beispielprogramme. Beides ist von der normalen Browseranzeige zu unterscheiden.

## 4. Nachweise in richtiger Reihenfolge erzeugen

| Zeitpunkt | Prüfung | Bedeutung |
| --- | --- | --- |
| Direkt nach sauberem Checkout | Projektmanifest und Vaultprüfung | Ausgangsbytes und Dokumentationsstruktur |
| Nach Änderung | Betroffene fachliche oder Browserprüfung | Konkretes Verhalten |
| Bei Manifest-/Releaseänderung | Vorhandene Unit-Tests | Integritäts- und Paketlogik |
| Vor Integration | Erforderliche CI unter Windows und Linux | Nachweis am vorgesehenen Commit |
| Nach Freigabe | Byteprüfung und Downloadprüfung | Tatsächlich verteiltes Paket |

```sh
python scripts/manifest.py --check
python Obsidian-CuD/Pruefung/vault_pruefen.py
node Obsidian-CuD/Pruefung/beispiel_pruefen.cjs
python -m unittest discover -s scripts -p 'test_*.py'
npm test
```

`python` hier durch den tatsächlich gewählten Interpreter ersetzen. `npm test` schreibt Nachweise und Screenshots in `Lernwerkzeug/pruefung/` neu. Diese Änderungen anschließend im Diff beurteilen. Sie dürfen nicht unbesehen als ursprüngliche Paketbytes ausgegeben werden.

## 5. Paket oder Veröffentlichung vorbereiten

Die Website kann statisch bereitgestellt werden. Für ein Release prüft `scripts/release.py` passende Versionsangaben und alle Manifestbytes und baut eine ZIP-Datei. Der Tag-Workflow erzeugt nach seinen Prüfungen den veröffentlichten Download. Bestehende Release-Tags nicht für einen neuen Inhalt umdeuten; die geplante Version ausdrücklich festlegen.

Ein Quelltext-Download von GitHub enthält den aktuellen gewählten Branch; ein Releaseasset enthält seinen bestimmten Paketstand. Das Obsidian-Verzeichnis darin als eigenen Vault öffnen. Bei Unsicherheit zuerst [[90 Stand und Nachweise]] und [[94 Gesprächs- und Quellenabgleich]] prüfen.

## Geprüfte Projektquellen

- [CONTRIBUTING.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/CONTRIBUTING.md)
- [package.json](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/package.json)
- [.node-version](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/.node-version)
- [.python-version](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/.python-version)
- [requirements-test.txt](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/requirements-test.txt)
- [scripts/release.py](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/scripts/release.py)
- [.github/workflows/check.yml](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/.github/workflows/check.yml)
- [.github/workflows/release.yml](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/.github/workflows/release.yml)

Weiter: [[03 Projektleitfaden]] · [[00 Start]] · [[94 Gesprächs- und Quellenabgleich]]
