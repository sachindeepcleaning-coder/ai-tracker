# AI Knowledge Base — India Local & Private AI (Verified Sep 23, 2026)

**Scope:** Open-weight coding models for local/private deployment in India — models, benchmarks, pricing, hardware, and cost to serve. All file prices use **₹95.12/USD** (standardized Aug 14, 2026). All benchmark scores are **vendor-reported** unless marked `AA` / `Scale` / `BenchLM` independent. Verified via live search **Aug 29-30, 2026** + synced **Sep 2, 2026** to `llm-releases.com` (339-model catalog, methodology + changelog taxonomy). Deep audit sync completed **Sep 15, 2026**. Frontier wave **Sep 12-22** added **Sep 23, 2026** (279 models).

> **Sep 23, 2026 Frontier Wave (ranks 271-279, fact-checked via live search Sep 23)**
> - **Grok 4.7** (xAI, GA Sep 21, $2/$6 + $0.50 cache, fast 2x variant) — was delayed past ~Sep 12, now shipped.
> - **GPT-6 Sol / Luna** (OpenAI, GA Sep 22, $2/$10 and $0.10/$0.50) — ~50% below GPT-5.6 promo, on API/Codex/ChatGPT/Copilot.
> - **Claude Opus 5.5** (Anthropic, GA Sep 22, $4/$20 + $0.20 cache) — secondary-only TB4.0 66.4% claim kept in notes, NOT in the TB2.1 column.
> - **MiMo-V2.6-Pro / Flash / Distill** (Xiaomi, MIT Sep 21) — Pro 1.02T/42B at **AA 46, top open-weight** ($0.435/$0.87); Flash 309B/15B ($0.14/$0.28); Distill 9B SFT with SWE-Pro 44.6% vendor claim in the correct column.
> - **AliceAI Foundation 80B** (Yandex, Apache 2.0 ungated Sep 21, 80B/3B, 262K) + **Atria Dawn Preview** (Sep 12, details thin).
> - Frontend sync: Explorer virtualized list → responsive grid, hardware tiers added (4×Pro 6000 384GB, Mac Studio M5, Vera Rubin NVL72), `VERIFIED_AT`/`DATA_AS_OF` → Sep 23, `data.json` v2026-09-23 (279 models, 173 dated).

> **Sep 15, 2026 Deep Audit Sync**
> - **Salesforce Koa** added rank 268 — Nemotron 3 Super post-train for Agentforce CRM workflows, Salesforce-hosted pilot announced Sep 15, GA winter 2026, weights controlled, vendor claims 3× fewer errors on internal CRM Bench.
> - **DeepSeek V4.1 Flash** pricing completed: peak $0.30/$1.20, off-peak $0.15/$0.60, INR ₹28.54/₹114.14, cache $0.003/$0.006; architecture 552B MoE CED, KV-compression.
> - **GPT-6 Astra / Astra Pro** enriched: DeepSWE v1.1 74.1%, Critical cyber threshold note, TB4.0 57.7% / OSWorld 72.6%.
> - **Grok 4.7 delayed** (missed ~Sep 12); 4.8 ~2.5T new C++ stack in training → RL next.
> - Frontend sync: `VERIFIED_AT`/`DATA_AS_OF` updated to Sep 15, `data.json` regenerated 268 models, Tracker tab fact-checked Sep 15 with Koa & Grok entries.

