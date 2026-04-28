import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const ROLES = ['Builder', 'Engineer', 'Mentor', 'Leader']

function useVideoFade(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const rafRef = useRef<number>(0)
  const fadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const cancelFade = () => cancelAnimationFrame(rafRef.current)

    const fadeTo = (
      el: HTMLVideoElement,
      target: number,
      duration: number,
      onDone?: () => void
    ) => {
      cancelFade()
      const start = el.style.opacity === '' ? 0 : parseFloat(el.style.opacity)
      const startTime = performance.now()

      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        el.style.opacity = String(start + (target - start) * t)
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          onDone?.()
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const handleCanPlay = () => {
      fadingOutRef.current = false
      fadeTo(video, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeTo(video, 0, 500)
      }
    }

    const handleEnded = () => {
      cancelFade()
      video.style.opacity = '0'
      fadingOutRef.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().then(() => fadeTo(video, 1, 500))
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      cancelFade()
    }
  }, [videoRef])
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useVideoFade(videoRef)

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex(i => (i + 1) % ROLES.length),
      2000
    )
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!nameRef.current || !contentRef.current) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(nameRef.current!, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
        .fromTo(
          contentRef.current!.querySelectorAll('.blur-in'),
          { opacity: 0, filter: 'blur(10px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
          '-=0.8'
        )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover"
          style={{ opacity: 0, transform: 'translateX(-50%) translateY(17%)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-24"
        style={{ transform: 'translateY(-10%)' }}
      >
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          Software Engineer · BGU &apos;27
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-text-primary mb-6"
          style={{ fontFamily: "'Instrument Serif', serif", opacity: 0 }}
        >
          Matan Noam
        </h1>

        {/* Role line */}
        <p className="blur-in text-base md:text-lg text-muted mb-12">
          A{' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block font-display italic text-text-primary"
          >
            {ROLES[roleIndex]}
          </span>{' '}
          based in Israel.
        </p>

        {/* CTA buttons */}
        <div className="blur-in flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="liquid-glass rounded-full px-7 py-3.5 text-sm font-medium
                       text-text-primary hover:bg-white/5 transition-colors"
          >
            View My Work
          </a>
          <a
            href="/Matan_Noam_Resume_EN.pdf"
            download
            className="liquid-glass rounded-full px-7 py-3.5 text-sm font-medium
                       text-text-primary hover:bg-white/5 transition-colors"
          >
            Download CV
          </a>
        </div>

        {/* Contact bar */}
        <div className="blur-in liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 max-w-sm w-full">
          <input
            type="email"
            placeholder="matannoam3@gmail.com"
            readOnly
            className="flex-1 bg-transparent text-white/60 text-sm outline-none placeholder:text-white/40 cursor-default"
          />
          <a
            href="mailto:matannoam3@gmail.com"
            className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0"
          >
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center pb-10 gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div
            className="w-full h-full animate-scroll-down absolute"
            style={{ background: 'linear-gradient(to bottom,#89AACC,transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
