'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EMPRESA, WHATSAPP_URL } from '@/lib/constants'

const stat = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen min-h-[680px] flex flex-col overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
        alt="Imóvel de alto padrão"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep/96 via-deep/80 to-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Left gold accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20">
          <div className="max-w-[640px]">

            {/* Eyelet */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-6 h-px bg-gold" />
              <span className="eyelet">Belo Horizonte · Alto Padrão</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3rem,7vw,5.6rem)] leading-[1.04] text-off-white mb-7"
            >
              O imóvel que você<br />
              procura está<br />
              <em className="text-gold not-italic">aqui.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="text-off-white/55 text-base leading-relaxed mb-10 max-w-md"
            >
              Há 15 anos conectamos pessoas e imóveis com exclusividade,
              transparência e resultado real.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/imoveis"
                className="inline-flex items-center gap-2 bg-gold text-deep font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-gold-light transition-colors"
              >
                Ver Imóveis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 text-off-white/80 text-sm font-medium px-7 py-3.5 rounded-lg hover:border-white/35 hover:text-off-white transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.885a.5.5 0 00.611.628l6.218-1.632A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.381l-.363-.215-3.767.988.988-3.671-.236-.38A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Falar com Corretor
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="relative z-10 border-t border-white/8 bg-deep/60 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {EMPRESA.stats.map((s, i) => (
              <motion.div key={s.label} {...stat(1.2 + i * 0.08)} className="flex items-center gap-4">
                {i > 0 && <div className="hidden sm:block h-5 w-px bg-white/10" />}
                <div>
                  <div className="font-serif text-[1.4rem] text-gold leading-none">{s.valor}</div>
                  <div className="text-off-white/40 text-[0.63rem] mt-0.5 tracking-wide">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — desktop */}
      <motion.div
        className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-4 h-7 border border-white/20 rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
        <span
          className="text-off-white/25 text-[0.58rem] tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
