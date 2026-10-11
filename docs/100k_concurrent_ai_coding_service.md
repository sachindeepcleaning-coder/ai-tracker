# India AI Coding Service — 100,000 Concurrent Users (All Open-Weight Models, opencode-Style)

**Goal:** Serve ~100,000 concurrent users in India, each able to hot-swap between all open-weight coding models (opencode-style). What does it cost to build, and what must we charge to be profitable?

**Scope assumptions:** agentic coding (read → plan → edit → run → inspect → test → fix → repeat), 99% input / 1% output tokens, continuous batching, ~20-50 tok/s per active user. Currency ₹ unless noted. Cross-references `vera_rubin_all_models.md`, `ai_coding_api_vs_local_summary.json`, `dgx_b300_deep_research.md`.

> **Sep 1 2026 Update:** Live cross-check added: GLM-5.3 weights released Aug 27, license “other” / review gate unconfirmed; Qwen3.8-27B AA 52; MAI-Code-1-Flash closed-weight; new router candidates Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, Laguna S 2.1, MiniMax M3, Ornith-1.5-397B, Apodex 1.1-mini, Muse Glimmer AA 35. See §10 and §2 note.

---

## 1. Demand Math

| Variable | Low | Base | High |
|---|---|---|---|
| Concurrent users | 100,000 | 100,000 | 100,000 |
| Avg output tok/s per active user | 20 | 35 | 50 |
| Aggregate tok/s required | 2.0M | 3.5M | 5.0M |
| Tokens/day (24/7 × 100%) | 173B | 302B | 432B |
| Tokens/day at 50% util | 86B | 151B | 216B |
| Tokens/year at 50% util | 31.5T | 55T | 78.8T |

**Subscriber-to-concurrency ratio** is the other critical demand variable. 100k *concurrent* does **not** equal 100k paying subscribers. At typical SaaS concurrency (10-20% of subscribers active at peak):

| Subscriber ratio | Paying subscribers | Per-sub break-even* |
|---|---|---|
| 5x (20% concurrent) | 500,000 | **~₹2,000/mo** |
| 7.5x (13% concurrent) | 750,000 | ~₹1,400/mo |
| 10x (10% concurrent) | 1,000,000 | ~₹1,000/mo |

\* using 50-rack Rubin fleet cost (₹1,220 Cr/yr ÷ subscribers ÷ 12).

---

## 2. Hardware Sizing

**Strategy B (Dedicated Tiers)** from `vera_rubin_all_models.md` is the efficient deployment for all-models-switchable: 10 Rubin NVL72 racks serve 15,000-25,000 users at 50 tok/s.

| Deployment | Racks for 100k users | Hardware |
|---|---|---|
| All ~86 models switchable — NVIDIA Vera Rubin NVL72 | **40-67 (use 50)** | 3,600 × R100 GPUs |
| All models switchable — AMD Helios (2-3x throughput) | **17-25 (use 20)** | 1,440 × MI455X GPUs |
| **Practical: top 10 coding models only** | **10-15 (use 12)** | 864 × R100 GPUs |

> **Honest reality check:** "all 86 models switchable from one pool" requires orchestration software that **does not exist today** (see §6). A real product ships the **top 8-10 coding models** behind a router — the 12-rack build below. Sep 1 2026 router shortlist candidates now include: DeepSeek V4 Flash/Pro, Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, Qwen3.8-27B (AA 52), GLM-5.3-Flash (MIT, AA 57), GLM-5.3, Kimi K3, MiniMax M3, Laguna S 2.1, Ornith-1.5-397B (verify), Apodex 1.1-mini (watch). The 50-rack build is the "if the software existed" upper bound.

---

## 3. Build Cost in India

### 3a. NVIDIA Rubin NVL72 — 50 racks (all-models upper bound)

