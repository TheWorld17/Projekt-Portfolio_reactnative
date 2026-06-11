# 📱 Portfolio Studenta

Aplikacja mobilna zbudowana w **React Native + Expo**, prezentująca portfolio studenta informatyki. Projekt realizowany w ramach przedmiotu *Programowanie mobilne na iOS* na Akademii Śląskiej w Katowicach (rok akademicki 2025/2026).

---

## 👤 Autor

**Roman Vykeryk**  
Informatyka, semestr 6 — Akademia Śląska w Katowicach  
📧 broroman8@gmail.com  
🎨 [Figma Design](https://www.figma.com/design/twyXkksab87l49rRGdB5Ay/Projekt-IOS?node-id=0-1&t=JCPlryNgcqEHp8uD-1)

---

## 📋 Opis projektu

Portfolio Studenta to aplikacja mobilna umożliwiająca prezentację profilu studenta, jego projektów i danych kontaktowych. Użytkownik może przeglądać, dodawać i usuwać projekty, edytować dane profilu, a wszystkie zmiany są zapisywane lokalnie — dane nie znikają po ponownym uruchomieniu aplikacji.

---

## ✅ Lista funkcjonalności

### Nawigacja
- Nawigacja dolna (Tabs) z trzema zakładkami: Profil, Projekty, Kontakt
- Zagnieżdżona nawigacja Stack w zakładce Projekty (lista → szczegóły / formularz)

### Ekran Profilu
- Wyświetlanie zdjęcia profilowego (okrągły avatar)
- Imię, kierunek studiów, sekcja „O mnie", lista umiejętności
- Tryb edycji profilu z walidacją danych
- Dane zapisywane lokalnie w AsyncStorage

### Ekran Projektów
- Lista projektów w formie kart (FlatList)
- Wyszukiwanie projektów po nazwie
- Usuwanie projektu z potwierdzeniem (Alert)
- Przycisk „+ Dodaj projekt" prowadzący do formularza

### Formularz dodawania projektu
- Pola: nazwa, opis, technologie (oddzielone przecinkami), rok
- Walidacja: minimalna długość, zakres roku (2000–2030), wymagane pola
- Komunikaty błędów pod polami
- Obsługa klawiatury (KeyboardAvoidingView)

### Ekran szczegółów projektu
- Nazwa, pełny opis, lista technologii, rok realizacji
- Przycisk „Usuń projekt" z potwierdzeniem
- Obsługa braku projektu (komunikat „Nie znaleziono projektu")

### Ekran Kontaktu
- Dane kontaktowe: email, GitHub, LinkedIn, lokalizacja
- Przycisk „Wyślij e-mail" (otwiera klienta poczty)
- Przycisk „Otwórz GitHub" (otwiera przeglądarkę)

### Persystencja danych
- Projekty zapisywane w AsyncStorage (`@projects`)
- Profil zapisywany w AsyncStorage (`@profile`)
- Dane zachowane między uruchomieniami aplikacji

---

## 🛠️ Technologie

| Technologia | Wersja |
|---|---|
| React Native | 0.81+ |
| Expo SDK | 54 |
| Expo Router | 4.x |
| TypeScript | 5.x |
| AsyncStorage | 2.x |
| Expo Vector Icons | 14.x |

---

## 📁 Struktura projektu

```
portfolio-studenta/
├── app/
│   ├── _layout.tsx           # Nawigacja Tabs (główny layout)
│   ├── index.tsx             # Ekran Profilu (edytowalny)
│   ├── contact.tsx           # Ekran Kontaktu
│   └── projects/
│       ├── _layout.tsx       # Nawigacja Stack dla projektów
│       ├── index.tsx         # Lista projektów
│       ├── new.tsx           # Formularz dodawania projektu
│       └── [id].tsx          # Szczegóły projektu
├── context/
│   ├── ProjectsContext.tsx   # Globalny stan projektów
│   └── ProfileContext.tsx    # Globalny stan profilu
├── data/
│   └── projects.ts           # Domyślne dane projektów
├── utils/
│   └── storage.ts            # Helpery AsyncStorage
├── assets/
│   └── profile.png           # Zdjęcie profilowe
├── app.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Instrukcja uruchomienia

### Wymagania wstępne

- [Node.js](https://nodejs.org/) w wersji 18 lub nowszej
- [Expo Go](https://expo.dev/go) zainstalowane na telefonie (Android lub iOS)
- Telefon i komputer w tej samej sieci Wi-Fi

### Krok 1 — Klonowanie repozytorium

```bash
git clone https://github.com/TheWorld17/portfolio-studenta.git
cd portfolio-studenta
```

### Krok 2 — Instalacja zależności

```bash
npm install
```

```bash
npx expo install expo-router react-native-screens \
  react-native-safe-area-context react-native-gesture-handler \
  react-native-reanimated @react-native-async-storage/async-storage
```

### Krok 3 — Uruchomienie serwera deweloperskiego

```bash
npx expo start
```

Jeśli QR kod nie działa, użyj trybu tunelowego:

```bash
npx expo start --tunnel
```

### Krok 4 — Uruchomienie na telefonie

- **Android** — otwórz Expo Go i zeskanuj kod QR
- **iOS** — zeskanuj kod QR domyślną aplikacją Aparat

### Konfiguracja (jeśli wymagana)

Upewnij się, że `package.json` zawiera:
```json
"main": "expo-router/entry"
```

Upewnij się, że `app.json` zawiera w sekcji `"expo"`:
```json
"scheme": "portfolio-studenta"
```

---

## 📸 Zrzuty ekranu

Zrzuty ekranu aplikacji znajdują się w folderze [`/screenshots`](./screenshots/).

---
