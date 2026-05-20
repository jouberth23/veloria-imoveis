'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CATEGORIAS } from '@/lib/constants'

const CATEGORY_IMAGES: Record<string, string> = {
  apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
  house:     'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80',
  penthouse: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
  terrain:   'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
  commercial:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  launch:    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
}

const COUNTS: Record<string, string> = {
  apartment: '142', house: '87', penthouse: '23',
  terrain: '45', commercial: '38', launch: '12',
}

const ICONS: Record<string, React.ReactNode> = {
  apartment: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  house:     <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  penthouse: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M2 22V8l10-6 10 6v14M6 22V14h12v8"/><path d="M10 14v4h4v-4z"/></svg>,
  terrain:   <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
  commercial:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4"/></svg>,
  launch:    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>,
}

export function Categorias() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="categorias" className="py-24 bg-card border-y border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">Explorar por Tipo</span>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] mt-2">
            Busque pelo que <span className="text-gold">você procura</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIAS.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/imoveis?tipo=${cat.slug}`}
                className="group relative flex flex-col rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300 hover:-translate-y-1.5 aspect-[3/4]"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={CATEGORY_IMAGES[cat.icon]}
                    alt={cat.nome}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 to-deep/10 group-hover:from-deep/80 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-end h-full pb-5 px-2">
                  <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:bg-gold/25 transition-colors border border-white/20 group-hover:border-gold/40">
                    {ICONS[cat.icon]}
                  </div>
                  <span className="text-[0.8rem] font-semibold text-white text-center leading-tight">{cat.nome}</span>
                  <span className="text-[0.62rem] text-gold/70 mt-0.5">{COUNTS[cat.icon]} imóveis</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
