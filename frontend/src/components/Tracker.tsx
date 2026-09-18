import React from 'react'
import { Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

/** Sep 2-15 curated release tracker + frontier tightness / Q4 fit notes. */
const RELEASES = [
  { date: 'Sep 15', name: 'Salesforce Koa (enterprise pilot)', badge: 'Proprietary', desc: 'Salesforce-hosted pilot announced Sep 15 2026. Nemotron 3 Super post-trained for Agentforce CRM workflows, multi-step reasoning + tool-use. Claims ~3× fewer errors on Salesforce CRM Bench vs frontier general models, higher precision/reliability/context retention, token-efficient. Enterprise deployment, weights controlled by Salesforce; GA winter 2026.', cls: 'border-violet-500/30 bg-violet-500/10' },
  { date: 'Sep 15', name: 'Grok 4.7 delayed', badge: 'Proprietary', desc: 'Grok 4.7 expected ~Sep 12 but delayed due to additional RL for response-length / task-completion. Roadmap: Grok 4.8 ~2.5T new C++ stack training finishing → RL next; 4.9 Astra/Fable-class; 5 AGI claim.', cls: 'border-amber-500/20 bg-amber-500/5' },
  { date: 'Sep 10', name: 'DeepSeek V4.1 Flash (open weights)', badge: 'MIT', desc: 'HF deepseek-ai/DeepSeek-V4.1-Flash — MIT weights, 552B backbone Causal Encoder-Decoder (8B prefill / 16B decode active, 384 experts, 890 bytes/tok KV, Engram 196B), ~280GB Q4, 48 shards ~510GB FP8, KV-cache compression, vision. Vendor evals @1M ctx: TB2.1 90.6, DeepSWE v1.1 74.2, GPQA-D 90.9, HLE-tools 63.9. API deepseek-flash off-peak $0.15/$0.60 cache $0.003; peak $0.30/$1.20 cache $0.006; Novita live ~126 tok/s $1.20 out. Legacy V4 Flash/Vision retired+routed (billed Flash); V4 Pro routed Sep 14 12:00 Beijing.', cls: 'border-emerald-500/30 bg-emerald-500/10' },
  { date: 'Sep 10', name: 'Ling-3.0-flash-VL (AA)', badge: 'Open*', desc: 'Vision variant of Ling-3.0-flash, AA-evaluated Sep 10. Sante-style weights unconfirmed; base family MIT.', cls: 'border-white/10 bg-white/5' },
  { date: 'Sep 8', name: 'Mercury 2.5 (GA)', badge: 'Proprietary', desc: 'Preview Aug 31 → GA Sep 8. Diffusion LM, 260K $0.20/$0.75. AA-evaluated Sep 8.', cls: 'border-white/10 bg-white/5' },
  { date: 'Sep 7', name: 'MiniCPM5-2B', badge: 'Apache 2.0', desc: '~2.5B dense, 131K, text+vision, ~2GB Q4. Avg 53.9 over 34 benchmarks — strongest open <4B. AA-evaluated Sep 7.', cls: 'border-emerald-500/30 bg-emerald-500/10' },
  { date: 'Sep 3-4', name: 'GPT-6 Astra / Astra Pro', badge: 'Proprietary', desc: 'Astra 1M $10/$50 (TB4.0 57.7%, OSWorld 72.6%, GPQA 96.0%, HLE-tools 57.2%); Pro 1.05M same $10/$50 cache $1.00 reasoning.mode pro. AA v4.3 max/xhigh ~53. Daybreak-gated cyber.', cls: 'border-violet-500/30 bg-violet-500/10' },
  { date: 'Sep 4', name: 'Ling-3.0-flash-Sante', badge: 'Open*', desc: '124B/5.1B MoE 262K medical-tuned. API-first (free thru Oct 4 Vercel); Sante-specific weights unconfirmed, base MIT.', cls: 'border-white/10 bg-white/5' },
  { date: 'Sep 4', name: 'Ling-3.0-flash-Fin weights', badge: 'MIT', desc: 'Weights posted Sep 4 HF inclusionAI/Ling-3.0-flash-Fin. DeepInfra $0.06/$0.18.', cls: 'border-emerald-500/30 bg-emerald-500/10' },
  { date: 'Sep 3', name: 'K2 Horizon 375B-A23B', badge: 'Apache 2.0', desc: 'Flagship of 6-model 0.9B→375B family (IFM/MBZUAI). Fully open: weights+data+code+checkpoints+logs. ~200GB Q4. AA-evaluated Sep 3.', cls: 'border-emerald-500/30 bg-emerald-500/10' },
  { date: 'Sep 2', name: 'Gemini 3.8 Flash Cyber', badge: 'Proprietary', desc: 'Fairwind-gated vuln detection/patching twin of 3.8 Flash. Same $0.75/$3.75 intro base.', cls: 'border-white/10 bg-white/5' },
  { date: 'Sep 2', name: 'Quasar 438B', badge: 'TBD', desc: '438B listed Sep 2 on BenchLM/ThursdAI (Multiverse Computing). Sparse details — announced-but-unconfirmed.', cls: 'border-white/10 bg-white/5' },
  { date: 'Sep 2', name: 'Qwen3.8-Max-0902', badge: 'Proprietary', desc: 'Same 2.4T/95B 1M, TB3.0 29.0% (+17.7 vs 11.3% 2.6×), DeepSWE 69.3% vs 56.6%, NL2Repo 64.9%. Refresh, $2/$6 unchanged. API-only.', cls: 'border-violet-500/30 bg-violet-500/10' },
  { date: 'Sep 2', name: 'Muse Spark 1.3', badge: 'Proprietary', desc: '1M ctx $1.25/$4.25. Launch AA 61/62 superseded by AA v4.3 re-score 48. $1.60/task, 236.8 tok/s, verbose (170M idx tokens).', cls: 'border-blue-500/30 bg-blue-500/10' },
  { date: 'Sep 2', name: 'Gemini 3.8 Flash', badge: 'Proprietary', desc: '1M $0.75/$3.75 intro to Dec 31 2026 → $1.50/$7.50. DeepSWE 73.7%, AA HIGH 59. Cyber twin Fairwind-gated.', cls: 'border-emerald-500/30 bg-emerald-500/10' },
  { date: 'Sep 1', name: 'Fable 5.1 / Mythos 5.1', badge: 'Proprietary', desc: '1M $10/$50 + cache-read $0.25 (0.025x, 75% cut per Anthropic docs) → ~25% typical / ~45% agentic cheaper. TB4.0 55.8%/60.9%, TB-Science 52.6%, HLE-tools 65.0%. AA v4.3 max/xhigh ~53.', cls: 'border-amber-500/30 bg-amber-500/10' },
  { date: 'Aug 28', name: 'Tencent Hy4 preview', badge: 'Apache 2.0', desc: '770B/49B MoE 1M+ ctx, TB2.1 85.4 tie Opus 5, DeepSWE 64.3, $0.834/2.501. ~385GB Q4. HF tencent/Hy4-preview.', cls: 'border-white/10 bg-white/5' },
]

export default function Tracker() {
  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h2 className="font-bold flex items-center gap-2"><Sparkles size={16} className="text-violet-400" aria-hidden="true" /> Sep 2-15 Release Tracker (fact-checked Sep 15, 2026)</h2>
        <p className="text-sm text-white/60">DeepSeek docs + Anthropic docs + Google AI docs + llm-releases.com (349) + AA v4.3. All scores vendor-reported unless AA/Scale.</p>
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          {RELEASES.map((item) => (
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
              ['Qwen Flash-Next 111GB', 'Fits 1× Pro 6000 or 3×5090'],
              ['V4.1 Flash 280GB', '4× Spark (512GB) or 8×80GB; 8B/16B active'],
              ['Ornith 397B 244GB', 'Needs 8×80GB or 4× Spark Q3'],
              ['GLM-5.3/Hy4 372/385GB', 'Needs 8×96GB or B300'],
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
            ['Sep 15', 'Grok 4.7 delayed / 4.8 roadmap', 'Grok 4.7 delayed (missed ~Sep 12; additional RL required for response-length / task-completion). Grok 4.8 ~2.5T new C++ stack training finishing → RL next; 4.9 Astra/Fable-class; 5 AGI claim.'],
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
    </div>
  )
}
