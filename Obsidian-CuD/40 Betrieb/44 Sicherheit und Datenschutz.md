---
title: "44 Sicherheit und Datenschutz"
description: "Diese Seite beschreibt konkrete technische Anforderungen und die derzeit erkennbaren Grenzen. Sie ist keine Rechtsprüfung und bestätigt keine aktuelle Aktivierung sämtlicher GitHub-Einstellungen."
type: note
language: de
created: 2026-10-16
updated: 2026-10-17
status: dokumentiert
tags: ["cud"]
---

# Anforderungen an Repository und Betrieb

Diese Seite beschreibt konkrete technische Anforderungen und die derzeit erkennbaren Grenzen. Sie ist keine Rechtsprüfung und bestätigt keine aktuelle Aktivierung sämtlicher GitHub-Einstellungen.

## Vorhandene technische Grundlagen

Der Code zeigt keinen Anmelde- oder Fortschrittsserver. Bearbeitungsmarken speichern Inhalts-IDs lokal. Schrift, Foto und Animationsdateien werden aus dem Projekt ausgeliefert. In gespeicherten lokalen Prüfungen wurden keine externen Anfragen beobachtet. Bei Nutzung der öffentlichen Website erhält der Hostinganbieter jedoch die normalen Webanfragen; die lokale Offlineprüfung ist kein Beleg für fehlende Hostingprotokolle.

Die Workflow-Datei setzt standardmäßig `contents: read`, deaktiviert das Fortspeichern der Checkout-Anmeldung und verwendet auf Commit-IDs festgelegte Actions. Der Releasejob hat gezielt Schreibrechte. `REPOSITORY_SETTINGS.md` beschreibt frühere Schutzkonfigurationen für CuD-1. Die aktiven Regeln des heutigen öffentlichen CuD wurden in diesem Auftrag nicht vollständig per API nachgeprüft.

## Anforderungen bei künftigen Änderungen

| Bereich | Konkrete Anforderung | Nachweis |
| --- | --- | --- |
| Zugänge | Keine Tokens, `.env`, Sitzungscookies oder Schlüssel committen | Diff, Dateiinventar und Secretprüfung |
| GitHub-Rechte | Nur benötigte Personen und minimale Workflow-Berechtigungen | Aktive Settings am aktuellen Repository lesen |
| Änderungen | Überprüfbarer Diff, passende Tests und CI am Zielcommit | PR und ausgeführter Workflow |
| Abhängigkeiten | Versionen und Herkunft festhalten, Sicherheitsupdates reviewen | Lockdateien, Assetmanifest und Update-Diff |
| Website | HTTPS verwenden, keine ungewollten Drittanfragen ergänzen | Deployment und Netzwerkprüfung |
| Inhalt | Fremder JavaScript-Inhalt bleibt ausführbarer Code | Review von Inhalt und Rendering |
| Dateien | Nur freigegebene Materialien und Daten ausliefern | Positivliste und Paketprüfung |
| Lernstand | Keine stille Übertragung oder Profilbildung hinzufügen | Datenfluss und Speicherprüfung |
| Belege | Logs und Screenshots auf persönliche Informationen prüfen | Sichtung vor Veröffentlichung |

HTTPS und die Grenzen des Schutzes erklärt [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). Öffentliche Dateien bleiben trotz HTTPS öffentlich. Ein privates Repository bedeutet zudem nicht automatisch eine private Pages-Website; den tatsächlichen Sitezugriff gesondert prüfen. [GitHub dokumentiert die besonderen Zugriffsmöglichkeiten](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).

## Fortschrittsdaten und gemeinsam genutzte Geräte

Der Speicher enthält derzeit Bearbeitungs-IDs und keine vom Lernraum abgefragten Namen. Auf einem gemeinsam verwendeten Browserprofil kann eine andere Person diese Markierungen sehen. Website-Daten lassen sich über die Browserverwaltung löschen; dabei gehen die Markierungen verloren. `localStorage` ist keine verschlüsselte persönliche Datenbank.

## Cloud-Notebooks und mobile Zugriffe

Wer Code oder CSV in einen externen Dienst lädt, löst eine zusätzliche Datenverarbeitung aus. Vorher Datensatz, Berechtigung und Dienstwahl bewusst prüfen. Die Website startet diesen Upload nicht selbst. Ein lokaler HTTP-Server soll standardmäßig an Loopback gebunden sein und aus einem freigegebenen Verzeichnis laufen.

## Obsidian und Sicherung

Der Vault enthält keine Community-Plugins und ist bereits im öffentlichen Repository enthalten. Persönliche Workspace-Dateien bleiben ausgeschlossen. Vor jeder weiteren Veröffentlichung private Ergänzungen, absolute Arbeitswege und Zugangsdaten kontrollieren. [SECURITY.md](../../SECURITY.md) beschreibt den Sicherheitsmeldeweg einschließlich des Falls, dass keine private GitHub-Meldung verfügbar ist. Backups oder ZIP-Prüfsummen helfen bei Wiederherstellung und Integrität; sie ersetzen keine Rechte- oder Sichtbarkeitsentscheidung.

Eine Einführung von Konten, Cloud-Fortschritt, Analytics oder fremden Inhaltseingaben wäre ein neuer Datenfluss und braucht eine eigene Planung. [[41 Lokal Cloud und Synchronisation]] zeigt den gegenwärtigen Umfang.

## Projektbelege

- [Lernwerkzeug/app.js](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/app.js)
- [Lernwerkzeug/assets/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/README.md)
- [.github/workflows/check.yml](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/.github/workflows/check.yml)
- [.github/workflows/release.yml](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/.github/workflows/release.yml)
- [REPOSITORY_SETTINGS.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/REPOSITORY_SETTINGS.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
