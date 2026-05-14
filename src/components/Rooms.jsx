import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ArrowRight } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import TiltCard from './TiltCard'
import 'swiper/css'

export default function Rooms() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const swiperWrapRef = useRef(null)
  const { rooms, selectRoom } = useBooking()

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

      gsap.fromTo(swiperWrapRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: swiperWrapRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="py-28 md:py-40"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-display text-2xl font-light italic" style={{ color: 'var(--color-accent-dark)' }}>
            03
          </span>
          <span className="block w-16 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          <span className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-dark-soft)', opacity: 0.5 }}>
            Stay With Us
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              ref={labelRef}
              className="font-body text-[11px] tracking-[0.25em] uppercase mb-6"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Accommodations
            </p>
            <h2
              ref={headingRef}
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1]"
              style={{ color: 'var(--color-dark)' }}
            >
              Rooms & Suites
            </h2>
          </div>
          <p
            className="font-body text-[13px] leading-relaxed max-w-sm"
            style={{ color: 'var(--color-dark-soft)', opacity: 0.5 }}
          >
            All rooms include complimentary breakfast, free Wi-Fi, and laundry
            service for stays of two nights or more.
          </p>
        </div>
      </div>

      <div ref={swiperWrapRef} className="pl-6 md:pl-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.15}
          breakpoints={{
            640: { slidesPerView: 1.8, spaceBetween: 24 },
            1024: { slidesPerView: 2.5, spaceBetween: 28 },
            1400: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          className="!overflow-visible"
        >
          {rooms.map((room, idx) => (
            <SwiperSlide key={room.id}>
              <TiltCard
                className="group cursor-pointer"
                onClick={() => selectRoom(room.id)}
                max={6}
                scale={1.015}
              >
                <div className="relative overflow-hidden rounded-sm aspect-[3/4] mb-5">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    data-sheen
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{ opacity: 0, mixBlendMode: 'overlay' }}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
                    }}
                  />
                  <div className="absolute top-5 left-5 font-display text-xs tracking-[0.25em] text-white/80 italic">
                    N° {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <span
                      className="font-body text-[11px] tracking-[0.12em] uppercase text-white flex items-center gap-1.5"
                    >
                      Book Now
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="font-body text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: 'var(--color-dark-soft)', opacity: 0.4 }}
                    >
                      {room.building}
                    </p>
                    <h3
                      className="font-display text-xl md:text-2xl font-semibold"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {room.name}
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="font-display text-2xl font-light"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      ${room.price}
                    </p>
                    <p
                      className="font-body text-[10px] tracking-wider uppercase"
                      style={{ color: 'var(--color-dark-soft)', opacity: 0.4 }}
                    >
                      per night
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {room.features.slice(0, 3).map((feat, j) => (
                    <span
                      key={j}
                      className="font-body text-[10px] tracking-wide px-2.5 py-1 rounded-full"
                      style={{
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-dark-soft)',
                        opacity: 0.6,
                      }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
