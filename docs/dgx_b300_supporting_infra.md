# DGX B300 — Supporting Infrastructure & Total Cost Breakdown

> Everything you need beyond the DGX B300 itself to have a fully operational AI inference/fine-tuning setup. All costs in INR (India) and USD.

---

## 1. Single-Node Setup (Minimal Viable)

This is the minimum to get a single DGX B300 running in a colo or on-prem DC.

### 1.1 Rack & Power

| Item | Details | Cost (USD) | Cost (INR) |
|---|---|---|---|
| **42U Server Rack** | APC / Rittal, 1000mm depth, side panels, doors | $2,500 | ₹2,37,800 |
| **PDU (Power Distribution)** | 2× 30A 3-phase PDU (for 14.5 kW headroom) | $1,800 | ₹1,71,216 |
| **ATS / Transfer Switch** | Optional, for dual-feed power redundancy | $1,200 | ₹1,14,144 |
| **Battery Backup (UPS)** | 15 kVA online UPS (10 min runtime) — e.g. APC Smart-UPS | $6,000 | ₹5,70,720 |
| **Cabling** | C13/C19 power cables, Cat6 management, fiber (if needed) | $500 | ₹47,560 |
| **Subtotal** | | **$12,000** | **₹11,41,440** |

### 1.2 Networking

| Item | Details | Cost (USD) | Cost (INR) |
|---|---|---|---|
| **Management Switch** | 24-port Gigabit managed switch (e.g. Cisco CBS250) | $400 | ₹38,048 |
| **DAC / Fiber cables** | Management + OOB connections | $200 | ₹19,024 |
| **Optional: GPU cluster switch** | Only needed if adding >1 node (see multi-node) | — | — |
| **Subtotal** | | **$600** | **₹57,072** |

### 1.3 Storage (External)

| Item | Details | Cost (USD) | Cost (INR) |
|---|---|---|---|
| **NAS for model storage** | Synology RS2423RP+ 12-bay (12× 20TB HDD) = 240 TB raw | $4,500 | ₹4,28,040 |
| **NVMe cache for NAS** | 2× 7.68TB NVMe U.2 for read cache | $2,000 | ₹1,90,240 |
| **10GbE NIC for NAS** | 2-port 10GbE (if not built-in) | $300 | ₹28,536 |
| **DAS backup** | USB-C / Thunderbolt external 40TB HDD for offline backup | $800 | ₹76,096 |
| **Subtotal** | | **$7,600** | **₹7,22,912** |

### 1.4 Software

| Item | Details | Cost (USD) | Cost (INR) |
|---|---|---|---|
| **OS** | Ubuntu 24.04 LTS (free) or RHEL (subscription) | $0 / $800/yr | ₹0 / ₹76,096/yr |
| **NVIDIA AI Enterprise** | Required for enterprise support + NeMo + Triton — **per GPU/yr** | $1,500/GPU/yr | ₹1,42,680/GPU/yr |
| | **_Total for 8 GPUs, 1 year_** | **$12,000/yr** | **₹11,41,440/yr** |
| **Container runtime** | Docker CE (free) or Mirantis (paid) | $0 | ₹0 |
| **NVIDIA Container Toolkit** | nvidia-docker2, free | $0 | ₹0 |
| **Job scheduling (optional)** | Slurm / OpenPBS (free); Altair PBS Pro (paid) | $0 / $5,000/yr | ₹0 / ₹4,75,600/yr |
| **Monitoring** | Prometheus + Grafana (free); Datadog (paid ~$200/mo) | $0 / $2,400/yr | ₹0 / ₹2,28,288/yr |
| **Cluster mgmt (optional)** | Kubernetes (free); Run:AI / DDN (paid) | $0 | ₹0 |
| **Backup software** | rsync / restic (free); Veeam (paid) | $0 / $1,500/yr | ₹0 / ₹1,42,680/yr |
| **Security / VPN** | Tailscale / WireGuard (free up to 100 users) | $0 | ₹0 |
| **Subtotal (year 1, with NVIDIA AI Ent.)** | | **$12,000/yr** | **₹11,41,440/yr** |
| **Subtotal (year 1, free tier OS/tools)** | | **$0** | **₹0** |

### 1.5 Facilities (Colocation)

