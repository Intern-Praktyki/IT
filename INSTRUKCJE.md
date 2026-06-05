# Instrukcje — strona Ola Apokalipsa

---

## Dla Oli — jak uzupełnić treści

Otwórz jeden plik: **`src/concepts/Concept1.jsx`**

Wszystko co zmieniasz jest na górze pliku, w sekcji `SERVICES` i dalej w `Page`.

---

### 1. Oferty (karty z usługami)

Znajdź blok `const SERVICES` (okolice linii 6). Wypełnij dla każdej oferty:

```js
{
  num: '01',
  name: 'Twoja nazwa usługi',        // duży tekst na karcie
  sub: 'Podtytuł · czas trwania',    // mały tekst nad nazwą, np. "Tarot · 60 min"
  price: 'od 280 zł',                // cena
},
```

---

### 2. Tagline nad imieniem (hero)

Szukaj tekstu `Tarot · Astrologia · Warszawa` — zmień na swoje, np.:
```
Tarot · Astrologia · online i Warszawa
```

---

### 3. Nagłówek sekcji "O mnie"

Szukaj:
```
Twój nagłówek
sekcji O mnie.
```
Zamień na jedną krótką myśl o sobie.

---

### 4. Bio (akapit pod nagłówkiem)

Szukaj:
```
[Twój bio — parę zdań o sobie, skąd to, jak pracujesz, dla kogo jesteś.]
```
Napisz 3–5 zdań własnymi słowami. Dobrze działa też napisanie **dla kogo NIE jesteś** — odsiewa złych klientów.

---

### 5. E-mail

Szukaj dwóch miejsc z `hello@olaapokalipsa.com` — zamień na swój prawdziwy adres.

---

### 6. Linki social media

Szukaj:
```js
{['Instagram', 'LinkedIn'].map(...)
```
Zmień `href="#"` na swoje prawdziwe linki, np.:
```js
{ label: 'Instagram', href: 'https://instagram.com/twojnick' },
{ label: 'TikTok',    href: 'https://tiktok.com/@twojnick' },
```

---

### 7. Formularz kontaktowy — Formspree (bezpłatny, do 50 wiad./mies.)

1. Wejdź na **[formspree.io](https://formspree.io)** i załóż konto (darmowe)
2. Utwórz nowy formularz → dostaniesz link w stylu `https://formspree.io/f/xabcd123`
3. W pliku `Concept1.jsx` znajdź:
   ```
   action="https://formspree.io/f/TWOJ_ID"
   ```
   Zamień `TWOJ_ID` na swoje ID z Formspree.

Wiadomości z formularza będą wpadać prosto na Twój e-mail. Nic więcej nie trzeba konfigurować.

---

---

## Dla dewelopera — jak wrzucić na serwer

### GitHub Pages (aktualna konfiguracja)

Strona jest skonfigurowana pod GitHub Pages. Po każdym pushu na gałąź `claude/gifted-thompson-qOWd1` lub `main` GitHub Actions automatycznie buduje i wdraża stronę.

**Jednorazowe ustawienie (tylko za pierwszym razem):**

1. Wejdź w repo na GitHubie → **Settings → Pages**
2. W sekcji **Build and deployment** ustaw **Source: GitHub Actions**
3. Zapisz — gotowe.

Strona będzie dostępna pod:
```
https://intern-praktyki.github.io/it/
```

---

### Własna domena (opcjonalnie)

Jeśli Ola ma domenę (np. `olaapokalipsa.pl`):

1. W repo → **Settings → Pages → Custom domain** — wpisz domenę
2. U rejestratora domeny dodaj rekord DNS:
   ```
   CNAME  www  intern-praktyki.github.io
   ```
   lub dla domeny głównej (apex) cztery rekordy A:
   ```
   A  @  185.199.108.153
   A  @  185.199.109.153
   A  @  185.199.110.153
   A  @  185.199.111.153
   ```
3. Zmień `base` w `vite.config.js` z `/it/` na `/`:
   ```js
   base: '/',
   ```
4. Zrób commit i push — Pages samo wystawi certyfikat HTTPS.

---

### Lokalny podgląd przed pushem

```bash
npm install        # tylko za pierwszym razem
npm run dev        # podgląd na http://localhost:5173
npm run build      # sprawdź czy build przechodzi
```

---

### Workflow zmian treści (typowy scenariusz)

1. Ola przesyła Ci poprawione teksty (np. przez maila)
2. Otwierasz `src/concepts/Concept1.jsx`, wklejasz zmiany
3. `npm run build` — sprawdzasz czy działa
4. `git add src/concepts/Concept1.jsx && git commit -m "Aktualizacja treści" && git push`
5. GitHub Actions sam deployuje — po ~2 min strona gotowa

---

### Alternatywa dla Formspree — własny backend

Jeśli wolisz nie używać zewnętrznego serwisu, formularz jest gotowy do podpięcia pod dowolne API. W `Concept1.jsx` funkcja `handleSubmit` robi zwykłe `fetch POST` z `FormData`. Wystarczy zmienić `action=` na URL własnego endpointu.
