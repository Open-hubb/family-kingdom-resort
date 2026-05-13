import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    const onOver = (e) => {
      const target = e.target
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea, .swiper-slide')) {
        cursor.classList.add('cursor-grow')
      }
    }
    const onOut = (e) => {
      const target = e.target
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea, .swiper-slide')) {
        cursor.classList.remove('cursor-grow')
      }
    }

    const animate = () => {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    animate()

    document.body.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-ring"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        aria-hidden="true"
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .has-custom-cursor, .has-custom-cursor * { cursor: none !important; }
        }
        .custom-cursor-ring,
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }
        .custom-cursor-ring {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s;
        }
        .custom-cursor-ring.cursor-grow {
          width: 64px;
          height: 64px;
          border-color: rgba(232, 198, 144, 0.95);
        }
        .custom-cursor-dot {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
        }
        @media (pointer: coarse) {
          .custom-cursor-ring, .custom-cursor-dot { display: none; }
        }
      `}</style>
    </>
  )
}
