import { Mail, Phone } from 'lucide-react'

const MARQUEE_PHRASE = "Come stay with us"

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-24 md:pt-32 pb-8 overflow-hidden">
      {/* Giant outlined wordmark */}
      <div
        className="relative w-full flex justify-center pointer-events-none select-none"
        aria-hidden="true"
        style={{ overflow: 'hidden' }}
      >
        <h2
          className="outline-text whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 22vw, 280px)',
            lineHeight: 0.85,
            opacity: 0.22,
          }}
        >
          Family Kingdom
        </h2>
      </div>

      {/* Static centred call-to-action */}
      <div className="my-10 md:my-14 text-center px-6">
        <span
          className="font-display font-extrabold tracking-[-0.03em] inline-flex items-center gap-4 md:gap-6"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(32px, 5.5vw, 64px)',
            lineHeight: 1,
          }}
        >
          {MARQUEE_PHRASE}
          <span style={{ color: 'var(--color-accent)', fontWeight: 800 }} aria-hidden="true">
            ✱
          </span>
        </span>
      </div>

      {/* Contact lines */}
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 items-center justify-center mb-10">
          <a
            href="mailto:info@familykingdomresort.com"
            className="inline-flex items-center gap-2.5 font-body text-[15px] md:text-[16px] hover:opacity-70 transition"
            style={{ color: 'var(--color-ink)' }}
          >
            <Mail size={16} strokeWidth={1.75} />
            info@familykingdomresort.com
          </a>
          <a
            href="tel:+23276601007"
            className="inline-flex items-center gap-2.5 font-body text-[15px] md:text-[16px] hover:opacity-70 transition"
            style={{ color: 'var(--color-ink)' }}
          >
            <Phone size={16} strokeWidth={1.75} />
            +232 76 601007
          </a>
        </div>

        <p className="font-body text-[13px] mb-1" style={{ color: 'var(--color-ink-soft)' }}>
          78 Cape Road, Aberdeen, Freetown, Sierra Leone
        </p>
        <p className="font-script text-[18px]" style={{ color: 'var(--color-ink-soft)' }}>
          24-hour reception &middot; complimentary airport transfer
        </p>
      </div>

      {/* Bottom row */}
      <div
        className="mt-12 md:mt-16 pt-6 border-t max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <p className="font-body text-[12px]" style={{ color: 'var(--color-ink-faint)' }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="font-body text-[12px]" style={{ color: 'var(--color-ink-faint)' }}>
          Built and powered by{' '}
          <a
            href="https://www.flotme.ai/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-ink)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Flot
          </a>
        </p>
      </div>
    </footer>
  )
}
