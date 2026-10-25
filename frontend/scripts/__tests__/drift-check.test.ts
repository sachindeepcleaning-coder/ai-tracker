import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalize, compareFile, GATED } from '../drift-check.mjs'

const here = dirname(fileURLToPath(import.meta.url))

let dir: string

/** Build a throwaway git repo with the given files, committed at HEAD. */
function makeRepo(files: Record<string, string>): string {
  const d = mkdtempSync(join(tmpdir(), 'drift-check-'))
  const g = (...args: string[]) => execFileSync('git', args, { cwd: d, encoding: 'utf8' })
  g('init', '-q')
  g('config', 'user.email', 'test@example.com')
  g('config', 'user.name', 'Test')
  for (const [p, content] of Object.entries(files)) {
    const abs = join(d, p)
    mkdirSync(dirname(abs), { recursive: true })
    writeFileSync(abs, content)
  }
  g('add', '-A')
  g('commit', '-q', '-m', 'init')
  return d
}

describe('drift-check.mjs', () => {
  beforeAll(() => { dir = mkdtempSync(join(tmpdir(), 'drift-check-run-')) })
  afterAll(() => { rmSync(dir, { recursive: true, force: true }) })

  it('normalizes ONLY the build-date stamp in data.json', () => {
    const a = JSON.stringify({ data_regen_at: '2026-10-20', model_count: 316, all_coding_models: [] })
    const b = JSON.stringify({ data_regen_at: '2026-10-21', model_count: 316, all_coding_models: [] })
    expect(normalize('frontend/src/data.json', a)).toBe(normalize('frontend/src/data.json', b))
  })

  it('still catches a real catalog change across different build days', () => {
    const a = JSON.stringify({ data_regen_at: '2026-10-20', model_count: 316 })
    const b = JSON.stringify({ data_regen_at: '2026-10-21', model_count: 317 })
    expect(normalize('frontend/src/data.json', a)).not.toBe(normalize('frontend/src/data.json', b))
  })

  it('normalizes the sw cache name but not the rest of the file', () => {
    const a = "// GENERATED\nself.SW_CACHE = 'ai-tracker-2026-10-20';\n"
    const b = "// GENERATED\nself.SW_CACHE = 'ai-tracker-2026-10-21';\n"
    expect(normalize('frontend/public/sw-version.js', a)).toBe(normalize('frontend/public/sw-version.js', b))
    const c = "// DIFFERENT\nself.SW_CACHE = 'ai-tracker-2026-10-21';\n"
    expect(normalize('frontend/public/sw-version.js', a)).not.toBe(normalize('frontend/public/sw-version.js', c))
  })

  it('does NOT normalize README.md (prose drift must fail)', () => {
    const a = '**316 models**'
    const b = '**302 models**'
    expect(normalize('README.md', a)).not.toBe(normalize('README.md', b))
  })

  it('compareFile flags drift and passes matching content', () => {
    const same = 'hello'
    expect(compareFile('/repo', 'README.md', same, same)).toBeNull()
    expect(compareFile('/repo', 'README.md', same, 'different')).toMatch(/differs/)
    expect(compareFile('/repo', 'README.md', null, same)).toMatch(/HEAD/)
    expect(compareFile('/repo', 'README.md', same, null)).toMatch(/missing/)
  })

  it('gates every generated file the pipeline writes', () => {
    // The gate must cover each artifact regen-data.mjs / readme-stats.mjs write.
    for (const p of [
      'README.md',
      'frontend/src/data.json',
      'frontend/public/data.json',
      'frontend/public/notes.json',
      'frontend/public/sw-version.js',
      'frontend/public/sitemap.xml',
      'frontend/src/lib/fx.generated.ts',
    ]) {
      expect(GATED, `gate covers ${p}`).toContain(p)
    }
  })

  it('exits 0 when only the build day differs, and 1 on real drift', () => {
    const files: Record<string, string> = {}
    for (const p of GATED) files[p] = `content of ${p}\n`
    const d = makeRepo(files)

    // Same content, different build day in the two stamped files.
    const stamped = JSON.stringify({ data_regen_at: '2026-10-20', model_count: 1 })
    writeFileSync(join(d, 'frontend/src/data.json'), stamped)
    writeFileSync(join(d, 'frontend/public/data.json'), stamped)
    // notes.json is slug-keyed JSON: valid content, unchanged across the day.
    writeFileSync(join(d, 'frontend/public/notes.json'), '{"m-1":"full note"}\n')
    writeFileSync(join(d, 'frontend/public/sw-version.js'), "self.SW_CACHE = 'ai-tracker-2026-10-20';\n")
    execFileSync('git', ['add', '-A'], { cwd: d })
    execFileSync('git', ['commit', '-q', '-m', 'stamp'], { cwd: d })

    // Next-day regen: stamps move, catalog does not.
    const nextStamped = JSON.stringify({ data_regen_at: '2026-10-21', model_count: 1 })
    writeFileSync(join(d, 'frontend/src/data.json'), nextStamped)
    writeFileSync(join(d, 'frontend/public/data.json'), nextStamped)
    writeFileSync(join(d, 'frontend/public/sw-version.js'), "self.SW_CACHE = 'ai-tracker-2026-10-21';\n")

    const script = join(here, '../drift-check.mjs')
    const run = () => {
      try {
        return { code: 0, out: execFileSync('node', [script, '--repo', d], { encoding: 'utf8' }) }
      } catch (e) {
        const err = e as { status?: number; stdout?: string; stderr?: string }
        return { code: err.status ?? 99, out: `${err.stdout ?? ''}${err.stderr ?? ''}` }
      }
    }

    const same = run()
    expect(same.code, `next-day stamp must not fail the gate: ${same.out}`).toBe(0)

    // Real drift: change the catalog contents.
    writeFileSync(join(d, 'frontend/src/data.json'), JSON.stringify({ data_regen_at: '2026-10-21', model_count: 2 }))
    const drifted = run()
    expect(drifted.code, `real drift must fail the gate: ${drifted.out}`).toBe(1)
    expect(drifted.out).toContain('frontend/src/data.json')

    rmSync(d, { recursive: true, force: true })
  })

})

