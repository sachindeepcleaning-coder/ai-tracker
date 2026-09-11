# All Open-Weight AI Models — Local Rack-Scale Deployment

**Goal:** Run every open-weight coding model (~69 total), pick any on demand, all at max context window.

---

## Comparison: NVIDIA Vera Rubin NVL72 vs AMD Helios

Both are 72-GPU racks with HBM4. AMD Helios was announced July 22-23, 2026 at AMD Advancing AI 2026.

| Spec | NVIDIA Vera Rubin NVL72 | AMD Helios |
|---|---|---|
| GPUs | 72 × R100 | 72 × MI455X (CDNA 5) |
| GPU Memory | 288 GB HBM4 | **432 GB HBM4** |
| Total HBM4 | 20.7 TB | **31 TB** (+50%) |
| Memory BW / GPU | **up to 22 TB/s** | 19.6 TB/s† |
| Aggregate Memory BW | **~1,580 TB/s (1.6 PB/s)** | ~1,410 TB/s (1.4 PB/s) |
| FP4 Compute | **3.6 EF** | 2.9 EF |
| FP8 Compute | 1,260 PF (1.26 EF) | **1,400 PF (1.4 EF)** |
| Scale-up Interconnect | NVLink 6 (proprietary) | UALink (open standard) |
| Scale-out | InfiniBand (proprietary) | Ultra Ethernet (open) |
| TDP | **~200 kW** | ~235 kW† (17% more) |
| US Price | $4-8M (varies by source) | **$5-5.5M** |
| India Landed (est.) | ₹47-65 Cr | **₹45-55 Cr** |
| Availability | H2 2026 | H2 2026 samples, Q2 2027 mass prod. |
| Software | CUDA (mature) | ROCm 7 (catching up) |
| India Partner | — | **TCS partnership announced** |

> † AMD official spec lists 19.6 TB/s; silicon die spec gives 23.3 TB/s (Chips & Cheese, StorageReview).
> ‡ Helios peak provisioning capacity; AMD-rated typical draw is ~140 kW.

**AMD Helios wins on:** Memory capacity (+50%), open standards (no vendor lock-in), FP8 compute (1.4 vs 1.26 EF)
**NVIDIA wins on:** Memory bandwidth per GPU (22 vs 19.6 TB/s), FP4 compute (3.6 vs 2.9 EF), power efficiency (~200 vs ~235 kW), software maturity (CUDA vs ROCm), availability

---

## Vera Rubin NVL72 — The Hardware

| Spec | Vera Rubin NVL72 |
|---|---|
| GPUs | 72 × NVIDIA R100 |
| HBM4 | 20.7 TB total |
| Interconnect | NVLink 6 (3.6 TB/s per GPU) |
| FP4 TFLOPS | ~36,000 TFLOPS |
| TDP | ~200 kW |
| Cooling | Liquid (included) |
| US Price | $4-8M (varies by source) |
| India Landed | ₹47-65 Cr |
| Infra Build | ₹5-10 Cr |
| Power (5 yr) | ₹13.8 Cr |
| Staff (5 yr) | ~₹5 Cr |
| **5-Year TCO** | **₹66-84 Cr** |

---

## Capacity: All Models Simultaneously

### Q4 (4-bit) — 1 Rack

| Category | Count | Total Weights | KV Cache @ Max Ctx | Total |
|---|---|---|---|---|
| Large (>500B params) | 20 | ~10,580 GB | ~100 GB | ~10,680 GB |
| Medium (100-500B) | 19 | ~2,540 GB | ~500 GB | ~3,040 GB |
| Small (<100B) | 30 | ~753 GB | ~400 GB | ~1,153 GB |
| **Total** | **69** | **~13,873 GB (~13.9 TB)** | **~1,000 GB (~1 TB)** | **~14,873 GB (~14.9 TB)** |

**Rubin NVL72:** 20.7 TB → **fits with ~5.8 TB headroom** ✅

### FP16 — 3 Racks

| Category | Total Weights | KV Cache | Total | Rubin Racks |
|---|---|---|---|---|
| All models @ FP16 | ~55.5 TB | ~1 TB | ~56.5 TB | **3** |

---

## India Cost Comparison

| Scenario | Racks | Landed Cost | 5-Yr TCO |
|---|---|---|---|
| All models @ Q4 (4-bit) | **1** | ₹47-65 Cr | **₹66-84 Cr** |
| All models @ Q8 (8-bit) | **2** | ₹94-130 Cr | **₹132-168 Cr** |
| All models @ FP16 | **3** | ₹141-195 Cr | **₹198-252 Cr** |

### Cheaper Alternative: DGX B300 (Hot-Swap)

| Item | Cost |
|---|---|
| 1× DGX B300 (2.1 TB, 8×B300) | ~₹5.5 Cr landed |
| Power (5 yr) | ~₹1.3 Cr |
| Staff (5 yr) | ~₹3-4 Cr |
| **5-Yr TCO** | **~₹10-11 Cr** |
| Swap time between models | ~30 sec via NVLink |

Loads any model at Q4 — one at a time. Same models, 1/8th the cost.

---

## AMD Helios — India Cost Breakdown

All prices in ₹. US$1 = ₹95.12 (standardized Aug 14, 2026; previously ₹96.50). Helios pricing per AMD Advancing AI 2026 (July 22-23, 2026). TCS announced as India integration partner.

### One-Time (Capex)

| Item | Amount (₹ Cr) | Notes |
|---|---|---|
| Helios rack (landed India, est.) | **52** | $5.25M + IGST 18% + TCS margin, freight |
| Rack infrastructure (liquid cooling, CDU, transformers, UPS) | **5** | Helios is ~235 kW vs Rubin ~200 kW |
| Storage (16 TB NVMe) | **0.05** | Same as Rubin |
| Network | **0.3** | UEC switches are standard Ethernet — cheaper than NVLink |
| **Total Capex** | **~57.4 Cr** | |

### Annual Recurring (Opex)

| Item | Per Year (₹ Cr) | 5-Year (₹ Cr) | Notes |
|---|---|---|---|
| Power (235 kW × PUE 1.4) | **3.24** | **16.2** | 17% more than Rubin (~200 kW) |
| AMC (8-10% of hw) | **4.7** | **23.5** | Similar to Rubin |
| Staff (2-3 engineers) | **0.7** | **3.5** | Same |
| Colocation (235 kW @ ₹10k/kW/mo) | **2.82** | **14.1** | More power, more space |
| Software / inference engine | **0.2** | **1.0** | ROCm 7 is free, but vLLM/SGLang support costs |
| Network / transit | **0.2** | **1.0** | Ethernet cheaper than InfiniBand |
| **Total Opex** | **~11.5 Cr/yr** | **~57.3 Cr** | |

### 5-Year TCO

| Category | AMD Helios (₹ Cr) | NVIDIA Rubin (₹ Cr) | Difference |
|---|---|---|---|---|
| Capex | 57.4 | 64.6 | **-11%** |
| 5-yr Power | **16.2** | 13.8 | **+17%** |
| 5-yr AMC | 23.5 | 25.0 | -6% |
| 5-yr Colocation | **14.1** | 12.5 | **+13%** |
| 5-yr Staff | 3.5 | 3.5 | Same |
| 5-yr SW + Network | 2.0 | 2.5 | -20% |
| **Grand Total 5-Yr TCO** | **~₹116.7 Cr** | **~₹122 Cr** | **-4%** |

### 1 Rack Capacity Comparison

