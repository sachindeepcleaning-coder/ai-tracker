<!-- STATS:START -->
# AI Knowledge Base — India Local & Private AI (Verified Oct 8, 2026)

**Scope:** Open-weight coding models for local/private deployment in India — models, benchmarks, pricing, hardware, and cost to serve. **302 models** (CSV ranks 1-302, single source of truth), **177 open-weight**, **191 with release dates — data as of **Oct 8, 2026**. All file prices use **₹95.12/USD** (standardized Aug 14, 2026). All benchmark scores are **vendor-reported** unless marked `AA` / `Scale` / `BenchLM` independent. **Last Update: Oct 8, 2026.**
<!-- STATS:END -->

**ai-tracker** — open-weight coding-model catalog for local/private deployment in India: benchmarks, Q4 VRAM, ₹ pricing, and hardware fit. **302 models** (CSV ranks 1-302; the stats block above is authoritative), last fact-checked **Oct 8, 2026**.

- Live site: https://sachindeepcleaning-coder.github.io/ai-tracker/
- Run it: `cd frontend && npm install && npm run dev` (Node 22); production build `npm run build`, preview with `npm run preview`.
- Data: edit `coding_benchmarks.csv`, then `cd frontend && npm run data` — regenerates `src/data.json` + `public/data.json` and refreshes the stats block above.
- History: dated update logs moved to CHANGELOG.md; research notes live in `docs/`.

**Docs in this folder:**
- `docs/local_ai_coding_models.md` — Full model tracker (60+ models) + verification + new-release log
- `docs/single_user_india_local_ai.md` — Single-user local deployment guide (RAM, tok/s, India cost)
- `docs/vera_rubin_all_models.md` — Rack-scale deployment (Vera Rubin NVL72 vs Helios, all models at Q4/FP16, TCO)
- `docs/100k_concurrent_ai_coding_service.md` — 100K concurrent users service sizing & pricing
- `docs/gpt56_family_breakdown.md` — GPT-5.6 Sol/Terra/Luna pricing & performance
- `docs/ai_cost_per_task_comparison.md` — Cost per coding-agent task ranking
- `docs/dgx_b300_deep_research.md` / `docs/dgx_b300_supporting_infra.md` — DGX B300 single-node deep dive
- `docs/data-notes-archive.md` — Retired `conversation_summary` scratch notes (were shipped in data.json)
- `coding_benchmarks.csv` / `ai_coding_api_vs_local_summary.json` — Raw data
- `archive/` — generated/large reference snapshots (`aa_models.html`, `aa_coding.html`, `meta_blog.html`): scraped leaderboard/blog pages kept for provenance, not used by the build
- `LICENSE` (MIT, code) + `DATA_LICENSE.md` (CC BY 4.0, data compilation) — see note below

