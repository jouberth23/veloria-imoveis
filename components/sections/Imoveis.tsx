'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { IMOVEIS } from '@/lib/constants'
import { Card } from '@/components/ui/Card'

export function Imoveis() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const destaques = IMOVEIS.filter(i => i.destaque)

  return (
    <section id="imoveis" className="py-24 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Portfólio Selecionado</span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] mt-2 mb-2">
              Imóveis em <span className="text-gold">Destaque</span>
            </h2>
            <p className="text-muted text-sm max-w-md">
              Curadoria exclusiva dos melhores imóveis disponíveis em Belo Horizonte.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/imoveis"
              className="border border-border text-gold text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gold/10 hover:border-gold transition-all"
            >
              Ver Todos os Imóveis →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destaques.map((imovel, i) => (
            <motion.div
              key={imovel.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              <Card imovel={imovel} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
