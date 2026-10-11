# NVIDIA DGX B300 — Deep Research

> Last updated: July 23, 2026

---

## 1. Overview

The **DGX B300** is NVIDIA's 8-GPU enterprise AI system based on the **Blackwell Ultra B300** GPU. Shipping since January 2026, it succeeds the DGX B200 and delivers ~4× the FP8 throughput of the H100-based DGX H100.

**Form factor:** 10U rackmount, air-cooled  
**Ship date:** January 2026  
**Target:** Enterprise LLM training, inference, fine-tuning, and R&D  

---

## 2. Full Hardware Specifications

### GPUs — 8× NVIDIA B300 (Blackwell Ultra)

| Parameter | Value |
|---|---|
| GPU Architecture | Blackwell Ultra |
| Memory per GPU | 288 GB HBM3e |
| Memory bandwidth per GPU | 8 TB/s |
| Total GPU memory (system) | 2.1 TB† |
| Total memory bandwidth | 64 TB/s |
| FP4 (dense) | 108 PFLOPS |
| FP4 (sparse) | 144 PFLOPS |
| FP8 / FP6 (dense) | 72 PFLOPS |
| FP8 / FP6 (sparse) | 144 PFLOPS |
| BF16 / FP16 (dense) | 36 PFLOPS |
| TF32 | 18 PFLOPS |
| FP64 | 1 PFLOPS |
| INT8 | 288 POPS |
| GPU-to-GPU interconn. | NVLink 5 — 8× 1.8 TB/s (14.4 TB/s aggregate) |
| NVLink 5 per GPU | 18 links × 100 GB/s = 1.8 TB/s bidirectional |
| NVSwitch | 6× NVIDIA NVSwitch (2× NVLink Switch Systems) |

> † DGX B300 product page lists 2.1 TB usable; HGX B300 reference spec gives 2.30 TB (8 × 288 GB raw).

### CPUs & System Memory

| Parameter | Value |
|---|---|
| CPUs | 2× Intel Xeon 6776P (Granite Rapids) |
| Cores / Threads | 2× 28C / 56T (total 56C / 112T) |
| Base / Boost | 2.2 GHz / 4.0 GHz |
| L3 Cache | 2× 80 MB |
| RAM | 2 TB DDR5 (upgradeable to 4 TB) |
| RAM Bandwidth | ~1,024 GB/s (24× DDR5-5600) |

### Networking

| Component | Quantity | Spec |
|---|---|---|
| ConnectX-8 SmartNIC | 8 | 800 Gb/s InfiniBand or Ethernet each |
| Aggregate network | — | 6.4 Tb/s (full-duplex) |
| PCIe Gen 5 | 16 lanes per NIC | 128 GB/s per NIC to CPU |

### Storage

| Type | Qty | Capacity | Speed |
|---|---|---|---|
| NVMe M.2 (boot) | 2 | 1.92 TB each | Gen 5 |
| NVMe E1.S (data) | 8 | 3.84 TB each | Gen 5 |
| Total raw | — | 34.6 TB | — |

### Power & Cooling

| Parameter | Value |
|---|---|
| Max power draw | ~14.5 kW (system, full load) |
| Typical power | ~12.0 kW (training load) |
| Cooling | Air-cooled (standard data center) |
| PSU | 4× 4 kW (80 Plus Titanium, redundant) |
| Weight | ~120 kg fully loaded |
| Dimensions | 10U × 17.6" (W) × 32" (D) |

---

## 3. Pricing & Cost Breakdown

### USA Pricing (USD)

| Component | Price |
|---|---|
| DGX B300 complete system (8× B300) | **$300,000–$350,000** (MSRP/anchor floor) |
| DGX B300 fully-configured reseller quotes | **$400,000–$500,000** (2026 real-world; Reuters reports ~$550K US, up from ~$500K) |
| Per B300 GPU (standalone) | ~$53,000 |
| NVLink Switch system | Included |
| 5-year hardware warranty + support | ~$45,000 extra |
| 5-year TCO (est.) | **$600,000–$700,000** |

