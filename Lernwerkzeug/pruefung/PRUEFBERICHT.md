# Prüfbericht und Nachweisverlauf

## v0.4.0 Schritt 1: Übersetzungsvertrag, Design A und Englisch, 18.10.2026

Unveröffentlichter Entwicklungsstand. Übersetzungen liegen je Sprache in `uebersetzung-<code>.js` (deutscher Text → Übersetzung); `uebersetzbar.cjs` legt fest, welche Texte übersetzbar sind.

- PASS: `pruefen.cjs` mit neuen Übersetzungsprüfungen: Englisch vollständig (1052 Einträge), keine verwaisten Einträge, identische Platzhalter in allen fünf Sprachen, Glossarklammern für Englisch. Zusätzlich im Browser: alle 78 Ansichten auf Englisch ohne sichtbaren übersetzbaren deutschen Text; Titel, Auftragstexte und Code bleiben Deutsch.
- Rückübersetzung: 53 zufällige englische Texte (5 %) ohne Blick auf das Original ins Deutsche zurückübersetzt. 22 wortgleich, 30 nur stilistisch abweichend, 1 Sinnabweichung („Gestaltung & Weiterentwicklung“ → „Design & development“), korrigiert zu „Design & further development“.
- Sichtprüfung: Lernplan, Lektion 1, Übung 6.1 und Befehle auf Englisch bei 390 px hell und dunkel angesehen. 320 px: Kopfleiste nach Anpassung ohne Überlauf, auch mit dem längsten Sprachnamen.
- Offen: Arabisch, Türkisch, Persisch und Ukrainisch enthalten nur die übernommenen Einträge aus v4 und zeigen fehlende Texte auf Deutsch. Gegenlesen durch Muttersprachler steht aus.

## Lokaler Lernplan-Ausbau vom 17.10.2026

Der neue Entwicklungsstand ergänzt `#lernplan`, `#wiederholen`, Lektionssprünge und eine unabhängig prüfbare Terminregel in `lernstand.js`. Kein neuer Release, keine Veröffentlichung. Die gesicherten Ausgangsbytes von `app.js`, `index.html`, `styles.css`, `pruefen.cjs` und `kompatibilitaet.cjs` stimmen mit den am 17.10.2026 über die GitHub-Verbindung gelesenen Blob-SHAs von `Sae-l/CuD/main` überein. Im Arbeitsordner fehlt `.git`. [Entwicklungsplan](../../ENTWICKLUNGSPLAN.md).

