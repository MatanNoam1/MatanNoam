import { motion } from 'framer-motion'
import { Link2, ExternalLink, Mail } from 'lucide-react'

const STATS = [
  { num: '3+', label: 'Years IDF Service' },
  { num: '3rd', label: 'Year at BGU' },
  { num: '2+', label: 'Years Teaching' },
]

const SOCIALS = [
  { icon: Link2,        label: 'LinkedIn', href: 'https://www.linkedin.com/in/matan-noam-software-data/' },
  { icon: ExternalLink, label: 'GitHub',   href: 'https://github.com/MatanNoam1' },
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
