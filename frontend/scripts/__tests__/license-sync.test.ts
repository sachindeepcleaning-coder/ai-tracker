import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isOpenWeight } from '../../src/lib/license.js'
import data from '../../src/data.json'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = join(here, '..', '..', '..')

/** Minimal CSV parse (quote-aware; license cells contain commas). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false
  const t = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  for (let i = 0; i < t.length; i++) {
    const c = t[i]
    if (inQuotes) {
      if (c === '"') {
        if (t[i + 1] === '"') { cell += '"'; i++ } else inQuotes = false
      } else cell += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(cell); cell = '' }
    else if (c === '\n') {
      row.push(cell); cell = ''
      if (row.some((v) => v.trim() !== '')) rows.push(row)
      row = []
    } else if (c !== '\r') cell += c
  }
  row.push(cell)
  if (row.some((v) => v.trim() !== '')) rows.push(row)
  return rows
}

function readmeOpenCount(): number {
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
  const m = readme.match(/\*\*(\d+) open-weight\*\*/)
  expect(m, 'README STATS block open-weight count').not.toBeNull()
  return parseInt(m![1], 10)
}

describe('open-weight count sync (README vs site KPI)', () => {
  it('isOpenWeight over raw CSV licenses equals the README STATS number', () => {
    const rows = parseCsv(readFileSync(join(ROOT, 'coding_benchmarks.csv'), 'utf8'))
    const header = rows[0]
    const li = header.findIndex((h) => h.trim() === 'License/Type')
    expect(li).toBeGreaterThan(-1)
    const count = rows.slice(1)
      .filter((r) => !String(r[0] ?? '').trim().startsWith('#'))
      .filter((r) => isOpenWeight(r[li])).length
    expect(count).toBe(readmeOpenCount())
  })

  it('isOpenWeight over data.json licenses equals the README STATS number', () => {
    const models = (data.all_coding_models || []) as { license: unknown }[]
    expect(models.length).toBeGreaterThan(0)
    const count = models.filter((m) => isOpenWeight(m.license)).length
    expect(count).toBe(readmeOpenCount())
  })
})
