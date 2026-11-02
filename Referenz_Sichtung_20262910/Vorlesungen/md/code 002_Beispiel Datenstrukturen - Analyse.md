# code 002_Beispiel Datenstrukturen - Analyse

Quelle: ../../../Referenz/20262910_Coding und Digitalisierung/Vorlesungen _ Praesentationen/code 002_Beispiel Datenstrukturen - Analyse.pdf
Die Seitenzahlen unten sind PDF-Seiten, keine behaupteten Foliennummern.

## PDF-Seite 1

```text
Systematische Datenanalyse mit Python
Modul: Coding und Digitalisierung
8. Oktober 2026
Einführung
Dieses Dokument beschreibt schrittweise, wie ein Datensatz in Python analysiert wird.
Dabei wird zunächst die klassische Vorgehensweise mit Standard-Datentypen (Listen) und
Schleifen gezeigt und anschlieÿend der modernen, vektorbasierten Methode mit der Bibliothek numpy gegenübergestellt. Den Abschluss bildet die Visualisierung der Ergebnisse.
1 Datensatz erstellen
Wir beginnen mit der Erstellung eines einfachen Datensatzes in Form einer Liste. Dieser
enthält normale Messwerte sowie bewusst eingefügte Ausreiÿer.
1 # Datensatz : Normale Werte liegen ca. zwischen 20 und 30
2 # Ausreisser sind die Werte 105 und 110
3 daten = [23 , 25 , 22 , 26 , 24 , 23 , 105 , 25 , 27 , 24 , 110 , 26]
Listing 1: Datensatz mit Ausreiÿern erstellen
2 Analyse mit Standard-Python (Listen und Schleifen)
In reinem Python (ohne Zusatzbibliotheken) nutzen wir for-Schleifen, um die Ausreiÿer zu identizieren, herauszultern und im Anschluss statistische Kennzahlen wie den
Mittelwert und den Median zu berechnen.
1 # 1. Ausreisser suchen und filtern ( Schwellenwert > 50)
2 bereinigte_daten = []
3 ausreisser = []
4
5 for wert in daten :
6 if wert > 50:
7 ausreisser . append ( wert )
8 else :
9 bereinigte_daten . append ( wert )
10
11 # 2. Mittelwert ( Mean ) berechnen
12 summe = 0
13 for wert in bereinigte_daten :
14 summe += wert
15 mittelwert = summe / len ( bereinigte_daten )
16
17 # 3. Median berechnen
1
```

## PDF-Seite 2

```text
18 sortierte_daten = sorted ( bereinigte_daten )
19 n = len( sortierte_daten )
20 if n % 2 == 0:
21 median = ( sortierte_daten [ n //2 - 1] + sortierte_daten [ n //2]) / 2
22 else :
23 median = sortierte_daten [ n //2]
24
25 print ( f" Klassisch - Mittelwert : { mittelwert } , Median : { median }")
Listing 2: Ausreiÿer ltern und Kennzahlen berechnen
3 Analyse mit NumPy
Die Bibliothek numpy optimiert diesen Prozess durch Arrays und Vektorisierung. Aufwendige for-Schleifen entfallen komplett.
1 import numpy as np
2
3 daten_np = np . array ([23 , 25 , 22 , 26 , 24 , 23 , 105 , 25 , 27 , 24 , 110 , 26])
4
5 # 1. Ausreisser filtern mit Boolescher Maskierung
6 bereinigte_daten_np = daten_np [ daten_np <= 50]
7 ausreisser_np = daten_np [ daten_np > 50]
8
9 # 2. Statistische Kennzahlen direkt abrufen
10 mittelwert_np = np . mean ( bereinigte_daten_np )
11 median_np = np . median ( bereinigte_daten_np )
12
13 print ( f" NumPy - Mittelwert : { mittelwert_np } , Median : { median_np }")
Listing 3: Eziente Analyse ohne Schleifen
4 Visualisierung der Daten
Um die Auswirkungen der Ausreiÿer sowie den bereinigten Zustand darzustellen, visualisieren wir die Daten mit matplotlib. Wir zeigen den Trend der Originaldaten als Liniendiagramm und den bereinigten Datensatz als Balkendiagramm.
1 import matplotlib . pyplot as plt
2
3 # Zwei Subplots nebeneinander erstellen
4 fig , ( ax1 , ax2 ) = plt . subplots (1 , 2 , figsize =(12 , 5) )
5
6 # 1. Trend der Originaldaten ( mit Ausreissern )
7 ax1 . plot ( daten_np , marker ='o', color ='red ', linestyle ='-')
8 ax1 . set_title ('Trend der Originalmesswerte ')
9 ax1 . set_xlabel ('Index ')
10 ax1 . set_ylabel ('Messwert ')
11
12 # 2. Balkendiagramm der bereinigten Daten
13 indizes = range (len ( bereinigte_daten_np ) )
14 ax2 . bar ( indizes , bereinigte_daten_np , color ='blue ')
15 ax2 . set_title ('Bereinigte Messwerte ')
16 ax2 . set_xlabel ('Index ')
17 ax2 . set_ylabel ('Messwert ')
2
```

## PDF-Seite 3

```text
18
19 plt . tight_layout ()
20 plt . show ()
Listing 4: Trend und Balken mit Matplotlib
3
```
