# VS Code Python venv Guide

Quelle: ../../../Referenz/20262910_Coding und Digitalisierung/Anleitungen zu Python/VS Code Python venv Guide.pdf
Die Seitenzahlen unten sind PDF-Seiten, keine behaupteten Foliennummern.

## PDF-Seite 1

```text
Python venv in VS Code
1 Projektordner öffnen
Erstelle einen neuen Ordner für dein Vorhaben und öffne ihn in Visual Studio Code über das
Menü Datei > Ordner öffnen.
2 Terminal starten
Öffne das integrierte Terminal über das Menü Terminal > Neues Terminal oder verwende
die Tastenkombination Strg + Shift + ö (Mac: ⌃ + ⇧ + ` ).
3 Virtual Environment (venv) erstellen
Führe den folgenden Befehl im Terminal aus. Das erstellt den versteckten Ordner .venv,
der deine isolierten Python-Pakete aufnimmt:
# Windows
$ python -m venv .venv
# Linux / macOS
$ python3 -m venv .venv
4 venv als Workspace-Interpreter setzen
VS Code blendet unten rechts oft direkt einen Hinweis ein: "We noticed a new virtual
environment... Do you want to select it?". Klicke dort auf Yes.
Falls der Hinweis ausbleibt: Drücke Strg + Shift + P , um die Command Palette zu
öffnen. Suche nach Python: Select Interpreter, drücke Enter und wähle den Pfad zu der
neuen Umgebung aus (z.B. ./.venv/Scripts/python.exe).
5 Umgebung im Terminal aktivieren
Schließe das aktuelle Terminal-Fenster über das Mülleimer-Symbol oben rechts im TerminalPanel und öffne ein neues Terminal. VS Code führt das Aktivierungsskript nun automatisch
aus.
Erfolgskontrolle: Es muss jetzt ein (.venv) ganz vorne in deiner Terminal-Eingabezeile
stehen.
VS Code Cheat Sheet Seite 1
Quick-Start Guide für isolierte Projektumgebungen
```
