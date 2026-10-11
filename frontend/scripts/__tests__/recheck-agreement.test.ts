import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setDataAnchor, recheckLine } from '../../src/lib/parse.js'
import siteConfig from '../../vite.config.js'
import data from '../../src/data.json'

const here = dirname(fileURLToPath(import.meta.url))
const FRONTEND = join(here, '..', '..')

type HtmlPlugin = { name: string; transformIndexHtml: (html: string) => string }

/**
 * The built <title>/meta/og tags and the UI helper must say the same date
 * line. This runs the REAL site-meta plugin from vite.config.js against the
 * real index.html and compares its output to parse.recheckLine() anchored on
 * the same src/data.json — if placeholders or formatting drift apart on
 * either side, this fails (no dist build required).
 */
describe('recheck line agreement (index.html + plugin vs UI helper)', () => {
  it('plugin output carries exactly what recheckLine() renders', () => {
    const dj = data as { data_as_of: string; model_count: number; rechecked_count: number }
    setDataAnchor(dj.data_as_of, dj.rechecked_count, dj.model_count)
    const expected = recheckLine()
    // Sanity: the line states the catalog date + rechecked/total counts.
    expect(expected).toContain('Data as of')
    expect(expected).toContain(`of ${dj.model_count} rows re-checked against primary sources that day`)

    const plugin = (siteConfig.plugins as unknown as HtmlPlugin[]).find((p) => p.name === 'site-meta')
    expect(plugin, 'site-meta plugin exists in vite.config.js').toBeDefined()
    const out = plugin!.transformIndexHtml(readFileSync(join(FRONTEND, 'index.html'), 'utf8'))
    const meta = out.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
    const og = out.match(/<meta property="og:description" content="([^"]*)"/)?.[1] ?? ''
    expect(meta, 'meta description carries the recheck line').toContain(expected)
    expect(og, 'og:description carries the recheck line').toContain(expected)
    expect(out, 'no unreplaced placeholders').not.toMatch(/%RECHECK_LINE%|%DATA_AS_OF_FULL%|%MODEL_COUNT%|%FX_RATE%|%DATA_MONTH_YEAR%/)
  })
})
