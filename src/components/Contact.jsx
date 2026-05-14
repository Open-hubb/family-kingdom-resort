import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock, Plane } from 'lucide-react'

const INFO = [
  { icon: MapPin, label: 'Address', value: '78 Cape Road, Aberdeen, Freetown, Sierra Leone' },
  { icon: Phone, label: 'Phone', value: '+232 76 601007 / +232 80 800100' },
  { icon: Mail, label: 'Email', value: 'info@familykingdomresort.com' },
  { icon: Clock, label: 'Reception', value: '24 hours, 7 days a week' },
  { icon: Plane, label: 'Airport Transfer', value: 'Complimentary pickup from Lungi International Airport' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)

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

      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: infoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }

      if (formRef.current) {
        gsap.fromTo(formRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const inputClasses = "w-full font-body text-[14px] p-4 outline-none transition-all duration-200 bg-transparent"
  const inputStyle = {
    color: 'var(--color-dark)',
    borderBottom: '1px solid var(--color-border)',
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
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
            Get In Touch
          </p>
          <h2
            ref={headingRef}
            className="font-display text-4xl md:text-5xl lg:text-[56px] font-light leading-[1.1]"
            style={{ color: 'var(--color-dark)' }}
          >
            Contact &
            <br />
            Reservations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div ref={infoRef} className="space-y-0 mb-12">
              {INFO.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start py-5"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <item.icon
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--color-accent-dark)' }}
                  />
                  <div>
                    <p
                      className="font-body text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: 'var(--color-dark-soft)', opacity: 0.4 }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-body text-[14px] leading-relaxed"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-6 rounded-sm"
              style={{
                backgroundColor: 'var(--color-offwhite)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--color-dark)' }}
              >
                Check-in / Check-out
              </p>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: 'var(--color-dark-soft)', opacity: 0.6 }}>
                Check-in: 2:00 PM &middot; Check-out: 12:30 PM
                <br />
                Free airport & ferry terminal transfer included.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-8">
              {['Facebook', 'Instagram', 'Tripadvisor'].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="font-body text-[11px] tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-50"
                  style={{ color: 'var(--color-dark)' }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <input
                type="text"
                placeholder="Full Name"
                className={inputClasses}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email Address"
                className={inputClasses}
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <input
                type="date"
                className={inputClasses}
                style={inputStyle}
              />
              <input
                type="date"
                className={inputClasses}
                style={inputStyle}
              />
            </div>
            <select
              className={`${inputClasses} cursor-pointer`}
              style={inputStyle}
            >
              <option value="">Select a room type</option>
              <option value="budget">Budget Room — $80/night</option>
              <option value="standard-empire">Standard Single (Empire) — $90/night</option>
              <option value="standard-mansion">Standard Room (Mansion) — $100/night</option>
              <option value="plaza-deluxe">Plaza Deluxe — $140/night</option>
              <option value="deluxe-single">Deluxe Single (Palace) — $150/night</option>
              <option value="suite">Suite (Palace) — $175/night</option>
            </select>
            <textarea
              rows={3}
              placeholder="Special Requests"
              className={`${inputClasses} resize-none`}
              style={inputStyle}
            />

            <button
              type="submit"
              className="w-full font-body text-[11px] tracking-[0.12em] uppercase py-4 mt-8 rounded-full cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                border: '1px solid var(--color-dark)',
                color: 'var(--color-dark)',
                backgroundColor: 'transparent',
              }}
            >
              Check Availability
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
