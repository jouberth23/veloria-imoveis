import Link from 'next/link'
import Image from 'next/image'
import type { Imovel } from '@/lib/types'
import { Badge } from './Badge'
import { formatPreco } from '@/lib/constants'

interface Props {
  imovel: Imovel
}

export function Card({ imovel }: Props) {
  return (
    <Link
      href={`/imovel/${imovel.slug}`}
      className="card-gold-top group block bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(0,0,0,.55)] hover:border-gold/30 transition-all duration-400"
      style={{ transitionDuration: '350ms' }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-card">
        {imovel.imagem ? (
          <Image
            src={imovel.imagem}
            alt={imovel.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth=".8" className="opacity-20">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/15 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-deep/0 group-hover:bg-deep/35 transition-colors duration-500">
          <span className="bg-card/90 border border-gold/40 text-gold text-[0.7rem] font-semibold px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none select-none">
            Ver Detalhes →
          </span>
        </div>

        <div className="absolute top-3.5 left-3.5 z-10">
          <Badge type={imovel.badge} />
        </div>

        <button
          onClick={e => e.preventDefault()}
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 bg-deep/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors border border-white/10"
          aria-label="Favoritar"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        <div className="absolute bottom-3.5 left-4 z-10">
          <span className="font-serif text-[1.2rem] text-white font-semibold drop-shadow-lg">
            {formatPreco(imovel)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-[1rem] mb-1.5 group-hover:text-gold transition-colors duration-300 leading-tight">
          {imovel.titulo}
        </h3>
        <p className="flex items-center gap-1.5 text-muted text-xs mb-4">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {imovel.bairro}, {imovel.cidade}
        </p>

        <div className="flex gap-4 text-muted text-xs border-t border-border pt-3.5">
          <span className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            {imovel.area}m²
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M22 4v16M2 12h20M7 4v8M17 4v8"/></svg>
            {imovel.quartos} {imovel.suite ? 'suítes' : 'quartos'}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="12" rx="2"/><path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>
            {imovel.vagas} {imovel.vagas === 1 ? 'vaga' : 'vagas'}
          </span>
        </div>
      </div>
    </Link>
  )
}
