# Am Lernwerkzeug mitarbeiten

Das Lernwerkzeug ist eine statische Webseite ohne Buildschritt. Für Text- und Layoutänderungen bearbeitest du die vorhandenen HTML-, CSS- und JavaScript-Dateien. Die Originalunterlagen in `Referenz/` bleiben unverändert. Herkunft und Rechte fremder Kursmaterialien werden durch einen Beitrag nicht geändert.

## Die passende Datei finden

| Änderung | Datei |
| --- | --- |
| Projektstartseite, ihr Layout und mobiles Menü | `index.html` im Repository-Ordner |
| Grundgerüst und Navigation des Lernraums | `Lernwerkzeug/index.html` |
| Layout, Fokus und Animationen des Lernraums | `Lernwerkzeug/styles.css` |
| Suche, Seitenwechsel und Darstellung | `Lernwerkzeug/app.js` |
| CSV-Aufgaben, Befehle und Fehlerhilfen | `Lernwerkzeug/inhalte.js` |
| Vorlesungsetappen, Einrichtung und weitere Befehle | `Lernwerkzeug/kurs.js` |
| Inhalts-, Python- und Browserprüfungen | `Lernwerkzeug/pruefen.cjs` |
| Browser- und Ansichtsgrößenprüfung | `Lernwerkzeug/kompatibilitaet.cjs` |
| Integritätsmanifest prüfen/erneuern | `scripts/manifest.py` |

Neue Inhalte: [ERWEITERN.md](Lernwerkzeug/ERWEITERN.md) beschreibt den Datenvertrag, Quellendateien, Quizfelder und getrennte Python-Prüffälle für neue Originalübungen. [ABDECKUNG.md](Lernwerkzeug/ABDECKUNG.md) trennt Erklärungen von geführten Originalaufgaben. Lektionenanzahl und Kursnavigation werden aus den Daten abgeleitet.

Beschränke eine Änderung auf ihren Zweck. Wenn du eine Inhalts-ID änderst, prüfe auch Navigation, Querverweise, Suchfälle und Tests. Hinweise, Musterlösungen und Zahlenantworten gehören nicht in den Suchindex oder in Vorschauen. Eigene Beispiele müssen als solche erkennbar bleiben; belege Kursaufgaben mit Quelle und Seite.

Die Projektstartseite und der Lernraum sind zwei getrennte Oberflächen. Eine Navigationskorrektur darf ihre Gestaltung nur so weit ändern, wie die Korrektur es braucht. Verwende für Einstiege aus dem Projektordner ausdrücklich `Lernwerkzeug/index.html`, bei Bedarf mit Inhaltsanker. Absolute Pfade wie `/Lernwerkzeug/` verlieren den Projektpfad auf GitHub Pages; reine Verzeichnislinks sind im Dateibetrieb unzuverlässig. Prüfe Einstiege sowohl über die entpackte `index.html` als auch über einen HTTP-Projektpfad wie `/CuD/index.html`.

Wenn der Arbeitsordner kein eigenes `.git` enthält, ist er kein vollständiger Git-Checkout. Vergleiche seine beabsichtigten Änderungen zuerst mit einem sauberen Checkout der aktuellen `main`: nicht nur JavaScript, sondern auch zugehöriges HTML, CSS, Inhaltsdaten, Tests und Manifest. Übernimm ausschließlich geprüfte Unterschiede. Ein neueres Änderungsdatum oder ein neu geschriebenes Manifest beweist nicht, dass eine Datei den neueren Funktions- oder Gestaltungsstand enthält.

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

Bei Gestaltungsänderungen dokumentierst du vor dem Editieren Ziel, Hauptaktion, vorhandene Referenzansicht und konkrete Zielgrößen. Vergleiche anschließend Screenshots beider Oberflächen bei denselben Größen. Kontrolliere Hierarchie, Zeilenumbrüche, Abstände, Kontrast und Bildausschnitt sowie Menü, Fokus und Touch-Ziele. Die automatischen Tests prüfen Verhalten und Geometrie; sie entscheiden nicht, ob eine Gestaltung besser geworden ist. Prüfe zusätzlich leere Suche, unbekannten Anker, Quizrückmeldungen, blockierte Speicherung und Hinweise auf fehlende Daten. Speichere nur die zum Stand gehörenden Nachweise; ein alter Screenshot belegt keinen neuen Commit.

