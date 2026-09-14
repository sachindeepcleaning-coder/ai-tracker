import { Scale, Zap, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, Cell } from 'recharts'
import { parsePct, parseQ4, fmtDate } from '../lib/parse'

const COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#06B6D4']

export default function Compare({ compareModels, onBack, onClear }) {
  if (compareModels.length < 2) {
    return (
      <div className="card p-10 text-center">
        <Scale className="mx-auto text-white/30" aria-hidden="true" />
        <p className="mt-3 font-semibold">Select 2-4 models in Explorer to compare</p>
        <button onClick={onBack} className="mt-3 btn btn-primary" type="button">Go to Explorer</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">Comparison</h2>
        <button onClick={onBack} className="ml-auto btn btn-ghost text-xs" type="button">Back</button>
        <button onClick={onClear} className="btn btn-ghost text-xs" type="button">Clear</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2"><BarChart3 size={16} aria-hidden="true" /> SWE-Bench Verified</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareModels.map((m) => ({ name: m.model.split(' ')[0], v: parsePct(m.swe_bench_verified) || 0 }))}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ background: '#131C2E', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="v" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2"><Zap size={16} aria-hidden="true" /> Q4 VRAM vs Price (bubble)</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" dataKey="q4" name="Q4 GB" tick={{ fill: '#94A3B8' }} domain={[0, 'auto']} />
                <YAxis type="number" dataKey="price" name="$ in/M" tick={{ fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ background: '#131C2E', border: '1px solid rgba(255,255,255,0.1)' }} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={compareModels
                  .map((m) => ({ q4: parseQ4(m.full_q4_vram_gb), price: m.price_in_usd_per_mtok, name: m.model }))
                  .filter((p) => p.q4 != null && p.price != null)
                }>
                  {compareModels.filter((m) => parseQ4(m.full_q4_vram_gb) != null && m.price_in_usd_per_mtok != null).map((m, i) => <Cell key={m.id} fill={COLORS[i % 4]} />)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs tracking-widest uppercase text-white/50 border-b border-white/5">
            <tr><th className="text-left p-3">Field</th>{compareModels.map((m) => <th key={m.id} className="text-left p-3">{m.model}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ['Provider', (m) => m.provider],
              ['Released', (m) => (m.released ? fmtDate(m.released) : '—')],
              ['Params', (m) => `${m.total_parameters} / ${m.active_parameters}`],
              ['Q4 VRAM', (m) => m.full_q4_vram_gb ?? '—'],
              ['License', (m) => m.license],
              ['Context', (m) => m.context_window],
              ['SWE-V', (m) => m.swe_bench_verified ?? '—'],
              ['SWE-Pro', (m) => m.swe_bench_pro ?? '—'],
              ['LCB V6', (m) => m.livecodebench_v6 ?? '—'],
              ['TB 2.1', (m) => m.terminal_bench ?? '—'],
              ['Price in/out $/M', (m) => m.price_in_usd_per_mtok != null ? `$${m.price_in_usd_per_mtok}/$${m.price_out_usd_per_mtok}` : '—'],
              ['Price INR', (m) => m.price_in_inr_per_mtok != null ? `₹${m.price_in_inr_per_mtok}/₹${m.price_out_inr_per_mtok}` : '—'],
            ].map(([label, fn]) => (
              <tr key={label} className="hover:bg-white/[0.03]"><td className="p-3 font-semibold text-white/70">{label}</td>{compareModels.map((m) => <td key={m.id} className="p-3">{fn(m)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}