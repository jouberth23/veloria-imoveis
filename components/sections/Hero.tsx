'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SearchBar } from '@/components/ui/SearchBar'
import { EMPRESA, IMOVEIS, formatPreco } from '@/lib/constants'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const featured = IMOVEIS.find(i => i.badge === 'Lançamento') ?? IMOVEIS[0]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
        alt="Belo Horizonte"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-deep/97 via-deep/88 to-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/30" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 12% 78%, rgba(201,168,76,.12) 0%, transparent 48%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 78% 35%, rgba(201,168,76,.07) 0%, transparent 42%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-16">

          {/* Left content */}
          <div className="max-w-2xl">
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
              Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte.
              Exclusividade, transparência e resultados reais.
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

          {/* Right — floating property card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: -16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:block w-[296px] flex-shrink-0 relative"
          >
            {/* CRECI badge */}
            <div className="absolute -top-5 -right-5 z-20 bg-card border border-border rounded-xl px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,.5)] flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="text-[0.65rem] font-bold text-off-white leading-none">CRECI-MG</div>
                <div className="text-[0.6rem] text-muted mt-0.5">Verificado</div>
              </div>
            </div>

            {/* Property card */}
            <div className="card-gold-top bg-card/80 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,.75)]">
              <div className="relative h-48">
                <Image
                  src={featured.imagem ?? ''}
                  alt={featured.titulo}
                  fill
                  className="object-cover"
                  sizes="296px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-500/85 text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {featured.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="font-serif text-xl text-white font-semibold">{formatPreco(featured)}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="font-serif text-[0.9rem] mb-1 text-off-white">{featured.titulo}</p>
                <p className="text-muted text-[0.7rem] mb-3 flex items-center gap-1.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {featured.bairro} · {featured.cidade}
                </p>
                <div className="flex items-center gap-2.5 text-[0.68rem] text-muted border-t border-border pt-3">
                  <span>{featured.area}m²</span>
                  <span className="text-gold/30">·</span>
                  <span>{featured.quartos} {featured.suite ? 'suítes' : 'quartos'}</span>
                  <span className="text-gold/30">·</span>
                  <span>{featured.vagas} vagas</span>
                </div>
              </div>
            </div>

            {/* Animated stat pill */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-6 z-20 bg-gold text-deep px-5 py-3 rounded-xl shadow-[0_12px_32px_rgba(201,168,76,.4)] text-center"
            >
              <div className="font-serif text-2xl font-bold leading-none">340+</div>
              <div className="text-[0.56rem] font-bold uppercase tracking-widest mt-0.5">Imóveis</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent pointer-events-none z-[5]" />

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
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
