import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initSentry } from './lib/sentry'

initSentry()

createRoot(document.getElementById('root')).render(
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
