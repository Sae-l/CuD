# Prüfbericht 0.2.1

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
