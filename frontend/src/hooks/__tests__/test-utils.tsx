import * as React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react'

export function renderHook<T>(fn: () => T) {
  const result: { current: T | undefined } = { current: undefined }
  let root: Root
  let container: HTMLDivElement
  function Comp() {
    result.current = fn()
    return null
  }
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => { root.render(<Comp />) })
  return {
    result,
    unmount() { act(() => root.unmount()); container.remove() }
  }
}
