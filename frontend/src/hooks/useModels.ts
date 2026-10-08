import { useMemo, useSyncExternalStore } from 'react'
import type { Model } from '../lib/types'
import { parsePct, parseQ4, DATA_AS_OF, isValidRelease, setDataAnchor, assertCatalogPayload } from '../lib/parse'
import { isOpenWeight, licenseBadge } from '../lib/license'

/**
 * Catalog payload. data.json (~300KB) is fetched at runtime — dev server and
 * production both serve public/data.json — keeping it out of the main JS
 * bundle (perf: saves ~1.3s mobile TBT vs inlining). Under vitest it is
 * ingested synchronously from a static import (no local server there).
 *
 * Shell-first render: the module NEVER blocks on the network. It fires the
 * fetch at import time and publishes the payload when it lands; the first
 * paint is shell + skeleton, and useModels re-renders with full data on
 * arrival (small commits instead of one blocked boot).
 *
 * Perf marks (T5 measure-first loop): fetch / json-parse / validate / derived
 * timings land in the trace as user-timing measures; read them from a
 * throttled Lighthouse trace, never from dev-machine wall time.
 */
function mark(name: string) { try { performance.mark(name) } catch { /* non-browser/test env */ } }
function measure(name: string, start: string, end: string) { try { performance.measure(name, start, end) } catch { /* missing marks */ } }
export function perfMark(name: string) { mark(name) }
export function perfMeasure(name: string, start: string, end: string) { measure(name, start, end) }

/** Async catalog store. Published state is REPLACED (never mutated), so array
    identity flips [] -> rows on load — exactly what useMemo deps need to
    invalidate. Every existing importer keeps working via live bindings. */
export let allModels: Model[] = []
export let catalogMeta = { model_count: 0, data_as_of: '', data_regen_at: '' }
export let providers: string[] = []
export let licenseGroups: string[] = []
export let modelTypeGroups: string[] = []
export let catalogError: string | null = null

const catalogListeners = new Set<() => void>()
function notifyCatalog() {
  catalogListeners.forEach((l) => { try { l() } catch { /* stale listener */ } })
}
export function subscribeCatalog(fn: () => void): () => void {
  catalogListeners.add(fn)
  return () => { catalogListeners.delete(fn) }
}
/** Snapshot for useSyncExternalStore: the array ref itself (stable until the
    next publish replaces it, satisfying the getSnapshot caching rule). */
export function getCatalogSnapshot(): Model[] { return allModels }

/** Short license category for filter dropdowns (raw strings carry dates/prices and
    would balloon a native <select> past the viewport on mobile). Capped for safety. */
function licLabel(lic: string) {
  const label = licenseBadge(lic).label
  return label.length > 28 ? label.slice(0, 26) + '…' : label
}

/** Validate + publish a catalog payload (shared by the fetch path, test init,
    and tests). Throws on invalid payloads WITHOUT mutating state. */
export function ingestCatalogPayload(payload: unknown): void {
  mark('catalog:validate-start')
  assertCatalogPayload(payload)
  mark('catalog:validate-end')
  measure('catalog:validate', 'catalog:validate-start', 'catalog:validate-end')
  const p = payload as { all_coding_models: Model[]; model_count?: number; data_as_of?: string; data_regen_at?: string }
  setDataAnchor(p.data_as_of ?? '')
  mark('catalog:derived-start')
  allModels = [...p.all_coding_models]
  catalogMeta = {
    model_count: p.model_count ?? p.all_coding_models.length,
    data_as_of: p.data_as_of ?? '',
    data_regen_at: p.data_regen_at ?? '',
  }
  providers = [...new Set(p.all_coding_models.map((m) => m.provider))].sort()
  licenseGroups = [...new Set(p.all_coding_models.map((m) => licLabel(m.license)))].sort()
  modelTypeGroups = [...new Set(p.all_coding_models.map((m) => m.model_type || 'foundation'))].sort()
  mark('catalog:derived-end')
  measure('catalog:derived-groups', 'catalog:derived-start', 'catalog:derived-end')
  // Dev-only invariant check: catches malformed regens (duplicate ids, rank gaps).
  if (import.meta.env.DEV) {
    const ids = new Set(allModels.map((m) => m.id))
    const ranks = allModels.map((m) => parseInt(m.rank, 10)).sort((a, b) => a - b)
    const contiguous = ranks.every((r, i) => r === i + 1)
    if (ids.size !== allModels.length || !contiguous) {
      console.warn(`useModels: catalog invariants violated — ${allModels.length} rows, ${ids.size} unique ids, ranks contiguous: ${contiguous}. Re-run \`npm run data\`.`)
    }
  }
  catalogError = null
  notifyCatalog()
}

