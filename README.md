# Livora — kalkulator kosztu remontu

Orientacyjna wycena i czas realizacji remontu mieszkania na polskim rynku.

Wielokrokowy kalkulator: metraż, liczba pokoi i łazienek, rodzaj remontu, standard materiałów i prace dodatkowe. Na końcu użytkownik widzi przedział ceny w złotych, szacowany czas oraz może wysłać zapytanie o dokładną wycenę.

## Stack

- React 19 + TypeScript
- TanStack Start / Router
- Vite 8 + Nitro (preset Vercel)
- Tailwind CSS v4
- Zustand
- Web3Forms (formularz wyceny)

## Local development

```bash
npm install
cp .env.example .env
# wklej VITE_WEB3FORMS_ACCESS_KEY do .env
npm run dev
```

Aplikacja startuje na porcie 8080.

```bash
npm run typecheck
npm run build
```

## Deploy na Vercel

1. Import repozytorium `livora-renovation-calculator`.
2. Framework preset: **Other** (`vercel.json` ustawia `framework: null`).
3. Build command: `npm run build`.
4. W **Settings → Environment Variables** dodaj:

| Name | Value | Environments |
| --- | --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | klucz z [web3forms.com](https://web3forms.com) | Production, Preview, Development |
| `VITE_AUTH_ENABLED` | `false` | Production, Preview, Development |

Nie commituj pliku `.env` ani samego klucza.

Po deployu przetestuj ścieżkę: kalkulator → wynik → **Poproś o dokładną wycenę**.
