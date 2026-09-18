import React from 'react'

type Props = { confidence: string | null }

export function DataQualityBadge({ confidence }: Props) {
  const c = (confidence || 'low').toLowerCase()
  const map: Record<string, { label: string; cls: string; tip: string }> = {
    high: { label: 'High', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', tip: 'HIGH: ≥2 coding benches + recent verification + independent source' },
    medium: { label: 'Medium', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40', tip: 'MEDIUM: 1 coding bench' },
    low: { label: 'Low', cls: 'bg-zinc-500/20 text-zinc-200 border-white/20', tip: 'LOW: no/sparse coding bench' },
  }
  const v = map[c] || map.low
  return (
    <span className={`badge text-[10px] ${v.cls}`} role="status" aria-label={`Data quality ${v.label}: ${v.tip}`} title={v.tip}>
      {v.label}
    </span>
  )
}
