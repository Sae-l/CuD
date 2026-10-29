import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Seaborn Design aktivieren
sns.set_theme(style="darkgrid")

# --- 1. Parameter definieren ---
f_signal = 50.0      # Frequenz des Sinus in Hz
f_sample = 1000.0    # Abtastrate in Hz (deutlich über Nyquist)
t_end = 0.2          # Dauer des Signals in Sekunden


# Zeitvektor erstellen
t = np.linspace(0, t_end, int(f_sample * t_end), endpoint=False)

# --- 2. Signal flach machen (Oberwellen erzeugen) & weniger Rauschen ---
# Reiner Sinus, der über die Clipping-Grenzen hinausgeht
y_raw = 1.5 * np.sin(2 * np.pi * f_signal * t)

# Abflachen (Clipping auf [-0.75, 0.75]) -> Erzeugt ungerade Oberwellen
y_flat = np.clip(y_raw, -10, 10)

# Wesentlich weniger weißes Rauschen generieren (Standardabweichung auf 0.15 gesenkt)
noise = np.random.normal(0, 0.15, len(t))

# Rauschen zum abgeflachten Signal addieren
y_noisy = y_flat * 1.5

# --- 3. FFT (Fast Fourier Transform) durchführen ---
N = len(t)
yf = np.fft.fft(y_noisy)
xf = np.fft.fftfreq(N, 1.0 / f_sample)

# Nur positive Frequenzen
xf_positive = xf[:N//2]
yf_magnitude = 2.0/N * np.abs(yf[:N//2])

# --- 4. Visualisierung mit Seaborn ---
fig, axes = plt.subplots(2, 1, figsize=(12, 8))

# Oberer Plot: Zeitbereich
sns.lineplot(x=t, y=y_noisy, ax=axes[0], label='Verrauschtes Signal (wenig Rauschen)', color='steelblue', alpha=0.8)
sns.lineplot(x=t, y=y_flat, ax=axes[0], label='Abgeflachter 50Hz Sinus', color='darkred', linewidth=2)
axes[0].set_title("Zeitbereich: Abgeflachtes 50Hz Signal mit geringem Rauschen", fontsize=14)
axes[0].set_xlabel("Zeit [s]")
axes[0].set_ylabel("Amplitude")
axes[0].set_ylim(-3, 3)
axes[0].legend()

# Unterer Plot: Frequenzbereich (FFT)
sns.lineplot(x=xf_positive, y=yf_magnitude, ax=axes[1], color='forestgreen', label='Spektrum')
axes[1].set_title("Frequenzbereich: Fast Fourier Transform (FFT) mit Oberwellen", fontsize=14)
axes[1].set_xlabel("Frequenz [Hz]")
axes[1].set_ylabel("Magnitude")
axes[1].set_xlim(0, 350) # Range erhöht, um die Oberwellen bei 150 Hz und 250 Hz zu sehen

# Spitzen beschriften, um die Oberwellen zu veranschaulichen
axes[1].annotate('50Hz (Grundwelle)', xy=(50, 1.1), xytext=(55, 1.1), fontsize=10, fontweight='bold')
axes[1].annotate('150Hz (3. Oberwelle)', xy=(150, 0.35), xytext=(155, 0.35), fontsize=10)
axes[1].annotate('250Hz (5. Oberwelle)', xy=(250, 0.2), xytext=(255, 0.2), fontsize=10)

plt.tight_layout()
plt.show()