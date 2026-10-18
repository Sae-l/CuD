"use strict";
// Liefert alle übersetzbaren deutschen Texte (Schlüssel der uebersetzung-<code>.js) mit ihrem Arbeitspaket.
// Aufruf `node Lernwerkzeug/uebersetzbar.cjs <code>` listet fehlende Einträge einer Sprache je Paket als JSON.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = __dirname;

// Fest codierte Texte in app.js, die bewusst Deutsch bleiben (Code, Suchbeispiele, Dateinamen).
const bleibtDeutsch = new Set([
  "print(\"Jetzt verstehe ich’s.\")",
  "name = \"Du\"\nprint(f\"{name} kannst Python lernen!\")",
  "Du kannst Python lernen!",
  "{name} kannst Python lernen!",
  "Liste, mean, Zeitindex …",
  "Python → NumPy → Pandas",
  "Analysebeispiel · vollständiges PDF",
  "[Fehler] {titel}",
  "Escape"
]);

function laden() {
  const context = vm.createContext({});
  for (const file of ["inhalte.js","kurs.js","sprachen.js"]) vm.runInContext(fs.readFileSync(path.join(root,file),"utf8"),context);
  return JSON.parse(vm.runInContext("JSON.stringify({inhalte,weitereBefehle,befehlsKontexte,abdeckung,glossar,lehnwoerter})",context));
}

// Zerlegt JavaScript in String-Literale; Vorlagen mit ${…} liefern ihre inneren Literale und ihre festen Textteile.
function literale(source) {
  const found = [], fixed = [];
  let i = 0;
  const unescape = raw => raw.replace(/\\(u\{?[0-9a-fA-F]+\}?|n|t|.)/g,(m,c) => c === "n" ? "\n" : c === "t" ? "\t" : c[0] === "u" ? String.fromCodePoint(parseInt(c.replace(/[u{}]/g,""),16)) : c);
  function quoted(quote) {
    let raw = ""; i++;
    while (source[i] !== quote) { if (source[i] === "\\") raw += source[i++]; raw += source[i++]; }
    i++; return unescape(raw);
  }
  function template() {
    const parts = []; let raw = "", dynamic = false; i++;
    while (source[i] !== "`") {
      if (source[i] === "\\") { raw += source[i] + source[i + 1]; i += 2; }
      else if (source[i] === "$" && source[i + 1] === "{") { dynamic = true; parts.push(raw); raw = ""; i += 2; code("}"); i++; }
      else raw += source[i++];
    }
    i++; parts.push(raw);
    if (dynamic) fixed.push(...parts.map(unescape)); else found.push(unescape(raw));
  }
  function code(end) {
    let depth = 0;
    while (i < source.length) {
      const c = source[i];
      if (c === end && depth === 0) return;
      if (c === "/" && source[i + 1] === "/") { while (source[i] !== "\n") i++; }
      else if (c === "\"" || c === "'") found.push(quoted(c));
      else if (c === "`") template();
      // Regex-Literale nach Operatoren oder Klammern überspringen.
      else if (c === "/" && /[(,=:!&|?{};]\s*$/.test(source.slice(Math.max(0,i - 20),i))) { i++; while (source[i] !== "/") { if (source[i] === "\\" || source[i] === "[") { if (source[i] === "[") { while (source[i] !== "]") i += source[i] === "\\" ? 2 : 1; } else i++; } i++; } i++; }
      else { if (c === "{") depth++; if (c === "}") depth--; i++; }
    }
  }
  code(undefined);
  return {found,fixed};
}

// String-Literale aus app.js, die wie deutscher Fließtext aussehen; Platzhaltertexte stehen als Literal in el()/t().
function appTexte() {
  const {found,fixed} = literale(fs.readFileSync(path.join(root,"app.js"),"utf8"));
  const german = fixed.filter(part => /[A-Za-zÄÖÜäöüß]{3,} [A-Za-zÄÖÜäöüß]/.test(part) && !/^(?:\.\.\/|Vorlesung $)/.test(part) && !/ · vollständiges PDF$/.test(part));
  if (german.length) throw Error(`Deutscher Text in Vorlage mit \${…}; stattdessen el()/t() mit Platzhalter nutzen: ${german.join(" | ")}`);
  return found.filter(text => {
    if (!/[A-Za-zÄÖÜäöüß]{2}/.test(text) || bleibtDeutsch.has(text)) return false;
    // Bezeichner, CSS-Klassen, Selektoren, Pfade und Animationsangaben sind kein Text.
    return !/^(?:[#.\[:(]|https?:|\.\.\/)|^[a-z0-9%-]+(?: [a-z0-9%-]+)*$|^[a-z_][\w.-]*$|\.(?:md|csv|js|jpg|png|html|pdf)$|^[a-z-]+\s*[=:]|\[[a-z-]+[\^=\]]/.test(text);
  });
}

function htmlTexte() {
  const html = fs.readFileSync(path.join(root,"index.html"),"utf8");
  return [
    ...[...html.matchAll(/<[^>]*\sdata-i18n(?=[\s>])[^>]*>([^<]+)(?=<)/g)].map(match => match[1]),
    ...[...html.matchAll(/data-i18n-label="([^"]+)"/g)].map(match => match[1])
  ].map(text => text.replace(/&amp;/g,"&").trim());
}

function uebersetzbareTexte() {
  const data = laden();
  const texts = new Map();
  const add = (paket,text) => { if (typeof text === "string" && text.trim() && !texts.has(text)) texts.set(text,paket); };
  for (const text of [...htmlTexte(),...appTexte()]) add("bedienung",text);
  for (const item of data.inhalte) { add("bedienung",item.kind); add("bedienung",item.topic); }
  const paket = {"Vorlesung":"vorlesungen","Übung":"uebungen","Befehl & Begriff":"befehle","Fehlerhilfe":"ablaeufe","Arbeitsablauf":"ablaeufe","Quellen":"ablaeufe","Einrichtung":"einrichtung"};
  for (const item of data.inhalte) {
    const p = paket[item.kind];
    if (item.kind !== "Übung") add(p,item.summary);
    for (const text of [item.explanation,item.notice,item.pitfall,item.goal,item.investigate,item.modify,item.make,item.answer,item.download?.[0],item.solution?.intro,item.solution?.explanation,item.quiz?.question,item.quiz?.explanation]) add(p,text);
    for (const text of [...item.steps || [],...item.hints || [],...item.checks || [],...item.quiz?.options || [],...(item.blocks || []).flat(),...(item.links || []).map(link => link[0])]) add(p,text);
  }
  for (const text of Object.values(data.befehlsKontexte)) add("befehle",text);
  for (const command of data.weitereBefehle) { add("befehle",command[1]); add("befehle",command[3]); }
  for (const row of data.abdeckung) add("ablaeufe",row.gap);
  return texts;
}

function lesen(code) {
  const context = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(root,"sprachen.js"),"utf8"),context);
  const file = path.join(root,`uebersetzung-${code}.js`);
  if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file,"utf8"),context);
  return vm.runInContext(`JSON.stringify(uebersetzungen[${JSON.stringify(code)}] || {})`,context);
}

