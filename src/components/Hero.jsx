import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef(null)
  const leftEyebrowRef = useRef(null)
  const rightEyebrowRef = useRef(null)
  const leftWordRef = useRef(null)
  const rightWordRef = useRef(null)
  const portraitRef = useRef(null)
  const subtitleRef = useRef(null)

  const [now, setNow] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setNow(formatTime(new Date())), 30 * 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.6 })
      tl.fromTo(
        [leftEyebrowRef.current, rightEyebrowRef.current],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.06 }
      )
        .fromTo(
          [leftWordRef.current, rightWordRef.current],
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06 },
          '-=0.3'
        )
        .fromTo(
          portraitRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.3'
        )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const wordStyle = {
    color: 'var(--color-ink)',
    opacity: 0,
    fontSize: 'clamp(44px, 7.4vw, 104px)',
    letterSpacing: '-0.05em',
    lineHeight: 0.85,
    whiteSpace: 'nowrap',
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      id="home"
      style={{ minHeight: 'min(760px, 78vh)' }}
    >
      {/* Soft warm-grey backdrop with a single subtle radial gradient — no 3D, no motion */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.55) 0%, rgba(236,236,236,0) 70%)',
        }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-10 py-10 md:py-14 grid grid-cols-12 items-center gap-3 md:gap-6">
        <div className="col-span-12 md:col-span-5 text-center md:text-right order-2 md:order-1">
          <p ref={leftEyebrowRef} className="eyebrow mb-3 md:mb-5 md:justify-end" style={{ opacity: 0 }}>
            Seaside Resort &amp; Beachfront Estate
          </p>
          <h1 ref={leftWordRef} className="font-display font-extrabold" style={wordStyle}>
            FAMILY
          </h1>
        </div>

        <div className="col-span-12 md:col-span-2 flex justify-center order-1 md:order-2">
          <div
            ref={portraitRef}
            className="fk-card overflow-hidden"
            style={{
              width: 'min(70vw, 280px)',
              aspectRatio: '3 / 4',
              opacity: 0,
            }}
          >
            <img
              src="/images/suite-mansion/1.jpeg"
              alt="Family Kingdom Resort"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 text-center md:text-left order-3">
          <p
            ref={rightEyebrowRef}
            className="eyebrow mb-3 md:mb-5"
            style={{ opacity: 0 }}
          >
            Hospitality since 1994
          </p>
          <h1 ref={rightWordRef} className="font-display font-extrabold" style={wordStyle}>
            KINGDOM
          </h1>
          <p
            ref={subtitleRef}
            className="font-body text-[13px] mt-5 md:mt-7"
            style={{ color: 'var(--color-ink-soft)', opacity: 0 }}
          >
            Aberdeen, Freetown &middot; <span className="tabular-nums">{now}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function formatTime(d) {
  try {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Freetown',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    return `${fmt.format(d)} GMT+0`
  } catch {
    return '—'
  }
}
