import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

function GitHubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const LINKS = [
  { icon: Mail,         label: 'Email',    sub: 'matannoam3@gmail.com',     href: 'mailto:matannoam3@gmail.com' },
  { icon: LinkedInIcon, label: 'LinkedIn', sub: 'matan-noam-software-data', href: 'https://www.linkedin.com/in/matan-noam-software-data/' },
  { icon: GitHubIcon,   label: 'GitHub',   sub: 'MatanNoam1',               href: 'https://github.com/MatanNoam1' },
  { icon: Phone,        label: 'Phone',    sub: '054-2322540',              href: 'tel:+972542322540' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Get In Touch</span>
        </motion.div>

        {/* CTA headline */}
        <motion.div
          className="mb-16 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display italic text-text-primary leading-tight mb-6">
            Open to internships, <em>collaborations</em>, and new opportunities.
          </h2>
          <a
            href="mailto:matannoam3@gmail.com"
            className="relative inline-flex items-center gap-2 rounded-full px-7 py-3.5
                       text-sm font-medium text-text-primary group
                       bg-surface border border-stroke
                       hover:border-[#4E85BF]/60 hover:-translate-y-0.5
                       transition-all duration-300"
          >
            <Mail size={16} />
            Say hello ↗
          </a>
        </motion.div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-surface border border-stroke
                         rounded-2xl text-center hover:border-[#4E85BF]/40 hover:-translate-y-1
                         transition-all duration-300 hover:shadow-[0_20px_40px_rgba(78,133,191,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <link.icon size={24} style={{ color: '#89AACC' }} />
              <div>
                <p className="text-sm font-semibold text-text-primary">{link.label}</p>
                <p className="text-xs text-muted mt-1 break-all">{link.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
