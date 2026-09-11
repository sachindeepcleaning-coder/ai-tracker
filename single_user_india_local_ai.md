# Local AI for a Single User in India — Models, Memory, Hardware & Cost

**As of:** August 29, 2026 · **Updated Sep 1, 2026 (live cross-check)** · **Scope:** running open-weight coding models locally (single user), at good token/s, with India hardware pricing. **Verified via live search Aug 29** — added Tencent Hy4 preview (Aug 28) + GLM-5.3 weights (Aug 28). **Sep 1 corrections:** GLM-5.3 weights date Aug 27, license detail unconfirmed; Qwen3.8-27B AA Index 52; MAI-Code-1-Flash closed-weight; new models: Qwen3.8-Max (AA 58), Qwen3.8-Flash-Next, MiniMax M3, Kimi K2.7-Code, Laguna S 2.1, Ornith-1.5-397B, Apodex 1.1-mini; Muse Glimmer AA 35.

---

## 1. The Open-Source Lineup (Aug 2026)

DeepSeek V4 family naming: **V4 Pro Preview (April)** → **V4 Flash 0731** → **V4 Pro 0813/0831**. Terminal-Bench 2.1 progression: **72.1 → 82.7 → 87.9**.

V4 Pro 0831 vs Flash 0731 (post-training lift, real gains not just scale): Terminal-Bench **+5.2**, DeepSWE **+8.3**, NL2Repo **+7.3**, CyberGym **+6.6**, AutomationBench **+6.7**.

### Head-to-head (Terminal-Bench 2.1 / DeepSWE v1.1)

