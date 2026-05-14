import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingProvider } from './context/BookingContext'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Rooms from './components/Rooms'
import Awards from './components/Awards'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import BookingModal from './components/BookingModal'
import BottomNav from './components/BottomNav'
import BackToTop from './components/BackToTop'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
      infinite: false,
    })
    lenisRef.current = lenis

    // Hook Lenis into ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value, { immediate: true })
        return window.scrollY
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <BookingProvider>
      <div className="grain page-frame relative" style={{ backgroundColor: 'var(--color-bg)' }}>
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

        <main className="relative" style={{ zIndex: 1 }}>
          <Hero />
          <Manifesto />
          <Rooms />
          <Awards />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />

        <BottomNav />
        <BackToTop />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
