---
title: "27 Entscheidungen und Baugeschichte"
description: "Bedarf, Bauphasen und Entscheidungen aus Gesprächen mit überprüfbaren Projektbelegen."
type: "note"
language: de
created: "2026-10-16"
updated: "2026-10-16"
status: "dokumentiert"
tags: ["cud", "wartung"]
reviewed_commit: "b784b9bed47ba9232c0e121b0f496a6dd75b119d"
---

# Warum das Projekt so gebaut wurde

Die folgende Rekonstruktion stützt sich auf fünf gelesene Projektchats, den Arbeitsplan, Code und Git-Historie. Sie enthält eine bereinigte Zusammenfassung, keine vollständigen privaten Gesprächsexporte. Den genauen Sichtungsumfang nennt [[94 Gesprächs- und Quellenabgleich]].

## Die Bauphasen

| Phase | Bedarf und Ergebnis | Einordnung heute |
| --- | --- | --- |
| Quellen erschließen | PDF-Seitenindex, sichtbare Daten- und Sollwertkonflikte | Herkunftsarbeit bleibt von fachlicher Vollabnahme getrennt |
| Suchbarer Pilot | Aufgabe → Wissen → Befehl → selbst ausprobieren → Ergebnis prüfen; zuerst CSV 6.1–6.3 | Ausgangspunkt, nicht heutige Gesamtdeckung |
| Anfänger-Lernraum | Willkommen, geordnete Etappen, Einrichtung und Befehlsübersicht; ausdrückliche PRIMM-Auswahl | Im Code und Lernkonzept erkennbar |
| Audit und Erweiterbarkeit | Suche, mobile Bedienung, Fortschrittsmarken, Lernfragen und Erweiterungsvertrag | Historische Pilotzahlen sind später überholt |
| Vollständige vorhandene Aufgabenbegleitung | 31 Aufgaben, vier Live-Übungen, FFT und synthetische Downloads | Version 0.2.1, Originaldatenfragen weiter offen |
| Gestaltung und Webeinstieg | Lokale Schrift/Assets, Lernkarten, Animationen und Root-Startseite | Designarbeit wurde anschließend in GitHub integriert |
| Dokumentationsbasis | Deutscher Vault mit eigener Strukturprüfung, PR #11 zusammengeführt | Diese Erweiterung macht Diagnose und Wiederaufbau explizit |

Git-Beispiele der Integration: [PR #2](https://github.com/Sae-l/CuD/pull/2), [PR #3](https://github.com/Sae-l/CuD/pull/3), [PR #7](https://github.com/Sae-l/CuD/pull/7), [PR #8](https://github.com/Sae-l/CuD/pull/8), [PR #11](https://github.com/Sae-l/CuD/pull/11). Für den konkreten Umfang stets Diff und Commit lesen, nicht allein die Nummer.

## D1 — Statisch und lokal als Grundform

**Bedarf:** Schnell nachschlagen und üben, ohne Konto und laufenden Dienst. **Entscheidung:** HTML/CSS/JavaScript mit lokalen Assets. **Folge:** Günstige Offlinebereitstellung und einfache Dateistruktur; Python-Ausführung und persönliche Cloud-Synchronisation gehören nicht automatisch dazu. **Neu bewerten, wenn:** Eine tatsächlich benötigte Serverfunktion oder Mehrbenutzerrolle geplant wird.

## D2 — Vorhandenes Beispiel vor eigenem Programm

**Bedarf:** Anfänger sollen erst lesen und verstehen können. **Entscheidung:** PRIMM-orientierte Etappen mit eigener Ausführung, Untersuchung, Veränderung und Transfer. **Folge:** Lösungsklappen und Verständnisfragen ergänzen den Lernweg; die Selbstlernseite bildet Unterrichtsdialog nur teilweise ab. **Neu bewerten, wenn:** Ein Gebrauchstest konkrete Verständnishürden zeigt. Wissenschaftliche Einordnung: [[12 Wissenschaftliche Grundlagen]].

## D3 — Daten getrennt von Darstellung

**Bedarf:** Neue Inhalte ergänzen, ohne jede Ansicht umzubauen. **Entscheidung:** `inhalte.js` und `kurs.js` liefern Daten; `app.js` rendert und navigiert. **Folge:** Eindeutige IDs und gültige Verweise werden wichtiger. Neue Aufgabentypen benötigen weiterhin passende Tests; die Trennung automatisiert keine fachliche Freigabe.

## D4 — Fehlende Daten sichtbar lassen

**Bedarf:** Live-Übungen sollen nutzbar bleiben, obwohl ein Originaldatensatz fehlt. **Entscheidung:** Eigens benannte `live-mini.csv` und getrennte Demoergebnisse. **Folge:** Ausführbare Beispiele ohne erfundene Originalbestätigung. **Neu bewerten, wenn:** Die echte Datei mit geklärter Herkunft vorliegt; dann Format, Einheiten und Resultate zusätzlich prüfen.

## D5 — Nachweisbare Bytes und begrenzte Freigaben

**Bedarf:** Unterschiedliche Arbeitskopien und Pakete zuverlässig vergleichen. **Entscheidung:** Originalhashes, Projektmanifest, unabhängige Tests und ZIP-Readback. **Folge:** Bewusstes Manifestupdate nach Diffprüfung; ein Hash belegt weder didaktische Qualität noch Rechte. **Neu bewerten, wenn:** Der Veröffentlichungsumfang oder die Paketstruktur verändert wird.

## D6 — Öffentliche Dokumentation ohne rohe Chats

**Bedarf:** Projektwissen dauerhaft verfügbar machen. **Entscheidung dieser Erweiterung:** Aussagen zusammenfassen und an Code, Dokumente oder GitHub-Nachweise binden. **Folge:** Private Gesprächsinhalte, Zwischenüberlegungen und lokale Zugangsdaten werden nicht als Dokumentationsarchiv veröffentlicht. Unlesbare Chats und historische Zustände bleiben ausdrücklich gekennzeichnet.

## Geprüfte Projektquellen

- [ARBEITSPLAN_Lernwerkzeug.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/ARBEITSPLAN_Lernwerkzeug.md)
- [AUDIT.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/AUDIT.md)
- [Lernwerkzeug/LERNKONZEPT.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/LERNKONZEPT.md)
- [Lernwerkzeug/ABDECKUNG.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/ABDECKUNG.md)
- [SKILL_RECHERCHE.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/SKILL_RECHERCHE.md)

Weiter: [[03 Projektleitfaden]] · [[00 Start]] · [[94 Gesprächs- und Quellenabgleich]]
