export default function Footer() {
  return (
    <footer
      className="py-12 px-6 md:px-10"
      style={{
        backgroundColor: 'var(--color-offwhite)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-display text-xl font-semibold tracking-tight cursor-pointer transition-opacity duration-200 hover:opacity-60"
            style={{ color: 'var(--color-dark)' }}
          >
            Family Kingdom
          </a>

          <p
            className="font-body text-[11px] tracking-wide text-center"
            style={{ color: 'var(--color-dark-soft)', opacity: 0.4 }}
          >
            &copy; {new Date().getFullYear()} The Family Kingdom Resort. Aberdeen, Freetown, Sierra Leone.
          </p>

          <p
            className="font-body text-[11px] tracking-wide"
            style={{ color: 'var(--color-dark-soft)', opacity: 0.3 }}
          >
            Endorsed by Sierra Leone National Tourist Board
          </p>
        </div>
      </div>
    </footer>
  )
}
