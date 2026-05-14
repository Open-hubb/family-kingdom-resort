import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const FINAL_TEXT = 'Family Kingdom'
const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*<>/\\|:;'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const barTrackRef = useRef(null)
  const barFillRef = useRef(null)
  const subtitleRef = useRef(null)
  const [displayText, setDisplayText] = useState(
    Array.from(FINAL_TEXT).map((c) => (c === ' ' ? ' ' : '0')).join('')
  )

  useEffect(() => {
    const scrambleEndMs = 3000
    const startTime = performance.now()
    let rafId

    const tick = (now) => {
      const elapsed = now - startTime
      if (elapsed >= scrambleEndMs) {
        setDisplayText(FINAL_TEXT)
        return
      }
      const progress = elapsed / scrambleEndMs
      const out = Array.from(FINAL_TEXT).map((finalChar, i) => {
        if (finalChar === ' ') return ' '
        const charResolveTime = (i / FINAL_TEXT.length) * 0.85 + 0.15
        if (progress >= charResolveTime) return finalChar
        const seed = Math.floor(elapsed / 45) + i * 7
        return SCRAMBLE_CHARS[seed % SCRAMBLE_CHARS.length]
      })
      setDisplayText(out.join(''))
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.5, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
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
          { scaleX: 1, duration: 3.2, ease: 'power1.inOut', transformOrigin: 'left center' },
          '-=0.1'
        )
        .to([nameRef.current, subtitleRef.current], {
          opacity: 0,
          y: -15,
          duration: 0.35,
          ease: 'power2.in',
        })
        .to(barTrackRef.current, { opacity: 0, duration: 0.25 }, '<')
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.05,
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
      style={{ backgroundColor: '#0E0D0B' }}
    >
      <div ref={nameRef} className="text-center" style={{ opacity: 0 }}>
        <p
          ref={subtitleRef}
          className="font-body text-[11px] tracking-[0.35em] uppercase mb-6"
          style={{ color: '#E8D5A8', opacity: 0 }}
        >
          Resort &middot; Freetown
        </p>
        <h1
          className="font-display text-5xl md:text-7xl font-light tracking-tight whitespace-nowrap"
          style={{
            color: '#F5F1EB',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.01em',
          }}
        >
          {displayText.split('').map((ch, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                minWidth: ch === ' ' ? '0.4em' : 'auto',
                color: ch === FINAL_TEXT[i] ? '#F5F1EB' : '#E8D5A8',
                transition: 'color 0.2s',
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>
      <div
        ref={barTrackRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ backgroundColor: 'rgba(232, 213, 168, 0.25)', opacity: 0 }}
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
