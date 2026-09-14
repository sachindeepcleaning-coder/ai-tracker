#!/usr/bin/env python3
"""Release-date backfill for data.json (re-runnable, idempotent).

Provenance tiers (released_src):
  curated  — hand-set in data.json (incl. coarse "Sep 2026" -> mid-month ISO, est=true)
  name     — name-encoded dates ("...-0902" -> 2026-09-02), exact
  license  — dates ONLY when adjacent to "open weights" / "released"
             (broad prose dates catch pricing windows like "intro to Dec 31 2026"), exact
  family   — median of the brand's exact-dated siblings, est=true
  provider — median month of >=3 exact-dated same-provider models, est=true

Guards:
  - Never emits a date > month-end of DATA_AS_OF (future dates are nulls).
  - Median = sorted middle element (NOT ordinal averaging, which produces
    invalid days across month boundaries, e.g. "2026-10-66").
  - Idempotent: only 'family'/'provider' rows are recomputed each run;
    curated/name/license rows always survive.

Usage: python3 scripts/backfill-dates.py  (repo root; run before `npm run data`)
"""

import json
import re
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / 'frontend' / 'src' / 'data.json'
DATA_AS_OF = '2026-09-13'
MONTH_END = DATA_AS_OF[:8] + '30'  # tolerate within the as-of month (mid-month estimates)

MON = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
       'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}
NAME_PAT = re.compile(r'(?:^|[-\s])(0[1-9]|1[0-2])([0-3]\d)$')
# Narrow: only dates attached to release phrases. Broad prose dates are pricing windows.
LIC_PAT = re.compile(
    r'\b(?:open weights|released)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\b',
    re.I,
)
COARSE_PAT = re.compile(r'^([A-Z][a-z]{2})\s+(\d{4})$')
BRAND_PAT = re.compile(
    r'^(Qwen|GLM|GPT|Claude|Gemini|DeepSeek|Kimi|Grok|Llama|Nemotron|Gemma|MiniMax|Mistral|MiMo|Command|Phi)',
    re.I,
)


def brand(model):
    first = model.split(' ')[0]
    m = BRAND_PAT.match(first)
    return m.group(1).title() if m else first.split('-')[0]


def iso(y, mo, dy):
    try:
        y, mo, dy = int(y), int(mo), int(dy)
    except (TypeError, ValueError):
        return None
    if not (1 <= mo <= 12 and 1 <= dy <= 31):
        return None
    return f'{y}-{mo:02d}-{dy:02d}'


def median_date(dates):
    """Sorted middle element — earlier middle when even. Never ordinal-average."""
    s = sorted(dates)
    return s[len(s) // 2] if len(s) % 2 else s[len(s) // 2 - 1]


def median_month(dates):
    """Median month as mid-month ISO (for provider windows)."""
    months = sorted(d[:7] for d in dates)
    mid = months[len(months) // 2] if len(months) % 2 else months[len(months) // 2 - 1]
    return f'{mid}-15'


def set_date(m, value, src):
    m['released'] = value
    m['released_est'] = src in ('curated-coarse', 'family', 'provider')
    m['released_src'] = src


def main():
    d = json.loads(DATA.read_text(encoding='utf-8'))
    models = d['all_coding_models']

    # Pass 0: normalize + clean.
    for m in models:
        r = m.get('released')
        src = m.get('released_src') or ('curated' if r else None)
        m['released_src'] = src
        if not r:
            m['released'] = None
            m['released_est'] = False
            m['released_src'] = None
            continue
        if re.match(r'^\d{4}-\d{2}-\d{2}$', r):
            invalid = r > MONTH_END or int(r[5:7]) > 12 or int(r[8:10]) > 31
            if invalid:
                m['released'] = None
                m['released_est'] = False
                m['released_src'] = None
            continue
        # coarse "Sep 2026" -> estimated mid-month ISO (curated provenance survives)
        mm = COARSE_PAT.match(r)
        if mm and mm.group(1)[:3].title() in MON:
            mid = iso(mm.group(2), MON[mm.group(1)[:3].title()], 15)
            if mid and mid <= MONTH_END:
                set_date(m, mid, 'curated-coarse')
            else:
                m['released'] = None
                m['released_est'] = False
                m['released_src'] = None
        else:
            m['released'] = None
            m['released_est'] = False
            m['released_src'] = None

    # Pass 1: recompute inferred tiers from scratch (idempotent); curated/name/license survive.
    for m in models:
        if m.get('released_src') in ('family', 'provider'):
            m['released'] = None
            m['released_est'] = False
            m['released_src'] = None

    # Tier name: name-encoded dates.
    for m in models:
        if m.get('released') or m.get('released_src'):
            continue
        nm = NAME_PAT.search(m['model'])
        if nm:
            hit = iso(2026, nm.group(1), nm.group(2))
            if hit and hit <= MONTH_END:
                set_date(m, hit, 'name')

    # Tier license: dates attached to release phrases only.
    for m in models:
        if m.get('released') or m.get('released_src'):
            continue
        mm = LIC_PAT.search(str(m.get('license') or ''))
        if mm:
            hit = iso(2026, MON[mm.group(1)[:3].title()], mm.group(2))
            if hit and hit <= MONTH_END:
                set_date(m, hit, 'license')

    # Tier family: median of the brand's exact-dated siblings.
    fams = defaultdict(list)
    for m in models:
        if m.get('released') and not m.get('released_est'):
            fams[brand(m['model'])].append(m['released'])
    for m in models:
        if m.get('released') or m.get('released_src'):
            continue
        sibs = fams.get(brand(m['model'])) or []
        if sibs:
            mid = median_date(sibs)
            if mid <= MONTH_END:
                set_date(m, mid, 'family')

    # Tier provider: >=3 exact-dated models -> median month.
    provs = defaultdict(list)
    for m in models:
        if m.get('released') and not m.get('released_est'):
            provs[m['provider']].append(m['released'])
    for m in models:
        if m.get('released') or m.get('released_src'):
            continue
        sibs = provs.get(m['provider']) or []
        if len(sibs) >= 3:
            mid = median_month(sibs)
            if mid <= MONTH_END:
                set_date(m, mid, 'provider')

    d['data_regen_at'] = date.today().isoformat()
    for m in models:
        m.setdefault('released_est', False)
        if m.get('released') and not m.get('released_src'):
            m['released_src'] = 'curated'

    DATA.write_text(json.dumps(d, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

    dated = sum(1 for m in models if m.get('released'))
    est = sum(1 for m in models if m.get('released_est'))
    future = [m['model'] for m in models if m.get('released') and m['released'] > MONTH_END]
    print(f'coverage: {dated}/{len(models)} = {round(dated / len(models) * 100)}% (exact {dated - est}, est {est})')
    print(f'future dates: {len(future)} {future[:5]}')
    assert not future, 'future dates leaked past the guard'


if __name__ == '__main__':
    main()
