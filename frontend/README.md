# AI Tracker — Frontend

Single-page dashboard for local/private AI coding models (India-focused pricing, Q4 VRAM, hardware tiers).
Built with **Vite + React 19 + Tailwind 3 + Recharts**, data baked into `src/data.json` (~267 models).

Live site: https://sachindeepcleaning-coder.github.io/ai-tracker/

## Stack

| Layer | Choice |
|-------|--------|
| Build | Vite 8 (`@vitejs/plugin-react`) |
| UI | React 19, Tailwind 3, Lucide icons |
| Charts | Recharts 3 |
| Data | Static `src/data.json` (ranks 1-267, single source of truth = `coding_benchmarks_july2026_final.csv`, regenerated via `npm run data`) |
| Lint | Oxlint |
| Tests | Vitest 3 + jsdom (`src/**/__tests__/`, `src/App.test.jsx`, `src/data.test.js`) |
| Fonts | Self-hosted Inter + JetBrains Mono (woff2 in `src/assets/fonts/`) |

## Layout

```
src/
  main.jsx                 entry (imports index.css)
  App.jsx                  tab orchestrator + KPI strip + footer
  data.json                model catalog
  index.css                Tailwind + @font-face + shared .card/.badge/.btn styles
  lib/
    parse.js               parsePct / parseQ4 / INR_PER_USD / formatting
    license.js             isOpenWeight / licenseBadge heuristics
    hardware.js            hardwareTiers + fitsModel (Q4 fit heuristic)
  hooks/
    useModels.js           filter/sort pipeline, stats, leaderboards, HW matrix rows
  components/
    Header.jsx             sticky header + section tabs
    Explorer.jsx           search/filters/compare bar + full card grid (all 267 at once, no pagination)
    Leaderboards.jsx       11 benchmark boards (coding + reasoning/math) + top-12 charts
    HardwareFit.jsx        Q4 fit matrix (open-weight only) + tier cards
    CostCalc.jsx           API vs local cost calculator (prices resolved by model name from data.json)
    Compare.jsx            up to 4-model charts + side-by-side table
    Tracker.jsx            Sep 2026 release tracker + frontier tightness
    DetailModal.jsx        accessible dialog (focus trap, Esc, aria-modal, compare toggle)
    ErrorBoundary.jsx      crash guard around tab content
  scripts/
    regen-data.mjs         CSV -> data.json regeneration (preserves curated released/is_free)
```

## Develop

```bash
npm install
npm run dev        # local dev server
npm run lint       # oxlint
npm run test       # vitest (parse/hardware/useModels/CostCalc/App shell/data integrity)
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run data       # regenerate src/data.json from the CSV (after CSV edits)
```

Secondary tabs (Leaderboards, HardwareFit, CostCalc, Compare, Tracker) are **code-split** via `React.lazy` + `Suspense` — recharts stays off the first-paint critical path. The CI deploy workflow (`.github/workflows/deploy.yml`) runs lint + tests + build on every push to `master`.

## Deploy to GitHub Pages (project site)

The site is served from a **project sub-path** `/ai-tracker/`, so Vite must build with that base:

```js
// vite.config.js
export default defineConfig({
  base: '/ai-tracker/',  // <-- required for project pages
  plugins: [react()],
})
```

The favicon and any `/`-rooted asset in `index.html` must use `%BASE_URL%` (e.g. `href="%BASE_URL%favicon.svg"`) so they resolve under `/ai-tracker/` after the build.

### Option A — GitHub Actions (recommended)

The workflow at `.github/workflows/deploy.yml` (repo root) builds `frontend/dist` and publishes it via the **GitHub Pages "GitHub Actions" source mode** (environment `github-pages`) on every push to `master`:

```bash
# push to master; lint -> test -> build -> deploy runs automatically
```

Then enable **Settings → Pages → Source: GitHub Actions**.

### Option B — Manual

```bash
cd frontend
npm ci
npm run build
# publish the built site from the gh-pages branch:
git subtree push --prefix frontend/dist origin gh-pages
# or copy dist/* to a gh-pages branch and push
```

> Keep `base` in sync: if you ever move to a user site (`https://<user>.github.io/`) or a custom domain, switch `base` to `/` or the absolute URL accordingly.

## Updating the catalog

1. Edit `coding_benchmarks_july2026_final.csv` (repo root), then run `npm run data` — this regenerates `src/data.json` using the canonical column mapping and **preserves curated `released` / `is_free`** from the existing data.json (matched by rank id).
2. Keep the `rank-<n>` id scheme — `CostCalc` resolves sample prices by **model name** (with normalized/fuzzy fallback), so re-ranks are safe.
3. If a cost sample references a new model, add `{ model: '<exact catalog name>' }` to `COST_SAMPLES` in `components/CostCalc.jsx`.
4. Run `npm run test && npm run lint && npm run build` — the data integrity tests catch string prices, rank gaps, and missing ids before deploy.

## Notes

- No router, no TypeScript — one page, tabbed. Split is per-tab components + shared lib/hook helpers. JSDoc `Model` typedef in `hooks/useModels.js` documents the row shape.
- All benchmark scores are vendor-reported unless marked `AA` / `Scale` / `BenchLM`; figures are planning estimates, not vendor quotes.
- Currency assumption: 1 USD = ₹95.12 (standardized Aug 14, 2026).
- Vitest note: components rendered in tests carry `import React from 'react'` (vitest classic-JSX path); the Vite build uses the automatic runtime either way.
