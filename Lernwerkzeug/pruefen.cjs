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
fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify({status:"RUNNING",date:new Date().toISOString()},null,2) + "\n");
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,"inhalte.js"),"utf8"),context);
const {items,sources} = JSON.parse(vm.runInContext("JSON.stringify({items:inhalte,sources:quellen})",context));
const ids = new Set(items.map(item => item.id));
assert.equal(ids.size,items.length);
assert.equal(items.filter(item => item.kind === "Befehl & Begriff").length,15);
for (const item of items) {
  for (const id of [...item.needs || [],...item.related || [],...item.next ? [item.next] : []]) assert(ids.has(id),`${item.id}: ${id}`);
  for (const id of item.sources) assert(sources[id],`${item.id}: Quelle ${id}`);
}
for (const source of Object.values(sources)) {
  for (const href of [source.href,source.image].filter(Boolean)) {
    const target = new URL(href,pathToFileURL(path.join(root,"index.html")));
    assert(fs.existsSync(fileURLToPath(target)),href);
  }
}
const originalManifest = JSON.parse(fs.readFileSync(path.join(root,"../Referenz_Sichtung/manifest.json"),"utf8"));
for (const [relative,hash] of Object.entries(originalManifest.source_sha256)) {
  const bytes = fs.readFileSync(path.join(root,"../Referenz",relative));
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"),hash,`Original verändert: ${relative}`);
}

// Die Webseite hat keinen Server; file:// und Offline-Modus sind Teil der Abnahme.
const pythonCode = String.raw`
import contextlib, csv, io, json, math, os, statistics, sys, tempfile
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
    exercises = [i for i in items if i["kind"] == "Übung"]
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
print(json.dumps({"examples":count,"pipeline":True,"edge_cases":True}))
`;
const python = spawnSync(process.env.LERNWERKZEUG_PYTHON || "python",["-c",pythonCode],{
  input:JSON.stringify({items,csv:path.join(root,"../Referenz/Pflicht Übungen/messdaten.csv"),mini:fs.readFileSync(path.join(root,"beispiele/mini.csv"),"utf8"),temporary_root:output}),encoding:"utf8",env:{...process.env,PYTHONIOENCODING:"utf-8"}
});
assert.equal(python.status,0,python.stderr || String(python.error));
const pythonResult = JSON.parse(python.stdout);

async function browserTests() {
  process.env.TEMP = output;
  process.env.TMP = output;
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
    async function waitForItem(id = "") {
      const title = items.find(item => item.id === id)?.title || "Von einer Datei zu einer Antwort.";
      await page.waitForFunction(expected => document.querySelector("#inhalt h1")?.textContent === expected,title);
    }
    async function navigate(id = "") {
      await page.goto(id ? `${url}#${id}` : url);
      await waitForItem(id);
    }
    await navigate();
    await page.waitForLoadState("networkidle");
    assert.equal(await page.locator("#treffer .result").count(),items.length);
    await page.screenshot({path:path.join(output,"desktop.png"),fullPage:true});
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
      ["len()",["len"]]
    ];
    for (const [query,expected] of cases) {
      await page.locator("#suche").fill(query);
      const matches = await page.locator("#treffer a").evaluateAll(links => links.map(link => link.hash.slice(1)));
      for (const id of expected) assert(matches.includes(id),`${query}: ${id}`);
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
    // Alle Ansichten und alle gerenderten lokalen Dateiverweise prüfen.
    const localLinks = new Set();
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
    // Skip-Link und alle Formularfelder müssen per Tastatur erreichbar sein.
    await navigate();
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").getAttribute("class"),"skip");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"),"inhalt");
    assert((await page.locator("#inhalt h1").innerText()).includes("Datei"));
    await navigate("aufgabe-6-2");
    await page.locator("#inhalt").evaluate(node => node.blur());
    await page.screenshot({path:path.join(output,"aufgabe-desktop.png"),fullPage:true});
    for (const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`Überlauf bei ${width}`);
      await page.locator("#suche").fill("6.3");
      await page.locator('#treffer a[href="#aufgabe-6-3"]').click();
      await waitForItem("aufgabe-6-3");
      assert.equal(await page.locator("#inhalt .solution pre").isVisible(),false);
      await page.locator("#reset").click();
      await page.locator('nav a[href="#aufgabe-6-2"]').click();
      await waitForItem("aufgabe-6-2");
      if (width === 390) {
        await page.locator("#inhalt").evaluate(node => node.blur());
        await page.screenshot({path:path.join(output,"mobil.png"),fullPage:true});
      }
    }
    await page.emulateMedia({reducedMotion:"reduce"});
    assert(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
    assert.deepEqual(errors,[]);
    assert.deepEqual(externalRequests,[]);
    return {searchCases:cases.length,views:items.length,localLinks:localLinks.size,externalRequests:externalRequests.length};
  } finally { await browser.close(); }
}

browserTests().then(browserResult => {
  const result = {date:new Date().toISOString(),status:"PASS",originalHashes:Object.keys(originalManifest.source_sha256).length,python:pythonResult,browser:browserResult};
  fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify(result,null,2) + "\n");
  console.log(JSON.stringify(result,null,2));
}).catch(error => {
  fs.writeFileSync(path.join(output,"ergebnis.json"),JSON.stringify({date:new Date().toISOString(),status:"FAIL",error:error.message},null,2) + "\n");
  console.error(error);
  process.exitCode = 1;
});
