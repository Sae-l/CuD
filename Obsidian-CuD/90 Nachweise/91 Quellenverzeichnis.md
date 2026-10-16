---
title: "91 Quellenverzeichnis"
description: "Projektquellen sind auf den am 16.10.2026 gelesenen Commit festgelegt. Forschung und offizielle Anleitungen sind ergänzende externe Referenzen. Externe Inhalte sind nicht vollständig in den Vault kopiert; die Notizen ble"
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Quellen und ihre jeweilige Rolle

Projektquellen sind auf den am 16.10.2026 gelesenen Commit festgelegt. Forschung und offizielle Anleitungen sind ergänzende externe Referenzen. Externe Inhalte sind nicht vollständig in den Vault kopiert; die Notizen bleiben offline lesbar, die Links benötigen Internet.

## Projektquellen

| Quelle | Wofür sie maßgeblich ist |
| --- | --- |
| README und Root-index.html | Einstieg, aktuelle Vorstellungsseite und dokumentierte Produktgrenzen |
| LERNKONZEPT.md | Historisch dokumentierte PRIMM-Begründung und Lernfolge |
| ABDECKUNG.md | Aufgaben, Originalseiten, synthetische Daten und offene Konflikte |
| ERWEITERN.md und CONTRIBUTING.md | Tatsächlicher Datenvertrag und Entwicklungsanleitung |
| app.js, inhalte.js und kurs.js | Implementiertes Verhalten und vorhandene Inhalts-IDs |
| ergebnis.json und kompatibilitaet.json | Gespeicherte Softwareergebnisse mit Datum |
| PRUEFBERICHT.md und AUDIT.md | Einordnung der Tests, frühere Korrekturen und Grenzen |
| .github/workflows und REPOSITORY_SETTINGS.md | Workflow-Dateien und historische Settingsbeschreibung |
| Asset-README und sources.json | Herkunft, Lizenzen und Hashwerte der Gestaltung |

Konkrete Dateilinks stehen unter jeder Sachnotiz. Die Bestandsaufnahme ist in [[90 Stand und Nachweise]] dokumentiert. Alte Berichte nicht pauschal zum heutigen Zustand erklären.

## Forschung

1. Sentance, S., Waite, J., & Kallia, M. (2019). *Teaching computer programming with PRIMM: a sociocultural perspective*. DOI: [10.1080/08993408.2019.1608781](https://doi.org/10.1080/08993408.2019.1608781). [Originalartikel](https://primmportal.com/wp-content/uploads/2020/10/teaching-computer-programming-with-primm-a-sociocultural-perspective.pdf). Grundlage und Übertragungsgrenzen siehe [[12 Wissenschaftliche Grundlagen]].
2. Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). *Improving Students’ Learning With Effective Learning Techniques*. DOI: [10.1177/1529100612453266](https://doi.org/10.1177/1529100612453266). [Originalvolltext](https://acs.ist.psu.edu/ist521/dunloskyRMNW13.pdf). Ergänzende Einordnung dieses Vaults, keine rückwirkende Behauptung einer früheren Verwendung.

Praxisquelle des bestehenden Konzepts: [Raspberry Pi Foundation: Using PRIMM to teach programming](https://www.raspberrypi.org/blog/using-primm-to-teach-programming-a-new-short-course-for-educators/). Ein Praxisartikel und eine begutachtete Studie erfüllen unterschiedliche Belegrollen.

## Offizielle technische Dokumentation

- [GitHub Pages: statische Websites](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- [GitHub Pages: HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
- [GitHub Pages: besondere Zugriffskontrolle](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site).
- [Playwright: Browser und Plattformunterschiede](https://playwright.dev/docs/browsers).
- [Obsidian: bestehenden Ordner als Vault öffnen](https://obsidian.md/help/Files%2Band%2Bfolders/Manage%2Bvaults).
- [Obsidian: Canvas](https://obsidian.md/help/Plugins/Canvas) und [JSON-Canvas-Spezifikation](https://jsoncanvas.org/spec/1.0/).
- [Obsidian: Installation](https://obsidian.md/help/Getting%2Bstarted/Download%2Band%2Binstall%2BObsidian), [Android](https://obsidian.md/help/android) und [Synchronisation](https://obsidian.md/help/Getting%20started/Sync%20your%20notes%20across%20devices).
- [Python: Funktionen](https://docs.python.org/3/tutorial/controlflow.html#defining-functions), [NumPy-Einstieg](https://numpy.org/doc/stable/user/absolute_beginners.html) und [Pandas-Tutorials](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html).

Für neue Fachbeispiele zusätzlich die konkret verwendete API und Paketversion prüfen. Eine allgemeine Bibliotheksstartseite ersetzt keine Kontrolle von Randfällen und numerischen Erwartungen.

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]

Zusätzlich wurde eine definierte Auswahl anderer Projektgespräche mit Dateien und Git-Historie abgeglichen. Umfang und nicht lesbarer Chat: [[94 Gesprächs- und Quellenabgleich]]. Rohgespräche werden nicht als öffentliche Quellenkopie mitgeliefert.
