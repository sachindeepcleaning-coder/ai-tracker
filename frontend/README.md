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
| Data | Static `src/data.json` (ranks 1-267, single source of truth = `coding_benchmarks_july2026_final.csv`) |
| Lint | Oxlint |
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
    Explorer.jsx           search/filters/compare bar + card grid (paged 36)
    Leaderboards.jsx       TB2.1 / SWE-V / LCB leaderboards + charts
    HardwareFit.jsx        Q4 fit matrix + tier cards
    CostCalc.jsx           API vs local cost calculator (prices from data.json)
    Compare.jsx            up to 4-model charts + side-by-side table
    Tracker.jsx            Sep 2026 release tracker + frontier tightness
    DetailModal.jsx        accessible dialog (focus trap, Esc, aria-modal)
    ErrorBoundary.jsx      crash guard around tab content
```

## Develop

```bash
npm install
npm run dev        # local dev server
npm run lint       # oxlint
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

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

A workflow lives at `.github/workflows/deploy.yml` (repo root) and publishes `frontend/dist` to the `gh-pages` branch on push to `master`:

```bash
# push to master; the Pages deploy runs automatically
```

Then enable **Settings → Pages → Deploy from a branch → `gh-pages` / `/(root)`**.

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

1. Regenerate `src/data.json` from `coding_benchmarks_july2026_final.csv` (+ `ai_coding_api_vs_local_summary.json`).
2. Keep the first row's `id` scheme (`rank-<n>`) — `CostCalc` resolves sample prices by these ids.
3. If a cost sample references a new model, add its `rank-<n>` to `COST_SAMPLES` in `components/CostCalc.jsx`.
4. Run `npm run lint && npm run build` and re-verify the live URL.

## Notes

- No router, no TypeScript — one page, tabbed. Split is per-tab components + shared lib/hook helpers.
- All benchmark scores are vendor-reported unless marked `AA` / `Scale` / `BenchLM`; figures are planning estimates, not vendor quotes.
- Currency assumption: 1 USD = ₹95.12 (standardized Aug 14, 2026).
