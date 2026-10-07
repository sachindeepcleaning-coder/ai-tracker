# AUDIT_TODO — items not verified or deliberately not changed

Generated during the Oct 2026 data-integrity audit (tasks 1–7). Rule applied
throughout: when a fact could not be verified against its cited source, the
cell was emptied with a note rather than guessed.

## Third-round findings (Oct 7 follow-up tasks 1–8)

- **axe CI annotation (run #63):** the axe step DID run (axe-core 4.13.0,
  36 color-contrast hits on the then-live site) and `--exit` returned 1;
  continue-on-error kept the job green with the annotation. Fixed by testing
  the built page via vite preview + per-impact summary (verified exit 0
  locally). `--save` requires a RELATIVE path (absolute gets mangled).
- **CI deploy failure (run 37620860537):** drift gate used
  `../public/data.json` but the file is `frontend/public/data.json`
  (working-directory is frontend/). Fixed; deploy green since.
- **Oct 7 bump audit:** all 10 rows bumped to 2026-10-07 have recorded
  primary sources (Upstage pricing, platform.openai.com, blog.google,
  HF org repos); V4.1 Flash correctly NOT bumped (notes-only edit).
  data_as_of = 2026-10-07 = max Last Verified among sourced rows.
- **Task-5 recheck:** V4 Pro Max row has no matching HF repo
  (deepseek-ai/DeepSeek-V4-Pro exists instead — possible duplicate of rank
  192, naming decision open). Hy createdAt May 11 predates Aug release
  claims (repos predate announcements; releases untouched). K2-Horizon 2-day
  gap (Sep 1 created vs Sep 3 row). MiMo exact base name absent (official
  -RL/-MOPD variants corroborate MIT/params/date). Nemotron HF tag is
  generic "other" (OpenMDW-1.1 unconfirmed here). Spark $1.25/$4.25 has no
  Meta primary source.
- **gitleaks CI:** blocking step added post-checkout; .gitleaksignore holds
  the 2 fingerprints (CSP nonces in archived snapshot).
- **INR:** Opus 5.5 cell normalized (format only); `--recompute-inr` is a
  verified no-op on current data; test tolerance now 0.06.
- **Stale leftovers to watch:** single_user:446 fixed; `useModels.ts:38`
  and `Explorer.tsx:71` "279" comments are historical-context, left;
  parse.ts fallback throws (no silent default).

## Perf item-4 outcome (mobile TBT target <600ms MISSED)

- Baseline (local dist, 3-run median): perf 0.50, TBT 1410ms, LCP ~4.3s.
- After round 1 (content-visibility cards, 12-first pagination, loading
  placeholder, no eager recharts preload): perf 0.56, TBT 932ms, LCP ~4.3s.
- After round 2 (public/data.json runtime fetch + preload, main chunk
  488→220KB): perf 0.59, TBT 827ms, LCP ~4.7s (+350ms fetch cost).
  Offline still works via the sw.js same-origin runtime cache. GitHub Pages
  serves stock headers (no custom cache-control possible).
- Live (CDN, 3-run median after deploy): perf 0.72, TBT 1180ms, LCP ~2.3s,
  CLS 0.02, a11y 1.0. Sentry already lazy; lucide tree-shaken.
- Main chunk contents (vite-bundle-visualizer): react ~458KB + data.json
  ~314KB + app ~77KB + lucide ~10KB (raw attribution).
- Tried and REVERTED: (a) fetch without preload (+2.3s LCP for -124ms TBT); (b) manualChunks recharts
  vendor chunk — Vite emitted it as eager modulepreload (+428KB on first
  paint); (c) compact data.json — no bundle effect (esbuild minifies the
  inline JSON anyway); (d) removing backdrop-blur / card entrance animation
  — no measurable effect (compositor-only).
- Remaining path to <600ms: virtualize the model grid (TanStack
  react-virtual is already a dependency) so scrolled-out cards never enter
  the DOM. Requires restructuring Explorer + its DOM-count tests.

## Second-round findings (Oct 7 tasks 1–8)

- **DeepSeek V4.1 Flash params:** official card says 552B backbone, HF
  safetensors.total is 763.2B (all files). Row keeps 552B; notes cite both.
- **V4 Pro Max (rank 6) vs V4 Pro (rank 192):** same 1.6T/49B — possible
  duplicate rows. deepseek-ai/DeepSeek-V4-Pro exists (MIT); no
  "V4-Pro-Max" repo found. Needs a naming decision, not taken here.
- **Solar Pro 4 price:** Upstage list $0.30/$1.20 matches CSV; page shows
  dated promo windows ($0.09/$0.36 thru Oct 11). Row note now cites
  upstage.ai/pricing; revisit after Oct 11.
- **Schematron V2 Turbo/Small:** names exist nowhere on HF
  (inference-net has Schematron-3B/8B only). Rows kept, low confidence.
- **Ternary Bonsai 2 27B:** only community quant forks on HF, no base repo.
- **Hy-MT2 pair:** tencent repos carry Apache-2.0 tags — rows updated to
  Apache 2.0. Repo createdAt (May 11) predates the Aug release claim;
  release dates left untouched.
- **Muse Spark 1.3 price ($1.25/$4.25):** no Meta primary source found
  (no Muse weights repos on HF — consistent with closed API-only).
- **Nemotron 3 Ultra license:** HF tag is generic "other"; row keeps bare
  "Open weight" (geotoolbox reports OpenMDW-1.1, unverified here).
- **K2-Horizon-MoVA:** HF createdAt Sep 1 vs row "HF Sep 3" — 2-day gap
  between repo creation and announcement; left as-is.
- **MiMo-V2.6-Flash:** official org is XiaomiMiMo with -RL/-MOPD variant
  repos (MIT, 310.8B, Sep 21); exact base name not found.
- **Opus 5.5 output INR** is `"₹1,902.40"` (thousands separator + quotes)
  vs file convention `₹1902.40` — value correct, format deviant. Left
  untouched per no-value-change rule; `--recompute-inr` would normalize it.
- **Staleness test is deterministic** (compares against data_as_of, not the
  wall clock). Real-time check lives in weekly freshness.yml.
- **gitleaks:** 3 hits, all false-positive Meta CSP nonces in the archived
  meta_blog.html snapshot (initial commit). node_modules binaries dominate
  history blobs (19MB rolldown ×2, 16MB oxlint ×2); .git is 48M. No history
  rewrite performed.
- **Perf target missed:** mobile TBT 1410→827ms local median (1180 live),
  LCP +350ms. Next step is grid virtualization (TanStack already a dep).

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
