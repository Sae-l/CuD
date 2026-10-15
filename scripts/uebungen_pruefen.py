"""Unabhängige Erwartungen für die ergänzten Originalaufgaben und FFT-Lektion."""
import contextlib
import csv
import io
import math
import statistics
from pathlib import Path


def pruefe(items, csv_text, output, live_csv):
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd

    scopes, outputs = {}, {}
    numbers = [f"{module}.{task}" for module, count in [(1, 3), (2, 3), (3, 3), (4, 3), (5, 4), (7, 3), (8, 3), (9, 3), (10, 3)] for task in range(1, count + 1)]
    by_id = {item['id']: item for item in items}
    assert {item['id'] for item in items if item['kind'] == 'Übung'} == {'aufgabe-' + number.replace('.', '-') for number in numbers + ['6.1', '6.2', '6.3']}, 'Neue Originalaufgabe braucht einen eigenen Prüffall.'
    Path('messdaten.csv').write_text(csv_text, encoding='utf-8')
    for number in numbers:
        item = by_id['aufgabe-' + number.replace('.', '-')]
        scope = {'__name__': 'lernbeispiel'}
        stream = io.StringIO()
        with contextlib.redirect_stdout(stream):
            exec(compile(item['solution']['code'], item['id'], 'exec'), scope)
        scopes[number] = scope
        outputs[number] = stream.getvalue()
        if number == '1.1':
            file = Path('SmartCityProject/main.py')
            assert file.is_file()
            file.write_text('# Eigener Code bleibt erhalten', encoding='utf-8')
            with contextlib.redirect_stdout(io.StringIO()):
                exec(item['solution']['code'], {})
            assert file.read_text(encoding='utf-8') == '# Eigener Code bleibt erhalten'
        if number == '9.2':
            ax = scope['ax']
            np.testing.assert_allclose(ax.lines[0].get_ydata(), [22.5, 23.1, 105, 21.8, -5, 24, 22.9, 110.5, 23.5, 22.1, 23.8, 22, 24.5, 108.2, 23])
            assert ax.get_xlabel() and ax.get_ylabel() and ax.get_title()
        if number == '9.3':
            assert len(scope['fig'].axes) == 2
            assert len(scope['ax1'].lines[0].get_ydata()) == 15
            assert len(scope['ax2'].patches) == 11
            assert all(ax.get_title() and ax.get_xlabel() and ax.get_ylabel() for ax in scope['fig'].axes)
            scope['fig'].savefig(Path(output) / 'vergleich-originalaufgabe.png', dpi=100)
        if number == '10.2':
            assert len(scope['ax'].patches) == 1
            assert any(-5 in line.get_ydata() and 110.5 in line.get_ydata() for line in scope['ax'].lines)
        if number == '10.3':
            assert len(scope['fig'].axes) == 2
            assert len(scope['ax1'].patches) == 1 and scope['ax2'].patches
            scope['fig'].savefig(Path(output) / 'report-originalaufgabe.png', dpi=100)
        plt.close('all')
    assert 'sys' in scopes['1.2']  # Interpreter-Auswahlprüfung, keine Geräteinstallation.
    assert outputs['1.3'] == 'Systemstart: Smart City Analyse\n'
    variables = scopes['2.1']
    assert [(variables[name], type(variables[name])) for name in ['sensor_id', 'standort', 'temperatur', 'ist_aktiv']] == [(1, int), ('Nordpark', str), (22.5, float), (True, bool)]
    assert outputs['2.2'].splitlines() == ["Datentyp von ID: <class 'int'>", "Datentyp von Standort: <class 'str'>", "Datentyp von Temperatur: <class 'float'>", "Datentyp von Aktiv-Status: <class 'bool'>"]
    assert scopes['2.3']['temp_fahrenheit'] == 72.5
    def branch(number, temperature=105.0, active=True):
        code = by_id['aufgabe-' + number.replace('.', '-')]['solution']['code']
        code = code.replace('temperatur = 105.0', f'temperatur = {temperature!r}').replace('ist_aktiv = True', f'ist_aktiv = {active!r}')
        stream = io.StringIO()
        with contextlib.redirect_stdout(stream):
            exec(code, {})
        return stream.getvalue().strip()

    assert branch('3.1', active=True) == 'Sensor sendet Daten' and branch('3.1', active=False) == 'Sensor ist offline!'
    temperature = lambda value: branch('3.2', temperature=value)
    assert [temperature(x) for x in [-1, 0, 30, 30.1, 50, 50.1]] == ['WARNUNG: Frost-Ausreißer erkannt!', 'Temperatur im Normalbereich.', 'Temperatur im Normalbereich.', 'Erhöhte Temperatur, aber im Rahmen.', 'Erhöhte Temperatur, aber im Rahmen.', 'WARNUNG: Hitze-Ausreißer erkannt (Möglicher Defekt)!']
    assert 'WARNUNG:' in branch('3.3', temperature=51, active=True)
    assert all('WARNUNG:' not in branch('3.3', temperature=t, active=active) for t, active in [(51, False), (50, True), (-1, True)])
    assert outputs['4.1'].splitlines() == ['Heize... aktuelle Temp: 15.0', 'Heize... aktuelle Temp: 17.5', 'Heize... aktuelle Temp: 20.0', 'Zieltemperatur erreicht.']
    assert scopes['4.1']['raum_temp'] == 22.5
    assert outputs['4.2'].splitlines() == [f'Sensor-Kalibrierungsschritt {i}: {v}' for i, v in [(1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]]
    assert outputs['4.3'].splitlines() == ['Sensor-Kalibrierungsschritt 1: 1', 'Sensor-Kalibrierungsschritt 2: 4', 'Sensor-Kalibrierungsschritt 4: 16']
    expected_list = [22.5, 23.1, 105.0, 21.8, 24.0, 110.5, 23.0]
    assert scopes['5.1']['messwerte_liste'] == expected_list
    assert math.isclose(scopes['5.2']['gesamtsumme'], sum(expected_list))
    assert math.isclose(scopes['5.2']['durchschnitt'], statistics.mean(expected_list))
    assert scopes['5.3']['sensor_dict']['Standort'] == 'Nordpark'
    assert outputs['5.4'].splitlines() == ['Sensor 1 am Standort Nordpark hat eine Temperatur von 22.5', 'Sensor 2 am Standort Labor hat eine Temperatur von 21.0']
    original_values = [float(row['Temperatur']) for row in csv.DictReader(io.StringIO(csv_text))]
    good = [value for value in original_values if 0 <= value <= 50]
    assert isinstance(scopes['7.2']['daten_np'], np.ndarray)
    np.testing.assert_allclose(scopes['7.2']['daten_np'], good)
    np.testing.assert_allclose(scopes['7.3']['daten_np'], good)
    np.testing.assert_allclose(scopes['7.3']['fahrenheit_np'], [value * 1.8 + 32 for value in good])
    raw = [22.5, 23.1, 105.0, 21.8, -5.0, 24.0, 22.9, 110.5, 23.5, 22.1, 23.8, 22.0, 24.5, 108.2, 23.0]
    expected_good = [value for value in raw if 0 < value <= 50]
    np.testing.assert_allclose(scopes['8.1']['rohdaten_np'], raw)
    np.testing.assert_allclose(scopes['8.2']['bereinigte_daten_np'], expected_good)
    for name, expected in [('mittelwert', statistics.mean(expected_good)), ('median', statistics.median(expected_good)), ('standardabweichung', statistics.pstdev(expected_good))]:
        assert math.isclose(scopes['8.3'][name], expected)
    np.testing.assert_allclose(scopes['10.3']['bereinigte_daten_np'], [value for value in original_values if 0 < value <= 50])
    # CSV-Report: leere, ungültige und Grenzdaten durch denselben Lösungscode prüfen.
    header = 'SensorID,Standort,Temperatur,Luftfeuchtigkeit,IstAktiv\n'
    for text, error in [(header, ValueError), (header + '1,Test,kaputt,40,True\n', ValueError)]:
        Path('messdaten.csv').write_text(text, encoding='utf-8')
        try:
            exec(by_id['aufgabe-10-3']['solution']['code'], {})
        except error:
            pass
        else:
            raise AssertionError('Ungültige Reportdaten akzeptiert')
    Path('messdaten.csv').write_text(header + '1,Test,0,40,True\n2,Test,50,40,True\n3,Test,51,40,True\n', encoding='utf-8')
    boundary = {}
    with contextlib.redirect_stdout(io.StringIO()):
        exec(by_id['aufgabe-10-3']['solution']['code'], boundary)
    assert boundary['bereinigte_daten_np'].tolist() == [50.0]
    plt.close('all')
    Path('messdaten.csv').write_text(csv_text, encoding='utf-8')

    live = {}
    for item in items:
        if item['id'].startswith('live-'):
            scope = {'__name__': 'lernbeispiel'}
            with contextlib.redirect_stdout(io.StringIO()):
                exec(item['solution']['code'], scope)
            live[item['id']] = scope
    mean = live['live-003-10']['berechne_sicheren_mittelwert']
    with contextlib.redirect_stdout(io.StringIO()):
        assert mean(['4.2', '4.5', 'Error', '4.1', 'TIMEOUT', '4.4']) == 4.3
        assert mean([]) is None and mean(['Error', 'nan', 'inf']) is None
    fixture = live_csv
    Path('live-mini.csv').write_text(fixture, encoding='utf-8')
    # Genau die ausgelieferten Daten und unveränderten Kopierprogramme ausführen.
    demo_outputs = {}
    for id in ['live-003-18', 'live-003-26', 'live-003-31']:
        item = by_id[id]
        assert item['download'][1] == 'beispiele/live-mini.csv'
        stream = io.StringIO()
        with contextlib.redirect_stdout(stream):
            exec(item['solution']['code'], {'__name__': '__main__'})
        demo_outputs[id] = stream.getvalue()
    assert 'Mittlere Temperatur: 24.00 °C' in demo_outputs['live-003-18']
    assert 'Anzahl kritischer Messpunkte: 2' in demo_outputs['live-003-18']
    assert 'Rasterzeilen: 3' in demo_outputs['live-003-31']
    assert 'Geschätzte Zellen: 2' in demo_outputs['live-003-31']
    assert 'Temperaturmittel: 25.0 °C' in demo_outputs['live-003-31']
    assert Path('live-mini.csv').read_text(encoding='utf-8') == live_csv
    with contextlib.redirect_stdout(io.StringIO()):
        frame, critical, average = live['live-003-18']['auswerten']('live-mini.csv')
    assert len(frame) == 3 and len(critical) == 2 and average == 24
    sampled = live['live-003-26']['lade_und_resample']('live-mini.csv')
    assert sampled.index.tolist() == list(pd.date_range('2024-01-01 08:00', periods=3, freq='5min'))
    np.testing.assert_allclose(sampled['temp_c'], [22, 25, 28])
    analysis = live['live-003-31']['BeckenAnalyse']('live-mini.csv')
    try:
        analysis.zeige_report()
    except ValueError:
        pass
    else:
        raise AssertionError('Klassenreport ohne Aufbereitung akzeptiert')
    analysis.aufbereiten_5min()
    np.testing.assert_allclose(analysis.df['temp_c'], [22, 25, 28])
    with contextlib.redirect_stdout(io.StringIO()):
        analysis.zeige_report()
    for id in ['live-003-18', 'live-003-26']:
        function = live[id]['auswerten' if id.endswith('18') else 'lade_und_resample']
        for contents in ['zeit,o2_ist,o2_soll,nh4_mg_l,temp_c\n', fixture.replace('08:01', 'kaputt') if id.endswith('26') else fixture.replace('o2_ist', 'falsch')]:
            Path('live-defekt.csv').write_text(contents, encoding='utf-8')
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    function('live-defekt.csv')
            except (ValueError, KeyError):
                pass
            else:
                raise AssertionError(id + ': Defekte oder leere Daten akzeptiert')
    fft = {'__name__': 'lernbeispiel'}
    with contextlib.redirect_stdout(io.StringIO()):
        exec(by_id['lektion-10']['code'], fft)
    assert fft['frequenzen'][np.argmax(fft['amplitude'])] == 50
    assert math.isclose(fft['amplitude'][10], 1.5, rel_tol=1e-12)
    assert np.count_nonzero(fft['amplitude'] > 1e-10) == 1
    assert np.max(np.abs(fft['abgeflacht'])) <= .75
    assert fft['amplitude_flach'][30] > .1  # 150 Hz entsteht erst durch echtes Clipping.
    fft['fig'].savefig(Path(output) / 'fft-einfuehrung.png', dpi=100)
    plt.close('all')
    return {'original_exercises': len(numbers), 'live_exercises': len(live), 'fft': True, 'original_dataset_available': False, 'demo_entrypoints': len(demo_outputs)}
