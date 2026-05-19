import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'

const HexagonField = lazy(() => import('./HexagonField'))

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const fallbackRef = useRef(null)
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    const target = logoFailed ? fallbackRef.current : logoRef.current

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Total runtime ≈ 4.0s
      // start small → zoom out (grow) into view: 1.2s
      tl.fromTo(
        target,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
        // hold: 2.0s
        .to({}, { duration: 2.0 })
        // zoom out further and disappear: 0.8s
        .to(target, {
          scale: 1.4,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              if (onComplete) onComplete()
            },
          },
          '-=0.25'
        )
    })

    return () => ctx.revert()
  }, [onComplete, logoFailed])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Honeycomb 3D background animation */}
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <HexagonField rows={12} cols={18} />
        </div>
      </Suspense>

      {/* Radial vignette to keep the centre clean for the logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 46% 40% at center, rgba(236,236,236,0.78) 0%, rgba(236,236,236,0) 72%)',
        }}
      />

      {!logoFailed ? (
        <img
          ref={logoRef}
          src="/logo.png"
          alt="The Family Kingdom Resort"
          onError={() => setLogoFailed(true)}
          className="relative"
          style={{
            width: 'min(62vw, 320px)',
            height: 'auto',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        />
      ) : (
        <div ref={fallbackRef} className="relative text-center px-6" style={{ opacity: 0 }}>
          <h1
            className="font-display font-extrabold tracking-[-0.04em]"
            style={{
              color: 'var(--color-ink)',
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 1,
            }}
          >
            Family Kingdom
          </h1>
          <p
            className="font-body text-[12px] tracking-[0.3em] uppercase mt-4"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            Aberdeen &middot; Freetown
          </p>
        </div>
      )}
    </div>
  )
}
