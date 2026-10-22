import hashlib
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

from manifest import entries
from release import pack


class ReleaseTest(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        (self.root / 'package.json').write_text('{"version":"0.2.0"}')
        (self.root / 'quelle.bin').write_bytes(b'a\r\nb\x00')
        (self.root / 'node_modules').mkdir()
        (self.root / 'node_modules/cache').write_text('excluded')
        (self.root / '.env').write_text('excluded-secret')
        for name in ('.claude/launch.json', '.obsidian/app.json'):
            file = self.root / name
            file.parent.mkdir()
            file.write_text('local-only')
        (self.root / 'PROJEKT_MANIFEST.json').write_text(json.dumps({'files': entries(self.root)}))
        self.output = self.root / '.upload-work/release'

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_reproducible_bytes(self):
        archive, digest, count = pack(self.root, self.output, 'v0.2.0')
        self.assertEqual(count, 3)
        first = archive.read_bytes()
        self.assertEqual(pack(self.root, self.output, 'v0.2.0')[1], digest)
        self.assertEqual(archive.read_bytes(), first)
        with zipfile.ZipFile(archive) as package:
            self.assertEqual(package.read('CuD-1-v0.2.0/quelle.bin'), b'a\r\nb\x00')
            self.assertFalse(any('.env' in name or 'cache' in name for name in package.namelist()))
            self.assertFalse(any('/.claude/' in name or '/.obsidian/' in name for name in package.namelist()))
        self.assertEqual(hashlib.sha256(first).hexdigest(), digest)

    def test_reject_bad_version(self):
        with self.assertRaises(ValueError):
            pack(self.root, self.output, 'v0.1.0')

    def test_reject_unverified_changes(self):
        (self.root / 'quelle.bin').write_bytes(b'changed')
        with self.assertRaises(ValueError):
            pack(self.root, self.output, 'v0.2.0')


if __name__ == '__main__':
    unittest.main()
