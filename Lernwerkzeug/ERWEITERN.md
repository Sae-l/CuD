# Neue Vorlesungen und Übungen ergänzen

Das Werkzeug ist bereits datengetrieben erweiterbar: `kurs.js` liefert Vorlesungen und Zusatzbefehle, `inhalte.js` die bestehenden Übungsobjekte. Darstellung und Suche liegen in `app.js`. Neue Inhalte werden nicht automatisch aus PDFs erzeugt oder fachlich freigegeben.

Seit dem lokalen Ausbau vom 17.10.2026 lädt `index.html` zwischen `kurs.js` und `app.js` zusätzlich `lernstand.js`. Diese Datei enthält nur die validierte Speicherstruktur und die unabhängig prüfbare Terminregel. Speicherzugriff und Oberfläche bleiben in `app.js`. Neue Vorlesungen erscheinen automatisch im Lernplan und nutzen ihr vorhandenes `quiz`, `investigate`, `make` und `answer` für die Wiederholung. Die stabilen IDs sind auch Wiederholungsschlüssel. Produktregeln und Ausbaukriterien: [Entwicklungsplan](../ENTWICKLUNGSPLAN.md).

## Architektur und Änderungsumfang

Die Projektstartseite `../index.html` enthält ihre eigene Gestaltung und Menülogik. Der Lernraum `index.html` lädt `styles.css`, danach die lokalen Skripte `inhalte.js`, `kurs.js` und `app.js`; GSAP und ScrollTrigger stammen ebenfalls aus `assets/`. Es gibt keinen Buildschritt, Serverdienst, Kontozugang oder Python-Interpreter im Browser. Die Daten werden als lokale Skripte geladen, damit der entpackte Ordner auch über `file://` benutzbar bleibt.

`app.js` verbindet die Inhaltsdaten mit Suche, Quiz, Quellenlinks und lokaler Fortschrittsmarkierung. Die Route steht hinter `#`, etwa `index.html#lektion-1`. IDs sind damit zugleich Adressen und Speicherschlüssel. Relative Links aus der Projektstartseite müssen `Lernwerkzeug/index.html#…` enthalten; Links innerhalb des Lernraums verwenden `#…`. Lass `index.html` in dateiübergreifenden Einstiegen ausdrücklich stehen: Verzeichnisadressen funktionieren beim direkten Öffnen nicht in jedem Browser.

| Änderung | Mitprüfen |
| --- | --- |
| Neue Lektion oder Übung | Datenobjekt, Quelle, eindeutige ID, Suchtreffer, Quiz/Lösung und unabhängige Ergebniserwartung |
| ID oder Route | Alle Querverweise, `needs`, Navigation, Tests, bestehende Lesezeichen und Fortschrittsmarken |
| Gestaltung oder Menü | Projektstartseite und Lernraum getrennt, schmale/breite Darstellung, Tastatur und reduzierte Bewegung |
| Neue lokale Datei | Relative Links, Herkunft/Rechte, Offline-Paket und Integritätsmanifest |

Eine Fehlerkorrektur an Navigation oder JavaScript erfordert keine Neugestaltung. Halte vor einer Layoutänderung fest, welche konkrete Nutzung sie verbessert, und vergleiche die gerenderten Ansichten vor und nach der Änderung. CSS-Klassen, DOM-Struktur und Testselektoren müssen zusammenpassen; ändere Tests nicht nur, damit eine unbeabsichtigte Gestaltungsänderung grün wird.

## Eine neue Vorlesungsetappe

