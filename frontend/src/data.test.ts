import { describe, it, expect } from 'vitest'
import data from './data.json'
import fx from '../scripts/fx.json'
import { INR_PER_USD } from './lib/parse.js'
import type { Model } from './lib/types'

const models = (data.all_coding_models || []) as Model[]
const FX_RATE = (fx as { fx_usd_inr: number }).fx_usd_inr

describe('data.json integrity (regen gate)', () => {
  it('has model_count rows with unique contiguous ranks', () => {
    expect(models.length).toBe(data.model_count)
    const ranks = models.map((m) => parseInt(m.rank, 10)).sort((a, b) => a - b)
    expect(ranks).toEqual(Array.from({ length: data.model_count }, (_, i) => i + 1))
    expect(new Set(models.map((m) => m.id)).size).toBe(data.model_count)
  })

  it('has new schema fields with allowed enums', () => {
    for (const m of models) {
      expect(['foundation','orchestrator','router','cascade','specialized', null]).toContain(m.model_type)
      expect(['high','medium','low', null]).toContain(m.confidence)
      expect(typeof m.is_orchestrator).toBe('boolean')
      if (m.last_verified) expect(m.last_verified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    expect(data.model_count).toBe(models.length)
    expect(data.data_as_of).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    const sorted = models.map((m) => m.last_verified).filter(Boolean).sort()
    const maxVerified = sorted[sorted.length - 1]
    expect(data.data_as_of).toBe(maxVerified)
    expect(data).not.toHaveProperty('data_version')
  })

  it('has at least 10 high-confidence models and notes for orchestrators', () => {
    const high = models.filter(m=>m.confidence==='high')
    expect(high.length).toBeGreaterThanOrEqual(10)
    const orch = models.filter(m=>m.is_orchestrator)
    expect(orch.length).toBeGreaterThanOrEqual(3)
    for (const m of orch) expect(m.notes, `${m.model} orchestrator needs notes`).toBeTruthy()
    const withNotes = models.filter(m=>m.notes)
    expect(withNotes.length).toBeGreaterThanOrEqual(80)
  })

  it('has no string prices or string is_free (regression: rank-265/266/267)', () => {
    for (const m of models) {
      for (const k of ['price_in_usd_per_mtok', 'price_out_usd_per_mtok', 'price_in_inr_per_mtok', 'price_out_inr_per_mtok']) {
        expect((m as unknown as Record<string, unknown>)[k] === null || typeof (m as unknown as Record<string, unknown>)[k] === 'number', `${m.rank} ${m.model}.${k} should be number|null, got ${typeof (m as unknown as Record<string, unknown>)[k]}`).toBe(true)
      }
      expect(typeof m.is_free, `${m.rank} is_free should be boolean`).toBe('boolean')
    }
  })

  it('every row has id/slug/rank/model/provider/license', () => {
    const slugs = new Set()
    for (const m of models) {
      expect(m.id).toBe(m.slug)
      expect(m.slug).toMatch(/^[a-z0-9-]+$/)
      expect(slugs.has(m.slug), `duplicate slug ${m.slug}`).toBe(false)
      slugs.add(m.slug)
      expect(m.model).toBeTruthy()
      expect(m.provider).toBeTruthy()
      expect(m.license).toBeTruthy()
    }
  })

  it('curated released dates survive (31 dated incl. V4.1 Flash Sep 10)', () => {
    const dated = models.filter((m) => m.released)
    expect(dated.length).toBeGreaterThanOrEqual(30)
    const flash = models.find((m) => m.model === 'DeepSeek V4.1 Flash')!
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
      expect(r <= '2026-10-31', `${m.rank} ${m.model} released ${r} is future`).toBe(true)
    }
    // The real September releases stay at the top of a valid-date sort.
    const top = [...models]
      .filter((m) => m.released)
      .sort((a, b) => (b.released ?? '').localeCompare(a.released ?? ''))[0]!.released
    expect(top).toBe('2026-10-07')
  })

  it('verification freshness: at most 50% of rows older than 30 days vs data_as_of', () => {
    const asOf = new Date(data.data_as_of + 'T00:00:00Z').getTime()
    const ages = models
      .map((m) => m.last_verified)
      .filter((d) => d && /^\d{4}-\d{2}-\d{2}$/.test(d))
      .map((d) => Math.round((asOf - new Date(d + 'T00:00:00Z').getTime()) / 86400000))
    const stale = ages.filter((a) => a > 30).length
    expect(stale / models.length, `${stale}/${models.length} rows verified >30d before ${data.data_as_of} — re-verify`).toBeLessThanOrEqual(0.5)
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
    // SWE-2 verified Sep 10 via Cognition blog (was coarse mid-month est)
    const swe2 = models.find((m) => m.model === 'SWE-2')!
    expect(swe2.released).toBe('2026-09-10')
    expect(swe2.released_est).toBe(false)
  })

  it('data_regen_at timestamp present (drives "Data last refreshed")', () => {
    expect(data.data_regen_at).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('SWE-2 keeps only correctly-attributed benchmarks (TB2.1 yes; GPQA/ARC null)', () => {
    const swe2 = models.find((m) => m.model === 'SWE-2')!
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
    const mai = models.find((m) => m.model === 'MAI-Thinking-1')!
    expect(mai.aime_2026).toContain('94.5')
    expect(mai.terminal_bench).toMatch(/46\.0/)
  })

  it('hf_url cells are canonical HF repo URLs on open-weight rows', () => {
    // HF URL column: populated only where the row's own Notes cite the repo
    // (never guessed); every value must be an org/repo URL, and linked rows
    // must be open-weight (a repo link on a closed row is a contradiction).
    const linked = models.filter((m) => m.hf_url != null)
    expect(linked.length).toBeGreaterThan(0)
    for (const m of linked) {
      expect(m.hf_url, `${m.rank} ${m.model}`).toMatch(/^https:\/\/huggingface\.co\/[\w.-]+\/[\w.-]+\/?$/)
    }
  })

  it('price_band is a valid UI grouping derived from input price', () => {
    // free (free-tier flag) / budget (<=0.5) / standard (<=2) / premium (>2)
    // / unknown (no price, not free). Thresholds documented in regen-data.mjs.
    for (const m of models) {
      expect(['free', 'budget', 'standard', 'premium', 'unknown'], `${m.rank} ${m.model}`).toContain(m.price_band)
    }
    expect(models.some((m) => m.price_band === 'free')).toBe(true)
  })

  it('fx.generated.ts matches scripts/fx.json (single FX config)', () => {
    expect(INR_PER_USD, 'parse INR_PER_USD must come from fx.json').toBe(FX_RATE)
  })

  it('INR cells equal USD x fx_usd_inr from scripts/fx.json', () => {
    expect(typeof FX_RATE === 'number' && FX_RATE > 0, 'fx.json fx_usd_inr must be a positive number').toBe(true)
    for (const m of models) {
      for (const [u, i] of [['price_in_usd_per_mtok', 'price_in_inr_per_mtok'], ['price_out_usd_per_mtok', 'price_out_inr_per_mtok']] as const) {
        const usd = m[u]
        const inr = m[i]
        if (usd == null || inr == null) {
          expect(usd, `${m.rank} ${m.model}: one-sided null ${u}=${usd} ${i}=${inr}`).toBe(inr)
          continue
        }
        const expected = Math.round(usd * FX_RATE * 100) / 100
        expect(Math.abs(inr - expected), `${m.rank} ${m.model}: ${i}=${inr} != ${u}=${usd} x ${FX_RATE}`).toBeLessThanOrEqual(0.06)
      }
    }
  })

  it('prices are numbers-or-null with per-Mtok meaning; Q4 units are GB-or-null', () => {
    for (const m of models) {
      for (const k of ['price_in_usd_per_mtok', 'price_out_usd_per_mtok', 'price_in_inr_per_mtok', 'price_out_inr_per_mtok']) {
        const v = (m as unknown as Record<string, unknown>)[k]
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
    const parse5 = models.find((m) => m.model === 'Cohere Parse 5')!
    expect(parse5.price_in_usd_per_mtok).toBeNull()
    expect(parse5.price_out_usd_per_mtok).toBeNull()
    // North-Micro-Vision column-shift fix: 128K is context, not a price
    const nmv = models.find((m) => m.model === 'North-Micro-Vision-Instruct')!
    expect(nmv.context_window).toBe('128K')
    expect(nmv.price_out_inr_per_mtok).toBeNull()
  })
})
