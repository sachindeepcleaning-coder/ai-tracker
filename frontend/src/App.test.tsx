import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import App from './App.jsx'
import dataMeta from './data.json'
import { fmtDateFull } from './lib/parse.js'

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

  it('renders KPI strip with total=models in data.json', () => {
    const text = container.textContent
    expect(text).toContain(String(dataMeta.model_count))
    expect(text).toContain('Total models')
  })
  it('shows data-completeness card matching data.json dated count', () => {
    const text = container.textContent
    expect(text).toContain('With release date')
    const dated = dataMeta.all_coding_models.filter((m) => m.released).length
    expect(text).toContain(String(dated))
  })
  it('footer shows data-as-of date from data.json', () => {
    const text = container.textContent
    expect(text).toContain('Data as of')
    expect(text).toContain(fmtDateFull(dataMeta.data_as_of))
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
