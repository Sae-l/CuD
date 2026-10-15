"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const vm = require("node:vm");
const crypto = require("node:crypto");
const {spawnSync} = require("node:child_process");
const {pathToFileURL,fileURLToPath} = require("node:url");
const root = __dirname;
const output = path.join(root,"pruefung");
const testCache = path.join(root,"../.upload-work/matplotlib");
async function main() {
fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify({status:"RUNNING",date:new Date().toISOString()},null,2) + "\n");
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,"inhalte.js"),"utf8"),context);
vm.runInContext(fs.readFileSync(path.join(root,"kurs.js"),"utf8"),context);
const {items,sources,commands,lessons,coverage} = JSON.parse(vm.runInContext("JSON.stringify({items:inhalte,sources:quellen,commands:weitereBefehle,lessons:vorlesungen,coverage:abdeckung})",context));
const ids = new Set(items.map(item => item.id));
assert.equal(ids.size,items.length);
assert.equal(items.filter(item => item.kind === "Befehl & Begriff").length,15);
for (const item of items) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id),`Ungültige Inhalts-ID: ${item.id}`);
  for (const id of [...item.needs || [],...item.related || [],...item.next ? [item.next] : []]) assert(ids.has(id),`${item.id}: ${id}`);
  for (const id of item.sources) assert(sources[id],`${item.id}: Quelle ${id}`);
}
for (const source of Object.values(sources)) {
  for (const href of [source.href,source.image].filter(Boolean)) {
    const target = new URL(href,pathToFileURL(path.join(root,"index.html")));
    assert(fs.existsSync(fileURLToPath(target)),href);
  }
}
assert(lessons.length > 0);
assert.equal(items.filter(item => item.kind === "Vorlesung").length,lessons.length);
for (const lesson of lessons) {
  for (const field of ["id","title","topic","origin","pages","goal","code","investigate","modify","make","answer"]) assert(typeof lesson[field] === "string" && lesson[field].length,`${lesson.id}: ${field}`);
  assert.equal(typeof lesson.output,"string",`${lesson.id}: output`);
  assert(Number.isInteger(lesson.page) && lesson.page > 0);
  assert(lesson.blocks.length && lesson.blocks.every(block => block.length === 2 && block.every(text => typeof text === "string" && text.length)));
  assert(Array.isArray(lesson.needs));
  const quiz = lesson.quiz;
  assert(quiz && quiz.question && quiz.explanation,`${lesson.id}: Lernfrage fehlt`);
  assert(Array.isArray(quiz.options) && quiz.options.length >= 2 && quiz.options.every(text => typeof text === "string" && text.length));
  assert.equal(new Set(quiz.options).size,quiz.options.length);
  assert(Number.isInteger(quiz.correct) && quiz.correct >= 0 && quiz.correct < quiz.options.length);
}
const exerciseText = fs.readFileSync(path.join(root,"../Referenz_Sichtung/Pflicht_Uebungen/md/CuD_Uebung 01.md"),"utf8").split("## PDF-Seite 5")[1];
const originalTasks = [...exerciseText.matchAll(/^\d+\.\d+ Aufgabe (\d+\.\d+):/gm)].map(match => match[1]);
const pipelineIds = ["aufgabe-6-1","aufgabe-6-2","aufgabe-6-3"];
const testedSolutions = new Set([...originalTasks.map(number => `aufgabe-${number.replace(".","-")}`),"praxis-zeitreihe","live-003-10","live-003-18","live-003-26","live-003-31"]);
for (const item of items.filter(item => item.solution)) assert(testedSolutions.has(item.id),`${item.id}: Eigenen Python-Prüffall und Zuordnung unter testedSolutions ergänzen`);
for (const id of testedSolutions) assert(items.find(item => item.id === id)?.solution,`${id}: Musterlösung fehlt`);
assert.deepEqual(coverage.filter(row => !row.sourceFile).flatMap(row => row.tasks),originalTasks);
for (const row of coverage) {
  assert(row.title && row.gap && Number.isInteger(row.page) && row.page > 0);
  row.lessons.forEach(id => assert(ids.has(id),id));
}
for (const command of commands) {
  assert(ids.has(command[4]));
  assert(command.slice(0,4).every(field => typeof field === "string" && field.length));
}
const originalManifest = JSON.parse(fs.readFileSync(path.join(root,"../Referenz_Sichtung/manifest.json"),"utf8"));
for (const [relative,hash] of Object.entries(originalManifest.source_sha256)) {
  const bytes = fs.readFileSync(path.join(root,"../Referenz",relative));
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"),hash,`Original verändert: ${relative}`);
}

