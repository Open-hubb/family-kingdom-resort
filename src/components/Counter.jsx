import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, duration = 1.8 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)
  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0

  useEffect(() => {
    if (!ref.current) return

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const startTime = performance.now()
      const tick = (now) => {
        const elapsed = (now - startTime) / 1000
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(numeric * eased)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const check = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh * 0.85 && rect.bottom > 0) {
        start()
        window.removeEventListener('scroll', check)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })

    let observer
    try {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) start() }),
        { threshold: 0.1 }
      )
      observer.observe(ref.current)
    } catch (_) { /* noop */ }

    return () => {
      window.removeEventListener('scroll', check)
      if (observer) observer.disconnect()
    }
  }, [numeric, duration])

  const isInteger = !String(value).includes('.')
  const formatted = isInteger ? Math.round(display) : display.toFixed(1)
  const hasPlus = String(value).includes('+')
  const hasMin = String(value).toLowerCase().includes('min')

  return (
    <span ref={ref}>
      {hasMin ? (
        <>
          {Math.round(display)}
          <span className="text-2xl md:text-3xl"> min</span>
        </>
      ) : (
        <>
          {formatted}
          {hasPlus ? '+' : ''}
        </>
      )}
    </span>
  )
}
