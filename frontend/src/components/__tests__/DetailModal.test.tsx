import { describe, it, expect, vi, afterEach } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import DetailModal from '../DetailModal.jsx'
import { getByTestId } from '../../test-queries.js'
import data from '../../data.json'
import type { Model } from '../../lib/types'

const models = (data.all_coding_models || []) as Model[]
const BENCH_KEYS = ['swe_bench_verified', 'swe_bench_pro', 'livecodebench_v6', 'terminal_bench',
  'humaneval', 'mmlu_pro', 'gpqa_diamond', 'hle', 'math', 'aime_2026', 'arc_agi_2'] as const
const empty = models.find((m) => BENCH_KEYS.every((k) => m[k] == null || m[k] === ''))!
const scored = models.find((m) => m.rank === '303')!
if (!empty || !scored) throw new Error('fixture rows missing from data.json')
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

describe('DetailModal provenance note (deferred notes.json)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches notes.json on open and renders the full provenance text', async () => {
    const fullNote = 'Full provenance paragraph: scores from huggingface.co/vendor/model, verified against primary sources; indep DeepSWE 69.0 (Datacurve).'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(
      JSON.stringify({ [scored.slug]: fullNote }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )))
    const { container, unmount } = render(scored)
    try {
      // The note arrives asynchronously after the first paint.
      await act(async () => { await Promise.resolve() })
      expect(container.textContent).toContain('Provenance')
      expect(container.textContent).toContain(fullNote)
      const calls = (fetch as ReturnType<typeof vi.fn>).mock.calls.map((c) => String(c[0]))
      expect(calls.some((u) => u.endsWith('/notes.json')), `expected a notes.json fetch, got ${calls.join(',')}`).toBe(true)
    } finally { unmount() }
  })

  it('renders without the note when the index lacks the slug (no crash, no undefined)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({}), { status: 200 })))
    const { container, unmount } = render(scored)
    try {
      await act(async () => { await Promise.resolve() })
      expect(container.textContent).not.toContain('undefined')
      expect(container.textContent).toContain('SWE-V')
    } finally { unmount() }
  })
})
