import { describe, it, expect, beforeAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import GapAnalysis from '../GapAnalysis.jsx'

function renderGap() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => {
    root.render(<GapAnalysis />)
  })
  return {
    container,
    unmount: () => { act(() => root.unmount()); container.remove() },
  }
}

describe('GapAnalysis — open vs closed research page', () => {
  beforeAll(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true
  })

  it('renders headlines, per-task gap table and decision guide', () => {
    const { container, unmount } = renderGap()
    try {
      const text = container.textContent
      expect(text).toContain('How far behind is open?')
      expect(text).toContain('~4 months')
      expect(text).toContain('General intelligence')
      expect(text).toContain('MiMo-V2.6-Pro')
      expect(text).toContain('Claude Opus 5.5')
      expect(text).toContain('Long-context reasoning')
      expect(text).toContain('open +1')
      expect(text).toContain('Where open already won')
      expect(text).toContain('Where the gap holds')
      expect(text).toContain('Router / hybrid')
    } finally {
      unmount()
    }
  })

  it('links all five sources', () => {
    const { container, unmount } = renderGap()
    try {
      const links = [...container.querySelectorAll('a[href^="http"]')].map((a) => a.getAttribute('href'))
      expect(links).toContain('https://whatllm.org/blog/open-source-vs-proprietary-llms-2026')
      expect(links).toContain('https://olympiatech.com/analysis/closing-the-gap-open-weight-llms')
      expect(links.length).toBeGreaterThanOrEqual(5)
    } finally {
      unmount()
    }
  })
})
