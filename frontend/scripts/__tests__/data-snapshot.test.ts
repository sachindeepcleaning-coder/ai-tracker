import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from '../../src/data.json'
import type { Model } from '../../src/lib/types'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..', '..', '..')

const models = (data.all_coding_models || []) as Model[]
/** Full provenance notes, deferred out of the payload (public/notes.json). */
const notesByIdx: Record<string, string> = JSON.parse(
  readFileSync(join(ROOT, 'frontend/public/notes.json'), 'utf8'),
)

/** Benchmark columns a card can show. */
const BENCH_KEYS = [
  'swe_bench_verified', 'swe_bench_pro', 'livecodebench_v6', 'terminal_bench',
  'humaneval', 'mmlu_pro', 'gpqa_diamond', 'hle', 'math', 'aime_2026', 'arc_agi_2',
] as const

const csv = readFileSync(join(ROOT, 'coding_benchmarks.csv'), 'utf8')

/**
 * A dated snapshot of an existing model (e.g. "DeepSeek V4.1 Flash 1017",
 * a new build of a model already tracked) ships the SAME weights, so it
 * inherits the same benchmark scores. A snapshot row with empty benchmark
 * cells renders as an all-dash card — the exact bug this gate prevents.
 */
describe('snapshot rows inherit their parent model scores', () => {
  it('every row whose notes point at a parent rank has that rank\'s benchmarks', () => {
    const byRank = new Map(models.map((m) => [m.rank, m]))
    const offenders: string[] = []
    let checked = 0
    for (const m of models) {
      const notes = String(notesByIdx[m.slug] ?? '')
      const ref = notes.match(/same (?:open )?weights as rank (\d+)/i)
      if (!ref) continue
      checked += 1
      const parent = byRank.get(ref[1])
      if (!parent) {
        offenders.push(`${m.rank} ${m.model}: notes reference missing rank ${ref[1]}`)
        continue
      }
      for (const k of BENCH_KEYS) {
        const mine = m[k]
        const theirs = parent[k]
        const mineHas = mine != null && mine !== '' && mine !== '-'
        const theirsHas = theirs != null && theirs !== '' && theirs !== '-'
        if (theirsHas && !mineHas) {
          offenders.push(`${m.rank} ${m.model}: ${k} empty but parent rank ${ref[1]} has "${theirs}"`)
        }
      }
    }
    // Non-vacuous: the gate must actually inspect the snapshot rows.
    expect(checked, 'no snapshot rows matched — the gate regex drifted').toBeGreaterThan(0)
    expect(offenders, 'snapshot rows must carry the parent scores').toEqual([])
  })

  it('the CSV and data.json agree on the snapshot rows', () => {
    // Cheap sanity: the snapshot row exists in both, with a released date.
    const snap = models.find((m) => m.rank === '315')!
    expect(snap.model).toContain('DeepSeek V4.1 Flash 1017')
    expect(snap.released).toBe('2026-10-17')
    expect(csv).toContain('DeepSeek V4.1 Flash 1017')
  })
})
