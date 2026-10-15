"use strict";
// Selbst verfasste Lernbegleitung; PDF-Seiten sind Herkunft, keine wörtliche Abschrift.
const vorlesungen = [
  {
    id:"lektion-1", title:"Python verstehen und das erste Programm starten", topic:"Python-Grundlagen", origin:"001", pages:"4–7, 16–20", page:4,
    summary:"Was ein Programm ist, wo du Code schreibst und wie Python ihn ausführt.",
    goal:"Du kannst eine Python-Datei speichern, starten und ihre Ausgabe erklären.",
    blocks:[
      ["Ein Programm ist eine genaue Anleitung", "Du beschreibst dem Computer einzelne Schritte. Python ist die Sprache dieser Anleitung. Der Interpreter ist das Programm, das deinen Python-Code ausführt. VS Code ist dein Schreibwerkzeug. Das Terminal ist ein Fenster für Startbefehle und Ausgaben."],
      ["Vom Text zur Ausführung", "Du speicherst Quelltext in einer Datei mit der Endung .py. Die verbreitete Python-Implementierung CPython übersetzt ihn intern in Bytecode und führt ihn aus. Du musst dafür weder Bytecode noch eine virtuelle Maschine selbst einrichten."],
      ["Die ersten Schreibregeln", "Python unterscheidet Groß- und Kleinschreibung: print funktioniert, Print ist ein anderer Name. Text steht in Anführungszeichen. Ein Kommentar beginnt mit #. Zusammengehörige Blöcke werden mit vier Leerzeichen eingerückt. Eine normale Zeile braucht kein Semikolon."]
    ],
    code:'print("Hallo, Studium!")\nprint(2 + 3)', output:"Hallo, Studium!\n5\n",
    investigate:"Warum braucht Hallo, Studium! Anführungszeichen, die Rechnung 2 + 3 aber nicht?",
    modify:"Ändere den Begrüßungstext und lasse Python anschließend 8 * 4 berechnen.",
    make:"Schreibe ohne Vorlage ein Programm, das deinen Studiengang und die Summe von 12 und 7 ausgibt.",
    answer:"Text steht in Anführungszeichen, damit Python ihn als Zeichenkette erkennt. 2 + 3 ist ein Ausdruck, dessen Wert vor print berechnet wird. Die neue Rechnung ergibt 32; die eigene Summe ergibt 19.",
    related:["print","python-setup","vscode-setup"]
  },
  {
    id:"lektion-2", title:"Variablen, Datentypen und Entscheidungen", topic:"Python-Grundlagen", origin:"001", pages:"8–10, 15", page:8,
    summary:"Werte benennen, mit Zahlen rechnen und mit if auf Bedingungen reagieren.",
    goal:"Du unterscheidest Text und Zahlen und kannst eine einfache Entscheidung schreiben.",
    blocks:[
      ["Ein Name für einen Wert", "temperatur = 23.5 verbindet einen Namen mit einem Wert. = weist zu; == vergleicht zwei Werte. int steht für Ganzzahlen, float für Kommazahlen, str für Text und bool für True oder False. type(wert) zeigt den Typ. input() fragt im Terminal nach Text und liefert immer str."],
      ["Mit Werten rechnen", "+, -, * und / rechnen mit Zahlen. // ist die abgerundete Division, % liefert den Rest und ** eine Potenz. float(\"23.5\") wandelt passenden Text in eine Zahl um. Ein f-String wie f\"Wert: {temperatur}\" setzt Werte in Text ein."],
      ["Eine Entscheidung treffen", "if prüft eine Bedingung. elif prüft eine weitere, wenn die vorherige falsch war. else behandelt den übrigen Fall. <, >, <=, >=, == und != liefern Wahrheitswerte. and, or und not verbinden oder verneinen einzelne Wahrheitswerte. Nach dem Doppelpunkt folgt der eingerückte Block."]
    ],
    code:'temperatur = 25\nif temperatur > 30:\n    print("Kühlen")\nelif temperatur < 10:\n    print("Heizen")\nelse:\n    print(f"Normal: {temperatur} °C")', output:"Normal: 25 °C\n",
    investigate:"Welche Bedingung ist bei 25 wahr? Warum wird nur der else-Block ausgeführt?",
    modify:"Teste nacheinander 35 und 5. Teste danach genau 30: > bedeutet größer, nicht größer oder gleich.",
    make:"Schreibe ohne Vorlage eine Entscheidung: Ab 50 Punkten ist eine Prüfung bestanden, darunter noch nicht.",
    answer:"25 ist weder größer als 30 noch kleiner als 10. Bei 35 erscheint Kühlen, bei 5 Heizen und bei 30 Normal. Für die Prüfung lautet die Bedingung punkte >= 50.", related:["float","if","print"]
  },
  {
    id:"lektion-3", title:"Schleifen, Listen und Dictionaries", topic:"Datenstrukturen", origin:"001", pages:"11–14; 002: 3", page:11,
    summary:"Mehrere Werte sammeln, wiederholt verarbeiten und über Namen oder Positionen abrufen.",
    goal:"Du kannst eine Liste durchlaufen und den Unterschied zwischen Liste, Tupel und Dictionary erklären.",
    blocks:[
      ["Sammlungen auswählen", "Eine Liste [20, 25] ist geordnet und veränderbar. Der erste Wert hat Index 0. append hängt an, remove entfernt den ersten passenden Wert und sort sortiert die vorhandene Liste. Ein Tupel (20, 25) lässt sich nachträglich nicht verändern. Ein Dictionary speichert Schlüssel und Werte: sensor = {\"ort\": \"Labor\", \"wert\": 22.4}; sensor[\"wert\"] liefert 22.4."],
      ["Wiederholen statt kopieren", "for wert in werte verarbeitet jedes Element. range(3) liefert 0, 1 und 2; die obere Grenze zählt nicht mit. while wiederholt, solange eine Bedingung wahr ist: Sorge dafür, dass sie irgendwann falsch wird. break beendet eine Schleife, continue überspringt den Rest eines Durchlaufs."],
      ["Vorhandene Werkzeuge importieren", "import macht ein Modul verfügbar, zum Beispiel import math und dann math.sqrt(16). Module der Standardbibliothek sind in Python enthalten. NumPy, Pandas und Matplotlib sind zusätzliche Pakete. Ein Alias wie import numpy as np ist nur ein kürzerer Name."]
    ],
    code:'werte = [18, 24, 31]\nwarm = []\nfor wert in werte:\n    if wert >= 24:\n        warm.append(wert)\nprint(warm)', output:"[24, 31]\n",
    investigate:"Warum steht warm = [] vor der Schleife? Was passiert bei jeder einzelnen Zahl?",
    modify:"Füge 24 zur Eingangsliste hinzu. Die Sammlung enthält diesen Wert dann zweimal.",
    make:"Sammle aus [1, 2, 3, 4, 5] alle geraden Zahlen. Ein gerader Wert erfüllt wert % 2 == 0.",
    answer:"Die Liste wird einmal angelegt. Innerhalb der Schleife würde sie ständig geleert. Der eigene Filter soll [2, 4] ergeben.", related:["liste","for","append","slice"]
  },
  {
    id:"lektion-4", title:"Von Messdaten zu NumPy und Diagrammen", topic:"NumPy & Diagramme", origin:"002", pages:"3–6; Analysebeispiel: 1–3", page:3,
    summary:"Die klassische Analyse verstehen und anschließend mit Arrays und Diagrammen vergleichen.",
    goal:"Du kannst Listen und Arrays unterscheiden, eine Maske lesen und ein Diagramm beschriften.",
    blocks:[
      ["Zuerst den Weg mit Standard-Python verstehen", "Die Aufgaben 6.1–6.3 begleiten CSV-Import, Filterung und Kennzahlen. Der Mittelwert ist Summe durch Anzahl. Der Median ist der mittlere Wert der sortierten Daten; bei gerader Anzahl der Mittelwert der beiden mittleren Werte. Prüfe vor beiden Berechnungen, ob Werte vorhanden sind."],
      ["Arrays rechnen elementweise", "[2, 3] * 2 ergibt [2, 3, 2, 3]. np.array([2, 3]) * 2 ergibt dagegen ein Array mit 4 und 6. Ein Array hat einen gemeinsamen Datentyp. daten <= 50 erzeugt eine boolesche Maske, daten[maske] wählt passende Werte. Für mehrere Array-Bedingungen verwende (daten >= 0) & (daten <= 50), mit Klammern."],
      ["Ein Diagramm soll eine Frage beantworten", "Mit import matplotlib.pyplot as plt und fig, ax = plt.subplots() entsteht eine Zeichenfläche. ax.plot zeigt einen Verlauf, ax.bar vergleicht Balken. Beschrifte Titel und Achsen mit set_title, set_xlabel und set_ylabel. plt.subplots(1, 2) erzeugt zwei Diagramme nebeneinander, tight_layout passt Abstände an, show zeigt sie. Seaborn baut darauf auf und bietet statistische Darstellungen wie sns.histplot(daten); importiere es als sns."],
      ["Unterschiedliche Filter im Kurs beachten", "Das Analysebeispiel entfernt Werte über 50. Im CSV-Piloten gilt dagegen die ausdrücklich dokumentierte Arbeitsannahme 0 bis 50 einschließlich. Übernimm eine Filterregel nur, wenn sie zum konkreten Auftrag passt."]
    ],
    code:'import numpy as np\ndaten = np.array([20, 24, 100])\nbereinigt = daten[daten <= 50]\nprint(float(np.mean(bereinigt)))\nprint(float(np.median(bereinigt)))', output:"22.0\n22.0\n",
    investigate:"Welche drei Wahrheitswerte erzeugt daten <= 50? Warum wird 100 nicht gemittelt?",
    modify:"Ersetze 100 durch 30 und vergleiche Mittelwert und Median.",
    make:"Erstelle ein Liniendiagramm der Werte [20, 24, 30] mit dem Titel Temperatur und einer beschrifteten y-Achse Temperatur in °C.",
    answer:"Die Maske ist [True, True, False]. Nach der Änderung sind Mittelwert und Median verschieden: ungefähr 24.67 und 24. Nutze ax.plot, ax.set_title und ax.set_ylabel für die eigene Aufgabe.", related:["aufgabe-6-1","mittelwert"]
  },
  {
    id:"lektion-5", title:"Funktionen und verständliche Fehlerbehandlung", topic:"Funktionen", origin:"003", pages:"3–10", page:3,
    summary:"Wiederverwendbare Schritte mit def schreiben und Umwandlungsfehler gezielt behandeln.",
    goal:"Du kannst Parameter, Rückgabewert und lokale Variablen erklären und ValueError abfangen.",
    blocks:[
      ["Einmal schreiben, mehrfach verwenden", "def definiert eine Funktion; erst der Aufruf führt sie aus. Parameter sind Eingaben, return liefert ein Ergebnis an den Aufrufer. print zeigt nur etwas an. Ohne return liefert eine Funktion None. Ein Docstring direkt am Anfang erklärt ihren Zweck. Das DRY-Prinzip bedeutet: dieselbe Berechnung an einer Stelle pflegen."],
      ["Standardwerte und Gültigkeit", "def ist_warm(wert, grenze=30) legt einen Standard fest. ist_warm(25, grenze=20) überschreibt ihn. Pflichtparameter stehen vor Parametern mit Standardwert. return minimum, maximum liefert ein Tupel. Eine innerhalb der Funktion angelegte Variable ist lokal: Das Hauptprogramm erhält sie über return, nicht durch direkten Zugriff."],
      ["Fehler sichtbar behandeln", "try enthält die riskante Operation, except ValueError behandelt einen ungültigen Zahlentext. Fange die konkrete Fehlerart ab und erkläre ausgelassene Daten. float(\"NaN\") löst keinen ValueError aus: Für echte Messdaten muss zusätzlich math.isfinite prüfen, ob die Zahl endlich ist. Eine leere Datenmenge ist kein gemessener Mittelwert von 0; unser Lernbeispiel liefert dafür None."]
    ],
    code:'def mittelwert(werte):\n    if not werte:\n        return None\n    return sum(werte) / len(werte)\n\nprint(mittelwert([2, 4, 6]))\ntry:\n    float("Error")\nexcept ValueError:\n    print("Ungültiger Zahlentext")', output:"4.0\nUngültiger Zahlentext\n",
    investigate:"Was liefert mittelwert([])? Warum ist return etwas anderes als print?",
    modify:"Rufe die Funktion mit [10, 20] auf und fange anschließend float(\"TIMEOUT\") gezielt ab.",
    make:"Schreibe eine Funktion verdoppeln(wert), die einen Zahlenwert zurückgibt. Gib das Ergebnis erst beim Aufrufer aus.",
    answer:"Eine leere Liste liefert None. return gibt einen Wert zur Weiterverarbeitung zurück, print schreibt eine Ausgabe. Die eigene Funktion enthält return wert * 2.", related:["fehler-wert","fehler-leer","len"]
  },
  {
    id:"lektion-6", title:"Pandas: Tabellen laden und untersuchen", topic:"Pandas", origin:"003", pages:"11–18", page:11,
    summary:"Spalten benennen, Datentypen prüfen und Daten gezielt auswählen.",
    goal:"Du kannst einen DataFrame untersuchen und eine Spalte mit einer Bedingung filtern.",
    blocks:[
      ["Eine Tabelle im Programm", "Ein DataFrame hat Zeilenindex und benannte Spalten. Eine einzelne Spalte ist eine Series. import pandas as pd macht Pandas verfügbar. pd.DataFrame erstellt eine Tabelle aus gleich langen Listen in einem Dictionary. pd.read_csv lädt eine CSV. Prüfe sep und decimal am Dateiinhalt, statt ihre Werte zu raten."],
      ["Erst ansehen, dann auswerten", "df.head(3) zeigt die ersten drei Zeilen, tail die letzten. df.info() zeigt Struktur und nicht fehlende Einträge. df.shape ist ein Attribut ohne Klammern und liefert Zeilen- und Spaltenzahl. df.describe() fasst Zahlenspalten zusammen. Eine Textspalte muss vor numerischer Auswertung bewusst umgewandelt werden."],
      ["Spalten und Zeilen auswählen", "df[\"temp_c\"] wählt eine Series; df[[\"temp_c\"]] behält eine Tabelle. df[df[\"temp_c\"] > 20] behält passende Zeilen. Series.mean() ignoriert fehlende Werte standardmäßig. Verwende bei mehreren Bedingungen & beziehungsweise | mit Klammern um jede Bedingung. Die in der Vorlesung genannte bb12024.csv liegt hier nicht vor; dieses Beispiel nutzt selbst erstellte Mini-Daten."]
    ],
    code:'import pandas as pd\ndf = pd.DataFrame({"temp_c": [18.0, 22.0, 26.0]})\nprint(df.shape)\nprint(df["temp_c"].mean())\nprint(len(df[df["temp_c"] > 20]))', output:"(3, 1)\n22.0\n2\n",
    investigate:"Warum ist df.shape kein Funktionsaufruf? Was bedeutet (3, 1)?",
    modify:"Füge 30.0 hinzu. Prüfe Zeilenanzahl und neuen Mittelwert.",
    make:"Erzeuge eine Tabelle mit den Spalten ort und temperatur. Wähle alle Zeilen mit temperatur unter 10 aus.",
    answer:"shape ist ein gespeichertes Attribut: drei Zeilen, eine Spalte. Mit 30.0 gibt es vier Zeilen und den Mittelwert 24.0. Der eigene Filter ist df[df[\"temperatur\"] < 10].", related:["lektion-3","lektion-4"]
  },
  {
    id:"lektion-7", title:"Fehlwerte und unplausible Daten behandeln", topic:"Pandas", origin:"003", pages:"19–22", page:19,
    summary:"Lücken erkennen und zwischen Löschen, Füllen und Schätzen bewusst entscheiden.",
    goal:"Du kannst Fehlwerte zählen und eine begründete Bereinigung vornehmen.",
    blocks:[
      ["Fehlt ein Wert oder ist er ungültig?", "NaN bezeichnet hier einen fehlenden Zahlenwert. df.isna().sum() zählt Lücken je Spalte. Ein negativer Messwert ist nicht automatisch fehlend: Ob er unplausibel ist, hängt von Messgröße und Auftrag ab. Eine negative Temperatur kann gültig sein."],
      ["Die Entscheidung bleibt deine", "dropna(subset=[\"wert\"]) entfernt Zeilen mit fehlendem wert. fillna(0) ersetzt Lücken durch null; das kann Mittelwerte verfälschen. ffill schreibt den letzten Wert fort. interpolate schätzt Zwischenwerte. Nutze solche Schätzungen nur mit einer begründeten Grenze für die Lückenlänge und kennzeichne sie als Schätzung."],
      ["Original und Ergebnis vergleichen", "Schreibe das Ergebnis in eine neue Variable. Vergleiche Zeilenanzahl und Fehlwerte vorher und nachher. Keine Lücken zu haben bedeutet allein noch nicht, dass die Daten fachlich richtig sind. Bei echter Zeitachse berücksichtigt interpolate(method=\"time\") die Zeitabstände."]
    ],
    code:'import pandas as pd\ndf = pd.DataFrame({"wert": [10.0, None, 30.0]})\nprint(int(df["wert"].isna().sum()))\nsauber = df.dropna(subset=["wert"])\nprint(len(sauber))\nprint(sauber["wert"].mean())', output:"1\n2\n20.0\n",
    investigate:"Warum bleiben nur zwei Zeilen? Wäre der fehlende Wert sicher 20?",
    modify:"Vergleiche den Mittelwert nach fillna(0). Begründe, weshalb er sich ändert.",
    make:"Erzeuge selbst eine Spalte mit fünf Einträgen, davon zwei fehlend. Zähle die Lücken vor und nach dropna.",
    answer:"dropna entfernt die Zeile mit fehlendem Wert. 20 wäre eine Schätzung, keine Messung. Mit null aufgefüllt ist der Mittelwert ungefähr 13.33. Die eigene Kontrolle soll zuerst 2, danach 0 Lücken zeigen.", related:["lektion-6","fehler-leer"]
  },
  {
    id:"lektion-8", title:"Zeitreihen auf ein gemeinsames Raster bringen", topic:"Zeitreihen", origin:"003", pages:"23–26", page:23,
    summary:"Zeitstempel umwandeln, einen Zeitindex setzen und Fünf-Minuten-Mittelwerte bilden.",
    goal:"Du kannst erklären, welche Messwerte in denselben Zeitabschnitt eingehen.",
    blocks:[
      ["Text wird zur Zeitachse", "pd.to_datetime wandelt Datumstext in Zeitstempel um. Ungültige Texte lösen standardmäßig einen Fehler aus. Mit errors=\"coerce\" werden sie NaT; diese fehlenden Zeitpunkte musst du anschließend ausdrücklich prüfen. set_index(\"zeit\") verwendet die Zeitspalte als Zeilenindex. sort_index ordnet ihn zeitlich."],
      ["Fünf-Minuten-Körbe", "resample(\"5min\").mean() bildet bei der hier verwendeten Einstellung Mittelwerte je Fünf-Minuten-Abschnitt. 08:01 und 08:04 gehören zum Abschnitt ab 08:00; 08:07 gehört zu 08:05. Wähle vorher nur Zahlenspalten aus. Alternativ kann resample die Zeitspalte über on=\"zeit\" verwenden."],
      ["Leere Abschnitte sind keine Messungen", "Ein Abschnitt ohne Werte bleibt fehlend. Interpolation ist eine zusätzliche, zu begründende Schätzung. df.loc[\"2024-01-01 08:00\":\"2024-01-01 12:00\"] wählt ein Zeitfenster. Die Original-Zwischenübung auf S. 26 benötigt bb12024.csv; hier lernen wir den Ablauf mit synthetischen Daten."]
    ],
    code:'import pandas as pd\ndf = pd.DataFrame({\n    "zeit": ["2024-01-01 08:01", "2024-01-01 08:04", "2024-01-01 08:07"],\n    "wert": [2.0, 4.0, 8.0]\n})\ndf["zeit"] = pd.to_datetime(df["zeit"])\ndf = df.set_index("zeit").sort_index()\nraster = df[["wert"]].resample("5min").mean()\nprint(raster["wert"].tolist())', output:"[3.0, 8.0]\n",
    investigate:"Warum ist der erste Rasterwert 3.0? Warum erhält der zweite Abschnitt den Wert 8.0?",
    modify:"Füge 08:09 mit dem Wert 12.0 hinzu. Der zweite Rasterwert soll jetzt 10.0 sein.",
    make:"Erkläre ohne Vorlage den Weg von CSV-Text zu Zeitstempeln, Zeitindex und Fünf-Minuten-Raster. Setze ihn mit drei eigenen Messwerten um.",
    answer:"Der erste Abschnitt mittelt 2 und 4; der zweite enthält zunächst nur 8. Die Reihenfolge lautet read_csv, to_datetime, set_index, sort_index, Auswahl der Zahlenspalten, resample und mean.", related:["lektion-6","lektion-7"]
  },
  {
    id:"lektion-9", title:"Klassen, Objekte und ein eigenes Analyseprojekt", topic:"Objektorientierung", origin:"003", pages:"27–32", page:27,
    summary:"Daten und passende Funktionen in einem verständlichen Bauplan zusammenführen.",
    goal:"Du kannst zwei unabhängige Objekte anlegen und eine Methode erklären.",
    blocks:[
      ["Bauplan und Exemplar", "class Sensor definiert einen Bauplan. Sensor(\"Labor\") erzeugt ein konkretes Objekt. __init__ initialisiert es; self verweist in einer Instanzmethode auf dieses Objekt. self.ort ist ein Attribut, also ein zum Objekt gehörender Wert. Eine Methode ist eine im Bauplan definierte Funktion."],
      ["Jedes Objekt hat eigene Daten", "Lege self.werte = [] in __init__ an, damit jeder Sensor seine eigene Liste erhält. Eine gemeinsame Liste auf Klassenebene würde Werte zwischen Sensoren vermischen. Methoden können float-Umwandlung, gezielte Fehlerbehandlung und die Berechnung eines Mittelwerts verbinden."],
      ["Alles zusammenführen", "Die Original-Abschlussübung auf S. 31 fordert eine BeckenAnalyse mit Dateipfad, self.df und einer Methode zur Aufbereitung auf fünf Minuten. Kombiniere die Schritte aus Lektion 6–8. Teste einzelne Schritte zuerst mit Mini-Daten. bb12024.csv fehlt hier; Ergebnisse der Originalaufgabe lassen sich damit noch nicht prüfen."]
    ],
    code:'class Sensor:\n    def __init__(self, ort):\n        self.ort = ort\n        self.werte = []\n\n    def hinzufuegen(self, wert):\n        self.werte.append(float(wert))\n\na = Sensor("Labor")\nb = Sensor("Flur")\na.hinzufuegen("22.5")\nprint(a.werte)\nprint(b.werte)', output:"[22.5]\n[]\n",
    investigate:"Warum bleibt b.werte leer? Welche Zeile erzeugt für jedes Objekt eine eigene Liste?",
    modify:"Füge b den Wert 18 hinzu. Beide Listen sollen weiterhin unabhängig sein.",
    make:"Ergänze eine Methode anzahl(self), die die Anzahl der Werte dieses Sensors zurückgibt. Teste sie mit zwei Sensoren.",
    answer:"Jeder Aufruf von __init__ legt eine neue Liste an. Die eigene Methode enthält return len(self.werte). Ohne Behandlung würde ein Text wie Error bei hinzufuegen einen ValueError auslösen; ergänze eine bewusste Fehlermeldung als nächsten Schritt.", related:["lektion-5","lektion-8"]
  }
];

