# AI Model Cost Per Task — July 2026 Comparison

## Overview

After the July 2026 model releases, the landscape shifted dramatically. This document tracks **cost per coding-agent task** across all major models, based on Artificial Analysis Coding Agent Index token counts and verified provider pricing (as of July 31, 2026).

> **Sep 1, 2026 Update:** GLM-5.3 weights released Aug 27 (not Aug 28). License is HF "other" — Reuters >$10B review gate unconfirmed. Qwen3.8-27B AA Index = 52. MAI-Code-1-Flash is closed-weight API-only. New open-weight candidates added Sep 1: Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, Laguna S 2.1, MiniMax M3, Ornith-1.5-397B, Apodex 1.1-mini, Muse Glimmer (AA 35).

---

## Cost Per Coding-Agent Task Rankings

| Model | Provider | Release Date | Price In/Out per Mtok | Cost per Task | Source | Notes |
|-------|----------|-------------|----------------------|:---------------------|:-------:|-------------|
| **GPT-5.6 Luna** | OpenAI | Jul 9 (cut Jul 30) | **$0.20 / $1.20** | **$0.04** | Hypoth. | 80% price cut makes it the cheapest (token-based estimate, not AA-measured) |
| GPT-5.6 Terra | OpenAI | Jul 9 (cut Jul 30) | $2.00 / $12.00 | $0.44 | Hypoth. | 10x Luna for ~2 points coding composite |
| GPT-5.6 Sol | OpenAI | Jul 9 (cut Aug 21) | **$4.00 / $20.00** | **$7.08** † | AA | Flagship; AA Coding Agent Index #1 (80 vs Fable 5 77.2); Aug 21 promo to $4/$20 through Nov 21, 2026 (was $5/$30); AA ~$1.04/intelligence-task at launch rates |
| **GLM-5.3-Flash** | Z.ai | Aug 26 | **$0.15 / $0.50** | — | — | ex-"Ox Alpha" stealth (6d ~42T tokens on Chinese chips); 320B-A18B MoE, 1M ctx, MIT; AA Index 57 (= Opus 4.8); promo halves to Sep 9; ~306 GiB FP8 |
| **Tencent Hy4 preview** | Tencent | **Aug 28** | **$0.834 / $2.501** | — | — | 770B/49B MoE, 1M+ ctx, Apache 2.0; free 2 wks on WorkBuddy/CodeBuddy; replaces Hy3 295B/21B |
| **GLM-5.3** | Z.ai | Aug 14 (weights Aug 28) | **$1.40 / $4.40** | — | — | 743B/40B, 141 shards ~756 GB, custom >$10B review license; 88.2 TB2.1, 66.9 DeepSWE |
| Grok 4.5 | xAI | Jul 8 | $2.00 / $6.00 | $2.59 | AA | Co-trained on Cursor agent traces |
| Grok 4.20 | xAI | Earlier | $2.00 / $6.00 | ~$2.50 | Hypoth. | Previous gen |
| GPT-5.5 | OpenAI | Apr 2026 | $5.00 / $30.00 | $5.07 | Hypoth. | Now overtaken by 5.6 Luna on value |
| Claude Opus 4.8 | Anthropic | Earlier | $5.00 / $25.00 | ~$8.00 | Hypoth. | Replaced by Opus 5 |
| Claude Opus 5 | Anthropic | Jul 24 | $5.00 / $25.00 | **$8.23** † | AA | Near-Fable-5 intelligence, half price |
| Claude Fable 5 | Anthropic | Jun 9 | $10.00 / $50.00 | **$11.71** † | AA | Highest tier |
| Claude Mythos 5 | Anthropic | Jun 9 | $10.00 / $50.00 | ~$10.00 | Hypoth. | Best, most expensive (repriced Jun 9 from $15/$75) |
| DeepSeek V4 Pro Max | DeepSeek | 2026 | **$0.66/$1.98 off-peak; $1.32/$3.96 peak** (was $0.435/$0.87) | ~$0.90 off-peak | Hypoth. | Peak/off-peak from Aug 16 16:00 UTC (01-04 & 06-10 UTC = peak); cache-hit $0.022/$0.044 |
| Kimi K3 | Moonshot AI | Jul 16 (weights Jul 27) | $3.00 / $15.00 | **$3.18** † | AA | 2.8T/104B, 1M ctx, hybrid KDA+MLA; largest open-weight |
| Muse Spark 1.2 | Meta | Aug 5 | $1.25 / $4.25 | **$1.43** † | AA | 1.1 figure — 1.2 not yet re-measured; 3pt index gain |
| Gemini 3.7 Flash | Google | Aug 13 | $0.75 / $3.75* | — | — | Intro rate to Dec 31, 2026, then $1.50/$7.50 |
| **GPT-6 Astra** | OpenAI | **Sep 3-4** | **$10.00 / $50.00** | ~$1.67 | **1-source** | Flagship; AA Index 61.2 (ties Sol), TB4.0 57.9, OSWorld 2.0 72.6; ~3× more token-efficient than Sol at max effort; cache $1/M (90% off); Fast mode 2× speed @ 2× price. Cost/task est. not AA-measured yet |
| **Claude Fable 5.1** | Anthropic | Sep 1 | **$10.00 / $50.00** | **$11.71** † | **1-source** | Same weights as Fable 5, cache reads cut 75% ($1 → $0.25) |
| **Gemini 3.8 Flash** | Google | Sep 2 | **$0.75 / $3.75** | ~$0.58 | **1-source** | Same intro pricing as 3.7 Flash; AA Index 59 (HIGH) vs 56; TB4.0 19.1%, DeepSWE 73.7 (vendor); ~30% more tokens/task |
| **Muse Spark 1.3** | Meta | Sep 2 | **$1.25 / $4.25** | $1.60 | **1-source** | **AA Index 48 (v4.3 re-score, ⚠️ launch-day 61/62 superseded)**; contributor tier $0.10/$0.20; 236.8 tok/s but very verbose (170M idx tokens); TTFT 26.9s |
| Gemini 3.1 Pro | Google | 2026 | $2.00 / $12.00 | **$2.00** † | AA | Google's flagship |
| Gemini 3 Flash | Google | 2026 | $0.50 / $3.00 | ~$1.00 | Hypoth. | Google's cost leader |

