import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroParticles from './HeroParticles'

export default function Hero() {
  const sectionRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const overlayRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 })

      tl.fromTo(
        nameRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(overlayRef.current, {
        opacity: 0.6,
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

  const scrollToRooms = (e) => {
    e.preventDefault()
    document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url('/images/deluxe-single/1.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <HeroParticles />

      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center gap-3 -rotate-90 origin-left">
        <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-white/60">
          N° 01 / Arrival
        </span>
      </div>

      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-right">
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-white/60">
          08° 28' N · 13° 14' W
        </span>
        <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
      </div>

      <div className="relative z-10 text-center px-6">
        <h1
          ref={nameRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-light tracking-tight leading-[0.9] text-white"
          style={{ opacity: 0 }}
        >
          Family
          <br />
          <span className="italic font-extralight" style={{ color: '#E8C690' }}>Kingdom</span>
        </h1>

        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(232,198,144,0.6)' }} />
          <span className="block w-1 h-1 rounded-full" style={{ backgroundColor: '#E8C690' }} />
          <span className="block w-12 h-px" style={{ backgroundColor: 'rgba(232,198,144,0.6)' }} />
        </div>

        <p
          ref={subtitleRef}
          className="font-body text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-white/60 mt-6"
          style={{ opacity: 0 }}
        >
          Seaside Resort &middot; Freetown, Sierra Leone
        </p>
      </div>

      <div
        ref={ctaRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: 0 }}
      >
        <a
          href="#rooms"
          onClick={scrollToRooms}
          className="font-body text-[11px] tracking-[0.12em] uppercase px-8 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            border: '1px solid rgba(255,255,255,0.4)',
            color: 'white',
            backgroundColor: 'transparent',
          }}
        >
          Book Your Stay
        </a>
      </div>
    </section>
  )
}
