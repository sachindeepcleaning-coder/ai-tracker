import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import DetailModal from '../DetailModal.jsx'
import data from '../../data.json'
import type { Model } from '../../lib/types'

const models = (data.all_coding_models || []) as Model[]
const KEYS = ['swe_bench_verified', 'swe_bench_pro', 'livecodebench_v6', 'terminal_bench',
  'humaneval', 'mmlu_pro', 'gpqa_diamond', 'hle', 'math', 'aime_2026', 'arc_agi_2'] as const

describe('DetailModal full-catalog modal audit', () => {
  it('every model renders values-where-present, empty-state otherwise', () => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    const mismatches: string[] = []
    let scored = 0
    let empty = 0
    for (const m of models) {
      const hasAny = KEYS.some((k) => m[k] != null && m[k] !== '')
      const container = document.createElement('div')
      document.body.appendChild(container)
      const root = createRoot(container)
      act(() => { root.render(<DetailModal detail={m} onClose={() => {}} onToggleCompare={() => {}} inCompare={false} />) })
      try {
        const text = container.textContent ?? ''
        const showsEmpty = container.querySelector('[data-testid="no-benches"]') !== null
        if (hasAny) {
          scored++
          if (showsEmpty) mismatches.push(`${m.rank} ${m.model}: has values but shows empty-state`)
          for (const k of KEYS) {
            const v = m[k]
            if (v != null && v !== '' && !text.includes(String(v))) {
              mismatches.push(`${m.rank} ${m.model}: value ${String(v).slice(0, 30)} missing from modal`)
            }
          }
        } else {
          empty++
          if (!showsEmpty) mismatches.push(`${m.rank} ${m.model}: scoreless but no empty-state`)
        }
      } finally {
        act(() => root.unmount())
        container.remove()
      }
    }
    console.log(`AUDIT: ${models.length} models, ${scored} scored, ${empty} empty`)
    expect(mismatches, 'modal/data mismatches').toEqual([])
    // Renders every catalog row (344+) one at a time; the default 30s suite
    // timeout is too tight once the catalog grows or the suite runs in
    // parallel, so this audit gets its own budget.
  }, 120_000)
})
