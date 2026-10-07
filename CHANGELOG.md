# Changelog — coding_benchmarks.csv

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