1. Lege die Originaldatei unverändert in `Referenz/Vorlesungen/` ab. Dokumentiere Herkunft und SHA-256; erschließe die benötigten Seiten in `Referenz_Sichtung/`. Bestehende Sichtungsnachweise nicht überschreiben.
2. Ergänze in `kurs.js` im Array `vorlesungen` ein Objekt nach dem untenstehenden Muster. Nutze eine neue, dauerhaft eindeutige ID; bestehende IDs sind Lesezeichen und Schlüssel für lokale Bearbeitungsmarken.
3. Prüfe Quellenseite, Lernziel, Beispiel, Ausgabe, Verständnisfrage und eigene Transferaufgabe. Das Beispiel muss eigenständig ausführbar sein. Zusatzpakete werden im Beispiel ausdrücklich importiert.
4. Ergänze bei Bedarf Einträge in `weitereBefehle` und im Abdeckungsplan. Die Zuordnung muss eine tatsächlich vorhandene Inhalts-ID verwenden.
5. Führe die Prüfungen aus [CONTRIBUTING.md](../CONTRIBUTING.md) aus. Aktualisiere Bericht und Manifest erst nach Sichtprüfung des Diffs.

Beispielvertrag, **kein bereits geprüfter neuer Kursinhalt**:

```js
{
  id: "lektion-10",
  title: "Ein konkretes neues Lernziel",
  topic: "Neues Kursthema",
  origin: "004",
  sourceFile: "004_Coding und Digitalisierung.pdf",
  pages: "3–5",
  page: 3,
  summary: "Was diese Etappe verständlich macht.",
  goal: "Du kannst anschließend eine konkrete Handlung selbst ausführen.",
  blocks: [["Ein Begriff", "Eine kurze Erklärung anhand der Originalquelle."]],
  code: 'print("Eigenes, ausführbares Beispiel")',
  output: "Eigenes, ausführbares Beispiel\n",
  investigate: "Erkläre einen Schritt des Beispiels.",
  modify: "Ändere einen Wert und sage die Auswirkung vorher.",
  make: "Schreibe eine kleine eigene Aufgabe ohne Vorlage.",
  answer: "Begründete Selbstkontrolle zur eigenen Aufgabe.",
  quiz: {
    question: "Eine überprüfbare Verständnisfrage?",
    options: ["Passende Antwort", "Typischer Denkfehler"],
    correct: 0,
    explanation: "Warum die Antwort passt und der Denkfehler nicht."
  }
}
```

`correct` zählt ab 0. `sourceFile` ist optional, wenn die Datei dem Muster `<origin>_Coding und Digitalisierung.pdf` folgt. `needs` kann ausdrücklich eine Liste vorhandener Inhalts-IDs angeben; sonst wird die vorherige Etappe als Voraussetzung verlinkt. Die erste Etappe verweist auf die Einrichtung. `next`, Art und Quellenobjekt werden aus der Reihenfolge ergänzt.

Kursreihenfolge, Themenfilter, Suchindex, PDF-Liste, Bearbeitungszähler und Prüfanzahl folgen den Daten. Dafür müssen keine zusätzlichen Navigationslinks oder festen Lektionenanzahlen geändert werden. Die Tests prüfen Pflichtfelder, eindeutige IDs, vorhandene Quellen, gültige Quizantworten und alle erfassten Ansichten.

## Eine Originalübung begleiten

Verwende den bestehenden Aufbau von `aufgabe-6-1` als Vorlage in `inhalte.js`: stabile `id`, `number`, `kind: "Übung"`, Quelle mit PDF-Seite, `needs`, kurze Schritte, einzeln aufklappbare `hints`, überprüfbare `checks` und eine getrennte `solution`. Die Aufgabenstellung ist am Original abzugleichen. Eigene Ergänzungen werden als solche gekennzeichnet; fehlende Originaldaten werden nicht durch erfundene Originalergebnisse ersetzt.

Ergänze die Aufgabennummer und passende Lerntexte im Array `abdeckung`. Für ein anderes Übungsblatt kann eine Zeile `sourceFile` auf die entsprechende Datei in `Referenz/Pflicht Übungen/` setzen. Der Abdeckungsplan berechnet die Zahl geführter Aufgaben anhand der vorhandenen Übungsobjekte. Aufgabennummern aus verschiedenen Blättern sollten unterschiedliche IDs und eine eindeutige Quellenzuordnung erhalten; das aktuelle Zählen nach Nummer muss bei sich wiederholenden Nummern erweitert werden.

