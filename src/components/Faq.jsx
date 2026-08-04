import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { faqs } from '../data/site.js'

function Item({ q, a, open, onToggle }) {
  return (
    <div className={`bg-surfaceContainerLow rounded-2xl overflow-hidden border transition-colors ${open ? 'border-promoGold/60' : 'border-transparent'}`}>
      <button onClick={onToggle} className="flex w-full justify-between items-center p-6 text-left" aria-expanded={open}>
        <h4 className="font-serif text-headline-md text-primary text-lg pr-4">{q}</h4>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <Icon name="expand_more" className={`flex-shrink-0 transition-colors ${open ? 'text-promoGold' : 'text-secondary'}`} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-onSurfaceVariant font-sans leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="preguntas" className="py-section bg-background">
      <div className="max-w-3xl mx-auto px-mobile md:px-gutter">
        <Reveal className="text-center mb-16">
          <p aria-hidden="true" className="ornament mb-4 text-sm">✦</p>
          <h2
            className="font-serif italic font-normal text-primary leading-[0.98]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Preguntas frecuentes
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          {faqs.map((f, i) => (
            <Item key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
