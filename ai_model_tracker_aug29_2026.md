# AI Model Tracker — Upcoming & Recent Releases

**Updated:** Sep 2, 2026 (synced to llm-releases.com 339-model catalog) | **Currency:** ₹95.12/USD | **Exchange rate locked:** Aug 14, 2026
**All benchmark scores vendor-reported unless marked `(AA)` `(Scale)` `(BenchLM)` `(tbench.ai)`**
**⚠️ Ultra/multi-agent scores flagged separately. Verified via live web search Aug 29, 2026 + llm-releases.com Sep 2 cross-check.**

> **Sep 2, 2026 Sync vs llm-releases.com** (339 models, 35 new/30d) — 10 gap models (§2 Gap-fill: Parse 5, Ling-Fin, Thomson, Hy-MT2, Dots3-Note, LFM2.5-VL, Nemotron Lightning, Namazu, Solar Pro 4, GPT-5.6-Cyber) + **Sep 1 frontier Fable 5.1/Mythos 5.1** (same weights, $10/$50 + $0.25 cache, TB-Science 52.6% 2×) + **Sep 2 refresh Qwen3.8-Max-0902** (2.4T/1M, TB3 29% 2.6×, DeepSWE 69.3%); Qwen3.8-Flash split; GLM-5.2 Turbo reconciled; MAI-Thinking-1 →Preview (Aug 12); Laguna S 2.1 detailed (70.2% TB2.1); Vision benchmarks filled; dots3 IMO harness nuance. Added §0 Methodology + §7 Changelog + Status taxonomy. `Fable 5.1 §2` + `Qwen0902 §2 top`.

> **Sep 1, 2026 Corrections & Additions** (live cross-check vs HuggingFace / Ollama / news)
> - GLM-5.3 weights released **Aug 27, 2026** (not Aug 28); HF shows license **"other"** — Reuters >$10B review trigger unverified, treat as unconfirmed review gate.
> - **Qwen3.8-27B AA Intelligence Index = 52** (independent).
> - **MAI-Code-1-Flash is closed-weight API-only** (Copilot) — no self-hostable weights; remove from local deployment lists.
> - **Missing models added** Sep 1: Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, MiniMax M3, Kimi K2.7-Code, Laguna S 2.1, Muse Glimmer, Ornith-1.5-397B, Apodex 1.1-mini. See `single_user_india_local_ai.md` Post-Session Update Sep 1 2026.

---

