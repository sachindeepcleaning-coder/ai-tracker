/**
 * Changelog feed for the Tracker tab — mirrors llm-releases.com/changelog.
 *
 * A single append-only feed of releases, updates, deprecations, and
 * retractions. Each item links back to its catalog rank where applicable.
 * Source: CHANGELOG.md + ai_model_tracker_aug29_2026.md §7 audit log.
 */

export type ChangeType =
  | 'released'
  | 'retired'
  | 'deprecated'
  | 'announced'
  | 'license-change'
  | 'preview'
  | 'updated'

export interface ChangeSource {
  label: string
  url?: string
}

export interface ChangeItem {
  id: string
  /** ISO event date (model event, not catalog-add date). */
  date: string
  type: ChangeType
  title: string
  provider: string
  country: string
  countryName: string
  /** Catalog rank for the "Rank #N" deep-link (opens the model detail). */
  rank?: number
  summary: string
  source: ChangeSource
}

export const CHANGE_TYPE_META: Record<ChangeType, { label: string; cls: string }> = {
  released: { label: 'Released', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  retired: { label: 'Retired', cls: 'bg-red-500/15 text-red-300 border-red-500/30' },
  deprecated: { label: 'Deprecated', cls: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  announced: { label: 'Announced', cls: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'license-change': { label: 'License change', cls: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
  preview: { label: 'Preview', cls: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  updated: { label: 'Updated', cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
}

export const CHANGE_TYPES: ChangeType[] = [
  'released',
  'retired',
  'deprecated',
  'announced',
  'license-change',
  'preview',
  'updated',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** '2026-09' -> 'September 2026' (UTC, no timezone drift). */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split('-').map((v) => parseInt(v, 10))
  return `${MONTHS[m - 1]} ${y}`
}

/** '2026-09-22' -> 'Sep 22, 2026'. */
export function fmtDay(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export const CHANGE_ITEMS: ChangeItem[] = [
  // ---------------- September 2026 ----------------
  {
    id: 'grok-47-ga',
    date: '2026-09-22',
    type: 'released',
    title: 'Grok 4.7 goes GA after delay',
    provider: 'xAI',
    country: 'US',
    countryName: 'United States',
    rank: 271,
    summary:
      'GA Sep 21 at $2/$6 per Mtok ($0.50 cache) plus a 2×-speed fast variant at 2× price. Missed its ~Sep 12 target for extra RL on response-length and task completion; larger base trained with longer RL on multi-hour tasks.',
    source: { label: 'x.ai news Sep 21', url: 'https://x.ai/news/grok-4-7' },
  },
  {
    id: 'gpt6-sol-luna',
    date: '2026-09-22',
    type: 'released',
    title: 'GPT-6 Sol and Luna go GA',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    rank: 272,
    summary:
      'Sol ($2/$10) for sustained agentic coding and Luna ($0.10/$0.50 + $0.01 cache, cheapest GPT-6) for high-volume work — ~50% below GPT-5.6 promo pricing. Live on API, Codex, ChatGPT, and GitHub Copilot.',
    source: {
      label: 'OpenAI community + GitHub changelog Sep 22',
      url: 'https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available/',
    },
  },
  {
    id: 'opus-55',
    date: '2026-09-22',
    type: 'released',
    title: 'Claude Opus 5.5 ships with 20% price cut',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    rank: 274,
    summary:
      'GA at $4/$20 per Mtok ($0.20 cache) — 20% below every prior Opus tier — and a claimed 30% inference speedup. Secondary reports claim TB4.0 66.4% and GDPval 1846; unverified, kept out of the TB2.1 column. Sonnet/Haiku 5.5 coming.',
    source: { label: 'tpsreport.news Sep 23 (secondary)', url: 'https://tpsreport.news/news/claude-opus-5-5-gpt-6-sol-luna-price-war' },
  },
  {
    id: 'mimo-26',
    date: '2026-09-21',
    type: 'released',
    title: 'MiMo-V2.6 trio goes MIT (AA 46, top open)',
    provider: 'Xiaomi',
    country: 'CN',
    countryName: 'China',
    rank: 275,
    summary:
      'Pro (1.02T/42B, 1M multimodal) scores AA 46 — the top open-weight mark, tied with Grok 4.7 — at $0.435/$0.87 (~$0.13/task). Flash (309B/15B, $0.14/$0.28) and a 9B Qwen distill ship alongside, plus 7,000+ RL envs and the training framework.',
    source: { label: 'cellcog.ai Sep 22', url: 'https://cellcog.ai/blog/mimo-v2-6/' },
  },
  {
    id: 'aliceai-80b',
    date: '2026-09-21',
    type: 'released',
    title: 'AliceAI Foundation 80B ungated on HF',
    provider: 'Yandex',
    country: 'RU',
    countryName: 'Russia',
    rank: 278,
    summary:
      '80B/3B hybrid MoE trained from scratch, ungated Apache-2.0 card with 262K context. ~40GB at Q4. No coding leaderboard scores yet.',
    source: { label: 'ccleaks Sep 21', url: 'https://ccleaks.com/news/aliceai-foundation-80b-open-weights-sep-2026' },
  },
  {
    id: 'union-alpha',
    date: '2026-09-16',
    type: 'preview',
    title: 'Union Alpha stealth preview surfaces',
    provider: 'Stealth (OpenRouter / OpenCode Zen)',
    country: 'US',
    countryName: 'United States',
    rank: 269,
    summary:
      'Anonymous stealth/union-alpha listing, free for ~1 week: 262K ctx, 131K max output, text+image in, tool calling. No weights or HF repo; community DeepSWE ~73% unverified. Externally identified days later as Unbiased Pareto.',
    source: { label: 'OpenRouter + OpenCode Sep 16' },
  },
  {
    id: 'zgcm-1',
    date: '2026-09-16',
    type: 'released',
    title: 'ZGCM-1 ships fully open (weights + data)',
    provider: 'Zhongguancun Academy',
    country: 'CN',
    countryName: 'China',
    rank: 270,
    summary:
      '7.39B dense under Apache 2.0 with staged checkpoints, a 5.44B-row dataset, recipes, and training logs. Hybrid gated SWA, Muon + FP8, 256K ctx at ~4GB Q4; AIME 2026 75.0% vendor.',
    source: { label: 'arXiv Sep 11 + release Sep 16' },
  },
  {
    id: 'koa',
    date: '2026-09-15',
    type: 'released',
    title: 'Salesforce Koa announced (enterprise pilot)',
    provider: 'Salesforce',
    country: 'US',
    countryName: 'United States',
    rank: 268,
    summary:
      'First CRM reasoning model for Agentforce: post-trained NVIDIA Nemotron 3 Super on proprietary synthetic CRM workflows (no customer data). Salesforce-hosted pilot, GA winter 2026; weights controlled. Vendor claims ~3× fewer errors on CRM Bench.',
    source: { label: 'Salesforce press Sep 15' },
  },
  {
    id: 'grok47-delayed',
    date: '2026-09-15',
    type: 'updated',
    title: 'Grok 4.7 delayed past ~Sep 12',
    provider: 'xAI',
    country: 'US',
    countryName: 'United States',
    summary:
      'Missed its ~Sep 12 target; additional RL needed for response-length and task-completion issues. Roadmap: 4.8 on a ~2.5T new C++ stack, then 4.9 at Astra/Fable class. (Superseded: 4.7 shipped Sep 21.)',
    source: { label: 'Musk X posts Sep 12–15' },
  },
  {
    id: 'v41-pricing',
    date: '2026-09-15',
    type: 'updated',
    title: 'DeepSeek V4.1 Flash pricing completed',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 256,
    summary:
      'Peak $0.30/$1.20, off-peak $0.15/$0.60, cache $0.003/$0.006 (₹28.54/₹114.14). Legacy V4 Flash / Vision-Exp retired and routed; V4 Pro routed Sep 14.',
    source: { label: 'api-docs.deepseek.com Sep 10–15' },
  },
  {
    id: 'astra-enrich',
    date: '2026-09-15',
    type: 'updated',
    title: 'GPT-6 Astra card enriched',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    rank: 254,
    summary:
      'DeepSWE v1.1 74.1% vendor, TB4.0 57.7%, OSWorld 72.6% added; first Critical-cyber-threshold note with Daybreak gating confirmed.',
    source: { label: 'OpenAI vendor notes Sep 3–4' },
  },
  {
    id: 'v4pro-route',
    date: '2026-09-14',
    type: 'deprecated',
    title: 'V4 Pro traffic routes to V4.1 Flash',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 192,
    summary:
      'From Sep 14 every deepseek-v4-pro request is served by V4.1-Flash and billed at Flash rates until V4.1-Pro launches. The id still answers — a redirect and deprecation, not a retirement.',
    source: { label: 'api-docs.deepseek.com Sep 10' },
  },
  {
    id: 'audit-sep14',
    date: '2026-09-14',
    type: 'updated',
    title: 'Catalog audit: cross-harness scores fixed',
    provider: 'Catalog maintenance',
    country: 'US',
    countryName: 'United States',
    summary:
      'Nulled TB4.0/TB3.0 scores sitting in the TB2.1 column, SWE-Pro vendor numbers in SWE-V, and AIME25 in MATH/AIME26; fixed Kimi K3 Q4 grams→GB, the North-Micro-Vision column shift, and per-page pricing parsing. Regression gates added.',
    source: { label: 'CHANGELOG.md Sep 14' },
  },
  {
    id: 'atria-dawn',
    date: '2026-09-12',
    type: 'released',
    title: 'Atria Dawn Preview (744B agentic MoE)',
    provider: 'Shanghai AI Laboratory',
    country: 'CN',
    countryName: 'China',
    rank: 279,
    summary:
      'Weights-first 744B agentic MoE built on GLM-5.2 for long-horizon research agents. MIT, open weights, 256K ctx. Lab-reported AutomationBench 53.8 and BrowseComp 92.5; details thin at launch.',
    source: { label: 'LLM Gateway timeline + HF Sep 11–14' },
  },
  {
    id: 'fugu-duo',
    date: '2026-09-11',
    type: 'released',
    title: 'Sakana Fugu Max + Ultra v2.0',
    provider: 'Sakana AI',
    country: 'JP',
    countryName: 'Japan',
    rank: 266,
    summary:
      'Orchestration systems routing over open and specialized models: Max ($2/$6) cost-optimized, Ultra v2.0 ($5/$30) frontier-class with no Fable/Astra agents in the pool. Not EU/EEA available.',
    source: { label: 'Sakana release Sep 11' },
  },
  {
    id: 'swe2',
    date: '2026-09-10',
    type: 'released',
    title: 'Cognition SWE-2 launches',
    provider: 'Cognition',
    country: 'US',
    countryName: 'United States',
    rank: 265,
    summary:
      'Proprietary long-horizon coding model post-trained from the Kimi K3 base for asynchronous software engineering in Devin. Vendor TB2.1 92.8% — catalog-high, vendor-reported.',
    source: { label: 'Cognition Sep 10' },
  },
  {
    id: 'turbo-removed',
    date: '2026-09-13',
    type: 'deprecated',
    title: 'GLM-5.2 Turbo row removed (ghost)',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    summary:
      'Single-TechPillow-sourced row deleted — no Z.ai primary (HF, docs, pricing) ever confirmed the model. Fast-tier claim retained only as a reconciled API-tier note.',
    source: { label: 'CHANGELOG.md Sep 13' },
  },
  {
    id: 'v41-ga',
    date: '2026-09-10',
    type: 'released',
    title: 'DeepSeek V4.1 Flash GA (MIT)',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 256,
    summary:
      '552B CED backbone (8B prefill / 16B decode), KV-cache compression to ~890 bytes/tok, native multimodal, 1M ctx. Off-peak $0.15/$0.60 with a 60% cache cut vs V4 Flash. Vendor TB2.1 90.6 / DeepSWE 74.2.',
    source: { label: 'api-docs.deepseek.com Sep 10' },
  },
  {
    id: 'v4-retire',
    date: '2026-09-10',
    type: 'retired',
    title: 'V4 Flash + Vision-Exp retired',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 193,
    summary:
      'V4-Flash and V4-Flash-Vision-Exp retired alongside the V4.1-Flash launch; API ids temporarily route to V4.1-Flash so integrations keep answering on the newer model.',
    source: { label: 'api-docs.deepseek.com Sep 10' },
  },
  {
    id: 'mai10-retire',
    date: '2026-09-10',
    type: 'retired',
    title: 'MAI-Code-1-Flash retires from Copilot',
    provider: 'Microsoft',
    country: 'US',
    countryName: 'United States',
    summary:
      'Closed-weight Copilot default retired; pipelines migrate to MAI-Code-1.1-Flash (SWE-V 72.6%, TB2.1 62.9%) at ~73% lower list pricing.',
    source: { label: 'GitHub changelog Sep 10' },
  },
  {
    id: 'mercury-ga',
    date: '2026-09-08',
    type: 'updated',
    title: 'Mercury 2.5 reaches GA',
    provider: 'Inception',
    country: 'US',
    countryName: 'United States',
    rank: 253,
    summary:
      'Preview (Aug 31) → full GA Sep 8. Diffusion LM at ~1,107 tok/s, 260K ctx, $0.20/$0.75 list ($0.04/$0.15 promo). Speed/cost frontier, not intelligence frontier.',
    source: { label: 'inceptionlabs.ai Sep 8' },
  },
  {
    id: 'minicpm5',
    date: '2026-09-07',
    type: 'released',
    title: 'MiniCPM5-2B tops the sub-4B open class',
    provider: 'OpenBMB',
    country: 'CN',
    countryName: 'China',
    rank: 257,
    summary:
      '~2.5B dense, Apache 2.0, 131K ctx, ~2GB Q4. Vendor averages 53.9 across 34 benchmarks — strongest open model under 4B. No GPU required.',
    source: { label: 'OpenBMB HF Sep 7' },
  },
  {
    id: 'k2-horizon',
    date: '2026-09-03',
    type: 'released',
    title: 'K2 Horizon family fully opens',
    provider: 'MBZUAI (IFM)',
    country: 'AE',
    countryName: 'UAE',
    rank: 258,
    summary:
      'Six models 0.9B→375B-A23B under Apache 2.0 — rare fully-open release with training data, code, checkpoints, and logs. Flagship ~200GB Q4 at ~47 AA Index (vendor).',
    source: { label: 'IFM release Sep 3' },
  },
  {
    id: 'spark13-aa',
    date: '2026-09-08',
    type: 'updated',
    title: 'Muse Spark 1.3 AA re-scored to 48',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    rank: 252,
    summary:
      'Launch-day AA 61/62 superseded by the live v4.3 re-score: 48 (#13/202). $1.60/task, 236.8 tok/s, very verbose (170M index tokens). Reclassified from frontier to efficient workhorse.',
    source: { label: 'artificialanalysis.ai Sep 8 (live)' },
  },
  {
    id: 'sante',
    date: '2026-09-04',
    type: 'released',
    title: 'Ling-3.0-flash-Sante (medical tune)',
    provider: 'inclusionAI (Ant Group)',
    country: 'CN',
    countryName: 'China',
    rank: 260,
    summary:
      '124B/5.1B MoE medical-tuned variant, 262K, API-first with a free window. Sante-specific weights unconfirmed; base family MIT.',
    source: { label: 'Trackers Sep 4 (no primary card)' },
  },
  {
    id: 'lingfin-weights',
    date: '2026-09-04',
    type: 'license-change',
    title: 'Ling-Fin weights posted (MIT)',
    provider: 'inclusionAI (Ant Group)',
    country: 'CN',
    countryName: 'China',
    rank: 238,
    summary:
      'Delivers the open-weight release announced at the Aug 27 launch: HF inclusionAI/Ling-3.0-flash-Fin under MIT, with DeepInfra hosting at $0.06/$0.18.',
    source: { label: 'Hugging Face Sep 4' },
  },
  {
    id: 'astra-pro',
    date: '2026-09-04',
    type: 'released',
    title: 'GPT-6 Astra Pro ships',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    rank: 255,
    summary:
      'Higher-quality reasoning mode of Astra at the same $10/$50 tiers (cache $1.00), 1.05M ctx. Staged rollout like base Astra.',
    source: { label: 'OpenAI Sep 4' },
  },
  {
    id: 'astra',
    date: '2026-09-03',
    type: 'released',
    title: 'GPT-6 Astra launches (Critical cyber)',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    rank: 254,
    summary:
      'New flagship at $10/$50: TB4.0 57.9%, OSWorld 72.6%, GPQA 96.0% vendor. First model to trigger the Critical cybersecurity tier — exploit-creation gated behind Daybreak; staged Daybreak → API/ChatGPT → Bedrock/Azure.',
    source: { label: 'OpenAI Sep 1–3', url: 'https://openai.com/index/gpt-6-astra/' },
  },
  {
    id: 'max-0902',
    date: '2026-09-02',
    type: 'released',
    title: 'Qwen3.8-Max-0902 refresh',
    provider: 'Alibaba (Qwen)',
    country: 'CN',
    countryName: 'China',
    rank: 249,
    summary:
      'Post-training refresh on the same 2.4T/95B 1M base at unchanged $2/$6: TB3.0 29.0% (2.6×), DeepSWE 69.3% (+12.7). API-only; self-hosters stay on the Aug 3 weights.',
    source: { label: 'aireleasetracker + gate.com Sep 2' },
  },
  {
    id: 'gemini38',
    date: '2026-09-02',
    type: 'released',
    title: 'Gemini 3.8 Flash (+ Cyber twin)',
    provider: 'Google DeepMind',
    country: 'US',
    countryName: 'United States',
    rank: 251,
    summary:
      'Fourth Flash in four months on the 3.7 base: DeepSWE 73.7%, AA 59 HIGH, same $0.75/$3.75 intro (→$1.50/$7.50 Jan 2027) at ~30% more tokens per task. Cyber twin is Fairwind-gated for vetted defenders.',
    source: { label: 'blog.google Sep 2' },
  },
  {
    id: 'spark13',
    date: '2026-09-02',
    type: 'released',
    title: 'Muse Spark 1.3 ships',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    rank: 252,
    summary:
      'Fourth Muse Spark in five months: 1M ctx at $1.25/$4.25 ($0.10/$0.20 contributor tier). ~20% fewer tool calls than 1.2 on Meta internals; max reasoning held for safety testing.',
    source: { label: 'research.meta.ai Sep 2' },
  },
  {
    id: 'quasar',
    date: '2026-09-02',
    type: 'announced',
    title: 'Quasar 438B listed (thin details)',
    provider: 'Multiverse Computing',
    country: 'ES',
    countryName: 'Spain',
    rank: 259,
    summary:
      '438B listing on BenchLM/ThursdAI with sparse public details and no primary spec sheet. Tracked as announced-but-unconfirmed; do not budget around it.',
    source: { label: 'BenchLM + ThursdAI only' },
  },
  {
    id: 'mai-thinking-preview',
    date: '2026-09-02',
    type: 'updated',
    title: 'MAI-Thinking-1 promoted to Preview',
    provider: 'Microsoft',
    country: 'US',
    countryName: 'United States',
    rank: 34,
    summary:
      'Moved Upcoming → Public Preview (Aug 12): ~962B/34.7B, 52.8% SWE-Pro but weak 46.0% TB2.0, 256K, Foundry-only with TBD pricing.',
    source: { label: 'microsoft.ai Aug 12' },
  },
  {
    id: 'vision-fill',
    date: '2026-09-02',
    type: 'updated',
    title: 'V4 Flash Vision benchmarks filled',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 250,
    summary:
      'TB2.1 83.9% (+1.2 vs text Flash), DeepSWE 59.3%, NL2Repo 57.7% — vision adds multimodal gain without regressing coding, at the same peak/off-peak pricing.',
    source: { label: 'Gap analysis Sep 2' },
  },
  {
    id: 'fable51',
    date: '2026-09-01',
    type: 'released',
    title: 'Claude Fable 5.1 doubles sci/coding',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    rank: 247,
    summary:
      'Same $10/$50 list with cache reads cut 75% to $0.25 (~25% typical / ~45% agentic cheaper). TB-Science 52.6% (2×), TB4.0 55.8%, HLE-tools 65.0% vendor.',
    source: { label: 'Anthropic Sep 1', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1' },
  },
  {
    id: 'mythos51',
    date: '2026-09-01',
    type: 'preview',
    title: 'Claude Mythos 5.1 (verification-gated)',
    provider: 'Anthropic',
    country: 'US',
    countryName: 'United States',
    rank: 248,
    summary:
      'Same weights as Fable 5.1 with lifted bio/cyber restrictions (TB4.0 60.9%), available only through Cyber / Life Sciences Verification Programs.',
    source: { label: 'Anthropic Sep 1', url: 'https://www.anthropic.com/claude-fable-and-mythos-5-1' },
  },
  // ---------------- August 2026 ----------------
  {
    id: 'mercury-preview',
    date: '2026-08-31',
    type: 'preview',
    title: 'Mercury 2.5 Preview (diffusion)',
    provider: 'Inception',
    country: 'US',
    countryName: 'United States',
    rank: 253,
    summary:
      'Diffusion LM preview at ~1,107 tok/s with parallel tool calls, 260K ctx, $0.20/$0.75 list. Speed/cost play against Luna Low / Flash-Lite class.',
    source: { label: 'BenchLM Aug 31 + OpenRouter' },
  },
  {
    id: 'glm53-weights',
    date: '2026-08-28',
    type: 'license-change',
    title: 'GLM-5.3 weights (bespoke license)',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    rank: 221,
    summary:
      'Released Aug 27 after a 2-week safety review: 141 shards (~756GB) under a custom license — HF shows "other", with an unconfirmed >$10B-revenue review gate. Verify before commercial MaaS.',
    source: { label: 'Hugging Face zai-org/GLM-5.3' },
  },
  {
    id: 'hy4-preview',
    date: '2026-08-28',
    type: 'released',
    title: 'Hy4 preview (Apache 2.0 flagship)',
    provider: 'Tencent',
    country: 'CN',
    countryName: 'China',
    rank: 263,
    summary:
      '770B/49B MoE, 1M+ ctx, cleanest commercial license of any 700B+ model. Vendor TB2.1 85.4 (ties Opus 5), DeepSWE 64.3. ~385GB Q4 — data-center class.',
    source: { label: 'tencent.com Aug 28' },
  },
  {
    id: 'glm-flash',
    date: '2026-08-26',
    type: 'released',
    title: 'GLM-5.3-Flash (ex stealth ox-alpha)',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    rank: 226,
    summary:
      '320B/18B MIT, 1M multimodal, $0.15/$0.50 ($0.03 cache). Ran 6 days anonymously on ~42T tokens of Chinese-chip inference. AA 57; ~2× faster per token than GLM-5.3.',
    source: { label: 'Z.ai Aug 26' },
  },
  {
    id: 'qwen-twins',
    date: '2026-08-26',
    type: 'released',
    title: 'Qwen twins split: Flash API + Flash-Next weights',
    provider: 'Alibaba (Qwen)',
    country: 'CN',
    countryName: 'China',
    rank: 236,
    summary:
      'Managed Qwen3.8-Flash API (Proprietary, 1M, $0.15/$0.47) separated from open-weight Flash-Next (Qwen Community 1.0, 262K→1M, ~111GB Q4, SWE-Pro 62.5). Previously conflated as one entry.',
    source: { label: 'QwenCloud + HF Aug 26' },
  },
  {
    id: 'parse5-lingfin',
    date: '2026-08-27',
    type: 'released',
    title: 'Parse 5 + Ling-Fin verticals land',
    provider: 'Cohere / inclusionAI',
    country: 'CA',
    countryName: 'Canada',
    rank: 237,
    summary:
      'Cohere Parse 5 (2.3B doc-VLM, $1.50/1k pages) and Ling-3.0-flash-Fin (124B/5.1B finance MoE, free window) — document and finance specialists, not coding-router material.',
    source: { label: 'cohere.com/blog/parse + OpenRouter Aug 27' },
  },
  {
    id: 'granite42',
    date: '2026-08-25',
    type: 'released',
    title: 'Granite 4.2 family (3B/8B/30B)',
    provider: 'IBM',
    country: 'US',
    countryName: 'United States',
    rank: 227,
    summary:
      'Dense reasoning LLMs with native CoT + agentic RL for tool/code/terminal, all Apache 2.0, 131K→512K. 30B fits a single 5090 rig.',
    source: { label: 'IBM blog Aug 25' },
  },
  {
    id: 'apodex-mini',
    date: '2026-08-24',
    type: 'released',
    title: 'Apodex 1.1-mini (Apache 2.0)',
    provider: 'Apodex AI',
    country: 'US',
    countryName: 'United States',
    rank: 235,
    summary:
      '35B-A3B open mini on Qwen3.5 base with PIVOT-RL; vendor SWE-V 77.7% / TB2.1 70.8%, unverified. Flagship 397B stays closed.',
    source: { label: 'apodex.com + HF Aug 24' },
  },
  {
    id: 'thomson',
    date: '2026-08-24',
    type: 'announced',
    title: 'Thomson Reuters previews Thomson',
    provider: 'Thomson Reuters',
    country: 'CA',
    countryName: 'Canada',
    rank: 239,
    summary:
      'Proprietary legal flagship (~$40M train) on Westlaw/Practical Law/Reuters content, gated to CoCounsel Legal with a sovereign rollout planned. Small academic open variant promised.',
    source: { label: 'TR press Aug 24' },
  },
  {
    id: 'vision-exp',
    date: '2026-08-21',
    type: 'released',
    title: 'V4 Flash Vision Exp (experimental)',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 250,
    summary:
      'Vision variant of V4 Flash (284B/13B + encoder), 1.05M ctx at text-rate pricing. Retired Sep 10 into native-multimodal V4.1 Flash.',
    source: { label: 'api-docs.deepseek.com Aug 21' },
  },
  {
    id: 'hymt2',
    date: '2026-08-20',
    type: 'released',
    title: 'Hy-MT2 translation MoE opens',
    provider: 'Tencent',
    country: 'CN',
    countryName: 'China',
    rank: 240,
    summary:
      '30B/3B translation specialist, 8K ctx, ~15GB Q4 for local MT pipelines. Not a coding model.',
    source: { label: 'Hugging Face tencent/Hy-MT2-30B-A3B' },
  },
  {
    id: 'ornith15',
    date: '2026-08-19',
    type: 'released',
    title: 'Ornith-1.5 family (MIT, self-improving RL)',
    provider: 'DeepReinforce (Ornith)',
    country: 'US',
    countryName: 'United States',
    rank: 232,
    summary:
      '397B / 35B-A3B / 9B under MIT with 3-stage self-improving RL. 397B hit HF #1 SWE-V (86.0) and #5 TB2.1 (86.1) — partially verified (HF-staff upload); smaller tiers self-reported.',
    source: { label: 'ornith.ai + HF Aug 19' },
  },
  {
    id: 'turbo-tier',
    date: '2026-08-17',
    type: 'released',
    title: 'GLM-5.2 Turbo fast tier surfaces',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    summary:
      'Hosted fast-serving tier of GLM-5.2 at $1.99/$6.16 (vs $0.55/$1.78 base) — a serving tier, not new weights. Later removed from the catalog as unconfirmed; reconciled as API-only.',
    source: { label: 'llmgateway.io Aug 17 (single source)' },
  },
  {
    id: 'qwen-weights',
    date: '2026-08-14',
    type: 'license-change',
    title: 'Qwen3.8-Max + 27B weights (Apache 2.0)',
    provider: 'Alibaba (Qwen)',
    country: 'CN',
    countryName: 'China',
    rank: 264,
    summary:
      'Flagship 2.4T/95B and dense 27B weights publish under Apache 2.0 (262K→1M YaRN). Max needs multi-node (~1.2TB Q4); 27B runs ~200 tok/s on one 5090.',
    source: { label: 'Hugging Face Aug 14' },
  },
  {
    id: 'glm53-api',
    date: '2026-08-14',
    type: 'released',
    title: 'GLM-5.3 API flagship',
    provider: 'Z.ai',
    country: 'CN',
    countryName: 'China',
    rank: 221,
    summary:
      '743B/40B API launch at $1.40/$4.40: vendor TB2.1 88.2, DeepSWE 66.9, CyberGym 84.5. Weights followed Aug 27 after review.',
    source: { label: 'Z.ai Aug 14' },
  },
  {
    id: 'dots3',
    date: '2026-08-14',
    type: 'released',
    title: 'Dots3-Note Preview (TEMPO RL)',
    provider: 'Dots Studio',
    country: 'CN',
    countryName: 'China',
    rank: 241,
    summary:
      '~280B/16B Apache 2.0 MoE, 512K, text+vision+audio with TEMPO self-checkpointing RL. IMO 42/42 refers to an internal harness branch, not the released checkpoint.',
    source: { label: 'Hugging Face dots-studio Aug 14' },
  },
  {
    id: 'v4pro-0813',
    date: '2026-08-13',
    type: 'released',
    title: 'DeepSeek pins V4-Pro 0813',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 219,
    summary:
      'Dated GA build behind deepseek-v4-pro: 1.6T/49B, 1M, vendor TB2.1 87.9%. API-only pin; routed to V4.1 Flash Sep 14.',
    source: { label: 'api-docs.deepseek.com Aug 13' },
  },
  {
    id: 'gemini37',
    date: '2026-08-13',
    type: 'released',
    title: 'Gemini 3.7 Flash workhorse',
    provider: 'Google DeepMind',
    country: 'US',
    countryName: 'United States',
    rank: 222,
    summary:
      '1M ctx at $0.75/$3.75 intro (doubles Jan 2027). DeepSWE 49.0%→65.3% vs 3.6 Flash; 340 tok/s, fastest on the AA leaderboard at launch.',
    source: { label: 'Google AI docs Aug 13' },
  },
  {
    id: 'mai11',
    date: '2026-08-11',
    type: 'released',
    title: 'MAI-Code-1.1-Flash (Copilot default)',
    provider: 'Microsoft',
    country: 'US',
    countryName: 'United States',
    rank: 230,
    summary:
      '138B/5B closed MoE becomes the GitHub Copilot default: vendor SWE-V 72.6%, TB2.1 62.9% (+22% vs 1.0) at $0.20/$1.20 — ~73% cheaper than its predecessor.',
    source: { label: 'microsoft.ai Aug 11' },
  },
  {
    id: 'mai-thinking',
    date: '2026-08-12',
    type: 'preview',
    title: 'MAI-Thinking-1 public preview',
    provider: 'Microsoft',
    country: 'US',
    countryName: 'United States',
    rank: 34,
    summary:
      '~962B/34.7B sparse MoE on Foundry: AIME 97.0/94.5, SWE-Pro 52.8% but TB2.0 46.0%. Text-only reasoning for governed deployments; pricing TBD.',
    source: { label: 'microsoft.ai Aug 12' },
  },
  {
    id: 'edge-vlm',
    date: '2026-08-12',
    type: 'released',
    title: 'Edge/document VLM wave',
    provider: 'Cohere / Liquid AI',
    country: 'CA',
    countryName: 'Canada',
    rank: 231,
    summary:
      'North-Micro-Vision-Instruct (2.4B Apache 2.0, DocVQA 0.921) and LFM2.5-VL-3B (3.1B, ~228 tok/s on M5 Max) — tiny local OCR/screen models, not coding routers.',
    source: { label: 'Cohere Labs + liquid.ai Aug 12' },
  },
  {
    id: 'nemotron-namazu',
    date: '2026-08-12',
    type: 'released',
    title: 'Nemotron Lightning + Namazu',
    provider: 'NVIDIA / Sakana AI',
    country: 'US',
    countryName: 'United States',
    rank: 243,
    summary:
      'Nemotron 3.5 Lightning (31.6B/3.6B hybrid Mamba-2+MoE, 1M, OpenMDW-1.1) with the NeMo Switchyard router; Sakana Namazu (JP-specialized K2.6 finetune, 262K, $0.95/$4.00, no EU).',
    source: { label: 'developer.nvidia.com + OpenRouter Aug 11–12' },
  },
  {
    id: 'glimmer-solar',
    date: '2026-08-10',
    type: 'released',
    title: 'Glimmer 30B + Solar Pro 4',
    provider: 'Meta / Upstage',
    country: 'US',
    countryName: 'United States',
    rank: 224,
    summary:
      'Muse Glimmer (~30B Apache 2.0, single-GPU agentic) — Meta\'s first open Muse-line model — plus Upstage Solar Pro 4 (524K agent workhorse, $0.30/$1.20).',
    source: { label: 'research.meta.ai + upstage.ai Aug 10' },
  },
  {
    id: 'cyber-56',
    date: '2026-08-10',
    type: 'released',
    title: 'GPT-5.6-Cyber (Daybreak-gated)',
    provider: 'OpenAI',
    country: 'US',
    countryName: 'United States',
    rank: 246,
    summary:
      'Cyber specialist on the Sol base for vetted defenders via Daybreak Red. Same gating pattern later reused by Astra and Gemini Cyber.',
    source: { label: 'securityweek.com Aug 10 (secondary)' },
  },
  {
    id: 'grok46',
    date: '2026-08-06',
    type: 'released',
    title: 'Grok 4.6 ships',
    provider: 'xAI',
    country: 'US',
    countryName: 'United States',
    summary:
      'Post-training update on the reported 1.5T V9 foundation: 500K ctx, configurable reasoning, $2/$6 below 200K tokens. Superseded by 4.7 (Sep 21).',
    source: { label: 'xAI Aug 6' },
  },
  {
    id: 'spark12',
    date: '2026-08-05',
    type: 'released',
    title: 'Muse Spark 1.2 + Muse Code',
    provider: 'Meta',
    country: 'US',
    countryName: 'United States',
    rank: 223,
    summary:
      'Flagship coding model (1M, $1.25/$4.25) plus the Muse Code terminal agent and a 12×-cheaper contributor tier. Superseded by 1.3 (Sep 2).',
    source: { label: 'research.meta.ai Aug 5' },
  },
  {
    id: 'qwen27b-ann',
    date: '2026-08-03',
    type: 'announced',
    title: 'Qwen3.8-27B announced (weights Aug 14)',
    provider: 'Alibaba (Qwen)',
    country: 'CN',
    countryName: 'China',
    rank: 218,
    summary:
      'Dense 27B open checkpoint announced alongside Max GA with a firm weights timeline; delivered Apache-2.0 on Aug 14. Best single-GPU pick at ~200 tok/s.',
    source: { label: 'Alibaba Aug 3' },
  },
  // ---------------- July 2026 ----------------
  {
    id: 'v4-0731',
    date: '2026-07-31',
    type: 'released',
    title: 'V4-Flash-0731 to production',
    provider: 'DeepSeek',
    country: 'CN',
    countryName: 'China',
    rank: 193,
    summary:
      'Retrained production build (284B/13B, 1M, MIT) beating the larger V4-Pro-Preview on all nine agent/coding benches; API held at $0.14/$0.28. Retired Sep 10.',
    source: { label: 'Hugging Face + api-docs Jul 31' },
  },
  {
    id: 'ax-k2',
    date: '2026-07-29',
    type: 'released',
    title: 'A.X K2 (sovereign KR model)',
    provider: 'SK Telecom',
    country: 'KR',
    countryName: 'South Korea',
    rank: 217,
    summary:
      '688B/33B Apache 2.0 sovereign model, 256K. AIME26 97.1 (best open at launch), trained FP8 on 512 B200s.',
    source: { label: 'SKT Jul 29' },
  },
  {
    id: 'laguna-s21',
    date: '2026-07-21',
    type: 'released',
    title: 'Laguna S 2.1 (free tier)',
    provider: 'Poolside',
    country: 'US',
    countryName: 'United States',
    rank: 207,
    summary:
      '118B/8B MoE, 262K, vendor 70.2% TB2.1 / 40.4% DeepSWE with a free OpenRouter tier for eval.',
    source: { label: 'Poolside Jul 21' },
  },
]

export function changeCounts(items: ChangeItem[]): Record<ChangeType, number> {
  const out = {} as Record<ChangeType, number>
  for (const t of CHANGE_TYPES) out[t] = items.filter((i) => i.type === t).length
  return out
}

/** Group items (already sorted newest-first) into month buckets, newest month first. */
export function groupByMonth(items: ChangeItem[]): { key: string; label: string; items: ChangeItem[] }[] {
  const map = new Map<string, ChangeItem[]>()
  for (const item of items) {
    const key = item.date.slice(0, 7)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, monthItems]) => ({ key, label: monthLabel(key), items: monthItems }))
}
