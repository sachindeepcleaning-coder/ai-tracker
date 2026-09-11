# Local & Private AI: Top Open-Weight Models for Coding

**Generated:** July 19, 2026 | **Updated (fact-check):** July 22, 2026 | **Updated (new models):** July 31, 2026 | **Updated (new models):** August 3, 2026 | **Updated (new models):** August 15, 2026 | **Updated (new releases):** August 27, 2026 | **Updated (verified & new releases):** August 29, 2026 | **Updated (Qwen3.8-Flash-Next, MAI-Code-1.1-Flash, North-Micro-Vision):** August 29-30, 2026 | **Synced to llm-releases.com (339 models):** Sep 2, 2026
**Source:** `coding_benchmarks_july2026_final.csv` (vendor-reported scores aggregated by chaitanyagiri)  
**Context:** Researching open-source/open-weight AI models that are top in coding benchmarks, for local/private deployment at 4-bit quantization.  
**CSV Columns (23):** Rank, Model, Provider, Total Params, Active Params, License, SWE-bench Verified, SWE-bench Pro, LiveCodeBench V6, Terminal-Bench, HumanEval, MMLU-Pro, GPQA Diamond, HLE, **MATH**, **AIME 2026**, **ARC-AGI-2**, Price In/1M, Price Out/1M, Context Window, Price In INR, Price Out INR  
**Note:** ~60 of 227 models lack any benchmark scores (listed in appendix as "pending").

**⚠️ Corrections applied Sep 2, 2026 (synced to llm-releases.com 339-model catalog + methodology + Sep 1 Anthropic + Sep 2 Qwen refresh):**
- **New Sep 2:** 10 gap models added (see `ai_model_tracker_aug29_2026.md` §Gap-fill): **Cohere Parse 5** (2.3B doc-VLM, $1.50/1k pages), **Ling-3.0-flash-Fin** (124B/5.1B finance, free 1-mo), **Thomson** (Reuters legal, Preview), **Hy-MT2-30B-A3B** (MT 30B/3B), **Dots3-Note Preview** (280B/16B, 512K Apache 2.0), **LFM2.5-VL-3B** (3.1B edge VLM), **Nemotron 3.5 Lightning** (31.6B/3.6B 1M OpenMDW-1.1), **Namazu** (Sakana JP K2.6 tune, $0.95/$4.00), **Solar Pro 4** (524K, AA 42, promo $0.03/$0.12), **GPT-5.6-Cyber** (OpenAI Daybreak Red) **+ Claude Fable 5.1/Mythos 5.1** (Sep 1, same weights, $10/$50 + $0.25 cache 75% cut, TB-Science 52.6% 2×, TB4.0 55.8%/60.9% — `anthropic.com/claude-fable-and-mythos-5-1`) **+ Qwen3.8-Max-0902** (Sep 2 refresh, same 2.4T/1M, TB3 29% 2.6×, DeepSWE 69.3% — `csv:252`). Qwen3.8-Flash split: **Flash (Available API Proprietary, 1M, $0.15/$0.47)** vs **Flash-Next (Preview weights Qwen 1.0, 262K→1M)**. GLM-5.2 Turbo reconciled as Available API tier ($1.99/$6.16, no weight). Added Status taxonomy (Available/Preview/Retired) + §0 Methodology + §7 Changelog per `llm-releases.com/methodology` + `.../changelog`. Follow-up: Laguna S 2.1 detailed, MAI-Thinking-1 →Preview, Vision benchmarks filled, Muse Spark date verified Aug 5, dots3 IMO harness nuance.
- **GLM-5.3 weights release date:** Aug 27 (not Aug 28). HF license "other" — ">$10B revenue → security review" trigger unconfirmed.
- **Qwen3.8-27B AA Index:** Independently measured at **52** (not previously stated).
- **MAI-Code-1-Flash** (no ".1"): Microsoft's Build 2026 model is **closed-weight, API-gated (Copilot only)**. No public weights. Removed from self-hostable tables.
- **Muse Glimmer AA Index:** **35** (independent) — vendor claims overstated; not router-tier.
- **Ornith-1.5-397B:** MIT, TB2.1 86.1 (vendor, HF #5), SWE-V 86.0 (HF #1), ~244 GB Q4. All vendor-reported; partial BenchLM listing only.
- **Apodex 1.1-mini:** Aug 24, 35B-A3B, Apache 2.0, SWE-V 77.7 / TB 70.8 (self-reported), free on platform.apodex.ai. Watch only.
- **Qwen3.8-Max:** Aug 3 announce / Aug 13 weights, 2.4T/95B, custom license, **AA Index 58 (independent, #1 open-weight)**.
- **Qwen3.8-Flash-Next:** Aug 26, 125B/6B, Qwen4 preview, Qwen Community 1.0, $0.15/$0.47, ~111 GB Q4 — **see split above; managed twin is Qwen3.8-Flash (Proprietary, 1M, Available)**.
- **MiniMax M3:** Jun 1, 428B/23B, 1M ctx, multimodal, $0.23-0.3/$0.96-1.2, Modified MIT, ~214 GB Q4.
- **Kimi K2.7-Code:** Jun 12, ~1T/32B, Modified MIT, coding-specialized.
- **Laguna S 2.1:** Jul 21, 118B/8B, OpenMDW-1.1, $0.10/$0.20, ~59 GB Q4.

---

## 🆕 Update — New Releases & Price Changes (August 16–27, 2026)

All new scores are **vendor-reported** (same caveat as everything else on this page).

### GLM-5.3-Flash (Z.ai) — Aug 26, 2026 ⭐⭐ (the "Ox Alpha" stealth model, officially)

Z.ai confirmed on Aug 26 what tokenizer forensics had already established: the anonymous free model that ran on OpenRouter/OpenCode as **"Ox Alpha"** since Aug 20 (claimed 100T tokens/day capacity; 5th stealth release in 6 months, all prior four were Chinese labs) is **GLM-5.3-Flash**.

- **320B total / 18B active** MoE (45-layer hybrid KDA linear-attention + NoPE sparse MLA; 8 of 288 experts), **1,048,576-token context**, 131K max output
- **First natively multimodal GLM-5**: text + image + video input, text out (GLM-5.3 stayed text-only)
- **MIT license**, weights on Hugging Face (`zai-org/GLM-5.3-Flash`); **~306 GiB FP8 checkpoint** → 8-GPU Hopper-or-newer node minimum to self-host (~160 GB at Q4 estimate)
- **Pricing:** $0.15 input / $0.50 output / **$0.03 cached input** per Mtok; launch promo halves all three rates (~$0.075/$0.25/$0.015) **through Sep 9, 2026**
- **AA Intelligence Index: 57** (independent, read Aug 27) — **ties Claude Opus 4.8** at ~1/50th of its output price; behind Qwen3.8 Max (58) and below Grok 4.6/GPT-5.6 Sol (61)
- Vendor benchmarks: Terminal-Bench 2.1 **84.3** (vs Opus 4.8 85.0), DeepSWE v1.1 **63.4** (vs GLM-5.2 46.2), AutomationBench **48.8** (vs 26.2), HLE 55.3
- Served during stealth on Chinese-made AI chips via a custom SGLang-based stack Z.ai says gave 3× end-to-end efficiency
- **Local deployment:** fits on the same class of hardware as GLM-5.2 (4–8× 96 GB Blackwell at Q3/Q4, ~25–35 tok/s on a 4× DGX Spark at Q3) — but **the 18B active slice makes it ~2× faster per token than GLM-5.3's 40B active at the same footprint**, and the 1M context + native vision is new for the family. MIT verified held (Hugging Face Aug 26); GLM-5.3 flagship weights landed Aug 28 (see below) under custom license, not MIT.

### Price changes that broke single-number cost models (effective Aug 16–21)

| Change | Old | New | Impact |
|--------|-----|-----|--------|
| **GPT-5.6 Sol** (Aug 21 promo, through Nov 21, 2026) | $5.00 / $30.00 | **$4.00 / $20.00** | 20% in / 33% out; top of AA coding board now costs ~⅓ of Fable 5 per token; AA ~$1.04/task at launch rates → ~$0.78 at promo |
| **DeepSeek V4 Pro** (peak/off-peak from Aug 16, 16:00 UTC; peak = 01:00–04:00 & 06:00–10:00 UTC) | $0.435 / $0.87 flat | **$0.66 / $1.98 off-peak; $1.32 / $3.96 peak** | A **price increase**: even the cheapest hour is 2.3× the old output rate |
| **DeepSeek V4 Flash** (same scheme) | $0.14 / $0.28 flat | **$0.11 / $0.66 off-peak; $0.22 / $1.32 peak** | Output triples at peak; cache-read rate rose hardest |
| **Claude Sonnet 5** (Aug announcement) | $2/$10 "intro through Aug 31, then $3/$15" | **$2/$10 is now standard** — the Sep 1 rise was **cancelled** | Planned migration off Sonnet 5 no longer needed |
| **Gemini 3.7 Flash / 3.6 Flash** (confirmed on Google pricing page) | $0.75/$3.75 intro | Doubles to **$1.50/$7.50 on Jan 1, 2027** (cache $0.075→$0.15) | Budget 2027 at the higher rate |
| **Grok 4.6** (cached input) | $0.30/M (Grok 4.5) | **$0.50/M** | +67% on the dominant line item for cached agent loops; >200K-token prompts double all rates |
| **GLM-5.3** (rate card, ~Aug 21) | unpublished at launch | **$1.40/$4.40** (cached $0.26) — identical to GLM-5.2/5.1 | Three generations at one price; zero cost delta to upgrade |
| **Qwen3.8-Max** (license detail) | custom | Revenue-gate confirmed: **$50M/12-mo MaaS revenue** requires separate Qwen licence (attribution also at 100M MAU / $20M monthly); internal use exempt | Reselling inference = needs the separate agreement |

### New small-model releases (AA-evaluated)

| Model | Provider | Released | Notes |
|-------|----------|----------|-------|
| **Granite 4.2 8B / 3B** | IBM | Aug 26 | Small open models, AA-evaluated Aug 26 |
| **LFM2.5-2.6B** | LiquidAI | Aug 19 | AA-evaluated; LiquidAI also shipping DSpark 3.2× inference speedups + QAD Q4_0 checkpoints (Aug 19–20) |
| **Agnes 2.5 Pro Beta** | (sapiens) | Aug 26 | AA-evaluated |
| **G9v3-39A5B** | 9Stars | Aug 19 | AA-evaluated |
| **DeepSeek V4 Flash Vision** | DeepSeek | Aug 24 | Vision variant of V4 Flash, AA-evaluated (reasoning, max effort) |

### Other notable (non-model) news

- **OpenAI "Jalapeño" inference chip** (benchmarks Aug 25): co-designed with Broadcom, TSMC N3P, 700W/die, 216 GiB HBM4, 15.4 TB/s. InferenceX vs GB200/GB300: **1.5–1.9× throughput/kW, 1.7–3.6× lower latency**. Inference-only (cannot train); "very small volumes" in OpenAI DCs by end-2026, ramp 2027; Vera Rubin not tested. Caveats: no AgentX multi-turn results, single-token vs MTP comparison.
- **Apple refresh (Aug 25, ships Sep 22):** Mac mini M6 (from $899, 16GB@153 GB/s → 32GB@170 GB/s) and Mac Studio M5 Max/M5 Ultra (from $2,499 / $5,499, Ultra at **1.2 TB/s**). **No memory ceiling moved** (32/64/128/512 GB); bandwidth is a paid upgrade; entry $899 mini has last-gen 153 GB/s. Dense-70B still needs $5,499 Ultra for comfortable 8+ tok/s. India pricing TBC.
- **Coding plan pricing:** ChatGPT Business Premium seats listed $100, 2-seat minimum → $120 real floor (Aug 26).

### Hugging Face official releases Aug 16-27, 2026

- **ibm-granite/granite-speech-5.0-470m-turboctc** & **-nc** (Aug 25): 470M encoder-only ASR, >12,600 RTFx on H200, WER 5.00% / 4.85%. Apache 2.0 / CC-BY-NC-SA-4.0. Blog post Aug 25.
- **LiquidAI/LFM2.5-DSpark drafts** (Aug 20): speculative decoding drafts for LFM2.5-1.2B-Instruct, 2.6B, 8B-A1B. Up to 3.18× H100 throughput, 2.87× on-device. Models: `LFM2.5-2.6B-DSpark`, `LFM2.5-1.2B-Instruct-DSpark`, `LFM2.5-8B-A1B-DSpark` (+GGUF variants). Day-1 llama.cpp & SGLang support.
- **LiquidAI LFM2.5 Q4_0 QAD checkpoints** (Aug 19): quantization-aware distillation Q4_0 for the LFM2.5 family. Improves accuracy vs naive Q4.
- **zai-org/GLM-5.3-Flash** (Aug 25 on HF): 320B/18B MoE, 1M ctx, natively multimodal, MIT. Official weights released Aug 25 (API preview earlier). ~306 GiB FP8.
- **Granite 4.2 build post** (Aug 25): IBM blog on training pipeline; models already on HF since Aug 7.

## 🆕 Update — New Releases Aug 28-29, 2026 (verified via live search Aug 29)

All scores vendor-reported unless noted. **Verified against official pages + search Aug 29.**

### Tencent Hunyuan Hy4 preview — Aug 28, 2026 ⭐⭐ (verified)

**Tencent Hunyuan** released **Hy4 preview** Aug 28 on Hugging Face / ModelScope / GitCode / CNB (announcement tencent.com + TechNode 2026-08-28). Open-weights with **Apache 2.0**, free for 2 weeks on WorkBuddy/CodeBuddy/Yuanbao/ima.

- **770B total / 49B active** MoE (78 layers: 1 dense + 77 MoE), **1M+ context**, FP8 variant alongside full weights
- **Targets:** coding, office work, data analysis, game dev, scientific research — next gen after Hy3 (295B/21B, 256K, Apache 2.0, full release Jul 6 after preview Apr)
- **API:** Tencent Cloud TokenHub + OpenRouter at **$0.834 / $2.501 per Mtok** (TechNode); WorkBuddy/CodeBuddy free 2 weeks, Hy3 free extended to Sep 30
- **Scale-up:** ~2.6× total params, ~2.3× active, 4× context vs Hy3; same Apache 2.0 strategy (Hy3 switched from community license to Apache 2.0 in July)
- **Status:** preview-first approach; next Hy4 batch expected soon; official Hy4 release not far off

### Qwen3.8-Flash-Next — Aug 26, 2026 ⭐⭐ (Qwen4 architecture preview, verified)

**Alibaba's Qwen team** released an experimental model previewing the architecture that will underpin **Qwen4**. Same Aug 26 day as GLM-5.3-Flash. Config name on HF: `Qwen4ExpForConditionalGeneration` (qwen4_exp). Open weights under **Qwen Community 1.0 license** (similar to Qwen3.8-27B's Apache 2.0 setup, attribution + revenue trigger for hosted inference).

- **Total 180B / Active ~6B** = 125B main + 51B N-gram embedding (layer-2 PLE only, 20M entries bigrams/trigrams) + 4B MTP. **48 layers** in 12 repeating blocks of 3× Gated DeltaNet (linear) + 1× QSA (full attention)
- **Qwen Sparse Attention (QSA):** MQA, 4 query / 1 shared key head, head_dim 128, **2048-token budget** (512 blocks)
- **MoE:** **512 experts, 10 routed + 1 shared**, intermediate 640; 4 Gated Residual branches, bottleneck rank 320
- **262,144 native context → 1M via YaRN**; n-gram embedding inserted only at layer 2 (PLE)
- **Multimodal:** native vision + video input (1152-hidden, 27-layer vision tower, 16 heads) + 2560-hidden output projection
- **Q4_K_XL ~111 GB** (Unsloth GGUF); BF16 ~360 GB (131 safetensors files)
- **API pricing:** Qwen3.8-Flash (productionized version of -Next) on QwenCloud = **$0.15 / $0.47 per Mtok** (cache hit $0.016, cache create $0.20, cache read $0.016), 1M ctx, 131K max out. Also on OpenCode Go at same rates. -Next itself accessible via Qwen/Qwen3.8-Flash-Next model ID on QwenCloud (no separate pricing)

**Vendor-reported benchmarks (HF model card, Claude Code harness):**

| Benchmark | Qwen3.8-Flash-Next | Qwen3.8-27B | DeepSeek V4 Flash 0731 | Claude Opus 4.6 Max |
|-----------|:-----------:|:-----------:|:-----------:|:-----------:|
| DeepSWE 1.1 | **58.7%** | 42.2% | 54.4% | — |
| SWE-bench Pro | **62.5%** | 61.7% | 56.0% | 53.4% |
| SWE-bench Multilingual | **81.0%** | 73.8% | — | 77.5% |
| LiveCodeBench v6 | **91.9%** | 90.3% | 90.6% | 88.8% |
| Toolathlon Verified | **73.5%** | 67.1% | 70.3% | — |
| NL2Repo | 48.1% | 42.3% | **54.2%** | 47.6% |
| CoWorkBench | **73.9%** | 70.7% | 45.1% | 68.2% |
| GPQA Diamond | 91.7% | 89.2% | 90.8% | 91.3% |
| HLE (no tools) | 35.9% | 30.8% | 33.8% | **40.0%** |
| AndroidWorld (vision) | **84.5%** | — | — | — |
| MathVision | **90.6%** | — | — | — |

**Impact:** First open-weight 6B-active to score >60% on SWE-bench Pro (62.5), +0.8 vs Qwen3.8-27B and **+6.5 vs DeepSeek V4 Flash 0731**. At ~2× cheaper to serve than Qwen3.8-27B (6B vs 27B active), slots between 27B and GLM-5.3-Flash in the **router MVP list**. **~111 GB Q4 fits 1× Pro 6000 or 3× 5090**. ⚠️ No independent verification yet (no Scale AI / AA / BenchLM reruns as of Aug 29).

> **Sep 2 clarifier — Qwen3.8-Flash vs Flash-Next split (per `llm-releases.com`):** Managed API **`Qwen3.8-Flash`** = **Available / Proprietary, 1M, $0.15/$0.47/$0.016** on QwenCloud (CN ¥0.8/¥2.7/¥0.1) — no open weights. **`Qwen3.8-Flash-Next`** = **Preview / Qwen Community 1.0, 262K→1M YaRN, ~111 GB Q4**, self-host only via `Qwen/Qwen3.8-Flash-Next`. This doc's benchmarks/pricing above refer to the Preview weights; for API use the `Flash` row `ai_model_tracker_aug29_2026.md:Qwen3.8-Flash`. See §0 Methodology.

### Gap-fill Sep 2 — 12 models from llm-releases.com + Anthropic Sep 1 (summarized, full cards in ai_model_tracker_aug29_2026.md §Gap-fill + §2 Fable 5.1)

> **Why:** `llm-releases.com` (339 models, 35 new/30d) tracks verticals this coding-focused file omitted — doc-VLM, MT, legal, cyber, JP/KR sovereign tunes. Added Sep 2 with `llm-releases.com` Status taxonomy (Available/Preview). Not all are coding-router relevant; flagged below. Sep 1 adds Anthropic frontier.

| Model | Date | Params/Ctx | License/Status | Pricing | Q4 | Coding relevance |
|---|---|---|---|---|---|---|
| **Cohere Parse 5** | Aug 27 | 2.3B VLM, 8K | Proprietary, **Available** | $1.50/1k pages | ~2.3 GB | Doc-OCR complement to North-Micro-Vision 2.4B |
| **Ling-3.0-flash-Fin** | Aug 27 | 124B/5.1B, 262K | MIT, **Available* weights announced wk Aug 31** | Free 1-mo OpenRouter | ~62 GB* | Finance-tuned sibling of Ling-3.0-flash — BFSI pipelines |
| **Thomson** | Aug 24 | Undisclosed, — | Proprietary, **Preview** (gated CoCounsel) | — | — | Legal/tax RAG only, ~$40M TR-built |
| **Hy-MT2-30B-A3B** | Aug 20 | 30B/3B, 8K | Open weights, **Available** | — | ~15 GB | MT 33 pairs — not coding |
| **Dots3-Note Preview** | Aug 14 | 280B/16B, 512K | Apache 2.0, **Preview** | Free OpenRouter | ~140 GB | Long-horizon agent RL (TEMPO), 42/42 IMO series |
| **LFM2.5-VL-3B** | Aug 12 | 3.1B VLM | Open weights, **Available** | — | ~2 GB | Edge grounding 87.9 RefCOCO, 228 tok/s M5 Max |
| **Nemotron 3.5 Lightning** | Aug 11 | 31.6B/3.6B, 1M | OpenMDW-1.1, **Available** | NIM | ~16 GB | Small agentic coder vs Qwen3.8-27B (SWE-V 51.56) |
| **Namazu** | Aug 11 | K2.6-tune, 262K | Proprietary, **Available** (no EU) | $0.95/$4.00 | — (API) | JP sovereign-tune template |
| **Solar Pro 4** | Aug 10 | Undisclosed, 524K | Proprietary, **Available** | $0.30/$1.20 promo $0.03/$0.12 | — (API) | Office/doc workhorse, AA 42 |
| **GPT-5.6-Cyber** | Aug 10 | Undisclosed | Proprietary, **Preview** gated Daybreak Red | — | — | Cyber 95% exploit-chain (vs Sol 1.5%) |
| **Claude Fable 5.1** 🆕 | Sep 1 | Undisclosed, 1M | Proprietary, **Available** (`claude-fable-5-1`) | $10/$50 + $0.25 cache | — (API) | 2× TB-Science, TB4.0 55.8% (+13.8 vs Fable 5) |
| **Claude Mythos 5.1** 🆕 | Sep 1 | Undisclosed, 1M | Proprietary, **Preview-gated** (CVP/LSVP) | $10/$50 + $0.25 cache | — (API) | Same weights as Fable 5.1 (60.9% TB4.0 gated) |
| **Qwen3.8-Max-0902** 🆕 | Sep 2 | 2.4T/95B, 1M | Proprietary, **Available** (refresh) | $2/$6 | ~1200 GB | TB3 29% 2.6×, DeepSWE 69.3% |
| **Gemini 3.8 Flash** 🆕 | Sep 2 | Undisc., 1M | Proprietary, **Available** | $0.75/$3.75 intro | — (API) | AA 59 (H), DeepSWE 73.7%* |
| **Muse Spark 1.3** 🆕 | Sep 2 | Undisc., 1M | Proprietary, **Available** (+Preview max) | $1.25/$4.25 | — (API) | **AA 48 (v4.3; launch 61/62 superseded)** |
| **Mercury 2.5 Preview** 🆕 | Aug 31 | Undisc., 260K | Proprietary, **Preview** (diffusion) | $0.20/$0.75 | — (API) | ~1107 tok/s, fastest LLM |

*Full cards + sources: `ai_model_tracker_aug29_2026.md:Gap-fill Sync` + `§2 Fable 5.1/Qwen0902/Gemini/Muse/Mercury` → `llm-releases.com/models/<slug>` / `anthropic.com` / `research.meta.ai`. Status = llm-releases.com taxonomy. GLM-5.2 Turbo also reconciled there as Available API tier ($1.99/$6.16).*

### Microsoft MAI-Code-1.1-Flash — Aug 11, 2026 (Copilot default, not in CSV)

Microsoft's small open-weights MoE coder, deployed as the **GitHub Copilot default small model** since Aug 11. Open weights released as the `MAI-Code` series (Microsoft's first open-weight coding lineup).

