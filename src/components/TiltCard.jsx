import { useRef } from 'react'

export default function TiltCard({ children, className = '', max = 8, scale = 1.02, onClick }) {
  const ref = useRef(null)
  const rafRef = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateY = x * max * 2
    const rotateX = -y * max * 2
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      const sheen = el.querySelector('[data-sheen]')
      if (sheen) {
        sheen.style.opacity = '1'
        sheen.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.18), transparent 55%)`
      }
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)'
    const sheen = el.querySelector('[data-sheen]')
    if (sheen) sheen.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={className}
      style={{
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
