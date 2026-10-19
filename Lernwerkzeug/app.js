"use strict";
const byId = new Map(inhalte.map(item => [item.id, item]));
const searchInput = document.querySelector("#suche");
const typeInput = document.querySelector("#art");
const topicInput = document.querySelector("#thema");
const article = document.querySelector("#inhalt");
const results = document.querySelector("#treffer");
// Windows-WebKit aktualisiert Media-CSS beim Wechsel hier nicht zuverlässig.
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
function syncMotion() { document.documentElement.classList.toggle("reduce-motion",motionQuery.matches); }
motionQuery.addEventListener("change",syncMotion);
syncMotion();
const languageKey = "cud-sprache-v1";
const themeKey = "cud-design-v1";
const issuesURL = "https://github.com/Sae-l/CuD/issues";
let language = (() => {
  try { const saved = localStorage.getItem(languageKey); return Object.hasOwn(sprachen,saved) ? saved : "de"; }
  catch { return "de"; }
})();
function translation(entry) { return language === "de" ? undefined : entry?.[uebersetzungsSprachen.indexOf(language)]; }
function t(text) { return translation(ui[text]) || text; }
// Nur übersetzte Knoten erhalten Sprache und Schreibrichtung; Lerninhalte bleiben Deutsch.
function markLanguage(node,translated) {
  if (translated) { node.lang = language; node.dir = rtlSprachen.has(language) ? "rtl" : "ltr"; }
  else { node.removeAttribute("lang"); node.removeAttribute("dir"); }
}
const progressKey = "cud-lernfortschritt-v1";
let progressPersistent = true;
const completed = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
    return new Set(Array.isArray(saved) ? saved.filter(id => typeof id === "string" && byId.get(id)?.kind === "Vorlesung") : []);
  } catch {
    progressPersistent = false;
    return new Set();
  }
})();
const reviewKey = "cud-wiederholung-v1";
let reviewPersistent = true;
const reviews = (() => {
  try { return parseReviewState(localStorage.getItem(reviewKey),vorlesungen.map(lesson => lesson.id)); }
  catch { reviewPersistent = false; return new Map(); }
})();

function dueReviews(now = Date.now()) {
  return vorlesungen.filter(lesson => reviews.has(lesson.id) ? reviews.get(lesson.id).due <= now : completed.has(lesson.id));
}

function reviewStorageNote() {
  return reviewPersistent ? "Wiederholungen werden nur in diesem Browser gespeichert." : "Wiederholungen gelten nur für diese Sitzung; der Speicher ist nicht verfügbar oder die gespeicherten Daten waren unlesbar.";
}
const stopwords = new Set(["wie","ich","die","der","das","den","dem","ein","eine","einen","einer","mit","von","zu","zum","zur","und","ist","kann","man","was","mache"]);
for (const topic of [...new Set(inhalte.map(item => item.topic))]) topicInput.append(el("option",topic));
for (const command of weitereBefehle) {
  const lesson = byId.get(command[4]);
  (lesson.aliases ||= []).push(command[0],command[1]);
}

function normalize(text) {
  return text.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9.<>=!+*/%\-]+/g," ").trim();
}

function findItems(query, kind = "", topic = "") {
  const normalized = normalize(query);
  const tokens = normalized.split(/\s+/).filter(token => token && !stopwords.has(token));
  return inhalte.filter(item => (!kind || item.kind === kind) && (!topic || item.topic === topic)).map(item => {
    const title = normalize(item.title);
    const aliases = (item.aliases || []).map(normalize);
    // Hinweise, Musterlösungen und Zahlenausgaben gehören nicht in den Suchindex.
    const context = normalize([item.summary,item.explanation,item.topic,...(item.blocks || []).flat()].join(" "));
    const fields = [title,...aliases,context];
    if (!tokens.every(token => fields.some(field => field.includes(token)))) return null;
    const score = (item.number === normalized ? 1000 : 0) + (aliases.includes(normalized) ? 100 : 0) + (title === normalized ? 100 : 0) + tokens.reduce((total,token) => total + (title.includes(token) ? 20 : 0) + (aliases.some(alias => alias.includes(token)) ? 10 : 0),0);
    return {item,score};
  }).filter(Boolean).sort((a,b) => b.score - a.score).map(result => result.item);
}

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) {
    const translated = translation(ui[text]);
    node.textContent = translated || text;
    if (translated) markLanguage(node,true);
  }
  if (className) node.className = className;
  return node;
}

function section(title, parent = article) {
  const heading = el("h2",title);
  parent.append(heading);
  return heading;
}