/** Test-only: return the store to the unloaded state (the production boot path). */
export function resetCatalogForTests(): void {
  allModels = []
  catalogMeta = { model_count: 0, data_as_of: '', data_regen_at: '' }
  providers = []
  licenseGroups = []
  modelTypeGroups = []
  catalogError = null
  notifyCatalog()
}

export const confidenceGroups = ['high','medium','low']

if (import.meta.env.MODE === 'test') {
  // Vitest has no local server: static import keeps every existing test synchronous.
  ingestCatalogPayload((await import('../data.json')).default)
} else {
  // Production/dev: fire-and-forget — shell paints first, catalog fills in.
  // Failure degrades to shell + error banner (catalogError), never a blank page.
  mark('catalog:fetch-start')
  fetch(`${import.meta.env.BASE_URL}data.json`).then((r) => {
    mark('catalog:headers-end')
    measure('catalog:fetch', 'catalog:fetch-start', 'catalog:headers-end')
    if (!r.ok) throw new Error(`catalog fetch failed: ${r.status}`)
    mark('catalog:json-start')
    return r.json()
  }).then((j) => {
    mark('catalog:json-end')
    measure('catalog:json-parse', 'catalog:json-start', 'catalog:json-end')
    ingestCatalogPayload(j)
  }).catch((e: unknown) => {
    catalogError = e instanceof Error ? e.message : String(e)
    notifyCatalog()
  })
}

/**
 * One catalog row (from data.json, regenerated from the CSV via `npm run data`).
 * @typedef {Object} Model
 * @property {string} id         Stable key = CSV slug (survives re-ranks; never rank-based).
 * @property {string} slug       CSV Slug column (lowercase provider-model, [a-z0-9-], unique).
 * @property {string} rank       CSV rank "1".."299" (1 = top frontier).
 * @property {string} model      Display name — the join key for CostCalc samples.
 * @property {string} provider
 * @property {string|null} total_parameters  "770B" / "Unknown" / "Undisc."
 * @property {string|null} active_parameters "49B" / "8B/16B" / "Unknown".
 * @property {number|string|null} full_q4_vram_gb  Number when plain, annotated string ("~1400G") for display.
 * @property {string} license    Raw free-text cell — badge/filter use heuristics (lib/license).
 * @property {string|null} swe_bench_verified  "93.4%"-style cells; use parsePct().
 * @property {string|null} swe_bench_pro
 * @property {string|null} livecodebench_v6
 * @property {string|null} terminal_bench
 * @property {string|null} humaneval
 * @property {string|null} mmlu_pro
 * @property {string|null} gpqa_diamond
 * @property {string|null} hle
 * @property {string|null} math
 * @property {string|null} aime_2026
 * @property {string|null} arc_agi_2
 * @property {string|null} context_window    "1M" / "260K".
 * @property {number|null} price_in_usd_per_mtok
 * @property {number|null} price_out_usd_per_mtok
 * @property {number|null} price_in_inr_per_mtok
 * @property {number|null} price_out_inr_per_mtok
 * @property {boolean} is_free   Curated (not in CSV).
 * @property {string|null} released  ISO "2026-09-10" or coarse "Sep 2026" — curated (not in CSV).
 */

// (Module-level derived arrays live at the top of this file: providers,
// licenseGroups, modelTypeGroups are populated by ingestCatalogPayload.)

/** Every benchmark column tracked in the catalog — coding first, then reasoning/math.
    Drives the Leaderboards tab (one board per benchmark). */
export const BENCHMARKS = [
  { key: 'terminal_bench', title: 'Terminal-Bench 2.1', icon: 'zap' },
  { key: 'swe_bench_verified', title: 'SWE-bench Verified', icon: 'award' },
  { key: 'swe_bench_pro', title: 'SWE-bench Pro (Scale std.)', icon: 'award' },
  { key: 'livecodebench_v6', title: 'LiveCodeBench V6', icon: 'chart' },
  { key: 'humaneval', title: 'HumanEval', icon: 'chart' },
  { key: 'gpqa_diamond', title: 'GPQA Diamond', icon: 'brain' },
  { key: 'mmlu_pro', title: 'MMLU-Pro', icon: 'brain' },
  { key: 'aime_2026', title: 'AIME 2026', icon: 'brain' },
  { key: 'math', title: 'MATH', icon: 'brain' },
  { key: 'hle', title: "Humanity's Last Exam (HLE)", icon: 'brain' },
  { key: 'arc_agi_2', title: 'ARC-AGI-2', icon: 'brain' },
]

