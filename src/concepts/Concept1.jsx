import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SERVICES = [
  {
    num: '01',
    title: 'Tarot Reading',
    sub: 'Personal Guidance',
    desc: 'A deeply private one-hour session. Past, present, and the currents shaping what lies ahead.',
    price: 'From €280',
  },
  {
    num: '02',
    title: 'Natal Chart',
    sub: 'Astrological Portrait',
    desc: 'Your birth chart rendered into precise, actionable insight. The celestial architecture of who you are.',
    price: 'From €380',
  },
  {
    num: '03',
    title: 'Private Events',
    sub: 'Exclusive Experience',
    desc: 'Discreet readings for intimate gatherings, private celebrations, and corporate events.',
    price: 'By arrangement',
  },
]

const ease = [0.22, 1, 0.36, 1]

const Divider = ({ width = 'w-16', mx = '' }) => (
  <div
    className={`h-px ${width} ${mx}`}
    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)' }}
  />
)

export default function Concept1() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div className="bg-obsidian min-h-screen font-sans">
      {/* NAV */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.07)' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-ivory text-base tracking-[0.3em]"
        >
          E · V
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex gap-8 md:gap-12"
        >
          {['About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#c1-${item.toLowerCase()}`}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* HERO — word-by-word slide-up on load (the "magic trick") */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-10 font-light"
        >
          Private Consultations · By Appointment
        </motion.p>

        <h1
          className="font-serif font-light text-ivory leading-none overflow-hidden"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', letterSpacing: '-0.015em' }}
        >
          {'Elara Voss'.split(' ').map((word, i) => (
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
          style={{ height: 1, width: 140, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', transformOrigin: 'left' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
          className="font-serif italic text-muted-white text-xl md:text-2xl font-light mb-12 max-w-xs"
        >
          Clarity. Precision. Absolute discretion.
        </motion.p>

        <motion.a
          href="mailto:hello@elaravoss.com"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
          className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold"
          style={{ border: '1px solid rgba(212,175,55,0.35)' }}
        >
          <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          <span className="relative group-hover:text-obsidian transition-colors duration-500">Book a Consultation</span>
        </motion.a>
      </section>

      {/* ABOUT */}
      <section id="c1-about" className="py-36 px-6 max-w-xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-serif text-ivory font-light leading-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Intuition refined<br /><em>over two decades.</em>
        </motion.h2>
        <Divider mx="mx-auto" />
        <div className="mt-8" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="text-muted-white font-light text-base leading-relaxed"
        >
          Elara works with a selective clientele — executives, artists, and private individuals who require insight without spectacle. Her practice merges the rigour of classical astrology with the symbolic language of the tarot, offering counsel that is precise, grounded, and entirely confidential.
        </motion.p>
      </section>

      {/* SERVICES */}
      <section id="c1-services" className="pb-36 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-16 text-center"
        >
          Services
        </motion.p>
        <div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3"
          style={{ border: '1px solid rgba(212,175,55,0.14)' }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              whileHover={{ boxShadow: '0 0 55px rgba(212,175,55,0.13), inset 0 0 30px rgba(212,175,55,0.03)' }}
              className="group p-10 md:p-12 text-center"
              style={{ borderRight: i < 2 ? '1px solid rgba(212,175,55,0.14)' : 'none' }}
            >
              <p className="font-serif font-light text-5xl mb-6" style={{ color: 'rgba(212,175,55,0.18)' }}>{s.num}</p>
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">{s.sub}</p>
              <h3 className="font-serif text-ivory text-2xl font-light mb-4">{s.title}</h3>
              <div className="h-px w-8 mx-auto mb-4" style={{ background: 'rgba(212,175,55,0.4)' }} />
              <p className="text-muted-gray text-sm leading-relaxed mb-6 font-light">{s.desc}</p>
              <p className="text-gold text-xs tracking-[0.2em]">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="c1-contact" className="py-36 px-6 text-center" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="font-serif text-ivory font-light mb-10"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Begin your consultation
        </motion.h2>
        <Divider mx="mx-auto" />
        <div className="mt-10" />
        <motion.a
          href="mailto:hello@elaravoss.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-xl md:text-2xl text-muted-white hover:text-gold transition-colors duration-300"
        >
          hello@elaravoss.com
        </motion.a>
        <div className="flex items-center justify-center gap-10 mt-12">
          {['Instagram', 'LinkedIn'].map((s) => (
            <a key={s} href="#" className="text-[10px] tracking-[0.35em] uppercase text-muted-gray hover:text-gold transition-colors duration-300">{s}</a>
          ))}
        </div>
        <p className="text-[10px] tracking-[0.25em] uppercase mt-16" style={{ color: 'rgba(120,118,114,0.4)' }}>
          © 2025 Elara Voss · All rights reserved
        </p>
      </section>
    </div>
  )
}
