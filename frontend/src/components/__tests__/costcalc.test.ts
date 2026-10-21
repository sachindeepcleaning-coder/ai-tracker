import { describe, it, expect } from 'vitest'
import { resolveSample, COST_SAMPLES } from '../CostCalc.jsx'
import { allModels } from '../../hooks/useModels.js'

describe('CostCalc resolveSample — name resolution (fixes #6)', () => {
  it('resolves all current samples by exact name', () => {
    const samples = [
      { model: 'DeepSeek V4.1 Flash', label: 'x', cache: 0 },
      { model: 'GPT-5.6 Sol', label: 'x', cache: 0 },
      { model: 'Kimi K3', label: 'x', cache: 0 },
      { model: 'GLM-5.3-Flash', label: 'x', cache: 0 },
      { model: 'Gemini 3.8 Flash', label: 'x', cache: 0 },
      { model: 'Muse Spark 1.3', label: 'x', cache: 0 },
      { model: 'Claude Fable 5.1', label: 'x', cache: 0 },
      { model: 'GPT-6 Astra', label: 'x', cache: 0 },
      { model: 'Qwen3.8-27B', label: 'x', cache: 0 },
    ]
    for (const s of samples) {
      const r = resolveSample(s, allModels)
      expect(r.in, `in price for ${s.model} should be >0`).toBeGreaterThan(0)
      expect(r.out, `out price for ${s.model} should be >0`).toBeGreaterThan(0)
    }
  })

  it('normalized fallback: "Fable 5.1" resolves to "Claude Fable 5.1"', () => {
    const r = resolveSample({ model: 'Fable 5.1', label: 'alias', cache: 0 }, allModels)
    expect(r.in).toBeGreaterThan(0)
  })

  it('case/punctuation-insensitive fallback', () => {
    const r = resolveSample({ model: 'glm 5.3 flash', label: 'x', cache: 0 }, allModels)
    expect(r.in).toBeGreaterThan(0)
  })

  it('unknown slug-id objects do not resolve (defensive: warns and falls back to 0)', () => {
    const warn = []
    const orig = console.warn
    console.warn = (m) => warn.push(m)
    const r = resolveSample({ id: 'no-such-slug-xyz', model: 'no-such-model-xyz', label: 'x', cache: 0 }, allModels)
    console.warn = orig
    expect(r.in).toBe(0)
    expect(warn.length).toBe(1)
  })

  it('uses catalog price unless overridden by sample in/out', () => {
    const rPeak = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'peak', in: 0.3, out: 1.2, cache: 0.006 }, allModels)
    expect(rPeak.in).toBe(0.3)
    expect(rPeak.out).toBe(1.2)
    const rOff = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'off', in: 0.15, out: 0.6, cache: 0.003 }, allModels)
    expect(rOff.in).toBe(0.15)
    expect(rOff.out).toBe(0.6)
  })

  // Regression: the off-peak row used to resolve its price from the catalog
  // (which holds the PEAK rate for this model), so it displayed $0.30/$1.20 —
  // identical to the peak row, and 2x the real off-peak rate. Both tiers are
  // now pinned in COST_SAMPLES; this test pins the off-peak numbers so the
  // label and the price cannot drift apart again.
  it('DeepSeek off-peak and peak rows show DIFFERENT prices', () => {
    const rOff = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'off', in: 0.15, out: 0.6, cache: 0.003 }, allModels)
    const rPeak = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'peak', in: 0.3, out: 1.2, cache: 0.006 }, allModels)
    expect(rOff.in).not.toBe(rPeak.in)
    expect(rOff.out).not.toBe(rPeak.out)
    expect(rOff.in).toBeLessThan(rPeak.in)
    expect(rOff.out).toBeLessThan(rPeak.out)
  })

  // The same regression, checked against the REAL shipped COST_SAMPLES rather
  // than a hand-copied list — so a future edit that drops the pinned off-peak
  // in/out (falling back to the catalog's peak rate) fails here.
  it('shipped COST_SAMPLES: DeepSeek off-peak is pinned below peak', () => {
    const off = COST_SAMPLES.find((s) => s.label.includes('off-peak'))
    const peak = COST_SAMPLES.find((s) => s.label.includes('(peak)'))
    expect(off, 'off-peak sample exists').toBeDefined()
    expect(peak, 'peak sample exists').toBeDefined()
    // Both tiers must be pinned — an unpinned sample inherits the catalog
    // price, which for this model is the PEAK rate.
    expect(off!.in, 'off-peak input is pinned').toBe(0.15)
    expect(off!.out, 'off-peak output is pinned').toBe(0.6)
    expect(peak!.in).toBe(0.3)
    expect(peak!.out).toBe(1.2)
    expect(off!.in!).toBeLessThan(peak!.in!)
  })
})