// Die Webseite hat keinen Server; file:// und Offline-Modus sind Teil der Abnahme.
const pythonCode = String.raw`
import contextlib, csv, io, json, math, os, runpy, statistics, sys, tempfile
from pathlib import Path
payload = json.load(sys.stdin)
items = payload["items"]
source = Path(payload["csv"]).read_text(encoding="utf-8")
def execute(code, scope):
    stream = io.StringIO()
    with contextlib.redirect_stdout(stream):
        exec(compile(code, "<Lernbeispiel>", "exec"), scope)
    return stream.getvalue()
with tempfile.TemporaryDirectory(prefix="lernwerkzeug-", dir=payload["temporary_root"]) as tmp, contextlib.chdir(tmp):
    Path("mini.csv").write_text(payload["mini"], encoding="utf-8")
    count = 0
    for item in items:
        if "code" in item:
            actual = execute(item["code"], {})
            if "output" in item:
                assert actual == item["output"], item["id"]
            count += 1
    import matplotlib.pyplot as plt
    for command in payload["commands"]:
        execute(command[2], {"input": lambda prompt="": "Test"})
        plt.close("all")
    extended = runpy.run_path(payload["exercise_checker"])["pruefe"](items, source, payload["figure_output"], payload["live_demo"])
    # Eigene Transferaufgabe: unabhängig erwartete Mini-Daten, nicht bb12024.csv.
    Path("becken-mini.csv").write_text(payload["becken"], encoding="utf-8")
    project = next(i for i in items if i["id"] == "praxis-zeitreihe")
    project_scope = {}
    execute(project["solution"]["code"], project_scope)
    analysed = project_scope["analyse"]
    assert analysed.df["o2_ist"].tolist() == [3.0, 6.0, 9.0]
    assert analysed.df["temp_c"].tolist() == [20.0, 24.0, 28.0]
    assert int(analysed.geschaetzt.sum().sum()) == 2
    untouched = project_scope["BeckenAnalyse"]("becken-mini.csv")
    try:
        untouched.zeige_report()
    except ValueError:
        pass
    else:
        raise AssertionError("Report ohne Aufbereitung akzeptiert")
    assert untouched.df is None and analysed.df is not None
    for contents in ["zeit,o2_ist,temp_c\n", payload["becken"].replace("08:11", "08:26").replace("08:14", "08:29")]:
        Path("luecken.csv").write_text(contents, encoding="utf-8")
        incomplete = project_scope["BeckenAnalyse"]("luecken.csv")
        try:
            incomplete.aufbereiten_5min()
            incomplete.zeige_report()
        except ValueError:
            pass
        else:
            raise AssertionError("Leere oder unvollständige Auswertung akzeptiert")
    for contents in [payload["becken"].replace("2024-01-01 08:01", "kaputt"), payload["becken"].replace("o2_ist", "andere_spalte")]:
        Path("defekt.csv").write_text(contents, encoding="utf-8")
        try:
            project_scope["BeckenAnalyse"]("defekt.csv").aufbereiten_5min()
        except (ValueError, KeyError):
            pass
        else:
            raise AssertionError("Beschädigte Projektdaten akzeptiert")
    exercises = [next(i for i in items if i["id"] == id) for id in payload["pipeline_ids"]]
    def run_pipeline(text):
        Path("messdaten.csv").write_text(text, encoding="utf-8")
        scope = {}
        for item in exercises:
            execute(item["solution"]["code"], scope)
        return scope
    scope = run_pipeline(source)
    rows = list(csv.DictReader(io.StringIO(source)))
    reference = [float(row["Temperatur"]) for row in rows]
    good = [x for x in reference if 0 <= x <= 50]
    bad = [x for x in reference if not 0 <= x <= 50]
    assert scope["gute_daten"] == good
    assert scope["ausreisser"] == bad
    assert len(good) + len(bad) == len(reference)
    assert math.isclose(scope["mittelwert"],statistics.mean(good))
    assert min(good) <= scope["mittelwert"] <= max(good)
    assert scope["datei"].closed
    assert len(scope["zeilen"]) == len(source.splitlines())
    # Synthetische Randfälle sind unabhängig von den gedruckten Sollausgaben.
    header = "SensorID,Standort,Temperatur,Luftfeuchtigkeit,IstAktiv\n"
    boundary = header + "1,Test,-1,40,True\n2,Test,0,40,True\n3,Test,50,40,True\n4,Test,51,40,True\n\n"
    edge = run_pipeline(boundary)
    assert edge["gute_daten"] == [0.0,50.0]
    assert edge["ausreisser"] == [-1.0,51.0]
    assert edge["mittelwert"] == 25.0
    for text in ["",header,header + "1,Test,99,40,True\n"]:
        empty = run_pipeline(text)
        assert empty["gute_daten"] == []
        assert "mittelwert" not in empty
    singleton = run_pipeline(header + "1,Test,7,40,False\n")
    assert singleton["mittelwert"] == 7.0
    assert singleton["gute_daten"] == [7.0]  # Aktiv-Status ist kein Filter.
    for text, error in [(header + "1,Test,defekt,40,True\n", ValueError), (header + "1,Test\n", IndexError)]:
        try:
            run_pipeline(text)
        except error:
            pass
        else:
            raise AssertionError("Beschädigte Daten wurden stillschweigend akzeptiert")
print(json.dumps({"examples":count,"command_examples":len(payload["commands"]),"pipeline":True,"edge_cases":True,"transfer_project":True,"extended":extended}))
`;
const python = spawnSync(process.env.LERNWERKZEUG_PYTHON || "python",["-c",pythonCode],{
  input:JSON.stringify({items,commands,pipeline_ids:pipelineIds,csv:path.join(root,"../Referenz/Pflicht Übungen/messdaten.csv"),mini:fs.readFileSync(path.join(root,"beispiele/mini.csv"),"utf8"),becken:fs.readFileSync(path.join(root,"beispiele/becken-mini.csv"),"utf8"),live_demo:fs.readFileSync(path.join(root,"beispiele/live-mini.csv"),"utf8"),temporary_root:output,exercise_checker:path.join(root,"../scripts/uebungen_pruefen.py"),figure_output:output}),encoding:"utf8",timeout:120000,env:{...process.env,PYTHONOPTIMIZE:"",PYTHONIOENCODING:"utf-8",MPLBACKEND:"Agg",MPLCONFIGDIR:testCache}
});
assert.equal(python.status,0,python.stderr || String(python.error));
const pythonResult = JSON.parse(python.stdout);

