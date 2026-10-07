declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}
export {}
globalThis.IS_REACT_ACT_ENVIRONMENT = true
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}
// recharts ResponsiveContainer requires ResizeObserver (missing in jsdom)
if (typeof (globalThis as Record<string, unknown>).ResizeObserver === 'undefined') {
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
