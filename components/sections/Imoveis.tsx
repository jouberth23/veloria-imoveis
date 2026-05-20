'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { IMOVEIS, formatPreco } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Imoveis() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const destaques = IMOVEIS.filter(i => i.destaque)
  const [featured, ...rest] = destaques

  return (
    <section id="imoveis" className="py-28 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold text-[0.7rem] font-semibold tracking-[0.2em] uppercase mb-2">
              Portfólio Selecionado
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Imóveis em <span className="text-gold">Destaque</span>
            </h2>
            <p className="text-muted text-sm mt-2 max-w-sm">
              Curadoria exclusiva dos melhores imóveis disponíveis em Belo Horizonte.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/imoveis"
              className="border border-border text-gold text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gold/8 hover:border-gold transition-all duration-200 whitespace-nowrap"
            >
              Ver Todos →
            </Link>
          </motion.div>
        </div>

        {/* Featured + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Featured card — 2 cols wide */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              href={`/imovel/${featured.slug}`}
              className="group block bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-gold/25 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(0,0,0,0.6)] transition-all duration-500 h-full"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={featured.imagem ?? ''}
                  alt={featured.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                {/* Badges row */}
                <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                  <Badge type={featured.badge} />
                  <span className="bg-gold text-deep text-[0.6rem] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                    Destaque
                  </span>
                </div>

                {/* Fav */}
                <button
                  onClick={e => e.preventDefault()}
                  aria-label="Favoritar"
                  className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gold/30 hover:border-gold/40 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="font-serif text-[1.7rem] text-white font-semibold leading-none mb-3">
                    {formatPreco(featured)}
                  </div>
                  <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold transition-colors duration-200">
                    {featured.titulo}
                  </h3>
                  <p className="text-white/60 text-xs flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {featured.bairro}, {featured.cidade}
                  </p>
                  <div className="flex items-center gap-3 text-white/50 text-[0.72rem] mt-3 pt-3 border-t border-white/10">
                    <span>{featured.area}m²</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.quartos} {featured.suite ? 'suítes' : 'quartos'}</span>
                    <span className="opacity-40">·</span>
                    <span>{featured.vagas} vagas</span>
                    <span className="ml-auto text-deep bg-gold text-[0.65rem] font-bold px-3 py-1.5 rounded-lg tracking-wide opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Ver Imóvel →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right: 1 standard card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <Card imovel={rest[0]} />
          </motion.div>
        </div>

        {/* Row 2: 3 standard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rest.slice(1, 4).map((imovel, i) => (
            <motion.div
              key={imovel.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.26 + i * 0.08 }}
            >
              <Card imovel={imovel} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