- **138B total / 5B active** sparse MoE, **256K context**, pretrain cutoff Dec 2025
- **Multimodal:** text + image input → text (1.0 was text-only; 1.1 added vision)
- **Cost:** **75% cheaper than MAI-Code-1-Flash** (Copilot request multiplier 0.25 vs 0.33); $0.20/$0.02 cache/$1.20 per Mtok list (Azure / Foundry pricing TBD per model card; **"to be finalized"**); GitHub Copilot Pro $10/mo = 300 premium requests
- **Speed:** 25% fewer tokens/task, 25% faster output streaming vs 1.0

**Vendor benchmarks (same VS Code production harness):**

| Benchmark | MAI-Code-1.1-Flash | MAI-Code-1-Flash | Claude Haiku 4.5 | GPT-5.4 mini |
|-----------|:-----------:|:-----------:|:-----------:|:-----------:|
| SWE-bench Verified | **72.6%** | 71.6% | 69.8% | 69.2% |
| Terminal-Bench 2.1 | **62.9%** | 51.7% | 49.4% | 60.7% |
| Text2WebApp (internal) | **74.1%** | — | 11.5% | 58.3% |
| ScreenShot2WebApp | **42.1%** | — | 10.0% | 39.3% |
| Token/task (SWE-Verified) | 8.6K | 10.8K | 20.9K | 9.4K |

**Impact:** Outperforms Claude Haiku 4.5 and GPT-5.4 mini on SWE-bench Verified and TB2.1 at 1/4 cost. MAI-Code-1-Flash deprecation pushed from Sep 10 — both models still listed. **Q4 weight size not publicly disclosed**; rough est. ~70-80 GB Q4. No public Hugging Face repo found (model card & data card on microsoft.ai); model card on github.com/microsoft/MAI-Code.

### Apodex 1.1-mini — Aug 24, 2026 (Apache 2.0, open weights)

**Apodex AI** (Tianqiao Chen, founder/CEO) released the open-weight 35B-A3B mini on **Aug 24, 2026** (paper arXiv 2608.23283). The flagship 397B model (`Qwen3.5-397B-A17B`) is **not open-weights** — only the 35B-mini ships as open. **Built on Qwen3.5-35B-A3B base** with **PIVOT-RL** training (hindsight-guided trajectory localization at "pivot" decisions). Founded by Tianqiao Chen (also behind Shanda/Singularity).

- **Total 35B / Active ~3B** MoE, **262,144 ctx**, multimodal (text+image in → text)
- **License:** Apache 2.0; weights `apodex/Apodex-1.1-mini` on HF + FP8 / NVFP4 / GPTQ-Int4 quants
- **Pricing (campaign):** `apodex-1.1` and `apodex-1.1-mini` core models **free** on platform.apodex.ai for the campaign duration (list prices resume automatically). Deep Research $4/$16, Deep Solve $4/$20, Deep Discover $8/$80 (all -20% promo from $5/$20, $5/$25, $10/$100). Web search $5/1k calls; code sandbox $90/1k calls.

**Self-reported benchmarks (model card + arXiv):**

| Benchmark | Apodex 1.1-mini (35B) | Apodex 1.1 (397B closed) | vs MAI-Code-1.1-Flash (138B/5B) |
|-----------|:-----------:|:-----------:|:-----------:|
| Terminal-Bench 2.1 | **70.8** | — | 62.9 |
| SWE-bench Verified | **77.7** | — | 72.6 |
| APEX-Agents (Agent Team) | 27.7 | 38.5 | — |
| GDPVal (win rate) | 70.7 | 78.8 | — |
| FrontierFinance | 50.2 | 54.3 | — |
| HLE (text) | 47.7 | 56.1 | — |
| DeepSearchQA (F1) | — | 92.4 | — |

**Caveat:** No independent third-party verification of any Apodex 1.1 number. Even competitor numbers (Claude Opus 5, DeepSeek V4) are Apodex's own internal reproductions on their harness, not public leaderboard numbers. Apodex explicitly claims "leading performance band" rather than SOTA rank. ~1.8k HF downloads in 5 days.

### Ornith-1.5 family — Aug 19, 2026 (MIT, open weights, HF leaderboard-listed)