const NO_VALUE = -1

/** Sort keys offered in the Explorer dropdown (rank is CSV order, 1 = top frontier). */
export const SORT_OPTIONS = [
  { value: 'latest', label: 'Sort: Latest release ↓' },
  { value: 'rank', label: 'Sort: Rank ↑' },
  { value: 'frontier', label: 'Sort: Frontier TB ↓' },
  { value: 'swev', label: 'Sort: SWE-V ↓' },
  { value: 'tb', label: 'Sort: Terminal-Bench ↓' },
  { value: 'lcb', label: 'Sort: LiveCodeBench ↓' },
  { value: 'q4', label: 'Sort: Q4 small→big' },
  { value: 'price_in', label: 'Sort: Cheapest in' },
]

/** Release-window filter options (measured against DATA_AS_OF). */
export const RELEASE_WINDOWS = [
  { value: 'all', label: 'Released: any time' },
  { value: '7', label: 'Released: last 7 days' },
  { value: '30', label: 'Released: last 30 days' },
  { value: '90', label: 'Released: last 90 days' },
  { value: 'dated', label: 'Released: has date only' },
]

/** Row comparator for every Explorer sort key (exported for unit tests). */
export function compare(a: Model, b: Model, sort: string) {
  switch (sort) {
    case 'latest': {
      // Newest valid release first. Only structurally valid ISO dates inside
      // the as-of month (isValidRelease) count as "recent" — invalid, future,
      // coarse/approximate, and missing dates all sink below real releases.
      // (The backfill script guards at the source; this keeps the sort correct
      // even if a bad date is ever reintroduced.) Rank breaks date ties.
      const aValid = isValidRelease(a.released)
      const bValid = isValidRelease(b.released)
      if (aValid && !bValid) return -1
      if (!aValid && bValid) return 1
      if (aValid && bValid) {
        return (b.released ?? '').localeCompare(a.released ?? '') || parseInt(a.rank, 10) - parseInt(b.rank, 10)
      }
      const ar = a.released || ''
      const br = b.released || ''
      if (!ar && !br) return 0
      if (!ar) return 1
      if (!br) return -1
      return br.localeCompare(ar) || parseInt(a.rank, 10) - parseInt(b.rank, 10)
    }
    case 'rank':
      return parseInt(a.rank, 10) - parseInt(b.rank, 10)
    case 'frontier': {
      const tb = (parsePct(b.terminal_bench) ?? NO_VALUE) - (parsePct(a.terminal_bench) ?? NO_VALUE)
      return tb !== 0 ? tb : (parsePct(b.swe_bench_verified) ?? NO_VALUE) - (parsePct(a.swe_bench_verified) ?? NO_VALUE)
    }
    case 'swev':
      return (parsePct(b.swe_bench_verified) ?? NO_VALUE) - (parsePct(a.swe_bench_verified) ?? NO_VALUE)
    case 'tb':
      return (parsePct(b.terminal_bench) ?? NO_VALUE) - (parsePct(a.terminal_bench) ?? NO_VALUE)
    case 'lcb':
      return (parsePct(b.livecodebench_v6) ?? NO_VALUE) - (parsePct(a.livecodebench_v6) ?? NO_VALUE)
    case 'q4':
      return (parseQ4(a.full_q4_vram_gb) || 9999) - (parseQ4(b.full_q4_vram_gb) || 9999)
    case 'price_in':
      return (a.price_in_usd_per_mtok || 999) - (b.price_in_usd_per_mtok || 999)
    default:
      return 0
  }
}

/**
 * Single source of truth for derived catalog data:
 * summary stats, the filter/sort pipeline, leaderboards, and the
 * Hardware Fit matrix rows.
 */
export interface ModelFilters {
  q: string
  provider: string
  license: string
  openOnly: boolean
  maxQ4: string
  sort: string
  releaseWindow: string
  modelType: string
  confidence: string
  hideSparse: boolean
  freeOnly: boolean
}