/**
 * End-to-end: reproduce the CI scenario that used to break the deploy.
 *
 * A mini-repo is laid out exactly like the real one (CSV + scripts + the
 * committed generated files), committed at HEAD, then regenerated with the
 * clock shifted a day forward — the same thing that happens when CI runs on
 * any day other than the commit day. The gate must PASS, because only the
 * build-date stamp moved. Then a real catalog change must FAIL it.
 */
describe('drift-check end-to-end (next-day CI regen of the real catalog)', () => {
  const REAL = join(here, '..', '..', '..')
  const REGEN = join(here, '../regen-data.mjs')
  const STATS = join(REAL, 'scripts/readme-stats.mjs')
  const DRIFT = join(here, '../drift-check.mjs')

  /** Shift the clock forward one day (the "CI runs tomorrow" case). */
  const CLOCK_SHIM = join(
    mkdtempSync(join(tmpdir(), 'drift-clock-')),
    'clock.cjs',
  )
  beforeAll(() => {
    writeFileSync(
      CLOCK_SHIM,
      'const R=Date;const O=864e5;class D extends R{constructor(...a){super(...(a.length?a:[R.now()+O]))}static now(){return R.now()+O}}\nglobalThis.Date=D;\n',
    )
  })

  it('passes a next-day regen but fails a real catalog change', () => {
    const d = mkdtempSync(join(tmpdir(), 'drift-e2e-'))
    const g = (...args: string[]) => execFileSync('git', args, { cwd: d, encoding: 'utf8' })
    g('init', '-q')
    g('config', 'user.email', 'test@example.com')
    g('config', 'user.name', 'Test')

    // Lay out the mini-repo.
    mkdirSync(join(d, 'scripts'), { recursive: true })
    mkdirSync(join(d, 'frontend/scripts'), { recursive: true })
    mkdirSync(join(d, 'frontend/src/lib'), { recursive: true })
    mkdirSync(join(d, 'frontend/public'), { recursive: true })
    writeFileSync(join(d, 'coding_benchmarks.csv'), readFileSync(join(REAL, 'coding_benchmarks.csv')))
    writeFileSync(join(d, 'scripts/readme-stats.mjs'), readFileSync(STATS))
    writeFileSync(join(d, 'frontend/scripts/fx.json'), readFileSync(join(REAL, 'frontend/scripts/fx.json')))
    // Curation source + the committed generated files, straight from HEAD.
    for (const p of GATED) {
      let content: string
      try {
        content = execFileSync('git', ['show', `HEAD:${p}`], { cwd: REAL, encoding: 'utf8' })
      } catch {
        // A generated artifact not yet in HEAD (e.g. notes.json on the run
        // that introduces it): seed the mini-repo from the working tree.
        content = readFileSync(join(REAL, p), 'utf8')
      }
      const abs = join(d, p)
      mkdirSync(dirname(abs), { recursive: true })
      writeFileSync(abs, content)
    }
    g('add', '-A')
    g('commit', '-q', '-m', 'committed state')

    // Regenerate with tomorrow's clock — the exact CI failure scenario.
    const env = {
      ...process.env,
      NODE_OPTIONS: `--require ${CLOCK_SHIM}`,
      CSV_PATH: join(d, 'coding_benchmarks.csv'),
      OUT_PATH: join(d, 'frontend/src/data.json'),
      PUBLIC_OUT_PATH: join(d, 'frontend/public/data.json'),
      FX_OUT_PATH: join(d, 'frontend/src/lib/fx.generated.ts'),
    }
    execFileSync('node', [REGEN], { env, encoding: 'utf8' })
    // readme-stats.mjs resolves every path from its own location, and it sits
    // at <mini-repo>/scripts/ — so a plain invocation targets the mini-repo.
    execFileSync('node', [STATS], { encoding: 'utf8' })

    // The stamp MUST have moved — otherwise this test proves nothing.
    const sw = readFileSync(join(d, 'frontend/public/sw-version.js'), 'utf8')
    const committedSw = execFileSync('git', ['show', 'HEAD:frontend/public/sw-version.js'], { cwd: d, encoding: 'utf8' })
    expect(sw, 'build-day stamp moved between commit and next-day regen').not.toBe(committedSw)

    const run = () => {
      try {
        return { code: 0, out: execFileSync('node', [DRIFT, '--repo', d], { encoding: 'utf8' }) }
      } catch (e) {
        const err = e as { status?: number; stdout?: string; stderr?: string }
        return { code: err.status ?? 99, out: `${err.stdout ?? ''}${err.stderr ?? ''}` }
      }
    }

    const same = run()
    expect(same.code, `next-day regen of identical data must NOT fail the gate:\n${same.out}`).toBe(0)

    // Now a REAL catalog change: bump a model's score in the CSV and regen.
    const csv = readFileSync(join(d, 'coding_benchmarks.csv'), 'utf8').replace('95.5%', '96.5%')
    writeFileSync(join(d, 'coding_benchmarks.csv'), csv)
    execFileSync('node', [REGEN], { env: { ...env, NODE_OPTIONS: '' }, encoding: 'utf8' })
    const drifted = run()
    expect(drifted.code, `a real catalog change MUST fail the gate:\n${drifted.out}`).toBe(1)
    expect(drifted.out).toContain('frontend/src/data.json')

    rmSync(d, { recursive: true, force: true })
  }, 60_000)
})