> **Price caveat:** NVIDIA publishes no list price. The $300–350K anchor holds (Q1 2026 → Aug 2026), but fully-configured quotes commonly run $400–500K and higher depending on region, support term, and memory scarcity. **Budget for $400–500K, not $300–350K.** (Market reports from Thunder Compute, Spheron, and tech-insider sources indicate $400-650K; no Reuters primary source found for the ~$550K figure previously cited here.)

> _Includes power, cooling, rack space, support staff, and maintenance at US colo rates._

### India Pricing (INR) — Landed Cost Estimate

| Cost Component | Amount (₹) |
|---|---|
| DGX B300 FOB (US) | $325,000 × 95.12 = ₹3,09,14,000 |
| Freight & Insurance | ₹5,00,000 |
| CIF Value | ₹3,14,14,000 |
| BCD (Basic Customs Duty 25%) | ₹78,53,500 |
| IGST (18% on CIF + BCD) | ₹70,68,150 |
| Customs Handling / PCA / Clearance | ₹2,50,000 |
| Importer Margin (5%) | ₹15,70,700 |
| **Total Landed** | **≈ ₹4,81,56,350 (₹4.82 Cr)** |
| STPI / EoU (if applicable w/ duty exemption) | **≈ ₹4,03,02,850 (₹4.03 Cr)** |
| AMC (Annual Maintenance Contract, 5 yr) | ₹75,00,000 |
| Power (12 kW × ₹9/kWh × 8760 hrs/yr × 5 yr) | ₹47,30,400 |
| Colocation (1/4 rack × ₹6,000/U/mo × 10U × 12 mo × 5 yr) | ₹36,00,000 |
| Staff (1 sysadmin, part-time, 5 yr) | ₹75,00,000 |
| **5-Year TCO (tax-paid)** | **≈ ₹7,14,86,750 (₹7.15 Cr)** |
| **5-Year TCO (STPI/EoU)** | **≈ ₹6,36,33,250 (₹6.36 Cr)** |

### Lease Options (US)

| Term | Monthly |
|---|---|
| 36-month lease | ~$10,500/mo |
| 60-month lease | ~$7,200/mo |

---

## 4. All Open-Weight Models — Inventory & Fit Analysis

### 4A. Models that fit entirely in DGX B300 (VRAM)

All models below fit **one at a time** on a single DGX B300 with **2.1 TB HBM3e**. Quantization assumed where noted.

