import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ACTIVITIES = [
  { title: 'Swimming Pool', desc: 'Year-round outdoor pool plus a dedicated children\'s pool and relaxing jacuzzi.' },
  { title: 'Fun Park', desc: 'One of Freetown\'s only dedicated family play parks. Open Tuesday–Sunday, 10 AM–7 PM.' },
  { title: 'Fitness Centre', desc: 'Stay active with our fully equipped gym and wellness facilities.' },
  { title: 'Spa & Massage', desc: 'Professional massage treatments in our dedicated relaxation room.' },
  { title: 'Beach Access', desc: 'A one-minute walk to Aberdeen Beach — white sand and clear Atlantic waters.' },
  { title: 'Sun Terrace', desc: 'Landscaped gardens, barbecue area, and sun terraces for laid-back afternoons.' },
]

export default function Recreation() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const imgRef = useRef(null)
  const gridRef = useRef(null)

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="recreation"
      className="py-28 md:py-40 px-6 md:px-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-20">
          <p
            ref={labelRef}
            className="font-body text-[11px] tracking-[0.25em] uppercase mb-6"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            Recreation & Wellness
          </p>
          <h2
            ref={headingRef}
            className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1]"
            style={{ color: 'var(--color-dark)' }}
          >
            Leisure &
            <br />
            Adventure
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div
            ref={imgRef}
            className="lg:col-span-5 relative overflow-hidden rounded-sm aspect-[3/4]"
          >
            <img
              src="/images/plaza-deluxe/1.jpeg"
              alt="Recreation at Family Kingdom"
              className="w-full h-[120%] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.15) 100%)',
              }}
            />
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
              {ACTIVITIES.map((item, i) => (
                <div
                  key={i}
                  className="py-7"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <h3
                    className="font-display text-lg md:text-xl font-semibold mb-2"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-[1.7]"
                    style={{ color: 'var(--color-dark-soft)', opacity: 0.6 }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
