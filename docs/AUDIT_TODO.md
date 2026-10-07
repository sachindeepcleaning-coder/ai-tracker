# AUDIT_TODO — items not verified or deliberately not changed

Generated during the Oct 2026 data-integrity audit (tasks 1–7). Rule applied
throughout: when a fact could not be verified against its cited source, the
cell was emptied with a note rather than guessed.

## Unverified values (cells emptied, see CSV Notes for row context)

- **Hy3 — LiveCodeBench V6.** Removed 34.86% as an outlier vs 78.0% SWE-V.
  True value unknown; needs an AA/BenchLM independent run.
- **GLM-5.1 — SWE-bench Verified.** Removed 77.8% as a likely copy of the
  GLM-5 row. Note: GLM-5's own 77.8% is kept but is still single-sourced
  (vendor) — it was not independently confirmed either.
- **DeepSeek R1 — prices.** Removed $0.28/$0.42 (exact V3.2 copy). Sibling
  row R1-0528 shows $0.55/$2.19, which suggests the right ballpark, but that
  is a different checkpoint — base-R1 pricing still needs a source check.
- **Ling-3.0-flash-Sante — free campaign.** "Free thru Oct 4" expired
  (today Oct 7). License cell updated to EXPIRED/pricing-TBD; actual current
  price unknown.

## Deliberately left alone

- **`frontend/src/lib/changelog.ts:723,891`** — historical changelog entries
  repeating "~200 tok/s" for Qwen27B. Left as contemporary log lines; the
  live UI claims (Tracker highlights, HardwareFit, hardware tiers) were all
  corrected to ~105 tok/s single-stream.
- **`single_user_india_local_ai.md` master-matrix aggregates** (300+,
  400+, batched/concurrent figures). Out of audit scope — only the flagged
  200 / 80-120 / 240-243 / fit claims were fixed or removed. The legend
  still says "single-user throughput", so remaining large figures should be
  re-checked as single-stream vs aggregate in a follow-up.
- **Pre-v4.3.2 AA scores** in historical README sections (e.g. Gemini 3.8
  Flash AA 59, Glimmer AA 35). Marked "pre-v4.3.2"; exact index versions
  unverified — do not quote without re-checking.
- **New-model license TBDs** (all low-confidence stubs): Ternary Bonsai 2
  27B, Schematron V2 pair, Hy-MT2 pair licenses; Ling 3.1 Flash (Oct 2) is
  proprietary API-only per lmmarketcap and was NOT added as open.
- **Qwen3.8-Max-0902 row** (proprietary Sep 2 API snapshot) vs open-weights
  Qwen3.8-Max row — coexistence kept; snapshot semantics unverified.

## Process notes

- `data_as_of` (2026-10-05) is derived as max `Last Verified` in the CSV —
  it moves automatically when rows are re-verified, by design.
- Legacy `gh-pages` branch still exists on origin; deploy uses GitHub
  Actions Pages mode, so it is safe to delete (not deleted — needs owner
  confirm).
- `LICENSE` (MIT) copyright holder set to the repo's GitHub username
  (`sachindeepcleaning-coder`). Say the word if a real name/entity
  should replace it.
- `scripts/readme-stats.mjs` open-weight regex counts licenses containing
  open-weight/MIT/Apache/OpenMDW/OpenRAIL/OSI while excluding
  Closed/Proprietary/Unknown prefixes — bespoke community licenses with
  MaaS carve-outs (Kimi K3, Qwen Community, MiniMax Community) count as
  open here, consistent with the site's license heuristic.
