"""Erstellt ein reproduzierbares, manifestgeprüftes Release-ZIP ohne lokale Caches."""
import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path

from manifest import entries


def pack(root, output, tag):
    version = json.loads((root / 'package.json').read_text(encoding='utf-8'))['version']
    if not re.fullmatch(r'v\d+\.\d+\.\d+', tag) or tag != 'v' + version:
        raise ValueError('Tag und package.json müssen dieselbe stabile Version benennen.')
    manifest = json.loads((root / 'PROJEKT_MANIFEST.json').read_text(encoding='utf-8'))
    if entries(root) != manifest['files']:
        raise ValueError('Projektmanifest stimmt nicht mit den Dateien überein.')
    files = {item['path']: item['sha256'] for item in manifest['files']}
    files['PROJEKT_MANIFEST.json'] = hashlib.sha256((root / 'PROJEKT_MANIFEST.json').read_bytes()).hexdigest()
    output.mkdir(parents=True, exist_ok=True)
    archive = output / f'CuD-1-{tag}.zip'
    prefix = f'CuD-1-{tag}/'
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as package:
        for name in sorted(files):
            info = zipfile.ZipInfo(prefix + name, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            package.writestr(info, (root / name).read_bytes())
    with zipfile.ZipFile(archive) as package:
        if package.testzip() is not None or len(package.namelist()) != len(files):
            raise ValueError('Beschädigtes oder unvollständiges ZIP.')
        for name, digest in files.items():
            if hashlib.sha256(package.read(prefix + name)).hexdigest() != digest:
                raise ValueError('ZIP-Inhalt weicht ab: ' + name)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    (output / 'SHA256SUMS').write_text(f'{digest}  {archive.name}\n', encoding='utf-8')
    return archive, digest, len(files)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('tag')
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    archive, digest, count = pack(root, root / '.upload-work/releases' / args.tag, args.tag)
    print(f'RELEASE_PACKAGE_PASS files={count} sha256={digest} path={archive}')
