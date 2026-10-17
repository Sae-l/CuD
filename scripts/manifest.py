"""Prüft Projektdateien; nur --write erneuert den Integritätsstand."""
import argparse
import hashlib
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {".git", ".claude", ".upload-work", ".test-packages", ".test-env", ".venv", "__pycache__", "node_modules"}


def entries(root):
    records = []
    for directory, folders, files in os.walk(root):
        # Nur der dokumentierte Unter-Vault liefert gemeinsame Obsidian-Einstellungen aus.
        folders[:] = [name for name in folders if name not in EXCLUDED
                      and not (Path(directory) == root and name == ".obsidian")]
        for name in files:
            file = Path(directory) / name
            relative = file.relative_to(root).as_posix()
            # Obsidian speichert hier persönliche, von Git ignorierte Fensterzustände.
            if ".obsidian" in file.parts and name.startswith("workspace"):
                continue
            if relative in {"PROJEKT_MANIFEST.json", "debug.log"} or name.startswith(".env") or file.suffix in {".pyc", ".pyo"}:
                continue
            data = file.read_bytes()
            records.append({"path": relative, "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(),
                            "git_blob_sha1": hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()})
    return sorted(records, key=lambda entry: entry["path"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true", help="aktuellen Stand prüfen (Standard)")
    mode.add_argument("--write", action="store_true", help="geprüfte Änderungen als neuen Stand übernehmen")
    args = parser.parse_args()
    target = ROOT / "PROJEKT_MANIFEST.json"
    manifest = json.loads(target.read_text(encoding="utf-8"))
    actual = entries(ROOT)
    if args.write:
        manifest["files"] = actual
        manifest["scope"] = "All project files; excludes this manifest, debug.log, .env files, .claude, root .obsidian and local dependencies/environments/caches"
        target.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if manifest["files"] != actual:
        before = {entry["path"]: entry for entry in manifest["files"]}
        after = {entry["path"]: entry for entry in actual}
        changed = sorted(name for name in before.keys() | after.keys() if before.get(name) != after.get(name))
        raise SystemExit("PROJECT_MANIFEST_FAIL: " + ", ".join(changed))
    print(f"PROJECT_MANIFEST_PASS files={len(actual)}")


if __name__ == "__main__":
    main()
