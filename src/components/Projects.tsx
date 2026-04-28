import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink } from 'lucide-react'

function GitHubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/MatanNoam1/repos?sort=updated&per_page=6&type=public')
      .then(r => {
        if (!r.ok) throw new Error('API error')
        return r.json() as Promise<Repo[]>
      })
      .then(data => {
        const filtered = data.filter(r => !r.name.includes('MatanNoam') && r.description)
        setRepos(filtered.slice(0, 6))
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="bg-bg py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Projects</span>
          </div>
          <a
            href="https://github.com/MatanNoam1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-text-primary
                       border border-stroke hover:border-[#4E85BF]/50
                       px-4 py-2 rounded-lg transition-all duration-200"
          >
            <GitHubIcon size={16} />
            github.com/MatanNoam1
          </a>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-muted">
            <div className="w-8 h-8 border-2 border-stroke border-t-[#4E85BF] rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-muted py-20">Could not load repositories.</p>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group bg-surface border border-stroke rounded-2xl p-6 flex flex-col gap-3
                           hover:border-[#4E85BF]/40 hover:-translate-y-1
                           transition-all duration-300 hover:shadow-[0_16px_40px_rgba(78,133,191,0.1)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GitHubIcon size={16} className="text-muted flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#89AACC] truncate">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>

                <p className="text-sm text-muted leading-relaxed flex-1">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: LANG_COLORS[repo.language] ?? '#888' }}
                      />
                      <span className="text-xs text-muted">{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
