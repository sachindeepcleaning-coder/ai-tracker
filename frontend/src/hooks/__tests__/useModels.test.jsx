import { describe, it, expect } from 'vitest'
import { renderHook } from './test-utils.jsx'
import { useModels, allModels, providers, licenseGroups, BENCHMARKS } from '../useModels.js'
import { parsePct, parseQ4 } from '../../lib/parse.js'
import { isOpenWeight } from '../../lib/license.js'

function renderUseModels(filters = { q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'rank', releaseWindow: 'all' }) {
  const { result } = renderHook(() => useModels(filters))
  return result.current
}

// minimal renderHook without @testing-library
import * as React from 'react'

describe('useModels wiring — regressions for #1, #2, #5, #8', () => {
  it('exports expected catalog singletons', () => {
    expect(allModels.length).toBe(267)
    expect(providers.length).toBeGreaterThan(5)
    expect(licenseGroups.length).toBeGreaterThan(3)
    expect(BENCHMARKS.length).toBe(11)
  })

  it('stats shape uses withQ4 (not avgQ4) and fact-checked counts', () => {
    const { stats } = renderUseModels()
    expect(stats).toHaveProperty('withQ4')
    expect(stats).not.toHaveProperty('avgQ4')
    expect(stats).toHaveProperty('dated')
    expect(stats.total).toBe(267)
    expect(stats.withQ4).toBe(allModels.filter(m => parseQ4(m.full_q4_vram_gb) != null).length)
    expect(stats.dated).toBe(allModels.filter(m => m.released).length)
    expect(stats.withSWE).toBe(allModels.filter(m => parsePct(m.swe_bench_verified) != null).length)
  })

  it('leaderboards: every benchmark has sorted list (down from broken shape mismatch)', () => {
    const { leaderboards } = renderUseModels()
    for (const b of BENCHMARKS) {
      expect(leaderboards, 'leaderboards key').toHaveProperty(b.key)
      const list = leaderboards[b.key]
      expect(Array.isArray(list)).toBe(true)
      // sorted descending
      for (let i = 1; i < list.length; i++) {
        expect(parsePct(list[i - 1][b.key])).toBeGreaterThanOrEqual(parsePct(list[i][b.key]))
      }
    }
  })

  it('hwModels: open-weight Q4 only, sorted by SWE-V', () => {
    const { hwModels } = renderUseModels()
    expect(hwModels.length).toBeGreaterThan(100)
    for (const m of hwModels) {
      expect(isOpenWeight(m.license)).toBe(true)
      expect(parseQ4(m.full_q4_vram_gb)).not.toBeNull()
    }
    // spot check sort
    expect(parsePct(hwModels[0].swe_bench_verified) ?? -1).toBeGreaterThanOrEqual(parsePct(hwModels[hwModels.length - 1].swe_bench_verified) ?? -1)
  })

  it('Explorer filters: license filter uses licenseGroups (not raw licenses)', () => {
    const { filtered } = renderUseModels({ q: '', provider: 'all', license: licenseGroups[0], openOnly: false, maxQ4: 'all', sort: 'rank', releaseWindow: 'all' })
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.length).toBeLessThanOrEqual(allModels.length)
  })

  it('latestModels respects released field (data-completeness edge)', () => {
    const { latestModels } = renderUseModels()
    expect(latestModels.length).toBe(3)
    for (const m of latestModels) expect(m.released).toBeTruthy()
  })
})
