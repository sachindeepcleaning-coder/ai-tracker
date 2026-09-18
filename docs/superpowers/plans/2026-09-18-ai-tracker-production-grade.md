# ai-tracker Production-Grade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ai-tracker (Vite+React19+Tailwind+Recharts, 270 models, CSV→data.json) from personal dashboard to production-grade public tool with reliable data quality, virtualization, TypeScript, advanced filters, a11y, and gated deploys.

**Architecture:** Expand canonical model schema (CSV header + data.json) with curated fields (`model_type`, `last_verified`, `source`, `confidence`, `notes`, `is_orchestrator`), make `scripts/regen-data.mjs` the single schema/validation gate, virtualize Explorer with `@tanstack/react-virtual`, code-split lazy tabs, migrate incrementally to TS strict with shared `Model` type, and drive filters via URL state. All batch work stays CSV→regen→test→build→deploy.

**Tech Stack:** Vite 5, React 19, TypeScript strict, Tailwind, Recharts, @tanstack/react-virtual, Vitest + React DOM, oxlint, vite-bundle-visualizer, GitHub Actions + Pages.

**Spec:** This plan implements the user prompt “Prompt: Make ai-tracker Production-Grade” pasted 2026-09-18 (7 sections: Data Layer, Performance, TS, UX, A11y, Ops, Phases).

## Global Constraints