function textList(title, texts, ordered = false) {
  if (!texts?.length) return;
  const heading = section(title);
  const list = el(ordered ? "ol" : "ul");
  texts.forEach(text => list.append(el("li",text)));
  article.append(list);
  return heading;
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

function codeBox(code, label) {
  const box = el("div",undefined,"code-box");
  const tools = el("div",undefined,"code-tools");
  if (label) tools.append(el("p",label,"code-label"));
  const copy = el("button","Kopieren","copy-code"); copy.type = "button";
  const status = el("span",undefined,"visually-hidden"); status.setAttribute("role","status");
  tools.append(copy,status);
  const pre = el("pre");
  pre.tabIndex = 0;
  pre.append(el("code",code));
  box.append(tools,pre);
  return box;
}

function codeBlock(code, parent = article) {
  parent.append(codeBox(code,"Python · selbst erstelltes Beispiel"));
}

function explanationNode(item) {
  const node = el("p",item.explanation);
  const translated = translation(erklaerungen[item.id]);
  if (!translated) return node;
  const shared = ui["Die Begleitung und Musterlösung sind selbst verfasst; maßgeblich bleibt die verlinkte Originalaufgabe."];
  node.textContent = item.explanation.endsWith("maßgeblich bleibt die verlinkte Originalaufgabe.") ? `${translated} ${translation(shared)}` : translated;
  markLanguage(node,true);
  return node;
}

function renderQuiz(item) {
  const quiz = item.quiz;
  if (!quiz) return;
  const heading = section("Verstanden? Prüfe deine Idee");
  heading.id = "lektion-check"; heading.tabIndex = -1;
  const form = el("form",undefined,"lesson-quiz");
  const fieldset = el("fieldset");
  fieldset.append(el("legend",quiz.question));
  quiz.options.forEach((option,index) => {
    const label = el("label");
    const radio = el("input");
    radio.type = "radio"; radio.name = `quiz-${item.id}`; radio.value = String(index); radio.required = true;
    label.append(radio,document.createTextNode(option)); fieldset.append(label);
  });
  const button = el("button","Antwort prüfen","secondary-link"); button.type = "submit";
  const feedback = el("p",undefined,"quiz-feedback"); feedback.setAttribute("role","status");
  feedback.setAttribute("aria-atomic","true");
  form.append(fieldset,button,feedback);
  form.addEventListener("change",() => { feedback.textContent = ""; delete feedback.dataset.result; });
  form.addEventListener("submit",event => {
    event.preventDefault();
    const correct = Number(new FormData(form).get(`quiz-${item.id}`)) === quiz.correct;
    feedback.textContent = `${correct ? "Richtig." : "Noch nicht."} ${quiz.explanation}`;
    feedback.dataset.result = correct ? "correct" : "retry";
    const planned = planReview(reviews.get(item.id),correct);
    reviews.set(item.id,planned);
    try { localStorage.setItem(reviewKey,JSON.stringify(Object.fromEntries(reviews))); reviewPersistent = true; }
    catch { reviewPersistent = false; }
    feedback.textContent += correct ? ` Wiederholen ab ${new Date(planned.due).toLocaleString("de-DE",{dateStyle:"medium",timeStyle:"short"})}.` : " Diese Idee bleibt zum Wiederholen vorgemerkt.";
    feedback.textContent += ` ${reviewStorageNote()}`;
  });
  article.append(form);
  return form;
}

function renderProgress(item) {
  section("Deine Bearbeitungsmarke");
  const label = el("label",undefined,"completion");
  const checkbox = el("input"); checkbox.type = "checkbox"; checkbox.id = "lektion-bearbeitet";
  checkbox.checked = completed.has(item.id);
  label.append(checkbox,document.createTextNode("Ich habe die Miniübung selbst geschrieben und geprüft."));
  const note = el("p",undefined,"example-note"); note.setAttribute("role","status");
  const update = () => { note.textContent = `${checkbox.checked ? "Als bearbeitet markiert." : "Nicht als bearbeitet markiert."} ${progressPersistent ? "Deine Selbsteinschätzung wird nur in diesem Browser gespeichert. Kein Testnachweis und keine Synchronisation. Zum Entfernen das Häkchen lösen." : "Speicherung ist hier nicht verfügbar. Deine Marken gelten nur für diese Sitzung. Sie sind eine Selbsteinschätzung, kein Testnachweis."}`; };
  checkbox.addEventListener("change",() => {
    if (checkbox.checked) completed.add(item.id); else completed.delete(item.id);
    try { localStorage.setItem(progressKey,JSON.stringify([...completed])); progressPersistent = true; }
    catch { progressPersistent = false; }
    update();
  });
  update(); article.append(label,note);
}

function sourceLinks(item) {
  const box = el("div",undefined,"source");
  box.append(el("p", "Quellen und Einordnung"));
  box.append(el("p",item.kind === "Übung" ? "Auftrag am Original abgeglichen; Begleitung und Lösung selbst erstellt." : item.kind === "Vorlesung" ? "Selbst verfasste Zusammenfassung anhand der vorhandenen Vorlesungstexte. Die verlinkten PDF-Seiten enthalten die Originalinhalte. Miniübungen sind eigene Ergänzungen." : item.kind === "Einrichtung" ? "Selbst erstellte Anleitung; offizielle Dokumentation am 15.10.2026 geprüft. Installation und Gerätebedienung noch nicht praktisch getestet." : "Selbst erstellte Ergänzung mit Bezug zu den verlinkten Aufgaben."));
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
  const report = el("a","Problem mit dieser Seite melden");
  report.href = `${issuesURL}/new?template=fehler.md&title=${encodeURIComponent(`[Fehler] ${item.title}`)}`;
  report.target = "_blank"; report.rel = "noopener noreferrer";
  const reportLine = el("p"); reportLine.append(report); box.append(reportLine);
  article.append(box);
}

function renderItem(item) {
  article.replaceChildren(el("p",`${item.kind} / ${item.topic}`,"kind"),el("h1",item.title),el("p",item.summary,"intro"),explanationNode(item));
  if (item.kind === "Vorlesung" || item.kind === "Einrichtung") {
    if (item.kind === "Vorlesung") {
      const back = el("a","Alle Vorlesungen ansehen");
      back.href = "#vorlesungen";
      article.append(back);
      section("Das kannst du danach");
      article.append(el("p",item.goal,"learning-goal"));
      const jumps = el("nav",undefined,"lesson-jumps");
      jumps.setAttribute("aria-label","In dieser Lektion");
      for (const [label,target] of [["Beispiel","lektion-beispiel"],["Selbst schreiben","lektion-praxis"],["Verständnischeck","lektion-check"]]) {
        const button = el("button",label);
        button.type = "button";
        button.addEventListener("click",() => {
          const heading = document.getElementById(target);
          heading.focus({preventScroll:true}); heading.scrollIntoView({block:"start"});
        });
        jumps.append(button);
      }
      article.append(jumps);
    }
    for (const [title,text] of item.blocks) { section(title); article.append(el("p",text)); }
  }
  if (item.notice) article.append(el("div",item.notice,"notice"));
  if (item.download) {
    const download = actionLink(item.download[0],item.download[1]);
    download.download = item.download[1].split("/").pop();
    article.append(download);
  }
  if (item.kind === "Übung" && item.sources.includes("csv")) {
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
    const heading = section(item.kind === "Vorlesung" ? "Erst vorhersagen: Was wird ausgegeben?" : "Ein kleines Beispiel");
    if (item.kind === "Vorlesung") { heading.id = "lektion-beispiel"; heading.tabIndex = -1; }
    codeBlock(item.code);
    if (item.output !== undefined) {
      const detail = el("details");
      const output = el("pre",item.output.trimEnd());
      output.tabIndex = 0;
      detail.append(el("summary","Beispielausgabe zeigen"),output);
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
  if (item.kind === "Vorlesung") {
    const practiceHeading = textList("Jetzt bist du dran",[
      "Vorhersagen: Lies das Beispiel und notiere die erwartete Ausgabe, bevor du sie öffnest.",
      "Ausführen: Schreibe den Code in deine Python-Datei und vergleiche die Ausgabe mit deiner Vermutung.",
      `Untersuchen: ${item.investigate}`,
      `Verändern: ${item.modify}`,
      `Selbst schreiben: ${item.make}`
    ],true);
    practiceHeading.id = "lektion-praxis"; practiceHeading.tabIndex = -1;
    const answer = el("details");
    answer.append(el("summary","Selbstkontrolle zur Miniübung öffnen"),el("p",item.answer));
    article.append(answer,el("p","Wiederholung: Erkläre morgen ohne Vorlage die wichtigste Idee und löse die kleine Aufgabe noch einmal.","learning-goal"));
    renderQuiz(item);
    renderProgress(item);
  }
  if (item.links) {
    section("Offizielle Anleitungen und Downloads");
    for (const [title,href] of item.links) {
      const p = el("p");
      const link = el("a",title);
      link.href = href; link.target = "_blank"; link.rel = "noopener noreferrer";
      p.append(link); article.append(p);
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
      detail.append(el("summary",`${t("Hinweis")} ${index + 1}`),el("p",hint));
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
    const link = el("a",`${t("Weiter")}: ${byId.get(item.next).title}`,"primary-link");
    link.href = `#${item.next}`;
    article.append(link);
  }
  sourceLinks(item);
}

function renderLearningPlan() {
  const next = vorlesungen.find(lesson => !completed.has(lesson.id));
  const due = dueReviews();
  article.replaceChildren(el("p","Dein persönlicher Lernplan","kind"),el("h1","Heute ein Stück weiter."),el("p","Eine Idee verstehen, selbst Code schreiben und später ohne Vorlage wiederholen. Hier geht es für dich weiter.","intro"));
  const grid = el("div",undefined,"plan-grid");
  const current = el("section",undefined,"plan-current");
  if (next) {
    current.append(el("p",`Etappe ${String(vorlesungen.indexOf(next) + 1).padStart(2,"0")} / ${vorlesungen.length} · ${next.topic}`,"plan-meta"),el("h2",next.title),el("p",next.goal),actionLink(completed.size ? "Etappe fortsetzen" : "Erste Etappe öffnen",`#${next.id}`,"primary-link"));
    const source = quellen[next.sources[0]];
    current.append(actionLink(source.title,source.href,"plan-source"));
  } else {
    current.append(el("p","Alle Etappen selbst bearbeitet","plan-meta"),el("h2","Jetzt kommt dein eigener Code."),el("p","Wende die Ideen im Mini-Projekt auf neue Daten an. Die Bearbeitungsmarken sind deine Selbsteinschätzung."),actionLink("Mini-Projekt öffnen","#praxis-zeitreihe","primary-link"));
  }
  const overview = el("section",undefined,"plan-overview");
  overview.append(el("h2","Dein Lernrhythmus"),el("p",`${completed.size} von ${vorlesungen.length} Etappen selbst bearbeitet.`));
  const progress = el("progress"); progress.max = vorlesungen.length; progress.value = completed.size;
  progress.setAttribute("aria-label","Als selbst bearbeitet markierte Etappen");
  overview.append(progress,el("p",due.length ? `${due.length} ${due.length === 1 ? "Idee ist" : "Ideen sind"} zum Wiederholen vorgemerkt.` : "Heute ist keine Wiederholung fällig.","review-count"),actionLink(due.length ? "Wiederholung starten" : "Wiederholungsplan ansehen","#wiederholen","secondary-link"),el("p","Eine richtige Auswahl plant eine Wiederholung ein. Das Häkchen setzt du nach dem eigenen Programmieren selbst.","example-note"));
  grid.append(current,overview); article.append(grid);
  const setup = el("div",undefined,"plan-setup");
  setup.append(el("strong","Zum ersten Mal hier?"),el("p","Richte zuerst deine Werkzeuge ein. Danach beginnst du mit Etappe 1."),actionLink("Python einrichten","#python-setup"),actionLink("VS Code einrichten","#vscode-setup"));
  article.append(setup);
  section("Dein Weg durch die Vorlesungen");
  const path = el("ol",undefined,"plan-path");
  for (const [index,lesson] of vorlesungen.entries()) {
    const row = el("li");
    const link = actionLink("",`#${lesson.id}`);
    link.append(el("span",String(index + 1).padStart(2,"0"),"plan-number"),el("span",lesson.title),el("small",completed.has(lesson.id) ? "Selbst bearbeitet" : lesson === next ? "Nächste Etappe" : "Offen"));
    if (lesson === next) link.classList.add("plan-next");
    row.append(link); path.append(row);
  }
  article.append(path,actionLink("Vorlesungsdetails und Originale ansehen","#vorlesungen"),el("p",`${reviewStorageNote()} ${progressPersistent ? "Bearbeitungsmarken bleiben in diesem Browser." : "Bearbeitungsmarken gelten nur für diese Sitzung."} Keine Synchronisation und keine Kompetenzmessung.`,"example-note"));
}

function renderReview(queue = dueReviews(), index = 0) {
  article.replaceChildren(el("p","Ohne Vorlage erinnern","kind"),el("h1","Heute wiederholen."));
  const lesson = queue[index];
  if (!lesson) {
    article.append(el("p",queue.length ? "Deine Runde ist beendet. Ideen mit falscher Antwort bleiben fällig; du kannst sie später noch einmal üben." : "Gerade ist nichts fällig. Bearbeite eine Etappe und prüfe deine Idee. Eine richtige Antwort plant die nächste Wiederholung ein.","intro"));
    const upcoming = vorlesungen.filter(item => reviews.get(item.id)?.due > Date.now()).sort((a,b) => reviews.get(a.id).due - reviews.get(b.id).due);
    if (upcoming.length) article.append(el("p",`Nächster Termin: ${new Date(reviews.get(upcoming[0].id).due).toLocaleString("de-DE",{dateStyle:"medium",timeStyle:"short"})} · ${upcoming[0].title}`));
    article.append(actionLink("Zum Lernplan","#lernplan","primary-link"));
  } else {
    article.append(el("p",`Idee ${index + 1} von ${queue.length} · ${lesson.title}`,"intro"),el("p","Schreibe zuerst deine Erklärung und die Miniübung in deinen Editor oder auf Papier. Öffne die Selbstkontrolle erst nach deinem Versuch."));
    const prompt = el("section",undefined,"recall-prompt");
    prompt.append(el("h2","Erklären und selbst schreiben"),el("p",lesson.investigate),el("p",lesson.make));
    const check = el("details");
    check.append(el("summary","Selbstkontrolle öffnen"),el("p",lesson.answer)); prompt.append(check); article.append(prompt);
    const quiz = renderQuiz(lesson);
    const next = el("button",index + 1 < queue.length ? "Nächste Idee" : "Runde abschließen","primary-link");
    next.type = "button"; next.disabled = true;
    quiz.addEventListener("submit",() => { next.disabled = false; });
    quiz.addEventListener("change",() => { next.disabled = true; });
    next.addEventListener("click",() => { renderReview(queue,index + 1); article.focus({preventScroll:true}); article.scrollIntoView({block:"start"}); });
    article.append(next,actionLink("Lektion nachlesen",`#${lesson.id}`,"secondary-link"));
  }
  article.append(el("p",`Die Auswahlfrage plant den Termin; deine selbst geschriebene Lösung wird hier nicht bewertet. Richtige Antworten verlängern fällige Abstände auf ${reviewIntervals.join(", ")} Tage. Fehler bleiben fällig. ${reviewStorageNote()}`,"example-note"));
}

function renderStart() {
  const hero = el("div",undefined,"welcome-hero");
  const image = el("img",undefined,"hero-image");
  image.src = "assets/lernraum.jpg"; image.alt = ""; image.width = 1600; image.height = 900;
  const intro = el("div",undefined,"hero-copy");
  const title = el("h1");
  title.append(document.createTextNode("Dein erster Schritt "),el("span","ins Programmieren."));
  intro.append(el("p","Willkommen in deinem Lernraum","kind"),title,el("p","Du musst noch nichts können. Entdecke Python, verstehe deine Vorlesung und schreibe Schritt für Schritt deinen eigenen Code.","intro"));
  const actions = el("div",undefined,"hero-actions");
  actions.append(actionLink("Meinen Lernplan öffnen","#lernplan","primary-link"),actionLink("Zur aktuellen Übung","#uebung","secondary-link"));
  intro.append(actions);
  hero.append(image,intro,el("p","Coding und Digitalisierung · Vom ersten Gedanken zum eigenen Programm.","hero-caption"));
  article.replaceChildren(hero);
  if (completed.size) {
    const next = vorlesungen.find(lesson => !completed.has(lesson.id));
    const resume = el("div",undefined,"resume-learning");
    resume.append(el("p","Schön, dass du wieder da bist. Dein Lernweg wartet."),actionLink(next ? "Weiterlernen" : "Lektionen wiederholen",next ? `#${next.id}` : "#vorlesungen","secondary-link"));
    article.append(resume);
  }
  const entries = el("section",undefined,"home-section");
  const entryTitle = el("h2");
  const inline = el("span",undefined,"inline-image"); inline.setAttribute("aria-hidden","true");
  entryTitle.append(document.createTextNode("Dein Studium. "),inline,document.createTextNode(" Dein Einstieg."));
  entries.append(entryTitle,el("p","Eine Frage nachschlagen oder ganz von vorne beginnen. Hier findest du deinen nächsten Schritt.","section-intro"));
  const cards = el("div",undefined,"entry-grid");
  for (const [title,description,href,visual] of [
    ["Vorlesungen verstehen",`${vorlesungen.length} übersichtliche Etappen in der Reihenfolge deiner Unterlagen.`,"#vorlesungen","Python → NumPy → Pandas"],
    ["Aktuelle Übung bearbeiten","CSV einlesen, Daten filtern und auswerten – mit Erklärungen und gestuften Lösungen.","#uebung","Datei. Daten. Durchblick."],
    ["Befehle nachschlagen","Beschreibung, Beispiel und passende Datentypen auf einen Blick.","#befehle","print(\"Jetzt verstehe ich’s.\")"],
    ["Python einrichten","Die passende Anleitung für deinen PC oder dein Tablet.","#python-setup",".py"],
    ["VS Code einrichten","Editor installieren, Python auswählen und die erste Datei starten.","#vscode-setup","{ }" ]
  ]) {
    const link = actionLink("",href,"entry-card");
    const arrow = el("span","↗","card-arrow"); arrow.setAttribute("aria-hidden","true");
    const art = el("span",visual,"card-visual"); art.setAttribute("aria-hidden","true");
    link.append(art,el("h3",title),el("p",description),arrow); cards.append(link);
  }
  entries.append(cards); article.append(entries);
  const tryout = el("section",undefined,"home-section tryout");
  const invitation = el("div",undefined,"tryout-copy");
  invitation.append(el("p","Lernen beginnt mit Neugier.","kind"),el("h2","Du kannst mehr, als du gerade denkst."),el("p","Du brauchst kein Vorwissen für deinen ersten Versuch. Lies diese zwei Zeilen und entscheide: Was gibt das Programm aus?"));
  const rhythm = el("div",undefined,"learning-rhythm");
  rhythm.append(el("h3","Kleine Schritte. Echtes Verstehen."));
  const tip = el("p"); tip.setAttribute("role","status"); tip.setAttribute("aria-live","polite");
  const tips = ["Vorhersagen: Formuliere zuerst deine eigene Vermutung. Eine falsche Idee ist ein guter Anfang.","Ausprobieren: Starte das Beispiel in deinem Editor. Vergleiche das Ergebnis mit deiner Vermutung.","Verändern: Ändere einen Wert. Erkläre, warum sich die Ausgabe verändert, und schreibe dann selbst Code."];
  let tipIndex = 0;
  tip.textContent = tips[0];
  const controls = el("div",undefined,"rhythm-controls");
  const counter = el("span","1 / 3");
  for (const [label,direction,symbol] of [["Vorheriger Lerntipp",-1,"←"],["Nächster Lerntipp",1,"→"]]) {
    const button = el("button",symbol); button.type = "button"; button.setAttribute("aria-label",label);
    button.addEventListener("click",() => { tipIndex = (tipIndex + direction + tips.length) % tips.length; tip.textContent = tips[tipIndex]; counter.textContent = `${tipIndex + 1} / ${tips.length}`; });
    controls.append(button);
  }
  controls.prepend(counter); rhythm.append(tip,controls); invitation.append(rhythm);
  const demo = el("div",undefined,"first-code");
  demo.append(el("p","Ein kleines Programm. Dein Anfang."));
  demo.append(codeBox('name = "Du"\nprint(f"{name} kannst Python lernen!")'),el("p","Was erscheint in der Ausgabe?"));
  const feedback = el("p","Wähle deine Vermutung.","quiz-feedback");
  feedback.setAttribute("role","status");
  feedback.setAttribute("aria-atomic","true");
  for (const [label,correct] of [["Du kannst Python lernen!",true],["{name} kannst Python lernen!",false]]) {
    const button = el("button",label,"prediction");
    button.type = "button";
    button.setAttribute("aria-pressed","false");
    button.addEventListener("click",() => {
      demo.querySelectorAll(".prediction").forEach(option => option.setAttribute("aria-pressed",String(option === button)));
      feedback.textContent = correct ? "Richtig! Der f-String setzt den Wert von name ein: Du." : "Fast! Das f vor dem Text ersetzt {name} durch den gespeicherten Wert. Versuche es noch einmal.";
      feedback.dataset.result = correct ? "correct" : "retry";
    });
    demo.append(button);
  }
  demo.append(feedback);
  tryout.append(invitation,demo); article.append(tryout);
  const practice = el("section",undefined,"home-section practice");
  const practiceIntro = el("div");
  practiceIntro.append(el("h2","Vom Verstehen zum Selbermachen."),el("p","Du übernimmst mit jeder Etappe ein bisschen mehr. Die Lerntexte, deine eigenen Versuche und gezielte Hilfe gehören zusammen."),actionLink("Unser Lernkonzept ansehen","#lernkonzept","text-link"));
  const stack = el("div",undefined,"practice-stack");
  for (const [index,[title,text,href,label]] of [
    ["Eine Idee verstehen","Beginne mit einem überschaubaren Beispiel. Erkläre mit eigenen Worten, was jede Zeile bewirkt.","#vorlesungen","Vorlesungen entdecken"],
    ["Aus Fehlern weiterlernen","Erst selbst versuchen, dann einen Hinweis öffnen. Die vollständige Lösung bleibt deine bewusste Entscheidung.","#uebung","Übung ausprobieren"],
    ["Wissen zusammen anwenden","Verbinde CSV, Zeitraster und Klassen in einem eigenen Mini-Projekt mit kleinen, selbst erstellten Daten.","#praxis-zeitreihe","Zum Mini-Projekt"]
  ].entries()) {
    const step = el("div",undefined,"practice-step"); step.style.setProperty("--step",index);
    step.append(el("h3",title),el("p",text),actionLink(label,href,index === 2 ? "entry-card text-link" : "text-link")); stack.append(step);
  }
  practice.append(practiceIntro,stack); article.append(practice);
  const help = el("section",undefined,"home-section");
  help.append(el("h2","Du musst nicht alles auf einmal können."));
  const accordion = el("div",undefined,"help-accordion");
  for (const [title,text,href,label] of [
    ["Ich fange bei null an.","Richte zuerst Python ein. Die erste Lektion erklärt dir anschließend, wie ein Programm überhaupt funktioniert.","#python-setup","Mit der Einrichtung starten"],
    ["Ich hänge gerade fest.","Suche oben nach deinem Befehl oder deiner Fehlermeldung. In der aktuellen Übung helfen dir einzelne Hinweise weiter.","#uebung","Zur Aufgabenbegleitung"],
    ["Ich möchte weitergehen.","Der Abdeckungsplan zeigt dir, welche Aufgaben begleitet sind und welche Themen du noch selbst vertiefen musst.","#abdeckung","Was ist bereits abgedeckt?"]
  ]) {
    const detail = el("details");
    detail.append(el("summary",title),el("p",text),actionLink(label,href,href === "#abdeckung" ? "entry-card text-link" : "text-link"));
    detail.addEventListener("toggle",() => { if (detail.open) [...accordion.children].filter(other => other !== detail).forEach(other => {other.open = false;}); });
    accordion.append(detail);
  }
  help.append(accordion); article.append(help);
  const finish = el("section",undefined,"home-finish");
  finish.append(el("h2","Dein nächster Schritt? Eine Zeile Code."),el("p","Fang klein an. Bleib neugierig. Der Rest wächst mit jedem Versuch."),actionLink("Mit Python loslegen","#python-setup","primary-link")); article.append(finish);
}

let startMotion;
function animateStart() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  startMotion = gsap.matchMedia();
  startMotion.add("(prefers-reduced-motion: no-preference)",() => {
    gsap.from(".hero-copy > *",{y:24,opacity:0,duration:.65,stagger:.09,ease:"power2.out"});
    gsap.fromTo(".hero-image",{scale:.8},{scale:1,ease:"none",scrollTrigger:{trigger:".welcome-hero",start:"top bottom",end:"top top",scrub:true}});
    gsap.to(".hero-image",{opacity:.2,ease:"none",scrollTrigger:{trigger:".welcome-hero",start:"bottom 55%",end:"bottom top",scrub:true}});
  });
  startMotion.add("(min-width: 1051px) and (prefers-reduced-motion: no-preference)",() => {
    gsap.utils.toArray(".practice-step").forEach(card => gsap.from(card,{y:60,scale:.94,ease:"none",scrollTrigger:{trigger:card,start:"top 90%",end:"top 40%",scrub:true}}));
  });
}

function actionLink(title,href,className) {
  const link = el("a",title,className); link.href = href; return link;
}

function renderLectures() {
  article.replaceChildren(el("p","Dein Kursweg","kind"),el("h1","Eine Idee nach der anderen."),el("p","Beginne oben. Jede Etappe erklärt die Begriffe, zeigt ein kleines Beispiel und endet mit einer eigenen Aufgabe.","intro"));
  article.append(actionLink("Zuerst Python und VS Code einrichten","#python-setup","secondary-link"));
  article.append(el("p",`${completed.size} von ${vorlesungen.length} Etappen als selbst bearbeitet markiert. Die Marken sind deine Selbsteinschätzung.`,"learning-goal"));
  const list = el("ol",undefined,"course-list");
  for (const [index,lesson] of vorlesungen.entries()) {
    const li = el("li");
    const link = actionLink("",`#${lesson.id}`,"course-link");
    const text = el("div");
    text.append(el("small",lesson.sourceTitle || `Vorlesung ${lesson.origin} · PDF-S. ${lesson.pages}`),el("h2",lesson.title),el("p",lesson.summary));
    if (completed.has(lesson.id)) text.append(el("strong","Als bearbeitet markiert","completion-status"));
    link.append(el("span",String(index + 1).padStart(2,"0"),"lesson-number"),text); li.append(link); list.append(li);
  }
  article.append(list);
  article.append(actionLink("Jetzt das eigene Mini-Projekt bearbeiten","#praxis-zeitreihe","primary-link"),el("p","Die Lerntexte sind eine Begleitung. Prüfe im Abdeckungsplan, welche Originalaufgaben noch selbst zu bearbeiten sind."),actionLink("Abdeckungsplan öffnen","#abdeckung"));
  section("Deine vollständigen Vorlesungsunterlagen");
  article.append(el("p","Die Lerntexte fassen die fachlichen Themen zusammen. Organisation, Prüfungsinformationen und die vollständigen Originalbeispiele findest du in den PDFs. Die beiden Analyse-PDFs enthalten denselben Inhalt und werden hier einmal geführt."));
  const originals = new Map(vorlesungen.map(lesson => [quellen[lesson.sources[0]].href.split("#")[0],lesson.sourceTitle || `Vorlesung ${lesson.origin} · vollständiges PDF`]));
  originals.set(quellen.analyse.href.split("#")[0],"Analysebeispiel · vollständiges PDF");
  for (const [href,title] of originals) {
    const p = el("p"); p.append(actionLink(title,href)); article.append(p);
  }
}

function renderCoverage() {
  const total = abdeckung.reduce((sum,row) => sum + row.tasks.length,0);
  const guided = inhalte.filter(item => item.kind === "Übung" && abdeckung.some(row => row.tasks.includes(item.number))).length;
  article.replaceChildren(el("p","Lerntexte und Originalaufgaben unterscheiden","kind"),el("h1","Was ist bereits abgedeckt?"),el("p",`${guided} von ${total} Originalaufgaben im Übungsskript sind mit gestuften Hinweisen und Musterlösung begleitet. Erklärte Begriffe und kleine Beispiele sind noch kein Nachweis, dass du alle Originalaufgaben selbst lösen kannst.`,"intro"));
  article.append(el("p","Lies den passenden Lerntext, löse danach die Originalaufgabe ohne Vorlage und prüfe deinen Code. Die Bearbeitungsmarken messen keine Kompetenz. Das eigene Mini-Projekt ist eine Ergänzung mit synthetischen Daten."));
  for (const row of abdeckung) {
    const detail = el("details");
    const count = inhalte.filter(item => item.kind === "Übung" && row.tasks.includes(item.number)).length;
    detail.append(el("summary",`${row.title} · ${count}/${row.tasks.length} Aufgaben geführt`),el("p",`Originalaufgaben: ${row.tasks.join(", ")}. ${row.gap}`));
    const links = el("ul",undefined,"links");
    row.lessons.forEach(id => { const li = el("li"); li.append(actionLink(byId.get(id).title,`#${id}`)); links.append(li); });
    detail.append(links,actionLink(`Original öffnen · PDF-S. ${row.page}`,`../Referenz/Pflicht Übungen/${row.sourceFile || "CuD_Uebung 01.pdf"}#page=${row.page}`));
    article.append(detail);
  }
  section("Vorlesungen und weitere Referenzdateien");
  article.append(el("p","Vorlesungen 001–003 und die FFT-Einführung sind als Lerntexte aufbereitet. Alle vier Live-Übungen haben Schritte, Hinweise und Musterlösungen. bb12024.csv fehlt weiterhin; die drei betroffenen Live-Lösungen lassen sich mit der verlinkten synthetischen live-mini.csv direkt ausprobieren. Organisation, Termine und Prüfungsregeln bleiben in den Originalunterlagen."));
  itemLinks("Live-Übungen aus Vorlesung 003",["live-003-10","live-003-18","live-003-26","live-003-31"]);
  itemLinks("Weiter üben",["lektion-10","praxis-zeitreihe"]);
  article.append(actionLink("Ausführlicher Abgleich und Grenzen","ABDECKUNG.md"));
}

function renderExercise() {
  article.replaceChildren(el("p","Aktuell aufbereiteter Übungsblock","kind"),el("h1","Deine Übung: Messdaten verstehen."),el("p","Du liest eine CSV-Datei, trennst gültige Messwerte von Ausreißern und berechnest Kennzahlen. Bearbeite die drei Teile nacheinander.","intro"));
  article.append(actionLink("Mit Aufgabe 6.1 beginnen","#aufgabe-6-1","primary-link"));
  itemLinks("Deine drei Schritte",["aufgabe-6-1","aufgabe-6-2","aufgabe-6-3"]);
  itemLinks("Noch ganz am Anfang?",["python-setup","vscode-setup","lektion-1","lektion-2","lektion-3"]);
  textList("So nutzt du die Begleitung",["Lies das Ziel und öffne die benötigten Befehle.","Arbeite einen Schritt ab und führe deinen Code selbst aus.","Öffne bei Bedarf zuerst Hinweis 1, dann den nächsten Hinweis.","Prüfe das Ergebnis. Die erklärte Musterlösung kannst du getrennt öffnen.","Schließe die Lösung und schreibe den Ablauf mit eigenen Worten auf."],true);
  section("Alle Aufgaben des Übungsskripts");
  for (const row of abdeckung) {
    itemLinks(row.title,row.tasks.map(number => `aufgabe-${number.replace(".","-")}`));
  }
  itemLinks("Live-Übungen aus Vorlesung 003",["live-003-10","live-003-18","live-003-26","live-003-31"]);
  article.append(el("div","Alle 31 Aufgaben des vorhandenen Übungsskripts sind begleitet. Drei Live-Übungen kannst du mit der herunterladbaren live-mini.csv bearbeiten. Für Originalergebnisse bleibt bb12024.csv erforderlich.","notice"));
}

function renderCommands() {
  article.replaceChildren(el("p","Dein Nachschlagewerk","kind"),el("h1","Welcher Befehl passt wozu?"),el("p","Alle Befehlsbausteine und die ergänzten Werkzeuge der Lektionen: mit Beschreibung, Python-Beispiel und Hinweisen zum Zusammenspiel.","intro"));
  const label = el("label","Befehl, Beschreibung oder Kontext suchen","table-label");
  label.htmlFor = "befehl-suche";
  const input = el("input"); input.id = "befehl-suche"; input.type = "search"; input.placeholder = "Zum Beispiel: Liste, mean, Zeitindex …";
  const count = el("p",undefined,"example-note"); count.setAttribute("role","status");
  const wrap = el("div",undefined,"table-scroll"); wrap.tabIndex = 0; wrap.setAttribute("role","region"); wrap.setAttribute("aria-label","Befehlsübersicht, bei Bedarf seitlich scrollen");
  const table = el("table"); table.append(el("caption","Python-Befehle, Methoden und Sprachbausteine"));
  const head = el("thead"); const tr = el("tr");
  for (const text of ["Befehl / Baustein","Beschreibung","Beispiel","Passt zu / Voraussetzungen"]) { const th = el("th"); th.textContent = text; th.scope = "col"; tr.append(th); }
  head.append(tr); const body = el("tbody"); table.append(head,body); wrap.append(table);
  const rows = [
    ...inhalte.filter(item => item.kind === "Befehl & Begriff").map(item => [item.title,item.summary,item.code,befehlsKontexte[item.id],item.id]),
    ...weitereBefehle
  ];
  function filter() {
    const tokens = normalize(input.value).split(/\s+/).filter(Boolean);
    const matches = rows.filter(row => tokens.every(token => normalize(row.slice(0,4).join(" ")).includes(token)));
    count.textContent = `${matches.length} von ${rows.length} Einträgen${matches.length ? "" : ". Versuche Liste, CSV oder Pandas."}`;
    body.replaceChildren();
    for (const [title,description,code,context,id] of matches) {
      const row = el("tr");
      const cell = el("td"); cell.append(actionLink(title,`#${id}`));
      const example = el("td"); example.append(codeBox(code));
      row.append(cell,el("td",description),example,el("td",context)); body.append(row);
    }
  }
  input.addEventListener("input",filter); filter();
  article.append(label,input,count,wrap,el("p","Beispiele stehen für sich. Zusatzpakete sind dort ausdrücklich importiert. Die Webseite zeigt Code; du führst ihn in Python aus.","example-note"));
}

function renderConcept() {
  article.replaceChildren(el("h1","So lernst du hier programmieren."),el("p","Du baust Verständnis auf und übernimmst Schritt für Schritt mehr selbst.","intro"));
  textList("Fünf Schritte in jeder Lektion",["Vorhersagen: Lies einen kurzen Code und notiere die erwartete Ausgabe.","Ausführen: Starte ihn in deiner Python-Umgebung und vergleiche.","Untersuchen: Erkläre Variablen und einzelne Schritte mit eigenen Worten.","Verändern: Passe einen Wert oder eine Bedingung an und prüfe deine neue Vermutung.","Selbst schreiben: Löse eine kleine Aufgabe ohne Vorlage."],true);
  section("Weniger auf einmal, mehr selbst tun");
  article.append(el("p","Jede Etappe hat ein klares Lernziel. Kleine Beispiele kommen vor großen Datensätzen. Hinweise und Lösungen öffnest du einzeln. Fehler sind Anlass zum Prüfen: Lies die Meldung, finde die betroffene Zeile und teste mit wenigen Werten."));
  section("Mit Abstand wiederholen");
  article.append(el("p","Erkläre am nächsten Tag ohne Vorlage, was du gelernt hast. Schreibe die Miniübung erneut. Prüfe nach einer Woche, ob du die Idee auch bei anderen Daten anwenden kannst. Nur eine Lösung gelesen zu haben ist noch kein Nachweis, dass du sie selbst schreiben kannst."));
  section("Warum dieser Aufbau?");
  const p = el("p","Die fünf Schritte folgen PRIMM: Predict, Run, Investigate, Modify, Make. Für dieses Werkzeug kombinieren wir sie mit kleinen Lernetappen, gestuften Hilfen und Wiederholung. ");
  p.append(actionLink("PRIMM bei der Raspberry Pi Foundation","https://www.raspberrypi.org/blog/using-primm-to-teach-programming-a-new-short-course-for-educators/"));
  article.append(p,el("p","Die Auswahl ist ein begründetes Lernkonzept. Ein Gebrauchstest mit Studienanfängern und der Nachweis des Lernnutzens stehen noch aus.","example-note"),actionLink("Mit der ersten Lektion anfangen","#lektion-1","primary-link"));
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
  if (!matches.length) results.append(el("p","Kein Treffer. Versuche CSV, Mittelwert, 6.2, Pandas oder ValueError. Setze auch die Filter zurück.","empty"));
  document.querySelector(".learning-area").classList.toggle("searching",Boolean(searchInput.value || typeInput.value || topicInput.value));
}

function route(focus = false) {
  startMotion?.revert();
  startMotion = undefined;
  const id = selectedId();
  const item = byId.get(id);
  article.classList.toggle("home",!id || id === "start");
  if (item) renderItem(item);
  else if (!id || id === "start") renderStart();
  else if (id === "vorlesungen") renderLectures();
  else if (id === "lernplan") renderLearningPlan();
  else if (id === "wiederholen") renderReview();
  else if (id === "uebung") renderExercise();
  else if (id === "befehle") renderCommands();
  else if (id === "lernkonzept") renderConcept();
  else if (id === "abdeckung") renderCoverage();
  else article.replaceChildren(el("h1","Inhalt nicht gefunden"),el("p","Wähle eine Übung oder suche oben nach einem Befehl."));
  document.querySelector(".learning-area").classList.toggle("overview",!item || item.kind === "Vorlesung" || item.kind === "Einrichtung");
  document.title = `${article.querySelector("h1").textContent} · Lernwerkzeug`;
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    if (link.hash === location.hash || ((!id || id === "start") && link.hash === "#start")) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  });
  renderResults();
  if (focus) {
    setNavigation(false);
    article.focus({preventScroll:true});
    article.scrollIntoView({block:"start"});
  }
  if (!id || id === "start") animateStart();
}

function setNavigation(open) {
  document.querySelector(".sidebar").classList.toggle("nav-open",open);
  const button = document.querySelector("#nav-toggle");
  button.setAttribute("aria-expanded",String(open));
  const label = open ? "Lernnavigation schließen" : "Lernnavigation öffnen";
  button.textContent = t(label);
  markLanguage(button,t(label) !== label);
}

function applyLanguage() {
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.dataset.i18n ||= node.textContent;
    const translated = translation(ui[node.dataset.i18n]);
    node.textContent = translated || node.dataset.i18n;
    markLanguage(node,Boolean(translated));
  }
  document.querySelector("#sprachhinweis").hidden = language === "de";
  setNavigation(document.querySelector("#nav-toggle").getAttribute("aria-expanded") === "true");
}

