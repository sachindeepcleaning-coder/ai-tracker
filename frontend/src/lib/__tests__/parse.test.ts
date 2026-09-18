import { describe, it, expect } from 'vitest'
import { parsePct, parseQ4, fmtDate, fmtDateFull, daysOld, scoreSource, isValidRelease, DATA_AS_OF, RELEASE_MONTH_END } from '../parse.js'

describe('parsePct', () => {
  it('prefers %-anchored number over year in annotated cells', () => {
    expect(parsePct('USAMO 2026: 99.8%')).toBe(99.8)
    expect(parsePct('MMLU Pro 2026: 88.1% (anno)')).toBe(88.1)
    expect(parsePct('93.4%')).toBe(93.4)
  })
  it('falls back to last number when no % sign (rare)', () => {
    // previously greedy on first number → 2026, now correctly 99.8
    expect(parsePct('USAMO 2026: 99.8')).toBe(99.8)
    expect(parsePct('84.3')).toBe(84.3)
    expect(parsePct('Score 12 vs 88.5')).toBe(88.5)
  })
  it('returns null for missing', () => {
    expect(parsePct(null)).toBeNull()
    expect(parsePct('-')).toBeNull()
    expect(parsePct('')).toBeNull()
    expect(parsePct('—')).toBeNull()
  })
  it('handles decimals', () => {
    expect(parsePct('88.30%')).toBe(88.3)
    expect(parsePct('100%')).toBe(100)
  })
})

describe('scoreSource', () => {
  it('detects vendor annotations', () => {
    expect(scoreSource('92.8% (TB2.1 vendor)')).toBe('vendor')
    expect(scoreSource('64.7% (SWE-Pro vendor; TB2.1 82% vendor)')).toBe('vendor')
    expect(scoreSource('50.0% (FrontierCode vendor)')).toBe('vendor')
  })
  it('detects aa / scale / benchlm', () => {
    expect(scoreSource('53.9 (AA)')).toBe('aa')
    expect(scoreSource('38.7% Scale std.')).toBe('scale')
    expect(scoreSource('61.2 BenchLM')).toBe('benchlm')
  })
  it('plain cells -> null', () => {
    expect(scoreSource('93.4%')).toBeNull()
    expect(scoreSource(null)).toBeNull()
    expect(scoreSource('-')).toBeNull()
  })
})

describe('parseQ4', () => {
  it('normalizes ~ and trim', () => {
    expect(parseQ4('~111 GB')).toBe(111)
    expect(parseQ4('17 GB')).toBe(17)
    expect(parseQ4(' 244GB ')).toBe(244)
    expect(parseQ4('~1400')).toBe(1400) // Kimi K3: GB units, tilde = approx
  })
  it('returns null for unknown', () => {
    expect(parseQ4(null)).toBeNull()
    expect(parseQ4('?')).toBeNull()
    expect(parseQ4('-')).toBeNull()
    expect(parseQ4('—')).toBeNull()
  })
})

describe('fmtDate / fmtDateFull / daysOld', () => {
  it('formats ISO dates in UTC', () => {
    expect(fmtDate('2026-09-10')).toBe('Sep 10')
    expect(fmtDateFull('2026-09-10')).toBe('Sep 10, 2026')
    expect(fmtDate('Sep 2026')).toBe('Sep 2026') // passthrough for coarse
  })
  it('daysOld against DATA_AS_OF', () => {
    expect(daysOld(DATA_AS_OF)).toBe(0)
    expect(daysOld('2026-09-10')).toBe(5)
    expect(daysOld(null)).toBe(Infinity)
    expect(daysOld('bad')).toBe(Infinity)
  })
  it('daysOld ignores invalid/future dates; within-month estimates clamp to 0', () => {
    expect(daysOld('2026-10-66')).toBe(Infinity) // invalid day can never be "recent"
    expect(daysOld('2026-12-31')).toBe(Infinity) // future pricing-window prose
    expect(daysOld('2026-10-15')).toBe(Infinity) // future month
    expect(daysOld('2026-09-15')).toBe(0) // within-month estimate, clamped
  })
})

describe('isValidRelease', () => {
  it('accepts real dated releases (exact + within-month estimates)', () => {
    expect(isValidRelease('2026-09-10')).toBe(true)
    expect(isValidRelease('2026-09-15')).toBe(true)
    expect(isValidRelease(DATA_AS_OF)).toBe(true)
    expect(isValidRelease(RELEASE_MONTH_END)).toBe(true)
  })
  it('rejects invalid, future, coarse, and missing dates', () => {
    expect(isValidRelease('2026-10-66')).toBe(false)
    expect(isValidRelease('2026-12-31')).toBe(false)
    expect(isValidRelease('2026-10-15')).toBe(false)
    expect(isValidRelease('Sep 2026')).toBe(false)
    expect(isValidRelease(null)).toBe(false)
    expect(isValidRelease('')).toBe(false)
  })
})
