import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

export default function Rooms() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)
  const cardsRef = useRef([])
  const { rooms, selectRoom } = useBooking()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="relative px-6 md:px-12 pt-12 md:pt-20 pb-20 md:pb-28"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-14">
          <p ref={eyebrowRef} className="eyebrow mb-3" style={{ opacity: 0 }}>
            Stay With Us
          </p>
          <h2
            ref={headingRef}
            className="font-display font-extrabold tracking-[-0.03em] leading-[1.0]"
            style={{
              color: 'var(--color-ink)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              opacity: 0,
            }}
          >
            Where would you like to{' '}
            <span style={{ color: 'var(--color-accent)' }}>rest?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="fk-card overflow-hidden flex flex-col"
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p
                  className="font-body text-[10px] tracking-[0.22em] uppercase mb-2"
                  style={{ color: 'var(--color-ink-faint)' }}
                >
                  {room.building}
                </p>
                <h3
                  className="font-display font-bold tracking-[-0.02em] leading-tight mb-2"
                  style={{ color: 'var(--color-ink)', fontSize: '22px' }}
                >
                  {room.name}
                </h3>
                <p
                  className="font-body text-[13px] leading-relaxed mb-5 flex-1"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="font-body text-[10px] tracking-wide px-2.5 py-1 rounded-full"
                      style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-ink-soft)',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-end justify-between gap-3 pt-4 border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <div>
                    <p
                      className="font-body text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: 'var(--color-ink-faint)' }}
                    >
                      from
                    </p>
                    <p
                      className="font-display font-bold tracking-[-0.02em]"
                      style={{ color: 'var(--color-ink)', fontSize: '24px', lineHeight: 1 }}
                    >
                      ${room.price}
                      <span
                        className="font-body text-[11px] font-normal ml-1"
                        style={{ color: 'var(--color-ink-soft)' }}
                      >
                        / night
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => selectRoom(room.id)}
                    className="inline-flex items-center px-4 py-2.5 rounded-full font-body text-[12px] font-medium text-white transition hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
