"use strict";
// Sprachliste, Schreibrichtung und Glossar; die Übersetzungen selbst liegen je Sprache in uebersetzung-<code>.js.
const sprachen = {de:"Deutsch",en:"English",ar:"العربية",tr:"Türkçe",fa:"فارسی",uk:"Українська"};
const uebersetzungsSprachen = ["en","ar","tr","fa","uk"];
const rtlSprachen = new Set(["ar","fa"]);
// Vollständig übersetzte Sprachen; nur für sie verlangt die Prüfung jeden Eintrag.
const vollstaendigeSprachen = ["en","ar","tr","fa","uk"];
// Wird von uebersetzung-<code>.js befüllt: deutscher Text → Übersetzung.
const uebersetzungen = {};
// Fachbegriffe bleiben Deutsch und erscheinen als „Übersetzung (Begriff)“ bei der ersten Nennung je Abschnitt.
// Reihenfolge der Werte wie uebersetzungsSprachen.
const glossar = {
  "Variable":["variable","متغيّر","değişken","متغیر","змінна"],
  "Datentyp":["data type","نوع البيانات","veri türü","نوع داده","тип даних"],
  "Zeichenkette":["string","سلسلة نصية","karakter dizisi","رشته","текстовий рядок"],
  "Ganzzahl":["integer","عدد صحيح","tam sayı","عدد صحیح","ціле число"],
  "Gleitkommazahl":["floating-point number","عدد عشري","ondalıklı sayı","عدد اعشاری","число з рухомою комою"],
  "Wahrheitswert":["Boolean value","قيمة منطقية","mantıksal değer","مقدار منطقی","логічне значення"],
  "Ausdruck":["expression","تعبير","ifade","عبارت","вираз"],
  "Kommentar":["comment","تعليق","yorum","کامنت","коментар"],
  "Einrückung":["indentation","إزاحة","girinti","تورفتگی","відступ"],
  "Ausgabe":["output","مخرجات","çıktı","خروجی","вивід"],
  "Eingabe":["input","إدخال","girdi","ورودی","введення"],
  "Bedingung":["condition","شرط","koşul","شرط","умова"],
  "Verzweigung":["branch","تفرّع","dallanma","انشعاب","розгалуження"],
  "Schleife":["loop","حلقة","döngü","حلقه","цикл"],
  "Vergleich":["comparison","مقارنة","karşılaştırma","مقایسه","порівняння"],
  "Liste":["list","قائمة","liste","لیست","список"],
  "Tupel":["tuple","صفّ","demet","تاپل","кортеж"],
  "Schlüssel":["key","مفتاح","anahtar","کلید","ключ"],
  "Funktion":["function","دالة","fonksiyon","تابع","функція"],
  "Parameter":["parameter","معامل","parametre","پارامتر","параметр"],
  "Rückgabewert":["return value","القيمة المُعادة","dönüş değeri","مقدار بازگشتی","значення, що повертається"],
  "Klasse":["class","صنف","sınıf","کلاس","клас"],
  "Objekt":["object","كائن","nesne","شیء","об’єкт"],
  "Methode":["method","دالة تابعة","metot","متد","метод"],
  "Attribut":["attribute","خاصية","öznitelik","ویژگی","атрибут"],
  "Datei":["file","ملف","dosya","فایل","файл"],
  "Pfad":["path","مسار","yol","مسیر","шлях"],
  "Arbeitsordner":["working directory","مجلد العمل","çalışma klasörü","پوشهٔ کاری","робоча тека"],
  "Paket":["package","حزمة","paket","بسته","пакет"],
  "Virtuelle Umgebung":["virtual environment","بيئة افتراضية","sanal ortam","محیط مجازی","віртуальне середовище"],
  "Fehlermeldung":["error message","رسالة الخطأ","hata mesajı","پیام خطا","повідомлення про помилку"],
  "Spalte":["column","عمود","sütun","ستون","стовпець"],
  "Zeile":["line","سطر","satır","خط","рядок"],
  "Kopfzeile":["header row","سطر العناوين","başlık satırı","سطر سرعنوان","рядок заголовків"],
  "Trennzeichen":["separator","فاصل","ayırıcı","جداکننده","роздільник"],
  "Messwert":["measured value","قيمة القياس","ölçüm değeri","مقدار اندازه‌گیری","виміряне значення"],
  "Ausreißer":["outlier","قيمة شاذة","aykırı değer","دادهٔ پرت","викид"],
  "Fehlwert":["missing value","قيمة مفقودة","eksik değer","مقدار گم‌شده","пропущене значення"],
  "Bereinigung":["data cleaning","تنظيف البيانات","veri temizleme","پاک‌سازی داده","очищення даних"],
  "Mittelwert":["mean","المتوسط","ortalama","میانگین","середнє значення"],
  "Median":["median","الوسيط","medyan","میانه","медіана"],
  "Standardabweichung":["standard deviation","الانحراف المعياري","standart sapma","انحراف معیار","стандартне відхилення"],
  "Maske":["mask","قناع","maske","ماسک","маска"],
  "Diagramm":["chart","مخطط","grafik","نمودار","діаграма"],
  "Achse":["axis","محور","eksen","محور","вісь"],
  "Zeitreihe":["time series","سلسلة زمنية","zaman serisi","سری زمانی","часовий ряд"],
  "Abtastrate":["sampling rate","معدل أخذ العينات","örnekleme hızı","نرخ نمونه‌برداری","частота дискретизації"],
  "Frequenz":["frequency","تردد","frekans","بسامد","частота"]
};
// Lehnwörter bleiben in allen Sprachen unverändert in lateinischer Schrift und ohne Klammer.
const lehnwoerter = ["Array","DataFrame","Index","Dictionary","Slice","Boxplot","Histogramm","Terminal","Editor","Interpreter","Modul","Import"];
