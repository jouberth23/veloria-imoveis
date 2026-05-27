'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SERVICOS } from '@/lib/constants'

export function Servicos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicos" className="py-16 lg:py-28 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-20 items-start">

          {/* Sticky left */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyelet mb-4 block">O que Oferecemos</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight">
              Soluções completas<br />para o seu imóvel.
            </h2>
            <p className="text-muted text-sm leading-relaxed mt-5 mb-10">
              Do primeiro contato ao pós-venda, cuidamos de cada detalhe para garantir a melhor experiência imobiliária em BH.
            </p>
            <div className="border-t border-border pt-8">
              <div className="font-serif text-5xl text-gold leading-none">6</div>
              <div className="text-muted text-xs mt-2 tracking-widest uppercase">Serviços Especializados</div>
            </div>
          </motion.div>

          {/* Numbered list */}
          <div>
            {SERVICOS.map((servico, i) => (
              <motion.div
                key={servico.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group border-b border-border last:border-0 py-7 flex gap-8 items-start hover:pl-1 transition-all duration-300 cursor-default"
              >
                <span className="font-serif text-[2rem] text-gold/15 group-hover:text-gold/40 transition-colors duration-300 leading-none pt-1 w-12 text-right flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-serif text-[1.1rem] group-hover:text-gold transition-colors duration-300">
                      {servico.titulo}
                    </h4>
                    <svg
                      width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className="text-gold opacity-0 group-hover:opacity-60 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{servico.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
