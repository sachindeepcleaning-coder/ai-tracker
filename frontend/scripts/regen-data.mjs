#!/usr/bin/env node
/**
 * CSV -> data.json regeneration.
 *
 * Single source of truth: `coding_benchmarks.csv` (repo root).
 * Run: `npm run data` (from frontend/).
 *
 * Derives every row from the CSV using the canonical column mapping, then
 * MERGES curated fields (`released`, `released_est`, `released_src`, `is_free`)
 * from the existing data.json keyed by `slug` (stable provider-model identity)
 * so hand-researched dates/tiers survive regeneration AND row re-ranks.
 * One-time migration: entries still keyed by legacy `rank-N` ids fall back
 * through a rank lookup on first run after the slug backfill.
 * Normalizes: '-' -> null, plain-numeric cells -> numbers, "$"/"₹" stripped
 * from prices (fixes string-price rows that break numeric sort / CostCalc).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = process.env.CSV_PATH || join(here, '../../coding_benchmarks.csv')
const OUT_PATH = process.env.OUT_PATH || join(here, '../src/data.json')

/** Strip a UTF-8 BOM so a BOM-prefixed header still matches HEADER_MAP. */
function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
}

/** RFC-4180-ish CSV parse: handles quoted cells containing commas. */
function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++ } else inQuotes = false
      } else cell += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(cell); cell = ''
    } else if (c === '\n') {
      row.push(cell); cell = ''
      if (row.some((v) => v.trim() !== '')) rows.push(row)
      row = []
    } else if (c !== '\r') {
      cell += c
    }
  }
  row.push(cell)
  if (row.some((v) => v.trim() !== '')) rows.push(row)
  return rows
}

const NULLISH = new Set(['-', '?', 'undisc.', 'unknown', ''])

function clean(v) {
  const s = String(v ?? '').trim()
  return NULLISH.has(s.toLowerCase()) ? null : s
}

/** Plain-numeric cells -> number (rank-256 '280'); annotated ('~1400G') stay strings for display. */
function q4(v) {
  const s = clean(v)
  if (s == null) return null
  return /^[\d.]+$/.test(s) ? parseFloat(s) : s
}

/** "$20.00" / "₹1,902.40" -> 20 / 1902.4; '-'/'Free' -> null. */
function price(v) {
  const s = clean(v)
  if (s == null) return null
  // Non-per-M-token units (per-page doc pricing, per-request, etc.) carry no
  // $/Mtok meaning: null them instead of parsing a garbage number
  // (e.g. '$1.50/1k pages' must not become 1.5 $/Mtok).
  if (/\/\s*1k\b/i.test(s)) return null
  const n = parseFloat(s.replace(/[$₹,]/g, ''))
  return Number.isNaN(n) ? null : n
}

const HEADER_MAP = {
  'Rank': 'rank',
  'Model': 'model',
  'Provider': 'provider',
  'Total Parameters': 'total_parameters',
  'Active Parameters': 'active_parameters',
  'Full Q4 VRAM (GB)': 'full_q4_vram_gb',
  'License/Type': 'license',
  'SWE-bench Verified': 'swe_bench_verified',
  'SWE-bench Pro': 'swe_bench_pro',
  'LiveCodeBench V6': 'livecodebench_v6',
  'Terminal-Bench': 'terminal_bench',
  'HumanEval': 'humaneval',
  'MMLU-Pro': 'mmlu_pro',
  'GPQA Diamond': 'gpqa_diamond',
  'HLE': 'hle',
  'MATH': 'math',
  'AIME 2026': 'aime_2026',
  'ARC-AGI-2': 'arc_agi_2',
  'Price Input/1M': 'price_in_usd_per_mtok',
  'Price Output/1M': 'price_out_usd_per_mtok',
  'Context Window': 'context_window',
  'Price Input INR/1M': 'price_in_inr_per_mtok',
  'Price Output INR/1M': 'price_out_inr_per_mtok',
  'Model Type': 'model_type',
  'Last Verified': 'last_verified',
  'Source': 'source',
  'Confidence': 'confidence',
  'Notes': 'notes',
  'Is Orchestrator': 'is_orchestrator',
  'Slug': 'slug',
}

const rows = parseCsv(stripBom(readFileSync(CSV_PATH, 'utf8')))
const header = rows[0]
const colIdx = header.map((h) => HEADER_MAP[h.trim()])

