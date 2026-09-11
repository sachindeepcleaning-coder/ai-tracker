import { useState } from 'react'
import { Zap, Database, Award, Layers, Cpu } from 'lucide-react'
import Header from './components/Header'
import Explorer from './components/Explorer'
import Leaderboards from './components/Leaderboards'
import HardwareFit from './components/HardwareFit'
import CostCalc from './components/CostCalc'
import Compare from './components/Compare'
import Tracker from './components/Tracker'
import DetailModal from './components/DetailModal'
import ErrorBoundary from './components/ErrorBoundary'
import { allModels, providers, licenses, useModels } from './hooks/useModels'
import { VERIFIED_AT } from './lib/parse'

export default function App() {
  const [tab, setTab] = useState('explorer')
  const [filters, setFilters] = useState({ q: '', provider: 'all', license: 'all', openOnly: false, maxQ4: 'all', sort: 'rank' })
  const [showFilters, setShowFilters] = useState(false)
  const [compare, setCompare] = useState([])
  const [detail, setDetail] = useState(null)

  const { stats, filtered, leaderboardTB, leaderboardSWE, leaderboardLCB, hwModels } = useModels(filters)

  const toggleCompare = (id) => setCompare((c) => c.includes(id) ? c.filter((x) => x !== id) : c.length >= 4 ? c : [...c, id])
  const compareModels = allModels.filter((m) => compare.includes(m.id))

  return (
    <div className="min-h-screen">
      <Header tab={tab} onTab={setTab} stats={stats} explorerCount={filtered.length} />

      {/* KPI strip */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { k: 'Total models', v: stats.total, s: 'CSV 1-267, online Sep 10', icon: Database },
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

      {/* Recent releases pointer */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-4">
        <div className="card p-4 bg-violet-500/5 border-violet-500/20">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-violet-400" aria-hidden="true" />
            <span className="font-bold">New frontier releases</span>
            <span className="ml-auto badge bg-violet-500/15 text-violet-400 border-violet-500/30 text-[10px]">Tracker tab</span>
          </div>
          <p className="text-xs text-white/50 mt-1">The <b>Tracker</b> tab has a curated, date-sorted list of Sep 2026 releases with full details. This Explorer view is ranked by benchmark performance, not release date.</p>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-10">
        <ErrorBoundary>
          {tab === 'explorer' && (
            <Explorer
              models={allModels}
              filtered={filtered}
              providers={providers}
              licenses={licenses}
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
          {tab === 'leaderboards' && <Leaderboards leaderboardTB={leaderboardTB} leaderboardSWE={leaderboardSWE} leaderboardLCB={leaderboardLCB} />}
          {tab === 'hardware' && <HardwareFit models={allModels} stats={stats} hwModels={hwModels} />}
          {tab === 'cost' && <CostCalc />}
          {tab === 'compare' && <Compare compareModels={compareModels} onBack={() => setTab('explorer')} onClear={() => setCompare([])} />}
          {tab === 'tracker' && <Tracker />}
        </ErrorBoundary>
      </main>

      {detail && <DetailModal detail={detail} onClose={() => setDetail(null)} onToggleCompare={toggleCompare} />}

      <footer className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 text-xs text-white/40 border-t border-white/5 mt-6">
        Built from <span className="text-white/70">coding_benchmarks_july2026_final.csv (ranks 1-267, single source of truth)</span> + regenerated <span className="text-white/70">ai_coding_api_vs_local_summary.json + frontend/src/data.json</span>. ₹95.12/USD. Online re-verified {VERIFIED_AT} (DeepSeek docs / Anthropic docs / Google AI docs / llm-releases 349 / AA v4.3). Nemotron 3.5 Lightning duplicated in source CSV (ranks 221+245). Not vendor quotes — planning estimates. Source folder: `/home/vegeta/Music/ai`.
      </footer>
    </div>
  )
}
