import React, { useEffect, useRef } from 'react'
import { Search, Award, HardDrive, IndianRupee, Scale, Timer } from 'lucide-react'
import { VERIFIED_AT } from '../lib/parse'

const TABS = [
  { id: 'explorer', label: 'Explorer', icon: Search },
  { id: 'leaderboards', label: 'Leaderboards', icon: Award },
  { id: 'hardware', label: 'Hardware Fit', icon: HardDrive },
  { id: 'cost', label: 'Cost Calculator', icon: IndianRupee },
  { id: 'compare', label: 'Compare', icon: Scale },
  { id: 'tracker', label: 'Sep Tracker', icon: Timer },
]

const CSV_URL = 'https://github.com/sachindeepcleaning-coder/ai-tracker/blob/master/coding_benchmarks_july2026_final.csv'
const JSON_URL = 'https://github.com/sachindeepcleaning-coder/ai-tracker/blob/master/frontend/src/data.json'

export default function Header({ tab, onTab, stats, explorerCount }) {
  const navRef = useRef(null)

  // Keep the active tab visible when the tab strip overflows on small screens.
  useEffect(() => {
    const btn = navRef.current?.querySelector(`[data-tab="${tab}"]`)
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [tab])

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: 'rgba(11,17,32,0.85)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white" style={{ background: 'linear-gradient(135deg,#10B981,#8B5CF6)' }} aria-hidden="true">AI</div>
          <div className="min-w-0">
            <h1 className="text-[15px] md:text-[16px] font-extrabold leading-none tracking-tight">Local AI Coding Models — India</h1>
            <p className="text-[11px] text-white/60 hidden sm:block">{stats.total} models (CSV ranks 1-267 single source of truth) · Fact-checked {VERIFIED_AT} · ₹95.12/USD · Private / local-first</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:inline-flex items-center gap-1" role="group" aria-label="Download source data">
            <a href={CSV_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs py-2 px-3">CSV</a>
            <a href={JSON_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs py-2 px-3">JSON</a>
          </div>
          <span className="hidden md:inline-flex badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Verified {VERIFIED_AT}</span>
          <span className="badge bg-violet-500/15 text-violet-300 border-violet-500/30 text-[10px]">{stats.total} models</span>
        </div>
      </div>
      <nav ref={navRef} className="max-w-[1400px] mx-auto px-4 md:px-6 pb-3 flex items-center gap-2 overflow-x-auto" aria-label="Dashboard sections">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          const count = t.id === 'explorer' ? explorerCount : null
          return (
            <button
              key={t.id}
              data-tab={t.id}
              onClick={() => onTab(t.id)}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition ${active ? 'bg-white text-black border-white' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon size={14} aria-hidden="true" />
              {t.label}
              {count != null && <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${active ? 'bg-black/10' : 'bg-white/10'}`}>{count}</span>}
            </button>
          )
        })}
      </nav>
    </header>
  )
}