Private Designvergleiche und lokale Skill-Nachweise bleiben unter dem ausgeschlossenen `.upload-work/design-review/`. Sie werden weder ins Repository noch zu einem externen Recherchedienst hochgeladen. Im veröffentlichten Prüfbericht stehen die gewonnenen Beobachtungen und ihre Grenzen; die dort vorgesehenen regulären Anwendungsnachweise bleiben davon getrennt.

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

## Automatische Prüfungen und Veröffentlichung

Die Workflows unter `.github/workflows/` prüfen Windows und Linux bei Pull Requests und Änderungen an main. Alle Actions sind auf Commit-IDs festgelegt. Laufzeit- und Paketänderungen kommen über Dependabot als prüfbare Pull Requests. Standardrechte sind lesend; nur der Release-Job darf Releases schreiben.

1. Prüfe den Ausgangsstand und arbeite in einem Änderungsbranch. Kontrolliere besonders unveränderte Originalunterlagen, Dateiumfang und ausgeschlossene lokale Arbeitsdateien.
2. Führe `npm test` und `python -m unittest discover -s scripts -p "test_*.py"` aus. Prüfe Funktion und Gestaltung wie oben beschrieben. Aktualisiere Nachweise, Abdeckung und Betriebsanleitung nur mit zutreffenden Angaben.
3. Lege die neue Version in `package.json` und `package-lock.json` identisch fest und aktualisiere `RELEASE_NOTES.md`. Prüfe den vollständigen Diff, erneuere das Manifest ausdrücklich und prüfe es erneut. Committe diesen zusammengehörigen Stand.
4. Reiche den Branch als Pull Request ein. Warte auf erfolgreiche aktuelle Windows-/Linux-Prüfungen, prüfe den Diff und löse offene Reviewpunkte, bevor du nach `main` zusammenführst. Bei Konflikten oder weiteren Änderungen sind die betroffenen Nachweise erneut zu prüfen.
5. Erzeuge einen stabilen Tag `vX.Y.Z` auf dem geprüften, übernommenen Commit. `python scripts/release.py vX.Y.Z` verwendet anstelle des Platzhalters die identische Paketversion und erzeugt ZIP und `SHA256SUMS` unter `.upload-work/releases/`. Das Skript prüft Manifest und ZIP-Bytes; der Tag-Workflow wiederholt Tests und veröffentlicht das Paket. Der Tag allein belegt noch keinen erfolgreichen Release.
6. Lies nach der Veröffentlichung Tag-Ziel, erfolgreichen Workflow, Release-Dateien und Hashes zurück. Kontrolliere GitHub Pages gesondert: Der veröffentlichte Stand muss vom gewünschten `main`-Commit aus dem Repository-Wurzelordner `/` stammen. Öffne die echte Pages-Adresse, prüfe Einstieg, Inhaltsanker und lokale Assets; teste bei Mobilbreite auch das Menü. Ein Release und ein Pages-Deployment sind getrennte Vorgänge.

Prüfberichte aus CI werden als Artefakte gespeichert; das veröffentlichte ZIP enthält die geprüften Commit-Bytes. Ein Download des `main`-Branches ist veränderlich, ein Release gehört zu einem festen Tag. Sichtbarkeit, Kursrechte und Lizenz bleiben gesonderte Entscheidungen; diese Prüfschritte ändern keine Veröffentlichungserlaubnis. Dokumentierte Repository-Einstellungen können altern und müssen vor einer Veröffentlichung aktuell zurückgelesen werden: [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md).

Dependabot ändert absichtlich kein Integritätsmanifest. Ein Paket-PR scheitert deshalb zunächst am Manifest, bis ein Maintainer den begrenzten Paket-Diff geprüft, das Manifest mit --write aktualisiert und sämtliche Prüfungen ausgeführt hat. Das Manifest darf in CI nicht automatisch neu geschrieben werden.
