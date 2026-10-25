# Changelog — coding_benchmarks.csv

## Oct 25, 2026 — Kimi K3.1 Pro + Nemotron 3.5 Bolt E4B (ranks 340-341)
- Added Kimi K3.1 Pro (340) — Moonshot AI Oct 23; post-trained Kimi K3, 2.8T total / 104B active, 1M ctx, text+image; API-only at launch ($2/$10, $0.20 cache hit, $2 cache write, 33% below K3), full weights promised by Nov 4 2026 and not public yet (AA scores it proprietary until release); vendor TB4.0 65.7, Kimi Code Bench 3.0 Long-horizon 61.2, BenchCAD 92.7; AA index 55 (#4/215), TB4.0 67.17, HLE 52.46, GDPval-AA 1846 Elo (#3), AutomationBench-AA 73%; cyber capability deliberately reduced; Highspeed is the same checkpoint at 2-3x speed for $4/$20, not a separate record
- Added Nemotron 3.5 Bolt E4B (341) — NVIDIA GA Oct 23; OpenMDW-1.1, 8B total / 4B effective further post-trained from Gemma-4-E4B-it, 64K ctx, official 4GB Q4_K_M build + DFlash NVFP4 drafter; local voice/device assistant model with no coding benches (IFBench 63.79, BFCL-v3 68.51, Tau2 55.10, RULER 64K 86.99, LongMemEval 72.10)
- Fixed Solar Mini 4 (307): 50pct launch discount ended Oct 23 — prices reverted from $0.05/$0.20 to $0.10/$0.40 list (₹9.51/₹38.05), which the promo-expiry gate flagged once the verification anchor moved to Oct 25
- Checked and not added: Microsoft-Decision-1 (Oct 9 preview, decision-scoring/classification on Qwen3.5-9B, not a generation/coding model); Unstructured Transform (document-parsing suite); Hi3D (3D generation); Gemini 4 Carbon and Mistral Large 4 open weights (still unshipped); no launches dated Oct 24-25 found
- Catalog now 341 rows (ranks 1-341), 204 open-weight, 230 with release dates; data as of Oct 25, 2026

## Oct 23, 2026 — Launch-sweep gaps closed: Flint, Ling 3.1 Flash, MiniMax M3.1 Flash (ranks 330-339)
- Added Flint v1.0 (330) — Recursive Oct 21; Apache-2.0, 39.8B total / ~2.5B active MoE for coding agents, 262,144 ctx; vendor Terminal-Bench 2.1 54.9, SWE-bench Pro v2 89.7, SWE-bench Verified 74.2; SGLang kit + official int4/NVFP4/GGUF quants; free hosted tier on OpenRouter, no paid tier
- Added Ling 3.1 Flash (331) — InclusionAI Oct 1; MIT, 560B / 25B active hybrid-reasoning MoE, 1M ctx; LingCode long-horizon coding harness; AA index 41.1, TB4.0 33.3, HLE 39.4; OpenRouter $0.075/$0.225
- Added Ling 3.1 Flash 1019 (332) — InclusionAI Oct 22; hosted checkpoint, no published weights (AA: proprietary); AA index 43.9 vs 41.1 for the open-weight base; $0.30/$0.90
- Added MiniMax M3.1 Flash (333) — MiniMax GA Oct 19; open weights (minimax-community), 428B / 23B active native multimodal, 1M ctx; vendor Terminal Bench 4.0 38.1, DeepSWE v1.1 73.7, OSWorld 2.0 61.7, CyberGym 82.2; $0.15/$0.60; supersedes the preview row 283
- Backfilled open-weight rows missing from the catalog: Command A+ (334, Cohere May 20 — the Command A family was absent entirely), Motif 3 (335, MIT, Aug 12), Solar Open2 250B (336, Upstage Solar License, Aug 12), Agnes 2.5 Pro Alpha (337, Apache 2.0, Aug 19), Hemingway-1 (338, CC-BY-NC, Sep 20), ZDTaichu5.0-9B (339, NVIDIA Open Model License, Sep 4)
- Noted but not added: Elorian Glimpse + Perceptron Mk1.5 (proprietary, non-coding), Moondream 3/3.1 (weights on HF since Jun 30), Celeris-1 + Agnes 2.5 Pro Beta (API-only, low AA index), JT-4.1 Flash 236B A21B (no verifiable weights source), NVIDIA Switchyard + Jev (routers, not models), effort-tier and `:free`/`:batch` aliases
- Flint row enriched from the Recursive benchmark chart (assets/flint_benchmarks_nvfp4.png): LiveCodeBench v6 80.3 (BF16) / 80.8 (NVFP4), IFBench 89.2, IFEval 95.1 — the card prose itself lists only TB2.1 54.9, SWE-Pro v2 89.7 and SWE-V 74.2
- Checked and not added: Nemotron 3.5 Bolt E4B (no weights, AA or OpenRouter listing yet — NVIDIA's newest Nemotron repos are Oct 16); Nemotron 3.5 Embed-1B/8B + Rerank-8B + Parse (HF Oct 7 / Oct 15 / Sep 3, not text-generation → out of coding scope, same call as Cohere Embed 5); iFlytek Spark X2.6 flagship 293B-A30B (no verifiable source — llm-releases has only Spark X2.5 293B from Sep 7, HF has no 293B X2.6 repo, and the catalog's existing SPARK X2 row covers the 293B/30B proprietary tier)
- Catalog now 339 rows (ranks 1-339), 203 open-weight, 228 with release dates; data as of Oct 23, 2026

## Oct 11, 2026 — Honest date line ("Data as of" + re-checked counts)
- Header/footer/meta no longer claim the whole catalog was fact-checked on the newest date. Single wording from parse.recheckLine(), computed from the data: "Data as of Oct 11, 2026 · 8 of 302 rows re-checked against primary sources that day".
- data.json gains rechecked_count (rows with last_verified == data_as_of); site-meta plugin injects the same line into title/meta/og at build time; agreement test fails the build if UI and meta disagree.

## Oct 8, 2026 — Haiku 5.5 + Mistral Large 4 + GLM 5.3 Fast (ranks 300-302)
- Added Claude Haiku 5.5 (rank 300) — Anthropic GA Oct 7; $0.10/$0.50, 1M; fastest Claude tier
- Added Mistral Large 4 (rank 301) — Mistral GA Oct 6; API-only half-price preview $0.68/$2.09, 524K, ~1.05T reported; AA 38.4/HLE 35/LCR 81.3/SciCode 54.2 indep; weights promised end-Oct
- Added GLM 5.3 Fast (rank 302) — Z.AI fast tier listed Oct 7 (llmgateway timeline only); thin row, price TBD
- Haiku 5.5 graduated off the rumor watch; added Large-4-weights + Reflection-Beam-weights rumors

## Oct 2, 2026 — Full 293-row live re-verification (8 agents, ~150 findings)
- Dates: ~110 release dates corrected to launch-day values (family/provider-median estimates replaced where documented; month-only kept as mid-month est). Notable: GPT/Codex families to 2025 dates, Qwen3.5→Feb 2026, R1 family→Jan 2025, GLM-5→Feb 12, GLM-5.2→Jun 16, K2.6→Apr 20, K2.7→Jun 12, Spark 1.2→Aug 5, Glimmer→Aug 10, Qwen27B→Aug 14, Sonnet 5.5 pricing $2/$10, 6.1 Sol $2/$10 + 1.05M
- Licenses fixed: Llama 4 Scout/Maverick + DiffusionGemma (Llama Community/Apache), Hy3 Apache 2.0, Big Pickle Closed, Magistral Medium enterprise-only, DeepSWE-Preview/SWE-Swiss MIT, Ling Flash MIT, Step-3.7 Apache, GLM-5→744B/40B, GLM-5.2→753B, Sarvam 105B→106B/10.3B + 30B→32B/2.4B Apache, ERNIE→21B, Nemotron→30B/3B, ZAYA actives, Gemma→26B/3.8B, GPT-OSS active 5.1B, LFM licenses custom, Quasar launched, Union Alpha = Pareto + live pricing, Laguna M.1 open, KAT-Air priced, Grok 4.20 $1.25/$2.50, 5.1 Codex $1.25/$10, 5.5 Pro input $30
- Skipped as too weak: MiMo-V2-Pro 42B dispute, Qwen3.8-Flash license split, Luna Pro TB, K-EXAONE/AX-K2 benches, Seed Turbo price, StarCoder 3 existence, Qwen3.7 Max date (bad URL) — kept with notes

## Oct 2, 2026 — Full fact-check pass (agents + local audit)
- Fixed Qwen3.8-Omni-Flash (281): API-only (open weights is Flash-Next); pricing $0.15/$0.47 confirmed
- Fixed K2-Horizon-MoVA (291): released Sep 3 (was Sep 29); rest confirmed incl. Apache 2.0 + benches
- Fixed IQuest-Q1 (290): released Sep 29 (weights fill Oct 1); license = custom iquest-q1 Modified-MIT + attribution UI clause
- Fixed Xing4.0 (282): weights Sep 16 (press Sep 22-24)
- Enriched Step 5 Preview (288): 600B/27B, 1M, $1/$2.70, weights Oct 15; Sonnet 5.5 (284): $2/$10 + 1M; GPT-6.1 Sol (289): $2/$10 + 1.05M + DeepSWE 75.22 #2; M3.1 (283): 1M ctx
- Fixed Holo licenses (285-287): 27B = CC-BY-NC 4.0 non-commercial, 35B = Apache 2.0, Nano = NVIDIA Open Model Agreement
- Reverted Kimi K2.6 to Jul 27 (Sep 24 was press coverage; HF shows Jul 27)
- Harness-gap notes: V4.1 Vals TB 74.5 vs 90.6 vendor; Hy4 Vals 55.1; GLM-Flash Vals 62.9; K3 indep DeepSWE 69.0; MiMo indep 71.9 exact; Spark speed 151.6 live (was 236.8); GLM-Flash AA 42 v4.3.2 (was 57)
- Helios timeline corrected (volume 2H 2026, late-Q3 shipments) in README + vera_rubin; INR ₹95.12 kept (within 1.2% of Oct ~96.1)
- Local audit: ranks contiguous, no future dates, INR math exact, Q4 units clean, misattribution gates pass; 4 pre-existing Unknown licenses (132/152/155/206)

## Oct 2, 2026 — AREX-2 agent + October month-rollover
- Added AREX-2 (rank 293) – BAAI Oct 1; 27B dense Qwen3.8-compatible long-horizon agent via iterative test-time refinement; MLE-bench Lite 81.8, Frontier-CS 70.7, GAIA 92.2, HLE 52.6 vendor; HF + GitHub, license to verify; ~14GB Q4
- Month rollover: parse DATA_AS_OF → Oct 2, RELEASE_MONTH_END → Oct 31; future-gate → Oct 31; Meta Spark 1.2 open-weights plan (announced, not shipped) to rumor watch
- Noted but NOT added: Strands Decider 2B + Clef + Jev (decision-only), MAI voice (audio), PixelUMM (license-blocked research artifact, non-coding), OpenHands LM 32B (no current date evidence)
- CSV rank count now 293 (+1); data.json v2026-10-02; parse VERIFIED_AT → Oct 2

## Oct 1, 2026 — Gemini 4 Argon frontier wave
- Added Gemini 4 Argon (rank 292) – Google Sep 30; frontier SWE + legal/finance + cyber-defense; Fairwind trusted-defender phased rollout; intro $2/$10 (cache 95% off) → $4/$20; guardrails pending before paid API/Ultra
- Noted but NOT added: Cohere Embed 5 (embeddings), NVIDIA Kumo Tabular (tabular 28M-215M), MAI-Transcribe-2/Voice-2.1 (voice), TypeSafe Jev + Cloudflare Clef (decision-only, no text gen), North-Mini-Code FP8 + K2.7 DFlash (quant/draft variants, not new models), OpenHands LM 32B (no current release-date evidence)
- CSV rank count now 292 (+1); data.json v2026-10-01; parse VERIFIED_AT → Oct 1 (DATA_AS_OF stays Sep 30 month-end)

## Sep 30, 2026 — Post-DevDay: GPT-6.1 Sol, IQuest-Q1, K2-Horizon-MoVA
- Added GPT-6.1 Sol (rank 289) – OpenAI GA Sep 29 DevDay; Sol upgrade for coding/computer-use/pro work at ~1/5 Astra price (pricing unconfirmed); API + Work + Codex; 6.1 Astra scrapped pre-launch over safety; Ultrafast tier + Pro 500 + Dots (Astra-powered agent product, not a model) same day
- Added IQuest-Q1 (rank 290) – IQuest Sep 30; 320B/15B MoE (256 experts, 8 active) 512K text-only; open safetensors HF + SGLang/vLLM Docker; Claude Code + Codex CLI parsers; license to verify; early-stage accuracy caveats; ~160GB Q4
- Added K2-Horizon-MoVA-36B-A4B (rank 291) – IFM Sep 29 Apache 2.0; 36B/4B MoE MoVA attention native 512K; release benches GPQA 80.8 / TB2.1 58.6 / Tau3-Banking 26.8; ~18GB Q4
- CSV rank count now 291 (+3); data.json v2026-09-30; parse VERIFIED_AT/DATA_AS_OF → Sep 30

## Sep 29, 2026 — DevDay-day gap-fill: Sonnet 5.5, Holo4 family, Step 5 Preview
- Added Claude Sonnet 5.5 (rank 284) – Anthropic GA Sep 28; 30% faster than Sonnet 5, up to 30% less/task; coding + computer-use + visual; AWS/GCP/Azure; Haiku 5.5 coming weeks; pricing unconfirmed
- Added Holo4-27B (rank 285) – Hcompany Sep 28; 27B dense computer-use agents; open weights HF (BF16/FP8/NVFP4/GGUF); license to verify; ~14GB Q4
- Added Holo4-35B-A3B (rank 286) – Hcompany Sep 28; 35B/3B MoE computer-use agents; same HF weight formats; ~18GB Q4
- Added Holotron4 Nano (rank 287) – Hcompany Sep 28; updated small companion to Holo4; specs thin
- Added Step 5 Preview (rank 288) – StepFun announced Sep 20 per BenchLM; details thin
- Noted but NOT added: GPT-6.1 Astra (scrapped pre-DevDay over safety, WSJ/NYT Sep 28), DevDay agent "o" (unconfirmed leaks), JEV-27B + CLM-8B (decision-only, no coding benches), Gemini TTS/Live + GPT-Live-1 (voice/audio, out of coding scope)
- CSV rank count now 288 (+5); data.json v2026-09-29; parse VERIFIED_AT/DATA_AS_OF → Sep 29

## Sep 27, 2026 — This-week gap-fill: K2.8 Preview, Omni-Flash, Xing4.0, M3.1-Flash-Preview
- Added Kimi K2.8 Preview (rank 280) – Moonshot long-horizon/agent-swarm line, listed Sep 11 alongside Atria Dawn; weights/license unconfirmed, secondary source only
- Added Qwen3.8-Omni-Flash (rank 281) – Alibaba multimodal Omni-Flash Sep 18 per Sep 25 roundup; HF repo/ctx/bench unverified
- Added Xing4.0-29B-A4B (rank 282) – XingChen-AGI Apache 2.0 ungated HF Sep 24; 29B/4B MoE 256K→512K, Ascend/MindSpore, mHC + MLA + MTP; vLLM/SGLang PRs unmerged, use prebuilt Docker; ~15GB Q4
- Added M3.1-Flash-Preview (rank 283) – MiniMax quiet Sep 27 inside MiniMax Code only, gated API, no card/bench/price
- Refreshed Kimi K2.6 (rank 13) released Jul 27 → Sep 24 per Moonshot Sep 24 release coverage (4k tool-call demo, HF modified MIT)
- CSV rank count now 283 (+4); data.json v2026-09-27; parse VERIFIED_AT/DATA_AS_OF → Sep 27

## Sep 23, 2026 — Frontier wave Sep 12-22: Grok 4.7, GPT-6 Sol/Luna, Opus 5.5, MiMo-V2.6, AliceAI 80B, Atria Dawn
- Added Grok 4.7 (rank 271) – xAI GA Sep 21 2026 (delayed past ~Sep 12); $2/$6 + $0.50 cache; fast variant 2x speed at 2x price; closed weights
- Added GPT-6 Sol (rank 272) – OpenAI GA Sep 22 2026; $2/$10; API/Codex/ChatGPT/Copilot; ~50% below GPT-5.6 promo; closed weights
- Added GPT-6 Luna (rank 273) – OpenAI GA Sep 22 2026; $0.10/$0.50 + $0.01 cache; cheapest GPT-6; closed weights
- Added Claude Opus 5.5 (rank 274) – Anthropic GA Sep 22 2026; $4/$20 + $0.20 cache (20% cut); secondary-only claims TB4.0 66.4% + GDPval 1846 kept in notes, NOT in TB2.1 column (cross-harness gate)
- Added MiMo-V2.6-Pro (rank 275) – Xiaomi MIT Sep 21 2026; 1.02T/42B 1M multimodal; AA 46 top open-weight; $0.435/$0.87; ~510GB Q4
- Added MiMo-V2.6-Flash (rank 276) – Xiaomi MIT Sep 21 2026; 309B/15B; $0.14/$0.28; ~155GB Q4
- Added MiMo-V2.6-Distill-Qwen-9B (rank 277) – Xiaomi MIT Sep 21 2026; SFT of Qwen3.5-9B; SWE-Pro 44.6% vendor SFT claim in correct column; ~6GB Q4
- Added AliceAI-Foundation-80B-A3B (rank 278) – Yandex Apache 2.0 ungated HF Sep 21 2026; 80B/3B hybrid MoE; 262K ctx; ~40GB Q4
- Added Atria Dawn Preview (rank 279) – Preview Sep 12 2026; details thin; secondary source only
- CSV rank count now 279 (+9); data.json regenerated v2026-09-23 with released dates 2026-09-12..2026-09-22
- Frontend: Explorer virtualized single-column list replaced with responsive grid (all result sizes); hardware tiers added (4xPro6000 384GB, Mac Studio M5 512GB/2TB, Vera Rubin NVL72); vite setupFiles .js->.ts; VERIFIED_AT/DATA_AS_OF Sep 23

## Sep 15, 2026 — Deep audit sync: Koa, V4.1 Flash pricing, Astra enrichment, Grok delay
- Added Salesforce Koa (rank 268) – enterprise agentic CRM model announced 15 Sep 2026; post-trained Nemotron 3 Super base; Salesforce-hosted pilot; GA winter 2026; specialized; weights controlled
- Updated DeepSeek V4.1 Flash (rank 256) pricing to peak $0.30/$1.20 off-peak $0.15/$0.60; INR updated to ₹28.54/₹114.14; license note added for peak/off-peak and cache-hit
- Enriched GPT-6 Astra (rank 254) license with DeepSWE v1.1 74.1% vendor and Critical cyber threshold note
- Marked Grok 4.7 delayed – missed ~Sep 12 target as of 15 Sep; additional RL needed; roadmap notes added to ai_model_tracker_aug29_2026.md
- Updated README verification date to Sep 15 2026; ai_model_tracker changelog appended
- CSV rank count now 268 (+1); data.json will be regenerated

## Sep 16, 2026 — Stealth + fully-open additions (Union Alpha, ZGCM-1)
- Added Union Alpha (rank 269) – stealth preview Sep 16 2026; stealth/union-alpha (OpenRouter) + union-alpha (OpenCode Zen); free for ~1 week; 262K ctx 131K max output text+image in tool calling; anonymous provider; zero-retention claim disputed; no weights/HF; placeholder expiry 2098-12-31; community DeepSWE ~73% unverified – tagged as community not vendor
- Added ZGCM-1 (rank 270) – Zhongguancun Academy 7.39B dense fully open foundation; Apache 2.0; paper arXiv Sep 11 + release Sep 16; weights + checkpoints + 5.44B-row dataset + recipes + W&B logs; hybrid gated SWA 27/32 + 5 global; Muon + FP8 + TWEO ≈585 TFLOP/s/GPU; mid-training 16K→64K→256K MDP; SFT 4.92M ex 10ep + GRPO RL; 256K ctx ~4GB Q4; AIME 2026 75.0% vendor; self-host Free
- CSV rank count now 270 (+2); data.json regenerated with released 2026-09-16 for both

## Sep 14, 2026 — Deep data audit: cross-harness misattribution + unit/column fixes
- Nulled non-TB2.1 scores sitting in the Terminal-Bench (TB2.1) column: r247/248 TB4.0+TB-Science, r249 TB3.0 29.0%, r254 TB4.0 vendor 57.7% (numbers preserved here; TB4.0 57.7% also in r254 license prose)
- Nulled SWE-Pro vendor numbers in the SWE-V column: r196 64.7% (SWE-Pro vendor), r197 72.9% (SWE-Pro vendor); real TB2.1 numbers kept in Terminal-Bench with vendor tags (82%/80%)
- Moved MAI-Thinking-1 r34 AIME26 94.5% from MATH to AIME 2026 column (AIME25 97.0% dropped — AIME 2026 column must hold AIME26); tagged TB cell 46.0% as TB2.0-not-TB2.1
- Fixed Kimi K3 r12 Q4 unit: `~1400G` (grams) → `~1400` (GB, ≈1400GB for 2.8T)
- Fixed North-Micro-Vision r231 column shift: `128K` moved from Price Output INR/1M to Context Window
- Pipeline: `price()` now nulls non-per-Mtok units (`$1.50/1k pages` no longer parses as 1.5 $/Mtok — Cohere Parse 5 r237 prices now null)
- Gates: new `data.test.js` misattribution + price/Q4-unit tests (TB4/SWE-Pro/AIME25 re-entry blocked, per-page-price re-entry blocked)

## Sep 13, 2026 — Fact-check & fix verified issues
- Deleted GLM-5.2 Turbo (ghost row; no primary source confirms existence)
- Fixed DeepSeek V4.1 Flash: 763B → 552B backbone; Undisc. → 8B prefill/16B decode; 382 → 280 GB Q4; MoE → Causal Encoder-Decoder (HuggingFace model card)
- Added Sakana SWE-2, Fugu Max, Fugu Ultra v2.0 rows
- Retired Qwen3.8-Max-Preview (merged with Qwen3.8-Max)
- Deduped Nemotron 3.5 Lightning (kept superset row with SWE-V 51.56 / GPQA-D 75.44 + NIM pricing; removed barebones Aug 15 row)
- Moved update notes to this CHANGELOG.md (CSV comment lines caused column-count parse errors on GitHub)
- Final: 267 unique models, ranks 1-267, no gaps/duplicates

## Sep 10, 2026 — Online re-verification
- ONLINE RE-VERIFIED vs api-docs.deepseek.com (V4.1 Flash GA: deepseek-flash $0.15/$0.60 off-peak, $0.30/$1.20 peak, cache-hit $0.003/$0.006; legacy deepseek-v4-flash/vision-exp RETIRED routed to V4.1 Flash billed Flash; V4 Pro routed to V4.1 Flash Sep 14 12:00 Beijing)
- docs.anthropic.com (Fable 5.1/Mythos 5.1 $10/$50 cache $0.25 0.025x; Fable 5 $10/$50 cache $1.00; Opus 5/4.8 $5/$25 cache $0.50; Sonnet 5 $2/$10 standard, Sep 1 rise cancelled)
- ai.google.dev (Gemini 3.8 Flash GA; 3.6/3.7 Flash intro $0.75/$3.75 through Dec 31 2026 then $1.50/$7.50; 3.6 Flash cut to same intro rate)
- llm-releases.com (349 models, latest Sep 4: Astra Pro 1.05M $10/$50 cache $1, Sante 124B/5.1B 262K API-first weights unconfirmed, Ling-Fin weights posted Sep 4 MIT DeepInfra $0.06/$0.18, Astra 1M TB4.0 57.7% OSWorld 72.6% GPQA 96.0%)
- artificialanalysis.ai (v4.3: Fable 5.1 max/xhigh 53 top, Astra max/xhigh 53, best open GLM-5.3 max 45 > K3 max 44 > GLM-Flash 42; 645 models)
- Fixed: rows 6/16/192/193/220 V4 flat $0.435/$0.87/$0.10/$0.20/$0.21 -> off-peak $0.66/$1.98/$0.15/$0.60 + legacy flags; row 104 GPT-OSS-120B Closed -> Apache 2.0; rows 196/197 ctx Unknown -> 1.1M + SWE-Pro 64.7%/72.9% vendor; row 202 3.6 Flash $1.50/$7.50 -> $0.75/$3.75 intro; row 240 Ling-Fin Free -> $0.06/$0.18 weights-posted; rows 255-257 Muse AA 61/62 -> 48 v4.3, Mercury Preview -> GA Sep 8, Astra + TB4.0/GPQA/HLE. Added 258-265: Astra Pro, V4.1 Flash, MiniCPM5-2B, K2 Horizon, Quasar, Sante, Ling-VL (AA Sep 10), Gemini Cyber. Regenerate data.json + frontend/src/data.json from this CSV (single source of truth). Row 259 V4.1 Flash -> MIT open weights (HF deepseek-ai/DeepSeek-V4.1-Flash Sep 10; 552B backbone; 8B prefill/16B decode; 280 GB Q4; Causal Encoder-Decoder; 384 experts; 890 bytes/tok KV; Engram 196B; 48 shards ~510GB FP8; KV-cache compression; vision; routes legacy V4 Flash/Pro).
- Added missing frontier open rows 266 Hy4 preview (Aug 28 Apache 2.0 770B/49B 1M+ TB2.1 85.4 DeepSWE 64.3 $0.834/$2.501 ~385GB Q4) + 267 Qwen3.8-Max base (Aug 13 weights 2.4T/95B TB2.1 86.6 SWE-Pro 67.7 DeepSWE 56.6 $2/$6). Fixed row 12 Kimi K3 license (custom license hid it from open filter — added open-weights flag), row 207 Preview -> Proprietary pending (was miscounted open), row 223 GLM-5.3 -> Custom open-weights-released Aug 27.
- Gap-fill sync vs llm-releases.com (339 models). Added 19 rows: Qwen3.8-Flash (238), Parse 5 (239), Ling-Fin (240), Thomson (241), Hy-MT2 (242), Dots3 (243), LFM2.5-VL (244), Nemotron Lightning (245), Namazu (246), Solar Pro 4 (247), GPT-5.6-Cyber (248), GLM-5.2 Turbo (249), Fable 5.1 (250) + Mythos 5.1 (251) Sep 1 $10/$50 cache $0.25 (75% cut). Split Qwen twins + Status taxonomy. Updated MAI-Thinking-1 (34) → Preview 962B/34.7B 52.8% SWE-Pro; Laguna S 2.1 (208) DeepSWE 40.4% 262K free; Muse Spark 1.2 date Aug 5 verified; DeepSeek Vision TB 83.9/DeepSWE 59.3 filled; dots3 IMO harness nuance flagged; added Qwen0902 (252) TB3 29%/DeepSWE 69.3% + Vision (253). Added Gemini 3.8 Flash (254, Sep 2 $0.75/$3.75 AA 59), Muse Spark 1.3 (255, Sep 2 $1.25/$4.25 AA 61/62), Mercury 2.5 Preview (256, Aug 31 diffusion $0.20/$0.75). See ai_model_tracker_aug29_2026.md §0, §Gap-fill, §7.
- Added Gemini 3.7 Flash (Aug 13, AA Index 56 vs 52 for 3.6 Flash, DeepSWE 49.0% -> 65.3%, AutomationBench 17% -> 30.4%, 340.1 tok/s fastest on AA leaderboard; intro $0.75/$3.75 through Dec 31 2026 then $1.50/$7.50; 3.6 Flash cut to same intro rate). Muse Spark 1.2 (Aug 5, same $1.25/$4.25; AA Index 54/57 xhigh; TB2.1 78% -> 80% independent; 82.9% is Meta-reported not verified; new muse-spark-1.2-contributor tier $0.10/$0.20 in exchange for training-data permission; paired with Muse Code terminal agent). Muse Glimmer 30B (Aug 10, Apache 2.0 open weights, ~15 GB Q4, no AA Index yet, trades wins with Qwen3.6 27B, beats on tool use). Seed 2.1 Turbo (Aug 12, ~$0.43/$2.07 half of Seed 2.1 Pro CNY6/30; no verified benchmarks beyond SciCode 59.8 vendor / Code Arena Frontend rank 8; no open weights). New rows appended at ranks 224-227 pending AA coding-agent re-measurement and composite re-rank.
- Kimi K3 active params corrected to 104B (Kimi K3 License, custom; was 50B/Modified MIT); DeepSeek V4 Flash Max repriced to official $0.14/$0.28; MiniMax M3 license = Modified MIT; KAT-Coder-Pro V2.5 repriced $0.30/$0.30 -> $0.74/$2.96 (StreamLake); added Qwen3.8-27B (dense 27B, Apache 2.0, 262K, LCB 90.3/TB 73.0, $0.45/$3.20), DeepSeek V4 Pro 0813 (GA Aug 13, TB2.1 87.9%, $0.435/$0.87), Nemotron 3.5 Lightning (31.6B/3.6B, OpenMDW-1.1, 1M), Ling 3.0 Tiny (7.9B/~1.3B, MIT, 262K, $0.06/$0.18 post-promo). GLM-5.3 added (Aug 14, 743B/40B, TB2.1 88.2, HLE-tools 62.5, API-only, weights promised ~2 wks).
- Added A.X K2 (SK Telecom, 688B/33B, Apache 2.0, 256K ctx) - Korea's sovereign model; AIME26 97.1 (best open), LCB v6 84.0, GPQA 85.6, HLE 27.8," BrowseComp 9.3; trained FP8 on 512 B200. Kimi K3 independently verified #3 on AA Intelligence Index (57) - first open-weight in global top 3; weights confirmed on HF (~1.56 TB). Qwen3.8-Max (2.4T) open weights confirmed "next week" (Aug 2)", no repo/license yet. All new scores are vendor-reported.
- Inkling-Small (Jul 30) now has scores - beats Inkling (77.6% SWE). K-EXAONE 2.0 = 750B/37B, Korea's largest open model; SWE 80.6% / TB 2.1 64.0% (thinking). openPangu-2.0-Pro = Ascend-native MoE; LCB 85.7% & SWE 68.5% are thinking mode (non-thinking: 74.5 / 66.8). DeepSeek V4 Flash -0731 = official release, agent-capability upgrade, native Responses API + Codex; Terminal-Bench 2.1 82.7%. All new scores are vendor-reported.
- GLM-5.2 Turbo: UNCONFIRMED - no primary Z.ai source (HF, docs, pricing) confirms this model; skip adding.

## Aug 29-30, 2026 — Gap-fill sync vs llm-releases.com (339 models). Added 19 rows: Qwen3.8-Flash (238), Parse 5 (239), Ling-Fin (240), Thomson (241), Hy-MT2 (242), Dots3 (243), LFM2.5-VL (244), Nemotron Lightning (245), Namazu (246), Solar Pro 4 (247), GPT-5.6-Cyber (248), GLM-5.2 Turbo (249), Fable 5.1 (250) + Mythos 5.1 (251) Sep 1 $10/$50 cache $0.25 (75% cut). Split Qwen twins + Status taxonomy. Updated MAI-Thinking-1 (34) → Preview 962B/34.7B 52.8% SWE-Pro; Laguna S 2.1 (208) DeepSWE 40.4% 262K free; Muse Spark 1.2 date Aug 5 verified; DeepSeek Vision TB 83.9/DeepSWE 59.3 filled; dots3 IMO harness nuance flagged; added Qwen0902 (252) TB3 29%/DeepSWE 69.3% + Vision (253). Added Gemini 3.8 Flash (254, Sep 2 $0.75/$3.75 AA 59), Muse Spark 1.3 (255, Sep 2 $1.25/$4.25 AA 61/62), Mercury 2.5 Preview (256, Aug 31 diffusion $0.20/$0.75). See ai_model_tracker_aug29_2026.md §0, §Gap-fill, §7.

## Aug 16, 2026 — Added Gemini 3.7 Flash (Aug 13, AA Index 56 vs 52 for 3.6 Flash, DeepSWE 49.0% -> 65.3%, AutomationBench 17% -> 30.4%, 340.1 tok/s fastest on AA leaderboard; intro $0.75/$3.75 through Dec 31 2026 then $1.50/$7.50; 3.6 Flash cut to same intro rate). Muse Spark 1.2 (Aug 5, same $1.25/$4.25; AA Index 54/57 xhigh; TB2.1 78% -> 80% independent; 82.9% is Meta-reported not verified; new muse-spark-1.2-contributor tier $0.10/$0.20 in exchange for training-data permission; paired with Muse Code terminal agent). Muse Glimmer 30B (Aug 10, Apache 2.0 open weights, ~15 GB Q4, no AA Index yet, trades wins with Qwen3.6 27B, beats on tool use). Seed 2.1 Turbo (Aug 12, ~$0.43/$2.07 half of Seed 2.1 Pro CNY6/30; no verified benchmarks beyond SciCode 59.8 vendor / Code Arena Frontend rank 8; no open weights). New rows appended at ranks 224-227 pending AA coding-agent re-measurement and composite re-rank.

## Aug 15, 2026 — Kimi K3 active params corrected to 104B (Kimi K3 License, custom; was 50B/Modified MIT); DeepSeek V4 Flash Max repriced to official $0.14/$0.28; MiniMax M3 license = Modified MIT; KAT-Coder-Pro V2.5 repriced $0.30/$0.30 -> $0.74/$2.96 (StreamLake); added Qwen3.8-27B (dense 27B, Apache 2.0, 262K, LCB 90.3/TB 73.0, $0.45/$3.20), DeepSeek V4 Pro 0813 (GA Aug 13, TB2.1 87.9%, $0.435/$0.87), Nemotron 3.5 Lightning (31.6B/3.6B, OpenMDW-1.1, 1M), Ling 3.0 Tiny (7.9B/~1.3B, MIT, 262K, $0.06/$0.18 post-promo). GLM-5.3 added (Aug 14, 743B/40B, TB2.1 88.2, HLE-tools 62.5, API-only, weights promised ~2 wks).

## Aug 3, 2026 — Added A.X K2 (SK Telecom, 688B/33B, Apache 2.0, 256K ctx) - Korea's sovereign model; AIME26 97.1 (best open), LCB v6 84.0, GPQA 85.6, HLE 27.8," BrowseComp 9.3; trained FP8 on 512 B200. Kimi K3 independently verified #3 on AA Intelligence Index (57) - first open-weight in global top 3; weights confirmed on HF (~1.56 TB). Qwen3.8-Max (2.4T) open weights confirmed "next week" (Aug 2)", no repo/license yet. All new scores are vendor-reported.

## Jul 31, 2026 — Inkling-Small (Jul 30) now has scores - beats Inkling (77.6% SWE). K-EXAONE 2.0 = 750B/37B, Korea's largest open model; SWE 80.6% / TB 2.1 64.0% (thinking). openPangu-2.0-Pro = Ascend-native MoE; LCB 85.7% & SWE 68.5% are thinking mode (non-thinking: 74.5 / 66.8). DeepSeek V4 Flash -0731 = official release, agent-capability upgrade, native Responses API + Codex; Terminal-Bench 2.1 82.7%. All new scores are vendor-reported.

## Oct 11, 2026 — Historical README log archive (moved from README.md during audit cleanup)

Moved verbatim from the root README top. Entries dated Aug 19 – Sep 26, 2026; superseded by `coding_benchmarks.csv` (302 rows, data as of Oct 8, 2026). Kept for provenance only — do not quote scores without re-checking.

### Sep 2026 quote blocks (Sep 23 / Sep 15 / Sep 2 / Sep 1)

> **Sep 23, 2026 Frontier Wave (ranks 271-279, fact-checked via live search Sep 23)**
> - **Grok 4.7** (xAI, GA Sep 21, $2/$6 + $0.50 cache, fast 2x variant) — was delayed past ~Sep 12, now shipped.
> - **GPT-6 Sol / Luna** (OpenAI, GA Sep 22, $2/$10 and $0.10/$0.50) — ~50% below GPT-5.6 promo, on API/Codex/ChatGPT/Copilot.
> - **Claude Opus 5.5** (Anthropic, GA Sep 22, $4/$20 + $0.20 cache) — secondary-only TB4.0 66.4% claim kept in notes, NOT in the TB2.1 column.
> - **MiMo-V2.6-Pro / Flash / Distill** (Xiaomi, MIT Sep 21) — Pro 1.02T/42B at **AA 46 (v4.3.2), top open-weight** ($0.435/$0.87); Flash 309B/15B ($0.14/$0.28); Distill 9B SFT with SWE-Pro 44.6% vendor claim in the correct column.
> - **AliceAI Foundation 80B** (Yandex, Apache 2.0 ungated Sep 21, 80B/3B, 262K) + **Atria Dawn Preview** (Sep 12, details thin).
> - Frontend sync: Explorer virtualized list → responsive grid, hardware tiers added (4×Pro 6000 384GB, Mac Studio M5, Vera Rubin NVL72), `VERIFIED_AT`/`DATA_AS_OF` → Sep 23, `data.json` v2026-09-23 (279 models, 173 dated).

> **Sep 15, 2026 Deep Audit Sync**
> - **Salesforce Koa** added rank 268 — Nemotron 3 Super post-train for Agentforce CRM workflows, Salesforce-hosted pilot announced Sep 15, GA winter 2026, weights controlled, vendor claims 3× fewer errors on internal CRM Bench.
> - **DeepSeek V4.1 Flash** pricing completed: peak $0.30/$1.20, off-peak $0.15/$0.60, INR ₹28.54/₹114.14, cache $0.003/$0.006; architecture 552B MoE CED, KV-compression.
> - **GPT-6 Astra / Astra Pro** enriched: DeepSWE v1.1 74.1%, Critical cyber threshold note, TB4.0 57.7% / OSWorld 72.6%.
> - **Grok 4.7 delayed** (missed ~Sep 12); 4.8 ~2.5T new C++ stack in training → RL next.
> - Frontend sync: `VERIFIED_AT`/`DATA_AS_OF` updated to Sep 15, `data.json` regenerated 268 models, Tracker tab fact-checked Sep 15 with Koa & Grok entries.

> **Sep 2, 2026 Sync vs llm-releases.com (343 models Sep 2, 35 new/30d) + Anthropic Sep 1 + Meta/Google Sep 2:** **Split Qwen3.8-Flash (Available API, Proprietary $0.15/$0.47, 1M) vs Flash-Next (Preview weights, Qwen Com 1.0, 262K→1M)** — was conflated. **17 models added:** Parse 5 (Cohere 2.3B $1.50/1k pgs), Ling-3.0-flash-Fin (124B/5.1B finance free), Thomson (TR legal Preview), Hy-MT2-30B-A3B (MT), Dots3-Note Preview (280B/16B 512K), LFM2.5-VL-3B (3.1B edge), Nemotron 3.5 Lightning (31.6B/3.6B), Namazu (Sakana JP), Solar Pro 4 (524K), GPT-5.6-Cyber, **Fable 5.1/Mythos 5.1** (Sep 1, $10/$50 + $0.25 cache), **Qwen3.8-Max-0902** (Sep 2, TB3 29%/DeepSWE 69.3%), **Gemini 3.8 Flash** (Sep 2, 1M $0.75/$3.75 AA 59 pre-v4.3.2), **Muse Spark 1.3** (Sep 2, 1M $1.25/$4.25 — ⚠️ launch AA 61/62 superseded by v4.3 re-score **48**), **Mercury 2.5 Preview** (Aug 31 diffusion 260K $0.20/$0.75). GLM-5.2 Turbo reconciled. Added **§0 Methodology + §7 Changelog + Status** per `llm-releases.com/methodology`. See `ai_model_tracker_aug29_2026.md` §2 + §Gap-fill + `coding_benchmarks.csv:238-256`.

> **Sep 1, 2026 Live Cross-Check Updates (historical — AA figures pre-v4.3.2):** GLM-5.3 weights released **Aug 27** (not Aug 28); HF license shows "other" — Reuters >$10B review gate **unconfirmed**. **Qwen3.8-27B AA Index = 52** independent. **MAI-Code-1-Flash is closed-weight API-only** — remove from local lists. Added models: Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, MiniMax M3, Kimi K2.7-Code, Laguna S 2.1, Muse Glimmer (AA 35), Ornith-1.5-397B, Apodex 1.1-mini. See `ai_model_tracker_aug29_2026.md` §2b and `single_user_india_local_ai.md` Post-Session Update.


---

## 🆕 Last Update — Sep 2, 2026 (synced to llm-releases.com 339) [HISTORICAL]

> **Historical section (Aug 29–Sep 2, 2026).** Preserved for provenance — the CSV (now 299 rows, data as of Oct 5, 2026) is authoritative. Picks like "V4 Flash 0731 / V4 Pro 0813 as current" and AA scores here predate the v4.3.2 re-scores; do not mix versions.

### Sep 2 Gap-fill vs llm-releases.com — 12 models + Fable 5.1 + taxonomy split 🆕

**Synced to `llm-releases.com` catalog (Sep 2, 339 models, 35 new/30d, methodology `detection→extraction→validation→human review→audit log`) + Anthropic Sep 1.** Local was missing doc-VLM, MT, legal/cyber verticals and conflated Qwen twins. Now also **Sep 1 frontier Fable 5.1** added at §2 top.

- **Split:** `Qwen3.8-Flash` (**Available / Proprietary, 1M, $0.15/$0.47/$0.016**) vs `Qwen3.8-Flash-Next` (**Preview / Qwen Community 1.0, 262K→1M, ~111 GB Q4**) — distinct rows `llm-releases.com/models/qwen3-8-flash` vs `...flash-next`. Local previously conflated as one entry `ai_model_tracker_aug29_2026.md:Qwen3.8-Flash-Next`.
- **Added 17 models** (`ai_model_tracker_aug29_2026.md: §2 Fable 5.1/Qwen0902/Gemini/Muse/Mercury` + `§Gap-fill Sync`, `coding_benchmarks.csv:238-256`): **Fable 5.1/Mythos 5.1** (Sep 1, $10/$50 + **$0.25 cache** → ~25%/45% cheaper, TB-Science 52.6% 2×), **Qwen3.8-Max-0902** (Sep 2, TB3 29%/DeepSWE 69.3%), **Gemini 3.8 Flash** (Sep 2, 1M $0.75/$3.75 AA 59 pre-v4.3.2), **Muse Spark 1.3** (Sep 2, 1M $1.25/$4.25 ⚠️ AA 48 v4.3, not 61/62), **Mercury 2.5 Preview** (Aug 31 diffusion 260K $0.20/$0.75) + **Parse 5** (Cohere 2.3B $1.50/1k pgs), **Ling-3.0-flash-Fin** (124B/5.1B finance), **Thomson** (TR Preview), **Hy-MT2-30B-A3B** (MT), **Dots3-Note Preview** (280B/16B), **LFM2.5-VL-3B** (3.1B), **Nemotron 3.5 Lightning** (31.6B/3.6B SWE-V 51.56), **Namazu** ($0.95/$4), **Solar Pro 4** (524K), **GPT-5.6-Cyber**. `GLM-5.2 Turbo` reconciled as **Available API tier** $1.99/$6.16.
- **Follow-up updates:** **Laguna S 2.1** detailed (118B/8B 262K 70.2% TB2.1 /40.4% DeepSWE, free `poolside/laguna-s-2.1:free`), **MAI-Thinking-1** promoted `Upcoming→Preview` (Aug 12, 962B/34.7B 52.8% SWE-Pro /46.0% TB2.0, Foundry — `csv:34`), **DeepSeek V4 Flash Vision** benchmarks filled (83.9/59.3/57.7, 1.05M — `csv:253`), **Muse Spark 1.2 date verified Aug 5** (not Aug 6), **dots3-note IMO 42/42 = internal harness branch**.
- **Taxonomy:** Added `Status` (Available/Preview/Retired etc.) + `§0 Methodology` + `§7 Changelog` (append-only) aligned to `llm-releases.com/methodology` + `.../changelog`. All new cards carry `Source: llm-releases.com/models/<slug> → primary`.

*Local differentiator retained:* India ₹ pricing + Q4/HW fit + tok/s + 5yr TCO + Scale-standardized deltas — not in llm-releases.com.

---

---

## 🆕 Last Update — Aug 19-30, 2026 (verified) [HISTORICAL]

> **Historical section (Aug 19–30, 2026).** Preserved for provenance — the CSV (now 299 rows, data as of Oct 5, 2026) is authoritative and supersedes picks and scores below.

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

~111 GB Q4_K_XL (Unsloth GGUF). **Needs 4×5090 (128GB) or 2×Pro 6000 (192GB) — 111 GB exceeds a single 96GB card (offload only there), and exceeds 3×5090 (96GB).** No Scale/AA/BenchLM independent verification yet. **Highest-priority new addition** to router MVP.

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
**320B/18B** MoE (45L hybrid KDA linear + NoPE sparse MLA, 8/288 experts), **1,048,576 ctx** (131K out), **first natively multimodal GLM-5** (text+image+video in). **MIT** `zai-org/GLM-5.3-Flash`, **~306 GiB FP8** → 8-GPU Hopper min (~160 GB Q4). **$0.15/$0.50/$0.03 cached**, promo halves to **Sep 9**. **AA Index 57 (v4.1.1)** (= Opus 4.8 at the time; v4.3.2 re-scores Flash to 42 — do not mix index versions). Vendor TB2.1 84.3 / DeepSWE 63.4 / Automation 48.8. Ran 6 days as anonymous `stealth/ox-alpha` on OpenRouter/OpenCode, ~42T tokens, entirely on **Chinese-made AI chips** via custom SGLang (3× efficiency claim).

### IBM Granite 4.2 — Aug 25 (Apache 2.0)
Dense decoder-only reasoning LLMs with native CoT + multi-stage agentic RL: **3B** (40L/2560), **8B** (40L/4096), **30B** (64L/4096), GQA, RoPE theta 10M, SwiGLU, **131K base →512K** extended, BF16. 8B/30B trained for tool/code/terminal/web in sandboxes. All Apache 2.0, HF + quantized variants live.

---

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

---

---

## Chat Summary — Sep 26, 2026 (Best Open Coding + V4.1 HW Sizing)

### 1. Best open-source coding (catalog 279, 159 open)
- Highest TB: DeepSeek V4.1 Flash MIT TB 90.6 / DeepSWE 74.2
- Best verified MIT: Ornith-1.5-397B TB 86.1 / SWE-V 86.0 (#1 HF) / SWE-Pro 65.1 — 5-run Harbor+OpenHands
- Best Apache 2.0: Tencent Hy4 770B/49B TB 85.4 / DeepSWE 64.3 / SWE-Pro 65.7
- Best AA composite: MiMo-V2.6-Pro MIT 1.02T/42B AA 46 (v4.3.2) #1 open, TB 89.9 / DeepSWE 71.9
- Practical: Qwen3.8-27B Apache 14GB Q4 TB 73 / LCB 90.3 (1x5090); Flash-Next 111GB LCB 91.9; GLM-5.3-Flash MIT 160GB TB 84.3, AA 42 v4.3.2 (was 57 v4.1.1)

### 2. Online verification
- Ornith: ornith.ai/ornith_1_5.html + huggingface.co/ornith-ai/Ornith-1.5-397B — beats GLM-5.2/V4-Flash-0731, par Opus 4.8
- Hy4: tencent.com Aug 28 + huggingface.co/tencent/Hy4-preview — Apache 2.0 confirmed
- MiMo: artificialanalysis.ai/models/mimo-v2-6-pro AA 46 (v4.3.2) + mimo.mi.com Sep 21 + VentureBeat Sep 22 + Raschka Sep 22
- V4.1: huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash Sep 10 MIT 552B CED 8B/16B 1M; TB 90.6 / DeepSWE 74.2 mini-SWE (commit fb2764a); API $0.15/$0.60 off-peak

### 3. Hard new benchmarks (vendor unless AA/Scale)
- DeepSWE v1.1 indep Oct 2: Spark 1.3 75.4 closed #1, GPT-6.1 Sol 75.22 #2, V4.1-Flash 74.2 tied #3/#1 open, Kimi K3 69.0; Spark speed live 151.6 (was 236.8 launch)
- TB2.1 indep llm-stats: V4.1-Flash 0.906 #1 overall/open; AA top closed Fable 5.1 91.4
- TB4.0 AA harder: Opus 5.5/Astra 59.6 closed; best open GLM-5.3 41.9 (#19), Qwen-Max-0902 38.9, MiMo-Pro 34.9(v), V4-Flash 12.1
- SWE-Pro vendor agg Sep 23: Qwen-Max 67.7 (#5), Hy4 65.7 (#6 best Apache), Ornith 65.1, Flash-Next 62.5; Scale std: open 38.7 vs closed 59.1

### 4. All open @FP16 1M — which machine?
- 159 open ~46.3T params = 92.6TB FP16 + 3-5TB KV = ~98TB
- One-at-a-time: B300 2.1TB fails giants (K3 5.6TB, Max 4.8TB); 1x Rubin 20.7TB / Helios 31TB YES any single
- All-at-once: 5x Rubin (103TB) or 4x Helios (124TB); old 3-rack math was 69 models

### 5. B300 11.7Cr (5.7Cr upfront) @FP16/@FP8?
- FP16: all Q4 yes, FP16 only ~144/159 (fails 15x 1T+); max ~1152B per vera_rubin_all_models.md:421
- FP8: 157/159 fit (fails K3 2.86TB, Max 2.46TB); 1.6T 1.66TB YES
- 288GB = 1x B300, 2.1TB = 8x + NVSwitch (2304GB raw minus overhead)

### 6. tok/s B300 single-user batch=1
- 3B/262K 300-500; 13-18B/1M 40-80 (80-150 short); 40-50B/1M 30-60 Q4; 95-104B/1M 15-30 Q4
- V4.1-FP8 @1M: ~100-180 decode, 1M prefill 60-120s; vendor API 333-400 short-ctx batched, AA 232-243, LithosAI 564-660 optimized

### 7. Cheapest V4.1 8-bit (511GB disk, 614GB VRAM min = x1.2)
- Full resident: 8x Pro 6000 768GB ~3.4-4Cr (cheapest proper) vs 8xH200/GB200 tray
- Offload: 314GB VRAM + 196GB RAM or 307GB + NVMe
- Boot only: 128GB Mac + DwarfStar Q2 340GB SSD-stream single-digit
- 4x Spark 512GB <614GB no; 1x Mac 512GB no stock runner; 6x Spark 768GB yes ~20-40 short; 2x Mac 1TB memory yes but no vLLM/RDMA practical
- M5 Ultra 512GB: 36CPU/80GPU, 1.2TB/s (+50% vs M3U), late Oct >$10k; DwarfStar Q2/Q4 yes, official FP8 no, llama.cpp #28696 draft + Ollama cloud-only; roof 75 tok/s, real 10-20 resident
- 2x M5 Ultra 1TB: fits Q4 resident TP via DwarfStar RDMA, ~20-40 est
