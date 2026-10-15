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
    explanation:"Addiere die bereinigten Werte und teile durch len(werte). Hier arbeiten wir mit Standard-Python und einer Schleife. np.mean gehört zu NumPy und kommt im späteren Modul vor; dieser Pilot benötigt es nicht.",
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
    steps:["Originalaufgaben: CuD_Uebung 01, PDF-Seiten 10–11; im Originalbild angesehen. 6.3 fordert Mittelwert, Minimum und Maximum, keinen Median.","Eigene Beispiele: kleine synthetische Daten, getrennt von den Kursdaten. Mit Standard-Python ausgeführt; der Prüfbericht nennt die Ergebnisse.","Musterlösungen: selbst erstellt, nur für die vorhandene CSV und das inklusive Intervall geprüft; standardmäßig geschlossen.","Abdeckung: 3 Übungen, 15 Lernbausteine, 5 Fehlerhilfen und 1 Arbeitsablauf. NumPy, Visualisierung, Pandas, Zeitreihen und OOP sind noch nicht aufbereitet.","Vollständiger Quellenindex und bekannte weitere Lücken stehen in Referenz_Sichtung. Insbesondere fehlt bb12024.csv weiterhin."], sources:["u10","u11","csv"]
  }
];
