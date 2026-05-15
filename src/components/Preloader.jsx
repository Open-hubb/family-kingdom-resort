import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const wordmarkRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        )
        .to({}, { duration: 0.5 })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
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
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="text-center px-6">
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
