'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DEPOIMENTOS } from '@/lib/constants'

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
]

export function Depoimentos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="depoimentos" className="py-28 bg-deep relative overflow-hidden" ref={ref}>
      {/* Ambient glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,.05) 0%, transparent 65%)' }}
      />
      {/* Top grid fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">Clientes Satisfeitos</span>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] mt-2">
            O que dizem sobre <span className="text-gold">a Velória</span>
          </h2>

          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="font-serif text-off-white font-semibold text-base">4.9</span>
            <span className="text-border">|</span>
            <span className="text-muted text-sm">347 avaliações verificadas</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEPOIMENTOS.map((dep, i) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.13 }}
              className="relative bg-card border border-border rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1.5 overflow-hidden"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.55)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)')}
            >
              {/* Decorative quote glyph */}
              <div
                className="absolute top-3 right-5 text-gold/7 group-hover:text-gold/12 transition-colors duration-300 select-none leading-none"
                style={{ fontFamily: 'Georgia, serif', fontSize: '7rem', lineHeight: '1' }}
              >
                "
              </div>

              {/* Top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              {/* Stars */}
              <div className="flex gap-1 mb-5 relative z-10">
                {Array.from({ length: dep.estrelas }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-off-white/72 text-sm leading-relaxed mb-8 relative z-10 italic">
                "{dep.texto}"
              </p>

              <div className="flex items-center gap-3.5 pt-5 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                  <Image
                    src={AVATARS[i]}
                    alt={dep.nome}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm group-hover:text-gold transition-colors duration-200">{dep.nome}</div>
                  <div className="text-muted text-xs mt-0.5">{dep.tipo}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
