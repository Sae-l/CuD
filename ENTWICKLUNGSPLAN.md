# CuD: vom Kursmaterial zur Python-Lernapp

Stand: 17.10.2026. Zielgruppe: Studienanfänger ohne Programmiererfahrung. Dies ist der Ausbauplan für das vorhandene Projekt, keine Neuentwicklung. Die Ausbaustufe ist für Version 0.3.0 vorgesehen; Veröffentlichung und erfolgreiche technische Prüfungen werden getrennt belegt.

## Zielbild und Lernweg

Die App beantwortet jederzeit drei Fragen: Was lerne ich als Nächstes? Was soll ich selbst tun? Was muss ich wiederholen? Erfolg bedeutet, ein kleines Programm ohne Vorlage schreiben, erklären und bei einem Fehler untersuchen zu können. Eine angeklickte Antwort und eine Bearbeitungsmarke sind dafür noch kein Beweis.

```text
Willkommen → Mein Lernplan → Einrichtung → nächste Vorlesungsetappe
                              ↓
                  Vorhersagen → Ausführen → Erklären
                              ↓
                  Verändern → selbst schreiben → prüfen
                              ↓
                    Originalaufgabe → Transferprojekt
                              ↓
                    ohne Vorlage wiederholen
```

Der Lernplan wählt die erste nicht selbst als bearbeitet markierte Etappe. Die Reihenfolge stammt aus `vorlesungen` in `Lernwerkzeug/kurs.js`. Alle Etappen bleiben frei erreichbar. Nach der letzten Etappe führt die Hauptaktion zum vorhandenen Mini-Projekt. Einrichtung bleibt vor der ersten Etappe sichtbar.

## Verbindliche Designregeln

| Bereich | Regel |
| --- | --- |
| Identität | Vorhandene lokale Outfit-Schrift und Code-Schrift weiterverwenden. Papier `#f6f5ef`, Text `#20271f`, Waldgrün `#1f2a1d`, Aktion `#365337`, Limette `#d5f58b`, Nebeninformationen `#596052`. |
| Hierarchie | Eine H1 pro Ansicht. Eine Hauptaktion für den nächsten Lernschritt. Dunkle Fläche für die nächste Etappe; ruhige helle Fläche für Lernrhythmus und Bearbeitungsstand. |
| Lesen | Lerntexte links ausrichten, kurze Absätze, höchstens etwa 74 Zeichen pro Zeile. Fachwort beim ersten Auftreten erklären. Code und Ausgaben visuell unterscheiden. |
| Dichte | Lernplan kurz halten; vollständige Vorlesungsbeschreibungen im bestehenden Vorlesungsbereich. In Lektionen direkt zu Beispiel, eigener Arbeit und Verständnischeck springen. |
| Hilfe | Hinweise einzeln öffnen. Lösungen und Ausgaben zunächst schließen; Suchtreffer enthalten keine Lösungen. |
| Bedienung | Sichtbarer Tastaturfokus, beschriftete Eingaben, Rückmeldungen als Status, mindestens 44 px hohe Bedienflächen. Farbe immer durch Text ergänzen. |
| Mobil | Ab 320 px lesbar; Karten stapeln, lange Titel umbrechen, Code und Tabellen im eigenen Bereich scrollen. |
| Bewegung | Bestehende Bewegung nur für den Einstieg. Lernplan und Wiederholung ohne Animation; reduzierte Bewegung respektieren. |
| Vertrauen | Quellen an der Etappe verlinken. Eigene Beispiele, synthetische Daten und offene Quellenfragen ausdrücklich kennzeichnen. |

Die Gestaltung dient der Orientierung und dem Arbeiten mit Code. Zusätzliche Dekoration, Ranglisten oder tägliche Serien sind für diese Ausbaustufe nicht vorgesehen.

## Lernmethoden und ihre Umsetzung

| Methode | Anwendung | Grenze |
| --- | --- | --- |
| PRIMM | Kurzes funktionierendes Beispiel: erst Ausgabe vermuten, lokal starten, Zeilen erklären, verändern, eigene Miniübung schreiben. | Die Forschung stammt unter anderem aus dem Schulkontext; die Übertragbarkeit auf diesen Hochschulkurs muss praktisch geprüft werden. |
| Kleine Lernziele | Ein überprüfbares Ziel pro Etappe, konkrete Voraussetzungen, passende Originalaufgaben. | Kein pauschales Zeitversprechen für unterschiedliche Anfänger. |
| Gestufte Hilfe | Erst eigener Versuch, dann einzelner Hinweis, schließlich getrennte Musterlösung. | Hilfe bleibt freiwillig zugänglich. |
| Abrufübung | Wiederholungsansicht zeigt Erklärfrage und eigene Schreibaufgabe vor der Selbstkontrolle; anschließend Auswahlfrage mit Begründung. | Eigener Code wird im Browser nicht automatisch bewertet. Wiedererkennen allein genügt nicht. |
| Wiederholung mit Abstand | Quizfehler sofort vormerken. Richtige Antworten planen zunächst 1, danach 3, 7 und 14 Tage; danach weiterhin 14 Tage. Vorzeitiges erneutes Prüfen verlängert nicht. | Feste Abstände sind eine einfache Produktregel, kein individuell optimierter Algorithmus. Ein Tag entspricht 24 Stunden. |
| Transfer und Debugging | Originalübungen und bestehendes Mini-Projekt selbst schreiben. Fehlermeldung, betroffene Zeile, minimale Eingabe, Vermutung, Änderung und erneuter Test dokumentieren. | Fehlende Originaldaten bleiben offen; keine erfundenen Originalergebnisse. |

