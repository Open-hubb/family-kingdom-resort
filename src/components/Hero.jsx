import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {
  const sectionRef = useRef(null)
  const leftEyebrowRef = useRef(null)
  const rightEyebrowRef = useRef(null)
  const leftWordRef = useRef(null)
  const rightWordRef = useRef(null)
  const subtitleRef = useRef(null)
  const imgRef = useRef(null)

  const [now, setNow] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = setInterval(() => setNow(formatTime(new Date())), 30 * 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 4.4 })

      tl.fromTo(
        [leftEyebrowRef.current, rightEyebrowRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }
      )
        .fromTo(
          [leftWordRef.current, rightWordRef.current],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )

      // Slow background parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const wordStyle = {
    color: '#FFFFFF',
    opacity: 0,
    fontSize: 'clamp(48px, 9vw, 132px)',
    letterSpacing: '-0.05em',
    lineHeight: 0.85,
    whiteSpace: 'nowrap',
    textShadow: '0 2px 30px rgba(0,0,0,0.35)',
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      id="home"
      style={{ minHeight: 'min(880px, 92vh)' }}
    >
      {/* New photo background */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{ top: '-6%', height: '112%' }}
      >
        <img
          src="/images/IMG_6912.jpg"
          alt="Sunset on the Freetown seafront"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.62)' }}
        />
      </div>

      {/* Scrim for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 md:px-10 py-14 grid grid-cols-12 items-center gap-2 md:gap-3">
        {/* LEFT — FAMILY */}
        <div className="col-span-12 md:col-span-6 text-center md:text-right order-2 md:order-1">
          <p
            ref={leftEyebrowRef}
            className="eyebrow eyebrow-on-photo mb-3 md:mb-5 md:justify-end"
            style={{ opacity: 0 }}
          >
            Seaside Resort &amp; Beachfront Estate
          </p>
          <h1 ref={leftWordRef} className="font-display font-extrabold" style={wordStyle}>
            FAMILY
          </h1>
        </div>

        {/* RIGHT — KINGDOM */}
        <div className="col-span-12 md:col-span-6 text-center md:text-left order-3">
          <p
            ref={rightEyebrowRef}
            className="eyebrow eyebrow-on-photo mb-3 md:mb-5"
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
            style={{ color: 'rgba(255,255,255,0.85)', opacity: 0 }}
          >
            Aberdeen, Freetown &middot; <span className="tabular-nums">{now}</span>
          </p>
        </div>
      </div>

      <style>{`
        .eyebrow-on-photo { color: rgba(255,255,255,0.9) !important; }
      `}</style>
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
    const time = fmt.format(d)
    return `${time} GMT+0`
  } catch {
    return '—'
  }
}
