import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    text: "One of the most pleasant stays we've had. The grounds are beautiful — lush greenery and low-rise buildings give it a tranquil resort feel.",
    author: 'Amina K.',
    role: 'Returning guest',
    month: 'March 2024',
  },
  {
    text: 'The breakfast buffet is a standout. Fresh tropical fruit every morning — papaya, banana, star fruit. Staff are polite and genuinely attentive.',
    author: 'James M.',
    role: 'Holiday traveller',
    month: 'January 2024',
  },
  {
    text: 'Spacious rooms with full kitchenettes. The family-run feel is wonderful — you actually meet the owners. Beachfront location is unbeatable.',
    author: 'Priya R.',
    role: 'Business stay',
    month: 'November 2023',
  },
  {
    text: 'Genuinely warm hospitality from the moment we walked through the gate. The fun park kept the kids busy and the beach is just outside.',
    author: 'David O.',
    role: 'Family of four',
    month: 'August 2023',
  },
  {
    text: 'A reliable base for working trips into Freetown. The Wi-Fi held up, the airport pickup was on time, the suite felt like a small apartment.',
    author: 'Fatima S.',
    role: 'Frequent traveller',
    month: 'June 2024',
  },
  {
    text: 'Hosted our wedding reception here. The team handled every detail — catering, music, the lot. Ocean view at sunset is hard to beat.',
    author: 'Michael & Hawa',
    role: 'Wedding party',
    month: 'May 2024',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="px-6 md:px-12 py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p ref={eyebrowRef} className="eyebrow mb-3" style={{ opacity: 0 }}>
            Community Trust &mdash; Testimonials
          </p>
          <h2
            ref={headingRef}
            className="font-display font-extrabold tracking-[-0.03em] leading-[1.0]"
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(40px, 5.5vw, 76px)', opacity: 0 }}
          >
            What <span style={{ color: 'var(--color-accent)' }}>people</span> say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="fk-card p-7 md:p-8 flex flex-col h-full"
              style={{ willChange: 'transform, opacity, filter' }}
            >
              <div className="flex gap-0.5 mb-5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill="var(--color-accent)"
                    strokeWidth={0}
                    style={{ color: 'var(--color-accent)' }}
                  />
                ))}
              </div>
              <p
                className="font-body text-[15px] md:text-[16px] leading-[1.7] mb-6 flex-1"
                style={{ color: 'var(--color-ink)' }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p className="font-body text-[14px] font-medium" style={{ color: 'var(--color-ink)' }}>
                  {r.author}
                </p>
                <p
                  className="font-body text-[12px] mt-0.5"
                  style={{ color: 'var(--color-ink-faint)' }}
                >
                  {r.role} &middot; {r.month}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
