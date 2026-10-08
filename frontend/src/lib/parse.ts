/**
 * Shared parsing / formatting helpers.
 * Kept dependency-free so every tab can use them without coupling.
 * Count/date anchors come from data.json (written by regen-data.mjs):
 * data_as_of = newest Last Verified date in the CSV, never the deploy date.
 */
import type { Model } from './types'
import { FX_USD_INR, FX_AS_OF } from './fx.generated'

export const INR_PER_USD = FX_USD_INR
/** Provenance date of the FX rate (from scripts/fx.json). */
export const FX_RATE_AS_OF = FX_AS_OF
/** Newest verified date in the CSV (data anchor for "latest" windows). */
export let DATA_AS_OF = ''
/** Human label for the anchor, e.g. 'Oct 5, 2026'. */
export let VERIFIED_AT = ''
/** End of the anchor month — the newest date a release may claim before it is
    treated as future/invalid (pricing-window prose like "intro to Dec 31" must
    never leak into release dates). Mid-month estimates (≈) stay within it. */
export let RELEASE_MONTH_END = ''

/** Runtime-validated catalog payload: every row must carry the identity and
    display fields the UI reads unconditionally. Throws loudly on the first
    malformed row instead of letting a bad cast through. */
export interface CatalogPayload {
  all_coding_models: Model[]
  model_count?: number
  data_as_of?: string
  data_regen_at?: string
}

const REQUIRED_ROW_STRINGS = ['id', 'slug', 'rank', 'model', 'provider', 'license'] as const

export function assertCatalogPayload(raw: unknown): asserts raw is CatalogPayload {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('catalog payload is not an object — run `npm run data`')
  }
  const rows = (raw as { all_coding_models?: unknown }).all_coding_models
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('catalog payload has no all_coding_models array — run `npm run data`')
  }
  rows.forEach((row, i) => {
    if (!row || typeof row !== 'object') {
      throw new Error(`catalog row ${i} is not an object — run \`npm run data\``)
    }
    for (const k of REQUIRED_ROW_STRINGS) {
      const v = (row as Record<string, unknown>)[k]
      if (typeof v !== 'string' || v.length === 0) {
        throw new Error(`catalog row ${i} has invalid ${k} — run \`npm run data\``)
      }
    }
  })
}

/** Set by useModels after the catalog loads (or test-setup in tests). Throws
    on a missing/invalid anchor — parse must never run dateless. */
export function setDataAnchor(iso: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error('parse: data_as_of is missing or invalid — run `npm run data`')
  }
  DATA_AS_OF = iso
  VERIFIED_AT = fmtDateFull(iso) as string
  const [y, mo] = iso.split('-').map(Number)
  RELEASE_MONTH_END = new Date(Date.UTC(y, mo, 0)).toISOString().slice(0, 10)
}

/** A "real recent" release date: valid ISO YYYY-MM-DD, not future relative to
    the as-of month. Approximate (est) dates qualify — they carry the ≈ marker. */
export function isValidRelease(iso: unknown) {
  if (!iso || typeof iso !== 'string') return false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  if (iso > RELEASE_MONTH_END) return false
  const mo = parseInt(iso.slice(5, 7), 10)
  const dy = parseInt(iso.slice(8, 10), 10)
  if (mo < 1 || mo > 12 || dy < 1 || dy > 31) return false
  // Calendar check: rejects impossible dates like 2026-02-30, not just day > 31.
  const d = new Date(iso + 'T00:00:00Z')
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso
}

/** '2026-09-10' -> 'Sep 10' (UTC so the label is stable regardless of viewer timezone).
    Coarse dates that aren't ISO ('Sep 2026') pass through unchanged instead of "Invalid Date". */
