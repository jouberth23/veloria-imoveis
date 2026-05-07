'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IMOVEIS } from '@/lib/constants'
import { Card } from '@/components/ui/Card'
import { SearchBar } from '@/components/ui/SearchBar'
import type { BadgeType, SearchFilters } from '@/lib/types'

const BADGE_FILTERS: { label: string; value: BadgeType | 'Todos' }[] = [
  { label: 'Todos',      value: 'Todos' },
  { label: 'Venda',      value: 'Venda' },
  { label: 'Aluguel',    value: 'Aluguel' },
  { label: 'Lançamento', value: 'Lançamento' },
]

export default function ImoveisPage() {
  const [activeFilter, setActiveFilter] = useState<BadgeType | 'Todos'>('Todos')
  const [filters, setFilters] = useState<SearchFilters>({})

  const filtered = IMOVEIS.filter(i => {
    if (activeFilter !== 'Todos' && i.badge !== activeFilter) return false
    if (filters.localizacao) {
      const loc = filters.localizacao.toLowerCase()
      if (!i.bairro.toLowerCase().includes(loc) && !i.cidade.toLowerCase().includes(loc)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">Portfólio Completo</span>
          <h1 className="font-serif text-4xl mt-2 mb-2">Todos os <span className="text-gold">Imóveis</span></h1>
          <p className="text-muted">{IMOVEIS.length} imóveis disponíveis em Belo Horizonte</p>
        </motion.div>

        <SearchBar onSearch={setFilters} className="mb-8" />

        <div className="flex gap-3 mb-10 flex-wrap">
          {BADGE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeFilter === f.value
                  ? 'bg-gold text-deep border-gold'
                  : 'border-border text-muted hover:border-gold hover:text-gold'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((imovel, i) => (
            <motion.div
              key={imovel.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card imovel={imovel} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="font-serif text-2xl mb-2">Nenhum imóvel encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca.</p>
          </div>
        )}
      </div>
    </div>
  )
}
