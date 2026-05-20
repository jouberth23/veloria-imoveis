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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-h-[540px] rounded-2xl overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Equipe Velória Imóveis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
            </div>

            {/* Floating badge – years */}
            <div className="absolute -bottom-5 -right-5 bg-gold text-deep px-7 py-5 rounded-2xl text-center shadow-2xl z-10">
              <div className="font-serif text-4xl font-bold leading-none">15+</div>
              <div className="text-[0.65rem] font-bold uppercase tracking-widest mt-1.5">Anos no Mercado</div>
            </div>

            {/* Floating badge – CRECI */}
            <div className="absolute top-6 -left-5 bg-card border border-border px-5 py-4 rounded-xl shadow-xl flex items-center gap-3 z-10">
              <div className="w-10 h-10 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="font-serif text-base text-gold leading-none">CRECI-MG</div>
                <div className="text-muted text-[0.65rem] tracking-wide mt-0.5">Certificado Oficial</div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Quem Somos</span>
              <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] mt-3 mb-6">
                Mais que uma imobiliária —<br />
                <span className="text-gold">uma parceria de vida.</span>
              </h2>
            </motion.div>

            {[
              { delay: 0.25, text: 'A Velória Imóveis nasceu do desejo de transformar a experiência de comprar, vender ou alugar um imóvel em Belo Horizonte. Acreditamos que cada negociação é única e merece atenção especializada.' },
              { delay: 0.35, text: 'Nossa equipe de corretores certificados alia profundo conhecimento do mercado local com atendimento personalizado, garantindo que você tome as melhores decisões com segurança e tranquilidade.' },
            ].map((p, i) => (
              <motion.p
                key={i}
                className="text-muted leading-relaxed mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: p.delay }}
              >
                {p.text}
              </motion.p>
            ))}

            {/* Numbers grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {EMPRESA.numeros.map(n => (
                <div key={n.label} className="bg-card border border-border rounded-xl p-5 hover:border-gold/30 transition-colors">
                  <div className="font-serif text-[2rem] text-gold leading-none">{n.valor}</div>
                  <div className="text-muted text-xs mt-2 tracking-wide">{n.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
