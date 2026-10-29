# Uebung_03

Maschinelle Textextraktion zum Suchen. Formeln, Tabellen und Zeichnungen am Original prüfen.

## cud_ub_03 (27 PDF-Seiten)
[Markdown](md/cud_ub_03.md)

- S. 1: Übungsskript: Objektorientierte Campus-Verwaltung, / GUI-Entwicklung & Datenpersistenz mit Python [Aufgabe/Beispiel]
- S. 2: 1 Einführung und organisatorische Hinweise / Willkommen zum dritten großen Übungsskript des Moduls „ [Aufgabe/Beispiel]
- S. 3: 1.2 Das Projekt: Digitales Campus-Management-System „TH-CampusAdmin“ / Die Hochschulleitung möchte d
- S. 4: 2 Modul 1: Projekt-Setup und die abstrakte Basisklasse Person / In einem gut strukturierten Software [Aufgabe/Beispiel]
- S. 5: Listing 1: Grundgerüst der abstrakten Klasse Person in models.py / 1 from abc import ABC , abstractm [Aufgabe/Beispiel]
- S. 6: 3 Modul 2: Konkrete Personenklassen ableiten (Studierender, Professor, / Mitarbeiter) [Aufgabe/Beispiel]
- S. 7: 3.3 Aufgabe 2.3: Die Klasse Mitarbeiter (University Staff) / Implementieren Sie als dritte abgeleite [Aufgabe/Beispiel]
- S. 8: 4 Modul 3: Überschreiben (Overriding) und Überladen (Overloading) / in der Praxis [Aufgabe/Beispiel]
- S. 9: 12 self. vorlesungen .append( titel_clean ) / 13 # Fall B: Es wurde ein einzelner String übergeben [Aufgabe/Beispiel]
- S. 10: 3. Welchen Vorteil hat es, beim Überschreiben einer Methode in der Kindklasse trotzdem super().metho
- S. 11: 5 Modul 4: Polymorphismus und zentrale Listenverwaltung / Bevor wir die grafische Oberfläche und das [Aufgabe/Beispiel]
- S. 12: 1. Schreiben Sie in UniversitaetsVerwaltung eine Methode zeige_alle_personen(self), / die alle gespe
- S. 13: 6 Modul 5: Datenpersistenz – Speichern und Laden beim Programmstart (JSON) / Solange unsere Personen [Aufgabe/Beispiel]
- S. 14: 29 email=d["email"], / 30 abteilung =d.get("abteilung", "Verwaltung"), [Aufgabe/Beispiel]
- S. 15: 7 Modul 6: Schritt 2 – Grafische Benutzeroberfläche mit Tkinter aufbauen / Nachdem unser objektorien [Aufgabe/Beispiel]
- S. 16: 8 Modul 7: CRUD-Aktionen in der Maske und Komplettcode / In diesem Modul verknüpfen wir die Schaltfl [Aufgabe/Beispiel]
- S. 17: 7 def __init__(self , person_id : str, vorname: str, nachname : str, email: str): / 8 if not str( pe
- S. 18: 66 # Überladen (Method Overloading) durch Default -Parameter & Rückgabeweiche / 67 def studienfortsc
- S. 19: 127 def get_details (self) -> str: / 128 vl_str = ", ".join(self. vorlesungen ) if self. vorlesungen
- S. 20: 13 def finde_nach_id (self , person_id : str): / 14 for p in self.personen:
- S. 21: 75 return False / 77 def erzeuge_beispiel_daten (self):
- S. 22: 39 self. combo_rolle .grid(row=0, column =1, sticky="w", padx =6, pady =4) / 40 self. combo_rolle .b
- S. 23: 91 spalten = ("id", "rolle", "name", "email", "details") / 92 self.tree = ttk.Treeview(table_frame ,
- S. 24: 148 z3 = self. entry_zusatz3 .get ().strip () / 150 if rolle == "Studierender":
- S. 25: 207 self. entry_zusatz2 .delete (0, tk.END) / 208 self. entry_zusatz3 .config(state="normal")
- S. 26: 264 messagebox .showinfo("Ausweis -Vorschau", "Bitte wählen Sie zuerst eine / Person in der Tabelle 
- S. 27: 9 Modul 8: Erweiterungsaufgaben für Fortgeschrittene & Reflexion / Wenn Ihre Anwendung läuft und Sie [Aufgabe/Beispiel]
