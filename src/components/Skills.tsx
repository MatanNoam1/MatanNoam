import { motion } from 'framer-motion'

const SKILLS = [
  {
    icon: '⚡',
    title: 'Languages',
    tags: [
      { label: 'Python', hot: true },
      { label: 'Java', hot: true },
      { label: 'C', hot: false },
      { label: 'C++', hot: false },
      { label: 'SQL', hot: false },
    ],
  },
  {
    icon: '🛠️',
    title: 'Tools & Platforms',
    tags: [
      { label: 'Git', hot: false },
      { label: 'SAP ERP', hot: false },
      { label: 'Priority ERP', hot: false },
      { label: 'Linux', hot: false },
    ],
  },
  {
    icon: '🧠',
    title: 'Academic Focus',
    tags: [
      { label: 'DSA', hot: true },
      { label: 'Machine Learning', hot: true },
      { label: 'Databases', hot: false },
      { label: 'OOP', hot: false },
      { label: 'Computer Architecture', hot: false },
    ],
  },
  {
    icon: '🤝',
    title: 'Soft Skills',
    tags: [
      { label: 'Team Leadership', hot: false },
      { label: 'Mentorship', hot: false },
      { label: 'Problem Solving', hot: true },
      { label: 'System Design', hot: true },
      { label: 'Self-Learning', hot: false },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}

export default function Skills() {
  return (
    <section id="skills" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Technical Skills</span>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-surface border border-stroke rounded-2xl p-7
                         hover:border-[#4E85BF]/40 transition-colors duration-300
                         hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,133,191,0.1)]"
            >
              <div className="text-2xl mb-4">{card.icon}</div>
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                {card.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {card.tags.map(tag => (
                  <span
                    key={tag.label}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                      ${tag.hot
                        ? 'bg-[#89AACC]/10 border-[#89AACC]/30 text-[#89AACC]'
                        : 'bg-white/5 border-stroke text-muted hover:border-[#4E85BF]/40 hover:text-text-primary'
                      }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
