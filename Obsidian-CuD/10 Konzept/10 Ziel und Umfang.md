---
title: "10 Ziel und Umfang"
description: "CuD begleitet Studierende ohne Programmiererfahrung im Fach Coding und Digitalisierung. Die Oberfläche bündelt Lerntexte, Originalverweise, Arbeitsabläufe, Beispiele und Fehlersuche. Sie soll den Wechsel zwischen einer A"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Was CuD leisten soll

CuD begleitet Studierende ohne Programmiererfahrung im Fach Coding und Digitalisierung. Die Oberfläche bündelt Lerntexte, Originalverweise, Arbeitsabläufe, Beispiele und Fehlersuche. Sie soll den Wechsel zwischen einer Aufgabe, dem dafür nötigen Wissen und einem selbst geschriebenen Programm erleichtern.

## Der derzeitige Inhalt

| Bestandteil | Dokumentierter Umfang | Aussagegrenze |
| --- | --- | --- |
| Vorlesungen | Zehn Etappen; neun aus Vorlesungen 001–003, eine eigene FFT-Einführung | Zusammenfassungen, keine vollständige Übertragung aller Folien |
| Aufgabenbegleitung | Alle 31 Aufgaben des vorhandenen Übungsskripts | Keine Zusage für künftige oder andere Übungsblätter |
| Live-Übungen | Vier begleitete Aufgaben aus Vorlesung 003 | Drei verwenden synthetische Daten statt der fehlenden Originaldatei |
| Befehlsübersicht | 49 Befehlsgruppen im gespeicherten Prüfergebnis | Datentypen und Bibliotheken bleiben zu beachten |
| Lernkontrollen | Zehn eigene Verständnisfragen | Keine Prüfung einer frei programmierten Lösung |
| Transfer | Eigenes Projekt zu CSV, Zeitreihen und Klassen | Didaktisches Beispiel, keine reale Prozessfreigabe |

Diese Zahlen stammen aus den vorhandenen Inhalten und gespeicherten Prüfdateien vom 15.10.2026. In dieser Dokumentationsarbeit wurde die vollständige Anwendungsmatrix nicht erneut ausgeführt. [[90 Stand und Nachweise]] nennt die Belege.

## Lernziele nach Themen

Die Reihenfolge beginnt mit Interpreter, Datei und Terminal. Danach folgen Variablen, Entscheidungen, Schleifen und Sammlungen. Messdaten führen zu CSV, NumPy, Diagrammen, Funktionen, Pandas, Fehlwerten und Zeitrastern. Klassen verbinden die Verarbeitung zu einem kleinen Projekt. FFT ergänzt ein eigenes Signalbeispiel.

Das Lernziel ist eine konkrete Handlung: etwa eine CSV einlesen, Eingabefehler erklären oder eine Filterbedingung begründen. Aus der Zahl besuchter Seiten wird keine Kompetenz abgeleitet.

## Grenzen, die sichtbar bleiben müssen

`bb12024.csv` fehlt. Die drei betroffenen Live-Programme nutzen die eigens benannte `live-mini.csv`. Ihre Demoausgaben dürfen nicht als bestätigte Originalergebnisse erscheinen. Auch die Zuordnung von `sensor_messdaten_projekt.csv` zu `messdaten.csv`, abweichende Sollzahlen und verschiedene Filterregeln bleiben offen.

Der Lernraum führt Python nicht selbst aus. Installation und Ausführung geschehen im eigenen Editor oder einem bewusst gewählten externen Notebook. Ein Anfänger-Gebrauchstest und ein Nachweis des tatsächlichen Lernerfolgs stehen aus. [[23 Qualität und Prüfungen]] beschreibt die nötigen Nachweise.

## Projektbelege

- [Lernwerkzeug/ABDECKUNG.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/ABDECKUNG.md)
- [Lernwerkzeug/LERNKONZEPT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/LERNKONZEPT.md)
- [Lernwerkzeug/pruefung/ergebnis.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/pruefung/ergebnis.json)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
