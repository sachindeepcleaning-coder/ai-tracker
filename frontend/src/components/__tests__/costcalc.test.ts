import { describe, it, expect } from 'vitest'
import { resolveSample } from '../CostCalc.jsx'
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

  it('rank-id objects no longer resolve (defensive: warns and falls back to 0)', () => {
    const warn = []
    const orig = console.warn
    console.warn = (m) => warn.push(m)
    const r = resolveSample({ id: 'rank-999', model: 'no-such-model-xyz', label: 'x', cache: 0 }, allModels)
    console.warn = orig
    expect(r.in).toBe(0)
    expect(warn.length).toBe(1)
  })

  it('uses catalog price unless overridden by sample in/out', () => {
    const rPeak = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'peak', in: 0.3, out: 1.2, cache: 0.006 }, allModels)
    expect(rPeak.in).toBe(0.3)
    expect(rPeak.out).toBe(1.2)
    const rOff = resolveSample({ model: 'DeepSeek V4.1 Flash', label: 'off', cache: 0.003 }, allModels)
    const catalog = allModels.find(m => m.model === 'DeepSeek V4.1 Flash')
    expect(rOff.in).toBe(catalog.price_in_usd_per_mtok)
  })
})
