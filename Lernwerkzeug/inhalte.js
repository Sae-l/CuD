"use strict";
// Beispiele und Begleitungen sind selbst verfasst; Quellen belegen den Aufgabenbezug.
const quellen = {
  u10: { title: "CuD_Uebung 01 · PDF-S. 10 · Aufgaben 6.1–6.2", href: "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=10", image: "../Referenz_Sichtung/Pflicht_Uebungen/bilder/CuD_Uebung 01-S010.png" },
  u11: { title: "CuD_Uebung 01 · PDF-S. 11 · Aufgabe 6.3", href: "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=11", image: "pruefung/quelle-s11.png" },
  csv: { title: "Vorhandene Originaldaten: messdaten.csv", href: "../Referenz/Pflicht Übungen/messdaten.csv" }
};
const inhalte = [
  {
    id:"aufgabe-6-1", number:"6.1", kind:"Übung", topic:"Dateien", title:"6.1 · CSV einlesen",
    aliases:["CSV einlesen", "Wie öffne ich die CSV", "Datei öffnen", "readlines", "open"],
    summary:"Lies eine Textdatei ein und zähle ihre Zeilen. Der Header zählt mit.",
    explanation:"Du liest eine CSV mit with open(...) und readlines() ein. Außerhalb des with-Blocks gibst du die Anzahl der gelesenen Zeilen mit einem erklärenden Text aus. Der eingerückte Block schließt die Datei beim Verlassen automatisch.",
    needs:["pfade","open","readlines","len","print"], next:"aufgabe-6-2", sources:["u10","csv"],
    notice:"Dateiname offen: Die Aufgabe nennt sensor_messdaten_projekt.csv, vorhanden ist messdaten.csv. Dieser Pilot verwendet ausdrücklich die vorhandene Datei. Dass sie die vorgesehene Kursdatei ist, ist noch nicht bestätigt.",
    steps:["Lege einen eigenen Übungsordner an. Speichere dort main.py und eine Kopie der verlinkten messdaten.csv. Öffne das Terminal in diesem Ordner.","Öffne die Datei im Lesemodus mit UTF-8. Rücke den Leseaufruf unter with ein.","Speichere readlines() in zeilen. Ermittle danach außerhalb des Blocks die Länge dieser Liste.","Führe main.py im Editor aus. Vergleiche die Anzahl mit der CSV einschließlich Kopfzeile."],
    hints:["Eine CSV ist eine Textdatei. Benutze den Namen der Datei, die wirklich in deinem Übungsordner liegt.","Der Leseaufruf heißt datei.readlines(). Der Rückgabewert ist eine Liste von Zeichenketten.","len(zeilen) zählt Listenelemente. Hier ist ein Element eine gelesene Zeile, auch beim Header."],
    checks:["Die CSV bleibt unverändert; verwende den Modus r.","Nach dem with-Block ist datei.closed wahr, zeilen ist weiterhin verfügbar.","Eine Datei nur mit Header liefert eine Zeile; eine leere Datei null Zeilen."],
    solution:{ intro:"Selbst erstellte Lösung für die vorhandene messdaten.csv. Start im eigenen Übungsordner mit main.py und CSV. Kein Paket nötig.", code:'with open("messdaten.csv", "r", encoding="utf-8") as datei:\n    zeilen = datei.readlines()\n\nprint(f"Zeilen einschließlich Header: {len(zeilen)}")', explanation:"readlines() liest den Dateiinhalt in eine Liste. print steht außerhalb des Blocks. Die spätere Verarbeitung kann dieselbe Liste verwenden." }
  },
  {
    id:"aufgabe-6-2", number:"6.2", kind:"Übung", topic:"Bereinigung", title:"6.2 · Daten parsen und Ausreißer filtern",
    aliases:["Ausreißer", "Ausreisser", "filtern", "float", "Temperatur", "CSV bereinigen"],
    summary:"Überspringe den Header, wandle Temperaturen um und verteile sie auf zwei Listen.",
    explanation:"Arbeite mit zeilen aus 6.1. Extrahiere ausschließlich die Temperaturspalte. Wandle jeden Temperaturtext mit float() um und lege den Wert in gute_daten oder ausreisser ab. Aktiv-Status und Luftfeuchtigkeit sind hier keine Filterbedingungen.",
    needs:["aufgabe-6-1","liste","slice","for","split","float","if","append"], next:"aufgabe-6-3", sources:["u10","csv"],
    notice:"Quellwiderspruch: Die gedruckten Anzahlen passen nicht zur vorhandenen CSV. Vergleiche deshalb zunächst, ob jeder Datensatz genau einer Liste zugeordnet ist. Arbeitsannahme: 0 und 50 zählen zum gültigen Intervall; „zwischen“ ist auf S. 10 nicht ausdrücklich als inklusive definiert. Die Originaldaten enthalten keinen dieser Grenzwerte.",
    steps:["Initialisiere gute_daten und ausreisser als leere Listen.","Durchlaufe zeilen ab dem zweiten Element. Trenne jede Datenzeile an den Kommas.","Prüfe am Header die Spaltenreihenfolge und wandle die Temperatur in eine Zahl um.","Prüfe das Intervall 0 bis 50 einschließlich der Grenzen. Füge jeden Wert genau einer Liste hinzu."],
    hints:["zeilen[1:] lässt das erste Listenelement weg. So wird der Header nicht mit float() verarbeitet.","Die Spalten heißen SensorID, Standort, Temperatur, Luftfeuchtigkeit, IstAktiv. Python zählt Indizes ab 0.","Verwende 0 <= temperatur <= 50. Das else behandelt sowohl zu kleine als auch zu große Werte."],
    checks:["Header und leere Zeilen werden nicht als Zahlen umgewandelt.","Die Summe beider Listenlängen entspricht der Anzahl verarbeiteter Datenzeilen.","Selbst erstellter Grenztest: -1, 0, 50, 51. Nur die beiden mittleren Werte sollen gültig sein.","Ein Text wie defekt ist ein Umwandlungsfehler, kein numerischer Ausreißer. Schau dafür in die Fehlerhilfe."],
    solution:{ intro:"Selbst erstellte Fortsetzung von 6.1, auf die vorhandene CSV begrenzt. Leere Zeilen werden übersprungen. Fehlerhafte Spalten oder Zahlentexte brechen sichtbar ab. Reale CSV mit zitierten Kommas braucht csv.reader.", code:'gute_daten = []\nausreisser = []\n\nfor zeile in zeilen[1:]:\n    if not zeile.strip():\n        continue\n    spalten = zeile.strip().split(",")\n    temperatur = float(spalten[2])\n    if 0 <= temperatur <= 50:\n        gute_daten.append(temperatur)\n    else:\n        ausreisser.append(temperatur)\n\nprint(f"Gültige Datenpunkte: {len(gute_daten)}")\nprint(f"Ausreißer: {len(ausreisser)}")', explanation:"Die Temperatur steht an Index 2. Eine ungültige Zahl wird hier bewusst nicht stillschweigend entfernt. Die Intervallgrenzen sind die oben erklärte Arbeitsannahme." }
  },
  {
    id:"aufgabe-6-3", number:"6.3", kind:"Übung", topic:"Auswertung", title:"6.3 · Mittelwert, Minimum und Maximum",
    aliases:["Durchschnitt", "Mittelwert", "mean", "Minimum", "Maximum", "auswerten"],
    summary:"Berechne Kennzahlen ausschließlich aus gute_daten mit Standard-Python.",
    explanation:"Nutze die bereinigte Liste aus 6.2. Addiere ihre Werte mit einer Schleife und teile durch ihre Anzahl. Bestimme außerdem den kleinsten und größten Wert. NumPy und andere Zusatzbibliotheken sind in dieser Aufgabe nicht vorgesehen; der Median wird hier nicht verlangt.",
    needs:["aufgabe-6-2","for","len","mittelwert","minmax","print"], sources:["u11","csv"],
    steps:["Prüfe zuerst, ob gute_daten überhaupt Werte enthält.","Beginne die Summe bei 0 und addiere in einer Schleife jeden gültigen Wert.","Teile die Summe durch die Anzahl. Ermittle Minimum und Maximum mit den Standardfunktionen.","Gib die Kennzahlen beschriftet aus. Runde erst die Ausgabe, nicht jeden Messwert vor der Rechnung."],
    hints:["Die Summe wird einmal vor der Schleife initialisiert, sonst geht der bisherige Wert verloren.","summe += wert addiert wert zur bisherigen Summe. Der Mittelwert steht erst nach der Schleife fest.","if gute_daten: prüft auf eine nicht leere Liste. min() und max() brauchen hier ebenso wie die Division mindestens einen Wert."],
    checks:["Du verwendest gute_daten, nicht die ursprüngliche CSV-Spalte mit Ausreißern.","Der Mittelwert liegt zwischen Minimum und Maximum.","Teste eine leere Liste sowie eine Liste mit nur einem Wert.","Bei [10.0, 20.0, 30.0] kannst du die Rechnung von Hand kontrollieren (selbst erstellter Test)."],
    solution:{ intro:"Selbst erstellte Fortsetzung von 6.2. Der Leerfall erhält eine Meldung statt einer Division durch null.", code:'if gute_daten:\n    summe = 0\n    for wert in gute_daten:\n        summe += wert\n    mittelwert = summe / len(gute_daten)\n    print(f"Mittelwert: {mittelwert:.2f}")\n    print(f"Minimum: {min(gute_daten)}")\n    print(f"Maximum: {max(gute_daten)}")\nelse:\n    print("Keine gültigen Messwerte vorhanden.")', explanation:"Die Schleife bildet die Summe, len die Anzahl. :.2f formatiert nur die Anzeige mit zwei Nachkommastellen; der gespeicherte Mittelwert bleibt ungerundet." }
  },
  {
    id:"pfade", kind:"Befehl & Begriff", topic:"Dateien", title:"Dateipfade & Arbeitsordner",
    aliases:["Datei finden", "Pfad", "Ordner", "FileNotFoundError", "cwd"],
    summary:"Ein relativer Pfad beginnt beim aktuellen Arbeitsordner des Programms.",
    explanation:"Speichere main.py und die kopierte messdaten.csv in einem eigenen Übungsordner und starte das Skript dort. Der Speicherort des Skripts und der aktuelle Arbeitsordner können verschieden sein. Prüfe bei einem Dateifehler den tatsächlichen Arbeitsordner.",
    code:'from pathlib import Path\nprint(Path.cwd())\nprint(Path("messdaten.csv").is_file())',
    pitfall:"Eine Datei neben main.py wird nicht automatisch gefunden, wenn der Editor das Programm aus einem anderen Ordner startet.", sources:["u10"], related:["open","fehler-datei"]
  },
  {
    id:"open", kind:"Befehl & Begriff", topic:"Dateien", title:"with open(...) · Datei sicher lesen",
    aliases:["CSV einlesen", "Datei öffnen", "Wie öffne ich die CSV", "open", "with", "encoding"],
    summary:"Öffne eine Textdatei im Lesemodus. with schließt sie beim Verlassen des Blocks.",
    explanation:"open() liefert ein Dateiobjekt. r bedeutet lesen; encoding legt die Zeichenkodierung fest. Der eingerückte with-Block begrenzt die Verwendung des geöffneten Objekts. Das Beispiel nutzt eine selbst erstellte mini.csv.",
    code:'with open("mini.csv", "r", encoding="utf-8") as datei:\n    text = datei.read()\nprint(datei.closed)', output:"True\n", pitfall:"w würde eine vorhandene Datei leeren. Für diese Übung brauchst du ausschließlich r.", sources:["u10"], related:["readlines","pfade"]
  },
  {
    id:"readlines", kind:"Befehl & Begriff", topic:"Dateien", title:"readlines() · Zeilen als Liste",
    aliases:["readlines", "Zeilen lesen", "CSV einlesen", "Zeilenumbruch"],
    summary:"Liest die übrigen Zeilen einer geöffneten Datei in eine Liste.",
    explanation:"Jedes Listenelement ist Text. Ein Zeilenumbruch bleibt normalerweise am Ende erhalten. Hat man vorher schon aus der Datei gelesen, beginnt readlines() an der aktuellen Leseposition, nicht automatisch am Dateianfang.",
    code:'with open("mini.csv", "r", encoding="utf-8") as datei:\n    zeilen = datei.readlines()\nprint(len(zeilen))', output:"3\n", pitfall:"Der Header zählt mit. readlines() liest alles auf einmal in den Speicher; bei großen Dateien ist direktes Iterieren sinnvoll.", sources:["u10"], related:["open","len"]
  },
  {
    id:"len", kind:"Befehl & Begriff", topic:"Python-Grundlagen", title:"len() · Elemente zählen",
    aliases:["len", "Anzahl", "Länge", "Zeilen zählen"], summary:"Bei einer Liste zählt len() die Elemente; bei einem Text die Zeichen.",
    explanation:"len(zeilen) ist die Zahl der eingelesenen Zeilen. len(zeilen[0]) wäre dagegen die Zeichenzahl der ersten Zeile. Nutze für den Mittelwert die Anzahl der bereinigten Messwerte.",
    code:'werte = [10.0, 20.0, 30.0]\nprint(len(werte))\nprint(len([]))', output:"3\n0\n", pitfall:"Anzahl der Zeilen ist nicht automatisch Anzahl der Messwerte: Header und Leerzeilen berücksichtigen.", sources:["u10"], related:["liste","mittelwert"]
  },
  {
    id:"print", kind:"Befehl & Begriff", topic:"Python-Grundlagen", title:"print() & f-Strings · Ergebnisse erklären",
    aliases:["print", "Ausgabe", "Terminal", "f-String", "Nachkommastellen"], summary:"Gib Werte mit einer verständlichen Beschriftung im Terminal aus.",
    explanation:"print() gibt seine Argumente aus. Ein f vor der Zeichenkette erlaubt Ausdrücke in geschweiften Klammern. :.2f zeigt eine Zahl mit zwei Nachkommastellen.",
    code:'wert = 12.345\nprint(f"Messwert: {wert:.2f}")', output:"Messwert: 12.35\n", pitfall:"Ohne f bleiben die geschweiften Klammern gewöhnlicher Text. Formatieren verändert den gespeicherten Zahlenwert nicht.", sources:["u10"], related:["len","mittelwert"]
  },
  {
    id:"liste", kind:"Befehl & Begriff", topic:"Python-Grundlagen", title:"Listen & Indizes · Werte aufbewahren",
    aliases:["Liste", "list", "Index", "Spalte", "Temperaturspalte"], summary:"Eine Liste speichert eine Folge von Werten. Der erste Index ist 0.",
    explanation:"Leere Listen entstehen mit []. Auf ein Element greifst du mit eckigen Klammern zu. In der vorhandenen CSV ist Temperatur die dritte Spalte, nach split also Index 2.",
    code:'spalten = ["7", "Park", "19.5"]\nprint(spalten[2])', output:"19.5\n", pitfall:"spalten[3] wäre hier außerhalb der Liste. Negative Indizes zählen vom Ende.", sources:["u10"], related:["append","split","fehler-index"]
  },
  {
    id:"slice", kind:"Befehl & Begriff", topic:"Dateien", title:"[1:] · Den Header überspringen",
    aliases:["Header", "Kopfzeile", "slicing", "erste Zeile", "zeilen[1:]"], summary:"Erzeugt eine Teilliste ab Index 1 bis zum Ende.",
    explanation:"Die erste CSV-Zeile beschreibt die Spalten. Sie enthält keine Temperaturzahl und darf nicht an float() gehen. [1:] überspringt genau dieses erste Element.",
    code:'zeilen = ["Temperatur", "10.0", "20.0"]\nprint(zeilen[1:])', output:"['10.0', '20.0']\n", pitfall:"Nicht jede Datei besitzt einen Header. Prüfe zuerst den Inhalt, statt stets die erste Zeile zu entfernen.", sources:["u10"], related:["readlines","float"]
  },
  {
    id:"for", kind:"Befehl & Begriff", topic:"Python-Grundlagen", title:"for · Werte nacheinander verarbeiten",
    aliases:["for", "Schleife", "iterieren", "summe", "Einrückung"], summary:"Führt den eingerückten Block für jedes Element einer Folge aus.",
    explanation:"Die Schleifenvariable erhält nacheinander jeden Wert. Eine Summe initialisierst du vor der Schleife. += addiert zum bisherigen Wert.",
    code:'summe = 0\nfor wert in [10.0, 20.0, 30.0]:\n    summe += wert\nprint(summe)', output:"60.0\n", pitfall:"Steht summe = 0 im Schleifenblock, beginnt die Summe bei jedem Durchlauf erneut.", sources:["u10","u11"], related:["mittelwert","fehler-einrueckung"]
  },
  {
    id:"split", kind:"Befehl & Begriff", topic:"Dateien", title:"strip() & split() · Eine Zeile zerlegen",
    aliases:["split", "strip", "Komma", "Trennzeichen", "CSV parsen"], summary:"Entferne äußere Leerzeichen und zerlege einfachen CSV-Text an Kommas.",
    explanation:"strip() entfernt äußere Leerzeichen und Zeilenumbrüche. split(\",\") liefert eine Liste von Spaltentexten. Diese einfache Methode passt zur vorhandenen Datei.",
    code:'zeile = "7,Park,19.5\\n"\nspalten = zeile.strip().split(",")\nprint(spalten[2])', output:"19.5\n", pitfall:"shortcut: split berücksichtigt keine zitierten Kommas; bei allgemeinen CSV-Dateien auf das Standardmodul csv umstellen. Semikolons brauchen ein anderes Trennzeichen.", sources:["u10"], related:["liste","float","fehler-index"]
  },
  {
    id:"float", kind:"Befehl & Begriff", topic:"Bereinigung", title:"float() · Text in eine Zahl umwandeln",
    aliases:["float", "Zahlenumwandlung", "float geht nicht", "ValueError", "Dezimalzahl"], summary:"Wandelt einen passenden Zahlentext in eine Gleitkommazahl um.",
    explanation:"CSV-Spalten sind zunächst Zeichenketten. float(\"19.5\") ergibt eine Zahl, mit der du rechnen und numerisch vergleichen kannst. Das Dezimaltrennzeichen ist ein Punkt.",
    code:'temperatur = float("19.5")\nprint(temperatur + 1)', output:"20.5\n", pitfall:"float(\"Temperatur\"), float(\"defekt\") und float(\"19,5\") lösen ValueError aus. Erst den tatsächlichen Text und das Dateiformat prüfen.", sources:["u10"], related:["fehler-wert","slice"]
  },
  {
    id:"if", kind:"Befehl & Begriff", topic:"Bereinigung", title:"if / else · Ein Intervall prüfen",
    aliases:["if", "else", "and", "Ausreißer", "Ausreisser", "filtern", "Grenzwerte"], summary:"Prüfe, ob eine Temperatur im vereinbarten Bereich liegt.",
    explanation:"0 <= wert <= 50 bedeutet zugleich mindestens 0 und höchstens 50. if führt bei wahrer Bedingung seinen Block aus, sonst else. Der Pilot verwendet dieses inklusive Intervall als dokumentierte Arbeitsannahme.",
    code:'for wert in [-1, 0, 50, 51]:\n    if 0 <= wert <= 50:\n        print(f"gültig: {wert}")\n    else:\n        print(f"Ausreißer: {wert}")', output:"Ausreißer: -1\ngültig: 0\ngültig: 50\nAusreißer: 51\n", pitfall:"Nur wert <= 50 würde auch negative Werte behalten. Vergleiche Zahlen, keine Zeichenketten.", sources:["u10"], related:["float","append"]
  },
  {
    id:"append", kind:"Befehl & Begriff", topic:"Bereinigung", title:"append() · Einen Wert sammeln",
    aliases:["append", "hinzufügen", "sammeln", "gute_daten", "ausreisser"], summary:"Hängt einen Wert an eine vorhandene Liste an.",
    explanation:"Lege die Listen vor der Schleife an. Innerhalb der Filterbedingung hängst du den Zahlenwert an die passende Liste. append() verändert die Liste und liefert None zurück.",
    code:'werte = []\nwerte.append(19.5)\nprint(werte)', output:"[19.5]\n", pitfall:"werte = werte.append(19.5) überschreibt die Liste mit None. Rufe append ohne Zuweisung auf.", sources:["u10"], related:["liste","if"]
  },
  {
    id:"mittelwert", kind:"Befehl & Begriff", topic:"Auswertung", title:"Mittelwert · Summe durch Anzahl",
    aliases:["Mittelwert", "Durchschnitt", "mean", "np.mean", "auswerten"], summary:"Der arithmetische Mittelwert ist die Summe aller Werte geteilt durch ihre Anzahl.",
    explanation:"Addiere die bereinigten Werte und teile durch len(werte). Hier arbeiten wir mit Standard-Python und einer Schleife. np.mean gehört zu NumPy und wird in Lektion 4 erklärt; die Aufgaben 6.1–6.3 benötigen es nicht.",
    code:'werte = [10.0, 20.0, 30.0]\nif werte:\n    summe = 0\n    for wert in werte:\n        summe += wert\n    print(summe / len(werte))\nelse:\n    print("Keine Werte")', output:"20.0\n", pitfall:"Eine leere Liste hat Länge 0. Prüfe sie vor der Division. Ausreißer können den Mittelwert stark verschieben.", sources:["u11"], related:["len","for","fehler-leer"]
  },
  {
    id:"minmax", kind:"Befehl & Begriff", topic:"Auswertung", title:"min() & max() · Die Grenzen finden",
    aliases:["min", "max", "Minimum", "Maximum", "kleinster", "größter"], summary:"Finden den kleinsten und größten Wert einer nicht leeren Folge.",
    explanation:"Verwende die bereinigte Liste. Bei Zahlen entsprechen Minimum und Maximum der numerischen Reihenfolge. Bei Zeichenketten wäre es eine Textsortierung.",
    code:'werte = [10.0, 20.0, 30.0]\nif werte:\n    print(min(werte), max(werte))', output:"10.0 30.0\n", pitfall:"min([]) und max([]) lösen ValueError aus. Ein einzelner Wert ist zugleich Minimum und Maximum.", sources:["u11"], related:["mittelwert","fehler-leer"]
  },
  {
    id:"repr", kind:"Befehl & Begriff", topic:"Python-Grundlagen", title:"repr() · Versteckte Zeichen erkennen",
    aliases:["repr", "debuggen", "unsichtbare Zeichen", "Zahlentext prüfen"], summary:"Zeigt die Darstellung eines Wertes einschließlich besonderer Zeichen.",
    explanation:"Beim Prüfen einer CSV-Spalte hilft repr(), leere Texte, Leerzeichen und Zeilenumbrüche sichtbar zu machen. Das ist eine selbst erstellte Diagnosehilfe zur Zahlenumwandlung.",
    code:'text = "19.5\\n"\nprint(repr(text))', output:"'19.5\\n'\n", pitfall:"repr() wandelt den Inhalt nicht in eine Zahl um und repariert keine fehlerhafte Zeile.", sources:["u10"], related:["float","fehler-wert"]
  },
  {
    id:"fehler-datei", kind:"Fehlerhilfe", topic:"Dateien", title:"FileNotFoundError · Datei nicht gefunden",
    aliases:["FileNotFoundError", "Datei fehlt", "Datei nicht gefunden", "open geht nicht"], summary:"Prüfe Arbeitsordner, Dateinamen und Endung.",
    explanation:"Python findet den angegebenen Pfad nicht. Im Pilot kommt als zusätzliche Fehlerquelle der unterschiedliche Dateiname in Aufgabenblatt und Quellordner hinzu.",
    steps:["Lies den Pfad in der Fehlermeldung. Stimmt er mit deiner tatsächlich vorhandenen Datei überein?", "Prüfe den Arbeitsordner mit Path.cwd() und die Existenz mit Path(...).is_file().", "Prüfe im Explorer die eingeblendeten Dateiendungen. Eine Datei kann versehentlich messdaten.csv.txt heißen.", "Speichere die verlinkte CSV als Kopie neben main.py und öffne das Terminal in diesem Ordner."], sources:["u10","csv"], related:["pfade","open"]
  },
  {
    id:"fehler-wert", kind:"Fehlerhilfe", topic:"Bereinigung", title:"ValueError · float versteht den Text nicht",
    aliases:["ValueError", "float geht nicht", "could not convert string to float", "Zahlenumwandlung", "Dezimalkomma"], summary:"Finde heraus, welcher Text wirklich an float() übergeben wird.",
    explanation:"float braucht einen passenden Zahlentext. Die Meldung bedeutet nicht, dass der Messwert außerhalb des gültigen Temperaturbereichs liegt. Umwandlung und Filterung sind zwei verschiedene Schritte.",
    steps:["Gib repr(spalten[2]) vor der Umwandlung aus. Das zeigt auch leere Texte und versteckte Zeichen.","Steht dort Temperatur? Dann wurde der Header nicht übersprungen. Steht dort ein Ortsname? Dann stimmt der Spaltenindex nicht.","Prüfe Punkt oder Komma als Dezimalzeichen sowie das CSV-Trennzeichen. Ersetze nicht blind alle Kommas der ganzen Zeile.","Ein defekter Wert braucht eine bewusste Behandlung mit Fehlerprotokoll oder Abbruch; ihn still als 0 zu verwenden verfälscht die Auswertung."],
    code:'try:\n    float("defekt")\nexcept ValueError:\n    print("Kein gültiger Zahlentext")', output:"Kein gültiger Zahlentext\n", sources:["u10"], related:["float","slice","split"]
  },
  {
    id:"fehler-index", kind:"Fehlerhilfe", topic:"Dateien", title:"IndexError · Eine Spalte fehlt",
    aliases:["IndexError", "list index out of range", "Spalte fehlt", "leere Zeile"], summary:"Die zerlegte Zeile hat weniger Elemente als dein Index benötigt.",
    explanation:"spalten[2] setzt mindestens drei Spalten voraus. Eine leere Zeile oder ein falsches Trennzeichen kann eine viel kürzere Liste ergeben.",
    steps:["Gib repr(zeile), spalten und len(spalten) aus.","Vergleiche das Trennzeichen mit dem Original: Die vorhandene messdaten.csv verwendet Kommas.","Überspringe vollständig leere Zeilen. Prüfe beschädigte Datenzeilen gesondert, statt beliebige Ersatzwerte einzufügen."], sources:["u10"], related:["split","liste"]
  },
  {
    id:"fehler-leer", kind:"Fehlerhilfe", topic:"Auswertung", title:"Leere Liste · Keine Kennzahl berechenbar",
    aliases:["ZeroDivisionError", "division by zero", "ValueError", "min() arg is an empty sequence", "max() arg is an empty sequence", "leere Liste"], summary:"Vor Mittelwert, min und max prüfen, ob gültige Werte übrig sind.",
    explanation:"Eine leere Liste führt beim Teilen durch ihre Länge zu ZeroDivisionError. min() und max() lösen für eine leere Liste ohne Vorgabe ValueError aus. Gib stattdessen eine klare Meldung aus und prüfe deine Filterbedingung.",
    code:'werte = []\nif werte:\n    print(min(werte))\nelse:\n    print("Keine gültigen Messwerte")', output:"Keine gültigen Messwerte\n", sources:["u11"], related:["mittelwert","minmax","if"]
  },
  {
    id:"fehler-einrueckung", kind:"Fehlerhilfe", topic:"Python-Grundlagen", title:"IndentationError · Blöcke einrücken",
    aliases:["IndentationError", "TabError", "Einrückung", "expected an indented block"], summary:"Nach with, for und if gehört der folgende Block eingerückt.",
    explanation:"Python erkennt Blöcke an Einrückungen. Verwende im Editor einheitlich vier Leerzeichen je Ebene. Nach dem Block gehst du auf die vorherige Ebene zurück. PDF-Textauszüge können Einrückungen verlieren; vergleiche das Originalbild.",
    steps:["Prüfe nach jeder Zeile mit Doppelpunkt den Beginn des folgenden Blocks.","Lass dir Leerzeichen und Tabs im Editor anzeigen und vereinheitliche sie.","Ordne else auf derselben Einrückungsebene wie das zugehörige if an."], sources:["u10"], related:["open","for","if"]
  },
  {
    id:"ablauf", kind:"Arbeitsablauf", topic:"Dateien", title:"Von der CSV zur Auswertung",
    aliases:["CSV einlesen", "Datei finden", "CSV Bereinigung Auswertung", "Arbeitsablauf", "Projektstruktur"], summary:"Ein zusammenhängender Lernweg durch die Aufgaben 6.1–6.3.",
    explanation:"Bearbeite die Schritte in dieser Reihenfolge. Nach jedem Schritt kontrollierst du ein Zwischenergebnis. So lässt sich ein Fehler eingrenzen, bevor er die Kennzahlen verfälscht.",
    needs:["aufgabe-6-1","aufgabe-6-2","aufgabe-6-3"], sources:["u10","u11","csv"],
    steps:["Datei finden: Lege main.py und eine Kopie von messdaten.csv in deinen eigenen Übungsordner. Starte dort.","CSV einlesen: Öffne im Lesemodus, speichere die Zeilen und prüfe die Anzahl samt Header (6.1).", "Spalten verstehen: Lies die Kopfzeile. Temperatur ist in dieser Datei die dritte Spalte.", "Werte umwandeln: Lass den Header aus, zerlege Datenzeilen, verwende float(). Prüfe problematische Texte mit repr().", "Bereinigen: Teile die Zahlen in gültige Werte und Ausreißer. Behandle ungültige Texte gesondert (6.2).", "Auswerten: Prüfe die Liste auf Inhalt, berechne Mittelwert, Minimum und Maximum nur aus gültigen Werten (6.3)."],
    checks:["Keine Quelldatei wurde überschrieben.","Jeder Schritt besitzt eine überprüfbare Ausgabe.","Die drei Aufgaben verwenden zusammenpassende Variablen: zeilen → gute_daten → Kennzahlen."]
  },
  {
    id:"quellen", kind:"Quellen", topic:"Dateien", title:"Quellen & Prüfstand des Piloten",
    aliases:["Quellen", "Prüfstand", "Sollausgabe", "Dateiname", "Widerspruch"], summary:"Originalaufgaben, vorhandene CSV und die Grenzen der geprüften Inhalte.",
    explanation:"Die Aufgaben 6.1–6.3 wurden auf den Originalseiten 10–11 abgeglichen. Begleittexte, Hinweise und Python-Beispiele sind selbst erstellte Ergänzungen. Die vorhandene messdaten.csv dient als ausdrücklich gewählte lokale Arbeitsdatei. Die vollständige Erschließung aller Modulunterlagen steht aus.",
    notice:"Offen bleiben die Bestätigung des CSV-Dateinamens, die abweichenden gedruckten Sollausgaben und die verbindliche Definition der Intervallgrenzen. Der technische Test bestätigt den Pilot unter den dokumentierten Annahmen. Ein Gebrauchstest mit dir und ein Nachweis des Lernnutzens stehen aus.",
    steps:["Originalaufgaben: CuD_Uebung 01, PDF-Seiten 10–11; im Originalbild angesehen. 6.3 fordert Mittelwert, Minimum und Maximum, keinen Median.","Eigene Beispiele: kleine synthetische Daten, getrennt von den Kursdaten. Mit Python ausgeführt; der Prüfbericht nennt die Ergebnisse.","Musterlösungen: selbst erstellt, nur für die vorhandene CSV und das inklusive Intervall geprüft; standardmäßig geschlossen.","Abdeckung: Gestufte Begleitung für den CSV-Block 6.1–6.3, Lernbausteine, Fehlerhilfen, Vorlesungsetappen, Einrichtung und ein eigenes Transferprojekt. Der Abdeckungsplan zeigt den aktuellen Stand der Originalaufgaben. Nicht alle weiteren Originalaufgaben sind als Lösungen aufbereitet.","Die neuen Lektionen beruhen auf den vorhandenen Textauszügen mit PDF-Verweisen; eine vollständige visuelle Prüfung sämtlicher Originalseiten steht aus. Vollständiger Quellenindex und bekannte weitere Lücken stehen in Referenz_Sichtung. Insbesondere fehlt bb12024.csv weiterhin."], sources:["u10","u11","csv"]
  }
];

