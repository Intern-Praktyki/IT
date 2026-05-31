import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Ambient particle canvas — the "magic trick" for this concept
function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      phase: Math.random() * Math.PI * 2,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach((p) => {
        p.phase += 0.005
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        const a = 0.07 + 0.06 * Math.sin(p.phase)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />
}

const SERVICES = [
  {
    num: '01',
    title: 'Tarot Reading',
    sub: 'Personal Guidance',
    desc: 'A deeply private one-hour session. Past, present, and the currents shaping what lies ahead. Conducted in absolute confidence.',
    price: 'From €280',
  },
  {
    num: '02',
    title: 'Natal Chart',
    sub: 'Astrological Portrait',
    desc: 'A comprehensive analysis of your birth chart. The celestial architecture of who you are, rendered into precise, actionable insight.',
    price: 'From €380',
  },
  {
    num: '03',
    title: 'Private Events',
    sub: 'Exclusive Experience',
    desc: 'Discreet, intimate readings for private gatherings, launches, and personal celebrations of distinction.',
    price: 'By arrangement',
  },
]

const ease = [0.22, 1, 0.36, 1]

function HRule() {
  return <div className="h-px mx-10 md:mx-14 lg:mx-20" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.2), transparent)' }} />
}

export default function Concept2() {
  return (
    <div className="bg-obsidian font-sans">
      <div className="flex min-h-screen">

        {/* LEFT PANEL — fixed sticky with ambient particles */}
        <div
          className="hidden md:flex fixed left-0 top-0 w-1/2 h-screen flex-col justify-between p-12 lg:p-16 overflow-hidden"
          style={{ borderRight: '1px solid rgba(212,175,55,0.1)' }}
        >
          <ParticleCanvas />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 35% 55%, rgba(212,175,55,0.05) 0%, transparent 65%)' }}
          />

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="relative z-10"
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-1">Est. 2004</p>
            <p className="font-serif text-sm tracking-[0.2em]" style={{ color: 'rgba(245,243,238,0.25)' }}>Private Practice</p>
          </motion.div>

          {/* Center: name + tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease }}
            className="relative z-10"
          >
            <h1
              className="font-serif text-ivory font-light leading-none mb-5"
              style={{ fontSize: 'clamp(2.8rem, 4vw, 5.2rem)', letterSpacing: '-0.025em' }}
            >
              Ola<br />Apokalipsa
            </h1>
            <div className="h-px w-12 mb-5" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <p className="font-serif italic font-light leading-relaxed max-w-xs" style={{ color: 'rgba(200,198,193,0.75)', fontSize: '1.05rem' }}>
              Clarity. Precision.<br />Absolute discretion.
            </p>
          </motion.div>

          {/* Bottom: nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="relative z-10 flex flex-col gap-4"
          >
            {['About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#c2-${item.toLowerCase()}`}
                className="group flex items-center gap-3 text-muted-gray hover:text-gold transition-colors duration-300"
              >
                <span
                  className="h-px bg-current transition-all duration-300"
                  style={{ width: '1.25rem' }}
                  onMouseEnter={e => e.currentTarget.style.width = '2rem'}
                  onMouseLeave={e => e.currentTarget.style.width = '1.25rem'}
                />
                <span className="text-[10px] tracking-[0.35em] uppercase">{item}</span>
              </a>
            ))}
          </motion.nav>
        </div>

        {/* RIGHT PANEL — scrollable content */}
        <div className="w-full md:ml-[50%] md:w-1/2 min-h-screen">

          {/* Mobile nav */}
          <div
            className="md:hidden flex items-center justify-between px-6 py-5 sticky top-0 z-50 backdrop-blur-md"
            style={{ background: 'rgba(10,10,10,0.92)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}
          >
            <span className="font-serif text-ivory tracking-[0.3em] text-sm">O · A</span>
            <div className="flex gap-5">
              {['About', 'Services', 'Contact'].map(item => (
                <a key={item} href={`#c2-${item.toLowerCase()}`} className="text-[10px] tracking-widest uppercase text-muted-gray hover:text-gold transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Hero right */}
          <div className="min-h-screen flex flex-col justify-end px-10 md:px-14 lg:px-20 pb-20 pt-36 md:pt-24">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6"
            >
              Tarot · Astrology · Private Counsel
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease }}
              className="font-serif text-muted-white font-light leading-relaxed mb-10 max-w-sm"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
            >
              For those who seek clarity with intention. A private practice refined over two decades of dedicated study and counsel.
            </motion.p>
            <motion.a
              href="mailto:hello@olaapokalipsa.com"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25, ease }}
              className="group inline-flex items-center gap-4 self-start"
            >
              <span className="h-px bg-gold transition-all duration-500 group-hover:w-16" style={{ width: '2.5rem' }} />
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold">Request a Consultation</span>
            </motion.a>
          </div>

          <HRule />

          {/* ABOUT */}
          <section id="c2-about" className="px-10 md:px-14 lg:px-20 py-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
              className="font-serif text-ivory font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
            >
              Intuition refined<br /><em>over two decades.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="text-muted-white font-light leading-relaxed max-w-md text-sm md:text-base"
            >
              Ola works with a selective clientele — executives, artists, and private individuals who require insight without spectacle. Her practice merges the rigour of classical astrology with the symbolic language of the tarot, offering counsel that is precise, grounded, and entirely confidential.
            </motion.p>
          </section>

          <HRule />

          {/* SERVICES — horizontal list rows */}
          <section id="c2-services" className="px-10 md:px-14 lg:px-20 py-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-[10px] tracking-[0.45em] uppercase text-gold mb-12"
            >
              Services
            </motion.p>
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="group py-8 flex gap-5 cursor-default"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}
              >
                <span
                  className="font-serif text-lg font-light pt-0.5 shrink-0 transition-colors duration-300"
                  style={{ color: 'rgba(212,175,55,0.2)' }}
                >
                  {s.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="font-serif text-ivory text-xl font-light group-hover:text-gold transition-colors duration-400">{s.title}</h3>
                    <span className="text-gold text-xs tracking-widest shrink-0 hidden sm:block">{s.price}</span>
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(212,175,55,0.5)' }}>{s.sub}</p>
                  <p className="text-muted-gray text-sm leading-relaxed font-light">{s.desc}</p>
                  <span className="text-gold text-xs tracking-widest sm:hidden mt-2 block">{s.price}</span>
                </div>
              </motion.div>
            ))}
          </section>

          <HRule />

          {/* CONTACT */}
          <section id="c2-contact" className="px-10 md:px-14 lg:px-20 py-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
            >
              Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
              className="font-serif text-ivory font-light leading-tight mb-8"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
            >
              Begin your<br /><em>consultation.</em>
            </motion.h2>
            <motion.a
              href="mailto:hello@olaapokalipsa.com"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="block font-serif italic text-lg text-muted-white hover:text-gold transition-colors duration-300 mb-8"
            >
              hello@olaapokalipsa.com
            </motion.a>
            <div className="flex gap-8 mb-16">
              {['Instagram', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300">{s}</a>
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(120,118,114,0.35)' }}>
              © 2025 Ola Apokalipsa
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
