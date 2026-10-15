# Am Lernwerkzeug mitarbeiten

Das Lernwerkzeug ist eine statische Webseite ohne Buildschritt. Für Text- und Layoutänderungen bearbeitest du die vorhandenen HTML-, CSS- und JavaScript-Dateien. Die Originalunterlagen in `Referenz/` bleiben unverändert. Herkunft und Rechte fremder Kursmaterialien werden durch einen Beitrag nicht geändert.

## Die passende Datei finden

| Änderung | Datei |
| --- | --- |
| Grundgerüst und Navigation | `Lernwerkzeug/index.html` |
| Layout, Fokus und Animationen | `Lernwerkzeug/styles.css` |
| Suche, Seitenwechsel und Darstellung | `Lernwerkzeug/app.js` |
| CSV-Aufgaben, Befehle und Fehlerhilfen | `Lernwerkzeug/inhalte.js` |
| Vorlesungsetappen, Einrichtung und weitere Befehle | `Lernwerkzeug/kurs.js` |
| Inhalts-, Python- und Browserprüfungen | `Lernwerkzeug/pruefen.cjs` |
| Browser- und Ansichtsgrößenprüfung | `Lernwerkzeug/kompatibilitaet.cjs` |
| Integritätsmanifest prüfen/erneuern | `scripts/manifest.py` |

Neue Inhalte: [ERWEITERN.md](Lernwerkzeug/ERWEITERN.md) beschreibt den Datenvertrag, Quellendateien, Quizfelder und getrennte Python-Prüffälle für neue Originalübungen. [ABDECKUNG.md](Lernwerkzeug/ABDECKUNG.md) trennt Erklärungen von geführten Originalaufgaben. Lektionenanzahl und Kursnavigation werden aus den Daten abgeleitet.

Beschränke eine Änderung auf ihren Zweck. Wenn du eine Inhalts-ID änderst, prüfe auch Navigation, Querverweise, Suchfälle und Tests. Hinweise, Musterlösungen und Zahlenantworten gehören nicht in den Suchindex oder in Vorschauen. Eigene Beispiele müssen als solche erkennbar bleiben; belege Kursaufgaben mit Quelle und Seite.

## Prüfumgebung einrichten

Voraussetzungen: **Node.js 24**, **Python 3.12**, npm und Internet für die erstmalige Installation. Führe die Befehle im Repository-Ordner aus. `.node-version`, `.python-version`, `requirements-test.txt` (einschließlich transitiver Python-Abhängigkeiten) und `package-lock.json` legen die Prüfumgebung fest; für die Webseite selbst sind sie nicht nötig.