| Item | Monthly Cost (US) | Monthly Cost (INR) |
|---|---|---|
| 1/4 rack (10U system + 10U support gear = ~20U) | $600–$1,200 | ₹50,000–₹1,00,000 |
| Power (14.5 kW avg 12 kW) @ $0.12/kWh | $1,051.20/mo | ₹78,840/mo |
| Cross-connects / IP transit (1 Gbps) | $200/mo | ₹16,500/mo |
| Remote hands (per incident) | $100/hr | ₹8,000/hr |
| **Total colo (monthly)** | **~$1,856–$2,456/mo** | **₹1,52,900–₹2,02,900/mo** |
| **Total colo (annual)** | **~$22,272–$29,472/yr** | **₹18,34,800–₹24,34,800/yr** |

### 1.6 Staffing

| Role | Monthly (US) | Monthly (INR) |
|---|---|---|
| Systems Admin (part-time, 0.5 FTE) | $4,000/mo | ₹75,000/mo |
| AI Engineer (part-time, 0.25 FTE) | $3,750/mo | ₹60,000/mo |
| **Total staff (annual)** | **$93,000/yr** | **₹16,20,000/yr** |

### 1.7 Totals — Single Node, Year 1

| Category | Cost (USD) | Cost (INR) |
|---|---|---|
| **DGX B300 system (CIF + customs)** | $325,000 (FOB) | ₹4,81,56,350 |
| **Rack + PDU + UPS** | $12,000 | ₹11,41,440 |
| **Network (switch + cables)** | $600 | ₹57,072 |
| **Storage (NAS + drives)** | $7,600 | ₹7,22,912 |
| **NVIDIA AI Enterprise (yr 1)** | $12,000 | ₹11,41,440 |
| **Colocation (annual, India)** | — | ₹20,50,000 |
| **Power (12 kW avg, India)** | — | ₹9,46,000 |
| **Staff (annual, India)** | — | ₹16,20,000 |
| **Logistics / customs clearance** | — | ₹3,00,000 |
| **Software subscriptions** | — | ₹1,00,000 |
| **Total Year 1** | **~$591,000** | **₹5,62,35,214** |
| **Total Year 2+ (recurring, excl. hardware)** | **~$80,000/yr** | **₹76,33,440/yr** |

---

## 2. Multi-Node Cluster (8-Node / 64-GPU)

Adding 7 more DGX B300 nodes scales inference + enables training.

### 2.1 Additional Hardware (beyond 1-node above)

| Item | Per Node | ×7 | Cost (USD) | Cost (INR) |
|---|---|---|---|---|
| DGX B300 | $325,000 | $2,275,000 | $2,275,000 | ₹21,63,98,000 |
| **Infiniband Switch** | **Shared** | **2×** | | |
| NVIDIA QM9800 (800Gb/s, 64-port) | $180,000 | 2 units | $360,000 | ₹3,42,43,200 |
| InfiniBand cables (OSFP, 800G) | $1,500 | 64 cables | $96,000 | ₹91,31,520 |
| **L3 ethernet switch** | $15,000 | 2 | $30,000 | ₹28,53,600 |
| **Management switch** | $400 | 2 | $800 | ₹76,096 |
| **Additional rack (42U)** | $2,500 | 2 | $5,000 | ₹4,75,600 |
| **Additional PDU** | $1,800 | 2 | $3,600 | ₹3,42,432 |
| **UPS (larger, 60 kVA)** | $18,000 | 1 | $18,000 | ₹17,12,160 |
| **Shared NAS (enterprise)** | — | — | $25,000 | ₹23,78,000 |
| **Subtotal multi-node add** | | | **$2,813,400** | **₹26,76,10,608** |

### 2.2 Software — Multi-Node

| Item | Annual Cost (USD) | Annual Cost (INR) |
|---|---|---|
| NVIDIA AI Enterprise (64 GPUs) | $96,000/yr | ₹91,31,520/yr |
| Slurm / Kubernetes (free) | $0 | ₹0 |
| Cluster monitoring (Grafana Cloud) | $12,000/yr | ₹11,41,440/yr |
| Shared filesystem (Lustre / GPFS) | $25,000/yr | ₹23,78,000/yr |
| **Subtotal** | **$133,000/yr** | **₹1,26,50,960/yr** |

