import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    // Twoja nazwa tej usługi, np. "Seans z kartami" albo cokolwiek czujesz
    name: 'Nazwa usługi 1',
    // Krótki podtytuł/format, np. "Tarot · 60 min" albo "online / stacjonarnie"
    sub: 'Podtytuł · czas trwania',
    price: 'od ?? zł',
  },
  {
    num: '02',
    name: 'Nazwa usługi 2',
    sub: 'Podtytuł · czas trwania',
    price: 'od ?? zł',
  },
  {
    num: '03',
    name: 'Nazwa usługi 3',
    sub: 'Podtytuł · format',
    price: 'Wycena indywidualna',
  },
]

const NAV_LINKS = [
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Oferty', href: '#oferty' },
  { label: 'Kontakt', href: '#kontakt' },
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

// ─── Contact Form ─────────────────────────────────────────────────────────────
// Podpięcie backendu: zmień action= na URL Formspree / własne API.
// Pole "bot_field" to honeypot — zostawiaj ukryte, łapie spam.

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
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
      if (res.ok) {
        setStatus('sent')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full bg-transparent border-b py-3 text-ivory text-sm font-light placeholder:text-muted-gray ' +
    'focus:outline-none focus:border-gold transition-colors duration-300'

  return (
    // ↓ Zmień action= na swój endpoint (np. https://formspree.io/f/TWOJ_ID)
    <form
      ref={formRef}
      action="https://formspree.io/f/TWOJ_ID"
      onSubmit={handleSubmit}
      className="space-y-8 max-w-lg mx-auto"
    >
      {/* Honeypot — ukryte, nie dotykaj */}
      <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <input
          type="text"
          name="name"
          required
          placeholder="Imię i nazwisko"
          className={inputBase}
          style={{ borderColor: 'rgba(212,175,55,0.22)' }}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder="Adres e-mail"
          className={inputBase}
          style={{ borderColor: 'rgba(212,175,55,0.22)' }}
        />
      </div>
      <div>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="W czym mogę Ci pomóc?"
          className={inputBase + ' resize-none'}
          style={{ borderColor: 'rgba(212,175,55,0.22)' }}
        />
      </div>

      <div className="text-center pt-2">
        {status === 'sent' ? (
          <p className="text-gold tracking-[0.25em] text-xs uppercase">Wiadomość wysłana — odpiszę wkrótce.</p>
        ) : status === 'error' ? (
          <p className="text-red-400 tracking-[0.2em] text-xs uppercase">Coś poszło nie tak. Napisz bezpośrednio na e-mail.</p>
        ) : (
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold disabled:opacity-50"
            style={{ border: '1px solid rgba(212,175,55,0.35)' }}
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="relative group-hover:text-obsidian transition-colors duration-500">
              {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
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
            <a
              key={href}
              href={href}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300"
            >
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
          Tarot · Astrologia · Warszawa
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
          Jasność. Precyzja. Pełna dyskrecja.
        </motion.p>

        <motion.a
          href="#kontakt"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
          className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold"
          style={{ border: '1px solid rgba(212,175,55,0.35)' }}
        >
          <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          <span className="relative group-hover:text-obsidian transition-colors duration-500">Umów konsultację</span>
        </motion.a>
      </section>

      {/* ABOUT */}
      <section id="o-mnie" className="py-36 px-6 max-w-xl mx-auto text-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8">O mnie</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-serif text-ivory font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {/* ← Twój krótki nagłówek "O mnie", np. "Robię to od X lat." albo coś swojego */}
            Twój nagłówek<br /><em>sekcji O&nbsp;mnie.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Divider />
        </Reveal>
        <Reveal delay={0.2} className="mt-8">
          <p className="text-muted-white font-light text-base leading-relaxed">
            {/*
              ← Napisz tu parę zdań o sobie własnymi słowami. Bez ściemy.
              Np.: od kiedy to robisz, skąd się wzięło, jak pracujesz,
              co Cię odróżnia od innych. Możesz też napisać dla kogo NIE jesteś —
              to działa świetnie i odsiewa złych klientów.
              Optymalnie: 3-5 zdań, żaden elaborat.
            */}
            [Twój bio — parę zdań o sobie, skąd to, jak pracujesz, dla kogo jesteś.]
          </p>
        </Reveal>
      </section>

      {/* SERVICES */}
      <section id="oferty" className="pb-36 px-6">
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-16 text-center">Oferty</p>
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
        id="kontakt"
        className="py-36 px-6"
        style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
      >
        <Reveal>
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8 text-center">Kontakt</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-serif text-ivory font-light text-center mb-10"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Zacznij od wiadomości
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mb-14">
          <Divider />
        </Reveal>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>

        {/* Fallback e-mail + socials */}
        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-gray mb-4">lub napisz bezpośrednio</p>
          <a
            href="mailto:hello@olaapokalipsa.com"
            className="font-serif italic text-lg text-muted-white hover:text-gold transition-colors duration-300"
          >
            hello@olaapokalipsa.com
          </a>
          <div className="flex items-center justify-center gap-10 mt-10">
            {['Instagram', 'LinkedIn'].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] tracking-[0.35em] uppercase text-muted-gray hover:text-gold transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </Reveal>

        <p className="text-center text-[10px] tracking-[0.25em] uppercase mt-16" style={{ color: 'rgba(120,118,114,0.4)' }}>
          © 2025 Ola Apokalipsa · Wszelkie prawa zastrzeżone
        </p>
      </section>

    </div>
  )
}
