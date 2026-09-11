# GPT-5.6 Family — Complete Model Breakdown

> Launched July 9, 2026 | Prices updated July 30, 2026 | Sol promo price Aug 21, 2026 | Verified & updated Aug 29, 2026

---

## The GPT-5.6 Family

OpenAI launched three tiers of GPT-5.6 on July 9, 2026 after a two-week US government-gated preview starting June 26:

| Metric | **Sol** (Flagship) | **Terra** (Mid) | **Luna** (Budget) |
|--------|:------:|:-----:|:-----:|
| **Input Price / 1M tokens** | **$4.00** (promo; was $5.00) | $2.00 | $0.20 |
| **Output Price / 1M tokens** | **$20.00** (promo; was $30.00) | $12.00 | $1.20 |
| **Input INR / 1M tokens** | ₹380.48 (promo) | ₹190.24 | ₹19.02 |
| **Output INR / 1M tokens** | ₹1902.40 (promo) | ₹1141.44 | ₹114.14 |
| **Cached Input Discount** | 90% ($0.40 promo) | 90% ($0.20) | 90% ($0.02) |
| **Context Window** | 1M | 1.1M | 1.1M |
| **Terminal-Bench 2.1** (Ultra) | **91.91%** (88.0–89.5% independent single-agent) | 82% | 80% |
| **Cost per Coding Task** | **$7.08** (AA) / $1.12 hypoth. | $0.44 | **$0.04** |
| **SWE-bench Pro** | 64.6% (Fable 5 leads 80.3%) | — | — |
| **AA Coding Agent Index** | **#1 (80)** vs Fable 5 77.2, Terra 77.4, Luna 74.6 | 77.4 | 74.6 |

> **Aug 21, 2026 promo:** Sol cut from $5/$30 to **$4/$20**, in effect through at least **Nov 21, 2026** — 33% cheaper output, taking the AA coding-board leader to ~⅓ of Fable 5's per-token cost. AA measured ~$1.04 per intelligence-index task at launch rates (less than half the output tokens of rivals at its level); at promo rates the same spend is ~25% lower. **Ultra mode caveat:** the 91.91% TB2.1 figure is Ultra (4 parallel agents, ~4× tokens) — a single agent scores 88.8% (OpenAI) / 88.0–89.5% (AA independent).

---

## Pricing Timeline

| Date | Event | Details |
|------|-------|---------|
| Jun 26 | US Government Preview | GPT-5.6 gated to US Government for testing |
| Jul 9 | **General Availability** | Sol $5/$30, Terra $2.50/$15, Luna $1/$6 |
| Jul 30 | **Price Cut** | Luna 80% cut to $0.20/$1.20, Terra 20% cut to $2/$12 |
| Aug 21 | **Sol Promo Cut** | Sol $5/$30 → **$4/$20** (through at least Nov 21, 2026) |

---

## Performance Comparison

### Terminal-Bench 2.1 (Coding Agent)

| Model | Score | Cost/Task |
|-------|:-----:|:---------:|
| **GPT-5.6 Sol (Ultra)** | **91.91%** | $1.12 |
| GPT-5.6 Sol (Max) | 88.8% | $1.12 |
| Claude Mythos 5 | 88.0% | $10.00 |
| GPT-5.5 | 83.4% | $5.07 |
| **GPT-5.6 Luna Pro** | **84.7%** | **$0.34** |
| GPT-5.6 Terra | 82% | $0.44 |
| **GPT-5.6 Luna** | **80%** | **$0.04** |
| **GPT-6 Astra** | **57.9%** | **$1.67** |
| **Claude Fable 5.1** | **55.8%** | **$11.71** |

### AIME 2026

| Model | Score | Ranks |
|-------|:-----:|-------|
| **GPT-5.6 Sol (Ultra)** | **98.2%** | #1 |
| Claude Opus 4.8 | 95.7% | #2 |
| Claude Opus 5 | ~96% | #3 |
| **GPT-5.6 Luna** | **88.8%** | Strong |
| **GPT-6 Astra** | ~**84%** | #4 |
| **Claude Fable 5.1** | ~**84%** | #5 |

### SWE-bench Verified

| Model | Score | Harness |
|-------|:-----:|---------|
| Claude Opus 5 | **96.0%** | Anthropic scaffold |
| **GPT-5.6 Sol (Ultra)** | **Unconfirmed** | Codex |
| **GPT-6 Astra** | **Unconfirmed** | Codex |

---

---

## Per-Task Cost Calculation

