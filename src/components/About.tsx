import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const STATS = [
  { num: '3+', label: 'Years IDF Service' },
  { num: '3rd', label: 'Year at BGU' },
  { num: '2+', label: 'Years Teaching' },
]

const SOCIALS = [
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/matan-noam-software-data/' },
  { icon: GitHubIcon,   label: 'GitHub',   href: 'https://github.com/MatanNoam1' },
  { icon: Mail,         label: 'Email',    href: 'mailto:matannoam3@gmail.com' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export default function About() {
  return (
    <section id="about" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">About Me</span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left: avatar + stats */}
          <motion.div
            className="flex flex-col items-center gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Avatar */}
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center text-2xl font-display italic text-text-primary"
              style={{
                background: 'linear-gradient(hsl(var(--surface)), hsl(var(--surface))) padding-box, linear-gradient(90deg,#89AACC,#4E85BF) border-box',
                border: '2px solid transparent',
              }}
            >
              MN
            </div>

            {/* Quick stats */}
            <div className="w-full flex flex-col gap-3">
              {STATS.map(s => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 px-5 py-4 bg-surface border border-stroke rounded-xl"
                >
                  <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ background: 'linear-gradient(90deg,#89AACC,#4E85BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {s.num}
                  </span>
                  <span className="text-sm text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-display italic leading-tight text-text-primary">
              Building things that <em>matter</em>
            </h2>

            <p className="text-muted leading-relaxed">
              I&apos;m an <strong className="text-text-primary">Information Systems & Software Engineering</strong> student
              at Ben-Gurion University of the Negev, driven by a genuine passion for building software that
              solves real problems — and for helping others grow in tech.
            </p>
            <p className="text-muted leading-relaxed">
              Before university I served 3 years as a{' '}
              <strong className="text-text-primary">Shore Electrician Staff Sergeant</strong> in the Israeli Navy —
              technical precision, composure under pressure, leadership.
            </p>
            <p className="text-muted leading-relaxed">
              Today I&apos;m also a{' '}
              <strong className="text-text-primary">Python instructor at the Nitzanim Program</strong>,
              mentoring high school students from Israel&apos;s periphery toward tech careers and elite units.
            </p>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap mt-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-stroke
                             rounded-lg text-sm text-muted hover:text-text-primary
                             hover:border-[#4E85BF]/50 transition-all duration-200"
                >
                  <s.icon size={16} />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
