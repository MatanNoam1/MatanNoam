import { motion } from 'framer-motion'
import { GraduationCap, School } from 'lucide-react'

const COURSES = ['DSA', 'Machine Learning', 'Databases', 'OOP', 'Computer Architecture']

export default function Education() {
  return (
    <section id="education" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Education</span>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          <motion.div
            className="bg-surface border border-stroke rounded-2xl p-7 flex gap-5
                       hover:border-[#4E85BF]/40 hover:-translate-y-1
                       transition-all duration-300 hover:shadow-[0_20px_40px_rgba(78,133,191,0.1)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <GraduationCap size={32} className="flex-shrink-0 mt-1" style={{ color: '#89AACC' }} />
            <div>
              <h3 className="font-semibold text-text-primary mb-1">
                B.Sc. Information Systems & Software Engineering
              </h3>
              <p className="text-sm mb-1" style={{ color: '#89AACC' }}>
                Ben-Gurion University of the Negev
              </p>
              <p className="text-xs text-muted font-mono mb-4">2023 – Expected 2027 · 3rd Year</p>
              <div className="flex flex-wrap gap-2">
                {COURSES.map(c => (
                  <span key={c} className="px-2.5 py-1 bg-white/5 border border-stroke rounded-full text-xs text-muted">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-surface border border-stroke rounded-2xl p-7 flex gap-5
                       hover:border-[#4E85BF]/40 hover:-translate-y-1
                       transition-all duration-300 hover:shadow-[0_20px_40px_rgba(78,133,191,0.1)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <School size={32} className="flex-shrink-0 mt-1 text-muted" />
            <div>
              <h3 className="font-semibold text-text-primary mb-1">High School Diploma</h3>
              <p className="text-sm text-muted mb-1">Makif-Vav High School, Ashdod</p>
              <p className="text-xs text-muted font-mono">2011 – 2017</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