export function useModels({ q, provider, license, openOnly, maxQ4, sort, releaseWindow, modelType = 'all', confidence = 'all', hideSparse = false, freeOnly = false }: ModelFilters) {
  // Shell-first render: the catalog array itself is the external-store
  // snapshot — its identity flips [] -> rows on publish, which is exactly
  // what useMemo deps need to invalidate. ready is length-based so a reset
  // (revision bump, empty store) correctly reads unready.
  const models = useSyncExternalStore(subscribeCatalog, getCatalogSnapshot)
  const ready = models.length > 0
  const stats = useMemo(() => {
    const open = models.filter((m) => isOpenWeight(m.license)).length
    const withSWE = models.filter((m) => parsePct(m.swe_bench_verified) != null).length
    const withQ4 = models.filter((m) => parseQ4(m.full_q4_vram_gb) != null).length
    // Valid releases only (isValidRelease): future/invalid dates never inflate
    // the coverage KPI or leak into "latest" windows — matches 'dated' filter.
    const dated = models.filter((m) => isValidRelease(m.released)).length
    return { total: models.length, open, closed: models.length - open, withSWE, withQ4, dated }
  }, [models])

  const filtered = useMemo(() => {
    let out = [...models]
    if (q) {
      const qq = q.toLowerCase()
      out = out.filter((m) => (m.model + ' ' + m.provider).toLowerCase().includes(qq))
    }
    if (provider !== 'all') out = out.filter((m) => m.provider === provider)
    if (license !== 'all') out = out.filter((m) => licLabel(m.license) === license)
    if (openOnly) out = out.filter((m) => isOpenWeight(m.license))
    if (maxQ4 !== 'all') {
      const lim = parseFloat(maxQ4)
      out = out.filter((m) => {
        const q4 = parseQ4(m.full_q4_vram_gb)
        return q4 != null && q4 <= lim
      })
    }
    if (releaseWindow && releaseWindow !== 'all') {
      if (releaseWindow === 'dated') {
        out = out.filter((m) => isValidRelease(m.released))
      } else {
        const days = parseInt(releaseWindow, 10)
        const cutoff = new Date(DATA_AS_OF + 'T00:00:00Z')
        cutoff.setUTCDate(cutoff.getUTCDate() - days)
        out = out.filter((m) => isValidRelease(m.released) && new Date(m.released + 'T00:00:00Z') >= cutoff)
      }
    }
    if (modelType && modelType !== 'all') out = out.filter((m) => (m.model_type || 'foundation') === modelType)
    if (confidence && confidence !== 'all') out = out.filter((m) => (m.confidence || 'low') === confidence)
    if (hideSparse) out = out.filter((m) => parsePct(m.swe_bench_verified) != null || parsePct(m.terminal_bench) != null)
    if (freeOnly) out = out.filter((m) => m.is_free)
    out.sort((a, b) => compare(a, b, sort))
    return out
  }, [q, provider, license, openOnly, maxQ4, sort, releaseWindow, modelType, confidence, hideSparse, freeOnly, models])

  // Newest catalog entries (for the "New frontier releases" pointer card) —
  // valid releases only, so a future/invalid date can never surface here.
  const latestModels = useMemo(
    () => models.filter((m) => isValidRelease(m.released)).sort((a, b) => compare(a, b, 'latest')).slice(0, 4),
    [models],
  )

  // Best open-weight model that fits a 1×5090 (Q4 <= 32GB), best SWE-V first
  // (TB as tiebreak) — drives the dynamic "Best Q4 fit" KPI card.
  const bestFit = useMemo(() => {
    const cands = models
      .filter((m) => isOpenWeight(m.license) && (parseQ4(m.full_q4_vram_gb) ?? Infinity) <= 32)
      .map((m) => ({ m, swe: parsePct(m.swe_bench_verified) ?? -1, tb: parsePct(m.terminal_bench) ?? -1 }))
      .sort((a, b) => b.swe - a.swe || b.tb - a.tb)
    return cands[0]?.m ?? null
  }, [models])

  // Hardware Fit matrix: every OPEN-WEIGHT model with Q4 data (local-run
  // candidates — closed/API-only models can't run on local VRAM anyway).
  // Best SWE-V first; unscored models sink to the bottom.
  const hwModels = useMemo(
    () =>
      models
        .filter((m) => isOpenWeight(m.license) && parseQ4(m.full_q4_vram_gb) != null)
        .sort((a, b) => (parsePct(b.swe_bench_verified) ?? -1) - (parsePct(a.swe_bench_verified) ?? -1)),
    [models],
  )

  // Leaderboard for EVERY benchmark column in the catalog (coding + reasoning/math),
  // sorted best-first. parsePct handles annotated cells like "USAMO 2026: 99.8%".
  const leaderboards = useMemo(() => {
    const out: Record<string, Model[]> = {}
    for (const bench of BENCHMARKS) {
      out[bench.key] = models
        .filter((m) => parsePct(m[bench.key as keyof Model] as string | null) != null)
        .sort((a, b) => (parsePct(b[bench.key as keyof Model] as string | null) ?? -1) - (parsePct(a[bench.key as keyof Model] as string | null) ?? -1))
    }
    return out
  }, [models])

  return { stats, filtered, latestModels, leaderboards, hwModels, bestFit, ready, catalogError }
}