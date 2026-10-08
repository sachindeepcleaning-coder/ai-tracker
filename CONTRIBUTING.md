# Contributing to ai-tracker

All catalog data lives in one file: **`coding_benchmarks.csv`** (repo root).
The site (`frontend/src/data.json`) is generated — never edit it by hand.

## Adding or fixing a model row

1. Edit `coding_benchmarks.csv` (29 data columns + `Slug`; keep every row at
   exactly 30 cells — `npm run data` fails otherwise).
2. New rows: fill `Slug` as lowercase `provider-model` (`[a-z0-9-]`, unique).
   The regen gate rejects bad/duplicate slugs.
3. `Last Verified` must be a real `YYYY-MM-DD` verification date.
4. Scores/prices: vendor-reported by default; mark independent results
   `(AA vX.Y / Scale / BenchLM)` in the cell. Never invent a number — leave
   the cell empty (`-`) with a note instead.
5. Promo/expiry claims (`through|thru|until|ended|expires … <date>`,
   `to <Month> <day>`, ISO dates): regen FAILS on unmarked past dates.
   Mark handled claims `EXPIRED`/`removed`, or fix the cell.
6. Run from `frontend/`: `npm run data && npm run lint && npm run typecheck && npm run test && npm run build`. (`npm run data` always regenerates both `src/data.json` and the README stats block — there is no separate step to forget.)
   (CI also regenerates it, and the drift gate fails on mismatch).

## Licenses

- Code → MIT (`LICENSE`). Data compilation → CC BY 4.0 (`DATA_LICENSE.md`).
- Model weights keep their own licenses — record them in `License/Type`.

## Reporting a data problem

Open an issue with the **data correction template**
(`.github/ISSUE_TEMPLATE/data-correction.yml`): model slug, field, current
value, correct value + primary source URL (vendor docs/pricing page,
official Hugging Face card — no aggregators).