> **Post-Sep-2 frontier entries (single-source flags):** GPT-6 Astra, Claude Fable 5.1, Gemini 3.8 Flash, Muse Spark 1.3 are new (Sep 1-4). Pricing/index figures are **1-source** until Artificial Analysis re-measures them. AA-measured figures already in the table remain: Sol $7.08, Opus 5 $8.23, Fable 5 $11.71, K3 $3.18, Muse Spark 1.2 $1.43. Treat the new cost/task cells as pre-monitored estimates, not AA-verified.

> *Gemini 3.7 Flash pricing is introductory through Dec 31, 2026; standard rate $1.50/$7.50 after. Gemini 3.6 Flash was cut to the same intro rate. For 2027 cost modeling use the standard rate.

> † **AA** = measured by Artificial Analysis Coding Agent Index (real agent-harness runs; reported average ≈885K in + ~88K out tokens). **Hypoth.** = hypothetical token-count estimate (e.g. 200K in + 4K out). These are **not directly comparable** — the AA figures are 2-7x higher because real coding-agent tasks consume far more input tokens. Note the ~885K/~88K token average is an **approximate cross-model average, not a per-model derivation** — it reproduces Sol's measured cost only loosely and does not reproduce Opus 5 ($8.23), Fable 5 ($11.71), K3 ($3.18), Gemini CLI ($2.00), or Grok Build ($2.59); use the AA-measured per-model figure. Raw AA data: `aa_coding.html` (Codex-GPT-5.6 Sol $7.08, Claude Code-Opus 5 $8.23, Claude Code-Fable 5 $11.71, Kimi Code-K3 $3.18, Opencode-Muse Spark 1.1 $1.43, Gemini CLI-3.1 Pro $2.00, Grok Build-4.5 $2.59).

## Key Insights

1. **The spread**: The cheapest model (GPT-5.6 Luna at ~$0.04 per task, hypothetical) is **~293x cheaper** than the most expensive AA-measured (Claude Fable 5 at $11.71; 11.71/0.04 ≈ 293). Note: comparing hypothetical vs AA-measured mixes methodologies — see the table's Source column.

2. **OpenAI's July 30 price cut**: Luna went from $1/$6 to $0.20/$1.20 (80% cut), making it the cheapest capable agent by a wide margin

3. **Terra vs Luna**: Luna is 10x cheaper than Terra, but only ~2% lower in coding composite — Luna is the better value for most use cases

4. **The old flagship is the new mid-range**: GPT-5.5 ($5.07/task) is now more expensive than GPT-5.6 Sol ($1.12/task) for worse performance

5. **Open-weight models are the cheapest**: DeepSeek V4 Pro Max can be self-hosted for $0.50/task equivalent, though raw API endpoints don't include infrastructure costs

## Which Model to Choose by Use Case

