import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HexagonField from './HexagonField'

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
          portraitRef.current,
          { y: 60, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          subtitleRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )

      // Scroll-out parallax
      gsap.to(portraitRef.current, {
        rotateY: -8,
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to([leftWordRef.current, rightWordRef.current], {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 60%',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Portrait 3D tilt on mouse move
  const handlePortraitMove = (e) => {
    const el = portraitRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.01)`
  }
  const handlePortraitLeave = () => {
    if (portraitRef.current) {
      portraitRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="home"
    >
      {/* Hexagon honeycomb 3D background */}
      <div className="absolute inset-0">
        <HexagonField />
      </div>

      {/* Subtle radial vignette over the hex field to keep center clean for text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at center, rgba(236,236,236,0.65) 0%, rgba(236,236,236,0) 70%)',
        }}
      />

      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 grid grid-cols-12 items-center gap-6">
        {/* LEFT — FAMILY */}
        <div className="col-span-12 md:col-span-4 text-center md:text-left order-2 md:order-1">
          <p
            ref={leftEyebrowRef}
            className="eyebrow mb-4 md:mb-6"
            style={{ opacity: 0 }}
          >
            Seaside Resort &amp; Beachfront Estate
          </p>
          <h1
            ref={leftWordRef}
            className="font-display text-[68px] sm:text-[96px] md:text-[120px] lg:text-[140px] font-extrabold leading-[0.85] tracking-[-0.04em]"
            style={{ color: 'var(--color-ink)', opacity: 0 }}
          >
            FAMILY
          </h1>
        </div>

        {/* CENTER — portrait card */}
        <div className="col-span-12 md:col-span-4 flex justify-center order-1 md:order-2">
          <div
            ref={portraitRef}
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            className="fk-card overflow-hidden"
            style={{
              width: 'min(78vw, 320px)',
              aspectRatio: '3 / 4',
              opacity: 0,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <img
              src="/images/suite-mansion/1.jpeg"
              alt="Family Kingdom Resort"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT — KINGDOM */}
        <div className="col-span-12 md:col-span-4 text-center md:text-right order-3">
          <p
            ref={rightEyebrowRef}
            className="eyebrow mb-4 md:mb-6 md:justify-end"
            style={{ opacity: 0 }}
          >
            Hospitality since 1994
          </p>
          <h1
            ref={rightWordRef}
            className="font-display text-[68px] sm:text-[96px] md:text-[120px] lg:text-[140px] font-extrabold leading-[0.85] tracking-[-0.04em]"
            style={{ color: 'var(--color-ink)', opacity: 0 }}
          >
            KINGDOM
          </h1>
          <p
            ref={subtitleRef}
            className="font-body text-[13px] mt-6 md:mt-8"
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
    const time = fmt.format(d)
    return `${time} GMT+0`
  } catch {
    return '—'
  }
}