| Line item | Per rack (₹ Cr) | 50 racks (₹ Cr) |
|---|---|---|
| Hardware landed India (₹55 Cr mid; incl. ~48% effective duty) | 55 | **2,750** |
| Rack infra (liquid cooling, CDU, UPS, network, storage, facility) | 9.6 | 480 |
| **Total Capex** | **64.6** | **3,230** |
| Power (200 kW × 24/7 × PUE 1.4 @ ₹11.25/kWh) | 2.76/yr | 138/yr |
| AMC / support | 5.0/yr | 250/yr |
| Staff (India) | 0.7/yr (2-3 eng) | **35-70/yr (50-100 eng)** |
| Colocation (200 kW @ ~₹10k/kW/mo) | 2.5/yr | 125/yr |
| Software / inference licenses + network | 0.5/yr | 25/yr |
| **Total Opex** | **~11.5/yr** | **~575/yr** |
| **5-Yr TCO** | **~122** | **~6,100** |

- **Power:** 50 racks × 200 kW = **10 MW**. Needs dedicated grid capacity or a high-density liquid-cooled colo; India grid + backup at this scale is a multi-month procurement.
- **Duty tip:** via STPI/EoU/SEZ bonded import, the ~48% duty (25% BCD + 18% IGST + SWS) can be deferred/exempted — worth **~₹1,000 Cr+** on this build (see `dgx_b300_deep_research.md` for the DGX precedent: ₹5.5 Cr gray vs ₹4.03 Cr STPI).
- **Staff:** 50 racks realistically needs **50-100 engineers** (SRE, ML/inference, platform), not the 2-3/rack the per-rack model assumes.

### 3b. AMD Helios — 20 racks (all-models, cheaper)

| | Per rack (₹ Cr) | 20 racks (₹ Cr) |
|---|---|---|
| Capex (₹50 Cr landed mid) | ~57 | ~1,140 |
| Opex/yr | ~11.8 | ~236 |
| **5-Yr TCO** | **~117** | **~2,340** |

Helios serves 2-3x users/rack (31 TB HBM4 vs 20.7 TB) so **~20 racks replace 50 Rubin racks** at ~40% of the 5-yr TCO. Risks: ROCm 7 maturity, Q2 2027 mass availability, engine support for all architectures.

### 3c. Practical: Top 10 coding models — 12 racks (recommended MVP)

| | Per rack (₹ Cr) | 12 racks (₹ Cr) |
|---|---|---|
| Capex | 64.6 | **~775** |
| Opex/yr | 11.5 | **~138** |
| **5-Yr TCO** | **~122** | **~1,470** |

Serving 8-10 models behind a router is achievable with existing engines (vLLM/SGLang per-model engine pools + a load balancer) — **this is the build that can be real this year.**

### 3d. Comparison summary

| Build | Racks | Capex | 5-Yr TCO | Serves |
|---|---|---|---|---|
| Rubin, all models | 50 | ₹3,230 Cr | **₹6,100 Cr** | All ~86, switchable* |
| Helios, all models | 20 | ₹1,140 Cr | **₹2,340 Cr** | All ~86, switchable* |
| **Rubin, top-10 models (MVP)** | **12** | **₹775 Cr** | **₹1,470 Cr** | Top 10, switchable ✅ |

\* blocked by software gap until orchestration is built (~₹50-100 Cr, 2-3 yrs).

---

## 4. Break-Even Cost per User

| Build | 5-yr cost / 100k users | Per user / yr | **Per user / mo** |
|---|---|---|---|
| 50× Rubin | ₹6,100 Cr | ₹122,000 | **~₹10,200/mo** |
| 20× Helios | ₹2,340 Cr | ₹46,800 | **~₹3,900/mo** |
| 12× Rubin (top-10) | ₹1,470 Cr | ₹29,400 | **~₹2,450/mo** |

**Per-seat break-even ≈ ₹2,500-10,000/mo** depending on build. At 20% concurrency (500k subscribers), the same cost spread over the subscriber base gives **~₹2,000/mo per subscriber** for the 50-rack build.

**Per-token break-even** (50-rack, 50% util): ₹1,220 Cr/yr ÷ tokens served.

| Utilization | Tokens/yr | Break-even per 1M tokens |
|---|---|---|
| 50% | 31.5T-79T | **~₹150-390/M** |
| 75% | 47T-118T | ~₹100-260/M |

