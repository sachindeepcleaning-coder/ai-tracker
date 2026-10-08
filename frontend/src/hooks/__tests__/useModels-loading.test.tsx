import { describe, it, expect, afterEach } from 'vitest'
import { act } from 'react'
import { renderHook } from './test-utils.jsx'
import {
  useModels, resetCatalogForTests, ingestCatalogPayload, subscribeCatalog, allModels,
} from '../useModels.js'
import type { ModelFilters } from '../useModels.js'
import data from '../../data.json'

const FILTERS: ModelFilters = {
  q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest',
  releaseWindow: 'all', modelType: 'all', confidence: 'all', hideSparse: false, freeOnly: false,
}

function renderModels() {
  const { result, unmount } = renderHook(() => useModels(FILTERS))
  const get = () => result.current as NonNullable<typeof result.current>
  return { get, unmount }
}

afterEach(() => {
  // Restore the full catalog: no test may leave the shared store drained.
  ingestCatalogPayload(data)
})

describe('useModels shell-first loading', () => {
  it('starts unready with empty results after a store reset', () => {
    act(() => { resetCatalogForTests() })
    const h = renderModels()
    try {
      expect(h.get().ready).toBe(false)
      expect(h.get().filtered).toEqual([])
      expect(h.get().stats.total).toBe(0)
    } finally { h.unmount() }
  })

  it('ingesting the payload flips ready and recomputes memos', () => {
    act(() => { resetCatalogForTests() })
    const h = renderModels()
    try {
      expect(h.get().ready).toBe(false)
      act(() => { ingestCatalogPayload(data) })
      expect(h.get().ready).toBe(true)
      expect(h.get().filtered.length).toBeGreaterThan(0)
      expect(h.get().stats.total).toBe((data as { model_count: number }).model_count)
    } finally { h.unmount() }
  })

  it('notifies subscribers on publish', () => {
    let calls = 0
    const unsub = subscribeCatalog(() => { calls += 1 })
    try {
      ingestCatalogPayload(data)
      expect(calls).toBe(1)
    } finally { unsub() }
  })

  it('rejects invalid payloads without mutating state', () => {
    const before = allModels.length
    expect(() => ingestCatalogPayload({ all_coding_models: [] })).toThrow()
    expect(allModels.length).toBe(before)
  })
})
