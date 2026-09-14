import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const raw = readFileSync(join(here, 'data.json'), 'utf8')
const data = JSON.parse(raw)
const models = data.all_coding_models

describe('data.json integrity (regen gate)', () => {
  it('has 267 rows with unique contiguous ranks 1-267', () => {
    expect(models.length).toBe(267)
    const ranks = models.map((m) => parseInt(m.rank, 10)).sort((a, b) => a - b)
    expect(ranks).toEqual(Array.from({ length: 267 }, (_, i) => i + 1))
    expect(new Set(models.map((m) => m.id)).size).toBe(267)
  })

  it('has no string prices or string is_free (regression: rank-265/266/267)', () => {
    for (const m of models) {
      for (const k of ['price_in_usd_per_mtok', 'price_out_usd_per_mtok', 'price_in_inr_per_mtok', 'price_out_inr_per_mtok']) {
        expect(m[k] === null || typeof m[k] === 'number', `${m.rank} ${m.model}.${k} should be number|null, got ${typeof m[k]}`).toBe(true)
      }
      expect(typeof m.is_free, `${m.rank} is_free should be boolean`).toBe('boolean')
    }
  })

  it('every row has id/rank/model/provider/license', () => {
    for (const m of models) {
      expect(m.id).toMatch(/^rank-\d+$/)
      expect(m.model).toBeTruthy()
      expect(m.provider).toBeTruthy()
      expect(m.license).toBeTruthy()
    }
  })

  it('curated released dates survive (31 dated incl. V4.1 Flash Sep 10)', () => {
    const dated = models.filter((m) => m.released)
    expect(dated.length).toBeGreaterThanOrEqual(30)
    const flash = models.find((m) => m.model === 'DeepSeek V4.1 Flash')
    expect(flash.released).toBe('2026-09-10')
  })

  it('no invalid or future release dates (latest-sort regression gate)', () => {
    // Guards the "Latest release" sort: invalid days (e.g. 2026-10-66) and
    // future dates past the as-of month (e.g. 2026-12-31 pricing prose) must
    // never sit in `released` — they belong as nulls.
    for (const m of models) {
      const r = m.released
      if (r == null) continue
      expect(r, `${m.rank} ${m.model} released must be ISO`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      const mo = parseInt(r.slice(5, 7), 10)
      const dy = parseInt(r.slice(8, 10), 10)
      expect(mo, `${m.rank} ${m.model} month`).toBeGreaterThanOrEqual(1)
      expect(mo, `${m.rank} ${m.model} month`).toBeLessThanOrEqual(12)
      expect(dy, `${m.rank} ${m.model} day`).toBeGreaterThanOrEqual(1)
      expect(dy, `${m.rank} ${m.model} day`).toBeLessThanOrEqual(31)
      expect(r <= '2026-09-30', `${m.rank} ${m.model} released ${r} is future`).toBe(true)
    }
    // The real September releases stay at the top of a valid-date sort.
    const top = [...models]
      .filter((m) => m.released)
      .sort((a, b) => b.released.localeCompare(a.released))[0].released
    expect(top).toBe('2026-09-15')
  })

  it('release-date coverage >= 60% with released_est tiering (regen gate)', () => {
    const dated = models.filter((m) => m.released)
    expect(dated.length / models.length).toBeGreaterThanOrEqual(0.6)
    // every released row is ISO YYYY-MM-DD with an est flag
    for (const m of dated) {
      expect(m.released).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(typeof m.released_est).toBe('boolean')
    }
    // exact dates: documented signals (V4.1 Flash, Kimi K3 license date); est dates: family/provider inference
    const exact = dated.filter((m) => !m.released_est)
    const est = dated.filter((m) => m.released_est)
    expect(exact.length).toBeGreaterThanOrEqual(30)
    expect(est.length).toBeGreaterThan(0)
    // SWE-2 coarse 'Sep 2026' normalized to estimated mid-month ISO
    const swe2 = models.find((m) => m.model === 'SWE-2')
    expect(swe2.released).toBe('2026-09-15')
    expect(swe2.released_est).toBe(true)
  })

  it('data_regen_at timestamp present (drives "Data last refreshed")', () => {
    expect(data.data_regen_at).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('SWE-2 keeps only correctly-attributed benchmarks (TB2.1 yes; GPQA/ARC null)', () => {
    const swe2 = models.find((m) => m.model === 'SWE-2')
    expect(swe2.terminal_bench).toContain('92.8')
    expect(swe2.gpqa_diamond).toBeNull() // TB4 27.3% was misattributed here in the CSV
    expect(swe2.arc_agi_2).toBeNull() // FrontierCode 50.0% was misattributed here
  })
})
