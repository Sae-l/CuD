# Hinweise für KI-Agenten

Gilt für Claude Code, Codex, GitHub Copilot, Antigravity und andere Agenten in diesem Repository.

## Referenz-PDFs nie ganz lesen

Die Unterlagen in `Referenz/` werden über die Skill [`pdf-seitenweise-sichten`](https://github.com/Sae-l/pdf-seitenweise-sichten) gesichtet, nicht als Volltext geladen.

1. Zuerst `Referenz_Sichtung/Seitenindex.md` (Überblick) bzw. `Referenz_Sichtung/<Gruppe>/Seitenindex.md` lesen.
2. Im verlinkten `md/<Dokument>.md` nur den Abschnitt `## PDF-Seite N` lesen.
3. Formeln, Tabellen, Code-Screenshots und Abbildungen an der Originalseite prüfen (`bilder/` oder `sichtung.py render`). Extrahierter Code verliert Einrückungen: zum Abschreiben immer das Originalbild nehmen.
4. Quellen als `Dokument, PDF-S. N` angeben. Offene Punkte stehen in `Referenz_Sichtung/Sichtungsbericht.md`.

Skill installieren (einmal pro Rechner): Repository klonen, dann `install.ps1` (Windows) bzw. `install.sh` ausführen und `python -m pip install -r scripts/requirements.txt`. Danach liegt das Werkzeug unter `<skill>/scripts/sichtung.py`.

## Neue Vorlesung oder Übung aufnehmen

`Referenz_Sichtung/` wird von der Website und den Tests direkt gelesen (`bilder/`, `md/`, `manifest.json`). Deshalb nie überschreiben, sondern neu erzeugen, vergleichen und dann ersetzen:

```text
python <skill>/scripts/sichtung.py extract Referenz/Vorlesungen .upload-work/Sichtung_neu/Vorlesungen --alt Referenz_Sichtung/Vorlesungen --titel "Seitenindex: Vorlesungen"
python <skill>/scripts/sichtung.py check .upload-work/Sichtung_neu/Vorlesungen
```

- `--alt` übernimmt Prüfstatus (`text_read`, `original_image_viewed`, `subject_review`) und bereits angesehene Bilder für unveränderte PDFs.
- Bestehende Bilddateien, auf die `Lernwerkzeug/` verlinkt, müssen nach dem Ersetzen weiter vorhanden sein.
- Danach ergänzen: Dokumentübersicht in `Referenz_Sichtung/Seitenindex.md`, `source_sha256` in `Referenz_Sichtung/manifest.json`, Eintrag im `Sichtungsbericht.md`.
- Abschluss: `python scripts/manifest.py --write`, dann die Prüfungen aus `.github/workflows/check.yml` lokal ausführen.

## Prüfungen vor jedem Pull Request

```text
python scripts/manifest.py --check
python Obsidian-CuD/Pruefung/vault_pruefen.py
python -m unittest discover -s scripts -p "test_*.py"
npm test
```
