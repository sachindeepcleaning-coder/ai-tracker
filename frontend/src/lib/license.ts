/**
 * License classification.
 * The catalog stores free-text license cells, so these are deliberate
 * string heuristics mapped to a small set of badge variants.
 */

const OPEN_HINTS = [
  'open',
  'apache',
  'qwen community',
  'qwen license',
  'openmdw',
  'custom (open weights',
  'kimi k3 license',
  'researchrail',
  'openrail',
  'llama community',
]
const OPEN_HINT_RES = [/\bmit\b/]

const CLOSED_HINTS = [
  'closed',
  'proprietary',
  'api-only',
  'api-tier',
  'api (closed)',
  'non-public',
  'unknown',
  'tbd',
  'gated',
]

/** Heuristic: does this license allow public/open model weights? */
export function isOpenWeight(lic) {
  const l = String(lic || '').toLowerCase().trim()
  if (!l) return false
  if (l === 'tbd' || l.startsWith('tbd ')) return false
  if (CLOSED_HINTS.some((h) => l.includes(h))) return false
  if (l.includes('llama') && l.includes('community')) return true
  if (OPEN_HINTS.some((h) => l.includes(h))) return true
  return OPEN_HINT_RES.some((re) => re.test(l))
}

/** Returns { label, cls } Tailwind classes for a license badge. */
export function licenseBadge(lic) {
  const l = String(lic || '').toLowerCase()
  if (!isOpenWeight(lic)) {
    if (l.includes('api-only') || (l.includes('proprietary') && (l.includes('available') || l.includes('preview') || l.includes('ga')))) {
      return { label: 'API-only', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' }
    }
    if (l.includes('closed') || l.includes('proprietary') || l.includes('gated') || l.includes('api (closed)')) {
      return { label: 'Closed', cls: 'bg-zinc-500/15 text-zinc-400 border-white/10' }
    }
    return { label: lic, cls: 'bg-white/5 text-zinc-300 border-white/10' }
  }
  if (l.includes('apache')) return { label: 'Apache 2.0', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' }
  if (/\bmit\b/.test(l)) return { label: 'MIT', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' }
  if (l.includes('qwen community')) return { label: 'Qwen Comm 1.0', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('qwen license')) return { label: 'Qwen (open)', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('kimi k3 license')) return { label: 'Kimi (open)', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('llama') && l.includes('community')) return { label: 'Llama Comm', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' }
  if (l.includes('researchrail')) return { label: 'Research RAIL', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('openrail')) return { label: 'OpenRAIL', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('custom (open weights')) return { label: 'Open (custom)', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  if (l.includes('openmdw')) return { label: 'OpenMDW-1.1', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
  return { label: 'Open', cls: 'bg-violet-500/15 text-violet-400 border-violet-500/30' }
}