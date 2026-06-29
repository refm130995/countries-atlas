# Countries Atlas

Explore every country in the world — search by name, filter by region, and drill into a detail view with neighbouring countries. Built with React and TypeScript, powered by the free REST Countries API.

**Live demo:** https://refm130995.github.io/countries-atlas/

![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)

---

## Features

- **Search** countries by name and **filter** by region, combined.
- **Detail view** per country: capital, population, languages, currencies.
- **Clickable borders** — jump straight to a neighbouring country.
- Lazy-loaded flag images, responsive card grid, accessible controls.

## Implementation notes

| Concern | Approach |
|---------|----------|
| Data | Fetched once on mount, then filtered client-side with `useMemo` |
| Border lookup | A `Map<cca3, Country>` gives O(1) neighbour resolution |
| Navigation | Lightweight master/detail via local state (no router needed) |
| Async state | Discriminated union for loading / success / error |

## Project structure

```
src/
├── components/
│   ├── CountryCard.tsx
│   └── CountryDetail.tsx
├── api.ts
├── types.ts
├── App.tsx
└── index.css
```

## Run locally

```bash
npm install
npm run dev
npm run build
```

Deployed to GitHub Pages via GitHub Actions on every push to `main`.
