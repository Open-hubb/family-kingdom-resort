export default function Marquee() {
  const items = [
    'Aberdeen Peninsula',
    'Atlantic Ocean',
    'Since 1994',
    'Family Kingdom',
    'Freetown',
    'Sierra Leone',
  ]
  const row = [...items, ...items, ...items]

  return (
    <section
      className="relative py-10 md:py-14 overflow-hidden"
      style={{
        backgroundColor: 'rgba(14, 13, 11, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex whitespace-nowrap marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-light italic px-10 md:px-16 flex items-center gap-10 md:gap-16"
            style={{ color: 'var(--color-offwhite)' }}
          >
            {item}
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee 38s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
