import type { Model } from './types'

/**
 * One source of truth for the catalog's benchmark columns.
 *
 * The Explorer card used to hardcode three of them (SWE-V / TB 2.1 / LCB V6)
 * and rendered a dash for every model whose scores live in the other eight —
 * so 22 scored models looked unscored, and the 118 models with no published
 * scores at all showed a wall of dashes that read as "broken". The DetailModal
 * already showed all columns plus an honest empty state; this module makes
 * the card use the same rule.
 */
export interface BenchColumn {
  key: keyof Model
  /** Short label for the card. */
  label: string
  /** Coding headline columns — shown as the card's primary grid when present. */
  headline?: boolean
}

export const BENCH_COLUMNS: BenchColumn[] = [
  { key: 'swe_bench_verified', label: 'SWE-V', headline: true },
  { key: 'terminal_bench', label: 'TB 2.1', headline: true },
  { key: 'livecodebench_v6', label: 'LCB V6', headline: true },
  { key: 'swe_bench_pro', label: 'SWE-Pro' },
  { key: 'gpqa_diamond', label: 'GPQA-D' },
  { key: 'hle', label: 'HLE' },
  { key: 'humaneval', label: 'HumanEval' },
  { key: 'mmlu_pro', label: 'MMLU-Pro' },
  { key: 'math', label: 'MATH' },
  { key: 'aime_2026', label: 'AIME 2026' },
  { key: 'arc_agi_2', label: 'ARC-AGI-2' },
]

/** A benchmark cell that actually carries a value. */
export interface ScoredBench {
  key: keyof Model
  label: string
  value: string
  /** Numeric percentage when the cell parses as one (drives the card bar). */
  pct: number | null
}

/**
 * Benchmark names that some cells carry INSTEAD of their column's benchmark
 * (e.g. a DeepSWE score filed under ARC-AGI-2). The cell says so in
 * parentheses — show that name rather than the column name, so the card
 * never labels a DeepSWE score "ARC-AGI-2".
 */
const CELL_NAME = /\((DeepSWE[^)]*?|TB\s?2\.1|TB2\.1|GPQA-D|SciCode|LiveClaw|AutomationBench|FrontierCode[^)]*?|MMLU[^)]*?|AIME[^)]*?|HLE[^)]*?|SWE[^)]*?)\)/i

/** Trailing qualifiers that describe the number, not the benchmark. */
const QUALIFIER = /\s+(vendor|vendors|tools?|no tools|xhigh|max|high|medium|low|partial|offline subset|reported|self-reported)$/i

function cellLabel(col: BenchColumn, value: string): string {
  const m = value.match(CELL_NAME)
  return m ? m[1].replace(QUALIFIER, '').trim() : col.label
}

/**
 * Percentage of a cell, or null when the cell is not a single percentage.
 *
 * Strict on purpose: a RANGE ("76.4-85.0%") or a prefixed label
 * ("MATH-500: 96.8%") is not one number, and parsing it loosely produced
 * "-85.0%" — a negative score on a card. Those cells are shown verbatim.
 */
function parseCellPct(value: string): number | null {
  const m = value.match(/^\s*(\d+(?:\.\d+)?)\s*%/)
  if (!m) return null
  // A second percentage later in the cell means this is a range, not one score.
  if (/\d+(?:\.\d+)?\s*%/.test(value.slice(m[0].length))) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? n : null
}

/** Every populated benchmark cell of a row, in column order. */
export function scoredBenchmarks(m: Model): ScoredBench[] {
  const out: ScoredBench[] = []
  for (const col of BENCH_COLUMNS) {
    const raw = m[col.key]
    if (raw == null) continue
    const value = String(raw).trim()
    if (!value || value === '-') continue
    out.push({ key: col.key, label: cellLabel(col, value), value, pct: parseCellPct(value) })
  }
  return out
}

/**
 * The card's primary grid: the populated coding-headline cells if there are
 * any, otherwise the first populated cells of any benchmark. Empty when the
 * row has no published scores at all (the card then says so instead of
 * showing dashes).
 */
export function cardBenchmarks(m: Model): { grid: ScoredBench[]; extra: ScoredBench[] } {
  const scored = scoredBenchmarks(m)
  const headline = scored.filter((s) => BENCH_COLUMNS.find((c) => c.key === s.key)?.headline)
  const grid = headline.length > 0 ? headline : scored.slice(0, 3)
  const gridKeys = new Set(grid.map((g) => g.key))
  return { grid, extra: scored.filter((s) => !gridKeys.has(s.key)) }
}
