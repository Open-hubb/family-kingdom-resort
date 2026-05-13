import { useMemo } from 'react'

export default function HeroParticles() {
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < 80; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 14,
        duration: 14 + Math.random() * 18,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.25 + Math.random() * 0.55,
      })
    }
    return arr
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(232,198,144,0.18) 0%, transparent 45%), radial-gradient(ellipse at 75% 75%, rgba(200,169,110,0.14) 0%, transparent 50%)',
          mixBlendMode: 'screen',
        }}
      />
      <div className="absolute inset-0 atmos-aurora" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full atmos-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, rgba(255,225,180,0.95) 0%, rgba(255,210,150,0.5) 40%, transparent 70%)',
            boxShadow: '0 0 6px rgba(255,210,150,0.6)',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--peak-opacity': p.opacity,
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-overlay" aria-hidden="true">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
      <style>{`
        @keyframes atmos-float {
          0% { transform: translate3d(0, 30px, 0) scale(0.6); opacity: 0; }
          15% { opacity: var(--peak-opacity); }
          85% { opacity: var(--peak-opacity); }
          100% { transform: translate3d(var(--drift), -120px, 0) scale(1.05); opacity: 0; }
        }
        .atmos-particle {
          animation: atmos-float linear infinite;
          will-change: transform, opacity;
        }
        @keyframes aurora-pan {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-3%, -2%, 0); }
        }
        .atmos-aurora {
          background:
            radial-gradient(circle at 20% 80%, rgba(232,198,144,0.12) 0%, transparent 35%),
            radial-gradient(circle at 80% 20%, rgba(232,198,144,0.10) 0%, transparent 40%);
          animation: aurora-pan 24s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @media (prefers-reduced-motion: reduce) {
          .atmos-particle, .atmos-aurora { animation: none; }
        }
      `}</style>
    </div>
  )
}
