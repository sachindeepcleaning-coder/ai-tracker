import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'

export function renderHook(fn) {
  let result = { current: undefined }
  let root, container
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
