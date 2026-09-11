import { useState } from 'react'
import { Search, Filter, ChevronDown, Check, X, ArrowUpRight } from 'lucide-react'
import { parsePct, parseQ4, paramsLabel } from '../lib/parse'
import { licenseBadge } from '../lib/license'
import { SORT_OPTIONS } from '../hooks/useModels'

const PAGE_SIZE = 36

/** Native <select> with a predictable chevron (no browser-specific "empty square" artifacts). */
function Select({ label, value, onChange, className = '', children, ...rest }) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="appearance-none px-3 py-2.5 pr-8 rounded-xl bg-white/5 border border-white/10 text-sm cursor-pointer focus:outline-none focus:border-emerald-500/50"
        {...rest}
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" aria-hidden="true" />
    </div>
  )
}

export default function Explorer({
  models,
  filtered,
  providers,
  licenses,
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  compare,
  compareModels,
  toggleCompare,
  onClearCompare,
  onDetail,
  onViewCompare,
}) {
  const { q, provider, license, openOnly, maxQ4, sort } = filters
  const [visible, setVisible] = useState(PAGE_SIZE)
  const set = (patch) => {
    setFilters((f) => ({ ...f, ...patch }))
    setVisible(PAGE_SIZE) // event-driven pager reset on filter change
  }

  const clearAll = () => setFilters({ q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'rank' })

  const shown = filtered.slice(0, visible)

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="card p-3 md:p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search model or provider (e.g. Qwen, DeepSeek, GLM)"
              aria-label="Search models or providers"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select label="Filter by provider" value={provider} onChange={(e) => set({ provider: e.target.value })}>
              <option value="all">All providers</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Select>
            <Select label="Filter by license" value={license} onChange={(e) => set({ license: e.target.value })}>
              <option value="all">All licenses</option>
              {licenses.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Select>
            <Select label="Sort models" value={sort} onChange={(e) => set({ sort: e.target.value })}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
            <button onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters} className="btn btn-ghost text-sm">
              <Filter size={14} aria-hidden="true" /> Filters
              <ChevronDown size={14} className={`transition ${showFilters ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/5">
            <label className="flex items-center gap-2 text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10 cursor-pointer">
              <input type="checkbox" checked={openOnly} onChange={(e) => set({ openOnly: e.target.checked })} className="accent-emerald-500" />
              Open-weight only
            </label>
            <Select label="Maximum Q4 VRAM" value={maxQ4} onChange={(e) => set({ maxQ4: e.target.value })}>
              <option value="all">Any Q4 size</option>
              <option value="16">Fits ≤16GB (5090 Q4)</option>
              <option value="32">Fits ≤32GB (1×5090)</option>
              <option value="96">Fits ≤96GB (1× Pro 6000)</option>
              <option value="192">Fits ≤192GB (2× Pro)</option>
              <option value="512">Fits ≤512GB (4× Spark)</option>
            </Select>
            <div className="text-xs text-white/50 flex items-center gap-2">
              <Check size={12} className="text-emerald-400" aria-hidden="true" />
              <span aria-live="polite">{filtered.length} / {models.length} shown</span>
            </div>
            <button onClick={clearAll} className="text-xs text-white/70 underline" type="button">Clear all</button>
          </div>
        )}
      </div>

      {/* Compare bar */}
      {compare.length > 0 && (
        <div className="card p-3 flex items-center gap-2 flex-wrap" aria-label="Models selected for comparison">
          <span className="text-sm font-semibold">Compare ({compare.length}/4):</span>
          {compareModels.map((m) => (
            <span key={m.id} className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full pl-3 pr-1 py-1 text-sm">
              {m.model}{' '}
              <button
                onClick={() => toggleCompare(m.id)}
                aria-label={`Remove ${m.model} from compare`}
                title={`Remove ${m.model}`}
                className="w-6 h-6 rounded-full bg-white/10 grid place-items-center hover:bg-white/20"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
          <button onClick={onClearCompare} className="ml-auto btn btn-ghost text-xs py-1">Clear</button>
          {compare.length >= 2 && (
            <button onClick={onViewCompare} className="btn btn-primary text-xs py-1">
              View comparison <ArrowUpRight size={12} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="font-semibold">No models match your filters.</p>
          <button onClick={clearAll} className="mt-3 btn btn-ghost text-sm" type="button">Clear all filters</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {shown.map((m) => {
              const swe = parsePct(m.swe_bench_verified)
              const tb = parsePct(m.terminal_bench)
              const lcb = parsePct(m.livecodebench_v6)
              const q4 = parseQ4(m.full_q4_vram_gb)
              const lic = licenseBadge(m.license)
              const isSel = compare.includes(m.id)
              return (
                <article key={m.id} className={`card p-4 hover:border-white/15 transition group ${isSel ? 'ring-1 ring-emerald-500 border-emerald-500/30' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{m.rank}</span>
                        <span className={`badge ${lic.cls}`}>{lic.label}</span>
                        {m.is_free && <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Free</span>}
                      </div>
                      <h3 className="font-bold leading-tight mt-2 line-clamp-2">{m.model}</h3>
                      <p className="text-xs text-white/50">{m.provider} · {paramsLabel(m)} · {m.context_window}</p>
                    </div>
                    <button
                      onClick={() => toggleCompare(m.id)}
                      aria-pressed={isSel}
                      aria-label={isSel ? `Remove ${m.model} from compare` : `Add ${m.model} to compare`}
                      title={isSel ? 'Remove from compare' : 'Add to compare'}
                      className={`w-8 h-8 rounded-full grid place-items-center border text-xs shrink-0 ${isSel ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                    >
                      {isSel ? <Check size={14} aria-hidden="true" /> : <span aria-hidden="true">+</span>}
                    </button>
                  </div>
<div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: 'SWE-V', v: swe },
                      { label: 'TB 2.1', v: tb },
                      { label: 'LCB V6', v: lcb },
                    ].map((b) => (
                      <div key={b.label} className="bg-white/[0.04] rounded-xl p-2 border border-white/5">
                        <div className="text-[11px] tracking-widest font-bold text-white/40">{b.label}</div>
                        <div className="text-sm font-extrabold">{b.v != null ? b.v.toFixed(1) + '%' : '—'}</div>
                        <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden" role="img" aria-label={`${b.label} ${b.v != null ? b.v.toFixed(1) + '%' : 'no data'}`}>
                          <div className="h-full bg-emerald-500" style={{ width: b.v != null ? `${b.v}%` : '0%' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Q4 {q4 != null ? q4 + ' GB' : '—'}</span>
                    {m.price_in_usd_per_mtok != null && (
                      <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">${m.price_in_usd_per_mtok}/$ {m.price_out_usd_per_mtok} /M</span>
                    )}
                    {q4 != null && q4 <= 32 && (
                      <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Fits 1×5090</span>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => onDetail(m)} className="flex-1 btn btn-ghost text-xs py-2">Details</button>
                    <a href={`https://huggingface.co/models?search=${encodeURIComponent(m.model)}`} target="_blank" rel="noopener noreferrer" aria-label={`Search ${m.model} on Hugging Face`} className="btn btn-ghost text-xs py-2 px-3">
                      <ArrowUpRight size={12} aria-hidden="true" /> HF
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          {visible < filtered.length && (
            <div className="text-center pt-2">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn btn-ghost text-sm">
                Show more ({Math.min(PAGE_SIZE, filtered.length - visible)} more · {filtered.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