> **⚠️ Two methods, not interchangeable.** "Hypothetical" figures below assume fixed token counts (e.g. 200K in + 4K out) at pay-per-token prices. Artificial Analysis **measured** real coding-agent runs; their reported average is ~885K in + ~88K out tokens, which only approximately reproduces Sol's measured cost. GPT-5.6 Sol = **$7.08/task**, Fable 5 = $11.71. AA-measured Sol cost is ~6.3x the hypothetical $1.12 because real agent loops consume far more input tokens. Use AA figures when comparing against other AA-benchmarked agents.

Using Artificial Analysis token counts for the Coding Agent Index (early August 2026):

| Task Type | Avg Tokens (Input + Output) | Luna ($0.04) | Terra ($0.44) | Sol ($1.12) | Fable 5 ($11.71) |
|-----------|:-------------:|:------------:|:------------:|:----------:|:----------------:|
| Simple bug fix | ~2K in + ~500 out | <$0.01 | <$0.01 | ~$0.04 | ~$0.50 |
| Medium file change | ~10K in + ~2K out | <$0.01 | ~$0.05 | ~$0.10 | ~$1.50 |
| Feature implementation | ~50K in + ~10K out | ~$0.02 | ~$0.20 | ~$0.50 | ~$5.50 |
| Multi-file refactor | ~200K in + ~4K out | ~$0.04 | ~$0.44 | ~$1.12 | ~$11.71 |
| Complex debugging | ~500K + ~1K out | ~$0.10 | ~$1.00 | ~$2.50 | ~$25.00 |

---

## Use Case Matrix

| Scenario | Recommended | Alternative | Reasoning |
|----------|-----------|-----------|-----------|
| **High-volume code gen** | Luna | Terra | $0.04 vs $0.44 — massive savings at scale |
| **Production CI/CD** | Luna | Terra | Low latency, high throughput |
| **Expert code review** | Terra/Sol | Gemini 3.7 Flash | Terra cheaper than 3.1 Pro; **but 3.7 Flash ($0.75/$3.75 promo) undercuts Terra 2.7-3.2× at higher AA Index 56** |
| **SWE-bench tasks** | Sol (Ultra) | Claude Opus 5 | 91.91% TB 2.1 — best coding agent |
| **Team usage** | Terra | Luna | Better performance when accuracy matters |
| **Hardest problems** | Sol (Max) | Claude Fable 5 | 10x cheaper than Fable 5 |
| **Budget MVP** | Luna | Copilot | $0.04/task — cheaper than most alternatives |

---

## Real-World Value Comparison

### 1000 coding tasks per month:

> Figures use the hypothetical 200K-in/4K-out token profile (Sol $1.12/task at launch $5/$30; ~$0.88/task at the Aug 21 promo $4/$20).

| Model | Monthly Cost | Verdict |
|-------|:------------:|---------|
| GPT-5.6 Luna | **$40** | Best |
| GPT-5.6 Terra | $440 | 11x Luna |
| GPT-5.6 Sol | $1,120 ($880 at promo) | 28x Luna |
| Grok 4.5 | $2,490 | 62x Luna |
| GPT-5.5 | $5,070 | 127x Luna |
| Claude Fable 5 | $11,710 | 293x Luna |

### 1000 coding agents per year:

| Model | Annual Cost | Verdict |
|-------|:-----------:|---------|
| GPT-5.6 Luna | **$480** | Cheapest agent in existence |
| GPT-5.6 Terra | $5,280 | Budget-friendly for enterprise |
| GPT-5.6 Sol | $13,440 | Best for high accuracy |
| Claude Fable 5 | $140,520 | Not for volume |
| Claude Opus 5 | $98,760 | Better value than Fable 5 |

---

