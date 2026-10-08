import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(here, '../regen-data.mjs')
const REPO = join(here, '..', '..', '..')

let dir: string

function run(csvPath: string): { exit: number; output: string } {
  const outPath = csvPath + '.out.json'
  try {
    const output = execFileSync('node', [SCRIPT], {
      env: { ...process.env, CSV_PATH: csvPath, OUT_PATH: outPath },
      encoding: 'utf8',
    })
    return { exit: 0, output }
  } catch (e: unknown) {
    const err = e as { status?: number; stdout?: string; stderr?: string }
    return { exit: err.status ?? 99, output: `${err.stdout ?? ''}${err.stderr ?? ''}` }
  }
}

describe('regen-data.mjs CSV gates (temp fixtures)', () => {
  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'regen-gates-'))
  })
  afterAll(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('strips a UTF-8 BOM and parses the file', () => {
    const src = `${REPO}/coding_benchmarks.csv`
    const dst = join(dir, 'bom.csv')
    writeFileSync(dst, '﻿' + readFileSync(src, 'utf8'))
    const r = run(dst)
    expect(r.exit).toBe(0)
  })

  it('fails naming an unknown header', () => {
    const dst = join(dir, 'unknown.csv')
    const text = readFileSync(`${REPO}/coding_benchmarks.csv`, 'utf8').replace('Notes,Is Orchestrator', 'Notes,Footnotes,Is Orchestrator')
    writeFileSync(dst, text)
    const r = run(dst)
    expect(r.exit).toBe(1)
    expect(r.output).toContain('unknown header "Footnotes"')
  })

  it('fails naming a duplicate header', () => {
    const dst = join(dir, 'dup.csv')
    const text = readFileSync(`${REPO}/coding_benchmarks.csv`, 'utf8').replace('Rank,Model,', 'Rank,Rank,')
    writeFileSync(dst, text)
    const r = run(dst)
    expect(r.exit).toBe(1)
    expect(r.output).toContain('duplicate header "Rank"')
  })

  it('accepts CRLF line endings', () => {
    const dst = join(dir, 'crlf.csv')
    writeFileSync(dst, readFileSync(`${REPO}/coding_benchmarks.csv`, 'utf8'))
    const r = run(dst)
    expect(r.exit).toBe(0)
  })

  it('accepts a quoted newline inside a cell', () => {
    const dst = join(dir, 'multiline.csv')
    const from = ',"Vendor-reported bench; check independent AA/Scale/BenchLM verification; composition'
    const to = ',"Vendor-reported bench; check independent\nAA/Scale/BenchLM verification; composition'
    const text = readFileSync(`${REPO}/coding_benchmarks.csv`, 'utf8').replace(from, to)
    expect(text).not.toBe(readFileSync(`${REPO}/coding_benchmarks.csv`, 'utf8'))
    const endFrom = 'not params x 0.5,false,alibaba-qwen3-8-flash-next'
    const endTo = 'not params x 0.5",false,alibaba-qwen3-8-flash-next'
    writeFileSync(dst, text.replace(endFrom, endTo))
    const r = run(dst)
    expect(r.exit).toBe(0)
  })
})
