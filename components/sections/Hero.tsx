'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SearchBar } from '@/components/ui/SearchBar'
import { EMPRESA } from '@/lib/constants'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
        alt="Belo Horizonte"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Layered dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep/98 via-deep/88 to-deep/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-deep/35" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Gold glow accents */}
      <div
        className="absolute inset-0 pointer-events-none animate-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse at 8% 78%, rgba(201,168,76,.18) 0%, transparent 42%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 90% 20%, rgba(201,168,76,.04) 0%, transparent 35%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex items-center justify-between gap-12">

          {/* Left content */}
          <div className="flex-1 min-w-0">
            <motion.div
              {...fade(0.1)}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 px-4 py-1.5 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-7"
            >
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Imóveis de Alto Padrão em BH
            </motion.div>

            <motion.h1
              {...fade(0.2)}
              className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] mb-6 max-w-2xl"
            >
              Encontre o imóvel que<br />
              <em className="text-gold not-italic">define quem você é.</em>
            </motion.h1>

            <motion.p {...fade(0.3)} className="text-off-white/72 text-lg max-w-xl mb-12 leading-relaxed">
              Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Exclusividade, transparência e resultados reais.
            </motion.p>

            <motion.div {...fade(0.4)}>
              <SearchBar className="mb-12" />
            </motion.div>

            <motion.div {...fade(0.5)} className="flex flex-wrap gap-8">
              {EMPRESA.stats.map(stat => (
                <div key={stat.label} className="group relative">
                  <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/60 via-gold/30 to-transparent rounded-full" />
                  <div className="pl-5">
                    <div className="font-serif text-[1.9rem] text-gold leading-none tracking-tight">{stat.valor}</div>
                    <div className="text-off-white/45 text-[0.72rem] mt-1.5 tracking-wide uppercase">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating property card — desktop only */}
          <motion.div
            className="hidden xl:flex flex-col gap-4 flex-shrink-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-72 relative bg-card/85 backdrop-blur-xl border border-gold/25 rounded-2xl overflow-hidden"
              animate={{ y: [0, -9, 0] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.10)' }}
            >
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                  alt="Cobertura em destaque"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="bg-emerald-500 text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                    Lançamento
                  </span>
                </div>
                <div className="absolute top-3.5 right-3.5 w-8 h-8 bg-deep/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </div>
                <div className="absolute bottom-3.5 left-4">
                  <div className="font-serif text-white text-xl font-semibold drop-shadow-lg leading-none">R$ 2.350.000</div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-serif text-[0.92rem] text-off-white mb-1 leading-tight">Cobertura Terraço Nobre</div>
                <div className="flex items-center gap-1.5 text-muted text-[0.68rem] mb-3">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Lourdes, Belo Horizonte
                </div>
                <div className="flex items-center gap-2 text-muted text-[0.68rem] border-t border-border pt-2.5">
                  <span>4 suítes</span>
                  <span className="text-gold/30">·</span>
                  <span>380 m²</span>
                  <span className="text-gold/30">·</span>
                  <span>4 vagas</span>
                </div>
              </div>
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/6 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Live badge */}
            <motion.div
              className="self-start ml-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl px-4 py-2.5 flex items-center gap-2.5"
              style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-[0.7rem] text-off-white/85 whitespace-nowrap font-medium">5 novos imóveis hoje</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-off-white/35 text-[0.6rem] tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-5 h-8 border border-gold/25 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