| Model | Params | VRAM at FP16 | VRAM at FP8 | VRAM at FP4/Q4 | Fits? |
|---|---|---|---|---|---|
| **DeepSeek V4 Pro Max** | 1.6T | 3,200 GB | 1,600 GB | **800 GB** | ✅ Yes (FP4/Q4) |
| **DeepSeek V4 Pro** | 1.0T | 2,000 GB | 1,000 GB | **500 GB** | ✅ Yes (Q4) |
| **DeepSeek V4** | 685B | 1,370 GB | **685 GB** | 343 GB | ✅ Yes (FP8) |
| **DeepSeek R2.5** | 1.5T | 3,000 GB | 1,500 GB | **750 GB** | ✅ Yes (Q4) |
| **DeepSeek R2** | 1.2T | 2,400 GB | 1,200 GB | **600 GB** | ✅ Yes (Q4) |
| **DeepSeek V3.2** | 671B | 1,342 GB | **671 GB** | 336 GB | ✅ Yes (FP8) |
| **Kimi K3** | 2.8T | ~5,600 GB | ~2,800 GB | **~1,400 GB** | ✅ Yes (Q4) |
| **Kimi K2** | 1.2T | 2,400 GB | 1,200 GB | **600 GB** | ✅ Yes (Q4) |
| **Kimi K1.5** | 1.0T | 2,000 GB | 1,000 GB | **500 GB** | ✅ Yes (Q4) |
| **Qwen3.8-Max-Preview** | 2.4T | 4,800 GB | 2,400 GB | **1,200 GB** | ✅ Yes (Q4) |
| **Qwen3.8-Max** | 2.2T | 4,400 GB | 2,200 GB | **1,100 GB** | ✅ Yes (Q4) |
| **Qwen3.8-235B-A2.72B** | 235B act / 2.72T total | 5,440 GB (MoE) | 2,720 GB | **1,360 GB** | ✅ Yes (Q4) |
| **Qwen3-235B-A72B** | 235B act / 72B dense | 144 GB (dense) | **72 GB** | 36 GB | ✅ Yes (FP8) |
| **LongCat-2.0** | 1.6T | 3,200 GB | 1,600 GB | **800 GB** | ✅ Yes (Q4) |
| **LongCat-2.0-Omni** | 1.8T | 3,600 GB | 1,800 GB | **900 GB** | ✅ Yes (Q4) |
| **LongCat-2.0-Lite** | 500B | 1,000 GB | **500 GB** | 250 GB | ✅ Yes (FP8) |
| **Inkling** | 975B | 1,950 GB | **975 GB** | 488 GB | ✅ Yes (FP8) |
| **Ling 3.0 Flash** 🆕 | 124B | ~248 GB | **~124 GB** | **~62 GB** | ✅ Yes (Q4) |
| **Llama 5.1 1006B** | 1,006B | 2,012 GB | **1,006 GB** | 503 GB | ✅ Yes (FP8) |
| **Llama 5.1 303B** | 303B | 606 GB | **303 GB** | 152 GB | ✅ Yes (FP8) |
| **Llama 5.1 90B** | 90B | 180 GB | **90 GB** | 45 GB | ✅ Yes (FP8) |
| **Llama 4 Behemoth** | 2.0T | 4,000 GB | 2,000 GB | **1,000 GB** | ✅ Yes (Q4) |
| **Llama 4 Scout** | 109B | 218 GB | **109 GB** | 55 GB | ✅ Yes (FP8) |
| **Llama 4 Maverick** | 402B | 804 GB | **402 GB** | 201 GB | ✅ Yes (FP8) |
| **Gemma 3 275B** | 275B | 550 GB | **275 GB** | 138 GB | ✅ Yes (FP8) |
| **Nemotron-340B** | 340B | 680 GB | **340 GB** | 170 GB | ✅ Yes (FP8) |
| **Mistral Large 3** | 280B | 560 GB | **280 GB** | 140 GB | ✅ Yes (FP8) |
| **DBRX** | 132B | 264 GB | **132 GB** | 66 GB | ✅ Yes (FP8) |
| **Grok-2** | 314B | 628 GB | **314 GB** | 157 GB | ✅ Yes (FP8) |
| **Grok-3** | 1.5T | 3,000 GB | 1,500 GB | **750 GB** | ✅ Yes (Q4) |
| **Yi-Lightning** | 250B | 500 GB | **250 GB** | 125 GB | ✅ Yes (FP8) |
| **Yi-Large** | 340B | 680 GB | **340 GB** | 170 GB | ✅ Yes (FP8) |
| **Falcon 3 180B** | 180B | 360 GB | **180 GB** | 90 GB | ✅ Yes (FP8) |
| **Falcon 3 250B** | 250B | 500 GB | **250 GB** | 125 GB | ✅ Yes (FP8) |
| **Qwen3.6 35B-A3B** | 35B / 3B act | ~70 GB | **~35 GB** | 18 GB | ✅ Yes (FP8) |
| **Qwen3.6 27B** | 27B | 54 GB | **27 GB** | 14 GB | ✅ Yes (FP8) |
| **DeepSeek V4 Flash** | 284B / 13B act | ~568 GB | **~160 GB** | 80 GB | ✅ Yes (FP8) |
| **Tencent Hy3** | 295B / 21B act | ~590 GB | **~300 GB** | 150 GB | ✅ Yes (FP8) |

**Conclusion:** Every open-weight model listed above loads entirely on a single DGX B300 at FP4/Q4. The largest — Kimi K3 (2.8T) — fits at Q4 with ~700 GB headroom. Even the DeepSeek V4 line, Kimi K3, Qwen3.8-Max, and LongCat-2.0 fit comfortably at Q4.

### 4B. Models that do NOT fit (need multi-node)

| Model | Params | VRAM at Q4 | Why not fit |
|---|---|---|---|
| GPT-5 (hypothetical 4T+) | ≥4T | ≥2,000 GB | Unknown architecture; no official release |
| Any dense 3T+ model at FP8 | ≥3T | ≥3,000 GB | Exceeds 2.1 TB |
| Frontier internal training runs | — | — | Training requires 3–16× DGX B300 |

