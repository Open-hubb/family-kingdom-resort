import { useState } from 'react'

export default function SiteLogo() {
  const [failed, setFailed] = useState(false)

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={toTop}
      aria-label="The Family Kingdom Resort — back to top"
      className="fixed top-4 left-4 md:top-6 md:left-6 z-40 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
      style={{ lineHeight: 0 }}
    >
      {!failed ? (
        <img
          src="/logo.png"
          alt="The Family Kingdom Resort"
          onError={() => setFailed(true)}
          style={{
            height: 'clamp(48px, 7vw, 68px)',
            width: 'auto',
            display: 'block',
          }}
        />
      ) : (
        <span
          className="font-display font-extrabold tracking-[-0.03em]"
          style={{ color: 'var(--color-ink)', fontSize: '18px' }}
        >
          Family Kingdom
        </span>
      )}
    </button>
  )
}