| Use Case | Best Model | Cost/Task | Reason |
|----------|-----------|:---------:|--------|
| **Large-scale coding agent** | GPT-5.6 Luna | $0.04 | Maximum value for volume |
| **Hard coding tasks (SWE-bench Pro)** | Claude Opus 5 | $8.23 (AA) | 79.2% Pro, near-Fable-5 at half price |
| **Native Cursor support** | Grok 4.5 | $2.59 (AA) | Co-trained with Cursor on agent traces |
| **Ultra-hard reasoning (max effort)** | GPT-5.6 Sol (Ultra mode) | $7.08 (AA) | 91.91% Terminal-Bench 2.1 |
| **Self-hosted cost savings** | DeepSeek V4 Flash Max | Varies | 142GB at Q4, fits single GPU |
| **Open-source fine-tuning** | Inkling (Apache 2.0) | $3.50+ | 975B/41B MoE, customizable base |
| **Volume, budget-constrained** | GPT-5.6 Luna | $0.04 | 8x cheaper than any competitor |
| **Voice interactions** | GPT-Live-1 (free/paid) | Built into plan | Full-duplex voice for ChatGPT Voice tiers |

## Token Price Updates (July 30-31, 2026)

| Change | Previous | Current | Impact |
|--------|---------|---------|--------|
| GPT-5.6 Luna input/output | $1.00 / $6.00 | **$0.20 / $1.20** | **80% cheaper** |
| GPT-5.6 Terra input/output | $2.50 / $15.00 | **$2.00 / $12.00** | **20% cheaper** |
| Claude Sonnet 5 intro pricing | $3.00 / $15.00 | **$2.00 / $10.00** | Through Aug 31, then revert |

## Artificial Analysis Intelligence Index (July 2026)

| Model | Intelligence Index | Cross-model? | Cost |
|-------|:----:|---|----|
| Claude Fable 5 | 61 | All models | $11.71/task (AA) |
| Claude Opus 5 (max effort) | 60 | All models | $8.23/task (AA) |
| GPT-5.6 Sol (Ultra) | ~57 | All models | $7.08/task (AA) |
| GPT-5.6 Sol (Max) | ~58 | All models | $7.08/task (AA) |
| Gemini 3.7 Flash | **56** | All models | $0.75/$3.75 intro (→$1.50/$7.50) |
| Claude Opus 4.8 | 56 | All models | $8.00/task |
| Muse Spark 1.2 | **54** (57 xhigh) | All models | $1.43/task (1.1 figure) |
| Grok 4.5 | 54 | All models | $2.59/task (AA) |

> **Note on the Coding Agent Index composite:** The current snapshot in `aa_coding.html` shows **Claude Code (Opus 5) at 0.6674** edging **Codex (GPT-5.6 Sol max) at 0.6657** — these ARE the current figures (the 65.5%/65.1% labels in this doc were an error; percentages of an older, rescaled index). Terminal-Bench 2.1 alone favors Sol (89.5% AA independent vs 91.9% vendor); the composite does not. See `aa_coding.html`.

