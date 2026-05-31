import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Concept1 from './concepts/Concept1'
import Concept2 from './concepts/Concept2'
import Concept3 from './concepts/Concept3'

const CONCEPTS = [
  { id: 1, label: 'The Monolith', hint: 'Centered · Minimal', Component: Concept1 },
  { id: 2, label: 'Split Elegance', hint: 'Fixed · Ambient', Component: Concept2 },
  { id: 3, label: 'Asymmetric Flow', hint: 'Grid · Dynamic', Component: Concept3 },
]

export default function App() {
  const [active, setActive] = useState(1)
  const { Component: ActiveConcept } = CONCEPTS.find(c => c.id === active)

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <ActiveConcept />
        </motion.div>
      </AnimatePresence>

      {/* Floating concept switcher — developer preview toolbar */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 rounded-full px-2 py-1.5 backdrop-blur-md"
        style={{
          background: 'rgba(10,10,10,0.94)',
          border: '1px solid rgba(212,175,55,0.22)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase px-3 hidden sm:block"
          style={{ color: 'rgba(212,175,55,0.4)' }}
        >
          Preview
        </span>
        <div className="h-3 w-px hidden sm:block" style={{ background: 'rgba(212,175,55,0.15)' }} />

        {CONCEPTS.map(c => (
          <button
            key={c.id}
            onClick={() => { setActive(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="relative px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              color: active === c.id ? '#0A0A0A' : '#787672',
              background: active === c.id ? '#D4AF37' : 'transparent',
            }}
            title={c.hint}
          >
            <span className="hidden sm:inline">{c.id}. {c.label}</span>
            <span className="sm:hidden">{c.id}</span>
          </button>
        ))}
      </div>
    </>
  )
}
