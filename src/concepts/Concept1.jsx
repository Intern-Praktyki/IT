import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    name: 'Cards Don\'t Lie',
    sub: 'Tarot · 60 min',
    price: 'from €280',
  },
  {
    num: '02',
    name: 'Born Under A Sign',
    sub: 'Natal Chart · Full Reading',
    price: 'from €380',
  },
  {
    num: '03',
    name: 'The Apocalypse Experience',
    sub: 'Private Events & Groups',
    price: 'On enquiry',
  },
]

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const CITIES = [
  'Warsaw', 'Paris', 'New York', 'London', 'Berlin',
  'Milan', 'Dubai', 'Amsterdam', 'Barcelona', 'Vienna',
  'Warsaw', 'Paris', 'New York', 'London', 'Berlin',
  'Milan', 'Dubai', 'Amsterdam', 'Barcelona', 'Vienna',
]

const ease = [0.22, 1, 0.36, 1]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="h-px w-16 mx-auto"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,.55),transparent)' }}
    />
  )
}

function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

// ─── Cities Ticker ────────────────────────────────────────────────────────────

function CitiesTicker() {
  return (
    <div
      className="w-full overflow-hidden py-5"
      style={{ borderTop: '1px solid rgba(212,175,55,0.08)', borderBottom: '1px solid rgba(212,175,55,0.08)' }}
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 28s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="ticker-track">
        {CITIES.map((city, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-[10px] tracking-[0.4em] uppercase whitespace-nowrap px-6"
              style={{ color: 'rgba(212,175,55,0.45)' }}
            >
              {city}
            </span>
            <span style={{ color: 'rgba(212,175,55,0.2)', fontSize: 6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(e.target.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); formRef.current?.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const field =
    'w-full bg-transparent border-b py-3 text-ivory text-sm font-light ' +
    'placeholder:text-muted-gray focus:outline-none focus:border-gold ' +
    'transition-colors duration-300'

  return (
    <form
      ref={formRef}
      action="https://formspree.io/f/TWOJ_ID"
      onSubmit={handleSubmit}
      className="space-y-8 max-w-lg mx-auto"
    >
      {/* honeypot */}
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

      <input type="text"  name="name"    required placeholder="Your name"         className={field} style={{ borderColor: 'rgba(212,175,55,0.22)' }} />
      <input type="email" name="email"   required placeholder="Your email"        className={field} style={{ borderColor: 'rgba(212,175,55,0.22)' }} />
      <textarea           name="message" required placeholder="What's on your mind?" rows={4}
        className={field + ' resize-none'} style={{ borderColor: 'rgba(212,175,55,0.22)' }} />

      <div className="text-center pt-2">
        {status === 'sent'  && <p className="text-gold tracking-[0.25em] text-xs uppercase">Got it. I'll be in touch.</p>}
        {status === 'error' && <p className="text-red-400 tracking-[0.2em] text-xs uppercase">Something went wrong. Email me directly.</p>}
        {(status === 'idle' || status === 'sending') && (
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold disabled:opacity-40"
            style={{ border: '1px solid rgba(212,175,55,0.35)' }}
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="relative group-hover:text-obsidian transition-colors duration-500">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </span>
          </button>
        )}
      </div>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Concept1() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div className="bg-obsidian min-h-screen font-sans">

      {/* NAV */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.07)', backdropFilter: 'blur(12px)', background: 'rgba(10,10,10,0.85)' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-ivory text-base tracking-[0.3em]"
        >
          O · A
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex gap-8 md:gap-12"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300">
              {label}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-10 font-light"
        >
          Tarot · Astrology · Private Consultations
        </motion.p>

        <h1
          className="font-serif font-light text-ivory leading-none overflow-hidden"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', letterSpacing: '-0.015em' }}
        >
          {'Ola Apokalipsa'.split(' ').map((word, i) => (
            <motion.span
              key={word}
              className="inline-block"
              style={{ marginRight: i === 0 ? '0.28em' : 0 }}
              initial={{ opacity: 0, y: '65%' }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? '0%' : '65%' }}
              transition={{ duration: 1.1, delay: 0.35 + i * 0.18, ease }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ready ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease }}
          className="my-8"
          style={{ height: 1, width: 140, background: 'linear-gradient(90deg,transparent,#D4AF37,transparent)', transformOrigin: 'left' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
          className="font-serif italic text-muted-white text-xl md:text-2xl font-light mb-12 max-w-xs"
        >
          No vague prophecies.<br />Just the truth.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
          className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold"
          style={{ border: '1px solid rgba(212,175,55,0.35)' }}
        >
          <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          <span className="relative group-hover:text-obsidian transition-colors duration-500">Book a Session</span>
        </motion.a>
      </section>

      {/* CITIES TICKER */}
      <CitiesTicker />

      {/* ABOUT */}
      <section id="about" className="py-36 px-6 max-w-xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8">About</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-serif text-ivory font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Twenty years in.<br /><em>Still catching people off guard.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}><Divider /></Reveal>
        <Reveal delay={0.2} className="mt-8">
          <p className="text-muted-white font-light text-base leading-relaxed">
            I read tarot and birth charts for people who are done with soft answers.
            My clients are executives, creatives, and a handful of people you'd recognise
            from a magazine — none of whom want to be mentioned here.
            Sessions are private, direct, and sometimes a little too accurate.
            Based in Warsaw. Regularly in Paris, London and New York.
            Online for everyone else.
          </p>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section id="services" className="pb-36 px-6">
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-16 text-center">Services</p>
        </Reveal>
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3"
          style={{ border: '1px solid rgba(212,175,55,0.14)' }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              whileHover={{ boxShadow: '0 0 55px rgba(212,175,55,0.12), inset 0 0 30px rgba(212,175,55,0.03)' }}
              className="group p-10 md:p-12 text-center"
              style={{ borderRight: i < 2 ? '1px solid rgba(212,175,55,0.14)' : 'none' }}
            >
              <p className="font-serif font-light text-5xl mb-4" style={{ color: 'rgba(212,175,55,0.16)' }}>{s.num}</p>
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-2">{s.sub}</p>
              <h3 className="font-serif text-ivory text-2xl font-light mb-4">{s.name}</h3>
              <div className="h-px w-8 mx-auto mb-4" style={{ background: 'rgba(212,175,55,0.4)' }} />
              <p className="text-gold text-xs tracking-[0.2em]">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-36 px-6"
        style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
      >
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8 text-center">Contact</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-serif text-ivory font-light text-center mb-10"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Start with a message
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mb-14"><Divider /></Reveal>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-gray mb-4">or reach me directly</p>
          <a
            href="mailto:hello@olaapokalipsa.com"
            className="font-serif italic text-lg text-muted-white hover:text-gold transition-colors duration-300"
          >
            hello@olaapokalipsa.com
          </a>
          <div className="flex items-center justify-center gap-10 mt-10">
            {[
              { label: 'Instagram', href: 'https://instagram.com/' },
              { label: 'TikTok',    href: 'https://tiktok.com/' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className="text-[10px] tracking-[0.35em] uppercase text-muted-gray hover:text-gold transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <p className="text-center text-[10px] tracking-[0.25em] uppercase mt-16" style={{ color: 'rgba(120,118,114,0.4)' }}>
          © 2025 Ola Apokalipsa · All rights reserved
        </p>
      </section>

    </div>
  )
}