// Header gates: every header must be known, and none may repeat.
{
  const seen = new Set()
  for (const h of header) {
    const name = h.trim()
    if (seen.has(name)) {
      console.error(`regen-data: duplicate header ${JSON.stringify(name)}`)
      process.exit(1)
    }
    seen.add(name)
    if (name !== '' && !(name in HEADER_MAP)) {
      console.error(`regen-data: unknown header ${JSON.stringify(name)} (add it to HEADER_MAP or fix the CSV)`)
      process.exit(1)
    }
  }
}

// TASK 1 gate: every data row must have exactly header.length cells.
// (Comment lines starting with '#' are skipped.) Prints the rank and exits 1.
{
  const rankIdx = header.findIndex((h) => h.trim() === 'Rank')
  const orchIdx = header.findIndex((h) => h.trim() === 'Is Orchestrator')
  const allowedOrch = new Set(['true', 'false', '1', '0', 'yes', 'no', ''])
  for (const cells of rows.slice(1)) {
    if (String(cells[0] ?? '').trim().startsWith('#')) continue
    if (cells.length !== header.length) {
      console.error(`regen-data: row rank=${cells[rankIdx] ?? '?'} has ${cells.length} cells, expected ${header.length}`)
      process.exit(1)
    }
    const orch = String(cells[orchIdx] ?? '').trim().toLowerCase()
    if (!allowedOrch.has(orch)) {
      console.error(`regen-data: row rank=${cells[rankIdx] ?? '?'} has invalid is_orchestrator cell ${JSON.stringify(cells[orchIdx])}`)
      process.exit(1)
    }
  }
}

// Curated fields from the current data.json, keyed by slug (no rank fallback).
const existing = existsSync(OUT_PATH)
  ? JSON.parse(readFileSync(OUT_PATH, 'utf8'))
  : { conversation_summary: null, all_coding_models: [] }
const curated = new Map(existing.all_coding_models.map((m) => [m.id, m]))
if (existsSync(OUT_PATH) && existing.all_coding_models.length === 0) {
  console.error(`regen-data: refusing to run — ${OUT_PATH} exists but has no model rows; a wipe would destroy all curation`)
  process.exit(1)
}
console.log(`regen-data: existing catalog has ${existing.all_coding_models.length} rows, ${existing.all_coding_models.filter((m) => m.released).length} with released dates`)

// --recompute-inr: rewrite every INR cell from its USD cell x fx_usd_inr
// (2dp, en-US grouping). Writes back to the CSV, then mapping proceeds on the
// updated cells. Never run implicitly — values only change via this flag.
if (process.argv.includes('--recompute-inr')) {
  const FX = JSON.parse(readFileSync(join(here, 'fx.json'), 'utf8'))
  const rate = FX.fx_usd_inr
  if (typeof rate !== 'number' || !(rate > 0)) {
    console.error('regen-data: fx.json fx_usd_inr must be a positive number')
    process.exit(1)
  }
  const cellIdx = (name) => header.findIndex((h) => h.trim() === name)
  const pairs = [['Price Input/1M', 'Price Input INR/1M'], ['Price Output/1M', 'Price Output INR/1M']]
  let touched = 0
  for (const cells of rows.slice(1)) {
    if (String(cells[0] ?? '').trim().startsWith('#')) continue
    for (const [usdCol, inrCol] of pairs) {
      const usdRaw = String(cells[cellIdx(usdCol)] ?? '').trim()
      // Only numeric USD cells are recomputed; Free/TBD/Gated/NIM-style
      // labels carry meaning and are left untouched. No thousands separators
      // (file convention: ₹2378.00, not ₹2,378.00).
      if (usdRaw === '' || usdRaw === '-' || /\/\s*1k\b/i.test(usdRaw)) continue
      const usd = parseFloat(usdRaw.replace(/[$₹,]/g, ''))
      if (Number.isNaN(usd)) continue
      const inr = '₹' + (Math.round(usd * rate * 100) / 100).toFixed(2)
      if (cells[cellIdx(inrCol)] !== inr) { cells[cellIdx(inrCol)] = inr; touched++ }
    }
  }
  const esc = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)
  writeFileSync(CSV_PATH, rows.map((r) => r.map((c) => esc(String(c ?? ''))).join(',')).join('\r\n') + '\r\n')
  console.log(`regen-data: --recompute-inr rewrote ${touched} INR cells at ${rate}`)
}