| Metric | AMD Helios | NVIDIA Rubin | Winner |
|---|---|---|---|
| All models @ Q4 loaded? | ✅ **31 TB** — 17.1 TB free | ✅ 20.7 TB — 6.8 TB free | **Helios** |
| All models @ FP8 loaded? | ✅ **27.7 TB** — 3.3 TB free | ❌ 27.7 TB > 20.7 TB | **Helios** |
| All models @ FP16 loaded? | ❌ needs 2 racks (62 TB > 55.5 TB ✅) | ❌ needs 3 racks (62 TB > 55.5 TB) | **Helios** |
| Max concurrent users (mixed, all models) | **~500-700** (17.1 TB KV budget) | **~150-300** (6.8 TB KV budget) | **Helios (2-3×)** |
| Single-model users (DeepSeek MLA, 1M ctx) | **~5,900** | **~2,533** | **Helios** |
| Single-model users (K3 @ 1M) | **~172** | **~73** | **Helios** |
| tok/s (small model, 3B active) | **~5,000-8,000** | **~800-1,200** | **Helios (6× BW)** |
| tok/s (large model, 50B active @ 1M) | **~80-150** | **~30-60** | **Helios (2-3× BW)** |
| Software maturity | ❌ ROCm 7 — catching up | ✅ CUDA — mature | **NVIDIA** |
| Interconnect latency | ⚠️ UALink over Eth — higher latency | ✅ NVLink 6 — lower latency | **NVIDIA** |
| Availability | ⚠️ Q2 2027 mass prod. | ✅ H2 2026 | **NVIDIA** |
| Vendor lock-in | ✅ Open standards | ❌ Proprietary stack | **Helios** |

### The Helios Advantage for "All Models" Use Case

**AMD Helios with 31 TB HBM4 fits everything at Q4 with 2.5× more headroom than Rubin.** This means:
- **All ~69 models @ Q4 + full KV cache** = 17.1 TB free → **~500-700 concurrent users** vs Rubin's 150-300
- **All ~69 models @ FP8** (27.7 TB) fits in **1 rack** — Rubin needs multi-rack or Q4
- **50% more memory, comparable aggregate bandwidth, 17% more power, 4% lower TCO**

The trade-off: ROCm software ecosystem and UALink interconnect latency. If you need maximum concurrency and open standards, Helios wins. If you need lowest latency and mature software today, Rubin wins.

---

## Estimated Token Throughput on Rubin NVL72

**Critical: Single-user throughput on large models at max context is NOT 2,000+ tok/s.**

Why:
- **Autoregressive decoding is sequential** — one token at a time, can't parallelize across GPUs
- **Attention scales O(L²)** — at 1M context, attention dominates even with Flash Attention
- **Active params must be read from HBM every token** — 50B active × 0.5 bytes = 25 GB per token, even split across 72 GPUs
- **At batch=1, you can't saturate 72 GPUs** — they sit mostly idle waiting for the next token

The 2,000-6,000 tok/s range only applies to **small models (3-13B active) at short context**. For big frontier models at max context, expect **30-400 tok/s** even on a ₹65Cr rack.

All numbers: single-user, Q4, batch=1, max context window, tensor parallelism across 72×R100.

| Model | Active Params | Max Ctx | Est. Tok/s | Bottleneck |
|---|---|---|---|---|
| Qwen3.6-35B-A3B (35B/3B) | 3B | 262K | **~800-1,200** | Attention at 262K |
| North Mini Code 1.0 (30B/3B) | 3B | 256K | **~1,000-1,500** | Attention at 256K |
| Qwen3.6-27B (27B dense) | 27B | 262K | **~200-350** | Dense 27B read + attention |
| DeepSeek V4 Flash Max (284B/13B) | 13B | **1M** | **~200-400** | MLA helps (tiny KV), 13B active |
| MiniMax M3 (428B/23B) | 23B | **1M** | **~80-150** | Lightning Attn, 23B active |
| GLM-5.2 (744B/40B) | 40B | 256K | **~120-250** | 40B active read |
| Kimi K2.6 (1T/32B) | 32B | 256K | **~100-200** | 32B active + GQA at 256K |
| DeepSeek V4 Pro Max (1.6T/49B) | 49B | **1M** | **~80-120** | 49B active + MLA (efficient) |
| Kimi K3 (2.8T/104B) | 104B | **1M** | **~30-60** | 104B active + KDA attention at 1M |
| Inkling (975B/41B) | 41B | 256K | **~100-200** | 41B active + GQA |
| LongCat-2.0 (1.6T/48B) | 48B | **1M** | **~80-120** | 48B active + attention at 1M |

For comparison on single RTX 5090: Qwen3.6-35B-A3B = 183 tok/s (at 128K ctx). Rubin NVL72 gives **~5-10× faster for small models, ~2-5× faster for big frontier models at max context**.

---

## Concurrent Serving Capacity

**All models loaded simultaneously at Q4 (13.1 TB weights, 20.7 TB total HBM).**
Remaining HBM for KV cache: **20.7 - 13.1 = 7.6 TB**.

### KV Cache Per User Per Model (at max context)

| Model | Active | Attention | KV Cache per User @ Max Ctx |
|---|---|---|---|
| DeepSeek V4 Flash Max (284B/13B) | 13B | MLA | **~3 GB @ 1M** |
| DeepSeek V4 Pro Max (1.6T/49B) | 49B | MLA | **~3 GB @ 1M** |
| Kimi K3 (2.8T/104B) | 104B | KDA | **~104 GB @ 1M** |
| MiniMax M3 (428B/23B) | 23B | Lightning | **~26 GB @ 1M** |
| Qwen3.6-27B (27B dense) | 27B | GQA | **~47 GB @ 1M** |
| Qwen3.6-35B-A3B (35B/3B) | 3B | Gated DeltaNet | **~12 GB @ 262K** |
| GLM-5.2 (744B/40B) | 40B | GQA | **~17 GB @ 256K** |
| Inkling (975B/41B) | 41B | GQA | **~17 GB @ 256K** |
| LongCat-2.0 (1.6T/48B) | 48B | GQA | **~26 GB @ 256K** |
| Codestral 22B (22B dense) | 22B | GQA | **~12 GB @ 256K** |

### Scenario 1: All users on one frontier model (e.g. DeepSeek V4 Flash Max)

| Constraint | Calculation | Limit |
|---|---|---|
| KV cache memory | 7.6 TB ÷ 3 GB | **~2,533 users** |
| Compute (agg. tok/s @ batch=32) | ~30,000 tok/s aggregate | — |
| At 20 tok/s/user (thinking/coding) | 30,000 ÷ 20 | **~1,500 users** |
| At 50 tok/s/user (interactive chat) | 30,000 ÷ 50 | **~600 users** |
| At 200 tok/s/user (fast completion) | 30,000 ÷ 200 | **~150 users** |

### Scenario 2: All users on Kimi K3 (largest KV per user)

| Constraint | Calculation | Limit |
|---|---|---|
| KV cache memory | 7.6 TB ÷ 104 GB | **~73 users** |
| Compute (agg. tok/s @ batch=32) | ~10,000 tok/s | — |
| At 20 tok/s/user | 10,000 ÷ 20 | **~500 users** |
| At 50 tok/s/user | 10,000 ÷ 50 | **~200 users** |
| **Bottleneck** | **KV cache: ~73 users** | |

### Scenario 3: Users spread across all models (mixed traffic)

Assumption: traffic proportional to model size (50% large, 30% medium, 20% small).