async function browserTests() {
  const temporary = path.join(root,"../.upload-work/browser-temp");
  fs.mkdirSync(temporary,{recursive:true});
  process.env.TEMP = temporary;
  process.env.TMP = temporary;
  const localCache = path.join(os.homedir(),"AppData/Local/ms-playwright");
  if (!process.env.PLAYWRIGHT_BROWSERS_PATH && fs.existsSync(localCache)) process.env.PLAYWRIGHT_BROWSERS_PATH = localCache;
  const {chromium} = require("playwright");
  const browser = await chromium.launch({headless:true});
  try {
    const browserContext = await browser.newContext({viewport:{width:1440,height:1000},offline:true});
    const page = await browserContext.newPage();
    const errors = [];
    const externalRequests = [];
    page.on("pageerror",error => errors.push(error.message));
    page.on("console",message => {if(message.type() === "error") errors.push(message.text());});
    page.on("request",request => {if(/^https?:/.test(request.url())) externalRequests.push(request.url());});
    const url = pathToFileURL(path.join(root,"index.html")).href;
    const overviewTitles = {vorlesungen:"Eine Idee nach der anderen.",uebung:"Deine Übung: Messdaten verstehen.",befehle:"Welcher Befehl passt wozu?",lernkonzept:"So lernst du hier programmieren.",abdeckung:"Was ist bereits abgedeckt?"};
    async function waitForItem(id = "") {
      const title = items.find(item => item.id === id)?.title || overviewTitles[id] || "Dein erster Schritt ins Programmieren.";
      await page.waitForFunction(expected => document.querySelector("#inhalt h1")?.textContent === expected,title);
      if (!id || id === "start") await page.waitForFunction(() => [...document.querySelectorAll(".hero-copy > *")].every(node => Number(getComputedStyle(node).opacity) === 1));
    }
    async function navigate(id = "") {
      await page.goto(id ? `${url}#${id}` : url);
      await waitForItem(id);
    }
    await navigate();
    await page.waitForLoadState("networkidle");
    assert.equal(await page.locator("#nav-toggle").isVisible(),false);
    assert.equal(await page.locator("#lernnavigation").isVisible(),true);
    assert.equal(await page.locator("#treffer .result").count(),items.length);
    await page.screenshot({path:path.join(output,"desktop.png"),fullPage:true});
    // Hauptzugänge, Lernreihenfolge, interaktive Vermutung und Befehlszusammenspiel.
    for (const id of ["vorlesungen","uebung","befehle","python-setup","vscode-setup"]) {
      assert.equal(await page.locator(`.entry-card[href="#${id}"]`).count(),1);
    }
    await page.getByRole("button",{name:"{name} kannst Python lernen!",exact:true}).click();
    assert((await page.locator(".quiz-feedback").innerText()).includes("Fast!"));
    await page.getByRole("button",{name:"Du kannst Python lernen!",exact:true}).click();
    assert((await page.locator(".quiz-feedback").innerText()).includes("Richtig!"));
    const localLinks = new Set();
    for (const [id,title] of Object.entries(overviewTitles)) {
      await page.goto(`${url}#${id}`);
      await page.getByRole("heading",{name:title,exact:true}).waitFor();
      const links = await page.locator("a[href]").evaluateAll(nodes => nodes.map(node => node.href));
      links.filter(href => href.startsWith("file:")).forEach(href => localLinks.add(href));
      if (id === "vorlesungen") assert.deepEqual(await page.locator(".course-link").evaluateAll(nodes => nodes.map(node => node.hash)),lessons.map(lesson => `#${lesson.id}`));
      if (id === "befehle") {
        assert.equal(await page.locator("tbody tr").count(),15 + commands.length);
        await page.screenshot({path:path.join(output,"befehle-desktop.png"),fullPage:false});
        await page.locator("#befehl-suche").fill("Zeitindex");
        assert(await page.locator("tbody tr").count() > 0);
        assert((await page.locator("tbody").innerText()).includes("resample"));
        for (const query of ["<=","==","**"]) {
          await page.locator("#befehl-suche").fill(query);
          const count = await page.locator("tbody tr").count();
          assert(count > 0 && count < 15 + commands.length,`Operatorsuche: ${query}`);
          const command = commands.find(command => command[0].includes(query));
          assert.equal(await page.locator("tbody").getByRole("link",{name:command[0],exact:true}).count(),1);
        }
        await page.locator("#befehl-suche").fill("xyzkeininhalt");
        assert.equal(await page.locator("tbody tr").count(),0);
      }
      if (id === "vorlesungen") await page.screenshot({path:path.join(output,"vorlesungen-desktop.png"),fullPage:true});
    }
    await navigate();
    // Reale Eingabefälle einschließlich gepflegter Synonyme und Normalisierung.
    const cases = [
      ["Wie öffne ich die CSV",["open","aufgabe-6-1"]],
      ["CSV einlesen",["open","aufgabe-6-1"]],
      ["6.2",["aufgabe-6-2"]],
      ["Durchschnitt",["mittelwert","aufgabe-6-3"]],
      ["Mittelwert",["mittelwert","aufgabe-6-3"]],
      ["mean",["mittelwert","aufgabe-6-3"]],
      ["ValueError",["fehler-wert","float"]],
      ["float geht nicht",["fehler-wert","float"]],
      ["Ausreisser",["if","aufgabe-6-2"]],
      ["Ausreißer",["if","aufgabe-6-2"]],
      ["DATEI OEFFNEN",["open","aufgabe-6-1"]],
      ["len()",["len"]],
      ["<=",["lektion-2"]],
      ["==",["lektion-2"]],
      ["**",["lektion-2"]],
      ["Docstring",["lektion-5"]],
      ["Quartil",["lektion-4"]],
      ["BeckenAnalyse",["praxis-zeitreihe"]]
    ];
    for (const [query,expected] of cases) {
      await page.locator("#suche").fill(query);
      const matches = await page.locator("#treffer a").evaluateAll(links => links.map(link => link.hash.slice(1)));
      for (const id of expected) assert(matches.includes(id),`${query}: ${id}`);
      if (["<=","==","**"].includes(query)) assert(matches.length < items.length,`Operatorsuche: ${query}`);
      if (query === "6.2" || query === "len()") assert.equal(matches[0],expected[0]);
      assert(!await page.locator("#treffer").innerText().then(text => text.includes("Musterlösung")));
    }
    await page.locator("#suche").fill("6.2");
    await page.locator('#treffer a[href="#aufgabe-6-2"]').click();
    await waitForItem("aufgabe-6-2");
    assert.equal(await page.locator("#inhalt h1").innerText(),"6.2 · Daten parsen und Ausreißer filtern");
    assert.equal(await page.locator("#inhalt details[open]").count(),0);
    assert.equal(await page.locator("#inhalt .solution pre").isVisible(),false);
    const summary = page.getByText("Hinweis 1",{exact:true});
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#inhalt details[open]").count(),1);
    await page.getByText("Musterlösung öffnen",{exact:true}).click();
    assert.equal(await page.locator("#inhalt .solution pre").isVisible(),true);
    await page.locator('nav a[href="#aufgabe-6-3"]').click();
    await waitForItem("aufgabe-6-3");
    assert.equal(await page.locator("#inhalt details[open]").count(),0);
    await page.goBack();
    await waitForItem("aufgabe-6-2");
    assert.equal(await page.locator("#inhalt details[open]").count(),0);
    await page.locator("#reset").click();
    await page.locator("#art").selectOption("Fehlerhilfe");
    assert.equal(await page.locator("#treffer .result").count(),5);
    await page.locator("#thema").selectOption("Auswertung");
    assert.equal(await page.locator("#treffer .result").count(),1);
    await page.locator("#suche").fill("xyzkeininhalt");
    assert((await page.locator("#treffer").innerText()).includes("Kein Treffer"));
    await page.locator("#reset").click();
    await page.locator("#suche").fill('<img src=x onerror="alert(1)">');
    assert.equal(await page.locator("#trefferzahl img").count(),0);
    await page.locator("#reset").click();
    // Lernfragen liefern begründete Rückmeldung; Bearbeitungsmarken sind getrennt davon.
    for (const lesson of lessons) {
      await navigate(lesson.id);
      const quiz = page.locator(".lesson-quiz");
      assert.equal(await quiz.locator('input[type="radio"]').count(),lesson.quiz.options.length);
      await quiz.locator(`input[value="${(lesson.quiz.correct + 1) % lesson.quiz.options.length}"]`).check();
      await quiz.getByRole("button",{name:"Antwort prüfen"}).click();
      assert((await quiz.getByRole("status").innerText()).startsWith("Noch nicht."));
      await quiz.locator(`input[value="${lesson.quiz.correct}"]`).check();
      await quiz.getByRole("button",{name:"Antwort prüfen"}).click();
      assert((await quiz.getByRole("status").innerText()).startsWith("Richtig."));
      assert.equal(await page.locator("#lektion-bearbeitet").isChecked(),false);
    }
    await navigate(lessons[0].id);
    await page.locator("#lektion-bearbeitet").check();
    await page.reload();
    assert.equal(await page.locator("#lektion-bearbeitet").isChecked(),true);
    await navigate();
    assert.equal(await page.getByRole("link",{name:"Weiterlernen",exact:true}).getAttribute("href"),`#${lessons[1].id}`);
    await navigate(lessons[0].id);
    await page.locator("#lektion-bearbeitet").uncheck();
    await page.reload();
    assert.equal(await page.locator("#lektion-bearbeitet").isChecked(),false);
    // Alle Ansichten und alle gerenderten lokalen Dateiverweise prüfen.
    for (const item of items) {
      await navigate(item.id);
      assert.equal(await page.locator("#inhalt h1").innerText(),item.title);
      assert.equal(await page.locator("#inhalt details[open]").count(),0);
      const links = await page.locator("a[href]").evaluateAll(nodes => nodes.map(node => node.href));
      links.filter(href => href.startsWith("file:")).forEach(href => localLinks.add(href));
    }
    for (const href of localLinks) {
      const target = new URL(href);
      target.hash = "";
      assert(fs.existsSync(fileURLToPath(target)),href);
    }
    await navigate("aufgabe-6-1");
    const pdfLink = page.locator('.source a[href$=".pdf#page=10"]');
    assert.equal(await pdfLink.count(),1);
    // Headless Chromium hat hier keinen PDF-Betrachter; Ziel und Seitenanker prüfen,
    // das tatsächliche Öffnen derselben Originalseite über den Bildlink testen.
    assert((await pdfLink.getAttribute("href")).endsWith(".pdf#page=10"));
    const imageLink = page.locator(".source a").filter({hasText:"Originalseite als Bild"});
    const [imagePage] = await Promise.all([browserContext.waitForEvent("page"),imageLink.click()]);
    await imagePage.waitForLoadState("load");
    assert(await imagePage.locator("img").evaluate(img => img.complete && img.naturalWidth > 0));
    await imagePage.close();
    const [download] = await Promise.all([page.waitForEvent("download"),page.getByText("CSV für deinen Übungsordner speichern",{exact:true}).click()]);
    assert.equal(download.suggestedFilename(),"messdaten.csv");
    await download.saveAs(path.join(output,"download-test.csv"));
    assert.equal(fs.readFileSync(path.join(output,"download-test.csv"),"utf8"),fs.readFileSync(path.join(root,"../Referenz/Pflicht Übungen/messdaten.csv"),"utf8"));
    fs.unlinkSync(path.join(output,"download-test.csv"));
    await navigate("praxis-zeitreihe");
    const [miniDownload] = await Promise.all([page.waitForEvent("download"),page.getByRole("link",{name:"Synthetische becken-mini.csv speichern",exact:true}).click()]);
    assert.equal(miniDownload.suggestedFilename(),"becken-mini.csv");
    await miniDownload.saveAs(path.join(output,"download-mini.csv"));
    assert.equal(fs.readFileSync(path.join(output,"download-mini.csv"),"utf8"),fs.readFileSync(path.join(root,"beispiele/becken-mini.csv"),"utf8"));
    fs.unlinkSync(path.join(output,"download-mini.csv"));
    for (const id of ["live-003-18","live-003-26","live-003-31"]) {
      await navigate(id);
      assert.equal(await page.locator(".solution[open]").count(),0);
      const [demoDownload] = await Promise.all([page.waitForEvent("download"),page.getByRole("link",{name:"Synthetische live-mini.csv speichern",exact:true}).click()]);
      assert.equal(demoDownload.suggestedFilename(),"live-mini.csv");
      await demoDownload.saveAs(path.join(output,"download-live.csv"));
      assert.deepEqual(fs.readFileSync(path.join(output,"download-live.csv")),fs.readFileSync(path.join(root,"beispiele/live-mini.csv")));
      fs.unlinkSync(path.join(output,"download-live.csv"));
      await page.getByText("Musterlösung öffnen",{exact:true}).click();
      assert((await page.locator(".solution code").innerText()).includes('"live-mini.csv"'));
    }
    await navigate("lektion-5");
    await page.locator(".lesson-quiz").screenshot({path:path.join(output,"lerncheck-desktop.png"),animations:"disabled"});
    // Skip-Link und alle Formularfelder müssen per Tastatur erreichbar sein.
    await navigate();
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("class"),"skip");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"),"inhalt");
    assert((await page.locator("#inhalt h1").innerText()).includes("Programmieren"));
    await navigate("aufgabe-6-2");
    await page.locator("#inhalt").evaluate(node => node.blur());
    await page.screenshot({path:path.join(output,"aufgabe-desktop.png"),fullPage:true});
    for (const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      for (const id of ["start","vorlesungen","befehle","python-setup","vscode-setup","lektion-8"]) {
        await page.goto(`${url}#${id}`);
        await waitForItem(id);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`${id}: Überlauf bei ${width}`);
        if (width === 390 && id === "start") {
          await page.locator("#inhalt").evaluate(node => node.blur());
          await page.screenshot({path:path.join(output,"start-mobil.png"),fullPage:true});
        }
      }
      await navigate("aufgabe-6-2");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`Überlauf bei ${width}`);
      await page.locator("#suche").fill("6.3");
      await page.locator('#treffer a[href="#aufgabe-6-3"]').click();
      await waitForItem("aufgabe-6-3");
      assert.equal(await page.locator("#inhalt .solution pre").isVisible(),false);
      await page.locator("#reset").click();
      const navToggle = page.locator("#nav-toggle");
      assert.equal(await navToggle.isVisible(),true);
      assert.equal(await navToggle.getAttribute("aria-controls"),"lernnavigation");
      assert.equal(await navToggle.getAttribute("aria-expanded"),"false");
      assert.equal(await page.locator("#lernnavigation").isVisible(),false);
      await navToggle.click();
      assert.equal(await navToggle.getAttribute("aria-expanded"),"true");
      assert.equal(await page.locator("#lernnavigation").isVisible(),true);
      await page.locator('nav a[href="#aufgabe-6-2"]').click();
      await waitForItem("aufgabe-6-2");
      assert.equal(await navToggle.getAttribute("aria-expanded"),"false");
      assert.equal(await page.locator("#lernnavigation").isVisible(),false);
      if (width === 390) {
        await page.locator("#inhalt").evaluate(node => node.blur());
        await page.screenshot({path:path.join(output,"mobil.png"),fullPage:true});
        await navigate("lektion-5");
        await page.locator(".lesson-quiz").screenshot({path:path.join(output,"lerncheck-mobil.png"),animations:"disabled"});
      }
    }
    await page.emulateMedia({reducedMotion:"reduce"});
    assert(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
    assert.deepEqual(errors,[]);
    assert.deepEqual(externalRequests,[]);
    return {searchCases:cases.length,views:items.length + Object.keys(overviewTitles).length + 1,commandRows:15 + commands.length,learningQuizzes:lessons.length,progressPersistence:true,originalTasks:originalTasks.length,localLinks:localLinks.size,externalRequests:externalRequests.length};
  } finally { await browser.close(); }
}

const browserResult = await browserTests();
  const result = {date:new Date().toISOString(),status:"PASS",originalHashes:Object.keys(originalManifest.source_sha256).length,python:pythonResult,browser:browserResult};
  fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify(result,null,2) + "\n");
  console.log(JSON.stringify(result,null,2));
}

main().catch(error => {
  fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify({date:new Date().toISOString(),status:"FAIL",error:error.message},null,2) + "\n");
  console.error(error);
  process.exitCode = 1;
});
