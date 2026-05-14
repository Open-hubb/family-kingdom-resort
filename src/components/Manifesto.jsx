import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LINES = [
  { text: 'Thirty years on the Aberdeen Peninsula.', highlight: null },
  { text: 'A family-run home for travellers,', highlight: 'family-run' },
  { text: 'rooted in Sierra Leonean warmth.', highlight: null },
  { text: 'We open the gate, pour the tea,', highlight: null },
  { text: 'walk you to the sea — then leave you to it.', highlight: 'sea' },
]

export default function Manifesto() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        linesRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 md:px-12 pt-4 pb-14 md:pt-6 md:pb-20"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="font-display font-extrabold tracking-[-0.04em] leading-[1.05]"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(32px, 5.5vw, 64px)',
          }}
        >
          {LINES.map((line, i) => {
            const renderLine = () => {
              if (!line.highlight) return line.text
              const parts = line.text.split(line.highlight)
              return (
                <>
                  {parts[0]}
                  <span style={{ color: 'var(--color-accent)' }}>{line.highlight}</span>
                  {parts[1]}
                </>
              )
            }
            return (
              <span
                key={i}
                ref={(el) => (linesRef.current[i] = el)}
                className="block"
              >
                {renderLine()}
              </span>
            )
          })}
        </h2>
      </div>
    </section>
  )
}
