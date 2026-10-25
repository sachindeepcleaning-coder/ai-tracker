#!/usr/bin/env node
/**
 * Drift gate: the COMMITTED generated files must match what `npm run data`
 * produces from the CSV.
 *
 * Replaces the raw `git diff --exit-code` that CI used to run. That form was
 * date-blind: `data_regen_at` and the sw-version.js cache name embed the
 * build day, so a CI run on any day other than the commit day regenerated a
 * different byte string and failed the gate — even when the catalog itself
 * was byte-identical. Every deploy has to be re-run same-day, and a queued
 * or re-run workflow fails for a reason that has nothing to do with the data.
 *
 * This gate compares the same files with ONE rule: the build-date stamp is
 * normalized away, everything else must match exactly. A hand-edited
 * data.json, a stale README, or a CSV change that was never regenerated all
 * still fail — the gate keeps its teeth, it just stops reading the calendar.
 *
 * Usage: node scripts/drift-check.mjs [--repo <path>]
 * Exit:  0 = no drift, 1 = drift (each differing file named).
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

/** Gated paths, relative to the repo root. */
export const GATED = [
  'README.md',
  'frontend/README.md',
  'frontend/src/data.json',
  'frontend/public/data.json',
  'frontend/public/notes.json',
  'frontend/public/sw-version.js',
  'frontend/public/sitemap.xml',
  'frontend/src/lib/fx.generated.ts',
]

/** JSON with object keys sorted, so key ORDER never registers as drift. */
function stableStringify(v) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v)
  if (Array.isArray(v)) return '[' + v.map(stableStringify).join(',') + ']'
  return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + stableStringify(v[k])).join(',') + '}'
}

/**
 * Strip the build-date stamp so two regens of the SAME data compare equal.
 * Only the stamp is normalized — every other field is compared verbatim.
 */
export function normalize(path, text) {
  if (path.endsWith('data.json')) {
    const obj = JSON.parse(text)
    delete obj.data_regen_at
    return stableStringify(obj)
  }
  if (path.endsWith('notes.json')) {
    // Slug-keyed map: key order never registers as drift, values verbatim.
    return stableStringify(JSON.parse(text))
  }
  if (path.endsWith('sw-version.js')) {
    return text.replace(/ai-tracker-\d{4}-\d{2}-\d{2}/g, 'ai-tracker-<BUILD_ID>')
  }
  return text
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8' })
}

/**
 * Compare one gated file: committed (HEAD) vs working tree.
 * Returns null when they agree, or a human-readable reason when they differ.
 */
export function compareFile(repoRoot, path, committed, working) {
  if (committed == null) return 'not present in HEAD (uncommitted new file)'
  if (working == null) return 'missing from the working tree'
  let a, b
  try {
    a = normalize(path, committed)
    b = normalize(path, working)
  } catch (e) {
    return `unparseable: ${e.message}`
  }
  if (a === b) return null
  if (path.endsWith('data.json')) return 'catalog content differs'
  return 'content differs'
}

export function runDriftCheck(repoRoot) {
  const drift = []
  for (const path of GATED) {
    let committed = null
    try {
      committed = git(['show', `HEAD:${path}`], repoRoot)
    } catch {
      committed = null // not in HEAD (or no HEAD) — handled by compareFile
    }
    const abs = join(repoRoot, path)
    const working = existsSync(abs) ? readFileSync(abs, 'utf8') : null
    const reason = compareFile(repoRoot, path, committed, working)
    if (reason) drift.push({ path, reason })
  }
  return drift
}

function resolveRepoRoot() {
  const i = process.argv.indexOf('--repo')
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1]
  return git(['rev-parse', '--show-toplevel'], process.cwd()).trim()
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const repoRoot = resolveRepoRoot()
  const drift = runDriftCheck(repoRoot)
  if (drift.length) {
    console.error(`drift-check: ${drift.length} generated file(s) differ from HEAD:`)
    for (const d of drift) console.error(`  ${d.path}: ${d.reason}`)
    console.error('drift-check: run `npm run data` and commit the result')
    process.exit(1)
  }
  console.log(`drift-check: ${GATED.length} generated files match HEAD (build-date stamp normalized)`)
}
