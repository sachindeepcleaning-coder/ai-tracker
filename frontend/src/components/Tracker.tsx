import React, { useEffect, useMemo, useState } from 'react'
import { Sparkles, Newspaper, Eye, LayoutGrid, Search, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import {
  WATCH_ITEMS, WATCH_STATUSES, WATCH_STATUS_META, flag, watchCounts, type WatchStatus,
} from '../lib/watchlist'
import {
  CHANGE_ITEMS, CHANGE_TYPES, CHANGE_TYPE_META, changeCounts, groupByMonth, fmtDay, type ChangeType,
} from '../lib/changelog'
import { timeAgo, DATA_AS_OF } from '../lib/parse'

type TView = 'changelog' | 'rumors' | 'highlights'

const VIEWS: { value: TView; label: string; icon: typeof Newspaper }[] = [
  { value: 'changelog', label: 'Changelog', icon: Newspaper },
  { value: 'rumors', label: 'Rumor watch', icon: Eye },
  { value: 'highlights', label: 'Highlights', icon: LayoutGrid },
]

function tviewFromUrl(): TView {
  try {
    const v = new URLSearchParams(window.location.search).get('tview')
    if (v === 'rumors' || v === 'highlights' || v === 'changelog') return v
  } catch { /* ignore */ }
  return 'changelog'
}

function Source({ label, url }: { label: string; url?: string }) {
  if (!url) return <span className="text-white/40">Source: {label}</span>
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky-300/90 underline hover:text-sky-200">
      Source: {label} <ArrowUpRight size={11} aria-hidden="true" />
    </a>
  )
}

function RankLink({ rank, onOpenModel }: { rank?: number; onOpenModel?: (rankId: string) => void }) {
  if (rank == null || !onOpenModel) return null
  return (
    <button
      type="button"
      onClick={() => onOpenModel(`rank-${rank}`)}
      className="inline-flex items-center gap-1 text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 rounded-full px-2 py-0.5 hover:bg-emerald-500/20"
      title="Open model detail"
    >
      Rank #{rank}
    </button>
  )
}

/* ---------------- Changelog view (mirrors llm-releases.com/changelog) ---------------- */

