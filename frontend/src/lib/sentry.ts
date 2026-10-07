export function initSentry() {
  const dsn = import.meta.env?.VITE_SENTRY_DSN
  if (!dsn) return
  // Lazy load Sentry to keep bundle lean when not configured
  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn,
      environment: import.meta.env?.MODE,
      tracesSampleRate: 0.1,
    })
  }).catch(() => {})
}
