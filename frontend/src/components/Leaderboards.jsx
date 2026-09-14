import React, { useState } from 'react'
import { Zap, Award, BarChart3, BrainCircuit, ScatterChart as ScatterIcon } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter as ScatterPoints, Cell } from 'recharts'
import { parsePct, parseQ4, scoreSource, fmtDate, fmtDateFull, DATA_AS_OF } from '../lib/parse'
import { licenseBadge, isOpenWeight } from '../lib/license'
import { BENCHMARKS, allModels } from '../hooks/useModels'

const ICONS = { zap: Zap, award: Award, chart: BarChart3, brain: BrainCircuit }

/** Analytics scatter: performance vs Q4 VRAM or vs input price, open vs closed. */
const SCATTER_METRICS = [
  { id: 'vram', label: 'SWE-V vs Q4 VRAM', y: (m) => parsePct(m.swe_bench_verified), x: (m) => parseQ4(m.full_q4_vram_gb), xLabel: 'Q4 GB' },
  { id: 'price', label: 'SWE-V vs input price', y: (m) => parsePct(m.swe_bench_verified), x: (m) => m.price_in_usd_per_mtok, xLabel: '$ in / Mtok' },
]

export default function Leaderboards({ leaderboards }) {
  const [scatterId, setScatterId] = useState('vram')
  const metric = SCATTER_METRICS.find((s) => s.id === scatterId) || SCATTER_METRICS[0]
  const scatterData = allModels
    .map((m) => ({ name: m.model, x: metric.x(m), y: metric.y(m), open: isOpenWeight(m.license) }))
    .filter((p) => p.x != null && p.y != null)

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold flex items-center gap-2"><ScatterIcon size={16} className="text-violet-400" aria-hidden="true" /> Value frontier (analytics)</h3>
          <div className="ml-auto flex gap-1">
            {SCATTER_METRICS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScatterId(s.id)}
                aria-pressed={scatterId === s.id}
                className={`text-xs px-2.5 py-1 rounded-full border ${scatterId === s.id ? 'bg-violet-500/20 border-violet-500/40 text-violet-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/50 mt-1">{scatterData.length} models with both metrics · green = open-weight · violet = closed/API · Pareto-friendly: up-left is better.</p>
        <div className="mt-3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" dataKey="x" name={metric.xLabel} tick={{ fontSize: 10, fill: '#94A3B8' }} domain={[0, 'auto']} />
              <YAxis type="number" dataKey="y" name="SWE-V %" tick={{ fontSize: 10, fill: '#94A3B8' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#131C2E', border: '1px solid rgba(255,255,255,0.1)' }} cursor={{ strokeDasharray: '3 3' }} />
              <ScatterPoints data={scatterData} fill="#10B981">
                {scatterData.map((p) => <Cell key={p.name} fill={p.open ? '#10B981' : '#8B5CF6'} />)}
              </ScatterPoints>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {BENCHMARKS.map((bench) => {
          const Icon = ICONS[bench.icon] || BarChart3
          const data = leaderboards[bench.key] || []
          return (
            <div key={bench.key} className="card p-4">
              <h3 className="font-bold flex items-center gap-2"><Icon size={16} className="text-emerald-400" aria-hidden="true" />{bench.title}</h3>
              <p className="text-xs text-white/50 mb-3">{data.length} scored models · scroll for all · release dates shown where known (as-of {fmtDateFull(DATA_AS_OF)}).</p>
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1" aria-label={`${bench.title} rankings`} tabIndex={0}>
                {data.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                    <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-black shrink-0 ${i < 3 ? 'bg-amber-500 text-black' : 'bg-white/10 text-white/70'}`} aria-hidden="true">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold truncate">
                        {m.model}
                        {m.released && <span className="ml-1.5 text-[10px] font-mono text-sky-300/80 align-middle" title={m.released_est ? 'Approximate release (inferred from family/provider window)' : 'Released'}>{m.released_est ? '≈' : ''}{fmtDate(m.released)}</span>}
                      </div>
                      <div className="text-xs text-white/50">{m.provider} · {licenseBadge(m.license).label}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-emerald-400 shrink-0">
                      {m[bench.key]}
                      {scoreSource(m[bench.key]) === 'vendor' ? (
                        <span className="ml-1 align-middle text-[9px] font-sans font-semibold uppercase tracking-wide text-amber-400/80" title="Vendor-reported score (own harness) — not independently standardized">V</span>
                      ) : scoreSource(m[bench.key]) ? (
                        <span className="ml-1 align-middle text-[9px] font-sans font-semibold uppercase tracking-wide text-sky-300/90" title={`Independently standardized (${scoreSource(m[bench.key]).toUpperCase()}) — apples-to-apples`}>i</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-[220px]">
                <p className="text-[11px] text-white/40 mb-1">Top 12 shown in chart · full list above.</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.slice(0, 12).map((m) => ({ name: m.model.split(' ').slice(0, 2).join(' '), v: parsePct(m[bench.key]) || 0 }))} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                    <Tooltip contentStyle={{ background: '#131C2E', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="v" fill="#10B981" radius={[0, 8, 8, 0]} barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        })}
      </div>
      <div className="card p-4">
        <h3 className="font-bold">Note: harness matters</h3>
        <p className="text-sm text-white/60 mt-1">TB 2.1 tight 88.3≈88.2≈87.9 (K3≈GLM-5.3≈V4 Pro), DeepSWE 67.5&gt;66.9&gt;64.3, LCB 91.9 Flash-Next &gt;90.3 27B. Scale standardized (identical mini-SWE-agent): best open 38.7% vs proprietary 59.1% — vendor +10-20 pts inflation. Use standardized for apples-to-apples.</p>
      </div>
    </div>
  )
}
