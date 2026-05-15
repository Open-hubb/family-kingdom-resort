import { useEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'

const HexagonField = lazy(() => import('./HexagonField'))

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const wordmarkRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Total runtime ≈ 4.0s: 0.8s intro + 2.7s hold + 0.5s outro
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        )
        .to({}, { duration: 2.7 })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
          },
        })
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Honeycomb 3D background — same field as the hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0">
          <HexagonField rows={12} cols={18} />
        </div>
      </Suspense>

      {/* Radial vignette to keep the centre clean for the wordmark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 46% 38% at center, rgba(236,236,236,0.72) 0%, rgba(236,236,236,0) 70%)',
        }}
      />

      <div className="relative text-center px-6">
        <h1
          ref={wordmarkRef}
          className="font-display font-extrabold tracking-[-0.04em]"
          style={{
            color: 'var(--color-ink)',
            opacity: 0,
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1,
          }}
        >
          Family Kingdom
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-[12px] tracking-[0.3em] uppercase mt-5"
          style={{ color: 'var(--color-ink-soft)', opacity: 0 }}
        >
          Aberdeen &middot; Freetown
        </p>
      </div>
    </div>
  )
}
