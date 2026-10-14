import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import DetailModal from '../DetailModal.jsx'
import { getByTestId } from '../../test-queries.js'
import data from '../../data.json'
import type { Model } from '../../lib/types'

const models = (data.all_coding_models || []) as Model[]
const empty = models.find((m) => m.rank === '300')!
const scored = models.find((m) => m.rank === '303')!
if (!empty || !scored) throw new Error('fixture rows 300/303 missing from data.json')
if (scored.swe_bench_verified == null) throw new Error('row 303 should have bench values')

function render(detail: Model): { container: HTMLDivElement; unmount: () => void } {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(<DetailModal detail={detail} onClose={() => {}} onToggleCompare={() => {}} inCompare={false} />) })
  return { container, unmount: () => { act(() => root.unmount()); container.remove() } }
}

describe('DetailModal benchmark grid', () => {
  it('shows one honest empty-state instead of eleven dashes when scoreless', () => {
    const { container, unmount } = render(empty)
    try {
      expect(getByTestId(container, 'no-benches').textContent).toContain('No benchmark scores published yet')
      expect(container.textContent).not.toContain('SWE-V')
    } finally { unmount() }
  })

  it('renders real values when the model has benchmarks', () => {
    const { container, unmount } = render(scored)
    try {
      expect(container.textContent).toContain('SWE-V')
      expect(container.textContent).toContain(scored.swe_bench_verified!)
      expect(container.querySelector('[data-testid="no-benches"]')).toBeNull()
    } finally { unmount() }
  })
})
