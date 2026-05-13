import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const barTrackRef = useRef(null)
  const barFillRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(
        barTrackRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.3 },
        '-=0.2'
      )
      .fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.8, ease: 'power2.inOut', transformOrigin: 'left center' },
        '-=0.1'
      )
      .to(nameRef.current, { opacity: 0, y: -15, duration: 0.3 })
      .to(barTrackRef.current, { opacity: 0, duration: 0.2 }, '<')
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.15,
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#F5F1EB' }}
    >
      <div ref={nameRef} className="text-center" style={{ opacity: 0 }}>
        <p
          className="font-body text-[11px] tracking-[0.35em] uppercase mb-4"
          style={{ color: '#1A1A1A', opacity: 0.4 }}
        >
          Resort &middot; Freetown
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-light tracking-tight"
          style={{ color: '#1A1A1A' }}
        >
          Family Kingdom
        </h1>
      </div>
      <div
        ref={barTrackRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ backgroundColor: '#1A1A1A', opacity: 0 }}
      >
        <div
          ref={barFillRef}
          className="h-full origin-left"
          style={{ backgroundColor: '#C8A96E', transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
