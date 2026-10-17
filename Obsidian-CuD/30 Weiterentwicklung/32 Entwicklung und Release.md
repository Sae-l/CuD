---
title: "32 Entwicklung und Release"
description: "Zum bloßen Lesen der Website ist diese Umgebung nicht erforderlich. Die Entwicklungsvorgaben sind Node.js 24, Python 3.12, npm-Lockdatei und die exakt versionierten Testpakete. Maßgeblich sind die jeweils aktuellen Datei"
type: note
language: de
created: 2026-10-16
updated: 2026-10-17
status: dokumentiert
tags: ["cud"]
---

# Reproduzierbar entwickeln und Änderungen übernehmen

Zum bloßen Lesen der Website ist diese Umgebung nicht erforderlich. Die Entwicklungsvorgaben sind Node.js 24, Python 3.12, npm-Lockdatei und die exakt versionierten Testpakete. Maßgeblich sind die jeweils aktuellen Dateien im bearbeiteten Checkout.

## Einen echten Checkout verwenden

Vor Änderungen tatsächlichen Checkout, Branch, Remote und Arbeitsbaum prüfen. Beim Repositoryabgleich vom 17.10.2026 enthielt die übergeordnete Arbeitsablage kein `.git`; die Korrektur begann deshalb in einem sauberen Checkout der aktuellen `main` auf `b296826`. Eine Dokumentationskopie ist kein Ersatz für einen Git-Arbeitsbaum. [[90 Stand und Nachweise]] hält diesen zeitlich begrenzten Befund fest.

Eine gemischte Arbeitskopie nicht pauschal über die aktuelle `main` kopieren. Zuerst den aktuellen entfernten Stand abrufen, Originalhashes vergleichen und die Unterschiede von HTML, CSS, JavaScript, Daten und Tests gemeinsam reviewen. Nur beabsichtigte Reparaturen übernehmen. Auch wenn JavaScript neuer ist, kann die danebenliegende CSS-Datei noch vor einer bereits übernommenen Gestaltung liegen. Das Manifest erkennt eine Dateiveränderung, entscheidet aber nicht, welcher Stand fachlich oder gestalterisch richtig ist.

```sh
git clone https://github.com/Sae-l/CuD.git
cd CuD
git status --short
git switch -c docs/gepruefte-erweiterung
```

Branchname und Ziel an die konkrete Änderung anpassen. Zugangsdaten gehören in den System-Anmeldedienst, nicht in URLs oder Dateien.

