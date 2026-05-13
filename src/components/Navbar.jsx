import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Recreation', href: '#recreation' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 80)
      if (currentY > lastScrollY.current && currentY > 200) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        yPercent: isHidden && !isMobileOpen ? -100 : 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [isHidden, isMobileOpen])

  useEffect(() => {
    if (isMobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-link'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.15 }
      )
    }
  }, [isMobileOpen])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const heroActive = !isScrolled

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: heroActive ? 'transparent' : 'var(--color-offwhite)',
          borderBottom: heroActive ? 'none' : '1px solid var(--color-border)',
        }}
        onMouseEnter={() => isScrolled && setIsHidden(false)}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[70px] md:h-[80px]">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 -ml-2 cursor-pointer transition-opacity duration-200 hover:opacity-60"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? (
              <X size={22} style={{ color: heroActive ? 'white' : 'var(--color-dark)' }} />
            ) : (
              <Menu size={22} style={{ color: heroActive ? 'white' : 'var(--color-dark)' }} />
            )}
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="absolute left-1/2 -translate-x-1/2 font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap"
            style={{ color: heroActive ? 'white' : 'var(--color-dark)' }}
          >
            Family Kingdom
          </a>

          <a
            href="#rooms"
            onClick={(e) => handleLinkClick(e, '#rooms')}
            className="font-body text-[11px] tracking-[0.12em] uppercase px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              border: heroActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--color-dark)',
              color: heroActive ? 'white' : 'var(--color-dark)',
              backgroundColor: 'transparent',
            }}
          >
            Book
          </a>
        </div>
      </nav>

      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
          style={{ backgroundColor: 'var(--color-offwhite)' }}
        >
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-5 left-4 p-2 cursor-pointer"
            aria-label="Close menu"
          >
            <X size={22} style={{ color: 'var(--color-dark)' }} />
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="mobile-link font-display text-4xl md:text-5xl font-light cursor-pointer transition-opacity duration-200 hover:opacity-50"
              style={{ color: 'var(--color-dark)' }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#rooms"
            onClick={(e) => handleLinkClick(e, '#rooms')}
            className="mobile-link font-body text-[11px] tracking-[0.12em] uppercase px-8 py-3 rounded-full mt-6 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
            style={{
              border: '1px solid var(--color-dark)',
              color: 'var(--color-dark)',
            }}
          >
            Book Now
          </a>
        </div>
      )}
    </>
  )
}