- PASS: `pruefen.cjs`, 78 Ansichten, 18 Suchfälle, zehn Lernfragen, 27 Python-Beispiele, 34 Zusatzbefehlsbeispiele, alle 31 Originalaufgaben, vier Live-Lösungen und FFT. Acht Originalhashes unverändert, 120 lokale Links, keine externen Browseranfragen. [Maschinenbericht](ergebnis.json).
- PASS: Wiederholungsabstände 1/3/7/14/14 Tage mit fester Testuhr, Rücksetzen nach Fehler, kein Hochzählen vor Fälligkeit, ungültige Speicherformate und unbekannte IDs. Im Browser: vorhandene Bearbeitungsmarken, Wiederholungsrunde, Antwortwechsel, Persistenz, gesperrter Speicher mit Sitzungsbetrieb, vollständig bearbeiteter Kurs und Tastaturfokus der drei Lektionssprünge. Quizantworten verändern keine Bearbeitungsmarken.
- PASS: Chromium 156.0.8078.4 und WebKit 27.2, je 78 Ansichten in sieben Größen, insgesamt 1092 Layoutprüfungen. Menü, Verlauf, Tastatur, reduzierte Bewegung, Touch-Emulation und Offline-Einstieg geprüft. WebKit-Dateizugriff auf Windows bleibt wie bisher ungeprüft; die Matrix verwendet HTTP-Loopback. [Browserbericht](kompatibilitaet.json).
- FAIL der vollständigen Matrix: Firefox 1555 scheitert vor dem Seitenaufruf mit `nsIWindowsRegKey.create`, `0x80004005`, Prozessende `3221225477`. Dieser Lauf belegt keine konkrete Ursache im Anwendungscode und keine erneute Code-Integrity-Diagnose. Der Prüfer führt nach einem Engine-Fehler die übrigen Engines weiter aus, speichert pro Engine den Status und beendet die Gesamtmatrix weiterhin mit Exitcode 1.
- Sichtprüfung: Lernplan und gefüllte Wiederholungsansicht bei 390, 768 und 1440 px als Screenshots erzeugt; Desktop-Lernplan und mobile Wiederholung tatsächlich angesehen. Zusätzlich 320 px auf Überlauf geprüft. Auf dem Desktop stehen nächste Etappe und Lernrhythmus nebeneinander, auf kleinen Breiten untereinander; die Erklärfrage und eigene Aufgabe erscheinen vor der geschlossenen Selbstkontrolle. Screenshotpfade: `.upload-work/design-review/lernplan-{390,768,1440}.png` und `wiederholen-{390,768,1440}.png`.
- ECC Chrome DevTools: mobiler Lighthouse-Snapshot am Lernplan, Accessibility/Best Practices/SEO/Agentic Browsing je 100, 32 bestandene Audits, keine fehlgeschlagenen Audits. Nach Ergänzung des lokalen SVG-Favicons keine Konsolenfehler und ausschließlich lokale Ressourcen. Kein Performance- oder vollständiger WCAG-Nachweis. Rohbericht: `.upload-work/entwicklung-2026-10-17/lighthouse-lernplan.json`.
- PASS: unveränderter Obsidian-Vault mit 36 Notizen/257 Wikilinks, dokumentiertes Erweiterungsbeispiel für Lektion 11 und drei vorhandene Python-Unit-Tests für Vault, Manifest und Release. Mit explizitem gebündeltem Python und Temp-Ordner im Workspace ausgeführt.

Prüfumgebung: Node 24.19.0, Playwright 1.64.0, Python 3.12.14. Für die lokale Python-Prüfung wurden die vorhandenen Pakete verwendet: NumPy 2.3.5, Pandas 3.0.1, Matplotlib 3.11.2 und Seaborn 0.13.2. NumPy/Pandas weichen damit von `requirements-test.txt` ab; diese lokalen Ergebnisse ersetzen die gepinnte CI-Umgebung nicht. Keine Lerninhalte oder Python-Lösungen wurden für diesen Ausbau verändert.

Offen: aktuelle vollständige Windows-/Linux-CI einschließlich Firefox, echte Mobilgeräte/Safari, Screenreader und Gebrauchstest mit Studienanfängern. Keine neuen Originaldaten, keine vollständige erneute Folienprüfung. Frühere CI-Nachweise unten beziehen sich auf ihre damaligen Commits. Veröffentlichungsurteil nach ECC Browser QA: **DO NOT SHIP**, bis die vollständige aktuelle Browsermatrix bestätigt ist; der lokale Entwurf ist nutzbar und überprüfbar.

## Aktuelle Einordnung für v0.2.3

