# Übergabe: CuD-Erweiterung WiSe 26/27

Stand: 22.10.2026. Branch `claude/cud-erweiterung-anforderungen-7879f2`, [PR #37](https://github.com/Sae-l/CuD/pull/37).

## Worum es geht

Der Kurs hat neue Unterlagen geliefert. Sie liegen bisher nur lokal im Haupt-Checkout unter `Referenz/Coding und Digitalisierung  n  CuD  n  WiSe 26_27/` und sind nicht committet. Die Planung läuft als Wayfinder-Map auf GitHub:

**Map: [Wayfinder: CuD-Erweiterung WiSe 26/27](https://github.com/Sae-l/CuD/issues/25)**

Ziel der Map: ein umsetzungsfertiger Ausbauplan. Gebaut wird erst danach, zum Beispiel als v0.5.

## Was neu ist

| Datei | Inhalt | Abgleich mit Bestand |
| --- | --- | --- |
| `CuD_Uebung 02.pdf` | Übung 02 „Modulare Prozessdatenanalyse & OOP“, 10 Module, rund 38 Aufgaben | neu |
| `CuD_Exam_PartA_001.pdf` | Klausurkatalog Teil A, 40 Aufgaben mit Punkten | neu |
| `004_Git Versionsverwaltung.pdf` | Vorlesung 004, Git, 20 Seiten | neu |
| `004b_Vererbung.pdf` | laut Inhaber richtig, aber byte-gleich mit 004 | Dublette |
| `Git & VS Code Workflow Leitfaden.pdf`, `VS Code Python venv Guide.pdf` | Anleitungen | neu |
| 001–003, Übung 01, `messdaten.csv`, `002_fft.py` | wie bisher | byte-gleich mit `Referenz/` |

Übung 02, Aufgabe 1.2 druckt den Datensatz `bb12024.csv` vollständig ab. Damit lässt sich die Lücke aus `Lernwerkzeug/ABDECKUNG.md` schließen.

## Entschieden

| Ticket | Entscheidung |
| --- | --- |
| [Veröffentlichung der neuen Kursunterlagen klären](https://github.com/Sae-l/CuD/issues/26) | Erstmal öffentlich: alle Kurs-PDFs dürfen ins Repo, auf Pages und ins Release-ZIP. Später nur über die Website abrufbar. |
| [Richtige Vererbungs-Vorlesung 004b beschaffen](https://github.com/Sae-l/CuD/issues/28) | `004b_Vererbung.pdf` ist laut Inhaber richtig. Eine eigene Vererbungs-Vorlesung gibt es derzeit nicht. |
| [Pandas-Versionsabhängigkeiten in Übung 02 und Klausur](https://github.com/Sae-l/CuD/issues/34) | Rechenwerte in pandas 2.2 und 3.0 gleich; nur abgedruckte Ausgaben weichen ab. pandas 3.x und numpy 2.x als Referenz nennen. Mehrere abgedruckte Erwartungswerte in Übung 02 passen nicht zum Datensatz. Details im Branch [research/pandas-versionen](https://github.com/Sae-l/CuD/blob/research/pandas-versionen/research/pandas-versionen.md). |

## Offen

Frei, als Nächstes bearbeitbar:

1. [Ablage und Namensschema für den WiSe-26/27-Ordner](https://github.com/Sae-l/CuD/issues/27). Danach können die neuen PDFs committet werden.
2. [Übung 02 begleiten: Tiefe und ID-Schema](https://github.com/Sae-l/CuD/issues/29)
3. [Original-bb12024.csv vs. synthetische Live-Daten](https://github.com/Sae-l/CuD/issues/30). Die Download-Frage ist neu zu bewerten, weil die Rechtesperre entfallen ist.
4. [Klausurkatalog im Lernwerkzeug: Format](https://github.com/Sae-l/CuD/issues/31)
5. [Git-Vorlesung 004 und Anleitungen einbinden](https://github.com/Sae-l/CuD/issues/32)
6. [Übersetzungsprozess für neue Inhalte](https://github.com/Sae-l/CuD/issues/33)

Blockiert: [Prüfstrategie für die neuen Inhalte](https://github.com/Sae-l/CuD/issues/35) und [Release-Schnitt für die CuD-Erweiterung](https://github.com/Sae-l/CuD/issues/36).

Noch nicht als Ticket fassbar (Nebel in der Map): Vererbungsinhalte, Kurs-PDFs später verstecken, Doku und Obsidian-Vault nachziehen, Startseite und Lernplan bei mehr Inhalt.

## Repo-Einstellungen

Am 22.10.2026 per `gh api` geändert und in [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md) dokumentiert:

- Private Vulnerability Reporting aktiviert, [SECURITY.md](SECURITY.md) angepasst.
- Wiki und Projects deaktiviert.
- Nur Squash-Merge erlaubt, Auto-Merge bleibt erlaubt.

## Arbeitsregeln für die nächste Sitzung

- Weiterarbeiten mit `/mattpocock-skills:wayfinder https://github.com/Sae-l/CuD/issues/25`. Ohne Ticketangabe wird das erste freie Ticket genommen.
- PDFs immer mit der aktuellen Version von [pdf-seitenweise-sichten](https://github.com/Sae-l/pdf-seitenweise-sichten) sichten (Stand 22.10.2026: v1.3.0). Die lokale Kopie unter `~/.claude/skills/pdf-seitenweise-sichten/` ist älter und enthält keine Skripte. Vor der nächsten Sichtung aktualisieren.
- `scripts/manifest.py --write` liest das Dateisystem, nicht Git. Lokale Werkzeugordner wie `.claude-flow/` landen sonst im Manifest und lassen die CI scheitern. Vor `--write` solche Ordner prüfen.

## Bekannte Risiken

- Die Kurs-PDFs sind öffentlich über Pages abrufbar. Eine Erlaubnis der Rechteinhaber ist nicht belegt ([RECHTE.md](RECHTE.md)).
- Die neuen PDFs sind noch nicht im Repo. Sie liegen nur im Haupt-Checkout und gehen bei dessen Bereinigung verloren.
