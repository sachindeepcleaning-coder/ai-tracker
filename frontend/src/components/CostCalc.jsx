import React, { useState } from 'react'
import { IndianRupee } from 'lucide-react'
import { allModels } from '../hooks/useModels'
import { INR_PER_USD } from '../lib/parse'

/**
 * Representative API plans. Prices (in/out $/M) resolve from data.json by MODEL
 * NAME (stable across CSV re-ranks; rank ids shift when rows are added/removed);
 * only the cache-read tier is a curated field (data.json stores it in prose).
 */
const COST_SAMPLES = [
  { model: 'DeepSeek V4.1 Flash', label: 'DeepSeek V4.1 Flash (off-peak)', cache: 0.003 },
  { model: 'DeepSeek V4.1 Flash', label: 'DeepSeek V4.1 Flash (peak)', in: 0.3, out: 1.2, cache: 0.006 },
  { model: 'GPT-5.6 Sol', label: 'GPT-5.6 Sol (promo)', cache: 0.4 },
  { model: 'Kimi K3', label: 'Kimi K3', cache: 0.3 },
  { model: 'GLM-5.3-Flash', label: 'GLM-5.3-Flash', cache: 0.03 },
  { model: 'Gemini 3.8 Flash', label: 'Gemini 3.8 Flash (intro)', cache: 0.075 },
  { model: 'Muse Spark 1.3', label: 'Muse Spark 1.3', cache: 0.15 },
  { model: 'Claude Fable 5.1', label: 'Fable 5.1', cache: 0.25 },
  { model: 'GPT-6 Astra', label: 'GPT-6 Astra', cache: 1.0 },
  { model: 'Qwen3.8-27B', label: 'Qwen3.8-27B (local-like)', cache: 0.02 },
]

// shared for tests — oxlint: CostCalc is the default component export; this helper is test-only
// eslint-disable-next-line react/only-export-components -- helper exported for vitest
function normalizeModelName(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '').trim()
}

// eslint-disable-next-line react/only-export-components -- helper exported for vitest
export function resolveSample(s, catalog = allModels) {
  // 1) exact
  let model = catalog.find((m) => m.model === s.model)
  // 2) exact by id (defensive: survives renames if caller passes {id})
  if (!model && s.id) model = catalog.find((m) => m.id === s.id)
  // 3) normalized (case/punctuation-insensitive) — handles "Claude Fable 5.1" vs "Fable 5.1", hyphens, etc.
  if (!model) {
    const want = normalizeModelName(s.model)
    model = catalog.find((m) => normalizeModelName(m.model) === want)
  }
  // 4) substring fallback — only if exactly one candidate (avoids "GPT-5" matching both GPT-5.6 Sol and GPT-5 Terra)
  if (!model) {
    const want = normalizeModelName(s.model)
    const candidates = catalog.filter(
      (m) => normalizeModelName(m.model).includes(want) || want.includes(normalizeModelName(m.model)),
    )
    if (candidates.length === 1) {
      model = candidates[0]
      console.info(`CostCalc: "${s.model}" resolved via fuzzy fallback -> "${model.model}" (verify pricing)`)
    }
  }
  if (!model) console.warn(`CostCalc: sample model "${s.model}" not found in catalog — prices fall back to 0`)
  return {
    name: s.label,
    in: s.in ?? model?.price_in_usd_per_mtok ?? 0,
    out: s.out ?? model?.price_out_usd_per_mtok ?? 0,
    cache: s.cache,
  }
}

