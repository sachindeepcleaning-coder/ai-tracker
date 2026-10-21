import { describe, it, expect, beforeAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import Explorer from '../Explorer.jsx'
import { allModels } from '../../hooks/useModels.js'
import { getByTestId } from '../../test-queries.js'
import type { Model } from '../../lib/types'

/**
 * Regression: a model card showed three fixed benchmark cells (SWE-V /
 * TB 2.1 / LCB V6) with dashes for every model whose scores live in other
 * columns — and an all-dash wall for models with no published scores at all,
 * which reads as "broken" rather than "not published yet".
 *
 * The card must show the scores the model actually has, and say so plainly
 * when it has none.
 */
const FILTERS = {
  q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest',
  releaseWindow: 'all', modelType: 'all', confidence: 'all', hideSparse: false, freeOnly: false,
}

function renderExplorer(rows: Model[]) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => {
    root.render(
      <Explorer
        models={rows}
        filtered={rows}
        providers={[]}
        licenseGroups={[]}
        filters={FILTERS}
        setFilters={() => {}}
        showFilters={false}
        setShowFilters={() => {}}
        compare={[]}
        compareModels={[]}
        toggleCompare={() => {}}
        onClearCompare={() => {}}
        onDetail={() => {}}
        onViewCompare={() => {}}
      />
    )
  })
  return { container, unmount: () => { act(() => root.unmount()); container.remove() } }
}

function card(container: HTMLElement, name: string): HTMLElement {
  const all = [...container.querySelectorAll('[data-testid="model-card"]')] as HTMLElement[]
  const hit = all.find((c) => c.textContent?.includes(name))
  if (!hit) throw new Error(`card not found: ${name}`)
  return hit
}

describe('Explorer card — benchmark visibility', () => {
  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true })

  it('shows a headline score when the model has one (regression guard)', () => {
    const dory = allModels.find((m) => m.rank === '316')!
    const { container, unmount } = renderExplorer([dory])
    try {
      const c = card(container, 'Dory')
      expect(c.textContent).toContain('61.8')
      expect(c.textContent).toContain('22.2')
    } finally { unmount() }
  })

  it('shows scores that live outside the 3 headline columns (StarCoder 3: HumanEval only)', () => {
    const star = allModels.find((m) => m.rank === '55')!
    expect(star.swe_bench_verified ?? null).toBeNull()
    expect(star.humaneval).toBeTruthy()
    const { container, unmount } = renderExplorer([star])
    try {
      const c = card(container, 'StarCoder 3')
      expect(c.textContent).toContain(star.humaneval!)
      expect(c.textContent).not.toContain('No published benchmark scores')
    } finally { unmount() }
  })

  it('lists non-headline scores as "also scored" (Dory: GPQA + HLE)', () => {
    const dory = allModels.find((m) => m.rank === '316')!
    const { container, unmount } = renderExplorer([dory])
    try {
      const c = card(container, 'Dory')
      expect(c.textContent).toContain('GPQA')
      expect(c.textContent).toContain('72.41')
      expect(c.textContent).toContain('HLE')
    } finally { unmount() }
  })

  it('says "no published benchmark scores" instead of a wall of dashes', () => {
    const wonder = allModels.find((m) => m.rank === '308')! // Muse Wonder: no coding scores published
    const { container, unmount } = renderExplorer([wonder])
    try {
      const c = card(container, 'Muse Wonder')
      expect(getByTestId(c, 'no-card-benches').textContent).toMatch(/no published benchmark scores/i)
      // No empty benchmark cells left behind.
      expect(c.querySelectorAll('[data-testid="bench-cell"]').length).toBe(0)
    } finally { unmount() }
  })

  // A RANGE cell ("76.4-85.0%") must be shown verbatim: parsing it as a
  // number produced "-85.0%" (the regex took the second half as a negative).
  it('shows a range value verbatim, never a truncated or negative number', () => {
    const muse = allModels.find((m) => m.rank === '313')! // Muse Spark Open: TB 76.4-85.0%
    expect(muse.terminal_bench).toMatch(/\d+(\.\d+)?-\d+(\.\d+)?%/)
    const { container, unmount } = renderExplorer([muse])
    try {
      const c = card(container, 'Muse Spark Open')
      const cells = [...c.querySelectorAll('[data-testid="bench-cell"]')]
      const shown = cells.map((x) => (x.children[1]?.textContent ?? '').trim())
      expect(shown).toContain(muse.terminal_bench!) // verbatim
      // No cell may display a bare negative score.
      for (const s of shown) expect(s, 'a cell shows a negative score').not.toMatch(/^-\d/)
    } finally { unmount() }
  })

  // A cell that names a DIFFERENT benchmark than its column (a DeepSWE score
  // filed under ARC-AGI-2) must show that name — without the "vendor"
  // qualifier leaking into the label.
  it('labels a cell by the benchmark it actually holds, without qualifiers', () => {
    const flash = allModels.find((m) => m.rank === '256')! // DeepSeek V4.1 Flash
    const arc = flash.arc_agi_2
    expect(arc, 'fixture has a DeepSWE score in the ARC column').toMatch(/DeepSWE/)
    const { container, unmount } = renderExplorer([flash])
    try {
      const c = card(container, 'DeepSeek V4.1 Flash')
      expect(c.textContent).toContain('DeepSWE v1.1')
      expect(c.textContent).not.toContain('DeepSWE v1.1 vendor')
    } finally { unmount() }
  })
})
