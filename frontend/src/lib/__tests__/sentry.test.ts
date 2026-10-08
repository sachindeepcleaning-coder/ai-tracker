import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as Sentry from '@sentry/react'
import { initSentry } from '../sentry.js'

vi.mock('@sentry/react', () => ({ init: vi.fn() }))

type InitOpts = {
  sendDefaultPii?: boolean
  beforeSend?: (event: unknown) => unknown
}

function lastInitOpts(): InitOpts {
  const calls = (Sentry.init as unknown as { mock: { calls: unknown[][] } }).mock.calls
  expect(calls.length).toBeGreaterThan(0)
  return calls[calls.length - 1][0] as InitOpts
}

describe('sentry privacy', () => {
  beforeEach(() => { vi.clearAllMocks(); vi.unstubAllEnvs() })
  afterEach(() => { vi.unstubAllEnvs() })

  it('does nothing without a DSN (no network, no import side effects)', async () => {
    vi.stubEnv('VITE_SENTRY_DSN', '')
    initSentry()
    await new Promise((r) => setTimeout(r, 20))
    expect(Sentry.init).not.toHaveBeenCalled()
  })

  it('inits with default PII off when a DSN is set', async () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://public@o0.ingest.sentry.io/0')
    initSentry()
    await vi.waitFor(() => expect(Sentry.init).toHaveBeenCalled())
    expect(lastInitOpts().sendDefaultPii).toBe(false)
  })

  it('beforeSend strips query strings and hashes from URLs', async () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://public@o0.ingest.sentry.io/0')
    initSentry()
    await vi.waitFor(() => expect(Sentry.init).toHaveBeenCalled())
    const { beforeSend } = lastInitOpts()
    expect(beforeSend).toBeTypeOf('function')
    const out = beforeSend!({
      request: { url: 'https://tracker/?token=abc#frag' },
      exception: { values: [{ stacktrace: { frames: [{ filename: 'https://cdn/x.js?h=1' }] } }] },
      breadcrumbs: [{ data: { url: 'https://tracker/p?email=me@x.com' } }],
    }) as {
      request: { url: string }
      exception: { values: [{ stacktrace: { frames: [{ filename: string }] } }] }
      breadcrumbs: [{ data: { url: string } }]
    }
    expect(out.request.url).toBe('https://tracker/')
    expect(out.exception.values[0].stacktrace.frames[0].filename).toBe('https://cdn/x.js')
    expect(out.breadcrumbs[0].data.url).toBe('https://tracker/p')
  })
})
