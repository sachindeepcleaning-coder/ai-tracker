import { describe, it, expect, beforeAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import HardwareFit from '../HardwareFit.jsx'
import { hardwareTiers } from '../../lib/hardware.js'

/** Three open-weight rows: one that only the big tiers hold, one mid, one tiny. */
const HW_MODELS = [
  { id: 'r1', model: 'Kimi K3', provider: 'Moonshot', license: 'Modified MIT', full_q4_vram_gb: '1200', swe_bench_verified: '82.0%', released: '2026-08-20', released_est: false },
  { id: 'r2', model: 'GLM-5.3', provider: 'Z.ai', license: 'MIT', full_q4_vram_gb: '372', swe_bench_verified: '80.1%', released: '2026-08-27', released_est: true },
  { id: 'r3', model: 'Qwen3.8-27B', provider: 'Alibaba', license: 'Apache 2.0', full_q4_vram_gb: '17', swe_bench_verified: '70.2%', released: '2026-08-10', released_est: false },
]

function renderFit(models) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(<HardwareFit hwModels={models} />) })
  return {
    container,
    clickButton: (text) => {
      const btn = [...container.querySelectorAll('button')].find((b) => b.textContent.includes(text))
      expect(btn, `button "${text}"`).toBeTruthy()
      act(() => { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
    },
    unmount: () => { act(() => root.unmount()); container.remove() },
  }
}

describe('HardwareFit — hardware tier matrix', () => {
  beforeAll(() => { global.IS_REACT_ACT_ENVIRONMENT = true })

  it('renders a column, pill and summary card for every tier', () => {
    const { container, unmount } = renderFit(HW_MODELS)
    try {
      const text = container.textContent
      // one <th> per tier + the sticky model column
      expect(container.querySelectorAll('thead th').length).toBe(hardwareTiers.length + 1)
      for (const t of hardwareTiers) {
        expect(text, `column header ${t.label}`).toContain(t.label)
        expect(text, `summary card for ${t.id}`).toContain(`${t.vram}GB VRAM/unified`)
      }
    } finally {
      unmount()
    }
  })

  it('includes the new 4× Pro 6000, Mac Studio M5 and Vera Rubin NVL72 tiers', () => {
    const { container, unmount } = renderFit(HW_MODELS)
    try {
      const text = container.textContent
      expect(text).toContain('4× Pro 6000 384GB')
      expect(text).toContain('1× Mac Studio M5 512GB')
      expect(text).toContain('4× Mac Studio M5 2TB')
      expect(text).toContain('Vera Rubin NVL72 20.7TB')
      // India landed prices surface in the matrix sub-headers
      expect(text).toContain('₹1.7-2.1Cr')
      expect(text).toContain('₹47-65Cr')
    } finally {
      unmount()
    }
  })

  it('narrows the matrix to the tiers that can hold a 372GB Q4 model', () => {
    const { container, clickButton, unmount } = renderFit(HW_MODELS)
    try {
      expect(container.querySelectorAll('tbody tr').length).toBe(3)

      // 1× Pro 6000 96GB cannot hold a 372GB Q4 (nor the 1200GB row) -> 1 of 3
      clickButton('1× Pro 6000 96GB')
      expect(container.textContent).toContain('1 of 3 models fit 1× Pro 6000 96GB')
      expect(container.querySelectorAll('tbody tr').length).toBe(1)

      // 4× Pro 6000 384GB holds 372GB (tight) + 17GB, drops the 1200GB row -> 2 of 3
      clickButton('4× Pro 6000 384GB')
      expect(container.textContent).toContain('2 of 3 models fit 4× Pro 6000 384GB')
      expect(container.querySelectorAll('tbody tr').length).toBe(2)

      // 20.7TB rack holds every row
      clickButton('Vera Rubin NVL72 20.7TB')
      expect(container.querySelectorAll('tbody tr').length).toBe(3)

      clickButton('All')
      expect(container.querySelectorAll('tbody tr').length).toBe(3)
    } finally {
      unmount()
    }
  })
})
