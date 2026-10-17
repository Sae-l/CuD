# CuD-1 · Programmieren lernen

Ein lokales Lernwerkzeug für Studierende im Kurs **Coding und Digitalisierung**, auch ohne Programmierkenntnisse: verständliche Vorlesungsetappen, eine Befehlsübersicht, Einrichtungsanleitungen und Begleitung zu allen 31 Aufgaben des vorhandenen Übungsskripts.

Version **0.2.3** begleitet alle 31 Aufgaben des vorhandenen Übungsskripts, vier Live-Übungen und zehn Lernetappen einschließlich FFT. Lernkontrollen, lokale Bearbeitungsmarken und ein eigenes Transferprojekt helfen beim Üben. Die Wartungsausgabe verbessert Quizfeedback, Bedienflächen und Animationen.

**Aufgabe → benötigtes Wissen → passender Befehl → selbst ausprobieren → Ergebnis prüfen**

## In drei Schritten starten

1. Lade das [vollständige Projekt-ZIP](https://github.com/Sae-l/CuD/archive/refs/heads/main.zip) herunter und entpacke es vollständig. Auf GitHub geht das auch über **Code → Download ZIP**; auf der Webseite über **Projekt als ZIP laden**. **„Seite speichern“ im Browser reicht nicht aus.** Alternativ: `git clone https://github.com/Sae-l/CuD.git`. Der fest versionierte [Release v0.2.3](https://github.com/Sae-l/CuD/releases/tag/v0.2.3) enthält ein vollständiges ZIP und `SHA256SUMS`.
2. Öffne [index.html](index.html) aus dem entpackten Projektordner und wähle **Lernraum öffnen**. Alternativ öffne [Lernwerkzeug/index.html](Lernwerkzeug/index.html) direkt. Die GitHub-Dateiansicht zeigt nur den Quelltext.
3. Wähle **Lernweg beginnen**, richte deine Python-Umgebung ein und beginne mit der ersten Vorlesung. **Übungen & Begleitung** führt zu allen Aufgaben; der Block 6.1–6.3 bleibt hervorgehoben.

Die Lernwebseite benötigt keine Installation, keinen Paketmanager und kein Konto. Nach dem Herunterladen funktioniert sie lokal und offline. Lass den gesamten Projektordner zusammen, damit die Quellenlinks funktionieren. Deinen Python-Code führst du selbst aus; die Webseite ist eine Lernbegleitung. Externe Downloads und Colab benötigen Internet.

## Handy, Tablet, Windows und Mac

Das Layout passt sich der Fensterbreite an. Auf einem Desktop-Rechner kannst du die Startdatei direkt im Browser öffnen. Auf iOS und Android hängt das Öffnen zusammengehöriger Dateien vom Browser und Dateimanager ab. Falls die lokale Ansicht nicht funktioniert, stelle den **gesamten Repository-Ordner** über einen statischen HTTP-Server bereit; nur `index.html` zu übertragen reicht nicht. [Gerätezugang und Anleitung](Lernwerkzeug/README.md#auf-deinem-gerät-öffnen).

Die automatisierten Browserprüfungen sind in [kompatibilitaet.json](Lernwerkzeug/pruefung/kompatibilitaet.json) dokumentiert: Chromium, Firefox und WebKit auf dem Prüfrechner sowie emulierte Handy- und Tabletgrößen. WebKit auf Windows ersetzt keinen Safari-Test auf einem Mac oder iPad. Echte Geräte, Screenreader und Betriebssysteminstallationen bleiben gesondert zu prüfen. Maßgeblich sind die gespeicherten Ergebnisse und der [Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md).

Der [CI-Nachweis](Lernwerkzeug/pruefung/CI_NACHWEIS.json) dokumentiert den erfolgreichen Verhaltensstand `74ba715`: vollständige Chromium-/Firefox-/WebKit-Matrix auf Windows und Linux, insgesamt 3192 Layoutprüfungen. Der ausgelieferte lokale Bericht bleibt ein eigener, datierter Nachweis und enthält wegen einer Windows-Signatursperre weiterhin FAIL. Für den finalen Release-Commit sind die zugehörigen [GitHub-Actions-Läufe](https://github.com/Sae-l/CuD/actions) maßgeblich; frühere Ergebnisse werden nicht als neue Ausführung ausgegeben.

## Wissensbasis in Obsidian

Die [deutsche CuD-Hauptreferenz](Obsidian-CuD/03%20Projektleitfaden.md) erklärt Zweck, Baugeschichte, wissenschaftliche Grundlagen, Laufzeit und Inhaltserweiterung. Sie verbindet Fehlersymptome mit Codeorten, Reparaturprüfungen und dem Wiederaufbau der Arbeitsumgebung. Ein dokumentierter Abgleich von GitHub, Projektdateien und fünf Projektchats begrenzt die Aussagen nachvollziehbar. Öffne den Unterordner `Obsidian-CuD` als Vault in Obsidian; Community-Plugins sind nicht erforderlich. Die Canvas-Datei enthält die verknüpfte Gesamtkarte. Prüfungen: `python Obsidian-CuD/Pruefung/vault_pruefen.py`.

## Was liegt wo?

| Pfad | Inhalt |
| --- | --- |
| [index.html](index.html) | Startseite für GitHub Pages; verlinkt das Lernwerkzeug und nutzt dessen Schrift und Foto aus `Lernwerkzeug/assets/` |
| [Lernwerkzeug/](Lernwerkzeug/) | Webseite: `index.html`, `styles.css`, `app.js`; Lerninhalte in `inhalte.js` und `kurs.js` |
| [Referenz/](Referenz/) | Unveränderte Kursunterlagen, CSV und Code-Begleitdatei |
| [Referenz_Sichtung/](Referenz_Sichtung/) | [Seitenindex](Referenz_Sichtung/Seitenindex.md), Textauszüge, Originalbilder und Herkunftsnachweise |
| [Lernwerkzeug/pruefung/](Lernwerkzeug/pruefung/) | Browser- und Python-Ergebnisse, Prüfbericht und Screenshots |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Entwicklung einrichten, Änderungen prüfen und beitragen |
| [Abdeckungsplan](Lernwerkzeug/ABDECKUNG.md) | Alle 31 Originalaufgaben, passende Lerntexte und verbleibende Lücken |
| [Erweiterungsanleitung](Lernwerkzeug/ERWEITERN.md) | Neue Vorlesungen, Übungen, eigene Daten und ihre Prüfungen ergänzen |
| [AUDIT.md](AUDIT.md) | Audit, behobene Probleme und verbleibende Grenzen |
| [PROJEKT_MANIFEST.json](PROJEKT_MANIFEST.json) | Dateiintegrität; Prüfung mit `python scripts/manifest.py --check` |

Konfiguration und GitHub-Einstellungen: [REPOSITORY_SETTINGS.md](REPOSITORY_SETTINGS.md). Automatische Prüfungen laufen auf Windows und Linux; Versionen und Release-Ablauf sind im Repository festgelegt.

Für Lernende: [Bedienung](Lernwerkzeug/README.md), [Lernkonzept und Quellenabdeckung](Lernwerkzeug/LERNKONZEPT.md), [Gebrauchstest](Lernwerkzeug/GEBRAUCHSTEST.md). Für die Projektplanung: [Arbeitsplan](ARBEITSPLAN_Lernwerkzeug.md) und [Skill-Recherche](SKILL_RECHERCHE.md).

## Inhaltliche Grenzen

Hinweise und Musterlösungen öffnest du einzeln. Lösungstexte und Zahlenantworten erscheinen nicht in Suchvorschauen. Lerntexte, Miniübungen und Musterlösungen sind selbst erstellt und von Originalaufgaben unterschieden.

**Alle 31 Aufgaben des vorhandenen Übungsskripts sind geführt begleitet.** Vorlesungen 001–003 werden kompakt erklärt; eine zusätzliche FFT-Lektion behandelt den Begleitcode anhand eines eigenen geprüften Beispiels. Die vier Live-Übungen haben eigene Musterlösungen. **bb12024.csv fehlt weiterhin**: Drei Live-Lösungen laufen direkt mit der herunterladbaren, selbst erstellten live-mini.csv; ihre Originalergebnisse bleiben unbestätigt. Der [Abdeckungsplan](Lernwerkzeug/ABDECKUNG.md) zeigt Quellen und Grenzen.

Jede der zehn Lektionen enthält eine Verständnisfrage mit begründeter Rückmeldung. Nach selbst geschriebener und geprüfter Miniübung kannst du eine Bearbeitungsmarke setzen. Sie wird nur im selben Browser gespeichert; bei blockierter Speicherung gilt sie für die Sitzung. Keine Anmeldung, Übertragung oder Synchronisation. Eine Marke ist deine Selbsteinschätzung, kein Kompetenznachweis.

Die Originalaufgabe nennt `sensor_messdaten_projekt.csv`; vorhanden ist `messdaten.csv`. Das Werkzeug verwendet diese vorhandene Datei. Ihre Zuordnung ist nicht vom Kurs bestätigt; die gedruckten Sollausgaben weichen ab. Die inklusive Filtergrenze **0 bis 50** ist eine dokumentierte Arbeitsannahme.

Technische Tests belegen keinen Lernnutzen. Gebrauchstest und vollständige visuelle Folienprüfung stehen aus. Für den fehlenden Datensatz `bb12024.csv` gibt es keinen Laufnachweis. `002_fftpy.sec` bleibt unverändert archiviert; bekannte Codewidersprüche werden in der eigenen FFT-Lektion erklärt. PDF-Seitensprünge hängen vom Betrachter ab; verwendete Originalseiten sind zusätzlich als Bilder verlinkt.

## Aufbewahrung und Rechte

Dieses Repository ist öffentlich zugänglich; diese Sichtbarkeit ersetzt keine Nutzungserlaubnis für fremde Kursmaterialien. Originalunterlagen behalten ihre jeweilige Herkunft; eine übergreifende Lizenz für fremde Kursmaterialien wird hier nicht vergeben. Originaldateien bleiben unverändert, einschließlich des byte-identischen doppelten Analyse-PDFs. `.gitattributes` verhindert automatische Zeilenumwandlungen beim Git-Transfer. Temporäre Arbeitsdateien und lokale Browserprotokolle werden über `.gitignore` ausgeschlossen.

## Bedienfeedback in v0.2.3

Nach einem Wechsel der Quizantwort verschwindet die alte Bewertung; prüfe die neue Auswahl erneut. Das Einstiegsquiz markiert die gewählte Antwort sichtbar und für assistive Technik. Bearbeitungsmarken melden ihren Zustand ausdrücklich. Größere Navigations-, Filter- und Hilfsziele, stärkere Feldgrenzen und kurze Druck- und Menüübergänge verbessern die Bedienung. Dekorative Hover-Bewegungen gelten nur für Mausbedienung; reduzierte Bewegung bleibt berücksichtigt.

Die Regressionen prüfen zusätzlich den Antwortwechsel, Auswahl per Enter, ausgewählte 44×44px-Ziele, Speicherfehler, den Ausfall von GSAP und HTML-artigen Suchtext. Das ist keine vollständige WCAG-Abnahme. Keine neue Abhängigkeit, Geräte-Vibration oder externe Gestaltungsladung wurde ergänzt. [Änderungsnotizen](RELEASE_NOTES.md).

## Gestaltung und Wartung in v0.2.2

Der lokale Lernraum verwendet wieder die veröffentlichte Gestaltung: abgerundete Navigation, ruhige Papierflächen und konsistente Eingabe- und Aktionsfelder. Der vorherige lokale Ordner enthielt einen älteren CSS-Stand neben neueren Dateien. Die Downloadkorrektur bleibt erhalten. Die Startseite bietet direkte Links zu Vorlesungen, Übungen, Befehlen und Einrichtung; das Mobilmenü unterstützt Tastaturfokus, Escape und einen Einstieg ohne JavaScript. Beide Oberflächen tragen die Signatur **Mohamed Saeed Alhalak**.

Betrieb und Architektur: [Bedienung](Lernwerkzeug/README.md). Neue Inhalte und sichere Prüfung: [Erweitern](Lernwerkzeug/ERWEITERN.md) und [Beitragen und Veröffentlichen](CONTRIBUTING.md). Die [Diagnose](AUDIT.md#gestaltung-und-sichere-integration-17102026) trennt lokale Dateidrift von Fehlern im veröffentlichten Stand.