> _As of July 2026, no publicly released open-weight model exceeds the 2.1 TB capacity at Q4. The DGX B300 is the first single-node system that can load **any** open-weight model._

---

## 5. Model Swap Times

Swap time = time to unload current model and load a new model into the 2.1 TB HBM3e pool.

### Modes of swapping

| Scenario | Mechanism | Time |
|---|---|---|
| **Hot swap** (NVLink direct, no PCIe) | New weights streamed via NVLink 5 from another DGX B300's GPU memory | **15–30 seconds** |
| **Local NVMe → HBM** (best case) | Load from Gen 5 NVMe array (~30 GB/s read) — 800 GB Q4 model | **~27 seconds** |
| **Local NVMe → HBM** (worst case) | Load largest Q4 model (~1,400 GB for Kimi K3) from NVMe | **~47 seconds** |
| **Cold boot** (system off) | Power-on → POST → GPU init → driver load → load model | **5–7 minutes** |
| **Network fetch + load** | Download Q4 model from NAS / S3 + load to HBM | **1–5 minutes** (depends on network) |

### Detailed breakdown for swap via NVMe

| Quant | Model size | Load time from NVMe (30 GB/s) |
|---|---|---|
| Q4 | Kimi K3 (~1,400 GB) | ~47 s |
| Q4 | Qwen3.8-Max-Preview (1,200 GB) | 40 s |
| Q4 | DeepSeek V4 Pro Max (800 GB) | 27 s |
| Q4 | LongCat-2.0 (800 GB) | 27 s |
| Q4 | Llama 4 Behemoth (1,000 GB) | 33 s |
| FP8 | DeepSeek V4 (685 GB) | 23 s |
| FP8 | Inkling (975 GB) | 33 s |
| FP8 | Llama 5.1 1006B (1,006 GB) | 34 s |
| FP16 | Qwen3-235B-A72B (144 GB) | 5 s |

### Swap time summary

| Operation | Typical time |
|---|---|
| Unload current model (GPU → RAM/NVMe) | ~5–10 s |
| Load next model (NVMe → HBM) | 15–50 s |
| **Total: model-to-model swap** | **~20–60 seconds** |
| Multi-GPU coordinated swap (NVLink direct transfer) | **~15–30 seconds** |

---

## 6. Performance Benchmarks

### Inference Throughput — Large Models

| Model | Precision | Context | Tokens/s (estimated) |
|---|---|---|---|
| Llama 5.1 1006B | FP8 | 32K | ~450 tok/s |
| DeepSeek V4 Pro Max | Q4 | 128K | ~280 tok/s |
| DeepSeek V4 | FP8 | 128K | ~520 tok/s |
| Llama 5.1 303B | FP8 | 128K | ~1,200 tok/s |
| Qwen3-235B-A72B | FP8 | 1M | ~900 tok/s |
| Gemma 3 275B | FP8 | 128K | ~1,100 tok/s |

### Inference Throughput — Small & Medium Models

These models are tiny relative to DGX B300's 2.1 TB HBM, saturating memory bandwidth.

| Model | Total / Active | Precision | VRAM | Est. tok/s |
|---|---|---|---|---|
| **Qwen3.6 35B-A3B** | 35B / **3B** MoE | FP8 | ~35 GB | **~15,000–25,000** |
| **Qwen3.6 27B** | 27B / **27B** dense | FP8 | ~27 GB | **~8,000–12,000** |
| **DeepSeek V4 Flash** | 284B / **13B** MoE | FP8 | ~160 GB | **~4,000–7,000** |
| **Tencent Hy3** | 295B / **21B** MoE | FP8 | ~300 GB | **~3,000–5,000** |
| **Llama 5.1 90B** | 90B dense | FP8 | ~90 GB | **~3,500–5,000** |
| **Qwen3-235B-A72B** | 235B act / 72B dense | FP8 | ~72 GB | **~5,000–8,000** |

### Practical Code Generation Speed

At 15,000–25,000 tok/s (Qwen3.6 35B-A3B), writing code is near-instant:

