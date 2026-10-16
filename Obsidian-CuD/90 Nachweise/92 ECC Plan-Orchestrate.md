---
title: "92 ECC Plan-Orchestrate"
description: "**Plan:** `Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md`"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Plan-Orchestrate Result

**Plan:** `Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md`
**Steps:** 6 · **Scope:** all · **Emitted:** 4 · **Blocked:** 2

Diese Seite ist das generierte Ergebnis der ausdrücklich gewünschten ECC-Anleitung. Die Befehle wurden **nicht ausgeführt**. Der Vault ist unabhängig davon bereits erstellt. Die Schritte beziehen sich auf künftige Produktarbeit und benötigen die in ihrem jeweiligen Befehl vorgesehenen Abläufe. Ein erzeugter Befehl ist keine Freigabe für eine Veröffentlichung.

Die Marker `#step-1` bis `#step-6` sind die im Skill verlangten Maschinenkennungen der nummerierten Planabschnitte. Sie sind nicht als zugesicherte Obsidian-Überschriftenanker zu verstehen. Die eigentliche Navigation verwendet [[33 Entwicklungsplan]].

## Steps overview

| # | Title | Tags | Command | Status |
| --- | --- | --- | --- | --- |
| 1 | Veröffentlichungsumfang entscheiden | design, security | `/plan` | emitted |
| 2 | Projekttexte korrigieren | fix, docs | `/orch-fix-defect` | emitted |
| 3 | Mehrere Übungsblätter unterstützen | impl | `/orch-add-feature` | emitted |
| 4 | Nächsten Inhalt ergänzen | impl | `/orch-add-feature` | emitted |
| 5 | Geräte und Anfänger prüfen | test | `/test-coverage` | BLOCKED — cannot carry plan scope |
| 6 | Dokumentation abgleichen | docs | `/update-docs` | BLOCKED — cannot carry plan scope |

## Step 1 — Veröffentlichungsumfang entscheiden

**Intent:** Erstelle für CuD einen Veröffentlichungsplan anhand des aktuellen Dateiinventars.

**Tags:** design, security

**Command rationale:** `/plan` nimmt eine freie Aufgabenbeschreibung auf; Schrittkennung und überprüfbare Kriterien reisen mit dem Befehl.

```text
/plan "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-1] Erstelle für CuD einen Veröffentlichungsplan anhand des aktuellen Dateiinventars. Acceptance: Jede Dateigruppe hat Herkunft und vorgesehene Sichtbarkeit; Kursmaterial ist als freigegeben oder ungeklärt markiert; offene Entscheidungen benennen Verantwortliche."
```

## Step 2 — Quellenkonflikte und Projekttexte korrigieren

**Intent:** Korrigiere die veraltete Beschreibung von CuD als privater Ablage und prüfe frühere CuD-1-Verweise.

**Tags:** fix, docs

**Command rationale:** `/orch-fix-defect` nimmt eine freie Aufgabenbeschreibung auf; Schrittkennung und überprüfbare Kriterien reisen mit dem Befehl.

```text
/orch-fix-defect "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-2] Korrigiere die veraltete Beschreibung von CuD als privater Ablage und prüfe frühere CuD-1-Verweise. Acceptance: Die Sichtbarkeitsbeschreibung stimmt mit dem öffentlichen Repository überein; aktuelle Einstiegslinks zeigen auf CuD; offene Daten- und Filterannahmen bleiben sichtbar."
```

## Step 3 — Mehrere Übungsblätter eindeutig unterstützen

**Intent:** Ergänze eindeutige Blattzuordnungen für den CuD-Aufgabenkatalog.

**Tags:** impl

**Command rationale:** `/orch-add-feature` nimmt eine freie Aufgabenbeschreibung auf; Schrittkennung und überprüfbare Kriterien reisen mit dem Befehl.

```text
/orch-add-feature "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-3] Ergänze eindeutige Blattzuordnungen für den CuD-Aufgabenkatalog. Acceptance: Zwei Aufgaben gleicher Nummer aus unterschiedlichen Blättern bleiben getrennt auffindbar; Quellen und unabhängige Tests sind eindeutig zugeordnet; bestehende Aufgabenadressen funktionieren weiter."
```

