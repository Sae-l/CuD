#!/usr/bin/env python3
"""Technische Plattformtests ohne Agent-Konto; schreibt nur in temporäre Verzeichnisse."""
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
NAME = "pdf-seitenweise-sichten"


class Installationstest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name)

    def run_python(self, script, *args):
        return subprocess.run([sys.executable, str(script), *map(str, args)], cwd=self.work,
                              capture_output=True, text=True, encoding="utf-8", errors="replace")

    def global_install(self, home):
        command = (["powershell", "-NoProfile", "-NonInteractive", "-File", str(ROOT / "install.ps1"),
                    "-Zielbasis", str(home)] if os.name == "nt" else ["bash", str(ROOT / "install.sh"), str(home)])
        result = subprocess.run(command, cwd=self.work, capture_output=True, text=True, errors="replace")
        if os.name == "nt" and "UnauthorizedAccess" in result.stderr:
            self.skipTest("Windows-Ausführungsrichtlinie sperrt .ps1; portable Projektinstallation separat geprüft")
        return result

    def test_project_copies_run_from_another_directory(self):
        project = self.work / "Projekt mit Leerzeichen und Umlaut ä"
        project.mkdir()
        result = self.run_python(ROOT / "scripts/install_projekt.py", project)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        source = self.work / "PDF Quellen"
        source.mkdir()
        pdf = source / "Mechanik.pdf"
        drawing = canvas.Canvas(str(pdf))
        drawing.drawString(50, 700, "Aufgabe zur Mechanik: Kraft und Beschleunigung")
        drawing.save()
        for folder in (".agents", ".claude"):
            with self.subTest(folder=folder):
                installed = project / folder / "skills" / NAME
                for path in installed.rglob("*"):
                    if path.is_file():
                        self.assertEqual(path.read_bytes(), (ROOT / path.relative_to(installed)).read_bytes())
                script = installed / "scripts/sichtung.py"
                output = self.work / (folder + "_sichtung")
                for args in (("--help",), ("extract", source, output), ("check", output),
                             ("render", pdf, 1, self.work / (folder + "_bilder")),
                             ("search", output, "Kraft"), ("read", output, "Mechanik.pdf", 1)):
                    result = self.run_python(script, *args)
                    self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                note = self.work / "Arbeitsfassung.md"
                note.write_text("Kraft und Beschleunigung, Quellenbezug wird beim Speichern ergänzt.", encoding="utf-8")
                for args in (("save", output, "Mechanik.pdf", 1, note),
                             ("read", output, "Mechanik.pdf", 1, "--arbeitsfassung")):
                    result = self.run_python(script, *args)
                    self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertTrue((output / "Seitenindex.md").is_file())
                self.assertTrue((self.work / (folder + "_bilder") / "Mechanik-S001.png").is_file())

    def test_project_conflict_preserves_existing_data(self):
        existing = self.work / ".agents/skills" / NAME
        existing.mkdir(parents=True)
        marker = existing / "manueller-nachweis.txt"
        marker.write_text("erhalten", encoding="utf-8")
        result = self.run_python(ROOT / "scripts/install_projekt.py", self.work)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(marker.read_text(encoding="utf-8"), "erhalten")
        self.assertFalse((self.work / ".claude").exists())

    def test_missing_project_is_rejected(self):
        missing = self.work / "fehlt"
        self.assertNotEqual(self.run_python(ROOT / "scripts/install_projekt.py", missing).returncode, 0)
        self.assertFalse(missing.exists())

    def test_project_link_cannot_write_outside_project(self):
        project, outside = self.work / "Projekt", self.work / "fremder Ordner"
        project.mkdir()
        outside.mkdir()
        link = project / ".agents"
        if os.name == "nt":
            result = subprocess.run(["cmd", "/c", "mklink", "/J", str(link), str(outside)],
                                    capture_output=True, text=True, errors="replace")
            if result.returncode and any(message in result.stdout + result.stderr
                                         for message in ("Zugriff verweigert", "Access is denied")):
                self.skipTest("Sandbox sperrt Junction-Erzeugung; Pfadschutz hier nicht ausführbar")
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            link.symlink_to(outside, target_is_directory=True)
        result = self.run_python(ROOT / "scripts/install_projekt.py", project)
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((outside / "skills").exists())
        self.assertFalse((project / ".claude").exists())

    def test_native_global_installer_is_repeatable(self):
        home = self.work / "isoliertes Profil ä"
        for _ in range(2):
            result = self.global_install(home)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        for folder in (".claude/skills", ".agents/skills", ".gemini/config/skills",
                       ".gemini/antigravity-cli/skills"):
            self.assertEqual((home / folder / NAME).resolve(), ROOT.resolve())

    def test_native_global_installer_preserves_real_copy(self):
        home = self.work / "Profil mit alter Kopie"
        existing = home / ".claude/skills" / NAME
        existing.mkdir(parents=True)
        marker = existing / "nachweis.txt"
        marker.write_text("nicht ersetzen", encoding="utf-8")
        result = self.global_install(home)
        self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(marker.read_text(encoding="utf-8"), "nicht ersetzen")
        self.assertFalse(existing.is_symlink())
        self.assertEqual((home / ".agents/skills" / NAME).resolve(), ROOT.resolve())


if __name__ == "__main__":
    result = unittest.main(exit=False).result
    if os.environ.get("GITHUB_ACTIONS") and result.skipped:
        sys.exit("CI muss auch den nativen Installer ausführen; übersprungene Tests sind kein Nachweis")
    sys.exit(0 if result.wasSuccessful() else 1)
