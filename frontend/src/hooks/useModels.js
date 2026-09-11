import { useMemo } from 'react'
import raw from '../data.json'
import { parsePct, parseQ4 } from '../lib/parse'
import { isOpenWeight } from '../lib/license'

/** Catalog singleton — 267 rows from data.json. */
export const allModels = raw.all_coding_models || raw

export const providers = [...new Set(allModels.map((m) => m.provider))].sort()
export const licenses = [...new Set(allModels.map((m) => m.license))].sort()

const NO_VALUE = -1

/** Sort keys offered in the Explorer dropdown (rank is CSV order, 1 = top frontier). */
export const SORT_OPTIONS = [
  { value: 'rank', label: 'Sort: Rank ↑' },
  { value: 'frontier', label: 'Sort: Frontier TB ↓' },
  { value: 'swev', label: 'Sort: SWE-V ↓' },
  { value: 'tb', label: 'Sort: Terminal-Bench ↓' },
  { value: 'lcb', label: 'Sort: LiveCodeBench ↓' },
  { value: 'q4', label: 'Sort: Q4 small→big' },
  { value: 'price_in', label: 'Sort: Cheapest in' },
]

function compare(a, b, sort) {
  switch (sort) {
    case 'rank':
      return parseInt(a.rank, 10) - parseInt(b.rank, 10)
    case 'frontier': {
      const tb = (parsePct(b.terminal_bench) ?? NO_VALUE) - (parsePct(a.terminal_bench) ?? NO_VALUE)
      return tb !== 0 ? tb : (parsePct(b.swe_bench_verified) ?? NO_VALUE) - (parsePct(a.swe_bench_verified) ?? NO_VALUE)
    }
    case 'swev':
      return (parsePct(b.swe_bench_verified) ?? NO_VALUE) - (parsePct(a.swe_bench_verified) ?? NO_VALUE)
    case 'tb':
      return (parsePct(b.terminal_bench) ?? NO_VALUE) - (parsePct(a.terminal_bench) ?? NO_VALUE)
    case 'lcb':
      return (parsePct(b.livecodebench_v6) ?? NO_VALUE) - (parsePct(a.livecodebench_v6) ?? NO_VALUE)
    case 'q4':
      return (parseQ4(a.full_q4_vram_gb) || 9999) - (parseQ4(b.full_q4_vram_gb) || 9999)
    case 'price_in':
      return (a.price_in_usd_per_mtok || 999) - (b.price_in_usd_per_mtok || 999)
    default:
      return 0
  }
}

/**
 * Single source of truth for derived catalog data:
 * summary stats, the filter/sort pipeline, leaderboards, and the
 * Hardware Fit matrix rows.
 */
export function useModels({ q, provider, license, openOnly, maxQ4, sort }) {
  const stats = useMemo(() => {
    const open = allModels.filter((m) => isOpenWeight(m.license)).length
    const withSWE = allModels.filter((m) => parsePct(m.swe_bench_verified) != null).length
    const withQ4 = allModels.filter((m) => parseQ4(m.full_q4_vram_gb) != null).length
    return { total: allModels.length, open, closed: allModels.length - open, withSWE, avgQ4: withQ4 }
  }, [])

  const filtered = useMemo(() => {
    let out = [...allModels]
    if (q) {
      const qq = q.toLowerCase()
      out = out.filter((m) => (m.model + ' ' + m.provider).toLowerCase().includes(qq))
    }
    if (provider !== 'all') out = out.filter((m) => m.provider === provider)
    if (license !== 'all') out = out.filter((m) => m.license === license)
    if (openOnly) out = out.filter((m) => isOpenWeight(m.license))
    if (maxQ4 !== 'all') {
      const lim = parseFloat(maxQ4)
      out = out.filter((m) => {
        const q4 = parseQ4(m.full_q4_vram_gb)
        return q4 != null && q4 <= lim
      })
    }
    out.sort((a, b) => compare(a, b, sort))
    return out
  }, [q, provider, license, openOnly, maxQ4, sort])

  const leaderboardTB = useMemo(
    () => allModels.filter((m) => parsePct(m.terminal_bench) != null).sort((a, b) => parsePct(b.terminal_bench) - parsePct(a.terminal_bench)).slice(0, 12),
    [],
  )
  const leaderboardSWE = useMemo(
    () => allModels.filter((m) => parsePct(m.swe_bench_verified) != null).sort((a, b) => parsePct(b.swe_bench_verified) - parsePct(a.swe_bench_verified)).slice(0, 12),
    [],
  )
  const leaderboardLCB = useMemo(
    () => allModels.filter((m) => parsePct(m.livecodebench_v6) != null).sort((a, b) => parsePct(b.livecodebench_v6) - parsePct(a.livecodebench_v6)).slice(0, 10),
    [],
  )

  // Hardware Fit matrix: top 30 by SWE-V that also have Q4 data (independent of Explorer filters)
  const hwModels = useMemo(
    () =>
      allModels
        .filter((m) => parseQ4(m.full_q4_vram_gb) != null && parsePct(m.swe_bench_verified) != null)
        .sort((a, b) => (parsePct(b.swe_bench_verified) ?? -1) - (parsePct(a.swe_bench_verified) ?? -1))
        .slice(0, 30),
    [],
  )

  return { stats, filtered, leaderboardTB, leaderboardSWE, leaderboardLCB, hwModels }
}