Methodische Grundlage: [PRIMM-Studie von Sentance, Waite und Kallia](https://eprints.gla.ac.uk/229013/) und [Review zu Retrieval Practice von McDermott](https://www.annualreviews.org/content/journals/10.1146/annurev-psych-010419-051019). Daraus wird kein bereits nachgewiesener Lernerfolg dieser App abgeleitet. Die Uni-PDFs und das Übungsmaterial bleiben die fachlichen Hauptquellen.

## Struktur und konfigurierbare Inhalte

| Verantwortlichkeit | Datei |
| --- | --- |
| Quellen, Aufgaben und bestehende Begriffe | `Lernwerkzeug/inhalte.js` |
| Vorlesungen, Lernziele, Quiz, Reihenfolge, Einrichtung, Zusatzbefehle | `Lernwerkzeug/kurs.js` |
| Wiederholungsabstände, Prüfung gespeicherter Daten, Terminberechnung | `Lernwerkzeug/lernstand.js` |
| Darstellung, Navigation, Suche, Speicherzugriff | `Lernwerkzeug/app.js` |
| Gestaltung und responsive Regeln | `Lernwerkzeug/styles.css` |
| Inhalts-/Python-/Offline- und Browserprüfungen | `Lernwerkzeug/pruefen.cjs`, `Lernwerkzeug/kompatibilitaet.cjs` |

Neue Vorlesungen ergänzen den bestehenden Datenvertrag aus [ERWEITERN.md](Lernwerkzeug/ERWEITERN.md). Es braucht dafür keine neue Route, keinen zusätzlichen Renderer und keine feste Lektionenanzahl. Inhalte mit stabilen IDs, Quelle, PDF-Seite, Lernziel, Beispiel samt Ausgabe, eigener Aufgabe und Quiz eintragen. Originaldateien bleiben unverändert. Für neue Aufgabenlösungen einen unabhängigen Ergebnisprüffall ergänzen; ein automatischer PDF-Import ist keine fachliche Freigabe.

Die App bleibt statisch und funktioniert aus einem vollständig entpackten Ordner. Kein Backend und keine zusätzliche Laufzeitabhängigkeit. `cud-lernfortschritt-v1` bleibt bestehen; Wiederholungen liegen separat unter `cud-wiederholung-v1`. Unbekannte IDs und ungültige Einträge werden verworfen. Bei gesperrtem Speicher funktioniert die Sitzung weiter und zeigt die Speichergrenze. Es gibt keine geräteübergreifende Synchronisation.

## Umsetzung und nächste Schritte

| Schritt | Ergebnis und Abnahmekriterium |
| --- | --- |
| 1. Lernplan und Wiederholung, diese Ausbaustufe | Nächste Etappe, Bearbeitungsbalken, offene Wiederholungen und freie Etappenwahl. Richtige/falsche Antworten, Mehrfachklicks, Altmarken, beschädigte Daten, gesperrter Speicher und vollständiger Kursabschluss automatisiert prüfen. |
| 2. Gestaltung und Regression, diese Ausbaustufe | Vorhandene Python-Beispiele, Originalhashes, Suche, Lösungen, Offline-Einstieg und neue Ansichten prüfen. Handy/Tablet/Desktop, Tastatur und reduzierte Bewegung prüfen. Technische Sperren separat ausweisen. |
| 3. Gebrauchstest, als nächster fachlicher Meilenstein | Drei bis fünf echte Anfänger: Einstieg ohne Hilfe finden, Lektion 1 bearbeiten, kleinen Code selbst schreiben, einen Fehler untersuchen, am Folgetag ohne Vorlage wiederholen. Beobachtungen statt Zufriedenheitsbehauptungen sammeln. Noch nicht durchgeführt. |
| 4. Nächste Uni-Unterlagen, nach Verfügbarkeit | Neue Vorlesung seitenweise abgleichen, Quellenkonflikte klären, Datenobjekte und Ergebnisprüfungen ergänzen; erneut Gebrauchstest und Regression. bb12024.csv bleibt fehlend. |
| 5. Veröffentlichung | Lokale Änderungen mit sauberem aktuellem Checkout vergleichen, begrenzten PR erstellen, aktuelle Windows-/Linux-CI bestehen lassen, Release und Pages gesondert prüfen. Im aktuellen Arbeitsordner fehlt `.git`; bisherige CI-Ergebnisse gelten nicht für diesen neuen Stand. |

## Debugging und Freigabe

Ein Fehlerbericht nennt Route, Browser, Bildschirmbreite, Schritte, erwartetes und tatsächliches Verhalten sowie Konsolenmeldung. Zuerst mit leerem, danach mit bestehendem und gesperrtem Speicher reproduzieren. Terminberechnung lässt sich unabhängig von DOM und echter Uhr prüfen. Datenfehler an der Quelle, Darstellungsfehler im Renderer und Layoutfehler im CSS korrigieren.

Abnahme: ausführbare Beispiele und Quellhashes unverändert korrekt, neue Zustände geprüft, tatsächlich gerenderte Ansichten angesehen, Manifest erneuert und geprüft. Echte Geräte, Screenreader und Lernwirksamkeit benötigen eigene Nachweise. Technische Testergebnisse stehen in [ergebnis.json](Lernwerkzeug/pruefung/ergebnis.json), [kompatibilitaet.json](Lernwerkzeug/pruefung/kompatibilitaet.json) und dem [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md).
