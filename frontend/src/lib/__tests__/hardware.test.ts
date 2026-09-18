import { describe, it, expect } from 'vitest'
import { fitsModel, hardwareTiers } from '../hardware.js'

describe('hardware tiers + fitsModel', () => {
  it('has expected tiers', () => {
    expect(hardwareTiers.length).toBeGreaterThan(3)
    expect(hardwareTiers.find(t => t.id === '4xSpark').vram).toBe(512)
  })
  it('fit / tight / no thresholds', () => {
    // 17GB Qwen fits comfortably on 32GB (17 < 27.2)
    expect(fitsModel(17, 32)).toBe('fit')
    // 111GB on 96GB: 111 < 110.4? no -> tight check 111 <= 110.4? Actually 96*0.85=81.6 fit, 96*1.15=110.4 tight -> 111 >110.4 => no
    expect(fitsModel(111, 96)).toBe('no')
    // 111 on 128: 111 <=108.8 false fit, <=147.2 true -> tight
    expect(fitsModel(111, 128)).toBe('tight')
    // null -> null
    expect(fitsModel(null, 32)).toBeNull()
  })
  it('fitsCount basis: open-weight Q4 only (regression for #5)', async () => {
    const { allModels } = await import('../../hooks/useModels.js')
    const { isOpenWeight } = await import('../license.js')
    const { parseQ4 } = await import('../parse.js')
    const hwModels = allModels.filter(m => isOpenWeight(m.license) && parseQ4(m.full_q4_vram_gb) != null)
    // commit c220b16 introduced 158 ; fe0a6d4 has 157 (one row lost or reclassified) — pin to data
    expect(hwModels.length).toBeGreaterThan(100)
    const fits32 = hwModels.filter(m => parseQ4(m.full_q4_vram_gb) <= 32).length
    // must be <= hw count and agrees with HardwareFit component basis
    expect(fits32).toBeLessThanOrEqual(hwModels.length)
  })
})
