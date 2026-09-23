/**
 * Rumor-watch data for the Tracker tab — mirrors llm-releases.com/rumored-releases.
 *
 * Taxonomy (same as llm-releases.com + tracker §0):
 * - announced: vendor-announced, not yet broadly available
 * - preview:   announced preview / held pending safety testing
 * - restricted: real but gated to vetted partners (cyber/defense tiers)
 * - rumored:   reports, exec comments, leaks — unconfirmed
 *
 * Rumors stay labeled until a primary source or public release confirms them.
 * Source: ai_model_tracker_aug29_2026.md §1 CONFIRMED UPCOMING + §6 WATCH LIST.
 */

export type WatchStatus = 'announced' | 'preview' | 'restricted' | 'rumored'

export interface WatchSource {
  label: string
  url?: string
}

export interface WatchItem {
  id: string
  name: string
  provider: string
  country: string // ISO code, rendered with a flag
  countryName: string
  status: WatchStatus
  /** ISO date of the signal, or null when undated speculation. */
  date: string | null
  access: string
  context: string | null
  params: string | null
  summary: string
  source: WatchSource
}

export const WATCH_STATUS_META: Record<WatchStatus, { label: string; cls: string; blurb: string }> = {
  announced: {
    label: 'Announced',
    cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    blurb: 'Vendor announcement or clear launch signal, but not yet a normal broadly available release.',
  },
  preview: {
    label: 'Preview',
    cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    blurb: 'Public preview or held pending additional safety testing.',
  },
  restricted: {
    label: 'Restricted',
    cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    blurb: 'Reported as real but gated, suspended, or limited to vetted partners rather than the broader public.',
  },
  rumored: {
    label: 'Rumor',
    cls: 'bg-zinc-500/15 text-zinc-300 border-white/10',
    blurb: 'Reports, executive comments, codenames, and launch-window claims not yet confirmed by a primary source.',
  },
}

const FLAG: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  KR: '🇰🇷',
  AE: '🇦🇪',
  FR: '🇫🇷',
  CA: '🇨🇦',
  JP: '🇯🇵',
  RU: '🇷🇺',
  ES: '🇪🇸',
}

export function flag(country: string): string {
  return FLAG[country] ?? '🌐'
}

