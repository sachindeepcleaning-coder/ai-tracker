import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { DataQualityBadge } from '../DataQualityBadge.jsx'

function render(badge: React.ReactElement): { container: HTMLDivElement; unmount: () => void } {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(badge) })
  return { container, unmount: () => { act(() => root.unmount()); container.remove() } }
}

describe('DataQualityBadge (unverified must be visible, never color-alone)', () => {
  it('secondary source shows a prominent Unverified badge with text + label', () => {
    const { container, unmount } = render(<DataQualityBadge confidence="medium" source="secondary" />)
    try {
      const el = container.querySelector('[role="status"]')!
      expect(el.textContent).toContain('Unverified')
      expect(el.getAttribute('aria-label')).toMatch(/secondary/i)
      expect(el.className).toMatch(/red/)
    } finally { unmount() }
  })

  it('secondary wins over high confidence', () => {
    const { container, unmount } = render(<DataQualityBadge confidence="high" source="Secondary" />)
    try {
      expect(container.textContent).toContain('Unverified')
    } finally { unmount() }
  })

  it('low confidence keeps an explicit Low text label', () => {
    const { container, unmount } = render(<DataQualityBadge confidence="low" source="vendor" />)
    try {
      const el = container.querySelector('[role="status"]')!
      expect(el.textContent).toContain('Low')
      expect(el.getAttribute('aria-label')).toMatch(/low/i)
    } finally { unmount() }
  })

  it('medium/high keep their labels', () => {
    for (const c of ['medium', 'high']) {
      const { container, unmount } = render(<DataQualityBadge confidence={c} source="vendor" />)
      try {
        expect(container.textContent).toContain(c === 'medium' ? 'Medium' : 'High')
      } finally { unmount() }
    }
  })
})
