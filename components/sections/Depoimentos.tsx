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
    <section id="depoimentos" className="py-28 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2">
            Clientes Satisfeitos
          </p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            O que dizem sobre <span className="text-gold">a Velória</span>
          </h2>
          {/* Rating */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="font-serif text-off-white font-semibold">4.9</span>
            <span className="text-off-white/15">·</span>
            <span className="text-muted text-sm">347 avaliações verificadas</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEPOIMENTOS.map((dep, i) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative bg-card border border-white/5 rounded-2xl p-8 hover:border-gold/25 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quote */}
              <div
                className="absolute top-3 right-5 text-gold/7 group-hover:text-gold/12 transition-colors duration-300 select-none leading-none"
                style={{ fontFamily: 'Georgia, serif', fontSize: '6rem', lineHeight: 1 }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: dep.estrelas }).map((_, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-off-white/68 text-sm leading-[1.8] mb-8 relative z-10 italic">
                "{dep.texto}"
              </p>

              <div className="flex items-center gap-3.5 pt-5 border-t border-white/5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold/25 flex-shrink-0">
                  <Image src={AVATARS[i]} alt={dep.nome} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <div className="font-semibold text-[0.88rem] group-hover:text-gold transition-colors duration-200">{dep.nome}</div>
                  <div className="text-muted text-[0.72rem] mt-0.5">{dep.tipo}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