export function fmtDate(iso: string | null | undefined) {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

/** '2026-09-10' -> 'Sep 10, 2026' (coarse dates pass through unchanged). */
export function fmtDateFull(iso: string | null | undefined) {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

/** Days between a released date and the data as-of anchor.
    Invalid or future (past the as-of month) dates are not "recent": Infinity,
    so they never badge NEW or pass release-window filters. Within-month
    estimates just past the anchor clamp to 0 so they still badge NEW. */
export function daysOld(iso: string | null | undefined) {
  if (!iso) return Infinity
  if (!isValidRelease(iso)) return Infinity
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return Infinity
  return Math.max(0, Math.round((new Date(DATA_AS_OF + 'T00:00:00Z').getTime() - d.getTime()) / 86400000))
}

/** Age of a Last Verified date relative to the data anchor: '19d'.
    Invalid dates -> 'unknown'; future dates clamp to '0d'. */
export function verificationAge(iso: string | null | undefined) {
  if (!iso || typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return 'unknown'
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return 'unknown'
  return `${Math.max(0, Math.round((new Date(DATA_AS_OF + 'T00:00:00Z').getTime() - d.getTime()) / 86400000))}d`
}

/** Relative age vs the as-of anchor: '3d ago', '2mo ago', '1y ago'.
 * Null/invalid dates -> 'date TBD'; within-month future estimates -> 'soon'. */
export function timeAgo(iso: string | null | undefined) {
  if (!iso || typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return 'date TBD'
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return 'date TBD'
  const n = Math.round((new Date(DATA_AS_OF + 'T00:00:00Z').getTime() - d.getTime()) / 86400000)
  if (n < 0) return 'soon'
  if (n < 1) return 'today'
  if (n < 30) return `${n}d ago`
  if (n < 365) return `${Math.round(n / 30)}mo ago`
  return `${Math.round(n / 365)}y ago`
}

/** Extract a score from a "93.4%"-style cell. Returns null when absent.
    Prefers a %-anchored number so annotated prose ("USAMO 2026: 99.8%")
    doesn't rank on the year; falls back to the *last* bare number so
    a rare "USAMO 2026: 99.8" (no %) still ranks on 99.8, not the year. */
export function parsePct(v: unknown) {
  if (!v || v === '-') return null
  const s = String(v)
  const pct = s.match(/(\d+(?:\.\d+)?)\s*%/)
  if (pct) return parseFloat(pct[1])
  const all = [...s.matchAll(/(\d+(?:\.\d+)?)/g)]
  if (all.length === 0) return null
  // If multiple numbers and no %, the score is almost always the last
  // (e.g. "USAMO 2026: 99.8" -> 99.8, not 2026). Single-value cells are unaffected.
  return parseFloat(all[all.length - 1][1])
}

/** Normalise a "~111 GB"-style Q4 cell into a number. Returns null when unknown. */
export function parseQ4(v: unknown) {
  if (v == null) return null
  const s = String(v).replace(/~/g, '').trim()
  if (s === '?' || s === '-') return null
  const m = s.match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
}

/** Score provenance from a benchmark cell: '92.8% (TB2.1 vendor)' -> 'vendor'.
    Plain cells -> null (vendor-reported is the catalog default, so only
    deviations from prose-only reporting are surfaced in the UI). */
export function scoreSource(v: unknown) {
  const s = String(v ?? '').toLowerCase()
  if (!s || s === '-') return null
  if (s.includes('vendor')) return 'vendor'
  if (/\baa\b/.test(s)) return 'aa'
  if (/\bscale\b/.test(s)) return 'scale'
  if (s.includes('benchlm')) return 'benchlm'
  return null
}

/** "0.15" -> "$0.15/M" (keeps 2 decimals for fractions, trims trailing zeros otherwise). */
export function fmtUsdPerM(v: number | null | undefined) {
  if (v == null) return '—'
  const n = Number(v)
  return `$${n < 1 ? n.toFixed(2) : n.toLocaleString()}`
}

/** Human-readable param string for a model row, e.g. "770B / 49B active". */
export function paramsLabel(m: Model) {
  const total = m.total_parameters && m.total_parameters !== 'Unknown' ? m.total_parameters : null
  const active = m.active_parameters && m.active_parameters !== 'Unknown' ? m.active_parameters : null
  if (!total) return active ? `${active} active` : 'Params unavailable'
  return active && active !== total ? `${total} / ${active} active` : total
}