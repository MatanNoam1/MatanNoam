import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Build', 'Create', 'Lead']
const DURATION_MS = 2700

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const next = Math.min(Math.floor((elapsed / DURATION_MS) * 100), 100)
      setCount(next)
      if (next < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex(i => (i + 1) % WORDS.length),
      900
    )
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top-left label */}
      <motion.p
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Portfolio
      </motion.p>

      {/* Center: cycling word */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIndex}
            className="text-6xl md:text-8xl font-display italic text-text-primary/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {WORDS[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom row: progress + counter */}
      <div className="px-8 pb-8 flex flex-col gap-4">
        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient rounded-full transition-all duration-100"
            style={{
              width: `${count}%`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
        {/* Counter */}
        <p className="self-end text-6xl md:text-8xl font-display text-text-primary tabular-nums">
          {String(count).padStart(3, '0')}
        </p>
      </div>
    </motion.div>
  )
}
