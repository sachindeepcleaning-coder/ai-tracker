import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initSentry } from './lib/sentry'

// Sentry initializes off the critical path: idle callback (or 3s fallback)
// so error reporting never blocks first paint. The SDK itself is already a
// dynamic import inside initSentry.
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => initSentry(), { timeout: 3000 })
} else {
  setTimeout(initSentry, 0)
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('missing #root element')
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// PWA: offline after first load (cache-first assets, network-first navigation).
// Registered only in production builds; base is /ai-tracker/ on GitHub Pages.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {})
  })
}
