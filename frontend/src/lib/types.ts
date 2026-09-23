export type ModelType = 'foundation' | 'orchestrator' | 'router' | 'cascade' | 'specialized'
export type Source = 'vendor' | 'artificial-analysis' | 'lmsys' | 'huggingface' | 'manual' | string
export type Confidence = 'high' | 'medium' | 'low'

export interface Model {
  rank: string
  id: string
  model: string
  provider: string
  total_parameters: string | null
  active_parameters: string | null
  full_q4_vram_gb: number | string | null
  license: string
  swe_bench_verified: string | null
  swe_bench_pro: string | null
  livecodebench_v6: string | null
  terminal_bench: string | null
  humaneval: string | null
  mmlu_pro: string | null
  gpqa_diamond: string | null
  hle: string | null
  math: string | null
  aime_2026: string | null
  arc_agi_2: string | null
  price_in_usd_per_mtok: number | null
  price_out_usd_per_mtok: number | null
  context_window: string | null
  price_in_inr_per_mtok: number | null
  price_out_inr_per_mtok: number | null
  // curated
  released: string | null
  released_est: boolean
  released_src: string | null
  is_free: boolean
  // new production-grade curated
  model_type: ModelType | null
  last_verified: string | null
  source: Source | null
  confidence: Confidence | null
  notes: string | null
  is_orchestrator: boolean
}
export const DATA_VERSION = '2026-09-23'