// Schreibt die Datei in Paketreihenfolge; Einträge ohne deutschen Ausgangstext entfallen.
function schreiben(code,eintraege) {
  const pakete = {bedienung:"Bedienung",vorlesungen:"Vorlesungen",uebungen:"Übungen",befehle:"Befehle",ablaeufe:"Fehlerhilfen und Arbeitsabläufe",einrichtung:"Einrichtung"};
  const texte = uebersetzbareTexte();
  const zeilen = [];
  for (const [paket,name] of Object.entries(pakete)) {
    const keys = [...texte].filter(([text,p]) => p === paket && Object.hasOwn(eintraege,text)).map(([text]) => text);
    if (keys.length) zeilen.push(`  // ${name}`,...keys.map(text => `  ${JSON.stringify(text)}: ${JSON.stringify(eintraege[text])},`));
  }
  fs.writeFileSync(path.join(root,`uebersetzung-${code}.js`),`"use strict";\n// ${code}: deutscher Originaltext → Übersetzung. Maschinell übersetzt; Glossar und Regeln stehen in sprachen.js.\n// Fehlende Einträge listet \`node Lernwerkzeug/uebersetzbar.cjs ${code}\`.\nuebersetzungen.${code} = {\n${zeilen.join("\n").replace(/,$/,"")}\n};\n`);
}

module.exports = {uebersetzbareTexte,laden,lesen,schreiben};

// node uebersetzbar.cjs <code>                 fehlende Einträge je Paket als JSON
// node uebersetzbar.cjs <code> --einfuegen x.json  Zuordnungen aus x.json übernehmen und Datei neu schreiben
if (require.main === module) {
  const [code,option,datei] = process.argv.slice(2);
  const vorhanden = JSON.parse(lesen(code));
  if (option === "--einfuegen") {
    schreiben(code,{...vorhanden,...JSON.parse(fs.readFileSync(datei,"utf8"))});
  } else {
    const fehlend = {};
    for (const [text,p] of uebersetzbareTexte()) if (!Object.hasOwn(vorhanden,text)) (fehlend[p] ||= []).push(text);
    console.log(JSON.stringify(fehlend,null,2));
  }
}
