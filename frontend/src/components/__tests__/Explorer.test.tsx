import { describe, it, expect, beforeAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import Explorer from '../Explorer.jsx'

/** Minimal catalog rows — just the fields the Explorer cards read. */
function makeModels(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: `m-${i}`,
    rank: i + 1,
    model: `Model ${i + 1}`,
    provider: 'Provider A',
    license: 'MIT',
    is_orchestrator: false,
    is_free: i % 5 === 0,
    confidence: 'high',
    released: '2026-09-10',
    released_est: false,
    notes: 'Planning estimate.',
    context_window: '128K',
    source: 'AA',
    last_verified: '2026-09-15',
    total_parameters: '100B',
    active_parameters: 'Unknown',
    swe_bench_verified: '80.5%',
    terminal_bench: '55.2%',
    livecodebench_v6: '70.1%',
    full_q4_vram_gb: '24',
    price_in_usd_per_mtok: 0.5,
    price_out_usd_per_mtok: 1.5,
  }))
}

const FILTERS = {
  q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest',
  releaseWindow: 'all', modelType: 'all', confidence: 'all', hideSparse: false, freeOnly: false,
}

/** Render Explorer with a fixed result set and hand back the DOM + cleanup. */
function renderExplorer(filtered) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => {
    root.render(
      <Explorer
        models={filtered}
        filtered={filtered}
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
  return {
    container,
    unmount: () => { act(() => root.unmount()); container.remove() },
  }
}

describe('Explorer grid layout (regression: 1-2 models per screen, needed scrolling)', () => {
  beforeAll(() => { global.IS_REACT_ACT_ENVIRONMENT = true })

  it('lays large result sets out as a multi-column grid, not one tall column', () => {
    const { container, unmount } = renderExplorer(makeModels(30))
    try {
      const list = container.querySelector('[role="list"]')
      expect(list, 'model list container').not.toBeNull()

      // Cards must be grouped into row containers, several per row.
      const firstCard = container.querySelector('article[role="listitem"]')
      expect(firstCard, 'first model card').not.toBeNull()
      const firstRow = firstCard.parentElement
      expect(firstRow.className, 'row uses the shared responsive grid').toContain('grid-cols-1')
      const cardsInFirstRow = firstRow.querySelectorAll('article[role="listitem"]').length
      expect(cardsInFirstRow, 'cards visible side-by-side in one row').toBeGreaterThan(1)

      // Every card still carries the compare toggle + benchmark cells.
      expect(container.textContent).toContain('Model 1')
      expect(container.textContent).toContain('SWE-V')
      expect(container.querySelectorAll('article[role="listitem"]').length).toBeGreaterThan(1)
    } finally {
      unmount()
    }
  })

  it('no longer wraps the list in a fixed-height nested scroll pane', () => {
    const { container, unmount } = renderExplorer(makeModels(30))
    try {
      const list = container.querySelector('[role="list"]')
      expect(list.getAttribute('style'), 'list has no fixed height').toBeNull()
      expect(list.className).not.toContain('overflow-auto')
      expect(container.querySelector('[style*="70vh"]')).toBeNull()
    } finally {
      unmount()
    }
  })

  it('renders every card for small result sets in the same responsive grid', () => {
    const { container, unmount } = renderExplorer(makeModels(6))
    try {
      const list = container.querySelector('[role="list"]')
      expect(list.className).toContain('grid-cols-1')
      expect(list.className).toContain('lg:grid-cols-3')
      expect(list.querySelectorAll('article[role="listitem"]').length).toBe(6)
    } finally {
      unmount()
    }
  })

  it('renders the empty state when filters exclude everything', () => {
    const { container, unmount } = renderExplorer([])
    try {
      expect(container.textContent).toContain('No models match your filters')
    } finally {
      unmount()
    }
  })
})
