# Repository-Konfiguration

Stand: 15.10.2026. Einstellungen über die GitHub-API gesetzt und anschließend zurückgelesen. Die Beschreibung gilt für Sae-l/CuD-1; Geheimnisse und Anmeldedaten werden nicht im Repository gespeichert.

| Bereich | Einstellung |
| --- | --- |
| Sichtbarkeit | Privat; main ist Standardbranch |
| Beschreibung und Themen | Deutscher Projektzweck; python, education, offline, learning, data-analysis |
| Zusammenführen | Pull Request mit aktuellen erfolgreichen Prüfungen; veraltete Reviewfreigaben verfallen |
| Erforderliche Prüfungen | Prüfen (ubuntu-latest), Prüfen (windows-latest); Branch muss vor dem Merge aktuell sein |
| Schutz von main | Gilt auch für Administratoren; keine Force-Pushes und kein Löschen; Diskussionen vor Merge auflösen |
| Einzelpersonenprojekt | Keine fremde Genehmigung erzwungen: 0 erforderliche Reviewfreigaben, technische Prüfungen bleiben verbindlich |
| Branchpflege | Gemergte Branches automatisch löschen; Update-Branch-Schaltfläche aktiviert |
| Actions | Aktiv; nur GitHub-eigene Actions/Workflows zugelassen; SHA-Pinning erforderlich |
| Standard-Workflow-Rechte | contents: read; Workflows dürfen keine PR-Reviews genehmigen |
| Release-Workflow | Ausschließlich der Release-Job hat contents: write; keine zusätzlichen Kontoschlüssel nötig |
| Sicherheitswarnungen | Dependabot-Warnungen und automatische Sicherheitskorrektur-PRs aktiviert |
| Abhängigkeitspflege | Wöchentlich npm, pip und GitHub Actions; Änderungen kommen als PR, kein automatischer Merge |
| Laufzeiten | Node 24, Python 3.12; festgelegt in .node-version und .python-version |
| Testpakete | npm-Lockdatei mit Integrität; Python-Abhängigkeiten einschließlich transitiver Pakete exakt versioniert |
| Quelldateien | .gitattributes erhält Bytes; EditorConfig regelt neue Texte und spart Originalquellen aus |
| Lokale Dateien | Caches, Browserprofile, virtuelle Umgebungen und .env-Dateien werden ausgeschlossen |

## Tests und Releases

Projektprüfung läuft bei Pull Requests und main-Pushes auf Windows und Linux. Sie prüft zuerst das Commit-Manifest und die Unit-Tests, danach Inhalte, Python und drei Browser-Engines. Die Nachweise des Laufs werden 14 Tage als CI-Artefakte gespeichert.

Ein stabiler Tag vX.Y.Z startet den Release-Workflow. Er wiederholt die Prüfungen, stellt danach die dokumentierten Nachweisdateien aus dem Commit wieder her und erzeugt ein ZIP genau aus den manifestierten Dateien. Tag und Paketversion müssen übereinstimmen. ZIP-Einträge und SHA-256 werden geprüft; lokale Caches und Geheimnisse sind nicht enthalten. Der private Release erhält ZIP und SHA256SUMS. Details: scripts/release.py und CONTRIBUTING.md.

Die gespeicherten Projektberichte sind ein lokaler Windows-Nachweis. Linux- und Windows-CI-Läufe sind getrennte Nachweise am jeweiligen Commit; ein konfigurierter Workflow allein ist kein bestandener Test.

## Fachliche Grenzen

Die Konfiguration bestätigt keine Kursrechte, keinen Lernerfolg und keine Originalergebnisse für die fehlende bb12024.csv. Lizenz und Sichtbarkeit fremder Kursunterlagen werden nicht erweitert. Echte Geräte und Screenreader bleiben gesondert zu prüfen. [Quellenabdeckung](Lernwerkzeug/ABDECKUNG.md).
