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

  const [featured, ...rest] = DEPOIMENTOS

  return (
    <section id="depoimentos" className="py-28 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
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
          <div className="mt-3 mx-auto w-14 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="text-muted text-sm mt-4 max-w-md mx-auto">
            A confiança dos nossos clientes é o nosso maior patrimônio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0 }}
            className="card-gold-top relative bg-card border border-border rounded-2xl p-10 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1 flex flex-col"
          >
            <span className="absolute top-6 right-7 font-serif text-[8rem] text-gold/8 leading-none select-none group-hover:text-gold/14 transition-colors pointer-events-none">"</span>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: featured.estrelas }).map((_, j) => (
                <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>

            <p className="text-off-white/80 text-[1.05rem] leading-relaxed mb-8 relative z-10 flex-1">
              &ldquo;{featured.texto}&rdquo;
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                <Image src={AVATARS[0]} alt={featured.nome} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{featured.nome}</div>
                <div className="text-muted text-xs mt-0.5">{featured.tipo}</div>
              </div>
              <div className="bg-gold/10 border border-gold/25 rounded-lg px-3 py-2 flex items-center gap-1.5 flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="text-gold text-[0.62rem] font-semibold uppercase tracking-wide">Verificado</span>
              </div>
            </div>
          </motion.div>

          {/* Two smaller testimonials */}
          <div className="flex flex-col gap-6">
            {rest.map((dep, i) => (
              <motion.div
                key={dep.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.14 + i * 0.12 }}
                className="card-gold-top relative bg-card border border-border rounded-2xl p-7 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1 flex-1 flex flex-col"
              >
                <span className="absolute top-4 right-5 font-serif text-6xl text-gold/8 leading-none select-none group-hover:text-gold/13 transition-colors pointer-events-none">"</span>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: dep.estrelas }).map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="#C9A84C">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                <p className="text-off-white/70 text-sm leading-relaxed mb-6 relative z-10 flex-1">{dep.texto}</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold/30 flex-shrink-0">
                    <Image src={AVATARS[i + 1]} alt={dep.nome} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{dep.nome}</div>
                    <div className="text-muted text-xs mt-0.5">{dep.tipo}</div>
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
