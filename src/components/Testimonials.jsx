import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const REVIEWS = [
  {
    text: 'One of the most pleasant stays we\'ve had. The grounds are beautiful — lush greenery and low-rise buildings give it a tranquil resort feel.',
    author: 'Travel Enthusiast',
    source: 'Tripadvisor',
  },
  {
    text: 'The breakfast buffet is a standout. Fresh tropical fruit every morning — papaya, banana, star fruit. Staff are polite and genuinely attentive.',
    author: 'International Guest',
    source: 'Expedia',
  },
  {
    text: 'Spacious rooms with full kitchenettes. The family-run feel is wonderful — you actually meet the owners. Beachfront location is unbeatable.',
    author: 'Business Traveller',
    source: 'Hotels.com',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

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

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p
            ref={labelRef}
            className="font-body text-[11px] tracking-[0.25em] uppercase mb-6"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            Guest Reviews
          </p>
          <h2
            ref={headingRef}
            className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1]"
            style={{ color: 'var(--color-dark)' }}
          >
            What Our Guests
            <br />
            Are Saying
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
        >
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="py-10 md:py-0 md:px-10 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0"
              style={{
                borderBottom: i < REVIEWS.length - 1 ? '1px solid var(--color-border)' : 'none',
                borderRight: 'none',
              }}
            >
              <div className="md:border-b-0" style={{
                borderRight: i < REVIEWS.length - 1 ? undefined : undefined,
              }}>
                <p
                  className="font-display text-[80px] leading-none mb-4"
                  style={{ color: 'var(--color-dark)', opacity: 0.06 }}
                >
                  "
                </p>

                <p
                  className="font-body text-[14px] leading-[1.8] mb-8"
                  style={{ color: 'var(--color-dark-soft)', opacity: 0.7 }}
                >
                  {review.text}
                </p>

                <div>
                  <p
                    className="font-body text-[13px] font-medium"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    {review.author}
                  </p>
                  <p
                    className="font-body text-[11px] tracking-[0.1em] uppercase mt-1"
                    style={{ color: 'var(--color-dark-soft)', opacity: 0.4 }}
                  >
                    {review.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
