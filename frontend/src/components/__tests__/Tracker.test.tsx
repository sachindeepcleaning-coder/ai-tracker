import { describe, it, expect, beforeAll, vi } from 'vitest'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import Tracker from '../Tracker.jsx'

function renderTracker(props = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => {
    root.render(<Tracker {...props} />)
  })
  return {
    container,
    unmount: () => { act(() => root.unmount()); container.remove() },
  }
}

function clickTab(container, label) {
  const btn = [...container.querySelectorAll('[role="tab"]')].find((b) => b.textContent.includes(label))
  expect(btn, `tab "${label}"`).toBeTruthy()
  act(() => { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
}

function clickPill(container, label) {
  const btn = [...container.querySelectorAll('button')].find((b) => b.textContent.trim() === label)
  expect(btn, `pill "${label}"`).toBeTruthy()
  act(() => { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
}

describe('Tracker — llm-releases-style views', () => {
  beforeAll(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true
    window.history.replaceState(null, '', '/')
  })

  it('defaults to the Changelog feed with month groups and type pills', () => {
    const { container, unmount } = renderTracker()
    try {
      const text = container.textContent
      expect(text).toContain('Everything, in order')
      expect(text).toContain('September 2026')
      expect(text).toContain('August 2026')
      expect(text).toContain('July 2026')
      expect(text).toContain('Grok 4.7 goes GA after delay')
      // type pills carry live counts
      expect(text).toContain('Retired · 2')
      expect(text).not.toContain('Rumored releases')
    } finally {
      unmount()
    }
  })

  it('changelog type filter narrows to retired entries only', () => {
    const { container, unmount } = renderTracker()
    try {
      clickPill(container, 'Retired · 2')
      const text = container.textContent
      expect(text).toContain('V4 Flash + Vision-Exp retired')
      expect(text).toContain('MAI-Code-1-Flash retires from Copilot')
      expect(text).not.toContain('Grok 4.7 goes GA after delay')
    } finally {
      unmount()
    }
  })

  it('rank badge deep-links a changelog item to the model detail', () => {
    const onOpenModel = vi.fn()
    const { container, unmount } = renderTracker({ onOpenModel })
    try {
      const btn = [...container.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Rank #271')
      expect(btn, 'Rank #271 badge').toBeTruthy()
      act(() => { btn.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
      expect(onOpenModel).toHaveBeenCalledWith('rank-271')
    } finally {
      unmount()
    }
  })

  it('rumor watch shows sections, counts, and status filtering', () => {
    const { container, unmount } = renderTracker()
    try {
      clickTab(container, 'Rumor watch')
      let text = container.textContent
      expect(text).toContain('Rumor watch')
      expect(text).toContain('Announced or previewed')
      expect(text).toContain('Restricted or unavailable')
      expect(text).toContain('Rumored releases')
      expect(text).toContain('Mythos 5.1')
      expect(text).toContain('Grok 4.8')

      clickPill(container, 'Rumor · 12')
      text = container.textContent
      expect(text).toContain('Grok 4.8')
      expect(text).not.toContain('Mythos 5.1')
      expect(text).not.toContain('Announced or previewed')
    } finally {
      unmount()
    }
  })

  it('hydrates the rumors sub-view from ?tview=rumors', () => {
    window.history.replaceState(null, '', '/?tab=tracker&tview=rumors')
    const { container, unmount } = renderTracker()
    try {
      expect(container.textContent).toContain('Rumored releases')
      const active = container.querySelector('[role="tab"][aria-selected="true"]')
      expect(active.textContent).toContain('Rumor watch')
    } finally {
      unmount()
      window.history.replaceState(null, '', '/')
    }
  })

  it('highlights view keeps the tightness chart and pricing watch', () => {
    const { container, unmount } = renderTracker()
    try {
      clickTab(container, 'Highlights')
      const text = container.textContent
      expect(text).toContain('Frontier tightness')
      expect(text).toContain('What fits where')
      expect(text).toContain('pricing watch')
    } finally {
      unmount()
    }
  })
})
