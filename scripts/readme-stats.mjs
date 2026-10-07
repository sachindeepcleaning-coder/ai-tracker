#!/usr/bin/env node
/**
 * Rewrites the marked stats block in README.md from the CSV + data.json.
 *
 *   node scripts/readme-stats.mjs
 *
 * Replaces everything between <!-- STATS:START --> and <!-- STATS:END -->
 * with: header (Verified <data-as-of>), model count, open-weight count,
 * dated count, and Last Update date — all derived, never hardcoded.
 * Run in CI before build (see .github/workflows/deploy.yml).
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const CSV_PATH = join(root, 'coding_benchmarks.csv')
const DATA_PATH = join(root, 'frontend/src/data.json')
const README_PATH = join(root, 'README.md')

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++ } else inQuotes = false
      } else cell += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(cell); cell = ''
    } else if (c === '\n') {
      row.push(cell); cell = ''
      if (row.some((v) => v.trim() !== '')) rows.push(row)
      row = []
    } else if (c !== '\r') {
      cell += c
    }
  }
  row.push(cell)
  if (row.some((v) => v.trim() !== '')) rows.push(row)
  return rows
}

const rows = parseCsv(readFileSync(CSV_PATH, 'utf8'))
const header = rows[0]
const idx = (name) => header.findIndex((h) => h.trim() === name)
const data = rows.slice(1).filter((r) => !String(r[0] ?? '').trim().startsWith('#'))
const li = idx('License/Type')
const lv = idx('Last Verified')

const total = data.length
const open = data.filter((r) => /open weight|mit|apache|openmdw|openrail|osi/i.test(r[li] ?? '') && !/^(closed|proprietary|unknown)/i.test((r[li] ?? '').trim())).length
const verified = data.map((r) => (r[lv] ?? '').trim()).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()
const asOf = verified[verified.length - 1]
const d = new Date(asOf + 'T00:00:00Z')
const full = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

let dated = null
try {
  const dj = JSON.parse(readFileSync(DATA_PATH, 'utf8'))
  dated = dj.all_coding_models.filter((m) => m.released).length
} catch { /* data.json may not exist yet */ }

const block = `# AI Knowledge Base — India Local & Private AI (Verified ${full})

**Scope:** Open-weight coding models for local/private deployment in India — models, benchmarks, pricing, hardware, and cost to serve. **${total} models** (CSV ranks 1-${total}, single source of truth), **${open} open-weight**, ${dated == null ? 'release dates in data.json' : `**${dated} with release dates`} — data as of **${full}**. All file prices use **₹95.12/USD** (standardized Aug 14, 2026). All benchmark scores are **vendor-reported** unless marked \`AA\` / \`Scale\` / \`BenchLM\` independent. **Last Update: ${full}.**`

const readme = readFileSync(README_PATH, 'utf8')
const start = '<!-- STATS:START -->'
const end = '<!-- STATS:END -->'
const si = readme.indexOf(start)
const ei = readme.indexOf(end)
if (si === -1 || ei === -1 || ei < si) {
  console.error('readme-stats: STATS markers not found in README.md')
  process.exit(1)
}
writeFileSync(README_PATH, readme.slice(0, si + start.length) + '\n' + block + '\n' + readme.slice(ei))
console.log(`readme-stats: ${total} models, ${open} open, dated ${dated}, as of ${asOf}`)
