/** Shared catalog row type (from data.json, regenerated from the CSV). */

export interface Model {
  id: string
  slug: string
  rank: string
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
  price_in_inr_per_mtok: number | null
  price_out_inr_per_mtok: number | null
  context_window: string | null
  model_type: string | null
  last_verified: string | null
  source: string | null
  confidence: string | null
  /** Full provenance text — deferred to public/notes.json, fetched on demand. */
  notes?: string | null
  /** <=140-char excerpt shipped in the payload (regen-data.mjs). */
  note_excerpt: string | null
  /** hasIndependentScore frozen at build time (regen-data.mjs parity gate). */
  indep: boolean
  is_orchestrator: boolean
  hf_url: string | null
  price_band: string | null
  released: string | null
  released_est: boolean
  released_src: string | null
  is_free: boolean
}