for (const [index, lesson] of vorlesungen.entries()) {
  const sourceId = `kurs-${index + 1}`;
  quellen[sourceId] = {title:`Vorlesung ${lesson.origin} · PDF-S. ${lesson.pages}`,href:`../Referenz/Vorlesungen/${lesson.origin}_Coding und Digitalisierung.pdf#page=${lesson.page}`};
  lesson.kind = "Vorlesung";
  lesson.explanation = lesson.goal;
  lesson.sources = [sourceId];
  lesson.next = vorlesungen[index + 1]?.id;
  inhalte.push(lesson);
}
quellen.analyse = {title:"002_Beispiel Datenstrukturen - Analyse · PDF-S. 1–3",href:"../Referenz/Vorlesungen/002_Beispiel Datenstrukturen - Analyse.pdf#page=1"};
quellen.strukturen = {title:"Vorlesung 002 · PDF-S. 3 · Datenstrukturen",href:"../Referenz/Vorlesungen/002_Coding und Digitalisierung.pdf#page=3"};
vorlesungen[2].sources.push("strukturen");
vorlesungen[3].sources.push("analyse");

const anleitungen = [
  {
    id:"python-setup", kind:"Einrichtung", topic:"Arbeitsumgebung", title:"Python auf PC oder Tablet einrichten", summary:"Wähle dein Gerät und bringe dein erstes Programm zum Laufen.", explanation:"Python führt deinen Code aus. Die Lernseite selbst braucht keine Installation. Downloads und Browser-Notebooks benötigen Internet.", sources:[], related:["vscode-setup","lektion-1"],
    blocks:[
      ["Windows-PC oder Windows-Tablet", "Öffne den offiziellen Python-Download und installiere eine stabile Python-3-Version für dein Gerät. Beim aktuellen Windows-Angebot kann das der Python Install Manager sein. Öffne danach ein neues Terminal über das Windows-Startmenü. Gib python --version ein. Du solltest Python 3.x sehen. Falls der Befehl nicht gefunden wird, teste py --version und nutze anschließend py statt python. Öffnet sich nur der Store oder funktionieren beide Befehle nicht, prüfe die offizielle Windows-Anleitung und starte das Terminal nach der Installation neu."],
      ["macOS oder Linux", "macOS: Installiere eine stabile Python-3-Version von python.org. Linux: Nutze die Softwareverwaltung deiner Distribution für Python 3 und bei Bedarf das venv-Paket. Prüfe im neuen Terminal mit python3 --version. Verwende in den weiteren Terminalbefehlen python3 anstelle von python. Ersetze oder entferne keine Python-Version des Betriebssystems."],
      ["iPad oder Android-Tablet", "Ein Windows-Tablet folgt der PC-Anleitung. Auf iPad und Android wird die Desktop-Version von VS Code nicht auf dieselbe Weise installiert. Als Browserweg ist in Vorlesung 002, S. 6 Google Colab genannt: Öffne Colab, melde dich bei Google an, erstelle ein Notebook, schreibe print(\"Hallo\") in eine Codezelle und tippe auf deren Startsymbol. Ausführung und hochgeladene Dateien werden dabei in einem externen Dienst verarbeitet. Sichere dein Notebook und benötigte Dateien; die Laufzeit und hochgeladene Dateien sind vorübergehend. Dieser Weg benötigt Internet. Nutze nur Übungsdaten, die du dort verarbeiten darfst."],
      ["Dein erster erfolgreicher Test am PC", "Lege einen Ordner Coding und darin eine Datei hallo.py an. Schreibe print(\"Hallo, ich lerne Python!\") hinein und speichere. Öffne den Ordner in VS Code, wähle den Python-Interpreter und starte die Datei mit Run Python File. Die genaue Editor-Einrichtung findest du im nächsten Bereich. Die Ausgabe muss Hallo, ich lerne Python! lauten."],
      ["Ein eigener Bereich für Pakete", "Öffne in VS Code deinen Projektordner und Terminal > Neues Terminal. Führe python -m venv .venv aus (macOS/Linux: python3 -m venv .venv). Wähle über Python: Select Interpreter die Umgebung .venv. Für die ersten drei Lektionen brauchst du keine Zusatzpakete. Ab Lektion 4 installierst du gezielt in diese Umgebung; siehe VS-Code-Anleitung. Eine Änderung der PowerShell-Ausführungsrichtlinie ist dafür nicht nötig."]
    ],
    links:[["Python herunterladen","https://www.python.org/downloads/"],["Offizielle Windows-Anleitung","https://docs.python.org/3/using/windows.html"],["Colab öffnen (Internet und Google-Anmeldung)","https://colab.research.google.com/"],["Colab: Laufzeiten und Datenschutz","https://research.google.com/colaboratory/faq.html"]]
  },
  {
    id:"vscode-setup", kind:"Einrichtung", topic:"Arbeitsumgebung", title:"VS Code installieren und Python starten", summary:"Vom leeren Editor zum ersten ausgeführten Programm, Schritt für Schritt.", explanation:"VS Code ist der Editor zum Schreiben. Python ist die Laufzeit zum Ausführen. Die Microsoft-Python-Erweiterung verbindet beides.", sources:[], related:["python-setup","lektion-1"],
    blocks:[
      ["1. Editor installieren", "Lade Visual Studio Code von code.visualstudio.com für dein Betriebssystem herunter, installiere es und öffne es. Unter iPad/Android kannst du vscode.dev als Webeditor öffnen; damit allein steht noch keine Python-Laufzeit zur Verfügung. Nutze für den einfachen Tablet-Einstieg den Colab-Weg der Python-Anleitung."],
      ["2. Python-Erweiterung hinzufügen", "Öffne links Erweiterungen oder drücke Strg+Umschalt+X (Mac: Cmd+Umschalt+X). Suche Python. Wähle die Erweiterung des Herausgebers Microsoft und klicke Installieren. Python selbst muss zusätzlich wie im vorherigen Bereich installiert sein."],
      ["3. Eigenen Ordner öffnen", "Erstelle einen neuen Ordner Coding. Wähle Datei > Ordner öffnen und diesen Ordner. Vertraue nur Ordnern, deren Inhalt du kennst. Erstelle im Explorer links eine neue Datei hallo.py und speichere print(\"Hallo, ich lerne Python!\") darin. Die Endung muss .py sein, nicht .py.txt."],
      ["4. Interpreter auswählen", "Öffne die Befehlspalette mit Strg+Umschalt+P (Mac: Cmd+Umschalt+P). Suche Python: Select Interpreter. Wähle deine installierte Python-3-Version. Falls du schon .venv angelegt hast, wähle deren Interpreter. Eine Python-Datei muss geöffnet sein, damit die Python-Funktionen verfügbar sind."],
      ["5. Ausführen und vergleichen", "Speichere die Datei. Klicke oben rechts auf Run Python File (Python-Datei im Terminal ausführen). Unten im Terminal soll Hallo, ich lerne Python! erscheinen. Ändere den Text, speichere erneut und starte noch einmal. Bei input() klickst du ins Terminal, tippst die Antwort und drückst Enter."],
      ["6. Pakete erst bei Bedarf installieren", "Erzeuge .venv wie in der Python-Anleitung und wähle sie als Interpreter. Ohne Aktivierung funktioniert unter Windows im PowerShell-Terminal: .\\.venv\\Scripts\\python.exe -m pip install numpy pandas matplotlib seaborn. Unter macOS/Linux: ./.venv/bin/python -m pip install numpy pandas matplotlib seaborn. Nutze die Installation ab Lektion 4. Falls VS Code das Paket nicht findet, vergleiche den ausgewählten Interpreter mit dem Installationspfad."],
      ["Wenn etwas nicht klappt", "Keine Ausgabe: Datei speichern und Run Python File wählen. Python nicht gefunden: Installation mit python --version beziehungsweise python3 --version prüfen. ModuleNotFoundError: Paket im ausgewählten Interpreter installieren. IndentationError: Einrückungen mit vier Leerzeichen prüfen. Benenne eigene Dateien nicht pandas.py, numpy.py oder math.py, damit sie importierte Module nicht verdecken."]
    ],
    links:[["VS Code herunterladen","https://code.visualstudio.com/download"],["Offizieller Python-Einstieg in VS Code","https://code.visualstudio.com/docs/python/python-tutorial"],["Grenzen des Webeditors","https://code.visualstudio.com/docs/remote/vscode-web"]]
  }
];
inhalte.push(...anleitungen);