| Category | Models | Active Params | Avg KV/user | Users | Total KV Cache |
|---|---|---|---|---|---|
| Large (>500B, 15 models) | 15 | 32-55B | ~20 GB | **150** | 3,000 GB |
| Medium (100-500B, 15 models) | 15 | 10-23B | ~10 GB | **90** | 900 GB |
| Small (<100B, 30 models) | 30 | 3-27B | ~8 GB | **60** | 480 GB |
| **Total** | **60** | | | **300 users** | **~4.4 TB ✅** |

**300 concurrent users** comfortably fits in remaining 7.6 TB.

### Aggregate Throughput by Model Tier (continuous batching, mixed traffic)

| Tier | Tok/s Aggregate | At 50 tok/s/user | Max Users (KV bound) |
|---|---|---|---|
| Large models (50B active avg) | ~10,000 | 200 | 380 (7.6 TB ÷ 20 GB) |
| Medium models (15B active avg) | ~25,000 | 500 | 760 |
| Small models (5B active avg) | ~60,000 | 1,200 | 950 |
| **Mixed (all 61)** | **~20,000-30,000** | **400-600** | **300 (partitioned)** |

### Real-World Ceilings

| Constraint | Max Concurrent Users | — |
|---|---|---|
| KV cache (Kimi K3 @ 1M, worst case) | ~73 | 1 model only |
| KV cache (MLA models, best case) | ~2,533 | 1 model only |
| KV cache (mixed all ~86 models) | **~300** | all models loaded |
| Compute (large models, 20 tok/s min) | ~500 | all models |
| **Practical max (mixed, interactive)** | **~150-300** | **all ~86 models loaded** |

### 10 Racks — Total Capacity

10 × Vera Rubin NVL72 = **720 R100 GPUs, 207 TB HBM4, 2 MW power**.

| Item | Single Rack | 10 Racks | ×10 |
|---|---|---|---|
| GPUs | 72 × R100 | **720 × R100** | 10× |
| HBM4 | 20.7 TB | **207 TB** | 10× |
| Total weights (all models @ Q4) | 13.1 TB | 13.1 TB (not ×10 — same weights) | Fixed |
| Free HBM for KV cache | 7.6 TB | **193.9 TB** | 25.5× |
| Aggregate memory BW | ~1,580 TB/s | **~15,800 TB/s** | 10× |
| TDP | ~200 kW | **2 MW** | 10× |
| 5-Yr TCO (single rack) | ₹122 Cr | — | — |
| 5-Yr TCO (total) | — | **~₹1,220 Cr** | ~10× |

**₹1,220 Cr ≈ $128M USD.**

#### Strategy A: Independent Replicas (simplest)

Each rack loads all ~86 models independently. Users are load-balanced across racks.

| Rack | Models | Free HBM | Users per Rack | Total Users |
|---|---|---|---|---|
| 1-10 | All ~86 models | 7.6 TB each | ~300 each | **3,000** |

**Total: ~3,000 concurrent users.** Simple, no cross-rack coordination needed.

#### Strategy B: Dedicated Tiers (efficient)

Divide racks by model size — no weight duplication waste.

| Rack(s) | Handles | KV Cache Budget | Users | At 50 tok/s |
|---|---|---|---|---|
| 1 (+2 spare) | Large models (15 models, 9.3 TB) | 193.9 - 9.3 = 184.6 TB | ~9,230 @ 20 GB each | **~5,000** |
| 3 (+4 spare) | Medium models (15 models, 4.1 TB) | 203.8 TB | ~20,380 @ 10 GB each | **~10,000** |
| 5 (+6-10 spare) | Small models (30 models, 1 TB) | 206.9 TB | ~25,860 @ 8 GB each | **~25,000** |
| **Aggregate** | | | | **~15,000-25,000** |

Each user is routed to the rack serving their requested model tier.

#### Strategy C: Single Giant Model (maximum concurrency)

All 720 GPUs serving ONE model at a time (e.g. DeepSeek V4 Flash Max, 13B active).

| Constraint | Calculation | Limit |
|---|---|---|
| KV cache memory | (207 - 13.1) TB ÷ 3 GB (MLA) | **~64,600 users** |
| Compute (agg. tok/s @ large batch) | ~300,000-500,000 tok/s | — |
| At 20 tok/s/user | 300,000 ÷ 20 | **~15,000-25,000 users** |
| **Bottleneck** | **Compute, not memory** | |

#### Strategy D: Mixed Realistic

Partition 10 racks by model family, each rack handles its family with continuous batching.

| Configuration | Users | Model Coverage |
|---|---|---|
| 3 racks: DeepSeek/Kimi/Large MoE | ~4,000 | 15 largest models |
| 3 racks: GLM/MiniMax/Nemotron | ~5,000 | 15 medium models |
| 2 racks: Qwen/Mistral/Gemma | ~8,000 | 15 small-medium |
| 2 racks: All remaining small | ~10,000 | 15 smallest |
| **Total** | **~15,000-20,000** | **All ~86 models** |

#### Comparison Summary

| Strategy | Users | Models | Complexity | 5-Yr TCO (₹) | ₹ per user |
|---|---|---|---|---|---|
| A: Independent replicas | **3,000** | All 60 | Low | 1,220 Cr | **~40.7 L** |
| B: Dedicated tiers | **15,000-25,000** | All 60 | Medium | 1,220 Cr | **~5-8 L** |
| C: Single giant model | **15,000-25,000** | 1 at a time | Low | 1,220 Cr | **~5-8 L** |
| D: Mixed realistic | **15,000-20,000** | All 60 | High | 1,220 Cr | **~6-8 L** |

**Bottom line:** With 10 racks you can serve **3,000-25,000 concurrent users** depending on architecture. The cost per user is **₹5-41 L** over 5 years — at ₹40.7 L/user, strategy A is 5-7× more expensive per seat than strategies B-D.

### Key Takeaways

- **150-300 concurrent users** is realistic with all ~86 models loaded on 1 rack
- **10 racks takes it to 3,000-25,000** depending on deployment strategy
- Beyond KV cache, **compute becomes the bottleneck** for large batches
- Per-user cost drops from **₹40-80 L (1 rack)** to **₹5-8 L (10 racks)** due to weight-sharing efficiency
- For single-model serving, MLA models (DeepSeek) can serve **~25K users** with 720 GPUs
- **Software doesn't exist** to partition 720 GPUs across 60 different architectures — these numbers assume it did
- DGX B300 (₹15.6 Cr TCO) serves 1 model at a time, ~30-50 concurrent users → **~₹31-52 Cr per 100 users** — less efficient at multi-model, but 1/70th total cost of 10 racks

---

## DGX B300 — The Practical Single-User Alternative

A single DGX B300 (8× B300 GPUs, 2.1 TB total VRAM) can't load all ~86 models simultaneously, but it can **load any one of them in ~30 seconds**. For a single user who only uses one model at a time, this is the rational choice.

### DGX B300 — Actual India Cost

| Item | ₹ Cr |
|---|---|
| DGX B300 hardware (8× B300, 2.1 TB, landed India) | **5.5** |
| Rack / desk setup (single 10 kW circuit, air cooling) | **0.1** |
| Storage (4 TB NVMe) | **0.02** |
| Network switch + cabling | **0.05** |
| **You pay upfront** | **₹5.7 Cr** |
| Power (10 kW × PUE 1.2 × ₹9/kWh × 5 yr) | **0.5** |
| AMC (10%/yr × ₹5.5 Cr × 5 yr) | **2.8** |
| Colo (10 kW × ₹10k/kW/mo × 60 mo) | **0.6** |
| Staff (1 engineer × 5 yr) | **1.8** |
| Software + internet × 5 yr | **0.3** |
| **Total 5 years** | **₹11.7 Cr** |