### Windows / PowerShell

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-test.txt
npm ci
npx playwright install --only-shell chromium firefox webkit
$env:LERNWERKZEUG_PYTHON = (Resolve-Path '.venv\Scripts\python.exe').Path
npm test
```

Falls `python` nicht erreichbar ist, nutze für den ersten Befehl `py -3 -m venv .venv`. Die weiteren Befehle verwenden die Umgebung direkt; du musst sie nicht aktivieren und keine PowerShell-Ausführungsrichtlinie ändern.

### macOS / Linux

```sh
python3 -m venv .venv
./.venv/bin/python -m pip install -r requirements-test.txt
npm ci
npx playwright install --only-shell chromium firefox webkit
export LERNWERKZEUG_PYTHON="$PWD/.venv/bin/python"
npm test
```

`LERNWERKZEUG_PYTHON` ist optional und wählt den Python-Interpreter für die Tests. Setze die Variable, wenn die benötigten Python-Pakete in einer eigenen Umgebung liegen. Die obigen Befehle beschreiben die Einrichtung; sie belegen keine bereits erfolgte Prüfung auf macOS oder Linux. Browser können zusätzliche Systemvoraussetzungen benötigen.

## Vor dem Einreichen prüfen

`npm test` führt zuerst `Lernwerkzeug/pruefen.cjs`, danach `Lernwerkzeug/kompatibilitaet.cjs` aus. Ein Fehler beendet den Testaufruf mit einem Fehlerstatus. Maschinenlesbare Ergebnisse und Screenshots werden unter `Lernwerkzeug/pruefung/` aktualisiert; der lesbare Prüfbericht wird gesondert gepflegt:

- [ergebnis.json](Lernwerkzeug/pruefung/ergebnis.json): Inhalts-, Python- und Browserprüfungen.
- [kompatibilitaet.json](Lernwerkzeug/pruefung/kompatibilitaet.json): Browser, Ansichtsgrößen und Ergebnisse der Kompatibilitätsprüfung.
- [PRUEFBERICHT.md](Lernwerkzeug/pruefung/PRUEFBERICHT.md): lesbare Einordnung und offene Prüfungen.

Prüfe die betroffenen Ansichten außerdem im Browser, einschließlich schmaler Breite, Tastaturbedienung und reduzierter Bewegung. Aktualisiere den lesbaren Prüfbericht nur mit tatsächlich gewonnenen Nachweisen. Emulierte Geräte ersetzen keine echten Geräte; Playwright-WebKit ersetzt keinen Safari-Test auf Apple-Hardware.

Bei Änderungen an `scripts/manifest.py` führe zusätzlich `python -m unittest discover -s scripts -p 'test_*.py'` aus. Prüfe anschließend das Dateimanifest mit dem Python-Interpreter deiner Umgebung:

```sh
python scripts/manifest.py --check
```

Wenn du Projektdateien absichtlich geändert hast, kontrolliere zuerst den Diff. Aktualisiere das Manifest anschließend ausdrücklich und prüfe es erneut:

```sh
python scripts/manifest.py --write
python scripts/manifest.py --check
```

Ersetze hier `python` bei Bedarf durch `.\.venv\Scripts\python.exe` unter Windows oder `./.venv/bin/python` unter macOS/Linux. Verwende `--write` nur für geprüfte Änderungen; es bestätigt keine inhaltliche Richtigkeit und darf keine unbeabsichtigte Änderung an Originaldateien verdecken.

Beschreibe beim Einreichen das behobene Problem, die sichtbare Änderung, die ausgeführten Tests und verbleibende Grenzen. Hinweise zum Projektstand stehen in [AUDIT.md](AUDIT.md), offene Lern- und Quellenfragen im [Arbeitsplan](ARBEITSPLAN_Lernwerkzeug.md) und [Lernkonzept](Lernwerkzeug/LERNKONZEPT.md).

## Automatische Prüfungen und Release

Die Workflows unter `.github/workflows/` prüfen Windows und Linux bei Pull Requests und Änderungen an main. Alle Actions sind auf Commit-IDs festgelegt. Laufzeit- und Paketänderungen kommen über Dependabot als prüfbare Pull Requests. Standardrechte sind lesend; nur der Release-Job darf Releases schreiben.

Vor einem Release: Tests und `python -m unittest discover -s scripts -p "test_*.py"` ausführen, Nachweise und Manifest aktualisieren, Änderungen reviewen und übernehmen. `package.json`, Lockdatei und Tag müssen dieselbe Version haben. `python scripts/release.py v0.2.1` erzeugt das geprüfte ZIP und SHA256SUMS lokal; der Tag-Workflow führt diesen Schritt nach eigenen Tests aus. Prüfberichte aus CI werden als Artefakte gespeichert; das veröffentlichte ZIP enthält die geprüften Commit-Bytes. Repository-Einstellungen und verbleibende Grenzen: [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md).

Dependabot ändert absichtlich kein Integritätsmanifest. Ein Paket-PR scheitert deshalb zunächst am Manifest, bis ein Maintainer den begrenzten Paket-Diff geprüft, das Manifest mit --write aktualisiert und sämtliche Prüfungen ausgeführt hat. Das Manifest darf in CI nicht automatisch neu geschrieben werden.
