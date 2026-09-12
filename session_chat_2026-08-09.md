# Session Chat Log — 2026-08-09

**Working directory:** local clone of the `ai-tracker` repo
**Topic:** AI coding models — API vs local cost, local hardware, and scaling economics

---

## Files in Working Directory (at session start)

| File | Size | Contents |
|---|---|---|
| `ai_coding_api_vs_local_summary.json` | 6.3 KB | API vs local hardware cost comparison (1B tokens/day agentic coding) |
| `ai_cost_per_task_comparison.md` | 4.8 KB | Cost per coding-agent task across models (July 2026) |
| `coding_benchmarks_july2026_final.csv` | 23.8 KB | 218 models × 22 columns (benchmarks, prices, VRAM) |
| `dgx_b300_deep_research.md` | 17.6 KB | NVIDIA DGX B300 specs, model-fit, India customs |
| `dgx_b300_supporting_infra.md` | 19.8 KB | DGX B300 infrastructure & TCO breakdown |
| `gpt56_family_breakdown.md` | 4.7 KB | GPT-5.6 Sol/Terra/Luna tiers, pricing, use cases |
| `local_ai_coding_models.md` | 85.4 KB | Open-weight coding models, VRAM/throughput, India pricing |
| `vera_rubin_all_models.md` | 39.3 KB | Vera Rubin NVL72 vs AMD Helios rack comparison |
| `aa_coding.html` | 680 KB | Artificial Analysis Coding Agent leaderboard (scraped) |
| `aa_models.html` | 4.8 MB | Artificial Analysis LLM leaderboard (scraped) |
| `meta_blog.html` | 197 KB | Meta blog posts page (scraped) |

---

## What Was Done

1. **Read the JSON summary** — comparison of API costs vs local hardware for high-volume (1B tokens/day) agentic coding; 12 models discussed, recommended 3× RTX PRO 6000 Blackwell build (288GB, ₹50-60L).

2. **Read all other files** — cost-per-task comparisons, DGX B300 deep research + infra, GPT-5.6 family breakdown, local coding models, Vera Rubin vs Helios rack comparison.

3. **Updated the JSON** — parsed `coding_benchmarks_july2026_final.csv` and added all 218 models to a new `all_coding_models` array (23 fields each).

4. **Audited the JSON** and found:
   - 104 rows had `$` baked into price strings
   - Name mismatches between summary `models_discussed` and CSV (Tencent Hy3→Hy3, DeepSeek V4 Flash-0731→official, Qwen3 Coder 480B→480B-A35B, Claude Fable 5 absent)
   - 3 wrong summary cost estimates (GPT-OSS-120B 4x high, Qwen3 Coder 480B 2x low, Grok 4.20 38% low)
   - Stale prices: CSV listed GPT-5.6 Luna $1/$6 and Terra $2.50/$15, but docs record July 30 cuts to $0.20/$1.20 and $2/$12
   - Currency rate inconsistency across files (95.17 / 96.50 / 83) — later standardized to ₹95.12 (Aug 14, 2026)

5. **Fixed** — applied price cuts to CSV, normalized JSON prices to numbers, added `id`/`model_name_mapping`/`price_notes`, added Claude Fable 5 (rank 999), recomputed all 12 summary estimates from CSV prices at ₹95.17. **Later (Aug 14, 2026) all rates standardized to ₹95.12 and INR figures recomputed.**

---

## Fact-Check Audit (applied after review)

An external fact-check of these files was reviewed. Findings applied vs rejected:

| # | Claim | Verdict | Action |
|---|---|---|---|
| 1 | DGX B300 requires liquid cooling (docs say air-cooled) | ❌ **Rejected** — NVIDIA's own User Guide & Data Center Best Practices confirm air cooling (optional RDHx); fact-check conflated HGX B300 (DLC) with DGX B300 | None |
| 2 | GPT-5.6 Sol cost-per-task is $7.08 (AA-measured), not $1.04 | ✅ Confirmed from `aa_coding.html` | Updated `ai_cost_per_task_comparison.md`, `gpt56_family_breakdown.md` |
| 4 | Gemini 3.1 Pro (~$2.00) and Muse Spark 1.1 (~$1.43) cost-per-task inflated in doc | ✅ Confirmed (AA measured) | Updated cost tables |
| 5 | AA Coding Agent Index composite: Opus 5 (0.6674) > Sol (0.6657) | ✅ Confirmed | Added note to comparison doc |
| 6 | DGX B300 real price $400-500K, not $300-350K | ✅ Confirmed (Reuters ~$550K; reseller quotes) | Updated `dgx_b300_deep_research.md` |
| 8 | Rubin power tariff inconsistent (₹9/kWh stated, ₹11.25/kWh implied) | ✅ Confirmed | Fixed `vera_rubin_all_models.md` |
| 3 | 100k users → token/yr math | ⚠️ Misread (was 20 tok/s × 8h/day); relabeled rather than fixed | Updated this file |
| 7 | DGX B300 TCO varies across files | ⚠️ Different assumptions, not an error | None (documented) |