## Sources
- Capital & Compute: [GPT-5.6 Sol Tops Coding Leaderboard](https://capitalandcompute.net/blog/gpt-5-6-sol-coding-leaderboard-cost/)
- Capital & Compute: [GPT-5.6 Pricing Deep Dive](https://capitalandcompute.net/blog/gpt-5-6-pricing-cost-per-task/)
- Artificial Analysis: [Coding Agent Index](https://artificialanalysis.ai/)
- OpenAI: [Official API Pricing](https://developers.openai.com/api/docs/pricing)

_Generated July 31, 2026. Pricing at current rates._

---

## Post-Session Updates (after August 15, 2026)

| Release / Change | Date | Key Details |
|---------|------|-------------|
| **GPT-5.6 Sol promo price cut** | **Aug 21** | $5/$30 → **$4/$20**, in effect through at least **Nov 21, 2026**. Sol is AA Coding Agent Index #1 (80 vs Fable 5 77.2); ~⅓ of Fable 5 per-token cost; AA ~$1.04/intelligence-task at launch rates (~$0.78 at promo). Annual 1000-agent table: Sol $13,440 → **$10,560 at promo** (hypoth. token profile). |
| **GLM-5.3-Flash** (new competitor) | **Aug 26** | Z.ai's ex-"Ox Alpha" stealth model: 320B-A18B MoE, 1M ctx, natively multimodal, **MIT**, $0.15/$0.50 (+$0.03 cache; promo halves rates to Sep 9). AA Index **57** = Claude Opus 4.8 at ~1/50th the output price; vendor TB2.1 84.3, DeepSWE 63.4. New value-tier anchor undercutting Terra 13× on output; ~306 GiB FP8 ckpt (8-GPU Hopper node to self-host). |
| **DeepSeek peak/off-peak billing** | Aug 16 | V4 Pro $0.435/$0.87 → **$0.66/$1.98 off-peak, $1.32/$3.96 peak** (peak 01–04 & 06–10 UTC) — a price increase (cheapest hour 2.3× old output). V4 Flash: $0.22/$0.66 off-peak, $0.44/$1.32 peak (verified Aug 16 docs). |
| **Claude Sonnet 5** | Aug | Sep 1 rise to $3/$15 **cancelled**; $2/$10 now standard. |
| **Gemini 3.7/3.6 Flash** | Aug 13 | $0.75/$3.75 intro doubles to **$1.50/$7.50 on Jan 1, 2027** (verified on blog.google + cloud.google.com). |
| **OpenAI Jalapeño chip** | Aug 25 | First benchmarks: 1.5–1.9× throughput/kW vs GB200/GB300 (InferenceX); 700W/die, 216 GiB HBM4 15.4 TB/s, inference-only; small volumes end-2026 (verified openai.com). |
| **Tencent Hy4 preview** | **Aug 28** | **770B/49B MoE, 1M+ ctx, Apache 2.0** — free 2 wks WorkBuddy/CodeBuddy; API $0.834/$2.501; weights on HF/ModelScope/GitCode/CNB. Internal blind eval claims edge over GLM-5.3/K3. |
| **Z.ai GLM-5.3 weights** | **Aug 28** | **Released** — 141 shards ~756 GB, custom license (>$10B group revenue → security review, not MIT). Was API-only since Aug 14. |
| **IBM Granite 4.2** | **Aug 25** | **3B/8B/30B dense, 131K→512K, Apache 2.0** — native CoT + agentic RL for 8B/30B. |
| **GPT-6 Astra** (OpenAI flagship) | **Sep 3-4** | Staged rollout: Daybreak → API/ChatGPT Plus/Pro/Bus/Ent → Azure/Bedrock. **$10/$50 per Mtok** (2.5× Sol's $4/$20 promo), **cache $1/M** (90% off), **Fast mode 2× speed @ 2× price**; 1.05M ctx, 128K out, Apr 30 2026 cutoff. **First model at "Critical" cyber threshold** (gated behind Daybreak). TB4.0 57.9, AA Index 61.2 (ties Sol, behind Fable 5.1 65.7), AA Coding Agent 67 (unverified — 1 source), OSWorld 2.0 72.6. ~75% pricier/task than Sol at max effort but ~3× token-efficient. System card: `deploymentsafety.openai.com/gpt-6-astra`. |

## Post-Session Updates (after August 9, 2026)

| Release | Date | Key Details |
|---------|------|-------------|
| **Grok 4.6** | Aug 12 | Same $2/$6 pricing as 4.5; 500K context; AA Intelligence Index 61 (ties Sol); cached input $0.50/M (was $0.30). Current xAI flagship. |
| **DeepSeek V4-Flash-0731** | Jul 31 | Re-post-trained checkpoint, major agent benchmark gains. API ID `deepseek-v4-flash` now serves 0731 version. Pricing unchanged ($0.14/$0.28). |
| **Gemini 3.7 Flash** | Aug 13 | **New direct competitor in the Terra price band during promo.** $0.75/$3.75 intro (to Dec 31) vs Terra $2/$12 — 2.7× cheaper input, 3.2× cheaper output at higher AA Index (56 vs ~52-53). After Dec 31 ($1.50/$7.50) it's ~25% cheaper than Terra at comparable/better intelligence. Also undercuts Terra's SWE-bench Pro positioning with DeepSWE 65.3%. |
| **Muse Spark 1.2** | **Aug 5** | Terminal coding agent update. Same $1.25/$4.25; new contributor tier $0.10/$0.20; TB2.1 80% independent. |
| **Muse Glimmer** | **Aug 10** | 30B open-weight agentic model (Apache 2.0), distilled from Muse Spark. |

*Source: explainx.ai; mem0.ai; apidog.com; precisionaiacademy.com; codersera.com*