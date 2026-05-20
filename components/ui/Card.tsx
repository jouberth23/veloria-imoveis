import Link from 'next/link'
import Image from 'next/image'
import type { Imovel } from '@/lib/types'
import { Badge } from './Badge'
import { formatPreco } from '@/lib/constants'

export function Card({ imovel }: { imovel: Imovel }) {
  return (
    <Link
      href={`/imovel/${imovel.slug}`}
      className="group block bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-gold/25 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {imovel.imagem ? (
          <Image
            src={imovel.imagem}
            alt={imovel.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-card-gradient flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="0.8" className="opacity-20">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge type={imovel.badge} />
        </div>

        {/* Fav */}
        <button
          onClick={e => e.preventDefault()}
          aria-label="Favoritar"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gold/30 hover:border-gold/40 transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* Price */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
          <span className="font-serif text-[1.3rem] text-white font-semibold leading-none drop-shadow-lg">
            {formatPreco(imovel)}
          </span>
          <span className="text-[0.65rem] font-bold text-deep bg-gold px-3 py-1.5 rounded-lg tracking-wide opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            Ver Imóvel →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif text-[1rem] mb-1.5 group-hover:text-gold transition-colors duration-200 leading-snug">
          {imovel.titulo}
        </h3>
        <p className="flex items-center gap-1.5 text-muted text-[0.75rem] mb-4">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {imovel.bairro}, {imovel.cidade}
        </p>
        <div className="flex items-center gap-2 text-muted text-[0.72rem] pt-3.5 border-t border-white/5">
          <span>{imovel.area}m²</span>
          <span className="opacity-20">·</span>
          <span>{imovel.quartos} {imovel.suite ? 'suítes' : 'quartos'}</span>
          <span className="opacity-20">·</span>
          <span>{imovel.vagas} {imovel.vagas === 1 ? 'vaga' : 'vagas'}</span>
        </div>
      </div>
    </Link>
  )
}
