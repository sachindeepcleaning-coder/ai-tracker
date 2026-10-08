import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import data from '../../src/data.json'

const here = dirname(fileURLToPath(import.meta.url))
const FRONTEND = join(here, '..', '..')
const PUBLIC = join(FRONTEND, 'public')
const SITE = 'https://sachindeepcleaning-coder.github.io/ai-tracker'

/** PNG IHDR dimensions without image deps (magic + width/height fields). */
function pngSize(buf: Buffer): { w: number; h: number } {
  const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  expect(buf.subarray(0, 8).equals(magic), 'og.png must be a real PNG').toBe(true)
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
}

describe('SEO assets (og image, canonical, robots, sitemap)', () => {
  it('og.png exists at 1200x630 for social crawlers', () => {
    const p = join(PUBLIC, 'og.png')
    expect(existsSync(p), 'public/og.png committed').toBe(true)
    const { w, h } = pngSize(readFileSync(p))
    expect(w).toBe(1200)
    expect(h).toBe(630)
  })

  it('index.html has canonical + absolute og.png tags (no SVG preview)', () => {
    const html = readFileSync(join(FRONTEND, 'index.html'), 'utf8')
    expect(html).toContain(`<link rel="canonical" href="${SITE}/" />`)
    expect(html).toContain(`<meta property="og:image" content="${SITE}/og.png" />`)
    expect(html).toContain(`<meta name="twitter:image" content="${SITE}/og.png" />`)
    expect(html).not.toContain('icons.svg" />\n    <meta name="twitter:card"')
  })

  it('robots.txt allows crawling and points at the sitemap', () => {
    const robots = readFileSync(join(PUBLIC, 'robots.txt'), 'utf8')
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`)
  })

  it('sitemap.xml lastmod equals data_as_of (never the build date)', () => {
    const sitemap = readFileSync(join(PUBLIC, 'sitemap.xml'), 'utf8')
    const asOf = (data as { data_as_of: string }).data_as_of
    expect(sitemap).toContain(`<loc>${SITE}/</loc>`)
    expect(sitemap).toContain(`<lastmod>${asOf}</lastmod>`)
  })
})