const languageSelect = document.querySelector("#sprache");
for (const [code,name] of Object.entries(sprachen)) {
  const option = el("option",name); option.value = code; option.lang = code; languageSelect.append(option);
}
languageSelect.value = language;
languageSelect.addEventListener("change",() => {
  language = languageSelect.value;
  try { localStorage.setItem(languageKey,language); } catch { /* Auswahl gilt dann nur für diese Sitzung. */ }
  applyLanguage();
  route();
});

const themeButton = document.querySelector("#design");
function syncThemeButton() { themeButton.setAttribute("aria-pressed",String(document.documentElement.dataset.theme === "dark")); }
themeButton.addEventListener("click",() => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(themeKey,theme); } catch { /* Design gilt dann nur für diese Sitzung. */ }
  syncThemeButton();
});
syncThemeButton();

document.addEventListener("click",async event => {
  const button = event.target.closest(".copy-code");
  if (!button) return;
  const code = button.closest(".code-box").querySelector("code");
  let message = "Kopiert";
  try { await navigator.clipboard.writeText(code.textContent); }
  catch {
    // Datei-Aufrufe erlauben die Clipboard-API nicht überall; dann markieren und klassisch kopieren.
    const range = document.createRange(); range.selectNodeContents(code);
    getSelection().removeAllRanges(); getSelection().addRange(range);
    if (!document.execCommand("copy")) message = "Markiert – mit Strg+C kopieren";
  }
  button.textContent = t(message);
  button.parentElement.querySelector("[role=status]").textContent = t(message);
  clearTimeout(button.resetTimer);
  button.resetTimer = setTimeout(() => { button.textContent = t("Kopieren"); },2000);
});

document.querySelector("#nav-toggle").addEventListener("click",() => {
  setNavigation(document.querySelector("#nav-toggle").getAttribute("aria-expanded") !== "true");
});
document.querySelector(".sidebar").addEventListener("keydown",event => {
  if (event.key === "Escape" && document.querySelector("#nav-toggle").getAttribute("aria-expanded") === "true") {
    setNavigation(false);
    document.querySelector("#nav-toggle").focus();
  }
});

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
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  if (link.classList.contains("skip")) { event.preventDefault(); article.focus(); return; }
  if (link.hash === "#start") resetSearch();
  // Native same-hash links do not trigger hashchange; still reset closed hints and focus.
  if (link.hash === location.hash) route(true);
});
window.addEventListener("hashchange",() => route(true));
applyLanguage();
route();
