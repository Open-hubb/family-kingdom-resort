import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AWARDS = [
  { title: 'National Tourist Board Endorsement', org: 'Sierra Leone NTB', date: '2024' },
  { title: 'Top 10 Beachfront Resorts — West Africa', org: 'TripAdvisor', date: '2023' },
  { title: 'Family-Friendly Stay of the Year', org: 'Aberdeen Hospitality Awards', date: '2022' },
  { title: 'Booking.com Traveller Review Award', org: 'Booking.com', date: '2022' },
  { title: 'Three Decades of Hospitality Milestone', org: 'Freetown City Council', date: '2024' },
  { title: 'Best Independent Resort, Atlantic Coast', org: 'West Africa Travel Press', date: '2021' },
]

export default function Awards() {
  const sectionRef = useRef(null)
  const rowsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="awards" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="eyebrow mb-3">International Credibility</p>
          <h2
            className="font-display font-extrabold tracking-[-0.03em] leading-[1.0]"
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(40px, 5.5vw, 76px)' }}
          >
            <span style={{ color: 'var(--color-accent)' }}>Awards</span> &amp; Recognition
          </h2>
          <p
            className="font-body text-[15px] md:text-[16px] leading-[1.7] mt-6 max-w-xl"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            From the Atlantic coast of Freetown to international travel press —
            three decades of care, recognised by the people who notice these things.
          </p>
        </div>

        <ul className="border-t" style={{ borderColor: 'var(--color-border)' }}>
          {AWARDS.map((a, i) => (
            <li
              key={i}
              ref={(el) => (rowsRef.current[i] = el)}
              className="grid grid-cols-12 gap-6 py-6 md:py-8 border-b items-center"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="col-span-12 md:col-span-7">
                <p
                  className="font-display text-[22px] md:text-[26px] font-bold tracking-[-0.02em]"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {a.title}
                </p>
              </div>
              <div className="col-span-7 md:col-span-3">
                <p className="font-body text-[13px] md:text-[14px]" style={{ color: 'var(--color-ink-soft)' }}>
                  {a.org}
                </p>
              </div>
              <div className="col-span-5 md:col-span-2 text-right">
                <p className="font-body text-[13px] tabular-nums" style={{ color: 'var(--color-ink-faint)' }}>
                  {a.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
