import { motion } from 'framer-motion'

const JOBS = [
  {
    title: 'Python Programming Instructor & Mentor',
    org: 'Nitzanim Program · Sderot',
    dates: 'Nov 2024 – 2026',
    bullets: [
      'Teach Python fundamentals to high school students from socio-economic and geographic peripheries',
      'Design project-based lessons focused on real-world problem-solving',
      'Mentor students toward careers in tech, including competitive military technology units',
    ],
    tags: ['Python', 'Education', 'Mentorship'],
    accent: true,
  },
  {
    title: 'Line Cook & Hot Line Supervisor',
    org: 'Zeh Ashdod · Ashdod',
    dates: 'Mar 2021 – Oct 2022',
    bullets: [
      'Promoted to Hot Line Supervisor; oversaw hot food station and coordinated kitchen staff',
      'Performed consistently under high pressure in a fast-paced, time-sensitive environment',
    ],
    tags: ['Leadership', 'Operations', 'High-Pressure'],
    accent: false,
  },
  {
    title: 'Warehouse Manager & Production Team Lead',
    org: 'Flying Cargo · Kannot',
    dates: 'Dec 2020 – Jun 2021',
    bullets: [
      'Managed inventory and coordinated with international suppliers via Priority ERP',
      'Rapidly promoted from production line worker to team lead overseeing full operations',
    ],
    tags: ['Priority ERP', 'Inventory', 'Team Lead'],
    accent: false,
  },
  {
    title: 'Technical Support Representative',
    org: 'Targetcall · Ashdod',
    dates: 'May 2020 – Sep 2020',
    bullets: [
      'Troubleshot and resolved residential internet network issues',
      'Guided customers through complex resolutions with clear, structured communication',
    ],
    tags: ['Tech Support', 'Networking', 'Communication'],
    accent: false,
  },
  {
    title: 'Shore Electrician — Staff Sergeant',
    org: 'Israeli Navy · Mandatory Service · Haifa',
    dates: 'Jul 2017 – Mar 2020',
    bullets: [
      'Maintained, repaired, and troubleshot electrical systems on naval vessels',
      'Reached rank of Staff Sergeant; trained and mentored new recruits in final service year',
      'Built strong discipline, technical aptitude, and resilience under extreme pressure',
    ],
    tags: ['IDF', 'Electrical Systems', 'Leadership', 'Mentorship'],
    accent: false,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Work Experience</span>
        </motion.div>

        <div className="relative pl-8">
          {/* Timeline line */}
          <div
            className="absolute left-3 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom,#89AACC,#4E85BF,transparent)' }}
          />

          <div className="flex flex-col gap-8">
            {JOBS.map((job, i) => (
              <motion.div
                key={job.title}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-[21px] top-5 w-3.5 h-3.5 rounded-full border-2 border-bg"
                  style={{ background: job.accent ? '#89AACC' : '#4E85BF' }}
                />

                <div
                  className={`bg-surface rounded-2xl p-6 border transition-all duration-300
                    hover:-translate-y-1
                    ${job.accent
                      ? 'border-[#89AACC]/20 hover:border-[#89AACC]/40 hover:shadow-[0_8px_30px_rgba(137,170,204,0.1)]'
                      : 'border-stroke hover:border-[#4E85BF]/30 hover:shadow-[0_8px_30px_rgba(78,133,191,0.08)]'
                    }`}
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">{job.title}</h3>
                      <p
                        className="text-sm mt-1"
                        style={{ color: job.accent ? '#89AACC' : '#4E85BF' }}
                      >
                        {job.org}
                      </p>
                    </div>
                    <span className="text-xs text-muted font-mono whitespace-nowrap">{job.dates}</span>
                  </div>

                  <ul className="flex flex-col gap-2 mb-4">
                    {job.bullets.map(b => (
                      <li key={b} className="text-sm text-muted pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#4E85BF]">
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border
                          ${job.accent
                            ? 'bg-[#89AACC]/8 border-[#89AACC]/20 text-[#89AACC]'
                            : 'bg-[#4E85BF]/8 border-[#4E85BF]/20 text-[#4E85BF]'
                          }`}
                        style={{ background: job.accent ? 'rgba(137,170,204,0.08)' : 'rgba(78,133,191,0.08)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