## Source
- Capital & Compute: [New AI Models July 2026](https://capitalandcompute.net/blog/new-ai-models-july-2026/)
- Artificial Analysis: [Coding Agent Index](https://artificialanalysis.ai/)
- OpenAI: [Official API Pricing](https://developers.openai.com/api/docs/pricing)

_Generated July 31, 2026. All prices sourced from provider documentation._

---

## Post-Session Updates (after August 15, 2026)

The following releases/pricing changes occurred after the last update and are **not reflected** in the main tables above (Sol row already updated in-place above):

| Model / Change | Date | Key Changes |
|-------|--------------|-------------|
| **GLM-5.3-Flash** | **Aug 26, 2026** | The official identity of "Ox Alpha" (free stealth model on OpenRouter/OpenCode since Aug 20). 320B-A18B MoE, 1M ctx, first natively multimodal GLM-5 (text/image/video in), **MIT**, weights on HF (`zai-org/GLM-5.3-Flash`), ~306 GiB FP8 ckpt (8-GPU Hopper node min). **$0.15/$0.50** + $0.03 cached; launch promo halves rates to **Sep 9**. AA Intelligence Index **57** (= Claude Opus 4.8) at ~1/50th the output price. Vendor: TB2.1 84.3, DeepSWE 63.4 (vs GLM-5.2 46.2), AutomationBench 48.8. |
| **GPT-5.6 Sol price cut** | Aug 21, 2026 | $5/$30 → **$4/$20** promo through at least **Nov 21, 2026**. Sol is AA Coding Agent Index #1 (80 vs Fable 5 77.2); AA ~$1.04/intelligence-task at launch rates. Terra $2/$12 and Luna $0.20/$1.20 unchanged (Jul 30 cuts). |
| **DeepSeek peak/off-peak billing** | Aug 16, 2026 | V4 Pro: $0.435/$0.87 → **$0.66/$1.98 off-peak, $1.32/$3.96 peak** (peak = 01–04 & 06–10 UTC). A **price increase** — cheapest hour is 2.3× old output rate. V4 Flash: $0.14/$0.28 → $0.11/$0.66 off-peak, $0.22/$1.32 peak. |
| **Claude Sonnet 5** | Aug 2026 | Scheduled Sep 1 rise to $3/$15 **cancelled** — $2/$10 is now the standard price. |
| **Gemini 3.7/3.6 Flash** | confirmed | Intro $0.75/$3.75 doubles to **$1.50/$7.50 on Jan 1, 2027** (cache $0.075 → $0.15). |
| **GLM-5.3 rate card** | ~Aug 21 | $1.40/$4.40 (cached $0.26) — identical to GLM-5.2/5.1. **Weights released Aug 28** (141 shards ~756 GB, custom >$10B review license). |
| **Tencent Hy4 preview** | **Aug 28, 2026** | **770B/49B MoE, 1M+ ctx, Apache 2.0**, preview-first; API $0.834/$2.501; free 2 wks WorkBuddy/CodeBuddy; weights on HF/ModelScope/GitCode/CNB. |
| **IBM Granite 4.2** | **Aug 25, 2026** | **3B/8B/30B dense, 131K→512K, Apache 2.0**, native CoT + agentic RL (tools/code/terminal/web) for 8B/30B. |
| **OpenAI Jalapeño chip** | Aug 25, 2026 | First benchmarks vs GB200/GB300 (InferenceX): 1.5–1.9× throughput/kW, 1.7–3.6× lower latency. 700W/die, 216 GiB HBM4, inference-only, small volumes end-2026 → ramp 2027. Vera Rubin not tested. |
| **Apple M6 / M5 Ultra refresh** | Aug 25, 2026 | Mac mini M6 ($899–$3,199), Mac Studio M5 Max/M5 Ultra ($2,499/$5,499, 1.2 TB/s). No memory ceiling moved (32/64/128/512 GB); bandwidth is a paid upgrade; 512GB Ultra not orderable at launch. Ships Sep 22. |
| New small models | Aug 19–26 | Granite 4.2 8B/3B (IBM), LFM2.5-2.6B (LiquidAI), Agnes 2.5 Pro Beta, G9v3-39A5B (9Stars), DeepSeek V4 Flash Vision — all AA-evaluated. |

## Post-Session Updates (after August 9, 2026)

The following releases occurred after the session cutoff and are **not reflected** in the main tables above:

| Model | Release Date | Key Changes |
|-------|--------------|-------------|
| **Grok 4.6** | Aug 12, 2026 | Same $2/$6 pricing as 4.5, 500K context, AA Intelligence Index 61 (ties GPT-5.6 Sol). Cached input $0.50/M (was $0.30). Current xAI flagship. |
| **DeepSeek V4-Flash-0731** | Jul 31, 2026 | Re-post-trained checkpoint, significant agent benchmark improvements. API ID `deepseek-v4-flash` now silently serves 0731 version. Pricing unchanged at $0.14/$0.28. |
| **Muse Spark 1.2** | **Aug 5, 2026** (not ~Aug 10) | Same $1.25/$4.25 pricing as 1.1. AA Index 54 (57 xhigh), TB2.1 78%→80% independent (82.9% is Meta-reported, unverified). New **muse-spark-1.2-contributor tier at $0.10/$0.20** (12–21× discount) in exchange for permission to train on your prompts. Released with **Muse Code** terminal agent. |
| **Muse Glimmer** | **Aug 10, 2026** | 30B open-weight agentic model (Apache 2.0), distilled from Muse Spark. No AA Index yet. Trades wins with Qwen3.6 27B, beats it on tool use. Only open-weight Meta model below frontier size. |
| **Gemini 3.7 Flash** | **Aug 13, 2026** | **$0.75/$3.75 intro (to Dec 31, 2026), then $1.50/$7.50.** AA Index 56 (3.6 Flash: 52). DeepSWE 49.0%→65.3%, AutomationBench 17%→30.4%. Fastest measured on AA (340.1 tok/s). 1M context. 3.6 Flash cut to same intro rate. New cost-per-task candidate for the tables once AA measures it. |
| **Seed 2.1 Turbo** | Aug 12, 2026 | Half of Seed 2.1 Pro (CNY6/30 ≈ $0.85/$4.15) ≈ **$0.43/$2.07**. No verified benchmarks beyond SciCode 59.8 (vendor) / Code Arena Frontend rank 8. No open weights; not top-10 coding material. |
| **Muse Spark open weights** | Promised "soon" | Meta indicated open-weight release for Muse Spark forthcoming. |

*Source: explainx.ai Grok 4.6 / V4-Flash-0731 / Muse Spark 1.1 guides; mem0.ai Grok API pricing; apidog.com Grok 4.6; codersera.com Grok 4.6; precisionaiacademy.com DeepSeek V4.*