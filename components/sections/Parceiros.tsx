'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PARCEIROS } from '@/lib/constants'

export function Parceiros() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="parceiros" className="py-18 bg-card border-y border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">Nossos Parceiros</span>
          <h2 className="font-serif text-2xl mt-2">
            Trabalhamos com as melhores <span className="text-gold">instituições</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PARCEIROS.map((p, i) => (
            <motion.div
              key={p.nome}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 0.45, y: 0 } : {}}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="font-serif text-xl font-bold tracking-wide text-off-white">{p.nome}</div>
              <div className="text-muted text-[0.65rem] uppercase tracking-widest">{p.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
