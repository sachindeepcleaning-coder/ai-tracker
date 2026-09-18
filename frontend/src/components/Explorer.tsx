import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Search, Filter, ChevronDown, Check, X, ArrowUpRight, Download } from 'lucide-react'
import { parsePct, parseQ4, paramsLabel, fmtDate, fmtDateFull, daysOld, DATA_AS_OF } from '../lib/parse'
import { licenseBadge } from '../lib/license'
import { SORT_OPTIONS, RELEASE_WINDOWS, modelTypeGroups, confidenceGroups } from '../hooks/useModels'
import { DataQualityBadge } from './DataQualityBadge'
import { useVirtualizer } from '@tanstack/react-virtual'

/** Download the current filtered view as CSV or JSON (client-side blob). */
const EXPORT_COLS = ['rank', 'model', 'provider', 'total_parameters', 'active_parameters', 'full_q4_vram_gb', 'license', 'swe_bench_verified', 'swe_bench_pro', 'livecodebench_v6', 'terminal_bench', 'context_window', 'price_in_usd_per_mtok', 'price_out_usd_per_mtok', 'released']

function exportModels(rows, fmt) {
  let blob, name
  if (fmt === 'json') {
    blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' })
    name = `ai-tracker-${rows.length}-models.json`
  } else {
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [EXPORT_COLS.join(','), ...rows.map((m) => EXPORT_COLS.map((c) => esc(m[c])).join(','))].join('\n')
    blob = new Blob([csv], { type: 'text/csv' })
    name = `ai-tracker-${rows.length}-models.csv`
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

/** Native <select> with a predictable chevron (no browser-specific "empty square" artifacts). */
function Select({ label, value, onChange, className = '', children, ...rest }) {
  return (
    <div className={`relative inline-flex max-w-full ${className}`}>
      <select
        aria-label={label}
        value={value}
        onChange={onChange}
        className="appearance-none px-3 py-2.5 pr-8 rounded-xl bg-[#131C2E] border border-white/10 text-sm text-[#E2E8F0] cursor-pointer focus:outline-none focus:border-emerald-500/50 max-w-full"
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
  licenseGroups,
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
  const { q, provider, license, openOnly, maxQ4, sort, releaseWindow, modelType, confidence, hideSparse, freeOnly } = filters
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }))

  const clearAll = () => setFilters({ q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest', releaseWindow: 'all', modelType: 'all', confidence: 'all', hideSparse: false, freeOnly: false })

  // Incremental rendering: 48 cards initially, "Load more" in 48-card pages.
  // Keeps the desktop "show all" feel (few clicks to reach 267) while first paint
  // stays light on mobile/low-end devices. Resets whenever filters change
  // (adjust-state-during-render pattern — no effect, no cascading render).
  const PAGE = 48
  const filterKey = [q, provider, license, openOnly, maxQ4, sort, releaseWindow, modelType, confidence, hideSparse, freeOnly].join('|')
  const [state, setState] = useState({ key: filterKey, visible: PAGE })
  if (state.key !== filterKey) {
    setState({ key: filterKey, visible: PAGE })
  }
  const visible = state.visible
  const shown = filtered.slice(0, visible)
  const hidden = filtered.length - shown.length

  const parentRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: shown.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 340,
    overscan: 5,
  })
  useEffect(() => {
    if (showFilters && filterRef.current) {
      const first = filterRef.current.querySelector<HTMLElement>('input, select, button')
      first?.focus()
    }
  }, [showFilters])

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
              {licenseGroups.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Select>
            <Select label="Sort models" value={sort} onChange={(e) => set({ sort: e.target.value })}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
            <Select label="Filter by release date" value={releaseWindow} onChange={(e) => set({ releaseWindow: e.target.value })}>
              {RELEASE_WINDOWS.map((o) => (
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
          <>
            {/* Mobile: bottom sheet with backdrop. Desktop (lg+): inline panel, unchanged. */}
            <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setShowFilters(false)} aria-hidden="true" />
            <div
              ref={filterRef}
              role="dialog"
              aria-label="Advanced filters"
              aria-modal="true"
              tabIndex={-1}
              onKeyDown={(e) => { if (e.key === 'Escape') setShowFilters(false) }}
              className="fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[var(--bg-card)] border-t border-white/10 p-4 pb-6 shadow-2xl
                         lg:static lg:z-auto lg:max-h-none lg:overflow-visible lg:rounded-none lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 lg:mt-3 lg:pt-3 lg:border-t lg:border-white/5"
            >
              <div className="flex items-center justify-between mb-3 lg:hidden">
                <span className="text-sm font-bold">Filters</span>
                <button
                  onClick={() => setShowFilters(false)}
                  aria-label="Close filters"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:border-0">
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
                <Select label="Model type" value={modelType} onChange={(e) => set({ modelType: e.target.value })}>
                  <option value="all">All types</option>
                  {modelTypeGroups.map((t) => <option key={t} value={t}>{t}</option>)}
                </Select>
                <Select label="Confidence" value={confidence} onChange={(e) => set({ confidence: e.target.value })}>
                  <option value="all">All confidence</option>
                  {confidenceGroups.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>
                <label className="flex items-center gap-2 text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10 cursor-pointer" title="Hide sparse = models without SWE-bench Verified and without Terminal-Bench 2.1">
                  <input type="checkbox" checked={hideSparse} onChange={(e) => set({ hideSparse: e.target.checked })} className="accent-amber-500" />
                  Hide sparse
                </label>
                <label className="flex items-center gap-2 text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10 cursor-pointer">
                  <input type="checkbox" checked={freeOnly} onChange={(e) => set({ freeOnly: e.target.checked })} className="accent-emerald-500" />
                  Free only
                </label>
                <div className="text-xs text-white/50 flex items-center gap-2">
                  <Check size={12} className="text-emerald-400" aria-hidden="true" />
                  <span aria-live="polite">{filtered.length} / {models.length} shown</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <button onClick={() => exportModels(filtered, 'csv')} className="inline-flex items-center gap-1 text-white/70 underline" type="button"><Download size={11} aria-hidden="true" />Export CSV</button>
                  <button onClick={() => exportModels(filtered, 'json')} className="text-white/70 underline" type="button">JSON</button>
                  <button onClick={clearAll} className="text-white/70 underline" type="button">Clear all</button>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-white/40 leading-relaxed border-t border-white/5 pt-2">
                <span className="font-bold text-white/60">Data quality:</span> <span className="badge bg-zinc-500/15 text-zinc-400 border-white/10 text-[10px]">LOW</span> no/sparse coding bench; <span className="badge bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px]">MEDIUM</span> 1 coding bench (SWE-V/LCB/TB); <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px]">HIGH</span> ≥2 coding benches + recent (<span className="font-mono">2026-08-01</span>+) + independent source (AA/BenchLM/HF). <span className="text-white/50">Hide sparse</span> hides models without SWE-V and without TB 2.1.
              </div>
            </div>
          </>
        )}
      </div>

      {/* Compare bar */}
      {compare.length > 0 && (
        <div className="card p-3 flex items-center gap-2 flex-wrap" aria-label="Models selected for comparison">
          <span className="text-sm font-semibold">Compare ({compare.length}/6):</span>
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
      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="font-semibold">No models match your filters.</p>
          <button onClick={clearAll} className="mt-3 btn btn-ghost text-sm" type="button">Clear all filters</button>
        </div>
      ) : shown.length > 24 ? (
        <>
          <div ref={parentRef} className="overflow-auto rounded-xl" style={{ height: '70vh', contain: 'strict' }} role="list" aria-label="Model list — virtualized">
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative', width: '100%' }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const m = shown[virtualRow.index]
                const idx = virtualRow.index
                const swe = parsePct(m.swe_bench_verified)
                const tb = parsePct(m.terminal_bench)
                const lcb = parsePct(m.livecodebench_v6)
                const q4 = parseQ4(m.full_q4_vram_gb)
                const lic = licenseBadge(m.license)
                const isSel = compare.includes(m.id)
                const age = daysOld(m.released)
                const isNew = age <= 7
                return (
                  <div
                    key={m.id}
                    data-index={virtualRow.index}
                    role="listitem"
                    ref={rowVirtualizer.measureElement}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualRow.start}px)` }}
                    className="p-1"
                  >
                    <article className={`card p-4 hover:border-white/15 transition group ${isSel ? 'ring-1 ring-emerald-500 border-emerald-500/30' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{m.rank}</span>
                            <span className={`badge ${lic.cls}`}>{lic.label}</span>
                            {m.is_orchestrator && <span className="badge bg-sky-500/15 text-sky-300 border-sky-500/30" role="status" aria-label="Orchestrator model — routes to multiple models">Orchestrator</span>}
                            <DataQualityBadge confidence={m.confidence} />
                            {m.is_free && <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Free</span>}
                            {m.released && (
                              <span className={`badge ${isNew ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' : 'bg-white/5 text-white/50 border-white/10'}`} title={`${m.released_est ? 'Approximate release' : 'Released'} ${m.released}${m.released_est ? ' (inferred)' : ''} (as-of ${fmtDateFull(DATA_AS_OF)})`}>
                                {isNew && <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1" aria-hidden="true" />}
                                {isNew ? 'NEW · ' : ''}{m.released_est ? '≈' : ''}{fmtDate(m.released)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold leading-tight mt-2 line-clamp-2">{m.model}</h3>
                          <p className="text-xs text-white/50">{m.provider} · {paramsLabel(m)} · {m.context_window} · {m.source} · {m.last_verified ?? "—"}</p>
                          {m.notes && <p className="text-[11px] text-amber-200/60 mt-1 line-clamp-2" title={m.notes}>Note: {m.notes}</p>}
                        </div>
                        <button onClick={() => toggleCompare(m.id)} aria-pressed={isSel} aria-label={isSel ? `Remove ${m.model} from compare` : `Add ${m.model} to compare`} className={`w-8 h-8 rounded-full grid place-items-center border text-xs shrink-0 ${isSel ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>{isSel ? <Check size={14} aria-hidden="true" /> : <span aria-hidden="true">+</span>}</button>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[{ label: 'SWE-V', v: swe }, { label: 'TB 2.1', v: tb }, { label: 'LCB V6', v: lcb }].map((b) => (
                          <div key={b.label} className="bg-white/[0.04] rounded-xl p-2 border border-white/5">
                            <div className="text-[11px] tracking-widest font-bold text-white/40">{b.label}</div>
                            <div className="text-sm font-extrabold" title={b.v != null ? `${b.v.toFixed(1)}%` : 'No data — awaiting vendor/AA verification'}>{b.v != null ? b.v.toFixed(1) + '%' : '—'}</div>
                            <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden" role="img" aria-label={`${b.label} ${b.v != null ? b.v.toFixed(1) + '%' : 'no data'}`}><div className="h-full bg-emerald-500" style={{ width: b.v != null ? `${b.v}%` : '0%' }} /></div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Q4 {q4 != null ? q4 + ' GB' : '—'}</span>
                        {m.price_in_usd_per_mtok != null && <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">${m.price_in_usd_per_mtok}/$ {m.price_out_usd_per_mtok} /M</span>}
                        {q4 != null && q4 <= 32 && <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Fits 1×5090</span>}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button type="button" onClick={() => onDetail(m)} className="flex-1 btn btn-ghost text-xs py-2">Details</button>
                        <a href={`https://huggingface.co/models?search=${encodeURIComponent(m.model)}`} target="_blank" rel="noopener noreferrer" aria-label={`Search ${m.model} on Hugging Face`} className="btn btn-ghost text-xs py-2 px-3"><ArrowUpRight size={12} aria-hidden="true" /> HF</a>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
          {hidden > 0 && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button type="button" onClick={() => setState((s) => ({ ...s, visible: s.visible + PAGE }))} className="btn btn-ghost text-sm" aria-label={`Load ${Math.min(PAGE, hidden)} more models`}>Load more ({hidden} hidden)</button>
              <span className="text-xs text-white/40">Showing {shown.length} of {filtered.length} · virtualized</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" role="list" aria-label="Model grid">
            {shown.map((m, idx) => {
              const swe = parsePct(m.swe_bench_verified)
              const tb = parsePct(m.terminal_bench)
              const lcb = parsePct(m.livecodebench_v6)
              const q4 = parseQ4(m.full_q4_vram_gb)
              const lic = licenseBadge(m.license)
              const isSel = compare.includes(m.id)
              const age = daysOld(m.released)
              const isNew = age <= 7
              return (
                <article key={m.id} role="listitem" className={`card card-enter p-4 hover:border-white/15 transition group ${isSel ? 'ring-1 ring-emerald-500 border-emerald-500/30' : ''}`} style={{ animationDelay: `${Math.min(idx, 11) * 35}ms` }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{m.rank}</span>
                        <span className={`badge ${lic.cls}`}>{lic.label}</span>
                        {m.is_orchestrator && <span className="badge bg-sky-500/15 text-sky-300 border-sky-500/30" role="status" aria-label="Orchestrator model — routes to multiple models">Orchestrator</span>}
                        <DataQualityBadge confidence={m.confidence} />
                        {m.is_free && <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Free</span>}
                        {m.released && (
                          <span className={`badge ${isNew ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' : 'bg-white/5 text-white/50 border-white/10'}`} title={`${m.released_est ? 'Approximate release' : 'Released'} ${m.released}${m.released_est ? ' (inferred from family/provider release window)' : ''} (data as-of ${fmtDateFull(DATA_AS_OF)})`}>
                            {isNew && <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1" aria-hidden="true" />}
                            {isNew ? 'NEW · ' : ''}{m.released_est ? '≈' : ''}{fmtDate(m.released)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold leading-tight mt-2 line-clamp-2">{m.model}</h3>
                      <p className="text-xs text-white/50">{m.provider} · {paramsLabel(m)} · {m.context_window} · {m.source} · {m.last_verified ?? "—"}</p>
                          {m.notes && <p className="text-[11px] text-amber-200/60 mt-1 line-clamp-2" title={m.notes}>Note: {m.notes}</p>}
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
                        <div className="text-sm font-extrabold" title={b.v != null ? `${b.v.toFixed(1)}%` : 'No data — awaiting vendor/AA verification'}>{b.v != null ? b.v.toFixed(1) + '%' : '—'}</div>
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
          {hidden > 0 && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <button type="button" onClick={() => setState((s) => ({ ...s, visible: s.visible + PAGE }))} className="btn btn-ghost text-sm" aria-label={`Load ${Math.min(PAGE, hidden)} more models`}>
                Load more ({hidden} hidden)
              </button>
              <span className="text-xs text-white/40">Showing {shown.length} of {filtered.length}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