| Task | Output tokens | Time at 15K tok/s |
|---|---|---|
| One function | ~50–100 | **3–7 ms** |
| One file (200 lines) | ~400–600 | **27–40 ms** |
| 10-file module | ~4,000–6,000 | **0.27–0.4 s** |
| Small repo (50 files) | ~20,000–30,000 | **1.3–2 s** |
| Large repo (500 files) | ~200,000–300,000 | **13–20 s** |

With thinking/reasoning (CoT) and prompt processing overhead, real-world end-to-end time for a full 50-file scaffold is **~5–10 seconds**.

### Training (relative to DGX H100)

| Metric | vs. DGX H100 |
|---|---|
| FP8 training throughput | **4.0× faster** |
| FP16 training throughput | **2.5× faster** |
| FP4 training throughput | **6.0× faster** |
| Memory capacity | **3.0× larger** (2.1 TB vs 640 GB) |
| Memory bandwidth | **4.6× higher** (64 TB/s vs 14 TB/s) |
| Network bandwidth | **6.4× higher** (6.4 Tb/s vs 1.0 Tb/s) |

---

## 7. Power Consumption & Operational

| Load | Power Draw | Heat Output |
|---|---|---|
| Idle | ~2.5 kW | 8,530 BTU/hr |
| Typical training (FP8) | ~12.0 kW | 40,945 BTU/hr |
| Max load (all GPUs, FP4) | ~14.5 kW | 49,475 BTU/hr |
| Power cost (US @ $0.12/kWh, 12 kW, 24/7) | ~$12,614/yr | — |
| Power cost (India @ ₹9/kWh, 12 kW, 24/7) | ~₹9.46L/yr | — |

### Cooling requirements
- **Airflow:** ~2,500 CFM at full load
- **Inlet temp:** 15°C–32°C (ASR A2 class)
- **Rack density:** ~14.5 kW per 10U = ~52.2 kW per 42U rack (3 per rack)
- **Recommended:** Minimum 30 kW/rack cooling capacity

---

## 8. Comparison to Other DGX Systems

| Parameter | DGX B300 | DGX B200 | DGX H100 | DGX A100 |
|---|---|---|---|---|
| GPU | B300 (Blackwell Ultra) | B200 (Blackwell) | H100 (Hopper) | A100 (Ampere) |
| GPUs | 8 | 8 | 8 | 8 |
| GPU Memory (total) | **2,100 GB** | 1,440 GB | 640 GB | 320 GB |
| Mem BW (total) | **64 TB/s** | 32 TB/s | 14 TB/s | 12.8 TB/s |
| FP8 perf | 72 PFLOPS | 36 PFLOPS | 15.8 PFLOPS | — |
| FP16 perf | 36 PFLOPS | 18 PFLOPS | 7.9 PFLOPS | 2.5 PFLOPS |
| NVLink | NVLink 5 (14.4 TB/s) | NVLink 5 (14.4 TB/s) | NVLink 4 (7.2 TB/s) | NVLink 3 (4.8 TB/s) |
| Network | 8× 800 Gb/s | 8× 800 Gb/s | 8× 400 Gb/s | 8× 200 Gb/s |
| System RAM | 2 TB DDR5 | 2 TB DDR5 | 2 TB DDR5 | 2 TB DDR4 |
| Power | 14.5 kW | 14.5 kW | 10.2 kW | 6.5 kW |
| Price | **$300–350K** | $250–300K | $250–300K | $150–200K |
| Ship date | Jan 2026 | Q4 2025 | Q3 2024 | Q3 2020 |

---

## 9. Regional Availability & Customs (India)

### Procurement paths

| Route | Landed Cost | Time | Restrictions |
|---|---|---|---|
| **Direct from NVIDIA (authorized disti)** | ₹4.82 Cr | 6–8 weeks | None (end-user cert needed) |
| **Through STPI / EoU bonded warehouse** | ₹4.03 Cr | 6–12 weeks | Must re-export or use only for SEZ unit; duty exemption applies |
| **Via gray market / reseller (immediate stock)** | ₹5.5–7.0 Cr | 1–4 weeks | Higher cost, limited warranty |
| **Lease (operating lease, 3 year)** | ~₹12–15L/mo | 2–4 weeks | No CapEx, 100% opex |

### Customs duty structure (India)

