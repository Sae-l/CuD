# Skill-Recherche für die GitHub-Ablage

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
