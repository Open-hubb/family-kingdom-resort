import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Counter from './Counter'

export default function About() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const bodyRef = useRef(null)
  const statsRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(labelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.2')
        .fromTo(bodyRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo(
          statsRef.current?.children || [],
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.2'
        )

      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
        gsap.to(imgRef.current.querySelector('img'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-40 px-6 md:px-10"
      style={{ backgroundColor: 'var(--color-offwhite)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="font-display text-2xl font-light italic" style={{ color: 'var(--color-accent-dark)' }}>
            02
          </span>
          <span className="block w-16 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-dark-soft)', opacity: 0.5 }}>
            The Resort
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p
              ref={labelRef}
              className="font-body text-[11px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Welcome
            </p>

            <h2
              ref={headingRef}
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1] mb-8"
              style={{ color: 'var(--color-dark)' }}
            >
              Where Freetown
              <br />
              Meets the <span className="italic font-extralight" style={{ color: 'var(--color-accent-dark)' }}>Sea</span>
            </h2>

            <div ref={bodyRef}>
              <p
                className="font-body text-[15px] leading-[1.8] mb-6"
                style={{ color: 'var(--color-dark-soft)', opacity: 0.7 }}
              >
                Nestled on the Aberdeen Peninsula, Family Kingdom Resort is Freetown's
                premier seaside escape. With 97 rooms spanning multiple buildings, two
                restaurants serving authentic African cuisine, a dedicated Fun Park, and
                versatile event spaces — all within a secure, gated beachfront property.
              </p>
              <p
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: 'var(--color-dark-soft)', opacity: 0.7 }}
              >
                Just one minute from Aberdeen Beach, and three decades of warm,
                family-run hospitality since 1994. You'll meet the owners themselves.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-10"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {[
                { number: '97', label: 'Rooms' },
                { number: '30+', label: 'Years' },
                { number: '2', label: 'Restaurants' },
                { number: '1 min', label: 'To Beach' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-3xl md:text-4xl font-light" style={{ color: 'var(--color-dark)' }}>
                    <Counter value={stat.number} />
                  </p>
                  <p className="font-body text-[11px] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--color-dark-soft)', opacity: 0.5 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-sm aspect-[3/4] lg:mt-12"
          >
            <img
              src="/images/suite-mansion/1.jpeg"
              alt="Family Kingdom Resort grounds"
              className="w-full h-[120%] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.15) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