### Comparison: All Three Options Side by Side

| Spec | DGX B300 | Rubin NVL72 | AMD Helios |
|---|---|---|---|---|
| GPUs | **8 × B300** | 72 × R100 | 72 × MI455X |
| Total VRAM | **2.1 TB** | 20.7 TB | **31 TB** |
| All ~86 models loaded? | ❌ (1 at a time) | ✅ | ✅ |
| Swap time | **~30 sec** | N/A | N/A |
| US Price | **$300-350K** | $4-8M (varies) | $5-5.5M |
| India Landed | **₹5.5 Cr** | ₹55 Cr | ₹52 Cr |
| TDP | **10 kW** | ~200 kW | ~235 kW |
| 5-Yr Power | **₹0.5 Cr** | ₹13.8 Cr | ₹16.2 Cr |
| 5-Yr AMC | **₹2.8 Cr** | ₹24.8 Cr | ₹23.4 Cr |
| 5-Yr Colo | **₹0.6 Cr** | ₹12.0 Cr | ₹14.1 Cr |
| 5-Yr Staff | **₹1.8 Cr** | ₹3.5 Cr | ₹3.5 Cr |
| **5-Yr TCO** | **₹11.7 Cr** | **₹121.2 Cr** | **₹116.7 Cr** |
| Concurrent users | **30-50** (1 model) | **150-300** (all models) | **500-700** (all models) |
| tok/s (small 3B model) | **~300** | ~800-1,200 | ~5,000-8,000 |
| tok/s (large 50B @ 1M ctx) | **~30** | ~30-60 | ~80-150 |
| Software | ✅ CUDA mature | ✅ CUDA mature | ⚠️ ROCm |
| Availability | **✅ Now** | H2 2026 | Q2 2027 |
| Power per user | **~₹1.7 L** | ~₹9.2 L | ~₹3.2 L |
| TCO per user | **~₹39 L** | ~₹40-80 L | ~₹16-23 L |

### Price Ladder (5-Yr TCO)

| System | ₹ Cr | Models at once | Users | 
|---|---|---|---|---|
| 1× DGX B300 | **11.7** | 1 (swap 30s) | 30-50 |
| 1× AMD Helios | **116.7** | All 60 | 500-700 |
| 1× Vera Rubin NVL72 | **121.2** | All 60 | 150-300 |
| 10× Vera Rubin NVL72 | **1,220** | All 60 | 3,000-25,000 |

### What ₹11.7 Cr Gets You (DGX B300)

- Any single frontier model at Q4 or FP8
- Full 1M context
- ~30 tok/s on K3/DeepSeek Pro Max (single user)
- Swap to a different model in 30 seconds
- Fits on a single 10 kW circuit — no liquid cooling, no special facility
- Can run at home if you have a spare room and 10 kW power

### Models That Fit on DGX B300 (2.1 TB)

| Quant | Fits | Max Model Size | Largest that fits |
|---|---|---|---|
| **Q4** (0.5 GB/B) | ✅ **All 65 models** | 4,608B params | Kimi K3 (2.8T ✅), Qwen3.8 (2.4T ✅), DVP Max (1.6T ✅) |
| **FP8** (1.0 GB/B) | ✅ **Most** | 2,304B params | DVP Max (1.6T ✅), K2.6 (1T ✅), GLM-5.2 (744B ✅) ❌ K3 (2.8T > 2.3TB) |
| **FP16** (2.0 GB/B) | ⚠️ **Medium only** | 1,152B params | Mistral Med 3.5 (128B ✅), Qwen3.6-27B (27B ✅) ❌ Anything >576B |
| **Q4 + 50 users** | ✅ | — | DVP Max (800 GB weights, 150 GB KV cache total ✅) |

**Every open-weight model in existence fits at Q4** on a single DGX B300. One at a time, 30 sec swap.

| Model | Q4 | FP8 | FP16 | Fits at Q4? |
|---|---|---|---|---|
| Kimi K3 (2.8T) | ~1,400 GB | ~2,800 GB | ~5,600 GB | ✅ |
| Qwen3.8-Max (2.4T) | 1,200 GB | 2,400 GB | 4,800 GB | ✅ |
| DeepSeek V4 Pro Max (1.6T) | 800 GB | 1,600 GB | 3,200 GB | ✅ |
| LongCat-2.0 (1.6T) | 800 GB | 1,600 GB | 3,200 GB | ✅ |
| Inkling (975B) | 488 GB | 975 GB | 1,950 GB | ✅ |
| Kimi K2.6 (1T) | 500 GB | 1,000 GB | 2,000 GB | ✅ |
| GLM-5.2 (744B) | 372 GB | 744 GB | 1,488 GB | ✅ |
| DeepSeek V3.2 (685B) | 342 GB | 685 GB | 1,370 GB | ✅ |
| Nemotron 3 Ultra (550B) | 275 GB | 550 GB | 1,100 GB | ✅ |
| Qwen3-Coder-480B (480B) | 240 GB | 480 GB | 960 GB | ✅ |
| MiniMax M3 (428B) | 214 GB | 428 GB | 856 GB | ✅ |
| Qwen3.5-397B (397B) | 198 GB | 397 GB | 794 GB | ✅ |
| DeepSeek V4 Flash Max (284B) | 142 GB | 284 GB | 568 GB | ✅ |
| Qwen3.6-27B (27B) | 14 GB | 27 GB | 54 GB | ✅ |
| Qwen3.6-35B-A3B (35B) | 18 GB | 35 GB | 70 GB | ✅ |
| **All others (47 more models)** | **Varies** | — | — | **✅ All** |

### What the DGX B300 Cannot Do

| Feature | Rubin/Helios | DGX B300 |
|---|---|---|
| All models loaded at once | ✅ | ❌ (swap 30s each) |
| All models at FP8 simultaneously | ✅ Helios only | ❌ |
| 500+ concurrent users | ✅ | ❌ (~30-50) |
| Sub-second model switching | ✅ | ❌ |
| Train a 1T+ model | ✅ | ❌ (needs 8 racks) |

If you're okay waiting 30 seconds to switch models and only need one at a time, the DGX B300 does everything these racks do for **1/10th the cost**.

### What ₹117-122 Cr Gets You (Helios/Rubin)

- All ~86 models loaded simultaneously
- 500-700 concurrent users (Helios) or 150-300 (Rubin)
- 2-10× faster per-user throughput
- Needs 200-235 kW dedicated power, liquid cooling, data center facility
- Requires 2-3 full-time engineers to operate

### The Honest Answer

**For a single user: DGX B300 wins.** ₹11.7 Cr vs ₹117-122 Cr. Same models. 30 sec swap time. No software headaches (CUDA). No facility build. No 3-person engineering team.

**For a team of 100+ users needing all models simultaneously:** Helios or Rubin. But that's a very different budget and use case.

## Complete Open-Weight Model Inventory

All open-weight / open-source models from the local_ai_coding_models.md tracking document, sorted by total parameters descending. "FPR4" = fits on 1 Rubin NVL72 at Q4 simultaneously with all others. **Verified via live search Aug 29, 2026 — new entries added: Hy4 preview Aug 28, GLM-5.3 weights Aug 28.**