Die Python-Prüfung führt ausschließlich die drei in `pipelineIds` benannten CSV-Übungen als zusammenhängende Pipeline aus. **Neue, unabhängige Originalübungen brauchen einen eigenen Prüffall.** Ergänze zuerst einen unabhängigen Prüffall in `scripts/uebungen_pruefen.py` oder der bestehenden Python-Prüfung und dann die ID unter `testedSolutions`. Aufgaben des inventarisierten Übungsblatts werden dort aus den Originalnummern abgeleitet; die Tests verlangen weiterhin eine tatsächlich vorhandene Lösung für jede Nummer. Ein Lösungsobjekt ohne diese Zuordnung lässt die Prüfung scheitern. Die automatischen Prüfungen sind erweiterbar, aber nicht inhaltsunabhängig: Dateiformate, erwartete Resultate und Randfälle erfordern passende Tests.

## Ein eigenes Praxisprojekt ergänzen

Das neue `praxis-zeitreihe` zeigt die vorhandene Darstellung von Arbeitsabläufen, Hinweisen, Checks und Lösungen mit einem Download. Eigene Mini-Daten liegen in `beispiele/`, bleiben von Originaldaten getrennt und werden im Python-Test mit unabhängigen Erwartungen geprüft. Für das Üben selbst ist keine Browser-Python-Laufzeit nötig.

## Was bei einem Ausbau weiterhin Arbeit bleibt

- Neue PDFs seitenweise sichten und die Abdeckung fachlich abgleichen.
- Selbstkontrollen und Fehlerfälle entwerfen; eine richtige Auswahlfrage ist keine Programmierprüfung.
- Die drei CSV-Pipeline-Tests von unabhängigen neuen Übungen unterscheiden.
- Fremde Kursrechte und echte Gerätebedienung prüfen, bevor daraus weitergehende Freigaben abgeleitet werden.

Es braucht für die vorhandene Größenordnung kein neues Framework, Backend oder Konto. Wenn irgendwann mehrere Kurse unterschiedliche Nummernkreise, Lernstände oder Rollen teilen sollen, ist ein übergreifender Kurskatalog eine neue Anforderung; er wird hier nicht vorweggenommen.

Für Begleitcode ohne PDF kann eine Lektion `sourceHref` und `sourceTitle` setzen; sie umgehen die sonst abgeleitete PDF-Adresse. Lektion 10 verwendet diesen Weg für die unveränderte FFT-Datei. Die vollständige Liste der Quellen und ihre Aussagegrenzen stehen im Abdeckungsplan.

## Funktion und Gestaltung getrennt abnehmen

Prüfe zuerst Datenvertrag, Quellen, ausführbare Beispiele und Interaktionen mit den vorhandenen Tests. Prüfe dann die tatsächlich gerenderte Projektstartseite und den Lernraum: mindestens eine schmale Handybreite und eine Desktopbreite, lange Texte, sichtbaren Tastaturfokus, Menübedienung, Bild- und Schriftladung sowie reduzierte Bewegung. Dokumentiere die verwendeten Größen, Beobachtungen und Screenshots im Prüfbericht. Ein Test auf horizontales Überlaufen erkennt weder eine veränderte visuelle Hierarchie noch einen unpassenden Stil.

Zu den Zuständen gehören eine Suche ohne Treffer mit Rücksetzweg, unbekannte Inhaltsadressen mit Navigation zurück, richtige/falsche Quizantworten, blockierte Fortschrittsspeicherung und die erkennbare Grenze fehlender Originaldaten. Für die statische Anwendung gibt es keinen serverseitigen Lade- oder Anmeldevorgang; externe Downloads bleiben von Offline-Bedienung getrennt. Nenne tatsächlich ungeprüfte Zustände ausdrücklich. Für Einreichen, Merge, Release und die getrennte Pages-Prüfung gilt [CONTRIBUTING.md](../CONTRIBUTING.md#automatische-prüfungen-und-veröffentlichung).
