"""Regression: Das Vaultmanifest erhält auf Windows und POSIX dieselbe Reihenfolge."""
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import vault_pruefen


class VaultInventoryTest(unittest.TestCase):
    def test_manifest_sorts_posix_names_with_mixed_case(self):
        names = [
            'Pruefung/beispiel_pruefen.cjs',
            'Pruefung/Bestandsaufnahme.json',
            'Z.txt',
            'a.txt',
        ]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in names:
                target = root / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(b'fixture\n')
            with patch.object(vault_pruefen, 'ROOT', root), patch.object(
                vault_pruefen, 'MANIFEST', root / 'Pruefung/VAULT_MANIFEST.json'
            ):
                result = vault_pruefen.inventory()
            self.assertEqual([record['path'] for record in result], [
                'Pruefung/Bestandsaufnahme.json',
                'Pruefung/beispiel_pruefen.cjs',
                'Z.txt',
                'a.txt',
            ])


if __name__ == '__main__':
    unittest.main()
