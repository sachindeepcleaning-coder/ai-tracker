/**
 * Shared parsing / formatting helpers.
 * Kept dependency-free so every tab can use them without coupling.
 */

export const INR_PER_USD = 95.12
export const VERIFIED_AT = 'Sep 13, 2026'
/** Data as-of anchor (from data.json conversation_summary) — used for "latest" windows. */
export const DATA_AS_OF = '2026-09-13'

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

/** Days between a released date and the data as-of anchor (negative-safe). */
export function daysOld(iso) {
  if (!iso) return Infinity
  const d = new Date(iso + 'T00:00:00Z')
  if (isNaN(d.getTime())) return Infinity
  return Math.round((new Date(DATA_AS_OF + 'T00:00:00Z') - d) / 86400000)
}

/** Extract a score from a "93.4%"-style cell. Returns null when absent.
    Prefers a %-anchored number so annotated prose ("USAMO 2026: 99.8%")
    doesn't rank on the year; falls back to the first bare number. */
export function parsePct(v) {
  if (!v || v === '-') return null
  const s = String(v)
  const pct = s.match(/(\d+(?:\.\d+)?)\s*%/)
  if (pct) return parseFloat(pct[1])
  const m = s.match(/(\d+(?:\.\d+)?)/)
  return m ? parseFloat(m[1]) : null
}

/** Normalise a "~111 GB"-style Q4 cell into a number. Returns null when unknown. */
export function parseQ4(v) {
  if (v == null) return null
  const s = String(v).replace(/~/g, '').trim()
  if (s === '?' || s === '-') return null
  const m = s.match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
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