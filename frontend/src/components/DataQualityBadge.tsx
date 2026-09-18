import React from 'react'

type Props = { confidence: string | null }

export function DataQualityBadge({ confidence }: Props) {
  const c = (confidence || 'low').toLowerCase()
  const map: Record<string, { label: string; cls: string; tip: string }> = {
    high: { label: 'High', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', tip: 'HIGH: ≥2 coding benches + recent verification + independent source' },
    medium: { label: 'Medium', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30', tip: 'MEDIUM: 1 coding bench' },
    low: { label: 'Low', cls: 'bg-zinc-500/15 text-zinc-400 border-white/10', tip: 'LOW: no/sparse coding bench' },
  }
  const v = map[c] || map.low
  return (
    <span className={`badge text-[10px] ${v.cls}`} aria-label={`Data quality ${v.label}`} title={v.tip}>
      {v.label}
    </span>
  )
}
