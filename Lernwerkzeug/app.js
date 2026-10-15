"use strict";
const byId = new Map(inhalte.map(item => [item.id, item]));
const searchInput = document.querySelector("#suche");
const typeInput = document.querySelector("#art");
const topicInput = document.querySelector("#thema");
const article = document.querySelector("#inhalt");
const results = document.querySelector("#treffer");
const stopwords = new Set(["wie","ich","die","der","das","den","dem","ein","eine","einen","einer","mit","von","zu","zum","zur","und","ist","kann","man","was","mache"]);

function normalize(text) {
  return text.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9.]+/g," ").trim();
}

function findItems(query, kind = "", topic = "") {
  const normalized = normalize(query);
  const tokens = normalized.split(/\s+/).filter(token => token && !stopwords.has(token));
  return inhalte.filter(item => (!kind || item.kind === kind) && (!topic || item.topic === topic)).map(item => {
    const title = normalize(item.title);
    const aliases = (item.aliases || []).map(normalize);
    // Hinweise, Musterlösungen und Zahlenausgaben gehören nicht in den Suchindex.
    const context = normalize([item.summary,item.explanation,item.topic].join(" "));
    const fields = [title,...aliases,context];
    if (!tokens.every(token => fields.some(field => field.includes(token)))) return null;
    const score = (item.number === normalized ? 1000 : 0) + (aliases.includes(normalized) ? 100 : 0) + (title === normalized ? 100 : 0) + tokens.reduce((total,token) => total + (title.includes(token) ? 20 : 0) + (aliases.some(alias => alias.includes(token)) ? 10 : 0),0);
    return {item,score};
  }).filter(Boolean).sort((a,b) => b.score - a.score).map(result => result.item);
}

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function section(title, parent = article) {
  parent.append(el("h2",title));
}

function textList(title, texts, ordered = false) {
  if (!texts?.length) return;
  section(title);
  const list = el(ordered ? "ol" : "ul");
  texts.forEach(text => list.append(el("li",text)));
  article.append(list);
}

function itemLinks(title, ids) {
  if (!ids?.length) return;
  section(title);
  const list = el("ul",undefined,"links");
  [...new Set(ids)].forEach(id => {
    const li = el("li");
    const link = el("a",byId.get(id).title);
    link.href = `#${id}`;
    li.append(link);
    list.append(li);
  });
  article.append(list);
}

function codeBlock(code, parent = article) {
  parent.append(el("p","Python · selbst erstelltes Beispiel","code-label"));
  const pre = el("pre");
  pre.tabIndex = 0;
  pre.append(el("code",code));
  parent.append(pre);
}

function sourceLinks(item) {
  const box = el("div",undefined,"source");
  box.append(el("p", "Quellen und Einordnung"));
  box.append(el("p",item.kind === "Übung" ? "Auftrag am Original abgeglichen; Begleitung und Lösung selbst erstellt." : "Selbst erstellte Ergänzung mit Bezug zu den verlinkten Aufgaben."));
  item.sources.forEach(id => {
    const source = quellen[id];
    const p = el("p");
    const link = el("a",source.title);
    link.href = source.href.replace(/\\/g,"/");
    link.target = "_blank";
    link.rel = "noopener";
    p.append(link);
    if (source.image) {
      const imageLink = el("a","Originalseite als Bild");
      imageLink.href = source.image;
      imageLink.target = "_blank";
      imageLink.rel = "noopener";
      p.append(el("br"),imageLink);
    } else if (id === "csv") {
      link.download = "messdaten.csv";
    }
    box.append(p);
  });
  if (item.id === "quellen") {
    for (const [title,href] of [["Vollständiger Seitenindex","../Referenz_Sichtung/Seitenindex.md"],["Sichtungsbericht","../Referenz_Sichtung/Sichtungsbericht.md"],["Technischer Prüfbericht","pruefung/PRUEFBERICHT.md"]]) {
      const p = el("p");
      const link = el("a",title);
      link.href = href;
      p.append(link);
      box.append(p);
    }
  }
  article.append(box);
}

function renderItem(item) {
  article.replaceChildren(el("p",`${item.kind} / ${item.topic}`,"kind"),el("h1",item.title),el("p",item.summary,"intro"),el("p",item.explanation));
  if (item.notice) article.append(el("div",item.notice,"notice"));
  if (item.kind === "Übung") {
    const note = el("p");
    const link = el("a","CSV für deinen Übungsordner speichern");
    link.href = quellen.csv.href;
    link.download = "messdaten.csv";
    note.append(link);
    article.append(note);
  }
  itemLinks("Das brauchst du",item.needs);
  textList(item.kind === "Fehlerhilfe" ? "So grenzt du den Fehler ein" : "Deine Arbeitsschritte",item.steps,true);
  if (item.code) {
    section("Ein kleines Beispiel");
    codeBlock(item.code);
    if (item.output !== undefined) {
      const detail = el("details");
      detail.append(el("summary","Beispielausgabe zeigen"),el("pre",item.output.trimEnd()));
      article.append(detail);
    }
    const note = "Selbst erstelltes Beispiel; Ausführung siehe Prüfbericht." + (item.code.includes("mini.csv") ? " Für mini.csv werden die synthetischen Zeilen Temperatur, 10.0 und 20.0 verwendet." : "");
    article.append(el("p",note,"example-note"));
    if (item.code.includes("mini.csv")) {
      const download = el("a","Selbst erstellte mini.csv speichern");
      download.href = "beispiele/mini.csv";
      download.download = "mini.csv";
      article.append(download);
    }
  }
  if (item.pitfall) {
    section("Darauf solltest du achten");
    article.append(el("p",item.pitfall));
  }
  if (item.hints?.length) {
    section("Hinweise, wenn du festhängst");
    item.hints.forEach((hint,index) => {
      const detail = el("details");
      detail.append(el("summary",`Hinweis ${index + 1}`),el("p",hint));
      article.append(detail);
    });
  }
  textList("Prüfe dein Ergebnis",item.checks);
  if (item.solution) {
    const detail = el("details",undefined,"solution");
    detail.append(el("summary","Musterlösung öffnen"),el("p",item.solution.intro));
    codeBlock(item.solution.code,detail);
    detail.append(el("p",item.solution.explanation));
    article.append(detail);
  }
  const exercises = inhalte.filter(candidate => candidate.kind === "Übung" && candidate.needs.includes(item.id)).map(candidate => candidate.id);
  itemLinks("Hier brauchst du das",exercises);
  itemLinks("Passt dazu",item.related);
  if (item.next) {
    const link = el("a",`Weiter: ${byId.get(item.next).title}`,"primary-link");
    link.href = `#${item.next}`;
    article.append(link);
  }
  sourceLinks(item);
}

