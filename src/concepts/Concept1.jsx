import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Themes ────────────────────────────────────────────────────────────────────

const THEMES = [
  {
    id: 'obsidian',
    label: 'Obsidian',
    bg: '#0A0A0A',
    card: '#101010',
    accent: '#D4AF37',
    rgb: '212,175,55',
    text: '#F5F3EE',
    textMuted: '#C8C6C1',
    gray: '#787672',
    image: null,
  },
  {
    id: 'witch',
    label: 'Rich Witch',
    bg: '#0C0814',
    card: '#130C1E',
    accent: '#A78BFA',
    rgb: '167,139,250',
    text: '#F0EBF8',
    textMuted: '#C4B8D4',
    gray: '#7A6080',
    // Replace with any dark, moody image you like
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80&fit=crop',
  },
  {
    id: 'forest',
    label: 'Dark Forest',
    bg: '#070D09',
    card: '#0C1410',
    accent: '#6EAB7C',
    rgb: '110,171,124',
    text: '#EEF5EE',
    textMuted: '#B5CCB5',
    gray: '#637563',
    image: null,
  },
  {
    id: 'blood',
    label: 'Blood Moon',
    bg: '#0D0507',
    card: '#160A0E',
    accent: '#C2456A',
    rgb: '194,69,106',
    text: '#F5EEF0',
    textMuted: '#C9B5BB',
    gray: '#7A5F67',
    image: null,
  },
]

const Ctx = createContext(THEMES[0])
const useT = () => useContext(Ctx)

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { num: '01', name: "Cards Don't Lie",         sub: 'Tarot · 60 min',           price: 'from €280' },
  { num: '02', name: 'Born Under A Sign',        sub: 'Natal Chart · Full Reading', price: 'from €380' },
  { num: '03', name: 'The Apocalypse Experience',sub: 'Private Events & Groups',   price: 'On enquiry' },
]

const NAV = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

const CITIES = [
  'Warsaw','Paris','New York','London','Berlin','Milan','Dubai','Amsterdam','Barcelona','Monaco',
  'Warsaw','Paris','New York','London','Berlin','Milan','Dubai','Amsterdam','Barcelona','Monaco',
]

const ease = [0.22, 1, 0.36, 1]

// ── Tiny helpers ──────────────────────────────────────────────────────────────

function Divider() {
  const t = useT()
  return (
    <div className="h-px w-16 mx-auto"
      style={{ background: `linear-gradient(90deg,transparent,rgba(${t.rgb},.5),transparent)` }} />
  )
}

function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease }}>
      {children}
    </motion.div>
  )
}

// ── Cities Ticker ─────────────────────────────────────────────────────────────