## 📋 Quick Navigation
0. [Methodology & Status Taxonomy](#0-methodology--status-taxonomy-synced-sep-2-2026-to-llm-releasescom)
1. [Confirmed Upcoming](#1-confirmed-upcoming)
2. [Recently Released — Last 30 Days](#2-recently-released--last-30-days-aug-1-29-2026) — incl. [Gap-fill Sep 2](#gap-fill-sync--10-models-from-llm-releasescom-missing-in-local-tracker-sep-2-2026-)
3. [Pricing Changes](#3-pricing-changes--last-30-days)
4. [Benchmark Leaderboard Snapshot](#4-benchmark-leaderboard-snapshot-aug-29-2026)
5. [Hardware Announcements](#5-hardware-announcements)
6. [Watch List — Next 30 Days](#6-watch-list--next-30-days-sep-2026)
7. [Changelog — Audit Log](#7-changelog--append-only-audit-log-synced-to-llm-releasescomchangelog)
A. [Hardware Fit Matrix](#appendix-a-hardware-fit-matrix-q4-weights-aug-29--sep-1--sep-2-sync)
B. [₹ Pricing Quick Reference](#appendix-b--pricing-quick-reference-aug-29-9512usd--updated-sep-2)

---

## 0. Methodology & Status Taxonomy (synced Sep 2, 2026 to llm-releases.com)

> **Adopted from `llm-releases.com/methodology`** — detection via primary-source crawler (labs blogs/model cards/API changelogs/leaderboards) → LLM schema extraction → automated validation (domain/date/benchmark/license checks + confidence score) → **human review** (no auto-publish) → **append-only audit log** (every field change, deprecation/withdrawal traceable). This file now mirrors that taxonomy so cross-checks are 1:1.

| Field | llm-releases.com | Local adaptation |
|---|---|---|
| **Source fingerprint** | Official domain only, fingerprinted change detection | Manual: HF/org, `z.ai/blog`, `cohere.com/blog`, `api-docs.deepseek.com`, `llm-releases.com/models/<slug>` as secondary cross-check |
| **Benchmark label** | `self-reported` until independent `verified` (never silent merge) | Same: all scores `vendor-reported` unless `(AA)`/`(Scale)`/`(BenchLM)`/`(tbench.ai)` |
| **Status** | `Available` / `Preview` / `Announced` / `Rumored` / `Deprecated` / `Retired` / `Withdrawn` (+ `Frontier`/`Open`) | Added `Status` to each card below (e.g., Qwen3.8-Flash `Available` vs Flash-Next `Preview`, Thomson `Preview`, Hy-MT2 `Available`). Prior local "UNCONFIRMED" → `Announced-but-unconfirmed` / `Rumored` |
| **Lifecycle** | Single changelog for releases/updates/deprecations/retractions | New §7 Changelog below (append-only) — Sep 2 adds Hy4 preview, Parse 5, etc.; records `deepseek-chat` retired Jul 24 pattern |
| **License** | Resolved to family (MIT/Apache 2.0/Qwen Community 1.0/OpenMDW-1.1/Proprietary) | Same + INR TCO + Q4 VRAM + India street price (local differentiator llm-releases lacks) |
| **What local keeps** | Catalog only | INR ₹95.12/USD, HW fit (1×5090…DGX B300/Vera Rubin), tok/s, 5yr TCO, Scale-standardized vs vendor delta — not in llm-releases |

**Sep 2 sync result:** 10 gap models added §2 Gap-fill; Qwen3.8-Flash split (Available API vs Preview weights); GLM-5.2 Turbo reconciled as Available API tier (no weight). All cards now carry `Status` + `Source` line for audit.

---

## 1. CONFIRMED UPCOMING

> Sources: Elon Musk/X posts, leak reports (Geeky Gadgets, The Information), community trackers (Manifold, SkillBoss, AIToolsReview). All dates are estimates unless marked ✅ confirmed. No spec is final until official model cards exist.

| Model | Provider | Expected | Params (est.) | Key Claims | Source |
|---|---|---|---|---|---|
| **Grok 4.7** | xAI | **~Sep 12, 2026** | **~2.1T total** | "Better than 4.6 in every way, except slightly slower; better token efficiency." Fed with massive SpaceX engineering data during supplemental training. | Elon Musk X post Jul 28 & Aug 12, 2026; Manifold 85% probability; techjournal.org Aug 23 |
| **Qwen4 family** | Alibaba | Sep–Fall 2026 | Unknown (Qwen3.8-Flash-Next is the architecture preview) | Qwen3.8-Flash-Next (125B/6B, Aug 26) described as "early preview of the architecture that will underpin Qwen4." Advanced 3D coding & design capabilities leaked. | Geeky Gadgets / World of AI leak Jul 20; yottalabs.ai Aug 28; "Rumors point to fall 2026" |
| **Kimi K4** | Moonshot AI | 2026 (no date) | Unknown | The Information (Jul 29) reports Moonshot seeking additional Nvidia Blackwell chips for next-gen model. No name, params, or timeline from Moonshot itself. **Treat as rumor.** | The Information ~Jul 29 (one report, unconfirmed by Moonshot) |
| **Claude Haiku 5** | Anthropic | Unknown | Unknown | SkillBoss tracker lists as forthcoming; described as "next-gen ultra-fast, low-cost Claude tier, targeting sub-200ms TTFT for high-volume agent traffic." Unconfirmed. | SkillBoss upcoming-models page (Aug 2026) |
| **GPT-5.7 / next GPT** | OpenAI | Unknown | Unknown | No official announcement. SkillBoss lists speculatively. Treat as no-evidence rumor. | SkillBoss (speculation only) |
| **GLM-5.4 / next GLM** | Z.ai | Unknown | Unknown | GLM 5.5 had been an analyst forecast (JPMorgan/Reuters) for Aug 2026; GLM-5.3 shipped instead. Next release trajectory is Sep–Oct 2026, no announcement. | JPMorgan note (CGTN/Reuters); no Z.ai commitment |
| **Tencent Hy4 (full release)** | Tencent | Weeks after Aug 28 preview | ~770B/49B | Hy4 preview shipped Aug 28 (Apache 2.0, $0.834/$2.501). "Next Hy4 batch expected soon; official Hy4 release not far off." | tencent.com Aug 28; local_ai_coding_models.md Aug 29 |
| **MAI-Code 2 / next MAI** | Microsoft | Unknown | Unknown | MAI-Code-1.1-Flash (Aug 11) interim; **MAI-Thinking-1 now Public Preview Aug 12** (~962B/34.7B, 52.8% SWE-Pro, 46.0% TB2.0, 256K, TBD pricing) — see §2 Released card; next MAI 2 unscheduled. | microsoft.ai/models/mai-thinking-1 Aug 12; github.blog Aug 11 |
| **A.X K3** | SK Telecom | 2026–2027 | Unknown | Korea's Dokpamo sovereign-AI program is in phase-2 evaluation; A.X K2 (688B/33B, Jul 29) is current release. K3 not announced. | Thunder Compute blog; no SKT announcement |
| **K-EXAONE 3.0** | LG AI Research | 2026–2027 | Unknown | K-EXAONE 2.0 (750B/37B, Jul 31) is current. No K3.0 announcement. | No confirmed source |
| **IBM Granite 4.3** | IBM | Unknown | Unknown | Granite 4.2 (Aug 25, 3B/8B/30B) just shipped. No 4.3 announcement. | Speculative; no IBM roadmap |

---

## 2. RECENTLY RELEASED — LAST 30 DAYS (Aug 1–Sep 2, 2026)

> Listed roughly newest-first. For each: HF repo verified where noted. India hardware fit uses Q4 weights.

---

### Qwen3.8-Max-0902 — Alibaba (Qwen) — Sep 2, 2026 ⭐ (post-training refresh, not new base)

- **Params:** 2.4T total / 95B active MoE, **1M ctx** (same base as Aug 3 Qwen3.8-Max; refreshed post-training, not new architecture). Dated suffix `0902` like DeepSeek `V3-0324`; old checkpoint remains addressable via `qwen3.8-max`.
- **License:** Proprietary (QwenCloud API-only; no new weights — Aug 3 base `Qwen3.8-2.4T-A95B` remains latest open weights). Same `qwen3.8-max` custom license (attribution >100M MAU / $20M/mo; MaaS >$50M/yr separate license).
- **Context:** 1M (same).
- **Pricing:** **$2.00 / $6.00 per Mtok** (QwenCloud `qwen3.8-max-0902`, cache $0.17 explicit / $0.25 implicit) — **unchanged vs Aug 3 Max** (verified `qwencloud.com/models/qwen3.8-max-0902` + `gate.com/news 2026-09-02`; earlier $5.07/$1.014 claim not found — likely confusion with preview pricing).
- **Benchmarks (lab, post-training gains vs Aug 3 checkpoint, not vs rivals):**
  - Terminal-Bench 3.0: **29.0% vs 11.3%** (+17.7, 2.6×) — hardest CLI v3.0
  - DeepSWE 1.1: **69.3% vs 56.6%** (+12.7)
  - NL2Repo-Bench: **64.9% vs 55.9%** (+9.0)
  - QwenSWEBench V2: **70.0% vs 55.1%** (+14.9, ahead Opus 5 68.0% / Fable 5 67.1% per Qwen)
  - CoWorkBench: **76.1% vs 74.8%** (+1.3)
  - Toolathlon-Verified: **73.3% vs 72.5%** (+0.8)
  - JobBench: **64.0% vs 53.4%** (+10.6)
  - AutomationBench: **50.8% vs 27.2%** (+23.6)
  - MMMU-Pro: **82.7% vs 82.3%** (+0.4, flat multimodal)
  *All vs Aug checkpoint per `aireleasetracker.com/model/qwen/qwen3.8-max-0902` + `gate.com`; vs Claude relevant: Qwen0902 beats Opus 5 on QwenSWEBench V2 (70.0 vs 68.0) and NL2Repo (64.9 vs 55.9).*
- **Open weights:** ❌ None for 0902 (API-only refresh).
- **Q4 VRAM:** ~1.2 TB at Q4 (same as base Max) — data-center multi-node only.
- **India relevance:** Same infra as Max; eval 0902 via API if already on Max — gains are coding/cowork only, multimodal flat.
- **Status:** **Available** (Sep 2, API-only) | **Source:** `aireleasetracker.com/model/qwen/qwen3.8-max-0902` + `qwencloud.com/models/qwen3.8-max-0902` → `gate.com/news`
- **Verdict:** Refresh, not new model — unchanged base/ctx/price, large coding jump (TB3 2.6×, DeepSWE +12.7). If routing Max, point to `0902` snapshot; if self-hosting, stick to Aug 3 weights (latest available).

---

### Gemini 3.8 Flash — Google — Sep 2, 2026 (Available, Proprietary)

- **Params:** Undisclosed (Flash tier, built on **Gemini 3.7 Flash** base — not new base model). **Context:** 1,048,576 (1M) + 65,536 out, text/image/video/audio/PDF → text, thinking **LOW/MEDIUM (default)/HIGH** (minimal not supported).
- **License:** Proprietary — GA on Gemini app (AI Pro/Ultra, AI Mode, Sheets) + Antigravity/AI Studio/Gemini API (`gemini-3.8-flash`); **Flash Cyber** variant (Sep 2) is restricted Fairwind Program (vuln detection/patching).
- **Pricing:** **$0.75 / $3.75 per Mtok** (intro through Dec 31, 2026) → **$1.50/$7.50 std** Jan 1 2027 (cache $0.075→$0.15, storage $0.50→$1.00/h). Same as 3.7 Flash — no price hike for gains. **₹71.34/₹356.70 intro, ₹142.68/₹713.40 std.**
- **Benchmarks (Google, vs 3.7 Flash, same 1M envelope):**
  - **DeepSWE:** **73.7%** (Google table) — vendor's largest published coding leap
  - **AA Index:** **59 (HIGH)** vs 3.7 Flash 56 ( +3), **57 (MEDIUM)** vs Terra/Spark 1.2 57, **52 (LOW)** vs 3.6 Flash 52 — agentic-driven
  - **t³-Banking:** **45%** (+12 vs 3.7) + **Terminal-Bench 4.0 19.1%** (vs 11.2%), **BioMysteryBench Human Difficult 56.5%** (vs 43.5%)
  - **Trade:** ~30% more output tokens/task (≈48k vs 37k) → **cost/task ≈$0.58 at HIGH** despite same per-token price (vs 3.7 Flash cheaper per task)
  *Source: `blog.google/.../3-8-flash-and-3-8-flash-cyber` + `storage.googleapis.com/.../gemini_3-8_flash_model_evaluation.pdf` + `felloai.com/gemini-3-8-flash` (Sep 2) — all vendor/third-party-reported, not independent.*
- **Open weights:** ❌ Proprietary
- **Q4 VRAM:** N/A
- **India relevance:** Same price as 3.7 Flash until Dec 31 — upgrade if long agentic coding (7–12 pt gains) and can absorb +30% tokens; keep 3.7 Flash for efficiency-first short tasks. Flash Cyber not relevant (gated).
- **Status:** **Available** Sep 2 | **Source:** `blog.google` Sep 2 + `llm-releases.com/models/gemini-3-8-flash` (AA 59) + `felloai` (73.7% DeepSWE)
- **Verdict:** Fourth Flash in <4 months — incremental on same base, agentic +10–12 pts at 30% token cost. Best Gemini workhorse until Pro ships.

---

### Muse Spark 1.3 — Meta — Sep 2, 2026 (Available + Preview max) ⚠️ AA re-scored to 48

- **Params:** Undisclosed (Muse Spark family, 1M ctx, text/image/video → text, thinking modes). Fourth Muse Spark in 5 months (1.1 Jul 9 → 1.2 Aug 5 → 1.3 Sep 2).
- **License:** Proprietary — GA on `muse-spark-1.3` (xhigh) via Muse Code + Meta Model API (`muse-spark-1.3` / `muse-spark-1.3-contributor`); **max reasoning** variant in limited partner preview (safety testing).
- **Pricing:** **$1.25 / $4.25 per Mtok** (standard) + **$0.15 cache hit** (88% cache discount); **contributor $0.10/$0.20** (≈10–20× cheaper, Meta trains on your traffic). Same list as 1.2.
- **🔥 CORRECTION Sep 8 (live AA re-score):** Sep 2 launch reports cited **AA 61 (xhigh) / 62 (max)** — after AA moved to the **Intelligence Index v4.3** (adds Terminal-Bench v4.0, GDP.pdf, CritPt, AA-LCR v1.1) **Muse Spark 1.3 (max) now measures AA = 48 (#13/202)** — well above class median (24) but **not frontier** and far below the 61/62 claimed at launch. Treat all launch-day vendor/AA numbers as superseded; use 48 for routing decisions.
- **AA live details (max variant, `artificialanalysis.ai/models/muse-spark-1-3`):**
  - AA Intelligence Index: **48** (#13/202)
  - Cost per Intelligence Index task: **$1.60**
  - Output speed: **236.8 tok/s** (fast); **TTFT 26.9s** (high — think-heavy)
  - **170M output tokens** on the index (very verbose; median 90M) — verbosity is a real cost drag
  - 1M ctx; text/image/video in → text out
- **Benchmarks (Meta, launch-day):**
  - **~20% fewer tool calls and ~25% fewer tokens** than Spark 1.2 on Meta's internal coding comparisons (efficiency, not raw score)
  - **Agentic/scientific largest drivers** — 1.2→1.3 jump ~35% agentic tasks (Meta)
  - **Adversarial robustness:** improved prompt-injection resistance + better calibration on irreversible actions (Meta)
  *Source: `research.meta.ai/blog/introducing-muse-spark-1-3` (Sep 2) + `artificialanalysis.ai/models/muse-spark-1-3` (live, Sep 8).*
- **Open weights:** ❌ Proprietary (Meta says open-weights release imminent — community 98.1% MRCR 512K–1M claim if verifies; not yet on HF)
- **Q4 VRAM:** N/A
- **India relevance:** Still a good fast/cheap-for-batch option at $1.25/$4.25 (contributor $0.10/$0.20) with 1M ctx + Muse Code harness — but at AA 48 it is **not** a Sol/Fable 5.1-class routing pick. Reclassify: efficient workhorse, not frontier.
- **Status:** **Available** (xhigh GA Sep 2) + **Preview** (max) | **Source:** `research.meta.ai` Sep 2 + `artificialanalysis.ai` live AA 48 (Sep 8), v4.3 index
- **Verdict:** Launch-day AA 61/62 was inflated under the old index metrics. Under v4.3 it's a mid-tier intelligence at a good price with great speed — strong for high-volume/budget agentic work, not for hard frontier tasks. Flag any downstream table using 61/62.

---

### GPT-6 Astra — OpenAI — Sep 3-4, 2026 ⭐⭐ (staged: Daybreak → API/ChatGPT)

- **Params:** Undisclosed (est. ~1.05M ctx, 128K max out). Multimodal: text + image + video + audio → text. Published Apr 30, 2026 knowledge cutoff.
- **License:** Proprietary — staged: **Daybreak enterprises first** (same gate as 5.6-Cyber), then ChatGPT Plus/Pro/Bus/Ent, **AWS Bedrock + Azure**. Enterprise = off by default on rollout.
- **Pricing:** **$10/$50 per Mtok** (₹951/₹4756), **cache $1.00** (90% off, same structure as Fable 5.1). **2.5× Sol** current promo ($4/$20) → $10/$50 post-promo Nov 21. **Astra Pro** (higher-quality reasoning mode) Sep 4, same pricing tiers, 1.05M ctx.
- **Benchmarks (OpenAI vendor):**
  - ARC-AGI-3: **99.9% vendor scaffold** / **62.7% neutral** (scaffold overstates: transfer state preservation in their harness) — ARC Prize team says not AGI, first to solve interactive learn-on-fly at scale on their benchmark
  - FrontierMath Tier 4: **97.6%**
  - GPQA Diamond: **96.0%**
  - Terminal-Bench 4.0: **57.9%** (highest closed model — Fable 5.1 55.8, Sol 37.3, Opus 5 52.3) — *verified OpenAI blog + Artificial Analysis (single source)*
  - Terminal-Bench-Science 0.1: **64.6%** (vs 52.6 Fable 5.1)
  - OSWorld 2.0: **72.6%** (fast agentic — ~40 min vs Sol 65.7% ~75 min) — *verified OpenAI blog + 8+ mirrors*
  - ExploitBench (uncontaminated Jun-Aug 2026): **39%** vs Sol 5.5% (critical cyber threshold) — *verified OpenAI blog + 8+ mirrors*
  - HLE (with tools): **57.2%** (below Fable 5.1 65.0% — hallucination cut from 92%→51% at max effort vs Sol, but not fully closed)
  - SRE-Bench: **88.0%** (ie infra/ops workflows)
  - AutomationBench: **41.4%** (vs Fable 5.1 31.4, Sol 18.1) — *confirmed 2× (Vellum + MindStudio, both citing OpenAI's launch table)*
- **AA Intelligence Index v4.1.1:** **61.2** (vs Fable 5.1 65.7, Opus 5 63.1, Sol 60.9) — *confirmed by Artificial Analysis's own article*
- **AA Coding Agent Index:** **67** (equals Fable 5, at ~lower cost: Sol-quality price, ~3× fewer tokens than Sol at max effort; not yet at Fable 5.1 70) — *⚠️ 1 source only (MindStudio secondary blog), not corroborated on AA's own site — re-verify before tabling*
- **Cost per task (AA):** **~$1.67 max effort** (~75% pricier/task than Sol at max, off offset by ~3× token efficiency) — *⚠️ 1 source only, not AA-measured yet*
- **DeepSWE v1.1:** **74.1%** (loses to Muse Spark 1.3 75.4) — *⚠️ 1 source only (alphacorp), no second confirmation*
- **Strategy:** Not a clean win. TB/OSWorld strongest, but DeepSWE loses to Muse Spark 1.3, HLE below Fable 5.1, SWE-bench not published at scale.
- **Cyber gating:** Same Daybreak Red program as 5.6-Cyber — accept to enterprise via this gate. Not generally available to all.
- **Verdict:** Strongest for agentic/ops/OS. HLE + DeepSWE less than Spark 1.3 + Fable 5.1. Worth route by task type, not overall best.

---

### MiniCPM5-2B — OpenBMB — Sep 7, 2026 (Available, Apache 2.0)

- **Params:** ~2.5B dense. **Context:** 131K. Text (+ vision). Apache 2.0, small/local-class.
- **License:** Apache 2.0 ✅ — fully open weights.
- **Benchmarks (vendor-reported):** Averages **53.9** across 34 benchmarks (code / math / instruction / tool / agentic) — claimed **strongest open model under 4B**.
- **Q4 VRAM:** ~1.5-2 GB — runs on phones / laptops / edge without quantization gymnastics.
- **Open weights:** ✅ HF `openbmb/MiniCPM5-2B` (verified trackers Sep 7).
- **India relevance:** No GPU required; useful for on-device/offline assistants, keyboards, and low-end CI. Not router-tier — a completeness add, not a frontier one.
- **Status:** **Available** Sep 7 | **Source:** OpenBMB HF + trackers (llm-releases.com / BenchLM)
- **Verdict:** Edge/small local model — strong value in the <4B class, irrelevant to frontier coding.

---

### DeepSeek V4.1 Flash — DeepSeek — Sep 10, 2026 (Available, Proprietary) ⭐

- **Params:** Undisclosed (Flash-line iter on V4 Flash 0731; native multimodal). **Context:** 1M (same family). **Speed:** 333–400+ tok/s (vendor).
- **License:** Proprietary — API GA Sep 10; HF model card live Sep 10.
- **Pricing:** Routes older V4 Flash; **60% cached-input price cut** vs V4 Flash 0731 (effective Sep 10). Peak/off-peak structure retained; cache cheaper.
- **Benchmarks (vendor, Sep 10):** Stronger / faster / cheaper than V4 Flash 0731; out-performs prior Flash/Pro on several axes (multimodal reasoning, coding throughput). Specific independent numbers pending.
- **Open weights:** ❌ None (API-only).
- **India relevance:** Native multimodal at Flash pricing with cheaper cache = strong for agentic pipelines with visual context; major upgrade to API tier.
- **Status:** **Available** Sep 10 | **Source:** DeepSeek API GA Sep 10, HF, BenchLM/llm-releases.com Sep 10
- **Verdict:** Full GA of the beta tracked Sep 7-8; routes existing V4 Flash conversations, upgrades multimodal and throughput. Worth immediate eval vs V4 Flash Vision.

---

### Ling-3.0-flash-Sante — inclusionAI (Ant Group) — Sep 4, 2026 (Available, vertical)

- **Params:** 124B total / ~5.1B active MoE, **262K ctx**, text-only — medical/health-tuned variant of Ling-3.0-flash (base already tracked as Ling-Fin §2 Gap-fill).
- **License:** free-tier access noted on OpenRouter-style routes; API first.
- **Benchmarks:** No independent scores; vertical-specialist positioning only.
- **Open weights:** Not confirmed (Ling base is API-only per Sep 2 sync — treat same here).
- **India relevance:** Niche; only if health-domain local pipelines matter. Completeness add.
- **Status:** **Available** Sep 4 | **Source:** trackers (ThursdAI / BenchLM) — no primary model card seen
- **Verdict:** Vertical variant of an already-tracked family; low strategic weight.

---

### K2 Horizon family (6 models) — IFM (MBZUAI) — Sep 3, 2026 ⭐ Rare fully-open release

- **Params:** 6 models spanning **0.9B → 375B-A23B** MoE (flagship 375B/A23B). Apache 2.0.
- **License:** Apache 2.0 ✅ — and **fully open beyond weights**: training data + code + configs + intermediate checkpoints + training logs published. Rare "truly open" release, not just open-weight.
- **Benchmarks (vendor):** Flagship 375B ≈ **47 AA Index** — solid mid-tier, not frontier; improves with scale tier.
- **Open weights:** ✅ + full training recipe/dataset/checkpoints.
- **Q4 VRAM:** 375B-A23B ≈ ~200 GB Q4; 0.9B ≈ <1 GB. Scales from laptop to server.
- **India relevance:** The 375B-A23B is a credible expensive-tier self-host candidate; smaller tiers suitable for edge. Unique for reproduction/fine-tuning research because of the full stack.
- **Status:** **Available** Sep 3 | **Source:** IFM (MBZUAI) release + trackers — verify HF listing before tabling Q4 sizes
- **Verdict:** Notable for openness (full data+code+checkpoints) rather than for benchmark leadership. Watch if fine-tuning/research matters; ignore for frontier routing.

---

### Quasar 438B — Multiverse Computing — Sep 2, 2026 (Released, niche)

- **Params:** 438B (per tracker listing). Confirmed Sep 2 by BenchLM / ThursdAI.
- **License:** TBD in public trackers.
- **Benchmarks:** Sparse details in public trackers; niche/quantum-adjacent positioning (Multiverse Computing's usual space), not frontier coding.
- **Open weights / Q4 VRAM / pricing:** Not confirmed in public sources as of Sep 8.
- **Status:** **Announced-but-unconfirmed** (release Sep 2 listed; details thin) | **Source:** BenchLM + ThursdAI only
- **Verdict:** One line in the catalog for completeness; do not budget around it until primary specs appear.

---

### Claude Fable 5.1 / Mythos 5.1 — Anthropic — Sep 1, 2026 ⭐⭐ (same model, different guardrails)

- **Params:** Undisclosed (Mythos-class, above Opus). **Context:** 1M tokens (same as Fable 5). **Knowledge cutoff:** Nov 30, 2025 (carryover from Fable 5).
- **License:** Proprietary — **Fable 5.1 Available** GA on Claude Platform/AWS/GCP/Azure (`claude-fable-5-1`); **Mythos 5.1 Preview-gated** via Cyber Verification Program / Life Sciences Verification Program (US govt-partnered). Same weights, safeguard delta only.
- **Pricing (Sep 1, anthropic.com):** **$10.00 / $50.00 per Mtok** (unchanged vs Fable 5) — **cache reads 75% cheaper: $1.00 → $0.25 /M** → **~25% cheaper typical workload, ~45% cheaper highly agentic** (Anthropic 4-week Aug measurement, log-scale cost charts). **₹951.20 / ₹4,756.00 / ₹23.78 cache per Mtok**. Zero data retention via Enterprise Frontier Safeguards (customer-controlled cloud, phased fall 2026; interim ZDR for eligible).
- **Safeguards:** Biology 85% fewer false positives vs Fable 5 launch (elementary/medical queries); cyber 60% fewer interventions/session in Claude Code; Fable 5.1 now allowed for vulnerability discovery (not exploit dev). Mythos lifts select bio/cyber restrictions. Anti-distillation: new accounts cannot edit prior Claude context while preserving thinking transcript.
- **Benchmarks (all vendor, production safeguards on, ±3.5–4.5 SE on TB-Science):**

| Benchmark | Fable 5.1 | Mythos 5.1 | Fable 5 | Opus 5 | GPT-5.6 Sol |
|---|:---:|:---:|:---:|:---:|:---:|
| **Terminal-Bench-Science 0.1** (agentic sci) | **52.6%** | — | 24.7% | 29.0% | 22.4% |
| **Terminal-Bench 4.0** (agentic coding) | **55.8%** | **60.9%** | 42.0% | 52.3% | 37.3% |
| **GDPval-AA v2** (knowledge work) | **1853** | — | 1723 | 1824 | 1711 |
| **OSWorld 2.0 strict / partial** | 41.7% / **77.9%** | — | 36.1% / 72.9% | 39.6% / 75.4% | — |
| **HLE no-tools / with-tools** | 60.9% / **65.0%** | — | 57.8% / 63.8% | 56.6% / 63.6% | — |
| **AutomationBench** | **31.4%** | — | 17.1% | 26.9% | 19.6% |
| **CursorBench 3.2** | **73.4%** | — | 70.5% | 70.0% | 67.2% |

  *Source: `anthropic.com/claude-fable-and-mythos-5-1` (Sep 1, 2026). Fable 5/Opus 5 re-run on Aug 2026 task releases for TB-Science/OSWorld — not comparable to old publishes. No independent AA/Scale rerun yet.*
- **Open weights:** ❌ Proprietary (no weights; API/Claude Code/Cowork/Foundry only)
- **Q4 VRAM:** N/A (closed)
- **India relevance:** Best closed coder/researcher per Anthropic, but at $10/$50 (₹951/₹4,756) vs Opus 5 $5/$25 (₹476/₹2,378) — still 2×. Cache cut makes agentic loops 45% cheaper; ZDR via EFS matters for India data-residency (customer-cloud storage, not Anthropic). Watch for AA Coding Index — will test if 5.1 reopens gap over Opus 5 that 5.0 had closed.
- **Status:** **Fable 5.1 Available**, **Mythos 5.1 Preview-gated** (`llm-releases.com` not yet indexed as of Sep 2 — catalog Sep 2 latest Aug 28) | **Source:** `anthropic.com/claude-fable-and-mythos-5-1` → `platform.claude.com` `claude-fable-5-1`
- **Verdict:** First Sep frontier release; doubles sci/coding scores at same list price with cheaper cache — strongest Anthropic closed tier since Jun 9. For India self-host comparison, price not competitive vs GLM-5.3-Flash ($0.15/$0.50) / Qwen3.8-Flash ($0.15/$0.47) — evaluate on capability, not cost.

---

### Mercury 2.5 — Inception — Sep 8, 2026 (Available, Proprietary) ⭐

- **Params:** Undisclosed (diffusion LM, not MoE/diffusion-transformer). **Context:** 260K (65K out), text → text, reasoning + tool calling (parallel tool calls) + schema JSON + tunable reasoning.
- **License:** Proprietary — GA Sep 8 via Inception API + OpenRouter `inception/mercury-2.5` (API-only, not open weights). Diffusion, not autoregressive.
- **Pricing:** **$0.20 / $0.75 per Mtok** (Inception list); **$0.04/$0.15 promo on OpenRouter** (80% promo, not list — store effective date). Cost model should keep both.
- **Benchmarks:** Inception claims **~1,107 tok/s** (standard GPUs), **+10 intelligence vs Mercury 2**, comparable to **Luna Low / Gemini Flash-Lite / Haiku 4.5** (cost-optimized frontier). Full release confirms diffusion speed/cost profile; no public benchmark table yet (BenchLM Aug 31: 0 sourced rows). Verify on workload.
- **Open weights:** ❌ Proprietary (diffusion architecture recorded as unknown)
- **Q4 VRAM:** N/A (API-only; not self-hostable)
- **India relevance:** Latency-sensitive search agents / voice pipelines / coding subagents where sub-300ms TTFT + 5–7× throughput + 70% lower cost/task matter more than absolute frontier score. Stable GA vs preview.
- **Status:** **Available** Sep 8 | **Source:** `inceptionlabs.ai` Sep 8 GA + `openrouter.ai/inception/mercury-2.5` + `llm-releases.com` Sep 8
- **Verdict:** Novel diffusion paradigm — speed/cost frontier, not intelligence frontier. Evaluate vs Gemini Flash-Lite / Luna Low on latency/price, not vs Fable/Opus.

---

### Tencent Hy4 Preview — Tencent — Aug 28, 2026 ⭐⭐

- **Params:** 770B total / 49B active. MoE: 78 layers (1 dense + 77 MoE), 256 routed experts + 1 shared, top-8 active per token. Gated DSA attention. 1 native MTP (10B/0.7B head).
- **License:** Apache 2.0 ✅ (no revenue gate confirmed)
- **Context:** 1M+ tokens
- **Benchmarks (all vendor-reported, Tencent appendix):**
  - Terminal-Bench 2.1: **85.4%** — ties Claude Opus 5 85.4%, -2.8 vs GLM-5.3 88.2
  - DeepSWE: **64.3%** — +36.3 vs Hy3 28.0, -2.6 vs GLM-5.3 66.9
  - SWE-bench Pro: **65.7%** (vendor)
  - SWE Multilingual: **82.9%**
  - Toolathlon-Verified: **74.1%** (ahead Qwen3.8-Max, Sol — vendor)
  - APEX-Agents: **37.1%** (~= K3 37.2%)
  - Internal blind eval (163 experts × 203 tasks): **2.99/4.00** vs GLM-5.3 2.92 / K3 2.94. Tencent-run, not independent.
- **Pricing:** API $0.834 / $2.501 per Mtok (TokenHub + OpenRouter). **₹79.30 / ₹237.93 per Mtok**. Free 2 weeks on WorkBuddy / CodeBuddy / Yuanbao / ima. Hy3 free extended to Sep 30.
- **Open weights:** ✅ HF: `tencent/Hy4-preview` + `Hy4-preview-FP8`; also ModelScope / GitCode / CNB
- **Q4 VRAM:** ~385 GB at Q4 → data-center class only
- **India relevance:** 1× DGX B300 (2.1 TB) ✅ comfortable; 4× DGX Spark (512 GB) ✅ Q3 only. No sub-crore path. Apache 2.0 = cleanest commercial license of any frontier 700B+ model.
- **Verdict:** Top-tier open-weight Qwen4 challenger; Apache 2.0 is the big deal. Preview quality unproven independently — evaluate before adding to router.

---

### Z.ai GLM-5.3 (Open Weights) — Z.ai — Aug 27, 2026 ⭐

- **Params:** 743B total / 40B active. Hybrid attention (DSA + IndexShare sparse). Same base as GLM-5.2; all gains from post-training (IndexShare + SAO RL).
- **License:** ⚠️ Custom Z.ai license reported as "other" on HF — Reuters >$10B revenue review gate **unconfirmed**; treat as caution. NOT MIT. Different from GLM-5.3-Flash (MIT) and GLM-5.2 (MIT).
- **Context:** 1,048,576 tokens (1M)
- **Benchmarks (vendor-reported at API launch Aug 14):**
  - Terminal-Bench 2.1: **88.2%** (#2 open-weight, ties K3 88.3)
  - DeepSWE v1.1: **66.9%** (updated Aug 20: **69.0%** ±3% per BenchLM mirror `(BenchLM)`)
  - AutomationBench: **48.2%** (best open-weight)
  - CyberGym: **84.5%** (defensive security, #1 overall)
  - HLE (w/ tools): **62.5%**
  - Terminal-Bench 3.0: **28.3%** (vs Sol 34.6%)
- **Pricing:** $1.40 / $4.40 per Mtok (cached $0.26). **₹133.17 / ₹418.53 per Mtok**
- **Open weights:** ✅ HF: `zai-org/GLM-5.3` — 141 Safetensors shards, ~756 GB download (FP8 + BF16). Supports Transformers / vLLM / SGLang.
- **Q4 VRAM:** ~372 GB at Q4
- **India relevance:** 1× DGX B300 (2.1 TB) ✅ 30s NVMe→HBM swap; 4× DGX Spark (512 GB) ✅ at Q3. **Revenue gate note:** HF license shows "other"; Reuters >$10B review claim unverified Sep 1 — verify current license text before commercial MaaS deployment.
- **Verdict:** Strongest self-hostable coding + cyber-security model as of Aug 29. License text is "other" on HF as of Sep 1; verify before commercial use. GLM-5.3-Flash (MIT, 160 GB) is the cleaner commercial pick at similar quality.

---

### Qwen3.8-Flash — Alibaba — Aug 26, 2026 (Managed API, Proprietary) ⭐

- **Params:** 125B total / 6B active — same Qwen4-preview MoE as Flash-Next (512 experts, 10 routed + 1 shared; ~180B stored inc. 51B N-gram embedding + 4B MTP). Gated DeltaNet + Qwen Sparse Attention.
- **License:** Proprietary / API-only — distinct catalog row from open-weight Flash-Next (per `llm-releases.com/models/qwen3-8-flash` vs `.../qwen3-8-flash-next`). Not Qwen Community 1.0.
- **Context:** **1M** (managed default, built-in tools, text/image/video → text) vs Flash-Next 262K native →1M YaRN
- **Benchmarks:** Inherits Flash-Next vendor numbers (Claude Code harness): SWE-Pro **62.5%**, DeepSWE **58.7%**, LCB **91.9%** — verify independently; no separate API-only benchmark table.
- **Pricing (QwenCloud, verified Aug 27–28):** **$0.15 / $0.47 / $0.016 cached per Mtok** — **₹14.27 / ₹44.71 / ₹1.52 per Mtok** (CN ¥0.8/¥2.7/¥0.1). Promo: same rate on OpenCode Go flat-rate. `Source: qwencloud.com/models/qwen3.8-flash + openrouter.ai/qwen/qwen3.8-flash`
- **Open weights:** ❌ None — API-only (Open weights are `Qwen3.8-Flash-Next` below)
- **Status:** **Available** (`llm-releases.com` Aug 26) — managed GA, not Preview
- **India relevance:** Cheapest frontier API in tracker at $0.47/M out; 6B active = ~2× cheaper to serve than Qwen3.8-27B (27B). Use for API tier; self-host Flash-Next for local tier.

---

### Qwen3.8-Flash-Next — Alibaba — Aug 26, 2026 ⭐⭐ (Preview, Open weights)

- **Params:** 125B total / 6B active. Plus 51B N-gram embedding + 4B MTP. 48-layer hybrid: 36 linear-attention (Gated Delta Network / GDN) + 12 full-attention (Qwen Sparse Attention / QSA). 512 experts, 10 routed + 1 shared. Trained with Muon + AdamW.
- **License:** Qwen Community 1.0 (not Apache 2.0; not MIT). Open weights, permissive for non-commercial and small commercial; revenue gates apply at scale — check license.
- **Context:** 262,144 native (extensible to 1M via YaRN)
- **Status:** **Preview** (`llm-releases.com/models/qwen3-8-flash-next` Aug 26) — experimental Qwen4 preview, catalog/self-host only
- **Benchmarks (all vendor-reported from HF README, Aug 26):**
  - DeepSWE 1.1: **58.7%** (vs DeepSeek V4 Flash 0731: 54.4%)
  - SWE-bench Pro: **62.5%** (vs V4 Flash: 56.0%)
  - NL2Repo: 48.1 (vs V4 Flash: 54.2 — Flash wins here)
  - AndroidWorld: **84.5%** (vision)
  - MathVision: 90.6 / 95.7
- **Pricing:** No hosted list price — self-host via Transformers/vLLM/SGLang/TokenSpeed. Managed twin is `Qwen3.8-Flash` above at $0.15/$0.47.
- **Open weights:** ✅ HF: `Qwen/Qwen3.8-Flash-Next` (verified Aug 26–28). BF16 post-trained checkpoint. Q4_K_XL ~111 GB (Unsloth).
- **Q4 VRAM:** ~111 GB at Q4 (Unsloth Q4_K_XL). Fits **1× Pro 6000 (96GB)** ✅ with offload room; **3× RTX 5090 (96GB total)** ✅ comfortable; **4× DGX Spark (512GB)** ✅.
- **India relevance:** At $0.15/$0.47 this is the cheapest Qwen-family production API. 6B active params = ~2× cheaper to self-serve per token than Qwen3.8-27B (27B active). This is the Qwen4 architecture on the ground today.
- **Verdict:** 🔴 **IMPORTANT GAP in prior files.** Best-in-class efficiency for coding with a Qwen-family model. SWE-Pro 62.5 at $0.47/M output = exceptional cost-per-point. Add immediately to top-10 router MVP list. The Qwen4 preview framing makes it strategically significant for roadmap planning.

---

### Z.ai GLM-5.3-Flash — Z.ai — Aug 26, 2026 ⭐⭐

- **Params:** 320B total / 18B active. MoE: 45-layer hybrid (KDA linear-attention + NoPE sparse MLA). 8 of 288 experts active. Ran as anonymous `stealth/ox-alpha` on OpenRouter/OpenCode Aug 20–26 (~42T tokens on Chinese-made AI chips via custom SGLang, claimed 3× efficiency).
- **License:** MIT ✅ (verified on HF Aug 29; held through post-release)
- **Context:** 1,048,576 tokens (1M); 131K max output
- **Benchmarks:**
  - AA Intelligence Index: **57** `(AA)` — ties Claude Opus 4.8; behind Qwen3.8-Max (58) and Grok 4.6/Sol (61)
  - Terminal-Bench 2.1: **84.3%** (vendor)
  - DeepSWE v1.1: **63.4%** (vendor); BenchLM Aug 28 mirror confirms entry `(BenchLM)`
  - AutomationBench: **48.8%** (vendor)
  - HLE: 55.3 (vendor)
- **Pricing:** $0.15 / $0.50 per Mtok; cached: $0.03. **₹14.27 / ₹47.56 per Mtok**. Launch promo halves all rates (~$0.075/$0.25/$0.015) **through Sep 9, 2026**.
- **Open weights:** ✅ HF: `zai-org/GLM-5.3-Flash`. ~306 GiB FP8 checkpoint.
- **Q4 VRAM:** ~160 GB at Q4. Min 8-GPU Hopper-class node.
- **India relevance:** **4× DGX Spark (512GB)** ✅ fits comfortably, 25–35 tok/s estimated. **1× DGX B300 (2.1TB)** ✅ fast. MIT = cleanest commercial license at this performance tier. First natively multimodal GLM-5 (text + image + video in). ~2× faster per token than GLM-5.3 (18B active vs 40B) at similar coding performance. **Top-10 router MVP candidate.**
- **Verdict:** Best MIT-licensed model in the 60–65% DeepSWE tier. Price + license + multimodal = the default open-weight choice for many India deployments. Promo runs out Sep 9 — deploy now.

---

### IBM Granite 4.2 — IBM — Aug 25, 2026

- **Params:** 3B (40L/2560 dim), 8B (40L/4096 dim), 30B (64L/4096 dim). Dense decoder-only. GQA, RoPE theta 10M, SwiGLU, RMSNorm, BF16. MTP-trained. 8B and 30B trained with native CoT + multi-stage agentic RL for tool/code/terminal/web in sandboxed environments.
- **License:** Apache 2.0 ✅ (all sizes)
- **Context:** 131K base → **512K** extended (phase-5 pre-training)
- **Benchmarks:** Not yet on major coding leaderboards. IBM blog (Aug 25) claims improvements on enterprise agentic evals vs Granite 3.x — no standardized SWE-bench Pro or TB2.1 scores published.
- **Pricing:** Open weights only; no hosted IBM API price for Granite 4.2 at launch
- **Open weights:** ✅ HF: IBM Research collection (3B/8B/30B) + quantized variants live since Aug 7 internal; blog Aug 25.
- **Q4 VRAM:** 3B ~1.5 GB, 8B ~4 GB, 30B ~15 GB. **1× RTX 5090 (32GB)** ✅ all sizes. **1× Pro 6000 (96GB)** ✅.
- **India relevance:** ₹ cost = essentially free (self-host). Enterprise-ready Apache 2.0, native agent RL for 8B/30B. Best IBM model for local agentic workflows. Replaces Granite 3.x.
- **Verdict:** Not a frontier coding model but a strong enterprise Apache 2.0 option for teams needing tool-use + compliance + small footprint. 30B fits a ₹3.5L 5090 rig.

---

### DeepSeek V4 Flash Vision Exp — DeepSeek — Aug 21, 2026 (Available, MIT)

- **Params:** Vision variant of V4 Flash (284B/13B active MoE), identical to text V4 Flash 0731 with vision encoder added. Max output 384K.
- **License:** MIT ✅
- **Context:** **1.05M tokens** (1,048,576 + vision overhead; standard V4 Flash is 1M)
- **Benchmarks (now filled, vendor):**
  - Terminal-Bench 2.1: **83.9%** (vs V4 Flash 82.7% — vision adds +1.2)
  - DeepSWE: **59.3%** (vs V4 Flash 54.4% — multimodal agentic gain)
  - NL2Repo-Bench: **57.7%**
  - Previously: AA-evaluated reasoning max effort (no full table at launch) — now superseded by above
  *Source: gap analysis Sep 2 — TB 2.1 83.9 / NL2Repo 57.7 / DeepSWE 59.3; verify against `deepswe.datacurve.ai` / `tbench.ai` when independent reruns land.*
- **Pricing:** Same peak/off-peak as V4 Flash: **$0.22/$0.66 off-peak + $0.44/$1.32 peak** (effective Aug 16) — **off-peak $0.22 in / $0.66 out** per gap analysis (Sep 2 clarifies $0.22 not $0.11; cache $0.007/M). Vision input priced at text rate (no surcharge). **₹20.93/₹62.78 off-peak per Mtok**.
- **Open weights:** ✅ HF (vision variant). Repo: `deepseek-ai/DeepSeek-V4-Flash-Vision`
- **Q4 VRAM:** ~155 GB at Q4 (same as text V4 Flash)
- **India relevance:** **2× Pro 6000 (192GB)** ✅ ~240 tok/s at FP8; **4× DGX Spark (512GB)** ✅ 80–100 tok/s. Adds screenshot-to-code / repo-diagram analysis capability to the cheapest frontier-class coding model — now with quantified +1.2 TB gain.
- **Verdict:** Direct upgrade path from V4 Flash for teams doing agentic coding with visual context. No meaningful cost increase; benchmark fill confirms vision does not regress coding.

---

### GLM-5.2 Turbo — Z.ai — Aug 17, 2026 ⚠️ RECONCILED vs llm-releases.com

- **Local flag (Aug 29):** ⚠️ Single TechPillow blog source, no Z.ai HF/docs/pricing/OpenRouter primary — treated as **UNCONFIRMED**; scores (TB 2.1 81.0%, SWE-Pro 62.1%) matched GLM-5.2 base, likely conflation.
- **llm-releases.com view (Sep 2):** Listed as **Available / Proprietary** `llm-releases.com/models/glm-5-2-turbo` — sourced to `llmgateway.io/models/glm-5.2-fast` (API id `glm-5.2-fast`), **1M ctx**, host Z.ai + SCX.ai, **~$1.99/$6.16 per Mtok** (vs GLM-5.2 $0.55/$1.78 — premium fast tier). Params/arch/weights **Undisclosed**, no open-weight release; underlying base ~753B MoE MIT.
- **Reconciliation:** Turbo is **real as a hosted fast-serving tier**, not a separate weight release. Treat as **API tier** (like Qwen3.8-Flash vs Flash-Next), not a new checkpoint. No HF repo expected.
- **Params:** ~744B/40B base (if weight existed). Same GLM-5.2 MIT base.
- **License:** Proprietary (hosted tier); base weights remain MIT.
- **Context:** 1M (hosted). No separate weight context.
- **Benchmarks:** No independent table — llm-releases marks fields beyond ctx/pricing as conservative/unverified. Assume GLM-5.2 base scores unless Z.ai publishes.
- **Pricing:** **$1.99/$6.16 per Mtok** (llm-releases via LLM Gateway) — premium over GLM-5.2, fast-tier.
- **Open weights:** ❌ None for Turbo tier (base `zai-org/GLM-5.2` MIT remains).
- **Status:** **Available** (llm-releases) vs **Unconfirmed weight** (local) — reconciled as Available API tier, no weight.
- **Verdict:** Do not plan weight deployment. If on GLM-5.2 API, Turbo = latency-optimized tier at higher price — eval vs GLM-5.3 / GLM-5.3-Flash which beat it on 5.2→5.3 gains.

---

### MAI-Code-1.1-Flash — Microsoft — Aug 11, 2026

- **Params:** 138B total / 5B active MoE. Vision-capable (text + image → text). Pretrain cutoff: Dec 2025. Derived from MAI-Thinking-1's compressed 5B-active stack.
- **License:** Microsoft Product Terms / GitHub Copilot Terms. Proprietary (not open-weight).
- **Context:** 256K tokens
- **Benchmarks (vendor/Copilot harness, Microsoft model card):**
  - SWE-Bench Verified: **72.6%**
  - Terminal-Bench 2.1: **62.9%** (+22% vs MAI-Code-1-Flash, same harness)
  - .NET tasks: +15% vs predecessor
  - Code survival: +4%, Return visits: +9%
- **Pricing:** Copilot list: **$0.20 / $0.02 cached / $1.20 per Mtok** (~73% lower than MAI-Code-1-Flash's $0.75/$0.075/$4.50). **₹19.02 / ₹1.90 cached / ₹114.14 per Mtok**. Annual Copilot plans: 0.25× premium-request multiplier. ⚠️ MAI-Code-1-Flash retires **Sep 10, 2026** — migrate by then.
- **Open weights:** ❌ Closed. GitHub Copilot only (VS Code, Visual Studio, JetBrains, CLI, Mobile, Eclipse, Xcode).
- **Q4 VRAM:** N/A (closed)
- **India relevance:** Matters for GitHub Copilot users in India. Cheapest Microsoft first-party coding model ever. At $1.20/M output it sits between Luna ($1.20) and GLM-5.3-Flash ($0.50) — not competitive on raw price vs open-weight options, but zero infra overhead for Copilot shops.
- **Verdict:** Important for teams already on GitHub Copilot. For self-hosted or API-first setups, GLM-5.3-Flash or Qwen3.8-Flash-Next beat it on price, quality, and openness.

---

### North Micro Vision Instruct — Cohere Labs — Aug 12, 2026

- **Params:** 2.4B (400M vision encoder + 2B North Micro LLM on Command A+ architecture). Native-resolution vision: up to 1654×2339px (A4@200dpi), aspect-ratio preserving. 11 languages.
- **License:** Apache 2.0 ✅
- **Context:** 128K (validated range for multimodal: 8K)
- **Benchmarks (vendor-reported, Cohere Labs blog Aug 12):**
  - DocVQA: **92.1%** (beats Ministral-3-3B-Instruct 89.6%)
  - ChartQA: **80.8%**
  - CountBench: 72.5% (trails LFM2.5-VL-1.6B 91.0%)
  - MMLU (text-only): 50.4% (well behind Ministral-3-3B 66.0%)
- **Pricing:** Open weights only; no hosted API price.
- **Open weights:** ✅ HF: `CohereLabs/North-Micro-Vision-Instruct`
- **Q4 VRAM:** ~1.5 GB (2.4B model). **1× RTX 5090** ✅ trivially.
- **India relevance:** Tiny document/OCR VLM. Fits any GPU or CPU. Good for local invoice/contract/chart parsing pipelines. Not a coding model.
- **Verdict:** Niche document-VLM. Not relevant for coding deployment; useful for Indian OCR/document pipeline teams.

---

### MAI-Thinking-1 — Microsoft — Aug 12, 2026 (Public Preview, not Upcoming)

- **Params:** ~962B total / 34.7B active (78 layers, 8 of 512 routed experts), sparse MoE, **256K ctx** (64K out), text-only, Chat Completions + function calling, enterprise-grade data. Base: MAI-Base-1 (8k GB200 pre-train; RL 4.6k GB300).
- **License:** Proprietary — **Public Preview** on Microsoft Foundry (Direct from Azure), not open weights. Announced at Build Jun 2, private preview until Aug 12.
- **Benchmarks (Microsoft, avg 4 runs, T=1, TopP 0.97, 256K ctx):**
  - AIME 2025: **97.0%**, AIME 2026: **94.5%** (math reasoning vs Opus 4.6)
  - SWE-Bench Pro: **52.8%** (vs Opus 4.6 53.4% per MS; trails GPT-5.4 41.0%? Actually 52.8 vs 41.0 — ahead, but **Terminal-Bench 2.0 46.0% vs GPT-5.4 75.1%** — weak on terminal)
  - Independent analysis: ≈ DeepSeek V3.2 in real-world use (not frontier coding)
  *Source: `microsoft.ai/news/introducing-mai-thinking-1` + technical report `microsoft.ai/pdf/mai-thinking-1.pdf` — all Microsoft-reported, not independent.*
- **Pricing:** Foundry preview — **TBD** (MS promises "mid-weight" pricing, no per-token table yet; expect between Gemini 2.5 Pro $1.25/$10 and Sonnet $3/$15).
- **Open weights:** ❌ Closed (Foundry only; no OpenRouter/Fireworks/Baseten yet despite Jun 2 plan)
- **Q4 VRAM:** N/A (closed; ~962B total would be ~481 GB at Q4 if open — data-center)
- **India relevance:** Text-only reasoning model for governed Foundry deployments; not self-hostable; 256K useful for long docs but measure retrieval. Wait for GA pricing/regions.
- **Status:** **Preview** (Aug 12) — promoted from `Upcoming` `ai_model_tracker_aug29_2026.md:MAI-Code 2` — now **Public Preview**, not upcoming. | **Source:** `microsoft.ai/models/mai-thinking-1` → `ai.azure.com/catalog/models/MAI-Thinking-1`
- **Verdict:** Efficiency reasoning model, not frontier coding — 52.8% SWE-Pro moderate, 46% TB2.0 weak. Evaluate vs Sonnet/Opus for math-heavy enterprise, not terminal agentic.

---

### Gap-fill Sync — 10 models from llm-releases.com missing in local tracker (Sep 2, 2026) 🆕

> Added Sep 2 to close gaps vs `llm-releases.com` (339 models, 35 new/30d). All fields sourced from `llm-releases.com/models/<slug>` + primary source linked there. Status uses llm-releases taxonomy: **Available / Preview / Retired**.

#### Cohere Parse 5 — Cohere — Aug 27, 2026 (Available, Proprietary)

- **Params:** 2.3B VLM (document-intelligence, parse-v5.0). **Context:** 8,192 tokens.
- **License:** Proprietary — API at $1.50/1,000 pages; Model Vault / SageMaker / Azure; private deploy option.
- **Function:** PDF/slides/images → structured Markdown with tables/forms/bounding boxes; 9 languages; ~4.6GB footprint.
- **Benchmarks:** Cohere internal vs GPT-5.5/Opus 4.8/Gemini 3.5 Flash — trails on raw accuracy, wins on price/page (vendor, unverified).
- **Open weights:** ❌ Proprietary (North-Micro-Vision-Instruct is the open VLM in this family)
- **Q4 VRAM:** ~2.3 GB. **1× 5090** ✅ trivially. No coding impact.
- **India relevance:** Cheap doc-OCR pipeline complement to North-Micro-Vision (2.4B Apache 2.0). Use Parse 5 API for high-volume invoice/contract parsing where bounding-box grounding needed.
- **Source:** `llm-releases.com/models/cohere-parse-5` → `cohere.com/blog/parse` | **Status:** Available
- **Verdict:** Not a coding model — add to doc-VLM watchlist; no router impact.

#### Ling-3.0-flash-Fin — inclusionAI (Ant Group) — Aug 27, 2026 (Available, Open weights announced)

- **Params:** 124B total / 5.1B active MoE (same base as Ling-3.0-flash, finance post-train). **Context:** 262K (32K out), tool calling w/o `response_format`.
- **License:** MIT (base Ling family) — **open weights announced for week of Aug 31, not yet on HF at launch** (announced-but-unconfirmed per llm-releases). Treat as API-only until HF `inclusionAI/Ling-3.0-flash-Fin` lands.
- **Focus:** Annual reports, workbooks, multi-doc research, valuation modeling; claims preserved general coding/math.
- **Pricing:** **Free 1-month** via OpenRouter `inclusionai/ling-3.0-flash-fin`; post-promo TBD.
- **Open weights:** ⏳ Announced, not yet downloadable (base `Ling-3.0-flash`/`tiny` already on HF MIT)
- **Q4 VRAM (est.):** ~62 GB at Q4 (124B). **2×5090 / 1×Pro6000** ✅ when weights land.
- **India relevance:** Finance-domain specialist; watch for BFSI coding+analysis pipelines. API free window = eval opportunity.
- **Source:** `llm-releases.com/models/ling-3-0-flash-fin` → `openrouter.ai/inclusionai/ling-3.0-flash-fin` | **Status:** Available (weights Preview)
- **Verdict:** Track separately from base Ling-3.0-flash (`local_ai_coding_models.md:590`). Promote to router if finance + coding evals verify.

#### Thomson — Thomson Reuters — Aug 24, 2026 (Preview, Proprietary)

- **Params:** Undisclosed (built on undisclosed open foundation + TR proprietary content: Westlaw/Practical Law/Checkpoint/Reuters). Training ~$40M.
- **License:** Proprietary — gated to Tabular Analysis in CoCounsel Legal; sovereign-AI rollout planned. Smaller open-weight variant for academic/non-commercial on HF (not flagship).
- **Context:** Undisclosed.
- **Benchmarks:** TR claims "on par with frontier models" with domain uplift in instruction following / dense professional reasoning — **no public benchmark table**, limited external academic test only (unverified).
- **Open weights:** ❌ Flagship proprietary; small academic variant planned.
- **India relevance:** Legal/tax RAG use case only; no India deployment path for flagship.
- **Source:** `llm-releases.com/models/thomson` → `thomsonreuters.com/press-releases/2026/august/...` | **Status:** Preview
- **Verdict:** Watch for legal vertical; no coding router impact.

#### Hy-MT2-30B-A3B — Tencent Hunyuan — Aug 20, 2026 (Available, Open weights)

- **Params:** 30B total / 3B active MoE, **Context:** 8,192 (4,096 out), 33 language pairs + 5 CN dialect/minority pairs.
- **License:** Open weights on HF `tencent/Hy-MT2-30B-A3B` (translation specialist, not coding).
- **Benchmarks:** Tencent claims beating DeepSeek-V4-Pro/Kimi K2.6/Microsoft/Doubao on translation quality (vendor, unverified).
- **Open weights:** ✅ HF; small enough for local MT pipeline.
- **Q4 VRAM:** ~15 GB. **1×5090** ✅.
- **India relevance:** Local multilingual MT for doc pipelines (India 4 languages in llm-releases India subset). Not a coding model.
- **Source:** `llm-releases.com/models/hy-mt2-30b-a3b` → `huggingface.co/tencent/Hy-MT2-30B-A3B` | **Status:** Available
- **Verdict:** Doc-translation complement to Hy4/Hy3; no coding leaderboard impact.

#### Dots3-Note Preview — Dots Studio (Xiaohongshu/rednote-hilab) — Aug 14, 2026 (Preview, Apache 2.0)

- **Params:** ~280B total / 16B active MoE, **Context:** 512K, **Modality:** text+vision+audio → text. Introduces TEMPO RL (self-checkpointing long-horizon agents). **IMO nuance:** 42/42 IMO 2026 is for a **bespoke internal harness branch** of dots3-note, **not the published weights checkpoint** (`dots-studio/dots3-note-prev`); do not treat as released-model score.
- **License:** Apache 2.0 — weights BF16/FP8 on HF `dots-studio/dots3-note-prev`; free on OpenRouter `dots-studio/dots3-note-preview`.
- **Benchmarks:** Positioned for reasoning + coding + long-context agent workflows, not benchmark-maxxing — no public SWE/DeepSWE table at launch.
- **Q4 VRAM:** ~140 GB. **2×Pro6000 / 4×Spark** ✅ (Q3).
- **India relevance:** Long-horizon agent research model; 512K + TEMPO useful for multi-step coding verification loops.
- **Source:** `llm-releases.com/models/dots3-note-preview` → `huggingface.co/dots-studio/dots3-note-prev` | **Status:** Preview
- **Verdict:** Add to long-context MoE watchlist; not yet router-tier.

#### LFM2.5-VL-3B — Liquid AI — Aug 12, 2026 (Available, Open weights)

- **Params:** 3.1B VLM = 2.69B LFM2.5 base + 400M SigLIP2 NaFlex encoder, Hybrid (conv+attention). **Context:** Not disclosed (multimodal).
- **License:** Open weights on HF (Liquid). Supports llama.cpp/MLX/vLLM/SGLang/ONNX.
- **Benchmarks (vendor):** ScreenSpot-v2 80.7, RefCOCO 87.9 P@1, ToolSandbox 59.5, MMBench 81.0, 69.4 avg/28 benches. On-device: ~228 tok/s M5 Max, ~116 tok/s Ryzen AI Max+ 395.
- **Q4 VRAM:** ~2 GB. **Phone/Mac** ✅.
- **India relevance:** On-device screen understanding + grounding + tool calling — edge VLM complement to North-Micro-Vision 2.4B.
- **Source:** `llm-releases.com/models/lfm2-5-vl-3b` → `liquid.ai/blog/lfm2-5-vl-3b` | **Status:** Available
- **Verdict:** Edge VLM tier; no coding impact, but best on-device grounding option.

#### Nemotron 3.5 Lightning — NVIDIA — Aug 11, 2026 (Available, Open weights)

- **Params:** ~31.6B total / 3.6B active, **Hybrid Mamba-2 + MoE + Attention**, **Context:** 1M, shipped with NeMo Switchyard router.
- **License:** OpenMDW-1.1 — weights/data/recipes on HF/ModelScope/OpenRouter/NIM.
- **Benchmarks (vendor, BF16):** SWE-bench Verified **51.56%**, GPQA Diamond **75.44%**, MMLU Pro **81.94%**. Claims gpt-oss-120b-class at ¼ params, 4× speed.
- **Pricing:** NIM microservice; no per-Mtok list.
- **Q4 VRAM:** ~16 GB. **1×5090** ✅. NVFP4 near-lossless.
- **India relevance:** Small/edge agentic coder that fits 1×5090 — alternative to Qwen3.8-27B / Glimmer for on-device agent loops (10k tasks 30% faster than Qwen3.6-35B claimed).
- **Source:** `llm-releases.com/models/nemotron-3-5-lightning` → `developer.nvidia.com/blog/...` | **Status:** Available
- **Verdict:** Promote to small-model router bench vs Qwen3.8-27B/NeMo.

#### Namazu — Sakana AI — Aug 11, 2026 (Available, Proprietary)

- **Params:** Undisclosed (fine-tune of Moonshot Kimi K2.6 open-weight), **Context:** 262K (65K out), text+images/files→text, native web-search + code-execution tools, OpenAI-compat API.
- **License:** Proprietary — API-only, **not available in EU/EEA/UK/CH** (`llm-releases.com/models/namazu`).
- **Pricing:** $0.95 / $4.00 per Mtok via OpenRouter `sakana/namazu`.
- **Benchmarks:** Sakana JP business/coding/research focus — no public leaderboard.
- **India relevance:** JP sovereign-AI pattern (tune open Kimi for local language) — relevant as template for India fine-tune, but no direct India deployment advantage.
- **Source:** `llm-releases.com/models/namazu` → `openrouter.ai/sakana/namazu` | **Status:** Available
- **Verdict:** Watch for sovereign-tune playbook; no local weights.

#### Solar Pro 4 — Upstage — Aug 10, 2026 (Available, Proprietary)

- **Params:** Undisclosed, **Context:** 524K (131K out), agent-first reasoning workhorse.
- **License:** Proprietary — Upstage API + OpenRouter.
- **Benchmarks (vendor):** AA-LCR **71** (2.3× Pro 3), Tau3-Banking **23** (2.6×), **AA Index 42**. Positioned as "save frontier for frontier problems".
- **Pricing:** $0.30 / $1.20 per Mtok (promo **$0.03/$0.12**).
- **India relevance:** Cheapest 524K office/doc coding workhorse; promo 90% off = eval window for long-doc banking/finance pipelines.
- **Source:** `llm-releases.com/models/solar-pro-4` → `upstage.ai/blog/en/solar-pro-4` | **Status:** Available
- **Verdict:** Office/productivity router candidate during promo; not frontier coding.

#### GPT-5.6-Cyber — OpenAI — Aug 10, 2026 (Preview, Proprietary)

- **Params:** Undisclosed (built on GPT-5.6-Sol, cyber post-train, lower refusal on dual-use sec tasks).
- **License:** Proprietary — **gated to Daybreak Red** vetted defenders (Accenture/IBM/Palo Alto/CrowdStrike/Fortinet/Akamai/Cloudflare). Not generally available.
- **Benchmarks (vendor):** 95% completion on advanced exploit-chain prompts vs ~1.5% for Sol; found V8 vuln + mobile-OS/DB/kernel flaws reported.
- **Context:** Undisclosed; size undisclosed.
- **India relevance:** No public API; cyber red-team only.
- **Source:** `llm-releases.com/models/gpt-5-6-cyber` → `securityweek.com/openai-unveils...` | **Status:** Preview (gated)
- **Verdict:** Track for CyberGym 84.5% context (`README.md:82` GLM-5.3) vs defensive/offensive split; no deployment path.

---

### Muse Spark 1.2 — Meta — Aug 5, 2026 (verified via Meta blog + aireleasetracker)

- **Params:** Undisclosed (closed model, same architecture as 1.1)
- **License:** Closed API (open weights "promised soon" per Meta, undelivered as of Aug 29)
- **Context:** 1M tokens
- **Benchmarks:**
  - AA Intelligence Index: **54** (57 xhigh) `(AA)`
  - Terminal-Bench 2.1: **80%** `(AA independent)` / 82.9% (Meta-reported, Meta harness — not AA)
  - GDPval-AA v2: 1,631 Elo (↑ from 1,371 at 1.1)
- **Pricing:** $1.25 / $4.25 per Mtok (same as 1.1). New **Contributor tier**: $0.10 / $0.20 (92% discount) in exchange for Meta training-on-prompts rights. **₹118.90 / ₹404.26 per Mtok standard.**
- **Open weights:** ❌ Not yet released (Meta announced "soon")
- **Q4 VRAM:** N/A (closed)
- **India relevance:** Competitive on quality (AA 54–57). Contributor tier ($0.10/$0.20) is the cheapest frontier-quality API after Luna, but with data rights trade-off. Check legal before using Contributor for client code.
- **Verdict:** Incremental update over 1.1. Contributor tier pricing is a trap for enterprises (your prompts train Meta). Standard pricing is competitive. Best for indie devs on budget.

---

### Grok 4.6 — xAI — Aug 6 (released) / Aug 12 (added to API) ⭐

- **Params:** ~1.5T total (Musk Jul 28 X post, unconfirmed in official docs)
- **License:** Closed proprietary
- **Context:** 500K tokens (doubled from Grok 4.5's 200K)
- **Benchmarks:**
  - AA Intelligence Index: **61** `(AA)` — ties GPT-5.6 Sol, #2 overall after Claude Opus 5 (63.1)
  - Terminal-Bench 2.1: **88.4%** (AA; single-agent) `(AA)`
- **Pricing:** $2.00 / $6.00 per Mtok below 200K input; doubles to $4.00 / $12.00 above 200K input. Cached input: **$0.50/M** (↑ from $0.30 for 4.5). **₹190.24 / ₹570.72 per Mtok base.**
- **Open weights:** ❌ Closed
- **Q4 VRAM:** N/A
- **India relevance:** Strongest closed model at $2/$6. 500K context is useful for large codebase agentic work. Cached input at $0.50/M is 67% more expensive than Grok 4.5's $0.30/M — existing long-context loops get pricier.
- **Verdict:** Best closed-model value at the frontier (AA 61 = Sol at $2/$6 vs Sol's $4/$20). Watch for Grok 4.7 (early Sep) before committing to long-term Grok pipelines.

---

### Gemini 3.7 Flash — Google — Aug 13, 2026 ⭐

- **Params:** Undisclosed (closed)
- **License:** Proprietary (Google API)
- **Context:** 1M tokens
- **Benchmarks:**
  - AA Intelligence Index: **56** `(AA)` (vs 3.6 Flash: 52)
  - DeepSWE: **65.3%** (↑ from 3.6 Flash: 49.0%) (vendor)
  - AutomationBench: **30.4%** (↑ from 17%) (vendor)
  - Throughput: **340.1 tok/s** (fastest on AA) `(AA)`
- **Pricing (⚠️ TWO-TIER):**
  - **Intro (now → Dec 31, 2026):** $0.75 / $3.75 per Mtok; cached: $0.075 — **₹71.34 / ₹356.70 per Mtok**
  - **Standard (from Jan 1, 2027):** $1.50 / $7.50 per Mtok; cached: $0.15 — **₹142.68 / ₹713.40 per Mtok**
  - ⚠️ **Budget 2027 at the doubled rate. Gemini 3.6 Flash has been cut to same intro rate.**
- **Open weights:** ❌ Closed
- **Q4 VRAM:** N/A
- **India relevance:** Fastest throughput on market (340 tok/s at AA). Intro price makes it cheapest major frontier model through Dec 31. Best for high-volume batch/streaming jobs in 2026. Price doubles Jan 1 — plan exit or budget accordingly.
- **Verdict:** Best closed-model throughput; intro pricing is a limited-time deal. Build pipelines now that can swap to DeepSeek/GLM-5.3-Flash when intro expires.

---

### MiniMax H3 (Hailuo 3.0) — MiniMax — Jul 31 (announced) / Aug 3, 2026 (open weights) ⭐

> Included as this is the Aug 1–29 window's most significant video model release.

- **Params:** 33B dense omni-modal (H3-Omni-Transformer with 3D MM-RoPE for text/image/video/audio tokens in unified space)
- **License:** ⚠️ MiniMax H3 Community License — **EXCLUDES US, EU, UK, and South Korea from open-weight local deployment without separate MiniMax commercial authorization.** (India: not listed in exclusion zone — but verify with counsel before commercial use.)
- **Context:** N/A (video model; up to 2K / 24fps / 15s output; 4s–15s; 32 kHz stereo audio)
- **Benchmarks `(AA)`:**
  - Text-to-Video: **#2** on Artificial Analysis Video Arena `(AA)`
  - Video Editing (with audio): **#1** on AA `(AA)`
  - Image-to-Video: **#3** on AA `(AA)`
  - VBench-2.0: **84.7%** overall (vendor)
- **Pricing (API):** $0.024/sec (720p), $0.048/sec (1080p), $0.096/sec (2K). Prime/accelerated SKU: 1.4× base rates.
- **Open weights:** ✅ HF: `MiniMaxAI/MiniMax-H3` (H3-Base, 768p; full 2K requires API). ComfyUI day-0 support. 42.5 GB download.
- **Q4 VRAM:** ~17 GB at Q4 (33B). **1× RTX 5090 (32GB)** ✅ at 768p.
- **India relevance:** India not in the exclusion zone. If legal confirms, this enables local frontier video generation at ₹0 per token (H3-Base weights). Context: generate product ads, explainer videos, game cinematics locally. **License gate is the critical blocker — get a legal opinion before commercial use.**
- **Verdict:** Landmark open-weight video model. License geo-restriction is non-trivial — confirm India legality. For API use, pricing is competitive.

---

### Laguna S 2.1 — Poolside — Jul 21, 2026 (Available, Open weights)

- **Params:** 118B total / 8B active MoE, **262K ctx** (262K out), reasoning + tool calling
- **License:** OpenMDW-1.1 — open weights on HF + free API `poolside/laguna-s-2.1:free` (OpenRouter, 200 req/day) / `poolside/laguna-s-2.1` paid
- **Benchmarks (Poolside, vendor):**
  - Terminal-Bench 2.1: **70.2%**
  - DeepSWE: **40.4%**
  - SWE-Bench Multilingual: 78.5% (reported as strongest in its size class per llm-releases gap analysis)
- **Pricing:** Free tier (OpenRouter) / paid API via Poolside; open weights self-host
- **Open weights:** ✅ HF (OpenMDW-1.1, BF16/FP8 + GGUF)
- **Q4 VRAM:** ~59 GB (`ai_model_tracker_aug29_2026.md:Appendix A`). **1×Pro6000 ✅** / **4×Spark ✅**
- **India relevance:** Strong coding in its size class; 70.2% TB2.1 at ~59 GB fits 1×Pro6000 — fills gap between Qwen3.8-27B (14 GB) and V4 Flash (155 GB). Free OpenRouter = eval without infra.
- **Status:** **Available** | **Source:** `openrouter.ai/poolside/laguna-s-2.1:free` + `poolside.ai/blog` → `freellm.net` (Jul 21, updated Aug 6) | **Note:** Sep 1 addition previously stub — now full card.
- **Verdict:** Best open-weight code model in ~60 GB envelope; router candidate for mid-size tier.

---

## 3. PRICING CHANGES — LAST 30 DAYS

> All verified via provider docs unless marked `(est.)`.

| Model | Old Price (in/out per Mtok) | New Price | Effective | Notes |
|---|---|---|---|---|
| **GPT-5.6 Sol** | $5.00 / $30.00 | **$4.00 / $20.00** (cached: $0.40) | Aug 21, 2026 | Promo through **≥Nov 21, 2026** confirmed. Sources: Reuters Aug 21, OpenAI docs. ₹380.48 / ₹1,902.40 at new rate. |
| **DeepSeek V4 Pro** | $0.435 / $0.87 flat | Off-peak: **$0.66 / $1.98** \| Peak: **$1.32 / $3.96** | Aug 16, 16:00 UTC | Peak = 01–04 & 06–10 UTC. Cache-hit: $0.022/$0.044. Cheapest off-peak hour is 2.3× old output rate. **Price increase.** |
| **DeepSeek V4 Flash** | $0.14 / $0.28 flat | Off-peak: **$0.11 / $0.66** \| Peak: **$0.22 / $1.32** | Aug 16, 16:00 UTC | Input cheapest off-peak ($0.11), output triples at peak ($1.32 vs $0.28). Cache-hit input: $0.011 off-peak / $0.022 peak. **Price increase on output.** |
| **Claude Sonnet 5** | $2/$10 "intro, reverts $3/$15 Sep 1" | **$2/$10 permanent** | Aug 2026 | Sep 1 rise cancelled. Standard pricing now. |
| **Gemini 3.7 / 3.6 Flash** | $0.75 / $3.75 (intro) | $1.50 / $7.50 **(from Jan 1, 2027)** | Google blog Aug 13 | Intro holds through Dec 31, 2026. Cache hits double too ($0.075 → $0.15). Budget at doubled rate for 2027 planning. |
| **Grok 4.6 cached input** | $0.30/M (Grok 4.5 rate) | **$0.50/M** | Aug 6/12, 2026 | +67% on dominant line item for cached agent loops. Prompts >200K tokens double all rates ($4/$12). |
| **GLM-5.3** (new) | — | $1.40 / $4.40 / $0.26 cached | ~Aug 21, 2026 | Same rate card as GLM-5.2/5.1. |
| **GLM-5.3-Flash** (new) | — | $0.15 / $0.50 / $0.03 cached | Aug 26, 2026 | Promo halves all to ~$0.075/$0.25/$0.015 **through Sep 9, 2026.** |
| **Tencent Hy4 preview** (new) | — | $0.834 / $2.501 | Aug 28, 2026 | Free 2 wks on WorkBuddy/CodeBuddy. Hy3 free extended to Sep 30. |
| **Qwen3.8-Flash** / Flash-Next (new) | — | $0.15 / $0.47 / $0.016 cached | Aug 26–28, 2026 | Production API `qwen3.8-flash` on QwenCloud; open-weight `Qwen3.8-Flash-Next` HF. |
| **MAI-Code-1.1-Flash** (new) | ($0.75/$0.075/$4.50 for MAI-Code-1-Flash) | **$0.20 / $0.02 cached / $1.20** | Aug 11, 2026 | ~73% reduction vs predecessor. ⚠️ MAI-Code-1-Flash retires **Sep 10, 2026.** |
| **Claude Fable 5.1** (new) | $10/$50 + $1.00 cache-read | **$10/$50 + $0.25 cache-read** | Sep 1, 2026 | **75% cheaper cache** ($1.00→$0.25) → ~25% typical / ~45% agentic cheaper vs Fable 5. Same list $10/$50 as Fable 5; Mythos 5.1 same model gated. `₹951.20/₹4,756.00/₹23.78 cache`. |

---

## 4. BENCHMARK LEADERBOARD SNAPSHOT (Aug 29, 2026)

> All scores vendor-reported unless explicitly marked. Scores from multi-agent / Ultra mode flagged separately. Leaderboards are living — verify at artificialanalysis.ai, benchlm.ai, llm-stats.com, codingfleet.com before decisions.

---

### 4a. Terminal-Bench 2.1 (Single-Agent)

> Source: AA independent reruns (tbench.ai harness) + vendor-reported entries. TB 2.1 is harder than 2.0; scores are NOT comparable across versions. **⚠️ Hy4 preview and GLM-5.3-Flash TB2.1 scores are vendor-reported; not yet on tbench.ai.**

| Rank | Model | Score | Source | Notes |
|------|-------|:-----:|--------|-------|
| 1 | **Kimi K3** | **88.3%** | `(AA)` | Top-ranked open-weight |
| 2 | **GLM-5.3** | **88.2%** | vendor | Z.ai launch table |
| 3 | **Grok 4.6** | **88.4%** | `(AA)` | xAI; AA run on Terminus 2 |
| 4 | **GPT-5.6 Sol** | **88.8%** | `(AA)` single-agent (89.5% xhigh effort) | AA independent; Ultra mode is 91.91% (vendor, 4 parallel agents — not single-agent) |
| 5 | **Claude Opus 5** | ~**86%** | `(AA)` | AA Terminus 2; vendor says 85.4% |
| 6 | **Tencent Hy4** | **85.4%** | vendor | Tencent appendix; not yet on tbench.ai |
| 7 | **Gemini 3.7 Flash** | **85.8%** | vendor | GA launch table |
| 8 | **DeepSeek V4 Pro 0813** | **87.9%** | vendor | |
| 9 | **Qwen3.8-Max** | **86.6%** | vendor | |
| 10 | **GLM-5.3-Flash** | **84.3%** | vendor | Ties Opus 5 (vendor) |

> **Scale-standardized note:** On Scale AI SEAL mini-SWE-agent (identical scaffold for all models), the best open-weight model is Qwen3-Coder 480B-A35B at **38.7%** vs GPT-5.4 at 59.1% proprietary best. Vendor TB2.1 scores are 10–20 pts higher due to custom scaffolds.

---

### 4b. DeepSWE v1.1 (mini-swe-agent harness)

> Source: deepswe.datacurve.ai leaderboard, mirrored on benchlm.ai (Aug 28 snapshot). BenchLM marks as "display-only" (not used in composite rankings). All mini-swe-agent pass@1.

| Rank | Model | Score | Source |
|------|-------|:-----:|--------|
| 1 | **Claude Opus 5** | **73.6–74.0%** | `(BenchLM)` mirror Aug 20 |
| 2 | **GPT-5.6 Sol** | **72.7–73.0%** | `(BenchLM)` |
| 3 | **Claude Fable 5** | **69.7%** | `(BenchLM)` |
| 4 | **GLM-5.3** | **66.9–69.0%** | vendor / `(BenchLM)` Aug 20 ±3% |
| 5 | **Kimi K3** | **67.5%** | vendor (KimiCode harness) |
| 6 | **Tencent Hy4** | **64.3%** | vendor |
| 7 | **GLM-5.3-Flash** | **63.4%** | vendor; `(BenchLM)` Aug 28 mirror confirms entry |
| 8 | **DeepSeek V4 Pro** | **62.7%** | vendor |
| 9 | **Qwen3.8-Flash-Next** | **58.7%** | vendor (HF README) |
| 10 | **Qwen3.8-Max** | **56.6%** | vendor |

---

### 4c. SWE-bench Pro (Scale AI Standardized — identical scaffold)

> Scale's standardized leaderboard is the only apples-to-apples comparison. Vendor-reported Pro scores are 10–20 pts higher (custom scaffolds). Note: Datacurve May 2026 audit found ~32% grader error rate — treat all Pro scores as signals, not ground truth.

| Rank | Model | Score | Source | Notes |
|------|-------|:-----:|--------|-------|
| 1 | **Muse Spark 1.1** (Meta) | **61.5%** | `(Scale)` | Standardized SEAL run |
| 2 | **GPT-5.4 (xHigh)** | **59.1%** | `(Scale)` | Standardized SEAL run |
| 3 | **Gemini 3.1 Pro** | **46.1%** | `(Scale)` | |
| 4 | **GPT-5.2 Codex** | **41.0%** | `(Scale)` | |
| 5 | **Claude Haiku 4.5** | **39.5%** | `(Scale)` | |
| 6 | **Qwen3-Coder 480B-A35B** | **38.7%** | `(Scale)` | **Best open-weight on standardized scaffold** |
| — | Claude Opus 5 | 79.2% | vendor (Anthropic scaffold) | NOT Scale-standardized; not directly comparable |
| — | Claude Fable 5 | 80.0–80.3% | vendor | NOT Scale-standardized |
| — | Qwen3.8-Max | 67.7% | vendor | |
| — | GLM-5.3 | — | vendor (no separate Pro run published) | Z.ai used DeepSWE as primary metric |

---

### 4d. AA Coding Agent Index

> Source: artificialanalysis.ai (Codex/Claude Code/Kimi Code/Opencode harnesses, real agent runs). Aug 2026 snapshot from modelgrep.com / felloai.com `(AA)`.

| Rank | Model | AA Coding Index | Cost/Task (AA measured) |
|------|-------|:--------------:|:-:|
| 1 | **Claude Opus 5** (Claude Code) | **0.6674** | $8.23 |
| 2 | **GPT-5.6 Sol** (Codex) | **0.6657** | $7.08 |
| 3 | **Claude Fable 5** (Claude Code) | ~0.655 | $11.71 |
| 4 | **Kimi K3** (Kimi Code) | — | $3.18 |
| 5 | **Gemini 3.1 Pro** (Gemini CLI) | — | $2.00 |
| 6 | **Grok 4.5** (Grok Build) | — | $2.59 |
| 7 | **Muse Spark 1.1** (Opencode) | — | $1.43 |

> **Note on Hy4/GLM-5.3-Flash:** Neither has an AA Coding Agent Index entry yet as of Aug 29 — too recent for AA harness runs.

---

### 4e. AA Intelligence Index (Overall, Sep 5, 2026)

> Source: artificialanalysis.ai (refreshes from modelgrep.com daily) `(AA)`.

| Rank | Model | AA Intelligence Index |
|------|-------|:--------------------:|
| 1 | **Claude Fable 5.1** | **65.7** |
| 2 | **Claude Opus 5** | **63.1** |
| 3 | **GPT-6 Astra** | **61.2** |
| 4 | **Grok 4.6** | **60.9** |
| 5 | **GPT-5.6 Sol** | **~61** |
| 6 | **Qwen3.8-Max** | **~58** |
| 7 | **GLM-5.3-Flash** | **57** |
| 8 | **Kimi K3** | **57** |
| 9 | **Claude Opus 4.8** | **56** |
| 10 | **Muse Spark 1.3** (max) | **48** ⚠️ v4.3 re-score |

> **Open-weight note:** Kimi K3 (AA 57) is the first open-weight model ever to crack the AA top 3, per independent verification (weights released Jul 27). GLM-5.3-Flash (AA 57) ties it.

> **⚠️ Sep 8 correction:** Muse Spark 1.3 (max) previously listed at 62 (#2) under launch-day reporting. Under the **Intelligence Index v4.3** AA now measures it at **48 (#13/202)** — see §2 card. Fable 5.1 65.7 (max effort), Opus 5 63.1, Astra 61.2, Grok 4.6 60.9, Sol ~61, Spark 1.2 (Aug) 57.

---

### 4e. AA Coding Agent Index

> Source: artificialanalysis.ai (Codex/Claude Code/Kimi Code/Opencode harnesses, real agent runs). Aug 2026 snapshot from modelgrep.com / felloai.com `(AA)`.

| Rank | Model | AA Coding Index | Cost/Task (AA measured) |
|------|-------|:--------------:|:-:|
| 1 | **Claude Fable 5.1** (Claude Code) | **0.6674** | $8.23 |
| 2 | **GPT-5.6 Sol** (Codex) | **0.6657** | $7.08 |
| 3 | **Claude Fable 5** (Claude Code) | ~0.655 | $11.71 |
| 4 | **GPT-6 Astra** (Codex) | **~0.667** (1-source est., AA composite 67 vs Fable 5.1 70 — ⚠️ not AA-verified) | ~$1.67 max-effort est. |
| 5 | **Muse Spark 1.3** (Opencode) | — | $1.60 (AA Intelligence Index task; not Coding Index) |
| 5 | **Kimi K3** (Kimi Code) | — | $3.18 |
| 5 | **Gemini 3.1 Pro** (Gemini CLI) | — | $2.00 |
| 6 | **Grok 4.5** (Grok Build) | — | $2.59 |

> **Note on Hy4/GLM-5.3-Flash:** Neither has an AA Coding Agent Index entry yet as of Sep 5.

---

### 4e. AA Intelligence Index (Overall, Aug 29)

> Source: modelgrep.com (refreshes from artificialanalysis.ai daily) `(AA)`.

| Rank | Model | AA Intelligence Index |
|------|-------|:--------------------:|
| 1 | **Claude Opus 5** | **63.1** |
| 2 | **Claude Fable 5** | **62.1** |
| 3 | **Grok 4.6** | **60.9** |
| 4 | **GPT-6 Astra** | **61.2** |
| 4 | **GPT-5.6 Sol** | **~61** |
| 5 | **Qwen3.8-Max** | **~58** |
| 6 | **GLM-5.3-Flash** | **57** |
| 7 | **Kimi K3** | **57** |
| 8 | **Claude Opus 4.8** | **56** |
| 9 | **Gemini 3.7 Flash** | **56** |
| 10 | **Muse Spark 1.2** | **54** (57 xhigh) |

> **Open-weight note:** Kimi K3 (AA 57) is the first open-weight model ever to crack the AA top 3, per independent verification (weights released Jul 27). GLM-5.3-Flash (AA 57) ties it.

> **⚠️ Superseded Sep 8:** earlier note said "Muse Spark 1.3 max preview 62 ties Sol+Astra at 61" — that was launch-day reporting. Under AA v4.3, Muse Spark 1.3 (max) is **48**. Fable 5.1 65.7 (max effort), Opus 5 63.1, Grok 4.6 60.9, Sol ~61, Spark 1.2 (Aug) 57.


---

## 5. HARDWARE ANNOUNCEMENTS

### NVIDIA DGX B300 — Shipping Jan 2026 (announced GTC 2025)

- 8× B300 SXM (Blackwell Ultra) GPUs, Intel Xeon 6776P CPU, 10U chassis
- **Total GPU memory: 2.3 TB HBM3e** (8× 288 GB)
- **Inference: 144 petaFLOPS FP4 (sparse) / 72 petaFLOPS FP8 training**
- NVLink 5: 14.4 TB/s aggregate GPU–GPU bandwidth
- Networking: 8× OSFP (800 Gb/s ConnectX-8) + 2× BlueField-3 DPU
- CUDA/TensorRT-LLM/vLLM/SGLang fully compatible; NVFP4 native support
- MLPerf Inference v6.0 (Apr 2026): highest throughput across widest range; DeepSeek-R1 at $0.24/Mtok, 102 TPS/user (SemiAnalysis InferenceX)
- **India price:** ~₹5.5 Cr landed via STPI/EoU (gray market ~₹4-4.5 Cr with customs risk); 5-yr TCO ~₹11.7 Cr
- **India fit:** Every open-weight model at Q4 with 30s NVMe→HBM swap. K3 at FP8; GLM-5.3 comfortable; Hy4 comfortable; V4 Pro 0813 tight (850 GB Q4 exceeds 2.3 TB when active).

### NVIDIA GB300 NVL72 (Vera Rubin) — H2 2026 (fall shipments)

- 72× R100 GPUs (Rubin architecture), 20.7 TB HBM4 @ 1,580 TB/s aggregate
- FP4: 3.6 EF | FP8: 1.26 EF | NVLink 6: 3.6 TB/s/GPU
- TDP: ~200 kW | India landed: **₹47–65 Cr (est.)** | 5-yr TCO: **~₹122 Cr/rack**
- All ~75 open-weight models (14.4 TB Q4 weights) fit 1 rack (6.3 TB headroom)
- Status: Fall 2026 shipments beginning; limited allocation

### AMD Helios (MI455X, CDNA5) — H2 2026 samples, Q2 2027 mass

- 72× MI455X GPUs, **31 TB HBM4** @ ~1,410 TB/s aggregate
- FP4: 2.9 EF | FP8: 1.4 EF | UALink over Ethernet (open interconnect)
- TDP: ~235 kW | India landed: **₹45–55 Cr (est.)** | 5-yr TCO: **~₹117 Cr/rack**
- 50% more memory than Rubin — fits 2–3× more concurrent users per rack
- ROCm 7 maturity improving; Q2 2027 for mass deployments
- TCS partnership for India distribution

### OpenAI Jalapeño Inference Chip — Aug 25, 2026 (first benchmarks)

- Co-designed with Broadcom; fabricated on TSMC N3P
- **216 GiB HBM4, 15.4 TB/s bandwidth, 700W/die (550W sustained)**
- InferenceX vs GB200/GB300: **1.5–1.9× throughput/kW, 1.7–3.6× lower latency**
- Inference-only (cannot train). "Very small volumes" in OpenAI DCs by end-2026; ramp 2027.
- **No public pricing; no 3rd-party access; no India path.** OpenAI-internal only for now.
- Caveats: No AgentX multi-turn results; single-token vs MTP comparison; Vera Rubin not tested.

### Apple Mac Studio M5 Ultra / Mac mini M6 — Ships Sep 22, 2026

- **Mac Studio M5 Ultra:** Quad-die, 36-core CPU / 80-core GPU, **1.2 TB/s** memory bandwidth, up to 512 GB unified memory. Price: $5,499 (512 GB not orderable at launch). India pricing TBC.
- **Mac mini M6:** 2nm, 12-core CPU / 12-core GPU, 170 GB/s (32 GB) or 153 GB/s (16 GB). From $899. No memory ceiling change.
- **India fit:** M5 Ultra 512 GB → Qwen3.8-27B ✅ fast; DeepSeek V4 Flash (155 GB) ✅ fits in half; GLM-5.3-Flash (160 GB) ✅ fits in half. At 1.2 TB/s: V4 Flash ~80–100 tok/s. Dense-70B needs $5,499 Ultra tier.
- Pre-orders Aug 25; no memory ceiling expansion (32/64/128/512 GB max unchanged).

---

## 2b. Sep 1 2026 Additions & Corrections — Live Cross-Check

### New Models Added
- **Qwen3.8-Max** — 2.4T/95B, custom license, **AA Intelligence Index 58** (independent #1 open-weight), TB2.1 86.6%, SWE-Pro 67.7% — DGX B300 / cloud only.
- **Qwen3.8-Flash-Next** — 125B/6B, Apache Community 1.0, Qwen4 preview, SWE-Pro 62.5%, LCB 91.9%, $0.15/$0.47 — top router MVP.
- **MiniMax M3** — 428B/23B, Modified MIT, multimodal, SWE-V 80.5% — ~214 GB Q4.
- **Kimi K2.7-Code** — ~1T/32B, Modified MIT, coding sibling of K3 — watch vendor benchmarks.
- **Laguna S 2.1** — 118B/8B, OpenMDW-1.1, TB2.1 70.2%, SWE-Pro 59.4%, $0.10/$0.20 — ~59 GB Q4. "West's most capable open-weight coding model."
- **Muse Glimmer** — 29.6B dense, Apache 2.0, **AA Index 35** — vendor claims overstated.
- **Ornith-1.5-397B** — 403B, MIT, TB2.1 86.1, SWE-V 86.0 (#1 HF) — ~244 GB Q4, vendor-reported.
- **Apodex 1.1-mini** — 35B/3B, Apache 2.0, SWE-V 77.7 / TB 70.8 (self-reported), free on platform.apodex.ai — ~17 GB Q4.

### Corrections
- **GLM-5.3 weights released Aug 27** (not Aug 28). HF license shows "other". Reuters >$10B review gate **unverified**.
- **Qwen3.8-27B AA Index = 52** independent.
- **MAI-Code-1-Flash is closed-weight API-only** — remove from self-hostable lists.

See `single_user_india_local_ai.md` §Post-Session Update Sep 1 2026 for full tables.

---

## 6. WATCH LIST — NEXT 30 DAYS (Sep 2026)

> Evidence-based only. No evidence = not listed.

| Model | Provider | Evidence | Why It Matters |
|---|---|---|---|
| **Grok 4.7** | xAI | Elon Musk Aug 12: "3–4 weeks"; training done + SpaceX data added. Grok 4.7 expected ~Sep 12, 2026. Manifold: 85% by end-Sep. | **~2.1T, likely best closed-model on TB2.1 if 4.6 gains extrapolate. Price unknown.** Watch for $2–3/$6–10 range. |
| **Tencent Hy4 (full)** | Tencent | Preview shipped Aug 28; "next Hy4 batch expected soon; official release not far off" | Full Hy4 may add missing TB2.1 / AA Coding Index data, improve blind-eval scores. Apache 2.0. |
| **GLM-5.3-Flash promo end** | Z.ai | Promo expires Sep 9, 2026 | $0.075/$0.25 → $0.15/$0.50 effective Sep 10. Lock in deployments before pricing doubles. |
| **MAI-Code-1-Flash retirement** | Microsoft | GitHub changelog: Sep 10, 2026 | Migrate Copilot pipelines from MAI-Code-1-Flash to 1.1-Flash before Sept 10 or they break. |
| **Qwen4 architecture reveal** | Alibaba | Qwen3.8-Flash-Next is "preview"; Alibaba said full Qwen4 family coming, "fall 2026 rumors" | If Qwen4 ships Sep, it would be the largest Alibaba model refresh ever and the first new-arch flagship since Qwen3 in mid-2025. |
| **Kimi K3 AA Coding Index entry** | Moonshot AI / AA | K3 weights available Jul 27; AA typically adds new models within 4–6 weeks. Expected Sep. | Will confirm whether K3's vendor TB2.1 88.3% holds independently and where it places vs Opus 5 on the coding index. |
| **GLM-5.3 AA Index measurement** | Z.ai / AA | GLM-5.3 weights released Aug 28; AA entry expected within weeks. | First independent measurement of the highest vendor-claimed open-weight TB2.1 score (88.2%). |
| **Hy4 preview AA entry** | Tencent / AA | Same timing pattern as GLM-5.3. | Validates or discredits Tencent's blind-eval claims vs K3/GLM-5.3. |
| **Muse Spark open weights** | Meta | Meta said "soon" at 1.2 launch (Aug 5). | If released, first open-weight Muse Spark. Would be the largest Apache/open Meta model to date. |

---

## Appendix A: Hardware Fit Matrix (Q4 weights, Aug 29 + Sep 1 + Sep 2 sync)

| Model | Q4 size | 1×5090 32GB | 1×Pro6000 96GB | 4×DGX Spark 512GB | 1×DGX B300 2.1TB | Status |
|---|---|---|---|---|---|---|
| **Cohere Parse 5** 🆕 | ~2.3 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **LFM2.5-VL-3B** 🆕 | ~2 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **LFM2.5-2.6B** | ~1.5 GB | ✅ | ✅ | ✅ | ✅ | Available |
| Qwen3.8-27B | 14 GB | ✅ ~200 tok/s | ✅ | ✅ | ✅ | Available |
| Granite 4.2 30B | 15 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **Muse Glimmer** | ~15 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **Hy-MT2-30B-A3B** 🆕 | ~15 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **Nemotron 3.5 Lightning** 🆕 | ~16 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **Apodex 1.1-mini** | ~17 GB | ✅ | ✅ | ✅ | ✅ | Available |
| **Laguna S 2.1** | ~59 GB | offload | ✅ fits | ✅ | ✅ | Available |
| **Qwen3.8-Flash** (API) 🆕 | — (API-only) | — | — | — | — | Available |
| **Qwen3.8-Flash-Next** | ~111 GB | ❌ | ✅ fits | ✅ | ✅ | Preview |
| **Dots3-Note Preview** 🆕 | ~140 GB | ❌ | offload | ✅ | ✅ | Preview |
| GLM-5.3-Flash | 160 GB | ❌ | ❌ | ✅ (25–35 tok/s) | ✅ | Available |
| DeepSeek V4 Flash / Vision | 155 GB | offload | ❌ | ✅ (80–100 tok/s) | ✅ | Available |
| **MiniMax M3** | ~214 GB | ❌ | ❌ | ✅ Q3 | ✅ | Available |
| **Ornith-1.5-397B** | ~244 GB | ❌ | ❌ | ✅ Q3 | ✅ | Available |
| GLM-5.3 | 372 GB | ❌ | ❌ | ✅ Q3 | ✅ | Available |
| Tencent Hy4 preview | 385 GB | ❌ | ❌ | ✅ Q3 | ✅ | Preview |
| DeepSeek V4 Pro 0813 | ~850 GB | ❌ | ❌ | ❌ | ✅ Q2 tight | Available |
| **Qwen3.8-Max** | ~1.2 TB | ❌ | ❌ | ❌ | ❌ (multi-node) | Available |
| Kimi K3 | ~1,400 GB | ❌ | ❌ | ❌ | ❌ (multi-node) | Available |
| **Solar Pro 4 / Namazu / Thomson / GPT-5.6-Cyber** 🆕 | — (API-only) | — | — | — | — | Available/Preview |
| **Claude Fable 5.1 / Mythos 5.1** 🆕 | — (API-only) | — | — | — | — | Available / Preview-gated |
| **Gemini 3.8 Flash / Muse Spark 1.3** 🆕 | — (API-only) | — | — | — | — | Available |
| **Mercury 2.5 Preview** 🆕 | — (API-only) | — | — | — | — | Preview |

*Sep 2 adds Status column aligned to `llm-releases.com` taxonomy. API-only models have no Q4 weight. Parse 5 uses pages pricing, not tok. Sep 1 adds Fable 5.1.*

---

## Appendix B: ₹ Pricing Quick Reference (Aug 29, ₹95.12/USD) — updated Sep 2

| Model | Input ₹/Mtok | Output ₹/Mtok | Cache ₹/Mtok | Open? | Status |
|---|---|---|---|---|---|
| **Cohere Parse 5** | ₹142.68/1k pages* | — | — | ❌ | Available |
| **Hy-MT2-30B-A3B** | — (open weights) | — | — | ✅ Open | Available |
| **Dots3-Note Preview** | Free (OpenRouter) | Free | — | ✅ Apache 2.0 | Preview |
| **LFM2.5-VL-3B** | — (open weights) | — | — | ✅ Open | Available |
| **Nemotron 3.5 Lightning** | — (NIM, open weights) | — | — | ✅ OpenMDW-1.1 | Available |
| **Namazu** | ₹90.36 | ₹380.48 | — | ❌ API-only | Available |
| **Solar Pro 4** | ₹28.54 (promo ₹2.85) | ₹114.14 (promo ₹11.41) | — | ❌ | Available |
| **Ling-3.0-flash-Fin** | Free 1-mo (OpenRouter) | Free 1-mo | — | ⏳ Announced | Available* |
| **GLM-5.2 Turbo** (fast tier) | ₹189.29 | ₹586.03 | — | ❌ API tier | Available |
| GPT-5.6 Luna | ₹19.02 | ₹114.14 | ₹1.90 | ❌ | Available |
| Gemini 3.7 Flash (intro) | ₹71.34 | ₹356.70 | ₹7.13 | ❌ | Available |
| **Qwen3.8-Flash** (prod API) | **₹14.27** | **₹44.71** | **₹1.52** | ❌ API | Available |
| **Qwen3.8-Flash-Next** | — (self-host) | — | — | ✅ Qwen 1.0 | Preview |
| **GLM-5.3-Flash (promo ended Sep 9, 2026; standard $0.15/$0.50 from Sep 10)** | **₹7.13** | **₹23.78** | **₹1.43** | ✅ MIT | Available |
| GLM-5.3-Flash (standard) | ₹14.27 | ₹47.56 | ₹2.85 | ✅ MIT | Available |
| Muse Spark 1.2 Contributor | ₹9.51 | ₹19.02 | — | ❌ closed | Available |
| DeepSeek V4 Flash (off-peak) | ₹10.46 | ₹62.78 | ₹1.05 | ✅ MIT | Available |
| DeepSeek V4 Flash (peak) | ₹20.93 | ₹125.56 | ₹2.09 | ✅ MIT | Available |
| GLM-5.3 | ₹133.17 | ₹418.53 | ₹24.73 | ✅ custom | Available |
| Hy4 preview | ₹79.30 | ₹237.93 | — | ✅ Apache 2.0 | Preview |
| Grok 4.6 (≤200K) | ₹190.24 | ₹570.72 | ₹47.56 | ❌ | Available |
| GPT-5.6 Sol (promo) | ₹380.48 | ₹1,902.40 | ₹38.05 | ❌ | Available |
| Claude Sonnet 5 | ₹190.24 | ₹951.20 | — | ❌ | Available |
| Claude Opus 5 | ₹475.60 | ₹2,378.00 | — | ❌ | Available |
| Claude Fable 5 | ₹951.20 | ₹4,756.00 | ₹95.12* | ❌ | Available |
| **Claude Fable 5.1** 🆕 | **₹951.20** | **₹4,756.00** | **₹23.78** | ❌ | Available |
| **Claude Mythos 5.1** 🆕 | **₹951.20** | **₹4,756.00** | **₹23.78** | ❌ | Preview-gated |
| **Gemini 3.8 Flash** 🆕 | ₹71.34 intro | ₹356.70 intro | ₹7.13 | ❌ | Available |
| **Muse Spark 1.3** 🆕 | ₹118.90 | ₹404.26 | ₹14.27 | ❌ | Available |
| **Mercury 2.5 Preview** 🆕 | ₹19.02 | ₹71.34 | — | ❌ | Preview |
| **Qwen3.8-Max-0902** 🆕 | ₹190.24 | ₹570.72 | ₹23.78* | ❌ | Available |

*Parse 5 billed per 1k pages, not per Mtok. Ling-Fin weights announced week of Aug 31 — API free until weights land. Status column = llm-releases.com taxonomy. *Fable 5 cache was ₹95.12/M; 5.1 cache is **₹23.78/M** (75% cut). Mythos 5.1 same model, gated. *Qwen0902 cache ₹23.78 explicit / ₹16.20 implicit (QwenCloud).*

---

## 7. Changelog — Append-Only Audit Log (synced to llm-releases.com/changelog)

> Every change logged with primary source. Follows llm-releases.com methodology: no overwrite without trace.

| Date | Type | Model | Change | Source |
|---|---|---|---|---|
| Sep 2, 2026 | **Added** | **Cohere Parse 5** (2.3B) | Gap-fill sync vs llm-releases.com — doc-VLM, $1.50/1k pages, Available Proprietary | `llm-releases.com/models/cohere-parse-5` → `cohere.com/blog/parse` |
| Sep 2, 2026 | **Added** | **Ling-3.0-flash-Fin** (124B/5.1B) | Finance-tuned MoE, free 1-mo OpenRouter, weights announced week Aug 31 | `llm-releases.com/models/ling-3-0-flash-fin` → `openrouter.ai/inclusionai/ling-3.0-flash-fin` |
| Sep 2, 2026 | **Added** | **Thomson** (TR) | Proprietary legal model Preview, $40M, Fiduciary-Grade, academic open variant | `llm-releases.com/models/thomson` → `thomsonreuters.com/press-releases/...` |
| Sep 2, 2026 | **Added** | **Hy-MT2-30B-A3B** | MT MoE 30B/3B, 8K, HF `tencent/Hy-MT2-30B-A3B` | `llm-releases.com/models/hy-mt2-30b-a3b` |
| Sep 2, 2026 | **Added** | **Dots3-Note Preview** (280B/16B) | Apache 2.0, 512K, TEMPO RL, IMO 42/42 series | `llm-releases.com/models/dots3-note-preview` |
| Sep 2, 2026 | **Added** | **LFM2.5-VL-3B** (3.1B) | Liquid VLM, SigLIP2, 228 tok/s M5 Max | `llm-releases.com/models/lfm2-5-vl-3b` |
| Sep 2, 2026 | **Added** | **Nemotron 3.5 Lightning** (31.6B/3.6B) | Hybrid Mamba-2+MoE+Attn, 1M, OpenMDW-1.1 | `llm-releases.com/models/nemotron-3-5-lightning` |
| Sep 2, 2026 | **Added** | **Namazu** | Sakana JP finetune of Kimi K2.6, 262K, $0.95/$4.00, not in EU | `llm-releases.com/models/namazu` |
| Sep 2, 2026 | **Added** | **Solar Pro 4** | Upstage 524K, AA 42, $0.30/$1.20 promo $0.03/$0.12 | `llm-releases.com/models/solar-pro-4` |
| Sep 2, 2026 | **Added** | **GPT-5.6-Cyber** | OpenAI cyber specialist, Daybreak Red gated, 95% exploit-chain | `llm-releases.com/models/gpt-5-6-cyber` |
| Sep 2, 2026 | **Split** | **Qwen3.8-Flash** vs **Flash-Next** | Was conflated as one entry; now Available API (Proprietary, 1M) vs Preview weights (Qwen Comm 1.0, 262K→1M) | `llm-releases.com/models/qwen3-8-flash` + `.../qwen3-8-flash-next` |
| Sep 2, 2026 | **Reconciled** | **GLM-5.2 Turbo** | UNCONFIRMED → Available API tier ($1.99/$6.16, llmgateway), no weight | `llm-releases.com/models/glm-5-2-turbo` → `llmgateway.io/models/glm-5.2-fast` |
| Sep 2, 2026 | **Added** | **Claude Fable 5.1 / Mythos 5.1** (Sep 1, same weights) | Fable 5.1 Available GA, Mythos 5.1 Preview-gated; $10/$50 + $0.25 cache (75% cut → ~25% typical / ~45% agentic cheaper); TB-Science 52.6% (2×), TB4.0 55.8%/60.9%, GDPval 1853, OSWorld 41.7/77.9, HLE 65.0, Cursor 73.4 | `anthropic.com/claude-fable-and-mythos-5-1` → `platform.claude.com` `claude-fable-5-1` |
| Sep 2, 2026 | **Added** | **Methodology & Status taxonomy** §0 | Adopted llm-releases.com detection→validation→human review→audit-log + Available/Preview/Retired etc. | `llm-releases.com/methodology` |
| Sep 2, 2026 | **Added** | **Qwen3.8-Max-0902** | Sep 2 refresh, same 2.4T/1M base, TB3.0 29.0% vs 11.3% (2.6×), DeepSWE 69.3% vs 56.6% (verified `aireleasetracker`) | `aireleasetracker.com/model/qwen/qwen3.8-max-0902` + `qwencloud.com/models/qwen3.8-max-0902` |
| Sep 2, 2026 | **Updated** | **MAI-Thinking-1** | Upcoming → **Public Preview Aug 12** (962B/34.7B, 52.8% SWE-Pro, 46.0% TB2.0, 256K) — now §2 card | `microsoft.ai/models/mai-thinking-1` |
| Sep 2, 2026 | **Updated** | **Laguna S 2.1** | Stub → full card (118B/8B, 262K, 70.2% TB2.1 /40.4% DeepSWE, free OpenRouter) | `openrouter.ai/poolside/laguna-s-2.1:free` |
| Sep 2, 2026 | **Updated** | **DeepSeek V4 Flash Vision Exp** | Filled benchmarks **83.9% TB2.1 /59.3% DeepSWE /57.7% NL2Repo**, 1.05M ctx, pricing $0.22/$0.66 off-peak | gap analysis Sep 2 |
| Sep 2, 2026 | **Corrected** | **Muse Spark 1.2 date** | Aug 5/6 → **Aug 5** verified via Meta blog + aireleasetracker | `research.meta.ai/blog` + `aireleasetracker` |
| Sep 2, 2026 | **Clarified** | **Dots3-Note Preview IMO** | 42/42 IMO = **internal harness branch**, not released checkpoint | gap analysis Sep 2 |
| Aug 29, 2026 | Verified | GLM-5.3, Hy4, Qwen etc. | Live search Aug 29–30 verification sweep | Prior log |
| Aug 27–28 | Released | Hy4 preview, Qwen-Next, GLM-Flash | Initial verified additions | Prior log |
| Sep 3-4, 2026 | **Added** | **GPT-6 Astra** | OpenAI new flagship, staged (Daybreak → API/ChatGPT → Azure/Bedrock); **$10/$50** (2.5× Sol promo), cache $1/M (90% off), Fast mode 2×/2×; ~1.05M ctx, 128K out, cutoff Apr 30 2026; **first "Critical" cyber model** (Daybreak-gated); TB4.0 57.9, AA Index 61.2 (ties Sol), OSWorld 2.0 72.6, ExploitBench 100/39; flags: AA Coding Agent 67, DeepSWE 74.1, cost/task **1-source only** | `openai.com/index/gpt-6-astra` + `openai.com/index/path-to-astra` (Sep 1) + `deploymentsafety.openai.com/gpt-6-astra` |
| Sep 3, 2026 | **Added** | **Daybreak for Frontline Defenders** | Cyber access expansion for defensive workflows (secure code review/patching) — Astra-adjacent | `openai.com/index/daybreak-for-frontline-defenders` |
| Sep 4, 2026 | **Added** | **GPT-6 Astra Pro** | Higher-quality reasoning mode of Astra, $10/$50 per Mtok, 1.05M ctx, staged rollout same as Astra | OpenAI Sep 4 announcement + trackers |
| Sep 8, 2026 | **Updated** | **Grok 4.7** watch item | Still not released; Musk Sep 2 "comes out in 10 days" → **~Sep 12**; no model ID/pricing/benchmarks yet. Note xAI's Aug 12 "3–4 weeks" already slipped | X post Aug 12 + Sep 2, 2026 |
| Sep 8, 2026 | **Added** | **MiniCPM5-2B** | OpenBMB small model, ~2.5B dense, Apache 2.0, 131K ctx, vendor avg 53.9 over 34 benchmarks (strongest open <4B) | `openbmb` HF + llm-releases/BenchLM (Sep 7) |
| Sep 8, 2026 | **Updated** | **Mercury 2.5** | Preview Aug 31 → **Full GA Sep 8**, diffusion LM stable, 260K ctx, ~1,107 tok/s | `inceptionlabs.ai` Sep 8 GA + OpenRouter + llm-releases.com |
| Sep 10, 2026 | **Updated** | **DeepSeek V4.1 Flash** | Beta → **Full GA Sep 10**, native multimodal, 333–400+ tok/s, 60% cached-input price cut vs V4 Flash 0731; routes older V4 Flash, outperforms prior Flash/Pro on several axes | DeepSeek API GA Sep 10 + HF + BenchLM/llm-releases.com Sep 10 |
| Sep 8, 2026 | **Added** | **Ling-3.0-flash-Sante** | Medical/health-tuned variant of Ling-3.0-flash (124B/5.1B MoE, 262K), text-only, API-tier; vertical completeness | ThursdAI/BenchLM (Sep 4) |
| Sep 8, 2026 | **Added** | **K2 Horizon family** | IFM/MBZUAI, 6 models 0.9B→375B-A23B, Apache 2.0, **fully open (weights+data+code+checkpoints+logs)**; flagship ~47 AA Index (vendor) | IFM release + trackers (Sep 3) |
| Sep 8, 2026 | **Added** | **Quasar 438B** | Multiverse Computing, Sep 2 listed on BenchLM/ThursdAI; sparse public details — Announced-but-unconfirmed | BenchLM + ThursdAI only |
| Sep 8, 2026 | **Corrected** | **Muse Spark 1.3 AA Index** | Launch-day **61 (xhigh) / 62 (max)** → **live AA v4.3 re-score = 48 (max, #13/202)**; cost/task $1.60, 236.8 tok/s, TTFT 26.9s, 170M idx tokens (very verbose). New index adds Terminal-Bench v4.0, GDP.pdf, CritPt, AA-LCR v1.1. All downstream tables (tracker §2/§4e, cost-per-task, README, local_ai_coding_models, data.json) updated to 48 | `artificialanalysis.ai/models/muse-spark-1-3` (live, Sep 8) + `research.meta.ai` (Sep 2) |

*Sep 2 is first commit with llm-releases.com-synced taxonomy. Next sync: Sep 5–7.*

---

*All figures are planning estimates. Not vendor quotes. Verify before committing to infrastructure spend.*
*Generated: Aug 29, 2026 | Synced: Sep 2, 2026 | **Updated: Sep 10, 2026 (DeepSeek V4.1 Flash GA, Mercury 2.5 GA, GPT-6 Astra Pro)**. Next recommended update: Sep 12–14, 2026 (Grok 4.7 if it lands, GLM-5.3 AA entry, promo expiry Sep 9).*