| Model | TB 2.1 | DeepSWE v1.1 | Notes |
|---|---|---|---|
| Kimi K3 | **88.3** | **67.5** | 2.8T total / ~104B active, huge |
| **Tencent Hy4 preview** 🆕 | — (Tencent claims edges GLM-5.3/K3 blind eval) | — | **770B/49B MoE, 1M+ ctx, Apache 2.0, Aug 28** — doubles Hy3 (295B/21B 256K → 770B/49B 1M); free 2 wks on WorkBuddy/CodeBuddy; API $0.834/$2.501; weights on HF/ModelScope/GitCode/CNB |
| GLM-5.3 | **88.2** | 66.9 | Same base as 5.2; gains are almost pure post-training. **Weights released Aug 27** (141 shards ~756 GB, custom license >$10B revenue → security review; not MIT). **License detail unconfirmed** (HF shows "other"). CyberGym 84.5 |
| **GLM-5.3-Flash** 🆕 | **84.3** | 63.4 | 320B/18B MoE, 1M ctx, natively multimodal, **MIT**, $0.15/$0.50 (promo half to Sep 9); AA Index 57 = Opus 4.8. Ex-"Ox Alpha" stealth (6 days ~42T tokens on Chinese chips). Weights on HF Aug 26 |
| **Qwen3.8-Max** 🆕 | **86.6** | 56.6 | 2.4T/95B, **AA Index 58** (independent, #1 open-weight), custom license (>$50M/yr MaaS gate), ~1.2 TB Q4 |
| **Ornith-1.5-397B** 🆕 | **86.1** (HF #5) | **56.0** | 403B, MIT, ~244 GB Q4, 3-stage self-improving RL. All vendor-reported; partial BenchLM listing only |
| **Qwen3.8-Flash-Next** 🆕 | — | **58.7** | 125B/6B, Qwen4 preview, Apache Community 1.0, $0.15/$0.47, ~111 GB Q4 |
| DeepSeek V4 Pro 0813/0831 | 87.9 | 62.7 | Real post-training lift over Flash 0731 |
| **Laguna S 2.1** 🆕 | **70.2** | — | 118B/8B, OpenMDW-1.1, $0.10/$0.20, ~59 GB Q4. "West's most capable open-weight coding model" |
| Qwen 3.8 27B | 73.0 | 42.2 | Dense, dropped Aug 14; **AA Index 52** (independent); strongest local-runnable 27B |
| DeepSeek V4 Flash 0731 | 82.7 | — | 284B total / ~13B active MoE — the efficiency standout |
| **MiniMax M3** 🆕 | — | — | 428B/23B, 1M ctx, multimodal, $0.23-0.3/$0.96-1.2, Modified MIT, ~214 GB Q4 |
| **Apodex 1.1-mini** 🆕 | **70.8** | — | 35B/3B, Apache 2.0, free on platform.apodex.ai, ~17 GB Q4. Self-reported only |
| **Muse Glimmer** 🆕 | — | — | 29.6B dense, Apache 2.0, **AA Index 35** (independent) — vendor claims overstated |

### Ranking axes

- **Coding depth / real repo work (SWE-bench Pro):** Fable 5 is a different league (~12+ pts clear of next best). Everything else clusters lower.
- **Terminal / long-horizon agentic:** extremely tight — K3 ≈ GLM-5.3 ≈ V4 Pro 0831 ≈ Fable 5 (all within ~5 pts depending on harness).
- **Cyber:** GLM-5.3 edges Fable 5 slightly (84.5 vs 83.8).
- **Local / self-hosted attractiveness:**
  1. V4 Pro 0831 (when weights land)
  2. V4 Flash 0731 (already the standout MoE efficiency play)
  3. **Qwen3.8-Flash-Next** 🆕 (125B/6B, Apache Community 1.0, 1M ctx + native vision; ~111 GB Q4 → multi-GPU, ~6× faster/token than Qwen3.8-27B on the smaller active slice)
  4. GLM-5.3-Flash 🆕 (320B/18B, MIT, 1M ctx + native vision; ~160 GB Q4 → multi-GPU, ~2× faster/token than GLM-5.3 on the smaller active slice)
  5. Qwen 3.8 27B (dense, multimodal, Apache 2.0, fits high-end single-GPU)
  6. **Laguna S 2.1** 🆕 (118B/8B, OpenMDW-1.1, $0.10/$0.20, ~59 GB Q4 — fits 1× Pro 6000)

---

## 2. What Each Coding Benchmark Measures

| Benchmark | What it tests | Why it matters |
|---|---|---|
| Terminal-Bench 2.1 | Multi-step terminal/CLI work: navigate files, run commands, edit code, fix errors in real environments | Real agentic coding in a shell |
| SWE-bench Pro | Fixing real GitHub issues in professional-scale repos (harder, more realistic than Verified) | Deep software-engineering ability |
| DeepSWE | Complex multi-file software-engineering tasks with sustained cross-codebase reasoning | Harder, longer-horizon coding |
| NL2Repo | Turning natural-language descriptions into complete working repositories | End-to-end project generation |
| SWE-bench Verified | Solving verified real GitHub issues (cleaner, slightly easier) | Standard real-world bug fixing |
| LiveCodeBench | Fresh, contamination-resistant competitive programming / code generation | Pure coding skill, no leakage |

---

## 3. Coding Strength Ranking (Open + Closed)

| 1 | **Claude Fable 5** | Clear #1 in deep coding / repo work | SWE-Pro ~80.0–80.3, SWE-Verified 95.0 | ❌ closed |
| 2 | **Kimi K3** | Extremely strong agentic + terminal | TB2.1 88.3, DeepSWE 67.5 | ✅ (huge) |
| 2b | **Tencent Hy4 preview** 🆕 | New — claims top open tier (1M ctx, 770B/49B) | Tencent blind eval edges GLM-5.3/K3 | ✅ (770B, Apache 2.0, Aug 28) |
| 3 | **GLM-5.3** | Best pure open-weight coder (now self-hostable) | TB2.1 88.2, DeepSWE 66.9, CyberGym 84.5 | ✅ (756 GB, **Aug 27**) |
| 4 | **DeepSeek V4 Pro 0831** | Excellent all-rounder | TB2.1 87.9, DeepSWE 62.7 | ✅ |
| 5 | **Qwen 3.8 Max** | **AA Index 58** (independent, #1 open-weight); strong but trails top cluster | TB2.1 86.6, SWE-Pro 67.7, OSWorld leader | ✅ (huge, custom license) |
| 5b | **Ornith-1.5-397B** 🆕 | MIT, 3-stage self-improving RL, Qwen3.5 base | TB 2.1 86.1 (#5 HF), SWE-V 86.0 (#1 HF), SWE-Pro 65.1 | ✅ (~244 GB Q4, Aug 19) |
| 6 | **DeepSeek V4 Flash 0731** | Best efficiency / local option | TB2.1 82.7, ~13B active | ✅ |
| 7 | **GLM-5.3-Flash** 🆕 | Cheap MIT proxy for GLM-5.3 (2× faster/token, 1M ctx, multimodal) | TB2.1 84.3, AA Index 57, $0.15/$0.50 | ✅ (160 GB Q4) |
| 8 | **Qwen3.8-Flash-Next** 🆕 | Qwen4 architecture preview, 6B active, coding-competitive | SWE-Pro 62.5, LCB 91.9, Toolathlon 73.5 | ✅ (111 GB Q4, Aug 26) |
| 8b | **Apodex 1.1-mini** 🆕 | PIVOT-RL on Qwen3.5-35B-A3B, Apache 2.0 | SWE-V 77.7, TB 70.8, APEX-Agents 27.7 (self-reported) | ✅ (~17 GB Q4, free campaign) |
| 9 | **Qwen 3.8 27B** | **AA Index 52** (independent); best small dense local model | TB2.1 73.0, DeepSWE 42.2 | ✅ |
| 9b | **Ornith-1.5-35B-A3B** 🆕 | MIT, mid-size MoE, same family as 397B | TB 67.8, SWE-V 79.0 (self-reported) | ✅ (~22 GB Q4) |
| 10 | **Laguna S 2.1** 🆕 | OpenMDW-1.1, cheapest API, fits 1× Pro 6000 | TB 70.2, SWE-Pro 59.4 | ✅ (~59 GB Q4) |
| 10b | **Ornith-1.5-9B** 🆕 | MIT, tiny dense, single-GPU | TB 46.2, SWE-V 70.6 (self-reported) | ✅ (~6 GB Q4) |
| 11 | **MiniMax M3** 🆕 | 428B/23B, multimodal, 1M ctx | SWE-V 80.5 | ✅ (~214 GB Q4) |
| 11b | **Muse Glimmer** 🆕 | **AA Index 35** (independent) — vendor claims overstated | Apache 2.0, lightweight local | ✅ (~15 GB Q4) |
| 11c | **Kimi K2.7-Code** 🆕 | Coding-specialized sibling of K3 | Modified MIT, ~500 GB Q4 | ✅ |
| 11d | **MAI-Code-1-Flash** 🆕 | **Closed-weight, API-gated (Copilot only)** — no public weights | SWE-Verified 72.6, TB2.1 62.9 | ❌ (not self-hostable) |

**Takeaways:** Absolute best coding depth → Fable 5. Best open-weight overall → GLM-5.3 or K3 (very close). **Best open-weight AA Index → Qwen3.8-Max (58)**. Best MIT-licensed open coder → **Ornith-1.5-397B** (MIT, TB 86.1, SWE-V 86.0, 244 GB Q4). Best efficiency → **V4 Flash 0731** or **Qwen3.8-Flash-Next** (~111GB Q4, SWE-Pro 62.5). Best single-GPU → **Qwen3.8-27B** (AA Index 52, 17GB Q4, ~200 tok/s on 1×5090) or **Ornith-1.5-9B** (~6GB Q4, MIT). **Best budget API + local → Laguna S 2.1** ($0.10/$0.20, ~59 GB Q4, fits 1× Pro 6000). **MAI-Code-1-Flash is closed-weight** — not self-hostable; remove from local deployment plans.

---

## 4. Qwen 3.8 27B vs Everyone (Coding Benchmarks)

| Model | Terminal-Bench 2.1 | SWE-bench Pro | DeepSWE | NL2Repo | AA Index (ind.) | Notes |
|---|---|---|---|---|---|---|
| Qwen 3.8 27B | 73.0 | 61.7 | 42.2 | 42.3 | **52** | Current best dense 27B |
| Qwen 3.6 27B | 63.4 | 53.5 | 13.3 | 36.2 | — | Previous generation |
| DeepSeek V4 Flash 0731 | 82.7 | ~52.6 | 54.4 | 54.2 | — | Strongest Flash version |
| DeepSeek V4 Flash (Preview) | 61.8 | — | 7.3 | 39.4 | — | Much weaker |
| Tencent Hy3 | 71.7 | 57.9 | 28.0 | ~45.6 | — | 295B MoE / 21B active |
| Qwen 3.6 Max | ~74–75 | ~50.9 | — | — | — | Larger older MoE |
| **Qwen3.8-Max** 🆕 | **86.6** | **67.7** | **56.6** | — | **58** | 2.4T/95B, custom license |
| **Qwen3.8-Flash-Next** 🆕 | — | **62.5** | **58.7** | 48.1 | — | 125B/6B, Apache Community 1.0 |
| **MiniMax M3** 🆕 | — | — | — | — | — | 428B/23B, multimodal |
| **Laguna S 2.1** 🆕 | **70.2** | **59.4** | — | — | — | 118B/8B, OpenMDW-1.1 |
| **Ornith-1.5-397B** 🆕 | **86.1** | **65.1** | **56.0** | **59.5** | — | 403B, MIT, vendor-reported |
| **Muse Glimmer** 🆕 | — | — | — | — | **35** | 29.6B dense, Apache 2.0 |

### How much better is Qwen 3.8 27B?

- **vs Qwen 3.6 27B:** TB +9.6, SWE-Pro +8.2, DeepSWE **+28.9** (13.3 → 42.2, a generational leap). Clear upgrade.
- **vs V4 Flash Preview:** better on almost every metric.
- **vs V4 Flash 0731:** Flash wins on TB (82.7 vs 73.0) and DeepSWE (54.4 vs 42.2); Qwen competitive/better on SWE-Pro and far easier to run (27B dense vs 284B MoE).
- **vs Tencent Hy3:** near-tie on TB (73.0 vs 71.7), Qwen wins SWE-Pro (61.7 vs 57.9) and DeepSWE (42.2 vs 28.0) despite Hy3 being a 295B MoE.
- **vs Qwen 3.6 Max:** competitive or better on several metrics despite being far smaller and fully dense.

### vs Claude models (benchmark comparison)

| Model | Terminal-Bench 2.1 | SWE-bench Pro | DeepSWE | Overall level |
|---|---|---|---|---|
| Claude Fable 5 | 83.4–88.0 | ~80.0–80.3 | ~69–70 | Clear #1, far ahead |
| Claude Opus 4.8 | ~84.6–85 | ~69.2 | ~58–59 | Strong flagship |
| Claude Sonnet 5 | ~80.4 | ~63.2 | — | Stronger current mid-tier |
| Claude Opus 4.6 / 4.7 | ~74–80 | ~55–65 | lower | Mid-to-high |
| **Qwen 3.8 27B** | **73.0** | **61.7** | **42.2** | — |
| Claude Haiku 4.5 | significantly lower | ~50–73 (Verified) | — | Budget tier |

- **vs Haiku:** Qwen wins easily.
- **vs Sonnet 4.6:** same ballpark, often matches/beats it on Terminal-style agentic work.
- **vs Sonnet 5 / Opus 4.8 / Fable 5:** clearly behind.

---

## 5. Weight Sizes by Quantization (approximate)

| Model | Total / Active | Native / Official | 4-bit | 3-bit | 2-bit |
|---|---|---|---|---|---|
| Qwen 3.8 27B | 27B dense | BF16 ≈ 54–56 GB, FP8 ≈ 30–31 GB | ~17 GB | ~13–15 GB | ~9–11 GB |
| **Qwen3.8-Flash-Next** 🆕 | 125B / ~6B (125B+51B n-gram+4B MTP) | BF16 ≈ 360 GB, FP8 ≈ 180 GB | ~111 GB | ~85 GB | ~55–60 GB |
| **Qwen3.8-Max** 🆕 | 2.4T / 95B | TB-class | ~1.2 TB | — | multi-node |
| **Laguna S 2.1** 🆕 | 118B / 8B | BF16 ≈ 236 GB | ~59 GB | ~44 GB | ~30 GB |
| **Ornith-1.5-9B** 🆕 | 10B dense | BF16 ≈ 18 GB | ~6 GB | ~4 GB | ~3 GB |
| **Ornith-1.5-35B-A3B** 🆕 | 36B / ~3B | BF16 ≈ 71 GB | ~22 GB | ~16 GB | ~11–12 GB |
| **Ornith-1.5-397B** 🆕 | 403B / ? | BF16 ≈ 800 GB | ~244 GB | ~180 GB | ~120–130 GB |
| **Apodex 1.1-mini** 🆕 | 35B / 3B | BF16 ≈ 71 GB | ~17 GB | ~13 GB | ~9 GB |
| **MiniMax M3** 🆕 | 428B / 23B | BF16 ≈ 856 GB | ~214 GB | ~160 GB | ~107 GB |
| **Muse Glimmer** 🆕 | 29.6B dense | BF16 ≈ 59 GB | ~15 GB | ~11 GB | ~7 GB |
| **Kimi K2.7-Code** 🆕 | ~1T / 32B | ~2 TB | ~500 GB | ~375 GB | ~250 GB |
| DeepSeek V4 Flash 0731 | 284B / ~13B | FP4+FP8 ≈ 158–167 GB | ~155 GB | ~103–110 GB | ~85–100 GB |
| **GLM-5.3-Flash** 🆕 | 320B / **18B** | FP8 ≈ **306 GiB** (official ckpt) | ~160 GB | ~120 GB | ~80–100 GB |
| GLM-5.3 (same base as 5.2) | ~743–753B / ~40B | **756 GB / 141 shards** (released **Aug 27**) | ~370–380 GB | ~300–340 GB | ~180–240 GB |
| **Tencent Hy4 preview** 🆕 | 770B / **49B** | FP8 variant + full (Aug 28, Apache 2.0) | ~385 GB | ~290 GB | ~193 GB |
| DeepSeek V4 Pro 0831 | 1.6T / ~49B | FP4+FP8 ≈ 865–900 GB | ~800–920 GB | ~600–700 GB | ~400–500 GB |
| Kimi K3 | 2.8T / ~104B | native MXFP4 ≈ 1.5 TB+ | — | — | still multi-node |

> Weights only. Runtime adds KV cache + activations, especially at long context. **MAI-Code-1-Flash is closed-weight** — no public weights; removed from self-hostable table.

---

## 6. Full-Context RAM/VRAM Totals (weights + KV cache + overhead)

### DeepSeek V4 Flash 0731 (1M context native) — the efficient one

Hybrid CSA/HCA + FlashMemory compression keeps the 1M KV cache tiny (~7–10 GB).

| Quant | Weights | + 1M KV + overhead | Total RAM | Realistic setup |
|---|---|---|---|---|
| 3-bit (IQ3_XXS) | ~103 GB | +8–12 GB | ~115–125 GB | 128 GB unified (Mac Studio / DGX Spark) — tight |
| 4-bit (Q4 / UD-Q4) | ~155 GB | +10–15 GB | ~170–180 GB | 192 GB recommended |
| Near-lossless Q8 | ~162 GB | +10–15 GB | ~175–185 GB | 192–256 GB |
| Native FP4/FP8 | ~158–167 GB | +10 GB | ~170–180 GB | same as above |

**Bottom line for full 1M:** plan on **170–185 GB** system memory for good quality (4-bit/Q8); 3-bit squeezes into ~120 GB with zero headroom.

### Qwen 3.8 27B (262K native → 1M via YaRN)

Dense model — KV cache grows normally.

| Quant | Weights | + 32K ctx | + 128K ctx | + 262K (native) | + 1M (YaRN) |
|---|---|---|---|---|---|
| Q4_K_M | ~17 GB | ~20–22 GB | ~28–32 GB | ~40–48 GB | ~70–90 GB |
| Q5 / Q6 | ~20–23 GB | ~25 GB | ~35 GB | ~50–55 GB | ~90–110 GB |
| Q8 / FP8 | ~29–31 GB | ~35 GB | ~45 GB | ~60–70 GB | ~110–130 GB |
| BF16 | ~55–56 GB | ~65 GB | ~80 GB | ~100+ GB | ~160–180 GB |

**Bottom line:** everyday (up to 32–64K) = 24 GB GPU with Q4. Full native 262K = ~48–70 GB. True 1M = 70–130 GB+.

### The giants (full context)

- **V4 Pro 0831:** efficient KV (~10 GB @ 1M) but weights alone 800–900 GB at 4-bit → **~920–1000+ GB total**. Multi-node only.
- **GLM-5.3 (~750B MoE):** ~**400–450 GB** at 4-bit + full context. **Now released Aug 28 (~756 GB / 141 shards, FP8 variant).**
- **Tencent Hy4 preview (770B/49B):** weights alone **~385 GB at 4-bit** → ~400-430 GB + 1M KV + overhead. Needs 8× 96 GB node at Q3/Q4. **Apache 2.0.**
- **Kimi K3 / Qwen 3.8 Max:** 1 TB+ class even quantized. API territory for normal hardware.

---

## 7. Token/s — Blackwell Hardware (target: ~100 tok/s)

### Real measured numbers (Blackwell)

| Model | Setup | Context | Single-stream tok/s | Notes |
|---|---|---|---|---|
| V4 Flash 0731 | 2× RTX PRO 6000 (TP=2) | up to 524K | **~243** | Peak aggregate ~400 at low concurrency (FP8 + DSpark) |
| V4 Flash 0731 | 4× B200 (HGX) | 8K–32K | — | ~1,200–1,500 tok/s generation |
| V4 Flash 0731 | 4× B200, high concurrency | medium | — | 3,000+ tok/s system throughput possible |
| V4 Flash 0731 | Dual DGX Spark (FP8, TP=2) | 256K | ~40–44 | Aggregate ~350 tok/s |
| V4 Flash 0731 | Single DGX Spark (IQ2) | 131K | ~20 | Peak aggregate ~38 |
| Qwen 3.8 27B | 1× RTX 5090 (NVFP4 + DSpark) | — | **~200–210** | — |
| Qwen 3.8 27B | B200 | — | 130–150+ | thousands aggregate at high concurrency |

Best real-world number on consumer/prosumer Blackwell today: **~240–250 tok/s** single-stream on 2× RTX PRO 6000 with DSpark.

### Who can actually hit ~100 tok/s locally

| Model | 100+ tok/s? | Hardware needed | Notes |
|---|---|---|---|
| Qwen 3.8 27B | **Yes, easily** | 1× RTX 5090 / PRO 6000 / B200 | single high-end Blackwell does 150–200+ |
| V4 Flash 0731 | **Yes** | 2× RTX PRO 6000 (or 2× H200 / 4× A100 80GB) | measured ~240 single-stream on 2× PRO 6000 |
| V4 Pro 0831 | Possible but expensive | 4–8× B200 / multi-node | costs a lot |
| GLM-5.3 | Borderline | 4–8 high-end cards | weights not out yet; similar/heavier than Flash |
| Qwen 3.8 Max / K3 | No (not practical) | multi-node cluster | API for normal people |

---

## 8. GLM-5.3 Hardware Deep-Dive (~743–753B MoE / ~40B active)

Same base as GLM-5.2 — memory scales with **total** params, all experts must stay in memory.

### Memory (weights only)

| Quant | Approx size | Practical total memory |
|---|---|---|
| 2-bit (aggressive) | ~180–240 GB | ~240–280 GB |
| 3-bit | ~300–340 GB | ~350–400 GB |
| 4-bit | ~370–380 GB | ~400–450 GB |
| FP8 / 8-bit | ~750 GB | ~800–900 GB |
| BF16 / FP16 | ~1.5 TB | ~1.6–1.8 TB |

### Hardware tiers

| Goal | Hardware | Speed | Realistic? |
|---|---|---|---|
| Usable interactive | 4–8× H200 / B200 or 8× H100 + good quant | ~5–20+ tok/s | Yes (server) |
| Decent local | 256–512 GB unified (Mac Studio M3/M4 Ultra) + 2/3-bit | 3–15 tok/s | Possible |
| Minimum workable | 24 GB GPU + 256 GB system RAM (offload) or 256 GB Mac | few tok/s | Painful but possible |
| Single consumer GPU | — | — | Impossible for useful speed |

### On a Blackwell cluster

- **5 × 96 GB (480 GB):** fits GLM-5.3 at 3-bit or 4-bit; 4-bit is tight (careful KV management), 3-bit/2-bit comfortable. Expect **~30–70+ tok/s** (PCIe, no NVLink) — not 100 tok/s.
- **8 × 96 GB (768 GB):** comfortable for GLM-5.3 at 4-bit or better + V4 Flash + Qwen 27B. **~50–150+ tok/s** depending on model/quant. No NVLink → PCIe hurts big-MoE tensor-parallel throughput.

### Can 8×96 GB run V4 Pro 0831?

**No, not comfortably.** Native FP4+FP8 ~865–900 GB and 4-bit ~800–920 GB both exceed 768 GB. Q3 (~600–700 GB) barely fits; Q2 (~400–500 GB) fits with noticeable quality drop. Realistic minimum for V4 Pro = 8× H200 (~1.1 TB) or multi-node.

---

## 9. Hardware Options in India (Aug 2026 pricing)

### Recommended build — 4 × RTX 5090 (128 GB total VRAM)

- Qwen 3.8 27B → extremely fast (~400+ tok/s) ✅ fits
- DeepSeek V4 Flash 0731 → **Q4 (142 GB) does not fully fit** — use Q3 (~103–110 GB) at ~50–80 tok/s, or Q4 with expert offload (slower)
- GLM-5.3 → **❌ does NOT fit** even at Q2 (180–240 GB > 128 GB VRAM). Only via heavy CPU-RAM offload at ~5 tok/s — not recommended. Needs 8× 5090 (Q2) or 4× Pro 6000 / 4× DGX Spark.

| Item | India cost |
|---|---|
| 4× RTX 5090 (₹5,00,000–5,40,000 each) | ₹20–22 lakh |
| Threadripper/EPYC + motherboard + 256–512 GB RAM + PSU + case | ₹4–6 lakh |
| Storage (2× 2TB NVMe), cooling, UPS | ₹1–2 lakh |
| **Capex total** | **₹25–30 lakh** |
| Power (10 hr/day @ ₹9/kWh, ~2.6 kW) | ~₹0.85L/yr → ~₹4.3L / 5-yr |
| **5-yr TCO** | **~₹29–34 lakh** |

**Realistic 5-yr all-in to own & run:** **₹29–34 lakh** (₹25–30L capex + ~₹4.3L power).

### RTX PRO 6000 Blackwell builds (prices have risen sharply)

- RTX PRO 6000 ≈ **₹40–48 lakh per card**
- 2× PRO 6000 (192 GB): ₹85 lakh–1.1 crore → good for V4 Flash + Qwen; GLM-5.3 needs lower quant
- 4× PRO 6000 (384 GB): ₹1.7–2.1 crore → comfortable for all three models

### Budget / compromise — 2 × RTX 5090 + heavy system-RAM offload

- **₹12–15 lakh**
- Qwen 3.8 27B perfect; V4 Flash acceptable; GLM-5.3 slow (heavy offload)

### DGX Spark (NVIDIA compact AI desktop)

128 GB unified (GB10 Grace Blackwell), 273 GB/s, ~140–240 W, 1 PFLOP FP4, up to 4 TB NVMe. **India street: ₹5.05–5.99 lakh/unit** (Digit ₹5.05L, Computech ₹5.24L, Amazon ₹5.99L; MRP ₹6.99L). Dual-system scaling → up to 405B params via ConnectX.

| Setup | Approx cost | Qwen 3.8 27B | V4 Flash 0731 | GLM-5.3 |
|---|---|---|---|---|
| 1× DGX Spark | ₹5.0–6.0 lakh | Excellent | ~14 tok/s (aggressive quant) | No (too big) |
| 2× DGX Spark | ₹10–11 lakh | Excellent | ~40–42 tok/s (FP8) | Tight / lower quant |
| 3× DGX Spark | ₹15–16.5 lakh | — | Very good | Usable |
| 4× DGX Spark | ₹20–22 lakh + ₹2–3L ConnectX switch/cables | — | Very good | Comfortable |

**All-in 4× DGX Spark:** ₹22–26 lakh capex (units + ConnectX for multi-unit scaling) + ~₹0.35L/yr power (~1 kW) ≈ **₹24–28 lakh 5-yr TCO**.

**Pros:** memory-efficient, quiet, low power, great for MoE models (Flash + GLM), clean NVIDIA stack. Two units (~₹10–11 lakh) beat many multi-GPU consumer builds for these models.
**Cons:** slower than RTX 5090/PRO 6000 on small dense models (lower memory bandwidth); scaling past 2 units needs ConnectX networking.

### MacBook Pro M5 (2026) — the portable option

> **Update (Aug 25, 2026):** Apple refreshed Mac mini (M6 / M5 Pro) and Mac Studio (M5 Max / M5 Ultra) — ships Sep 22. **No memory ceiling moved** (32/64/128/512 GB), bandwidth is a paid upgrade (M6 base = 153 GB/s, last-gen level; M5 Ultra = 1.2 TB/s, +46%). US: mini $899+, Studio M5 Ultra $5,499 (512 GB not orderable at launch). Dense-70B still needs the $5,499 Ultra for 8+ tok/s. India pricing TBC — expect the June 2026 memory-driven hikes to apply.

India launch pricing (Mar 2026), M5 Pro = 307 GB/s, M5 Max = 614 GB/s bandwidth:

| Model | Unified RAM | India price |
|---|---|---|
| 14″ M5 Pro | 24 GB | ₹2.49 lakh |
| 16″ M5 Pro | 48 GB | ₹3.40 lakh |
| 14″ M5 Max | 36 GB | ₹3.99 lakh |
| 16″ M5 Max | 48 GB | ₹4.99 lakh |
| 16″ M5 Max (BTO) | up to 128 GB | ~₹6.5–7.5 lakh (est.) |

**Note:** 128 GB unified (M5 Max) can squeeze V4 Flash 0731 at 2–3-bit, but 614 GB/s bandwidth + laptop thermals keep it slow (~5–10 tok/s). Best used as a Qwen 3.8 27B / Qwen3.5-397B (3-bit) machine, not an agentic-model box.

### India quick pick

| Priority | Setup | Approx cost (5-yr all-in) | Runs all 3? |
|---|---|---|---|
| Best balance | 4 × RTX 5090 | ₹29–34 lakh | ❌ GLM-5.3 doesn't fit; Qwen+V4 Flash yes |
| Best performance | 4 × RTX PRO 6000 | ₹1.7–2.1 Cr+ | ✅ Yes (comfortable) |
| Good value | 2 × RTX 5090 | ₹15–18 lakh | ❌ GLM-5.3 no; Qwen yes, V4 Flash slow |
| Quiet / efficient | 4 × DGX Spark | ₹22–26 lakh (incl. ConnectX) | ✅ Yes (GLM ~25–35 tok/s) |
| Portable | MacBook Pro M5 Max (48–128 GB) | ₹5–7.5 lakh | ❌ Qwen 27B / 397B only |

---

## 9A. Master Matrix — Every Frontier Open-Weight Model × Every Local Cluster (tok/s + India cost)

Legend: **tok/s = single-user throughput at listed quant** (Q4 unless noted). "—" = doesn't fit at any practical quant.

| Cluster | India cost | Qwen 3.8 27B (14 GB) | Qwen3.8-Flash-Next (111 GB) | Qwen3.8-Max (1.2 TB) | V4 Flash 0731 (142 GB) | GLM-5.3 (372 GB) | GLM-5.3-Flash (160 GB) | Laguna S 2.1 (59 GB) | Ornith-1.5-397B (244 GB) | MiniMax M3 (214 GB) | Kimi K3 (1.5 TB+) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **1× DGX Spark** (128 GB) | ₹5.0–6.0L | ~20–30 | Q3 ~25–35 | — | ~14 (IQ2) | — | Q3 ~20–30 | Q4 ~30–40 | — | — | — |
| **2× DGX Spark** (256 GB) | ₹10–11L | ~40–60 | Q4 ~50–70 | — | ~40–42 (FP8) | — | Q4 ~40–50 | Q4 ~50–70 | — | Q3 ~15–20 | — |
| **3× DGX Spark** (384 GB) | ₹15–16.5L | ~60–90 | ~60–80 | — | ~60–80 | Q3 ~15–20 | Q4 ~50–70 | ~70–90 | Q3 ~15–20 | Q4 ~25–35 | — |
| **4× DGX Spark** (512 GB) | ₹22–30L | ~80–120 | ~70–100 | — | ~80–100 | ~25–35 | ~50–80 | ~80–110 | ~20–30 (Q3) | ~35–50 | — |
| **1× RTX 5090** (32 GB) | ₹5.0–5.4L | **~200–210** (NVFP4) | offload ~25 | — | ~10–21 (offload) | — | — | offload ~15 | — | — | — |
| **2× RTX 5090** (64 GB) | ₹10–11L | ~300+ | offload ~40 | — | ~15–25 (offload) | — | — | Q4 ~30–40 | — | — | — |
| **4× RTX 5090** (128 GB) | ₹25–30L | ~400+ | Q3 ~50–70 | — | ~50–80 (Q3) | — | Q3 ~30–40 | Q4 ~50–70 | — | Q3 ~10–15 | — |
| **8× RTX 5090** (256 GB) | ₹48–52L | ~500+ | ~70–100 | — | ~90–110 | Q2 ~10–15 | Q3 ~40–60 | ~80–110 | Q3 ~15–20 | Q4 ~20–30 | — |
| **1× RTX Pro 6000** (96 GB) | ₹40–48L | ~200–250 | Q4 ~40–60 | — | ~15–20 (offload) | — | offload ~15 | Q4 ~40–60 | — | offload ~10 | — |
| **2× RTX Pro 6000** (192 GB) | ₹85L–1.1Cr | ~350+ | ~50–70 | — | **~240–243** (FP8/DSpark) | — | Q3 ~25–35 | ~60–80 | — | Q3 ~15–20 | — |
| **3× RTX Pro 6000** (288 GB) | ₹1.3–1.6Cr | ~400+ | ~60–80 | — | ~280–300 | Q2 ~15–25 | Q4 ~30–50 | ~80–110 | Q2 ~15–20 | Q4 ~25–35 | — |
| **4× RTX Pro 6000** (384 GB) | ₹1.7–2.1Cr | ~500+ | ~70–100 | Q2 ~15–20 | ~320–350 | ~30–70 | ~30–70 | ~90–120 | ~25–40 (Q3) | ~35–50 | — |
| **8× RTX Pro 6000** (768 GB) | ₹3.4–4.2Cr | ~700+ | ~100–150 | Q3 ~20–30 | ~500+ | ~50–150 | ~50–150 | ~120–180 | ~40–70 | ~60–100 | ~30–50 (Q2) |
| **Mac Studio M3 Ultra 96 GB** | ₹4.3L | ~40–50 | offload | — | — | — | — | Q4 ~30–40 | — | — | — |
| **Mac Studio M3 Ultra 256 GB** | ₹7.5L | ~40–50 | Q4 ~30–40 | — | ~15–20 (Q3) | — | Q3 ~15–20 | Q4 ~40–50 | — | Q3 ~10–15 | — |
| **Mac Studio M3 Ultra 512 GB** | ₹12L+ | ~40–50 | ~35–50 | — | **~20–30** (MLX) | ~10–15 | ~15–25 | ~40–60 | Q3 ~15–20 | ~20–30 | — |
| **2× Mac Studio 512 GB** (1 TB) | ₹24L | ~80+ | ~50–70 | Q3 ~15–20 | ~40–50 | ~20–25 | ~25–40 | ~60–80 | ~30–45 | ~35–50 | ~15 (Q2) |
| **MacBook M5 Max 48 GB** | ₹5.0L | ~35–40 | — | — | — | — | — | — | — | — | — |
| **MacBook M5 Max 128 GB** | ₹6.5–7.5L | ~35–40 | offload | — | ~5–10 (2-bit) | — | — | Q4 ~15–20 | — | — | — |
| **DGX B300** (2.1 TB) | ₹11.7Cr | ~1,000+ | ~150+ | ~30–40 | ~600+ | ~150+ | ~150+ | ~80–120 | ~50–80 | ~60–100 | **~30–40** |

**What this matrix says:**

- **Everything ≤ Qwen3.5-397B (198 GB)** is realistically runnable in India for under ₹30 lakh.
- **Qwen3.8-Flash-Next (111 GB Q4)** and **Laguna S 2.1 (59 GB Q4)** are new sweet spots — fit 1× Pro 6000 or 4× DGX Spark.
- **GLM-5.3-Flash (160 GB Q4)** runs ~2× faster/token than GLM-5.3 at same VRAM; fits 4× DGX Spark at 50–80 tok/s.
- **V4 Flash 0731** is the sweet spot — fits 2× PRO 6000 (₹85L–1.1Cr) at 240+ tok/s, or 4× RTX 5090 (₹24–28L) at ~60–80 tok/s.
- **GLM-5.3** needs 4× RTX Pro 6000 or 4× DGX Spark or 2× Mac Studio — ₹1.7Cr+ unless you accept Q2/Q3 on 8× 5090.
- **Qwen3.8-Max / Kimi K3** are out of single-user reach — DGX B300 (~₹11.7Cr) or cloud is the only path.
- **Best tok/s per rupee (single user):** 1× RTX 5090 (~₹5L) for Qwen 3.8 27B at ~200 tok/s; 2× DGX Spark (~₹10–11L) for V4 Flash at ~40 tok/s; 1× Pro 6000 for Qwen3.8-Flash-Next / Laguna S 2.1.

---

## 9B. Recommended Build — 4× DGX Spark (sub-crore, runs GLM-5.3/Flash + V4 Flash + Qwen 3.8 27B + Qwen3.8-Flash-Next + Laguna S 2.1)

**Chosen path:** accept ~25–35 tok/s on GLM-5.3 (the only way to run all 3 under ₹1 Cr). V4 Flash 0731 + Qwen 3.8 27B still run fast. **GLM-5.3-Flash** (160 GB Q4) fits 2× Spark and runs ~50–80 tok/s. **Qwen3.8-Flash-Next** (111 GB Q4) and **Laguna S 2.1** (59 GB Q4) fit comfortably with room to spare.

**Full launch BOM** (everything needed to run the cluster):

| Item | What it's for | Amount |
|---|---|---|
| 4× DGX Spark (₹5.05–5.99L each; Digit ₹5.05L / Computech ₹5.24L / Amazon ₹5.99L) | Compute nodes (512 GB unified total) | ₹20–24 lakh |
| 200 Gbps QSFP switch — MikroTik CRS812-4XS-4XS28S (budget) or NVIDIA Spectrum-2 SN3000 (needed for 4-node NVIDIA Sync; NCCL/RoCE over ConnectX-7) | 4-unit clustering — 2–3 units connect direct, **4 units require a switch** | ₹0.7–1L (MikroTik) / ₹4–8L (Spectrum-2) |
| 4× QSFP56 200 Gbps cables (₹15–25K each) | Link each Spark's ConnectX-7 port to the switch | ₹0.6–1 lakh |
| UPS (1.5–2 kVA, ~10 min) + PDU + rack shelf | Power backup for ~1.1 kW total load | ₹0.8–1.5 lakh |
| 2× 2TB NVMe add-ons | Weight/checkpoint staging | ~₹0.3–0.5 lakh |
| **Capex** | | **₹22–30 lakh** (MikroTik switch) / **₹25–35 lakh** (Spectrum-2) |
| Power (4 units ≈ 1 kW + switch ~100 W, 10 hr/day @ ₹9/kWh) | | ~₹0.36L/yr → ~₹1.8L / 5-yr |
| **5-yr TCO** | | **~₹24–32 lakh** (MikroTik) / **~₹27–37 lakh** (Spectrum-2) |

**Networking notes:**
- NVIDIA multi-Spark playbook: 2–3 units link directly via QSFP cable; **4 units need a 200 Gbps QSFP switch** (single L2 bridge).
- Use the MikroTik (~₹0.7–1L) unless you need Spectrum-X congestion control — community 2-node clusters hit 93.5% DDP efficiency on it; fine for 4-node inference.
- Keep management traffic (SSH/internet) on the built-in 10 Gbps Ethernet, not the ConnectX fabric.

| Model | Fits? | Expected tok/s |
|---|---|---|
| GLM-5.3 (Q4, 372 GB) | ✅ in 512 GB | ~25–35 |
| **GLM-5.3-Flash (Q4, ~160 GB)** 🆕 | ✅ in 512 GB (fits 2× Spark too) | ~50–80 (18B active ≈ 2× per-token speed of 5.3's 40B) |
| DeepSeek V4 Flash 0731 (Q4, 142 GB) | ✅ | ~80–100 |
| Qwen 3.8 27B (Q4, 14 GB) | ✅ | ~80–120 |
| **Qwen3.8-Flash-Next (Q4, ~111 GB)** 🆕 | ✅ | ~70–100 |
| **Laguna S 2.1 (Q4, ~59 GB)** 🆕 | ✅ | ~60–90 |
| **Ornith-1.5-397B (Q4, ~244 GB)** 🆕 | ✅ | ~20–30 |
| **MiniMax M3 (Q4, ~214 GB)** 🆕 | ✅ | ~25–35 |

**Setup notes:**
- Run GLM-5.3 via vLLM/SGLang (Transformers-based; llama.cpp support unconfirmed) with TP across all 4 units.
- One model at a time per unit or sharded — 512 GB unified total, so all 3 fit simultaneously only if smaller ones use Q2/Q3.
- GLM-5.3 weights expected ~late Aug 2026 (safety review). V4 Flash + Qwen 27B run today.
- If GLM-5.3 tok/s feels too slow in practice: GLM Coding Plan (~₹56/mo) for interactive work + local for batch.

---

## 10. Vision / Multimodal Support

| Model | Screenshots / images | Video | Notes |
|---|---|---|---|
| Qwen 3.8 27B | ✅ native | ✅ | Best practical local choice; runs on a single 24 GB GPU |
| Qwen 3.6 27B | ✅ | ✅ | Previous gen, weaker than 3.8 |
| **Qwen3.8-Flash-Next** 🆕 | ✅ native | ✅ | Qwen4 preview; 1152-hidden 27-layer vision tower |
| Kimi K3 | ✅ native | ✅ | Strong multimodal, but huge to run locally |
| DeepSeek V4 Flash 0731 | ⚠️ limited | ⚠️ limited | Primarily text; vision needs external tools |
| DeepSeek V4 Flash (Preview) | ⚠️ limited | ⚠️ limited | same |
| **GLM-5.3-Flash** 🆕 | ✅ native | ✅ | First natively multimodal GLM-5 (text+image+video in) |
| GLM-5.3 / 5.2 | ⚠️ tool-based | ⚠️ | Strong text/coding; not native vision |
| Tencent Hy3 | ⚠️ limited | ⚠️ limited | mainly text |
| **MiniMax M3** 🆕 | ✅ native | ✅ | 428B/23B multimodal (text/image/video/audio) |
| **Laguna S 2.1** 🆕 | ✅ | ✅ | Poolside — vision + code |
| **Ornith-1.5-397B** 🆕 | ✅ | ✅ | Qwen3.5 MoE base with vision |
| **Apodex 1.1-mini** 🆕 | ✅ | ✅ | Qwen3.5-35B-A3B base with vision |
| **Muse Glimmer** 🆕 | ⚠️ | ⚠️ | Dense 29.6B — vision support unclear |
| Claude Fable 5 / Opus | ✅ | ✅ | Excellent native vision (closed) |

---

## 11. Bottom Line / Recommendations

- **Start with Qwen 3.8 27B** — easiest, already open (Apache 2.0), fits one good GPU, hits 100+ tok/s, **AA Index 52**, and gives roughly **Claude Sonnet-4.6-era coding** plus native screenshot/video understanding.
- **Then add DeepSeek V4 Flash 0731** — the real prize for agentic/coding work; 2× RTX PRO 6000 (or 2× H200) comfortably clears 100 tok/s (~240 single-stream), full 1M context at 170–185 GB.
- **GLM-5.3** — **weights released Aug 27** (756 GB / 141 shards, custom license; **">$10B revenue → security review" trigger unconfirmed**, HF shows "other") — best open-weight coder, needs proper multi-GPU box (~4–8 cards) for good speed, or 5–8× 96 GB Blackwell cluster at 2–4-bit. **GLM-5.3-Flash (MIT)** is the cheaper 18B-active alternative (~160 GB Q4, 2× faster/token).
- **Qwen3.8-Max** — **AA Index 58** (independent, #1 open-weight), 2.4T/95B, custom license (>$50M/yr MaaS gate), ~1.2 TB Q4 — DGX B300 or cloud only.
- **Qwen3.8-Flash-Next** — **125B/6B**, Apache Community 1.0, Qwen4 preview, **$0.15/$0.47**, ~111 GB Q4 — fits 1× Pro 6000, SWE-Pro 62.5%, LCB 91.9%. **Top router MVP candidate.**
- **Laguna S 2.1** — **118B/8B**, OpenMDW-1.1, **$0.10/$0.20**, ~59 GB Q4 — fits 1× Pro 6000. "West's most capable open-weight coding model." **Top router MVP candidate.**
- **Ornith-1.5-397B** — 403B, MIT, TB2.1 86.1 (#5 HF), SWE-V 86.0 (#1 HF), ~244 GB Q4. All vendor-reported; partial BenchLM listing. **Watch — if verified, joins GLM-5.3/K3 tier.**
- **MiniMax M3** — 428B/23B, multimodal, 1M ctx, $0.23-0.3/$0.96-1.2, Modified MIT, ~214 GB Q4. **Router candidate.**
- **Tencent Hy4 preview** — **new Aug 28** (770B/49B, 1M+ ctx, Apache 2.0) — claims to edge GLM-5.3/K3 on Tencent blind eval; ~385 GB at 4-bit → needs 8× 96 GB node. Preview, not yet official Hy4.
- **Muse Glimmer** — **AA Index 35** (independent) — vendor claims overstated; not router-tier. Keep as lightweight local option only.
- **Apodex 1.1-mini** — 35B/3B, Apache 2.0, SWE-V 77.7 / TB 70.8 (self-reported), free on platform.apodex.ai, ~17 GB Q4. **Watch only.**
- **Kimi K2.7-Code** — ~1T/32B, Modified MIT, coding-specialized sibling of K3. Watch for independent benchmarks.
- **MAI-Code-1-Flash** — **Closed-weight, API-gated (Copilot only)** — no public weights. Remove from local deployment plans.
- **Skip V4 Pro / K3 / Qwen Max / Hy4 for true local 100 tok/s** unless building a multi-node server — API is the sane route for a single user.
- **For most people in India:** 4× RTX 5090 (~₹25–28 lakh) or 2–3× DGX Spark (~₹10–16.5 lakh) is the realistic sweet spot.
- **Chosen sub-crore build:** **4× DGX Spark (~₹22–30L capex, ~₹24–32L 5-yr with MikroTik switch; ~₹25–35L / ₹27–37L with Spectrum-2)** — runs GLM-5.3/Flash + V4 Flash 0731 + Qwen 3.8 27B + Qwen3.8-Flash-Next + Laguna S 2.1 all locally under ₹1 Cr. GLM-5.3 at ~25–35 tok/s; GLM-5.3-Flash ~50–80; V4 Flash ~80–100; Qwen ~80–120; Qwen3.8-Flash-Next ~70–100; Laguna S 2.1 ~60–90. Full BOM in §9B.
- **Cheapest entry point:** 1× RTX 5090 (~₹5L) → Qwen 3.8 27B at ~200 tok/s; 1× DGX Spark (~₹5–6L) → Qwen 27B + V4 Flash (slow). MacBook M5 Max is viable only for ≤Qwen3.5-397B-class models.

---

*Sources: DeepSeek V4 announcements; GLM-5.3 launch materials; Z.ai / vendor benchmark tables; AI Release Tracker; Independent/community Blackwell runs; `local_ai_coding_models.md` tok/s tables; MacBook Pro M5 India pricing (Apple India, Mar 2026); DGX Spark India street price (Digit ₹5.05L, Computech ₹5.24L, Amazon ₹5.99L, Aug 2026). All scores vendor-reported unless noted. India prices are Aug 2026 street/retail estimates and subject to fluctuation. Weights-only sizes exclude KV cache unless stated. Master-matrix tok/s for MacBook/DGX Spark/Sparc clusters are estimates; V4 Flash 0731 @2× RTX Pro 6000 (~243 tok/s), Qwen 3.8 27B @1× RTX 5090 (~200–210), and dual-DGX-Spark (~40–44) are measured.*