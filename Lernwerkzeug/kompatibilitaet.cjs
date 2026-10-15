"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {pathToFileURL} = require("node:url");
const http = require("node:http");
const {once} = require("node:events");
const output = path.join(__dirname,"pruefung");
fs.mkdirSync(output,{recursive:true});
const temporary = path.join(__dirname,"../.upload-work/browser-temp");
fs.mkdirSync(temporary,{recursive:true});
process.env.TEMP = temporary;
process.env.TMP = temporary;
const cache = path.join(os.homedir(),"AppData/Local/ms-playwright");
if (!process.env.PLAYWRIGHT_BROWSERS_PATH && fs.existsSync(cache)) process.env.PLAYWRIGHT_BROWSERS_PATH = cache;
const result = {date:new Date().toISOString(),status:"RUNNING",host:process.platform,engines:[]};
const save = () => fs.writeFileSync(path.join(output,"kompatibilitaet.json"),JSON.stringify(result,null,2) + "\n");
save();

async function main() {
  const {chromium,firefox,webkit} = require("playwright");
  const files = new Map(["index.html","styles.css","inhalte.js","kurs.js","app.js"].map(name => [
    `/${name}`,{bytes:fs.readFileSync(path.join(__dirname,name)),type:name.endsWith(".html") ? "text/html" : name.endsWith(".css") ? "text/css" : "text/javascript"}
  ]));
  const server = http.createServer((request,response) => {
    const file = files.get(request.url);
    response.writeHead(file ? 200 : 404,{"Content-Type":`${file?.type || "text/plain"}; charset=utf-8`});
    response.end(file?.bytes || "Not found");
  });
  server.listen(0,"127.0.0.1");
  await once(server,"listening");
  const origin = `http://127.0.0.1:${server.address().port}`;
  const url = `${origin}/index.html`;
  const profiles = [[320,740],[390,844],[768,1024],[1024,768],[844,390],[1280,800],[1440,1000]];
  try {
  for (const engine of [chromium,firefox,webkit]) {
    const browser = await engine.launch({headless:true});
    const report = {name:engine.name(),version:browser.version(),transport:"HTTP loopback",profiles:[],errors:[],externalRequests:[]};
    result.engines.push(report);
    save();
    try {
      const context = await browser.newContext();
      await context.route("**/*",route => {
        const target = route.request().url();
        return target.startsWith(`${origin}/`) || target.startsWith("file:") ? route.continue() : route.abort();
      });
      const page = await context.newPage();
      page.on("pageerror",error => report.errors.push(error.message));
      page.on("console",message => { if (message.type() === "error") report.errors.push(message.text()); });
      page.on("request",request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(`${origin}/`)) report.externalRequests.push(request.url()); });
      page.setDefaultTimeout(10000);
      if (engine.name() !== "webkit" || process.platform !== "win32") {
        await page.goto(pathToFileURL(path.join(__dirname,"index.html")).href);
        await page.locator(".welcome-hero").waitFor();
        report.localFile = "PASS";
      } else {
        // shortcut: Windows-WebKit scheitert hier an file://, auf echtem Safari separat prüfen.
        report.localFile = "UNVERIFIED: Windows WebKit file:// internal error; HTTP tested";
      }
      await page.goto(url);
      await page.locator(".welcome-hero").waitFor();
      const routes = await page.evaluate(() => ["start","vorlesungen","uebung","befehle","lernkonzept","abdeckung",...inhalte.map(item => item.id)]);
      async function go(id) {
        await page.evaluate(id => { location.hash = id; },id);
        await page.waitForFunction(id => {
          const title = byId.get(id)?.title || {start:"Dein erster Schritt ins Programmieren.",vorlesungen:"Eine Idee nach der anderen.",uebung:"Deine Übung: Messdaten verstehen.",befehle:"Welcher Befehl passt wozu?",lernkonzept:"So lernst du hier programmieren.",abdeckung:"Was ist bereits abgedeckt?"}[id];
          return document.querySelector("#inhalt h1")?.textContent === title;
        },id,{polling:50}).catch(async error => {
          const current = await page.evaluate(() => ({hash:location.hash,title:document.querySelector("#inhalt h1")?.textContent}));
          throw new Error(`${engine.name()} #${id}: ${error.message}; ${JSON.stringify(current)}`);
        });
      }
      for (const [width,height] of profiles) {
        await page.setViewportSize({width,height});
        for (const id of routes) {
          await go(id);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`${engine.name()} ${width}×${height} #${id}: Seitenüberlauf`);
          assert.equal(await page.locator("#inhalt h1").count(),1);
          assert.equal(await page.locator("#inhalt details[open]").count(),0);
        }
        await go("start");
        if (width <= 760) {
          const toggle = page.locator("#nav-toggle");
          assert.equal(await toggle.isVisible(),true);
          assert.equal(await page.locator("#lernnavigation").isVisible(),false);
          await toggle.click();
          await page.locator('nav a[href="#vorlesungen"]').focus();
          await page.keyboard.press("Escape");
          assert.equal(await toggle.getAttribute("aria-expanded"),"false");
          assert.equal(await page.locator(":focus").getAttribute("id"),"nav-toggle");
          await toggle.click();
          await page.locator('nav a[href="#vorlesungen"]').click();
          await go("vorlesungen");
          assert.equal(await toggle.getAttribute("aria-expanded"),"false");
          assert.equal(await page.locator(":focus").getAttribute("id"),"inhalt");
          assert(await page.locator("#inhalt").evaluate(node => Math.abs(node.getBoundingClientRect().top) < 3));
        } else {
          assert.equal(await page.locator("#nav-toggle").isVisible(),false);
          assert.equal(await page.locator("#lernnavigation").isVisible(),true);
        }
        report.profiles.push({width,height,views:routes.length,status:"PASS"});
        if (engine.name() === "chromium" && [390,768,1440].includes(width)) {
          await go("start");
          await page.evaluate(() => scrollTo(0,0));
          await page.screenshot({path:path.join(output,`audit-${width}.png`),fullPage:false,animations:"disabled"});
        }
      }
      await page.setViewportSize({width:390,height:844});
      await go("start");
      await page.locator(".first-code pre").focus();
      assert.equal(await page.locator(":focus").getAttribute("tabindex"),"0");
      await go("lektion-8");
      await page.getByText("Beispielausgabe zeigen",{exact:true}).click();
      assert.equal(await page.locator("details pre").getAttribute("tabindex"),"0");
      await page.emulateMedia({reducedMotion:"reduce"});
      await page.waitForFunction(() => matchMedia("(prefers-reduced-motion: reduce)").matches && [...document.querySelectorAll("#inhalt,#inhalt *")].every(node => {
        const style = getComputedStyle(node);
        return style.animationName === "none" && style.transitionDuration.split(",").every(value => parseFloat(value) === 0);
      }),undefined,{polling:50,timeout:3000}).catch(async () => {
        const moving = await page.evaluate(() => ({reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,nodes:[...document.querySelectorAll("#inhalt,#inhalt *")].map(node => ({tag:node.tagName,class:node.className,type:node.type,animation:getComputedStyle(node).animationName,transition:getComputedStyle(node).transitionDuration})).filter(style => style.animation !== "none" || style.transition.split(",").some(value => parseFloat(value) !== 0))}));
        throw new Error(`Reduzierte Bewegung: ${JSON.stringify(moving)}`);
      });
      await page.emulateMedia({reducedMotion:"no-preference"});
      await page.setViewportSize({width:1440,height:1000});
      await go("aufgabe-6-2");
      await page.getByText("Musterlösung öffnen",{exact:true}).click();
      for (const modifier of ["ctrlKey","metaKey","shiftKey","altKey"]) {
        await page.locator('nav a[href="#aufgabe-6-2"]').evaluate((link,modifier) => {
          document.addEventListener("click",event => event.preventDefault(),{once:true});
          link.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,[modifier]:true}));
        },modifier);
        assert.equal(await page.locator(".solution[open]").count(),1,modifier);
      }
      await page.locator('nav a[href="#aufgabe-6-2"]').click();
      assert.equal(await page.locator("#inhalt details[open]").count(),0);
      await go("befehle");
      const commandCount = await page.locator("tbody tr").count();
      for (const symbol of ["<=","==","**"]) {
        await page.locator("#befehl-suche").fill(symbol);
        const count = await page.locator("tbody tr").count();
        assert(count > 0 && count < commandCount,`Operatorsuche ${symbol}`);
      }
      await go("lektion-8");
      await page.evaluate(() => scrollTo(0,document.documentElement.scrollHeight));
      await go("aufgabe-6-1");
      await page.goBack();
      await page.waitForFunction(() => document.querySelector("#inhalt h1")?.textContent === byId.get("lektion-8").title);
      assert.equal(await page.locator(":focus").getAttribute("id"),"inhalt");
      assert(await page.locator("#inhalt").evaluate(node => Math.abs(node.getBoundingClientRect().top) < 3));
      await page.goForward();
      await page.waitForFunction(() => document.querySelector("#inhalt h1")?.textContent === byId.get("aufgabe-6-1").title);
      for (const [width,height] of [[390,844],[768,1024]]) {
        const touch = await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:engine.name() !== "firefox",deviceScaleFactor:2});
        await touch.route("**/*",route => route.request().url().startsWith(`${origin}/`) ? route.continue() : route.abort());
        const screen = await touch.newPage();
        screen.on("pageerror",error => report.errors.push(error.message));
        await screen.goto(url);
        await screen.locator(".welcome-hero").waitFor();
        if (width <= 760) await screen.locator("#nav-toggle").tap();
        await screen.locator('nav a[href="#aufgabe-6-2"]').tap();
        await screen.getByRole("heading",{name:"6.2 · Daten parsen und Ausreißer filtern",exact:true}).waitFor();
        await screen.getByText("Hinweis 1",{exact:true}).tap();
        assert.equal(await screen.locator("details[open]").count(),1);
        assert(await screen.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await touch.close();
      }
      report.touchProfiles = "390×844, 768×1024: navigation and hints PASS (emulation)";
      await go("lektion-1");
      const quiz = page.locator(".lesson-quiz");
      await quiz.locator('input[value="0"]').check();
      await quiz.getByRole("button",{name:"Antwort prüfen"}).click();
      assert((await quiz.getByRole("status").innerText()).startsWith("Richtig."));
      await page.locator("#lektion-bearbeitet").check();
      await page.reload();
      assert.equal(await page.locator("#lektion-bearbeitet").isChecked(),true);
      await page.locator("#lektion-bearbeitet").uncheck();
      const blocked = await browser.newContext();
      await blocked.addInitScript(() => {
        Object.defineProperty(Storage.prototype,"getItem",{value() { throw new DOMException("blocked","SecurityError"); }});
        Object.defineProperty(Storage.prototype,"setItem",{value() { throw new DOMException("blocked","SecurityError"); }});
      });
      await blocked.route("**/*",route => route.request().url().startsWith(`${origin}/`) ? route.continue() : route.abort());
      const session = await blocked.newPage();
      await session.goto(`${url}#lektion-1`);
      await session.locator("#lektion-bearbeitet").check();
      assert((await session.locator(".completion + .example-note").innerText()).includes("nur für diese Sitzung"));
      await session.evaluate(() => { location.hash = "lektion-2"; });
      await session.waitForFunction(() => document.querySelector("#inhalt h1")?.textContent === byId.get("lektion-2").title,undefined,{polling:50});
      await session.evaluate(() => { location.hash = "lektion-1"; });
      await session.waitForFunction(() => document.querySelector("#inhalt h1")?.textContent === byId.get("lektion-1").title,undefined,{polling:50});
      assert.equal(await session.locator("#lektion-bearbeitet").isChecked(),true);
      await blocked.close();
      for (const [raw,expected] of [["kein JSON",false],['{"anderes_format":true}',false],['["lektion-1","unbekannt",5,null]',true]]) {
        const malformed = await browser.newContext();
        await malformed.addInitScript(raw => { Object.defineProperty(Storage.prototype,"getItem",{value() { return raw; }}); },raw);
        await malformed.route("**/*",route => route.request().url().startsWith(`${origin}/`) ? route.continue() : route.abort());
        const probe = await malformed.newPage();
        probe.on("pageerror",error => report.errors.push(error.message));
        await probe.goto(`${url}#lektion-1`);
        await probe.locator("#lektion-bearbeitet").waitFor();
        assert.equal(await probe.locator("#lektion-bearbeitet").isChecked(),expected);
        await malformed.close();
      }
      report.learning = "quiz, persistent progress, malformed data and blocked-storage session fallback PASS";
      await page.evaluate(() => { location.hash = "unbekannt"; });
      await page.getByRole("heading",{name:"Inhalt nicht gefunden",exact:true}).waitFor();
      await go("start");
      assert.deepEqual(report.errors,[]);
      assert.deepEqual(report.externalRequests,[]);
      report.regressions = "navigation, escape, focus, modifier keys, history, operators, keyboard code, reduced motion, unknown route";
    } finally {
      await browser.close();
      save();
    }
  }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
  result.status = "PASS";
  save();
  console.log(JSON.stringify(result,null,2));
}

main().catch(error => {
  result.status = "FAIL";
  result.error = error.message;
  save();
  console.error(error);
  process.exitCode = 1;
});