> **Sep 2, 2026 Sync vs llm-releases.com (343 models Sep 2, 35 new/30d) + Anthropic Sep 1 + Meta/Google Sep 2:** **Split Qwen3.8-Flash (Available API, Proprietary $0.15/$0.47, 1M) vs Flash-Next (Preview weights, Qwen Com 1.0, 262K→1M)** — was conflated. **17 models added:** Parse 5 (Cohere 2.3B $1.50/1k pgs), Ling-3.0-flash-Fin (124B/5.1B finance free), Thomson (TR legal Preview), Hy-MT2-30B-A3B (MT), Dots3-Note Preview (280B/16B 512K), LFM2.5-VL-3B (3.1B edge), Nemotron 3.5 Lightning (31.6B/3.6B), Namazu (Sakana JP), Solar Pro 4 (524K), GPT-5.6-Cyber, **Fable 5.1/Mythos 5.1** (Sep 1, $10/$50 + $0.25 cache), **Qwen3.8-Max-0902** (Sep 2, TB3 29%/DeepSWE 69.3%), **Gemini 3.8 Flash** (Sep 2, 1M $0.75/$3.75 AA 59), **Muse Spark 1.3** (Sep 2, 1M $1.25/$4.25 — ⚠️ launch AA 61/62 superseded by v4.3 re-score **48**), **Mercury 2.5 Preview** (Aug 31 diffusion 260K $0.20/$0.75). GLM-5.2 Turbo reconciled. Added **§0 Methodology + §7 Changelog + Status** per `llm-releases.com/methodology`. See `ai_model_tracker_aug29_2026.md` §2 + §Gap-fill + `coding_benchmarks_july2026_final.csv:238-256`.

> **Sep 1, 2026 Live Cross-Check Updates:** GLM-5.3 weights released **Aug 27** (not Aug 28); HF license shows "other" — Reuters >$10B review gate **unconfirmed**. **Qwen3.8-27B AA Index = 52** independent. **MAI-Code-1-Flash is closed-weight API-only** — remove from local lists. Added models: Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, MiniMax M3, Kimi K2.7-Code, Laguna S 2.1, Muse Glimmer (AA 35), Ornith-1.5-397B, Apodex 1.1-mini. See `ai_model_tracker_aug29_2026.md` §2b and `single_user_india_local_ai.md` Post-Session Update.

**Docs in this folder:**
- `local_ai_coding_models.md` — Full model tracker (60+ models) + verification + new-release log
- `single_user_india_local_ai.md` — Single-user local deployment guide (RAM, tok/s, India cost)
- `vera_rubin_all_models.md` — Rack-scale deployment (Vera Rubin NVL72 vs Helios, all models at Q4/FP16, TCO)
- `100k_concurrent_ai_coding_service.md` — 100K concurrent users service sizing & pricing
- `gpt56_family_breakdown.md` — GPT-5.6 Sol/Terra/Luna pricing & performance
- `ai_cost_per_task_comparison.md` — Cost per coding-agent task ranking
- `dgx_b300_deep_research.md` / `dgx_b300_supporting_infra.md` — DGX B300 single-node deep dive
- `coding_benchmarks_july2026_final.csv` / `ai_coding_api_vs_local_summary.json` — Raw data

---

## 🆕 Last Update — Sep 2, 2026 (synced to llm-releases.com 339)

### Sep 2 Gap-fill vs llm-releases.com — 12 models + Fable 5.1 + taxonomy split 🆕

**Synced to `llm-releases.com` catalog (Sep 2, 339 models, 35 new/30d, methodology `detection→extraction→validation→human review→audit log`) + Anthropic Sep 1.** Local was missing doc-VLM, MT, legal/cyber verticals and conflated Qwen twins. Now also **Sep 1 frontier Fable 5.1** added at §2 top.

