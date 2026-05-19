import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'What time is check-in and check-out?',
    a: 'Check-in is from 2:00 PM and check-out is at 12 PM. Earlier or later times can usually be arranged on request — just let reception know in advance.',
  },
  {
    q: 'Is airport pickup included?',
    a: 'No, but we offer complimentary pickup from sea coach.',
  },
  {
    q: 'How far is the beach from the resort?',
    a: 'Aberdeen Beach is a one-minute walk through our private gate.',
  },
  {
    q: 'Do you accommodate families with children?',
    a: 'Absolutely — that\'s in our name. We have a dedicated Fun Park, a children\'s pool, family rooms with extra bedding, and high chairs for the restaurants.',
  },
  {
    q: 'What payment methods do you accept?',
    a: null, // rendered as JSX below
    aJsx: (
      <>
        We accept Visa, Mastercard and mobile money (Orange Money and Afrimoney), powered by{' '}
        <a
          href="https://www.flotme.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          Flot
        </a>
        , cash payment is also accepted.
      </>
    ),
  },
  {
    q: 'Can I host an event or wedding here?',
    a: 'Yes. We have a conference hall, a banquet hall, and beachfront ceremony spaces. Our events team handles catering and AV — reach out for a tailored proposal.',
  },
]

function Item({ q, a, isOpen, onToggle }) {
  const contentRef = useRef(null)
  return (
    <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left"
      >
        <span
          className="font-display text-[20px] md:text-[26px] font-bold tracking-[-0.02em]"
          style={{ color: 'var(--color-ink)' }}
        >
          {q}
        </span>
        <span
          className="h-9 w-9 flex-shrink-0 rounded-full grid place-items-center transition-transform"
          style={{
            backgroundColor: isOpen ? 'var(--color-accent)' : '#1A1A1A',
            color: 'white',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <Plus size={16} strokeWidth={2} />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-500"
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight || 400) + 'px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="font-body text-[15px] md:text-[16px] leading-[1.7] pb-7 pr-12 max-w-3xl"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const eyebrowRef = useRef(null)

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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p ref={eyebrowRef} className="eyebrow mb-3" style={{ opacity: 0 }}>
            Common questions and answers
          </p>
          <h2
            ref={headingRef}
            className="font-display font-extrabold tracking-[-0.03em] leading-[1.0]"
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(40px, 5.5vw, 76px)', opacity: 0 }}
          >
            Frequently Asked <span style={{ color: 'var(--color-accent)' }}>Questions</span>
          </h2>
        </div>

        <div>
          {FAQS.map((item, i) => (
            <Item
              key={i}
              q={item.q}
              a={item.aJsx ?? item.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
