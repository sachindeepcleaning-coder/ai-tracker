import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const raw = readFileSync(join(here, 'data.json'), 'utf8')
const data = JSON.parse(raw)
const models = data.all_coding_models

describe('data.json integrity (regen gate)', () => {
  it('has 270 rows with unique contiguous ranks 1-270', () => {
    expect(models.length).toBe(270)
    const ranks = models.map((m) => parseInt(m.rank, 10)).sort((a, b) => a - b)
    expect(ranks).toEqual(Array.from({ length: 270 }, (_, i) => i + 1))
    expect(new Set(models.map((m) => m.id)).size).toBe(270)
  })

  it('has new schema fields with allowed enums', () => {
    for (const m of models) {
      expect(['foundation','orchestrator','router','cascade','specialized', null]).toContain(m.model_type)
      expect(['high','medium','low', null]).toContain(m.confidence)
      expect(typeof m.is_orchestrator).toBe('boolean')
      if (m.last_verified) expect(m.last_verified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    expect(data.data_version).toBe('2026-09-18')
  })

  it('has at least 10 high-confidence models and notes for orchestrators', () => {
    const high = models.filter(m=>m.confidence==='high')
    expect(high.length).toBeGreaterThanOrEqual(10)
    const orch = models.filter(m=>m.is_orchestrator)
    expect(orch.length).toBeGreaterThanOrEqual(3)
    for (const m of orch) expect(m.notes, `${m.model} orchestrator needs notes`).toBeTruthy()
    const withNotes = models.filter(m=>m.notes)
    expect(withNotes.length).toBeGreaterThanOrEqual(15)
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
    expect(top).toBe('2026-09-16')
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

  it('no cross-harness scores in benchmark columns (misattribution gate)', () => {
    // Same class of bug as the SWE-2 GPQA/ARC fix, found by full-catalog sweep:
    // TB4.0/TB-Science/TB3.0 must never sit in the TB2.1 column; SWE-Pro vendor
    // numbers must never sit in the SWE-V column; AIME25 must never win the
    // first-% parse in MATH/AIME26 columns.
    const tbBad = models.filter((m) => m.terminal_bench && /TB\s*(4\.0|3\.0)|TB-Science/i.test(m.terminal_bench))
    expect(tbBad.map((m) => `${m.rank} ${m.model}`), 'TB2.1 column must hold TB2.1 only').toEqual([])
    const swevBad = models.filter((m) => m.swe_bench_verified && /SWE-Pro vendor/i.test(m.swe_bench_verified))
    expect(swevBad.map((m) => `${m.rank} ${m.model}`), 'SWE-V column must hold SWE-V only').toEqual([])
    const aimeBad = models.filter((m) => [m.math, m.aime_2026].some((v) => v && /AIME\s*25/i.test(v)))
    expect(aimeBad.map((m) => `${m.rank} ${m.model}`), 'AIME25 must not sit in MATH/AIME26 columns').toEqual([])
    // MAI-Thinking-1 keeps its real numbers in the right columns
    const mai = models.find((m) => m.model === 'MAI-Thinking-1')
    expect(mai.aime_2026).toContain('94.5')
    expect(mai.terminal_bench).toMatch(/46\.0/)
  })

  it('prices are numbers-or-null with per-Mtok meaning; Q4 units are GB-or-null', () => {
    for (const m of models) {
      for (const k of ['price_in_usd_per_mtok', 'price_out_usd_per_mtok', 'price_in_inr_per_mtok', 'price_out_inr_per_mtok']) {
        const v = m[k]
        expect(v === null || typeof v === 'number', `${m.rank} ${m.model}.${k} got ${typeof v}`).toBe(true)
      }
      const q = m.full_q4_vram_gb
      // number, null, or '~N' approx-GB string (Kimi K3 '~1400' — display keeps
      // the tilde; parseQ4 normalizes it for sort/filter). Grams ('G' suffix)
      // are banned: that was the Kimi K3 '~1400G' unit bug.
      expect(q === null || typeof q === 'number' || /^~\d/.test(String(q)), `${m.rank} ${m.model} Q4 unit`).toBeTruthy()
      expect(String(q ?? ''), `${m.rank} ${m.model} Q4 must be GB, not grams`).not.toMatch(/G$/)
    }
    // Cohere Parse 5 is per-PAGE pricing: must be null $/Mtok, not 1.5
    const parse5 = models.find((m) => m.model === 'Cohere Parse 5')
    expect(parse5.price_in_usd_per_mtok).toBeNull()
    expect(parse5.price_out_usd_per_mtok).toBeNull()
    // North-Micro-Vision column-shift fix: 128K is context, not a price
    const nmv = models.find((m) => m.model === 'North-Micro-Vision-Instruct')
    expect(nmv.context_window).toBe('128K')
    expect(nmv.price_out_inr_per_mtok).toBeNull()
  })
})
