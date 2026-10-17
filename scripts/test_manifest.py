import hashlib
import tempfile
import unittest
from pathlib import Path
from manifest import entries


class ManifestTest(unittest.TestCase):
    def test_bytes_changes_and_exclusions(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            file = root / "übung.txt"
            file.write_bytes(b"a\r\nb\n")
            (root / ".env").write_text("secret")
            (root / "PROJEKT_MANIFEST.json").write_text("{}")
            (root / "node_modules").mkdir()
            (root / "node_modules" / "cache").write_text("ignored")
            obsidian = root / "Obsidian-CuD" / ".obsidian"
            obsidian.mkdir(parents=True)
            (obsidian / "workspace.json").write_text("private window layout")
            (obsidian / "workspace-mobile.json").write_text("private mobile layout")
            before = entries(root)
            self.assertEqual(len(before), 1)
            self.assertEqual(before[0]["bytes"], 5)
            self.assertEqual(before[0]["sha256"], hashlib.sha256(b"a\r\nb\n").hexdigest())
            self.assertEqual(before[0]["git_blob_sha1"], hashlib.sha1(b"blob 5\0a\r\nb\n").hexdigest())
            file.write_bytes(b"a\nb\n")
            self.assertNotEqual(before, entries(root))
            file.unlink()
            self.assertEqual(entries(root), [])


if __name__ == "__main__":
    unittest.main()
