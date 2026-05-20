'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EMPRESA } from '@/lib/constants'

export function Sobre() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" className="py-28 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/5"
              style={{ aspectRatio: '4/5', maxHeight: 560 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85"
                alt="Equipe Velória Imóveis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
            </div>

            {/* Badge anos */}
            <motion.div
              className="absolute -bottom-6 -right-4 bg-gold text-deep px-7 py-5 rounded-2xl text-center z-10 animate-float"
              style={{ boxShadow: '0 16px 48px rgba(201,168,76,0.35)' }}
            >
              <div className="font-serif text-4xl font-bold leading-none">15+</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-widest mt-1.5">Anos no Mercado</div>
            </motion.div>

            {/* Badge CRECI */}
            <motion.div
              className="absolute top-6 -left-4 bg-card/95 backdrop-blur-sm border border-white/8 px-5 py-4 rounded-xl flex items-center gap-3 z-10"
              style={{ boxShadow: '0 12px 36px rgba(0,0,0,0.5)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.12)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="font-serif text-sm text-gold leading-none">CRECI-MG</div>
                <div className="text-muted text-[0.62rem] tracking-wide mt-0.5">Certificado Oficial</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6"
            >
              <p className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-3">
                Quem Somos
              </p>
              <h2 className="font-serif leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Mais que uma imobiliária —<br />
                <span className="text-gold">uma parceria de vida.</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-muted leading-relaxed mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              A Velória Imóveis nasceu do desejo de transformar a experiência de comprar, vender ou alugar um imóvel em Belo Horizonte. Acreditamos que cada negociação é única e merece atenção especializada.
            </motion.p>
            <motion.p
              className="text-muted leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.33 }}
            >
              Nossa equipe de corretores certificados alia profundo conhecimento do mercado local com atendimento personalizado, garantindo que você tome as melhores decisões com segurança e tranquilidade.
            </motion.p>

            {/* Numbers */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
            >
              {EMPRESA.numeros.map(n => (
                <div
                  key={n.label}
                  className="group bg-card border border-white/5 rounded-xl p-5 hover:border-gold/25 transition-all duration-300 cursor-default"
                >
                  <div className="font-serif text-[2rem] text-gold leading-none mb-2">{n.valor}</div>
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
