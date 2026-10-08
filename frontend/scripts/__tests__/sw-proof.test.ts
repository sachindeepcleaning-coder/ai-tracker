import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from '../../src/data.json'

const here = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(here, '..', '..', 'public')

/**
 * Proof for the SW caching strategy (see public/sw.js header):
 * build-id cache name + network-first catalog fetch. If someone edits sw.js
 * back to a static cache name or cache-first data.json, this fails.
 */
describe('service worker cache strategy proof', () => {
  it('sw-version.js pins the cache name to the data_regen_at build id', () => {
    const version = readFileSync(join(PUBLIC, 'sw-version.js'), 'utf8')
    const regenAt = (data as { data_regen_at: string }).data_regen_at
    expect(regenAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(version).toContain(`ai-tracker-${regenAt}`)
    expect(version).toMatch(/self\.SW_CACHE\s*=/)
  })

  it('sw.js consumes the generated cache name (no static cache)', () => {
    const sw = readFileSync(join(PUBLIC, 'sw.js'), 'utf8')
    expect(sw).toContain(`importScripts('./sw-version.js')`)
    expect(sw).toContain('self.SW_CACHE')
    expect(sw).not.toMatch(/const CACHE = 'ai-tracker-v\d+'/)
  })

  it('sw.js fetches data.json network-first with a cache fallback', () => {
    const sw = readFileSync(join(PUBLIC, 'sw.js'), 'utf8')
    const branch = sw.slice(sw.indexOf('/data.json'))
    expect(sw).toContain('/data.json')
    // Network attempt first, cache put on success, cache match on failure.
    expect(branch).toContain('fetch(req)')
    expect(branch).toContain('caches.match(req)')
  })
})
