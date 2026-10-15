"use strict";
// Selbst verfasste Lernbegleitung; PDF-Seiten sind Herkunft, keine wörtliche Abschrift.
const vorlesungen = [
  {
    id:"lektion-1", title:"Python verstehen und das erste Programm starten", topic:"Python-Grundlagen", origin:"001", pages:"4–7, 16–20", page:4,
    summary:"Was ein Programm ist, wo du Code schreibst und wie Python ihn ausführt.",
    goal:"Du kannst eine Python-Datei speichern, starten und ihre Ausgabe erklären.",
    quiz:{question:"Welche Datei startest du mit Python?",options:["main.py","styles.css","referenz.pdf"],correct:0,explanation:"Python führt den Quelltext in main.py aus. Speichere die Datei und starte sie im ausgewählten Interpreter."},
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
    quiz:{question:"input() liefert die Eingabe 12. Welchen Typ erhältst du zunächst?",options:["int","str","float"],correct:1,explanation:"input() liefert Text. Für eine Rechnung musst du den passenden Text erst mit int oder float umwandeln."},
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
    quiz:{question:"Welche Werte durchläuft for n in range(3)?",options:["1, 2, 3","0, 1, 2, 3","0, 1, 2"],correct:2,explanation:"range beginnt ohne Startangabe bei 0. Die obere Grenze 3 zählt nicht mit."},
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
    quiz:{question:"Was ergibt np.array([2, 3]) * 2?",options:["[2, 3, 2, 3]","Ein Array mit 4 und 6","Eine Liste mit einer 2"],correct:1,explanation:"Ein NumPy-Array rechnet elementweise. Eine Python-Liste würde mit * 2 dagegen ihre Elemente wiederholen."},
    blocks:[
      ["Zuerst den Weg mit Standard-Python verstehen", "Die Aufgaben 6.1–6.3 begleiten CSV-Import, Filterung und Kennzahlen. Der Mittelwert ist Summe durch Anzahl. Der Median ist der mittlere Wert der sortierten Daten; bei gerader Anzahl der Mittelwert der beiden mittleren Werte. Prüfe vor beiden Berechnungen, ob Werte vorhanden sind."],
      ["Streuung und Boxplot verstehen", "np.std(werte) beschreibt die Streuung um den Mittelwert und verwendet standardmäßig ddof=0. Ein Boxplot mit sns.boxplot(y=werte) zeigt den Median und die mittleren 50 Prozent zwischen erstem und drittem Quartil. Die üblichen Whisker reichen bis zu Werten innerhalb von 1,5 Quartilsabständen. Einzelne Punkte außerhalb sind statistisch auffällig; ob sie Messfehler sind, entscheidet die Aufgabenregel. Die Befehlsübersicht zeigt ausführbare Beispiele."],
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
    quiz:{question:"Welche Eingabe wird von except ValueError bei float(...) nicht abgefangen?",options:["Error","TIMEOUT","NaN"],correct:2,explanation:"float('NaN') ist eine erlaubte Umwandlung. Prüfe zusätzlich mit math.isfinite, wenn nur endliche Messwerte zulässig sind."},
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
    quiz:{question:"Was liefert df['temp_c'] im Unterschied zu df[['temp_c']]?",options:["Eine Series statt eines DataFrame","Immer einen einzelnen float","Eine Datei auf der Festplatte"],correct:0,explanation:"Ein einzelner Spaltenname wählt eine Series. Eine Liste von Spaltennamen erhält die Tabellenform, auch bei nur einer Spalte."},
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
    quiz:{question:"Warum kann fillna(0) einen Mittelwert verändern?",options:["Weil fehlende Werte immer echte Nullen sind","Weil Ersatzwerte in die Berechnung eingehen","Weil mean dann keine Zahlen mehr verarbeitet"],correct:1,explanation:"Null ist eine konkrete Zahl. Ihr Einsatz verändert die Datenbasis und braucht eine fachliche Begründung; eine Lücke ist keine gemessene Null."},
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
    quiz:{question:"Wohin gehören 08:01 und 08:04 beim hier verwendeten 5-Minuten-Raster?",options:["In zwei getrennte Abschnitte","Beide in den Abschnitt ab 08:05","Beide in den Abschnitt ab 08:00"],correct:2,explanation:"Mit den hier verwendeten Standardgrenzen umfasst der Abschnitt ab 08:00 die Zeiten vor 08:05. resample mittelt die Werte innerhalb dieses Abschnitts."},
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
    quiz:{question:"Wo legst du die unabhängige Messwertliste eines Sensors an?",options:["In __init__ mit self.werte = []","Einmal außerhalb der Klasse für alle Sensoren","Als gemeinsame Liste direkt im Klassenkörper"],correct:0,explanation:"__init__ erzeugt bei jedem neuen Objekt eine eigene Liste. Eine veränderbare Klassenvariable würde von den Instanzen gemeinsam verwendet."},
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

vorlesungen.push({
  "id": "lektion-10",
  "title": "FFT: Vom Zeitsignal zum Frequenzspektrum",
  "topic": "Signalverarbeitung",
  "origin": "Code",
  "pages": "Begleitdatei",
  "page": 1,
  "sourceHref": "../Referenz/Code/002_fftpy.sec",
  "sourceTitle": "Original-Begleitcode 002_fftpy.sec · unverändert archiviert",
  "summary": "Erkenne einen 50-Hz-Sinus im Spektrum und untersuche echte Oberwellen durch Clipping.",
  "goal": "Du kannst Abtastrate, Frequenzachse und ein einseitiges Spektrum an einem synthetischen Signal erklären.",
  "blocks": [
    [
      "Zeit und Frequenz",
      "Ein Signal beschreibt Werte über der Zeit. Die FFT zerlegt die endliche Folge in Frequenzanteile. Bei 1000 Messpunkten je Sekunde und 200 Punkten dauert das Beispiel 0.2 s; die Frequenzschritte sind 1000/200 = 5 Hz."
    ],
    [
      "Abtastrate und Grenzen",
      "Der reine 50-Hz-Sinus wird mit 1000 Hz abgetastet. Nyquist liegt bei 500 Hz. Höhere Anteile können aliasen. Das Beispiel enthält ganze Perioden und braucht deshalb kein Fenster; bei beliebigen Signalausschnitten sind Leakage und geeignete Fenster zusätzlich zu behandeln."
    ],
    [
      "Eine passende Frequenzachse",
      "rfft verwendet reelle Eingangswerte, rfftfreq die Schrittweite 1/Abtastrate. Die Beträge werden durch N geteilt; nur die inneren positiven Frequenzbins werden verdoppelt. Gleichanteil und Nyquist bleiben einfach. Hier ist N ausdrücklich gerade."
    ],
    [
      "Originalfehler verstehen",
      "Die archivierte Datei kommentiert Clipping auf ±0.75, verwendet tatsächlich ±10 und addiert den erzeugten Rauschvektor nicht. Dieses eigene Lehrbeispiel begrenzt tatsächlich auf ±0.75 und lässt Rauschen gezielt weg. Es ist keine unveränderte Ausführung oder fachliche Freigabe des Originals."
    ]
  ],
  "code": "import numpy as np\nimport matplotlib.pyplot as plt\n\nabtastrate = 1000.0\nanzahl = 200\nzeit = np.arange(anzahl) / abtastrate\nsignal = 1.5 * np.sin(2 * np.pi * 50 * zeit)\nabgeflacht = np.clip(signal, -0.75, 0.75)\nfrequenzen = np.fft.rfftfreq(anzahl, d=1 / abtastrate)\namplitude = np.abs(np.fft.rfft(signal)) / anzahl\namplitude_flach = np.abs(np.fft.rfft(abgeflacht)) / anzahl\n# shortcut: gerade Anzahl 200, bei ungeradem N auch den letzten Bin verdoppeln.\namplitude[1:-1] *= 2\namplitude_flach[1:-1] *= 2\nprint(f\"Stärkste Frequenz: {frequenzen[np.argmax(amplitude)]:.1f} Hz\")\nprint(f\"Amplitude: {amplitude.max():.2f}\")\nfig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))\nax1.plot(zeit, signal, label=\"Sinus\")\nax1.plot(zeit, abgeflacht, label=\"Clipping ±0.75\")\nax1.set(xlabel=\"Zeit [s]\", ylabel=\"Amplitude\")\nax1.legend()\nax2.plot(frequenzen, amplitude, label=\"Sinus\")\nax2.plot(frequenzen, amplitude_flach, label=\"Geclippt\")\nax2.set(xlabel=\"Frequenz [Hz]\", ylabel=\"Einseitige Amplitude\", xlim=(0, 350))\nax2.legend()\nplt.tight_layout()\nplt.show()",
  "output": "Stärkste Frequenz: 50.0 Hz\nAmplitude: 1.50\n",
  "investigate": "Warum liegt der stärkste Bin bei 50 Hz, und weshalb entstehen durch echtes Clipping weitere Spitzen bei ungeraden Vielfachen?",
  "modify": "Ändere 50 Hz auf 75 Hz. Prüfe, ob diese Frequenz zum 5-Hz-Raster passt. Ändere anschließend die Clippinggrenze.",
  "make": "Erzeuge ohne Vorlage eine Summe aus 50 Hz und 100 Hz mit unterschiedlichen Amplituden und prüfe beide Spitzen.",
  "answer": "Ein 50-Hz-Sinus besitzt in diesem passenden Zeitfenster einen Hauptanteil bei 50 Hz. Clipping verändert die Form und erzeugt zusätzliche Anteile. Für die eigene Summe müssen 50 Hz und 100 Hz an ihren Bins erscheinen; die Amplituden sollten den gesetzten Faktoren entsprechen.",
  "quiz": {
    "question": "Welche Frequenzschrittweite hat das Beispiel mit 1000 Hz und 200 Punkten?",
    "options": [
      "5 Hz",
      "200 Hz",
      "1000 Hz"
    ],
    "correct": 0,
    "explanation": "Die Binbreite ist Abtastrate geteilt durch Punktzahl: 1000 / 200 = 5 Hz."
  },
  "needs": [
    "lektion-4"
  ],
  "related": [
    "aufgabe-9-3"
  ],
  "links": [
    [
      "NumPy: rfft",
      "https://numpy.org/doc/stable/reference/generated/numpy.fft.rfft.html"
    ],
    [
      "NumPy: rfftfreq",
      "https://numpy.org/doc/stable/reference/generated/numpy.fft.rfftfreq.html"
    ]
  ]
});

for (const [index, lesson] of vorlesungen.entries()) {
  const sourceId = `kurs-${index + 1}`;
  quellen[sourceId] = {title:lesson.sourceTitle || `Vorlesung ${lesson.origin} · PDF-S. ${lesson.pages}`,href:lesson.sourceHref || `../Referenz/Vorlesungen/${lesson.sourceFile || `${lesson.origin}_Coding und Digitalisierung.pdf`}#page=${lesson.page}`};
  lesson.kind = "Vorlesung";
  lesson.explanation = lesson.goal;
  lesson.sources = [sourceId];
  lesson.needs ||= index ? [vorlesungen[index - 1].id] : ["python-setup","vscode-setup"];
  lesson.next = vorlesungen[index + 1]?.id;
  inhalte.push(lesson);
}
quellen.analyse = {title:"002_Beispiel Datenstrukturen - Analyse · PDF-S. 1–3",href:"../Referenz/Vorlesungen/002_Beispiel Datenstrukturen - Analyse.pdf#page=1"};
quellen.strukturen = {title:"Vorlesung 002 · PDF-S. 3 · Datenstrukturen",href:"../Referenz/Vorlesungen/002_Coding und Digitalisierung.pdf#page=3"};
vorlesungen.find(lesson => lesson.id === "lektion-3").sources.push("strukturen");
vorlesungen.find(lesson => lesson.id === "lektion-4").sources.push("analyse");

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
  ["np.fft.rfft()", "Reelle Messwerte in diskrete Frequenzanteile zerlegen.", 'import numpy as np\nprint(np.fft.rfft([1.0, 0.0, -1.0, 0.0]))', "Reelle Zahlenfolge; komplexe Koeffizienten. Für die Amplitude abs verwenden und die Skalierung der FFT-Lektion beachten.", "lektion-10"],
  ["np.fft.rfftfreq()", "Die zur reellen FFT passende Frequenzachse erzeugen.", 'import numpy as np\nprint(np.fft.rfftfreq(4, d=0.25))', "N entspricht der Punktzahl; d ist der Abstand in Sekunden. Dann ist die Frequenz in Hz. Passt zu rfft.", "lektion-10"],
  ["np.clip()", "Werte an eine untere und obere Grenze begrenzen.", 'import numpy as np\nprint(np.clip([-2.0, 0.0, 2.0], -0.75, 0.75))', "Zahlenarray; Clipping verändert die Signalform. Im Beispiel entstehen dadurch zusätzliche Frequenzanteile.", "lektion-10"],
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
  ["np.std() / ddof", "Die Streuung um den Mittelwert beschreiben.", 'import numpy as np\nwerte = np.array([2.0, 4.0])\nprint(float(np.std(werte)))', "NumPy; ddof=0 ist die Voreinstellung. ddof=1 nutzt einen anderen Nenner und braucht mehr als einen Wert. Nicht mit dem Mittelwert verwechseln.", "lektion-4"],
  ["plt.subplots() / ax.plot() / ax.bar()", "Ein oder mehrere Linien- und Balkendiagramme anlegen.", 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([20, 24, 30])\nax.bar([0, 1, 2], [10, 12, 15])', "Matplotlib; Listen und NumPy-Arrays; x und y müssen zusammenpassen; plt.show zeigt die Grafik.", "lektion-4"],
  ["set_title / set_xlabel / set_ylabel / tight_layout / show", "Diagramme beschriften und anzeigen.", 'import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([20, 24])\nax.set_title("Temperatur")\nax.set_xlabel("Messpunkt")\nax.set_ylabel("°C")\nplt.tight_layout()\nplt.show()', "Matplotlib-Achsenobjekt ax; erst zeichnen und beschriften, dann anzeigen.", "lektion-4"],
  ["sns.histplot()", "Die Verteilung von Werten als Histogramm ansehen.", 'import seaborn as sns\nimport matplotlib.pyplot as plt\nsns.histplot([20, 21, 21, 24])\nplt.show()', "Seaborn und Matplotlib; Zahlenliste, Array oder benannte DataFrame-Spalte.", "lektion-4"],
  ["sns.boxplot()", "Median, Quartile und statistisch auffällige Werte zeigen.", 'import seaborn as sns\nimport matplotlib.pyplot as plt\nsns.boxplot(y=[20, 21, 22, 23, 100])\nplt.show()', "Seaborn; die Box reicht vom ersten zum dritten Quartil. Punkte außerhalb der Whisker sind statistisch auffällig und nicht automatisch Messfehler.", "lektion-4"],
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

// Aufgabeninventar des vorhandenen Übungsblatts; Erklärungen sind keine geführten Lösungen.
const abdeckung = [
  {title:"1 · Einrichtung",page:5,tasks:["1.1","1.2","1.3"],lessons:["python-setup","vscode-setup","lektion-1"],gap:"Installation auf deinem Gerät selbst prüfen."},
  {title:"2 · Variablen und Typen",page:6,tasks:["2.1","2.2","2.3"],lessons:["lektion-2"],gap:"Geführte Aufgaben 2.1–2.3 vorhanden; jeden Typ und die Umrechnung selbst testen."},
  {title:"3 · Entscheidungen",page:7,tasks:["3.1","3.2","3.3"],lessons:["lektion-2","if"],gap:"Geführte Aufgaben 3.1–3.3 mit Grenztests vorhanden."},
  {title:"4 · Schleifen",page:8,tasks:["4.1","4.2","4.3"],lessons:["lektion-3","for"],gap:"Geführte Aufgaben 4.1–4.3 mit geprüften Schleifenausgaben vorhanden."},
  {title:"5 · Datenstrukturen",page:9,tasks:["5.1","5.2","5.3","5.4"],lessons:["lektion-3","liste"],gap:"Alle vier Aufgaben einschließlich Liste von Dictionaries sind geführt begleitet."},
  {title:"6 · CSV und Standard-Python",page:10,tasks:["6.1","6.2","6.3"],lessons:["aufgabe-6-1","aufgabe-6-2","aufgabe-6-3"],gap:"Geführte Lösungen vorhanden. CSV-Zuordnung, Sollzahlen und Filtergrenzen sind nicht vom Kurs bestätigt; 6.3 steht auf PDF-S. 11."},
  {title:"7 · NumPy einführen",page:12,tasks:["7.1","7.2","7.3"],lessons:["lektion-4"],gap:"Geführte Aufgaben 7.1–7.3 vorhanden. Paketinstallation auf dem eigenen Gerät prüfen."},
  {title:"8 · Masken und Statistik",page:13,tasks:["8.1","8.2","8.3"],lessons:["lektion-4"],gap:"Geführte Aufgaben 8.1–8.3 vorhanden. Die Originalmaske ist > 0 und <= 50; gedruckte Sollwerte passen nicht vollständig zur Zahlenliste."},
  {title:"9 · Matplotlib",page:14,tasks:["9.1","9.2","9.3"],lessons:["lektion-4"],gap:"Geführte Aufgaben 9.1–9.3 und geprüfte Diagrammstruktur vorhanden; Anzeige auf deinem Gerät prüfen."},
  {title:"10 · Seaborn und Report",page:15,tasks:["10.1","10.2","10.3"],lessons:["lektion-4"],gap:"Geführte Aufgaben 10.1–10.3 mit vollständigem Report vorhanden. CSV-Zuordnung bleibt beim Kurs zu klären."}
];

quellen.praxis31 = {title:"Vorlesung 003 · PDF-S. 31 · Bezug für das eigene Transferprojekt",href:"../Referenz/Vorlesungen/003_Coding und Digitalisierung.pdf#page=31"};
inhalte.push({
  id:"praxis-zeitreihe",kind:"Arbeitsablauf",topic:"Praxisprojekt",title:"Mini-Projekt: Von der CSV zum Beckenbericht",
  aliases:["Transferprojekt","BeckenAnalyse","Pandas OOP üben","becken-mini.csv"],
  summary:"Verbinde CSV-Import, Zeitraster, begrenzte Interpolation und eine Klasse mit eigenen Mini-Daten.",
  explanation:"Selbst erstellte Transferaufgabe nach den Ideen aus Vorlesung 003, PDF-S. 31. Sie ist ein kleiner Übungsweg zum Zusammenspiel der Lektionen 5–9. Die vier Zeilen in becken-mini.csv sind synthetisch und ersetzen weder bb12024.csv noch die Auswertung des Originaldatensatzes.",
  needs:["lektion-5","lektion-6","lektion-7","lektion-8","lektion-9"],sources:["praxis31"],
  download:["Synthetische becken-mini.csv speichern","beispiele/becken-mini.csv"],
  notice:"Arbeite in einem eigenen Ordner mit main.py und becken-mini.csv. Pandas muss im ausgewählten Python installiert sein. Auf dieser Lernseite wird kein Python-Code ausgeführt. Interpolation erzeugt Schätzungen, keine Messungen.",
  steps:["Sichere die synthetische CSV im Übungsordner. Öffne sie zuerst als Text und prüfe Spalten, Trennzeichen und Zeitangaben.","Schreibe eine Klasse BeckenAnalyse. __init__ speichert den Pfad und setzt df zunächst auf None.","Lade die CSV mit pd.read_csv. Wandle zeit um, setze den Zeitindex und sortiere ihn. Wähle nur o2_ist und temp_c für die Auswertung.","Bilde das 5-Minuten-Mittel. Untersuche das leere Rasterintervall, bevor du etwas füllst.","Interpoliere zeitbezogen höchstens einen Rasterwert pro Lücke, nur im Inneren. Merke dir mit einer Maske, welche Zellen du geschätzt hast.","Ergänze eine Report-Methode. Verweigere den Report vor der Aufbereitung und gib danach Rasterzeilen, geschätzte Zellen und beide Mittelwerte aus.","Führe dein Programm aus. Verändere danach einen Messwert und begründe, welche Abschnitte und Kennzahlen sich verändern müssen."],
  hints:["Das Zeitraster entsteht durch df.set_index('zeit').sort_index() und anschließend resample('5min').mean(). Vergleiche zuerst die beiden vorhandenen Messgruppen.","raster.isna() & aufbereitet.notna() markiert Zellen, die nach dem Füllen nicht mehr fehlen. Bewahre diese Information getrennt von den Werten auf.","Prüfe vor dem Report: if self.df is None. Eine leere oder noch nicht berechnete Auswertung ist kein Bericht mit gemessenen Nullen."],
  checks:["Die Quelldatei bleibt unverändert. Dein Programm liest nur.","Der Zeitindex ist sortiert; pro Fünf-Minuten-Abschnitt gibt es höchstens eine Ergebniszeile.","Der mittlere Abschnitt enthält Schätzungen. Kennzeichne sie und erkläre die verwendete Annahme.","Mit noch längeren Lücken darf limit=1 nur einen Teil auffüllen. Restliche Fehlwerte dürfen nicht unbemerkt als vollständige Daten gelten.","Starte die Report-Methode vor der Aufbereitung: Sie muss einen verständlichen Fehler auslösen. Teste zwei Instanzen mit getrennten Daten."],
  solution:{intro:"Eigene Musterlösung ausschließlich für becken-mini.csv. Lies zunächst die Schritte, schreibe selbst und öffne diese Lösung erst zum Vergleichen. Die Interpolationsgrenze ist eine Übungsannahme.",code:`import pandas as pd

class BeckenAnalyse:
    def __init__(self, pfad):
        self.pfad = pfad
        self.df = None
        self.geschaetzt = None

    def aufbereiten_5min(self):
        self.df = None
        self.geschaetzt = None
        roh = pd.read_csv(self.pfad)
        roh["zeit"] = pd.to_datetime(roh["zeit"])
        daten = roh.set_index("zeit").sort_index()[["o2_ist", "temp_c"]]
        raster = daten.resample("5min").mean()
        self.df = raster.interpolate(method="time", limit=1, limit_area="inside")
        self.geschaetzt = raster.isna() & self.df.notna()

    def zeige_report(self):
        if self.df is None:
            raise ValueError("Zuerst aufbereiten_5min ausführen.")
        if self.df.empty or self.df.isna().any().any():
            raise ValueError("Es fehlen noch Werte. Lücken zuerst prüfen.")
        print("Rasterzeilen:", len(self.df))
        print("Geschätzte Zellen:", int(self.geschaetzt.sum().sum()))
        print(f"O2-Mittel: {self.df['o2_ist'].mean():.1f} mg/L")
        print(f"Temperaturmittel: {self.df['temp_c'].mean():.1f} °C")

analyse = BeckenAnalyse("becken-mini.csv")
analyse.aufbereiten_5min()
analyse.zeige_report()`,explanation:"Die erste Maske erhält die Herkunft der Schätzungen. limit=1 begrenzt die Füllung je Lücke; limit_area='inside' verhindert das Verlängern an den Rändern. Bei verbleibenden Fehlwerten stoppt der Report. Für reale Prozessdaten müssen geeignete Zeitgrenzen, Qualitätsregeln und Einheiten fachlich festgelegt werden."}
});

// Original-Live-Übungen: synthetische Funktionstests sind kein Originaldatennachweis.
Object.assign(quellen,{
  "live-quelle-10": {
    "title": "Vorlesung 003 · PDF-S. 10 · Live-Übung",
    "href": "../Referenz/Vorlesungen/003_Coding und Digitalisierung.pdf#page=10"
  },
  "live-quelle-18": {
    "title": "Vorlesung 003 · PDF-S. 18 · Live-Übung",
    "href": "../Referenz/Vorlesungen/003_Coding und Digitalisierung.pdf#page=18"
  },
  "live-quelle-26": {
    "title": "Vorlesung 003 · PDF-S. 26 · Live-Übung",
    "href": "../Referenz/Vorlesungen/003_Coding und Digitalisierung.pdf#page=26"
  },
  "live-quelle-31": {
    "title": "Vorlesung 003 · PDF-S. 31 · Live-Übung",
    "href": "../Referenz/Vorlesungen/003_Coding und Digitalisierung.pdf#page=31"
  }
});
inhalte.push(...[
  {
    "id": "live-003-10",
    "kind": "Arbeitsablauf",
    "topic": "Live-Übungen",
    "title": "003 · PDF-S. 10 · Sicheren Mittelwert als Funktion",
    "aliases": [
      "Zwischenübung 1",
      "Sicheren Mittelwert als Funktion"
    ],
    "summary": "Verarbeite Zahlentexte, warne bei Fehlertexten und behandle den Leerfall.",
    "explanation": "Selbst verfasste Begleitung zur Original-Live-Übung aus Vorlesung 003.",
    "needs": [
      "lektion-5"
    ],
    "sources": [
      "live-quelle-10"
    ],
    "steps": [
      "Schreibe berechne_sicheren_mittelwert(roh_liste).",
      "Wandle jeden Text mit float in einem try/except-Block um.",
      "Ignoriere fehlerhafte Texte mit Warnung; prüfe zusätzlich NaN und Unendlich.",
      "Gib den Mittelwert zurück; bei keiner gültigen Zahl None statt eines erfundenen Messwerts."
    ],
    "hints": [
      "Fange konkret ValueError ab.",
      "NaN und inf sind gültige float-Texte, aber keine endlichen Messungen."
    ],
    "checks": [
      "Der Folienstream ergibt 4.3.",
      "Leere Liste, nur Fehlertexte, nan und inf führen zu None."
    ],
    "notice": "Der Leerfall wird bewusst anders als im Folienvorschlag behandelt.",
    "solution": {
      "intro": "Eigene geprüfte Musterlösung; Originaldaten niemals mit synthetischen Daten gleichen Namens ersetzen.",
      "code": "import math\n\ndef berechne_sicheren_mittelwert(roh_liste):\n    saubere_werte = []\n    for eintrag in roh_liste:\n        try:\n            wert = float(eintrag)\n        except ValueError:\n            print(f'Warnung: Ignoriere \"{eintrag}\"')\n            continue\n        if not math.isfinite(wert):\n            print(f'Warnung: Kein endlicher Messwert \"{eintrag}\"')\n            continue\n        saubere_werte.append(wert)\n    if not saubere_werte:\n        return None\n    return round(sum(saubere_werte) / len(saubere_werte), 2)\n\nif __name__ == \"__main__\":\n    stream = ['4.2', '4.5', 'Error', '4.1', 'TIMEOUT', '4.4']\n    print(\"Sicherer Mittelwert:\", berechne_sicheren_mittelwert(stream))",
      "explanation": "Eigene abgesicherte Lösung: Anders als der Folienvorschlag liefert der Leerfall None statt 0.0, damit fehlende Messungen nicht wie gemessene Nullen aussehen."
    }
  },
  {
    "id": "live-003-18",
    "kind": "Arbeitsablauf",
    "topic": "Live-Übungen",
    "title": "003 · PDF-S. 18 · Pandas: Import und kritische Messpunkte",
    "aliases": [
      "Zwischenübung 2",
      "Pandas: Import und kritische Messpunkte"
    ],
    "summary": "Sichte eine CSV, berechne die Temperatur und zähle o2_ist unter 0.5 mg/L.",
    "explanation": "Selbst verfasste Begleitung zur Original-Live-Übung aus Vorlesung 003.",
    "needs": [
      "lektion-6"
    ],
    "sources": [
      "live-quelle-18"
    ],
    "steps": [
      "Beschaffe die Originaldatei bb12024.csv beim Kurs. Prüfe Header und Trennzeichen.",
      "Lade die Datei und zeige head(3) und info().",
      "Berechne den Mittelwert von temp_c und filtere o2_ist < 0.5.",
      "Vergleiche Ergebnisse erst, wenn der Originaldatensatz vorliegt."
    ],
    "hints": [
      "0.5 ist nicht kleiner als 0.5.",
      "mean ignoriert NaN; prüfe trotzdem, ob überhaupt ein gültiger Wert vorhanden ist."
    ],
    "checks": [
      "Mit drei eigenen Zeilen um die Grenze 0.5 prüfst du den Vergleich.",
      "Leere Daten und fehlende Spalten dürfen keine scheinbar vollständige Auswertung liefern."
    ],
    "notice": "Originaldatei bb12024.csv fehlt. Der folgende Code ist mit getrennten synthetischen Prüfdaten getestet; Originalergebnisse sind nicht nachgewiesen.",
    "solution": {
      "intro": "Eigene geprüfte Musterlösung; Originaldaten niemals mit synthetischen Daten gleichen Namens ersetzen.",
      "code": "import pandas as pd\n\ndef auswerten(pfad):\n    df = pd.read_csv(pfad)\n    if df.empty:\n        raise ValueError(\"Keine Messzeilen.\")\n    print(df.head(3))\n    df.info()\n    mittel_temp = df[\"temp_c\"].mean()\n    if pd.isna(mittel_temp):\n        raise ValueError(\"Keine gültigen Temperaturwerte.\")\n    kritisch = df[df[\"o2_ist\"] < 0.5]\n    print(f\"Mittlere Temperatur: {mittel_temp:.2f} °C\")\n    print(f\"Anzahl kritischer Messpunkte: {len(kritisch)}\")\n    return df, kritisch, mittel_temp\n\nif __name__ == \"__main__\":\n    auswerten(\"bb12024.csv\")",
      "explanation": "Die Funktion nimmt den Pfad als Parameter an. Die technische Prüfung verwendet eine ausdrücklich synthetische CSV; die Folienwerte 15.62 und 1420 sind ohne Originaldaten nicht bestätigt."
    }
  },
  {
    "id": "live-003-26",
    "kind": "Arbeitsablauf",
    "topic": "Live-Übungen",
    "title": "003 · PDF-S. 26 · Zeitreihe auf fünf Minuten resamplen",
    "aliases": [
      "Zwischenübung 3",
      "Zeitreihe auf fünf Minuten resamplen"
    ],
    "summary": "Baue die Pipeline aus Import, Zeitindex, Fünf-Minuten-Mittel und begrenzter Interpolation.",
    "explanation": "Selbst verfasste Begleitung zur Original-Live-Übung aus Vorlesung 003.",
    "needs": [
      "lektion-7",
      "lektion-8"
    ],
    "sources": [
      "live-quelle-26"
    ],
    "steps": [
      "Lade die CSV mit pd.read_csv.",
      "Wandle zeit um, setze den Index und sortiere chronologisch.",
      "Wähle die vier fachlichen Zahlenspalten und bilde resample(\"5min\").mean().",
      "Fülle höchstens einen inneren Rasterwert pro Lücke. Stoppe bei Restlücken und untersuche ihre Ursache."
    ],
    "hints": [
      "Ein sortierter DatetimeIndex ist die Zeitbasis.",
      "Interpolation erzeugt Schätzungen; eine zeitbezogene Methode ist für das gleichmäßige Raster verständlich."
    ],
    "checks": [
      "08:01 und 08:04 gehören zum Abschnitt 08:00.",
      "Unlesbare Zeiten und Restlücken lösen einen sichtbaren Fehler aus."
    ],
    "notice": "Originaldatei bb12024.csv fehlt. Der folgende Code ist mit getrennten synthetischen Prüfdaten getestet; Originalergebnisse sind nicht nachgewiesen.",
    "solution": {
      "intro": "Eigene geprüfte Musterlösung; Originaldaten niemals mit synthetischen Daten gleichen Namens ersetzen.",
      "code": "import pandas as pd\n\ndef lade_und_resample(dateipfad):\n    df = pd.read_csv(dateipfad)\n    if df.empty:\n        raise ValueError(\"Keine Messzeilen.\")\n    df[\"zeit\"] = pd.to_datetime(df[\"zeit\"])\n    daten = df.set_index(\"zeit\").sort_index()[[\"o2_ist\", \"o2_soll\", \"nh4_mg_l\", \"temp_c\"]]\n    raster = daten.resample(\"5min\").mean()\n    gefuellt = raster.interpolate(method=\"time\", limit=1, limit_area=\"inside\")\n    if gefuellt.isna().any().any():\n        raise ValueError(\"Restlücken: Daten prüfen statt beliebig weiter interpolieren.\")\n    return gefuellt\n\nif __name__ == \"__main__\":\n    print(lade_und_resample(\"bb12024.csv\").head(4).round(2))",
      "explanation": "Eigene abgesicherte Anpassung des Folienwegs: limit=1 und limit_area=\"inside\" vermeiden unbegrenztes Füllen. Das ist eine didaktische Annahme, keine fachliche Freigabe realer Prozessdaten."
    }
  }
]);
const liveKlasse = inhalte.find(item => item.id === "praxis-zeitreihe");
inhalte.push({
  ...liveKlasse, id:"live-003-31",topic:"Live-Übungen",title:"003 · PDF-S. 31 · BeckenAnalyse als Klasse",
  aliases:["Abschlussübung","Original BeckenAnalyse","bb12024.csv"],sources:["live-quelle-31"],
  summary:"Kapsle den Originaldateipfad, die Fünf-Minuten-Aufbereitung und den Report in einer eigenen Klasse.",
  explanation:"Selbst verfasste Begleitung zur Original-Abschlussübung auf PDF-S. 31. Die Schritte folgen dem eigenen Mini-Projekt; der Originalaufruf benötigt bb12024.csv aus dem Kurs.",
  download:undefined,
  notice:"bb12024.csv fehlt. Keine Originalergebnisse bestätigt. Die Klasse ist mit getrennten synthetischen Prüfdaten und Fehlerfällen geprüft. Die Interpolationsgrenze bleibt eine didaktische Annahme.",
  steps:["Beschaffe bb12024.csv beim Kurs und prüfe zeit, o2_ist und temp_c.","Schreibe __init__: Pfad speichern und self.df = None setzen.","Implementiere Import, Zeitindex, Fünf-Minuten-Mittel und begrenzte innere Interpolation in aufbereiten_5min.","Implementiere zeige_report mit Prüfung auf fehlende Aufbereitung, leere Daten und Restlücken.","Teste zwei getrennte Instanzen. Führe das Hauptprogramm erst mit der tatsächlich vorliegenden Originaldatei aus."],
  solution:{...liveKlasse.solution,
    intro:"Eigene abgesicherte Musterlösung zur Originalübung. Ohne Originaldatei läuft nur der ausdrücklich getrennte synthetische Prüffall.",
    code:liveKlasse.solution.code.split('analyse = BeckenAnalyse')[0] + 'if __name__ == "__main__":\n    analyse = BeckenAnalyse("bb12024.csv")\n    analyse.aufbereiten_5min()\n    analyse.zeige_report()',
    explanation:"Die Klasse folgt dem Originalauftrag. Die zusätzliche Schätzmaske, limit=1 und Restlückenprüfung legen die Arbeitsannahmen offen. Die gedruckten Originalkennzahlen sind ohne bb12024.csv nicht reproduzierbar."
  }
});
