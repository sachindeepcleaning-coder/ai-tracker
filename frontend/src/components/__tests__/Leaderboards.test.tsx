import { describe, it, expect, beforeAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import Leaderboards, { frontierNote } from '../Leaderboards.jsx'
import { allModels } from '../../hooks/useModels.js'
import { parsePct } from '../../lib/parse.js'
import { isOpenWeight } from '../../lib/license.js'
import type { Model } from '../../lib/types'

/**
 * The "Note: harness matters" paragraph used to hardcode one snapshot of the
 * frontier ("TB 2.1 tight 88.3≈88.2≈87.9", "best open 38.7% vs proprietary
 * 59.1%"). Those numbers stopped matching any row in the catalog and nothing
 * caught it. It is now derived from the same sorted leaderboard lists the
 * boards render — this test proves the claims track the data.
 */
describe('Leaderboards — derived frontier note', () => {
  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  /** Build the same leaderboard map the component receives. */
  function buildLeaderboards() {
    const keys = ['terminal_bench', 'swe_bench_pro', 'livecodebench_v6']
    const out: Record<string, Model[]> = {}
    for (const k of keys) {
      out[k] = allModels
        .filter((m) => parsePct(m[k as keyof Model] as string | null) != null)
        .sort((a, b) => (parsePct(b[k as keyof Model] as string | null) ?? -1) - (parsePct(a[k as keyof Model] as string | null) ?? -1))
    }
    return out
  }

  /** Pull "<score> <model>" pairs out of a chain segment. */
  function pairs(segment: string): { score: number; model: string }[] {
    return segment
      .split('>')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        // Drop the trailing sentence that follows the last leader.
        const cut = s.split('. Scores from different harnesses')[0]
        const m = cut.match(/^(\d+\.\d)\s+(.*)$/)
        return m ? { score: parseFloat(m[1]), model: m[2].trim() } : null
      })
      .filter((p): p is { score: number; model: string } => p !== null)
  }

  /**
   * The note has two sentences:
   *   1. "Current leaders ... : TB 2.1 <chain> · DeepSWE <chain> · LCB <chain>."
   *   2. "Best open-weight on each: TB 2.1 <chain> · DeepSWE <chain>."
   * Split on those known boundaries rather than on '·' (which also appears
   * BETWEEN the chains).
   */
  function chains(note: string): { overall: Record<string, string>; open: Record<string, string> } {
    const [first, second = ''] = note.split('Best open-weight on each:')
    const overall: Record<string, string> = {}
    for (const chunk of first.split('·')) {
      const m = chunk.match(/(TB 2\.1|DeepSWE|LCB)\s+(.*)$/)
      if (m) overall[m[1]] = m[2].replace(/\.\s*$/, '').trim()
    }
    const open: Record<string, string> = {}
    for (const chunk of second.split('·')) {
      const m = chunk.match(/(TB 2\.1|DeepSWE|LCB)\s+(.*)$/)
      if (m) open[m[1]] = m[2].replace(/\.\s*$/, '').trim()
    }
    return { overall, open }
  }

  it('quotes the CURRENT top-3 for TB 2.1, DeepSWE and LCB', () => {
    const lb = buildLeaderboards()
    const note = frontierNote(lb)
    expect(note).toContain(lb.terminal_bench[0].model)
    expect(note).toContain(lb.swe_bench_pro[0].model)
    expect(note).toContain(lb.livecodebench_v6[0].model)
  })

  it('quotes each score from that model own cell', () => {
    const lb = buildLeaderboards()
    const note = frontierNote(lb)
    const { overall } = chains(note)
    for (const [key, label] of [['terminal_bench', 'TB 2.1'], ['swe_bench_pro', 'DeepSWE'], ['livecodebench_v6', 'LCB']] as const) {
      const seg = overall[label] ?? ''
      const got = pairs(seg)
      expect(got.length, `"${label}" quotes 3 leaders`).toBe(3)
      const expected = lb[key].slice(0, 3)
      got.forEach((p, i) => {
        const row = allModels.find((m) => m.model === p.model)
        expect(row, `quoted model "${p.model}" exists in the catalog`).toBeDefined()
        // The quoted score must be that row's own score on the quoted board.
        expect(p.score, `quoted score for "${p.model}"`).toBeCloseTo(parsePct(row![key] as string | null)!, 1)
        // ...and it must be the row at that position on the board.
        expect(p.model, `position ${i} of the ${key} board`).toBe(expected[i].model)
      })
    }
  })

  it('the open-weight chains really are open-weight', () => {
    const lb = buildLeaderboards()
    const note = frontierNote(lb)
    const { open } = chains(note)
    for (const label of ['TB 2.1', 'DeepSWE']) {
      const got = pairs(open[label] ?? '')
      expect(got.length, `"${label}" quotes 3 open-weight leaders`).toBe(3)
      for (const p of got) {
        const row = allModels.find((m) => m.model === p.model)
        expect(row, `"${p.model}" exists`).toBeDefined()
        expect(isOpenWeight(row!.license), `"${p.model}" is classified open-weight`).toBe(true)
      }
    }
  })

  it('no longer quotes the retired hardcoded frontier numbers', () => {
    const note = frontierNote(buildLeaderboards())
    // These were frozen from an August snapshot and matched no row.
    expect(note).not.toContain('38.7')
    expect(note).not.toContain('66.9')
    // "59.1" was the retired proprietary figure; it is a real score for
    // Claude Sonnet 4.6 on TB 2.1, so assert the note does not quote THAT
    // model rather than the bare number.
    expect(note).not.toContain('Claude Sonnet 4.6')
  })

  it('renders the derived note in the page', () => {
    const lb = buildLeaderboards()
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    act(() => { root.render(<Leaderboards leaderboards={lb} />) })
    try {
      const text = container.textContent || ''
      expect(text).toContain('Note: harness matters')
      expect(text).toContain(frontierNote(lb))
    } finally {
      act(() => root.unmount())
      container.remove()
    }
  })
})
