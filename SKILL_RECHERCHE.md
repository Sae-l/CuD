# Skill-Recherche für die GitHub-Ablage

## Ergänzung: Lernwirksamkeit, Abdeckung und Erweiterbarkeit

Am 15.10.2026 mit dem erneut angeforderten `find-skills` zuerst die [Skills-Bestenliste](https://skills.sh/) geprüft. Für diese Arbeit passt der bereits vorhandene [webapp-testing-Skill von anthropics/skills](https://skills.sh/anthropics/skills/webapp-testing): rund 177.900 Installationen. Das offizielle [Quellrepository](https://github.com/anthropics/skills) zeigte rund 181.300 Sterne. Das sind zeitgebundene Momentaufnahmen, kein Qualitätsnachweis für das Lernwerkzeug.

Die lokale Skill-Anleitung wurde gelesen und ihre Browserprüfstrategie angewendet. Die vorhandene JavaScript-Playwright-Prüfung wird weiterverwendet; keine zusätzliche Python-Playwright-Installation und kein neues Framework nötig. Optional für andere Umgebungen: `npx skills add anthropics/skills --skill webapp-testing`. Keine neue Skill-Installation durchgeführt.

Für den Quellenabgleich zusätzlich den bereits vorhandenen `pdf-seitenweise-sichten` verwendet: vorhandene Seitenindizes und Textabschnitte gelesen, Vorlesung 003, PDF-S. 31, und Übungsblatt, PDF-S. 13, im Originalbild geprüft. [ABDECKUNG.md](Lernwerkzeug/ABDECKUNG.md) dokumentiert das Ergebnis, [ERWEITERN.md](Lernwerkzeug/ERWEITERN.md) den Ausbauvertrag.

## Ergänzung: Anfänger-Lernraum und Design

Am 15.10.2026 erneut mit dem ausdrücklich gewünschten `find-skills` recherchiert. Die [Skills-Bestenliste](https://skills.sh/) und die [Skill-Seite frontend-design](https://skills.sh/anthropics/skills/frontend-design) wurden geprüft: rund 989.000 Installationen. Das offizielle [Anthropic-Repository](https://github.com/anthropics/skills) wurde gegengeprüft: rund 181.000 Sterne. Zahlen sind Momentaufnahmen und keine Qualitätsgarantie.

Die vorhandenen lokalen Skills `frontend-design` und `webapp-testing` wurden gelesen und für Gestaltung bzw. Browserprüfung verwendet. Keine neue Skill-Installation nötig. `webapp-testing` bevorzugt Python-Playwright; hier wurde die bereits vorhandene JavaScript-Prüfung erweitert. Optionaler Installationsbefehl für andere Rechner: `npx skills add https://github.com/anthropics/skills --skill frontend-design`.

Das fachliche Lernkonzept wird mit PRIMM begründet. Umsetzung und Quellen: [LERNKONZEPT.md](Lernwerkzeug/LERNKONZEPT.md). Die nachfolgenden Abschnitte dokumentieren die frühere GitHub-Ablage.

Stand: 15.10.2026. Auslöser: ausdrücklich angeforderter Skill `find-skills` beim Upload nach `Sae-l/CuD-1`.

## Vorgehen und Fund

Die vorhandene lokale Anleitung `find-skills/SKILL.md` wurde gelesen. Zuerst wurde das [Skills-Verzeichnis](https://skills.sh/) angesehen, danach die vorhandene CLI ohne Neuinstallation ausgeführt:

```text
npx --no-install skills find github
```

Ein passender Fund ist **[git-commit von github/awesome-copilot](https://skills.sh/github/awesome-copilot/git-commit)**. Die Skill-Seite nennt rund **46.400 Installationen**; die Herkunft wurde im [GitHub-Quellrepository](https://github.com/github/awesome-copilot) mit rund **40.000 Sternen** gegengeprüft. Das sind zeitgebundene Momentaufnahmen, keine Qualitätsgarantie. Der Skill beschreibt standardisierte Commits nach Conventional Commits und eine Prüfung des tatsächlichen Änderungsumfangs.

Optionaler Installationsbefehl aus der Skill-Seite:

```text
npx skills add https://github.com/github/awesome-copilot --skill git-commit
```

Für diesen Upload ist keine neue Skill-Installation erforderlich. Die bereits ausgewählte GitHub-Verbindung bietet die benötigten Lese- und Schreibfunktionen. Sie wird für den Upload und die anschließende Kontrolle verwendet. Der Fund wird dokumentiert, ohne weitere Skills global zu installieren.

## Bereits genutzte Projektwerkzeuge

- `frontend-design`: Oberfläche und Darstellung des vorhandenen Piloten.
- `webapp-testing`: Funktionsprüfung mit dem lokal vorhandenen JavaScript-Playwright; die Skill-Anleitung bevorzugt Python-Playwright, das hier nicht installiert war.
- `pdf-seitenweise-sichten`: gezielter Abgleich der Pilotaufgaben am Original; keine Behauptung einer vollständigen Sichtung aller Modulunterlagen.

Die Ergebnisse der Umsetzung stehen im [Arbeitsplan](ARBEITSPLAN_Lernwerkzeug.md) und im [technischen Prüfbericht](Lernwerkzeug/pruefung/PRUEFBERICHT.md).