The wide range is the fleet serving 2M vs 5M tok/s. Self-hosting break-even is *not* automatically cheaper than APIs on raw tokens — the margin comes from **cache-hit pricing** (see §5).

---

## 5. What to Charge — Two Complementary Models

### Model A: Usage-based tokens (price like an API)

Self-hosted **cache-hit input is nearly free** (no prefill recompute). This is where the profit lives — DeepSeek API charges ₹0.27/M for cache hits; we can undercut and still keep 90%+ margin.

| Token type | Break-even | **Charge** |
|---|---|---|
| Cache-hit input | ~₹1-5/M | **₹10-30/M** |
| Cache-miss input | ~₹150-390/M | **₹400-800/M** |
| Output | ~₹150-390/M | **₹1,500-3,000/M** |

At agentic workload (90%+ cache hits), effective user price lands **₹50-150 per 1M tokens** — 3-10x cheaper than GPT-5.6 Sol (₹476/2,854) and competitive with DeepSeek V4 Flash (₹13.3/26.6) while offering model switching.

### Model B: Subscriptions (per-seat, more predictable)

Anchor: break-even **₹2,000-10,000/mo** per user. Price to hit **₹12-15k/mo blended average** (2-4x margin):

| Tier | Price/mo | Target |
|---|---|---|
| Student / light | ₹3,000-5,000 | hobby, ~10-50 tasks/day |
| Pro coder | ₹15,000-20,000 | daily heavy agentic use |
| Team / enterprise | ₹25,000-40,000 | 24/7 CI-grade agent fleets |

Blended ₹12-15k/mo × 500k subscribers = **₹600-750 Cr/mo revenue** vs ~₹102 Cr/mo fleet cost → **5-7x margin** if utilization is reached.

> Reference points: Cursor Pro $20 (~₹1,900), GitHub Copilot $10-39, Devin $500 (~₹47.6k). Our ₹15-20k/mo Pro tier sits squarely in the enterprise-agent band.

### Break-even check

| Scenario | Revenue | Fleet cost | Result |
|---|---|---|---|
| 500k subs × ₹5k/mo (conservative) | ₹250 Cr/mo | ~₹102 Cr/mo | ✅ 2.5x |
| 500k subs × ₹13k/mo (blended) | ₹650 Cr/mo | ~₹102 Cr/mo | ✅ 6x |
| 200k subs × ₹5k/mo (low adoption) | ₹100 Cr/mo | ~₹102 Cr/mo | ⚠️ break-even |
| 500k subs, 25% utilization | ₹250 Cr/mo | ~₹102 Cr/mo | ✅ (fleet over-provisioned) |

---

## 6. The Software Gap — the Real Cost

Per `vera_rubin_all_models.md`: **"No inference engine exists that can serve all 61 architectures simultaneously from one GPU pool. The hardware fits; the software doesn't exist yet."**

| Component | Today | Needed for all-models switch |
|---|---|---|
| Per-model serving | vLLM, SGLang, TensorRT-LLM ✅ | Same ✅ |
| Multi-arch GPU pool sharing | ❌ | Custom orchestrator + KV scheduler |
| Hot-swap across 86 models | ❌ | Custom router + model-pool manager |
| Cost to build | — | **~₹50-100 Cr, 2-3 yrs engineering** |

**Practical path:** ship top-10 models with per-engine pools + router **now** (₹775 Cr build, this year), add architectures incrementally as the orchestrator matures. Do not buy 50 racks before the software is proven.

---

## 7. Risk Register (India-specific)

| Risk | Severity | Mitigation |
|---|---|---|
| Software orchestration doesn't exist | 🔴 Critical | Start with top-10 models + router; grow pool |
| Utilization below 50% | 🔴 High | Usage-based pricing + capacity on demand; rent before buying |
| Power / colo at 10 MW scale | 🟠 Medium | Lock colo capacity early; EoU/STPI for duty; grid agreements |
| Staff cost (50-100 eng) | 🟠 Medium | ₹35-70 Cr/yr line item; offshore hiring |
| NVIDIA supply / allocation (Rubin) | 🟠 Medium | Helios (TCS partnership) as backup; resellers |
| AMD ROCm maturity (if Helios) | 🟠 Medium | Engine compatibility POC before capex commit |
| API price competition (DeepSeek cache hits ₹0.27/M) | 🟡 Medium | Compete on switching + data residency + uptime, not raw price |
| Component depreciation (5-yr assumption) | 🟡 Medium | Aggressive AMC; reuse GPUs for training after |