**AA-measured cost-per-task (from `aa_coding.html`):** Codex-GPT-5.6 Sol **$7.08**, Claude Code-Opus 5 **$8.23**, Claude Code-Fable 5 **$11.71**, Kimi Code-K3 **$3.18**, Opencode-Muse Spark 1.1 **$1.43**, Gemini CLI-3.1 Pro **$2.00**, Grok Build-4.5 **$2.59**. AA Coding Agent Index: **Opus 5 0.6674** > **Sol 0.6657**.

---

## Q&A Summary

### Q: What does it cost to run models locally?

| Tier | Hardware | Cost | What it runs |
|---|---|---|---|
| Single GPU | 1× RTX 5090 (32GB) | ~₹3.5L | Qwen3.6-27B (77.2% SWE), 183 tok/s |
| Mid | 8× RTX 5090 / Mac M3 Ultra 512GB | ~₹28L / ~₹12L | DeepSeek V4 Flash Max (79% SWE, 1M ctx) |
| Sweet spot | 3× RTX Pro 6000 (288GB) | ₹50-60L | Hy3 + DeepSeek V4 Flash |
| Run-anything | 1× DGX B300 (2.1TB) | ₹5.5 Cr (5-yr TCO ~₹11.7 Cr) | Every open model at Q4, 30s swap |
| All-models-simultaneous | Vera Rubin NVL72 / Helios | ₹55-65 Cr (5-yr TCO ~₹122 Cr) | All ~86 models, 150-700 users |

API to beat: DeepSeek V4 Flash ≈ ₹49 lakh/year uncached. Local becomes economical at sustained high volume.

### Q: DGX B300 vs Vera Rubin/Helios — what's the felt difference?

| | DGX B300 | Rubin NVL72 / Helios |
|---|---|---|
| Model switching | 30s swap | Instant, all loaded |
| Frontier speed (50B @ 1M) | ~30 tok/s | ~30-150 tok/s |
| Small model speed (3B) | ~300 tok/s | ~800-8,000 tok/s |
| Concurrent users | 30-50 | 150-700 |
| Facility | Home, 10kW, air-cooled | Datacenter, 200kW, liquid-cooled |
| 5-yr TCO | ₹11.7 Cr | ₹117-122 Cr |