### 2.3 Colo — Multi-Node (8 nodes = ~80U + networking = ~95U = 3 racks)

| Item | Monthly | Annual |
|---|---|---|
| 3 racks @ $2,000/rack/mo | $6,000/mo | $72,000/yr |
| Power (96 kW avg) @ $0.12/kWh | $8,294/mo | $99,530/yr |
| IP transit (10 Gbps commit) | $1,000/mo | $12,000/yr |
| **Total colo** | **$15,294/mo** | **$183,530/yr** |

### 2.4 Staff — Multi-Node

| Role | FTE | Monthly (US) | Monthly (INR) |
|---|---|---|---|
| SysAdmin | 2.0 FTE | $16,000 | ₹3,00,000 |
| AI Engineer | 1.0 FTE | $15,000 | ₹2,40,000 |
| Network Engineer | 0.5 FTE | $6,000 | ₹1,00,000 |
| **Total monthly staff** | 3.5 FTE | **$37,000** | **₹6,40,000** |
| **Annual staff** | | **$444,000** | **₹76,80,000** |

### 2.5 Totals — 8-Node Cluster (64 GPU), Year 1

| Category | Cost (USD) | Cost (INR) |
|---|---|---|
| 8× DGX B300 | $2,600,000 | ₹38,52,50,800 |
| InfiniBand fabric + cables | $456,000 | ₹4,33,74,720 |
| Network switches (L3 + mgmt) | $30,800 | ₹29,29,696 |
| Racks + PDUs + UPS | $26,600 | ₹25,30,192 |
| Shared storage (NAS) | $25,000 | ₹23,78,000 |
| Software (AI Enterprise + monitoring) | $133,000 | ₹1,26,50,960 |
| Colocation (12 months) | $183,530 | ₹1,74,57,374 |
| Staff (12 months) | $444,000 | ₹76,80,000 |
| Logistics / installation | $25,000 | ₹23,78,000 |
| **Total Year 1** | **≈ $3,923,930** | **≈ ₹47,66,29,742** |
| **Total Year 2+ (recurring)** | **≈ $760,530/yr** | **≈ ₹3,77,88,334/yr** |

---

## 3. Essential Software Dependencies (Detailed)

### 3.1 Mandatory Software

| Software | Purpose | Cost |
|---|---|---|
| **Ubuntu 24.04 LTS** | OS (recommended by NVIDIA) | Free |
| **NVIDIA Driver (R570+)** | B300 GPU driver | Free |
| **CUDA 13.3 Update 1** | GPU compute platform | Free |
| **NVIDIA Container Toolkit** | Docker GPU passthrough | Free |
| **Docker CE** | Container runtime | Free |
| **NVIDIA NeMo** | Framework for training/fine-tuning | Included with AI Enterprise |
| **NVIDIA Triton Inference Server** | Production inference serving | Included with AI Enterprise |
| **NVIDIA TensorRT-LLM** | LLM optimization & serving | Included with AI Enterprise |
| **NVIDIA NCCL** | Multi-GPU communication | Free |
| **Python 3.12+** | Runtime for ML frameworks | Free |
| **PyTorch 2.11+ (CUDA 13.x build)** | ML framework | Free |

### 3.2 Recommended Software (Free / Open Source)

| Software | Purpose |
|---|---|
| **vLLM** | LLM serving engine (high throughput) |
| **SGLang** | Fast structured LLM serving |
| **HF Transformers** | Model loading & inference |
| **HF Text Generation Inference** | Inference server |
| **Axolotl** | Fine-tuning framework |
| **Unsloth** | Optimized fine-tuning |
| **llama.cpp / Ollama** | Quick local inference / API |
| **Open WebUI** | ChatGPT-like UI for local models |
| **Weights & Biases (free tier)** | Experiment tracking |
| **MinIO** | S3-compatible object store for model weights |
| **Caddy / Nginx** | Reverse proxy / TLS termination |
| **Node Exporter + Prometheus** | Hardware metrics collection |
| **Grafana** | Dashboarding |
| **Loki** | Log aggregation |
| **Slurm** | Job scheduling (multi-node) |
| **Kubernetes (K3s / Vanilla)** | Container orchestration |

### 3.3 Paid Software (Optional)

