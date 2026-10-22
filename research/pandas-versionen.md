# Pandas-/NumPy-Versionsabhängigkeiten in Übung 02 und Klausur Teil A

Research-Ticket: [#34](https://github.com/Sae-l/CuD/issues/34) · Map: [#25](https://github.com/Sae-l/CuD/issues/25)
Stand: 2026-10-22

## Frage

Welche Aufgaben und erwarteten Ergebnisse in `CuD_Uebung 02.pdf` (im Folgenden „Ü02“) und
`CuD_Exam_PartA_001.pdf` („Klausur“) hängen von der pandas-/numpy-Version ab? Die Testumgebung
des Repos nutzt `pandas==3.0.6`, `numpy==2.5.4` (`requirements-test.txt`). Der Kurs installiert
mit `pip install numpy pandas` ohne Version (Ü02, Aufgabe 1.1). Wer heute neu installiert, bekommt
pandas 3.x. Wer eine ältere Umgebung weiterverwendet, hat womöglich noch pandas 2.x.

## Methode

- Die PDFs wurden mit `pdftotext` lokal gelesen. Sie liegen nicht im Repo, es gibt hier keine Zitate.
- Den Datensatz `bb12024.csv` aus Ü02, Aufgabe 1.2, habe ich lokal nachgebaut (nicht committet).
- Ein Prüfskript lief alle pandas-/numpy-Schritte aus Ü02, Module 4–10, und der Klausur, Aufgaben
  28 und 33–36, in drei Wegwerf-venvs (Python 3.12) durch:
  - **A:** pandas 2.2.3 + numpy 2.2.6
  - **B:** pandas 3.0.6 + numpy 2.5.4 (= Testumgebung des Repos)
  - **C:** pandas 2.2.3 + numpy 1.26.4 (nur für die numpy-Punkte)
- Primärquellen:
  - [pandas 3.0.0 Release Notes](https://pandas.pydata.org/docs/whatsnew/v3.0.0.html)
  - [pandas 2.2.0 Release Notes](https://pandas.pydata.org/docs/whatsnew/v2.2.0.html)
  - [pandas Copy-on-Write Guide](https://pandas.pydata.org/docs/user_guide/copy_on_write.html)
  - [NumPy 2.0 Migration Guide](https://numpy.org/devdocs/numpy_2_0_migration_guide.html)
  - [NEP 51 (Scalar-Repr)](https://numpy.org/neps/nep-0051-scalar-representation.html)

## Kernergebnis

Die **Zahlenwerte** sind in pandas 2.2 und 3.0 überall gleich. Kein Rechenergebnis aus Ü02 oder der
Klausur hängt von der Version ab. Versionsabhängig sind nur:

1. **Abgedruckte Konsolenausgaben**: Klassenname, `info()`-Dtype, `dtype`-Text, Datetime-Auflösung.
2. **Muster, die in pandas 3 still nichts mehr bewirken**: Chained Assignment und
   `df['spalte'].methode(..., inplace=True)`. Die PDFs nutzen sie nicht, Studierende schreiben sie aber oft.
3. **Veraltete Frequenz-Aliase** wie `'5T'`: In 2.2 nur eine Warnung, in 3.0 ein Fehler.
   Die PDFs nutzen korrekt `'5min'`.

Unabhängig von der Version weichen mehrere **abgedruckte Erwartungswerte in Ü02 vom tatsächlichen
Ergebnis ab**. Die Abweichungen sind in A und B identisch (siehe Abschnitt „Nicht versionsbedingt“).

## Betroffene Aufgaben (versionsabhängig)

| Stelle | Was das PDF zeigt/erwartet | pandas 2.2 (A) | pandas 3.0 (B) | Beleg |
|---|---|---|---|---|
| Ü02 5.1 (`type(df_test)`, `type(spalte)`) | Klassennamen mit `pandas.core.frame…` / `pandas.core.series…` | wie PDF | `<class 'pandas.DataFrame'>` / `<class 'pandas.Series'>` | 3.0 Release Notes, „The `__module__` attribute now points to public modules“; Test B |
| Ü02 5.3 (`df.info()`) | Spalte `zeit` mit Dtype `object` | `object`, Fußzeile `dtypes: float64(4), object(1)`, `memory usage: 932.0+ bytes` | `str`, Fußzeile `dtypes: float64(4), str(1)`, `memory usage: 932.0 bytes` (ohne `+`) | 3.0 Release Notes, „Dedicated string data type by default“; Test A/B |
| Ü02 5.5 Kontrollfrage 2 (info lesen) | Non-Null-Count 18 von 20 | gleich | gleich | Test A/B |
| Ü02 8.1 (`dtype` vorher/nachher) | `object -> datetime64[ns]` | `object -> datetime64[ns]` | `str -> datetime64[us]` | 3.0 Release Notes, „Dedicated string data type…“ und „Datetime/timedelta resolution inference“ (Strings werden standardmäßig zu Mikrosekunden); Test B |
| Ü02 8.1, Einleitung Modul 8 | Text sagt, `zeit` liege als `object` vor | stimmt | `zeit` ist `str` | wie oben |
| Ü02 8.1 (Wochentag, Dauer) | `Monday`, `0 days 00:57:00` | gleich | gleich | Test A/B |
| Ü02 8.2 / Klausur 36 (`set_index(..., inplace=True)`) | in-place, Rückgabe wird nicht benutzt | gibt `None` zurück, wirkt | gibt `None` zurück, wirkt | Test A/B. Hinweis: Laut 3.0 Release Notes geben *einige* inplace-Methoden (z. B. `fillna`, `replace`) jetzt `self` statt `None` zurück. Für `set_index` hat sich in 3.0.6 nichts geändert. |
| Ü02 8.3, 8.4, 10.2 / Klausur 36 (`resample('5min')`) | `'5min'` | funktioniert | funktioniert | Test A/B |
| (Variante) `resample('5T')` aus älteren Tutorials | – | FutureWarning, funktioniert | **ValueError: Invalid frequency: 5T** | 2.2 Release Notes, „Other Deprecations“ (`T`, `S`, `L`, `U`, `N` deprecated); Test B |
| Ü02 7.2, 7.3, 10.2 / Klausur 34 (`fillna`, `ffill`, `interpolate`) | Zuweisungsform `df['x'] = df['x'].ffill()` | funktioniert | funktioniert | Test A/B |
| (Variante) `df['o2_ist'].fillna(0.0, inplace=True)` oder `df['o2_ist'][2] = …` | – | wirkt noch, FutureWarning bzw. SettingWithCopyWarning | **wirkt nicht** (NaN bleiben), nur `ChainedAssignmentError`-Warnung | 2.2 Release Notes, „Chained assignment“; 3.0 Release Notes, „Consistent copy/view behaviour with Copy-on-Write“; CoW Guide; Test A/B |
| (Variante) Filter ohne `.copy()` und danach Spalte zuweisen | Ü02 7.3/10.2 nutzen `.copy()` | funktioniert, SettingWithCopyWarning | funktioniert ohne Warnung | 3.0 Release Notes (SettingWithCopyWarning entfernt); Test A/B |
| Ü02 5.4 / Klausur 33(b) (`describe()` ohne `zeit`) | `zeit` fehlt in `describe()` | fehlt (object) | fehlt (str) | Test A/B. Standardmäßig fasst `describe()` nur numerische Spalten zusammen. Die erwartete Antwort („kein Zahlentyp“) stimmt in beiden Versionen. Mit `include='all'` ist die Ausgabe in A und B identisch. |
| Klausur 33 (abgedruckte info()-Zeile) | `zeit … object` | stimmt | in pandas 3 stünde dort `str` | wie Ü02 5.3 |
| Klausur 36(a) (Resample ohne DatetimeIndex) | Fehlermeldung | `TypeError: Only valid with DatetimeIndex, TimedeltaIndex or PeriodIndex, but got an instance of 'RangeIndex'` | identisch | Test A/B |
| Klausur 36(b) | Lücke 08:05 → NaN | 08:00 = 2.3, 08:05 = NaN, 08:10 = 3.5 | identisch | Test A/B |
| Ü02 8.1 `pd.to_datetime(..., errors='coerce')` | Format `YYYY-MM-DD HH:MM:SS` | wird geparst, kaputte Strings → `NaT` | identisch | Test A/B. Formatinferenz anhand des ersten Werts gilt seit pandas 2.0 in beiden Versionen gleich. Gemischte Formate in einer Spalte werden in beiden zu `NaT`. Bei `01.02.2024` gilt in beiden Monat zuerst (`dayfirst=False`). |

## numpy-Punkte

| Stelle | numpy 1.26 (C) | numpy 2.x (A, B) | Beleg |
|---|---|---|---|
| Ü02 4.4 Kontrollfrage 1 / Klausur 28 (`np.array([2.14, 2.08, "Error", 1.95])`) | dtype `<U32`, `arr * 2` → `UFuncTypeError: ufunc 'multiply' did not contain a loop …` | dtype `<U32`, `arr * 2` → `TypeError: The 'out' kwarg is necessary … numpy.strings.multiply …` (Wortlaut 2.2 und 2.5 leicht verschieden) | Test A/B/C; NumPy 2.0 Migration Guide (neue `numpy.strings`-ufuncs). Die erwartete Antwort („Unicode-String-dtype, keine Arithmetik“) stimmt in allen Versionen, nur der Fehlertext unterscheidet sich. |
| Ü02 4.1–4.3, 9.3, Klausur 27/30/31 (Arrays mit `print`) | `[2.1  1.95 …]` | identisch | Test A/B |
| Skalare in Containern (z. B. `print((mw, std))` mit numpy-Werten) | `(1.5, …)` | `(np.float64(1.5), …)` | NEP 51 / NumPy 2.0 Release Notes. Die PDFs geben numpy-Skalare per f-String aus, dort ist die Ausgabe identisch. Gibt jemand ein von `berechne_statistik` zurückgegebenes Tupel direkt mit `print` aus, sieht er unter numpy 2 `np.float64(...)`. |

## Nicht versionsbedingt: Erwartungswerte im PDF passen nicht zum Datensatz

Die folgenden Werte sind in pandas 2.2 und 3.0 identisch, weichen aber vom Abdruck in Ü02 ab.
Für die Prüfstrategie (#35) zählen deshalb die selbst berechneten Werte, nicht die abgedruckten.

- **Ü02 5.4 `describe().round(2)`:** Die Werte weichen von der abgedruckten Tabelle ab, die
  zusätzlich spaltenverschoben extrahiert wurde.
  Gerechnet: o2_ist mean 1.76 / std 0.68 / 25 % 1.68; o2_soll mean 2.17; nh4 mean 2.31 / 50 % 1.95; temp std 0.28.
- **Ü02 7.2:** Gerechnet 2.08 / 2.31 / 2.38 statt der abgedruckten Werte.
- **Ü02 8.3, 5-Minuten-Raster:** 08:20 nh4 = 4.47. Grund: Mittel aus 4.35 und 4.60 ergibt 4.475,
  und `round` arbeitet auf dem Binärwert. Der Abdruck zeigt 4.48. Dasselbe gilt für die Alarmtabelle in 10.4.
- **Ü02 8.3, 15-Minuten-Raster:** 08:30 o2_ist = 1.80, 08:45 nh4 = 1.82. Das weicht vom Abdruck ab.
- **Ü02 10.4, Report:** O2-Mittel 1.75, Soll-Mittel 2.17, NH4 2.51, Temperatur 11.71, Gebläse 25.91 kW.
  Das weicht vom Abdruck ab. Die Zeilenzahl (20 → 12) und die zwei Alarm-Intervalle stimmen.
- **Ü02 8.3:** Der extrahierte Text der 15-Minuten-Anweisung endet nach `.resample('15min')`.
  Möglicherweise ist dort Code am Seitenrand abgeschnitten. Ohne `.mean()` gibt pandas in beiden
  Versionen nur ein Resampler-Objekt aus. Die abgedruckte Tabelle braucht `.mean()`.

## Empfehlung

1. **Version im Lernwerkzeug nennen und pinnen:** Als Referenz `pandas 3.0.x` / `numpy 2.x` angeben
   (entspricht `requirements-test.txt`). Für Studierende `pip install "pandas>=3,<4" numpy` empfehlen
   oder einen Prüfbefehl anbieten: `python -c "import pandas, numpy; print(pandas.__version__, numpy.__version__)"`.
2. **Bei den betroffenen Stellen einen kurzen Versionshinweis zeigen** (Ü02 5.1, 5.3, 8.1;
   Klausur 33): Unter pandas 3 steht dort `pandas.DataFrame`, `str` und `datetime64[us]`, unter
   pandas 2 `pandas.core.frame.DataFrame`, `object` und `datetime64[ns]`. Beide Ausgaben sind richtig.
3. **Lösungsvergleich robust machen:** Prüfungen im Repo sollen Zahlen und Struktur vergleichen
   (Werte, Zeilenzahlen, Index) und keine Ausgabetexte, die `dtype`-Namen oder Klassennamen enthalten.
   Erwartete dtypes über `pd.api.types.is_string_dtype` / `is_datetime64_any_dtype` prüfen.
4. **Pandas-3-Fallen als Hinweis aufnehmen** (Ü02 Modul 7 und Klausur 34/35):
   - Immer `df['x'] = df['x'].ffill()` schreiben, nie `df['x'].ffill(inplace=True)`.
   - `df.loc[zeile, 'x'] = …` statt `df['x'][zeile] = …`.
   - `'5min'` statt `'5T'`.
5. **Abgedruckte Erwartungswerte nicht übernehmen**, sondern aus dem nachgebauten Datensatz neu
   berechnen (siehe vorheriger Abschnitt). Das gehört zu #35.

## Offene Punkte / nicht geprüft

- pandas 1.x und Python 3.13/3.14 habe ich nicht getestet. Ein `pip install` liefert heute pandas 3.
- Die PDF-Tabellen sind teilweise spaltenverschoben extrahiert. Ich habe die Werte aus Ü02 5.4 und
  8.3 deshalb nur grob zugeordnet.