**Licenses:** code and site in this repo are MIT (`LICENSE`); the data compilation (`coding_benchmarks.csv` and derived `frontend/src/data.json`) is CC BY 4.0 (`DATA_LICENSE.md`) — credit this repo when reusing the data. Model weights, benchmarks and vendor figures keep their own licenses (see each row's `License/Type`).

**Deploy note:** the site deploys from `master` via GitHub Actions (`.github/workflows/deploy.yml`, Pages source mode). The legacy `gh-pages` branch is no longer used and is safe to delete.

---

## Frontier Open Coding Benchmark Comparison (as of Aug 29)

> Vendor-reported harness scores — not directly comparable across harness labels. Only `Scale AI` mini-SWE-agent (identical scaffold) is apples-to-apples; see `docs/local_ai_coding_models.md:252`.

| Model | Total/Active, ctx | License | TB2.1 | DeepSWE | SWE Pro | LCB V6 | Notes |
|---|---|---|---|---|---|---|---|
| **Tencent Hy4 preview** 🆕 | 770B/49B, 1M+ | Apache 2.0 | **85.4** | **64.3** | **65.7** | — | |
| **GLM-5.3** | 743B/40B, 1M | Custom "other" (review gate unconfirmed) | **88.2** | **66.9** | — | — | |
| **Kimi K3** | 2.8T/104B, 1M | Kimi K3 custom | **88.3** | **67.5** | — | — | |
| **DeepSeek V4 Pro 0813** | 1.6T/49B, 1M | MIT | **87.9** | **62.7** | — | 93.5 (Pro Max) | |
| **Qwen3.8-Max** | 2.4T/95B, 1M | qwen3.8-max custom | **86.6** | 56.6 | **67.7** | — | **AA 58 (v4.1.1)** |
| **Ornith-1.5-397B** 🆕 | 403B/?, 1M | MIT | **86.1** (HF #5) | **56.0** | **65.1** | — | |
| **GLM-5.3-Flash** | 320B/18B, 1M | MIT | **84.3** | **63.4** | — | — | **AA 57 (v4.1.1)** |
| **Qwen3.8-Flash-Next** 🆕 | 180B/6B, 262K→1M | Qwen Community 1.0 | — | **58.7** | **62.5** | **91.9** | |
| **DeepSeek V4 Flash 0731** | 284B/13B, 1M | MIT | **82.7** | ~54.4 | — | **91.6** | |
| **Qwen3.8-27B** (best small) | 27B dense, 262K→1M | Apache 2.0 | **73.0** | **42.2** | **61.7** | **90.3** | **AA 52 (v4.1.1)** |

**Axes:** TB2.1 tight `88.3≈88.2≈87.9>86.6>86.1>84.3`; DeepSWE `67.5>66.9>64.3>58.7>56.0`; LCB `91.9 (Flash-Next) >91.6 (V4 Flash) >90.3 (27B)`. SWE-Pro: `Hy4 65.7 > Ornith-1.5-397B 65.1 > Flash-Next 62.5 > Qwen3.8-27B 61.7 > V4 Flash 56.0`. AA figures in this table are v4.1.1 — v4.3.2 re-scores differ (Flash 42, Spark 48); never mix index versions in one comparison. Ornith-1.5-397B SWE-V **86.0%** (#1 HF), TB 86.1 (#5 HF) — partial leaderboard verification, HF Staff uploaded. Scale standardized: best open **38.7%** (Qwen3-Coder 480B) vs proprietary **59.1%** (GPT-5.4) — vendor +10-20 pts inflation.

**Are the giants worth it?** V4 Pro (~850 GB Q4), Qwen Max (~1,200 GB), Kimi K3 (~1,400 GB) cost 5-10× more than what fits in 512 GB. The benchmark gaps are negligible:

| Benchmark | Best fit in 512 GB | V4 Pro / Qwen Max / Kimi K3 | Gap |
|---|---|---|---|
| TB 2.1 | GLM-5.3 88.2% | K3 88.3% | **+0.1 pts** |
| DeepSWE | GLM-5.3 66.9% | K3 67.5% | **+0.6 pts** |
| LCB V6 | V4 Flash 91.6% | V4 Pro Max 93.5% | **+1.9 pts** |
| SWE-Pro | Hy4 65.7% | Qwen Max 67.7% | **+2.0 pts** |

**TL;DR:** Giants gain 0–2 benchmark points at 5–10× the hardware cost. Spend the savings on better infra for models that fit.

**Pick:** Best absolute `GLM-5.3/K3/Hy4` (Flash = cheap MIT proxy: 2× faster/token than 5.3 at same VRAM). Best efficiency `V4 Flash 0731` (155GB Q4) or **Qwen3.8-Flash-Next** (~111GB Q4, SWE-Pro 62.5, LCB 91.9) or **Ornith-1.5-397B** (~244GB, SWE-V 86.0, MIT). Best single-GPU `Qwen3.8-27B` (14GB Q4, ~105 tok/s single-stream on 1×5090).

---

## Pricing Changes That Broke Single-Number Models (verified Aug 29)

| Change | Old | New | When |
|---|---|---|---|
| **GPT-5.6 Sol** promo | $5.00 / $30.00 | **$4.00 / $20.00** (cached $0.40, 90% off) through **≥Nov 21, 2026** | Aug 21 (Reuters, OpenAI docs) |
| **GPT-5.6 Terra** | $2.50 / $15.00 | **$2.00 / $12.00** | Jul 30 |
| **GPT-5.6 Luna** | $1.00 / $6.00 | **$0.20 / $1.20** | Jul 30 |
| **DeepSeek V4 Pro** peak/off-peak | $0.435 / $0.87 flat | **$0.66/$1.98 off-peak; $1.32/$3.96 peak** (01-04 & 06-10 UTC) | Aug 16 16:00 UTC |
| **DeepSeek V4 Flash** | $0.14 / $0.28 flat | **$0.22/$0.66 off-peak; $0.44/$1.32 peak** | Aug 16 |
| **Claude Sonnet 5** | $2/$10 intro → $3/$15 | **$2/$10 now standard** (rise cancelled) | Aug |
| **Gemini 3.7/3.6 Flash** | $0.75/$3.75 intro | **$1.50/$7.50 from Jan 1, 2027** (cache $0.075→$0.15) | Google pricing page |
| **GLM-5.3** | — | **$1.40/$4.40** (cached $0.26) | ~Aug 21 |
| **Hy4 preview** | — | **$0.834/$2.501** | Aug 28 |
| **Grok 4.6 cached in** | $0.30/M | **$0.50/M** | Aug 12 |

DeepSeek = price increase (cheapest hour 2.3× old output; cache-hit +10×). Gemini intro = 50% off until Dec 31.

---

## Hardware — What Fits Where (Q4 weights only; +KV/cache at ctx)

**How "Full Q4 VRAM (GB)" is computed:** weights-only size at standard 4-bit quantization (Q4_K_M-class, ≈0.5 bytes per parameter; e.g. 27B → ~14GB). Excludes KV cache, activations and runtime overhead (+10–15GB on top). Larger community builds (e.g. UD-Q4_K_XL, ≈0.63 bytes/param) run ~25% bigger and are labeled where used — a bare "Q4" figure always means the catalog definition, so the same model never shows two different Q4 sizes without a quant label. Named exception: **DeepSeek V4.1 Flash shows 280GB because that is 552B backbone × 0.5** (official card: "552B backbone parameters"); the full safetensors checkpoint is 763.2B including vision/Engram/MTP, so expect a ~763GB download even though the "fits" labels assume the 552B backbone. Convention for composite-param models: **total params stay the headline sum** (e.g. Flash-Next 125B + 51B n-gram + 4B MTP = 180B per its HF card), while **Q4 is whatever the published quant actually weighs** (Flash-Next 111GB = Unsloth GGUF, not 180 × 0.5) — the Notes cell always says which.

**Mac Studio M5 bandwidth assumptions:** `1× Mac Studio M5 512GB` = M5 Ultra class, ≈1.2 TB/s unified memory bandwidth (512GB tier); `4× Mac Studio M5 2TB` = 4 nodes ≈ 4.8 TB/s aggregate before Thunderbolt interconnect overhead (single-stream decode is interconnect-bound across nodes, so divide by ~2–3× in practice). M5 Max 128GB = 614 GB/s. Single-stream decode ceiling ≈ bandwidth ÷ Q4-GB.

| Model | Q4 size | 1×5090 32GB | 2×5090 64GB | 4×5090 128GB | 1×Pro6000 96GB | 2×Pro6000 192GB | 4×DGX Spark 512GB | 8×Pro6000 768GB |
|---|---|---|---|---|---|---|---|---|
| Qwen3.8-27B | 14 GB | ✅ ~105 tok/s single-stream | ✅ | ✅ | ✅ | ✅ | ✅ ~64 tok/s single-stream | ✅ |
| **Ornith-1.5-9B** 🆕 | 6 GB | ✅ dense | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apodex 1.1-mini** 🆕 | 17 GB | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Qwen3.8-Flash-Next** 🆕 | 111 GB | offload ~25 | offload ~40 | Q3 ~50-70 | offload only (111 > 96GB) | ✅ | ~70-100 | ✅ |
| **Ornith-1.5-35B-A3B** 🆕 | 22 GB | offload | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **MAI-Code-1.1-Flash** 🆕 | ~70 GB | offload | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| V4 Flash 0731 | 142 GB | offload ~15 | offload ~25 | Q3 ~60-80 | offload | Q4 fits (FP8 240 tok/s claim removed — 284GB weights exceed 192GB VRAM) | ~80-100 | ✅ |
| GLM-5.3-Flash | 160 GB | — | — | Q3 fit | — | fit | ✅ 50-80 (2× faster than 5.3) | ✅ |
| **Ornith-1.5-397B** 🆕 | 244 GB | — | — | — | — | — | Q3 fit | ✅ 30-50 |
| GLM-5.3 / Hy4 | 372 /385 GB | — | — | — | — | — | **25-35 tok/s (GLM-5.3) / Hy4 Q3** | ✅ 30-70 |
| V4 Pro 0813 | ~850 GB | — | — | — | — | — | — | Q2 only |
| K3 / Qwen Max | 1,200-1,400 GB | — | — | — | — | — | — | — (multi-node) |

**Single-user India picks (Aug 2026 street, 5-yr TCO):**
- **Best value:** `1× RTX 5090 (~₹5L)` → Qwen3.8-27B ~105 tok/s single-stream (decode bandwidth cap: ~1.8TB/s ÷ 14GB)
- **Balanced:** `2× DGX Spark (~₹10-11L)` → V4 Flash ~40 tok/s; `4× DGX Spark (~₹22-30L, MikroTik)` → GLM-5.3 25-35 + V4 Flash 80-100 + Qwen ~64 single-stream (4×273GB/s ÷ 14GB) `docs/single_user_india_local_ai.md:333`
- **Speed:** `2× Pro 6000 (~₹85L-1.1Cr)` → V4 Flash Q4 (single-stream rate unverified; FP8/243 claim removed — 284GB weights cannot fit 192GB VRAM); `4× Pro 6000 (~₹1.7-2.1Cr)` → GLM-5.3/Hy4 comfortable
- **Portable:** MacBook M5 Max 48-128GB (~₹5-7.5L) → Qwen27B only
- **Any model one-at-a-time:** `DGX B300 2.1 TB (~₹5.5Cr landed, 5-yr ~₹11.7Cr)` — every open weight at Q4 with 30s NVMe→HBM swap `docs/dgx_b300_deep_research.md`

---

## Rack-Scale: Vera Rubin NVL72 vs AMD Helios (verified)

| Spec | **NVIDIA Vera Rubin NVL72** | **AMD Helios** |
|---|---|---|
| GPUs | 72× Rubin | 72× MI455X (CDNA5) |
| HBM4 / GPU | 288 GB @ 22 TB/s | 432 GB @ 23.3 TB/s (19.6 TB/s in some docs) |
| Total HBM4 | **20.7 TB** @ 1,580 TB/s agg | **31 TB** @ ~1,410 TB/s agg |
| FP4 / FP8 | 3.6 EF /1.26 EF | 2.9 EF /1.4 EF |
| Interconnect | NVLink 6 (3.6 TB/s/GPU) | UALink over Ethernet (open) + UEC scale-out |
| TDP | ~200 kW | ~235 kW |
| US price (est) | $4-8M (varies) | $5-5.5M (Futurum estimate) |
| India landed (est) | ₹47-65 Cr | ₹45-55 Cr |
| 5-yr TCO | ~₹122 Cr | ~₹117 Cr |
| Availability | H2 2026 (fall shipments, shipping Sep 2026) | Volume 2H 2026 (late-Q3 shipments, in production) |
| Software | CUDA mature | ROCm 7 catching up |

Both launch Advancing AI / GTC 2026: Helios 2.9 EF dense FP4, 1.4 EF FP8, 260 TB/s scale-up, 43 TB/s scale-out `amd.com/newsroom 2026-07-23`; Rubin 3.6 EF FP4, NVLink 6, 260 TB/s scale-up `nvidia.com`. Helios = 50% more memory, open standards; Rubin = higher per-GPU BW, FP4, efficiency, maturity.

**Capacity (1 rack at Q4):** All ~74 models (~14.4 TB weights) **fit 1 Rubin** (6.3 TB headroom) / **1 Helios** (16.6 TB headroom). Mixed ~300 users (Rubin) vs 500-700 (Helios) due to KV budget.

---

## 100K Concurrent Users — What It Takes

**Efficient strategy (dedicated tiers, 10 racks ≈15-25K users @50 tok/s):**

| Build | Racks for 100K | Capex | 5-yr TCO |
|---|---|---|---|
| **Rubin, top-10 models (MVP, recommended)** | **12** | ₹775 Cr | **₹1,470 Cr** |
| Rubin, all models (if orchestration existed) | 50 | ₹3,230 Cr | ₹6,100 Cr |
| Helios, all models (2-3× users/rack) | 20 | ₹1,140 Cr | ₹2,340 Cr |

Break-even **₹2,450/mo (top-10) → ₹10,200/mo (all-models Rubin)** per concurrent user. At 10-20% subscriber concurrency the top-10 MVP costs **~₹245-490/mo per subscriber** (₹2,450 ÷ 10–5 subscribers per concurrent seat); the **~₹2,000/mo per-subscriber** figure belongs to the all-models build at 20% concurrency (₹10,200 ÷ 5). Agentic 99/1 input/output, cache-hit input ~**₹10-30/M** vs miss `₹400-800/M`. Real blocker: no engine serves 74 architectures from one pool — ship top-10 (V4 Flash/Pro, GLM-5.3/Flash, Hy4, K3, Qwen-Max, Qwen27B) behind router now `docs/100k_concurrent_ai_coding_service.md`.

---