| Software | Cost | Purpose |
|---|---|---|
| **NVIDIA AI Enterprise** | $12,000/yr (8 GPU) | Enterprise support, NeMo, Triton, TensorRT-LLM |
| **Run:AI / DDN** | ~$25,000/yr | GPU orchestration & pooling |
| **Red Hat Enterprise Linux** | $800/yr | If OS support contract required |
| **PBS Pro (Altair)** | ~$5,000/yr | Job scheduling (if not using Slurm) |
| **Lustre (Dell/DDN)** | ~$25,000/yr | Parallel filesystem for large clusters |
| **Veeam Backup** | ~$1,500/yr | Model checkpoint / data backup |

---

## 4. Storage Deep-Dive

### Model Weights Storage

| Model | Size FP16 | Size Q4 | # checkpoints to store |
|---|---|---|---|
| 10 representative models | — | ~800 GB avg × 10 | **8 TB** |
| All ~86+ open-weight models | — | ~400 GB avg × 86 | **~35 TB** |
| Keep 2 historical versions | — | — | ~50 TB |
| Training checkpoints (if fine-tuning) | — | — | +10–50 TB |
| **Recommended storage** | | | **≥100 TB usable** |

### Recommended Storage Options

| Option | Capacity | Speed | Cost (USD) | Cost (INR) |
|---|---|---|---|---|
| Single-node DAS (NVMe RAID) | 30 TB | 28 GB/s | $5,000 | ₹4,75,600 |
| NAS (10GbE, HDD-based) | 240 TB raw / 180 TB usable | 1.5 GB/s | $4,500 | ₹4,28,040 |
| Enterprise NAS (25GbE, SSD cache) | 240 TB | 10 GB/s | $15,000 | ₹14,26,800 |
| All-flash array (for multi-node training) | 120 TB | 50 GB/s | $120,000 | ₹1,14,14,400 |
| MinIO on DGX local NVMe (34.6 TB) | 34.6 TB | 30 GB/s | $0 (included) | ₹0 |

> **Note:** The DGX B300 already has 34.6 TB of local NVMe storage. For a single-node setup, this is often sufficient. External NAS only needed for shared access across nodes or long-term archival.

---

## 5. Network Deep-Dive

### 5.1 Single-Node Network Topology

```
Internet
   │
   ├── Router / Firewall
   │      │
   │      ├── Management Switch (1GbE)
   │      │      ├── DGX B300 BMC (iLO/IPMI)
   │      │      ├── DGX B300 management port
   │      │      └── NAS management
   │      │
   │      └── NAS (10GbE)
   │             └── DGX B300 data NIC (ConnectX-8, 800G) →
   │                 (or ConnectX-8 partitioned as 10GbE for storage)
   │
   └── DGX B300 (8× ConnectX-8 800G)
          ├── 1 port → external network (user access)
          └── 7 ports → future expansion / multi-node
```

### 5.2 Multi-Node Topology

```
┌──────────────────────────────────────┐
│          NVIDIA QM9800              │
│     InfiniBand 800G Switch #1       │  (64 ports)
│                                      │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│  │DGX1│ │DGX2│ │DGX3│ │DGX4│ │DGX5│ │DGX6│
│  └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘
│    1×800G each + 1×800G to switch #2
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│          NVIDIA QM9800              │
│     InfiniBand 800G Switch #2       │  (64 ports)
│                                      │
│  ┌───┐ ┌───┐
│  │DGX7│ │DGX8│
│  └───┘ └───┘
└──────────────────────────────────────┘
```

### 5.3 Network Cost Breakdown (8-Node)

| Component | Unit Price | Qty | Total (USD) |
|---|---|---|---|
| NVIDIA QM9800 64-port 800G IB | $180,000 | 2 | $360,000 |
| OSFP-800G passive copper DAC (3m) | $1,200 | 64 | $76,800 |
| OSFP-800G active optical (10m+) | $2,500 | 32 | $80,000 |
| L3 10GbE/25GbE switch (storage network) | $15,000 | 2 | $30,000 |
| Cat6A cables (management) | $25 | 48 | $1,200 |
| **Total networking** | | | **≈ $548,000** |

---

## 6. Comprehensive TCO Comparison

### All costs over 5 years — Single DGX B300

