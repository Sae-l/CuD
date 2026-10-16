---
title: "22 Fähigkeiten Skills und Werkzeuge"
description: "Drei Ebenen sind zu unterscheiden: fachliche Fähigkeiten, Entwicklungswerkzeuge und Anleitungen für KI-Assistenten. Ein Skill ist eine Arbeitsanleitung; er ist keine Bibliothek, die im Browser der Lernenden laufen muss."
type: note
language: de
created: 2026-10-16
updated: 2026-10-16
status: dokumentiert
tags: ["cud"]
---

# Was für Bau und Pflege benötigt wird

Drei Ebenen sind zu unterscheiden: fachliche Fähigkeiten, Entwicklungswerkzeuge und Anleitungen für KI-Assistenten. Ein Skill ist eine Arbeitsanleitung; er ist keine Bibliothek, die im Browser der Lernenden laufen muss.

| Bereich | Fähigkeit oder Werkzeug | Zweck |
| --- | --- | --- |
| Didaktik | Lernziele, Voraussetzungen, Fehlvorstellungen und gestufte Hilfe | Inhalte für Anfänger aufbauen |
| Fachlichkeit | Python, CSV, NumPy, Pandas, Diagramme, Zeitreihen, OOP, FFT | Beispiele erklären und Erwartungen unabhängig prüfen |
| Frontend | HTML, CSS, JavaScript, DOM, Tastatur und responsive Gestaltung | Statischen Lernraum pflegen |
| Quellenarbeit | PDF-Seiten prüfen, Herkunft dokumentieren, SHA-256 | Eigene Ergänzungen und Originalmaterial unterscheiden |
| Qualität | Node.js, Playwright, Python und Unit-Tests | Beispiele, Links, Downloads und Bedienung prüfen |
| Versionsverwaltung | Git, GitHub, Pull Requests und Actions | Änderungen reviewen, integrieren und reproduzieren |
| Dokumentation | Markdown, Obsidian, Wikilinks, Mermaid, JSON Canvas | Zusammenhänge und Pflegeanleitungen bereitstellen |

## Werkzeuge im ausgelieferten Produkt

HTML/CSS/JavaScript bilden die Laufzeit. Outfit ist die lokal mitgelieferte Schrift. GSAP und ScrollTrigger unterstützen dekorative Bewegung. Das Foto und die Bibliotheken stammen aus dokumentierten Quellen. Herkunft, Versionen, Dateigrößen und Hashwerte liegen in `assets/sources.json`; die Lizenzhinweise müssen erhalten bleiben.

Node und Playwright dienen der Entwicklung. Python und die Pakete aus `requirements-test.txt` führen die fachlichen Prüffälle aus. Die normale Anzeige der Website benötigt diese Entwicklungswerkzeuge nicht. Eine separate Python-Umgebung benötigen Lernende für das eigene Programmieren.

## In Projektunterlagen genannte Skills

`SKILL_RECHERCHE.md` nennt `frontend-design`, `webapp-testing`, `pdf-seitenweise-sichten` und die Suche nach passenden GitHub-Arbeitsanleitungen. `AUDIT.md` dokumentiert außerdem eine frühere Verwendung von `ecc:team-agent-orchestration`. Das ist ein historischer Bericht, keine Aussage über installierte oder in diesem Dokumentationsauftrag ausgeführte Skills. Der aktuelle Gestaltungsbericht nennt `gpt-taste`.

## Für diese Wissensbasis verwendete Anleitungen

Verwendet wurden `ecc:plan-orchestrate` zur Generierung später nutzbarer, abgegrenzter Befehle und `desktop-commander:obsidian-vault` für Notizstruktur, Eigenschaften und Linkpflege. Es wurden keine ECC-Implementierungsbefehle gestartet. Canvas wurde als lokale JSON-Datei erzeugt; Community-Plugins sind nicht erforderlich.

[[92 ECC Plan-Orchestrate]] enthält das Resultat und den Unterschied zwischen erzeugtem Befehl und tatsächlicher Ausführung. [[32 Entwicklung und Release]] beschreibt die reproduzierbare Umgebung.

## Projektbelege

- [SKILL_RECHERCHE.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/SKILL_RECHERCHE.md)
- [AUDIT.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/AUDIT.md)
- [Lernwerkzeug/assets/README.md](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/README.md)
- [Lernwerkzeug/assets/sources.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/Lernwerkzeug/assets/sources.json)
- [requirements-test.txt](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/requirements-test.txt)
- [package.json](https://github.com/Sae-l/CuD/blob/bdff10b0918473d8a37e05141a85fdf37c762c4d/package.json)

Weiter: [[00 Start]] · [[90 Stand und Nachweise]] · [[91 Quellenverzeichnis]]
