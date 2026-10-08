# AUDIT_TODO — items not verified or deliberately not changed

Generated during the Oct 2026 data-integrity audit (tasks 1–7). Rule applied
throughout: when a fact could not be verified against its cited source, the
cell was emptied with a note rather than guessed.

## Sixth-round findings (T4–T13 batch + CI hardening)

- **Fixture tests clobbered public/data.json (root-caused):** regen fixture
  tests spawned the full script with OUT_PATH pointed at tmp, but the script
  unconditionally wrote the real `frontend/public/data.json` — every
  `npm run test` silently reverted it to uncured rows. CI order (regen →
  gate → tests → build) kept the drift gate green while shipping stale data.
  Fixed via PUBLIC_OUT_PATH isolation + a regression test; the gate now also
  covers sw-version.js, sitemap.xml, fx.generated.ts.
- **axe gate flaked on the card fade-in (root-caused):** `card-rise`
  animated opacity 0→1 with staggered delays; slow CI runners audited cards
  mid-fade (35 then 33 serious contrast nodes, varying run to run) while
  fast local runs saw 0. Entrance is now translate-only (motion kept,
  contrast stable from frame one) with a CSS comment pinning the rule.
- **Open count unified 175→177:** README regex and site isOpenWeight
  disagreed both ways ('ungated' matched 'gated'; Apache rows with
  architecture notes marked closed). Single mirrored heuristic + sync test.
- **95.12 FX provenance:** honest label is "repo-standardized planning rate"
  (standardized Aug 14, 2026) — NOT claimed as an RBI quote. fx.json records
  refresh guidance (RBI/FBIL reference); all UI/README/meta render from it.
- **Known conservative-closed rows:** license cells with explicit TBD
  (ranks 192, 260, 294–296) stay closed by design; rank 192's TBD refers to
  another model (documented limitation, not changed).

## Fifth-round findings ("do all the work" pass)

- **Virtualization v2 ATTEMPTED AND REVERTED (again):** TanStack window
  virtualizer with lanes + spacer wrapper (keeps role=list style-free so
  the no-fixed-height-list gate passes literally). Result: desktop TBT
  133→310, mobile TBT 932→1170, LCP 4.3→5.3s — measurement churn exceeds
  DOM savings at 12 initial cards. Reverted with zero trace; all 65 tests
  green. Conclusion: sub-600ms needs SSR or a lighter framework, neither
  available on static Pages with this stack. Do not retry without a gate
  revision + a different windowing strategy (e.g. pagination-only growth).
- **V4 Pro Max naming:** api-docs.deepseek.com lists only deepseek-flash
  and deepseek-v4-pro. Row 6 flagged NAME UNCONFIRMED in Notes (likely
  duplicate of rank 192); merge/deletion left open — it would renumber
  ranks 7–299.
- **"279" remnants:** verified clean except the dated Sep-26 chat summary
  in README (legitimate historical snapshot, left).
- **Still needs a human:** LICENSE holder name (currently the GitHub
  username); temp-gh-pages worktree at /home/vegeta/Music/ai ( untouched
  per rules — switch it to master, prune, then delete the branch);
  Solar Pro 4 price revisit after Oct 11 (freshness workflow will flag).

## Fourth-round findings (follow-up tasks 1–8)

- **Task-1 perf follow-up:** lazy DetailModal (-10KB main), idle-init Sentry,
  confirmed lucide tree-shaken + recharts split. Live median after deploy:
  TBT 1347ms, LCP 2243ms, perf 0.71, a11y 1.0 (run1 TBT 2570 cold-CDN
  outlier). Remaining long tasks: app-boot render commit ~715ms @2.1s,
  catalog-driven grid mount ~494ms @1.5s, throttled script eval.
- **Virtualization ATTEMPTED AND REVERTED:** TanStack window virtualizer
  with lanes breaks the `Explorer.test` gate ("no fixed-height nested
  scroll pane") — the repo deliberately chose pagination over
  virtualization (see code comment). Per no-gate-loosening rule, reverted;
  DOM-count tests all green again. This is the remaining path to <600ms
  if the gate is ever intentionally revised.
- **V4 Pro Max (rank 6):** api-docs.deepseek.com lists only
  deepseek-flash and deepseek-v4-pro — "Pro Max" is not an official name.
  Row flagged in Notes; merge with rank 192 left open (identity change).
- **gitleaks in CI:** needs full-history checkout (fetch-depth: 0);
  shallow clones change fingerprints and break the ignores. Fixed.
- **Drift-gate path incident:** gate must use frontend-relative
  `public/data.json`, not `../public/data.json`. Fixed.

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
