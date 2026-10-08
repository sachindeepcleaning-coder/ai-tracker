#!/usr/bin/env python3
"""Generate frontend/public/og.png (1200x630 social preview).

Re-runnable: reads live counts from frontend/src/data.json + license
heuristic note from scripts (open count passed via --open). Run:
    python3 frontend/scripts/make-og.py
Requires Pillow + DejaVu (system fonts). Output is committed, not built.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FRONTEND = ROOT / 'frontend'
DATA = json.loads((FRONTEND / 'src' / 'data.json').read_text())
COUNT = DATA.get('model_count', len(DATA.get('all_coding_models', [])))
AS_OF = DATA.get('data_as_of', '')

W, H = 1200, 630
BG = (11, 17, 32)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
EMERALD = (16, 185, 129)
VIOLET = (139, 92, 246)

FD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


img = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(img)

# Accent bar (emerald -> violet gradient approximation).
for x in range(W):
    t = x / W
    d.line([(x, 0), (x, 10)], fill=(
        round(EMERALD[0] + (VIOLET[0] - EMERALD[0]) * t),
        round(EMERALD[1] + (VIOLET[1] - EMERALD[1]) * t),
        round(EMERALD[2] + (VIOLET[2] - EMERALD[2]) * t),
    ))

# "AI" badge.
d.rounded_rectangle([70, 90, 170, 190], radius=22, fill=EMERALD)
badge = font(FD, 56)
d.text((120, 140), 'AI', font=badge, fill=WHITE, anchor='mm')

title = font(FD, 72)
d.text((205, 100), 'Local AI Coding Models', font=title, fill=WHITE)
sub = font(FD, 72)
d.text((205, 185), 'India Tracker', font=sub, fill=VIOLET)

stats = font(FR, 40)
d.text((72, 330), f'{COUNT} models (CSV ranks 1-{COUNT}) - benchmarks, VRAM/Q4, pricing', font=stats, fill=WHITE)
foot = font(FR, 34)
d.text((72, 400), 'Open-weight coding models for local/private deployment in India.', font=foot, fill=MUTED)
d.text((72, 452), f'Fact-checked {AS_OF} - planning estimates, not vendor quotes.', font=foot, fill=MUTED)

d.text((72, 560), 'sachindeepcleaning-coder.github.io/ai-tracker', font=font(FR, 30), fill=MUTED)

out = FRONTEND / 'public' / 'og.png'
img.save(out, optimize=True)
print(f'og.png: {out} ({out.stat().st_size} bytes)')
