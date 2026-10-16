---
title: "94 Gesprächs- und Quellenabgleich"
description: "Umfang der Repository-, Dateisystem- und Gesprächssichtung und Regeln für widersprüchliche Aussagen."
type: "note"
language: de
created: "2026-10-16"
updated: "2026-10-16"
status: "dokumentiert"
tags: ["cud", "wartung"]
reviewed_commit: "b784b9bed47ba9232c0e121b0f496a6dd75b119d"
---

# Was für diese Erweiterung tatsächlich gelesen wurde

## Quellenrang und Konfliktregel

1. **Code und Dateien an einem bestimmten Commit** belegen den implementierten Zustand.
2. **Ausgeführte Tests am benannten Commit** belegen ihren konkreten Prüfumfang.
3. **Aktuelle GitHub-Metadaten** belegen etwa Sichtbarkeit, Merge oder vorhandene Releaseassets.
4. **Lokale Arbeitsdateien** können älter oder abweichend sein; ihren Hash und Kontext nennen.
5. **Gespräche** erklären Anforderungen, Entscheidungen und den damaligen Stand. Ein alter Abschlussbericht wird nicht als neuer Testlauf ausgegeben.

Für die Sichtung war `main` auf `b784b9bed47ba9232c0e121b0f496a6dd75b119d`; PR #11 ist darin enthalten. Das Repository ist öffentlich. Die gelesene Historie enthält die Integration von Aufgabenbegleitung, Live-Demo und Gestaltung. Das neueste abgefragte Release ist weiterhin v0.2.1 vom 15.10.2026; es stammt vor dem späteren Vault-Merge. Deshalb darf „aktueller main“ nicht mit „Bytes des älteren Release-ZIP“ gleichgesetzt werden.

## Gelesene Projektchats

| Exakter Chattitel | Gelesener Umfang | Für die Dokumentation verwendeter Kontext | Aktueller Gegenbeleg beziehungsweise Bestätigung |
| --- | --- | --- | --- |
| Sichten der Referenz-PDFs | Zwei verfügbare Gesprächsabschnitte | Ursprünglicher Wunsch nach gemeinsamer Suche; Pilot und Quellensichtung | Arbeitsplan, Seitenindex und Sichtungsbericht |
| Python-Lernplattform strukturieren | Ein verfügbarer Gesprächsabschnitt | Anfängerzielgruppe, geordnete Inhalte, Einrichtung und ausdrückliche PRIMM-Auswahl | Lernkonzept, Lektionen und Renderer |
| Audit and improve repository | Fünf jüngste Abschnitte; ältere Teile nicht vollständig gelesen | Lernfragen, lokale Markierungen, Erweiterbarkeit, Prüfgrenzen | AUDIT, Testskripte und spätere Git-Integration |
| Apply GPT taste skill | Drei verfügbare Gesprächsabschnitte | Gestaltungsumfang und damalige Übergabe zur Releaseintegration | Assets, Oberfläche, Prüfbericht und PR #8 |
| Repository auf Vollständigkeit und „ | Fünf jüngste Abschnitte; ältere Teile nicht vollständig gelesen | Fehlende Originaldaten, spätere Live-Demo, CuD-Umbenennung, Pages-Quellkorrektur und Releaseabschluss | Abdeckungsplan, Release-API, Root-Seite und Git-Historie |
| Lernwebseite mit gemeinsamer Suche | Lesewerkzeug meldete einen technischen Fehler | Kein direkter Gesprächsinhalt als gelesen behauptet | Arbeitsplan und gespeicherte Projektdateien als Ersatzquellen |

Die Titel werden in der von der App gelieferten Form verwendet; der letzte Vollständigkeitstitel ist dort abgeschnitten. Es wurden keine Nachrichten an andere Chats gesendet. Rohtranskripte, interne Zwischenüberlegungen und persönliche Kontodaten werden nicht in den öffentlichen Vault kopiert.

## Wichtigste bereinigte Erkenntnisse

Der ursprüngliche Auftrag war ein gemeinsamer Zugang zu Aufgaben, Begriffen, Befehlen und Fehlerhilfe. Die Anfängeroberfläche und PRIMM wurden anschließend ausdrücklich gewählt. Ältere Angaben zu neun Lektionen, drei begleiteten Aufgaben und privaten Repositories beschreiben damalige Zwischenstände; die aktuelle Begleitung umfasst zehn Etappen und 31 Aufgaben im öffentlichen CuD. Fehlende bb12024.csv, ungeklärte Originalzahlen und offene Geräte-/Lernprüfungen sind durch spätere Gestaltung oder Softwarefreigabe nicht automatisch erledigt.

Die private Arbeitskopie im übergeordneten Ordner und der aktuelle Checkout besitzen unterschiedliche Nachweisdateien. Die Erweiterung nutzt für implementiertes Verhalten den Git-Checkout; Unterschiede werden als Vergleich in [[Pruefung/Referenzabgleich.json|Referenzabgleich.json]] festgehalten und nicht durch Überschreiben der alten Ablage verdeckt.

## Wissenschaftliche Herkunft nicht nachträglich umdeuten

Die gelesene Anfänger-Konversation und `LERNKONZEPT.md` belegen die Entscheidung für PRIMM und den damaligen Praxisverweis. Die Primärstudie von 2019 und Dunlosky et al. wurden in der Wissensbasis als nachvollziehbare Literatur ergänzt. Daraus folgt keine rückwirkende Behauptung, beide Artikel seien schon vor dem ersten Code vollständig ausgewertet worden. [[12 Wissenschaftliche Grundlagen]] trennt diese Ebenen.

## Pflegepflicht

Bei einer neuen Zusammenführung den geprüften Commit aktualisieren, betroffene Funktionen und Tests erneut lesen und die passenden Wissensseiten nachführen. Historische Protokolle als solche erhalten. Fehlt ein neuer Nachweis, den offenen Punkt benennen. Der vorliegende Abgleich ist eine definierte Projektsichtung und kein Anspruch, sämtliche früheren Gespräche oder jede PDF-Seite vollständig gelesen zu haben.

## Geprüfte Projektquellen

- [ARBEITSPLAN_Lernwerkzeug.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/ARBEITSPLAN_Lernwerkzeug.md)
- [AUDIT.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/AUDIT.md)
- [Lernwerkzeug/ABDECKUNG.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/ABDECKUNG.md)
- [Lernwerkzeug/LERNKONZEPT.md](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/LERNKONZEPT.md)
- [Lernwerkzeug/pruefung/ergebnis.json](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/pruefung/ergebnis.json)
- [Lernwerkzeug/pruefung/kompatibilitaet.json](https://github.com/Sae-l/CuD/blob/b784b9bed47ba9232c0e121b0f496a6dd75b119d/Lernwerkzeug/pruefung/kompatibilitaet.json)

Weiter: [[03 Projektleitfaden]] · [[00 Start]] · [[94 Gesprächs- und Quellenabgleich]]
