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

Beschränke eine Änderung auf ihren Zweck. Wenn du eine Inhalts-ID änderst, prüfe auch Navigation, Querverweise, Suchfälle und Tests. Hinweise, Musterlösungen und Zahlenantworten gehören nicht in den Suchindex oder in Vorschauen. Eigene Beispiele müssen als solche erkennbar bleiben; belege Kursaufgaben mit Quelle und Seite.

## Prüfumgebung einrichten

Voraussetzungen: **Node.js ab 20**, **Python ab 3.11**, npm und Internet für die erstmalige Installation. Führe die Befehle im Repository-Ordner aus. `requirements-test.txt` und `package-lock.json` legen die Testabhängigkeiten fest; für die Webseite selbst sind sie nicht nötig.

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
