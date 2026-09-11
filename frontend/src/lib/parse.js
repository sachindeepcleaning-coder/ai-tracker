/**
 * Shared parsing / formatting helpers.
 * Kept dependency-free so every tab can use them without coupling.
 */

export const INR_PER_USD = 95.12
export const VERIFIED_AT = 'Sep 10, 2026'

/** Extract the first number from a "93.4%"-style cell. Returns null when absent. */
export function parsePct(v) {
  if (!v || v === '-') return null
  const m = String(v).match(/([\d.]+)/)
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