const out = rows.slice(1)
  .filter((cells) => !String(cells[0] ?? '').trim().startsWith('#')) // trailing CSV comment lines
  .map((cells) => {
  const row = {}
  colIdx.forEach((key, i) => {
    if (!key) return
    const raw = cells[i]
    if (key === 'rank') { row.rank = String(parseInt(raw, 10)); return }
    if (key === 'slug') { row.slug = String(raw ?? '').trim(); return }
    if (key === 'full_q4_vram_gb') { row[key] = q4(raw); return }
    if (key.startsWith('price_')) { row[key] = price(raw); return }
    if (key === 'total_parameters' || key === 'active_parameters') {
      const s = String(raw ?? '').trim()
      row[key] = s === '' || s === '-' ? null : s
      return
    }
    if (key === 'license' || key === 'provider') {
      const s = String(raw ?? '').trim()
      row[key] = s === '' || s === '-' ? 'Unknown' : s
      return
    }
    if (key === 'model_type') { const s = clean(raw); row[key] = s ? s.toLowerCase() : null; return }
    if (key === 'confidence') { const s = clean(raw); row[key] = s ? s.toLowerCase() : null; return }
    if (key === 'is_orchestrator') {
      const s = String(raw ?? '').trim().toLowerCase()
      if (s === 'true' || s === '1' || s === 'yes') row[key] = true
      else if (s === 'false' || s === '0' || s === 'no' || s === '') row[key] = false
      else row[key] = s === 'true'
      return
    }
    row[key] = clean(raw)
  })
  // defaults for new fields
  if (row.model_type == null) row.model_type = 'foundation'
  if (row.is_orchestrator == null) row.is_orchestrator = false
  if (row.source == null) row.source = 'vendor'
  if (row.last_verified == null) row.last_verified = null
  if (row.notes == null) row.notes = null
  if (row.confidence == null) {
    const codingBenches = [row.swe_bench_verified, row.terminal_bench, row.livecodebench_v6].filter(v=>v!=null).length
    const recency = row.last_verified && row.last_verified >= '2026-08-01'
    const independent = ['artificial-analysis','benchlm','huggingface','lmsys'].includes((row.source||'').toLowerCase())
    if (row.is_orchestrator) {
      row.confidence = codingBenches >=1 ? 'medium' : 'low'
    } else if (codingBenches >=2 && recency && independent) {
      row.confidence = 'high'
    } else if (codingBenches >=3) {
      row.confidence = 'high'
    } else if (codingBenches >=1) {
      row.confidence = 'medium'
    } else {
      row.confidence = 'low'
    }
  }
  // Stable identity: slug from the CSV; id follows slug (rank stays as data).
  row.id = row.slug
  // Merge hand-researched curation keyed on slug ONLY (survives re-ranks).
  // The legacy rank-N fallback was removed: ranks are display order, not identity.
  const prev = curated.get(row.slug)
  if (prev) {
    row.released = prev.released ?? null
    row.released_est = Boolean(prev.released_est)
    row.released_src = prev.released_src ?? (row.released ? 'curated' : null)
    row.is_free = Boolean(prev.is_free)
  } else {
    row.released = null
    row.released_est = false
    row.released_src = null
    row.is_free = false
  }
  return row
})

