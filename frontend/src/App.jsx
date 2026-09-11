import { useState, useMemo } from 'react'
import raw from './data.json'
import { Search, Cpu, Zap, Award, BarChart3, Layers, IndianRupee, Filter, X, ChevronDown, HardDrive, ArrowUpRight, Check, Sparkles, Timer, Scale, Database } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, Cell } from 'recharts'

const allModels = raw.all_coding_models || raw

function parsePct(v){
  if(!v || v==='-' ) return null
  const m = String(v).match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
}
function parseQ4(v){
  if(v==null) return null
  const s = String(v).replace(/~/g,'').trim()
  if(s==='?' || s==='-' ) return null
  const m = s.match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
}
function licenseBadge(lic){
  const l = String(lic||'').toLowerCase()
  if(!isOpenWeight(lic)){
    if(l.includes('api-only') || (l.includes('proprietary') && (l.includes('available') || l.includes('preview') || l.includes('ga')))) return {label:'API-only', cls:'bg-amber-500/15 text-amber-400 border-amber-500/30'}
    if(l.includes('closed') || l.includes('proprietary') || l.includes('gated')) return {label:'Closed', cls:'bg-zinc-500/15 text-zinc-400 border-white/10'}
    return {label: lic, cls:'bg-white/5 text-zinc-300 border-white/10'}
  }
  if(l.includes('apache')) return {label:'Apache 2.0', cls:'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'}
  if(/\bmit\b/.test(l)) return {label:'MIT', cls:'bg-blue-500/15 text-blue-400 border-blue-500/30'}
  if(l.includes('qwen community')) return {label:'Qwen Comm 1.0', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
  if(l.includes('qwen license')) return {label:'Qwen (open)', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
  if(l.includes('kimi k3 license')) return {label:'Kimi (open)', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
  if(l.includes('custom (open weights')) return {label:'Open (custom)', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
  if(l.includes('openmdw')) return {label:'OpenMDW-1.1', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
  return {label:'Open', cls:'bg-violet-500/15 text-violet-400 border-violet-500/30'}
}
function isOpenWeight(lic){
  const l = String(lic||'').toLowerCase()
  if(l.includes('closed') || l.includes('proprietary') || l.trim()==='tbd' || l.startsWith('tbd ') || l.includes('api-only') || l.includes('api-tier')) return false
  return l.includes('open') || l.includes('apache') || /\bmit\b/.test(l) || l.includes('qwen community') || l.includes('qwen license') || l.includes('openmdw') || l.includes('custom (open weights') || l.includes('kimi k3 license')
}

const providers = [...new Set(allModels.map(m=>m.provider))].sort()
const licenses = [...new Set(allModels.map(m=>m.license))].sort()

const hardwareTiers = [
  { id:'1x5090', label:'1× RTX 5090 32GB', vram:32, cost:'₹5L', tok:'~200 tok/s Qwen27B' },
  { id:'2x5090', label:'2× 5090 64GB', vram:64, cost:'₹10-11L', tok:'V4 Flash offload ~25' },
  { id:'4x5090', label:'4× 5090 128GB', vram:128, cost:'₹25-30L', tok:'Q3 ~60-80' },
  { id:'1xPro6000', label:'1× Pro 6000 96GB', vram:96, cost:'₹40-48L', tok:'Qwen ~200' },
  { id:'2xPro6000', label:'2× Pro 6000 192GB', vram:192, cost:'₹85L-1Cr', tok:'V4 Flash 243 tok/s FP8' },
  { id:'4xSpark', label:'4× DGX Spark 512GB', vram:512, cost:'₹22-30L', tok:'GLM-5.3 25-35' },
  { id:'B300', label:'DGX B300 2.1TB', vram:2100, cost:'₹5.5Cr', tok:'All models' },
]

function fitsModel(q4, tierVram){
  if(q4==null) return null
  // Weights-only fit; docs note +10-15GB runtime + KV on top, so treat within 15% as tight
  if(q4 <= tierVram*0.85) return 'fit'
  if(q4 <= tierVram) return 'tight'
  if(q4 <= tierVram*1.4) return 'tight'
  return 'no'
}

export default function App(){
  const [tab, setTab] = useState('explorer')
  const [q, setQ] = useState('')
  const [provider, setProvider] = useState('all')
  const [license, setLicense] = useState('all')
  const [openOnly, setOpenOnly] = useState(false)
  const [maxQ4, setMaxQ4] = useState('all')
  const [sort, setSort] = useState('rank')
  const [compare, setCompare] = useState([])
  const [detail, setDetail] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Cost calc state
  const [tokPerDay, setTokPerDay] = useState(1_000_000_000)
  const [cacheHit, setCacheHit] = useState(70)
  const [outputPct, setOutputPct] = useState(1)

  const stats = useMemo(()=>{
    const open = allModels.filter(m=> isOpenWeight(m.license)).length
    const closed = allModels.length - open
    const withSWE = allModels.filter(m=> parsePct(m.swe_bench_verified)!=null).length
    const avgQ4 = allModels.filter(m=> parseQ4(m.full_q4_vram_gb)!=null).length
    return { total: allModels.length, open, closed, withSWE, avgQ4 }
  },[])

  const filtered = useMemo(()=>{
    let out = [...allModels]
    if(q){
      const qq = q.toLowerCase()
      out = out.filter(m=> (m.model+' '+m.provider).toLowerCase().includes(qq))
    }
    if(provider!=='all') out = out.filter(m=> m.provider===provider)
    if(license!=='all') out = out.filter(m=> m.license===license)
    if(openOnly) out = out.filter(m=> isOpenWeight(m.license))
    if(maxQ4!=='all'){
      const lim = parseFloat(maxQ4)
      out = out.filter(m=>{
        const q4 = parseQ4(m.full_q4_vram_gb)
        return q4!=null && q4 <= lim
      })
    }
    out.sort((a,b)=>{
      if(sort==='rank') return parseInt(a.rank)-parseInt(b.rank)
      if(sort==='recent') return parseInt(b.rank)-parseInt(a.rank)
      if(sort==='frontier'){
        const tb=(parsePct(b.terminal_bench)||-1)-(parsePct(a.terminal_bench)||-1)
        if(tb!==0) return tb
        return (parsePct(b.swe_bench_verified)||-1)-(parsePct(a.swe_bench_verified)||-1)
      }
      if(sort==='swev') return (parsePct(b.swe_bench_verified)||-1) - (parsePct(a.swe_bench_verified)||-1)
      if(sort==='tb') return (parsePct(b.terminal_bench)||-1) - (parsePct(a.terminal_bench)||-1)
      if(sort==='lcb') return (parsePct(b.livecodebench_v6)||-1) - (parsePct(a.livecodebench_v6)||-1)
      if(sort==='q4') return (parseQ4(a.full_q4_vram_gb)||9999) - (parseQ4(b.full_q4_vram_gb)||9999)
      if(sort==='price_in') return (a.price_in_usd_per_mtok||999) - (b.price_in_usd_per_mtok||999)
      return 0
    })
    return out
  },[q, provider, license, openOnly, maxQ4, sort])

  const leaderboardTB = useMemo(()=> allModels.filter(m=> parsePct(m.terminal_bench)!=null).sort((a,b)=> parsePct(b.terminal_bench)-parsePct(a.terminal_bench)).slice(0,12),[])
  const leaderboardSWE = useMemo(()=> allModels.filter(m=> parsePct(m.swe_bench_verified)!=null).sort((a,b)=> parsePct(b.swe_bench_verified)-parsePct(a.swe_bench_verified)).slice(0,12),[])
  const leaderboardLCB = useMemo(()=> allModels.filter(m=> parsePct(m.livecodebench_v6)!=null).sort((a,b)=> parsePct(b.livecodebench_v6)-parsePct(a.livecodebench_v6)).slice(0,10),[])

  const hwModels = useMemo(()=> allModels.filter(m=> parseQ4(m.full_q4_vram_gb)!=null && parsePct(m.swe_bench_verified)!=null).sort((a,b)=> (parsePct(b.swe_bench_verified)||-1) - (parsePct(a.swe_bench_verified)||-1)).slice(0,30),[])

  const toggleCompare = (id)=>{
    setCompare(c=> c.includes(id) ? c.filter(x=>x!==id) : c.length>=4 ? c : [...c, id])
  }

  const compareModels = allModels.filter(m=> compare.includes(m.id))

  // cost math
  const dailyBudget = useMemo(()=>{
    const input = tokPerDay * (1 - outputPct/100)
    const output = tokPerDay * (outputPct/100)
    const hit = input * cacheHit/100
    const miss = input - hit
    // pick representative models — Sep 10 online-verified per-token $/Mtok (off-peak where tiered)
    const sample = [
      { name:'DeepSeek V4.1 Flash (off-peak)', in:0.15, out:0.60, hit:0.003 },
      { name:'DeepSeek V4.1 Flash (peak)', in:0.30, out:1.20, hit:0.006 },
      { name:'GPT-5.6 Sol (promo)', in:4.0, out:20.0, hit:0.4 },
      { name:'Kimi K3', in:3.0, out:15.0, hit:0.30 },
      { name:'GLM-5.3-Flash', in:0.15, out:0.50, hit:0.03 },
      { name:'Gemini 3.8 Flash (intro)', in:0.75, out:3.75, hit:0.075 },
      { name:'Muse Spark 1.3', in:1.25, out:4.25, hit:0.15 },
      { name:'Fable 5.1', in:10.0, out:50.0, hit:0.25 },
      { name:'GPT-6 Astra', in:10.0, out:50.0, hit:1.0 },
      { name:'Qwen3.8-27B (local-like)', in:0.45, out:3.2, hit:0.02 },
    ]
    return sample.map(s=>{
      const cost = (miss/1e6)*s.in + (hit/1e6)*s.hit + (output/1e6)*s.out
      return { name:s.name, day:cost, mo:cost*30, yr:cost*365, in:s.in, out:s.out }
    })
  },[tokPerDay, cacheHit, outputPct])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl" style={{background:'rgba(11,17,32,0.85)', borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white" style={{background:'linear-gradient(135deg,#10B981,#8B5CF6)'}}>AI</div>
            <div className="min-w-0">
              <h1 className="text-[15px] md:text-[16px] font-extrabold leading-none tracking-tight">Local AI Coding Models — India</h1>
              <p className="text-[11px] text-white/60 hidden sm:block">{stats.total} models (CSV ranks 1-267 single source of truth) · Online re-verified Sep 10, 2026 · ₹95.12/USD · Private / local-first</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" className="hidden md:inline-flex btn btn-ghost text-xs py-2">CSV + JSON</a>
            <span className="hidden md:inline-flex badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Verified Sep 10</span>
            <span className="badge bg-violet-500/15 text-violet-300 border-violet-500/30 text-[10px]">{stats.total} models</span>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-3 flex items-center gap-2 overflow-x-auto">
          {[
            {id:'explorer', label:'Explorer', icon: Search, count: filtered.length},
            {id:'leaderboard', label:'Leaderboards', icon: Award},
            {id:'hardware', label:'Hardware Fit', icon: HardDrive},
            {id:'cost', label:'Cost Calculator', icon: IndianRupee},
            {id:'compare', label:'Compare', icon: Scale},
            {id:'tracker', label:'Aug Tracker', icon: Timer},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition ${tab===t.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'}`}>
              <t.icon size={14}/>{t.label}{t.count!=null && <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${tab===t.id?'bg-black/10':'bg-white/10'}`}>{t.count}</span>}
            </button>
          ))}
        </div>
      </header>

      {/* KPI strip */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          {k:'Total models', v: stats.total, s:'CSV 1-267, online Sep 10', icon: Database},
          {k:'Open-weight', v: stats.open, s:`${Math.round(stats.open/stats.total*100)}% open`, icon: Layers},
          {k:'With SWE-V', v: stats.withSWE, s:'have SWE-bench Verified', icon: Award},
          {k:'With Q4 size', v: stats.avgQ4, s:'have Q4 VRAM', icon: Cpu},
          {k:'Best Q4 fit', v:'Qwen 27B', s:'17 GB → 200 tok/s on 1×5090', icon: Zap},
        ].map(card=>(
          <div key={card.k} className="card p-3">
            <div className="flex items-center gap-2 text-[11px] tracking-widest font-bold text-white/50 uppercase"><card.icon size={12}/>{card.k}</div>
            <div className="text-xl font-extrabold mt-1">{card.v}</div>
            <div className="text-xs text-white/50">{card.s}</div>
          </div>
        ))}
      </div>

      {/* Recent releases pointer — Tracker tab has the curated, dated list */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-4">
        <div className="card p-4 bg-violet-500/5 border-violet-500/20">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-violet-400"/>
            <span className="font-bold">New frontier releases</span>
            <span className="ml-auto badge bg-violet-500/15 text-violet-400 border-violet-500/30 text-[10px]">Tracker tab</span>
          </div>
          <p className="text-xs text-white/50 mt-1">The <b>Tracker</b> tab has a curated, date-sorted list of Sep 2026 releases with full details. This Explorer view is ranked by benchmark performance, not release date.</p>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-10">
        {tab==='explorer' && (
          <div className="space-y-4">
            {/* Controls */}
            <div className="card p-3 md:p-4">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search model or provider (e.g. Qwen, DeepSeek, GLM)" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50"/>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select value={provider} onChange={e=>setProvider(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm">
                    <option value="all">All providers</option>
                    {providers.map(p=> <option key={p} value={p}>{p}</option>)}
                  </select>
                  <select value={license} onChange={e=>setLicense(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm">
                    <option value="all">All licenses</option>
                    {licenses.map(l=> <option key={l} value={l}>{l}</option>)}
                  </select>
                  <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm">
                    <option value="rank">Sort: Rank</option>
                    <option value="recent">Sort: Newest (rank ↓)</option>
                    <option value="frontier">Sort: Frontier TB ↓</option>
                    <option value="swev">Sort: SWE-V ↓</option>
                    <option value="tb">Sort: Terminal-Bench ↓</option>
                    <option value="lcb">Sort: LiveCodeBench ↓</option>
                    <option value="q4">Sort: Q4 small→big</option>
                    <option value="price_in">Sort: Cheapest in</option>
                  </select>
                  <button onClick={()=>setShowFilters(v=>!v)} className="btn btn-ghost text-sm"><Filter size={14}/> Filters <ChevronDown size={14} className={`transition ${showFilters?'rotate-180':''}`}/></button>
                </div>
              </div>
              {showFilters && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/5">
                  <label className="flex items-center gap-2 text-sm bg-white/5 rounded-xl px-3 py-2 border border-white/10 cursor-pointer">
                    <input type="checkbox" checked={openOnly} onChange={e=>setOpenOnly(e.target.checked)} className="accent-emerald-500"/> Open-weight only
                  </label>
                  <select value={maxQ4} onChange={e=>setMaxQ4(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm">
                    <option value="all">Any Q4 size</option>
                    <option value="16">Fits ≤16GB (5090 Q4)</option>
                    <option value="32">Fits ≤32GB (1×5090)</option>
                    <option value="96">Fits ≤96GB (1× Pro 6000)</option>
                    <option value="192">Fits ≤192GB (2× Pro)</option>
                    <option value="512">Fits ≤512GB (4× Spark)</option>
                  </select>
                  <div className="text-xs text-white/50 flex items-center gap-2"><Check size={12} className="text-emerald-400"/> {filtered.length} / {allModels.length} shown</div>
                  <button onClick={()=>{setQ('');setProvider('all');setLicense('all');setOpenOnly(false);setMaxQ4('all');setSort('rank')}} className="text-xs text-white/70 underline">Clear all</button>
                </div>
              )}
            </div>

            {/* Compare bar */}
            {compare.length>0 && (
              <div className="card p-3 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold">Compare ({compare.length}/4):</span>
                {compareModels.map(m=>(
                  <span key={m.id} className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full pl-3 pr-1 py-1 text-sm">
                    {m.model} <button onClick={()=>toggleCompare(m.id)} className="w-6 h-6 rounded-full bg-white/10 grid place-items-center"><X size={12}/></button>
                  </span>
                ))}
                <button onClick={()=>setCompare([])} className="ml-auto btn btn-ghost text-xs py-1">Clear</button>
                {compare.length>=2 && <button onClick={()=>setTab('compare')} className="btn btn-primary text-xs py-1">View comparison <ArrowUpRight size={12}/></button>}
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map(m=>{
                const swe = parsePct(m.swe_bench_verified)
                const tb = parsePct(m.terminal_bench)
                const lcb = parsePct(m.livecodebench_v6)
                const q4 = parseQ4(m.full_q4_vram_gb)
                const lic = licenseBadge(m.license)
                const isSel = compare.includes(m.id)
                return (
                  <div key={m.id} className={`card p-4 hover:border-white/15 transition group ${isSel?'ring-1 ring-emerald-500 border-emerald-500/30':''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{m.rank}</span>
                          <span className={`badge ${lic.cls}`}>{lic.label}</span>
                          {m.is_free && <span className="badge bg-emerald-500/15 text-emerald-400 border-emerald-500/30">Free</span>}
                        </div>
                        <h3 className="font-bold leading-tight mt-2 line-clamp-2">{m.model}</h3>
                        <p className="text-xs text-white/50">{m.provider} · {m.total_parameters} {m.active_parameters!=='Unknown' && m.active_parameters?`/ ${m.active_parameters} active`:''} · {m.context_window}</p>
                      </div>
                      <button onClick={()=>toggleCompare(m.id)} className={`w-8 h-8 rounded-full grid place-items-center border text-xs shrink-0 ${isSel?'bg-emerald-500 text-white border-emerald-500':'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>{isSel ? <Check size={14}/> : '+'}</button>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        {label:'SWE-V', v:swe, max:100},
                        {label:'TB 2.1', v:tb, max:100},
                        {label:'LCB V6', v:lcb, max:100},
                      ].map(b=>(
                        <div key={b.label} className="bg-white/[0.04] rounded-xl p-2 border border-white/5">
                          <div className="text-[11px] tracking-widest font-bold text-white/40">{b.label}</div>
                          <div className="text-sm font-extrabold">{b.v!=null ? b.v.toFixed(1)+'%' : '—'}</div>
                          <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden"><div className="h-full bg-emerald-500" style={{width: b.v!=null? `${b.v}%` : '0%'}}/></div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Q4 {q4!=null? q4+' GB':'—'}</span>
                      {m.price_in_usd_per_mtok!=null && <span className="px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">${m.price_in_usd_per_mtok}/$ {m.price_out_usd_per_mtok} /M</span>}
                      {q4!=null && q4<=32 && <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Fits 1×5090</span>}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>setDetail(m)} className="flex-1 btn btn-ghost text-xs py-2">Details</button>
                      <a href={`https://huggingface.co/models?search=${encodeURIComponent(m.model)}`} target="_blank" className="btn btn-ghost text-xs py-2 px-3"><ArrowUpRight size={12}/> HF</a>
                    </div>
                  </div>
                )
              })}
</div>
            </div>
        )}

        {tab==='compare' && (
          <div className="space-y-4">
            {compareModels.length<2 ? (
              <div className="card p-10 text-center">
                <Scale className="mx-auto text-white/30" />
                <p className="mt-3 font-semibold">Select 2-4 models in Explorer to compare</p>
                <button onClick={()=>setTab('explorer')} className="mt-3 btn btn-primary">Go to Explorer</button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Comparison</h2>
                  <button onClick={()=>setTab('explorer')} className="ml-auto btn btn-ghost text-xs">Back</button>
                  <button onClick={()=>setCompare([])} className="btn btn-ghost text-xs">Clear</button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="card p-4">
                    <h3 className="font-bold mb-3 flex items-center gap-2"><BarChart3 size={16}/> SWE-Bench Verified</h3>
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={compareModels.map(m=>({name:m.model.split(' ')[0], v: parsePct(m.swe_bench_verified)||0}))}>
                          <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                          <XAxis dataKey="name" tick={{fontSize:10, fill:'#94A3B8'}} interval={0} angle={-20} textAnchor="end" height={60}/>
                          <YAxis domain={[0,100]} tick={{fill:'#94A3B8'}}/>
                          <Tooltip contentStyle={{background:'#131C2E', border:'1px solid rgba(255,255,255,0.1)'}}/>
                          <Bar dataKey="v" fill="#10B981" radius={[8,8,0,0]}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="card p-4">
                    <h3 className="font-bold mb-3 flex items-center gap-2"><Zap size={16}/> Q4 VRAM vs Price (bubble)</h3>
                    <div className="h-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                          <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                          <XAxis type="number" dataKey="q4" name="Q4 GB" tick={{fill:'#94A3B8'}} domain={[0, 'auto']}/>
                          <YAxis type="number" dataKey="price" name="$ in/M" tick={{fill:'#94A3B8'}}/>
                          <Tooltip contentStyle={{background:'#131C2E', border:'1px solid rgba(255,255,255,0.1)'}} cursor={{strokeDasharray:'3 3'}}/>
                          <Scatter data={compareModels.map(m=>({q4: parseQ4(m.full_q4_vram_gb)||0, price: m.price_in_usd_per_mtok||0, name:m.model}))}>
                            {compareModels.map((_,i)=> <Cell key={i} fill={['#10B981','#8B5CF6','#F59E0B','#06B6D4'][i%4]}/>)}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="card overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs tracking-widest uppercase text-white/50 border-b border-white/5">
                      <tr><th className="text-left p-3">Field</th>{compareModels.map(m=> <th key={m.id} className="text-left p-3">{m.model}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        ['Provider', m=>m.provider],
                        ['Params', m=> `${m.total_parameters} / ${m.active_parameters}`],
                        ['Q4 VRAM', m=> m.full_q4_vram_gb ?? '—'],
                        ['License', m=> m.license],
                        ['Context', m=> m.context_window],
                        ['SWE-V', m=> m.swe_bench_verified ?? '—'],
                        ['SWE-Pro', m=> m.swe_bench_pro ?? '—'],
                        ['LCB V6', m=> m.livecodebench_v6 ?? '—'],
                        ['TB 2.1', m=> m.terminal_bench ?? '—'],
                        ['Price in/out $/M', m=> m.price_in_usd_per_mtok!=null ? `$${m.price_in_usd_per_mtok}/$${m.price_out_usd_per_mtok}` : '—'],
                        ['Price INR', m=> m.price_in_inr_per_mtok!=null ? `₹${m.price_in_inr_per_mtok}/₹${m.price_out_inr_per_mtok}` : '—'],
                      ].map(([label, fn])=>(
                        <tr key={label} className="hover:bg-white/[0.03]"><td className="p-3 font-semibold text-white/70">{label}</td>{compareModels.map(m=> <td key={m.id} className="p-3">{fn(m)}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {tab==='leaderboard' && (
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {title:'Terminal-Bench 2.1', data: leaderboardTB, key:'terminal_bench', icon: Zap},
              {title:'SWE-bench Verified', data: leaderboardSWE, key:'swe_bench_verified', icon: Award},
              {title:'LiveCodeBench V6', data: leaderboardLCB, key:'livecodebench_v6', icon: BarChart3},
            ].map(board=>(
              <div key={board.title} className="card p-4">
                <h3 className="font-bold flex items-center gap-2"><board.icon size={16} className="text-emerald-400"/>{board.title}</h3>
                <p className="text-xs text-white/50 mb-3">Vendor-reported; Scale standardized open best 38.7% vs 59.1% proprietary.</p>
                <div className="space-y-2">
                  {board.data.map((m,i)=>(
                    <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10">
                      <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-black ${i<3?'bg-amber-500 text-black':'bg-white/10 text-white/70'}`}>{i+1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate">{m.model}</div>
                        <div className="text-xs text-white/50">{m.provider} · {m.license}</div>
                      </div>
                      <div className="text-sm font-mono font-bold text-emerald-400">{m[board.key]}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={board.data.map(m=>({name: m.model.split(' ').slice(0,2).join(' '), v: parsePct(m[board.key])||0}))} layout="vertical">
                      <XAxis type="number" domain={[0,100]} hide/>
                      <YAxis dataKey="name" type="category" width={90} tick={{fontSize:10, fill:'#94A3B8'}}/>
                      <Tooltip contentStyle={{background:'#131C2E', border:'1px solid rgba(255,255,255,0.1)'}}/>
                      <Bar dataKey="v" fill="#10B981" radius={[0,8,8,0]} barSize={10}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
            <div className="lg:col-span-3 card p-4">
              <h3 className="font-bold">Note: harness matters</h3>
              <p className="text-sm text-white/60 mt-1">TB 2.1 tight 88.3≈88.2≈87.9 (K3≈GLM-5.3≈V4 Pro), DeepSWE 67.5&gt;66.9&gt;64.3, LCB 91.9 Flash-Next &gt;90.3 27B. Scale standardized (identical mini-SWE-agent): best open 38.7% vs proprietary 59.1% — vendor +10-20 pts inflation. Use standardized for apples-to-apples.</p>
            </div>
          </div>
        )}

        {/* Hardware Fit matrix — independent, top 30 by SWE-V */}
        {tab==='hardware' && (
          <div className="space-y-4">
            <div className="card p-4">
              <h2 className="font-bold flex items-center gap-2"><HardDrive size={16}/> Hardware Fit Matrix (Q4 weights)</h2>
              <p className="text-sm text-white/60">Top 30 models by SWE-bench Verified (descending) that have Q4 VRAM data. Independent of Explorer filters.</p>
              <div className="overflow-auto mt-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-2 sticky left-0 bg-[#131C2E]">Model (Q4)</th>
                      {hardwareTiers.map(h=> <th key={h.id} className="p-2 text-center min-w-[110px]"><div className="font-bold">{h.label}</div><div className="font-normal text-white/50">{h.cost} · {h.vram}GB</div></th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {hwModels.map(m=>{
                      const q4 = parseQ4(m.full_q4_vram_gb)
                      return (
                        <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                          <td className="p-2 sticky left-0 bg-[#131C2E]"><div className="font-semibold">{m.model.slice(0,28)}</div><div className="text-white/50">{q4}GB · {m.provider}</div></td>
                          {hardwareTiers.map(h=>{
                            const fit = fitsModel(q4, h.vram)
                            return <td key={h.id} className="p-2 text-center"><span className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-xs font-bold ${fit==='fit'?'bg-emerald-500 text-white': fit==='tight'?'bg-amber-500 text-black':'bg-white/10 text-white/30'}`}>{fit==='fit'?'✓': fit==='tight'?'~':'×'}</span></td>
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {hardwareTiers.map(h=>(
                <div key={h.id} className="card p-4">
                  <div className="text-sm font-bold">{h.label}</div>
                  <div className="text-xs text-white/50">{h.vram}GB VRAM/unified · {h.cost} India street · {h.tok}</div>
                  <div className="mt-2 text-xs">Fits {allModels.filter(m=>{const q=parseQ4(m.full_q4_vram_gb); return q!=null && q<=h.vram}).length} / {stats.avgQ4} Q4 models</div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width: `${Math.round(allModels.filter(m=>{const q=parseQ4(m.full_q4_vram_gb); return q!=null && q<=h.vram}).length / stats.avgQ4 *100)}%`}}/></div>
                </div>
              ))}
            </div>
            <div className="card p-4 text-sm text-white/60">
              <p><b>India picks Aug 2026 street, 5-yr TCO:</b> Best value `1×5090 ~₹5L → Qwen27B 200 tok/s`, Balanced `2× DGX Spark ~₹10-11L → V4 Flash 40 tok/s`, 4× Spark ~₹22-30L runs GLM-5.3+H y4+Flash, `DGX B300 2.1TB ~₹5.5Cr` any model `README.md:149`.</p>
            </div>
          </div>
        )}

        {tab==='cost' && (
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 card p-4 space-y-4">
              <h2 className="font-bold flex items-center gap-2"><IndianRupee size={16}/> Cost Calculator</h2>
              <p className="text-xs text-white/50">99% input / 1% output agentic loop. ₹95.12/USD `ai_coding_api_vs_local_summary.json:9`.</p>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/60">Tokens / day (input+output)</label>
                <input type="range" min={100_000_000} max={5_000_000_000} step={100_000_000} value={tokPerDay} onChange={e=>setTokPerDay(parseInt(e.target.value))} className="w-full accent-emerald-500"/>
                <div className="flex justify-between text-xs font-mono"><span>{(tokPerDay/1e9).toFixed(1)}B</span><span>{tokPerDay.toLocaleString()} tok</span></div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/60">Cache hit % (prompt caching)</label>
                <input type="range" min={0} max={95} step={5} value={cacheHit} onChange={e=>setCacheHit(parseInt(e.target.value))} className="w-full accent-violet-500"/>
                <div className="text-xs font-mono">{cacheHit}% hit → {(100-cacheHit)}% miss recompute</div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/60">Output % (default 1% for agentic 99/1)</label>
                <input type="range" min={1} max={10} step={1} value={outputPct} onChange={e=>setOutputPct(parseInt(e.target.value))} className="w-full accent-amber-500"/>
                <div className="text-xs font-mono">{outputPct}% output / {100-outputPct}% input</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm">
                At {(tokPerDay/1e9).toFixed(1)}B tok/day, API cache-hit input ~₹10-30/M vs miss ₹400-800/M `100k_concurrent_ai_coding_service.md:126` is where self-host wins.
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {dailyBudget.map(row=>(
                <div key={row.name} className="card p-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-[180px]">
                    <div className="font-bold text-sm">{row.name}</div>
                    <div className="text-xs text-white/50">${row.in}/$ {row.out} per M · hit $ misc</div>
                  </div>
                  <div className="flex gap-4 flex-1 justify-end text-center">
                    <div><div className="text-xs text-white/50">Per day</div><div className="font-mono font-bold">₹{Math.round(row.day*95.12).toLocaleString()}</div></div>
                    <div><div className="text-xs text-white/50">Per 30d</div><div className="font-mono font-bold text-emerald-400">₹{(row.mo*95.12/100000).toFixed(1)}L</div></div>
                    <div><div className="text-xs text-white/50">Per yr</div><div className="font-mono font-bold">₹{(row.yr*95.12/10000000).toFixed(1)}Cr</div></div>
                  </div>
                </div>
              ))}
              <div className="card p-4">
                <h3 className="font-bold text-sm">Local hardware (5-yr TCO) vs API</h3>
                <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">1×5090 ₹5L</div><div className="text-xs text-white/50">Qwen27B 200tok/s. API breakeven ~1.2 yr at 1B/day uncached V4 Flash `ai_coding_api_vs_local_summary.json:183`</div></div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">4× Spark ₹24-30L</div><div className="text-xs text-white/50">GLM-5.3+V4.1 Flash+Qwen. Only sub-crore that runs all 3 `single_user_india_local_ai.md:333`</div></div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10"><div className="font-bold">12-rack Rubin ₹775Cr</div><div className="text-xs text-white/50">Top-10 models 100k concurrent, ₹2,450/mo break-even `100k_concurrent_ai_coding_service.md:105`</div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==='tracker' && (
          <div className="space-y-4">
            <div className="card p-4">
              <h2 className="font-bold flex items-center gap-2"><Sparkles size={16} className="text-violet-400"/> Sep 2-10 Release Tracker (online re-verified Sep 10, 2026)</h2>
              <p className="text-sm text-white/60">DeepSeek docs + Anthropic docs + Google AI docs + llm-releases.com (349) + AA v4.3. All scores vendor-reported unless AA/Scale.</p>
              <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
                {[
                  {date:'Sep 10', name:'DeepSeek V4.1 Flash (open weights)', badge:'MIT', desc:'HF deepseek-ai/DeepSeek-V4.1-Flash — MIT weights, 763B (~382GB Q4), 48 shards ~510GB FP8, KV-cache compression, vision. Vendor evals @1M ctx: TB2.1 90.6, DeepSWE v1.1 74.2, GPQA-D 90.9, HLE-tools 63.9. API deepseek-flash off-peak $0.15/$0.60 cache $0.003; peak $0.30/$1.20 cache $0.006; Novita live ~126 tok/s $1.20 out. Legacy V4 Flash/Vision retired+routed (billed Flash); V4 Pro routed Sep 14 12:00 Beijing.', cls:'border-emerald-500/30 bg-emerald-500/10'},
                  {date:'Sep 10', name:'Ling-3.0-flash-VL (AA)', badge:'Open*', desc:'Vision variant of Ling-3.0-flash, AA-evaluated Sep 10. Sante-style weights unconfirmed; base family MIT.', cls:'border-white/10 bg-white/5'},
                  {date:'Sep 8', name:'Mercury 2.5 (GA)', badge:'Proprietary', desc:'Preview Aug 31 → GA Sep 8. Diffusion LM, 260K $0.20/$0.75. AA-evaluated Sep 8.', cls:'border-white/10 bg-white/5'},
                  {date:'Sep 7', name:'MiniCPM5-2B', badge:'Apache 2.0', desc:'~2.5B dense, 131K, text+vision, ~2GB Q4. Avg 53.9 over 34 benchmarks — strongest open <4B. AA-evaluated Sep 7.', cls:'border-emerald-500/30 bg-emerald-500/10'},
                  {date:'Sep 3-4', name:'GPT-6 Astra / Astra Pro', badge:'Proprietary', desc:'Astra 1M $10/$50 (TB4.0 57.7%, OSWorld 72.6%, GPQA 96.0%, HLE-tools 57.2%); Pro 1.05M same $10/$50 cache $1.00 reasoning.mode pro. AA v4.3 max/xhigh ~53. Daybreak-gated cyber.', cls:'border-violet-500/30 bg-violet-500/10'},
                  {date:'Sep 4', name:'Ling-3.0-flash-Sante', badge:'Open*', desc:'124B/5.1B MoE 262K medical-tuned. API-first (free thru Oct 4 Vercel); Sante-specific weights unconfirmed, base MIT.', cls:'border-white/10 bg-white/5'},
                  {date:'Sep 4', name:'Ling-3.0-flash-Fin weights', badge:'MIT', desc:'Weights posted Sep 4 HF inclusionAI/Ling-3.0-flash-Fin. DeepInfra $0.06/$0.18.', cls:'border-emerald-500/30 bg-emerald-500/10'},
                  {date:'Sep 3', name:'K2 Horizon 375B-A23B', badge:'Apache 2.0', desc:'Flagship of 6-model 0.9B→375B family (IFM/MBZUAI). Fully open: weights+data+code+checkpoints+logs. ~200GB Q4. AA-evaluated Sep 3.', cls:'border-emerald-500/30 bg-emerald-500/10'},
                  {date:'Sep 2', name:'Gemini 3.8 Flash Cyber', badge:'Proprietary', desc:'Fairwind-gated vuln detection/patching twin of 3.8 Flash. Same $0.75/$3.75 intro base.', cls:'border-white/10 bg-white/5'},
                  {date:'Sep 2', name:'Quasar 438B', badge:'TBD', desc:'438B listed Sep 2 on BenchLM/ThursdAI (Multiverse Computing). Sparse details — announced-but-unconfirmed.', cls:'border-white/10 bg-white/5'},
                  {date:'Sep 2', name:'Qwen3.8-Max-0902', badge:'Proprietary', desc:'Same 2.4T/95B 1M, TB3.0 29.0% (+17.7 vs 11.3% 2.6×), DeepSWE 69.3% vs 56.6%, NL2Repo 64.9%. Refresh, $2/$6 unchanged. API-only.', cls:'border-violet-500/30 bg-violet-500/10'},
                  {date:'Sep 2', name:'Muse Spark 1.3', badge:'Proprietary', desc:'1M ctx $1.25/$4.25. Launch AA 61/62 superseded by AA v4.3 re-score 48. $1.60/task, 236.8 tok/s, verbose (170M idx tokens).', cls:'border-blue-500/30 bg-blue-500/10'},
                  {date:'Sep 2', name:'Gemini 3.8 Flash', badge:'Proprietary', desc:'1M $0.75/$3.75 intro to Dec 31 2026 → $1.50/$7.50. DeepSWE 73.7%, AA HIGH 59. Cyber twin Fairwind-gated.', cls:'border-emerald-500/30 bg-emerald-500/10'},
                  {date:'Sep 1', name:'Fable 5.1 / Mythos 5.1', badge:'Proprietary', desc:'1M $10/$50 + cache-read $0.25 (0.025x, 75% cut per Anthropic docs) → ~25% typical / ~45% agentic cheaper. TB4.0 55.8%/60.9%, TB-Science 52.6%, HLE-tools 65.0%. AA v4.3 max/xhigh ~53.', cls:'border-amber-500/30 bg-amber-500/10'},
                  {date:'Aug 28', name:'Tencent Hy4 preview', badge:'Apache 2.0', desc:'770B/49B MoE 1M+ ctx, TB2.1 85.4 tie Opus 5, DeepSWE 64.3, $0.834/2.501. ~385GB Q4. HF tencent/Hy4-preview.', cls:'border-white/10 bg-white/5'},
                ].map(item=>(
                  <div key={item.name} className={`rounded-xl border p-3 ${item.cls}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-black/20 border border-white/10 rounded-full px-2 py-0.5">{item.date}</span>
                      <span className="font-bold">{item.name}</span>
                      <span className="ml-auto badge bg-black/20 border-white/10 text-[10px]">{item.badge}</span>
                    </div>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">Pricing that broke single-number models Aug 16-21: DeepSeek V4 Pro flat $0.435/0.87 → $0.66/1.98 off-peak $1.32/3.96 peak (price increase), V4 Flash $0.14/0.28 → $0.22/0.66 off / $0.44/1.32 peak, Sol $5/30 → $4/20 promo to ≥Nov21, Sonnet 5 $3/15 rise cancelled `$2/10 standard`, Gemini intro $0.75/3.75 → doubles $1.50/7.50 Jan 1 2027 `README.md:113`.</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-4">
                <h3 className="font-bold">Frontier tightness</h3>
                <p className="text-sm text-white/60 mt-1">TB2.1 88.3≈88.2≈87.9&gt;86.6&gt;86.1&gt;84.3; gaps 0-2 pts at 5-10× hardware. Giants not worth it for single-user — spend on infra for models that fit 512GB.</p>
                <div className="mt-3 h-[160px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={[{n:'K3',tb:88.3},{n:'GLM5.3',tb:88.2},{n:'V4 Pro',tb:87.9},{n:'QMax',tb:86.6},{n:'Ornith',tb:86.1},{n:'Flash',tb:84.3}]}><CartesianGrid stroke="rgba(255,255,255,0.06)"/><XAxis dataKey="n" tick={{fontSize:10, fill:'#94A3B8'}}/><YAxis domain={[80,90]} tick={{fill:'#94A3B8'}}/><Tooltip contentStyle={{background:'#131C2E', border:'1px solid rgba(255,255,255,0.1)'}}/><Bar dataKey="tb" fill="#8B5CF6" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
              </div>
              <div className="card p-4">
                <h3 className="font-bold">What fits where (Q4)</h3>
                <div className="mt-2 space-y-2 text-xs">
                  {[
                    ['Qwen27B 17GB','Fits 1×5090 ✅ ~200 tok/s'],
                    ['Qwen Flash-Next 111GB','Fits 1× Pro 6000 or 3×5090'],
                    ['V4 Flash 155GB','2× Pro 6000 243 tok/s FP8'],
                    ['Ornith 397B 244GB','Needs 8×80GB or 4× Spark Q3'],
                    ['GLM-5.3/Hy4 372/385GB','Needs 8×96GB or B300'],
                    ['V4 Pro 800GB+','Multi-node / B300 Q2 tight'],
                  ].map(([a,b])=> <div key={a} className="flex justify-between bg-white/5 rounded-lg px-3 py-2 border border-white/5"><span className="font-mono">{a}</span><span className="text-white/70">{b}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm" onClick={()=>setDetail(null)}>
          <div onClick={e=>e.stopPropagation()} className="card w-full max-w-2xl max-h-[85vh] overflow-auto p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{detail.rank}</span>
                  <span className={`badge ${licenseBadge(detail.license).cls}`}>{licenseBadge(detail.license).label}</span>
                  <span className="text-xs text-white/50">{detail.provider}</span>
                </div>
                <h3 className="text-lg font-extrabold mt-2">{detail.model}</h3>
                <p className="text-sm text-white/60">{detail.total_parameters} {detail.active_parameters!=='Unknown'&&detail.active_parameters?`/ ${detail.active_parameters} active` : ''} · {detail.context_window} · Q4 {detail.full_q4_vram_gb ?? '—'} GB</p>
              </div>
              <button onClick={()=>setDetail(null)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center"><X size={14}/></button>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                ['SWE-V', detail.swe_bench_verified],
                ['SWE-Pro', detail.swe_bench_pro],
                ['LCB V6', detail.livecodebench_v6],
                ['TB 2.1', detail.terminal_bench],
              ].map(([k,v])=>(
                <div key={k} className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                  <div className="text-[11px] tracking-widest font-bold text-white/40">{k}</div>
                  <div className="font-bold">{v || '—'}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5"><div className="text-xs text-white/50">Price (USD / Mtok)</div><div className="font-mono font-bold">{detail.price_in_usd_per_mtok!=null ? `$${detail.price_in_usd_per_mtok} → $${detail.price_out_usd_per_mtok}` : '— (local/free)'}</div><div className="text-xs text-white/50">INR: {detail.price_in_inr_per_mtok!=null ? `₹${detail.price_in_inr_per_mtok} → ₹${detail.price_out_inr_per_mtok}` : '—'}</div></div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5"><div className="text-xs text-white/50">License / Context</div><div className="font-bold">{detail.license}</div><div className="text-xs text-white/60">{detail.context_window} · {detail.is_free ? 'Free tier' : 'Paid API'}</div></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>{toggleCompare(detail.id); setDetail(null)}} className="btn btn-primary text-sm">Add to compare</button>
              <button onClick={()=>setDetail(null)} className="btn btn-ghost text-sm">Close</button>
              <a href={`https://huggingface.co/models?search=${encodeURIComponent(detail.model)}`} target="_blank" className="ml-auto btn btn-ghost text-sm">Open HF <ArrowUpRight size={12}/></a>
            </div>
            <p className="text-xs text-white/40 mt-3">Scores vendor-reported unless AA/Scale/BenchLM. SWE-bench Verified contaminated per OpenAI Feb 2026 — prefer SWE-Pro Scale standardized for apples-to-apples.</p>
          </div>
        </div>
      )}

      <footer className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 text-xs text-white/40 border-t border-white/5 mt-6">
        Built from <span className="text-white/70">coding_benchmarks_july2026_final.csv (ranks 1-267, single source of truth)</span> + regenerated <span className="text-white/70">ai_coding_api_vs_local_summary.json + frontend/src/data.json</span>. ₹95.12/USD. Online re-verified Sep 10, 2026 (DeepSeek docs / Anthropic docs / Google AI docs / llm-releases 349 / AA v4.3). Nemotron 3.5 Lightning duplicated in source CSV (ranks 221+245). Not vendor quotes — planning estimates. Source folder: `/home/vegeta/Music/ai`.
      </footer>
    </div>
  )
}
