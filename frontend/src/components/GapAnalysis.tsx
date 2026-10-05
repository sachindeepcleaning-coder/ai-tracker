import React from 'react'
import { GAP_ROWS, HEADLINES, OPEN_WINS, GAP_HOLDS, DECISIONS, SOURCES, GAP_VINTAGE } from '../lib/gapdata'

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
      <div className="h-full rounded-full" style={{ width: `${Math.max(2, pct)}%`, background: color }} />
    </div>
  )
}

export default function GapAnalysis() {
  return (
    <div className="space-y-4" data-testid="gap-analysis">
      <div className="card p-4 md:p-5">
        <div className="text-[11px] tracking-widest font-bold text-white/50 uppercase">Research brief · open vs closed frontier</div>
        <h2 className="text-xl md:text-2xl font-extrabold mt-1">How far behind is open? It depends on the job.</h2>
        <p className="text-sm text-white/60 mt-2 leading-relaxed">
          Open weights trail the closed frontier by roughly <b className="text-white/80">four months</b> on composite
          measures — down from ~16 months in the GPT-4 era. But a single number hides the shape: near-parity on fresh
          code generation and long-context reasoning, a double-digit gap on general intelligence. This page maps the
          gap task by task from independent analyses, not vendor claims.
        </p>
        <p className="text-xs text-white/40 mt-2">{GAP_VINTAGE}. Scores shift week to week — treat this as a frontier map, not a ranking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {HEADLINES.map((h) => (
          <div key={h.k} className="card p-4">
            <div className="text-2xl font-extrabold text-emerald-300">{h.k}</div>
            <p className="text-xs text-white/60 mt-1 leading-relaxed">{h.s}</p>
          </div>
        ))}
      </div>

      <div className="card p-4 md:p-5">
        <h3 className="font-bold">The gap, task by task</h3>
        <p className="text-xs text-white/50 mt-1 mb-3">Best open-weight vs best proprietary score per metric (WhatLLM, Jul 2026). Variants and harnesses differ — read rows, not just the average.</p>
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-white/40">
                <th className="py-2 pr-3 font-bold">Task</th>
                <th className="py-2 pr-3 font-bold">Best open</th>
                <th className="py-2 pr-3 font-bold">Best closed</th>
                <th className="py-2 font-bold w-24">Gap</th>
              </tr>
            </thead>
            <tbody>
              {GAP_ROWS.map((r) => (
                <tr key={r.task} className="border-t border-white/5 align-top">
                  <td className="py-3 pr-3">
                    <div className="font-semibold">{r.task}</div>
                    <div className="text-xs text-white/40">{r.detail}</div>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="font-bold text-emerald-300">{r.openScore} <span className="font-normal text-white/50 text-xs">{r.openModel}</span></div>
                    <div className="mt-1.5"><Bar pct={r.openPct} color="#34d399" /></div>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="font-bold text-violet-300">{r.closedScore} <span className="font-normal text-white/50 text-xs">{r.closedModel}</span></div>
                    <div className="mt-1.5"><Bar pct={r.closedPct} color="#a78bfa" /></div>
                  </td>
                  <td className="py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${r.gap <= 0 ? 'bg-emerald-500/15 text-emerald-300' : r.gap <= 3 ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {r.gap <= 0 ? `open +${Math.abs(r.gap)}` : `−${r.gap} pts`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="card p-4 md:p-5">
          <h3 className="font-bold">Where open already won</h3>
          <ul className="mt-2 space-y-3">
            {OPEN_WINS.map((w) => (
              <li key={w.t}>
                <div className="text-sm font-semibold text-emerald-200">{w.t}</div>
                <p className="text-xs text-white/60 leading-relaxed mt-0.5">{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4 md:p-5">
          <h3 className="font-bold">Where the gap holds</h3>
          <ul className="mt-2 space-y-3">
            {GAP_HOLDS.map((w) => (
              <li key={w.t}>
                <div className="text-sm font-semibold text-amber-200">{w.t}</div>
                <p className="text-xs text-white/60 leading-relaxed mt-0.5">{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        <h3 className="font-bold">Which should you choose?</h3>
        <p className="text-xs text-white/50 mt-1 mb-3">The practitioner consensus is a routing decision, not an ideology: rent frontier for the hardest 10%, run open for the rest.</p>
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-white/40">
                <th className="py-2 pr-3 font-bold">Situation</th>
                <th className="py-2 pr-3 font-bold">Start with</th>
                <th className="py-2 font-bold">Why</th>
              </tr>
            </thead>
            <tbody>
              {DECISIONS.map((d) => (
                <tr key={d.when} className="border-t border-white/5">
                  <td className="py-2.5 pr-3">{d.when}</td>
                  <td className="py-2.5 pr-3 font-semibold text-white/85 whitespace-nowrap">{d.start}</td>
                  <td className="py-2.5 text-white/60 text-[13px]">{d.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        <h3 className="font-bold text-sm">Sources & vintage</h3>
        <ul className="mt-2 space-y-1.5 text-xs text-white/60">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a className="underline hover:text-white/80" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/40 mt-2">Epoch AI's four-month estimate is a composite analysis, not a law of nature — public benchmarks may flatter open models. Catalog cross-checks (MiMo-V2.6-Pro AA 46.3, Opus 5.5 top closed) are Oct 2026 rows in the Explorer.</p>
      </div>
    </div>
  )
}
