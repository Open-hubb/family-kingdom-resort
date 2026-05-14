import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LINES = [
  'Thirty years on the Aberdeen Peninsula.',
  'A family-run home for travellers, ',
  'rooted in Sierra Leonean warmth.',
  'We open the gate, pour the tea,',
  'walk you to the sea — then leave you to it.',
]

export default function Manifesto() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 pt-0 pb-16 md:pb-24"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="font-display font-extrabold tracking-[-0.04em] leading-[1.05]"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(36px, 6vw, 72px)',
          }}
        >
          {LINES.map((line, i) => (
            <span key={i} className="block line-reveal">
              <span
                ref={(el) => (linesRef.current[i] = el)}
                className="block"
                style={{ transform: 'translateY(105%)' }}
              >
                {i === 1 ? (
                  <>
                    A <span style={{ color: 'var(--color-accent)' }}>family-run</span> home for travellers,
                  </>
                ) : i === 4 ? (
                  <>
                    walk you to the <span style={{ color: 'var(--color-accent)' }}>sea</span> — then leave you to it.
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
