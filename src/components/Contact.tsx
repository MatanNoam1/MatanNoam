import { motion } from 'framer-motion'
import { Mail, Link2, ExternalLink, Phone } from 'lucide-react'

const LINKS = [
  { icon: Mail,         label: 'Email',    sub: 'matannoam3@gmail.com',     href: 'mailto:matannoam3@gmail.com' },
  { icon: Link2,        label: 'LinkedIn', sub: 'matan-noam-software-data', href: 'https://www.linkedin.com/in/matan-noam-software-data/' },
  { icon: ExternalLink, label: 'GitHub',   sub: 'MatanNoam1',               href: 'https://github.com/MatanNoam1' },
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
