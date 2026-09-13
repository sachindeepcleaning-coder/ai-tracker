import { lazy, Suspense, useState } from 'react'
import { Zap, Database, Award, Layers, Cpu } from 'lucide-react'
import Header from './components/Header'
import Explorer from './components/Explorer'
import DetailModal from './components/DetailModal'
import ErrorBoundary from './components/ErrorBoundary'
import { allModels, providers, licenseGroups, useModels } from './hooks/useModels'
import { VERIFIED_AT, fmtDate } from './lib/parse'

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

export default function App() {
  const [tab, setTab] = useState('explorer')
  const [filters, setFilters] = useState({ q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'latest', releaseWindow: 'all' })
  const [showFilters, setShowFilters] = useState(false)
  const [compare, setCompare] = useState([])
  const [detail, setDetail] = useState(null)

  const { stats, filtered, latestModels, leaderboardTB, leaderboardSWE, leaderboardLCB, hwModels } = useModels(filters)

  const toggleCompare = (id) => setCompare((c) => c.includes(id) ? c.filter((x) => x !== id) : c.length >= 4 ? c : [...c, id])
  const compareModels = allModels.filter((m) => compare.includes(m.id))

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-3 focus:left-3 btn btn-primary">Skip to content</a>
      <Header tab={tab} onTab={setTab} stats={stats} explorerCount={filtered.length} />

      {/* KPI strip */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { k: 'Total models', v: stats.total, s: 'CSV 1-267, fact-checked Sep 13', icon: Database },
          { k: 'Open-weight', v: stats.open, s: `${Math.round((stats.open / stats.total) * 100)}% open`, icon: Layers },
          { k: 'With SWE-V', v: stats.withSWE, s: 'have SWE-bench Verified', icon: Award },
          { k: 'With Q4 size', v: stats.avgQ4, s: 'have Q4 VRAM', icon: Cpu },
          { k: 'Best Q4 fit', v: 'Qwen 27B', s: '17 GB → 200 tok/s on 1×5090', icon: Zap },
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
                <span className="text-violet-300/70">{fmtDate(m.released)}</span>
              </button>
            ))}
            <button type="button" onClick={() => setTab('tracker')} className="ml-auto btn btn-ghost text-xs py-1">
              Full Sep tracker
            </button>
          </div>
          <p className="text-xs text-white/50 mt-1">Explorer defaults to <b>Sort: Latest release ↓</b> so the freshest models are on top; switch to <b>Rank ↑</b> for the performance-ordered frontier list.</p>
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
            {tab === 'leaderboards' && <Leaderboards leaderboardTB={leaderboardTB} leaderboardSWE={leaderboardSWE} leaderboardLCB={leaderboardLCB} />}
            {tab === 'hardware' && <HardwareFit models={allModels} stats={stats} hwModels={hwModels} />}
            {tab === 'cost' && <CostCalc />}
            {tab === 'compare' && <Compare compareModels={compareModels} onBack={() => setTab('explorer')} onClear={() => setCompare([])} />}
            {tab === 'tracker' && <Tracker />}
          </Suspense>
        </ErrorBoundary>
      </main>

      {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} onToggleCompare={toggleCompare} />}

      <footer className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 text-xs text-white/40 border-t border-white/5 mt-6">
        Built from <span className="text-white/70">coding_benchmarks_july2026_final.csv (ranks 1-267, single source of truth)</span> + regenerated <span className="text-white/70">ai_coding_api_vs_local_summary.json + frontend/src/data.json</span>. ₹95.12/USD. Fact-checked {VERIFIED_AT} (HuggingFace / Cognition / Sakana / DeepSeek / Anthropic / Google / llm-releases / AA v4.3). Not vendor quotes — planning estimates. Source: GitHub repo `sachindeepcleaning-coder/ai-tracker`.
      </footer>
    </div>
  )
}