---

## 8. Bottom Line

- **Build (real, this year):** ~₹775 Cr capex / **₹1,470 Cr 5-yr TCO** for 12 racks serving the top 10 coding models to 100k concurrent users.
- **Build (all models, if software existed):** ~₹3,230 Cr capex / **₹6,100 Cr 5-yr TCO** (50× Rubin) or ~₹1,140 Cr / **₹2,340 Cr** (20× Helios).
- **Break-even:** ~₹2,500-10,200/mo per concurrent user, or ~₹150-390 per 1M tokens at 50% utilization.
- **Charge:** ₹15-20k/mo Pro subscriptions (blended ₹12-15k) and/or usage-based ₹400-800/M cache-miss input + ₹10-30/M cache-hit input. At 500k subscribers × ₹13k/mo blended → **~6x margin**, payback under 2 years.
- **Do first, in order:** (1) top-10 model router POC → (2) 1-2 racks to prove utilization → (3) scale racks to demand → (4) build the multi-architecture orchestrator. **The racks are the easy 90% of the budget; the software is the product.**

---

## 9. Post-Session Update (Aug 27-29, 2026) — Landscape Changes Affecting This Plan

| Event | Impact on this plan |
|---|---|
| **GLM-5.3-Flash released (Aug 26, verified Aug 29)** — 320B/18B MoE, **MIT**, 1M ctx, natively multimodal, $0.15/$0.50 (cache $0.03; promo halves rates to Sep 9); AA Index 57 (= Opus 4.8); vendor TB2.1 84.3, DeepSWE 63.4. The "Ox Alpha" stealth model (~42T tokens in 6 days on Chinese chips). | **New top-10 router MVP candidate.** 18B active = ~2.8× cheaper per output token to serve than GLM-5.3's 40B at similar quality; MIT = cleanest commercial position of the current GLM line; 1M ctx. Add to the top-10 list alongside DeepSeek V4 Flash, Qwen3-Coder, Kimi K3, MiniMax M3, GPT-OSS-120B. ~160 GB Q4 → fits comfortably in the existing 12-rack topology. |
| **GLM-5.3 weights released (Aug 28, verified)** — 141 shards ~756 GB, custom license (>$10B → security review). Was API-only. | Flagship now self-hostable; no longer need Flash-as-proxy. If you need max coding/cyber (88.2 TB2.1, CyberGym 84.5), you can host GLM-5.3 itself — same 12-rack topology, ~372 GB at Q4. |
| **Tencent Hy4 preview (Aug 28, verified)** — 770B/49B MoE, 1M+ ctx, **Apache 2.0**, preview-first; API $0.834/$2.501; weights on HF/ModelScope/GitCode/CNB. | **New entrant:** doubles Hy3 (295B/21B). Tencent claims blind eval edges GLM-5.3/K3. If verified, becomes top-10 candidate. Fits 1 Rubin rack at Q4 (~385 GB). Data-center only today, not sub-crore. |
| **DeepSeek peak/off-peak billing (Aug 16, verified)** — V4 Pro $0.435/$0.87 → $0.66/$1.98 off-peak, $1.32/$3.96 peak (peak 01–04 & 06–10 UTC); V4 Flash $0.14/$0.28 → $0.22/$0.66 off-peak / $0.44/$1.32 peak. | DeepSeek's API is **no longer the price floor** it was in §5 — the "undercut DeepSeek cache-hit" strategy now has more room (their cheapest off-peak output is 2.3× the old rate). Self-hosted DeepSeek V4 Flash remains strongly competitive for the agentic 99/1 workload. |
| **GPT-5.6 Sol promo $4/$20 (Aug 21, → Nov 21, 2026, verified)** | Proprietary flagship now ~⅓ of Fable 5 per token; strengthens the "reseller" alternative in §3.4 of the session log — own-racks pitch must lean on data residency + model switching, not raw price. |
| **Claude Sonnet 5 price hike cancelled** ($2/$10 permanent) | Mid-tier API competition softens slightly; no action. |
| **Gemini 3.7 Flash doubles to $1.50/$7.50 on Jan 1, 2027 (verified on Google)** | 2027 cost models must use the higher rate (already noted in `ai_cost_per_task_comparison.md`). |