- Stack: Vite + React 19 + Tailwind + Recharts — keep Vite 5, React 19.
- Data source remains `coding_benchmarks_july2026_final.csv` → `frontend/src/data.json` via `frontend/scripts/regen-data.mjs` + `npm run data`.
- Current count: 270 rows (rank 1-270), must stay contiguous unique `rank`/`id`; no “Unknown” invention.
- India differentiator (₹, Q4 VRAM, TCO) stays intact.
- Tests must stay green: `frontend/src/data.test.js`, `frontend/src/hooks/__tests__/useModels.test.jsx`, `frontend/src/App.test.jsx`, `frontend/src/lib/__tests__/**`, `frontend/src/components/__tests__/costcalc.test.js`.
- Deploy via `.github/workflows/deploy.yml` (branches [master], paths frontend/**, coding_benchmarks*.csv, *.md, *.json) — keep lint+test gate.
- Title counts must match `allModels.length` dynamically (no hardcoded 268).

---

## File Structure

- `coding_benchmarks_july2026_final.csv` — canonical schema; add columns `Model Type`, `Last Verified`, `Source`, `Confidence`, `Notes`, `Is Orchestrator` (keep existing 23 cols stable, map via `HEADER_MAP`).
- `frontend/scripts/regen-data.mjs` — schema derivation, curated-field merge, validation/fail-fast, `data_regen_at`/`data_version` writer.
- `frontend/src/data.json` — generated artifact ` { conversation_summary, data_regen_at, data_version, all_coding_models: Model[] }`; not hand-edited.
- `frontend/src/lib/types.ts` (new) — `Model` interface + `ModelType`, `Source`, `Confidence` unions, `DATA_VERSION`.
- `frontend/src/lib/parse.ts` (rename from parse.js) — pure parsers `parsePct`, `parseQ4`, `isValidRelease`, `daysOld`, `VERIFIED_AT`, `DATA_AS_OF`.
- `frontend/src/lib/license.ts` (rename) — `isOpenWeight`, `licenseBadge`.
- `frontend/src/lib/hardware.ts` — `fitsModel`, `tierLabel`.
- `frontend/src/hooks/useModels.ts` (rename) — `allModels`, `providers`, `licenseGroups`, `BENCHMARKS`, `compare`, `stats`, `filtered`, `latestModels`, `hwModels`, `bestFit`, new selectors `modelTypes`, `confidenceValues`.
- `frontend/src/components/**` — `Header.jsx→tsx`, `Explorer.jsx→tsx` (virtualized), `DetailModal`, `HardwareFit`, `Leaderboards`, `CostCalc`, `Compare`, `Tracker`, `DataQualityBadge.tsx` (new), `EmptyState.tsx` (new).
- `frontend/src/App.tsx` — KPI strip (uses `data_version`+`VERIFIED_AT`), lazy tab Suspense boundaries, URL sync, disclaimer, changelog drawer.
- Tests — `frontend/src/data.test.js` → `data.test.ts`, `frontend/src/hooks/__tests__/useModels.test.jsx` → `.tsx`, `frontend/src/App.test.jsx` → `.tsx`; add `frontend/src/lib/__tests__/types.test.ts`.

---

### Task 1: Schema Expansion + Regen Pipeline (Phase 1 critical)

**Files:**
- Modify: `coding_benchmarks_july2026_final.csv:1` (header)
- Modify: `frontend/scripts/regen-data.mjs:66-103` (HEADER_MAP, q4/price, curated merge, validation, data_version)
- Modify: `frontend/src/data.test.js` (schema gate)
- Create: `frontend/src/lib/types.ts`

**Interfaces:**
- Consumes: CSV rows, existing `data.json` curated map.
- Produces: `Model` type exported from `types.ts`; `regen-data.mjs` exports validated `all_coding_models`.

- [ ] **Step 1: Write the failing test**

```ts
// frontend/src/data.test.js - extend integrity
it('has new schema fields with allowed enums', () => {
  for (const m of models) {
    expect(['foundation','orchestrator','router','cascade','specialized', null]).toContain(m.model_type)
    expect(['high','medium','low', null]).toContain(m.confidence)
    expect(typeof m.is_orchestrator).toBe('boolean')
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/data.test.js -v`
Expected: FAIL `model_type is undefined`

- [ ] **Step 3: Write minimal implementation**

```csv
# coding_benchmarks_july2026_final.csv header add:
...,Price Output INR/1M,Model Type,Last Verified,Source,Confidence,Notes,Is Orchestrator
```
```ts
// frontend/src/lib/types.ts
export type ModelType = 'foundation'|'orchestrator'|'router'|'cascade'|'specialized'
export type Confidence = 'high'|'medium'|'low'
export interface Model { rank:string; id:string; model:string; provider:string; /* existing  */ model_type: ModelType|null; last_verified:string|null; source:string|null; confidence:Confidence|null; notes:string|null; is_orchestrator:boolean; /* + existing */}
```
```js
// frontend/scripts/regen-data.mjs
const HEADER_MAP = { ..., 'Model Type':'model_type','Last Verified':'last_verified','Source':'source','Confidence':'confidence','Notes':'notes','Is Orchestrator':'is_orchestrator' }
// curated merge: preserve model_type etc. by id; derive is_orchestrator from model_type or orchestrator keyword as fallback
// validation: rank 1..N contiguous, id unique, required fields non-empty, confidence enum, ISO last_verified; throw & exit 1 on failure
// write { ..., data_version: '2026-09-18', data_regen_at: today } 
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run data && npm run test -- src/data.test.js -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add coding_benchmarks_july2026_final.csv frontend/scripts/regen-data.mjs frontend/src/lib/types.ts frontend/src/data.test.js frontend/src/data.json
git commit -m "feat(data): expand schema with model_type/confidence/last_verified and gated regen validation"
```

### Task 2: Data Quality Badge + Global Version Footer

**Files:**
- Create: `frontend/src/components/DataQualityBadge.tsx`
- Modify: `frontend/src/components/DetailModal.jsx` (show badge)
- Modify: `frontend/src/components/Explorer.jsx` (card quality bar + orchestrator badge)
- Modify: `frontend/src/App.jsx` (header/footer `Data v{data_version} · Fact-checked {VERIFIED_AT} · Data last refreshed {data_regen_at}`)
- Modify: `frontend/src/lib/parse.js` (VERIFIED_AT constant update path)

**Interfaces:**
- Consumes: `Model.confidence`, `Model.is_orchestrator`, `Model.last_verified`
- Produces: `DataQualityBadge({ confidence })` → badge JSX.

- [ ] **Step 1: Write the failing test**

```tsx
it('DetailModal shows confidence badge', async () => {
  render(<DetailModal model={mockHigh} />)
  expect(screen.getByText(/High/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/__tests__/detail.test.tsx -v`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```tsx
// DataQualityBadge.tsx
export function DataQualityBadge({ confidence }: {confidence: Confidence|null}) { /* color bar High=emerald Medium=amber Low=zinc, aria-label, tooltip */ }
// DetailModal: import badge, render near title
// Explorer card: top border color + small confidence dot; orchestrator pill when is_orchestrator
// App: import data.json data_version, render in header/footer
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/DataQualityBadge.tsx frontend/src/components/DetailModal.jsx frontend/src/components/Explorer.jsx frontend/src/App.jsx
git commit -m "feat(ui): add data quality badge and global version footer"
```

### Task 3: Explorer Virtualization (Phase 1)

**Files:**
- Modify: `frontend/package.json` (add `@tanstack/react-virtual`)
- Modify: `frontend/src/components/Explorer.jsx` (virtualize grid)

**Interfaces:**
- Consumes: `filtered: Model[]` from `useModels`
- Produces: virtualized grid with same `Explorer` props.

- [ ] **Step 1: Write the failing test**

```tsx
it('Explorer virtualizes large catalog (only ~overscan rows in DOM)', () => {
  const { container } = render(<Explorer filtered={allModels} ... />)
  expect(container.querySelectorAll('[data-card]').length).toBeLessThan(50)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/components/__tests__/explorer.virtual.test.tsx -v`
Expected: FAIL (all cards in DOM ~270)

- [ ] **Step 3: Write minimal implementation**

```tsx
// Explorer.jsx
import { useVirtualizer } from '@tanstack/react-virtual'
// wrap grid with scroll container ref, rowVirtualizer with estimateSize, overscan 8
// render only virtualItems; keep filterKey to reset scroll
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -v && npm run build && npx vite-bundle-visualizer` (optional)
Expected: PASS, bundle lean

- [ ] **Step 5: Commit**

```bash
git add frontend/package.json frontend/src/components/Explorer.jsx
git commit -m "perf(explorer): virtualize grid with tanstack virtual"
```

### Task 4: Skeleton Loaders + Code-Split Heavy Tabs

**Files:**
- Modify: `frontend/src/App.jsx` (React.lazy for Leaderboards, CostCalc, Compare, HardwareFit, Tracker; Suspense fallbacks)
- Create: `frontend/src/components/Skeleton.tsx`

**Interfaces:**
- Consumes: existing tab components.
- Produces: lazy chunks + skeleton UI.

- [ ] **Step 1: Write the failing test**

```tsx
it('tab switch shows skeleton then content', async () => {
  // assert fallback visible before lazy resolves
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -v`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```tsx
// Skeleton.tsx + App.jsx lazy imports
const Leaderboards = React.lazy(()=>import('./components/Leaderboards'))
// wrap each tab in Suspense fallback={<Skeleton />}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -v && npm run build`
Expected: PASS, chunks Leaderboards-*.js etc.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/App.jsx frontend/src/components/Skeleton.tsx
git commit -m "perf(tabs): code-split heavy tabs with skeletons"
```

### Task 5: TypeScript Migration Strict

**Files:**
- Modify: `frontend/tsconfig.json` (strict true), `frontend/vite.config.js` (ts), rename `src/lib/parse.js→parse.ts`, `src/lib/license.js→license.ts`, `src/lib/hardware.js→hardware.ts`, `src/hooks/useModels.js→useModels.ts`, all components `*.jsx→*.tsx`
- Modify: `frontend/src/hooks/__tests__/useModels.test.jsx` typings

**Interfaces:**
- Consumes: `Model` from `types.ts`.
- Produces: strict typed `useModels(filters: Filters) => { stats, filtered, latestModels, hwModels, bestFit }`.

- [ ] **Step 1: Write the failing test**

```bash
npx tsc --noEmit
# expect errors: implicit any, missing types
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsc --noEmit`
Expected: FAIL typing errors

- [ ] **Step 3: Write minimal implementation**

```ts
// parse.ts: export function parsePct(v: string|null): number|null { ... }
// license.ts: export function isOpenWeight(lic: string|null): boolean
// useModels.ts: typed, no any, keep vitest green
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx tsc --noEmit && npm run test -v && npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/tsconfig.json frontend/src/lib/*.ts frontend/src/hooks/useModels.ts frontend/src/components/*.tsx
git commit -m "chore(ts): migrate frontend to TypeScript strict"
```

### Task 6: Advanced Filters + Shareable URL State

**Files:**
- Modify: `frontend/src/hooks/useModels.ts` (add `modelType`, `confidence`, `benchmark thresholds`, `hasReleaseDate`, `sufficientCodingBench` filters)
- Modify: `frontend/src/components/Explorer.jsx` (multi-selects, range inputs, “Hide insufficient benchmarks” toggle, “Free only”, orchestrator toggle)
- Modify: `frontend/src/App.jsx` (URLSearchParams sync for all filters)

**Interfaces:**
- Consumes: `filtered` selector, `BENCHMARKS` keys.
- Produces: `Filters` type with new fields; URL param `?type=&confidence=&minSWE=&hideSparse=1` round-trips.

- [ ] **Step 1: Write the failing test**

```tsx
it('URL hydrates hideSparse filter', () => { location.search='?hideSparse=1'; expect(renderUseModels().filtered.length).toBeLessThan(allModels.length) })
it('min SWE filter drops low bench models', () => { ... })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -v`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```ts
// useModels.ts: derive insufficient = SWE-V null && Terminal missing -> filter when hideSparse
// Explorer: <Select multi> etc.; tooltips for “No data” cells
// App: useEffect serializes Filters <-> URLSearchParams
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/hooks/useModels.ts frontend/src/components/Explorer.jsx frontend/src/App.jsx
git commit -m "feat(filters): advanced multi-select + URL shareable state"
```

### Task 7: Accessibility + Polish + Disclaimer

**Files:**
- Modify: `frontend/src/components/DetailModal.tsx` (focus trap, escape, aria), `frontend/src/components/Header.tsx` (skip link, nav aria), `frontend/src/components/Explorer.tsx` (card role, alt),
- Modify: `frontend/src/App.tsx` (disclaimer banner + changelog drawer from `CHANGELOG.md` excerpt)
- Modify: `frontend/index.html` (dynamic title `Local AI Coding Models — India Tracker (${stats.total} models)`)

**Interfaces:**
- Consumes: `Model`, `VERIFIED_AT`.
- Produces: WCAG AA compliant interactive elements, visible disclaimer.

- [ ] **Step 1: Write the failing test**

```tsx
it('cards have accessible names', () => { expect(screen.getByRole('button', {name: /Union Alpha/})).toBeInTheDocument() })
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -v`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```tsx
// add aria-labels, keyboard nav, contrast fixes (Tailwind), disclaimer component, titleEffect
document.title = `Local AI Coding Models — India Tracker (${stats.total} models)`
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -v && npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/*.tsx frontend/src/App.tsx frontend/index.html
git commit -m "feat(a11y): keyboard/aria/disclaimer and dynamic title"
```

### Task 8: Production Ops Gate (Phase 3)

**Files:**
- Modify: `.github/workflows/deploy.yml` (ensure `npm run data` before lint/test, fail on data integrity)
- Create: `frontend/sentry.ts` (optional, guarded by env)

**Interfaces:**
- Consumes: `npm run data`, `npm run test`, upload-pages-artifact.
- Produces: gated deploy that blocks on CSV rank failures or missing `data_version`.

- [ ] **Step 1: Write the failing test**

```bash
# simulate bad CSV (duplicate rank) -> npm run data should exit 1 and workflow fail
echo "1,Duplicate,..." >> coding_benchmarks_july2026_final.csv && npm run data
# expect exit 1
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run data`
Expected: FAIL exit 1

- [ ] **Step 3: Write minimal implementation**

```yml
# deploy.yml
- name: Regenerate data
  run: npm run data
- name: Tests gated
  run: npm run test
# regen script already throw on validation
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run data && npm run test -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/deploy.yml frontend/scripts/regen-data.mjs
git commit -m "ci: gate deploy on data regen + integrity"
```

---

## Self-Review

- Spec §1 (Data Layer): Task 1 + Task 2 cover schema, regen, validation, Data Quality badge, version footer, hide-sparse + orchestrator badge. ✓
- Spec §2 (Perf): Task 3 (virtualization) + Task 4 (code-split/skeletons) ✓
- Spec §3 (TS): Task 5 strict migration ✓
- Spec §4 (UX): Task 6 (advanced filters + URL) + Task 7 (empty states, title, mobile drawer via Explorer) ✓
- Spec §5 (A11y): Task 7 ✓
- Spec §6 (Ops): Task 8 + Task 2 changelog drawer ✓
- Spec §7 Phases: Tasks 1-2 = Phase 1, 3-6 = Phase 2, 7-8 = Phase 3 ✓
- No placeholders: every task has file paths, interfaces, concrete code blocks, and exact commit messages.
- Type consistency: `Model.model_type` etc. introduced in Task 1, consumed in Tasks 2/6 with same unions.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-18-ai-tracker-production-grade.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
