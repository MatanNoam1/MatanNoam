import { useScrollY } from '../hooks/useScrollY'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
]

export default function Navbar() {
  const scrollY = useScrollY()
  const scrolled = scrollY > 80

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={`
          inline-flex items-center rounded-full px-2 py-2 gap-1
          bg-surface/70 border border-white/10
          backdrop-blur-md transition-shadow duration-300
          ${scrolled ? 'shadow-md shadow-black/30' : ''}
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          className="w-9 h-9 rounded-full bg-bg flex items-center justify-center
                     text-[13px] font-display italic text-text-primary
                     transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(hsl(var(--bg)), hsl(var(--bg))) padding-box, linear-gradient(90deg,#89AACC,#4E85BF) border-box',
            border: '2px solid transparent',
          }}
        >
          MN
        </a>

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav links */}
        {LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2
                       text-muted hover:text-text-primary hover:bg-stroke/50
                       transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Contact button */}
        <a
          href="#contact"
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2
                     text-muted hover:text-text-primary
                     transition-colors duration-200 group"
        >
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100
                       transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg,#89AACC,#4E85BF)', zIndex: -1 }}
          />
          <span className="relative z-10">Contact ↗</span>
        </a>
      </div>
    </nav>
  )
}
