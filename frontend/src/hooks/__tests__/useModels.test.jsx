import { describe, it, expect } from 'vitest'
import { renderHook } from './test-utils.jsx'
import { useModels, compare, allModels, providers, licenseGroups, BENCHMARKS } from '../useModels.js'
import { parsePct, parseQ4, isValidRelease } from '../../lib/parse.js'
import { isOpenWeight } from '../../lib/license.js'

function renderUseModels(filters = { q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'rank', releaseWindow: 'all' }) {
  const { result } = renderHook(() => useModels(filters))
  return result.current
}

// minimal renderHook without @testing-library
import * as React from 'react'

describe('useModels wiring — regressions for #1, #2, #5, #8', () => {
  it('exports expected catalog singletons', () => {
    expect(allModels.length).toBe(268)
    expect(providers.length).toBeGreaterThan(5)
    expect(licenseGroups.length).toBeGreaterThan(3)
    expect(BENCHMARKS.length).toBe(11)
  })

  it('stats shape uses withQ4 (not avgQ4) and fact-checked counts', () => {
    const { stats } = renderUseModels()
    expect(stats).toHaveProperty('withQ4')
    expect(stats).not.toHaveProperty('avgQ4')
    expect(stats).toHaveProperty('dated')
    expect(stats.total).toBe(268)
    expect(stats.withQ4).toBe(allModels.filter(m => parseQ4(m.full_q4_vram_gb) != null).length)
    // dated counts valid releases only — future/invalid dates never inflate it
    expect(stats.dated).toBe(allModels.filter(m => isValidRelease(m.released)).length)
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
    expect(latestModels.length).toBe(4)
    for (const m of latestModels) expect(isValidRelease(m.released)).toBe(true)
  })

  it('latest sort: real recent dates first, invalid/future/missing sink (rank tiebreak)', () => {
    // Real September releases must beat the previously-broken future/invalid dates.
    const swe2 = { model: 'SWE-2', rank: '265', released: '2026-09-15' }
    const flash = { model: 'DeepSeek V4.1 Flash', rank: '256', released: '2026-09-10' }
    expect(compare(swe2, flash, 'latest')).toBeLessThan(0)
    const future = { model: 'Gemini 3.7 Flash', rank: '99', released: '2026-12-31' }
    const invalid = { model: 'Gemini 3.1 Pro', rank: '98', released: '2026-10-66' }
    const missing = { model: 'No Date', rank: '1', released: null }
    for (const bad of [future, invalid, missing]) {
      expect(compare(flash, bad, 'latest')).toBeLessThan(0)
      expect(compare(bad, flash, 'latest')).toBeGreaterThan(0)
    }
    // Equal dates fall back to rank order.
    expect(compare({ rank: '265', released: '2026-09-15' }, { rank: '266', released: '2026-09-15' }, 'latest')).toBeLessThan(0)
  })

  it('release windows never treat future/invalid dates as recent', () => {
    for (const window of ['7', '30', '90', 'dated']) {
      const { filtered } = renderUseModels({ q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest', releaseWindow: window })
      for (const m of filtered) expect(isValidRelease(m.released)).toBe(true)
    }
  })

  it('bestFit: dynamic best open-weight ≤32GB by SWE-V (not hardcoded Qwen 27B)', async () => {
    const { bestFit } = renderUseModels()
    expect(bestFit).not.toBeNull()
    const { parseQ4, parsePct } = await import('../../lib/parse.js')
    const { isOpenWeight } = await import('../../lib/license.js')
    expect(isOpenWeight(bestFit.license)).toBe(true)
    expect(parseQ4(bestFit.full_q4_vram_gb)).toBeLessThanOrEqual(32)
    // must be the best SWE-V among ≤32GB open-weight candidates
    const bestSwe = allModels
      .filter((m) => isOpenWeight(m.license) && (parseQ4(m.full_q4_vram_gb) ?? Infinity) <= 32)
      .map((m) => parsePct(m.swe_bench_verified) ?? -1)
      .sort((a, b) => b - a)[0]
    expect(parsePct(bestFit.swe_bench_verified) ?? -1).toBe(bestSwe)
  })
})
