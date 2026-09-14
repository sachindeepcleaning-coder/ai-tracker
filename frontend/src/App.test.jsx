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

  it('renders KPI strip with total=267', () => {
    const text = container.textContent
    expect(text).toContain('267')
    expect(text).toContain('Total models')
  })
  it('shows data-completeness card (dated=30)', () => {
    const text = container.textContent
    expect(text).toContain('With release date')
    expect(text).toContain('30')
  })
  it('footer shows fact-check date', () => {
    const text = container.textContent
    expect(text).toContain('Fact-checked')
    expect(text).toContain('Sep 13')
  })
  it('skip-to-content link present', () => {
    expect(container.querySelector('a[href="#main"]')).not.toBeNull()
  })
})