## Step 4 — Den nächsten Inhalt als begrenzte Erweiterung ergänzen

**Intent:** Ergänze nach Quellenfreigabe genau eine neue CuD-Vorlesungsetappe und eine zugehörige Übung gemäß Datenvertrag.

**Tags:** impl

**Command rationale:** `/orch-add-feature` nimmt eine freie Aufgabenbeschreibung auf; Schrittkennung und überprüfbare Kriterien reisen mit dem Befehl.

```text
/orch-add-feature "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-4] Ergänze nach Quellenfreigabe genau eine neue CuD-Vorlesungsetappe und eine zugehörige Übung gemäß Datenvertrag. Acceptance: Herkunft und Lernziel sind belegt; Beispiel und Aufgabe besitzen unabhängige Prüferwartungen; Hinweise und Lösungen sind getrennt bedienbar."
```

## Step 5 — Geräte- und Anfängerprüfung (blocked)

**Intent:** Reale Geräte und einen begrenzten Anfänger-Gebrauchstest mit dokumentierter Umgebung organisieren. **Tags:** test. **Command rationale:** Der dokumentierte Testbefehl akzeptiert keine freie schrittbezogene Aufgabenbeschreibung. Er ersetzt außerdem nicht die tatsächliche organisatorische Durchführung eines Gebrauchstests.

```text
BLOCKED — /test-coverage cannot carry plan scope; run manually if wanted: /test-coverage
```

## Step 6 — Dokumentation abgleichen (blocked)

**Intent:** Wissensbasis, Quellenabdeckung und Nachweise an den freigegebenen Produktstand anpassen. **Tags:** docs. **Command rationale:** Der dokumentierte Befehl trägt keine freie schrittbezogene Aufgabenbeschreibung.

```text
BLOCKED — /update-docs cannot carry plan scope; run manually if wanted: /update-docs
```

„Blocked“ bezeichnet hier ausschließlich die Einschränkung des **Befehlsrouters**. Die Wissensbasis wurde dadurch nicht blockiert oder unvollständig gelassen. Die beiden Schritte können als gewöhnliche klar abgegrenzte Arbeitsaufträge beschrieben werden.

## Batch execution

Die folgende Sammlung enthält nur die vier vom Router erzeugbaren Befehle in Reihenfolge. Sie wurde nicht gestartet und garantiert keine automatische serielle Abhängigkeit; jeder Befehl hat seine eigenen Prüf- und Freigabeschritte.

```text
/plan "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-1] Erstelle für CuD einen Veröffentlichungsplan anhand des aktuellen Dateiinventars. Acceptance: Jede Dateigruppe hat Herkunft und vorgesehene Sichtbarkeit; Kursmaterial ist als freigegeben oder ungeklärt markiert; offene Entscheidungen benennen Verantwortliche."
/orch-fix-defect "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-2] Korrigiere die veraltete Beschreibung von CuD als privater Ablage und prüfe frühere CuD-1-Verweise. Acceptance: Die Sichtbarkeitsbeschreibung stimmt mit dem öffentlichen Repository überein; aktuelle Einstiegslinks zeigen auf CuD; offene Daten- und Filterannahmen bleiben sichtbar."
/orch-add-feature "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-3] Ergänze eindeutige Blattzuordnungen für den CuD-Aufgabenkatalog. Acceptance: Zwei Aufgaben gleicher Nummer aus unterschiedlichen Blättern bleiben getrennt auffindbar; Quellen und unabhängige Tests sind eindeutig zugeordnet; bestehende Aufgabenadressen funktionieren weiter."
/orch-add-feature "[Plan: Obsidian-CuD/30 Weiterentwicklung/33 Entwicklungsplan.md#step-4] Ergänze nach Quellenfreigabe genau eine neue CuD-Vorlesungsetappe und eine zugehörige Übung gemäß Datenvertrag. Acceptance: Herkunft und Lernziel sind belegt; Beispiel und Aufgabe besitzen unabhängige Prüferwartungen; Hinweise und Lösungen sind getrennt bedienbar."
```

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
