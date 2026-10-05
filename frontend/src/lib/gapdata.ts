/** Open-weight vs closed-frontier gap analysis — static research snapshot.
 *  Numbers come from independent third parties (Epoch AI, Stanford HAI 2026 AI
 *  Index, WhatLLM July 2026 gap map, Olympia Tech), cross-checked against this
 *  catalog's Oct 2026 rows. See SOURCES for links. */

export interface GapRow {
  task: string
  detail: string
  openScore: string
  openModel: string
  closedScore: string
  closedModel: string
  /** positive = closed leads by N pts; negative = open leads */
  gap: number
  openPct: number
  closedPct: number
}

export const GAP_ROWS: GapRow[] = [
  { task: 'General intelligence', detail: 'AA Intelligence Index composite', openScore: '46.3', openModel: 'MiMo-V2.6-Pro', closedScore: '57.6', closedModel: 'Claude Opus 5.5', gap: 11.3, openPct: 46.3, closedPct: 57.6 },
  { task: 'Coding composite', detail: 'AA Coding Index', openScore: '76.2', openModel: 'Kimi K3 (Max)', closedScore: '81.6', closedModel: 'Claude Fable 5.1', gap: 5.4, openPct: 76.2, closedPct: 81.6 },
  { task: 'Agentic / tool-use', detail: 'Multi-step task performance', openScore: '53.6', openModel: 'Qwen3.8-Flash-Next', closedScore: '57.9', closedModel: 'Claude Fable 5.1', gap: 4.3, openPct: 53.6, closedPct: 57.9 },
  { task: 'Scientific programming', detail: 'SciCode', openScore: '61', openModel: 'MiMo-V2.6-Pro', closedScore: '67', closedModel: 'Claude Opus 5.5', gap: 6, openPct: 61, closedPct: 67 },
  { task: 'Fresh code generation', detail: 'LiveCodeBench', openScore: '90', openModel: 'DeepSeek V3.2 Speciale', closedScore: '92', closedModel: 'Gemini 3 Pro Preview', gap: 2, openPct: 90, closedPct: 92 },
  { task: 'Long-context reasoning', detail: 'AA-LCR', openScore: '89', openModel: 'Kimi K3 (Max)', closedScore: '88', closedModel: 'Step 5 Preview', gap: -1, openPct: 89, closedPct: 88 },
  { task: 'Graduate science', detail: 'GPQA Diamond', openScore: '94', openModel: 'Qwen3.8 2.4T A95B', closedScore: '96', closedModel: 'GPT-6 Astra', gap: 2, openPct: 94, closedPct: 96 },
]

export const HEADLINES = [
  { k: '~4 months', s: 'Epoch AI: average open-weight lag behind the closed frontier since Jan 2026 (≈8 pts on its composite ECI). Down from ~16 months in the GPT-4 era — but up from 3 months in late 2025.' },
  { k: '3.3%', s: "Stanford HAI 2026 AI Index: raw capability gap between the single best closed and best open model. The old 17.5-pt MMLU chasm has closed to ~zero." },
  { k: '2–11 pts', s: 'WhatLLM July 2026 gap map: task-dependent spread. Near-parity on fresh codegen and long-context reasoning; widest on the general-intelligence composite.' },
  { k: '60–84% cheaper', s: 'Independent benchmarking: well-optimized open models deliver ~85–90% of closed performance on enterprise tasks at a fraction of the cost — and set the price ceiling for everyone.' },
]

export const OPEN_WINS = [
  { t: 'Wins real engineering benchmarks outright', d: 'GLM-5.2 topped SWE-bench Pro (62.1) and matched flagships on Terminal-Bench 2.1 and HLE-with-tools at ~1/6 the cost. V4.1 Flash ties the Claudes on TB2.1 / DeepSWE.' },
  { t: 'Repo-scale context as standard', d: 'Kimi, GLM, Qwen and MiMo all ship 1M-token windows with vision, tool calling and JSON mode — entire codebases in one prompt.' },
  { t: 'Agent swarms', d: 'Kimi K2.6 runs plan-write-test-debug loops for days with hundreds of collaborating agents — the open frontier does long-horizon structure, not just chat.' },
  { t: 'Everything renting cannot give you', d: 'Fine-tuning on your data, air-gapped / HIPAA deployment, frozen versions immune to silent vendor updates, and marginal cost trending to zero at volume.' },
]

export const GAP_HOLDS = [
  { t: 'Long-horizon agents', d: 'Error recovery and coherent work over many steps — not single functions — is the persistent closed-model advantage (Opus 5.5 / Fable 5.1 territory).' },
  { t: 'Hardest reasoning', d: 'The 11-point Intelligence Index gap lives here: frontier math, science and sustained multi-step inference.' },
  { t: 'Calibration', d: "DeepSeek's V4 line hallucinates confidently when unsure. Frontier alignment and knowing-when-you-don't-know remain a real, if narrowing, moat." },
  { t: 'The measurement caveats', d: 'Epoch warns open models hill-climb public benchmarks harder (private-test gap may be larger), closed labs keep their best models unreleased, and the compute-investment gulf is widening even as scores converge.' },
]

export const DECISIONS = [
  { when: 'High-stakes code or autonomous changes', start: 'Proprietary frontier', why: 'Maximum long-horizon reliability is worth the premium.' },
  { when: 'Private code or regulated data', start: 'Open weights', why: 'Inference and logs stay inside your boundary.' },
  { when: 'High-volume repeatable tasks', start: 'Benchmark both', why: 'A small quality loss can buy a large cost advantage.' },
  { when: 'Consumer hardware', start: 'Smaller local model', why: 'A model that fits and responds beats a larger one that thrashes memory.' },
  { when: 'Mixed difficulty', start: 'Router / hybrid', why: 'Value model by default, escalate uncertainty to frontier.' },
  { when: 'Fine-tuning or deep customization', start: 'Open weights', why: 'Weights and serving control create room APIs do not.' },
]

export const SOURCES = [
  { label: 'WhatLLM — Open Source vs Proprietary LLMs 2026: The Benchmark Gap (Jul 16, 2026)', url: 'https://whatllm.org/blog/open-source-vs-proprietary-llms-2026' },
  { label: 'Olympia Tech — Closing the Gap: How Open-Weight Models Caught the Frontier (Jul 2, 2026)', url: 'https://olympiatech.com/analysis/closing-the-gap-open-weight-llms' },
  { label: 'Presenc.ai — Open-Weight vs Closed Frontier Snapshot (Jun 2026)', url: 'https://presenc.ai/research/open-weight-vs-closed-frontier-snapshot-june-2026' },
  { label: 'DigitalApplied — Open-Weight vs Closed-Source Gap Analysis Q2 2026', url: 'https://www.digitalapplied.com/blog/open-weight-vs-closed-source-ai-models-q2-2026' },
  { label: 'CodeConductor — Open-Weight vs Closed Frontier: Which Should You Use? (Sep 2026)', url: 'https://codeconductor.ai/blog/open-weight-vs-closed-frontier-ai-models/' },
]

export const GAP_VINTAGE = 'Analyses: Jun–Jul 2026 · cross-checked against catalog rows Oct 2026'