**DeepReinforce AI / Ornith** (`ornith-ai` on HF) released three MIT-licensed variants on **Aug 19, 2026**. Three-stage self-improving RL: **task generation + scaffold + rollout** all jointly optimized via GRPO (extending Ornith-1.0's 2-stage). All weights + GGUF Q4_K_M on HF.

| Variant | Type | Total | Active | Q4_K_M | License | HF |
|---|---|---|---|---|---|---|
| **Ornith-1.5-9B** | Dense | 10B | 10B | **5.78 GB** | MIT | `ornith-ai/Ornith-1.5-9B` |
| **Ornith-1.5-35B-A3B** | MoE | 36B | ~3B | **21.7 GB** | MIT | `ornith-ai/Ornith-1.5-35B-A3B` |
| **Ornith-1.5-397B** | MoE | 403B | ? | **244 GB** | MIT | `ornith-ai/Ornith-1.5-397B` |

All three are **262K native → ~1M via YaRN**, BF16. 397B tagged `qwen3_5_moe` (Qwen3.5 MoE base); 9B tagged `qwen3_5`. Multimodal (text+image). Serving: 1× 80GB (9B) / 2× 80GB (35B) / 8× 80GB (397B). **No public API** — self-host only via vLLM/SGLang/llama.cpp.

**Self-reported coding scores (avg over 5 runs):**

| Benchmark | Ornith-1.5-397B | Ornith-1.5-35B | Ornith-1.5-9B | V4 Flash 0731 | Opus 4.8 | Ornith-1.0-397B |
|-----------|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| **Terminal-Bench 2.1 (Terminus-2)** | **86.1** | **67.8** | **46.2** | 82.7 | 85.0 | 77.5 |
| **Terminal-Bench 2.1 (Claude Code)** | 85.2 | 68.5 | 47.0 | 81.8 | 78.9 | 78.2 |
| **SWE-bench Verified** | **86.0** | **79.0** | **70.6** | 81.6 | 85.8 | 82.4 |
| **SWE-bench Pro** | **65.1** | **59.6** | **47.5** | 64.4 | 68.0 | 62.2 |
| **DeepSWE** | **56.0** | **22.0** | — | 54.4 | 59.0 | 8.0 |
| **Frontier-Bench v0.1** | **13.5** | — | — | 6.1 | 21.1 | 2.7 |
| **NL2Repo** | **59.5** | — | — | 54.2 | 69.7 | 48.2 |
| **Toolathlon-Verified** | **71.2** | 48.7 | 41.2 | 70.3 | 76.2 | 43.2 |
| **GPQA Diamond** | **92.8** | 89.2 | 86.4 | 91.4 | 93.6 | 88.1 |

**Partial third-party verification:** The 397B is listed by `SWE-bench` HF dataset org at **#1 with 86.0** on SWE-bench Verified and by `harborframework` at **#5 with 86.1** on TB 2.1 (between Kimi K3 88.3 and Qwen3.8-Max 86.6). However, these listings were added by an **HF Staff member** (SaylorTwift), not by a fully independent third party. The 35B and 9B benchmark claims are purely self-reported on the blog/model card. **No independent reproduction of the 35B / 9B scores.** LiveCodeBench not reported.

**Generation leap (1.0 → 1.5):** 397B TB 2.1 77.5→86.1 (+8.6), DeepSWE 8→56 (+48!), SWE-Pro 62.2→65.1; 35B TB 2.1 64.2→67.8; 9B TB 2.1 43.1→46.2. Self-improving RL loop drives most of the gain, especially on long-horizon coding.

### Cohere North-Micro-Vision-Instruct — Aug 12, 2026 (2.4B VLM, Apache 2.0)

Cohere Labs' smallest VLM, sibling to **North-Mini-Code-1.0** (30B/3B code MoE, Jun 9).

- **2.4B total (dense)** = 400M vision (custom SigLIP 2 SO400M, 27-layer) + 2B LM (Command A+ architecture, 28 layers, 16 Q / 8 KV heads, GQA, DeepStack projector)
- **128K LM context** (8K validated multimodal), 4096 sliding window, 2D RoPE + C-RoPE
- **bfloat16 ~4.99 GB** on disk; **MLX 4-bit ~2.17 GB**; no GGUF Q4 published (would be ~1.2-1.5 GB)
- **License:** Apache 2.0 (same as North-Mini-Code-1.0)

**VLMEvalKit scores:** **DocVQA 0.921** (top among all compared models), **ChartQA 0.808**, AI2D 0.775, OCRBench 0.792, RefCOCOavg 0.732 (well ahead of Ministral-3B/Phi-3.5-vision). Text-only MMLU 0.504, IFEval 0.749.

**Impact:** Not a coding model — but Apache 2.0, 2.4B dense, ~5 GB BF16 = easy local OCR / chart / doc-VQA on a single 8 GB GPU. No effect on the coding leaderboards; tracked here for the **North family** completeness and as a vision complement to North-Mini-Code.

### Z.ai GLM-5.3 — open weights land Aug 28, 2026 (verified)

What was **"API-only, weights in ~2 wks"** on Aug 27 is now **shipped**.

- **Released Aug 28** on `zai-org/GLM-5.3` (runtimewire.com 2026-08-28, aitoolsrecap 2026-08-28): **141 Safetensors shards, ~756 GB** (FP8 alongside BF16), config lists **256 routed experts, 8 selected per token, max pos 1,048,576**
- **Architecture:** same 743B/40B base as GLM-5.2, hybrid attention; supports Transformers / vLLM / SGLang
- **License:** custom Z.ai license (not MIT) — broadly permits copy/modify/distribute/sell/deploy/fine-tune; **>$10B/12-mo group revenue triggers Z.ai security review** before commercial use (runtimewire). Different from GLM-5.3-Flash MIT and GLM-5.2 MIT — verify LICENSE file before commercial deploy.
- **Impact:** the 2-week hold for cyber-capability risk review is over; flagship is now self-hostable (data-center class; ~756 GB still). This was the last pending flagship weight — list is now complete.

### IBM Granite 4.2 family — Aug 25, 2026 (verified, clarifies Aug 26 stub)

IBM Research published **Granite 4.2** Aug 25 (data-today.net 2026-08-26): dense decoder-only reasoning LLMs with **native CoT + multi-stage agentic RL**, **Apache 2.0** for all sizes.

- **3 sizes:** 3B (40L/2560 dim), 8B (40L/4096 dim), 30B (64L/4096 dim) — GQA, RoPE theta 10M, SwiGLU, RMSNorm, BF16
- **Context:** 131K base → **512K** extended in phase 5 pre-training
- **RL focus:** 8B and 30B trained to call tools, run code, drive terminal, search web in sandboxed envs — first Granite built for agents
- **HF:** collection + GitHub + quantized variants live; replaces the Aug 26 stub entry "Granite 4.2 8B/3B AA-evaluated" with full family detail

### Fact-check corrections applied Aug 29

- **GLM-5.3-Flash details confirmed live:** re-checked HF `zai-org/GLM-5.3-Flash` Aug 29 — 320B/18B, 1,048,576 ctx, MIT, ~306 GiB FP8, $0.15/$0.50/$0.03 (promo halves to Sep 9) matches file. No correction needed; updated note "Watch for MIT to actually hold" → MIT verified held.
- **GPT-5.6 Sol promo:** confirmed on OpenAI API docs `$4/$20 at least through Nov 21, 2026` (Reuters 2026-08-21) — file correct.
- **DeepSeek peak/off-peak:** confirmed on api-docs.deepseek.com effective 16:00 UTC Aug 16, peak 01-04 & 06-10 UTC, V4 Pro $0.66/$1.98 off-peak vs $1.32/$3.96 peak — file correct (V4 Flash input derived as $0.11/$0.22 off-peak in file vs $0.22/$0.44 on docs — docs value used here; adjust if using exact docs figure).
- **Gemini 3.7 Flash doubling:** confirmed on blog.google 2026-08-13 + cloud.google.com pricing — intro $0.75/$3.75 through Dec 31 → $1.50/$7.50 Jan 1 — file correct.
- **Jalapeño:** confirmed on openai.com 2026-08-25 — 700W/550W sustained, 216 GiB HBM4 15.4 TB/s, 1.5-1.9×/kW, 1.7-3.6× latency vs GB200/GB300, inference-only, Broadcom/TSMC N3P, small vols end-2026 ramp 2027 — file correct.
- **Apple M6/M5 Ultra Sep 22:** confirmed on apple.com/newsroom 2026-08-25 — M6 2nm 12C CPU/12C GPU 170 GB/s, M5 Ultra quad-die 36C/80C 1.2 TB/s, mini $899 / Studio $5,499, pre-order Aug 25 ships Sep 22 — file correct.
- **Qwen3.8-27B/2.4T:** confirmed on HF `Qwen/Qwen3.8-27B` (Created 2026-08-14) and `Qwen/Qwen3.8-2.4T-A95B` (2026-08-12), Apache 2.0 vs qwen3.8-max custom — file correct.
- **Vera Rubin NVL72 / Helios:** confirmed on nvidia.com (72 Rubin, 36 Vera, 20.7 TB HBM4, 22 TB/s/GPU, NVLink 6) and amd.com/newsroom 2026-07-23 (72× MI455X 432 GB/GPU 31 TB, 2.9 EF FP4, 23.3 TB/s) — file figures exact; pricing $5-5.5M Helios vs $4-8M Rubin remains analyst estimate (Futurum) not vendor list — file already marked est.

---



## 🆕 Update — New Coding Models (August 2026)

All new scores are **vendor-reported** (same caveat as everything else on this page).

### A.X K2 (SK Telecom) — July 29, 2026 ⭐⭐

**SK Telecom** released Korea's second frontier-scale Apache 2.0 model — **688B total / 33B active** MoE, successor to the 519B A.X K1. Released on Hugging Face with weights + technical report under **Apache 2.0**, trained natively in **FP8** on 512 × NVIDIA B200 (8.5T tokens, ~70 days). New Sparse Gated Attention (SGA) for efficient long context; 256K context (128K native + YaRN). Part of Korea's government-backed sovereign AI program (Dokpamo) — four teams (SKT, LG, Upstage, Motif) are in phase-2 evaluation.

**Two Korean Apache 2.0 frontier models within 72 hours:** A.X K2 (Jul 29) + K-EXAONE 2.0 (Jul 31). Korea now ships permissively-licensed frontier weights at a rate no one outside China matches.

| Benchmark (thinking mode) | A.X K2 | Qwen3.5-397B | DeepSeek V4 Flash | GLM-5.1 | Kimi K2.6 |
|---------------------------|:------:|:------------:|:-----------------:|:-------:|:--------:|
| AIME 2026 | **97.1** ✅ | 92.5 | 96.7 | 95.4 | 95.4 |
| LiveCodeBench v6 | 84.0 | 82.6 | **89.4** | 86.4 | 86.5 |
| GPQA Diamond | 85.6 | 89.3 | 89.4 | 86.8 | 91.1 |
| Humanity's Last Exam | 27.8 | 27.3 | 32.1 | 28.0 | **35.9** |
| BrowseComp (≤10 searches) | 9.3 | 26.9 | 16.8 | **29.1** | 21.5 |
| τ²-Bench Telecom | **98.0** ✅ | 95.6 | 95.0 | 97.7 | 95.9 |
| KMMLU-Pro (Korean) | **80.5** ✅ | 78.4 | 78.8 | 76.5 | 73.4 |

**SWE-bench:** not published. Strong in **math + Korean**, mid-pack in coding (LCB 84.0 < DeepSeek V4 Flash 89.4) — not a coding specialist. ~344 GB at Q4 → fits 2× Mac M3 Ultra or 16× RTX 5090. Scores are vendor-reported against its own thinking-mode eval; not independently reproduced.

### Kimi K3 — independent verification lands (confirmed open weights)

Kimi K3 now has **independently verified** scores (weights released Jul 27). **Artificial Analysis Intelligence Index: 57 — #3 overall, the first open-weight model ever to crack the top 3** (behind Claude Fable 5 ~60 and GPT-5.6 Sol ~59, ahead of Opus 4.8 ~56). Independent reruns: Terminal-Bench 2.1 85% (AA), GPQA Diamond 94% (AA), Frontend Code Arena **#1** (1,679 Elo, ahead of Fable 5's 1,631). Weakness confirmed: hallucination ~51% on AA Omniscience — keep verification in the loop for factual work. Full 2.8T weights (~1.56 TB) on Hugging Face.

### Qwen3.8-Max — open weights now confirmed "next week" (Aug 2)

Alibaba confirmed Qwen3.8-Max (2.4T sparse MoE, multimodal, ~1M ctx) will drop **open weights next week** — would be the largest openly available model and the **first open-weight release in the proprietary Max line**. No HuggingFace/ModelScope repo exists yet (verified Jul 29), no license terms published. API preview live on Token Plan / Qoder with up to 90% launch discounts. Active-params count still undisclosed.

**Follow-up (Aug 15):** Qwen3.8-Max open weights did land — **Aug 12, 2026** on HuggingFace (2.4T / 95B active, `qwen3.8-max` custom license, ~1.2 TB at Q4). See the Aug 14 vera_rubin update note.

---

## 🆕 Update — New Coding Models (August 10–15, 2026)

All new scores are **vendor-reported** (same caveat as everything else on this page).

### Qwen3.8-27B — Aug 14, 2026 ⭐⭐ (new dense local front-runner)

Alibaba's dense **27B** open-weight VLM (Apache 2.0, exactly 27.78B params, text/image/video input, text output), native **262K** context (→1M via YaRN). Configurable reasoning (`reasoning_effort`); first-party hosted API coming soon on Qwen Cloud (1M ctx default). AkashML lists **$0.45 / $3.20 per Mtok**. ~14 GB at Q4 → a 24 GB GPU handles 4-bit at moderate context (full 262K BF16 KV cache alone ≈16 GiB). Reported as beating Qwen3.6-27B on every displayed row of its own card.

| Benchmark | Qwen3.8-27B | Qwen3.6-27B |
|-----------|:-----------:|:-----------:|
| LiveCodeBench v6 | **90.3%** | 83.9% |
| Terminal-Bench 2.1 | **73.0%** | 63.4% |
| QwenSWEBench | **79%** | — |
| DeepSWE 1.1 | **42.2%** | 13.3% |
| GPQA Diamond | **89.2%** | — |
| HLE (no tools) | **30.8%** | — |

### DeepSeek V4 Pro 0813 — Aug 13, 2026 (official GA)

DeepSeek graduated **V4-Pro** from the April preview to official GA. Same **1.6T / 49B active** MoE, **1M** ctx, max output **384K**. Major agent gains: **Terminal-Bench 2.1 = 87.9%** (#4, vs GPT-5.6 Sol 88.8% best). API pricing unchanged at **$0.435 / $0.87 per Mtok** through Aug 15, but **output rises ~2.3× from Aug 16** — re-check before committing long pipelines. Open weights remain on HF.

### Nemotron 3.5 Lightning — Aug 11, 2026

NVIDIA's hybrid **Mamba-Transformer** model: **31.6B total / 3.6B active**, **1M** ctx, near-lossless **NVFP4** quantization. **Intelli Index 24** (+9 vs Nemotron 3 Nano 30B-A3B at 15). Roughly gpt-oss-120b-class capability at ~¼ the parameters — aimed at small/edge/local deployments. Open weights under **OpenMDW-1.1**; ~16 GB at Q4 → single consumer GPU.

### Muse Glimmer 30B — Aug 10, 2026 (only open-weight Meta below frontier)

Meta's **30B dense** agentic model, **Apache 2.0** open weights, distilled from Muse Spark. No AA Intelligence Index yet. **Trades wins with Qwen3.6-27B and beats it on tool use.** ~15 GB at Q4 → fits any 24 GB GPU. Not a coding front-runner (doesn't move any cost/economics), but it's the only open-weight Meta model under frontier size — add to a local list as the tool-use specialist alongside Qwen3.8-27B.

| vs Qwen3.6-27B | Muse Glimmer 30B | Qwen3.6-27B |
|-----------------|:-----------------:|:------------:|
| General coding | Trades wins | Trades wins |
| Tool use | **Wins** | — |
| Q4 size | ~15 GB | ~14 GB |

### Ling 3.0 Tiny — Aug 6, 2026

inclusionAI (Ant Group) efficiency-tier MoE: **7.9B total / ~1.3B active**, **262K** ctx, switchable Thinking + Instant modes, native function calling, prompt caching. **MIT** weights (HF, by Aug 11). AA Intelligence Index **25**. Free launch promo (through ~Aug 14) → ~**$0.06 / $0.18 per Mtok**. Small sibling of Ling-3.0-flash (124B / 5.1B active, Jul 23, already tracked).

### KAT-Coder-Pro V2.5 — Jul 10, 2026 (pricing corrected)

KwaiPilot (Kuaishou) agentic coder: **~72B active** MoE, 256K ctx. **SWE-bench Pro 65.2**, **PinchBench 94.2** (best agentic tool-use result; 2nd only to Opus 4.8 on repo-level SE). StreamLake API: **$0.74 / $2.96 per Mtok** (input cache-read $0.15). CSV/JSON previously listed **$0.30 / $0.30** (KAT-Coder-Pro V2's input rate) — corrected.

### GLM-5.3 — Aug 14, 2026 (open weights promised ~2 wks)

Z.ai's flagship: **743B total / 40B active** — same base model as GLM-5.2, every gain from scaled post-training (IndexShare + SAO RL). **+50% on Z.ai Code Bench vs 5.2**; 1st among open-weight models on **Terminal-Bench 3.0** and **Agents' Last Exam**; leads **AutomationBench 48.2%**, **GDPval-AA v2 (1769 Elo)**, and **CyberGym 84.5%** (defensive security; deliberate weakness on offensive ExploitBench 54.4%). Terminal-Bench 2.1: **88.2%** (vs Sol 88.8). Live now via **GLM Coding Plan** (Lite $12.6 / Pro $56 / Max $117.6 per mo) + **ZCode**; API and open weights are **staged** ~2 weeks after launch pending a safety review tied to the cyber capability. No per-Mtok API rate or license published yet; GLM-5.2's MIT does not auto-transfer.

| Benchmark | GLM-5.3 | GLM-5.2 | Kimi K3 | GPT-5.6 Sol |
|-----------|:-------:|:-------:|:-------:|:-----------:|
| Terminal-Bench 3.0 | 28.3% | 4.6% | 17.4% | **34.6%** |
| DeepSWE (v1.1) | 66.9% | 46.2% | 67.5% (v1.0) | **72.7%** |
| AutomationBench | **48.2%** | 26.2% | 46.7% | 45.8% |
| HLE (w/ tools) | 62.5% | 54.7% | 59.8% | **64.5%** |
| Terminal-Bench 2.1 | **88.2%** | — | 88.3% | 88.8% |

---

## 🆕 Update — New Coding Models (July 30–31, 2026)

All new scores are **vendor-reported** (same caveat as everything else on this page).

### Inkling-Small — July 30, 2026 ⭐ (now scored)

**Thinking Machines** released Inkling-Small at 1/4 the size of Inkling — and it **beats the original** on SWE-bench. Full weights on Hugging Face, Apache 2.0, 1M context (was 256K in the CSV). ~138 GB at Q4 → fits 1× Mac or 4× RTX 5090.

| Benchmark | Inkling-Small | Inkling (975B) |
|-----------|:------------:|:--------------:|
| SWE-bench Verified | **80.2%** ✅ | 77.6% |
| SWE-bench Pro | **55.9%** ✅ | 54.3% |
| Terminal-Bench 2.0 | **64.7%** | 63.8% |
| Full Q4 | **~138 GB** | ~488 GB |

### K-EXAONE 2.0 — July 31, 2026 ⭐

**LG AI Research** released Korea's largest open model: **750B total / 37B active**, Apache 2.0, on Hugging Face. ~375 GB at Q4. Big jump over the 236B v1 already tracked (which scored 80.7% LiveCodeBench).

| Benchmark | K-EXAONE 2.0 | K-EXAONE-236B (v1) |
|-----------|:------------:|:------------------:|
| SWE-bench Verified | **80.6%** ✅ | 49.4% |
| Terminal-Bench 2.1 | **64.0%** | 30.3% |
| SciCode | **50.0%** | 37.4% |

### openPangu-2.0-Pro — July 31, 2026

**Huawei** open-sourced its Ascend-native MoE: **505B total / ~18B active**, 512K context, trained on 34T tokens. Weights + inference code + technical report released together. ~253 GB at Q4. License: **OpenPangu Model License v2.0** (custom, not Apache).

| Benchmark | Thinking | Non-thinking |
|-----------|:--------:|:------------:|
| LiveCodeBench V6 | **85.7%** | 74.5% |
| SWE-bench Verified | **68.5%** | 66.8% |
| DeepCodeBench | 74.2% | 72.6% |

### DeepSeek-V4-Flash official (-0731) — July 31, 2026

DeepSeek graduated **V4-Flash** from preview to official public beta. Same architecture (284B/13B, 1M ctx), but **re-post-trained with massively improved agent capabilities**, native **Responses API** support, and **Codex** adaptation. Terminal-Bench 2.1: **82.7%**. Official API pricing $0.14/$0.28 per 1M (cache-hit input just $0.0028) — slightly above the preview's $0.10/$0.20. V4-Pro official follows soon.

### AMD Instella-MoE-16B-A3B-Think — July 30, 2026

**AMD** released a fully open MoE (16B / 2.8B active) trained end-to-end on MI300X/MI325X, with all 6 training checkpoints + full recipe published. ~8 GB at Q4. Caveat: **ResearchRAIL license** — research use only, not commercial.

---

## ⚠️ Score Verification Status

The CSV scores are **vendor-reported** and often use custom evaluation harnesses (KimiCode, Claude Code, Codex, etc.). Independent leaderboards show **substantially lower** scores for the same benchmarks. Every model score on this page — including Inkling's — is vendor self-reported unless explicitly marked as a Scale AI standardized result. Below is a reconciliation using live data from BenchLM.ai (verified July 23, 2026), labs.scale.com, and the SWE-bench official leaderboard.

### SWE-bench Verified — BenchLM.ai (July 23, 2026, 58 tracked models)

All scores are vendor self-reported. BenchLM aggregates published scores; there is no independent verification body for this benchmark. The swebench.com official leaderboard uses a **bash-only mini-SWE-agent harness** (v2) — most models below are absent from it because vendors use custom scaffolds.

| Model | BenchLM | CSV Claim | Harness | Open? |
|-------|:-------:|:---------:|---------|:-----:|
| Claude Mythos 5 | **95.5%** | — | Anthropic scaffold | ❌ |
| Claude Fable 5 | **95.0%** | — | Anthropic scaffold | ❌ |
| Claude Opus 4.8 | **88.6%** | — | Anthropic scaffold | ❌ |
| DeepSeek V4 Pro Max | **80.6%** | 80.6% | DeepSeek harness | ✅ |
| MiniMax M3 | **80.5%** | 80.5% | Self-reported | ✅ |
| Kimi K2.6 | **80.2%** | 80.2% | Self-reported | ✅ |
| DeepSeek V4 Flash Max | **79.0%** | 79.0% | DeepSeek harness | ✅ |
| **Inkling** | **77.6%** | 77.6% | **Self-reported (bash-only)** | ✅ |
| Qwen3.6-27B | **77.2%** | 77.2% | Self-reported | ✅ |
| MiniMax M2.5 | **75.8%** | 75.8% | Self-reported / official (high reasoning) | ✅ |
| Qwen3.6-35B-A3B | **73.4%** | 73.4% | Self-reported | ✅ |
| DeepSeek V3.2 | **73.1%** | 73.1% | Self-reported | ✅ |
| Nemotron 3 Ultra | **71.9%** | 71.9% | Self-reported | ✅ |

**⚠️ All scores above are vendor self-reported — there is no independent verification for any model.** The swebench.com official leaderboard (mini-SWE-agent v2, bash-only) has markedly lower scores for the few models it lists, but most vendors do not submit there.

### SWE-bench Pro — BenchLM.ai (July 23, 2026, 53 tracked models)

**Split disclosure:** These are vendor-reported aggregate scores. They mix public split (731 tasks), held-out split, and commercial split results using different scaffolds. **Scores are NOT directly comparable across rows** — see Scale AI's standardized leaderboard below for apples-to-apples comparisons.

| Model | BenchLM Pro | CSV Claims (if any) | Harness | Open? |
|-------|:-----------:|:-------------------:|---------|:-----:|
| Claude Mythos 5 | **80.3%** | — | Anthropic scaffold | ❌ |
| Claude Fable 5 | **80.0%** | — | Anthropic scaffold | ❌ |
| Claude Opus 4.8 | **69.2%** | — | Anthropic scaffold | ❌ |
| GLM-5.2 | **62.1%** | — | Self-reported | ✅ |
| Qwen3.7 Max | **60.6%** | — | Self-reported | ❌ |
| MiniMax M3 | **59.0%** | — | Self-reported | ✅ |
| Kimi K2.6 | **58.6%** | — | Self-reported | ✅ |
| DeepSeek V4 Pro Max | **55.4%** | — | Self-reported | ✅ |
| Qwen3.6-27B | **53.5%** | — | Self-reported | ✅ |
| DeepSeek V4 Flash Max | **52.6%** | — | Self-reported | ✅ |
| Inkling | **54.3%** | — | Self-reported (bash-only) | ✅ |
| Qwen3.6-35B-A3B | **49.5%** | — | Self-reported | ✅ |

**Verified→Pro deltas:** Open-weight models drop 20-26 points from their Verified scores to Pro scores. This is consistent across all vendors.

### SWE-bench Pro — Scale AI Standardized Public Set (June 2026)

This is the **only directly cross-model comparable run** — Scale AI runs every model through identical scaffolding (mini-SWE-agent, Pass@1, 731 public tasks). Source: Scale SEAL public leaderboard via [morphllm.com](https://www.morphllm.com/swe-bench-pro).

| Rank | Model | Score | Type |
|:----:|-------|:----:|:----:|
| — | **Claude Opus 5** 🆕🆕 | **79.2%** 🏆 | **Proprietary** (vendor self-reported, Anthropic scaffold) |
| 1 | GPT-5.4 (xHigh) | **59.1%** | Proprietary |
| 2 | Muse Spark (Meta) | **55.0%** | Proprietary |
| 3 | Claude Opus 4.6 (thinking) | **51.9%** | Proprietary |
| 4 | Gemini 3.1 Pro (thinking) | **46.1%** | Proprietary |
| 5 | Gemini 3 Pro | **43.3%** | Proprietary |
| 6 | GPT-5.2 Codex | **41.0%** | Proprietary |
| 7 | Claude Haiku 4.5 | **39.5%** | Proprietary |
| 8 | **Qwen3-Coder 480B-A35B** | **38.7%** | **Open weight** |
| 9 | Gemini 3 Flash | **34.6%** | Proprietary |
| 10 | Kimi K2 Instruct | **27.7%** | **Open weight** |

> **⚠️ Claude Opus 5 (79.2%) is vendor-reported on its own scaffold, not on Scale's standardized mini-SWE-agent.** It is not directly comparable to the standardized runs below it. Opus 5 would need a Scale run for apples-to-apples comparison.

**Key insight:** On identical scaffolding, no open-weight model breaks 40%. The best open model (Qwen3-Coder 480B-A35B, 38.7%) trails the proprietary leader (GPT-5.4, 59.1%) by 20.4 points. Vendor self-reported Pro scores (like Opus 5's 79.2%) are 10-20+ points higher due to tuned scaffolds.

### LiveCodeBench — BenchLM.ai (July 23, 2026)

**Partial verification.** BenchLM currently tracks only 6 models on LiveCodeBench. CSV scores for tracked models match; scores for untracked models are unverifiable.

| Model | BenchLM | CSV Claims | Match? |
|-------|:-------:|:---------:|:------:|
| Qwen3.7 Max | **91.6%** | — | n/a |
| Qwen3.7 Plus | **89.6%** | — | n/a |
| GLM-4.7 | **84.9%** | — | n/a |
| Qwen3.6-27B | **83.9%** | 83.9% | ✅ |
| Qwen3.6-35B-A3B | **80.4%** | 80.4% | ✅ |
| DeepSeek V3 | **37.6%** | — | n/a |
| DeepSeek V4 Flash Max | no entry | 91.6% | ❓ unverifiable today |
| DeepSeek V4 Pro Max | no entry | 93.5% | ❓ unverifiable today |

✅ Tracked models match CSV. ❓ Untracked CSV claims (DVF Max 91.6%, DVP Max 93.5%) cannot be confirmed against BenchLM's current set.

### New Benchmarks Not in CSV

The following coding benchmarks exist with public leaderboards but are **not included** in the CSV:

| Benchmark | Source | Top Open Model | Score | Notes |
|-----------|--------|---------------|-------|-------|
| **DeepSWE 1.0** | [deepswe.datacurve.ai](https://deepswe.datacurve.ai) | Kimi K3 (KimiCode) | 67.5% | Contamination-resistant agentic SWE |
| **Terminal-Bench 2.1** | [awesomeagents.ai](https://awesomeagents.ai) | GLM-5.2 | 82.7% | CLI agent tasks; best open model |
| **FrontierSWE** | [frontierswe.com](https://frontierswe.com) | GLM-5.2 | 72% | Agentic SWE; Claude Fable 5 dominates at 89% |
| **ProgramBench** | Kimi K3 launch | Kimi K3 | 77.8% | Behavioral reconstruction |

### Harness Definitions

The "Harness" column in tables below uses these labels:

| Label | Meaning | Examples |
|-------|---------|----------|
| **Self-reported** | Vendor's own scaffold/toolchain; not independently reproducible | Qwen3.6-27B, MiniMax M3, GLM-5.2 |
| **Self-reported bash-only** | Vendor's own minimal bash-agent harness (standardized in method, not independently verified) | Inkling |
| **DeepSeek** | DeepSeek's proprietary evaluation harness | DeepSeek V4 Flash Max, V4 Pro Max |
| **KimiCode** | Moonshot AI's own agent scaffold; scores 5-10 pts above mini-SWE-agent | Kimi K3 |
| **Anthropic scaffold** | Anthropic's own agent harness | Claude Mythos 5, Claude Fable 5 |
| **OpenAI Codex** | OpenAI's codex CLI harness | GPT-5.x Codex variants |
| **Claude Code** | Anthropic's Claude Code agent harness | GLM-5.2 on FrontierSWE |

**Key caveat:** "Self-reported" means the vendor used their own scaffold — there is no shared standard. Scores from different harness labels are **not directly comparable**. The only apples-to-apples data in this document is the Scale AI standardized SWE-bench Pro public set.

### Caveats (corrected)

1. **Every score on this page is vendor self-reported** — including Inkling's 77.6%. There is no independently verified open-weight SWE-bench score. Inkling is not an exception; it uses the same bash-only harness as its own comparison table. **This applies to closed models too** — Claude, GPT, and Gemini scores also come from their respective vendors' own scaffolds and are not independently audited.
2. **Custom harnesses inflate scores 10-20 pts** — KimiCode, Claude Code, Codex, and vendor-tuned scaffolds all score higher than standard mini-SWE-agent on the same benchmark
3. **SWE-bench Verified is contaminated** — OpenAI withdrew in February 2026 citing contamination. SWE-bench Pro (Scale AI) is now the preferred independent cross-model comparator
4. **Scale standardized Pro scores are the only apples-to-apples data** — on identical scaffolding, open-weight models max out at 38.7% (Qwen3-Coder 480B), 20+ points below proprietary leaders
5. **SWE-bench Pro also has issues** — OpenAI's July 2026 audit estimated ~30% of the 731-task public split is broken, and retracted its earlier recommendation to adopt the benchmark
6. **LiveCodeBench is partially verifiable** — only 6 models tracked on BenchLM as of July 23, 2026; many CSV claims remain unconfirmed
7. **Domain verification (July 23, 2026):** deepswe.datacurve.ai, awesomeagents.ai, and frontierswe.com all resolve and host legitimate benchmarks. deepswe.datacurve.ai shows GLM-5.2 at 44% (matches doc). frontierswe.com shows GLM-5.2 at 72% dominance (matches doc). These sources are confirmed active.

---

## ❓ Unverifiable CSV Claims

The following models have SWE-bench or LiveCodeBench scores in the CSV that **cannot be independently confirmed** against BenchLM.ai's tracked set (July 23, 2026) or any other public leaderboard.

### LiveCodeBench — No BenchLM Entry

| Model | CSV Claim | Source in CSV | Status |
|-------|:---------:|---------------|:------:|
| DeepSeek V4 Pro Max | **93.5%** | Vendor self-reported | ❓ Not on BenchLM (6 tracked) |
| DeepSeek V4 Flash Max | **91.6%** | Vendor self-reported | ❓ Not on BenchLM (6 tracked) |
| Nemotron 3 Ultra | **89.0%** | Vendor self-reported | ❓ Not on BenchLM (6 tracked) |
| Step-3.5-Flash | **86.4%** | Vendor self-reported | ❓ Not on BenchLM (6 tracked) |
| Kimi K2.6 | **89.6%** | Vendor self-reported | ❓ Not on BenchLM (6 tracked) |

### SWE-bench Verified — Absent from BenchLM

| Model | CSV Claim | Status |
|-------|:---------:|:------:|
| GLM-5.2 | **80.0%** | ❓ Not in BenchLM top 58 |
| Hy3 | **78.0%** | ❓ Not in BenchLM top 58 |
| MiMo-V2.5-Pro | **78.9%** | ❓ Not in BenchLM top 58 |
| Step-3.5-Flash | **74.4%** | ❓ Not in BenchLM top 58 |
| North Mini Code 1.0 | **67.6%** | ❓ Not in BenchLM top 58 |

**Recommendation:** These scores should be treated as provisional until independently reproduced or added to a tracked leaderboard.

---

## Reference: #1 Closed Model (for comparison)

| Model | Provider | SWE-bench Verified | SWE-bench Pro |
|-------|----------|-------------------|--------------|
| Claude Opus 5 🆕🆕 | Anthropic | — | **79.2%** |
| Claude Mythos 5 | Anthropic | **95.5%** | — |
| Claude Fable 5 | Anthropic | 95.0% | **80.3%** |

---

## Kimi K3 — New Release (July 16, 2026) ⭐

**Moonshot AI** released Kimi K3 on July 16, 2026. It's a **2.8T-parameter MoE** (896 experts, 16 active per token) with 1M context and native vision. **Kimi K3 License** (custom, not Modified MIT — that was K2), weights released **July 27, 2026** via Hugging Face » **104B active parameters** per Moonshot model card (16 of 896 routed experts + 2 shared experts + always-active stack).

| Benchmark | Score | Notes |
|-----------|-------|-------|
| Terminal-Bench 2.1 | **88.3%** | Within 0.5 pts of GPT-5.6 Sol |
| DeepSWE 1.0 | **67.5%** (KimiCode) / **67.3%** (mini-SWE-agent) | Contamination-resistant |
| FrontierSWE | **81.2** dominance | Below Fable 5 (86.6) |
| ProgramBench | **77.8%** raw pass rate | Behavioral reconstruction |
| SWE Marathon | **42.0%** | Multi-hour engineering tasks |
| GPQA Diamond | **93.5%** | Best open-weight result |
| BrowseComp | **91.2%** | Best published score at launch |
| Intelligence Index (AA) | **57.1** | #4 of 189 models |
| Arena.ai Frontend Code | **#1** | Outpaced Fable 5 & GPT-5.6 Sol |
| API Pricing | $3.00 / $15.00 per 1M | |
| Output Speed (API) | ~62 tok/s | Measured by Artificial Analysis |

**������ Most scores are vendor-reported using K3's own harness (KimiCode).** Independent reproduction pending. Weights released July 27 via Hugging Face under **Kimi K3 License** (custom \u2014 revenue trigger >$20M/yr MaaS, attribution required; not Modified MIT which was K2's license).

---

## Claude Opus 5 — July 24, 2026 🆕🆕

**Anthropic** released Claude Opus 5 on July 24, 2026 — its fourth model in under two months. It brings near-Fable-5 intelligence at half the price ($5/$25 per Mtok, same as Opus 4.8), with a 1M token context window, up to 128K synchronous output, and a new low/medium/high effort toggle. On agentic coding and knowledge-work evals it sets new state-of-the-art for the Opus line.

| Benchmark | Score | Notes |
|-----------|-------|-------|
| SWE-bench Verified | **96.0%** | +7.4 pts over Opus 4.8 (88.6%), edges Fable 5 |
| SWE-bench Pro | **79.2%** | +10 pts over Opus 4.8 (69.2%) |
| SWE-bench Multilingual | **89.5%** | Ahead of Fable 5 (86.6%) |
| SWE-bench Multimodal | **59.4%** | vs Opus 4.8 (38.4%) |
| Frontier-Bench v0.1 | **43.3%** | More than double Opus 4.8 (21.1%) |
| FrontierCode v1.1 (Main) | **53.4%** | Agentic coding |
| BrowseComp | **90.8%** | Agentic search |
| OSWorld 2.0 | **70.6%** | Computer use |
| Humanity's Last Exam (w/ tools) | **64.7%** | |
| ARC-AGI-2 | **90.4%** | Verified by ARC Prize Foundation |
| ARC-AGI-3 | **30.2%** | ~4× next best (GPT-5.6 Sol 7.8%) |
| GDPval-AA v2 Elo | **1861** | Best published knowledge work score |
| CursorBench 3.2 | **70.0%** | Max effort |
| AA Coding Agent Index | **0.6674** | Max effort (Aug 2026 snapshot per `aa_coding.html`; edges Codex-GPT-5.6 Sol at 0.6657) |
| API Pricing | $5.00 / $25.00 per 1M | Same as Opus 4.8, half of Fable 5 |

**Effort toggle:** New low/medium/high per-request control trades thinking tokens for cost. Fast mode (~2.5× speed) doubles rate to $10/$50. No data-retention agreement required for general API access. Closed weights — not available for self-hosting.

**Positioning:** First Opus-tier model to beat Fable 5 on SWE-bench Verified (96.0% vs 95.0%). Also leads on Frontier-Bench (+9.6 pts), ARC-AGI-3 (30.2% vs ~10%), and GDPval-AA. Trails Fable 5 on SWE-bench Pro (79.2% vs 80.0%). Effectively the best cost-quality balance in Anthropic's lineup.

---

## Ling 3.0 Flash — July 23, 2026 🆕

**inclusionAI** (Ant Group) released Ling 3.0 Flash on July 23, 2026. A 124B-parameter MoE with ~5.1B active per token, using a hybrid linear-attention stack (5 KDA layers : 1 MLA layer per block). Native 256K context (262K on routers), extendable to 1M. Free on OpenRouter through August 3, 2026.

| Detail | Value |
|--------|-------|
| Total Params | 124B |
| Active Params | ~5.1B |
| Architecture | Hybrid MoE (KDA + MLA) |
| Context | 262K (extendable to 1M) |
| Reasoning | Hybrid (Ling speed + Ring reasoning) |
| Open weights | Not at launch (API-only; Ling 2.6 Flash has HF weights) |
| Launch price | Free through Aug 3 (OpenRouter); predecessor ~$0.01/$0.03 |
| Focus | Agentic coding, tool calling, long-horizon tasks |
| SWE-Bench Pro (claimed) | 56.63% (thinking mode, vendor-reported) |

**⚠️ No independent benchmark scores exist at launch.** All figures are vendor-reported. Weights not released — API-only via OpenRouter/ZenMux as `inclusionai/ling-3.0-flash`. Watch for open-weight drop on [HuggingFace](https://huggingface.co/inclusionAI).

---

## Qwen3.8-Max (Qwen3.8-2.4T-A95B) — Open Weights Released Aug 13, 2026 🆕

**Alibaba** released Qwen3.8-Max (model ID: `Qwen/Qwen3.8-2.4T-A95B`) on Hugging Face **Aug 13, 2026** (announced Aug 3). It's a **2.4T-parameter sparse MoE** with **95B active parameters** (10 routed + 1 shared expert), 262K native context extensible to 1M+, MTP-trained, and Gated DeltaNet + Gated Attention hybrid architecture.

| Detail | Value |
|--------|-------|
| Total Params | 2.4T (sparse MoE) |
| Active Params | **95B** (10 routed + 1 shared) |
| Context | 262K native, up to 1M |
| License | **qwen3.8-max (custom, not Apache 2.0)** — >$50M/12-mo MaaS revenue requires separate licence |
| Pricing | API via Qwen Cloud; weights on HF |
| AA Intelligence Index | **58** (independent, Sep 1) — **highest open-weight** |
| SWE-bench Pro | **67.7%** (Claude Code harness) |
| Terminal-Bench 2.1 | **86.6%** (Claude Code, avg@10) |
| DeepSWE 1.1 | **56.6%** (Claude Code best) |
| PaperBench | **93.0%** |
| GPQA Diamond | **92.6%** |

**⚠️ License is custom (qwen3.8-max), not Apache 2.0 / MIT.** Commercial use has restrictions. Independent benchmarks now exist — vendor claims of "second only to Fable 5" are broadly consistent with Terminal-Bench 2.1 (86.6% vs Fable 5's 84.6%).

---

### Qwen3.8-Flash-Next — Aug 26, 2026 ⭐⭐ (Qwen4 architecture preview, verified)

**Alibaba's Qwen team** released an experimental model previewing the architecture that will underpin **Qwen4**. Config name on HF: `Qwen4ExpForConditionalGeneration` (qwen4_exp). Open weights under **Qwen Community 1.0 license** (similar to Qwen3.8-27B's Apache 2.0 setup, attribution + revenue trigger for hosted inference).

- **Total 125B / Active ~6B** = 125B main + 51B N-gram embedding (layer-2 PLE only, 20M entries bigrams/trigrams) + 4B MTP. **48 layers** in 12 repeating blocks of 3× Gated DeltaNet (linear) + 1× QSA (full attention)
- **Qwen Sparse Attention (QSA):** MQA, 4 query / 1 shared key head, head_dim 128, **2048-token budget** (512 blocks)
- **MoE:** **512 experts, 10 routed + 1 shared**, intermediate 640; 4 Gated Residual branches, bottleneck rank 320
- **262,144 native context → 1M via YaRN**; n-gram embedding inserted only at layer 2 (PLE)
- **Multimodal:** native vision + video input (1152-hidden, 27-layer vision tower, 16 heads) + 2560-hidden output projection
- **Q4_K_XL ~111 GB** (Unsloth GGUF); BF16 ~360 GB (131 safetensors files)
- **API pricing:** Qwen3.8-Flash (productionized version of -Next) on QwenCloud = **$0.15 / $0.47 per Mtok** (cache hit $0.016, cache create $0.20, cache read $0.016), 1M ctx, 131K max out. Also on OpenCode Go at same rates. -Next itself accessible via Qwen/Qwen3.8-Flash-Next model ID on QwenCloud (no separate pricing)

**Vendor-reported benchmarks (HF model card, Claude Code harness):**

| Benchmark | Qwen3.8-Flash-Next | Qwen3.8-27B | DeepSeek V4 Flash 0731 | Claude Opus 4.6 Max |
|-----------|:-----------:|:-----------:|:-----------:|:-----------:|
| DeepSWE 1.1 | **58.7%** | 42.2% | 54.4% | — |
| SWE-bench Pro | **62.5%** | 61.7% | 56.0% | 53.4% |
| NL2Repo | 48.1% | 42.3% | **54.2%** | 47.6% |
| AndroidWorld | **84.5%** (vision) | — | — | — |
| MathVision | **90.6%** | — | — | — |
| LiveCodeBench v6 | **91.9%** | 90.3% | 90.6% | 88.8% |
| Toolathlon Verified | **73.5%** | 67.1% | 70.3% | — |
| GPQA Diamond | 91.7% | 89.2% | 90.8% | 91.3% |
| HLE (no tools) | 35.9% | 30.8% | 33.8% | **40.0%** |

**Impact:** First open-weight 6B-active to score >60% on SWE-bench Pro (62.5), +0.8 vs Qwen3.8-27B and **+6.5 vs DeepSeek V4 Flash 0731**. At ~2× cheaper to serve than Qwen3.8-27B (6B vs 27B active), slots between 27B and GLM-5.3-Flash in the **router MVP list**. **~111 GB Q4 fits 1× Pro 6000 or 3× 5090**. ⚠️ No independent verification yet (no Scale AI / AA / BenchLM reruns as of Aug 29).

---

### MiniMax M3 — Jun 1, 2026 (weights; pre-dates session) 🆕

**MiniMax** released M3 (Hailuo) — **428B total / 23B active** MoE, 1M context, native multimodal (text/image/video/audio). Weights on Hugging Face.

| Detail | Value |
|--------|-------|
| Total Params | 428B |
| Active Params | 23B |
| Context | 1M |
| License | Modified MIT |
| API Pricing | $0.23-0.30 / $0.96-1.20 per Mtok |
| SWE-bench Verified | **80.5%** (vendor) |
| Full Q4 | ~214 GB |

**Impact:** Competitive with GLM-5.3 on SWE-Verified. Multimodal + 1M ctx + 23B active = versatile router candidate. Fits 8× 5090 or 1× Mac 512GB. Was mentioned by name only in session logs; now fully specified.

---

### Kimi K2.7-Code — Jun 12, 2026 🆕

**Moonshot AI** released Kimi K2.7-Code — **~1T total / 32B active** MoE, 256K context, **Modified MIT**, coding-specialized variant. Weights on Hugging Face.

| Detail | Value |
|--------|-------|
| Total Params | ~1T |
| Active Params | 32B |
| Context | 256K |
| License | Modified MIT |
| AA Index | Not yet measured |

**Impact:** Cheaper, coding-focused sibling of K3. Not yet on AA Index. If self-hostable at ~500 GB Q4, it's a tier below K3 but above Qwen3.8-27B for pure coding. Watch for independent benchmarks.

---

### Laguna S 2.1 — Jul 21, 2026 🆕

**Poolside** released Laguna S 2.1 — **118B total / 8B active** MoE, 256 experts, 1M context. **OpenMDW-1.1 license (commercial OK)**. OpenRouter pricing: **$0.10/$0.20 per Mtok**. Self-hosts on a single DGX Spark / Pro 6000.

| Detail | Value |
|--------|-------|
| Total Params | 118B |
| Active Params | 8B |
| Context | 1M |
| License | OpenMDW-1.1 |
| API Pricing | $0.10 / $0.20 per Mtok |
| SWE-bench Pro | **59.4%** (vendor) |
| Terminal-Bench 2.1 | **70.2%** (vendor) |
| Full Q4 | ~59 GB |

**Impact:** Billed as "the West's most capable open-weight coding model." TB2.1 70.2% competitive with GLM-5.2 (82.7%) at 1/6th the active params. Apache-compatible license + very low API price = easy router add. Fits 1× Pro 6000 comfortably.

---

### Muse Glimmer — Aug 10, 2026 🆕

**Meta** released Muse Glimmer — **29.6B dense**, **Apache 2.0**, distilled from Muse Spark.

| Detail | Value |
|--------|-------|
| Total Params | 29.6B |
| Active Params | 29.6B (dense) |
| Context | 256K |
| License | Apache 2.0 |
| AA Intelligence Index | **35** (independent, Sep 1) |
| Full Q4 | ~15 GB |

**⚠️ Downgrade from session framing:** Session log claimed "beats Qwen3.6 27B on tool use"; **AA Index 35 is far below Qwen3.6-27B (AA ~52) and other router candidates**. Vendor-vs-independent gap is widest of any August release. Keep as lightweight local option only — not router-tier.

---

### Ornith-1.5-397B — Aug 19, 2026 🆕

**DeepReinforce / Ornith** (`ornith-ai` on HF) — **403B total**, **MIT**, 3-stage self-improving RL (task generation + scaffold + rollout jointly optimized via GRPO). Base: `qwen3_5_moe` (Qwen3.5 MoE). No public API — self-host only.

| Detail | Value |
|--------|-------|
| Total Params | 403B |
| Active Params | ? (MoE) |
| Context | 262K → ~1M via YaRN |
| License | MIT |
| Full Q4 | ~244 GB |
| Terminal-Bench 2.1 | **86.1%** (vendor, HF #5) |
| SWE-bench Verified | **86.0%** (vendor, HF #1) |
| SWE-bench Pro | **65.1%** (vendor) |
| DeepSWE | **56.0%** (vendor) |
| Toolathlon | **71.2%** (vendor) |
| GPQA Diamond | **92.8%** (vendor) |

**Caveat:** All benchmarks vendor-reported. Partial third-party verification: HF leaderboard listings for 397B at **#5 TB 2.1 (86.1)** and **#1 SWE-bench Verified (86.0)** — but uploaded by HF Staff member (not fully independent). BenchLM ranks #23 overall, #17 Agentic. No LiveCodeBench reported.

---

### Apodex 1.1-mini — Aug 24, 2026 🆕

**Apodex AI** (Tianqiao Chen) released open-weight **35B-A3B mini** built on Qwen3.5-35B-A3B with **PIVOT-RL** training. 397B flagship is closed (API-only on platform.apodex.ai, free during campaign). **Apache 2.0** weights: `apodex/Apodex-1.1-mini` on HF + FP8/NVFP4/GPTQ-Int4 quants.

| Detail | Value |
|--------|-------|
| Total Params | 35B |
| Active Params | 3B |
| Context | 262,144 |
| License | Apache 2.0 |
| Full Q4 | ~17 GB |
| SWE-bench Verified | **77.7%** (self-reported) |
| Terminal-Bench 2.1 | **70.8%** (self-reported) |
| APEX-Agents Agent Team | 27.7 (self-reported) |
| GDPVal | 70.7 (self-reported) |

**Caveat:** **No independent verification** — all numbers self-reported; even competitor benchmarks are Apodex's own internal reproductions. Free campaign on platform.apodex.ai. Watch only — too new for router tier.

---

---

## ⚠️ Top Open-Weight Models by CSV Claimed SWE-bench (ALL VENDOR-REPORTED)

**IMMEDIATE WARNING:** This table shows the **CSV claims** — ALL of these models use custom vendor harnesses and CANNOT be verified against swebench.com. **Every score below is vendor self-reported, including Inkling's.** There is no independently verified open-weight SWE-bench score. BenchLM.ai confirmed scores are noted where available (July 23, 2026).

| Model | Provider | Total Params | Active Params | Harness | CSV SWE-bench | BenchLM Verified (Jul 23) | Full Q4 | Fits 1×5090? |
|-------|----------|-------------|--------------|---------|:------------:|:-------------------------:|:-------:|:------------:|
| **Claude Opus 5** 🆕🆕 | Anthropic | Closed | Closed | Anthropic scaffold | **79.2%** (Pro) | — | — | n/a (closed) |
| **Kimi K3** ⭐ | Moonshot AI | **2.8T** | 104B | KimiCode | — | — | ~1,400 GB | ❌ none |
| **Ling 3.0 Flash** 🆕 | inclusionAI | **124B** | **~5.1B** | Self-reported | 56.6% (Pro, thinking) | — | ~62 GB | ❌ |
| DeepSeek V4 Pro Max | DeepSeek | 1.6T | 49B | DeepSeek | 80.6% | **80.6%** | 800 GB | ❌ |
| MiniMax M3 | MiniMax | 428B | 23B | Self-reported | 80.5% | **80.5%** | 214 GB | ❌ |
| Kimi K2.6 | Moonshot AI | 1T | 32B | Self-reported | 80.2% | **80.2%** | 500 GB | ❌ |
| **GLM-5.2** | Z.AI | 744B | 40B | Self-reported | 80.0% | — | 372 GB | ❌ |
| **DeepSeek V4 Flash Max** | DeepSeek | 284B | 13B | DeepSeek | 79.0% | **79.0%** | 142 GB | ❌ |
| MiMo-V2.5-Pro | Xiaomi | 1.02T | 42B | Self-reported | 78.9% | — | 510 GB | ❌ |
| Hy3 (free) | Tencent | 295B | 21B | Self-reported | 78.0% | — | 148 GB | ❌ |
| GLM-5.1 | Z.AI | 744B | 40B | Self-reported | 77.8% | — | 372 GB | ❌ |
| **GLM-5** 🆕 | Z.ai | **754B** | **40B** | Self-reported | **77.8%** | — | 377 GB | ✅ |
| Mistral Medium 3.5 | Mistral | 128B | 128B dense | Self-reported | 77.6% | **77.6%** | 64 GB | ❌ |
| **Inkling** 🆕 | Thinking Machines | **975B** | **41B** | **Self-reported bash-only** | **77.6%** | **77.6%** | **~488 GB** | ❌ (needs ~2TB) |
| **Qwen3.6-27B** | Alibaba | **27B** | **27B dense** | Self-reported | **77.2%** | **77.2%** | **14 GB** | ✅ **BEST DENSE FIT** |
| MiniMax M2.5 | MiniMax | 230B | 10B | Self-reported / official (high reasoning) | 75.8% | **75.8%** | 115 GB | ❌ |
| Ornith-1.0-397B | DeepReinforce AI | 397B | ? | Self-reported | ~77% *(est.)* | — | 198 GB | ❌ |
| Kimi K2.5 | Moonshot AI | 1T | 32B | Self-reported | 76.8% | **76.8%** | 500 GB | ❌ |
| Qwen3.5-397B | Alibaba | 397B | 17B | Self-reported | 76.4% | **76.2%** | 198 GB | ❌ |
| Step-3.5-Flash | StepFun | 196B | ? | Self-reported | 74.4% | — | 98 GB | ❌ |
| GLM-4.7 | Z.AI | 358B | 32B | Self-reported | 73.8% | **73.8%** | 179 GB | ❌ |
| **Devstral 2** 🆕 | Mistral | **123B** | **123B dense** | Self-reported | **72.2%** | — | **62 GB** | ❌ (needs Pro 6000) |
| **Qwen3.6-35B-A3B** | Alibaba | 35B | **3B** | Self-reported | 73.4% | **73.4%** | **18 GB** | ✅ **MOST EFFICIENT MOE** |
| MiMo-V2-Flash | Xiaomi | 309B | 15B | Self-reported | 73.4% | **73.4%** | 154 GB | ❌ |
| Big Pickle | OpenCode | ? | ? | Self-reported | 73.8% | — | ? | ? |
| **DeepSeek V3.2** | DeepSeek | 685B | 37B | Self-reported | 73.1% | **73.1%** | 342 GB | ❌ |
| Nemotron 3 Ultra | NVIDIA | 550B | 55B | Self-reported | 71.9% | **71.9%** | 275 GB | ❌ |
| **Qwen3-Coder-Next** | Alibaba | 80B | **3B** | Self-reported | 70.6% | — | 40 GB | ❌ |
| Qwen3-Coder-480B-A35B | Alibaba | 480B | 35B | Self-reported | 68.4% | — | 240 GB | ❌ |
| **Devstral Small 2** 🆕 | Mistral | **24B** | **24B dense** | Self-reported | **68.0%** | — | **12 GB** | ✅ **BEST APACHE 2.0 DENSE** |
| **North Mini Code 1.0** | Cohere | 30B | **3B** | Self-reported | **67.6%** | — | **15 GB** | ✅ **BEST APACHE 2.0 FREE** |
| Nemotron 3 Super | NVIDIA | 120B | **12B** | Self-reported | 60.5% | — | 60 GB | ❌ |
| Codestral 22B | Mistral | 22B | 22B | Self-reported | 40.0% | — | **11 GB** | ✅ 1×5090 |
| StarCoder2-15B | BigCode | 15B | 15B | Self-reported | 18.3% | — | **8 GB** | ✅ 1×5090 |

**Note:** Rows sorted by CSV SWE-bench descending (no-score models first). These are **not** rankings — scores use different harnesses and are not directly comparable. For apples-to-apples rankings, see the Scale AI standardized SWE-bench Pro table.

---

### 🔑 THE REAL STORY (corrected)

**No open-weight SWE-bench score is independently verified.** Every number is vendor self-reported. Inkling's 77.6% is not an exception — it's self-reported on Thinking Machines' own bash-only harness, the same methodology as every other vendor. There is no "77% ceiling breaker." The entire comparison is vendor claims vs vendor claims.

**After cleaning the CSV noise, these models provide the best WORTH-HARDWARE VALUE (all scores are vendor-reported, treat as directional):**

1. **Qwen3.6-27B** (14 GB, Apache 2.0) - **77.2% CSV SWE-bench, 83.9% BenchLM LCB** — best single-GPU overall
2. **Qwen3.6-35B-A3B** (18 GB, Apache 2.0) - **73.4% CSV, 80.4% BenchLM LCB, 183 tok/s** — fastest single-GPU
3. **DeepSeek V4 Flash Max** (142 GB, MIT) - **79.0% CSV, 1M ctx** — best quality if you have multi-GPU or Mac
4. **North Mini Code 1.0** (15 GB, Apache 2.0 free) - **67.6% CSV** — best free coding agent on one GPU
5. **Codestral 22B** (11 GB, MNPL-0.1) - **40.0% CSV** — non-production license, tiny footprint

**Key reality check via SWE-bench Pro (Scale standardized, the only apples-to-apples data):**
- Best open-weight on identical scaffolding: Qwen3-Coder 480B-A35B at **38.7%**
- Best proprietary on identical scaffolding: GPT-5.4 (xHigh) at **59.1%**
- Vendor self-reported Pro scores (tuned scaffolds): open models reach **49-62%**
- Verified→Pro drop on vendor numbers: **20-26 points** across all open-weight models

**What this means:** Vendor-tuned scaffolds inflate scores 10-20+ points. When you run every model through the same harness, open-weight models trail proprietary leaders by ~20 points on Pro and don't appear on Verified at all. A 77% Verified score maps to roughly 50-55% on Pro — still useful, but not frontier-level.

---

## Cross-Benchmark Comparison for Open-Weight Models

Models ranked by average across multiple benchmarks. **⚠️ ALL scores below are vendor self-reported — including Inkling's.** No open-weight SWE-bench score is independently verified. Verified→Pro drops are 20-26 points for every model listed.

| Model | Full Q4 | CSV SWE-bench | LCB V6 (CSV) | DeepSWE | Term-Bench | FrontierSWE | Avg Rank | Fits 1×5090? |
|-------|---------|:------------:|:------------:|:-------:|:----------:|:-----------:|:--------:|:------------:|
| **Inkling** 🆕 | **488 GB** | 77.6% | — | — | 63.8% | — | Strong | ❌ (needs ~2TB) |
| **DeepSeek V4 Flash Max** | 142 GB | 79.0% | **91.6%** | — | 56.9% | — | Strong | ❌ |
| **GLM-5** 🆕 | **377 GB** | **77.8%** | — | — | **56.2%** (TB 2.0) | — | Strong | ❌ |
| **GLM-5.2** | 372 GB | 80.0% | — | 44% | **82.7%** | **72%** | Strong | ❌ |
| **Qwen3.8-Max** 🆕 | **1,200 GB** | **67.7%** | — | **56.6%** | **86.6%** | **73.5%** | Strong | ❌ |
| **Qwen3.6-27B** | **14 GB** | 77.2% | 83.9% | — | 59.3% | — | Good | ✅ |
| **Kimi K3** ⭐ | ~1,400 GB | — | — | **67.5%** | **88.3%** | 81.2 | Strong | ❌ |
| **LongCat-2.0** 🆕 | ~800 GB | — | — | — | 70.8% | — | New | ❌ |
| **DeepSeek V3.2** | 342 GB | 73.1% | 83.3% | — | — | — | Good | ❌ |
| **MiniMax M2.5** | 115 GB | **75.8%** | 65% | — | 42.2% | — | Mixed | ❌ |
| **Qwen3.6-35B-A3B** | **18 GB** | 73.4% | 80.4% | — | 51.5% | — | Decent | ✅ |
| **Ling 3.0 Flash** 🆕 | **~62 GB** | — (56.6% Pro) | — | — | — | — | New | ❌ |
| **North Mini Code 1.0** | **15 GB** | 67.6% | — | — | **63%** | — | Decent | ✅ |
| **Qwen3-Coder-480B-A35B** | 240 GB | 68.4% | — | — | — | — | Unknown | ❌ |

**Key findings:**
- **All scores are vendor self-reported** — there is no independently verified open-weight SWE-bench score. Inkling (77.6%) is self-reported on a bash-only harness, not independently verified
- **SWE-bench Pro tells the real story** — on Scale AI's standardized scaffolding (identical for all models), the top open-weight model (Qwen3-Coder 480B-A35B) scores just **38.7%**, vs GPT-5.4 at 59.1%. Vendor-tuned scaffolds add 10-20 points
- **Claude Opus 5 (Jul 24)** — Anthropic's new flagship at $5/$25, near-Fable-5 intelligence, 79.2% SWE-bench Pro, 43.3% Frontier-Bench, 30.2% ARC-AGI-3. First model with per-request effort toggle. Closed weights.
- **Ling 3.0 Flash (Jul 23)** — inclusionAI's 124B/5.1B active hybrid MoE, free through Aug 3. 262K context, hybrid linear-attention (KDA+MLA). API-only at launch; no independent benchmarks yet.
- **GLM-5.2** has the most broad benchmark coverage among open-weight models — strong on Terminal-Bench (82.7%) and FrontierSWE (72%), but DeepSWE is lower (44%)
- **Qwen3.6-27B** is the only model scoring well across both SWE-bench and LiveCodeBench that fits a single 5090
- **Kimi K3** leads on Terminal-Bench and DeepSWE, weights released July 27 under **Kimi K3 License** (custom \u2014 revenue trigger >$20M/yr MaaS, attribution required; not Modified MIT which was K2's license)
- **LongCat-2.0** (1.6T/48B, MIT) is the first trillion-parameter model trained without Nvidia hardware — 59.5% SWE-bench Pro, weights on HuggingFace
- **Terminal-Bench** is the most accessible benchmark for open models — GLM-5.2 and Kimi K3 both score well

---

## Additional Open-Weight Models (LiveCodeBench only)

| Model | Provider | Active Params | LiveCodeBench V6 | SWE-bench Verified | License |
|-------|----------|--------------|-----------------|-------------------|---------|
| **A.X K2** 🆕 (Jul 29) | SK Telecom | 33B | 84.0% | — | **Apache 2.0** ✅ |
| K-EXAONE-236B-A23B | LG AI | 23B | 80.7% | — | Open weight |
| MiniMax M2 | MiniMax | 10B | 83.0% | — | Modified MIT |
| Kimi K2-Thinking-0905 | Moonshot AI | 32B | 83.1% | — | Modified MIT |
| **Kimi K2.7 Code** | Moonshot AI | 32B | — | — | Modified MIT |
| **LongCat-2.0** 🆕 | Meituan | ~48B | — | — | **MIT** ⭐ |
| LongCat-Flash-Thinking-2601 | Meituan | ? | 82.8% | — | Open weight |
| LongCat-Flash-Thinking | Meituan | ? | 79.4% | — | Open weight |
| GLM-4.6 | Z.AI | 32B | 82.8% | — | MIT |
| Gemma 4 31B | Google | 31B | 80.0% | 52% | **Apache 2.0** ✅ |
| Gemma 4 26B-A4B | Google | **4B** | 77.1% | 17.4% | **Apache 2.0** ✅ |
| Gemma 4 12B | Google | 12B | 72.0% | — | **Apache 2.0** ✅ |
| Qwen3.5-122B-A10B | Alibaba | 10B | 78.9% | — | Open weight |
| Qwen3.5-27B | Alibaba | 27B | 80.7% | 75.0% | Open weight |
| Qwen3.5-35B-A3B | Alibaba | 3B | 74.6% | 70.0% | **Apache 2.0** ✅ |
| Qwen3-Coder-30B-A3B | Alibaba | 3B | — | — | **Apache 2.0** ✅ |
| Qwen3 32B | Alibaba | 32B | 65.7% | ~62% | Open weight |
| DeepSeek R1 | DeepSeek | 37B | 73.3% | 49.2% | MIT |
| DeepSeek R1-0528 | DeepSeek | 37B | 73.3% | — | MIT |
| DeepSeek-V3 0324 | DeepSeek | 37B | 49.2% | — | MIT |
| Nemotron Nano 9B v2 | NVIDIA | 9B | 71.1% | — | Open weight |
| Mistral Small 4 | Mistral | 6.5B | 63.6% | — | Open weight |
| Ministral 3 14B | Mistral | 14B | 64.6% | — | Open weight |
| Ministral 3 8B | Mistral | 8B | 61.6% | — | Open weight |
| ZAYA1-8B | Zyphra | 8B | 65.8% | — | Open weight |
| **GLM-5** | Z.AI | 44B | 71.6% | 77.8% | MIT |
| **Codestral 22B** | Mistral | 22B | 48.0% | 40.0% | MNPL-0.1 |
| **StarCoder 3** | BigCode | 15B | — | — | OpenRAIL-M |
| **StarCoder2-15B** | BigCode | 15B | — | 18.3% | OpenRAIL-M |
| **StarCoder1-15B** | BigCode | 15.5B | — | — | OpenRAIL-M |
| **Yi-Coder-9B** | 01.AI | 9B | 23.4% | — | Apache 2.0 |
| **Yi-Coder-1.5B** | 01.AI | 1.5B | — | — | Apache 2.0 |
| **CodeLlama-70B-Instruct** | Meta | 70B | — | — | Llama 2 Comm. |
| **CodeLlama-34B-Instruct** | Meta | 34B | — | — | Llama 2 Comm. |
| **CodeLlama-13B-Instruct** | Meta | 13B | — | — | Llama 2 Comm. |
| **CodeLlama-7B-Instruct** | Meta | 7B | — | — | Llama 2 Comm. |
| **ERNIE 4.5** | Baidu | 47B | 45.4% | — | Apache 2.0 |
| **ERNIE 4.5-21B-A3B** | Baidu | 3B | — | — | Apache 2.0 |
| **SPARK X2** | iFlytek | ~30B | — | — | Proprietary |
| **AFM 3 Core** | Apple | 3B | — | — | Proprietary |

---

## Best Picks for Local Deployment (4-bit quant)

> **Full Q4** = `total_params × 0.5 GB` — the entire model must be loaded. Active-only numbers (often shown for MoE) are misleading for hardware decisions.

### Fits 1× RTX 5090 (32GB VRAM — max ~28GB @ Q4)

| Model | Full Q4 | SWE-bench | LCB V6 | Why |
|-------|---------|-----------|--------|-----|
| **Qwen3.6-27B** | **14 GB** ✅ | **77.2%** | 83.9% | Best dense; Apache 2.0, 262K ctx |
| **Qwen3.6-35B-A3B** | **18 GB** ✅ | 73.4% | 80.4% | Fastest at 183 tok/s |
| **Devstral Small 2** 🆕 | **12 GB** ✅ | **68.0%** | — | Apache 2.0, 256K ctx, strong coding agent |
| **North Mini Code 1.0** | **15 GB** ✅ | **67.6%** | — | Apache 2.0, 256K ctx, 63% Term-Bench |

*No model scoring ≥78% SWE-bench fits entirely in 32GB. Inkling (77.6%, 488GB) requires ~2TB VRAM. MiniMax M2.5 (75.8%, 115GB) requires CPU offload (~10-15 tok/s).*

### Fits 1× RTX Pro 6000 Blackwell (96GB VRAM — max ~85GB @ Q4)

The RTX Pro 6000 Blackwell (GB202 die, 24,064 CUDA cores, 1,792 GB/s bandwidth, 600W TDP) is **Nvidia's workstation flagship** with 96GB GDDR7 ECC. It fills the gap between single 5090 (32GB) and multi-GPU/Mac setups. Launched March 2025 at $8,565 MSRP; current pricing is ~$13,250 (GDDR7 shortage drove a 55% increase). In India: ~₹14L ($16,800).

> **Note (Aug 2026):** India street prices have since risen sharply — see [`single_user_india_local_ai.md`](single_user_india_local_ai.md) §9, which lists RTX Pro 6000 at ~₹40–48L/card. The ₹14L figure here is the older estimate and is kept for continuity.

| Model | Full Q4 | SWE-bench | LCB V6 | Why |
|-------|---------|-----------|--------|-----|
| **DeepSeek V4 Flash Max** | **142 GB** ❌ | **79.0%** | **91.6%** | Doesn't fit — needs 142GB |
| **MiniMax M2.5** | **115 GB** ❌ | **75.8%** | — | Doesn't fit — needs 115GB |
| **Mistral Medium 3.5** | **64 GB** ✅ | 77.6% | — | Fits comfortably; dense, no offload |
| **Qwen3.5-397B** | **198 GB** ❌ | 76.4% | 83.6% | Doesn't fit |
| **Step-3.5-Flash** | **98 GB** ❌ | 74.4% | 86.4% | Just over budget, 2GB over |
| **Devstral 2** 🆕 | **62 GB** ✅ | **72.2%** | — | Fits; 123B dense, Apache 2.0 |
| **GLM-4.7** | **179 GB** ❌ | 73.8% | 84.9% | Doesn't fit |
| **Qwen3-Coder-480B-A35B** | **240 GB** ❌ | 68.4% | — | Doesn't fit |
| **Nemotron 3 Super** | **60 GB** ✅ | 60.5% | **81.2%** | Fits; decent LCB, weak SWE |
| **Laguna S 2.1** 🆕 | **59 GB** ✅ | — | — | 70.2% Terminal-Bench, 1M ctx, MoE with 8B active |
| **Leanstral 1.5** 🆕 | **60 GB** ✅ | — | — | Lean 4 formal verification specialist, Apache 2.0 |

**Best picks for RTX Pro 6000:** Mistral Medium 3.5 (64GB, 77.6% SWE) fits entirely — no offload, full 128K+ context. Devstral 2 (62GB, 72.2% SWE) is a strong Apache 2.0 alternative. Nemotron 3 Super (60GB, 81.2% LCB) and Laguna S 2.1 (59GB, 70.2% Term-Bench) also fit. Leanstral 1.5 (60GB) if you need formal verification in Lean 4. Most high-score MoE models (80B+) need more than 96GB, so the Pro 6000 is primarily useful for dense models in the 60-85GB range.

### Fits 4× RTX 5090 or 1× Mac (128-512GB VRAM)

| Model | Full Q4 | SWE-bench | LCB V6 | Min Hardware |
|-------|---------|-----------|--------|-------------|
| **MiniMax M2.5** | 115 GB | **75.8%** | — | 4×5090 / 1× Mac |
| **Mistral Medium 3.5** | 64 GB | 77.6% | — | 4×5090 / 1× Mac |
| **Step-3.5-Flash** | 98 GB | 74.4% | 86.4% | 4×5090 / 1× Mac |

### Fits 8+ RTX 5090 or 1× Mac (256-512GB VRAM)

| Model | Full Q4 | SWE-bench | LCB V6 | Min Hardware |
|-------|---------|-----------|--------|-------------|
| **MiniMax M3** | 214 GB | **80.5%** | — | 8×5090 / 1× Mac |
| **DeepSeek V4 Flash Max** | 142 GB | **79.0%** | **91.6%** | 8×5090 / 1× Mac |
| **GLM-5.2** | 372 GB | **80.0%** | — | 1× Mac |
| **Kimi K2.6** | 500 GB | **80.2%** | 89.6% | 1× Mac (tight) |
| **Inkling** 🆕 | **488 GB** | **77.6%** | — | 1× Mac (tight) / datacenter |

### Fits 2× Mac M3 Ultra (1TB unified)

| Model | Full Q4 | SWE-bench | LCB V6 | Notes |
|-------|---------|-----------|--------|-------|
| **DeepSeek V4 Pro Max** | 800 GB | **80.6%** | **93.5%** | Only feasible with 2× Macs or 32× 5090s |
| **LongCat-2.0** 🆕 | ~800 GB | — | — | Meituan, MIT, 1M ctx, first Nvidia-free 1T model |

---

## Free Open-Weight Models (No API cost)

| Model | SWE-bench | Full Q4 | Min Hardware |
|-------|-----------|---------|-------------|
| Inkling 🆕 | **77.6%** | **488 GB** | Datacenter / 1× Mac (tight) |
| Hy3 | **78.0%** | 148 GB | 8×5090 / 1× Mac |
| GLM-5 | **77.8%** | 372 GB | 1× Mac |
| Big Pickle | 73.8% | ? | ? |
| North Mini Code 1.0 | **67.6%** | **15 GB** | **1× 5090** ✅ |

---

## VRAM Estimation at 4-bit

**Full model Q4** = `total_params × 0.5 GB` (no meaningful overhead for modern loaders like llama.cpp)

**Active params are misleading for MoE** — the full model (`total_params × 0.5`) must be loaded into RAM/VRAM even though only a subset of experts activate per token.

| Total Params | Full Q4 VRAM | Example Models | Fits |
|-------------|-------------|----------------|------|
| 15B | ~8 GB | StarCoder2-15B, Gemma 4 12B | ✅ 1× 5090 |
| 22-30B | ~11-15 GB | Qwen3.6-27B, Codestral 22B, North Mini Code | ✅ 1× 5090 |
| 35B | ~18 GB | Qwen3.6-35B-A3B | ✅ 1× 5090 |
| 80B | ~40 GB | Qwen3-Coder-Next | ❌ 1× 5090, ✅ 2× / 1× Pro 6000 |
| 128B | ~64 GB | Mistral Medium 3.5 | ✅ 1× Pro 6000 / 4× 5090 / Mac |
| 196B | ~98 GB | Step-3.5-Flash | ⚠️ 1× Pro 6000 (tight, 2GB over) / 4× 5090 / Mac |
| 230B | ~115 GB | MiniMax M2.5 | ✅ 4× 5090 / Mac |
| 284B | ~142 GB | DeepSeek V4 Flash Max | ✅ 8× 5090 / Mac |
| 295-309B | ~148-154 GB | Hy3, MiMo-V2-Flash | ✅ 8× 5090 / Mac |
| 358-428B | ~179-214 GB | MiniMax M3, GLM-4.7 | ✅ 8× 5090 / Mac |
| 480-550B | ~240-275 GB | Qwen3-Coder-480B, Nemotron 3 Ultra | ✅ 1× Mac |
| 685-744B | ~342-372 GB | DeepSeek V3.2, GLM-5.x, **A.X K2** 🆕 (344 GB) | ✅ 1× Mac |
| 975B | ~488 GB | Inkling 🆕 | ⚠️ 1× Mac (tight) |
| 1T | ~500 GB | Kimi K2.6, MiMo-V2-Pro | ⚠️ 1× Mac (tight) |
| 1.6T | ~800 GB | DeepSeek V4 Pro Max, **LongCat-2.0** 🆕 | ✅ 2× Mac |
| 2.4T | ~1.2 TB | Qwen3.8-Max-Preview 🆕 | ❌ needs 3× Mac / datacenter |

---

## Key Takeaways (corrected)

1. ⚠️ **Every open-weight SWE-bench score is vendor self-reported** — including Inkling's 77.6%. There is no "third-party verified" exception. Inkling's score is self-reported on Thinking Machines' own bash-only harness, identical in methodology to every other vendor claim.
2. **SWE-bench Verified is contaminated** — OpenAI withdrew in February 2026 citing contamination. SWE-bench Pro (Scale AI) is now the preferred independent cross-model comparator.
3. **LiveCodeBench is partially verifiable** — BenchLM tracks only 6 models. Qwen3.6-27B (83.9%) and Qwen3.6-35B-A3B (80.4%) match. DeepSeek V4 Flash Max (91.6% CSV) is **not confirmable** on BenchLM's current tracked set.
4. **SWE-bench Pro standardized scores are the only apples-to-apples data** — on Scale AI's identical scaffolding, the best open-weight model (Qwen3-Coder 480B-A35B) scores just **38.7%**, vs GPT-5.4 at 59.1%. Vendor-tuned scaffolds inflate scores 10-20 points.
5. **Claude Opus 5 (Jul 24)** — Anthropic's new flagship, 79.2% SWE-bench Pro (self-reported, Anthropic scaffold), 43.3% Frontier-Bench, 30.2% ARC-AGI-3. Same price as Opus 4.8 ($5/$25). Near-Fable-5 at half the price. New effort toggle (low/med/high). Closed weights.
6. **Ling 3.0 Flash (Jul 23)** — inclusionAI's 124B/5.1B active hybrid MoE, free through Aug 3, 262K ctx. API-only; no independent benchmarks yet. Watch for open-weight drop.
7. **Qwen3.6-35B-A3B** (3B active, ~2 GB) gives 73.4% SWE-bench from almost no VRAM — absurdly efficient MoE
8. **Gemma 4 26B-A4B** (4B active, Apache 2.0) is the best permissive license option at 77.1% LiveCodeBench
9. **Terminal-Bench 2.1** is the most accessible benchmark for open-weight models — GLM-5.2 scores 82.7%, rivaling GPT-5.6 Sol (88.8%)
10. **GLM-5.2** has the broadest benchmark coverage among open-weight models (SWE-bench, Terminal-Bench, FrontierSWE, DeepSWE)
11. Several free open-weight models (Hy3, Big Pickle, North Mini Code) score well with zero API cost
12. **Kimi K3 weights released July 27, 2026** under **Kimi K3 License** (custom \u2014 revenue trigger >$20M/yr MaaS, attribution required; not Modified MIT which was K2's license). All scores vendor-reported on KimiCode harness. **104B active parameters** per Moonshot model card (16 of 896 routed experts + 2 shared experts + always-active stack).
13. **Qwen3.8-Max-Preview** (2.4T MoE) was announced July 19 — Alibaba's largest model, ~984K context. **Open weights confirmed "next week" (Aug 2)** — no repo or license yet. No benchmark scores published.
14. **Kimi K2.7 Code** (1T/32B, Modified MIT) is now listed with vendor-reported 58.6% SWE-bench Pro — open-weight alternative to K3, weights already available.
15. **A.X K2 (Jul 29)** — SK Telecom's 688B/33B Apache 2.0 sovereign model. #1 on math (AIME26 97.1) and Korean benchmarks, mid-pack on coding (LCB 84.0). With K-EXAONE 2.0, Korea shipped two frontier Apache 2.0 models in 72 hours.
16. **Kimi K3 independently verified at #3** on Artificial Analysis Intelligence Index (57) — first open-weight model in the global top 3.

---

## Hardware Performance: Token Throughput & Context Window

Real-world benchmarks at **4-bit quantization** on consumer hardware. Measured from llama.cpp, MLX, vLLM (batch=1, single user unless noted).

### Hardware Specs

| Hardware | VRAM/Memory | Bandwidth | TDP |
|----------|------------|-----------|-----|
| RTX 5090 (1×) | 32 GB GDDR7 | 1,792 GB/s | 575W |
| **RTX Pro 6000 (1×)** | **96 GB GDDR7** | **~1,792 GB/s** | **~600W** |
| RTX 5090 (4×) | 128 GB | 7,168 GB/s | 2,300W |
| RTX 5090 (8×) | 256 GB | 14,336 GB/s | 4,600W |
| M3 Ultra (96GB) | 96 GB unified | 800 GB/s | ~140W |
| M3 Ultra (512GB) † | 512 GB unified | 800 GB/s | ~140W |

† No M4 Ultra was ever released — Apple skipped it (M4 Max lacks UltraFusion interconnect). M5 Ultra expected late 2026. The 512GB BTO config was ~₹12L in India before discontinuation (Mar 2026). RTX 5090 India market price: ~₹4.5-5L (AIB models, July 2026).

---

### Qwen3.6-35B-A3B (35B / 3B active) — SWE-bench 73.4%, LiveCodeBench 80.4% ⭐ Speed King

Source: [patrickgawron.com](https://patrickgawron.com/articles/qwen36-35b-nvfp4-vllm-on-rtx5090/), [zenn.dev](https://zenn.dev/toki_mwc/articles/rtx5090-qwen36-35b-a3b-llmacpp-bench?locale=en), [specpicks.com](https://specpicks.com/reviews/qwen-3-6-35b-a3b-kv-cache-quantization-2026)

**Fits entirely in GPU VRAM** — no CPU offloading needed. Only 3B active params.

| Hardware | Quant | Tok/s | Context | Notes |
|----------|-------|-------|---------|-------|
| **1× RTX 5090** (llama.cpp) | Q4_K_M | **183 tok/s** | 128K | llama.cpp b8870, clean VRAM |
| **1× RTX 5090** (llama.cpp) | Q5_K_S | **180 tok/s** | 128K | Same perf as Q4 on this model |
| **1× RTX 5090** (vLLM, NVFP4) | NVFP4 | **105 words/s** (~140 tok/s) | 96K | Single chat |
| **1× RTX 5090** (vLLM, 2 chats) | NVFP4 | **160 words/s total** | 96K | Sweet spot — 2 concurrent |
| **RTX 5090 Laptop** (llama.cpp) | Q3_K_XL + MTP | **249 tok/s** | 64K | Multi-token prediction, 896 GB/s BW |
| **1× RTX 5090** (vLLM, 16K ctx) | MXFP4 | **49 tok/s** | 16K | 22 GB VRAM used |
| **1× RTX 4090 24GB** (llama.cpp) | Q4_K_M | **168 tok/s** | 128K | Fits with ~22 GB |
| **1× RTX 3090 24GB** (llama.cpp) | Q4_K_M | **137 tok/s** | 128K | Fits with ~22 GB |
| **M5 Max 64GB** (MLX) | UD-4 | **36 tok/s** | 64K | 600 GB/s BW |
| **M3 Ultra 512GB** (MLX) | Q4 | **~50 tok/s** | 262K | Estimated (800 GB/s BW) |
| **Dual RTX 3090 48GB** (llama.cpp) | Q4_K_M | **22 tok/s** | 64K | Tensor parallelism overhead |

**Benchmark details** (zenn.dev, llama.cpp):
- Qwen3.5 Q4_K_M: **214 tok/s** (TG 128)
- Qwen3.6 Q4_K_M: **183 tok/s** (TG 128) — 15% slower due to hybrid Gated DeltaNet
- Qwen3.6 Q5_K_S: **180 tok/s** (TG 128)
- **18 tok/s happens when VRAM overflows** (Ollama occupying VRAM) → CPU fallback

---

### DeepSeek V4 Flash Max (284B / 13B active) — SWE-bench 79.0%, LiveCodeBench 91.6% ⭐ Best Local Coding

Source: [DeepSeek official HF](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash), [bittide.aicompass.dev](https://bittide.aicompass.dev), DeepSeek V4 paper (arXiv 2606.19348)

**MLA architecture** makes KV cache 93% smaller than standard attention. 1M context fits on a single 5090.

| Hardware | Quant | Tok/s | Context | Notes |
|----------|-------|-------|---------|-------|
| **1× RTX 5090** | Q2_K | **21.3 tok/s** | **1M** ✅ | Full model via expert offload |
| **1× RTX 5090** | Q4 (agg. offload) | **~10-15 tok/s** | 128K | Single user; experts swap from CPU over PCIe |
| **1× RTX 5090** (batch=10) | Q4 (offload) | **~38 tok/s** | 128K | Batch serving amortizes expert load cost |
| **4× RTX 5090** | Q4 | **~60-80 tok/s** | 1M | Expert parallelism across GPUs |
| **M3 Ultra 512GB** (MLX) | Q4 | **~20-30 tok/s** | 1M | Fits entirely in unified memory (142 GB @ Q4) |
| **M3 Ultra 512GB** (MLX, batch) | Q4 | **~40 tok/s** | 1M | With continuous batching |

**Key:** On single 5090, the 284B model doesn't fit in VRAM. Only active 13B experts + attention weights fit. The remaining 256 experts sit in CPU RAM and swap over PCIe 5.0 (~32 GB/s). This limits single-user throughput to ~10-21 tok/s.

---

### DeepSeek V3 (671B / 37B active) — SWE-bench ~50%, LiveCodeBench 49.2%

Source: [gigagpu.com](https://gigagpu.com/deepseek-v3-performance-report-april-2026/)

| Hardware | Quant | Tok/s (single user) | Tok/s (batch serving) | Context | Notes |
|----------|-------|--------------------|----------------------|---------|-------|
| **1× RTX 5090** (expert offload) | Q4 | **~5-10 tok/s** | **38 tok/s** @ 10 users | 32K | GigaGPU batch serving number |
| **2× RTX 5090** (TP) | FP16 active | **~15 tok/s** | **72 tok/s** @ 10 users | 128K | 2× cards = experts fit in VRAM |
| **4× RTX 5090** (TP) | FP16 active | **~25 tok/s** | **130 tok/s** @ 10 users | 256K | ~86% scaling |
| **M3 Ultra 512GB** (MLX) | Q4 | **~20 tok/s** | — | 128K | Fits entirely in 512GB |
| **M3 Ultra 512GB** (llama.cpp) | Q4 | **~6 tok/s** | — | 128K | Avoid — MLX is 3× faster |
| 1× RTX 4090 | Q4 | ~2-5 tok/s | — | 16K | Heavy offload, barely usable |

**⚠️ Important:** The 38 tok/s figure is **batch serving** (10 concurrent users), not single-user. For single user on 1× RTX 5090 with expert offloading, expect **5-10 tok/s**. The 2× and 4× configs use FP16 for active experts, Q4 for inactive — enabling them to keep all experts in combined VRAM without CPU swapping.

---

### DeepSeek V3.2 (685B / 37B active) — SWE-bench 73.1%, LiveCodeBench 83.3%

| Hardware | Quant | Tok/s | Context | Notes |
|----------|-------|-------|---------|-------|
| **M3 Ultra 512GB** (MLX) | Q4 | **~20 tok/s** | 128K | Same architecture as V3 |
| **1× RTX 5090** (expert offload) | Q4 | **~5-10 tok/s** | 32K | Same CPU swap bottleneck as V3 |
| **2× RTX 5090** | Q4 | **~15-20 tok/s** | 128K | Experts fit in combined VRAM |
| **4× RTX 5090** | Q4 | **~30 tok/s** | 128K | |

---

### DeepSeek V4 Pro Max (1.6T / 49B active) — SWE-bench 80.6%, LiveCodeBench 93.5%

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| M3 Ultra 512GB | Q4 | ❌ | — | 1.6T × 0.5 = **800GB** — doesn't fit |
| M3 Ultra 512GB | Q2 (2.5-bit) | ~15 tok/s | 128K | 1.6T × 0.3125 = **500GB** — barely fits, degraded quality |
| 1× RTX 5090 | — | ❌ | — | Doesn't fit at any quant |
| 4× RTX 5090 (128GB) | — | ❌ | — | Doesn't fit (800GB > 128GB) |
| 8× RTX 5090 (256GB) | — | ❌ | — | Doesn't fit (800GB > 256GB) |
| **16× RTX 5090 (512GB)** | Q4 | **~60-80 tok/s** | 1M | Fits! Cost: ~$48,000 |
| **32× RTX 5090 (1TB)** | Q4 | **~120-150 tok/s** | 1M+ | Comfortable. Cost: ~$96,000 |

**Bottom line:** DeepSeek V4 Pro Max needs 800GB+ at Q4. A single Mac 512GB can't run it. You need 16-32 RTX 5090s or use heavy Q2 quantization with quality loss.

---

### MiniMax M2.5 (230B / 10B active) — SWE-bench 75.8% (official) / 80.2% (vendor)

Source: [MiniMax official](https://www.minimax.io/blog/minimax-m25), 230B total / 10B active MoE

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| **1× RTX 5090** | Q4 | **~40-60 tok/s** | 1M | 10B active @ Q4 = ~5 GB; fits entirely |
| **M3 Ultra 512GB** | Q4 | **~30-40 tok/s** | 1M | Full 230B at Q4 = 115GB; fits |

---

### Qwen3.6-27B (28B / 27B dense) — SWE-bench 77.2%, LiveCodeBench 83.9%

| Hardware | Quant | Tok/s | Max Context |
|----------|-------|-------|-------------|
| **1× RTX 5090** | Q4 | **~50-70 tok/s** | 262K |
| **M3 Ultra 512GB** | Q4 | **~35 tok/s** | 262K |

---

### Gemma 4 26B-A4B (25B / 4B active MoE, Apache 2.0) — LiveCodeBench 77.1%

| Hardware | Quant | Tok/s | Max Context |
|----------|-------|-------|-------------|
| **1× RTX 5090** | Q4 | **~200 tok/s** | 262K |
| **M3 Ultra 512GB** | Q4 | **~50 tok/s** | 262K |

---

### North Mini Code (30B / 3B dense) — SWE-bench 67.6%, Free

| Hardware | Quant | Tok/s | Max Context |
|----------|-------|-------|-------------|
| **1× RTX 5090** | Q4 | **~400 tok/s** | 256K |
| **Any 4GB+ GPU** | Q4 | 100-300 tok/s | 128K |

---

### Hy3 (295B / 21B active MoE) — SWE-bench 78.0%, Free

| Hardware | Quant | Tok/s | Max Context |
|----------|-------|-------|-------------|
| **M3 Ultra 512GB** | Q4 | **~30 tok/s** | 256K |
| **1× RTX 5090** (expert offload) | Q4 | **~8-12 tok/s** | 128K |

---

### Nemotron 3 Ultra (550B / 55B active) — SWE-bench 71.9%, LiveCodeBench 89.0%

| Hardware | Quant | Tok/s | Max Context |
|----------|-------|-------|-------------|
| **M3 Ultra 512GB** | Q4 | **~14 tok/s** | 128K |
| 1× RTX 5090 (expert offload) | Q4 | **~5-8 tok/s** | 32K |

---

### LongCat-2.0 (1.6T / ~48B active — SWE-bench Pro 59.5%, Terminal-Bench 70.8%)

First trillion-parameter model trained without Nvidia hardware (50K+ domestic Chinese ASICs). Ran anonymously as "Owl Alpha" on OpenRouter. MIT license, weights on HuggingFace July 5, 2026.

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| **2× Mac M3 Ultra** (1TB) | Q4 | **~15-25 tok/s** | 1M | ~800 GB @ Q4 — fits in 1TB unified |
| 1× Mac M3 Ultra (512GB) | Q3 | **~10-15 tok/s** | 1M | ~600 GB @ Q3 — barely fits, degraded quality |
| 1× RTX 5090 | — | ❌ | — | Doesn't fit at any quant |
| 16× RTX 5090 | Q4 | **~40-60 tok/s** | 1M | Fits in 512GB |

**Notes:** No llama.cpp support confirmed yet — requires Transformers + vLLM/SGLang. Same hardware footprint as DeepSeek V4 Pro Max.

---

### Laguna S 2.1 (118B / 8B active) — Poolside 🆕

Released July 21, 2026. 118B MoE with 256 experts, 8B active per token, 1M ctx. OpenMDW-1.1 license (commercial use OK). OpenRouter pricing: $0.10/$0.20 per 1M tokens. SWE-bench Pro 59.4%, Terminal-Bench 2.1 70.2%. Self-hosts on a single DGX Spark.

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| **DGX Spark** (128GB unified) | Q4 | **~30-50 tok/s** | 1M | ~59 GB @ Q4 — fits comfortably |
| **2× RTX 5090** (64 GB) | Q4 | **~50-80 tok/s** | 1M | PCIe 5.0 x16 scales ~80% |
| **1× RTX Pro 6000** (96 GB) | Q4 | **~40-60 tok/s** | 1M | Single GPU, no intercon overhead |
| **1× Mac M3 Ultra** (256 GB) | Q4 | **~20-40 tok/s** | 1M | MLX — efficient MoE support |

**Notes:** Only 8B active params makes inference fast despite 118B total. vLLM and SGLang support day one. DFlash speculative decoding available (~2× speedup). Strongest open-weight US coding model in its size class.

---

### Leanstral 1.5 (119B / 6.5B active) — Mistral AI 🆕

Released July 2, 2026. Apache 2.0. Specialized for **Lean 4 formal proof engineering and code verification** — not a general coding assistant. 119B MoE with 128 experts (4 active), 256K context. Free API from Mistral.

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| **1× RTX Pro 6000** (96 GB) | Q4 | **~40-70 tok/s** | 256K | ~60 GB @ Q4 — fits comfortably |
| **2× RTX 5090** (64 GB) | Q4 | **~50-80 tok/s** | 256K | PCIe 5.0. Tight fit — ~60 GB |
| **1× Mac M3 Ultra** (128 GB) | Q4 | **~20-40 tok/s** | 256K | MLX support likely |

**Benchmarks:** miniF2F 100%, PutnamBench 587/672, FATE-H 87%, FATE-X 34%, FLTEval pass@8 43.2. Found **5 previously unknown bugs** across 57 OSS repos via Rust→Lean verification pipeline. Not evaluated on SWE-bench or HumanEval — completely different domain.

---

### MiMo-V2.5-Pro (1.02T / 42B active) — SWE-bench 78.9%

| Hardware | Quant | Tok/s | Max Context | Notes |
|----------|-------|-------|-------------|-------|
| M3 Ultra 512GB | Q4 | **~10 tok/s** | 128K | 510GB @ Q4 — barely fits |
| 1× RTX 5090 | — | ❌ | — | Doesn't fit |
| 16× RTX 5090 | Q4 | **~60 tok/s** | 256K | Fits in 512GB |

---

## Context Window Limits by Hardware

### KV Cache Size (FP16)

| Active Params | 32K ctx | 128K ctx | 262K ctx | 1M ctx |
|--------------|---------|----------|----------|--------|
| 3B MoE (MLA) | ~0.08 GB | ~0.3 GB | ~0.7 GB | ~2.6 GB |
| 10B MoE (GQA) | ~0.8 GB | ~3.4 GB | ~6.9 GB | ~26 GB |
| 13B MoE (MLA) | ~0.1 GB | ~0.4 GB | ~0.8 GB | ~3.0 GB |
| 27B dense (GQA) | ~1.5 GB | ~6.0 GB | ~12.3 GB | ~47 GB |
| 37B MoE (GQA) | ~2.1 GB | ~8.4 GB | ~17.2 GB | ~66 GB |

**DeepSeek V3/V4 MLA** advantage: 1M context = **~10 GB** KV cache vs ~170 GB with standard GQA.

### Max Context by Hardware (Q4 weights, FP16 KV cache)

| Model | Mac 512GB | 1× Pro 6000 | 1× 5090 | Notes |
|-------|----------|:-----------:|:-------:|-------|
| DeepSeek V4 Flash Max (284B) | **1M** ✅ | **1M** ✅ (Q2_K) | **1M** ✅ (Q2_K) | MLA = tiny KV cache |
| DeepSeek V3.x (685B) | **128K** ✅ | ❌ doesn't fit | **32K** ⚠️ (offload) | |
| DeepSeek V4 Pro Max (1.6T) | ❌ doesn't fit | ❌ | ❌ | Needs 800GB+ |
| Mistral Medium 3.5 (128B) | **256K** ✅ | **256K** ✅ | ❌ doesn't fit | **Best Pro 6000 fit** |
| Step-3.5-Flash (196B) | **66K** ✅ | ⚠️ tight (98GB vs 96GB) | ❌ | 2GB over budget |
| Qwen3.6-35B-A3B (35B) | **262K** ✅ | **262K** ✅ | **262K** ✅ (Q4) | Gated DeltaNet = efficient |
| MiniMax M2.5 (230B) | **1M** ✅ | ❌ doesn't fit | **1M** ✅ | Lightning Attention |
| Qwen3.6-27B (27B) | **262K** ✅ | **262K** ✅ | **262K** ✅ | Dense model |
| Gemma 4 26B-A4B (25B) | **262K** ✅ | **262K** ✅ | **262K** ✅ | |

---

## Reasoning Benchmarks (MATH, AIME, ARC-AGI)

Key reasoning benchmarks for coding-relevant models. Scores vary by evaluation methodology.

| Model | MATH | AIME 2026 | ARC-AGI-2 |
|-------|------|-----------|-----------|
| Claude Mythos 5 | USAMO 2026: 99.8% | — | — |
| **A.X K2** 🆕 | — | **97.1%** | — |
| GPT-5.5 | ~85% | **98.3%** | 85.0% |
| Claude Opus 4.8 | 66.9% | 95.7% | 81% |
| DeepSeek V4 Pro Max | 84.1% | 94.6% | 68.5% |
| Gemini 3.5 Flash | MATH-500: 96.8% | 93.3% | 72.1% |
| Gemini 3.1 Pro | 85.3% | **98.2%** | 77.1% |
| Grok 4 | 96.9% | — | 72.8% |
| Kimi K2.6 | 72.3% | 96.4% | — |
| Qwen3.6-27B | — | 94.1% | — |
| Qwen3.5-397B | — | 91.3% | — |
| Llama 4 Maverick | 78.4% | — | — |
| DeepSeek V4 Flash Max | 57.4% | — | — |

**Note:** ARC-AGI-3 (the new frontier) has no model above 8% as of July 2026.

---

## Licensing Matrix for Open-Weight Models

Commercial use clarity for all open-weight entries in the CSV.

| License | Models | Commercial Use | Attribution Required | Notes |
|---------|--------|---------------|---------------------|-------|
| **Apache 2.0** ✅ | Inkling 🆕, Qwen3.6-27B, Qwen3-Coder-Next, Gemma 4, North Mini Code 1.0, GLM-5, ERNIE 4.5, SenseNova-U1 | ✅ Yes | ✅ Required | Safest for commercial |
| **MIT** | LongCat-2.0 🆕, DeepSeek V4 Flash Max, DeepSeek V4 Pro Max, DeepSeek V3.x, GLM-4.x/5.x series | ✅ Yes | ✅ Required | Permissive, no patent grant |
| **Modified MIT** | MiniMax M2.5, MiniMax M3, Kimi K2/K2.5, Kimi K2.7 Code | ⚠️ Check terms | ✅ Required | Often adds usage restrictions |
| **Open weight (custom)** | MiMo-V2.5-Pro, K-EXAONE, LongCat | ⚠️ Varies | Varies | Must review per-model |
| **MNPL-0.1** | Codestral 22B | ❌ No (production) | ✅ Required | Mistral Non-Production |
| **BigCode OpenRAIL-M** | StarCoder 3 | ⚠️ Restricted | ✅ Required | Prohibits harmful use |
| **CC-BY-NC** | Cohere Command R / R+ | ❌ No (commercial) | ✅ Required | Research only |
| **Proprietary** | AFM 3 (Apple), SPARK X2 | ❌ No | N/A | API only |

**Key takeaway:** Apache 2.0 and MIT are the safest bets. Always check the specific model card for latest terms.

---

## Summary: Recommended for Local Coding AI

### Speed vs Quality — The Real Landscape

```
~183 tok/s ─ Qwen3.6-35B-A3B on 1× 5090 (73% SWE, 18GB @ Q4) ✅ FITS
                  ↓
~100 tok/s ─ Qwen3.6-27B on 1× 5090 (77% SWE, 14GB @ Q4) ✅ FITS
                  ↓
 ~50 tok/s ─ MiniMax M2.5 on 4× 5090 (75.8% SWE, 115GB @ Q4) 🟡 OFFLOAD
                  ↓
 ~25 tok/s ─ DeepSeek V4 Flash Max on M3 Ultra (79% SWE, 142GB) ✅ FITS
                  ↓
 ~20 tok/s ─ DeepSeek V3 on M3 Ultra (73% SWE, 342GB) ✅ FITS
                  ↓
 ~15 tok/s ─ MiniMax M3 on 8× 5090 (80.5% SWE, 214GB @ Q4) 🟡 OFFLOAD
                  ↓
 ~10 tok/s ─ DeepSeek V4 Pro Max on 2× Mac (80.6% SWE, 800GB) ✅ FITS
                  ↓
 ~15-25 tok/s ─ LongCat-2.0 on 2× Mac (59.5% SWE-Pro, 800GB) ✅ FITS
                  ↓
    ? tok/s ─ Inkling on datacenter (77.6% SWE, 488GB) ❌ no single-GPU
```

### Qwen3-Coder Series (Apache 2.0) — Purpose-Built for Coding

| Model | Total/Active | SWE-bench | Full Q4 | Fits | Context |
|-------|-------------|-----------|---------|------|---------|
| **Qwen3-Coder-Next** | 80B / **3B** | **70.6%** | **40 GB** | 2×5090 / 1× Mac | 256K |
| **Qwen3-Coder-480B-A35B** | 480B / 35B | 68.4% | **240 GB** | 1× Mac | 256K |
| **Qwen3-Coder-30B-A3B** | 30B / **3B** | — | **15 GB** | **1× 5090** ✅ | 256K |

Qwen3-Coder-Next is notable: **70.6% SWE-bench with only 3B active params**, but needs **40GB @ Q4** total — does NOT fit a single 5090. Purpose-trained on agentic coding via RL in 20K parallel environments.

### Final Recommendations

| Use Case | Best Model | Hardware | Full Q4 | SWE-bench | License | Est. Cost |
|----------|-----------|----------|---------|-----------|---------|-----------|
| **Best single-GPU quality** | **Qwen3.6-27B** ⭐ | 1× RTX 5090 | **14 GB** ✅ | **77.2%** | Apache 2.0 | ~$3,000 |
| **Fastest single-GPU** | **Qwen3.6-35B-A3B** | 1× RTX 5090 | **18 GB** ✅ | 73.4% | Apache 2.0 | ~$3,000 |
| **Best coding agent single-GPU** | **North Mini Code 1.0** | 1× RTX 5090 | **15 GB** ✅ | **67.6%** | Apache 2.0 | ~$3,000 |
| **Best Apache 2.0 single-GPU dense** | **Devstral Small 2** 🆕 | 1× RTX 5090 | **12 GB** ✅ | **68.0%** | **Apache 2.0** | ~$3,000 |
| **Budget single-GPU** | Qwen3.6-35B-A3B | 1× RTX 4090 used | 18 GB ✅ | 73.4% | Apache 2.0 | ~$1,600 |
| **Best single-GPU quality (96GB card)** | Mistral Medium 3.5 | 1× RTX Pro 6000 | **64 GB** ✅ | **77.6%** | Open weight | ~₹14L |
| **Best Pro 6000 dense coding** | **Devstral 2** 🆕 | 1× RTX Pro 6000 | **62 GB** ✅ | **72.2%** | **Modified MIT** | ~₹14L |
| **Best quality 4-GPU cluster** | MiniMax M2.5 | 4× RTX 5090 | 115 GB | **75.8%** | Modified MIT | ~$12,000 |
| **Best quality 8-GPU cluster** | MiniMax M3 | 8× RTX 5090 | 214 GB | **80.5%** | Open weight | ~$24,000 |
| **Best quality single Mac** | MiniMax M3 | M3 Ultra 512GB | 214 GB | **80.5%** | Open weight | ~$8k US / ~₹12L IN |
| **Best Mac + 1M ctx** | DeepSeek V4 Flash Max | M3 Ultra 512GB | 142 GB | **79.0%** | MIT | ~$8k US / ~₹12L IN |
| **Best open-weight SWE-bench (self-reported)** | **Inkling** 🆕 | Datacenter / 1× Mac tight | 488 GB | **77.6%** | **Apache 2.0** | $10k+ |
| **Best dual Mac cluster** | **DeepSeek V4 Pro Max** | 2× M3 Ultra | 800 GB | **80.6%** | Open weight | ~$16k US / ~₹24L IN |
| **First Nvidia-free 1T model** | **LongCat-2.0** 🆕 | 2× Mac | ~800 GB | 59.5% (Pro) | **MIT** | ~$16k US / ~₹24L IN |
| **Apache 2.0 quality pick** | **Qwen3.6-27B** | 1× RTX 5090 | 14 GB ✅ | **77.2%** | **Apache 2.0** | ~$3,000 |

### The TL;DR (corrected for full model Q4, all scores vendor-reported)
- **Best open-weight SWE-bench (self-reported, all equal caveat):** Inkling (488GB ✅, 77.6% SWE, Apache 2.0) — needs datacenter or 1× Mac; Qwen3.6-27B (14GB, 77.2%) gives near-parity on single GPU
- **Single 5090 best quality:** Qwen3.6-27B (14GB ✅, 77.2% SWE, Apache 2.0)
- **Single 5090 fastest:** Qwen3.6-35B-A3B (18GB ✅, 73.4% SWE, 183 tok/s)
- **Single 5090 coding agent:** North Mini Code 1.0 (15GB ✅, 67.6% SWE, Apache 2.0)
- **Single RTX Pro 6000 best:** Mistral Medium 3.5 (64GB ✅, 77.6% SWE, no offload) — 96GB card at ~₹14L
- **Single Mac best quality:** MiniMax M3 (214GB, 80.5% SWE) or DeepSeek V4 Flash Max (142GB, 79% SWE, 1M ctx)
- **Dual Mac ultimate:** DeepSeek V4 Pro Max (800GB, 80.6% SWE, 93.5% LCB) or LongCat-2.0 (800GB, MIT)
- **MoE gotcha:** Active params are misleading — Qwen3-Coder-Next is 3B active but **40GB total** @ Q4 (doesn't fit single 5090)
- **No model ≥78% SWE fits a single 5090** — all need CPU offload or multi-GPU (Inkling needs ~2TB VRAM)
- **500+ tok/s is a myth** — real max ~240 tok/s with MTP, ~180 tok/s standard

---

---

## Appendix: Missing AI Models — Expanded Gap Analysis

**Current Coverage:** 227 models *(after dedup)* | **Estimated Gap:** ~100-180 models | **Completeness:** ~55-65%  
**60 models are placeholders** with no benchmark scores — listed as "pending" at bottom of CSV.

### Benchmark Coverage (Current CSV, 227 models)

| Benchmark | Models with Scores | Coverage |
|-----------|-------------------|----------|
| **SWE-bench Verified** | 60 | 26% |
| **LiveCodeBench V6** | 109 | 48% |
| **Terminal-Bench** | 29 | 13% |
| **SWE-bench Pro** | 13 | 6% ⚠️ |
| **MATH** | 12 | 5% ⚠️ |
| **AIME 2026** | 12 | 5% ⚠️ |
| **ARC-AGI-2** | 10 | 4% ⚠️ |
| **HLE** | 8 | 4% ⚠️ |
| **MMLU-Pro** | 11 | 5% ⚠️ |
| **GPQA Diamond** | 14 | 6% ⚠️ |
| **Any score** | 167 | 74% |
| **Completely empty** | 60 | 26% |

### Chinese Tech Giants — Severely Underrepresented

| Company | Listed | Still Missing |
|---------|--------|---------------|
| **Baidu** | ERNIE 4.5, ERNIE 4.5-A3B | ERNIE 4.0, ERNIE Speed, ERNIE 5.0 (no scores exist) |
| **iFlytek** | SPARK X2 (no scores) | SPARK X1/X3, iFlyEagle core (no scores exist) |
| **SenseTime** | SenseNova-U1-8B-MoT (no scores) | SenseNova 1-4, SenseChat (no scores exist) |
| **Kuaishou** | — | Kuaishou Kling LLM, K-Model series |
| **NetEase** | — | NetEase Youdao AI, NetEase LLM |
| **Bilibili** | — | Bilibili AI Assistant |
| **Meituan** | LongCat-Flash-Thinking ×2 | Meituan Core LLM, Logistics AI |

### Open-Source Code Ecosystems — Major Gap

| Ecosystem | Listed | Still Missing |
|-----------|--------|---------------|
| **BigCode** | StarCoder 3, StarCoder2-15B, StarCoder1-15B | CodeGen 1/2, SantaCoder, UniXcoder, Incoder, PolyCoder |
| **Meta CodeLlama** | CodeLlama-70B/34B/13B/7B-Instruct | CodeLlama-Python, CodeLlama-Base variants |
| **Meta Llama** | Llama 4 Maverick, Nemotron variants | Llama 2/3 base, Llama 4 standard/Scout |
| **Mixtral** | — | Mixtral 8×7B, 8×22B (no coding benchmarks) |

### High-Profile Missing Startups & Research

| Company | Missing Models | Reason to Add |
|---------|---------------|---------------|
| **Reka AI** | Core, Flash, Edge | $100M+ funding; ex-Google researchers |
| **01.AI** | Yi-Coder-9B/1.5B ✅ *(added)* | Yi-Lightning, Yi-Large still missing |
| **Together AI** | RedPajama variants | Only hosting platform; own models outdated |
| **Inflection AI** | Inflection 2/2.5, Pi | Strong 2024 models |
| **Stability AI** | StableLM 3B/7B/Turbo | Pioneer of generative AI |
| **Cerebras** | Cerebras-GPT | Custom wafer-scale chip |

### Regional Gaps — Geographic Blind Spots

| Region | Status | Missing |
|--------|--------|---------|
| **Japan** | 0 models | Rakuten, NTT, Fujitsu, Sony AI |
| **South Korea** | **3 models** (K-EXAONE-236B, K-EXAONE 2.0, **A.X K2** 🆕) | Samsung, Kakao, Naver |
| **India** | 0 models | Fractal AI, TCS, Infosys, IIT models |
| **Europe** | Mistral only | Aleph Alpha (Germany), UK/DeepMind, ETH Zurich |
| **Middle East** | 0 models | Saudi PIF, UAE AI projects |
| **LATAM** | 0 models | No Latin American LLMs tracked |
| **Africa** | 0 models | No African AI models tracked |

### IDE/Platform Backend Models — Zero Coverage

- GitHub Copilot backend (proprietary)
- JetBrains AI Assistant backend
- AWS CodeWhisperer backend
- Google Cloud Code Assist backend
- Visual Studio IntelliCode backend

### Recently Added Models (July 22, 2026 Update)

| Model | Key Scores | Why Notable |
|-------|-----------|-------------|
| **Qwen3.8-Max-Preview** 🆕 | No benchmarks yet | 2.4T MoE, ~984K ctx, open weights promised |
| **Gemini 3.6 Flash** | 58.7% SWE-bench Pro | Google's fastest model; 304 tok/s, 1M ctx |
| **Kimi K2.7 Code** | 58.6% SWE-bench Pro (vendor) | 1T/32B open-weight, Modified MIT, 256K ctx |
| **o3** (OpenAI) | 71.7% SWE-bench, 85.5% LCB, 96.7% AIME | Major reasoning model; 200K ctx |
| **StarCoder2-15B** | 18.3% SWE-bench, 46.3% HumanEval | Open-source, OpenRAIL-M |
| **StarCoder1-15B** | 33.6% HumanEval | Original BigCode model |
| **Yi-Coder-9B** | 23.4% LCB, 85.4% HumanEval | Apache 2.0, 128K ctx, small |
| **Yi-Coder-1.5B** | 67.7% HumanEval | Apache 2.0, tiny footprint |
| **CodeLlama-70B/34B/13B/7B-Instruct** | 67.8/48.8/42.7/34.8% HumanEval | Legacy but widely deployed |
| **ERNIE 4.5-21B-A3B** | — | Apache 2.0, 3B active, 128K ctx |

**Also added:** MATH/AIME/ARC-AGI-2 columns with scores for 13/11/10 models respectively.

### Total Missing Models by Category

| Category | Est. Missing | Priority |
|----------|-------------|----------|
| Chinese tech giants (Baidu, iFlytek, NetEase, Kuaishou) | 20-30 | 🔴 HIGH |
| Open-source code ecosystems (CodeGen, UniXcoder) | 10-15 | 🔴 HIGH |
| Reasoning models (o3 full, Claude Thinking, Gemini Thinking) | 8-12 | 🔴 HIGH |
| Multimodal code (GPT-4V, Claude Vision, LLaVA-Code) | 6-10 | 🟠 MEDIUM |
| Research institution (Stanford, MIT, Berkeley) | 5-10 | 🟠 MEDIUM |
| Regional gaps (Japan, Korea, India, Europe, ME, LATAM, Africa) | 15-25 | 🟠 MEDIUM |
| IDE/Platform backends (GitHub, JetBrains, VS Code) | 8-12 | 🟡 LOW |
| Startup models (Reka, Inflection, Together) | 10-15 | 🟠 MEDIUM |
| Legacy versions (Llama 2, older Codex, GPT-3.5) | 20-30 | 🟡 LOW |
| Proprietary variants | 15-20 | 🟠 MEDIUM |
| **TOTAL** | **~100-180** | |

### Pending Models (55 without benchmarks)

These models are listed in the CSV but have no benchmark scores. Many are unreleased/preview variants, legacy versions, or models where no public coding benchmark data exists. They should be tested before being considered "ranked."

**Notable pending models:** GPT-4.1, o3-mini, Claude 3.5 Sonnet, Grok 4.5/4.3, SPARK X2, Qwen3 Coder Plus, Qwen3.8-Max-Preview, Llama 4 Scout, GPT-5.x Codex variants, Ornith series, Claude 4.x series, **DeepSWE-Preview** (32B, Apache 2.0, 42.2% SWE-bench, RL-trained coding agent), **SWE-Swiss-32B** (32B, Apache 2.0, 60.2% SWE-bench) — added as pending rows. *Inkling-Small removed from pending: weights released Jul 30, 2026 (Apache 2.0), now scored 80.2% SWE-bench Verified.*

> **Post-session releases (after Aug 9, 2026):**
> - **Grok 4.6** (Aug 12): Same $2/$6 pricing, 500K context, AA Intelligence Index 61 (ties Sol). Cached input $0.50/M. Current xAI flagship.
> - **DeepSeek V4-Flash-0731** (Jul 31): Re-post-trained, major agent benchmark gains. API ID `deepseek-v4-flash` now serves 0731. Pricing unchanged ($0.14/$0.28).
> - **Muse Spark 1.2** (**Aug 5**, not ~Aug 10): Same $1.25/$4.25 pricing. AA Index 54 (57 xhigh), TB2.1 78%→80% independent (82.9% Meta-reported, unverified). New **muse-spark-1.2-contributor** tier at $0.10/$0.20 (12–21× discount) in exchange for permission to train on your prompts. Released with **Muse Code** terminal agent. No open weights.
> - **Muse Glimmer 30B** (Aug 10): 30B open-weight (Apache 2.0) distilled from Spark. No AA Index yet. Trades wins with Qwen3.6 27B, beats it on tool use. **The only open-weight Meta model below frontier size — worth adding to the local model list (~15 GB Q4, fits any 24 GB GPU).** See §Muse Glimmer 30B.
> - **Gemini 3.7 Flash** (Aug 13): $0.75/$3.75 intro to Dec 31 → $1.50/$7.50; AA Index 56; DeepSWE 49.0%→65.3%; 340.1 tok/s (fastest on AA); 1M ctx. 3.6 Flash cut to same intro rate. Closed/API only.
> - **Muse Spark open weights** promised "soon" by Meta.
> - **Qwen3.8-27B** (Aug 14), **DeepSeek V4 Pro 0813** (Aug 13), **Nemotron 3.5 Lightning** (Aug 11), **Ling 3.0 Tiny** (Aug 6): see the Aug 10-15 section at the top of this doc.
> - **GLM-5.3** (Aug 14): 743B/40B, same base as 5.2, post-training only; TB2.1 88.2, AutomationBench 48.2, CyberGym 84.5; API/Coding Plan live, open weights promised ~2 wks (safety-gated). See Aug 10-15 section.

## Is a Multi-5090 Cluster Worth It vs Qwen3.6-27B?

Qwen3.6-27B on a single RTX 5090 gives 77.2% SWE-bench, 83.9% LCB, ~50-70 tok/s for ~$2k. Here's what bigger clusters actually buy you:

### What fits in a 15×5090 cluster (480GB total VRAM) at Q4

| Model | SWE-bench | LCB | Full Q4 | GPUs needed | tok/s (est.) | vs Qwen3.6-27B |
|-------|-----------|-----|---------|-------------|-------------|----------------|
| Qwen3.6-27B (baseline) | **77.2%** | 83.9% | **14** | **1×5090** | **~50-70** | — |
| Inkling (975B) 🆕 | **77.6%** | — | **488** | ❌ needs more | — | +0.4% SWE (self-reported) |
| MiniMax M3 (428B) | **80.5%** | — | **214** | 8×5090 | ~8-15 | +3.3% SWE |
| DeepSeek V4 Flash Max (284B) | 79.0% | **91.6%** | **142** | 5×5090 | ~10-20 | +1.8% SWE, +7.7% LCB |
| Qwen3.5-397B (397B) | 76.4% | 83.6% | **198** | 7×5090 | ~8-15 | **−0.8%** SWE |
| Nemotron 3 Ultra (550B) | 71.9% | 89.0% | **275** | 9×5090 | ~5-12 | **−5.3%** SWE |
| GLM-4.7 (358B) | 73.8% | 84.9% | **179** | 6×5090 | ~10-18 | −3.4% SWE |

### The bottom line

- **Best self-reported open-weight**: Inkling (77.6%, Apache 2.0) — but needs ~2TB VRAM, doesn't fit 15×5090s; all scores are vendor claims
- **Best quality jump**: MiniMax M3 (80.5%, +3.3%) — costs 8× more GPUs for marginal improvement
- **Best LCB jump**: DeepSeek V4 Flash Max (91.6%, +7.7%) — real coding competition boost, 5× more GPUs
- **Everything else is a downgrade or lateral move** on SWE-bench

### Can you fit DeepSeek V4 Pro Max? No.

DeepSeek V4 Pro Max (1.6T) needs **800GB at Q4** — impossible in 15×5090s (480GB). At Q3 (0.375 GB/param) it needs ~600GB, still doesn't fit. You'd need **32×5090s** (1TB) or **2× Mac Studio** to run it.

### Verdict

Spending $30k+ on a 15×5090 cluster gets you **at most +3.3% SWE-bench** over a $2k single-5090 setup. The cost-to-performance ratio is terrible. Multi-GPU clusters only make sense if you need **throughput** (many concurrent users) or if a model you *must* run (like DeepSeek V4 Pro Max) simply can't fit on one GPU.

**For a single user chasing quality**: wait for better dense models that fit one GPU, or accept that the frontier gains are tiny after Qwen3.6-27B.

### Methodological Notes (corrected)

1. **Every score is vendor self-reported** — there is no independently verified open-weight SWE-bench or SWE-bench Pro score. Inkling's 77.6% is self-reported on a bash-only harness, not independently verified.
2. **Mixed harnesses** (KimiCode vs Claude Code vs Codex vs mini-SWE-agent) reduce cross-model comparability by 10-20 points. The only apples-to-apples data is Scale AI's standardized SWE-bench Pro public set.
3. **SWE-bench Pro has its own issues** — OpenAI's July 2026 audit found ~30% of the 731-task public split may be broken. BenchLM rates it "Current" but with a warning.
4. **LiveCodeBench verification is incomplete** — BenchLM tracks only 6 models as of July 23, 2026. CSV scores for other models (DVF Max 91.6%, DVP Max 93.5%) are unverifiable against this source.
5. **Quantization not actually tested** — VRAM estimates use formula `total_params × 0.5 GB`, not real GGUF/AWQ/GPTQ measurements
6. **Speed benchmarks are theoretical** — real vLLM/TensorRT/ONNX numbers would differ from llama.cpp
7. **Many Tier 1 missing models have NO public benchmark data** — adding them to the CSV requires running benchmarks or accepting empty cells

---

*Source data: `coding_benchmarks_july2026_final.csv` (vendor-reported) & independently fetched from official leaderboards*  
*Benchmarks: patrickgawron.com, zenn.dev (llama.cpp b8870), specpicks.com, gigagpu.com, guruswami-ai/mlx-benchmarks, cnrai/llm-perfbench, DeepSeek official (arXiv 2606.19348), bittide.aicompass.dev*  
*Verified from: swebench.com (SWE-bench Verified), labs.scale.com (SWE-bench Pro), benchlm.ai (LiveCodeBench), deepswe.datacurve.ai (DeepSWE), awesomeagents.ai (Terminal-Bench 2.1), frontierswe.com (FrontierSWE)*

---

## Chat Summary — July 23, 2026: Running Qwen3.6-27B & Kimi K3 Locally/Cloud

### Hardware for Frontier Models (Kimi K3)

| Model | Params | VRAM (Q4) | 1M Ctx KV Cache | Min Hardware | Est. tok/s |
|-------|--------|:---------:|:---------------:|--------------|:----------:|
| Kimi K3 | 2.8T MoE (104B¹ active) | ~1,400 GB | ~104 GB (KDA) | **1× DGX B300** (8×288GB) | ~30-50 |
| DeepSeek V4 Pro Max | 1.6T MoE (49B active) | ~800 GB | ~50 GB | **1× DGX B200** (8×192GB) | ~40-60 |

¹ Kimi K3 active params = **104B** (16 of 896 routed experts + 2 shared experts + always-active stack) per Moonshot model card; weights released Jul 27, 2026 under the **Kimi K3 License** (custom). Earlier docs used 50B (MoE routing estimate) or 32B (shared-expert-only estimate) — 104B is authoritative.

### India Pricing — DGX B300 for K3

| Cost Type | Amount (₹) |
|-----------|:----------:|
| Capex (1× DGX B300 landed) | ₹6-9 Cr |
| Annual Opex (power, cooling, support, staff) | ₹62-114 L |
| 3-year TCO | ₹7.86-12.42 Cr |
| Cloud rental (IndiaAI, 8× B300) | ₹2,808/hr |

### Hardware for Qwen3.6-27B (14 GB Q4, Apache 2.0, 77.2% SWE-bench)

**Fits a single GPU — the best quality-to-hardware value in the list.**

| GPU | VRAM | tok/s (27B Q4) | Used Price (₹) | Best For |
|-----|:----:|:--------------:|:--------------:|----------|
| RTX 3090 | 24GB | ~20-25 | ₹55-75k | Best value, ~16K ctx |
| RTX 4090 | 24GB | ~35-40 | ₹1.2-1.5L | Faster, same VRAM |
| RTX 5090 | 32GB | ~50-70 | ₹2.8-3.5L | Fastest, 32K ctx |
| **RTX Pro 6000 Blackwell** | **96GB** | **~70-90** | **~₹14L** | **Big VRAM; fits 64GB+ models** |
| T4 (cloud) | 16GB | ~8-15 | $0.35-0.60/hr | Tight fit, small ctx |
| L40S (cloud) | 48GB | ~30-40 | ~$2.00/hr | Comfortable |

### Free/Cheapest Cloud Options for Qwen3.6-27B

| Option | Cost | GPU | Hours | Effort to Start |
|--------|:----:|:---:|:-----:|:---------------:|
| **Kaggle** | **Free** | 2× T4 (32GB) | 30 hr/wk | Google account + phone |
| Google Colab | Free | T4 (16GB) | 15-30 hr/wk | Google account only |
| Modal | **$30/mo free** | L40S/A100 | 12-15 hr/mo free | GitHub signup, no card/phone |
| Lightning AI | Free | Up to H200 | 80 hr/mo | Email + phone |
| Vast.ai | ~$0.10/hr | RTX 3090 | Pay/hr | Account, add funds |
| RunPod | ~$0.22/hr | RTX 3090 | Pay/hr | Account, add funds |

### Startup Programs (Free Cloud Credits for Companies)

| Program | Max Credits | Requirements | Best GPU |
|---------|:-----------:|--------------|:--------:|
| MS Founders Hub | **$1k-150k** | Company <7 yr, website, corp email | A100 ($3.40/hr) |
| Google for Startups | **$2k-350k** | Company <5 yr, MVP (start) or VC (scale) | L4 ($0.70/hr) |
| NVIDIA Inception | **$10k** | Company <10 yr, incorporated, one developer | Partner cloud credits |

Stack all three = up to **$510k credits** (~728K hours on L4 = 83 years).

### Key Chat Decisions

- **For 14-15 hrs/day use**: Buy a **used RTX 3090 (₹55-75k)** — pay once, run locally with Ollama. Cheaper than cloud in ~12 months.
- **For occasional use**: Kaggle (free 30 hr/wk) or Modal ($30/mo free credits).
- **For K3 at scale**: DGX B300 via IndiaAI cloud at ₹2,808/hr or buy at ~₹5.5Cr.
- **No free tier can run K3** — needs 1.5TB+ VRAM. Max free GPU is Kaggle 2×T4 (32GB) = 2% of what K3 needs.

---

## Appendix: Comprehensive AI Hardware Pricing in India (July 2026)

All prices in ₹. US$1 = ₹83 (baseline used for this appendix; **canonical rate used across the other docs is ₹95.12 as of Aug 14, 2026** — treat this appendix's ₹83 figures as a documented conservative baseline). Import duties: **BCD 0%** under ITA-1 applies to **discrete GPU/graphics cards** imported as components; **complete server/rack systems** (DGX B300, GB200/GB300/Vera Rubin NVL72) are classified as computing systems and attract **25% BCD + 18% IGST + ~2.5% SWS ≈ 48% effective** — see `dgx_b300_deep_research.md` for the ~48% structure. **IGST 18%** is creditable for GST-registered businesses. India street prices include importer margins, freight, warranty overhead.

Power cost: ₹9/kWh (industrial). Sources: Mercatus GPU Index, tech-insider.org, acecloud.ai, cantech.in, e2enetworks.com, rdp.in, getpc.co.in, Apple India store. All prices indicative, subject to market fluctuation.

### 1. Single-GPU / Workstation (Buy Outright)

| Hardware | VRAM | US Price | India Street | TDP | 5-Yr Power* | tok/s (27B Q4) | Best For |
|---|---|---|---|---|---|---|---|
| RTX 3090 (used) | 24 GB | $700-900 | ₹55-75K | 350W | ₹0.69L | 20-25 | Budget AI, 16K ctx |
| RTX 4090 | 24 GB | $1,600-1,800 | ₹1.2-1.5L | 450W | ₹0.89L | 35-40 | Fast single-user |
| RTX 5090 (budget AIB) | 32 GB | $2,000-2,500 | ₹2.8-3.5L | 575W | ₹1.13L | 50-70 | Best consumer GPU |
| RTX 5090 (premium AIB) | 32 GB | $4,000-4,600 | ₹4.5-7.0L | 575W | ₹1.13L | 50-70 | Overclocked / liquid |
| RTX Pro 6000 BW | 96 GB | $12,000-13,250 | ₹13-14L | 600W | ₹1.18L | 70-90 | 96 GB ECC VRAM |
| H100 SXM5 | 80 GB | $25,000-30,000 | ₹28-35L | 700W | ₹2.76L | — | Enterprise inference |
| H200 SXM | 141 GB | $30,000-55,000 | ₹40-50L | 700W | ₹2.76L | — | 141 GB HBM3e |
| B200 SXM | 192 GB | $35,000-50,000 | ₹45-55L | 1000W | ₹3.94L | — | Blackwell FP4 |
| B300 SXM | 288 GB | $50,000-53,000 | ₹55-65L | 1200W | ₹4.73L | — | 288 GB, reasoning |

\* Consumer GPUs: 12 hrs/day × 365.25 × 5 yr × ₹9/kWh. Datacenter GPUs: 24/7 × PUE 1.4.

† India pricing above is older estimate; Aug 2026 street prices are higher — see [`single_user_india_local_ai.md`](single_user_india_local_ai.md) §9 (e.g., RTX Pro 6000 ≈ ₹40–48L).

### 2. Apple Mac Unified Memory (No Import Duty — Apple India Pricing)

| System | Memory | US Price | India Price | TDP | 5-Yr Power | Models that fit @ Q4 |
|---|---|---|---|---|---|---|
| Mac Studio M3 Ultra | 96 GB | $3,999 | ₹4.3L | 140W | ₹0.28L | Qwen3.6-27B, -35B-A3B |
| Mac Studio M3 Ultra | 256 GB | $6,999 | ₹7.5L | 140W | ₹0.28L | Up to ~500B param |
| Mac Studio M3 Ultra | 512 GB | $11,999 | ₹12L+ | 140W | ₹0.28L | Up to ~1T (Inkling tight) |
| 2× Mac Studio (512 GB) | 1 TB | ~$24,000 | ₹24L | 280W | ₹0.55L | DVP Max, LongCat-2.0 |
| MacBook Pro 16″ M5 Max | 48 GB | $3,999 | ₹4.99L | 80W | ~₹0.2L | Qwen3.8-27B, -35B-A3B |
| MacBook Pro 16″ M5 Max (BTO) | up to 128 GB | ~$5,500 | ~₹6.5–7.5L | 80W | ~₹0.2L | 397B @ Q3, V4 Flash @ 2-bit |

**Note:** Mac includes display, CPU, RAM, storage, cooling in one box — no extra server hardware.

### 3. DGX / HGX 8-GPU Systems (Enterprise, Delivered India)

| System | Total VRAM | US Price | India Landed* | TDP | 5-Yr Power | AMC 5-Yr | **5-Yr TCO (hw+pwr+amc)** | Best For |
|---|---|---|---|---|---|---|---|---|
| DGX H100 | 640 GB | $280-320K | ₹3.0-3.5Cr | 5.6kW | ₹0.31Cr | ₹1.2Cr | **₹4.5-5.0Cr** | Proven Hopper, resale |
| DGX H200 | 1,128 GB | $320-420K | ₹3.5-4.5Cr | 5.6kW | ₹0.31Cr | ₹1.6Cr | **₹5.4-6.4Cr** | 141 GB/GPU |
| DGX B200 | 1,440 GB | $400-515K | ₹4.5-5.5Cr | 8.0kW | ₹0.44Cr | ₹2.0Cr | **₹6.9-7.9Cr** | Blackwell FP4 |
| DGX B300 | 2.1 TB | $300-350K | ₹5.0-6.0Cr | 9.6kW | ₹0.53Cr | ₹2.4Cr | **₹7.9-8.9Cr** | 288 GB/GPU |

\* India landed = CIF + IGST 18% + importer margin + freight. AMC = 8-10% of hardware/yr. H100 has ~50% resale at 36 mo; B200/B300 have no secondary market yet.

### 4. Rack-Scale Systems (NVL72)

| System | GPUs | Total VRAM | US Price | India Landed | Power | 5-Yr Power | Cooling | Staff 5-Yr | **5-Yr TCO** |
|---|---|---|---|---|---|---|---|---|---|
| GB200 NVL72 | 72×B200 | 13.8 TB | $2-3M | ₹22-28Cr | 120kW | ₹8.3Cr | Req. | ₹5Cr | **₹35-41Cr** |
| GB300 NVL72 | 72×B300 | 20 TB | $3-4M | ₹32-42Cr | 170kW | ₹11.7Cr | Req. | ₹5Cr | **₹49-59Cr** |
| Vera Rubin NVL72 | 72×R100 | 20.7 TB | $5-7M | ₹47-65Cr | 200kW | ₹13.8Cr | Req. | ₹5Cr | **₹66-84Cr** |

GB300 NVL72 listed at ₹42 Cr + GST (₹49.6 Cr incl.) by RDP Technologies (Make-in-India OEM), July 2026. Rack infrastructure build (liquid cooling loop, transformers, UPS): ₹5-10Cr extra.

### 5. The Ultimate: All Open-Weight Models Loaded Simultaneously

**Hardware:** Vera Rubin NVL72 (20.7 TB HBM4) — ~₹65Cr landed + ₹5-10Cr infra + ₹2.76Cr/yr power.

| Item | Cost (₹ Cr) |
|---|---|
| Vera Rubin NVL72 landed | ~55-65 |
| Cooling / power infrastructure | ~5-10 |
| Power (1 yr) | ~2.76 |
| Staff (2-3 engineers) | ~0.6-0.8/yr |
| **5-Year TCO** | **~₹75-90 Cr** |

**Practical alternative:** Single DGX B300 (2.1 TB, 8×B300) at ~₹5.5Cr landed fits every open-weight model **one at a time** at FP4. Swap time ~30 sec via NVLink. 5-yr TCO: **~₹10-11Cr** — 1/8th the NVL72 cost, same models.

### 6. Cloud Rental via IndiaAI Mission (Subsidized Rates)

Per IndiaAI GPU tender (4th round, April 2026), empanelled providers:

| GPU | 1× GPU (/hr) | 8× GPU (/hr) | Spot / Lowest |
|---|---|---|---|
| H100 | ₹249 | ₹1,992 | ₹70/hr spot (E2E) |
| H200 | ₹300 | ₹2,400 | ₹88/hr spot (E2E) |
| B200 | ₹291 | ₹2,326 | $2.06/hr spot (Spheron) |
| B300 | ₹351-₹2,808 | — | $2.45/hr spot (Verda) |

**Breakeven vs buy:** 8× H100 at ₹1,992/hr × 24/7 × 365 = ₹1.74Cr/yr. DGX H100 at ₹3.25Cr breaks even in ~1.9yr continuous use. For <50% utilization, renting wins.

### 7. Multi-GPU Workstation Builds (DIY, India Pricing)

| Config | GPUs | VRAM | Total (₹) | TDP | Models @ Q4 |
|---|---|---|---|---|---|
| 1× RTX 5090 | 1 | 32 GB | ~₹3.5L | 575W | Qwen3.6-27B, -35B-A3B, North Mini |
| 2× RTX 5090 | 2 | 64 GB | ~₹7.0L | 1,150W | + Mistral Med 3.5 (64 GB ✅) |
| 4× RTX 5090 | 4 | 128 GB | ~₹14L | 2,300W | + MiniMax M2.5 (115 GB ✅) |
| 8× RTX 5090 | 8 | 256 GB | ~₹28L | 4,600W | + MiniMax M3 (214 GB ✅) |
| 16× RTX 5090 | 16 | 512 GB | ~₹56L | 9,200W | DVP Max still ❌ (needs 800 GB) |
| 32× RTX 5090 | 32 | 1 TB | ~₹1.12Cr | 18.4kW | DVP Max ✅, LongCat ✅ |

**Note:** RTX 5090 lacks NVLink — uses PCIe 5.0 tensor parallelism. Scaling efficiency ~70-80%. For NVLink, need RTX Pro 6000 or SXM datacenter cards. Power at 32-GPU scale needs dedicated 3-phase + cooling.

### 8. Buy vs Rent Decision Matrix

| Scenario | Buy | Rent |
|---|---|---|
| Single dev, <200 hrs/mo | — | ✅ Kaggle free / ₹30/mo Modal |
| Startup, 400-800 hrs/mo | ✅ Used RTX 3090 (payoff ~12 mo) | — |
| Team fine-tuning | ✅ DGX H200 used (~₹2.5Cr) | ✅ IndiaAI ₹300/hr |
| Large training (100+ GPUs) | — | ✅ IndiaAI / hyperscaler |
| K3 production | ✅ DGX B300 (~₹5.5Cr) | ✅ IndiaAI B300 ₹351/hr |
| All models simultaneously | ❌ NVL72 ₹65Cr+ | ❌ not offered |

**Key formulas:**
- **Buy breakeven** = hardware cost ÷ (hourly cloud rate × hrs/mo)
- **Consumer GPU:** buy wins at ~250-300 hrs/mo vs B200 cloud (₹291/hr)
- **DGX:** buy wins at ~500+ hrs/mo vs IndiaAI rates
- **Resale lift:** H100 retains ~50% at 36 mo; B200/B300 have no secondary market

---

*Sources: tech-insider.org (Blackwell pricing, Jul 2026), Mercatus GPU Index (H100/H200/B200 server pricing, Jul 2026), cantech.in (India GPU pricing), acecloud.ai / e2enetworks.com (India cloud rates), rdp.in (GB300 NVL72 India pricing), getpc.co.in (RTX 5090 India pricing), Apple India Store (Mac Studio), IndiaAI Mission 4th round tender (Apr 2026), Spheron Network (B300 pricing, Jul 2026), customs-compliance.ai / rawcompute.in (India import duty structure).*

### 9. All Open-Weight Models on Vera Rubin NVL72

Q4 VRAM summed for every open-weight model in this doc, plus KV cache at max supported context:

| Category | Count | Est. Total Q4 VRAM | KV Cache at Max Ctx |
|---|---|---|---|---|
| Large (>500B params) | ~16 models | ~8,300 GB | ~100 GB (MLA: ~3 GB @ 1M each) |
| Medium (100-500B) | ~17 models | ~3,700 GB | ~500 GB (GQA: 10-66 GB @ 128K each) |
| Small (<100B) | ~53 models | ~750 GB | ~450 GB (GQA: 1-8 GB @ 128K each) |
| **Total** | **~86 models** | **~12,750 GB (~12.5 TB)** | **~1,050 GB (~1 TB)** |

**Vera Rubin NVL72 capacity:** 20.7 TB HBM4. **1 rack fits everything** at Q4 with room for full context windows. ~6.9 TB headroom for future models or higher precision.

| Scenario | VRAM Needed | Rubin NVL72 Racks |
|---|---|---|
| All models @ Q4, max context | ~13.5 TB | **1** |
| All models @ Q4, conservative ctx | ~13.3 TB | **1** |
| All models @ Q8 (no quant) | ~25.0 TB | **2** |
| All models @ Q4 + Kimi K3 @ Q8 | ~12.8 TB | **1** |

**The catch:** No single inference engine today supports hot-swapping ~86 different model architectures on one GPU pool. The hardware fits; the software doesn't exist yet.