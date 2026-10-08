import { describe, it, expect, afterEach } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import App from './App.jsx'
import { resetCatalogForTests, ingestCatalogPayload } from './hooks/useModels.js'
import { getByTestId } from './test-queries.js'
import data from './data.json'

afterEach(() => {
  // Restore the full catalog for any later test in this file's registry.
  ingestCatalogPayload(data)
})

describe('App shell-first boot', () => {
  it('renders header + loading skeleton before the catalog lands, grid after', () => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    act(() => { resetCatalogForTests() })
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    try {
      act(() => { root.render(<App />) })
      // Shell paints immediately: brand header + skeleton, no KPIs or grid.
      expect(container.textContent).toContain('Local AI Coding Models')
      expect(getByTestId(container, 'catalog-loading')).not.toBeNull()
      expect(container.textContent).not.toContain('Total models')
      // Catalog lands: skeleton is replaced by the KPI strip + model grid.
      act(() => { ingestCatalogPayload(data) })
      expect(container.textContent).toContain('Total models')
      expect(container.querySelector('[data-testid="catalog-loading"]')).toBeNull()
    } finally {
      act(() => root.unmount())
      container.remove()
    }
  })
})
