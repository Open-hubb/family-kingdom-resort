import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

const TAGLINES = [
  'Family staple',
  'Solo-friendly',
  'Long-stay favourite',
  'Premium comfort',
  'Palace classic',
  'The full suite',
]

export default function Rooms() {
  const sectionRef = useRef(null)
  const stackRef = useRef(null)
  const cardsRef = useRef([])
  const phoneRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const { rooms, selectRoom } = useBooking()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )

      // Skip stacking on mobile/touch — simple stacked scroll
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      if (isTouch) return

      const cards = cardsRef.current.filter(Boolean)
      const total = cards.length

      // Set initial state — only the first card is fully visible & in position
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          opacity: i === 0 ? 1 : 1,
        })
      })

      // Pin the left column for the duration of the stacking sequence
      const distancePerCard = 0.85 // viewport heights of scroll per card transition
      const totalScroll = (total - 1) * distancePerCard

      ScrollTrigger.create({
        trigger: stackRef.current,
        start: 'top top',
        end: `+=${totalScroll * 100}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress * (total - 1) // 0..total-1
          for (let i = 0; i < total; i++) {
            const card = cards[i]
            if (!card) continue

            if (i === 0) {
              // Bottom card sits at base; just shrink slightly as others stack on top
              const stackedAbove = Math.min(progress, total - 1)
              gsap.set(card, {
                yPercent: 0,
                scale: 1 - stackedAbove * 0.025,
                opacity: 1 - stackedAbove * 0.07,
              })
            } else {
              // Each next card slides up from yPercent:100 → 0 over [i-1, i] in progress
              const local = Math.max(0, Math.min(1, progress - (i - 1)))
              const slid = 1 - local // 1 at start, 0 at end
              // Once this card has landed, subsequent layers stack on it. Number of cards stacked ON TOP of this one:
              const onTop = Math.max(0, progress - i)
              gsap.set(card, {
                yPercent: slid * 100 - onTop * 2.4, // small offset up per stacked layer above
                scale: 1 - onTop * 0.025,
                opacity: local < 1 ? local : 1 - onTop * 0.07,
              })
            }
          }

          // Phone rotates over the entire stacking sequence
          if (phoneRef.current) {
            const p = self.progress
            const rotY = -15 + p * 30 // -15 → 15
            const rotX = 8 + p * -12 // 8 → -4
            phoneRef.current.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="relative px-6 md:px-12 py-24 md:py-32"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Heading row */}
        <div className="mb-12 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p ref={eyebrowRef} className="eyebrow mb-3" style={{ opacity: 0 }}>
              Stay With Us
            </p>
            <h2
              ref={headingRef}
              className="font-display font-extrabold tracking-[-0.03em] leading-[1.0]"
              style={{
                color: 'var(--color-ink)',
                fontSize: 'clamp(40px, 6vw, 84px)',
                opacity: 0,
              }}
            >
              Where would you like to{' '}
              <span style={{ color: 'var(--color-accent)' }}>rest?</span>
            </h2>
          </div>
        </div>

        {/* Two-column: stack on left, sticky phone on right */}
        <div
          ref={stackRef}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 min-h-screen items-start"
        >
          {/* Left: stack column */}
          <div
            className="relative"
            style={{ height: 'clamp(440px, 60vh, 560px)' }}
          >
            {rooms.map((room, i) => (
              <div
                key={room.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="fk-card absolute inset-0 p-6 md:p-9 flex flex-col"
                style={{
                  willChange: 'transform, opacity',
                  zIndex: i + 1, // later cards on top
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="font-script text-[1.35rem] leading-none" style={{ color: 'var(--color-ink-soft)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>/ </span>
                    {TAGLINES[i] || 'Recommended'}
                  </p>
                  <span
                    className="font-body text-[11px] tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(242,107,31,0.10)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className="font-display font-extrabold leading-[0.95] tracking-[-0.03em] mb-3"
                  style={{
                    color: 'var(--color-ink)',
                    fontSize: 'clamp(34px, 4.2vw, 54px)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}. {room.name}
                </h3>

                <p
                  className="font-body text-[14px] md:text-[15px] leading-relaxed mb-5 max-w-xl"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-auto">
                  {room.features.slice(0, 5).map((f) => (
                    <span
                      key={f}
                      className="font-body text-[11px] tracking-wide px-3 py-1.5 rounded-full"
                      style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-ink-soft)',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-end justify-between gap-6 mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-ink-faint)' }}>
                      from
                    </p>
                    <p
                      className="font-display font-bold tracking-[-0.02em]"
                      style={{ color: 'var(--color-ink)', fontSize: '34px', lineHeight: 1 }}
                    >
                      ${room.price}
                      <span className="font-body text-[12px] font-normal ml-1" style={{ color: 'var(--color-ink-soft)' }}>
                        / night
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => selectRoom(room.id)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-body text-[13px] font-medium text-white transition hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Book this room
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky phone with current room image */}
          <div className="hidden lg:flex justify-center items-start sticky top-24" style={{ alignSelf: 'flex-start' }}>
            <div
              ref={phoneRef}
              className="relative"
              style={{
                width: '260px',
                aspectRatio: '9 / 19.5',
                borderRadius: '38px',
                background: '#1A1A1A',
                padding: '10px',
                boxShadow:
                  '0 50px 80px -30px rgba(0,0,0,0.35), 0 10px 25px -8px rgba(0,0,0,0.18)',
                transform: 'perspective(1200px) rotateY(-15deg) rotateX(8deg)',
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{ borderRadius: '28px', backgroundColor: '#F5F1EB' }}
              >
                <img
                  src={rooms[0]?.image || '/images/suite-mansion/1.jpeg'}
                  alt="Room preview"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* notch */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full"
                style={{ backgroundColor: '#000' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
