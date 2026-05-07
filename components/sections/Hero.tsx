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
      <div className="absolute inset-0 bg-gradient-to-r from-deep/97 via-deep/82 to-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/30" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Gold glow accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 80%, rgba(201,168,76,.10) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            {...fade(0.1)}
            className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 px-4 py-1.5 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-7"
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Imóveis de Alto Padrão em BH
          </motion.div>

          <motion.h1
            {...fade(0.2)}
            className="font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.08] mb-6"
          >
            Encontre o imóvel que<br />
            <em className="text-gold not-italic">define quem você é.</em>
          </motion.h1>

          <motion.p {...fade(0.3)} className="text-off-white/75 text-lg max-w-xl mb-12 leading-relaxed">
            Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Exclusividade, transparência e resultados reais.
          </motion.p>

          <motion.div {...fade(0.4)}>
            <SearchBar className="mb-12" />
          </motion.div>

          <motion.div {...fade(0.5)} className="flex flex-wrap gap-10">
            {EMPRESA.stats.map(stat => (
              <div key={stat.label} className="border-l-2 border-gold/40 pl-5">
                <div className="font-serif text-[1.9rem] text-gold leading-none">{stat.valor}</div>
                <div className="text-off-white/50 text-xs mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-off-white/40 text-[0.6rem] tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-5 h-8 border border-gold/25 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
