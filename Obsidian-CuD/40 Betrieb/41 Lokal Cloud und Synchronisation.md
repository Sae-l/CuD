---
title: "41 Lokal Cloud und Synchronisation"
description: "**GitHub Pages synchronisiert keinen persönlichen Lernstand.** Git synchronisiert ebenfalls nicht automatisch Browser-localStorage. Ein Konto, Serverprofil oder automatisches Übertragen von Fortschrittsmarken ist im Lern"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Drei unterschiedliche Arten von online und lokal

| Funktion | Aktueller Weg | Was übertragen wird |
| --- | --- | --- |
| Website lokal lesen | Vollständiges Projekt entpacken und `Lernwerkzeug/index.html` öffnen | Nach Download für lokale Inhalte keine Serververbindung nötig |
| Website im Internet lesen | GitHub Pages | Browser lädt veröffentlichte Dateien vom Hosting |
| Code versionieren | Git und GitHub | Bewusst committe Dateien und Versionsgeschichte |
| Lernfortschritt speichern | Browser-localStorage | Bearbeitungs-IDs bleiben im jeweiligen Browser |
| Vault übertragen | Dateien kopieren, ZIP oder bewusst eingerichtete Synchronisation | Je nach gewähltem Weg Vault-Dateien |

**GitHub Pages synchronisiert keinen persönlichen Lernstand.** Git synchronisiert ebenfalls nicht automatisch Browser-localStorage. Ein Konto, Serverprofil oder automatisches Übertragen von Fortschrittsmarken ist im Lernwerkzeug nicht implementiert.

## Lokal starten

Das gesamte Projekt herunterladen und entpacken. Quellen und Assets zusammenlassen. Bei unterstützter Dateiöffnung die Lernstartdatei wählen. Alternativ vom Repository-Ordner aus einen lokalen Server starten:

```powershell
# Windows, falls ein passender Python-Interpreter installiert ist
py -3.12 -m http.server 8000 --bind 127.0.0.1
```

```sh
# macOS/Linux, mit vorhandener Python-Installation
python3 -m http.server 8000 --bind 127.0.0.1
```

Anschließend `http://127.0.0.1:8000/Lernwerkzeug/` im selben Rechner öffnen. Mit Strg+C beenden. Nur aus dem dafür vorgesehenen Projektordner starten: Der einfache Server liefert dessen Dateien aus. Die Loopback-Bindung erlaubt keine Verbindung von einem anderen Gerät.

Für ein Android-Gerät kann die öffentliche Pages-Adresse einfacher sein. Ein Server im privaten Netzwerk erfordert eine erreichbare LAN-Adresse, bewusst konfigurierte Bindung und Firewallfreigabe. Dafür nur freigegebene Dateien verwenden. Ein laufender Server ist keine Offlineinstallation auf dem Telefon.

## Öffentliche Bereitstellung

GitHub Pages hostet statische Dateien; eine Python-Serverlaufzeit oder automatische Notizverarbeitung entsteht dadurch nicht. Beide bestehenden Online-Einstiege sind in [[50 Die Vorstellungswebsite]] und [[51 Das Lernwerkzeug]] beschrieben. GitHub erläutert die statische Auslieferung unter [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

Der aktuelle Code enthält keine Service-Worker-Installation. Ein einmaliger Onlinebesuch garantiert daher keinen späteren Offlinebetrieb. Für verlässliche lokale Nutzung die vollständigen Dateien herunterladen.

## Cloud-Notebook bewusst wählen

Für Python auf einem Mobilgerät kann eine separat gewählte Notebook-Plattform verwendet werden. Dorthin kopierter Code und hochgeladene Daten verlassen die lokale Umgebung. Keine vertraulichen Kurs-, Personen- oder Forschungsdaten ohne passende Freigabe hochladen. Das Lernwerkzeug selbst startet kein Notebook automatisch.

## Diesen Vault pflegen

Kostenfrei ist zunächst die lokale Nutzung und das bewusste Kopieren beziehungsweise versionierte Übertragen der Dateien. Obsidian dokumentiert mehrere [Synchronisationswege](https://obsidian.md/help/Getting%20started/Sync%20your%20notes%20across%20devices). Ein solcher Weg wurde hier nicht eingerichtet. Persönliche Workspace-Dateien, Zugänge und interne Notizen vor jedem Git-Upload prüfen. Community-Git-Plugins sind für diesen Vault nicht erforderlich.

## Projektbelege

- [Lernwerkzeug/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/README.md)
- [Lernwerkzeug/app.js](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/app.js)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
