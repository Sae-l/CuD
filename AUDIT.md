# Review und Verbesserungen

Aktueller Stand: Version 0.2.0 mit 31 Aufgabenbegleitungen, vier Live-Übungen, FFT und automatischer Projektprüfung; siehe **Abschlusskorrektur 0.2.0** am Ende. Die folgenden bisherigen Abschnitte dokumentieren die erste Auditphase und deren damalige Git-Übernahme.

Stand: 15.10.2026. Geprüft und lokal umgesetzt im vorhandenen Lernwerkzeug. Die acht Originaldateien in `Referenz/` bleiben bytegleich. Die Auditphase erfolgte in einer Arbeitsablage ohne `.git`-Verzeichnis; Commit, Push und Pull Request sind eine nachfolgende, gesondert beauftragte Übernahme.

## Behobene Befunde

| Priorität | Befund | Umsetzung und Nachweis |
| --- | --- | --- |
| P2 | Suche entfernte Python-Operatoren; `<=`, `==` und `**` wurden wie eine leere Anfrage behandelt | Operatoren in der gemeinsamen Normalisierung erhalten; Regressionen in Hauptsuche und Befehlsübersicht |
| P2 | Ctrl-/Cmd-/Shift-/Alt-Klick veränderte die aktuelle Seite und schloss Lösungen | Modifizierte Klicks und bereits behandelte Ereignisse werden der nativen Browserbedienung überlassen |
| P2 | Scrollen erfolgte vor dem Aufbau der neuen Ansicht; Verlauf hatte keinen entsprechenden Scrollabschluss | Fokus und Scrollen nach dem Rendern, einschließlich gleicher Route und Zurück/Vorwärts |
| P2 | Scrollbarer Einstiegscode und Beispielausgaben waren nicht per Tab erreichbar | Codefelder fokussierbar; Tastaturprüfung in allen drei Engines |
| P2 | `PYTHONOPTIMIZE` konnte Python-Assertions im Prüflauf abschalten | Optimierung für den Testprozess deaktiviert; absichtlich falsche Sollausgabe scheitert auch unter `PYTHONOPTIMIZE=1` |
| P2 | Frühe Inhalts-/Python-Prüffehler hinterließen den Status RUNNING | Gemeinsamer Fehlerabschluss schreibt FAIL und setzt einen Fehlerstatus; fehlender Interpreter in isolierter Kopie geprüft |
| P3 | Mobil beanspruchte die vollständige Navigation viel Platz | Aufklappbare Navigation bis 760 Pixel, `aria-expanded`, automatische Schließung nach Auswahl, Escape und Fokusrückgabe |
| P3 | Kleine Select-Schrift und knappe Touchflächen | Mobile Selects mit 16 Pixeln; vergrößerte Bedienflächen für Filter, Hinweise und Beispielabfragen |
| P3 | Tests beschrieben hauptsächlich Pfade eines einzelnen Rechners; Manifestwerkzeug lag in einem ausgeschlossenen Arbeitsordner | Gepinnte npm-Abhängigkeit samt Lockdatei, Python-Testanforderungen, CONTRIBUTING und öffentlich enthaltenes `scripts/manifest.py` mit Selbsttest |

Kurze Einblendungen und Farbwechsel unterstützen den Seitenwechsel und die Bedienung. Sie werden nur bei `prefers-reduced-motion: no-preference` aktiviert; die Tests prüfen tatsächlich berechnete Animations- und Übergangseigenschaften bei reduzierter Bewegung.

## Team und Integrationsstand

Verwendeter Skill: `ecc:team-agent-orchestration`, installierte Version 2.2.3. Die Aufgaben wurden über klar getrennte Dateibereiche im gemeinsamen Arbeitsordner koordiniert. Ohne Git-Checkout gab es keine isolierten Branches; parallele Schreibzugriffe auf dieselbe Datei wurden vermieden.

| Aufgabe | Eigentümer | Zustand | Integrationsbedingung / Übergabe |
| --- | --- | --- | --- |
| Logik prüfen, Fehlerabschluss und Suchtests verbessern | `logic_audit` | Review abgeschlossen, lokal integriert | Unabhängiger Review; `pruefen.cjs` und isolierte Fehlerpfadtests bestehen |
| Bedienung prüfen, Besucher- und Beitragsdokumentation verbessern | `ux_audit` | Review abgeschlossen, lokal integriert | Findings durch Hauptagent bewertet, drei Dokumente auf Verweise geprüft |
| Oberfläche, Browsermatrix, Manifest und Gesamtintegration | Hauptagent | Review abgeschlossen, lokal integriert | Vollständiger Testlauf, Sichtprüfung der Screenshots und Integritätsprüfung |

