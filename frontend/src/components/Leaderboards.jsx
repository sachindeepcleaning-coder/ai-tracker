import React from 'react'
import { Zap, Award, BarChart3, BrainCircuit } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { parsePct, scoreSource, fmtDate, fmtDateFull, DATA_AS_OF } from '../lib/parse'
import { licenseBadge } from '../lib/license'
import { BENCHMARKS } from '../hooks/useModels'

const ICONS = { zap: Zap, award: Award, chart: BarChart3, brain: BrainCircuit }

export default function Leaderboards({ leaderboards }) {
  return (
    <div className="space-y-4">
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
                        {m.released && <span className="ml-1.5 text-[10px] font-mono text-sky-300/80 align-middle">{fmtDate(m.released)}</span>}
                      </div>
                      <div className="text-xs text-white/50">{m.provider} · {licenseBadge(m.license).label}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-emerald-400 shrink-0">
                      {m[bench.key]}
                      {scoreSource(m[bench.key]) === 'vendor' && (
                        <span className="ml-1 align-middle text-[9px] font-sans font-semibold uppercase tracking-wide text-amber-400/80" title="Vendor-reported score (own harness) — not independently standardized">V</span>
                      )}
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
