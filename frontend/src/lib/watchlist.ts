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
 * Source: docs/ai_model_tracker_aug29_2026.md §1 CONFIRMED UPCOMING + §6 WATCH LIST.
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
    id: 'mistral-large-4-weights',
    name: 'Mistral Large 4 open weights',
    provider: 'Mistral AI',
    country: 'FR',
    countryName: 'France',
    status: 'announced',
    date: '2026-10-06',
    access: 'Open weights (HF card live, ETA Oct 31 2026)',
    context: '1M',
    params: '1T / 49B active (52B incl. embeddings)',
    summary:
      'Large 4 GA Oct 6 as API-only at half-price preview ($0.68/$2.09, list $1.36/$4.18); open weights promised by end of month (catalog rank 301). The HF card mistralai/Mistral-Large-4-1T-A52B is live as an Upcoming release with ETA Oct 31, 2026 and 945 people waiting, but the repo itself is still gated — no weights yet. If it lands, it is the first open-weight flagship from Mistral since the 675B era; expect a license revenue gate, since the model is being red-teamed by cyber leaders and vetted partners before release.',
    source: { label: 'mistral.ai Oct 6 + HF card Oct 25', url: 'https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B' },
  },
  {
    id: 'kimi-k31-weights',
    name: 'Kimi K3.1 Pro open weights',
    provider: 'Moonshot AI',
    country: 'CN',
    countryName: 'China',
    status: 'announced',
    date: '2026-10-23',
    access: 'Open weights (promised by Nov 4 2026)',
    context: '1M',
    params: '2.8T / 104B active',
    summary:
      'K3.1 Pro launched Oct 23 as API-only ($2/$10) with the vendor promising full model weights by Nov 4, 2026 (catalog rank 340). No Moonshot HF repo exists yet — moonshotai’s newest is still Kimi-K3 (Jun 13). The release deliberately drops cyber capability, so expect a licence gate like Kimi K3’s ~$20M revenue ceiling; Kimi K3 precedent was 11 days from announce to weights.',
    source: { label: 'kimi.ai blog Oct 23 + HF org check Oct 25', url: 'https://www.kimi.ai/blog/kimi-k3-1-pro' },
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
    id: 'nemotron-4',
    name: 'Nemotron 4 (~1T)',
    provider: 'NVIDIA',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: '2026-08-11',
    access: 'Open weights (expected, following the Nemotron 3.5 open line)',
    context: null,
    params: '~1T (reported)',
    summary:
      'Reuters (Aug 11, citing The Information) reports NVIDIA is building a 1-trillion-parameter Nemotron 4 to rival open models from China. The 3.5 generation already shipped open (Super VL Oct 15, Bolt E4B Oct 23, Dory 4B Oct 16), so a 1T Nemotron would extend an open-weight line — but NVIDIA has given no size, timing or license commitment for Nemotron 4.',
    source: { label: 'Reuters Aug 11 (citing The Information)' },
  },
  {
    id: 'nanbeige-43-small',
    name: 'Nanbeige4.3 small distillation models',
    provider: 'Nanbeige',
    country: 'CN',
    countryName: 'China',
    status: 'announced',
    date: '2026-10-24',
    access: 'Open weights (expected)',
    context: null,
    params: '~3B (named example)',
    summary:
      'The Nanbeige4.3-33B card (Oct 24, Apache-2.0) states the 33B model is a high-capacity teacher agent that anchors distillation into smaller models, naming Nanbeige4.3-3B as the first target. No 3B repo exists yet, so this is a vendor-stated pipeline, not a scheduled launch.',
    source: { label: 'huggingface.co/Nanbeige Oct 24' },
  },
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
    status: 'announced',
    date: '2026-09-21',
    access: 'Open weights (expected for the smaller tiers)',
    context: null,
    params: 'Undisclosed (roadmap to 5-10T by Qwen4.5/Qwen5)',
    summary:
      'Alibaba confirmed the Qwen4 family at its Apsara conference (Reuters, Sep 21; Pandaily Sep 23: "Qwen4 family into training"; Vietnam Investment Review Sep 23: 10T roadmap), with Alibaba slides projecting 5-10T parameters for Qwen4.5 and Qwen5. No tier sizes, licences or dates, and the family was said to be still in training. Tracked as one family row, not per tier — the date field holds the last hard signal (Apsara, Sep 21) and moves to the next one when it lands: a Qwen4 HF repo or weights card, a published licence, or an official release date. Checked Oct 25: no Qwen4 repo on HF (Qwen’s newest is Qwen-Image-2.1-Turbo, Oct 9); the "qwen4_exp" architecture tag in Transformers and llama.cpp is the internal arch name of the already-shipped Qwen3.8-Flash-Next (llama.cpp PR 27742, merged Aug 27) — a second PR titled "add Qwen4-Exp" (27739) was closed unmerged, so the Oct 24 "Qwen model nearing release" headline traces back to two-month-old PRs rather than new evidence.',
    source: { label: 'Reuters Sep 21 + Pandaily Sep 23 (Apsara)' },
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
      'The Information (Jul 29) reports Moonshot seeking additional Nvidia Blackwell chips for a next-gen model. No name, params, or timeline from Moonshot itself — treat as rumor. Checked Oct 25: still no K4 signal; Moonshot’s only dated next commitment is the K3.1 Pro weights promised by Nov 4.',
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
    id: 'gpt-6-cyber',
    name: 'GPT-6 Cyber',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: '2026-09-24',
    access: 'Proprietary (expected, Daybreak-adjacent)',
    context: null,
    params: 'Undisclosed',
    summary:
      'Fortune (multiple sources, Sep 24) reports a GPT-6 Cyber preview plus a security-workflow product, with alpha access for limited Daybreak Red customers; timing framed as weeks, not days. 6.1 Astra was scrapped pre-DevDay over safety, so treat any Cyber date as unconfirmed.',
    source: { label: 'Fortune Sep 24 (reported)' },
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
      'GLM 5.5 had been an analyst forecast (JPMorgan/Reuters) for Aug 2026; GLM-5.3 shipped instead. Next release trajectory is Sep–Oct 2026 with no Z.ai commitment. Checked Oct 25: no GLM-5.4/5.5 repo on HF (zai-org’s newest is GLM-5.3-Flash, Aug 25) and no vendor announcement — the "Ox Alpha" alias that had been circulating turned out to be GLM-5.3-Flash running on Chinese GPUs under MIT, already in the catalog, not a new model.',
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
  {
    id: 'watermelon',
    name: 'Meta Watermelon (year-end frontier)',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    status: 'rumored',
    date: '2026-08-20',
    access: 'Unknown',
    context: null,
    params: 'Undisclosed',
    summary:
      'Meta has attached a year-end date to a new frontier model (AI Weekly, 80%): coding/agents pitch leveraging Meta user data. No name, params, or weights commitment beyond the date.',
    source: { label: 'AI Weekly Aug 20 (reported)' },
  },
  {
    id: 'minimax-27t',
    name: 'MiniMax 2.7T open model',
    provider: 'MiniMax',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: '2026-10-23',
    access: 'Open weights (expected)',
    context: null,
    params: '~2.7T (reported)',
    summary:
      'Reuters reports MiniMax training what may be the largest open-weight model, possible Q3 release (AI Weekly, 75%). The window keeps slipping and no weights have landed. Fresh enabler signal: Reuters (Oct 23) reports MiniMax completed export registration for open-source, overseas AI model licensing, and Bloomberg (Oct 23) reports China cleared DeepSeek and MiniMax for global use — an approval path for shipping weights abroad, not a release itself. A Q3 API preview must not be mistaken for downloadable weights.',
    source: { label: 'Reuters Oct 23 (export registration) + Reuters via AI Weekly Aug 20' },
  },
  {
    id: 'mistral-next-moe',
    name: 'Mistral next-gen open MoE',
    provider: 'Mistral AI',
    country: 'FR',
    countryName: 'France',
    status: 'rumored',
    date: '2026-06-01',
    access: 'Open weights (expected)',
    context: null,
    params: 'Large yet sparse MoE (reported)',
    summary:
      'CEO Mensch confirmed (June 2026) a large-yet-sparse MoE family shipping as open weights to close the frontier gap; early access for research/government/industry partners was reported from July. No name, benchmarks, or GA date.',
    source: { label: 'OutYet.ai (CEO comments)' },
  },
  {
    id: 'zai-fable-class',
    name: 'Z.ai Fable-class open model',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    status: 'rumored',
    date: '2026-08-20',
    access: 'Open weights (expected)',
    context: null,
    params: 'Undisclosed',
    summary:
      'Founder Jie Tang says Z.ai will likely ship an open model rivaling Fable before 2027 (AI Weekly, 70%). Distinct from the missed GLM-5.5 August window; GLM-5.3 shipped instead.',
    source: { label: 'AI Weekly Aug 20 (reported)' },
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
