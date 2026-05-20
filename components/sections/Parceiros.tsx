'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PARCEIROS } from '@/lib/constants'

export function Parceiros() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="parceiros" className="py-16 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          className="flex items-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
          <span className="text-muted text-[0.68rem] font-semibold tracking-widest uppercase flex-shrink-0">
            Financiamos com os melhores bancos
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
        </motion.div>

        <div className="flex justify-center items-center gap-8 sm:gap-14 flex-wrap">
          {PARCEIROS.map((p, i) => (
            <motion.div
              key={p.nome}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ opacity: 1 }}
              className="group flex flex-col items-center gap-1.5 cursor-pointer"
              style={{ opacity: 0.4 }}
            >
              <div className="font-serif text-lg font-bold tracking-widest text-off-white group-hover:text-gold transition-colors duration-300">
                {p.nome}
              </div>
              <div className="h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-300" />
              <div className="text-muted text-[0.6rem] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {p.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