| Cost Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | **5-Year Total** |
|---|---|---|---|---|---|---|
| **DGX B300 (CIF + customs)** | ₹4,81,56,350 | — | — | — | — | **₹4,81,56,350** |
| **Rack + PDU + UPS** | ₹11,41,440 | — | — | — | — | **₹11,41,440** |
| **Network (switch + cables)** | ₹57,072 | — | — | — | — | **₹57,072** |
| **Storage (NAS + drives)** | ₹7,22,912 | — | — | — | — | **₹7,22,912** |
| **NVIDIA AI Enterprise** | ₹11,41,440 | ₹11,41,440 | ₹11,41,440 | ₹11,41,440 | ₹11,41,440 | **₹57,07,200** |
| **Colocation** | ₹20,50,000 | ₹21,00,000 | ₹21,50,000 | ₹22,00,000 | ₹22,50,000 | **₹1,07,50,000** |
| **Power (12kW avg)** | ₹9,46,000 | ₹9,74,000 | ₹10,03,000 | ₹10,33,000 | ₹10,64,000 | **₹50,20,000** |
| **Staff (sysadmin + AI eng)** | ₹16,20,000 | ₹16,68,000 | ₹17,18,000 | ₹17,69,000 | ₹18,22,000 | **₹85,97,000** |
| **Logistics / customs clearance** | ₹3,00,000 | — | — | — | — | **₹3,00,000** |
| **AMC / extended warranty** | — | ₹15,00,000 | ₹15,00,000 | ₹15,00,000 | ₹15,00,000 | **₹60,00,000** |
| **HDD/SSD replacement** | — | ₹1,50,000 | ₹1,50,000 | ₹1,50,000 | ₹3,00,000 | **₹7,50,000** |
| **Software subscriptions (W&B, etc.)** | ₹1,00,000 | ₹1,00,000 | ₹1,00,000 | ₹1,00,000 | ₹1,00,000 | **₹5,00,000** |
| **Total (INR)** | **₹5,62,35,214** | **₹76,33,440** | **₹77,62,440** | **₹78,93,440** | **₹81,77,440** | **≈ ₹8,77,01,974** |
| **Total (USD)** | ~$591,000 | ~$80,000 | ~$82,000 | ~$83,000 | ~$86,000 | **≈ $922,000** |

### Per-month operational cost (years 2-5): ~$7,200/mo (₹6.8L/mo)

### All costs over 5 years — 8-Node Cluster

| Category | **5-Year Total (USD)** | **5-Year Total (INR)** |
|---|---|---|
| 8× DGX B300 | $2,600,000 | ₹38,52,50,800 |
| InfiniBand fabric | $548,000 | ₹5,21,25,760 |
| Networking (L3 + mgmt) | $30,800 | ₹29,29,696 |
| Racks + PDUs + UPS | $26,600 | ₹25,30,192 |
| Storage (enterprise NAS) | $25,000 | ₹23,78,000 |
| NVIDIA AI Enterprise (64 GPUs × 5 yrs) | $480,000 | ₹4,56,57,600 |
| Colocation (5 yrs) | $917,650 | ₹8,72,86,868 |
| Power (96 kW, 5 yrs) | $497,650 | ₹4,73,36,468 |
| Staff (5 yrs) | $2,220,000 | ₹3,84,00,000 |
| Logistics / install | $25,000 | ₹23,78,000 |
| AMC (5 yr) | $100,000 | ₹95,12,000 |
| **Total** | **≈ $7,470,700** | **≈ ₹67,57,85,384** |
| **Avg per year (year 2-5)** | **≈ $1,217,675/yr** | **≈ ₹7,26,33,646/yr** |

---

## 7. Hidden / Often-Forgotten Costs

