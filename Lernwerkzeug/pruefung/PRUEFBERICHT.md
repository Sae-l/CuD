# Prüfbericht zum Lernraum

Stand: 15.10.2026. Aktuelle Arbeitsfassung nach Release v0.1.0. Maßgeblich sind die Prüfzeitpunkte und Statusfelder der JSON-Dateien; der veröffentlichte Release wird durch diese Berichte nicht geändert.

Ergebnis: **PASS**. Der vollständige Aufruf `npm test` hat Inhalts-/Python-Prüfung und Browsermatrix erfolgreich abgeschlossen. Die nachfolgende Umstellung zweier Zusatzquellen von Positionen auf stabile IDs wurde separat auf identische Kursdaten und korrektes Einfügen einer Etappe geprüft.

| Prüfung | Ergebnis |
| --- | --- |
| Python-Lernbeispiele | 26 Beispiele ausgeführt, feste Ausgaben abgeglichen |
| Ergänzende Befehle | 31 Beispiele einschließlich np.std und sns.boxplot ausgeführt; 46 Befehlsgruppen insgesamt |
| CSV-Pipeline | Originalaufgaben 6.1–6.3 gemeinsam ausgeführt, mit unabhängiger Auswertung verglichen; vorhandene Randfälle bestehen |
| Eigenes Transferprojekt | Synthetische CSV, unabhängige Rasterwerte und Schätzmaske geprüft; zwei getrennte Instanzen, Report vor Aufbereitung, leere Daten, lange Lücke, ungültige Zeit und fehlende Spalte geprüft |
| Suche | 18 Fälle, jetzt auch Begriffe aus Erklärungsblöcken; Hinweise, Lösungen und Quizantworten bleiben vom Index getrennt |
| Lernfragen | Neun Fragen mit richtiger und falscher Auswahl geprüft; die Antwort setzt keine Bearbeitungsmarke |
| Bearbeitungsmarken | Setzen, Neuladen, Weiterlernen und Entfernen geprüft; zusätzlich ungültiges JSON, anderes Datenformat, unbekannte IDs und blockierte Speicherung in allen drei Engines |
| Aufgabeninventar | 31 Aufgabennummern des vorhandenen Übungsblatts mit der Textfassung abgeglichen; drei Originalaufgaben geführt begleitet |
| Ansichten und Größen | 43 Ansichten × sieben Größen × drei Engines: 903 Prüfungen ohne horizontalen Seitenüberlauf |
| Touch und Tastatur | Navigation und Hinweise mit emuliertem Touch; Escape, Fokus, Codefelder, modifizierte Linkklicks und Verlauf geprüft |
| Reduzierte Bewegung | Explizite CSS-Regel und synchronisierte HTML-Klasse; berechnete Animationen und Übergänge bei aktivierter Emulation abgeschaltet |
| Lokale Verweise | 79 unterschiedliche lokale Verweise vorhanden; Original-CSV und synthetische CSV bytegleich heruntergeladen |
| Originaldateien | Alle acht SHA-256-Werte stimmen mit Referenz_Sichtung/manifest.json überein |
| Erweiterungsprobe | Zusätzliche fiktive Lektion: zehn Fragen und 44 Ansichten bestehen; doppelte ID scheitert; Zusatzquellen bleiben auch nach Einfügen einer Etappe richtig zugeordnet |

Maschinenlesbare Nachweise: [ergebnis.json](ergebnis.json), [kompatibilitaet.json](kompatibilitaet.json) und [erweiterung.json](erweiterung.json). [pruefer-regression.json](pruefer-regression.json) dokumentiert die zwei Fehlerpfadprüfungen aus der vorherigen Auditphase. Neue Lösungen ohne registrierten eigenen Python-Prüffall werden abgewiesen; unabhängige neue Originalaufgaben geraten nicht automatisch in die bestehende CSV-Pipeline.

## Umgebung und Sichtprüfung

Windows, Node.js 24.19.0, Python 3.12.14 und Playwright 1.62.1 mit den bereits vorhandenen Python-Testpaketen. Kein neues Paket oder Framework für diese Nachprüfung installiert. Geprüfte Engines: Chromium 151.0.7922.34, Firefox 153.0 und Playwright-WebKit 26.5. Größen in CSS-Pixeln: 320×740, 390×844, 768×1024, 1024×768, 844×390, 1280×800 und 1440×1000. Touch wurde zusätzlich bei 390×844 und 768×1024 emuliert.

Der Inhaltsprüflauf verwendet Chromium per file:// und offline. Die gemeinsame Matrix verwendet ausschließlich einen HTTP-Testserver an 127.0.0.1; externe Anfragen werden blockiert. Keine JavaScript-/Konsolenfehler und keine externen Anfragen in den Hauptansichten. Firefox öffnete die lokale Startdatei. Windows-WebKit scheiterte bei direkter Dateiöffnung; nur seine HTTP-Nutzung ist bestätigt.

Screenshots der Lernfragen `lerncheck-desktop.png` und `lerncheck-mobil.png` wurden visuell angesehen. Die bestehenden Start-, Vorlesungs-, Tabellen- und Übungsscreenshots sind durch den Prüflauf aktualisiert. Die fiktive Erweiterungsprobe bleibt im ausgeschlossenen Arbeitsordner und wird nicht als Kursinhalt ausgeliefert.

## Aussagegrenzen

Der [Abdeckungsplan](../ABDECKUNG.md) trennt kompakte Erklärungen, 31 Originalaufgaben, vier Live-Übungen aus Vorlesung 003 und das eigene Transferprojekt. Nur drei Originalaufgaben sind geführt begleitet. bb12024.csv fehlt weiterhin; das Transferprojekt erzeugt keine Originalergebnisse dafür. FFT bleibt als Lehrthema offen. Der Code der Begleitdatei wurde gelesen, aber nicht ausgeführt oder zu einer fachlich abgenommenen FFT-Lösung umgebaut.

Die Originalaufgaben 6.1–6.3 behalten die dokumentierten CSV-Widersprüche und die inklusive Filtergrenze als Arbeitsannahme. Der neue Projektcode begrenzt Interpolation, kennzeichnet Schätzungen und stoppt bei Restlücken. Das ist eine Miniübung, keine geprüfte Aufbereitung realer Prozessdaten.

Quellen wurden gezielt als Text und an ausgewählten Originalbildern abgeglichen; keine vollständige visuelle Folienprüfung behauptet. PDF-Ziele und Seitenanker sind vorhanden, interaktive Seitensprünge bleiben vom Betrachter abhängig. Diagrammcode wurde mit Agg ausgeführt; keine umfassende visuelle Abnahme aller Diagramme.

Echte Geräte, Safari auf Apple-Hardware, Screenreader, tatsächliche Python-/VS-Code-Installationen und Anfänger-Gebrauchstests bleiben offen. Bearbeitungsmarken sind lokale Selbsteinschätzungen. Technische Tests und Auswahlfragen belegen weder Lernerfolg noch vollständige Prüfungsvorbereitung.
