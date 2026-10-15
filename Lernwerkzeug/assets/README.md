# Lokal mitgelieferte Gestaltung

Die Webseite lädt diese Dateien ausschließlich aus diesem Ordner. Es gibt keine automatischen Anfragen an Schrift-, Bild- oder Animationsdienste. Der Projektordner einschließlich `assets/` muss zusammenbleiben.

- **Outfit**, variable Schrift von Rodrigo Fuenzalida: unveränderte Datei aus dem Google-Fonts-Repository, mit [SIL Open Font License](OFL-Outfit.txt). Der konkrete Quellcommit steht in [sources.json](sources.json).
- **GSAP und ScrollTrigger 3.15.0**: unveränderte Browserdateien aus dem offiziellen npm-Paket. Vor der Übernahme wurde dessen SHA-512-Integrität gegen die Registry-Metadaten geprüft. Lizenzhinweise in den Dateien bleiben erhalten; es gilt die [GSAP Standard License](https://gsap.com/standard-license/). Das mitgelieferte [Original-README](GSAP-README.md) gehört zum Paket. Es wird kein React, Paketmanager oder Buildschritt zum Benutzen benötigt.
- **Laptop-Foto von Alejandro Escamilla**: [Original auf Unsplash](https://unsplash.com/photos/yC-Yzbqy7PY), heruntergeladen über Lorem Picsum, Bild-ID 0. Die Fotografie ist rein dekorativ und stellt weder Kursräume noch Geräteanforderungen dar. Die ursprünglich ausgewürfelte Seed-Adresse ergab ein unpassendes Tiermotiv; deshalb wurde ein tatsächlich angesehenes Laptop-Motiv gewählt.

[sources.json](sources.json) hält Downloadadressen, Dateigrößen und SHA-256-Werte fest. Die gesamte ausgelieferte Fassung wird zusätzlich im Projektmanifest erfasst. Für einen Austausch die offiziellen Quellen verwenden, Lizenzhinweise erhalten und beide Integritätsnachweise aktualisieren.
