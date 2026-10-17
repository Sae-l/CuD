# Das Lernwerkzeug benutzen

Die Startseite bietet **Vorlesungen**, **Übungen & Begleitung**, **Befehle nachschlagen**, **Python einrichten** und **VS Code einrichten**. Beginne mit der Einrichtung, bearbeite die erste Lektion und probiere die Beispiele selbst aus. Suche und Filter helfen dir, später einen bestimmten Befehl oder Fehler wiederzufinden.

Das Projekt hat zwei Einstiege: [index.html im Projektordner](../index.html) stellt den Lernraum vor; [Lernwerkzeug/index.html](index.html) öffnet ihn direkt. Im Lernraum wechseln Links wie [Vorlesungen](index.html#vorlesungen) oder [Übungen](index.html#uebung) den Inhalt innerhalb derselben Seite. Du kannst diese Adressen als Lesezeichen speichern. Mit **Zurück** und **Vorwärts** im Browser wechselst du zwischen besuchten Bereichen. Die getrennte Projektstartseite und der Lernraum gehören gemeinsam zum Offline-Paket.

## Auf deinem Gerät öffnen

### Windows und macOS

Lade das [vollständige Projekt-ZIP](https://github.com/Sae-l/CuD/archive/refs/heads/main.zip) herunter, entpacke es vollständig und öffne [index.html](index.html) im Browser. Du kannst auch `index.html` im übergeordneten Projektordner öffnen und **Lernraum öffnen** wählen. Öffne die Datei außerhalb der ZIP-Vorschau. **„Seite speichern“ im Browser** lädt die benötigten Dateien und Quellen nicht vollständig herunter. Die Webseite benötigt weder Node.js noch Python und funktioniert nach dem Download offline. Python brauchst du erst, um selbst Programme auszuführen; dafür gibt es die Einrichtungsanleitungen in der Webseite. Alle Dateien und die benachbarten Ordner `Referenz/` und `Referenz_Sichtung/` müssen zusammenbleiben.

### Handy und Tablet

Die Seite passt sich an schmale und breite Bildschirme an. Falls dein Dateimanager `index.html` nur als Vorschau anzeigt oder die benachbarten Dateien nicht lädt, nutze einen statischen HTTP-Server mit dem **gesamten Repository als Wurzel**. Diese Möglichkeit benötigt einen Rechner mit Python, auf dem das Repository liegt:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Führe den Befehl im Repository-Ordner aus; unter macOS gegebenenfalls `python3`, unter Windows `py -3` statt `python`. Öffne auf demselben Rechner `http://127.0.0.1:8000/Lernwerkzeug/`. Mit `Strg+C` beendest du den Server.

Für den Zugriff vom Handy oder Tablet im selben vertrauenswürdigen lokalen Netz starte den Server mit `--bind 0.0.0.0` und öffne `http://<lokale-IP-des-Rechners>:8000/Lernwerkzeug/`. Dabei wird der gesamte Repository-Ordner einschließlich der Kursunterlagen im lokalen Netz erreichbar; verwende keine öffentliche Portfreigabe. Der Zugriff hängt zusätzlich von Netzwerk und Firewall ab.

Auf iPad und Android ist die Desktop-Version von VS Code nicht auf dieselbe Weise installierbar. Die Python-Anleitung beschreibt Colab als externen Browserweg. Dafür brauchst du Internet und eine Google-Anmeldung; Code und hochgeladene Daten werden beim externen Dienst verarbeitet. Die Lernwebseite selbst führt keinen Python-Code aus und sendet keine automatischen externen Anfragen.

### Was wurde geprüft?

[Browserergebnisse](pruefung/kompatibilitaet.json) und [Prüfbericht](pruefung/PRUEFBERICHT.md) dokumentieren die automatisierten Prüfungen mit Chromium, Firefox und WebKit auf dem Prüfrechner sowie emulierten Handy- und Tabletgrößen. Das ist kein Nachweis für echte iOS-/Android-Geräte oder Safari auf macOS/iPadOS. Screenreader und tatsächliche Installationen bleiben offen. Ein gespeicherter Bericht gilt nur für den darin dokumentierten Stand.

Der zusätzliche [CI-Nachweis](pruefung/CI_NACHWEIS.json) hält die bestandene vollständige Windows-/Linux-Matrix am Verhaltensstand `74ba715` fest. Eine lokale Windows-Signatursperre betrifft die dort verwendete WebKit-Testkomponente; sie wird nicht durch Abschalten von Schutzregeln umgangen. Für die jeweilige Releaseversion gelten zusätzlich ihre konkreten GitHub-Actions-Läufe.

## Eine Übung bearbeiten

1. Öffne **Übungen & Begleitung**. Dort findest du alle Module. Für den CSV-Block wähle Aufgabe **6.1**, und speichere die verlinkte `messdaten.csv` in einem eigenen Übungsordner. Lege daneben `main.py` an.
2. Öffne den Übungsordner im Editor und starte dein Terminal darin. Schreibe und starte den Python-Code selbst.
3. Bearbeite 6.1–6.3 nacheinander. Die Variablen bauen aufeinander auf: `zeilen`, `gute_daten`, Kennzahlen. Du kannst den Code in derselben `main.py` ergänzen.
4. Öffne bei Bedarf zunächst einzelne Hinweise und erst danach die Musterlösung. Ein Seitenwechsel schließt Hinweise und Lösungen wieder.
5. Schließe die Lösung und schreibe den Ablauf mit eigenen Worten auf. [Lernkonzept](LERNKONZEPT.md) und [Gebrauchstest](GEBRAUCHSTEST.md) helfen beim nächsten Schritt.

Die Originalaufgabe nennt `sensor_messdaten_projekt.csv`, vorhanden ist `messdaten.csv`. Die Zuordnung ist nicht vom Kurs bestätigt; die gedruckten Sollzahlen stimmen mit dieser Datei nicht überein. Das Intervall **0 ≤ Temperatur ≤ 50** ist eine dokumentierte Arbeitsannahme. Ein Aktivitätsfilter kommt nicht hinzu.

Die einfachen CSV-Beispiele verwenden `split(",")` und sind auf die einfache Quelldatei begrenzt. Für zitierte Kommas ist das Standardmodul `csv` nötig. Leere Zeilen werden übersprungen; andere beschädigte Daten lösen in den Musterlösungen einen sichtbaren Fehler aus.

## Live-Übungen ohne Originaldatensatz bearbeiten

Die Seiten 003 · PDF-S. 18, 26 und 31 bieten **Synthetische live-mini.csv speichern** an. Speichere diese Datei neben dein Python-Programm und starte das Terminal in diesem Ordner. Die Musterlösungen verwenden diesen Dateinamen bereits. Installiere Pandas wie in der Python-Einrichtung beschrieben, falls es in deiner Umgebung fehlt.

Die Datei enthält drei selbst erstellte Messzeilen mit fünf Spalten. In der Pandas-Übung erhältst du 24.00 °C und zwei kritische Messpunkte. Nach dem Resampling entstehen die Temperaturwerte 22, 25, 28; die mittlere Rasterzeile ist geschätzt. Der Klassenreport meldet drei Rasterzeilen, zwei geschätzte Zellen und 25.0 °C.

Das sind Demoergebnisse. Sobald bb12024.csv vorliegt, prüfe Header, Trennzeichen, Einheiten, Zeitformat und Lücken. Ändere danach nur den Dateipfad im Aufruf auf die Originaldatei; die Originalkennzahlen müssen dann zusätzlich geprüft werden. Benenne die Demo niemals in bb12024.csv um. Das separate Transferprojekt verwendet weiterhin becken-mini.csv.

## Bedienung und Quellen

Auf schmalen Bildschirmen öffnest du die Bereiche mit **Lernnavigation öffnen**. Nach der Auswahl schließt sich das Menü; mit `Escape` kannst du es ebenfalls schließen. Mit `Tab` erreichst du Links und Eingabefelder; der erste Link springt zum Lerninhalt. Hinweise und Lösungen lassen sich mit der Tastatur öffnen. Breite Tabellen und Codefelder können seitlich gescrollt werden. Die Animationen berücksichtigen die Einstellung für reduzierte Bewegung.

Die Startseite bietet fünf direkte Lernzugänge, das kleine Python-Vorhersagebeispiel, manuell wechselbare Lerntipps und aufklappbare Hilfen. Schrift, Foto und Animationen werden aus `assets/` geladen; dieser Ordner gehört zum Offline-Paket. [Herkunft und Lizenzen](assets/README.md).

PDF-Verweise enthalten `#page=N`; ob der Betrachter direkt dorthin springt, hängt vom Browser ab. Verwendete Originalseiten sind zusätzlich als Bilder verlinkt. Manche Browser laden Markdown-Berichte herunter; du kannst sie im Editor lesen.

Jede Lektion enthält eine eigene Verständnisfrage. Wähle eine Antwort und drücke **Antwort prüfen**; die Rückmeldung erklärt den Grund. Wenn du danach eine andere Antwort auswählst, verschwindet die alte Bewertung. Prüfe die neue Auswahl erneut. Im kleinen Einstiegsquiz wird die zuletzt gewählte Antwort zusätzlich dunkel markiert. Schreibe danach die Miniübung selbst, bevor du **Ich habe die Miniübung selbst geschrieben und geprüft** markierst. **Weiterlernen** auf der Startseite führt zur ersten noch nicht markierten Etappe.

Die Bearbeitungsmarken werden nur im selben Browser unter `cud-lernfortschritt-v1` gespeichert. Sie werden nicht gesendet oder zwischen Geräten synchronisiert. Bei blockierter Speicherung bleibt die Bedienung erhalten und die Seite weist auf die Sitzung als Grenze hin. Im direkten Dateibetrieb kann das Speicherverhalten vom Browser und Dateipfad abhängen. Ein gelöstes Häkchen entfernt die jeweilige Marke. Die Marken sind deine Selbsteinschätzung und kein Nachweis des Lernnutzens.

Nach einem Update kann ein anderer entpackter Ordner oder der Wechsel zwischen Datei- und HTTP-Zugriff einen getrennten Speicherbereich verwenden. Bewahre deinen selbst geschriebenen Python-Code im eigenen Übungsordner auf; die Webseite speichert diesen Code nicht.

**Abdeckung & nächste Schritte** zeigt alle 31 Aufgaben aus dem vorhandenen Übungsblatt; alle 31 sind mit gestuften Hinweisen und Lösung begleitet. Vier Live-Übungen und die FFT-Lektion sind zusätzlich erreichbar. **Eigenes Mini-Projekt** verbindet CSV, Pandas und OOP mit einer herunterladbaren synthetischen `becken-mini.csv`. Diese Datei ersetzt keine fehlenden Originaldaten. Die genaue Einordnung steht in [ABDECKUNG.md](ABDECKUNG.md). Originalergebnisse für bb12024.csv, vollständige visuelle Quellenprüfung und Gebrauchstests bleiben offen.

## Entwicklung und Tests

Für das bloße Benutzen ist keine Entwicklungsumgebung nötig. Die reproduzierbare Einrichtung und alle Prüfaufrufe stehen in [CONTRIBUTING.md](../CONTRIBUTING.md). Ergebnisse liegen in [ergebnis.json](pruefung/ergebnis.json), [kompatibilitaet.json](pruefung/kompatibilitaet.json) und [PRUEFBERICHT.md](pruefung/PRUEFBERICHT.md).

Wie die beiden Webseiten, Inhaltsdaten und Prüfungen zusammenarbeiten und wie du neue Inhalte ergänzt, beschreibt [ERWEITERN.md](ERWEITERN.md). Ein erfolgreicher Funktionstest ersetzt keine Sichtprüfung der Gestaltung und keinen Gebrauchstest mit Lernenden.
