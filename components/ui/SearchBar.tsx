'use client'

import { useState } from 'react'
import type { SearchFilters } from '@/lib/types'

interface Props {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

export function SearchBar({ onSearch, className = '' }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({
    tipo: '',
    localizacao: '',
    faixaPreco: '',
    finalidade: 'Comprar',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch?.(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-card/90 border border-border rounded-xl p-5 flex flex-wrap gap-3 items-end backdrop-blur-sm ${className}`}
    >
      <Field label="Tipo de Imóvel">
        <select
          value={filters.tipo}
          onChange={e => setFilters(f => ({ ...f, tipo: e.target.value }))}
          className="input-field"
        >
          <option value="">Todos os tipos</option>
          <option>Apartamento</option>
          <option>Casa</option>
          <option>Cobertura</option>
          <option>Terreno</option>
          <option>Comercial</option>
        </select>
      </Field>

      <Field label="Cidade / Bairro" className="flex-[2]">
        <input
          type="text"
          placeholder="Ex: Savassi, Lourdes..."
          value={filters.localizacao}
          onChange={e => setFilters(f => ({ ...f, localizacao: e.target.value }))}
          className="input-field"
        />
      </Field>

      <Field label="Faixa de Preço">
        <select
          value={filters.faixaPreco}
          onChange={e => setFilters(f => ({ ...f, faixaPreco: e.target.value }))}
          className="input-field"
        >
          <option value="">Qualquer valor</option>
          <option>Até R$ 300.000</option>
          <option>R$ 300k – R$ 600k</option>
          <option>R$ 600k – R$ 1M</option>
          <option>R$ 1M – R$ 2M</option>
          <option>Acima de R$ 2M</option>
        </select>
      </Field>

      <Field label="Finalidade">
        <select
          value={filters.finalidade}
          onChange={e => setFilters(f => ({ ...f, finalidade: e.target.value as SearchFilters['finalidade'] }))}
          className="input-field"
        >
          <option>Comprar</option>
          <option>Alugar</option>
          <option>Lançamentos</option>
        </select>
      </Field>

      <button
        type="submit"
        className="flex items-center gap-2 bg-gold text-deep font-semibold text-sm px-6 py-[11px] rounded-lg hover:bg-gold-light transition-colors whitespace-nowrap"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Buscar
      </button>
    </form>
  )
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 flex-1 min-w-[140px] ${className}`}>
      <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-gold">{label}</label>
      {children}
    </div>
  )
}
