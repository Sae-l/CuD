# Repository-Konfiguration

Aktueller Abgleich: 22.10.2026, `Sae-l/CuD`, öffentlich, Standardbranch `main`. Alle administrativen Zeilen der Tabelle wurden an diesem Tag mit der authentifizierten GitHub-API (`gh api`) zurückgelesen: Repository, Branch-Schutz von `main`, Actions-Rechte, Sicherheitsfunktionen und Pages. Geheimnisse und Anmeldedaten werden nicht im Repository gespeichert. Vor späteren Änderungen erneut prüfen.

| Bereich | Einstellung |
| --- | --- |
| Sichtbarkeit | Öffentlich; main ist Standardbranch (17.10.2026 bestätigt) |
| Beschreibung und Themen | Deutscher Projektzweck; python, education, offline, learning, data-analysis |
| Zusammenführen | Pull Request mit aktuellen erfolgreichen Prüfungen; veraltete Reviewfreigaben verfallen |
| Erforderliche Prüfungen | Prüfen (ubuntu-latest), Prüfen (windows-latest); Branch muss vor dem Merge aktuell sein |
| Schutz von main | Gilt auch für Administratoren; keine Force-Pushes und kein Löschen; Diskussionen vor Merge auflösen |
| Einzelpersonenprojekt | Keine fremde Genehmigung erzwungen: 0 erforderliche Reviewfreigaben, technische Prüfungen bleiben verbindlich |
| Merge-Methoden | Nur Squash-Merge; Merge-Commit und Rebase-Merge deaktiviert; Auto-Merge erlaubt (seit 22.10.2026) |
| Branchpflege | Gemergte Branches automatisch löschen; Update-Branch-Schaltfläche aktiviert |
| Wiki und Projects | Deaktiviert (seit 22.10.2026); Planung läuft über Issues |
| Actions | Aktiv; nur GitHub-eigene Actions/Workflows zugelassen; SHA-Pinning erforderlich |
| Standard-Workflow-Rechte | contents: read; Workflows dürfen keine PR-Reviews genehmigen |
| Release-Workflow | Ausschließlich der Release-Job hat contents: write; keine zusätzlichen Kontoschlüssel nötig |
| Sicherheitswarnungen | Dependabot-Warnungen und automatische Sicherheitskorrektur-PRs aktiviert; Secret Scanning mit Push-Schutz aktiv; Private Vulnerability Reporting aktiviert (seit 22.10.2026) |
| GitHub Pages | Klassischer Build aus `main`, Wurzelordner. Damit ist jede Datei in `main` öffentlich abrufbar, auch `Referenz/` |
| Abhängigkeitspflege | Wöchentlich npm, pip und GitHub Actions; Änderungen kommen als PR, kein automatischer Merge |
| Laufzeiten | Node 24, Python 3.12; festgelegt in .node-version und .python-version |
| Testpakete | npm-Lockdatei mit Integrität; Python-Abhängigkeiten einschließlich transitiver Pakete exakt versioniert |
| Quelldateien | .gitattributes erhält Bytes; EditorConfig regelt neue Texte und spart Originalquellen aus |
| Lokale Dateien | Caches, Browserprofile, virtuelle Umgebungen, .env-Dateien, .claude/ und die Root-.obsidian/ werden aus Git und Manifest ausgeschlossen; gemeinsame Vault-Einstellungen bleiben erhalten |

## Besucher, Meldungen und Rechte

Die README führt zuerst zum Online-Lernraum und danach zum versionierten Offline-Paket. Fehler und Verbesserungsvorschläge haben Vorlagen unter `.github/ISSUE_TEMPLATE/`; `.github/pull_request_template.md` fragt Prüfung und Risiken ab. [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md) und [ACCESSIBILITY.md](ACCESSIBILITY.md) beschreiben Umgang, Meldeweg und bekannte Grenzen. Diese Dateien werden in GitHubs Community-Profil erst nach Übernahme in den Standardbranch berücksichtigt.

Eine allgemeine Projektlizenz bleibt eine offene Inhaberentscheidung. [RECHTE.md](RECHTE.md) trennt eigenen Code, eigene Lerninhalte, fremde Kursmaterialien und Assetlizenzen. Private Vulnerability Reporting ist seit dem 22.10.2026 aktiviert; SECURITY.md verweist darauf. Der Inhaber hat am 22.10.2026 entschieden, dass die Kurs-PDFs vorerst öffentlich im Repository, auf Pages und im Release-ZIP liegen dürfen; später sollen sie nur noch über die Website abrufbar sein ([Issue #26](https://github.com/Sae-l/CuD/issues/26)).

## Tests und Releases

Projektprüfung läuft bei Pull Requests und main-Pushes auf Windows und Linux. Sie prüft zuerst das Commit-Manifest und die Unit-Tests, danach Inhalte, Python und drei Browser-Engines. Die Nachweise des Laufs werden 14 Tage als CI-Artefakte gespeichert.

Ein stabiler Tag vX.Y.Z startet den Release-Workflow. Er wiederholt die Prüfungen, stellt danach die dokumentierten Nachweisdateien aus dem Commit wieder her und erzeugt ein ZIP genau aus den manifestierten Dateien. Tag und Paketversion müssen übereinstimmen. ZIP-Einträge und SHA-256 werden geprüft; lokale Caches und Geheimnisse sind nicht enthalten. Der Release erhält ZIP und SHA256SUMS; die Dateien sind bei öffentlichem Repository öffentlich zugänglich. Details: scripts/release.py und CONTRIBUTING.md.

Die gespeicherten Projektberichte sind ein lokaler Windows-Nachweis. Linux- und Windows-CI-Läufe sind getrennte Nachweise am jeweiligen Commit; ein konfigurierter Workflow allein ist kein bestandener Test.

Am 17.10.2026 wurde der veröffentlichte Commit `b296826` für v0.3.0 zurückgelesen: [Projektprüfung auf Windows und Linux](https://github.com/Sae-l/CuD/actions/runs/39047674536), [Release](https://github.com/Sae-l/CuD/actions/runs/39047712894) und [Pages](https://github.com/Sae-l/CuD/actions/runs/39047673571) waren erfolgreich. Dieser datierte Beleg bestätigt keine späteren Änderungen.

## Fachliche Grenzen

Die Konfiguration bestätigt keine Kursrechte, keinen Lernerfolg und keine Originalergebnisse für die fehlende bb12024.csv. Lizenz und Sichtbarkeit fremder Kursunterlagen werden nicht erweitert. Echte Geräte und Screenreader bleiben gesondert zu prüfen. [Quellenabdeckung](Lernwerkzeug/ABDECKUNG.md).