export default function CostCalc() {
  const [tokPerDay, setTokPerDay] = useState(1_000_000_000)
  const [cacheHit, setCacheHit] = useState(70)
  const [outputPct, setOutputPct] = useState(1)
  // Any catalog model can be priced — picker resolves by name (4-tier match) at current sliders.
  const [picked, setPicked] = useState('')
  const pickOptions = allModels.filter((m) => m.price_in_usd_per_mtok != null).sort((a, b) => a.model.localeCompare(b.model))

  const dailyBudget = (() => {
    const input = tokPerDay * (1 - outputPct / 100)
    const output = tokPerDay * (outputPct / 100)
    const hit = input * cacheHit / 100
    const miss = input - hit
    // Representative models — Sep 10 online-verified per-token $/Mtok (off-peak where tiered)
    const rows = COST_SAMPLES.map((s) => {
      const r = resolveSample(s)
      const cost = (miss / 1e6) * r.in + (hit / 1e6) * r.cache + (output / 1e6) * r.out
      return { name: r.name, day: cost, mo: cost * 30, yr: cost * 365, in: r.in, out: r.out, cache: r.cache }
    })
    if (picked) {
      const pm = allModels.find((m) => m.model === picked)
      if (pm) {
        const cin = pm.price_in_usd_per_mtok ?? 0
        const cout = pm.price_out_usd_per_mtok ?? 0
        const cost = (miss / 1e6) * cin + (output / 1e6) * cout
        rows.push({ name: `${pm.model} (your pick)`, day: cost, mo: cost * 30, yr: cost * 365, in: cin, out: cout, cache: null })
      }
    }
    return rows
  })()

  const pickedRow = picked ? dailyBudget.find((r) => r.name.startsWith(picked)) : null

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 card p-4 space-y-4">
        <h2 className="font-bold flex items-center gap-2"><IndianRupee size={16} aria-hidden="true" /> Cost Calculator</h2>
        <p className="text-xs text-white/50">99% input / 1% output agentic loop. ₹95.12/USD `ai_coding_api_vs_local_summary.json:9`.</p>
        <div>
          <label htmlFor="modelPick" className="text-xs font-bold tracking-widest uppercase text-white/60">Price any catalog model</label>
          <select
            id="modelPick"
            value={picked}
            onChange={(e) => setPicked(e.target.value)}
            className="w-full mt-1 px-3 py-2.5 rounded-xl bg-[#131C2E] border border-white/10 text-sm text-[#E2E8F0] cursor-pointer focus:outline-none focus:border-emerald-500/50"
          >
            <option value="">— pick a model ({pickOptions.length} with pricing) —</option>
            {pickOptions.map((m) => (
              <option key={m.id} value={m.model}>{m.model} (${m.price_in_usd_per_mtok}/M in)</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tokensPerDay" className="text-xs font-bold tracking-widest uppercase text-white/60">Tokens / day (input+output)</label>
          <input id="tokensPerDay" type="range" min={100_000_000} max={5_000_000_000} step={100_000_000} value={tokPerDay} onChange={(e) => setTokPerDay(parseInt(e.target.value))} className="w-full accent-emerald-500" />
          <div className="flex justify-between text-xs font-mono"><span>{(tokPerDay / 1e9).toFixed(1)}B</span><span>{tokPerDay.toLocaleString()} tok</span></div>
        </div>
        <div>
          <label htmlFor="cacheHit" className="text-xs font-bold tracking-widest uppercase text-white/60">Cache hit % (prompt caching)</label>
          <input id="cacheHit" type="range" min={0} max={95} step={5} value={cacheHit} onChange={(e) => setCacheHit(parseInt(e.target.value))} className="w-full accent-violet-500" />
          <div className="text-xs font-mono">{cacheHit}% hit → {100 - cacheHit}% miss recompute</div>
        </div>
        <div>
          <label htmlFor="outputPct" className="text-xs font-bold tracking-widest uppercase text-white/60">Output % (default 1% for agentic 99/1)</label>
          <input id="outputPct" type="range" min={1} max={10} step={1} value={outputPct} onChange={(e) => setOutputPct(parseInt(e.target.value))} className="w-full accent-amber-500" />
          <div className="text-xs font-mono">{outputPct}% output / {100 - outputPct}% input</div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm">
          At {(tokPerDay / 1e9).toFixed(1)}B tok/day, API cache-hit input ~₹10-30/M vs miss ₹400-800/M `100k_concurrent_ai_coding_service.md:126` is where self-host wins.
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3">
        {pickedRow && (
          <div className="card p-4 ring-1 ring-violet-500/40">
            <div className="flex flex-wrap items-center gap-4">
              <div className="min-w-[180px]">
                <div className="font-bold text-sm text-violet-200">{pickedRow.name}</div>
                <div className="text-xs text-white/50">${pickedRow.in}/$ {pickedRow.out} per M (no cache tier assumed)</div>
              </div>
              <div className="flex gap-4 flex-1 justify-end text-center">
                <div><div className="text-xs text-white/50">Per day</div><div className="font-mono font-bold">₹{Math.round(pickedRow.day * INR_PER_USD).toLocaleString()}</div></div>
                <div><div className="text-xs text-white/50">Per 30d</div><div className="font-mono font-bold text-violet-300">₹{(pickedRow.mo * INR_PER_USD / 100000).toFixed(1)}L</div></div>
                <div><div className="text-xs text-white/50">Per yr</div><div className="font-mono font-bold text-violet-300">₹{(pickedRow.yr * INR_PER_USD / 10000000).toFixed(1)}Cr</div></div>
              </div>
            </div>
          </div>
        )}
        {dailyBudget.map((row) => (
          <div key={row.name} className="card p-4 flex flex-wrap items-center gap-4">
            <div className="min-w-[180px]">
              <div className="font-bold text-sm">{row.name}</div>
              <div className="text-xs text-white/50">${row.in}/$ {row.out} per M{row.cache != null ? ` · hit $ ${row.cache}/M` : ''}</div>
            </div>
            <div className="flex gap-4 flex-1 justify-end text-center">
              <div><div className="text-xs text-white/50">Per day</div><div className="font-mono font-bold">₹{Math.round(row.day * INR_PER_USD).toLocaleString()}</div></div>
              <div><div className="text-xs text-white/50">Per 30d</div><div className="font-mono font-bold text-emerald-400">₹{(row.mo * INR_PER_USD / 100000).toFixed(1)}L</div></div>
              <div><div className="text-xs text-white/50">Per yr</div><div className="font-mono font-bold">₹{(row.yr * INR_PER_USD / 10000000).toFixed(1)}Cr</div></div>
            </div>
          </div>
        ))}

        <div className="card p-4">
          <h3 className="font-bold text-sm">Local hardware (5-yr TCO) vs API — side by side</h3>
          {pickedRow && (
            <p className="text-xs text-white/60 mt-2" aria-live="polite">
              Your pick <b className="text-violet-200">{picked}</b>: API ₹{(pickedRow.yr * INR_PER_USD / 10000000).toFixed(1)}Cr/yr at current sliders → a ₹5L 1×5090 (if the model fits ≤32GB Q4) pays for itself in ~{Math.max(0.1, 5 / (pickedRow.yr * INR_PER_USD / 100000)).toFixed(1)} yr of API spend.
            </p>
          )}
          <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">1×5090 ₹5L</div><div className="text-xs text-white/50">Qwen27B 200tok/s. API breakeven ~1.2 yr at 1B/day uncached V4 Flash `ai_coding_api_vs_local_summary.json:183`</div></div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">4× Spark ₹24-30L</div><div className="text-xs text-white/50">GLM-5.3+V4.1 Flash+Qwen. Only sub-crore that runs all 3 `single_user_india_local_ai.md:333`</div></div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">12-rack Rubin ₹775Cr</div><div className="text-xs text-white/50">Top-10 models 100k concurrent, ₹2,450/mo break-even `100k_concurrent_ai_coding_service.md:105`</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
