#!/usr/bin/env node
/**
 * CSV -> data.json regeneration.
 *
 * Single source of truth: `coding_benchmarks_july2026_final.csv` (repo root).
 * Run: `npm run data` (from frontend/).
 *
 * Derives every row from the CSV using the canonical column mapping, then
 * MERGES curated fields (`released`, `released_est`, `released_src`, `is_free`)
 * from the existing data.json by rank id so hand-researched dates/tiers
 * (and backfill provenance) survive regeneration.
 * Normalizes: '-' -> null, plain-numeric cells -> numbers, "$"/"₹" stripped
 * from prices (fixes string-price rows that break numeric sort / CostCalc).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const CSV_PATH = join(here, '../../coding_benchmarks_july2026_final.csv')
const OUT_PATH = join(here, '../src/data.json')

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
}

const rows = parseCsv(readFileSync(CSV_PATH, 'utf8'))
const header = rows[0]
const colIdx = header.map((h) => HEADER_MAP[h.trim()])

// Curated fields from the current data.json, keyed by rank id.
const existing = existsSync(OUT_PATH)
  ? JSON.parse(readFileSync(OUT_PATH, 'utf8'))
  : { conversation_summary: null, all_coding_models: [] }
const curated = new Map(existing.all_coding_models.map((m) => [m.id, m]))

const out = rows.slice(1)
  .filter((cells) => !String(cells[0] ?? '').trim().startsWith('#')) // trailing CSV comment lines
  .map((cells) => {
  const row = {}
  colIdx.forEach((key, i) => {
    if (!key) return
    const raw = cells[i]
    if (key === 'rank') { row.rank = String(parseInt(raw, 10)); row.id = `rank-${row.rank}`; return }
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
  // Merge hand-researched curation (survives regeneration).
  const prev = curated.get(row.id)
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
  const allowedTypes = new Set(['foundation','orchestrator','router','cascade','specialized'])
  const allowedConf = new Set(['high','medium','low'])
  for (const m of out) {
    if (!allowedTypes.has(m.model_type)) { console.error(`regen-data: invalid model_type ${m.id} ${m.model_type}`); process.exit(1) }
    if (!allowedConf.has(m.confidence)) { console.error(`regen-data: invalid confidence ${m.id} ${m.confidence}`); process.exit(1) }
    if (typeof m.is_orchestrator !== 'boolean') { console.error(`regen-data: is_orchestrator must be boolean ${m.id}`); process.exit(1) }
    if (m.last_verified && !/^\d{4}-\d{2}-\d{2}$/.test(m.last_verified)) { console.error(`regen-data: bad last_verified ${m.id} ${m.last_verified}`); process.exit(1) }
  }
}
// Regen timestamp — surfaced as "Data last refreshed" on the site.
const today = new Date().toISOString().slice(0,10)
writeFileSync(OUT_PATH, JSON.stringify({ ...existing, data_regen_at: today, data_version: '2026-09-23', all_coding_models: out }, null, 2) + '\n')
const preserved = [...curated.keys()].filter((id) => out.some((m) => m.id === id)).length
console.log(`regen-data: wrote ${out.length} models -> ${OUT_PATH} (preserved ${preserved} curated rows)`)
