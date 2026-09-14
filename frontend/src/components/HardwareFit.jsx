import { HardDrive } from 'lucide-react'
import { parseQ4, fmtDate } from '../lib/parse'
import { hardwareTiers, fitsModel } from '../lib/hardware'

/** All open-weight models with Q4 VRAM data, best SWE-V first. Independent of Explorer filters. */
export default function HardwareFit({ hwModels }) {
  // Count basis = the same open-weight Q4 set the matrix renders (hwModels),
  // so summary cards agree with the "open-weight only" narrative.
  const fitsCount = (vram) => hwModels.filter((m) => {
    const q4 = parseQ4(m.full_q4_vram_gb)
    return q4 != null && q4 <= vram
  }).length
  const q4Count = hwModels.length

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-bold flex items-center gap-2"><HardDrive size={16} aria-hidden="true" /> Hardware Fit Matrix (Q4 weights)</h2>
        <p className="text-sm text-white/60">All {hwModels.length} open-weight models with Q4 VRAM data, best SWE-V first. Closed / API-only models excluded (no local weights). Independent of Explorer filters.</p>
        <div className="overflow-auto mt-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2 sticky left-0 bg-[var(--bg-card)]">Model (Q4)</th>
                {hardwareTiers.map((h) => (
                  <th key={h.id} className="p-2 text-center min-w-[110px]">
                    <div className="font-bold">{h.label}</div>
                    <div className="font-normal text-white/50">{h.cost} · {h.vram}GB</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hwModels.map((m) => {
                const q4 = parseQ4(m.full_q4_vram_gb)
                return (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="p-2 sticky left-0 bg-[var(--bg-card)]"><div className="font-semibold">{m.model.slice(0, 28)}{m.released && <span className="ml-1 text-[10px] font-mono text-sky-300/80">{fmtDate(m.released)}</span>}</div><div className="text-white/50">{q4}GB · {m.provider}</div></td>
                    {hardwareTiers.map((h) => {
                      const fit = fitsModel(q4, h.vram)
                      const symbol = fit === 'fit' ? '✓' : fit === 'tight' ? '~' : '×'
                      return (
                        <td key={h.id} className="p-2 text-center">
                          <span
                            role="img"
                            aria-label={`${m.model} on ${h.label}: ${fit === 'fit' ? 'fits comfortably' : fit === 'tight' ? 'tight fit, offload / KV tricks needed' : 'does not fit'}`}
                            className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-xs font-bold ${fit === 'fit' ? 'bg-emerald-500 text-white' : fit === 'tight' ? 'bg-amber-500 text-black' : 'bg-white/10 text-white/30'}`}
                          >
                            {symbol}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {hardwareTiers.map((h) => {
          const n = fitsCount(h.vram)
          const pct = Math.round((n / q4Count) * 100)
          return (
            <div key={h.id} className="card p-4">
              <div className="text-sm font-bold">{h.label}</div>
              <div className="text-xs text-white/50">{h.vram}GB VRAM/unified · {h.cost} India street · {h.tok}</div>
              <div className="mt-2 text-xs">Fits {n} / {q4Count} open-weight Q4 models</div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden" role="img" aria-label={`${pct}% of Q4 models fit`}>
                <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="card p-4 text-sm text-white/60">
        <p><b>India picks Aug 2026 street, 5-yr TCO:</b> Best value `1×5090 ~₹5L → Qwen27B 200 tok/s`, Balanced `2× DGX Spark ~₹10-11L → V4 Flash 40 tok/s`, 4× Spark ~₹22-30L runs GLM-5.3+V4.1 Flash+Qwen, `DGX B300 2.1TB ~₹5.5Cr` any model `README.md:149`.</p>
      </div>
    </div>
  )
}