Keine ausstehenden Agentenänderungen oder Mergekonflikte. Keine zusätzliche Automatisierung oder neuer gemeinsamer Skill erforderlich. Die anschließende GitHub-Übernahme erfolgt über den Branch `fix/learning-room-audit-compatibility` und einen Pull Request gegen `main`; die Nachweise dieses Berichts stammen aus der lokalen Auditphase.

## Nachweise

- [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md): Umfang und Grenzen der technischen Abnahme.
- [Inhalts- und Pythonergebnis](Lernwerkzeug/pruefung/ergebnis.json): 26 Lernbeispiele, 29 ergänzende Befehlsbeispiele, CSV-Pipeline samt Randfällen, 15 Suchfälle, 41 Ansichten, 65 lokale Verweise und acht Originalhashes.
- [Browsermatrix](Lernwerkzeug/pruefung/kompatibilitaet.json): drei Engines, sieben Fenstergrößen, 861 Ansichtsprüfungen; Touch-Emulation bei 390×844 und 768×1024; Fokus, Escape, Modifikatortasten, Verlauf, Operatorsuche und reduzierte Bewegung.
- [Prüfer-Regressionen](Lernwerkzeug/pruefung/pruefer-regression.json): fehlender Interpreter und falsche Sollausgabe bei gesetzter Python-Optimierung erzeugen FAIL statt eines scheinbaren Erfolgs.
- `python -m unittest discover -s scripts -p 'test_*.py'`: Manifest-Selbsttest für Byteänderungen, SHA-256, Git-Blob-Hash, gelöschte Dateien und ausgeschlossene Geheimnisse/Abhängigkeiten.
- [Manifest](PROJEKT_MANIFEST.json): aktualisierter Dateistand, geprüft mit `python scripts/manifest.py --check`.

`npm ci --ignore-scripts` wurde mit der Lockdatei ausgeführt. Der vollständige `npm test`-Aufruf benutzt diese lokal installierte Playwright-Version. Python wurde mit den vorhandenen gebündelten Paketen und den bestehenden Projekt-Testpaketen ausgeführt; eine neue virtuelle Umgebung wurde nicht aufgebaut. Die direkten Python-Testabhängigkeiten sind versioniert, ihre transitiven Abhängigkeiten nicht vollständig gesperrt.

## Kompatibilität und Grenzen

Auf Windows geprüft: Chromium 151.0.7922.34, Firefox 153.0 und Playwright-WebKit 26.5. Größen in CSS-Pixeln: 320×740, 390×844, 768×1024, 1024×768, 844×390, 1280×800 und 1440×1000. Alle Inhaltsansichten haben keinen horizontalen Seitenüberlauf; breite Tabellen und Codefelder behalten eigenes seitliches Scrollen.

Chromium wurde vollständig per `file://` und offline geprüft. Firefox konnte die lokale Startdatei öffnen. Die gemeinsame Browsermatrix lief über einen ausschließlich an 127.0.0.1 gebundenen Testserver mit gesperrten externen Anfragen. Die Navigation benötigt keine externen Ressourcen. Der Testserver liefert nur die fünf Webdateien; Quellenlinks und CSV-Downloads werden im separaten Inhaltsprüflauf am vollständigen lokalen Ordner geprüft.

Der Windows-Port von Playwright-WebKit meldete beim lokalen `file://`-Aufruf einen internen Fehler. Seine HTTP-Prüfung besteht; die Dateiöffnung ist ausdrücklich nicht bestätigt. Für mobile Geräte mit eingeschränktem Dateizugriff dokumentiert die [Bedienungsanleitung](Lernwerkzeug/README.md) die Bereitstellung des gesamten Repository-Ordners über HTTP. Ein laufender lokaler Server ist kein installierter Offline-Speicher auf dem Handy.