function renderStart() {
  article.replaceChildren(el("p","Übungsblock 6 / Standard-Python","kind"),el("h1","Von einer Datei zu einer Antwort."),el("p","Öffnen, verstehen, ausprobieren. Finde den nächsten Schritt für deine Python-Übung.","intro"));
  const path = el("ol",undefined,"step-path");
  ["6.1 Einlesen","6.2 Filtern","6.3 Auswerten"].forEach(text => path.append(el("li",text)));
  article.append(path);
  section("Starte mit deiner Aufgabe");
  article.append(el("p","Jede Aufgabe verbindet das nötige Wissen mit kleinen Beispielen, einzeln aufklappbaren Hinweisen und einer Selbstkontrolle. Die Musterlösung öffnest du erst, wenn du sie brauchst."));
  itemLinks("Die drei Übungen",["aufgabe-6-1","aufgabe-6-2","aufgabe-6-3"]);
  section("So probierst du es selbst aus");
  article.append(el("p","Speichere eine Kopie der CSV mit main.py in deinem eigenen Übungsordner. Starte Python dort im Editor. Diese Seite erklärt die Schritte; sie führt keinen Python-Code aus."));
  article.append(el("div","Die Quelle enthält abweichende Dateinamen und Sollausgaben. Du findest die Hinweise direkt bei den betroffenen Aufgaben. Dieser erste Stand deckt nur Aufgaben 6.1–6.3 ab.","notice"));
  itemLinks("Orientierung",["ablauf","quellen"]);
}

function selectedId() { return location.hash.slice(1); }

function renderResults() {
  const matches = findItems(searchInput.value,typeInput.value,topicInput.value);
  document.querySelector("#trefferzahl").textContent = `${matches.length} ${matches.length === 1 ? "Inhalt" : "Inhalte"}${searchInput.value ? ` für „${searchInput.value}“` : " im Übungsblock"}`;
  results.replaceChildren();
  matches.forEach(item => {
    const link = el("a",undefined,"result");
    link.href = `#${item.id}`;
    if (selectedId() === item.id) link.setAttribute("aria-current","page");
    link.append(el("small",`${item.kind} / ${item.topic}`),el("strong",item.title),el("p",item.summary));
    results.append(link);
  });
  if (!matches.length) results.append(el("p","Kein Treffer in diesem Übungsblock. Versuche CSV, Mittelwert, 6.2 oder ValueError. Setze auch die Filter zurück. Weitere Modulthemen sind noch nicht enthalten.","empty"));
}

function route(focus = false) {
  const id = selectedId();
  const item = byId.get(id);
  if (item) renderItem(item);
  else if (!id || id === "start") renderStart();
  else article.replaceChildren(el("h1","Inhalt nicht gefunden"),el("p","Wähle eine Übung oder suche oben nach einem Befehl."));
  document.title = `${item ? item.title : "Coding"} · Lernwerkzeug`;
  document.querySelectorAll("nav a").forEach(link => {
    if (link.hash === location.hash || ((!id || id === "start") && link.hash === "#start")) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });
  renderResults();
  if (focus) article.focus({preventScroll:true});
}

function resetSearch() {
  searchInput.value = "";
  typeInput.value = "";
  topicInput.value = "";
  renderResults();
}
searchInput.addEventListener("input",renderResults);
typeInput.addEventListener("change",renderResults);
topicInput.addEventListener("change",renderResults);
document.querySelector("#reset").addEventListener("click",() => {resetSearch(); searchInput.focus();});
document.querySelectorAll("[data-query]").forEach(button => button.addEventListener("click",() => {resetSearch(); searchInput.value = button.dataset.query; renderResults(); searchInput.focus();}));
document.addEventListener("click",event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  if (link.classList.contains("skip")) { event.preventDefault(); article.focus(); return; }
  if (link.hash === "#start") resetSearch();
  // Native same-hash links do not trigger hashchange; still reset closed hints and focus.
  if (link.hash === location.hash) route(true);
  article.scrollIntoView({block:"start"});
});
window.addEventListener("hashchange",() => route(true));
route();
