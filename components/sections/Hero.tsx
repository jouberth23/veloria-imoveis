'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SearchBar } from '@/components/ui/SearchBar'
import { EMPRESA } from '@/lib/constants'

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85"
        alt="Belo Horizonte"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient: dark on left, image reveals on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, #09111F 0%, #09111F 36%, rgba(9,17,31,0.9) 54%, rgba(9,17,31,0.5) 72%, rgba(9,17,31,0.15) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/65 via-transparent to-deep/25" />

      {/* Subtle gold glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-24">
        <div className="max-w-[640px]">

          {/* Tag */}
          <motion.div
            {...anim(0.1)}
            className="inline-flex items-center gap-2.5 border border-gold/30 bg-gold/10 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse" />
            <span className="text-gold text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
              Imóveis de Alto Padrão · Belo Horizonte
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.22)}
            className="font-serif leading-[1.07] mb-7"
            style={{ fontSize: 'clamp(2.8rem, 5.6vw, 5rem)' }}
          >
            Encontre o imóvel<br />
            que define<br />
            <em className="text-gold not-italic">quem você é.</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...anim(0.34)}
            className="text-off-white/60 text-[1.05rem] max-w-[480px] mb-10 leading-[1.75]"
          >
            Mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Exclusividade, transparência e resultados reais.
          </motion.p>

          {/* Search */}
          <motion.div {...anim(0.44)} className="mb-14">
            <SearchBar />
          </motion.div>

          {/* Stats */}
          <motion.div {...anim(0.54)} className="flex flex-wrap gap-10">
            {EMPRESA.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-serif leading-none text-gold mb-1.5"
                  style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)' }}
                >
                  {stat.valor}
                </div>
                <div className="text-[0.65rem] text-off-white/40 tracking-[0.18em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[0.58rem] text-off-white/30 tracking-[0.25em] uppercase mb-1">Rolar</span>
        <div className="relative w-px h-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/60 to-transparent animate-line-down" />
        </div>
      </motion.div>

    </section>
  )
}
