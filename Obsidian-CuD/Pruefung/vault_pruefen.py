"""Prüft diesen Dokumentations-Vault offline mit Python-Standardmodulen."""
from pathlib import Path
import argparse
import hashlib
import json
import re
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'Pruefung/VAULT_MANIFEST.json'


def inventory():
    records = []
    for p in sorted(ROOT.rglob('*')):
        if not p.is_file() or p == MANIFEST:
            continue
        rel = p.relative_to(ROOT)
        if any(part in {'__pycache__','.trash','cache'} for part in rel.parts):
            continue
        if '.obsidian' in rel.parts and p.name.startswith('workspace'):
            continue
        data = p.read_bytes()
        records.append({'path':rel.as_posix(),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
    # Path ordering differs between Windows and POSIX. Manifest bytes must not.
    return sorted(records, key=lambda record: record['path'])


def inspect():
    errors = []
    pages = sorted(ROOT.rglob('*.md'))
    titles = {p.stem:p for p in pages}
    if len(titles) != len(pages):
        errors.append('Doppelte Notiznamen')
    graph = {p:set() for p in pages}
    inbound = {p:0 for p in pages}
    links = 0
    diagrams = 0
    for p in pages:
        text = p.read_text(encoding='utf-8')
        if not text.startswith('---\n'):
            errors.append(f'Frontmatter fehlt: {p.name}')
            continue
        fm = text.split('---\n',2)[1]
        for key in ('title','description','type','language','created','updated','status','tags'):
            if not re.search(rf'^{key}: .+',fm,re.M):
                errors.append(f'Eigenschaft {key} fehlt: {p.name}')
        if not re.search(r'^language: de$',fm,re.M):
            errors.append(f'Sprache nicht de: {p.name}')
        if any(ord(c)<32 and c not in '\n\r\t' for c in text):
            errors.append(f'Steuerzeichen: {p.name}')
        if text.count('```') % 2:
            errors.append(f'Codeblock nicht geschlossen: {p.name}')
        diagrams += text.count('```mermaid')
        prose = re.sub(r'```.*?```','',text,flags=re.S)
        for target in re.findall(r'\[\[([^\]]+)\]\]',prose):
            links += 1
            target = target.split('|',1)[0].split('#',1)[0]
            found = ROOT/target if (ROOT/target).is_file() else titles.get(target)
            if not found:
                errors.append(f'Linkziel fehlt: {p.name}: {target}')
            elif found in graph:
                graph[p].add(found)
                inbound[found] += 1
        for target in re.findall(r'(?<!!)\[[^\]]*\]\(([^)]+)\)',prose):
            if target.startswith(('https://','http://','#')):
                continue
            if target and not (p.parent/unquote(target.split('#',1)[0].strip('<>'))).is_file():
                errors.append(f'Dateilink fehlt: {p.name}: {target}')
    visited = set()
    pending = [titles['00 Start']]
    while pending:
        p = pending.pop()
        if p not in visited:
            visited.add(p)
            pending.extend(graph[p]-visited)
    unreachable = [p.name for p in pages if p not in visited]
    orphaned = [p.name for p in pages if not inbound[p] and p.stem != '00 Start']
    if unreachable or orphaned:
        errors.append(f'Unerreichbar/verwaist: {unreachable}/{orphaned}')
    canvas = json.loads((ROOT/'CuD Gesamtkarte.canvas').read_text(encoding='utf-8'))
    nodes,edges = canvas['nodes'],canvas['edges']
    ids = [n['id'] for n in nodes]+[e['id'] for e in edges]
    if len(ids) != len(set(ids)):
        errors.append('Canvas-IDs nicht eindeutig')
    nodeids = {n['id'] for n in nodes}
    for n in nodes:
        if n['type'] == 'file' and not (ROOT/n['file']).is_file():
            errors.append(f'Canvas-Datei fehlt: {n["file"]}')
        if any(not isinstance(n[k],(int,float)) for k in ('x','y','width','height')):
            errors.append(f'Canvas-Geometrie ungültig: {n["id"]}')
    for e in edges:
        if e['fromNode'] not in nodeids or e['toNode'] not in nodeids:
            errors.append(f'Canvas-Kante ohne Ziel: {e["id"]}')
    for p in (ROOT/'.obsidian').glob('*.json'):
        json.loads(p.read_text(encoding='utf-8'))
    if json.loads((ROOT/'.obsidian/community-plugins.json').read_text(encoding='utf-8')):
        errors.append('Unerwartete Community-Plugins')
    ecc = titles['92 ECC Plan-Orchestrate'].read_text(encoding='utf-8')
    commands = re.findall(r'^(/(?:plan|orch-fix-defect|orch-add-feature)) "(.*)"$',ecc,re.M)
    if len(commands) != 8:
        errors.append(f'ECC: unerwartete Befehlszahl {len(commands)}')
    for command,task in commands:
        if not 200 <= len(task) <= 600 or not task.startswith('[Plan: ') or 'Acceptance:' not in task:
            errors.append(f'ECC-Vertrag verletzt: {command}')
    return {'status':'PASS' if not errors else 'FAIL','markdown_notes':len(pages),'wikilinks':links,
            'unreachable_notes':unreachable,'orphan_notes':orphaned,'mermaid_diagrams':diagrams,
            'canvas_cards':len(nodes),'canvas_edges':len(edges),'ecc_commands':len(commands)//2,'errors':errors}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write',action='store_true',help='Nach Review nur das Vaultmanifest erneuern')
    args = parser.parse_args()
    result = inspect()
    actual = inventory()
    if not result['errors'] and args.write:
        MANIFEST.write_text(json.dumps({'format':1,'date':'2026-10-16','files':actual},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not result['errors']:
        expected = json.loads(MANIFEST.read_text(encoding='utf-8'))['files']
        if expected != actual:
            before = {r['path']:r for r in expected}
            after = {r['path']:r for r in actual}
            result['status'] = 'FAIL'
            changed = sorted(p for p in before.keys()|after.keys() if before.get(p)!=after.get(p))
            detail = ', '.join(changed) if changed else 'abweichende Reihenfolge; Dateiinhalte unverändert'
            result['errors'].append('Manifestabweichung: '+detail)
    result['manifest_files'] = len(actual)
    print(json.dumps(result,ensure_ascii=False,indent=2))
    raise SystemExit(0 if result['status']=='PASS' else 1)


if __name__ == '__main__':
    main()
