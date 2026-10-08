export function initSentry() {
  const dsn = import.meta.env?.VITE_SENTRY_DSN
  if (!dsn) return
  // Lazy load Sentry to keep bundle lean when not configured
  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn,
      environment: import.meta.env?.MODE,
      tracesSampleRate: 0.1,
      // Privacy: never send default PII, and scrub query strings / hashes
      // from URLs (tokens, emails) before events leave the browser.
      sendDefaultPii: false,
      beforeSend(event) {
        const scrub = (u: string) => u.split('?')[0].split('#')[0]
        if (event.request?.url) event.request.url = scrub(event.request.url)
        for (const ex of event.exception?.values ?? []) {
          for (const f of ex.stacktrace?.frames ?? []) {
            if (f.filename) f.filename = scrub(f.filename)
          }
        }
        for (const b of event.breadcrumbs ?? []) {
          const u = (b.data as { url?: unknown } | undefined)?.url
          if (typeof u === 'string') (b.data as { url: string }).url = scrub(u)
        }
        return event
      },
    })
  }).catch(() => {})
}