// Vollständige Begleitung des vorhandenen Übungsblatts; Originaldaten bleiben unverändert.
Object.assign(quellen, {
  "uebung-5": {
    "title": "CuD_Uebung 01 · PDF-S. 5",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=5"
  },
  "uebung-6": {
    "title": "CuD_Uebung 01 · PDF-S. 6",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=6"
  },
  "uebung-7": {
    "title": "CuD_Uebung 01 · PDF-S. 7",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=7"
  },
  "uebung-8": {
    "title": "CuD_Uebung 01 · PDF-S. 8",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=8"
  },
  "uebung-9": {
    "title": "CuD_Uebung 01 · PDF-S. 9",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=9"
  },
  "uebung-12": {
    "title": "CuD_Uebung 01 · PDF-S. 12",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=12"
  },
  "uebung-13": {
    "title": "CuD_Uebung 01 · PDF-S. 13",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=13"
  },
  "uebung-14": {
    "title": "CuD_Uebung 01 · PDF-S. 14",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=14"
  },
  "uebung-15": {
    "title": "CuD_Uebung 01 · PDF-S. 15",
    "href": "../Referenz/Pflicht Übungen/CuD_Uebung 01.pdf#page=15"
  }
});
inhalte.push(...[
  {
    "id":"aufgabe-1-1",
    "number":"1.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"1.1 · Projektordner anlegen",
    "aliases":["1.1", "Projektordner anlegen"],
    "summary":"Lege SmartCityProject mit main.py und einer Kopie der vorhandenen messdaten.csv an.",
    "explanation":"Lege SmartCityProject mit main.py und einer Kopie der vorhandenen messdaten.csv an. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["python-setup", "vscode-setup", "pfade"],
    "sources":["uebung-5", "csv"],
    "steps":["Erstelle einen eigenen Ordner SmartCityProject und öffne ihn in VS Code.", "Erstelle main.py. Lade die CSV über den Link dieser Seite in denselben Ordner; überschreibe keine bereits bearbeitete Datei.", "Prüfe im Explorer Dateiendungen und im Terminal den Arbeitsordner."],
    "hints":["Eine Datei main.py.txt ist keine Python-Datei.", "Die CSV wird kopiert; das Original in Referenz bleibt unverändert."],
    "checks":["Ordner und beide Dateien sind vorhanden.", "Eine vorhandene main.py bleibt beim erneuten Anlegen erhalten."],
    "solution":{"intro": "Eigene Musterlösung: Führe diesen optionalen Ordnercode einmal im übergeordneten Ordner aus. Öffne anschließend SmartCityProject in VS Code; danach arbeitest du in dessen main.py.", "code": "from pathlib import Path\nprojekt = Path(\"SmartCityProject\")\nprojekt.mkdir(exist_ok=True)\n(projekt / \"main.py\").touch(exist_ok=True)\nprint(projekt.resolve())\nprint(\"CSV anschließend unverändert in diesen Ordner kopieren.\")", "explanation": "mkdir und touch mit exist_ok=True erhalten vorhandene Inhalte. Das Skript erzeugt keine erfundenen CSV-Daten; lade die verlinkte Originaldatei separat herunter."}
  },
  {
    "id":"aufgabe-1-2",
    "number":"1.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"1.2 · Virtuelle Umgebung auswählen",
    "aliases":["1.2", "Virtuelle Umgebung auswählen"],
    "summary":"Erzeuge eine eigene .venv und wähle genau ihren Interpreter in VS Code.",
    "explanation":"Erzeuge eine eigene .venv und wähle genau ihren Interpreter in VS Code. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-1-1", "python-setup"],
    "sources":["uebung-5"],
    "steps":["Öffne das Terminal in SmartCityProject. Windows: python -m venv .venv; macOS/Linux: python3 -m venv .venv. Falls Windows nur py kennt: py -3 -m venv .venv.", "Wähle Python: Select Interpreter und den Interpreter in .venv.", "Starte den Prüfcode mit Run Python File. Ohne Aktivierung: Windows .\\.venv\\Scripts\\python.exe main.py, macOS/Linux ./.venv/bin/python main.py."],
    "hints":["Der Editor und der Paketinstallationsbefehl müssen denselben Interpreter verwenden.", "Eine Aktivierung und Änderung der PowerShell-Ausführungsrichtlinie sind nicht nötig."],
    "checks":["sys.executable zeigt in die eigene .venv.", "Die zweite Ausgabe ist True; False bedeutet: falscher Interpreter."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import sys\nprint(sys.executable)\nprint(sys.prefix != sys.base_prefix)", "explanation": "Der Prüfcode kontrolliert die Auswahl; er installiert nichts. Die Erstellung und Auswahl der Umgebung führst du mit den oben angegebenen Terminalbefehlen aus."}
  },
  {
    "id":"aufgabe-1-3",
    "number":"1.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"1.3 · Ersten Programmstart prüfen",
    "aliases":["1.3", "Ersten Programmstart prüfen"],
    "summary":"Starte main.py und vergleiche die Ausgabe mit dem Original.",
    "explanation":"Starte main.py und vergleiche die Ausgabe mit dem Original. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-1-2", "print"],
    "sources":["uebung-5"],
    "steps":["Schreibe die print-Zeile in main.py und speichere.", "Starte die Datei im gewählten Interpreter.", "Ändere den Text, speichere und starte erneut."],
    "hints":["Text braucht Anführungszeichen.", "Der Terminalbefehl gehört nicht in main.py."],
    "checks":["Die Ausgabe enthält Systemstart: Smart City Analyse.", "Der zweite Lauf zeigt deinen geänderten Text."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "print(\"Systemstart: Smart City Analyse\")", "explanation": "print gibt den Text aus; die Datei wird nicht schon durch das Speichern ausgeführt."}
  },
  {
    "id":"aufgabe-2-1",
    "number":"2.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"2.1 · Sensordaten mit passenden Typen",
    "aliases":["2.1", "Sensordaten mit passenden Typen"],
    "summary":"Lege ID, Standort, Temperatur und Aktivstatus mit int, str, float und bool an.",
    "explanation":"Lege ID, Standort, Temperatur und Aktivstatus mit int, str, float und bool an. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-2"],
    "sources":["uebung-6"],
    "steps":["Erstelle sensor_id=1, standort als Nordpark, temperatur als 22.5 und ist_aktiv als wahr.", "Verwende den Python-Wahrheitswert True und den Dezimalpunkt."],
    "hints":["True ist kein Text in Anführungszeichen.", "22.5 ist float, 22 ist int."],
    "checks":["Die vier Werte besitzen die passenden Typen."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "sensor_id = 1\nstandort = \"Nordpark\"\ntemperatur = 22.5\nist_aktiv = True", "explanation": "Python bindet Namen an typisierte Werte. True und \"True\" sind verschiedene Typen."}
  },
  {
    "id":"aufgabe-2-2",
    "number":"2.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"2.2 · Typen mit f-Strings ausgeben",
    "aliases":["2.2", "Typen mit f-Strings ausgeben"],
    "summary":"Prüfe jeden Typ und beschrifte die Ausgabe.",
    "explanation":"Prüfe jeden Typ und beschrifte die Ausgabe. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-2-1", "print"],
    "sources":["uebung-6"],
    "steps":["Übernimm die vier Variablen aus 2.1.", "Nutze type für jede Variable.", "Setze das Ergebnis mit einem f-String in eine beschriftete Ausgabe."],
    "hints":["type wird auf den Wert angewendet.", "Das f steht vor dem öffnenden Anführungszeichen."],
    "checks":["Die Ausgaben nennen int, str, float und bool in dieser Reihenfolge."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "sensor_id = 1\nstandort = \"Nordpark\"\ntemperatur = 22.5\nist_aktiv = True\nprint(f\"Datentyp von ID: {type(sensor_id)}\")\nprint(f\"Datentyp von Standort: {type(standort)}\")\nprint(f\"Datentyp von Temperatur: {type(temperatur)}\")\nprint(f\"Datentyp von Aktiv-Status: {type(ist_aktiv)}\")", "explanation": "type liefert das Typobjekt; der f-String macht es in der Ausgabe lesbar."}
  },
  {
    "id":"aufgabe-2-3",
    "number":"2.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"2.3 · Celsius in Fahrenheit umrechnen",
    "aliases":["2.3", "Celsius in Fahrenheit umrechnen"],
    "summary":"Wende Fahrenheit = Celsius × 1.8 + 32 an.",
    "explanation":"Wende Fahrenheit = Celsius × 1.8 + 32 an. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-2-1", "lektion-2"],
    "sources":["uebung-6"],
    "steps":["Setze temperatur auf 22.5.", "Speichere das Rechenergebnis in temp_fahrenheit.", "Gib Ausgangswert, Ergebnis und beide Einheiten aus."],
    "hints":["Python verwendet * für die Multiplikation.", "Runde erst die Anzeige."],
    "checks":["22.5 °C ergeben 72.5 °F.", "Eigener Test: 0 °C ergeben 32 °F."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "temperatur = 22.5\ntemp_fahrenheit = temperatur * 1.8 + 32\nprint(f\"{temperatur} Grad Celsius entsprechen {temp_fahrenheit} Grad Fahrenheit.\")", "explanation": "Die Multiplikation wird vor der Addition ausgeführt."}
  },
  {
    "id":"aufgabe-3-1",
    "number":"3.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"3.1 · Sensorstatus unterscheiden",
    "aliases":["3.1", "Sensorstatus unterscheiden"],
    "summary":"Gib für beide Aktivzustände die passende Meldung aus.",
    "explanation":"Gib für beide Aktivzustände die passende Meldung aus. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-2", "if"],
    "sources":["uebung-7"],
    "steps":["Schreibe eine if/else-Verzweigung für ist_aktiv.", "Teste getrennt mit True und False."],
    "hints":["if ist_aktiv prüft bereits den Wahrheitswert.", "else wird nur ausgeführt, wenn die Bedingung falsch ist."],
    "checks":["Beide Pfade sind erreichbar und liefern je eine Meldung."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "ist_aktiv = True\nif ist_aktiv:\n    print(\"Sensor sendet Daten\")\nelse:\n    print(\"Sensor ist offline!\")", "explanation": "Ändere ist_aktiv zwischen True und False und starte erneut. Du brauchst hier noch keine Funktion."}
  },
  {
    "id":"aufgabe-3-2",
    "number":"3.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"3.2 · Temperaturbereiche mit elif",
    "aliases":["3.2", "Temperaturbereiche mit elif"],
    "summary":"Unterscheide Hitze, Frost, Normalbereich und erhöhte Temperatur.",
    "explanation":"Unterscheide Hitze, Frost, Normalbereich und erhöhte Temperatur. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-2", "if"],
    "sources":["uebung-7"],
    "steps":["Prüfe zuerst größer als 50, danach kleiner als 0.", "Prüfe anschließend 0 bis 30 einschließlich; else übernimmt den Rest.", "Teste 105 sowie die Grenzen 0, 30 und 50."],
    "hints":["elif verbindet die Fälle zu genau einer Entscheidung.", "Der Restbereich liegt über 30 bis einschließlich 50."],
    "checks":["105 meldet Hitze, -1 Frost, 0 und 30 Normalbereich.", "50 ist erhöht; erst ein Wert größer als 50 ist Hitze."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "temperatur = 105.0\nif temperatur > 50:\n    print(\"WARNUNG: Hitze-Ausreißer erkannt (Möglicher Defekt)!\")\nelif temperatur < 0:\n    print(\"WARNUNG: Frost-Ausreißer erkannt!\")\nelif 0 <= temperatur <= 30:\n    print(\"Temperatur im Normalbereich.\")\nelse:\n    print(\"Erhöhte Temperatur, aber im Rahmen.\")", "explanation": "Die Reihenfolge schließt Hitze und Frost vor dem Normalbereich aus. Ändere die Starttemperatur für jeden Grenztest."}
  },
  {
    "id":"aufgabe-3-3",
    "number":"3.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"3.3 · Bedingungen mit and verbinden",
    "aliases":["3.3", "Bedingungen mit and verbinden"],
    "summary":"Warne nur bei Temperatur über 50 und aktivem Sensor.",
    "explanation":"Warne nur bei Temperatur über 50 und aktivem Sensor. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-3-1", "aufgabe-3-2"],
    "sources":["uebung-7"],
    "steps":["Verbinde den Temperaturvergleich mit ist_aktiv durch and.", "Teste beide Aktivzustände und die Grenztemperatur 50."],
    "hints":["and verlangt, dass beide Bedingungen wahr sind.", "Für einzelne bool-Werte ist and richtig; Arrays brauchen später &."],
    "checks":["Aktiv und 51 warnt.", "Inaktiv und 51 sowie aktiv und 50 warnen nicht."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "temperatur = 105.0\nist_aktiv = True\nif temperatur > 50 and ist_aktiv:\n    print(\"WARNUNG: Aktiver Sensor meldet Hitze!\")\nelse:\n    print(\"Keine Hitze-Warnung.\")", "explanation": "Beide Bedingungen müssen wahr sein. Ändere Temperatur und Aktivstatus einzeln, um ihren Einfluss zu prüfen."}
  },
  {
    "id":"aufgabe-4-1",
    "number":"4.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"4.1 · Heizprozess mit while",
    "aliases":["4.1", "Heizprozess mit while"],
    "summary":"Erhöhe die Raumtemperatur von 15.0 in Schritten von 2.5 bis mindestens 22.0.",
    "explanation":"Erhöhe die Raumtemperatur von 15.0 in Schritten von 2.5 bis mindestens 22.0. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-3"],
    "sources":["uebung-8"],
    "steps":["Initialisiere raum_temp vor der Schleife.", "Solange raum_temp kleiner als 22.0 ist: erst ausgeben, dann um 2.5 erhöhen.", "Gib die Abschlussmeldung außerhalb der Schleife aus."],
    "hints":["Die Erhöhung muss im Schleifenblock stehen.", "Die Zieltemperatur kann überschritten werden; die Bedingung verlangt nicht exakt 22.0."],
    "checks":["Die Schleife zeigt 15.0, 17.5, 20.0.", "Sie endet bei 22.5 und gibt genau einmal die Abschlussmeldung aus."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "raum_temp = 15.0\nwhile raum_temp < 22.0:\n    print(f\"Heize... aktuelle Temp: {raum_temp}\")\n    raum_temp += 2.5\nprint(\"Zieltemperatur erreicht.\")", "explanation": "Die Zustandsänderung sorgt dafür, dass die Abbruchbedingung erreicht wird."}
  },
  {
    "id":"aufgabe-4-2",
    "number":"4.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"4.2 · Quadrate mit range berechnen",
    "aliases":["4.2", "Quadrate mit range berechnen"],
    "summary":"Gib die Schritte 1 bis 5 mit ihrem Quadrat aus.",
    "explanation":"Gib die Schritte 1 bis 5 mit ihrem Quadrat aus. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-3"],
    "sources":["uebung-8"],
    "steps":["Verwende range mit Start 1 und einer ausgeschlossenen oberen Grenze.", "Berechne innerhalb der Schleife i ** 2."],
    "hints":["Die obere Grenze muss 6 sein.", "^ ist keine Potenzierung in Python."],
    "checks":["Fünf Zeilen mit den Quadraten 1, 4, 9, 16, 25 erscheinen."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "for i in range(1, 6):\n    print(f\"Sensor-Kalibrierungsschritt {i}: {i ** 2}\")", "explanation": "range stoppt vor 6; ** berechnet die Potenz."}
  },
  {
    "id":"aufgabe-4-3",
    "number":"4.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"4.3 · continue und break unterscheiden",
    "aliases":["4.3", "continue und break unterscheiden"],
    "summary":"Überspringe Schritt 3 und beende die Schleife vor der Rechnung für Schritt 5.",
    "explanation":"Überspringe Schritt 3 und beende die Schleife vor der Rechnung für Schritt 5. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-4-2"],
    "sources":["uebung-8"],
    "steps":["Kopiere die Schleife aus 4.2.", "Prüfe vor der Rechnung i == 3 und überspringe mit continue.", "Brich bei i == 5 mit break ab."],
    "hints":["continue wechselt zum nächsten Schleifendurchlauf.", "break beendet die ganze Schleife."],
    "checks":["Nur die Schritte 1, 2 und 4 erscheinen.", "Weder 3 noch 5 wird quadriert ausgegeben."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "for i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    print(f\"Sensor-Kalibrierungsschritt {i}: {i ** 2}\")", "explanation": "Beide Prüfungen stehen vor der Rechnung, damit die ausgeschlossenen Schritte nicht ausgegeben werden."}
  },
  {
    "id":"aufgabe-5-1",
    "number":"5.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"5.1 · Messwertliste verändern",
    "aliases":["5.1", "Messwertliste verändern"],
    "summary":"Ergänze 23.0 und entferne den bekannten Fehlerwert -5.0.",
    "explanation":"Ergänze 23.0 und entferne den bekannten Fehlerwert -5.0. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-3", "liste", "append"],
    "sources":["uebung-9"],
    "steps":["Lege die sieben vorgegebenen Messwerte als Liste an.", "Hänge 23.0 mit append an.", "Entferne -5.0 mit remove und gib Liste und Länge aus."],
    "hints":["remove entfernt einen Wert, keinen Index.", "Ein nicht vorhandener Wert löst ValueError aus."],
    "checks":["Die fertige Liste hat sieben Elemente und enthält kein -5.0."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "messwerte_liste = [22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 110.5]\nmesswerte_liste.append(23.0)\nmesswerte_liste.remove(-5.0)\nprint(\"Aktualisierte Liste:\", messwerte_liste)\nprint(\"Anzahl der Messwerte:\", len(messwerte_liste))", "explanation": "Nur der ausdrücklich genannte Kabelbruchwert wird entfernt. Die hohen Werte bleiben in dieser Aufgabe erhalten."}
  },
  {
    "id":"aufgabe-5-2",
    "number":"5.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"5.2 · Listensumme und Durchschnitt",
    "aliases":["5.2", "Listensumme und Durchschnitt"],
    "summary":"Berechne den Durchschnitt der Liste aus 5.1 mit einer eigenen Schleife.",
    "explanation":"Berechne den Durchschnitt der Liste aus 5.1 mit einer eigenen Schleife. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-5-1", "for", "mittelwert"],
    "sources":["uebung-9"],
    "steps":["Verwende die veränderte Liste aus 5.1.", "Setze gesamtsumme vor der Schleife auf 0 und addiere jeden Wert.", "Prüfe vor der Division, ob die Liste nicht leer ist."],
    "hints":["Initialisiere die Summe nicht in der Schleife.", "Hier sind die hohen Werte noch enthalten; dies ist keine Bereinigung wie in Modul 6."],
    "checks":["Die Summe entspricht allen sieben Werten.", "Eine leere Liste wird nicht durch ihre Länge dividiert."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "messwerte_liste = [22.5, 23.1, 105.0, 21.8, 24.0, 110.5, 23.0]\ngesamtsumme = 0\nfor wert in messwerte_liste:\n    gesamtsumme += wert\nif messwerte_liste:\n    durchschnitt = gesamtsumme / len(messwerte_liste)\n    print(f\"Durchschnitt: {durchschnitt:.2f}\")\nelse:\n    print(\"Keine Messwerte.\")", "explanation": "Die Summe wird zuerst vollständig berechnet, erst danach dividiert. Die Leerfallprüfung verhindert Division durch null."}
  },
  {
    "id":"aufgabe-5-3",
    "number":"5.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"5.3 · Sensor als Dictionary",
    "aliases":["5.3", "Sensor als Dictionary"],
    "summary":"Speichere benannte Sensoreigenschaften und lies Standort per Schlüssel.",
    "explanation":"Speichere benannte Sensoreigenschaften und lies Standort per Schlüssel. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["lektion-3"],
    "sources":["uebung-9"],
    "steps":["Lege sensor_dict mit ID, Standort, Temperatur und IstAktiv an.", "Greife mit dem Schlüssel Standort zu und formatiere den Satz."],
    "hints":["Schlüssel sind hier Zeichenketten.", "Groß- und Kleinschreibung des Schlüssels müssen passen."],
    "checks":["Die Ausgabe nennt Nordpark.", "Ein Zugriff auf einen fehlenden Schlüssel führt zu KeyError und darf nicht mit einem falschen Wert verdeckt werden."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "sensor_dict = {\"ID\": 1, \"Standort\": \"Nordpark\", \"Temperatur\": 22.5, \"IstAktiv\": True}\nprint(f\"Der analysierte Sensor befindet sich am Standort: {sensor_dict['Standort']}\")", "explanation": "Ein Dictionary ordnet Werte fachlichen Namen zu; seine Schlüssel sind keine Listenpositionen."}
  },
  {
    "id":"aufgabe-5-4",
    "number":"5.4",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"5.4 · Liste von Sensor-Dictionaries",
    "aliases":["5.4", "Liste von Sensor-Dictionaries"],
    "summary":"Laufe über zwei Sensor-Dictionaries und gib ihre Eigenschaften aus.",
    "explanation":"Laufe über zwei Sensor-Dictionaries und gib ihre Eigenschaften aus. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-5-3", "for"],
    "sources":["uebung-9"],
    "steps":["Erstelle zwei Dictionaries mit derselben Schlüsselstruktur in einer Liste.", "Durchlaufe die Liste und lies je ID, Standort und Temperatur.", "Formatiere den verlangten Satz für jeden Sensor."],
    "hints":["Die Schleifenvariable ist jeweils ein Dictionary.", "Die Werte des zweiten Sensors sind hier eigene Beispieldaten, weil die Aufgabe sie nicht festlegt."],
    "checks":["Zwei vollständige Sätze erscheinen.", "Beide IDs und Standorte sind den richtigen Temperaturen zugeordnet."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "sensoren = [\n    {\"ID\": 1, \"Standort\": \"Nordpark\", \"Temperatur\": 22.5},\n    {\"ID\": 2, \"Standort\": \"Labor\", \"Temperatur\": 21.0},\n]\nfor sensor in sensoren:\n    print(f\"Sensor {sensor['ID']} am Standort {sensor['Standort']} hat eine Temperatur von {sensor['Temperatur']}\")", "explanation": "Die Liste organisiert mehrere Datensätze; jedes Dictionary beschreibt einen Datensatz. Labor und 21.0 sind ausdrücklich eigene Ergänzungen."}
  },
  {
    "id":"aufgabe-7-1",
    "number":"7.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"7.1 · NumPy im richtigen Interpreter",
    "aliases":["7.1", "NumPy im richtigen Interpreter"],
    "summary":"Installiere NumPy in .venv und prüfe den Import.",
    "explanation":"Installiere NumPy in .venv und prüfe den Import. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-1-2", "lektion-4"],
    "sources":["uebung-12"],
    "steps":["Windows-Terminal: .\\.venv\\Scripts\\python.exe -m pip install numpy. macOS/Linux: ./.venv/bin/python -m pip install numpy.", "Führe den Import in main.py mit demselben Interpreter aus."],
    "hints":["python -m pip bindet pip an diesen Interpreter.", "NumPy ist ein Zusatzpaket; benenne dein Skript nicht numpy.py."],
    "checks":["Der Import funktioniert.", "np.__version__ zeigt die tatsächlich ausgewählte Paketversion."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nprint(np.__version__)", "explanation": "Die Versionsausgabe prüft den Import. Dieser Python-Code führt keine Paketinstallation aus."}
  },
  {
    "id":"aufgabe-7-2",
    "number":"7.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"7.2 · Bereinigte Liste als Array",
    "aliases":["7.2", "Bereinigte Liste als Array"],
    "summary":"Wandle gute_daten aus Modul 6 in ein NumPy-Array um.",
    "explanation":"Wandle gute_daten aus Modul 6 in ein NumPy-Array um. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-6-3", "aufgabe-7-1"],
    "sources":["uebung-12", "csv"],
    "steps":["Führe zuerst den Code 6.1–6.3 aus.", "Importiere NumPy und wandle gute_daten mit np.array um.", "Prüfe den Arraytyp."],
    "hints":["Das Array erhält Zahlen, keine Zahlentexte.", "Die hier zusätzlich enthaltene Lesevorbereitung macht die Lösung eigenständig ausführbar."],
    "checks":["daten_np ist ein ndarray.", "Die Werte stimmen mit gute_daten überein."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import csv\nimport numpy as np\nwith open(\"messdaten.csv\", encoding=\"utf-8\", newline=\"\") as datei:\n    roh = [float(zeile[\"Temperatur\"]) for zeile in csv.DictReader(datei)]\ngute_daten = [wert for wert in roh if 0 <= wert <= 50]\ndaten_np = np.array(gute_daten, dtype=float)\nprint(f\"Typ des NumPy Objekts: {type(daten_np)}\")", "explanation": "Die inklusive Grenze übernimmt ausdrücklich die Arbeitsannahme aus Modul 6. Die Aufgabe 8.2 verwendet dagegen > 0."},
    "notice":"Verwendet die vorhandene messdaten.csv mit der dokumentierten Modul-6-Arbeitsannahme; Original-Sollausgaben sind nicht bestätigt."
  },
  {
    "id":"aufgabe-7-3",
    "number":"7.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"7.3 · Alle Temperaturen vektorisieren",
    "aliases":["7.3", "Alle Temperaturen vektorisieren"],
    "summary":"Rechne das gesamte bereinigte Array ohne Python-Schleife in Fahrenheit um.",
    "explanation":"Rechne das gesamte bereinigte Array ohne Python-Schleife in Fahrenheit um. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-7-2"],
    "sources":["uebung-12", "csv"],
    "steps":["Erzeuge daten_np wie in 7.2.", "Rechne daten_np * 1.8 + 32 in einem Ausdruck.", "Gib das neue Array aus; das Celsius-Array bleibt erhalten."],
    "hints":["Die Operation wirkt auf jedes Element.", "Eine normale Liste * 2 wiederholt die Liste und führt keine solche Rechnung aus."],
    "checks":["Jeder Ergebniswert entspricht seinem Celsiuswert * 1.8 + 32.", "daten_np bleibt unverändert."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import csv\nimport numpy as np\nwith open(\"messdaten.csv\", encoding=\"utf-8\", newline=\"\") as datei:\n    roh = [float(zeile[\"Temperatur\"]) for zeile in csv.DictReader(datei)]\ngute_daten = [wert for wert in roh if 0 <= wert <= 50]\ndaten_np = np.array(gute_daten, dtype=float)\nprint(f\"Typ des NumPy Objekts: {type(daten_np)}\")\nfahrenheit_np = daten_np * 1.8 + 32\nprint(\"Fahrenheit Werte:\", fahrenheit_np)", "explanation": "NumPy führt die Rechnung elementweise aus; das Ergebnis ist ein neues Array."}
  },
  {
    "id":"aufgabe-8-1",
    "number":"8.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"8.1 · Rohdatenarray aus der Aufgabe",
    "aliases":["8.1", "Rohdatenarray aus der Aufgabe"],
    "summary":"Übernimm die 15 ausdrücklich abgedruckten Rohwerte aus Aufgabe 8.1.",
    "explanation":"Übernimm die 15 ausdrücklich abgedruckten Rohwerte aus Aufgabe 8.1. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-7-1"],
    "sources":["uebung-13"],
    "steps":["Importiere NumPy.", "Schreibe die Liste der Originalaufgabe einschließlich negativer und hoher Werte in np.array.", "Prüfe Länge und Reihenfolge."],
    "hints":["Hier wird das abgedruckte Array verwendet, nicht stillschweigend eine andere CSV.", "Ausreißer gehören zunächst zu den Rohdaten."],
    "checks":["Das Array hat 15 Werte.", "-5.0 und die drei Werte über 100 sind enthalten."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nprint(rohdaten_np)", "explanation": "Die Datenquelle ist die Zahlenliste auf PDF-S. 13. Die CSV-Abweichungen aus Modul 6 werden dadurch nicht aufgelöst."}
  },
  {
    "id":"aufgabe-8-2",
    "number":"8.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"8.2 · Originalmaske anwenden",
    "aliases":["8.2", "Originalmaske anwenden"],
    "summary":"Filtere mit > 0 und <= 50 genau nach dem Wortlaut dieser Aufgabe.",
    "explanation":"Filtere mit > 0 und <= 50 genau nach dem Wortlaut dieser Aufgabe. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-1"],
    "sources":["uebung-13"],
    "steps":["Erstelle beide Array-Vergleiche in eigenen Klammern.", "Verbinde sie mit &.", "Wende die Maske auf das Rohdatenarray an."],
    "hints":["and kann nicht zwei ganze Array-Wahrheitswerte verknüpfen.", "Hier ist 0 ausgeschlossen; Modul 6 hatte eine andere dokumentierte Annahme."],
    "checks":["Die Reihenfolge gültiger Werte bleibt erhalten.", "Der Grenztest 0, 50, 51 wählt nur 50."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nmaske_gueltig = (rohdaten_np > 0) & (rohdaten_np <= 50)\nbereinigte_daten_np = rohdaten_np[maske_gueltig]\nprint(bereinigte_daten_np)", "explanation": "Boolesche Maskierung wählt die Elemente mit True. Die Klammern halten die Vergleiche zusammen."}
  },
  {
    "id":"aufgabe-8-3",
    "number":"8.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"8.3 · Statistik mit NumPy",
    "aliases":["8.3", "Statistik mit NumPy"],
    "summary":"Berechne Mittelwert, Median und Standardabweichung des bereinigten Arrays.",
    "explanation":"Berechne Mittelwert, Median und Standardabweichung des bereinigten Arrays. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-2"],
    "sources":["uebung-13"],
    "steps":["Verwende die bereinigten Werte aus 8.2.", "Prüfe auf ein leeres Array.", "Berechne mean, median und std und runde nur die Ausgabe."],
    "hints":["np.std verwendet standardmäßig ddof=0.", "Gedruckte Sollwerte müssen zu den tatsächlich eingesetzten Daten passen."],
    "checks":["Vergleiche mit einer unabhängigen Standard-Python-Rechnung.", "Keine Kennzahlen für ein leeres Array als echte Messwerte ausgeben."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nmaske_gueltig = (rohdaten_np > 0) & (rohdaten_np <= 50)\nbereinigte_daten_np = rohdaten_np[maske_gueltig]\nif bereinigte_daten_np.size == 0:\n    raise ValueError(\"Keine gültigen Daten.\")\nmittelwert = float(np.mean(bereinigte_daten_np))\nmedian = float(np.median(bereinigte_daten_np))\nstandardabweichung = float(np.std(bereinigte_daten_np))\nprint(f\"Mittelwert: {mittelwert:.2f}\")\nprint(f\"Median: {median:.2f}\")\nprint(f\"Standardabweichung: {standardabweichung:.2f}\")", "explanation": "Für die abgedruckte Liste entstehen andere Werte als einige Sollausgaben im PDF. Das Original bleibt unverändert; der Test prüft die Rechnung an den tatsächlich verwendeten Zahlen."}
  },
  {
    "id":"aufgabe-9-1",
    "number":"9.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"9.1 · Matplotlib importieren",
    "aliases":["9.1", "Matplotlib importieren"],
    "summary":"Installiere Matplotlib in .venv und prüfe den Import.",
    "explanation":"Installiere Matplotlib in .venv und prüfe den Import. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-1-2"],
    "sources":["uebung-14"],
    "steps":["Installiere mit dem .venv-Interpreter -m pip install matplotlib.", "Importiere matplotlib.pyplot als plt im selben Interpreter."],
    "hints":["Der Installationsbefehl gehört ins Terminal.", "Eine grafische Anzeige benötigt lokal eine passende GUI; Notebooks zeigen Diagramme meist eingebettet."],
    "checks":["Der Import funktioniert ohne ModuleNotFoundError."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import matplotlib\nimport matplotlib.pyplot as plt\nprint(matplotlib.__version__)", "explanation": "Dieser Code prüft den Import; die Installation erfolgt über den beschriebenen Terminalbefehl."}
  },
  {
    "id":"aufgabe-9-2",
    "number":"9.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"9.2 · Rohdaten als Linie",
    "aliases":["9.2", "Rohdaten als Linie"],
    "summary":"Zeige die Rohwerte mit roter Linie, Markern und beschrifteten Achsen.",
    "explanation":"Zeige die Rohwerte mit roter Linie, Markern und beschrifteten Achsen. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-1", "aufgabe-9-1"],
    "sources":["uebung-14"],
    "steps":["Verwende das Rohdatenarray aus 8.1.", "Zeichne rot mit marker=\"o\".", "Beschrifte Titel, Messpunkt und Temperatur in °C und rufe show auf."],
    "hints":["Die x-Achse zählt hier Messpunkte, keine gemessene Zeit.", "Ausreißer bleiben zur Diagnose sichtbar."],
    "checks":["Die Linie hat 15 Messpunkte.", "Die Achsen sind beschriftet und die Werte unter 0 sowie über 100 sichtbar."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot(rohdaten_np, marker=\"o\", color=\"red\")\nax.set_title(\"Rohdaten mit Ausreißern\")\nax.set_xlabel(\"Messpunkt\")\nax.set_ylabel(\"Temperatur [°C]\")\nplt.tight_layout()\nplt.show()", "explanation": "Der Index dient als Messpunktnummer. Die Grafik bestätigt keine fachliche Fehlerursache."}
  },
  {
    "id":"aufgabe-9-3",
    "number":"9.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"9.3 · Vorher und nachher vergleichen",
    "aliases":["9.3", "Vorher und nachher vergleichen"],
    "summary":"Erstelle eine rote Rohdatenlinie und blaue bereinigte Balken nebeneinander.",
    "explanation":"Erstelle eine rote Rohdatenlinie und blaue bereinigte Balken nebeneinander. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-2", "aufgabe-9-2"],
    "sources":["uebung-14"],
    "steps":["Erstelle zwei Achsen mit subplots(1, 2).", "Zeichne links alle Rohwerte, rechts die bereinigten Werte.", "Beschrifte beide Diagramme und wende tight_layout an."],
    "hints":["ax.bar braucht passende x- und y-Folgen.", "Nach dem Filtern ist die neue Position nicht die ursprüngliche Messpunktnummer."],
    "checks":["Zwei Achsen sind vorhanden.", "Links 15 Punkte, rechts 11 Balken; beide Temperaturachsen sind beschriftet."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nmaske_gueltig = (rohdaten_np > 0) & (rohdaten_np <= 50)\nbereinigte_daten_np = rohdaten_np[maske_gueltig]\nimport matplotlib.pyplot as plt\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))\nax1.plot(rohdaten_np, marker=\"o\", color=\"red\")\nax1.set_title(\"Vorher: Rohdaten\")\nax1.set_xlabel(\"Ursprünglicher Messpunkt\")\nax1.set_ylabel(\"Temperatur [°C]\")\nax2.bar(range(len(bereinigte_daten_np)), bereinigte_daten_np, color=\"blue\")\nax2.set_title(\"Nachher: bereinigte Daten\")\nax2.set_xlabel(\"Position nach Filterung\")\nax2.set_ylabel(\"Temperatur [°C]\")\nplt.tight_layout()\nplt.show()", "explanation": "Die rechte x-Achse wird neu durchnummeriert. Die Darstellung folgt der Originalaufgabe, stellt aber keine gemeinsame Zeitachse her."}
  },
  {
    "id":"aufgabe-10-1",
    "number":"10.1",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"10.1 · Seaborn importieren",
    "aliases":["10.1", "Seaborn importieren"],
    "summary":"Installiere Seaborn in .venv und prüfe den Import.",
    "explanation":"Installiere Seaborn in .venv und prüfe den Import. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-9-1"],
    "sources":["uebung-15"],
    "steps":["Installiere mit dem .venv-Interpreter -m pip install seaborn.", "Importiere seaborn als sns."],
    "hints":["Seaborn baut auf Matplotlib auf."],
    "checks":["Der Import funktioniert im ausgewählten Interpreter."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import seaborn as sns\nprint(sns.__version__)", "explanation": "Die Versionsausgabe prüft den Import; Paketverwaltung bleibt im Terminal."}
  },
  {
    "id":"aufgabe-10-2",
    "number":"10.2",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"10.2 · Boxplot der Rohwerte",
    "aliases":["10.2", "Boxplot der Rohwerte"],
    "summary":"Zeige die Verteilung der unbereinigten Messwerte als Boxplot.",
    "explanation":"Zeige die Verteilung der unbereinigten Messwerte als Boxplot. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-1", "aufgabe-10-1"],
    "sources":["uebung-15"],
    "steps":["Aktiviere whitegrid und erzeuge eine neue Figure.", "Übergib die Rohwerte als y an sns.boxplot.", "Beschrifte Titel und Temperaturachse und zeige die Grafik."],
    "hints":["Ein Boxplot zeigt Median, Quartile und Whisker.", "Statistische Auffälligkeit ist nicht automatisch ein Defektnachweis."],
    "checks":["Der Boxplot verwendet alle 15 Rohwerte.", "Die hohen Werte und -5.0 sind statistisch auffällig."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import numpy as np\nrohdaten_np = np.array([22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0])\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nsns.set_theme(style=\"whitegrid\")\nfig, ax = plt.subplots()\nsns.boxplot(y=rohdaten_np, color=\"cyan\", ax=ax)\nax.set_title(\"Verteilung der Sensordaten inkl. Ausreißer\")\nax.set_ylabel(\"Temperatur [°C]\")\nplt.tight_layout()\nplt.show()", "explanation": "Die übliche Whiskerregel verwendet 1.5-mal den Interquartilsabstand. Eine fachliche Plausibilitätsgrenze wie 0 bis 50 ist eine andere Regel."}
  },
  {
    "id":"aufgabe-10-3",
    "number":"10.3",
    "kind":"Übung",
    "topic":"Originalaufgaben",
    "title":"10.3 · CSV bis zum finalen Report",
    "aliases":["10.3", "CSV bis zum finalen Report"],
    "summary":"Lies die vorhandene CSV, filtere sie und kombiniere Statistik, Boxplot und Histogramm.",
    "explanation":"Lies die vorhandene CSV, filtere sie und kombiniere Statistik, Boxplot und Histogramm. Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe.",
    "needs":["aufgabe-8-3", "aufgabe-10-2"],
    "sources":["uebung-15", "csv"],
    "steps":["Kopiere die unveränderte messdaten.csv in deinen Arbeitsordner.", "Lies die Temperaturspalte und bilde eine Maske nach Modul 8: > 0 und <= 50.", "Prüfe den Leerfall und gib Mittelwert sowie Median aus.", "Erstelle links einen Rohdaten-Boxplot und rechts ein Histogramm der bereinigten Werte."],
    "hints":["csv.DictReader liest benannte Spalten ohne zusätzliche CSV-Abhängigkeit.", "Beide Achsen müssen an die richtigen Seaborn-Aufrufe übergeben werden."],
    "checks":["Nur gültige Werte fließen in Statistik und Histogramm ein.", "Die Quelle bleibt bytegleich; zwei beschriftete Achsen werden erzeugt."],
    "solution":{"intro": "Eigene Musterlösung zur Originalaufgabe. Schreibe zuerst selbst und vergleiche erst danach.", "code": "import csv\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nwith open(\"messdaten.csv\", encoding=\"utf-8\", newline=\"\") as datei:\n    rohdaten_np = np.array([float(zeile[\"Temperatur\"]) for zeile in csv.DictReader(datei)])\nmaske_gueltig = (rohdaten_np > 0) & (rohdaten_np <= 50)\nbereinigte_daten_np = rohdaten_np[maske_gueltig]\nif bereinigte_daten_np.size == 0:\n    raise ValueError(\"Keine gültigen Messwerte.\")\nprint(f\"Mittelwert: {np.mean(bereinigte_daten_np):.2f}\")\nprint(f\"Median: {np.median(bereinigte_daten_np):.2f}\")\nsns.set_theme(style=\"whitegrid\")\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))\nsns.boxplot(y=rohdaten_np, color=\"cyan\", ax=ax1)\nax1.set_title(\"Rohdaten\")\nax1.set_ylabel(\"Temperatur [°C]\")\nsns.histplot(bereinigte_daten_np, ax=ax2)\nax2.set_title(\"Bereinigte Verteilung\")\nax2.set_xlabel(\"Temperatur [°C]\")\nax2.set_ylabel(\"Anzahl\")\nplt.tight_layout()\nplt.show()", "explanation": "Die vorhandene Datei wird ausdrücklich verwendet; ihre Zuordnung und abweichende Original-Sollausgaben bleiben unbestätigt. Ungültige Zahlentexte brechen sichtbar ab; der ursprüngliche CSV-Inhalt wird nicht geändert."}
  }
]);