Die Bedienverbesserungen am Commit `74ba715c0042f3e399a33a50c882218dccd9d522` bestanden [Projektprüfung #31](https://github.com/Sae-l/CuD/actions/runs/39017560114) auf Windows und Linux. Je System bestanden Chromium 156.0.8078.4, Firefox 157.0 und WebKit 27.2 jeweils 76 Ansichten in sieben Größen: zusammen 3192 Layoutprüfungen. Auch Inhalts-/Pythonprüfung, Projektmanifest, Vaultprüfung und Manifest-/Release-Unit-Tests bestanden. Die regulären Browserkontexte meldeten null JavaScript-Fehler und externe Laufzeitanfragen. [CI_NACHWEIS.json](CI_NACHWEIS.json) nennt Quellcommit, Jobs und Artefakt-Hashes.

Der gespeicherte lokale Windows-Bericht bleibt wegen der unten belegten Signatursperre FAIL. Die folgenden Abschnitte sind datierte historische Nachweise ihrer jeweiligen Eingaben. Sie werden durch den CI-Erfolg weder umgeschrieben noch als erneute lokale Ausführung ausgegeben. Version 0.2.3 ergänzt Dokumentation und Versionskennzeichnung; ihr finaler Commit muss die vorgeschriebenen CI-Prüfungen erneut bestehen. Der Tag-Workflow wiederholt die vollständige Linux-Browsermatrix vor dem Paketbau. Tag, Release-Dateien und Pages-Deployment werden gesondert zurückgelesen.

Eine lokale Headless-Chromium-Stichprobe beim skriptgesteuerten Scrollen umfasste 180 Frame-Callback-Abstände je Oberfläche bei 1440×900px. Median rund 16,7ms, keine Abstände über 50ms und keine gemeldeten Long Tasks. Das ist keine Messung der GPU-Präsentation, realer Mobilgeräte oder des Lernnutzens.

## Ausgangsstand 0.2.1

Stand: 15.10.2026. Gemeinsame Fassung aus Datenkorrektur, fertiger Gestaltung und aktualisierten Testabhängigkeiten. Ergebnisse gelten jeweils für die im Bericht dokumentierte Umgebung und den zugehörigen Quellstand. GitHub Actions liefert eigene Windows-/Linux-Nachweise am PR- und Release-Commit.

## Download- und Dateibetrieb: Reparatur vom 16.10.2026

Der Fehler wurde mit dem tatsächlich veröffentlichten ZIP v0.2.1 reproduziert: Der Klick auf „Lernraum öffnen“ führte im Offline-Dateibetrieb zu `Lernwerkzeug/` statt zum Lernraum. Die direkte HTML-Datei funktionierte. Alle vier Einstiege verweisen jetzt auf `Lernwerkzeug/index.html`; der Download führt unmittelbar zum vollständigen aktuellen Projekt-ZIP statt zur älteren Release-Übersicht. Die Startanleitung erklärt vollständiges Entpacken und die Grenze von „Seite speichern“. Abdeckungsplan und Gestaltungshinweise sind lokal verlinkt; alte Repository-URLs im Einstieg wurden berichtigt.

- PASS: Offline-Einstieg über die übergeordnete Startseite; alle vier Lernraum-Verweise und beide lokalen Dokumentationsverweise führen zu Dateien. Keine externen Browseranfragen. Die bestehenden Prüfungen umfassen 76 Ansichten, 18 Suchfälle, zehn Quizfragen, Fortschrittsspeicherung, 117 lokale Verweise, CSV-Downloads, alle 31 Aufgabenlösungen und acht unveränderte Originalhashes.
- PASS: Chromium 156.0.8078.4, 76 Ansichten in sieben Größen (532 Layoutprüfungen), zusätzlich Desktop- und Mobilmenü der Startseite unter dem simulierten Pages-Pfad `/CuD/`. Bild, Meta-Beschreibung, H1, relative Navigation und Seitenbreite sind geprüft.
- PASS: Manifest-/Release-Unit-Tests und Obsidian-Vaultprüfung samt Regressionstest. Der Paketbau prüft vollständige ZIP-Einträge und SHA-256-Werte. Die frisch entpackte Kopie wird mit demselben Offline-Inhalts- und Browsertest geprüft.
- Lokal blockiert: Firefox 1555 wird bereits beim Start von Windows Code Integrity gesperrt (Ereignisse 3077/3033 vom 16.10.2026). `kompatibilitaet.json` enthält deshalb ehrlich `FAIL` mit dem bestandenen Chromium-Teil; Firefox und WebKit sind in diesem Reparaturlauf nicht bestätigt. Keine Schutzrichtlinie wurde geändert. Die komplette Matrix bleibt im Windows-/Linux-CI vorgeschrieben.

SEO-Prüfumfang gemäß `ecc:seo`: konkrete interne Dateiverweise, mobiler Einstieg, H1 und vorhandene Meta-Beschreibung. Keine Suchmaschinenpositionen oder gemessenen Core Web Vitals werden daraus abgeleitet. Echte iOS-/Android-Geräte und Safari auf Apple-Hardware sind weiter ungeprüft.

## Lokale Vorprüfung

- PASS: 27 Python-Lernbeispiele, 34 zusätzliche Befehlsbeispiele, alle 31 Aufgabenlösungen/Kontrollprogramme, vier Live-Lösungen und FFT. Drei unveränderte Demo-Hauptprogramme werden mit der tatsächlich ausgelieferten live-mini.csv ausgeführt; ihre Ergebnisse werden unabhängig erwartet.
- PASS: Zehn Lernfragen, 18 Suchfälle, 76 Ansichten, 49 Befehlsgruppen, Fortschritts- und Fehlerfälle sowie 117 lokale Verweise. Original- und Demo-CSV-Downloads werden bytegenau verglichen. Null externe Browseranfragen; acht Originalhashes unverändert.
- PASS: Zwei Unit-Tests zu Manifeständerungen/-ausschlüssen und reproduzierbaren ZIP-Bytes einschließlich Ablehnung ungeprüfter Änderungen und falscher Version.
- PASS: Chromium 156.0.8078.4 und Firefox 157.0, jeweils 76 Ansichten in sieben Größen, einschließlich Touch-Emulation, Tastatur, Fokus, Verlauf, Modifikatortasten, Speicherung und reduzierter Bewegung.
- Lokal blockiert: Playwright-WebKit 27.2. Windows-Code-Integrity-Ereignisse 3077/3033 bestätigen die Sperre der mitgelieferten libwebp.dll und libpng16.dll. Keine Schutzrichtlinie wurde geändert. Dieser lokale Lauf ist kein bestandener WebKit-Nachweis; die endgültige Dreiermatrix muss auf GitHub Windows und Linux bestehen.

Die ursprüngliche Design-Prüfung bestand zuvor auf Playwright 1.62.1 in drei Engines. Sie ersetzt nicht die gemeinsame Prüfung mit Playwright 1.64.0. Aktuelle Testpakete: NumPy 2.5.4, Pandas 3.0.6 und die weiteren festen Versionen in requirements-test.txt; Node 24 und Python 3.12.

## Gestaltung und Browsermatrix

Outfit, Foto, GSAP und ScrollTrigger liegen lokal samt Herkunft und Lizenzhinweisen. Sechs Gestaltungsdateien wurden gegen die SHA-256-Werte in assets/sources.json geprüft. Die Matrix prüft geladene Schrift, aktive lokale Bibliotheken, höchstens dreizeilige Hauptüberschrift, Lerntippwechsel einschließlich Rückwärtssprung, gegenseitiges Schließen der Hilfefelder und Aufräumen der ScrollTrigger bei Seitenwechseln. Reduzierte Bewegung erhält sichtbare Inhalte ohne ScrollTrigger, Bildtransformation oder angeheftete Karten.

Größen in CSS-Pixeln: 320×740, 390×844, 768×1024, 1024×768, 844×390, 1280×800, 1440×1000. Die vollständige Matrix umfasst 76 × 7 × 3 = 1596 Layoutprüfungen. Sie nutzt HTTP an 127.0.0.1 und sperrt externe Anfragen. Chromium prüft zusätzlich den Offline-Dateibetrieb. Windows-WebKit-Dateiöffnung bleibt unbestätigt; die Windows-WebKit-Matrix verwendet HTTP.

Die neue Firefox-Version meldete bei der schnellen Gesamtmatrix ausdrücklich „Too many attempts to navigate or modify history within a short timeframe.“ Ein Neuladen derselben Seite setzte den Zähler nicht zuverlässig zurück. Jede Größe beginnt jetzt in einem neuen Tab desselben Kontexts; sämtliche Ansichten, Größen und Interaktionstests bleiben enthalten. Die Zustandsdiagnose nennt Engine, Ziel, aktuellen Hash und Titel. [Mozilla-Quellmeldung](https://github.com/mozilla-l10n/firefox-l10n-source/blob/main/dom/chrome/dom/dom.properties). Screenshots warten auf das Ende der Einblendung, damit sichtbare Textinhalte statt Zwischenstände dokumentiert werden.

## Fachlicher Umfang und Grenzen

Alle Aufgabenseiten des vorhandenen Übungsskripts PDF-S. 5–15 und vier Live-Aufgabenseiten aus Vorlesung 003, PDF-S. 10, 18, 26, 31 wurden im Vorgängerstand am gerenderten Original abgeglichen. Die unveränderten Originalhashes sichern ihre Übernahme. Das bestätigt keine vollständige visuelle Abnahme aller 80 unterschiedlichen PDF-Seiten.

bb12024.csv fehlt. Die drei betroffenen Live-Übungen sind mit einem ausdrücklich synthetischen Download bearbeitbar; ihre gedruckten Originalkennzahlen bleiben unbestätigt. CSV-Zuordnung, Sollzahlen und Filtergrenzen stehen im Abdeckungsplan. Interpolation liefert Schätzungen unter einer didaktischen Annahme. Technischer Release und fachliche Kursfreigabe sind getrennt: Echte Geräte, Safari auf Apple-Hardware, Screenreader, tatsächliche Geräteinstallation und Lernerfolg mit Anfängern bleiben ungeprüft. [Abdeckungsplan](../ABDECKUNG.md).

## Gestaltung und Bedienung v0.2.2: 17.10.2026

Ausgangsvergleich: Die lokale Ablage enthielt das ältere CSS vor PR #8; `main` auf `c0841f9` enthielt die veröffentlichte Gestaltung bereits. Lokal wurde sie wiederhergestellt. Eine eingeschränkte Dateiliste verhindert, dass ältere Dokumente, Workflows oder persönliche Obsidian-Einstellungen unbemerkt auf `main` zurückgeschrieben werden.

- Chromium 156.0.8078.4 und Firefox 157.0: je 76 Routen in sieben Größen = insgesamt 1064 Layoutprüfungen; zusätzlich die Root-Seite bei 320, 390, 768 und 1440px sowie 640×320 im Querformat. Signaturen, gerundete Navigation, Menüfokus, Tab-Schleife, Escape, Hintergrundsperre und Größenwechsel sowie Navigation ohne JavaScript und reduzierte Bewegung bestanden.
- Inhalt/Python/Dateibetrieb: 27 Lernbeispiele, 34 Befehlsbeispiele, 28 getrennte Aufgabenlösungen, vier Live-Übungen, FFT, zehn Lernfragen, 18 Suchfälle und 118 lokale Verweise bestanden. Die gemeinsame CSV-Pipeline begleitet zusätzlich Aufgaben 6.1–6.3. Acht Originalhashes unverändert, null externe Laufzeitanfragen. Direkte Einstiege aus dem entpackten Root-Dokument bleiben geprüft.
- Gerenderte Prüfung beider Oberflächen bei 390×844, 768×1024 und 1440×900: Hierarchie, Textumbruch, Fokus, lokale Bilder und Aktionsflächen geprüft. Zusätzlich leere Suche, unbekannter Anker, korrekte Quizrückmeldung, fehlende Originaldaten und Sitzungsspeicherung bei blockiertem Storage. Private Vergleichsbilder und Skill-JSON bleiben lokal, werden nicht veröffentlicht und sind keine öffentlichen Prüfanlagen.
- Chrome-Lighthouse-Snapshot: Vorstellungsseite und Lernraum jeweils 100 für Accessibility und Best Practices. Das ist ein automatischer Ausschnitt, kein vollständiger WCAG-Nachweis und keine Performancemessung.
- Der erste Sandbox-Lauf scheiterte beim Firefox-Start an `nsIWindowsRegKey.create`. Mit gewöhnlichen Windows-Rechten bestanden Chromium und Firefox einschließlich aller Regressionen; WebKit beendet sich weiterhin vor Seitenöffnung mit `0xC0E90002`. Der lokale Gesamtbericht bleibt deshalb FAIL mit zwei bestandenen Engines. Der CI-Erfolg wird separat am konkreten PR-/Release-Commit in GitHub Actions geprüft. Es wurden keine Sicherheitsregeln gelockert.

Die regulären älteren Screenshots in diesem Ordner bleiben historische Nachweise ihres damaligen Standes. Diese Reparatur fügt keine privaten Designbilder zum Repository hinzu. Echte Hardware, Safari auf Apple-Geräten, Screenreader und Anfänger-Lernnutzen bleiben offen. Der [Audit](../../AUDIT.md) erklärt die Ursache; [CONTRIBUTING](../../CONTRIBUTING.md) beschreibt sichere Weiterentwicklung.

## Animation und Bedienfeedback: 17.10.2026

Die vier betroffenen UI-/Browserprüfdateien stimmten vor der Bearbeitung anhand ihrer Git-Blob-Hashes mit GitHub `main` auf `d8de421aa1e59ff3e74830d9b39d7831c343645e` überein. Die folgenden Änderungen sind lokal geprüft; ein neues Deployment oder eine neue CI-Ausführung ist damit nicht belegt.

| Befund | Änderung |
| --- | --- |
| Nach einem Antwortwechsel stand die alte Quizbewertung weiter da. | Ein Auswahlwechsel entfernt die Bewertung bis zur nächsten Prüfung. |
| Im Einstiegsquiz war die gewählte Antwort nicht erkennbar. | Die Auswahl erhält einen dunklen Zustand und `aria-pressed`; Feedback bleibt als Text erhalten. |
| Änderungen der Bearbeitungsmarke erzeugten keinen eindeutigen Statustext. | Markiert/nicht markiert wird ausdrücklich im vorhandenen Statusbereich genannt. |
| Navigation, Filter, Suchvorschläge und Hilfsüberschriften waren teilweise nur 26–40px hoch. | Diese Bedienelemente sind nun mindestens 44px hoch. Feld- und Antwortgrenzen erhalten stärkeren Kontrast. |
| Lange Übergänge und Hover-Bewegungen erschwerten unmittelbares Bedienfeedback. | Bedienübergänge überwiegend 160–240ms; dekorative Hover-Transformationen nur mit Mauszeiger. Bei reduzierter Bewegung bleibt auch ein gedrückter Startseitenbutton ohne Zoom. |

Bestanden: Inhalts-/Pythonprüfung mit 27 Lernbeispielen, 34 Befehlsbeispielen, 31 Originalaufgaben einschließlich CSV-Pipeline, vier Live-Übungen, FFT, zehn Lernfragen, 18 Suchfällen, 118 lokalen Verweisen und acht unveränderten Originalhashes. Zwei Manifest-/Release-Unit-Tests bestanden. Verwendete lokale Laufzeit: Node 24.20.0 und Python 3.14.7; die im Projekt vorgegebene Python-3.12-CI wurde in diesem Durchgang nicht ausgeführt.

Chromium 156.0.8078.4 und Firefox 157.0 bestanden jeweils 76 Ansichten in sieben Größen, zusammen 1064 Layoutprüfungen. Zusätzlich bestanden die bisherigen Menü-, Fokus-, Touch-, Speicher- und Reduced-Motion-Prüfungen sowie neue Regressionen für Auswahlzustände, Antwortwechsel, Statusmeldungen und 44px-Ziele. Mit absichtlich blockierten GSAP-/ScrollTrigger-Dateien blieben Inhalt, Einstiegsquiz und Navigation benutzbar. HTML-artiger Suchtext blieb Text. In diesen regulären Browserkontexten wurden keine JavaScript-Fehler oder externen Laufzeitanfragen festgestellt.

Der erste Sandbox-Lauf scheiterte an Firefox' Testprofilzugriff. Mit normalen Windows-Rechten bestanden Chromium und Firefox. WebKit 27.2 schloss sich jedoch vor der ersten Seitenöffnung (`browserContext.newPage: Target page, context or browser has been closed`). `kompatibilitaet.json` und der gesamte `npm test`-Aufruf bleiben deshalb ausdrücklich FAIL; es gibt keinen aktuellen WebKit-Nachweis. Schutzrichtlinien wurden nicht verändert.

Gerenderte Vorher-/Nachher-Prüfung beider Oberflächen bei 390, 768 und 1440px: kein horizontaler Seitenüberlauf, Hauptüberschriften mit zwei bis drei Zeilen und keine verbleibenden zu niedrigen Ziele in der geprüften Navigation sowie den Buttons, Filtern und Hilfsüberschriften. Stichproben aus berechneten Browserfarben: ausgewählte Antwort 14,74:1 Textkontrast; korrekte Rückmeldung 13,30:1; Feldgrenzen 3,72:1 gegenüber ihrer Umgebung. Diese Stichproben sind keine vollständige WCAG-Abnahme oder Screenreader-Prüfung. Private Vergleichsbilder und der genaue Skill-/Werkzeugnachweis bleiben unter `.upload-work/design-review/2026-10-17-feedback/`.

Die sechs lokalen Gestaltungsdateien entsprechen weiterhin `assets/sources.json`. `npm audit` meldete null bekannte Schwachstellen für die installierten npm-Pakete. Die zusätzliche npm-Advisory-Abfrage für das separat eingebundene GSAP 3.15.0 lieferte keine Einträge. Das sind zeitgebundene Datenbankabfragen und Integritätsnachweise, kein vollständiger Sicherheitsnachweis. Keine neue Abhängigkeit, externe Gestaltungsladung oder Geräte-Vibration wurde ergänzt. Reale Mobilgeräte, Safari, assistive Technik, gemessene Framerate und Lernnutzen bleiben offen.

### Eingegrenzte WebKit-Ursache

Ein Minimaltest vom 17.10.2026 öffnet nur eine neue WebKit-Seite und setzt eine Überschrift, ohne Anwendungsdateien oder GSAP. Schon `browserContext.newPage()` scheitert. Die zeitgleichen Windows-Code-Integrity-Ereignisse 3077 und 3033 um 10:26:12 Uhr (Europe/Berlin) nennen ausdrücklich `webkit-2370/WebKitWebProcess.exe`, das die geltenden Signaturanforderungen nicht erfüllt. Damit ist die lokale Laufzeitsperre belegt; dieser Abbruch stammt nicht aus dem Lernwerkzeug. Es wurden keine Freigaben, Ausnahmen, älteren Browserpakete oder Schutzlockerungen eingerichtet.

Ein unabhängiger Agent prüfte die vier UI-/Browserprüfdeltas lesend und fand keine belegte neue Produktregression. Seine Testhinweise wurden aufgenommen: Die ausgewählten Ziele werden jetzt auf mindestens 44×44px geprüft; externe Request-Versuche werden auch im Kontext mit ausgefallener Animationsbibliothek gezählt. Diese Stichprobe deckt nicht alle Inline-Links und Zielabstände ab. Die unveränderte Windows-/Linux-CI verlangt weiterhin alle drei Browser; ihre Ergebnisse sind getrennt vom lokalen Windows-Bericht zu beurteilen.