- **Split:** `Qwen3.8-Flash` (**Available / Proprietary, 1M, $0.15/$0.47/$0.016**) vs `Qwen3.8-Flash-Next` (**Preview / Qwen Community 1.0, 262K→1M, ~111 GB Q4**) — distinct rows `llm-releases.com/models/qwen3-8-flash` vs `...flash-next`. Local previously conflated as one entry `ai_model_tracker_aug29_2026.md:Qwen3.8-Flash-Next`.
- **Added 17 models** (`ai_model_tracker_aug29_2026.md: §2 Fable 5.1/Qwen0902/Gemini/Muse/Mercury` + `§Gap-fill Sync`, `coding_benchmarks_july2026_final.csv:238-256`): **Fable 5.1/Mythos 5.1** (Sep 1, $10/$50 + **$0.25 cache** → ~25%/45% cheaper, TB-Science 52.6% 2×), **Qwen3.8-Max-0902** (Sep 2, TB3 29%/DeepSWE 69.3%), **Gemini 3.8 Flash** (Sep 2, 1M $0.75/$3.75 AA 59), **Muse Spark 1.3** (Sep 2, 1M $1.25/$4.25 ⚠️ AA 48 v4.3, not 61/62), **Mercury 2.5 Preview** (Aug 31 diffusion 260K $0.20/$0.75) + **Parse 5** (Cohere 2.3B $1.50/1k pgs), **Ling-3.0-flash-Fin** (124B/5.1B finance), **Thomson** (TR Preview), **Hy-MT2-30B-A3B** (MT), **Dots3-Note Preview** (280B/16B), **LFM2.5-VL-3B** (3.1B), **Nemotron 3.5 Lightning** (31.6B/3.6B SWE-V 51.56), **Namazu** ($0.95/$4), **Solar Pro 4** (524K), **GPT-5.6-Cyber**. `GLM-5.2 Turbo` reconciled as **Available API tier** $1.99/$6.16.
- **Follow-up updates:** **Laguna S 2.1** detailed (118B/8B 262K 70.2% TB2.1 /40.4% DeepSWE, free `poolside/laguna-s-2.1:free`), **MAI-Thinking-1** promoted `Upcoming→Preview` (Aug 12, 962B/34.7B 52.8% SWE-Pro /46.0% TB2.0, Foundry — `csv:34`), **DeepSeek V4 Flash Vision** benchmarks filled (83.9/59.3/57.7, 1.05M — `csv:253`), **Muse Spark 1.2 date verified Aug 5** (not Aug 6), **dots3-note IMO 42/42 = internal harness branch**.
- **Taxonomy:** Added `Status` (Available/Preview/Retired etc.) + `§0 Methodology` + `§7 Changelog` (append-only) aligned to `llm-releases.com/methodology` + `.../changelog`. All new cards carry `Source: llm-releases.com/models/<slug> → primary`.

*Local differentiator retained:* India ₹ pricing + Q4/HW fit + tok/s + 5yr TCO + Scale-standardized deltas — not in llm-releases.com.

---

## 🆕 Last Update — Aug 19-30, 2026 (verified)