| # | Model | Provider | Total Params | Active Params | Full Q4 | Full FP16 | License | SWE-bench | LCB V6 | Context | FPR4 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| — | **Claude Opus 5** 🆕🆕 | Anthropic | Closed | Closed | — | — | Closed (API) | **79.2%** (Pro) | — | 1M | N/A closed |
| — | **Ling 3.0 Flash** 🆕 | inclusionAI | 124B | ~5.1B | ~62 GB | ~248 GB | API-only (open pending) | 56.6% (Pro) | — | 262K | ✅ |
| 1 | Kimi K3 ⭐ | Moonshot AI | 2.8T | **104B** | ~1,400 GB | ~5,600 GB | **Kimi K3 License (custom)** | — | — | 1M | ✅ |
| 2 | **Qwen3.8-Max** 🆕 | Alibaba | 2.4T | **95B** | ~1,200 GB | ~4,800 GB | **qwen3.8-max (custom)** | 67.7% (Pro) | 86.6% (TB 2.1) | ~984K | ✅ |
| 3 | DeepSeek V4 Pro Max | DeepSeek | 1.6T | 49B | 800 GB | 3,200 GB | MIT | 80.6% | 93.5% | 1M | ✅ |
| 4 | LongCat-2.0 🆕 | Meituan | 1.6T | ~48B | ~800 GB | ~3,200 GB | MIT | — | — | 1M | ✅ |
| 5 | Inkling 🆕 | Thinking Machines | 975B | 41B | 488 GB | 1,950 GB | Apache 2.0 | 77.6% | — | 256K | ✅ |
| 6 | Inkling-Small 🆕 | Thinking Machines | 276B | 12B | ~138 GB | ~552 GB | Apache 2.0 | 80.2% | — | 1M | ✅ |
| 7 | Kimi K2.6 | Moonshot AI | 1T | 32B | 500 GB | 2,000 GB | Modified MIT | 80.2% | 89.6% | 256K | ✅ |
| 8 | Kimi K2.7 Code | Moonshot AI | 1T | 32B | 500 GB | 2,000 GB | Modified MIT | — | — | 256K | ✅ |
| 9 | MiMo-V2.5-Pro | Xiaomi | 1.02T | 42B | 510 GB | 2,040 GB | Open weight | 78.9% | — | 256K | ✅ |
| 10 | Kimi K2.5 | Moonshot AI | 1T | 32B | 500 GB | 2,000 GB | Modified MIT | 76.8% | — | 256K | ✅ |
| 11 | **GLM-5** 🆕 | Z.ai | **754B** | **40B** | ~377 GB | ~1,508 GB | **MIT** | **77.8%** | 56.2% (TB 2.0) | 131K+ | ✅ |
| 12 | GLM-5.2 | Z.AI | 744B | 40B | 372 GB | 1,488 GB | MIT | 80.0% | — | 256K | ✅ |
| 13 | GLM-5.1 | Z.AI | 744B | 40B | 372 GB | 1,488 GB | MIT | 77.8% | — | 256K | ✅ |
| 14 | DeepSeek V3.2 | DeepSeek | 685B | 37B | 342 GB | 1,370 GB | MIT | 73.1% | 83.3% | 128K | ✅ |
| 15 | DeepSeek V3 (0324) | DeepSeek | 671B | 37B | 336 GB | 1,342 GB | MIT | ~50% | 49.2% | 128K | ✅ |
| 16 | Nemotron 3 Ultra | NVIDIA | 550B | 55B | 275 GB | 1,100 GB | Open weight | 71.9% | 89.0% | 128K | ✅ |
| 17 | Qwen3-Coder-480B-A35B | Alibaba | 480B | 35B | 240 GB | 960 GB | Open weight | 68.4% | — | 256K | ✅ |
| 18 | MiniMax M3 | MiniMax | 428B | 23B | 214 GB | 856 GB | Modified MIT | 80.5% | — | 1M | ✅ |
| 19 | Ornith-1.0-397B | DeepReinforce | 397B | ? | 198 GB | 794 GB | Open weight | ~77% | — | 256K | ✅ |
| 20 | Qwen3.5-397B | Alibaba | 397B | 17B | 198 GB | 794 GB | Open weight | 76.4% | 83.6% | 256K | ✅ |
| 21 | GLM-4.7 | Z.AI | 358B | 32B | 179 GB | 716 GB | MIT | 73.8% | 84.9% | 256K | ✅ |
| 22 | MiMo-V2-Flash | Xiaomi | 309B | 15B | 154 GB | 618 GB | Open weight | 73.4% | — | 256K | ✅ |
| 23 | Hy3 | Tencent | 295B | 21B | 148 GB | 590 GB | Free | 78.0% | — | 256K | ✅ |
| 24 | K-EXAONE-236B-A23B | LG AI | 236B | 23B | 118 GB | 472 GB | Open weight | — | 80.7% | 256K | ✅ |
| 25 | MiniMax M2.5 | MiniMax | 230B | 10B | 115 GB | 460 GB | Modified MIT | 75.8% | 65% | 1M | ✅ |
| 26 | Step-3.5-Flash | StepFun | 196B | ? | 98 GB | 392 GB | Open weight | 74.4% | 86.4% | 66K | ✅ |
| 27 | Mistral Medium 3.5 | Mistral | 128B | 128B dense | 64 GB | 256 GB | Open weight | 77.6% | — | 256K | ✅ |
| 28 | Nemotron 3 Super | NVIDIA | 120B | 12B | 60 GB | 240 GB | Open weight | 60.5% | 81.2% | 128K | ✅ |
| 29 | Leanstral 1.5 🆕 | Mistral AI | 119B | 6.5B | 60 GB | 238 GB | Apache 2.0 | — | — | 256K | ✅ |
| 30 | Laguna S 2.1 | Poolside | 118B | 8B | 59 GB | 236 GB | OpenMDW-1.1 | — | — | 1M | ✅ |
| 31 | Qwen3-Coder-Next | Alibaba | 80B | 3B | 40 GB | 160 GB | Apache 2.0 | 70.6% | — | 256K | ✅ |
| 32 | Qwen3 32B | Alibaba | 32B | 32B dense | 16 GB | 64 GB | Open weight | ~62% | 65.7% | 256K | ✅ |
| 33 | Gemma 4 31B | Google | 31B | 31B dense | 16 GB | 62 GB | Apache 2.0 | 52% | 80.0% | 262K | ✅ |
| 34 | Qwen3.6-35B-A3B | Alibaba | 35B | 3B | 18 GB | 70 GB | Apache 2.0 | 73.4% | 80.4% | 262K | ✅ |
| 35 | Qwen3.5-35B-A3B | Alibaba | 35B | 3B | 18 GB | 70 GB | Apache 2.0 | 70.0% | 74.6% | 256K | ✅ |
| 36 | Qwen3.6-27B | Alibaba | 27B | 27B dense | 14 GB | 54 GB | Apache 2.0 | 77.2% | 83.9% | 262K | ✅ |
| 37 | Qwen3.5-27B | Alibaba | 27B | 27B dense | 14 GB | 54 GB | Open weight | 75.0% | 80.7% | 256K | ✅ |
| 38 | Gemma 4 26B-A4B | Google | 25B | 4B | 13 GB | 50 GB | Apache 2.0 | 17.4% | 77.1% | 262K | ✅ |
| 39 | North Mini Code 1.0 | Cohere | 30B | 3B | 15 GB | 60 GB | Apache 2.0 | 67.6% | — | 256K | ✅ |
| 40 | Qwen3-Coder-30B-A3B | Alibaba | 30B | 3B | 15 GB | 60 GB | Apache 2.0 | — | — | 256K | ✅ |
| 41 | Codestral 22B | Mistral | 22B | 22B dense | 11 GB | 44 GB | MNPL-0.1 | 40.0% | 48.0% | 256K | ✅ |
| 42 | StarCoder 3 | BigCode | 15B | 15B dense | 8 GB | 30 GB | OpenRAIL-M | — | — | 16K | ✅ |
| 43 | StarCoder2-15B | BigCode | 15B | 15B dense | 8 GB | 30 GB | OpenRAIL-M | 18.3% | — | 16K | ✅ |
| 44 | StarCoder1-15B | BigCode | 15.5B | 15.5B dense | 8 GB | 31 GB | OpenRAIL-M | — | — | 16K | ✅ |
| 45 | Gemma 4 12B | Google | 12B | 12B dense | 6 GB | 24 GB | Apache 2.0 | — | 72.0% | 262K | ✅ |
| 46 | Yi-Coder-9B | 01.AI | 9B | 9B dense | 4.5 GB | 18 GB | Apache 2.0 | — | 23.4% | 128K | ✅ |
| 47 | Nemotron Nano 9B v2 | NVIDIA | 9B | 9B dense | 4.5 GB | 18 GB | Open weight | — | 71.1% | 32K | ✅ |
| 48 | Ministral 3 8B | Mistral | 8B | 8B dense | 4 GB | 16 GB | Open weight | — | 61.6% | 128K | ✅ |
| 49 | Mistral Small 4 | Mistral | 6.5B | 6.5B dense | 3.3 GB | 13 GB | Open weight | — | 63.6% | 32K | ✅ |
| 50 | Ministral 3 14B | Mistral | 14B | 14B dense | 7 GB | 28 GB | Open weight | — | 64.6% | 128K | ✅ |
| 51 | ZAYA1-8B | Zyphra | 8B | 8B dense | 4 GB | 16 GB | Open weight | — | 65.8% | 32K | ✅ |
| 52 | CodeLlama-70B-Instruct | Meta | 70B | 70B dense | 35 GB | 140 GB | Llama 2 Comm. | — | — | 100K | ✅ |
| 53 | CodeLlama-34B-Instruct | Meta | 34B | 34B dense | 17 GB | 68 GB | Llama 2 Comm. | — | — | 100K | ✅ |
| 54 | CodeLlama-13B-Instruct | Meta | 13B | 13B dense | 6.5 GB | 26 GB | Llama 2 Comm. | — | — | 100K | ✅ |
| 55 | CodeLlama-7B-Instruct | Meta | 7B | 7B dense | 3.5 GB | 14 GB | Llama 2 Comm. | — | — | 100K | ✅ |
| 56 | Yi-Coder-1.5B | 01.AI | 1.5B | 1.5B dense | 0.8 GB | 3 GB | Apache 2.0 | — | — | 128K | ✅ |
| 57 | Qwen3.5-122B-A10B | Alibaba | 122B | 10B | 61 GB | 244 GB | Open weight | — | 78.9% | 256K | ✅ |
| 58 | ERNIE 4.5 | Baidu | 47B | 47B dense | 24 GB | 94 GB | Apache 2.0 | — | 45.4% | 128K | ✅ |
| 59 | ERNIE 4.5-21B-A3B | Baidu | 21B | 3B | 10.5 GB | 42 GB | Apache 2.0 | — | — | 128K | ✅ |
| 60 | GLM-4.6 | Z.AI | 358B | 32B | 179 GB | 716 GB | MIT | — | 82.8% | 256K | ✅ |
| 61 | MiniMax M2 | MiniMax | 230B | 10B | 115 GB | 460 GB | Modified MIT | — | 83.0% | 1M | ✅ |
| 62 | Kimi K2-Thinking-0905 | Moonshot AI | 1T | 32B | 500 GB | 2,000 GB | Modified MIT | — | 83.1% | 256K | ✅ |
| 63 | LongCat-Flash-Thinking (×2) | Meituan | ? | ? | ~400 GB | ~1,600 GB | Open weight | — | 79-83% | 256K | ✅ |
| 64 | DeepSeek R1 (×2) | DeepSeek | 671B | 37B | 336 GB | 1,342 GB | MIT | 49.2% | 73.3% | 128K | ✅ |
| 65 | DeepSeek V4 Flash Max | DeepSeek | 284B | 13B | 142 GB | 568 GB | MIT | 79.0% | 91.6% | 1M | ✅ |
| 66 | K-EXAONE 2.0 🆕 | LG AI Research | 750B | 37B | ~375 GB | ~1,500 GB | Apache 2.0 | 80.6% | — | — | ✅ |
| 67 | openPangu-2.0-Pro 🆕 | Huawei | 505B | ~18B | ~253 GB | ~1,010 GB | OpenPangu License 2.0 | 68.5% | 85.7% | 512K | ✅ |
| 68 | Instella-MoE-16B-A3B-Think 🆕 | AMD | 16B | 2.8B | ~8 GB | ~32 GB | ResearchRAIL (non-commercial) | — | — | — | ✅ |
| 69 | A.X K2 🆕 | SK Telecom | 688B | 33B | ~344 GB | ~1,376 GB | Apache 2.0 | — | 84.0% | 256K | ✅ |
| 70 | **GLM-5.3-Flash** 🆕 | Z.ai | 320B | 18B | ~160 GB | ~640 GB | **MIT** | — | 84.3% (TB 2.1) | **1M** | ✅ |
| 71 | **GLM-5.3** 🆕 | Z.ai | 743B | 40B | **~372 GB (756 GB dl, 141 shards, Aug 28)** | ~1,500 GB | **Custom (> $10B → review)** | 88.2% (TB 2.1) | 66.9% (DeepSWE) | **1M** | ✅ |
| 72 | **Tencent Hy4 preview** 🆕 | Tencent | 770B | 49B | ~385 GB | ~1,540 GB | Apache 2.0 | — | — | **1M+** | ✅ |
| 73 | **Granite 4.2 30B** 🆕 | IBM | 30B | 30B dense | ~15 GB | ~60 GB | Apache 2.0 | — | — | **512K** | ✅ |
| 74 | Granite 4.2 8B | IBM | 8B | 8B dense | ~4 GB | ~16 GB | Apache 2.0 | — | — | 512K | ✅ |
| 75 | Granite 4.2 3B | IBM | 3B | 3B dense | ~1.5 GB | ~6 GB | Apache 2.0 | — | — | 512K | ✅ |
| 76 | **Qwen3.8-Flash-Next** 🆕 | Alibaba | 180B | ~6B | ~111 GB | ~444 GB | Qwen Community 1.0 | 62.5% (Pro) | 91.9% (LCB) | **1M** | ✅ |
| 77 | **MAI-Code-1-Flash** 🆕 | Microsoft | 138B | 5B | ~70 GB (est.) | ~280 GB | Closed (API only, GitHub Copilot) | 72.6% (Verified) | 62.9% (TB 2.1) | 256K | ❌ |
| 78 | **Ornith-1.5-397B** 🆕 | DeepReinforce/Ornith | 403B | ? | ~244 GB | ~976 GB | MIT | 86.0% (Verified) | 86.1% (TB 2.1) | **1M** | ✅ |
| 79 | **Ornith-1.5-35B-A3B** 🆕 | DeepReinforce/Ornith | 36B | ~3B | ~22 GB | ~88 GB | MIT | 79.0% (Verified) | 67.8% (TB 2.1) | **1M** | ✅ |
| 80 | **Ornith-1.5-9B** 🆕 | DeepReinforce/Ornith | 10B | 10B dense | ~6 GB | ~24 GB | MIT | 70.6% (Verified) | 46.2% (TB 2.1) | **1M** | ✅ |
| 81 | **Apodex 1.1-mini** 🆕 | Apodex AI | 35B | 3B | ~17 GB | ~70 GB | Apache 2.0 | 77.7% (Verified) | 70.8% (TB 2.1) | 262K | ✅ |
| 82 | **Qwen3.8-Max** 🆕 | Alibaba | 2.4T | 95B | ~1,200 GB | ~4,800 GB | Custom | 86.6% (TB) | 67.7% (SWE-Pro) | 1M | ✅ |
| 83 | **Laguna S 2.1** 🆕 | Poolside | 118B | 8B | ~59 GB | ~236 GB | OpenMDW-1.1 | — | 59.4% (SWE-Pro) | 262K | ✅ |
| 84 | **MiniMax M3** 🆕 | MiniMax | 428B | 23B | ~214 GB | ~856 GB | Modified MIT | — | 80.5% (SWE-V) | 1M | ✅ |
| 85 | **Kimi K2.7-Code** 🆕 | Moonshot AI | ~1T | 32B | ~500 GB | ~2,000 GB | Modified MIT | — | — | 256K | ✅ |
| 86 | **Muse Glimmer** 🆕 | Meta | 29.6B | 29.6B | ~15 GB | ~60 GB | Apache 2.0 | — | — | 262K | ✅ |

