import hashlib
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

from manifest import entries
from release import pack


class ReleaseTest(unittest.TestCase):
    def test_reproducible_bytes_and_reject_unverified_changes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'package.json').write_text('{"version":"0.2.0"}')
            (root / 'quelle.bin').write_bytes(b'a\r\nb\x00')
            (root / 'node_modules').mkdir()
            (root / 'node_modules/cache').write_text('excluded')
            (root / '.env').write_text('excluded-secret')
            (root / 'PROJEKT_MANIFEST.json').write_text(json.dumps({'files': entries(root)}))
            output = root / '.upload-work/release'
            archive, digest, count = pack(root, output, 'v0.2.0')
            self.assertEqual(count, 3)
            first = archive.read_bytes()
            self.assertEqual(pack(root, output, 'v0.2.0')[1], digest)
            self.assertEqual(archive.read_bytes(), first)
            with zipfile.ZipFile(archive) as package:
                self.assertEqual(package.read('CuD-1-v0.2.0/quelle.bin'), b'a\r\nb\x00')
                self.assertFalse(any('.env' in name or 'cache' in name for name in package.namelist()))
            self.assertEqual(hashlib.sha256(first).hexdigest(), digest)
            with self.assertRaises(ValueError):
                pack(root, output, 'v0.1.0')
            (root / 'quelle.bin').write_bytes(b'changed')
            with self.assertRaises(ValueError):
                pack(root, output, 'v0.2.0')


if __name__ == '__main__':
    unittest.main()
