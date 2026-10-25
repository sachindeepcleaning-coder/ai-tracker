import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(here, '../regen-data.mjs')
const REPO = join(here, '..', '..', '..')

/**
 * Notes payload contract: the full provenance text moves OUT of the catalog
 * payload (every row only keeps a <=140-char excerpt plus a precomputed
 * `indep` flag) into a deferred notes.json keyed by slug, fetched on demand
 * by the detail modal. These gates run the real CSV through the generator
 * into a temp tree and pin the split.
 */
describe('regen-data.mjs notes split (temp fixtures)', () => {
  let dir: string
  let outPath: string
  let publicPath: string
  let notesPath: string
  let payload: { all_coding_models: Record<string, unknown>[] }
  let notesIndex: Record<string, string>

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), 'regen-notes-'))
    outPath = join(dir, 'out.json')
    publicPath = join(dir, 'public.json')
    notesPath = join(dir, 'notes.json')
    const output = execFileSync('node', [SCRIPT], {
      env: {
        ...process.env,
        CSV_PATH: join(REPO, 'coding_benchmarks.csv'),
        OUT_PATH: outPath,
        PUBLIC_OUT_PATH: publicPath,
        // No curated data.json to merge: fresh run, like CI's first regen.
        OUT_PATH_EMPTY: '1',
      },
      encoding: 'utf8',
    })
    expect(output).toContain('regen-data: wrote')
    payload = JSON.parse(readFileSync(outPath, 'utf8'))
    notesIndex = JSON.parse(readFileSync(notesPath, 'utf8'))
  })

  afterAll(() => {
    rmSync(dir, { recursive: true, force: true })
  })

  it('writes notes.json next to the public payload', () => {
    expect(existsSync(notesPath)).toBe(true)
  })

  it('payload rows carry no full notes — only an excerpt and an indep flag', () => {
    expect(payload.all_coding_models.length).toBeGreaterThan(300)
    for (const m of payload.all_coding_models) {
      expect(m, `${m.rank} ${m.model} must not ship full notes`).not.toHaveProperty('notes')
      expect(typeof m.indep, `${m.rank} ${m.model} indep must be boolean`).toBe('boolean')
      const ex = m.note_excerpt
      if (ex == null) continue
      expect(typeof ex, `${m.rank} ${m.model} note_excerpt type`).toBe('string')
      expect((ex as string).length, `${m.rank} ${m.model} excerpt too long`).toBeLessThanOrEqual(141)
    }
  })

  it('notes.json covers every row with a note, keyed by slug, with the full text', () => {
    const withNote = payload.all_coding_models.filter((m) => m.note_excerpt != null)
    expect(withNote.length, 'catalog rows with notes').toBeGreaterThan(80)
    expect(Object.keys(notesIndex).length).toBe(withNote.length)
    for (const m of withNote) {
      const full = notesIndex[m.slug as string]
      expect(full, `${m.slug} missing from notes.json`).toBeTruthy()
      const ex = m.note_excerpt as string
      if ((full as string).length > 140) {
        expect(ex.endsWith('…'), `${m.slug} truncated excerpt must end with ellipsis`).toBe(true)
        expect(full.startsWith(ex.slice(0, -1)), `${m.slug} excerpt must be a prefix of the full note`).toBe(true)
      } else {
        expect(ex).toBe(full)
      }
    }
  })

  it('indep flag matches the notes-based independent-score rule (parity)', () => {
    // The rule the runtime used to apply to notes, now frozen at build time.
    const INDEP_SOURCES = new Set(['artificial-analysis', 'aa', 'benchlm', 'scale', 'lmsys'])
    const INDEP_TEXT = /artificial-analysis|\baa\b|scale|benchlm|indep/i
    const PENDING_CLAUSE = /\b(check|tbd)\b/i
    let cited = 0
    let sourceOnly = 0
    for (const m of payload.all_coding_models) {
      const expected = INDEP_SOURCES.has(String(m.source ?? '').toLowerCase()) ||
        (() => {
          const notes = String(notesIndex[m.slug as string] ?? '')
          const substantive = notes.split(';').filter((c) => !PENDING_CLAUSE.test(c)).join('; ')
          return INDEP_TEXT.test(substantive)
        })()
      if (expected && !INDEP_SOURCES.has(String(m.source ?? '').toLowerCase())) cited++
      if (INDEP_SOURCES.has(String(m.source ?? '').toLowerCase())) sourceOnly++
      expect(m.indep, `${m.rank} ${m.model} indep flag drifted from the notes rule`).toBe(expected)
    }
    // Non-vacuous: both paths of the rule must be exercised by the catalog.
    expect(cited, 'rows citing an independent run in notes').toBeGreaterThan(0)
    expect(sourceOnly, 'rows with an independent source value').toBeGreaterThan(0)
  })
})
