import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const OFFERINGS = [
  { title: 'Two Restaurants', desc: 'Authentic African cuisine served daily with fresh local ingredients and bold flavours.' },
  { title: 'Breakfast Buffet', desc: 'Complimentary morning spread — tropical papaya, banana, star fruit, fresh pastries.' },
  { title: 'Pool Bar', desc: 'Refreshing cocktails and appetisers poolside after a day at Aberdeen Beach.' },
  { title: 'BBQ & Room Service', desc: 'Outdoor barbecue grills for sunset cooking, or dine in the comfort of your room.' },
]

export default function Dining() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const imgRef = useRef(null)
  const listRef = useRef(null)

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

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
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
      id="dining"
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
            Gastronomy
          </p>
          <h2
            ref={headingRef}
            className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1]"
            style={{ color: 'var(--color-dark)' }}
          >
            A Taste of
            <br />
            Sierra Leone
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-sm aspect-[4/5]"
          >
            <img
              src="/images/standard-mansion/1.jpeg"
              alt="Dining at Family Kingdom"
              className="w-full h-[120%] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.2) 100%)',
              }}
            />
            <div className="absolute bottom-8 left-8">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">
                Open Daily
              </p>
              <p className="font-display text-2xl text-white font-light">
                7:00 AM — 11:00 PM
              </p>
            </div>
          </div>

          <div className="lg:pt-16">
            <div ref={listRef} className="space-y-0">
              {OFFERINGS.map((item, i) => (
                <div
                  key={i}
                  className="py-8 first:pt-0"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="font-display text-xl md:text-2xl font-semibold mb-2"
                        style={{ color: 'var(--color-dark)' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-body text-[14px] leading-[1.7]"
                        style={{ color: 'var(--color-dark-soft)', opacity: 0.6 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                    <span
                      className="font-display text-5xl font-light flex-shrink-0 mt-1"
                      style={{ color: 'var(--color-dark)', opacity: 0.06 }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
