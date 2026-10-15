# Neue Vorlesungen und Übungen ergänzen

Das Werkzeug ist bereits datengetrieben erweiterbar: `kurs.js` liefert Vorlesungen und Zusatzbefehle, `inhalte.js` die bestehenden Übungsobjekte. Darstellung und Suche liegen in `app.js`. Neue Inhalte werden nicht automatisch aus PDFs erzeugt oder fachlich freigegeben.

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
