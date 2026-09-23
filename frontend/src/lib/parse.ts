/**
 * Shared parsing / formatting helpers.
 * Kept dependency-free so every tab can use them without coupling.
 */

export const INR_PER_USD = 95.12
export const VERIFIED_AT = 'Sep 23, 2026'
/** Data as-of anchor (from data.json conversation_summary) — used for "latest" windows. */
export const DATA_AS_OF = '2026-09-23'
/** End of the as-of month — the newest date a release may claim before it is
    treated as future/invalid (pricing-window prose like "intro to Dec 31" must
    never leak into release dates). Mid-month estimates (≈) stay within it. */
export const RELEASE_MONTH_END = '2026-09-30'

/** A "real recent" release date: valid ISO YYYY-MM-DD, not future relative to
    the as-of month. Approximate (est) dates qualify — they carry the ≈ marker. */
export function isValidRelease(iso) {
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
export function fmtDate(iso) {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

/** '2026-09-10' -> 'Sep 10, 2026' (coarse dates pass through unchanged). */
export function fmtDateFull(iso) {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return String(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

/** Days between a released date and the data as-of anchor.
    Invalid or future (past the as-of month) dates are not "recent": Infinity,
    so they never badge NEW or pass release-window filters. Within-month
    estimates just past the anchor clamp to 0 so they still badge NEW. */
export function daysOld(iso) {
  if (!iso) return Infinity
  if (!isValidRelease(iso)) return Infinity
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return Infinity
  return Math.max(0, Math.round((new Date(DATA_AS_OF + 'T00:00:00Z') - d) / 86400000))
}

/** Extract a score from a "93.4%"-style cell. Returns null when absent.
    Prefers a %-anchored number so annotated prose ("USAMO 2026: 99.8%")
    doesn't rank on the year; falls back to the *last* bare number so
    a rare "USAMO 2026: 99.8" (no %) still ranks on 99.8, not the year. */
export function parsePct(v) {
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
export function parseQ4(v) {
  if (v == null) return null
  const s = String(v).replace(/~/g, '').trim()
  if (s === '?' || s === '-') return null
  const m = s.match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
}

/** Score provenance from a benchmark cell: '92.8% (TB2.1 vendor)' -> 'vendor'.
    Plain cells -> null (vendor-reported is the catalog default, so only
    deviations from prose-only reporting are surfaced in the UI). */
export function scoreSource(v) {
  const s = String(v ?? '').toLowerCase()
  if (!s || s === '-') return null
  if (s.includes('vendor')) return 'vendor'
  if (/\baa\b/.test(s)) return 'aa'
  if (/\bscale\b/.test(s)) return 'scale'
  if (s.includes('benchlm')) return 'benchlm'
  return null
}

/** "0.15" -> "$0.15/M" (keeps 2 decimals for fractions, trims trailing zeros otherwise). */
export function fmtUsdPerM(v) {
  if (v == null) return '—'
  const n = Number(v)
  return `$${n < 1 ? n.toFixed(2) : n.toLocaleString()}`
}

/** Human-readable param string for a model row, e.g. "770B / 49B active". */
export function paramsLabel(m) {
  const total = m.total_parameters && m.total_parameters !== 'Unknown' ? m.total_parameters : null
  const active = m.active_parameters && m.active_parameters !== 'Unknown' ? m.active_parameters : null
  if (!total) return active ? `${active} active` : 'Params unavailable'
  return active && active !== total ? `${total} / ${active} active` : total
}