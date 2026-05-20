'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SERVICOS } from '@/lib/constants'

const SVG_PATHS: Record<string, React.ReactNode> = {
  home:     <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  list:     <path d="M21 10H3M21 6H3M21 14H3M21 18H3"/>,
  star:     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  file:     <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  card:     <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10M9 7h6M9 11h2"/></>,
}

export function Servicos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicos" className="py-28 bg-card relative" ref={ref}>
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-16 items-start">

          {/* Sticky left column */}
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">O que Oferecemos</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] mt-3 mb-5">
              Soluções completas para o <span className="text-gold">seu imóvel</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              Do primeiro contato ao pós-venda, cuidamos de cada detalhe para você ter a melhor experiência imobiliária em BH.
            </p>

            <div className="mt-10 pt-8 border-t border-border flex gap-10">
              <div>
                <div className="font-serif text-3xl text-gold leading-none">6</div>
                <div className="text-muted text-xs mt-1.5 tracking-wide uppercase">Serviços</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-gold leading-none">15+</div>
                <div className="text-muted text-xs mt-1.5 tracking-wide uppercase">Anos de experiência</div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="mt-8 w-16 h-1 rounded-full bg-gradient-to-r from-gold/50 to-transparent" />
          </motion.div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICOS.map((servico, i) => (
              <motion.div
                key={servico.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                className="group relative bg-deep/50 border border-border rounded-2xl p-7 hover:bg-gold/5 hover:border-gold/30 transition-all duration-300 overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)')}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gold/0 group-hover:bg-gradient-to-b group-hover:from-gold/60 group-hover:via-gold/30 group-hover:to-transparent rounded-full transition-all duration-300" />

                {/* Number indicator */}
                <div className="absolute top-5 right-5 font-serif text-[0.7rem] text-gold/20 group-hover:text-gold/35 transition-colors">
                  0{i + 1}
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.16), rgba(201,168,76,0.06))',
                      border: '1px solid rgba(201,168,76,0.22)',
                      boxShadow: '0 4px 16px rgba(201,168,76,0.08)',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                      {SVG_PATHS[servico.icon]}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif text-[1rem] mb-2 group-hover:text-gold transition-colors duration-200">{servico.titulo}</h4>
                    <p className="text-muted text-xs leading-relaxed">{servico.descricao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