function CitiesTicker() {
  const t = useT()
  return (
    <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden py-7"
      style={{
        borderTop: `1px solid rgba(${t.rgb},0.08)`,
        borderBottom: `1px solid rgba(${t.rgb},0.08)`,
      }}>
      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { display:flex; width:max-content; animation:ticker 32s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }
      `}</style>
      <div className="ticker-track">
        {CITIES.map((city, i) => (
          <span key={i} className="flex items-center">
            <span className="text-sm tracking-[0.4em] uppercase whitespace-nowrap px-8"
              style={{ color: `rgba(${t.rgb},0.5)` }}>
              {city}
            </span>
            <span style={{ color: `rgba(${t.rgb},0.2)`, fontSize: 7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Contact Form ──────────────────────────────────────────────────────────────

function ContactForm() {
  const t = useT()
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(e.target.action, {
        method: 'POST', body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); formRef.current?.reset() }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const field = {
    className: 'w-full bg-transparent border-b py-3 text-sm font-light focus:outline-none transition-colors duration-300',
    style: { borderColor: `rgba(${t.rgb},0.22)`, color: t.text },
  }

  return (
    <form ref={formRef} action="https://formspree.io/f/TWOJ_ID"
      onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

      <input type="text"  name="name"    required placeholder="Your name"            {...field} />
      <input type="email" name="email"   required placeholder="Your email"           {...field} />
      <textarea           name="message" required placeholder="What's on your mind?" rows={4}
        {...field} className={field.className + ' resize-none'} />

      <div className="text-center pt-2">
        {status === 'sent'  && <p className="text-xs uppercase tracking-[0.25em]" style={{ color: t.accent }}>Got it. I'll be in touch.</p>}
        {status === 'error' && <p className="text-xs uppercase tracking-[0.2em] text-red-400">Something went wrong. Email me directly.</p>}
        {(status === 'idle' || status === 'sending') && (
          <button type="submit" disabled={status === 'sending'}
            className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase disabled:opacity-40"
            style={{ border: `1px solid rgba(${t.rgb},0.35)`, color: t.accent }}>
            <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
              style={{ background: t.accent }} />
            <span className="relative transition-colors duration-500 group-hover:text-[#0A0A0A]">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </span>
          </button>
        )}
      </div>
    </form>
  )
}

// ── Theme Switcher ────────────────────────────────────────────────────────────

function ThemeSwitcher({ current, onChange }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md"
      style={{ background: 'rgba(8,8,8,0.92)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
      {THEMES.map(th => (
        <button key={th.id} onClick={() => onChange(th.id)} title={th.label}
          className="relative flex flex-col items-center gap-1 group">
          <motion.div
            animate={{
              scale: current === th.id ? 1.25 : 1,
              opacity: current === th.id ? 1 : 0.35,
              boxShadow: current === th.id ? `0 0 14px ${th.accent}88` : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 rounded-full"
            style={{ background: th.accent }}
          />
          <span className="text-[8px] tracking-widest uppercase transition-opacity duration-200"
            style={{ color: current === th.id ? th.accent : 'rgba(255,255,255,0.2)', opacity: current === th.id ? 1 : 0.6 }}>
            {th.id === 'witch' ? '✦' : th.label.split(' ')[0]}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Concept1() {
  const [themeId, setThemeId] = useState('obsidian')
  const [ready, setReady]   = useState(false)
  const t = THEMES.find(th => th.id === themeId)

  useEffect(() => { const id = setTimeout(() => setReady(true), 80); return () => clearTimeout(id) }, [])

  return (
    <Ctx.Provider value={t}>
      <AnimatePresence mode="wait">
        <motion.div key={themeId}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="min-h-screen font-sans transition-colors duration-700"
          style={{ backgroundColor: t.bg, color: t.textMuted }}>

          {/* NAV */}
          <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
            style={{ borderBottom: `1px solid rgba(${t.rgb},0.07)`, backdropFilter: 'blur(12px)', background: `rgba(${t.bg.replace('#','').match(/.{2}/g).map(h=>parseInt(h,16)).join(',')},0.85)` }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1 }}
              className="font-serif text-base tracking-[0.3em]" style={{ color: t.text }}>
              O · A
            </motion.span>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1, delay: 0.3 }}
              className="flex gap-8 md:gap-12">
              {NAV.map(({ label, href }) => (
                <a key={href} href={href}
                  className="text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 hover:opacity-100"
                  style={{ color: t.gray }}
                  onMouseEnter={e => e.currentTarget.style.color = t.accent}
                  onMouseLeave={e => e.currentTarget.style.color = t.gray}>
                  {label}
                </a>
              ))}
            </motion.div>
          </nav>

          {/* HERO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
            {/* Rich Witch background image */}
            {t.image && (
              <>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.image})`, filter: 'brightness(0.35) saturate(1.4)' }} />
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(to bottom, rgba(12,8,20,0.3) 0%, ${t.bg} 100%)` }} />
              </>
            )}

            {/* Hero content */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="text-[10px] tracking-[0.45em] uppercase mb-10 font-light"
                style={{ color: t.accent }}>
                Tarot · Astrology · Private Consultations
              </motion.p>

              <h1 className="font-serif font-light leading-none overflow-hidden"
                style={{ fontSize: 'clamp(3.5rem,9vw,8.5rem)', letterSpacing: '-0.015em', color: t.text }}>
                {'Ola Apokalipsa'.split(' ').map((word, i) => (
                  <motion.span key={word} className="inline-block"
                    style={{ marginRight: i === 0 ? '0.28em' : 0 }}
                    initial={{ opacity: 0, y: '65%' }}
                    animate={{ opacity: ready ? 1 : 0, y: ready ? '0%' : '65%' }}
                    transition={{ duration: 1.1, delay: 0.35 + i * 0.18, ease }}>
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: ready ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.8, ease }} className="my-8"
                style={{ height: 1, width: 140, background: `linear-gradient(90deg,transparent,${t.accent},transparent)`, transformOrigin: 'left' }} />

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
                transition={{ duration: 0.9, delay: 1.0, ease }}
                className="font-serif italic text-xl md:text-2xl font-light mb-12 max-w-xs"
                style={{ color: t.textMuted }}>
                No vague prophecies.<br />Just the truth.
              </motion.p>

              <motion.a href="#contact"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
                transition={{ duration: 0.9, delay: 1.15, ease }}
                className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase"
                style={{ border: `1px solid rgba(${t.rgb},0.35)`, color: t.accent }}>
                <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{ background: t.accent }} />
                <span className="relative transition-colors duration-500 group-hover:text-[#0A0A0A]">Book a Session</span>
              </motion.a>
            </div>

            <CitiesTicker />
          </section>

          {/* ABOUT */}
          <section id="about" className="py-36 px-6 max-w-xl mx-auto text-center">
            <Reveal>
              <p className="text-[10px] tracking-[0.45em] uppercase mb-8" style={{ color: t.accent }}>About</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif font-light leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: t.text }}>
                Twenty years in.<br /><em>Still catching people off guard.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><Divider /></Reveal>
            <Reveal delay={0.2} className="mt-8">
              <p className="font-light text-base leading-relaxed" style={{ color: t.textMuted }}>
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
              <p className="text-[10px] tracking-[0.45em] uppercase mb-16 text-center" style={{ color: t.accent }}>Services</p>
            </Reveal>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3"
              style={{ border: `1px solid rgba(${t.rgb},0.14)` }}>
              {SERVICES.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease }}
                  whileHover={{ boxShadow: `0 0 55px rgba(${t.rgb},0.12), inset 0 0 30px rgba(${t.rgb},0.04)` }}
                  className="p-10 md:p-12 text-center"
                  style={{ borderRight: i < 2 ? `1px solid rgba(${t.rgb},0.14)` : 'none', backgroundColor: 'transparent' }}>
                  <p className="font-serif font-light text-5xl mb-4"
                    style={{ color: `rgba(${t.rgb},0.16)` }}>{s.num}</p>
                  <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: t.accent }}>{s.sub}</p>
                  <h3 className="font-serif text-2xl font-light mb-4" style={{ color: t.text }}>{s.name}</h3>
                  <div className="h-px w-8 mx-auto mb-4" style={{ background: `rgba(${t.rgb},0.4)` }} />
                  <p className="text-xs tracking-[0.2em]" style={{ color: t.accent }}>{s.price}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-36 px-6"
            style={{ borderTop: `1px solid rgba(${t.rgb},0.1)` }}>
            <Reveal>
              <p className="text-[10px] tracking-[0.45em] uppercase mb-8 text-center" style={{ color: t.accent }}>Contact</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif font-light text-center mb-10"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: t.text }}>
                Start with a message
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="mb-14"><Divider /></Reveal>
            <Reveal delay={0.2}><ContactForm /></Reveal>

            <Reveal delay={0.3} className="mt-16 text-center">
              <p className="text-[11px] tracking-[0.25em] uppercase mb-4" style={{ color: t.gray }}>or reach me directly</p>
              <a href="mailto:hello@olaapokalipsa.com"
                className="font-serif italic text-lg transition-colors duration-300"
                style={{ color: t.textMuted }}
                onMouseEnter={e => e.currentTarget.style.color = t.accent}
                onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
                hello@olaapokalipsa.com
              </a>
              <div className="flex items-center justify-center gap-10 mt-10">
                {[{ label: 'Instagram', href: '#' }, { label: 'TikTok', href: '#' }].map(({ label, href }) => (
                  <a key={label} href={href}
                    className="text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
                    style={{ color: t.gray }}
                    onMouseEnter={e => e.currentTarget.style.color = t.accent}
                    onMouseLeave={e => e.currentTarget.style.color = t.gray}>
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>

            <p className="text-center text-[10px] tracking-[0.25em] uppercase mt-16"
              style={{ color: `rgba(${t.rgb},0.2)` }}>
              © 2025 Ola Apokalipsa · All rights reserved
            </p>
          </section>

        </motion.div>
      </AnimatePresence>

      <ThemeSwitcher current={themeId} onChange={setThemeId} />
    </Ctx.Provider>
  )
}