### Ornith-1.5 family — Aug 19, 2026 (MIT, HF leaderboard-listed) ⭐⭐
**DeepReinforce / Ornith** (`ornith-ai` on HF) — three MIT-licensed open-weight variants, all 262K → ~1M YaRN. **3-stage self-improving RL:** task generation + scaffold + rollout jointly optimized via GRPO (extends Ornith-1.0's 2-stage). 397B base: `qwen3_5_moe` (Qwen3.5 MoE base). No public API — self-host only.

| Variant | Q4 size | SWE-bench Verified | TB 2.1 (Terminus-2) | SWE-bench Pro | DeepSWE | Toolathlon |
|---|---|---|---|---|---|---|
| **Ornith-1.5-397B** 🆕 | ~244 GB | **86.0% #1 HF** | **86.1% #5 HF** | **65.1%** | **56.0%** | 71.2% |
| **Ornith-1.5-35B-A3B** 🆕 | ~22 GB | **79.0%** | **67.8%** | **59.6%** | 22.0% | 48.7% |
| **Ornith-1.5-9B** 🆕 | ~6 GB | **70.6%** | **46.2%** | **47.5%** | — | 41.2% |

⚠️ Partial verification: HF leaderboard listings for 397B at #5 TB 2.1 (86.1) and #1 SWE-bench Verified (86.0) — but uploaded by an HF Staff member (not fully independent). 35B and 9B scores are purely self-reported. No LiveCodeBench. Generation leap: 397B TB 2.1 77.5→86.1, DeepSWE 8→56. `ornith.ai/ornith_1_5.html`

### Alibaba Qwen3.8-Flash-Next — Aug 26 (Qwen4 architecture preview) ⭐⭐
**Qwen4ExpForConditionalGeneration** (qwen4_exp) — experimental preview of Qwen4 architecture. **180B total** (125B main + 51B N-gram embedding + 4B MTP) / **~6B active**. **48 layers** in 12 blocks: 3× Gated DeltaNet (linear) + 1× QSA (full MQA attention, 2048-token budget) per block. **512 experts, 10 routed + 1 shared.** Multimodal (vision tower: 1152-hidden, 27-layer, 16 heads). **262K native → 1M YaRN.** `Qwen/Qwen3.8-Flash-Next` on HF + FP8/GGUF variants. **Qwen Community 1.0** (similar to Apache 2.0, attribution + revenue trigger for hosted MaaS). QwenCloud API: use **Qwen3.8-Flash** (productionized -Next) at **$0.15/$0.47 per Mtok** ($0.016 cached).

**Vendor benchmarks (Claude Code harness):**

| Benchmark | Flash-Next | Qwen3.8-27B | V4 Flash 0731 | Opus 4.6 Max |
|-----------|:-----------:|:-----------:|:-----------:|:-----------:|
| SWE-bench Pro | **62.5%** | 61.7% | 56.0% | 53.4% |
| DeepSWE 1.1 | **58.7%** | 42.2% | 54.4% | — |
| LiveCodeBench v6 | **91.9%** | 90.3% | 90.6% | 88.8% |
| SWE Multilingual | **81.0%** | 73.8% | — | 77.5% |
| Toolathlon Verified | **73.5%** | 67.1% | 70.3% | — |
| GPQA Diamond | **91.7%** | 89.2% | 90.8% | 91.3% |

~111 GB Q4_K_XL (Unsloth GGUF). **Fits 1× Pro 6000** or 3× 5090. No Scale/AA/BenchLM independent verification yet. **Highest-priority new addition** to router MVP.

### Apodex 1.1-mini — Aug 24, 2026 (Apache 2.0, open weights)
**Apodex AI** (Tianqiao Chen) released open-weight **35B-A3B mini** built on Qwen3.5-35B-A3B with **PIVOT-RL** training. 397B flagship is closed (API-only on platform.apodex.ai, free during campaign). **Apache 2.0** weights: `apodex/Apodex-1.1-mini` on HF + FP8/NVFP4/GPTQ-Int4 quants.

Self-reported benchmarks: SWE-bench Verified **77.7%**, Terminal-Bench 2.1 **70.8%**, APEX-Agents Agent Team 27.7 (vs 1.0's 15.4), GDPVal 70.7. ⚠️ **No independent verification** — all numbers self-reported; even competitor benchmarks are Apodex's own internal reproductions.

### Microsoft MAI-Code-1.1-Flash — Aug 11 (GitHub Copilot default)
**138B total / 5B active** sparse MoE, **256K context**, multimodal (text+image → text). Deployed as **GitHub Copilot default small model** replacing 1.0. 75% cheaper than MAI-Code-1-Flash. Open weights on `github.com/microsoft/MAI-Code` (no public HF). **SWE-bench Verified 72.6%, Terminal-Bench 2.1 62.9%** (+22% vs 1.0 on TB2.1) on same VS Code production harness. ~70 GB est. Q4. Per-model API pricing TBD; Copilot list: $0.20/$0.02/$1.20 per Mtok.

### Cohere Labs North-Micro-Vision-Instruct — Aug 12 (2.4B VLM, Apache 2.0)
**2.4B dense** = 400M SigLIP 2 vision encoder + 2B LM (Command A+ arch, 28L, GQA). **Apache 2.0**, ~5 GB BF16. **DocVQA 0.921** (top among compared models), **ChartQA 0.808**, RefCOCOavg 0.732. 128K LM context. Not a coding model — tracked for North family completeness alongside North-Mini-Code-1.0 (30B/3B MoE).

### Tencent Hunyuan Hy4 preview — Aug 28 (Apache 2.0)
**770B total / 49B active** MoE (78L: 1 dense +77 MoE, 256 routed +1 shared, top-8 active), Gated DSA, 1 native MTP (10B/0.7B), **1M+ ctx**, `tencent/Hy4-preview` + `Hy4-preview-FP8` on HF/ModelScope/GitCode/CNB. **Apache 2.0** (Hy3 was community license until July). API `TokenHub + OpenRouter` **$0.834 / $2.501 per Mtok** (¥6/¥18), free 2 wks on WorkBuddy/CodeBuddy/Yuanbao/ima.

Vendor-reported (Tencent appendix, `benchlm.ai/models/hy4-preview`):
- **Terminal-Bench 2.1 85.4%** — tie **Claude Opus 5 85.4%**, +14.6 vs Hy3 70.8, -2.8 vs GLM-5.3 88.2
- **DeepSWE 64.3%** — **+36.3 vs Hy3 28.0** (generation leap)
- **SWE-bench Pro 65.7%**, **SWE Multilingual 82.9%**, **Toolathlon-Verified 74.1%** (ahead Qwen3.8-Max, Sol), **APEX-Agents 37.1%** (~K3 37.2%)
- Internal blind eval 163 experts ×203 tasks: **2.99/4.00** vs GLM-5.3 2.92 (46.8%/12.8%/40.4%) vs K3 2.94 (51.2%/7.9%/40.9%) — narrow wins, Tencent-run, not independent.

Doubles Hy3 params (295B/21B 256K → 770B/49B 1M). ~385 GB at Q4 — needs 8×96 GB node, data-center class.

### Z.ai GLM-5.3 — weights released Aug 28
Launched Aug 14 as 743B/40B text-only flagship (TB2.1 88.2, DeepSWE 66.9, CyberGym 84.5, HLE 62.5, $1.40/$4.40) **API-only for 2-week safety review**. **Released Aug 28** `zai-org/GLM-5.3` — 141 shards **~756 GB** (FP8 alongside BF16), 256 routed /8 active, 1,048,576 max pos, vLLM/SGLang. **Custom Z.ai license** (not MIT): >$10B/12-mo group revenue → Z.ai security review before commercial use. Different from GLM-5.3-Flash MIT and GLM-5.2 MIT.

### Z.ai GLM-5.3-Flash (= Ox Alpha) — Aug 26 (MIT, verified)
**320B/18B** MoE (45L hybrid KDA linear + NoPE sparse MLA, 8/288 experts), **1,048,576 ctx** (131K out), **first natively multimodal GLM-5** (text+image+video in). **MIT** `zai-org/GLM-5.3-Flash`, **~306 GiB FP8** → 8-GPU Hopper min (~160 GB Q4). **$0.15/$0.50/$0.03 cached**, promo halves to **Sep 9**. **AA Index 57** (= Opus 4.8). Vendor TB2.1 84.3 / DeepSWE 63.4 / Automation 48.8. Ran 6 days as anonymous `stealth/ox-alpha` on OpenRouter/OpenCode, ~42T tokens, entirely on **Chinese-made AI chips** via custom SGLang (3× efficiency claim).

### IBM Granite 4.2 — Aug 25 (Apache 2.0)
Dense decoder-only reasoning LLMs with native CoT + multi-stage agentic RL: **3B** (40L/2560), **8B** (40L/4096), **30B** (64L/4096), GQA, RoPE theta 10M, SwiGLU, **131K base →512K** extended, BF16. 8B/30B trained for tool/code/terminal/web in sandboxes. All Apache 2.0, HF + quantized variants live.

---

## Frontier Open Coding Benchmark Comparison (as of Aug 29)

> Vendor-reported harness scores — not directly comparable across harness labels. Only `Scale AI` mini-SWE-agent (identical scaffold) is apples-to-apples; see `local_ai_coding_models.md:252`.

| Model | Total/Active, ctx | License | TB2.1 | DeepSWE | SWE Pro | LCB V6 | Notes |
|---|---|---|---|---|---|---|---|
| **Tencent Hy4 preview** 🆕 | 770B/49B, 1M+ | Apache 2.0 | **85.4** | **64.3** | **65.7** | — | |
| **GLM-5.3** | 743B/40B, 1M | Custom "other" (review gate unconfirmed) | **88.2** | **66.9** | — | — | |
| **Kimi K3** | 2.8T/104B, 1M | Kimi K3 custom | **88.3** | **67.5** | — | — | |
| **DeepSeek V4 Pro 0813** | 1.6T/49B, 1M | MIT | **87.9** | **62.7** | — | 93.5 (Pro Max) | |
| **Qwen3.8-Max** | 2.4T/95B, 1M | qwen3.8-max custom | **86.6** | 56.6 | **67.7** | — | **AA 58** |
| **Ornith-1.5-397B** 🆕 | 403B/?, 1M | MIT | **86.1** (HF #5) | **56.0** | **65.1** | — | |
| **GLM-5.3-Flash** | 320B/18B, 1M | MIT | **84.3** | **63.4** | — | — | **AA 57** |
| **Qwen3.8-Flash-Next** 🆕 | 180B/6B, 262K→1M | Qwen Community 1.0 | — | **58.7** | **62.5** | **91.9** | |
| **DeepSeek V4 Flash 0731** | 284B/13B, 1M | MIT | **82.7** | ~54.4 | — | **91.6** | |
| **Qwen3.8-27B** (best small) | 27B dense, 262K→1M | Apache 2.0 | **73.0** | **42.2** | **61.7** | **90.3** | **AA 52** |

**Axes:** TB2.1 tight `88.3≈88.2≈87.9>86.6>86.1>84.3`; DeepSWE `67.5>66.9>64.3>58.7>56.0`; LCB `91.9 (Flash-Next) >91.6 (V4 Flash) >90.3 (27B)`. SWE-Pro: `Hy4 65.7 > Ornith-1.5-397B 65.1 > Flash-Next 62.5 > Qwen3.8-27B 61.7 > V4 Flash 56.0`. Ornith-1.5-397B SWE-V **86.0%** (#1 HF), TB 86.1 (#5 HF) — partial leaderboard verification, HF Staff uploaded. Scale standardized: best open **38.7%** (Qwen3-Coder 480B) vs proprietary **59.1%** (GPT-5.4) — vendor +10-20 pts inflation.

**Are the giants worth it?** V4 Pro (~850 GB Q4), Qwen Max (~1,200 GB), Kimi K3 (~1,400 GB) cost 5-10× more than what fits in 512 GB. The benchmark gaps are negligible:

| Benchmark | Best fit in 512 GB | V4 Pro / Qwen Max / Kimi K3 | Gap |
|---|---|---|---|
| TB 2.1 | GLM-5.3 88.2% | K3 88.3% | **+0.1 pts** |
| DeepSWE | GLM-5.3 66.9% | K3 67.5% | **+0.6 pts** |
| LCB V6 | V4 Flash 91.6% | V4 Pro Max 93.5% | **+1.9 pts** |
| SWE-Pro | Hy4 65.7% | Qwen Max 67.7% | **+2.0 pts** |

**TL;DR:** Giants gain 0–2 benchmark points at 5–10× the hardware cost. Spend the savings on better infra for models that fit.

**Pick:** Best absolute `GLM-5.3/K3/Hy4` (Flash = cheap MIT proxy: 2× faster/token than 5.3 at same VRAM). Best efficiency `V4 Flash 0731` (155GB Q4) or **Qwen3.8-Flash-Next** (~111GB Q4, SWE-Pro 62.5, LCB 91.9) or **Ornith-1.5-397B** (~244GB, SWE-V 86.0, MIT). Best single-GPU `Qwen3.8-27B` (17GB Q4, ~200 tok/s on 1×5090).

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

| Model | Q4 size | 1×5090 32GB | 2×5090 64GB | 4×5090 128GB | 1×Pro6000 96GB | 2×Pro6000 192GB | 4×DGX Spark 512GB | 8×Pro6000 768GB |
|---|---|---|---|---|---|---|---|---|
| Qwen3.8-27B | 17 GB | ✅ 200 tok/s | ✅ | ✅ | ✅ | ✅ | ✅ 80-120 tok/s | ✅ |
| **Ornith-1.5-9B** 🆕 | 6 GB | ✅ dense | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apodex 1.1-mini** 🆕 | 17 GB | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Qwen3.8-Flash-Next** 🆕 | 111 GB | offload ~25 | offload ~40 | Q3 ~50-70 | ✅ ~40-60 | ✅ | ~70-100 | ✅ |
| **Ornith-1.5-35B-A3B** 🆕 | 22 GB | offload | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **MAI-Code-1.1-Flash** 🆕 | ~70 GB | offload | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| V4 Flash 0731 | 155 GB | offload ~15 | offload ~25 | Q3 ~60-80 | offload | **240 tok/s FP8** | ~80-100 | ✅ |
| GLM-5.3-Flash | 160 GB | — | — | Q3 fit | — | fit | ✅ 50-80 (2× faster than 5.3) | ✅ |
| **Ornith-1.5-397B** 🆕 | 244 GB | — | — | — | — | — | Q3 fit | ✅ 30-50 |
| GLM-5.3 / Hy4 | 372 /385 GB | — | — | — | — | — | **25-35 tok/s (GLM-5.3) / Hy4 Q3** | ✅ 30-70 |
| V4 Pro 0813 | ~850 GB | — | — | — | — | — | — | Q2 only |
| K3 / Qwen Max | 1,200-1,400 GB | — | — | — | — | — | — | — (multi-node) |

**Single-user India picks (Aug 2026 street, 5-yr TCO):**
- **Best value:** `1× RTX 5090 (~₹5L)` → Qwen3.8-27B ~200 tok/s
- **Balanced:** `2× DGX Spark (~₹10-11L)` → V4 Flash ~40 tok/s; `4× DGX Spark (~₹22-30L, MikroTik)` → GLM-5.3 25-35 + V4 Flash 80-100 + Qwen 80-120 (only sub-crore that runs all 3) `single_user_india_local_ai.md:333`
- **Speed:** `2× Pro 6000 (~₹85L-1.1Cr)` → V4 Flash 243 tok/s; `4× Pro 6000 (~₹1.7-2.1Cr)` → GLM-5.3/Hy4 comfortable
- **Portable:** MacBook M5 Max 48-128GB (~₹5-7.5L) → Qwen27B only
- **Any model one-at-a-time:** `DGX B300 2.1 TB (~₹5.5Cr landed, 5-yr ~₹11.7Cr)` — every open weight at Q4 with 30s NVMe→HBM swap `dgx_b300_deep_research.md`

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
| Availability | H2 2026 (fall shipments) | H2 2026 samples, Q2 2027 mass (in production) |
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

Break-even **₹2,450/mo (top-10) → ₹10,200/mo (all-models Rubin)** per concurrent user; at 10-20% concurrency = 500K-1M subscribers → **~₹2,000/mo**. Agentic 99/1 input/output, cache-hit input ~**₹10-30/M** vs miss `₹400-800/M`. Real blocker: no engine serves 74 architectures from one pool — ship top-10 (V4 Flash/Pro, GLM-5.3/Flash, Hy4, K3, Qwen-Max, Qwen27B) behind router now `100k_concurrent_ai_coding_service.md`.

---

## Fact-Check Status (Aug 29-30)

**Confirmed via live search Aug 29-30:**

**Verified added this session:**
- **Qwen3.8-Flash-Next** (Aug 26): HF `Qwen/Qwen3.8-Flash-Next` live (Aug 24 created, Aug 26 release), Qwen Community 1.0 license, benchmarks confirmed from HF model card. Self-reported: SWE Pro 62.5%, DeepSWE 58.7%, LCB 91.9%, Toolathlon 73.5%. Qwen3.8-Flash API at $0.15/$0.47 on QwenCloud (official pricing page). Unsloth GGUF ~111 GB Q4_K_XL.
- **MAI-Code-1.1-Flash** (Aug 11): microsoft.ai model card + blog confirmed, SWE Verified 72.6%, TB2.1 62.9%. GitHub Copilot default since Aug 11. Pricing from Copilot docs: $0.20/$1.20 per Mtok. No public HF repo (only github.com/microsoft/MAI-Code).
- **Ornith-1.5 family** (Aug 19, DeepReinforce AI): HF `ornith-ai/Ornith-1.5-{9B,35B-A3B,397B}` live, MIT license, all with Q4_K_M GGUF. 397B at **TB 2.1 #5 (86.1)** on harborframework leaderboard, **#1 (86.0)** on SWE-bench Verified leaderboard — partial third-party verification (HF Staff uploaded). Self-improving 3-stage RL. No public API.
- **Apodex 1.1-mini** (Aug 24, Apodex AI / Tianqiao Chen): HF `apodex/Apodex-1.1-mini` live, Apache 2.0, Qwen3.5-35B-A3B base, PIVOT-RL training. Self-reported SWE Verified 77.7%, TB 2.1 70.8%. No independent verification. Free campaign on platform.apodex.ai.
- **Ling 3.0 Flash Fin** (Aug 27, inclusionAI): API-only, finance-specialized, 124B/5.1B, free on OpenRouter. No weights on HF.
- **North-Micro-Vision-Instruct** (Aug 12): HF `CohereLabs/North-Micro-Vision-Instruct` confirmed, Apache 2.0, ~4.99 GB BF16, DocVQA 0.921, ChartQA 0.808.
- **GLM-5.2 Turbo**: **UNCONFIRMED** — single TechPillow blog post only. No Z.ai primary source (HF, docs.z.ai, pricing page) confirms this model. Benchmarks cited (TB 81.0, SWE Pro 62.1) match GLM-5.2 base scores. **Not added to any table.**

**Minor date corrections:**
- DeepSeek V4 Flash Vision: **Aug 21 not Aug 24** (LLM Gateway: released Aug 21, added Aug 27)
- Grok 4.6 release: **Aug 6 not Aug 12** (LLM Gateway: released Aug 6, added Aug 12)

**Held from prior:** GLM-5.3-Flash MIT confirmed (HF zai-org/GLM-5.3-Flash Aug 25), Sol $4/$20 ≥Nov 21 (OpenAI docs, Reuters), DeepSeek peak/off-peak (api-docs.deepseek.com), Gemini $0.75→$1.50 Jan 1 2027 (blog.google), Jalapeño 700W/216GiB (openai.com), Apple M6 ships Sep 22 (apple.com/newsroom), Rubin/Helios specs (nvidia.com/amd.com).

*Sources: `Qwen/Qwen3.8-Flash-Next` HF, `Qwen/Qwen3.8-Flash-Next-GGUF` Unsloth, `qwencloud.com/models/qwen3.8-flash` pricing, `microsoft.ai/pdf/MAI-Code-1.1-Flash-Model-Card.PDF`, `microsoft.ai/news/mai-code-1-1-flash-br-better-faster-at-a-quarter-of-the-cost/`, `github.com/microsoft/MAI-Code`, `CohereLabs/North-Micro-Vision-Instruct` HF, `ornith.ai/ornith_1_5.html`, `ornith-ai/Ornith-1.5-397B` HF, `huggingface.co/datasets/harborframework/terminal-bench-2.1` (Ornith 397B #5), `huggingface.co/datasets/SWE-bench/SWE-bench_Verified` (Ornith 397B #1), `apodex/Apodex-1.1-mini` HF, `www.apodex.com/blog/apodex-1-1-scaling-agentic-intelligence-for-complex-work`, `arxiv.org/abs/2608.23283`, `platform.apodex.ai/docs/pricing`, `techpillow.co/blog/zai-glm-52-turbo` (sole Turbo source, NOT confirmed).*

*Generated: Aug 29-30, 2026. All figures are planning estimates, not vendor quotes.*
