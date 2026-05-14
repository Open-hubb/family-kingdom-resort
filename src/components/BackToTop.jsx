import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 h-11 w-11 rounded-full grid place-items-center transition"
      style={{
        backgroundColor: '#1A1A1A',
        color: 'white',
        boxShadow:
          '0 18px 40px -10px rgba(0,0,0,0.35), 0 4px 14px -4px rgba(0,0,0,0.25)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.4s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <ChevronUp size={18} strokeWidth={2} />
    </button>
  )
}
