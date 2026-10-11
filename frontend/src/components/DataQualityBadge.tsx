import React from 'react'
import { TriangleAlert } from 'lucide-react'

type Props = { confidence: string | null; source?: string | null }

export function DataQualityBadge({ confidence, source }: Props) {
  const c = (confidence || 'low').toLowerCase()
  const secondary = (source || '').toLowerCase() === 'secondary'
  // Secondary-sourced rows are unverified by definition: red, icon + words
  // (never color alone). Low-confidence primary rows keep the "Low" label
  // but get the same prominent treatment.
  if (secondary) {
    const tip = 'UNVERIFIED: secondary source — treat scores and specs as provisional until vendor/HF confirmation'
    return (
      <span className="badge text-[10px] bg-red-500/20 text-red-300 border-red-500/50 font-bold" role="status" aria-label={tip} title={tip}>
        <TriangleAlert size={11} aria-hidden="true" /> Unverified
      </span>
    )
  }
  const map: Record<string, { label: string; cls: string; tip: string; icon: boolean }> = {
    high: { label: 'High', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', tip: 'HIGH: ≥2 coding benches + recent verification + independent source', icon: false },
    medium: { label: 'Medium', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40', tip: 'MEDIUM: 1 coding bench', icon: false },
    low: { label: 'Low', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold', tip: 'LOW confidence: no/sparse coding bench — scores provisional', icon: true },
  }
  const v = map[c] || map.low
  return (
    <span className={`badge text-[10px] ${v.cls}`} role="status" aria-label={`Data quality ${v.label}: ${v.tip}`} title={v.tip}>
      {v.icon && <TriangleAlert size={11} aria-hidden="true" />} {v.label}
    </span>
  )
}