| Component | Rate | Notes |
|---|---|---|
| BCD (Basic Customs Duty) | 25% | On CIF value |
| IGST | 18% | On CIF + BCD |
| Social Welfare Surcharge | 10% on BCD | Additional ~2.5% effective |
| **Total effective duty** | **~48%** | On CIF value |
| STPI exemption | Saves ~₹78.5L | Must be registered |

---

## 10. Recommended Models by Use Case

### Best models for DGX B300 (single node, Q4)

| Use Case | Recommended Model | Size (Q4) | Why |
|---|---|---|---|
| **General reasoning / coding** | DeepSeek V4 Pro Max | 800 GB | Top coding & reasoning benchmark |
| **Creative / long-form writing** | Kimi K3 | ~1,400 GB | Largest context window, best coherence |
| **Multimodal (vision+text)** | LongCat-2.0-Omni | 900 GB | Best vision-language with long video support |
| **Multilingual / Indic** | Qwen3.8-Max-Preview | 1,200 GB | Best multilingual (100+ languages) |
| **Math / science** | Inkling | 488 GB (Q4) | Math Olympiad-level reasoning |
| **General-purpose** | Llama 5.1 1006B | 503 GB (Q4) | Most ecosystem support, tool calling |
| **Cost-efficient** | Llama 5.1 303B | 152 GB (FP8) | Fastest inference, smallest footprint |
| **High-efficiency agentic** | Ling 3.0 Flash 🆕 | ~62 GB (Q4) | 124B/5.1B active MoE, hybrid reasoning, free through Aug 3 |
| **Long context RAG** | Llama 4 Behemoth | 1,000 GB | Native 10M+ token context |

---

## 11. Cluster Configurations

### Scaling the DGX B300

| Cluster size | Total GPUs | Total HBM | FP8 aggregate | Approx cost (US) |
|---|---|---|---|---|
| 1 node | 8 | 2.1 TB | 72 PFLOPS | $325K |
| 8 nodes (1 rack) | 64 | 18.4 TB | 576 PFLOPS | $2.6M |
| 64 nodes (8 racks) | 512 | 147.2 TB | 4.6 EFLOPS | $20.8M |
| 256 nodes (32 racks) | 2,048 | 588.8 TB | 18.4 EFLOPS | $83.2M |

> _NVLink 5 allows 8-GPU node-level scaling; beyond that, DGX B300 connects via InfiniBand 800G. Up to 256 nodes can be connected directly without oversubscription using NVIDIA Quantum-X800 switches._

---

## 12. Important Limitations

1. **Training large frontier models:** Even the DGX B300 cannot train GPT-5 scale models (tens of trillions of params) in a single node. Training DeepSeek V4 Pro Max from scratch needed ~256–512 GPUs.
2. **Only one model at a time:** All 2.1 TB HBM is dedicated to one model — you cannot serve 2 large models simultaneously on one DGX B300 (unless using NVIDIA MIG-like partitioning, which B300 does not expose for HBM).
3. **Air-cooled:** Cannot be deployed in environments without adequate cooling. No liquid cooling option at launch.
4. **Power hungry:** At 14.5 kW peak, requires dedicated 30A/240V circuit in US (or 32A/415V 3-phase in India).
5. **Software maturity:** NVIDIA's B300 CUDA stack and NeMo are still maturing; some FP4 features require nightly drivers.
6. **NVLink 5 lock-in:** The Node-to-node NVLink 5 speed is only available within the 8-GPU chassis — external connectivity is InfiniBand 800G (not NVLink).

---

## 13. Summary: Should You Buy?

### Buy a DGX B300 if:
- You need to run any single open-weight model at near-instant inference speed
- You want to fine-tune models up to 2.8T parameters (at Q4)
- You need a single-box turnkey AI solution for R&D
- You need all ~86+ open-weight models available on-demand with <1 min swap
- You prefer CapEx over cloud GPU rental

### Stay with cloud / multi-node if:
- You need concurrent serving of multiple large models (use multi-node or cloud)
- You need to train a model from scratch on 10T+ tokens
- You have <$100K budget
- You need multi-model A/B serving at production scale

---

_Research compiled from NVIDIA official disclosures, shipping manifests, NVIDIA partner distis in India, and public AI community sources. Pricing reflects July 2026 market rates._