// Diese Ergänzungen und die 15 vorhandenen Lernbausteine speisen dieselbe Tabelle.
const befehlsKontexte = {
  pfade:"Path.cwd() / Path.is_file(): pathlib, lokale Dateien; vor open den Arbeitsordner prüfen.",
  open:"Dateipfad → Dateiobjekt; with schließt die Datei; readlines liest Textzeilen.",
  readlines:"Textdatei → Liste von str; danach len, Slice und for; erst passend umwandeln.",
  len:"Liste, Tupel, str, Dictionary, DataFrame → int; vor Division auf 0 prüfen.",
  print:"Zahlen, Texte und Sammlungen → Terminalausgabe; mit f-Strings kombinierbar; liefert None.",
  liste:"Veränderbare Folge; for, len, Slice und append; * wiederholt die Liste.",
  slice:"Folge[start:stop] → Teilfolge; stop zählt nicht mit; passt zu Liste, Tupel und str.",
  for:"Über iterierbare Werte wie Liste, str, range; mit if und append kombinieren.",
  split:"str → Liste von str; strip entfernt Ränder; für echte CSV mit zitierten Kommas csv.reader verwenden.",
  float:"Passender Zahlentext → float; nach split, vor Vergleichen; ValueError gezielt behandeln.",
  if:"Ein Wahrheitswert → ausgewählter Block; elif/else ergänzen; Arrays benötigen Masken.",
  append:"Liste + ein Wert → veränderte Liste; liefert None; passt zu for und if.",
  mittelwert:"Nicht leere Zahlenfolge → Zahl; sum/Schleife und len; keine Division durch 0.",
  minmax:"Nicht leere vergleichbare Folge → kleinster/größter Wert; Zahlentexte vorher umwandeln.",
  repr:"Beliebiger Wert → Darstellung als str; mit print zur Diagnose vor float verwenden."
};
const weitereBefehle = [
  ["input()", "Fragt im Terminal nach einer Eingabe.", 'name = input("Dein Name? ")', "Liefert str; mit print, f-String und bei Zahlen mit float/int kombinieren.", "lektion-2"],
  ["type() / int() / str()", "Typ ansehen oder Werte ausdrücklich umwandeln.", 'print(type(3), int("4"), str(5))', "int braucht passenden Text; int(3.9) schneidet Richtung 0 ab. str erzeugt Text.", "lektion-2"],
  ["= / == / != / < / <= / > / >=", "Zuweisen und Vergleichen unterscheiden.", 'wert = 20\nprint(wert >= 10)', "= weist zu; Vergleiche liefern bool; zusammen mit if. Für Arrays entsteht eine Maske.", "lektion-2"],
  ["+ / - / * / / / // / % / **", "Rechnen, Rest oder Potenz bilden.", 'print(7 // 2, 7 % 2, 2 ** 3)', "Zahlen; Division durch 0 vermeiden. + und * verhalten sich bei Listen und Text anders.", "lektion-2"],
  ["and / or / not", "Einzelne Wahrheitswerte verknüpfen.", 'print(10 > 0 and 10 <= 50)', "Mit if; bei NumPy/Pandas elementweise & und | mit Klammern verwenden.", "lektion-2"],
  ["f-String", "Werte in einen Ausgabetext einsetzen.", 'wert = 22.5\nprint(f"Temperatur: {wert:.1f} °C")', "str-Ausgabe, print, Zahlenformatierung; f vor dem öffnenden Anführungszeichen.", "lektion-2"],
  ["range()", "Eine ganzzahlige Folge für Schleifen bereitstellen.", 'print(list(range(0, 6, 2)))', "for, list; obere Grenze ausgeschlossen; Schrittweite darf nicht 0 sein.", "lektion-3"],
  ["while / break / continue", "Solange wiederholen, abbrechen oder Durchlauf überspringen.", 'n = 0\nwhile n < 3:\n    n += 1\n    if n == 2:\n        continue\n    if n == 3:\n        break\n    print(n)', "while braucht eine erreichbare Abbruchbedingung; break/continue nur in Schleifen.", "lektion-3"],
  ["tuple / dict / Indexzugriff", "Unveränderbare Folgen und Schlüssel-Wert-Daten verwenden.", 'sensor = {"wert": 22.4}\nort = (1, 2)\nprint(sensor["wert"], ort[0])', "Index bei Tupeln ab 0; Dictionary per vorhandenem Schlüssel; for und len sind möglich.", "lektion-3"],
  ["remove() / sort() / sorted()", "Listenelement entfernen und Werte sortieren.", 'werte = [3, 1, 2]\nwerte.remove(1)\nwerte.sort()\nprint(sorted(werte))', "remove braucht vorhandenen Wert; sort verändert Liste, liefert None; sorted liefert neue Liste.", "lektion-3"],
  ["import / from / as", "Module und einzelne Funktionen verfügbar machen.", 'import math as m\nfrom math import sqrt\nprint(m.isfinite(2.0), sqrt(16))', "Standardbibliothek ohne Paketinstallation; externe Pakete im gewählten Interpreter installieren.", "lektion-3"],
  ["sum() / round()", "Zahlen addieren und Ergebnisse runden.", 'print(round(sum([2.1, 3.2]), 1))', "sum für Zahlenfolgen; Mittelwert mit len; round verändert den ursprünglichen Wert nicht.", "lektion-5"],
  ["def / return / Parameter", "Eine Funktion definieren und ein Ergebnis zurückgeben.", 'def doppelt(wert, faktor=2):\n    return wert * faktor\nprint(doppelt(3))', "Funktion aufrufen; Parameter sind lokal; return kann auch ein Tupel liefern.", "lektion-5"],
  ["try / except ValueError", "Ungültigen Zahlentext gezielt behandeln.", 'try:\n    float("Error")\nexcept ValueError:\n    print("Kein Zahlentext")', "Mit float/int; NaN und Unendlich benötigen zusätzlich math.isfinite; Fehler nicht verstecken.", "lektion-5"],
  ["np.array() / Array * Zahl", "Eine Zahlenliste in ein Array umwandeln und elementweise rechnen.", 'import numpy as np\na = np.array([2, 3])\nprint((a * 2).tolist())', "NumPy erforderlich; gemeinsamer Datentyp; passt zu Masken, Statistik und Matplotlib.", "lektion-4"],
  ["Boolesche Maske / & / |", "Mehrere Array-Bedingungen elementweise verbinden.", 'import numpy as np\na = np.array([-1, 20, 60])\nprint(a[(a >= 0) & (a <= 50)].tolist())', "NumPy-Arrays und Pandas-Series; jede Bedingung einklammern; nicht and/or verwenden.", "lektion-4"],
  ["np.mean() / np.median()", "Mittelwert oder Median eines Zahlenarrays berechnen.", 'import numpy as np\nprint(float(np.mean([10, 20, 90])), float(np.median([10, 20, 90])))', "Vorher bereinigen; leere Arrays und NaN bewusst behandeln; Median ist kein Mittelwert.", "lektion-4"],
  ["plt.subplots() / ax.plot() / ax.bar()", "Ein oder mehrere Linien- und Balkendiagramme anlegen.", 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([20, 24, 30])\nax.bar([0, 1, 2], [10, 12, 15])', "Matplotlib; Listen und NumPy-Arrays; x und y müssen zusammenpassen; plt.show zeigt die Grafik.", "lektion-4"],
  ["set_title / set_xlabel / set_ylabel / tight_layout / show", "Diagramme beschriften und anzeigen.", 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([20, 24])\nax.set_title("Temperatur")\nax.set_xlabel("Messpunkt")\nax.set_ylabel("°C")\nplt.tight_layout()\nplt.show()', "Matplotlib-Achsenobjekt ax; erst zeichnen und beschriften, dann anzeigen.", "lektion-4"],
  ["sns.histplot()", "Die Verteilung von Werten als Histogramm ansehen.", 'import seaborn as sns\nimport matplotlib.pyplot as plt\nsns.histplot([20, 21, 21, 24])\nplt.show()', "Seaborn und Matplotlib; Zahlenliste, Array oder benannte DataFrame-Spalte.", "lektion-4"],
  ["pd.DataFrame() / pd.read_csv()", "Eine Tabelle aus Daten oder einer CSV erzeugen.", 'import pandas as pd\ndf = pd.DataFrame({"wert": [10, 20]})\n# Alternative mit eigener Datei:\n# df = pd.read_csv("messdaten.csv", sep=",", decimal=".")\nprint(df.shape)', "Pandas; bei CSV Pfad, Header, Trennzeichen und Dezimalzeichen prüfen; danach head/info.", "lektion-6"],
  ["head() / tail() / info() / shape / columns", "Tabelleninhalt und Struktur ansehen.", 'import pandas as pd\ndf = pd.DataFrame({"wert": [10, 20]})\nprint(df.head(1))\nprint(df.tail(1))\ndf.info()\nprint(df.shape, list(df.columns))', "DataFrame; shape und columns ohne Klammern; info schreibt selbst und liefert None.", "lektion-6"],
  ["describe() / Series.mean()", "Tabellenstatistik oder Spaltenmittelwert bilden.", 'import pandas as pd\ndf = pd.DataFrame({"wert": [10, 20, 30]})\nprint(df.describe())\nprint(df["wert"].mean())', "Numerische Spalten; mean ignoriert NaN standardmäßig; keine Zahlentexte blind mitteln.", "lektion-6"],
  ["df[Spalte] / df[Maske] / loc / iloc", "Spalten, passende Zeilen oder Positionen auswählen.", 'import pandas as pd\ndf = pd.DataFrame({"wert": [10, 30]})\nprint(df[df["wert"] > 20])\nprint(df.loc[0, "wert"], df.iloc[0, 0])', "loc nutzt Beschriftungen, iloc Positionen; Series-Masken brauchen zum Index passende Zeilen.", "lektion-6"],
  ["isna() / dropna() / fillna()", "Fehlwerte prüfen, Zeilen entfernen oder Lücken füllen.", 'import pandas as pd\ns = pd.Series([10.0, None, 30.0])\nprint(int(s.isna().sum()))\nprint(s.dropna().tolist())\nprint(s.fillna(0).tolist())', "Series/DataFrame; Ergebnis zuweisen; Ersatzwerte beeinflussen Statistik, Original aufbewahren.", "lektion-7"],
  ["ffill() / interpolate()", "Letzten Wert fortschreiben oder Zwischenwerte schätzen.", 'import pandas as pd\ns = pd.Series([10.0, None, 30.0])\nprint(s.ffill(limit=1).tolist())\nprint(s.interpolate(limit=1).tolist())', "Nur begründete kurze Lücken; bei Zeitabständen method='time' und DatetimeIndex verwenden.", "lektion-7"],
  ["pd.to_datetime() / set_index() / sort_index()", "Text in eine geordnete Zeitachse umwandeln.", 'import pandas as pd\ndf = pd.DataFrame({"zeit": ["2024-01-01 08:01"], "wert": [2.0]})\ndf["zeit"] = pd.to_datetime(df["zeit"])\ndf = df.set_index("zeit").sort_index()', "Pandas; ungültige Zeittexte prüfen; Vorbereitung für Zeitfenster und resample.", "lektion-8"],
  ["resample('5min').mean()", "Mittelwerte in Fünf-Minuten-Abschnitten bilden.", 'import pandas as pd\ns = pd.Series([2.0, 4.0], index=pd.to_datetime(["2024-01-01 08:01", "2024-01-01 08:04"]))\nprint(s.resample("5min").mean().tolist())', "Zeitindex oder on=Zeitspalte; vorher Zahlenspalten wählen; leere Abschnitte bleiben NaN.", "lektion-8"],
  ["class / __init__ / self / Methode", "Zusammengehörige Daten und Funktionen bündeln.", 'class Sensor:\n    def __init__(self, ort):\n        self.ort = ort\n    def beschreibung(self):\n        return self.ort\nprint(Sensor("Labor").beschreibung())', "Instanzmethoden erhalten self automatisch; eigene veränderbare Daten in __init__ anlegen.", "lektion-9"]
];
