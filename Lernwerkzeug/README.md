# Lokales Lernwerkzeug

Öffne **index.html** direkt im Browser. Internet, Server, Konto, Installation und Paketmanager sind für die Webseite nicht nötig. Der gesamte Projektordner muss zusammenbleiben, damit die relativen Links nach `Referenz/` und `Referenz_Sichtung/` funktionieren.

Die erste Version begleitet **Aufgaben 6.1–6.3**: CSV lesen, Temperaturen filtern, Mittelwert / Minimum / Maximum bestimmen. Die gemeinsame Suche verbindet 15 Lernbausteine, 3 Übungen, 5 Fehlerhilfen, einen Arbeitsablauf und den Quellenstand. Suche und Navigation greifen auf `inhalte.js` zu. Keine dauerhafte Speicherung und keine externen Anfragen.

## Selbst ausprobieren

1. Öffne 6.1 und speichere die verlinkte `messdaten.csv` als Kopie in einem eigenen Übungsordner. Lege daneben `main.py` an. Die Originaldatei bleibt erhalten.
2. Öffne diesen Ordner im Editor und starte dein Terminal darin. Schreibe den Python-Code selbst; die Webseite führt ihn nicht aus.
3. Bearbeite die Aufgaben nacheinander. Die Variablen bauen aufeinander auf: `zeilen`, `gute_daten`, Kennzahlen. Du kannst den Code aller drei Aufgaben in derselben `main.py` ausführen.
4. Nutze Hinweise einzeln. Eine Musterlösung öffnet sich nur auf Wunsch. Ein Seitenwechsel schließt die Hinweise und Lösungen wieder.

Die Originalaufgabe nennt `sensor_messdaten_projekt.csv`, vorhanden ist `messdaten.csv`. Der Pilot arbeitet ausdrücklich mit dieser vorhandenen Datei. Die Zuordnung ist nicht vom Kurs bestätigt. Die gedruckten Sollzahlen stimmen mit ihr nicht überein. Das Intervall **0 ≤ Temperatur ≤ 50** ist eine dokumentierte Arbeitsannahme. Es kommt kein Aktivitätsfilter hinzu.

Die einfachen CSV-Beispiele verwenden `split(",")`. Sie sind auf diese einfache Quelldatei begrenzt; bei zitierten Kommas ist das Standardmodul `csv` nötig. Leere Zeilen werden übersprungen. Andere beschädigte Daten lösen in den Musterlösungen einen sichtbaren Fehler aus. Es gibt keine stillschweigende Reparatur.

PDF-Verweise enthalten `#page=N`. Ob der PDF-Betrachter direkt auf die Seite springt, hängt vom Browser ab. Deshalb ist jede verwendete Originalseite zusätzlich als Bild verlinkt. Markdown-Berichte lassen sich im Editor lesen; einige Browser laden sie herunter.

## Prüfungen wiederholen

`pruefen.cjs` nutzt Node.js, Python mit Standardbibliothek und das bereits lokal installierte Playwright. Die Webseite selbst benötigt diese Werkzeuge nicht. Auf diesem Rechner:

```powershell
$env:NODE_PATH = 'C:\Users\salha\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:LERNWERKZEUG_PYTHON = 'C:\Users\salha\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& 'C:\Users\salha\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\Lernwerkzeug\pruefen.cjs
```

Alternativ `node Lernwerkzeug/pruefen.cjs`, sofern Python und Playwright bereits erreichbar sind. Es wird nichts installiert. Testergebnisse und Screenshots landen in `pruefung/`. Der Bericht enthält bewusst keine Zahlenlösungen zur Original-CSV. Ein fehlgeschlagener Test beendet das Skript mit Fehlerstatus.

## Noch offen

Gebrauchstest: Bearbeite die drei Aufgaben mit der Seite. Prüfe insbesondere die fünf Suchfälle aus dem Arbeitsplan und halte fest, ob du den passenden Einstieg in etwa 30 Sekunden findest. Technische Tests messen diesen Lernnutzen nicht. Die vollständige Erschließung der restlichen Quellseiten und die Erweiterung auf weitere Modulthemen bleiben nächste Arbeitspakete.
