export function Skeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-white/10 rounded animate-pulse" style={{ width: `${85 - i * 10}%` }} />
      ))}
    </div>
  )
}
export function CardSkeleton() {
  return <div className="card p-4 h-64 bg-white/5 animate-pulse rounded-xl" aria-hidden="true" />
}
