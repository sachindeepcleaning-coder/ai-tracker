import { useRef, useEffect } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { licenseBadge } from '../lib/license'
import { fmtDateFull } from '../lib/parse'

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function DetailModal({ detail, onClose, onToggleCompare, inCompare }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      // Focus trap: keep Tab / Shift+Tab inside the dialog.
      const focusables = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    // Move keyboard focus into the dialog (first focusable, usually the close button).
    const firstFocusable = panel?.querySelector(FOCUSABLE)
    firstFocusable?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-detail-title"
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-2xl max-h-[85vh] overflow-auto p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-white/10 border border-white/10 rounded-md px-1.5 py-0.5">#{detail.rank}</span>
              <span className={`badge ${licenseBadge(detail.license).cls}`}>{licenseBadge(detail.license).label}</span>
              <span className="text-xs text-white/50">{detail.provider}</span>
            </div>
            <h3 id="model-detail-title" className="text-lg font-extrabold mt-2">{detail.model}</h3>
            <p className="text-sm text-white/60">{detail.total_parameters} {detail.active_parameters !== 'Unknown' && detail.active_parameters ? `/ ${detail.active_parameters} active` : ''} · {detail.context_window} · Q4 {detail.full_q4_vram_gb ?? '—'} GB</p>
          </div>
          <button onClick={onClose} aria-label="Close model details" title="Close (Esc)" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10">
            <X size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            ['SWE-V', detail.swe_bench_verified],
            ['SWE-Pro', detail.swe_bench_pro],
            ['LCB V6', detail.livecodebench_v6],
            ['TB 2.1', detail.terminal_bench],
          ].map(([k, v]) => (
            <div key={k} className="bg-white/5 rounded-xl p-3 border border-white/5 text-center">
              <div className="text-[11px] tracking-widest font-bold text-white/40">{k}</div>
              <div className="font-bold">{v || '—'}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-xs text-white/50">Price (USD / Mtok)</div>
            <div className="font-mono font-bold">{detail.price_in_usd_per_mtok != null ? `$${detail.price_in_usd_per_mtok} → $${detail.price_out_usd_per_mtok}` : '— (local/free)'}</div>
            <div className="text-xs text-white/50">INR: {detail.price_in_inr_per_mtok != null ? `₹${detail.price_in_inr_per_mtok} → ₹${detail.price_out_inr_per_mtok}` : '—'}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-xs text-white/50">License / Context</div>
            <div className="font-bold">{detail.license}</div>
            <div className="text-xs text-white/60">
              {detail.context_window} · {detail.is_free ? 'Free tier' : 'Paid API'}
              {detail.released && <> · Released {fmtDateFull(detail.released)}</>}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => { onToggleCompare(detail.id); onClose() }} className="btn btn-primary text-sm">{inCompare ? 'Remove from compare' : 'Add to compare'}</button>
          <button type="button" onClick={onClose} className="btn btn-ghost text-sm">Close</button>
          <a href={`https://huggingface.co/models?search=${encodeURIComponent(detail.model)}`} target="_blank" rel="noopener noreferrer" className="ml-auto btn btn-ghost text-sm">Open HF <ArrowUpRight size={12} aria-hidden="true" /></a>
        </div>
        <p className="text-xs text-white/40 mt-3">Scores vendor-reported unless AA/Scale/BenchLM. SWE-bench Verified contaminated per OpenAI Feb 2026 — prefer SWE-Pro Scale standardized for apples-to-apples.</p>
      </div>
    </div>
  )
}