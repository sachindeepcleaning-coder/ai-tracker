import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Zap, Database, Award, Layers, Cpu, Calendar } from 'lucide-react'
import Header from './components/Header'
import Explorer from './components/Explorer'
import DetailModal from './components/DetailModal'
import ErrorBoundary from './components/ErrorBoundary'
import { allModels, providers, licenseGroups, useModels } from './hooks/useModels'
import { VERIFIED_AT, DATA_AS_OF, fmtDate, parseQ4 } from './lib/parse'
import dataMeta from './data.json'

/* Secondary tabs are code-split: the 767KB eager bundle drops to the Explorer-only
   critical path, and recharts (used only by chart tabs) stays out of first paint. */
const Leaderboards = lazy(() => import('./components/Leaderboards'))
const HardwareFit = lazy(() => import('./components/HardwareFit'))
const CostCalc = lazy(() => import('./components/CostCalc'))
const Compare = lazy(() => import('./components/Compare'))
const Tracker = lazy(() => import('./components/Tracker'))

function TabFallback() {
  return (
    <div className="card p-8 text-center" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2 text-sm text-white/60">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        Loading panel…
      </span>
    </div>
  )
}

const DEFAULT_FILTERS = { q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest', releaseWindow: 'all', modelType: 'all', confidence: 'all', hideSparse: false, freeOnly: false }

/** Shareable views: filters + tab hydrate from the URL query string, then stay
    in sync via replaceState so any filtered view can be pasted as a link. */
function filtersFromUrl() {
  try {
    const p = new URLSearchParams(window.location.search)
    return {
      q: p.get('q') || DEFAULT_FILTERS.q,
      provider: p.get('provider') || DEFAULT_FILTERS.provider,
      license: p.get('license') || DEFAULT_FILTERS.license,
      openOnly: p.get('open') === '1',
      maxQ4: p.get('q4') || DEFAULT_FILTERS.maxQ4,
      sort: p.get('sort') || DEFAULT_FILTERS.sort,
      releaseWindow: p.get('rel') || DEFAULT_FILTERS.releaseWindow,
      modelType: p.get('type') || DEFAULT_FILTERS.modelType,
      confidence: p.get('conf') || DEFAULT_FILTERS.confidence,
      hideSparse: p.get('hideSparse') === '1',
      freeOnly: p.get('free') === '1',
    }
  } catch {
    return { ...DEFAULT_FILTERS }
  }
}

export default function App() {
  const [tab, setTab] = useState(() => {
    try { return new URLSearchParams(window.location.search).get('tab') || 'explorer' } catch { return 'explorer' }
  })
  const [filters, setFilters] = useState(filtersFromUrl)
  const [showFilters, setShowFilters] = useState(false)
  const [compare, setCompare] = useState([])
  const [detail, setDetail] = useState(null)

  const { stats, filtered, latestModels, leaderboards, hwModels, bestFit } = useModels(filters)

  // Keep the URL in sync with the current view (skip default values).
  useEffect(() => {
    const p = new URLSearchParams()
    if (tab !== 'explorer') p.set('tab', tab)
    if (filters.q) p.set('q', filters.q)
    if (filters.provider !== 'all') p.set('provider', filters.provider)
    if (filters.license !== 'all') p.set('license', filters.license)
    if (filters.openOnly) p.set('open', '1')
    if (filters.maxQ4 !== 'all') p.set('q4', filters.maxQ4)
    if (filters.sort !== 'latest') p.set('sort', filters.sort)
    if (filters.releaseWindow !== 'all') p.set('rel', filters.releaseWindow)
    if (filters.modelType && filters.modelType !== 'all') p.set('type', filters.modelType)
    if (filters.confidence && filters.confidence !== 'all') p.set('conf', filters.confidence)
    if (filters.hideSparse) p.set('hideSparse', '1')
    if (filters.freeOnly) p.set('free', '1')
    const qs = p.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`)
  }, [tab, filters])

  useEffect(() => { document.title = `Local AI Coding Models — India Tracker (${stats.total} models)` }, [stats.total])
  const toggleCompare = (id) => setCompare((c) => c.includes(id) ? c.filter((x) => x !== id) : c.length >= 6 ? c : [...c, id])
  const compareModels = allModels.filter((m) => compare.includes(m.id))

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-3 focus:left-3 btn btn-primary">Skip to content</a>
      <Header tab={tab} onTab={setTab} stats={stats} explorerCount={filtered.length} />

      {/* KPI strip */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-6 gap-3">
        {[
          { k: 'Total models', v: stats.total, s: `v${dataMeta.data_version ?? '2026-09-18'} · CSV 1-${stats.total ?? 0} · refreshed ${dataMeta.data_regen_at ?? DATA_AS_OF} · fact-checked ${VERIFIED_AT}`, icon: Database },
          { k: 'Open-weight', v: stats.open, s: `${Math.round((stats.open / stats.total) * 100)}% open`, icon: Layers },
          { k: 'With SWE-V', v: stats.withSWE, s: 'have SWE-bench Verified', icon: Award },
          { k: 'With Q4 size', v: stats.withQ4, s: 'have Q4 VRAM', icon: Cpu },
          { k: 'With release date', v: stats.dated, s: `${Math.round((stats.dated / stats.total) * 100)}% of catalog`, icon: Calendar },
          {
            k: 'Best Q4 fit',
            v: bestFit ? bestFit.model : '—',
            s: bestFit ? `${parseQ4(bestFit.full_q4_vram_gb)} GB Q4 → fits 1×5090 (best SWE-V ≤32GB)` : 'no scored open-weight model fits 1×5090',
            icon: Zap,
          },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.k} className="card p-3">
              <div className="flex items-center gap-2 text-[11px] tracking-widest font-bold text-white/50 uppercase"><Icon size={12} aria-hidden="true" />{card.k}</div>
              <div className="text-xl font-extrabold mt-1">{card.v}</div>
              <div className="text-xs text-white/50">{card.s}</div>
            </div>
          )
        })}
      </div>

      {/* Recent releases pointer — driven by the `released` field in data.json */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-4">
        <div className="card p-4 bg-violet-500/5 border-violet-500/20">
          <div className="flex items-center gap-2 flex-wrap">
            <Zap size={16} className="text-violet-400" aria-hidden="true" />
            <span className="font-bold">Newest in the catalog</span>
            {latestModels.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setDetail(m)}
                className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full px-2.5 py-1 text-xs text-violet-200 hover:bg-violet-500/20"
                title="Open details"
              >
                <span className="font-semibold">{m.model}</span>
                <span className="text-violet-300/70">{m.released_est ? '≈' : ''}{fmtDate(m.released)}</span>
              </button>
            ))}
            <button type="button" onClick={() => setTab('tracker')} className="ml-auto btn btn-ghost text-xs py-1">
              Full Sep tracker
            </button>
          </div>
          <p className="text-xs text-white/50 mt-1">Explorer defaults to <b>Sort: Latest release ↓</b> so the freshest models are on top; switch to <b>Rank ↑</b> for the performance-ordered frontier list. Dates prefixed <b>≈</b> are approximations (inferred from family/provider release windows).</p>
        </div>
      </div>

      {/* Main */}
      <main id="main" className="max-w-[1400px] mx-auto px-4 md:px-6 pb-10">
        <ErrorBoundary>
          {tab === 'explorer' && (
            <Explorer
              models={allModels}
              filtered={filtered}
              providers={providers}
              licenseGroups={licenseGroups}
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              compare={compare}
              compareModels={compareModels}
              toggleCompare={toggleCompare}
              onClearCompare={() => setCompare([])}
              onDetail={setDetail}
              onViewCompare={() => setTab('compare')}
            />
          )}
          <Suspense fallback={<TabFallback />}>
            {tab === 'leaderboards' && <Leaderboards leaderboards={leaderboards} />}
            {tab === 'hardware' && <HardwareFit hwModels={hwModels} />}
            {tab === 'cost' && <CostCalc />}
            {tab === 'compare' && <Compare compareModels={compareModels} onBack={() => setTab('explorer')} onClear={() => setCompare([])} />}
            {tab === 'tracker' && <Tracker />}
          </Suspense>
        </ErrorBoundary>
      </main>

      {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} onToggleCompare={toggleCompare} inCompare={compare.includes(detail.id)} />}

      <footer className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 text-xs text-white/40 border-t border-white/5 mt-6">
        <details className="mb-3 group">
          <summary className="cursor-pointer text-white/60 font-semibold hover:text-white/80 select-none">About & methodology</summary>
          <div className="mt-2 space-y-2 text-white/50 leading-relaxed">
            <p><b className="text-white/70">Data:</b> single source of truth <span className="text-white/70">coding_benchmarks_july2026_final.csv (ranks 1-{stats.total})</span>, regenerated into <span className="text-white/70">src/data.json</span> via <span className="font-mono">npm run data</span> (curated release dates and free-tier flags are preserved across regeneration; last refreshed {dataMeta.data_regen_at ?? DATA_AS_OF}). Fact-checked {VERIFIED_AT} against HuggingFace / Cognition / Sakana / DeepSeek / Anthropic / Google / llm-releases / AA v4.3. Not vendor quotes — planning estimates. Release dates: <b className="text-white/70">exact</b> where documented; dates prefixed <b className="text-white/70">≈</b> are approximations inferred from family/provider release windows (60% coverage and growing).</p>
            <p><b className="text-white/70">Scores:</b> vendor-reported by default; cells annotated <span className="font-mono">(vendor)</span> carry the vendor's own harness numbers, so treat a "+vendor" tag as self-reported unless marked AA / Scale / BenchLM. SWE-bench Verified is contaminated per OpenAI Feb 2026 — prefer SWE-bench Pro (Scale standardized) for apples-to-apples.</p>
            <p><b className="text-white/70">License heuristics:</b> free-text license cells are classified by string heuristics (lib/license.js); "commercially gated open weights" (e.g. Modified MIT with revenue clauses) still counts as open-weight — weights are public even when commercial use is restricted.</p>
            <p><b className="text-white/70">Cost model:</b> 99% input / 1% output agentic loop with prompt-cache hit discount; ₹95.12/USD (standardized Aug 14, 2026). Hardware fit assumes +10-15GB runtime overhead on top of Q4 weights (lib/hardware.js: ≤85% comfortable, ≤115% tight).</p>
            <p><b className="text-white/70">Contribute:</b> corrections and new rows welcome via <a className="underline hover:text-white/70" href="https://github.com/sachindeepcleaning-coder/ai-tracker/issues" target="_blank" rel="noopener noreferrer">GitHub issues</a> — edit the CSV, run <span className="font-mono">npm run data</span>, and the integrity tests gate the deploy.</p>
          </div>
        </details>
        Built from <span className="text-white/70">coding_benchmarks_july2026_final.csv (ranks 1-{stats.total}, single source of truth)</span> + regenerated <span className="text-white/70">ai_coding_api_vs_local_summary.json + frontend/src/data.json</span>. <span className="text-white/70">Data v{dataMeta.data_version ?? '2026-09-18'} · last refreshed {dataMeta.data_regen_at ?? DATA_AS_OF}</span>. ₹95.12/USD. Fact-checked {VERIFIED_AT} (HuggingFace / Cognition / Sakana / DeepSeek / Anthropic / Google / llm-releases / AA v4.3). Not vendor quotes — planning estimates. Source: GitHub repo `sachindeepcleaning-coder/ai-tracker`. <span className="text-amber-300/70">Planning estimates only. Benchmarks are mostly vendor-reported. Not official rankings or financial advice.</span>
      </footer>
    </div>
  )
}
