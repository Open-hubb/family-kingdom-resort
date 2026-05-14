import { Home } from 'lucide-react'

const ITEMS = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'About', href: '#about' },
  { label: 'Experiences ›', href: '#recreation' },
  { label: 'Reviews', href: '#reviews' },
]

export default function BottomNav() {
  const go = (href) => (e) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 z-50"
      aria-label="Primary"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          backgroundColor: '#1A1A1A',
          boxShadow:
            '0 18px 40px -10px rgba(0,0,0,0.35), 0 4px 14px -4px rgba(0,0,0,0.25)',
        }}
      >
        <a
          href="#home"
          onClick={go('#home')}
          className="h-10 w-10 grid place-items-center rounded-full text-white/85 hover:text-white hover:bg-white/8 transition"
          aria-label="Home"
        >
          <Home size={16} strokeWidth={1.75} />
        </a>
        {ITEMS.map((it) => (
          <a
            key={it.href}
            href={it.href}
            onClick={go(it.href)}
            className="hidden sm:inline-flex items-center px-3.5 h-10 rounded-full font-body text-[13px] text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            {it.label}
          </a>
        ))}
        <a
          href="#rooms"
          onClick={go('#rooms')}
          className="ml-1 inline-flex items-center px-4 h-10 rounded-full font-body text-[13px] font-medium text-white transition hover:brightness-110 active:scale-95"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Book now
        </a>
      </div>
    </nav>
  )
}
