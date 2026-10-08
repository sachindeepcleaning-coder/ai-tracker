#!/usr/bin/env node
/**
 * Measure-first perf loop: `npm run perf` (after `npm run build`).
 *
 * 1. Sizes every dist asset (raw + gzip), checks hard BUDGETS (fail on
 *    breach) — bundle regressions break the build, not the site.
 * 2. Boots `vite preview`, measures TTFB of the shell + data.json fetch
 *    (report-only: CI/local timing variance is not a gate).
 * 3. Compares against perf-baseline.json (warn on >15% growth; informational
 *    loop input, not a gate). Refresh deliberately: `npm run perf -- --record`.
 *
 * Every perf task starts by running this BEFORE changing code (baseline),
 * then again after (proof). No more "feels faster" commits.
 */
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { spawn } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const DIST = join(here, '../dist')
const BASELINE_PATH = join(here, 'perf-baseline.json')

// Gzip-KB budgets (blocking). Headroom ~30% over Oct 8 2026 measurements:
// entry 64KB, initial JS ~70KB, CSS 5KB, data.json 28KB.
const BUDGETS = [
  { id: 'entry-js-gz', maxKb: 90, desc: 'entry chunk (first paint JS)' },
  { id: 'initial-js-gz', maxKb: 100, desc: 'all non-lazy JS (entry + shared)' },
  { id: 'css-gz', maxKb: 10, desc: 'stylesheet' },
  { id: 'data-json-gz', maxKb: 40, desc: 'catalog payload over the wire' },
]

function kb(n) { return n / 1024 }

const failures = []
const notes = []
function check(id, valueKb) {
  const b = BUDGETS.find((x) => x.id === id)
  const ok = valueKb <= b.maxKb
  console.log(`perf: ${id} = ${valueKb.toFixed(1)}KB (budget ${b.maxKb}KB) ${ok ? 'OK' : 'BREACH'} — ${b.desc}`)
  if (!ok) failures.push(`${id} ${valueKb.toFixed(1)}KB > ${b.maxKb}KB`)
}

if (!existsSync(DIST)) {
  console.error('perf: dist/ missing — run `npm run build` first')
  process.exit(1)
}

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const entryMatch = html.match(/src="([^"]+\.js)"/)
if (!entryMatch) { console.error('perf: no entry script in dist/index.html'); process.exit(1) }
const entryFile = entryMatch[1].split('/').pop()

const assets = readdirSync(join(DIST, 'assets'))
const gzOf = (dir, f) => gzipSync(readFileSync(join(DIST, dir, f))).length
const entryGz = kb(gzOf('assets', entryFile))
// Initial JS = entry + small shared chunks; lazy tab chunks (Tracker,
// Leaderboards, Compare, recharts bits) load on demand and are report-only.
const lazyRe = /^(Tracker|Leaderboards|Compare|GapAnalysis|HardwareFit|CostCalc|BarChart|ScatterChart|DetailModal)-.*\.js$/
let initialGz = 0
const lazy = []
for (const f of assets) {
  if (!f.endsWith('.js')) continue
  const g = kb(gzOf('assets', f))
  if (f === entryFile || !lazyRe.test(f)) initialGz += g
  else lazy.push([f, g])
}
const cssGz = kb(gzOf('assets', assets.find((f) => f.endsWith('.css'))))
const dataGz = kb(gzipSync(readFileSync(join(DIST, 'data.json'))).length)

check('entry-js-gz', entryGz)
check('initial-js-gz', initialGz)
check('css-gz', cssGz)
check('data-json-gz', dataGz)
console.log(`perf: lazy chunks (on-demand, report-only): ${lazy.map(([f, g]) => `${f.split('-')[0]} ${g.toFixed(0)}KB`).join(', ')}`)

// Baseline loop: warn (don't fail) on >15% growth vs the committed baseline.
const current = { entryJsGzKb: +entryGz.toFixed(1), initialJsGzKb: +initialGz.toFixed(1), cssGzKb: +cssGz.toFixed(1), dataJsonGzKb: +dataGz.toFixed(1) }
if (process.argv.includes('--record')) {
  writeFileSync(BASELINE_PATH, JSON.stringify({ _comment: 'Committed perf baseline (gzip KB). Refresh deliberately via `npm run perf -- --record`.', ...current }, null, 2) + '\n')
  console.log('perf: baseline recorded')
} else if (existsSync(BASELINE_PATH)) {
  const base = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
  for (const [k, v] of Object.entries(current)) {
    const b = base[k]
    if (typeof b === 'number' && b > 0 && v > b * 1.15) {
      notes.push(`${k} grew ${b} -> ${v}KB (>15% vs baseline)`)
    }
  }
  if (notes.length) console.log(`perf: BASELINE WARN\n  ${notes.join('\n  ')}`)
  else console.log('perf: within baseline')
}

// Preview timing (report-only): shell TTFB + data.json fetch.
const PORT = 8937
const srv = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: join(here, '..'), stdio: 'ignore' })
try {
  let ready = false
  for (let i = 0; i < 30 && !ready; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/ai-tracker/`)
      ready = r.ok
    } catch { /* not up yet */ }
    if (!ready) await new Promise((r) => setTimeout(r, 500))
  }
  if (!ready) {
    console.log('perf: preview server did not start (timing skipped)')
  } else {
    for (const p of ['/ai-tracker/', '/ai-tracker/data.json']) {
      const t0 = Date.now()
      const r = await fetch(`http://localhost:${PORT}${p}`)
      await r.arrayBuffer()
      console.log(`perf: GET ${p} -> ${r.status} in ${Date.now() - t0}ms (report-only)`)
    }
  }
} finally {
  srv.kill()
}

if (failures.length) {
  console.error(`perf: BUDGET BREACH\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
console.log('perf: all budgets pass')
