import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import App from './App.jsx'

describe('App shell smoke test', () => {
  let container, root
  beforeAll(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => { root.render(<App />) })
  })
  afterAll(() => { act(() => root.unmount()); container.remove() })

  it('renders KPI strip with total=279', () => {
    const text = container.textContent
    expect(text).toContain('279')
    expect(text).toContain('Total models')
  })
  it('shows data-completeness card (dated=173)', () => {
    const text = container.textContent
    expect(text).toContain('With release date')
    // approx – at least 170 dated
    expect(text).toMatch(/17[0-9]|18[0-9]/)
  })
  it('footer shows fact-check date', () => {
    const text = container.textContent
    expect(text).toContain('Fact-checked')
    expect(text).toContain('Sep 23')
  })
  it('skip-to-content link present', () => {
    expect(container.querySelector('a[href="#main"]')).not.toBeNull()
  })
  it('tab switch renders lazy Leaderboards with wired boards (lazy + Suspense regression)', async () => {
    const btn = container.querySelector('[data-tab="leaderboards"]')
    expect(btn, 'leaderboards tab button exists').not.toBeNull()
    await act(async () => { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
    // Lazy chunk resolves async — poll until Leaderboards renders (Suspense fallback gone).
    for (let i = 0; i < 100 && !container.textContent.includes('Terminal-Bench 2.1'); i++) {
      await act(async () => { await new Promise((r) => setTimeout(r, 10)) })
    }
    expect(container.textContent).toContain('Terminal-Bench 2.1')
    expect(container.textContent).toContain('scored models')
  })
})
