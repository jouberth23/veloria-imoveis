'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { IMOVEIS, formatPreco } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SearchBar } from '@/components/ui/SearchBar'
import { imovelDBToImovel } from '@/lib/types'
import type { Imovel } from '@/lib/types'

function FeaturedCard({ imovel }: { imovel: Imovel }) {
  return (
    <Link
      href={`/imovel/${imovel.slug}`}
      className="card-gold-top group block bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-[0_32px_64px_rgba(0,0,0,.5)] transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative lg:w-[58%] h-72 lg:h-auto overflow-hidden flex-shrink-0">
          {imovel.imagem && (
            <Image
              src={imovel.imagem}
              alt={imovel.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent to-card/80" />
          <div className="absolute top-4 left-4 z-10">
            <Badge type={imovel.badge} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <span className="eyelet mb-3 block">Imóvel em Destaque</span>
            <h3 className="font-serif text-[1.6rem] leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
              {imovel.titulo}
            </h3>
            <p className="text-muted text-sm flex items-center gap-1.5 mb-5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {imovel.bairro}, {imovel.cidade}
            </p>
            {imovel.descricao && (
              <p className="text-muted text-sm leading-relaxed line-clamp-3">{imovel.descricao}</p>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-5 text-muted text-xs border-t border-border pt-5 mt-6 mb-6">
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                {imovel.area}m²
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M22 4v16M2 12h20M7 4v8M17 4v8"/></svg>
                {imovel.quartos} {imovel.suite ? 'suítes' : 'quartos'}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="12" rx="2"/><path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>
                {imovel.vagas} {imovel.vagas === 1 ? 'vaga' : 'vagas'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-serif text-[1.8rem] text-gold leading-none">{formatPreco(imovel)}</span>
              <span className="text-[0.75rem] text-gold/70 border border-gold/25 px-4 py-2 rounded-lg group-hover:bg-gold/10 group-hover:border-gold/50 transition-all duration-300">
                Ver Detalhes →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function Imoveis() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [destaques, setDestaques] = useState<Imovel[]>(IMOVEIS.filter(i => i.destaque))

  useEffect(() => {
    fetch('/api/imoveis')
      .then((r) => r.json())
      .then(({ properties, source }) => {
        if (source === 'supabase' && properties?.length > 0) {
          const fromDB = properties.map(imovelDBToImovel).filter((i: Imovel) => i.destaque)
          if (fromDB.length > 0) setDestaques(fromDB)
        }
      })
      .catch(() => {})
  }, [])

  const [featured, ...rest] = destaques
  if (!featured) return null

  return (
    <section id="imoveis" className="py-24 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyelet mb-2 block">Portfólio Selecionado</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Imóveis em <span className="text-gold">Destaque</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/imoveis"
              className="text-sm text-muted hover:text-gold transition-colors flex items-center gap-2 group"
            >
              Ver todos os imóveis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <SearchBar />
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="mb-6"
        >
          <FeaturedCard imovel={featured} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.slice(0, 3).map((imovel, i) => (
            <motion.div
              key={imovel.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
            >
              <Card imovel={imovel} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