**Key insight:** autoregressive decoding is sequential — 72 GPUs can't parallelize one user's tokens. For single-user work, DGX is the rational choice (docs' own conclusion). Rubin/Helios only win for multi-user simultaneous serving.

### Q: Per-user tok/s at 50 concurrent users?

| Model type | DGX B300 | Rubin NVL72 | Helios |
|---|---|---|---|
| Small (3B active) | ~30-60 tok/s | ~1,200 tok/s | ~2,400-3,600 tok/s |
| Frontier (50B @ 1M) | ~8-16 tok/s | ~200 tok/s | ~400-600 tok/s |

DGX is at its ~50-user ceiling; Rubin/Helios barely break a sweat.

### Q: What's needed for 100,000 concurrent users (fastest tok/s)?

Requirement: ~5,000,000 tok/s aggregate (~50 tok/s/user × 100k).

| Deployment | Racks | 5-yr TCO | Power |
|---|---|---|---|
| Single MLA model (V4 Flash) | ~40-70 racks | ₹5,000-8,500 Cr (~$600M-1B) | 8-14 MW |
| Mixed all open-weight | ~200 racks | ₹24,000 Cr (~$2.9B) | 40 MW |
| Kimi K3-class @ 1M ctx | ~250 racks (KV-bound) | ₹30,000+ Cr | 50 MW |

Fastest path: single small-active MLA model (DeepSeek V4 Flash / Qwen3.6-35B), 50-70 Helios-class racks, ~$600M-1B. Hyperscaler territory — realistically better to rent cloud GPUs unless running near-100% utilization. Reference: Jio's ₹10 lakh Cr / 500M-user investment.

### Q: Per-user charge for ROI at 100k concurrent?

| Per-user speed | Racks | 5-yr cost/user | Break-even/mo | Charge @ 3x |
|---|---|---|---|---|
| 20 tok/s | ~50 | ₹5.65 L | ~₹9,400/mo | ~₹28,000/mo |
| 50 tok/s | ~125 | ₹14.1 L | ~₹23,500/mo | ~₹70,000/mo |

**Per-token alternative** (assumptions: **20 tok/s/user × 8h/day × ~50% utilization** → 100k × 20 × 28,800s × 0.5 = 28.8B tok/day × 365 = **~10.5T tokens/year**): break-even **~₹1.08 per 1M tokens**; charge ~₹11/M = 25-100x cheaper than any API (DeepSeek V4 Flash ₹13.5/27 per Mtok; GPT-5.6 Sol ₹482/2,895).

> **⚠️ Assumption-sensitive.** If you instead assume the **50 tok/s interactive tier at 24/7**, the same 100k users serve **78.84T tokens/yr** (100k × 50 × 86,400 × 365 × 0.5), and break-even drops to ~₹0.14/M. The ₹1.08/M figure is only valid for the 20 tok/s × 8h/day case it was derived from.

**Caveats:** 100k concurrent needs ~200-400k subscribers (25-50% concurrency ratio); 100% sell-through assumed — at 50% utilization double all per-user costs; ₹28k/mo sits above Cursor Pro/Devin unless backed by a privacy/data-residency story.

### Q: Build cost + pricing for a 100k-concurrent, all-open-models coding service (India)?

**Deliverable: `100k_concurrent_ai_coding_service.md`** (new file). Highlights:

| Build | Racks | Capex | 5-Yr TCO | Serves |
|---|---|---|---|---|
| Rubin, all models | 50 | ₹3,230 Cr | ₹6,100 Cr | All ~86, switchable* |
| Helios, all models | 20 | ₹1,140 Cr | ₹2,340 Cr | All ~86, switchable* |
| **Rubin, top-10 models (MVP)** | **12** | **₹775 Cr** | **₹1,470 Cr** | Top 10, switchable ✅ |

- **Break-even:** ~₹2,500-10,200/mo per concurrent user; ~₹150-390 per 1M tokens at 50% util
- **Charge:** ₹15-20k/mo Pro subs (blended ₹12-15k) and/or ₹400-800/M cache-miss input + ₹10-30/M cache-hit input → 500k subs × ₹13k/mo ≈ 6x margin, payback < 2 yrs
- **Key caveat:** all-86-models hot-swap blocked by the software gap (no multi-architecture pool engine exists); MVP = top-10 models + router this year, ~₹775 Cr
- **Duty tip:** STPI/EoU/SEZ bonded import defers ~48% duty — worth ~₹1,000 Cr+ on the 50-rack build

\* blocked by software gap (~₹50-100 Cr, 2-3 yrs orchestrator build)

---

## Key Data Points (for quick reference)

- **Currency rates in use:** 95.12 (summary), 96.50 (DGX/Rubin files), 83 (local_ai_coding_models.md) — **standardized to ₹95.12 across all files on Aug 14, 2026** (JSON/CSV/gpt56/100k_concurrent/deep_research/supporting_infra recomputed; Rubin/Helios ₹ Cr estimates left as planning ranges; local_ai_coding_models.md ₹83 India-hw estimates left)
- **July 30 price cuts applied:** GPT-5.6 Luna/Luna Pro $0.20/$1.20; Terra $2.00/$12.00
- **Best single-GPU model:** Qwen3.6-27B (14GB Q4, 77.2% SWE, Apache 2.0)
- **Cheapest coding task:** GPT-5.6 Luna @ $0.04/task (~293x cheaper than Claude Fable 5 @ $11.71)
- **Scale reference:** 1B tokens/day ≈ ~116 tok/s output if evenly distributed (99% input split)
- **All scores vendor self-reported** — no independently verified open-weight SWE-bench score; only Scale AI standardized Pro set is apples-to-apples (open models max ~38.7%)
- **Post-session releases (after Aug 9):** Grok 4.6 (Aug 12, $2/$6, AA 61), V4-Flash-0731 (Jul 31, major agent gains), Muse Spark 1.2 (**Aug 5**, same $1.25/$4.25; AA 54/57 xhigh; TB2.1 80%; new contributor tier $0.10/$0.20; paired with **Muse Code** terminal agent), Muse Glimmer (Aug 10, 30B Apache 2.0), **Gemini 3.7 Flash** (Aug 13, $0.75/$3.75 intro to Dec 31 → $1.50/$7.50; AA 56; DeepSWE 65.3%; 340 tok/s). Aug 15 additions: **Qwen3.8-27B** (Aug 14, dense 27B, Apache 2.0, LCB 90.3/TB 73.0), **DeepSeek V4 Pro 0813** (Aug 13, TB2.1 87.9%), **Nemotron 3.5 Lightning** (Aug 11, 31.6B/3.6B), **Ling 3.0 Tiny** (Aug 6, 7.9B/~1.3B, MIT), **GLM-5.3** (Aug 14, 743B/40B, TB2.1 88.2, API-only; weights promised ~2 wks).

---

*Session ended 2026-08-09. Files modified: `ai_coding_api_vs_local_summary.json`, `coding_benchmarks_july2026_final.csv`, `ai_cost_per_task_comparison.md`, `gpt56_family_breakdown.md`, `dgx_b300_deep_research.md`, `vera_rubin_all_models.md`, `100k_concurrent_ai_coding_service.md`.*
