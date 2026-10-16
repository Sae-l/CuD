---
title: "30 Neue Vorlesung hinzufügen"
description: "Ausgangspunkt ist `Lernwerkzeug/ERWEITERN.md`. Neue Lerntexte entstehen bewusst aus geprüften Quellen; sie werden nicht ungeprüft automatisch aus PDFs veröffentlicht. Als Arbeitsblatt dient [[Vorlage Vorlesung]]."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Von einer neuen Quelle zur neuen Lernetappe

Ausgangspunkt ist `Lernwerkzeug/ERWEITERN.md`. Neue Lerntexte entstehen bewusst aus geprüften Quellen; sie werden nicht ungeprüft automatisch aus PDFs veröffentlicht. Als Arbeitsblatt dient [[Vorlage Vorlesung]].

## 1. Quelle und Lernziel festlegen

Herkunft, Nutzungsumfang, Originaldateiname, PDF-Seiten und SHA-256 dokumentieren. Die Originaldatei unverändert ablegen. Bei unklaren Veröffentlichungsrechten die Quelle zunächst in einer privaten Arbeitsablage halten. Ein öffentliches `Referenz/` ist keine private Ablage: [[43 Sichtbarkeit für Besucher]].

Die benötigten Originalseiten tatsächlich ansehen und in der Sichtung erschließen. Eine Etappe auf eine überprüfbare Handlung begrenzen. Voraussetzungen als vorhandene Inhalts-IDs notieren, etwa `lektion-5` für Funktionen. Quellenkonflikte vor dem Schreiben sichtbar festhalten.

## 2. Ein Objekt in kurs.js ergänzen

Im Array `vorlesungen` eine neue dauerhafte ID verwenden. **`lektion-10` ist bereits die FFT-Etappe.** Vor Übernahme einer Vorlage nach vorhandenen IDs suchen. Das folgende Beispiel ist ein neuer eigener Ergänzungsvorschlag, kein bereits integrierter Kursinhalt:

```js
{
  id: "lektion-11",
  title: "Funktionen mit kleinen Prüffällen kontrollieren",
  topic: "Funktionen",
  origin: "eigene-ergaenzung",
  sourceHref: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions",
  sourceTitle: "Python-Dokumentation: Funktionen; eigenes Beispiel",
  needs: ["lektion-5"],
  summary: "Ein Rückgabewert lässt sich gezielt kontrollieren.",
  goal: "Du prüfst eine eigene Funktion mit zwei Eingaben.",
  blocks: [["Erwartung zuerst", "Lege das richtige Ergebnis vor dem Start fest."]],
  code: "def doppelt(x):\n    return 2 * x\n\nprint(doppelt(3))",
  output: "6\n",
  investigate: "Was ist Parameter, was ist Rückgabewert?",
  modify: "Teste zusätzlich 0 und -2.",
  make: "Schreibe dreifach(x) und prüfe zwei eigene Eingaben.",
  answer: "dreifach gibt 3 * x zurück; für 2 ergibt sich 6.",
  quiz: {
    question: "Welchen Wert gibt doppelt(0) zurück?",
    options: ["0", "2", "None"],
    correct: 0,
    explanation: "2 * 0 ergibt 0. Die Funktion enthält return."
  }
}
```

Für eine tatsächliche neue Kurs-PDF stattdessen `origin`, `sourceFile`, `pages` und `page` wie im vorhandenen Vertrag setzen. `page` meint die PDF-Seite, nicht zwingend die aufgedruckte Foliennummer. Bei einem vom Standard abweichenden Dateinamen `sourceFile` explizit angeben. Keine zukünftige Kursquelle durch einen erfundenen Namen als vorhanden ausgeben.

## 3. Verknüpfungen und Lernfolge kontrollieren

Die vorhandene Reihenfolge erzeugt Folgeschritte; `needs` erlaubt ausdrücklich genannte Voraussetzungen. Zusätzliche Befehle in `weitereBefehle` müssen auf eine existierende Inhalts-ID verweisen. Abdeckungsplan und Quellenübersicht ergänzen. Die neue Etappe darf bestehende IDs und damit Lesezeichen und Bearbeitungsmarken nicht ersetzen.

## 4. Fachlich und technisch prüfen

Code in einer sauberen Python-Umgebung ausführen und die erwartete Ausgabe unabhängig kontrollieren. Verständnisfrage mit falscher und richtiger Antwort testen. Quelle, Voraussetzungen, Suche und Navigation prüfen. Danach die betroffenen Tests aus [[32 Entwicklung und Release]] ausführen und den gespeicherten Bericht einordnen.

Erst nach Diff- und Originalhashkontrolle das Manifest bewusst erneuern. Abnahme: stabile neue ID, echte Quelle oder klar benannte eigene Ergänzung, korrektes ausführbares Beispiel, eindeutige Quizantwort und funktionierende Verweise. Das Beispiel oben ist eine Vorlage und wurde diesem Lernraum nicht hinzugefügt.

## Projektbelege

- [Lernwerkzeug/ERWEITERN.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/ERWEITERN.md)
- [Lernwerkzeug/kurs.js](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/kurs.js)
- [CONTRIBUTING.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/CONTRIBUTING.md)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
