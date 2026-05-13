import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Dining from './components/Dining'
import Recreation from './components/Recreation'
import Events from './components/Events'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import BookingModal from './components/BookingModal'
import Marquee from './components/Marquee'
import CustomCursor from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <BookingProvider>
      <div className="grain">
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Rooms />
          <Dining />
          <Recreation />
          <Events />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
