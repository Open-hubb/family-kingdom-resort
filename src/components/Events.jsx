import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EVENT_TYPES = [
  { title: 'Conference Hall', desc: 'Fully equipped meeting rooms with AV setup for corporate events and seminars.' },
  { title: 'Banquet Hall', desc: 'Elegant space for weddings, receptions, and celebrations with ocean views.' },
  { title: 'Business Centre', desc: 'Professional workspace with connectivity for visiting executives and teams.' },
  { title: 'Event Catering', desc: 'Full-service on-site catering with customisable menus for any occasion.' },
]

export default function Events() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const imgRef = useRef(null)
  const listRef = useRef(null)
  const bodyRef = useRef(null)

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
        .fromTo(bodyRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')

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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="py-28 md:py-40 px-6 md:px-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p
              ref={labelRef}
              className="font-body text-[11px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Events & Conferences
            </p>

            <h2
              ref={headingRef}
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1] mb-6"
              style={{ color: 'var(--color-dark)' }}
            >
              From Boardrooms to
              <br />
              Beachfront Weddings
            </h2>

            <p
              ref={bodyRef}
              className="font-body text-[15px] leading-[1.8] mb-12"
              style={{ color: 'var(--color-dark-soft)', opacity: 0.7 }}
            >
              Whether you're planning a corporate retreat, a wedding reception,
              or an intimate gathering, our versatile spaces adapt to your vision
              with full-service support.
            </p>

            <div ref={listRef} className="space-y-0">
              {EVENT_TYPES.map((item, i) => (
                <div
                  key={i}
                  className="py-6 first:pt-0"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="font-display text-lg md:text-xl font-semibold mb-1.5"
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
                    <span
                      className="font-display text-4xl font-light flex-shrink-0"
                      style={{ color: 'var(--color-dark)', opacity: 0.06 }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-sm aspect-[3/4] lg:mt-12"
          >
            <img
              src="/images/standard-empire/2.jpeg"
              alt="Event space at Family Kingdom"
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