**Net (Aug 29):** the MVP (12 racks, top-10 models + router) is unchanged in hardware; **GLM-5.3 no longer API-only** — you can host flagship (~372 GB Q4) or Flash (MIT, 160 GB Q4) per commercial need. **Hy4 preview** is a new watch: Apache 2.0 + 1M ctx, fits 1 rack, but preview quality unproven — evaluate before adding to router.

---

## 9B. Post-Session Update (Sep 1, 2026) — Missing Models & Corrections Affecting Router MVP

| Model / Change | Date | Key Details | Impact on Router MVP |
|---|---|---|---|
| **Qwen3.8-Max** | Weights Aug 13 (announced Aug 3) | 2.4T/95B MoE, ~1M ctx, **AA Index 58 (independent, highest open-weight)**, custom license (>$50M/yr MaaS revenue gate) | **Must-add to top-10 router.** Displaces nothing — it's the new AA open-weight leaderboard leader. Needs ~1.2 TB Q4 (8×96 GB node). Adds strongest open-weight reasoning/coding to the pool. |
| **Qwen3.8-Flash-Next** | Aug 26 | 125B total / 6B active, Qwen4 architecture preview, Apache Community 1.0, 262K→1M YaRN, **$0.15/$0.47** on QwenCloud, ~111 GB Q4 | **Strong router candidate.** 6B active = cheapest Qwen to serve per token. SWE-Pro 62.5%, LCB 91.9%, Toolathlon 73.5%. Fits 1× Pro 6000 or 3× 5090. Beats GLM-5.3-Flash on SWE-Pro; add alongside it. |
| **MiniMax M3** | Jun 1 (weights) | 428B/23B MoE, 1M ctx, native multimodal, **$0.23-0.3/$0.96-1.2**, Modified MIT, ~214 GB Q4 | **Router candidate.** Was mentioned by name only; now fully specified. SWE-Verified 80.5% (vendor), competitive with GLM-5.3. Fits 8× 5090 or 1× Mac 512GB. Multimodal + 1M ctx = versatile. |
| **Kimi K2.7-Code** | Jun 12 | ~1T/32B active, Modified MIT, coding-specialized, 256K ctx | **Watch.** Cheaper, coding-focused sibling of K3. Not yet on AA Index. If self-hostable at ~500 GB Q4, it's a tier below K3 but above Qwen3.8-27B for pure coding. |
| **Laguna S 2.1** | Jul 21 | 118B/8B active MoE, 1M ctx, OpenMDW-1.1 (commercial OK), **$0.10/$0.20** on OpenRouter, ~59 GB Q4 | **Strong router candidate.** "West's most capable open-weight coding model" (Poolside claim). TB2.1 70.2%, SWE-Pro 59.4%. Fits 1× Pro 6000. Apache-compatible license + low API price = easy add. |
| **Muse Glimmer** | Aug 10 | 29.6B dense, Apache 2.0, AA Index **35** (independent) | **Downgrade from router.** Session log claimed "beats Qwen3.6 27B on tool use"; AA Index 35 is far below Qwen3.6-27B (AA ~52) and other router candidates. Vendor-vs-independent gap is widest of any August release. Keep as lightweight local option only. |
| **Ornith-1.5-397B** | Aug 19 | 403B total, MIT, **TB2.1 86.1 (vendor, HF #5)**, SWE-V 86.0 (HF #1), 3-stage self-improving RL, ~244 GB Q4 | **Watch / near-router.** MIT + competitive TB2.1 vs GLM-5.3 (88.2) / K3 (88.3). All benchmarks vendor-reported; no independent reproduction yet. Partial BenchLM listing (#23 overall, #17 Agentic). If verified, displaces nothing but joins GLM-5.3/K3 tier. |
| **Apodex 1.1-mini** | Aug 24 | 35B/3B MoE, Apache 2.0, Qwen3.5 base, SWE-V 77.7 / TB 70.8 (self-reported), free on platform.apodex.ai, ~17 GB Q4 | **Watch only.** Very new, thin on independent verification. If verified, best Apache 2.0 sub-20GB coding model — but not router-tier yet. |

### Corrections to Existing Entries

| Item | Correction |
|---|---|
| **GLM-5.3 weights release** | Live sources: **Aug 27** (not Aug 28). HF repo license shows "other" — the ">$10B/12-mo revenue → Z.ai security review" trigger language is unconfirmed; treat as unverified until Z.ai publishes license terms. |
| **Qwen3.8-27B AA Index** | Independently measured at **52** (not previously stated). Below GLM-5.3-Flash (57) and Qwen3.8-Max (58); still best single-GPU dense option. |
| **MAI-Code-1-Flash** | Microsoft's model is **MAI-Code-1-Flash** (no ".1"), **closed-weight & API-gated** (Copilot only). No public weights repo. Remove from self-hostable counts. |
| **DGX B300 "$550K Reuters"** | No Reuters primary source found. Market reports (Thunder Compute, Spheron, tech-insider) cite $400-650K. Soften citation. |
| **DGX B300 cooling** | Your rejection of "liquid cooling required" was correct: NVIDIA Data Center Best Practices confirms DGX B300 ships air-cooled (ARDHx, 1,500 CFM, 1,100W bin). Liquid only mandatory for HGX B300 1,400W bin. |

### Updated Router MVP Candidate List (Sep 1, 2026)

| Tier | Models | Why |
|---|---|---|
| **Core (must-have)** | DeepSeek V4 Flash/Pro, GLM-5.3/Flash, Qwen3.8-Max, Kimi K3, MiniMax M3 | Top AA Index / benchmark coverage; diverse active-param profiles |
| **Efficiency specialists** | Qwen3.8-Flash-Next (6B), Qwen3.8-27B (27B dense), Laguna S 2.1 (8B active) | Low VRAM/token cost; high SWE-Pro per GB |
| **Watch (eval before add)** | Ornith-1.5-397B (MIT, TB 86.1), Kimi K2.7-Code, Apodex 1.1-mini | Vendor-reported only; need independent runs |
| **Dropped / local-only** | Muse Glimmer (AA 35), MAI-Code (closed) | Outclassed or unavailable for self-host |

**Hardware impact:** Qwen3.8-Max adds ~1.2 TB Q4 requirement (1 extra 8×96 GB node in the 12-rack topology). All other adds fit in existing 12-rack headroom. Net: **+1 node equivalent** for the new Max-tier model.

*Sources: Qwen HF repos (Aug 3/13/26), MiniMax blog (Jun 1), Poolside blog (Jul 21), Meta HF (Aug 10), DeepReinforce/Ornith HF (Aug 19), Apodex HF (Aug 24), Microsoft Build 2026, Artificial Analysis (Sep 1), Thunder Compute/Spheron 2026 pricing, NVIDIA Data Center Best Practices (DGX B300 cooling).*

---

*Assumptions: ₹95.12/USD; duty ~48% of CIF; Rubin ₹55 Cr landed/rack; per-rack 5-yr TCO ₹122 Cr; Helios ~₹117 Cr/rack; Strategy B = 10 racks ≈ 15-25k users at 50 tok/s; agentic 99/1 input/output; 10-20% subscriber concurrency. All figures are planning estimates, not quotes. Generated 2026-08-09, landscape update 2026-08-29, verified via live search.*

*Sources: tencent.com 2026-08-28, technode.com 2026-08-28, runtimewire.com 2026-08-28, openai.com 2026-08-25, developers.openai.com, api-docs.deepseek.com, blog.google 2026-08-13, apple.com/newsroom 2026-08-25.*
