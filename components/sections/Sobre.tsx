'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EMPRESA } from '@/lib/constants'

export function Sobre() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" className="py-16 lg:py-28 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-h-[560px] rounded-2xl overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Equipe Velória Imóveis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent" />
            </div>

            {/* Years badge */}
            <div className="absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-6 bg-gold text-deep px-5 py-4 sm:px-7 sm:py-5 rounded-2xl text-center shadow-[0_20px_48px_rgba(201,168,76,.25)] z-10">
              <div className="font-serif text-3xl sm:text-4xl font-bold leading-none">15+</div>
              <div className="text-[0.6rem] font-bold uppercase tracking-widest mt-1.5">Anos no Mercado</div>
            </div>

            {/* CRECI badge */}
            <div className="absolute top-4 -left-2 sm:top-6 sm:-left-5 bg-deep border border-border px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-xl flex items-center gap-3 z-10">
              <div className="w-9 h-9 bg-gold/12 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="font-serif text-sm text-gold leading-none">CRECI-MG</div>
                <div className="text-muted text-[0.6rem] tracking-wide mt-0.5">Certificado Oficial</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="eyelet mb-4 block">Quem Somos</span>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight mb-6">
                Mais que uma imobiliária —<br />
                <em className="text-gold not-italic">uma parceria de vida.</em>
              </h2>
            </motion.div>

            {[
              { delay: 0.25, text: 'A Velória Imóveis nasceu do desejo de transformar a experiência de comprar, vender ou alugar um imóvel em Belo Horizonte. Acreditamos que cada negociação é única e merece atenção especializada.' },
              { delay: 0.35, text: 'Nossa equipe de corretores certificados alia profundo conhecimento do mercado local com atendimento personalizado, garantindo que você tome as melhores decisões com segurança e tranquilidade.' },
            ].map((p, i) => (
              <motion.p
                key={i}
                className="text-muted text-[0.92rem] leading-relaxed mb-5"
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: p.delay }}
              >
                {p.text}
              </motion.p>
            ))}

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-3 mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {EMPRESA.numeros.map(n => (
                <div key={n.label} className="card-gold-top bg-deep border border-border rounded-xl p-5 hover:border-gold/25 transition-colors">
                  <div className="font-serif text-[2.2rem] text-gold leading-none">{n.valor}</div>
                  <div className="mt-2 mb-1.5 h-px w-7 bg-gradient-to-r from-gold/50 to-transparent" />
                  <div className="text-muted text-xs tracking-wide">{n.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