Echte Windows-/Mac-/iOS-/Android-Geräteinstallationen, tatsächliches Safari und Screenreader sind nicht abgenommen. Touch- und Größenemulation belegt Layout und Bedienpfade, keine Hardwareabnahme. WebKit ersetzt Safari nicht; diese Abgrenzung entspricht der [Playwright-Browserdokumentation](https://playwright.dev/docs/browsers). Die Animationen richten sich nach der [CSS-Einstellung für reduzierte Bewegung](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Ausführungsereignisse und offene Entscheidungen

Firefox konnte in der Codex-Sandbox seinen normalen Benutzer-Registry-Schlüssel nicht anlegen und brach beim Start ab. Der vollständige Lauf erfolgte anschließend außerhalb dieser Sandbox mit temporären Browserprofilen. Sicherheitsrichtlinien wurden nicht geändert. Die zusätzlichen Testbrowser wurden über die offizielle Playwright-CLI nur in `.upload-work/browsers/` heruntergeladen.

Ein versehentlicher Aufruf des Systembefehls `python` während des unabhängigen Reviews startete den Windows-Python-Manager. Dieser meldete ein automatisches Manager-Update auf 26.3; die anschließende Interpreter-Installation wurde nach einer fehlgeschlagenen Signaturprüfung nicht bestätigt. Weitere Tests verwendeten ausschließlich den absoluten Pfad des vorhandenen gebündelten Interpreters. Der Zustand des System-Managers wurde nicht weiter geändert oder vollständig nachgeprüft.

Offene Entscheidungen/Prüfungen: Eigentümer bestätigt die Zuordnung der CSV und die Rechte vor einer möglichen Veröffentlichung; Kursbetreuung klärt die abweichenden Sollausgaben und Filtergrenzen; reale Lernende führen den [Gebrauchstest](Lernwerkzeug/GEBRAUCHSTEST.md) aus. Diese Punkte blockieren weder lokale Layoutkorrekturen noch die dokumentierten Softwaretests. Sie erlauben jedoch keine Aussage über vollständige Kursabdeckung, Lernnutzen oder Freigabe zur Veröffentlichung.

## Nachprüfung: Lernen, Abdeckung und Erweiterbarkeit

Stand: 15.10.2026, Arbeitsfassung nach dem veröffentlichten v0.1.0. Die acht Originaldateien bleiben unverändert. Das Werkzeug erklärt die Hauptthemen aus Vorlesungen 001–003, reicht jedoch noch nicht als alleiniger vollständiger Kurs mit Begleitung aller Originalaufgaben. Das vorhandene Übungsblatt enthält 31 Aufgaben; nur 6.1–6.3 sind geführt begleitet. Vier Live-Übungen aus 003, fehlende bb12024.csv und FFT bleiben gesonderte Lücken. [Genauer Quellenabgleich](Lernwerkzeug/ABDECKUNG.md).

| Befund / Verbesserung | Umsetzung | Nachweis |
| --- | --- | --- |
| P2: Suche ignorierte die eigentlichen Erklärungsblöcke | Sichtbare Blöcke in den Index aufgenommen; Hinweise, Lösungen und Quizantworten bleiben ausgeschlossen | Suchfälle Docstring, Quartil und BeckenAnalyse zusätzlich zu den bisherigen Fällen |
| P2: Feste Neun-Lektionen-Annahmen erschwerten den Ausbau | Kurszahl, PDF-Liste, Reihenfolge, Voraussetzungen und Prüfzählung aus den Daten abgeleitet | Isolierte zusätzliche fiktive Lektion besteht mit zehn Fragen und 44 Ansichten; doppelte ID scheitert |
| P2: Neue unabhängige Übungen wären in die bestehende CSV-Prüfpipeline geraten | Pipeline auf drei benannte IDs begrenzt; unbekannte Lösungsobjekte ohne Testzuordnung lassen die Prüfung scheitern | Neuer Transfer-Prüffall läuft getrennt und prüft unabhängige Ergebnisse |
| P2: WebKit behielt im erweiterten Prüffall Animationen trotz aktivem Reduce-Mediazustand | Explizite CSS-Regel und synchronisierte HTML-Klasse schalten bei reduzierter Bewegung Animationen und Übergänge aus | WebKit-Probe und abschließende Browsermatrix prüfen berechnete Eigenschaften |
| Lernstand war schwer wiederzufinden | Freiwillige lokale Bearbeitungsmarken und Einstieg Weiterlernen | Setzen, Neuladen, Entfernen, ungültige Speicherstände und gesperrte Speicherung geprüft |
| Lektionen hatten keine interaktive Verständnisprüfung | Neun eigene Auswahlfragen mit begründeter Rückmeldung | Richtige und falsche Antworten geprüft; keine automatische Kompetenzmarke |
| Der Übergang von Einzelbegriffen zum Gesamtprogramm fehlte | Eigenes CSV-/Pandas-/OOP-Projekt mit synthetischen Mini-Daten | Korrekte Rasterwerte und Schätzmaske; leere Daten, Restlücken, ungültige Zeit und fehlende Spalte geprüft |
| Standardabweichung und Boxplot fehlten im Nachschlagewerk | Zwei Befehlsbeispiele und Erläuterung in Lektion 4 | Ausführung und Abgleich mit offiziellen API-Dokumentationen |
| Besucher konnten Abdeckung und Ausbau nur schwer einschätzen | Sichtbarer Abdeckungsplan, ERWEITERN.md, aktualisierte README und Beitragsanleitung | Aufgabeninventar gegen Textabschnitte abgeglichen; lokale Verweise geprüft |

Der leere Platzhalter `Test/Test` wurde entfernt. Die tatsächlichen Prüfungen bleiben nachvollziehbar unter `Lernwerkzeug/` und `scripts/`. Kein neues Framework, Backend, Konto oder Testpaket installiert. Die neuen Browsermarken speichern ausschließlich Inhalts-IDs lokal; sie werden nicht übertragen und sind keine Kompetenzmessung.

Aktuelle Nachweise: [ergebnis.json](Lernwerkzeug/pruefung/ergebnis.json), [kompatibilitaet.json](Lernwerkzeug/pruefung/kompatibilitaet.json), [erweiterung.json](Lernwerkzeug/pruefung/erweiterung.json) und [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md). Die fiktive Prüfetappe liegt ausschließlich in einer ausgeschlossenen lokalen Kopie und wird nicht als neue Vorlesung ausgeliefert. Die ursprünglichen Prüfer-Fehlerpfadnachweise dokumentieren weiterhin den vorherigen Auditstand.

Erweiterbarkeit ist damit für neue Vorlesungsetappen praktisch nachgewiesen. Neue unabhängige Aufgaben benötigen weiterhin fachlich passende Prüffälle und Quellenabgleich; bei wiederholten Aufgabennummern in verschiedenen Blättern muss die Zuordnung im Abdeckungsplan erweitert werden. [Erweiterungsvertrag und Grenzen](Lernwerkzeug/ERWEITERN.md). Der veröffentlichte Release bleibt unverändert; Lernnutzen und echte Geräte-/Screenreader-Abnahme bleiben offen.

## Abschlusskorrektur 0.2.0

Alle 31 Aufgaben des vorhandenen Übungsskripts erhalten konkrete Schritte, gestufte Hinweise, Checks und getrennte Musterlösungen. Die 28 neuen Lösungen sind mit unabhängigen Erwartungen geprüft; bestehende CSV-Lösungen bleiben in ihrer eigenen Pipeline. Ein erneuter Ordneraufbau erhält vorhandene main.py-Inhalte. Die frühen Bedingungsaufgaben verwenden bewusst noch keine Funktionen.

Vier Original-Live-Übungen sind begleitet. Die Originaldaten bb12024.csv fehlen weiterhin; die Tests verwenden getrennt benannte synthetische Dateien. Die sichere Mittelwertfunktion kennzeichnet den Leerfall mit None; Zeitreihen und Klassenreport begrenzen die Interpolation und lehnen Restlücken ab. Die zehnte Lektion erklärt FFT am eigenen deterministischen 50-Hz-Beispiel mit echtem Clipping; der widersprüchliche Originalcode bleibt unverändert.

Aufgaben-PDF-S. 5–15 und Vorlesung-003-PDF-S. 10, 18, 26, 31 wurden am gerenderten Original abgeglichen. Keine vollständige visuelle Abnahme aller Folien behauptet. Alle acht Originalhashes sind unverändert. Unterschiedliche Nullgrenzen, CSV-Dateinamen und widersprüchliche Sollzahlen bleiben sichtbar dokumentiert.

76 Ansichten, zehn Lernfragen und 49 Befehlsgruppen. Die Browsermatrix prüft 1596 Kombinationen aus Ansicht, Größe und Engine. Die Laufzeitversionen sind festgelegt, Testabhängigkeiten einschließlich transitiver Python-Pakete versioniert. Browserprofile wurden in den ausgeschlossenen Arbeitsordner verlegt. Der erste Firefox-Lauf in der Sandbox scheiterte am Benutzer-Registryzugriff; der anschließende vollständige Lauf nutzt normale temporäre Profile außerhalb der Sandbox. Schutzrichtlinien wurden nicht geändert.

GitHub-Konfiguration: geschützter main mit Windows-/Linux-Prüfung, minimale Workflow-Rechte, offizielle SHA-gepinnte Actions, Sicherheitswarnungen und Dependabot, Branchpflege sowie reproduzierbarer privater Release. [Einstellungen und Grenzen](REPOSITORY_SETTINGS.md). Das Release-ZIP wird aus dem Manifest aufgebaut und für jeden Eintrag bytegenau geprüft; Unit-Tests prüfen Wiederholbarkeit, Cache-/Geheimnisausschluss und Ablehnung ungeprüfter Änderungen.

Aktuelle Nachweise: [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md), ergebnis.json und kompatibilitaet.json. Alte Erweiterungs- und Fehlerpfadberichte dokumentieren ihren damaligen Stand. Echte Geräte, Screenreader, Anfänger-Gebrauchstest und Originaldatenprüfung bleiben offen.