## Windows / PowerShell

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-test.txt
npm ci --ignore-scripts
npx --no-install playwright install --only-shell chromium firefox webkit
$env:LERNWERKZEUG_PYTHON = (Resolve-Path '.venv\Scripts\python.exe').Path
npm test
.\.venv\Scripts\python.exe -m unittest discover -s scripts -p 'test_*.py'
```

Eine vorhandene passende Python-3.12-Installation lässt sich auch über ihren absoluten Pfad aufrufen. Das Beispiel erfordert weder eine Aktivierung der Umgebung noch eine Änderung der PowerShell-Ausführungsrichtlinie.

## macOS / Linux

```sh
python3.12 -m venv .venv
./.venv/bin/python -m pip install -r requirements-test.txt
npm ci --ignore-scripts
npx --no-install playwright install --only-shell chromium firefox webkit
export LERNWERKZEUG_PYTHON="$PWD/.venv/bin/python"
npm test
./.venv/bin/python -m unittest discover -s scripts -p 'test_*.py'
```

Die Befehle beschreiben eine Einrichtung und sind kein durchgeführter macOS-Test. Browser können zusätzliche Systempakete benötigen. Vorhandene offizielle Voraussetzungen beachten; Schutzfunktionen nicht deaktivieren.

## Manifest bewusst pflegen

Vor Änderungen `scripts/manifest.py --check` mit dem gewählten Interpreter ausführen. Nach Änderungen zuerst den Diff und die Originalhashes prüfen. Erst dann `--write`, danach erneut `--check`. Unter Windows den Interpreter der Umgebung voranstellen, unter macOS/Linux entsprechend `./.venv/bin/python`.

Ein fehlgeschlagener Manifestcheck darf nicht durch blindes Neuschreiben beseitigt werden. `.claude/` und die Root-`.obsidian/` sind lokale Konfiguration und vom Manifest ausgeschlossen. Die gemeinsamen Einstellungen unter `Obsidian-CuD/.obsidian/` gehören zum Vault; dessen persönliche `workspace*.json` bleiben ausgeschlossen. Zuerst Inhalte und Diff prüfen, danach das Vaultmanifest und anschließend das Projektmanifest bewusst erneuern.

## Pull Request, CI und Release

Kleine Änderung abgrenzen, Tests und Grenzen beschreiben, Diff reviewen und erforderliche CI-Prüfungen am tatsächlichen Commit abwarten. Die vorhandene Workflow-Datei prüft Windows und Linux. Das Vorhandensein dieser Datei beweist keinen aktuellen grünen Lauf oder aktive Branchregeln.

Für ein Release müssen `package.json`, Lockdatei und Tag zusammenpassen. `scripts/release.py` baut das ZIP aus dem Manifest und prüft die Einträge bytegenau; `SHA256SUMS` dokumentiert das Paket. Den Versionsnamen im dort beschriebenen Aufruf verwenden, nicht unverändert einen alten Tag neu veröffentlichen.

Die Wartungsausgabe **v0.2.3** vom 17.10.2026 ergänzt die Gestaltungskorrektur aus v0.2.2 um klare Quiz- und Fortschrittszustände, größere geprüfte Bedienziele und kurze, bewegungsarme Bedienübergänge. Der Verhaltensstand `74ba715` bestand die vollständige Windows-/Linux-Matrix mit 3192 Layoutprüfungen. [Projektprüfung #31](https://github.com/Sae-l/CuD/actions/runs/39017560114) ist dieser konkrete Nachweis; geänderte Release-Eingaben müssen erneut geprüft werden.

Die Versionsnummer allein ist noch kein Beleg für einen veröffentlichten Release. Den Abschluss anhand von Tag-Ziel, erfolgreichem Release-Workflow, ZIP und `SHA256SUMS` zurücklesen. Anschließend Pages gesondert am übernommenen Commit prüfen: Quelle ist die Repository-Wurzel `/`; beide Webseiten und ihre lokalen Assets müssen unter `/CuD/` erreichbar sein. Merge, Release und Pages-Deployment sind getrennte Nachweise. Die lokale WebKit-Signatursperre bleibt ein eigener FAIL-Befund; Schutzregeln und Pflichtmatrix werden dafür nicht abgeschwächt.

Vor der Integration Funktion und Gestaltung getrennt prüfen, Nachweise aktualisieren, Vault- und Projektmanifest bewusst erneuern und die aktuelle Windows-/Linux-CI abwarten. Private Designnachweise bleiben lokal im ausgeschlossenen Arbeitsbereich. Die ausführliche Schrittfolge steht in `CONTRIBUTING.md`; [[52 Gestaltung und Barrierearmut]] beschreibt die gerenderte Abnahme.

Das früher bereitgestellte Vault-ZIP war ein eigenständiges Dokumentationspaket. Inzwischen ist der Vault Teil des veröffentlichten CuD-Repositories. [[42 GitHub Repositoryplan]] beschreibt seine Einordnung.

## Lernplan-Ausgabe v0.3.0

Die veröffentlichte Ausgabe vom 17.10.2026 ergänzt den persönlichen Lernplan, Wiederholungsrunden mit festen Abständen und Lektionssprünge. Bestehende Bearbeitungsmarken bleiben erhalten; Wiederholungsdaten liegen separat im Browser. Neue Vorlesungen nutzen den vorhandenen Datenvertrag. Der [Entwicklungsplan](../../ENTWICKLUNGSPLAN.md) beschreibt Gestaltung, Lernmethoden, Struktur und Gebrauchstest. Die bestandenen Windows-/Linux-Jobs und der erfolgreiche Tag-Workflow für `b296826` stehen in [[90 Stand und Nachweise]]. Der lokale Firefox-Startfehler bleibt ein eigener Befund. Releaseartefakte sind `CuD-1-v0.3.0.zip` und `SHA256SUMS`; spätere Änderungen brauchen eigene CI.

## Projektbelege

- [CONTRIBUTING.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/CONTRIBUTING.md)
- [scripts/manifest.py](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/scripts/manifest.py)
- [scripts/release.py](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/scripts/release.py)
- [.github/workflows/check.yml](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/.github/workflows/check.yml)
- [.github/workflows/release.yml](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/.github/workflows/release.yml)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
