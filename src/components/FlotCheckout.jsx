import { useEffect, useState } from 'react'
import { X, ShieldCheck } from 'lucide-react'

const FLOT_BASE = 'https://pay.flotme.ai/familykingdom'

/**
 * Flot hosted checkout, shown as an in-page popup with the pay page embedded.
 * The guest completes payment inside the Flot iframe, then taps
 * "I've completed payment" to advance the booking.
 * - onComplete: guest confirms payment is done
 * - onClose: popup dismissed without completing
 */
export default function FlotCheckout({ amount, onComplete, onClose }) {
  const [loading, setLoading] = useState(true)

  const src = amount ? `${FLOT_BASE}?amount=${encodeURIComponent(amount)}` : FLOT_BASE

  // Lock background scroll while the popup is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Escape to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4"
      style={{ height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-label="Secure checkout"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* popup card */}
      <div
        className="relative w-full sm:w-[460px] bg-white sm:rounded-2xl overflow-hidden flex flex-col"
        style={{
          height: '100dvh',
          maxHeight: '100dvh',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} style={{ color: 'var(--color-accent)' }} />
            <span
              className="font-body text-[13px] font-semibold tracking-wide"
              style={{ color: 'var(--color-ink)' }}
            >
              Secure Checkout
            </span>
            <span
              className="font-body text-[11px]"
              style={{ color: 'var(--color-ink-faint)' }}
            >
              · powered by Flot
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-ink)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* currency reminder */}
        <div
          className="px-4 py-2.5 flex-shrink-0 font-body text-[11.5px] leading-snug"
          style={{
            backgroundColor: 'rgba(242,107,31,0.09)',
            color: 'var(--color-ink)',
            borderBottom: '1px solid rgba(242,107,31,0.18)',
          }}
        >
          To pay in <strong>USD</strong>, choose <strong>Bank Card</strong> and switch
          the currency from <strong>SLE</strong> to <strong>USD</strong>. Paying in
          Leones? Rate is <strong>$1 = Le 24</strong>.
        </div>

        {/* iframe */}
        <div className="relative flex-1 min-h-0">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div
                className="h-7 w-7 rounded-full animate-spin"
                style={{
                  border: '2.5px solid rgba(242,107,31,0.25)',
                  borderTopColor: 'var(--color-accent)',
                }}
              />
            </div>
          )}
          <iframe
            title="Flot secure checkout"
            src={src}
            onLoad={() => setLoading(false)}
            className="w-full h-full"
            style={{ border: 0, display: 'block' }}
            allow="payment"
          />
        </div>

        {/* footer */}
        <div
          className="flex items-center justify-between gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <button
            onClick={onClose}
            className="font-body text-[13px] px-3 py-2 rounded-full transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="font-body text-[13px] font-medium text-white px-5 py-2.5 rounded-full transition hover:brightness-110 active:scale-95"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            I&rsquo;ve completed payment
          </button>
        </div>
      </div>
    </div>
  )
}