export const WATCH_ITEMS: WatchItem[] = [
  // ---- Announced or previewed ----
  {
    id: 'hy4-full',
    name: 'Tencent Hy4 (full release)',
    provider: 'Tencent',
    country: 'CN',
    countryName: 'China',
    status: 'announced',
    date: '2026-08-28',
    access: 'Apache 2.0 (expected)',
    context: '1M+',
    params: '~770B / 49B active',
    summary:
      'Hy4 preview shipped Aug 28 (Apache 2.0, $0.834/$2.501). Tencent signals the next Hy4 batch soon with an official full release not far off — expected to add missing TB2.1 / AA Coding Index data.',
    source: { label: 'tencent.com Aug 28' },
  },
  {
    id: 'muse-spark-open',
    name: 'Muse Spark open weights',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    status: 'announced',
    date: '2026-08-05',
    access: 'Open (expected)',
    context: '1M (expected)',
    params: 'Undisclosed',
    summary:
      'Meta said an open-weights Muse Spark release is coming "soon" at the 1.2 launch (Aug 5). If it lands, it would be the first open-weight model from Meta\'s flagship Muse line and its largest open release to date.',
    source: { label: 'research.meta.ai Aug 5' },
  },
  {
    id: 'sonnet-haiku-55',
    name: 'Claude Sonnet 5.5 / Haiku 5.5',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    status: 'announced',
    date: '2026-09-22',
    access: 'Proprietary (expected)',
    context: null,
    params: 'Undisclosed',
    summary:
      'Anthropic says Sonnet 5.5 and Haiku 5.5 are coming soon after Opus 5.5 (Sep 22). Current Haiku 4.5 pricing ($1/$5) is ~10× GPT-6 Luna, so the budget tier is under pressure.',
    source: { label: 'tpsreport.news Sep 23 (secondary)' },
  },
  {
    id: 'muse-spark-max',
    name: 'Muse Spark 1.3 max reasoning',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    status: 'preview',
    date: '2026-09-02',
    access: 'Proprietary (limited partner preview)',
    context: '1M',
    params: 'Undisclosed',
    summary:
      'The max-reasoning mode of Muse Spark 1.3 is held back pending additional safety testing, with standard reasoning modes live in Muse Code and the Meta Model API. Launch-day AA 61/62 was superseded by the v4.3 re-score of 48.',
    source: { label: 'research.meta.ai Sep 2' },
  },
  // ---- Restricted ----
  {
    id: 'mythos-51',
    name: 'Claude Mythos 5.1',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    status: 'restricted',
    date: '2026-09-01',
    access: 'Proprietary (verification-gated)',
    context: '1M',
    params: 'Undisclosed',
    summary:
      'Same weights as Fable 5.1 with select bio/cyber safeguards lifted (TB4.0 60.9% vs 55.8% safeguarded). Available only via the Cyber / Life Sciences Verification Programs for vetted US organizations; not publicly token-billed.',
    source: { label: 'anthropic.com Sep 1', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1' },
  },
  {
    id: 'gpt-56-cyber',
    name: 'GPT-5.6-Cyber',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    status: 'restricted',
    date: '2026-08-10',
    access: 'Proprietary (Daybreak Red)',
    context: null,
    params: 'Undisclosed',
    summary:
      'Cybersecurity specialist built on GPT-5.6-Sol with a lower refusal rate on dual-use security tasks (vendor claims 95% completion on advanced exploit-chain prompts). Gated to vetted defenders through Daybreak Red; not generally available.',
    source: { label: 'securityweek.com Aug 10 (secondary)' },
  },
  {
    id: 'gemini-38-cyber',
    name: 'Gemini 3.8 Flash Cyber',
    provider: 'Google DeepMind',
    country: 'US',
    countryName: 'United States',
    status: 'restricted',
    date: '2026-09-02',
    access: 'Proprietary (Fairwind)',
    context: '1M',
    params: 'Undisclosed',
    summary:
      'Cyber-tuned twin of Gemini 3.8 Flash with more permissive mitigations, restricted to trusted defenders (governments, critical infrastructure, maintainers) via the Fairwind Program. Same $0.75/$3.75 intro base; not publicly token-billed.',
    source: { label: 'blog.google Sep 2' },
  },
  // ---- Rumored ----
  {
    id: 'grok-48',
    name: 'Grok 4.8',
    provider: 'xAI',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: '2026-09-15',
    access: 'Proprietary (expected)',
    context: null,
    params: '~2.5T (reported)',
    summary:
      'Grok 4.7 shipped Sep 21 after its delay; the roadmap points to 4.8 on a ~2.5T new C++ stack (training finishing → RL next), then 4.9 at Astra/Fable class. No model card, pricing, or date from xAI yet.',
    source: { label: 'Musk X posts Sep 2026' },
  },
  {
    id: 'qwen4',
    name: 'Qwen4 family',
    provider: 'Alibaba',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: '2026-08-28',
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'Qwen3.8-Flash-Next (125B/6B, Aug 26) is described as an early preview of the architecture that will underpin Qwen4. Leaks point to advanced 3D coding and design capabilities; rumors point to fall 2026.',
    source: { label: 'Geeky Gadgets / yottalabs.ai (leaks)' },
  },
  {
    id: 'kimi-k4',
    name: 'Kimi K4',
    provider: 'Moonshot AI',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: '2026-07-29',
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'The Information (Jul 29) reports Moonshot seeking additional Nvidia Blackwell chips for a next-gen model. No name, params, or timeline from Moonshot itself — treat as rumor.',
    source: { label: 'The Information Jul 29 (one report)' },
  },
  {
    id: 'haiku-5',
    name: 'Claude Haiku 5',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: null,
    access: 'Proprietary (expected)',
    context: null,
    params: 'Undisclosed',
    summary:
      'SkillBoss tracker lists a forthcoming next-gen ultra-fast, low-cost Claude tier targeting sub-200ms TTFT for high-volume agent traffic. Unconfirmed by Anthropic.',
    source: { label: 'SkillBoss upcoming-models (unconfirmed)' },
  },
  {
    id: 'gpt-57',
    name: 'GPT-5.7 / next GPT',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: null,
    access: 'Proprietary (expected)',
    context: null,
    params: 'Undisclosed',
    summary:
      'No official announcement; SkillBoss lists speculatively after the GPT-6 Sol/Luna launch (Sep 22). Treat as no-evidence rumor.',
    source: { label: 'SkillBoss (speculation only)' },
  },
  {
    id: 'glm-54',
    name: 'GLM-5.4 / next GLM',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: null,
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'GLM 5.5 had been an analyst forecast (JPMorgan/Reuters) for Aug 2026; GLM-5.3 shipped instead. Next release trajectory is Sep–Oct 2026 with no Z.ai commitment.',
    source: { label: 'JPMorgan note (no Z.ai commitment)' },
  },
  {
    id: 'mai-2',
    name: 'MAI-Code 2 / next MAI',
    provider: 'Microsoft',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: null,
    access: 'Proprietary (expected)',
    context: null,
    params: 'Undisclosed',
    summary:
      'MAI-Code-1.1-Flash (Aug 11) reads as interim and MAI-Thinking-1 sits in public preview (Aug 12); a next MAI 2 is unscheduled with no announcement.',
    source: { label: 'No confirmed source' },
  },
  {
    id: 'ax-k3',
    name: 'A.X K3',
    provider: 'SK Telecom',
    country: 'KR',
    countryName: 'South Korea',
    status: 'rumored',
    date: null,
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      "Korea's Dokpamo sovereign-AI program is in phase-2 evaluation; A.X K2 (688B/33B, Jul 29) is the current release. K3 is not announced.",
    source: { label: 'No SKT announcement' },
  },
  {
    id: 'k-exaone-3',
    name: 'K-EXAONE 3.0',
    provider: 'LG AI Research',
    country: 'KR',
    countryName: 'South Korea',
    status: 'rumored',
    date: null,
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'K-EXAONE 2.0 (750B/37B, Jul 31) is current as Korea\'s largest open model. No 3.0 announcement exists.',
    source: { label: 'No confirmed source' },
  },
  {
    id: 'granite-43',
    name: 'IBM Granite 4.3',
    provider: 'IBM',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: null,
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'Granite 4.2 (Aug 25, 3B/8B/30B) just shipped with no 4.3 announcement or IBM roadmap commitment. Speculative.',
    source: { label: 'No IBM roadmap' },
  },
  {
    id: 'k3-aa-coding',
    name: 'Kimi K3 AA Coding Index entry',
    provider: 'Moonshot AI / AA',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: null,
    access: 'Independent measurement (expected)',
    context: null,
    params: '2.8T / 104B active',
    summary:
      'K3 weights have been public since Jul 27; AA typically indexes new models within 4–6 weeks, expected Sep. Would test whether the vendor TB2.1 88.3% holds independently.',
    source: { label: 'Timing pattern (expectation)' },
  },
  {
    id: 'glm53-aa',
    name: 'GLM-5.3 AA Index measurement',
    provider: 'Z.ai / AA',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: null,
    access: 'Independent measurement (expected)',
    context: null,
    params: '743B / 40B active',
    summary:
      'Weights released Aug 28; an AA entry is expected within weeks — the first independent measurement of the highest vendor-claimed open-weight TB2.1 score (88.2%).',
    source: { label: 'Timing pattern (expectation)' },
  },
]

export const WATCH_STATUSES: WatchStatus[] = ['announced', 'preview', 'restricted', 'rumored']

export function watchCounts(items: WatchItem[]): Record<WatchStatus, number> {
  return {
    announced: items.filter((i) => i.status === 'announced').length,
    preview: items.filter((i) => i.status === 'preview').length,
    restricted: items.filter((i) => i.status === 'restricted').length,
    rumored: items.filter((i) => i.status === 'rumored').length,
  }
}
