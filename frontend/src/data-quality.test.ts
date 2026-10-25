/// <reference types="node" />
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from './data.json'
import type { Model } from './lib/types'

const here = dirname(fileURLToPath(import.meta.url))
const models = (data.all_coding_models || []) as Model[]
/** Full provenance notes, deferred out of the payload (public/notes.json). */
const notesByIdx: Record<string, string> = JSON.parse(
  readFileSync(join(here, '../public/notes.json'), 'utf8'),
)

const BENCH_KEYS = [
  'swe_bench_verified', 'swe_bench_pro', 'livecodebench_v6', 'terminal_bench',
  'humaneval', 'mmlu_pro', 'gpqa_diamond', 'hle', 'math', 'aime_2026', 'arc_agi_2',
] as const

/** A notes reference counts as primary-source (vendor docs, HF/GitHub repos),
    with or without an https:// scheme. */
const PRIMARY_URL = /(https?:\/\/)?(huggingface\.co|github\.com|anthropic\.com|openai\.com|mistral\.ai|docs\.|blog\.google|z\.ai|deepseek\.com|cognition\.ai|artificialanalysis\.(com|ai)|cohere\.com|microsoft\.ai|tencent\.com|x\.ai|google\.com|nvidia\.com|amd\.com|apple\.com|about\.fb\.com|research\.meta\.ai)/i

function hasBench(m: Model): boolean {
  return BENCH_KEYS.some((k) => {
    const v = m[k]
    return v != null && String(v).trim() !== '' && String(v).trim() !== '-'
  })
}

describe('data quality gates (audit)', () => {
  it('fresh releases are benchmarked, primarily sourced, or marked low', () => {
    // Window is anchored to data_as_of (deterministic), not the wall clock.
    const asOf = new Date((data.data_as_of ?? '') + 'T00:00:00Z').getTime()
    expect(Number.isNaN(asOf), 'data_as_of must be a valid date').toBe(false)
    const cutoff = asOf - 14 * 86400000
    const bad = models.filter((m) => {
      if (!m.released || !/^\d{4}-\d{2}-\d{2}$/.test(m.released)) return false
      if (new Date(m.released + 'T00:00:00Z').getTime() < cutoff) return false
      if (hasBench(m)) return false
      if (PRIMARY_URL.test(notesByIdx[m.slug] ?? '')) return false
      return (m.confidence || 'low').toLowerCase() !== 'low'
    })
    expect(bad.map((m) => `${m.rank} ${m.model}`), 'fresh + scoreless + no primary ref must be confidence low').toEqual([])
  })

  it('model ids are unique', () => {
    const ids = models.map((m) => m.id)
    expect(new Set(ids).size, 'duplicate ids').toBe(ids.length)
  })

  it('USD prices are never negative', () => {
    const bad = models.filter((m) =>
      (m.price_in_usd_per_mtok ?? 0) < 0 || (m.price_out_usd_per_mtok ?? 0) < 0,
    )
    expect(bad.map((m) => `${m.rank} ${m.model}`), 'negative prices').toEqual([])
  })
})