function ChangelogView({ onOpenModel }: { onOpenModel?: (rankId: string) => void }) {
  const [type, setType] = useState<ChangeType | 'all'>('all')
  const [q, setQ] = useState('')
  const counts = useMemo(() => changeCounts(CHANGE_ITEMS), [])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return CHANGE_ITEMS
      .filter((i) => type === 'all' || i.type === type)
      .filter((i) => !qq || `${i.title} ${i.summary} ${i.provider}`.toLowerCase().includes(qq))
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
  }, [type, q])

  const months = useMemo(() => groupByMonth(filtered), [filtered])

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-bold flex items-center gap-2">
          <Newspaper size={16} className="text-emerald-400" aria-hidden="true" /> Everything, in order
        </h2>
        <p className="text-sm text-white/60 mt-1">
          A single feed of releases, updates, deprecations, and retractions. Each item links to its catalog rank where applicable. Fact-checked {DATA_AS_OF === '2026-09-23' ? 'Sep 23, 2026' : DATA_AS_OF}.
        </p>
        <div className="mt-3 flex flex-col md:flex-row gap-2 md:items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter changelog (e.g. DeepSeek, retired, MIT)"
              aria-label="Filter changelog"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap" role="group" aria-label="Filter by change type">
          {(['all', ...CHANGE_TYPES] as const).map((t) => {
            const active = type === t
            const n = t === 'all' ? CHANGE_ITEMS.length : counts[t]
            const label = t === 'all' ? 'All' : CHANGE_TYPE_META[t].label
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={active}
                className={`px-2.5 py-1 rounded-full border text-xs ${active ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
              >
                {label} · {n}
              </button>
            )
          })}
        </div>
      </div>

      {months.length === 0 && (
        <div className="card p-10 text-center">
          <p className="font-semibold">No changelog entries match.</p>
          <button type="button" onClick={() => { setType('all'); setQ('') }} className="mt-3 btn btn-ghost text-sm">Clear filters</button>
        </div>
      )}

      {months.map((m) => (
        <section key={m.key} aria-label={m.label}>
          <h3 className="font-bold text-sm tracking-widest uppercase text-white/50 px-1 mb-2">{m.label}</h3>
          <ol className="space-y-3">
            {m.items.map((item, idx) => {
              const meta = CHANGE_TYPE_META[item.type]
              return (
                <li key={item.id} className="card p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-white/30 mt-1 w-6 shrink-0" aria-hidden="true">{idx + 1}.</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono bg-black/20 border border-white/10 rounded-full px-2 py-0.5" title={timeAgo(item.date)}>
                          {fmtDay(item.date)} · {timeAgo(item.date)}
                        </span>
                        <span className={`badge ${meta.cls}`}>{meta.label}</span>
                        <RankLink rank={item.rank} onOpenModel={onOpenModel} />
                      </div>
                      <h4 className="font-bold leading-snug mt-2">{item.title}</h4>
                      <p className="text-xs text-white/50 mt-0.5">
                        <span aria-hidden="true">{flag(item.country)} </span>{item.provider} · <Source label={item.source.label} url={item.source.url} />
                      </p>
                      <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}

/* ---------------- Rumor watch view (mirrors llm-releases.com/rumored-releases) ---------------- */

const RUMOR_SECTIONS: { key: string; title: string; blurb: string; statuses: WatchStatus[] }[] = [
  {
    key: 'official',
    title: 'Announced or previewed',
    blurb: 'Models with a vendor announcement, public preview, or clear launch signal, but not yet a normal broadly available release.',
    statuses: ['announced', 'preview'],
  },
  {
    key: 'restricted',
    title: 'Restricted or unavailable',
    blurb: 'Models reported as real but gated, suspended, or limited to vetted partners rather than the broader public.',
    statuses: ['restricted'],
  },
  {
    key: 'rumored',
    title: 'Rumored releases',
    blurb: 'Reports, executive comments, codenames, and launch-window claims that have not yet become public release records.',
    statuses: ['rumored'],
  },
]

function RumorsView() {
  const [status, setStatus] = useState<WatchStatus | 'all'>('all')
  const [provider, setProvider] = useState('all')
  const [sort, setSort] = useState<'new' | 'old' | 'name'>('new')
  const counts = useMemo(() => watchCounts(WATCH_ITEMS), [])
  const providers = useMemo(() => [...new Set(WATCH_ITEMS.map((i) => i.provider))].sort(), [])

  const filtered = useMemo(() => {
    const out = WATCH_ITEMS.filter((i) => status === 'all' || i.status === status)
      .filter((i) => provider === 'all' || i.provider === provider)
    out.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      const ad = a.date ?? (sort === 'new' ? '' : '9999')
      const bd = b.date ?? (sort === 'new' ? '' : '9999')
      return sort === 'new' ? bd.localeCompare(ad) : ad.localeCompare(bd)
    })
    return out
  }, [status, provider, sort])

  const announcedPreview = counts.announced + counts.preview

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-bold flex items-center gap-2">
          <Eye size={16} className="text-violet-400" aria-hidden="true" /> Rumor watch
        </h2>
        <p className="text-sm text-white/60 mt-1">
          Publicly announced models not yet broadly available, limited-access tiers, and speculative reports. Rumors stay labeled until a primary source or public release confirms them.
        </p>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3" role="list" aria-label="Watchlist counts">
          {[
            ['Watchlist', WATCH_ITEMS.length],
            ['Announced', announcedPreview],
            ['Restricted', counts.restricted],
            ['Rumored', counts.rumored],
          ].map(([label, n]) => (
            <div key={label as string} role="listitem" className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl font-extrabold">{n}</div>
              <div className="text-xs text-white/50">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 flex-wrap items-center">
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by status">
            {(['all', ...WATCH_STATUSES] as const).map((s) => {
              const active = status === s
              const n = s === 'all' ? WATCH_ITEMS.length : counts[s]
              const label = s === 'all' ? 'All' : WATCH_STATUS_META[s].label
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 rounded-full border text-xs ${active ? 'bg-violet-500/20 border-violet-500/40 text-violet-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                >
                  {label} · {n}
                </button>
              )
            })}
          </div>
          <label className="text-xs text-white/50 flex items-center gap-1.5">
            Provider
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              aria-label="Filter by provider"
              className="appearance-none px-2.5 py-1 rounded-full bg-[#131C2E] border border-white/10 text-xs text-white/70 cursor-pointer"
            >
              <option value="all">All providers</option>
              {providers.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label className="text-xs text-white/50 flex items-center gap-1.5">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              aria-label="Sort watchlist"
              className="appearance-none px-2.5 py-1 rounded-full bg-[#131C2E] border border-white/10 text-xs text-white/70 cursor-pointer"
            >
              <option value="new">Newest signal</option>
              <option value="old">Oldest signal</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <p className="font-semibold">No watchlist entries match.</p>
          <button type="button" onClick={() => { setStatus('all'); setProvider('all') }} className="mt-3 btn btn-ghost text-sm">Clear filters</button>
        </div>
      )}

      {RUMOR_SECTIONS.map((sec) => {
        const items = filtered.filter((i) => sec.statuses.includes(i.status))
        if (items.length === 0) return null
        return (
          <section key={sec.key} aria-label={sec.title}>
            <h3 className="font-bold mt-2">{sec.title}</h3>
            <p className="text-sm text-white/60 mb-2">{sec.blurb}</p>
            <div className="grid md:grid-cols-2 gap-3">
              {items.map((item) => {
                const meta = WATCH_STATUS_META[item.status]
                return (
                  <article key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`badge ${meta.cls}`}>{meta.label}</span>
                      <span className="text-xs text-white/50 font-mono">
                        {item.date ? <span title={timeAgo(item.date)}>{fmtDay(item.date)} · {timeAgo(item.date)}</span> : 'date TBD'}
                      </span>
                    </div>
                    <h4 className="font-bold leading-snug mt-2">{item.name}</h4>
                    <p className="text-xs text-white/50 mt-0.5">
                      <span aria-hidden="true">{flag(item.country)} </span>{item.provider} · {item.countryName}
                    </p>
                    <p className="text-sm text-white/70 mt-1.5 leading-relaxed">{item.summary}</p>
                    <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      {[
                        ['Access', item.access ?? '—'],
                        ['Context', item.context ?? '—'],
                        ['Params', item.params ?? '—'],
                      ].map(([k, v]) => (
                        <div key={k} className="bg-white/[0.04] rounded-lg p-2 border border-white/5">
                          <dt className="text-[10px] tracking-widest font-bold text-white/40 uppercase">{k}</dt>
                          <dd className="font-semibold mt-0.5 leading-snug">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="text-xs mt-2"><Source label={item.source.label} url={item.source.url} /></p>
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

/* ---------------- Highlights view (existing curated panels) ---------------- */

function HighlightsView() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-bold">Frontier tightness</h3>
          <p className="text-sm text-white/60 mt-1">TB2.1 92.8 (SWE-2, vendor) &gt; 90.6 (V4.1 Flash) &gt; 88.3 (K3) ≈ 88.2 (GLM-5.3) ≈ 87.9 (V4 Pro 0813) &gt; 86.6 (QMax) &gt; 86.1 (Ornith); top-to-6th gap ~6.7 pts across 5-10× hardware. Giants not worth it for single-user — spend on infra for models that fit 512GB.</p>
          <div className="mt-3 h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ n: 'SWE-2', tb: 92.8 }, { n: 'V4.1 Flash', tb: 90.6 }, { n: 'K3', tb: 88.3 }, { n: 'GLM5.3', tb: 88.2 }, { n: 'V4 Pro', tb: 87.9 }, { n: 'QMax', tb: 86.6 }, { n: 'Ornith', tb: 86.1 }]}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="n" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis domain={[80, 95]} tick={{ fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ background: '#131C2E', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="tb" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <h3 className="font-bold">What fits where (Q4)</h3>
          <div className="mt-2 space-y-2 text-xs">
            {[
              ['Qwen27B 17GB', 'Fits 1×5090 ✅ ~200 tok/s'],
              ['MiMo Distill 9B ~6GB', 'Fits 1×5090 ✅ single-GPU'],
              ['AliceAI 80B ~40GB', 'Fits 1×5090 w/ offload or 2×5090'],
              ['Qwen Flash-Next 111GB', 'Fits 1× Pro 6000 or 3×5090'],
              ['MiMo Flash 309B ~155GB', 'Needs 2× Pro 6000 or 4× Spark'],
              ['V4.1 Flash 280GB', '4× Spark (512GB) or 8×80GB; 8B/16B active'],
              ['Ornith 397B 244GB', 'Needs 8×80GB or 4× Spark Q3'],
              ['GLM-5.3/Hy4 372/385GB', 'Needs 8×96GB or B300'],
              ['MiMo Pro 1.02T ~510GB', 'Needs 4× Spark Q3 or B300'],
              ['V4 Pro 800GB+', 'Multi-node / B300 Q2 tight'],
            ].map(([a, b]) => (
              <div key={a} className="flex justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5"><span className="font-mono">{a}</span><span className="text-white/70">{b}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="font-bold">Expected next / pricing watch</h3>
        <p className="text-sm text-white/60 mt-1">Upcoming changes already on record — plan around them, the catalog snapshot predates these.</p>
        <div className="mt-3 grid md:grid-cols-2 gap-3 text-xs">
          {[
            ['Sep 21-22', 'Grok 4.7 shipped / Opus 5.5 + GPT-6 Sol-Luna', 'Grok 4.7 GA Sep 21 ($2/$6). Claude Opus 5.5 + GPT-6 Sol ($2/$10) / Luna ($0.10/$0.50) GA Sep 22. MiMo-V2.6-Pro MIT (AA 46, top open) Sep 21. All in catalog ranks 271-279.'],
            ['Sep 14', 'V4 Pro routing', 'DeepSeek V4 Pro routed Sep 14 12:00 Beijing (after this snapshot); legacy V4 Flash/Vision already retired+routed, billed Flash.'],
            ['Oct 4', 'Ling-3.0-flash-Sante free tier ends', 'API-first free thru Oct 4 via Vercel; Sante-specific weights still unconfirmed, base family MIT.'],
            ['≥Nov 21', 'GPT-5.6 Sol promo ends', 'Sol $4/20 promo holds to ≥Nov 21, then reverts to $5/30.'],
            ['Jan 1 2027', 'Gemini 3.8 Flash intro doubles', 'Intro $0.75/$3.75 → $1.50/$7.50 after Dec 31 2026.'],
          ].map(([d, t, desc]) => (
            <div key={t} className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-black/20 border border-white/10 rounded-full px-2 py-0.5">{d}</span>
                <span className="font-bold">{t}</span>
              </div>
              <p className="text-white/60 mt-1 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">Pricing that broke single-number models Aug 16-21: DeepSeek V4 Pro flat $0.435/0.87 → $0.66/1.98 off-peak $1.32/3.96 peak (price increase), V4 Flash $0.14/0.28 → $0.22/0.66 off / $0.44/1.32 peak, Sol $5/30 → $4/20 promo to ≥Nov21, Sonnet 5 $3/15 rise cancelled `$2/10 standard`, Gemini intro $0.75/3.75 → doubles $1.50/7.50 Jan 1 2027.</div>
    </div>
  )
}

/* ---------------- Tracker shell ---------------- */

export default function Tracker({ onOpenModel }: { onOpenModel?: (rankId: string) => void }) {
  const [view, setView] = useState<TView>(tviewFromUrl)

  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (view === 'changelog') url.searchParams.delete('tview')
      else url.searchParams.set('tview', view)
      window.history.replaceState(null, '', url.toString())
    } catch { /* ignore */ }
  }, [view ])

  return (
    <div className="space-y-4">
      <div className="card p-3 flex items-center gap-2 flex-wrap" role="tablist" aria-label="Tracker views">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold px-1">
          <Sparkles size={14} className="text-violet-400" aria-hidden="true" /> Sep tracker
        </span>
        {VIEWS.map((v) => {
          const Icon = v.icon
          const active = view === v.value
          return (
            <button
              key={v.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setView(v.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${active ? 'bg-violet-500/20 border-violet-500/40 text-violet-200' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
            >
              <Icon size={13} aria-hidden="true" /> {v.label}
            </button>
          )
        })}
        <span className="ml-auto text-xs text-white/40">All scores vendor-reported unless AA / Scale / BenchLM</span>
      </div>

      {view === 'changelog' && <ChangelogView onOpenModel={onOpenModel} />}
      {view === 'rumors' && <RumorsView />}
      {view === 'highlights' && <HighlightsView />}
    </div>
  )
}
