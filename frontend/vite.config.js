import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * `base` MUST stay in sync with the GitHub Pages project-site path
 * (https://sachindeepcleaning-coder.github.io/ai-tracker/).
 * All root-relative asset references in index.html use %BASE_URL% so the
 * favicon/asset URLs resolve under /ai-tracker/ after the build.
 */

/**
 * Injects model count + data-as-of date (from src/data.json, written by
 * regen-data.mjs) into index.html at build time, so the title/meta never
 * carry hardcoded counts or dates.
 */
function siteMetaPlugin() {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const here = dirname(fileURLToPath(import.meta.url))
      const meta = JSON.parse(readFileSync(join(here, 'src/data.json'), 'utf8'))
      const count = meta.model_count ?? meta.all_coding_models?.length ?? 0
      const asOf = meta.data_as_of ?? ''
      const d = new Date(asOf + 'T00:00:00Z')
      const monthYear = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
      const full = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
      const out = html
        .replaceAll('%MODEL_COUNT%', String(count))
        .replaceAll('%DATA_MONTH_YEAR%', monthYear)
        .replaceAll('%DATA_AS_OF_FULL%', full)
      if (/%MODEL_COUNT%|%DATA_MONTH_YEAR%|%DATA_AS_OF_FULL%/.test(out)) {
        throw new Error('site-meta: unreplaced placeholder in index.html')
      }
      return out
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMetaPlugin()],
  base: '/ai-tracker/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
})