| Item | Approx cost | Why it's needed |
|---|---|---|
| **Fire suppression system** (in-rack) | $2,000–$5,000 | Insurance & safety compliance |
| **Environmental monitoring** (temp/humidity sensors) | $500–$1,000 | Early warning for cooling failure |
| **Static control** (ESD mats, wrist straps) | $300 | Hardware maintenance safety |
| **Spare NVMe drives** | $2,000 | Hot spares for RAID rebuild |
| **Spare PSU module** | $1,500 | 4 kW PSU redundancy |
| **Spare InfiniBand cable** | $1,500 | Fiber/DAC spare for quick replacement |
| **Cable management + overhead trays** | $500–$1,000 | Structured cabling |
| **DCIM software** (if >1 rack) | $2,000/yr | DC capacity & asset tracking |
| **VPN / Zero Trust appliance** | $500–$3,000/yr | Secure remote access |
| **Backup internet line** (4G failover) | $1,200/yr | Uptime SLA |
| **Certification / compliance** (ISO, SOC2) | $15,000–$50,000 | Only if selling AI services |
| **Insurance** (hardware + liability) | $5,000–$15,000/yr | Asset protection |

---

## 8. Monthly Operational Cost Summary

### Single DGX B300 — Monthly Burn

| Category | USD/mo | INR/mo |
|---|---|---|
| Colocation | $1,900 | ₹1,70,833 |
| Power (12 kW) | $1,051.20 | ₹78,840 |
| NVIDIA AI Enterprise | $1,000 | ₹95,120 |
| Staff | $5,000 | ₹1,35,000 |
| AMC (accrued) | $1,250 | ₹1,18,900 |
| Misc (spares, software, monitoring) | $500 | ₹47,560 |
| **Total monthly opex** | **~$10,701/mo** | **~₹6,46,253/mo** |

### 8-Node Cluster — Monthly Burn

| Category | USD/mo | INR/mo |
|---|---|---|
| Colocation (3 racks) | $6,000 | ₹5,70,720 |
| Power (96 kW) | $8,294 | ₹6,30,720 |
| NVIDIA AI Enterprise (64 GPUs) | $8,000 | ₹7,60,960 |
| Staff | $37,000 | ₹6,40,000 |
| AMC (accrued) | $10,000 | ₹9,51,200 |
| Misc (spares, software, monitoring) | $3,000 | ₹2,85,360 |
| **Total monthly opex** | **~$72,294/mo** | **~₹38,38,960/mo** |

---

## 9. Decision Matrix

| Are you... | Minimum needed | Year-1 cost (INR) | Year-1 cost (USD) |
|---|---|---|---|
| **A researcher** with existing DC access | DGX B300 + OS + free tools | ₹3.1 Cr | $327,000 |
| **A startup** colo'ing a single node | DGX + rack + colo + NAS + AI Enterprise + staff | ₹4.5 Cr | $477,000 |
| **A mid-size company** with 4-node cluster | 4× DGX + IB fabric + colo + staff | ₹20.0 Cr | $2.1M |
| **An enterprise** with 8-node cluster | 8× DGX + redundant IB + dedicated staff | ₹37.1 Cr | $3.9M |
| **A large lab** with 32-node cluster | 32× DGX + full networking + parallel FS + team | ₹152.2 Cr | $16M |

_Scenario INR ≈ USD × ₹95.12 (FOB basis). See §1.7 / §2.5 for landed, customs-inclusive totals._

---

## 10. Recommendations

### For a single-node setup at home / small lab:
- **Skip NVIDIA AI Enterprise.** Use vLLM + HF Transformers (free).
- **Skip colocation.** Run at home if you have 15 kW capacity + adequate cooling.
- **Skip NAS.** Use the built-in 34.6 TB NVMe.
- **Min cost:** DGX B300 ($325K) + power + no staff = **~$335K year 1**.
- **Ongoing:** ~$12K/yr in power.

### For serious lab / production:
- **Get AI Enterprise.** NeMo, Triton, TensorRT-LLM are worth it.
- **Get a dedicated NAS.** Shared model storage prevents GPU downtime.
- **Get colo with 25 kW/rack capacity.** Home may not handle 14.5 kW + heat.
- **Get 1 full-time sysadmin.** You will need someone for firmware updates, troubleshooting, container management.

### For multi-node:
- **Budget at least 25% above DGX cost** for networking + infrastructure.
- **Oversubscribe InfiniBand.** Use 2 switches for redundancy; a single QM9800 failure kills cluster.
- **Parallel filesystem is mandatory.** NFS will bottleneck 64 GPUs reading checkpoints.

---

_All pricing as of July 2026. INR/USD rate assumed at ₹95.12 (standardized Aug 14, 2026; previously 96.50). Actual costs vary by region, colo provider, and staffing availability in your location._