**Total at Q4:** ~16,500 GB (+ Hy4 385 + GLM-5.3 372 + Granite 30B/8B/3B + Qwen3.8-Flash-Next 111 + Ornith 397/35/9 + Apodex + Qwen3.8-Max 1,200 + Laguna 59 + MiniMax M3 214 + Kimi K2.7 500 + Muse 15) | **Total at FP16:** ~66,000 GB | **All still fit on 1 Rubin NVL72 at Q4** ✅ (31 TB Helios: 14.5 TB headroom) | *Updated Aug 29-30, 2026 — added: Ornith-1.5 family (Aug 19, MIT, 3 variants 9B/35B-A3B/397B, 3-stage self-improving RL; 397B at TB 2.1 #5 / SWE-V #1 on HF leaderboard, partial third-party listing). Apodex 1.1-mini (Aug 24, Apache 2.0, 35B-A3B Qwen3.5-base, SWE-V 77.7/TB 70.8, free on platform.apodex.ai). MAI-Code-1.1-Flash, Qwen3.8-Flash-Next, North-Micro-Vision-Instruct. Ling 3.0 Flash Fin: API-only (no weights), finance-specialized, free on OpenRouter. GLM-5.2 Turbo: UNCONFIRMED. Earlier: GLM-5.3 weights Aug 28; Hy4 preview Aug 28; Granite 4.2 Aug 25; GLM-5.3-Flash Aug 26; Sol $4/$20 promo Nov 21; DeepSeek peak/off-peak Aug 16; Sonnet 5 $2/$10; Gemini $0.75->$1.50 Jan 2027.* **Correction Sep 1, 2026:** MAI-Code-1-Flash (no ".1") is closed-weight API-gated; removed from self-hostable count. **Additions Sep 1, 2026:** Qwen3.8-Max (2.4T/95B, AA 58, custom license), Laguna S 2.1 (118B/8B, OpenMDW-1.1, $0.10/$0.20), MiniMax M3 (428B/23B, Modified MIT), Kimi K2.7-Code (~1T/32B, Modified MIT), Muse Glimmer (29.6B, Apache 2.0, AA 35). Ornith-1.5-397B (MIT, TB 86.1) added to watch list. Apodex 1.1-mini (Apache 2.0) added to watch list. GLM-5.3 weights release date corrected to Aug 27; license ">$10B revenue → security review" trigger unconfirmed (HF shows "other"). Qwen3.8-27B AA Index independently measured at 52.

---

## Key Takeaways

- **1 rack** (₹47-65 Cr) runs every open-weight coding model simultaneously at Q4 with max context
- **~5.8 TB headroom** remains for future models, higher precision, or running top models at FP8
- **3 racks** (₹141-195 Cr) needed for FP16
- **Small models (3-13B active):** ~800-1,500 tok/s at max context
- **Large frontier models (40-50B active, 1M ctx):** ~30-120 tok/s — attention O(L²) is the ceiling
- **No model gets 2,000+ tok/s at max context on single user** — autoregressive decode is inherently sequential
- **No inference engine exists** that can serve all 61 architectures simultaneously from one GPU pool
- **Practical alternative:** 1× DGX B300 (~₹5.5 Cr, 5yr TCO ₹15.6 Cr) — swap between models in ~30 sec, 1/8th the cost
- **Software gap is the real bottleneck** — hardware is ready, orchestration isn't

---

---

## Full Cost Breakdown: Vera Rubin NVL72 — 5 Years

All costs in ₹. Ranges use midpoints for total.

### One-Time (Capex)

| Item | Amount (₹ Cr) | Notes |
|---|---|---|
| Vera Rubin NVL72 hardware (landed India) | **55** | 47-65 Cr midpoint; incl. IGST, freight, margin |
| Rack infrastructure (liquid cooling, CDU, transformers, UPS, piping) | **7.5** | 5-10 Cr midpoint |
| Network (25/100GbE switches, spine, cabling, NICs) | **0.5** | 4× 100G switches + fiber |
| Storage (16 TB NVMe Gen5) | **0.05** | Samsung PM9A3 8 TB × 2 |
| Facility setup (if new room/cage) | **1.5** | Power distribution, fire suppression, raised floor |
| **Total Capex** | **~64.6 Cr** | |

### Annual Recurring (Opex)

| Item | Per Year (₹ Cr) | 5-Year Total (₹ Cr) | Notes |
|---|---|---|---|
| Power (200 kW × 24/7 × PUE 1.4) | **2.76** | **13.8** | ₹11.25/kWh effective (200×8760×1.4×11.25 = ₹2.76 Cr/yr; commercial colo rate incl. surcharges) |
| AMC / extended support (8-10% of hw) | **5.0** | **25.0** | Nvidia Enterprise Support, parts replacement |
| Staff (2-3 engineers) | **0.7** | **3.5** | 1 SRE + 1 ML engineer, India salaries |
| Colocation / datacenter space (200 kW) | **2.5** | **12.5** | High-density liquid-cooled colo @ ~₹10k/kW/mo |
| Software / inference engine licenses | **0.2** | **1.0** | vLLM Enterprise, Nvidia AI Enterprise, monitoring |
| Network / internet transit (100 Gbps) | **0.3** | **1.5** | Dedicated fiber transit |
| **Total Opex** | **~11.5 Cr/yr** | **~57.3 Cr** | |

### 5-Year Total Cost of Ownership

| Category | Amount (₹ Cr) | % of Total |
|---|---|---|
| Capex (hardware + infra + setup) | **~64.6 Cr** | 53% |
| 5-yr Power | **~13.8 Cr** | 11% |
| 5-yr AMC | **~25.0 Cr** | 20% |
| 5-yr Colocation | **~12.5 Cr** | 10% |
| 5-yr Staff | **~3.5 Cr** | 3% |
| 5-yr Software + Network | **~2.5 Cr** | 2% |
| **Grand Total 5-Yr TCO** | **~₹122 Cr** | **100%** |

### Cost Breakdown by Year

| Year | Capex | Opex | Total (₹ Cr) | Cumulative |
|---|---|---|---|---|---|
| 0 (purchase) | 64.6 | — | 64.6 | 64.6 |
| 1 | — | 11.5 | 11.5 | 76.1 |
| 2 | — | 11.5 | 11.5 | 87.6 |
| 3 | — | 11.5 | 11.5 | 99.1 |
| 4 | — | 11.5 | 11.5 | 110.6 |
| 5 | — | 11.5 | 11.5 | 122.1 |

### Comparison: DGX B300 (Practical Alternative)

| Item | Rubin NVL72 (₹ Cr) | DGX B300 (₹ Cr) |
|---|---|---|
| Capex | 64.6 | **5.5** |
| 5-yr AMC | 25.0 | **2.2** |
| 5-yr Colo | 12.5 | **1.3** (10 kW rack) |
| 5-yr Power | 13.8 | **2.6** |
| 5-yr Staff | 3.5 | **3.5** (same) |
| 5-yr Network + SW | 2.5 | **0.5** |
| **5-Yr TCO** | **~₹122 Cr** | **~₹15.6 Cr** |
| Models at once | All 60 ✅ | **1 at a time** |
| Swap time | Not needed | **30 sec** |
| Serves any model? | ✅ | ✅ |

### Key Takeaways

- **₹122 Cr over 5 years** for Rubin NVL72 — 8× the DGX B300
- **AMC (~₹25 Cr)** silently costs more than power (~₹13.8 Cr) over 5 years
- **AMC alone pays for 5 DGX B300s** — think about that
- DGX B300 serves every model (one at a time, 30s swap) for **₹15.6 Cr** — a fraction of the cost
- Rubin only wins if you need **multiple models running simultaneously** (team of 10+ devs each on different models) or **zero swap latency**

---

## Training Frontier Models — Scale & Cost

### Fine-Tuning (any existing model)

| System | Max model for full FT | LoRA possible? |
|---|---|---|
| **DGX B300** (2.1 TB) | Up to ~500B @ FP16 | ✅ Any model |
| **Rubin NVL72** (20.7 TB) | Up to K3 @ FP8 (2.8T) | ✅ Any model |
| **AMD Helios** (31 TB) | Up to K3 @ FP16 (2.8T) | ✅ Any model |

### Full Training from Scratch

| Model Size | DGX B300 | Rubin NVL72 | Helios | What you'd actually need |
|---|---|---|---|---|
| **1B params** | ✅ 2 days | ✅ Hours | ✅ Hours | 1-2 GPUs |
| **7B params** | ✅ 2-4 weeks | ✅ ~2 days | ✅ ~2 days | 8-64 GPUs |
| **70B params** | ⚠️ 6-12 months | ✅ ~2-4 weeks | ✅ ~2-4 weeks | 64-512 GPUs |
| **500B params** | ❌ Impossible | ⚠️ 6-9 months | ⚠️ 5-8 months | 1,000+ GPUs |
| **2.8T (K3 class)** | ❌ | ❌ ~6+ years | ❌ ~5+ years | **10,000+ GPUs** |

### 200 Racks — Frontier Training Cluster

| Item | Per Rack | 200 Racks |
|---|---|---|
| Hardware (landed) | ₹72 Cr | **₹14,400 Cr** |
| Cooling/power infra | ₹8 Cr | **₹1,600 Cr** |
| Network fabric (InfiniBand) | ₹3 Cr | **₹600 Cr** |
| **Total Rubin 200** | | **₹16,600 Cr ($17.3B)** |
| **Total Helios 200** (₹63 Cr/rack) | | **₹14,600 Cr ($15.2B)** |

**Power during training run:**

| Metric | 200 Rubin | 200 Helios |
|---|---|---|
| Total load | **40 MW** | **28 MW** |
| With PUE 1.4 | **56 MW** | **39.2 MW** |
| Per day | **₹1.2 Cr/day** | **₹0.85 Cr/day** |
| Per month | **₹36 Cr/mo** | **₹25 Cr/mo** |

**Time to train frontier models (200 racks):**

| Model | 200 Rubin | Original cluster |
|---|---|---|
| K3 class (2.8T) | **~12-13 days** | 10K H100 → 90 days |
| 500B dense (GPT-4 class) | **~2-3 days** | — |
| 70B (Llama 3 class) | **~1-2 hours** | — |

### 200 Racks Total Cost for One Training Run

| Item | ₹ Cr |
|---|---|
| 200 racks hardware | 16,600 |
| Datacenter lease (56 MW, 1 yr) | 500-1,000 |
| Power for 30-day run | 36 |
| Staff (50 engineers, 3 months) | 4.5 |
| **Total to train one K3-class model** | **~₹17,200 Cr** |

For reference: IndiaAI Mission = ₹10,372 Cr. Reliance Jio AI budget = ₹10,00,000 Cr (₹10 lakh Cr).

---

## Reliance Jio — ₹10 Lakh Crore AI Plan

At India AI Impact Summit 2026 (Feb 19), Mukesh Ambani announced Jio + Reliance will invest **₹10,00,000 Cr ($110B)** over 7 years in AI — not ₹25,000 Cr. The IndiaAI Mission is ₹10,372 Cr; Jio's investment is **96× larger**.

### What ₹10 Lakh Cr Builds

| Initiative | Details |
|---|---|
| **Jamnagar gigawatt DC** | 120 MW online H2 2026, scaling to multi-GW |
| **Green energy** | 10 GW surplus solar to power it |
| **Nationwide edge compute** | AI nodes integrated with Jio 5G network |
| **JioBrain platform** | Launched June 3, 2026 |
| **Own foundation models** | 8B, 70B, 175B MoE — trained on 22 Indian languages |
| **On-device AI** | 4B model for JioPhone |

### JioBrain — India's Claude/ChatGPT Competitor

| Tier | What | Pricing |
|---|---|---|
| **Consumer** | Free voice assistant in JioCinema, JioMart, MyJio | **Free** |
| **Developer** | OpenAI-compatible API | **₹0.18/1K tokens** (40% below OpenAI) |
| **Enterprise** | On-prem appliance, SOC 2, Meity certified | Custom |
| **Phone** | 4B offline model on JioPhone | Built-in |

### Jio vs You vs Claude/OpenAI

| | **Your Rubin (₹122 Cr)** | **Jio (₹10L Cr)** | **Claude/OpenAI** |
|---|---|---|---|
| Models | All open models (62) | Own 8B-175B models | GPT-5, Claude 4 |
| Users | **150-300 concurrent** | **500M+ Jio users** | 200M+ |
| DC scale | **280 kW** (1 rack) | **Gigawatt** (1,000+ racks) | 10,000+ racks |
| Languages | English | **22 Indian languages native** | English + translate |
| Privacy | ✅ Total (your hardware) | ✅ India data residency | ❌ Data leaves India |
| Cost to use | Free (self-hosted) | ₹0.18/1K tokens | $3-15/1M tokens |
| Philosophy | Don't rent intelligence | **Don't rent intelligence** | Rent intelligence |

### The Parallel

| | You | Jio |
|---|---|---|
| Goal | Own all open models locally | Own India's AI infrastructure |
| Investment | ₹122 Cr | ₹10,00,000 Cr |
| Scale | Personal/few hundred users | 1.4 billion Indians |
| Budget ratio | **1×** | **7,194×** |
| Hardware | 1 rack → 72 GPUs | ~1,000+ racks → 72,000+ GPUs |
| Model training | Fine-tune only | Train own foundation models |

Both believe "India cannot afford to rent intelligence" — you at personal scale, Jio at national scale.

---

¹ Kimi K3 active parameter count is **104B** (16 of 896 routed experts + 2 shared experts + always-active stack) per Moonshot model card; weights released July 27, 2026 under **Kimi K3 License** (custom, not Modified MIT).

*Pricing at ₹96.50/USD (July 23, 2026). Exchange rate source: Investing.com, Mataf.net, X-Rates live data. Reliance Jio investment announced Feb 19, 2026 at India AI Impact Summit. JioBrain launched June 3, 2026. All prices indicative, subject to market fluctuation.*