// Validation gates — fail build on integrity issues
{
  const ranks = out.map(m => parseInt(m.rank,10)).sort((a,b)=>a-b)
  const contiguous = ranks.every((r,i)=> r===i+1)
  if (!contiguous) { console.error(`regen-data: rank continuity failed ${ranks.slice(0,5)}...${ranks.slice(-5)}`); process.exit(1) }
  const ids = new Set(out.map(m=>m.id))
  if (ids.size !== out.length) { console.error(`regen-data: duplicate ids ${out.length - ids.size}`); process.exit(1) }
  for (const m of out) {
    if (!m.slug || !/^[a-z0-9-]+$/.test(m.slug)) { console.error(`regen-data: bad slug ${m.rank} ${JSON.stringify(m.slug)}`); process.exit(1) }
  }
  const allowedTypes = new Set(['foundation','orchestrator','router','cascade','specialized'])
  const allowedConf = new Set(['high','medium','low'])
  for (const m of out) {
    if (!allowedTypes.has(m.model_type)) { console.error(`regen-data: invalid model_type ${m.id} ${m.model_type}`); process.exit(1) }
    if (!allowedConf.has(m.confidence)) { console.error(`regen-data: invalid confidence ${m.id} ${m.confidence}`); process.exit(1) }
    if (typeof m.is_orchestrator !== 'boolean') { console.error(`regen-data: is_orchestrator must be boolean ${m.id}`); process.exit(1) }
    if (m.last_verified && !/^\d{4}-\d{2}-\d{2}$/.test(m.last_verified)) { console.error(`regen-data: bad last_verified ${m.id} ${m.last_verified}`); process.exit(1) }
  }
}
// Promo-expiry gate: FAIL when a license/notes cell carries a past end date
// (through|thru|until|ended|expires + ISO or "Month day", or "to <Month> <day>")
// that is not already marked handled (expired/removed/ended).
{
  const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 }
  const verifiedDates = out.map((m) => m.last_verified).filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()
  const anchor = verifiedDates[verifiedDates.length - 1] ?? ''
  const [ay, amo, ady] = anchor.split('-').map(Number)
  const toISO = (y, mo, dy) => `${y}-${String(mo).padStart(2, '0')}-${String(dy).padStart(2, '0')}`
  const failures = []
  const PATTERNS = [
    /(through|thru|until|ended|expires?)\s+(\d{4}-\d{2}-\d{2})/i,
    /(through|thru|until|ended|expires?)\s+([A-Za-z]{3,9})\s+(\d{1,2})(?:,?\s*(\d{4}))?/i,
    /\bto\s+([A-Za-z]{3,9})\s+(\d{1,2})(?:,?\s*(\d{4}))?/i,
  ]
  for (const m of out) {
    for (const cell of [m.license, m.notes]) {
      if (!cell || /expired|removed/i.test(cell)) continue // already handled
      // "ended <date>" is itself a handled marker (documents a finished promo).
      if (/ended/i.test(cell)) continue
      for (const re of PATTERNS) {
        const hit = String(cell).match(re)
        if (!hit) continue
        // Pattern groups differ: patterns 1-2 put the month in hit[2],
        // the "to <Month>" pattern puts it in hit[1]. Normalize first.
        const isoFrag = [hit[1], hit[2]].find((v) => /^\d{4}-\d{2}-\d{2}$/.test(v ?? ''))
        const monthName = isoFrag ?? (/[A-Za-z]/.test(hit[2] ?? '') ? hit[2] : hit[1])
        const dayStr = /[A-Za-z]/.test(hit[2] ?? '') ? hit[3] : hit[2]
        const yearStr = /[A-Za-z]/.test(hit[2] ?? '') ? hit[4] : hit[3]
        let iso = null
        if (isoFrag) {
          iso = isoFrag
        } else {
          const mo = MONTHS[String(monthName ?? '').slice(0, 3).toLowerCase()]
          if (!mo || !ay) continue
          const dy = parseInt(dayStr, 10)
          const last = yearStr ? parseInt(yearStr, 10) : null
          const y = last ?? ay
          if (!dy || dy < 1 || dy > 31) continue
          iso = toISO(y, mo, dy)
          // Month-day without year in a later month than the anchor = next year, not past.
          if (!last && (mo > amo || (mo === amo && dy >= ady))) continue
        }
        if (iso < anchor) failures.push(`${m.id}: past end-date claim ${JSON.stringify(hit[0])} (anchor ${anchor})`)
      }
    }
  }
  if (failures.length) {
    console.error(`regen-data: ${failures.length} unmarked past date claim(s):\n  ${failures.join('\n  ')}`)
    process.exit(1)
  }
}
// data_as_of = newest Last Verified date in the CSV (NOT today's date).
// data_regen_at = build timestamp only; the site must display data_as_of.
const today = new Date().toISOString().slice(0,10)
const verifiedDates = out.map((m) => m.last_verified).filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()
const dataAsOf = verifiedDates[verifiedDates.length - 1] ?? null
const { data_version: _dropped, ...rest } = existing // legacy key retired (TASK 3)
const payload = { ...rest, data_regen_at: today, model_count: out.length, data_as_of: dataAsOf, all_coding_models: out }
writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n')
// Public runtime copy for the production fetch (compact: transfer only, never
// reviewed; the pretty src/data.json stays the reviewed artifact). Served with
// Pages' default application/json; offline via the sw.js same-origin cache.
mkdirSync(join(here, '../public'), { recursive: true })
writeFileSync(join(here, '../public/data.json'), JSON.stringify(payload))
const preserved = out.filter((m) => curated.get(m.slug)).length
console.log(`regen-data: wrote ${out.length} models -> ${OUT_PATH} (preserved ${preserved} curated rows)`)
