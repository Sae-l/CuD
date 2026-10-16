---
title: "02 Gesamtübersicht"
description: "Die bewegliche Gesamtkarte liegt in [[CuD Gesamtkarte.canvas]]. Die folgenden Diagramme zeigen Zweck, System und Pflegeprozess in kompakter Form. Die verlinkten Notizen liefern die Einzelheiten."
type: moc
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud", "moc"]
---

# Die Gesamtkarte in drei Ansichten

Die bewegliche Gesamtkarte liegt in [[CuD Gesamtkarte.canvas]]. Die folgenden Diagramme zeigen Zweck, System und Pflegeprozess in kompakter Form. Die verlinkten Notizen liefern die Einzelheiten.

## Vom Ziel zur Anwendung

```mermaid
flowchart TD
  Z[Programmieren ohne Vorwissen lernen] --> L[PRIMM und kleine Lernschritte]
  Q[Kursunterlagen mit Herkunft und Seiten] --> I[Eigene Lerntexte und Beispiele]
  L --> I
  I --> W[Statisches Lernwerkzeug]
  W --> V[10 Etappen und Verständnisfragen]
  W --> U[31 Aufgaben und 4 Live-Übungen]
  W --> B[Befehle und Fehlerhilfe]
  V --> P[Python selbst ausführen]
  U --> P
  B --> P
  P --> T[Ergebnis erklären und selbst übertragen]
```

Zweck: [[10 Ziel und Umfang]] · Vorgehen: [[11 Lernmodell und Arbeitsweise]] · Forschung: [[12 Wissenschaftliche Grundlagen]].

## Technisches System

```mermaid
flowchart LR
  G[GitHub Repository] --> H[GitHub Pages]
  G --> D[Vollständiger lokaler Download]
  H --> S[Vorstellungswebsite index.html]
  S --> A[Lernwerkzeug index.html]
  D --> A
  K[kurs.js und inhalte.js] --> A
  A --> J[app.js: Suche, Navigation und Darstellung]
  J --> LS[Browser: lokale Bearbeitungsmarken]
  A --> E[Eigener Editor oder gewähltes Notebook]
  E --> PY[Python ausführen]
```

Eine Verbindung von Bearbeitungsmarken zu einem Server besteht im derzeitigen Code nicht. GitHub Pages liefert Dateien aus; Python läuft außerhalb des Lernwerkzeugs. Siehe [[20 Technische Architektur]] und [[41 Lokal Cloud und Synchronisation]].

## Inhalte pflegen und veröffentlichen

```mermaid
flowchart LR
  O[Quelle und Nutzungsumfang klären] --> S[Seiten sichten und Lernziel festlegen]
  S --> C[Lektion oder Übung ergänzen]
  C --> P[Unabhängige Erwartungen und Fehlerfälle]
  P --> B[Browser und Bedienung prüfen]
  B --> R[Diff und Originalhashes kontrollieren]
  R --> M[Manifest bewusst aktualisieren]
  M --> PR[Pull Request und CI]
  PR --> F[Freigegebene Dateien veröffentlichen]
```

Anleitungen: [[30 Neue Vorlesung hinzufügen]], [[31 Neue Übung hinzufügen]], [[32 Entwicklung und Release]]. Öffentlich sichtbare Dateien und die Veröffentlichung müssen gemeinsam betrachtet werden: [[42 GitHub Repositoryplan]], [[43 Sichtbarkeit für Besucher]], [[44 Sicherheit und Datenschutz]].

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
