import { motion } from 'framer-motion'

const SERVICES = [
  {
    num: '01',
    title: 'Tarot Reading',
    sub: 'Personal Guidance',
    desc: 'A deeply private one-hour session. Past, present, and the currents shaping what lies ahead.',
    price: 'From €280',
    // stagger offset applied via className
    mt: 'mt-0',
  },
  {
    num: '02',
    title: 'Natal Chart',
    sub: 'Astrological Portrait',
    desc: 'Your birth chart rendered into precise, actionable insight. The celestial architecture of who you are.',
    price: 'From €380',
    mt: 'md:mt-28',
  },
  {
    num: '03',
    title: 'Private Events',
    sub: 'Exclusive Experience',
    desc: 'Discreet readings for intimate gatherings, private celebrations, and corporate events of distinction.',
    price: 'By arrangement',
    mt: 'md:mt-14',
  },
]

const ease = [0.22, 1, 0.36, 1]

export default function Concept3() {
  return (
    <div className="bg-obsidian min-h-screen font-sans overflow-x-hidden">
      {/* NAV */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.06)' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-5 bg-gold" />
          <span className="font-serif text-ivory text-sm tracking-[0.2em]">Ola Apokalipsa</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="flex gap-8"
        >
          {['About', 'Services', 'Contact'].map(item => (
            <a
              key={item}
              href={`#c3-${item.toLowerCase()}`}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* HERO — left-aligned, asymmetric with ghost year behind */}
      <section className="min-h-screen flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 pr-8 pt-24 relative">
        {/* Background decorative year */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-light select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', color: 'rgba(212,175,55,0.035)', letterSpacing: '-0.04em' }}
        >
          2025
        </div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
        >
          Private Consultations · By Appointment
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="font-serif text-ivory font-light leading-none relative z-10"
          style={{ fontSize: 'clamp(3.5rem, 8.5vw, 8.5rem)', letterSpacing: '-0.02em' }}
        >
          Ola
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="flex items-center gap-4 my-3"
          style={{ transformOrigin: 'left' }}
        >
          <div className="h-px w-12" style={{ background: 'rgba(212,175,55,0.5)' }} />
          <p className="font-serif italic text-sm tracking-[0.08em]" style={{ color: 'rgba(200,198,193,0.55)' }}>
            Tarot · Astrology · Private Counsel
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="font-serif font-light leading-none relative z-10 mb-12"
          style={{ fontSize: 'clamp(3.5rem, 8.5vw, 8.5rem)', letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C9A227 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          Voss
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="flex items-center gap-6 flex-wrap"
        >
          <a
            href="mailto:hello@olaapokalipsa.com"
            className="group relative inline-block overflow-hidden px-8 py-3.5 text-[10px] tracking-[0.35em] uppercase text-gold"
            style={{ border: '1px solid rgba(212,175,55,0.35)' }}
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="relative group-hover:text-obsidian transition-colors duration-500">Book a Consultation</span>
          </a>
          <a href="#c3-about" className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300 flex items-center gap-2">
            <span>Discover</span>
            <span style={{ fontSize: '0.7rem' }}>↓</span>
          </a>
        </motion.div>
      </section>

      {/* ABOUT — 12-col grid, decorative left column */}
      <section id="c3-about" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <div className="md:col-span-4 relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
              className="font-serif font-light leading-none select-none"
              style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', color: 'rgba(212,175,55,0.07)', letterSpacing: '-0.04em' }}
            >
              II
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.25 }}
              className="text-[10px] tracking-[0.4em] uppercase text-gold mt-2"
            >
              Est. 2004
            </motion.p>
          </div>

          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease }}
              className="font-serif text-ivory font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              Intuition refined<br /><em>over two decades.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="text-muted-white font-light leading-relaxed max-w-lg text-sm md:text-base"
            >
              Ola works with a selective clientele — executives, artists, and private individuals who require insight without spectacle. Her practice merges the rigour of classical astrology with the symbolic language of the tarot, offering counsel that is precise, grounded, and entirely confidential.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SERVICES — staggered vertical offset grid (the "magic trick") */}
      <section id="c3-services" className="py-16 px-8 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="text-[10px] tracking-[0.45em] uppercase text-gold mb-16"
        >
          Services
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start pb-28">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className={`group relative p-8 md:p-10 cursor-default ${s.mt}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.14, ease }}
              whileHover={{
                boxShadow: '0 0 60px rgba(212,175,55,0.18), 0 0 120px rgba(212,175,55,0.07)',
              }}
              style={{
                background: 'linear-gradient(145deg, #141414, #0E0E0E)',
                border: '1px solid rgba(212,175,55,0.12)',
                transition: 'box-shadow 0.5s ease, border-color 0.4s ease',
              }}
            >
              {/* Animated top accent bar on hover */}
              <div
                className="absolute top-0 left-8 h-px transition-all duration-500 group-hover:w-16"
                style={{ background: '#D4AF37', width: 0 }}
              />

              <p
                className="font-serif font-light text-4xl mb-6 transition-colors duration-300"
                style={{ color: 'rgba(212,175,55,0.2)' }}
              >
                {s.num}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{s.sub}</p>
              <h3 className="font-serif text-ivory text-xl font-light mb-4 group-hover:text-gold transition-colors duration-500">{s.title}</h3>
              <div
                className="h-px mb-4 transition-all duration-400 group-hover:w-10"
                style={{ width: '1.5rem', background: 'rgba(212,175,55,0.4)' }}
              />
              <p className="text-muted-gray text-sm leading-relaxed font-light mb-6">{s.desc}</p>
              <p className="text-gold text-xs tracking-[0.2em]">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT — left-aligned with ghost monogram */}
      <section id="c3-contact" className="py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div
          className="absolute right-0 bottom-0 font-serif font-light leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(9rem, 28vw, 26rem)', color: 'rgba(212,175,55,0.025)', letterSpacing: '-0.06em', lineHeight: 0.85 }}
        >
          EV
        </div>

        <div className="relative z-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            className="text-[10px] tracking-[0.45em] uppercase text-gold mb-8"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease }}
            className="font-serif text-ivory font-light leading-tight mb-10"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)', letterSpacing: '-0.025em' }}
          >
            Begin your<br /><em>consultation.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="mailto:hello@olaapokalipsa.com"
              className="group relative inline-block overflow-hidden px-10 py-4 text-[10px] tracking-[0.35em] uppercase text-gold"
              style={{ border: '1px solid rgba(212,175,55,0.35)' }}
            >
              <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="relative group-hover:text-obsidian transition-colors duration-500">Book a Consultation</span>
            </a>
          </motion.div>

          <motion.a
            href="mailto:hello@olaapokalipsa.com"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="block font-serif italic text-lg text-muted-white hover:text-gold transition-colors duration-300 mb-10"
          >
            hello@olaapokalipsa.com
          </motion.a>

          <div className="flex gap-8 mb-16">
            {['Instagram', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="text-[10px] tracking-[0.3em] uppercase text-muted-gray hover:text-gold transition-colors duration-300">{s}</a>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(120,118,114,0.35)' }}>
            © 2025 Ola Apokalipsa · All rights reserved
          </p>
        </div>
      </section>
    </div>
  )
}
