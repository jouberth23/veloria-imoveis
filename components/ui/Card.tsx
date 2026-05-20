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
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-gold/35 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.22), 0 0 30px rgba(201,168,76,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)')}
    >
      <div className="relative h-64 overflow-hidden bg-card-gradient">
        {imovel.imagem ? (
          <Image
            src={imovel.imagem}
            alt={imovel.titulo}
            fill
            className="object-cover group-hover:scale-106 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px, transparent 1px, transparent 12px)' }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth=".8" className="opacity-20">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/20 to-transparent" />
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/4 transition-colors duration-500" />

        {/* Badge */}
        <div className="absolute top-3.5 left-3.5">
          <Badge type={imovel.badge} />
        </div>

        {/* Favorite button */}
        <button
          onClick={e => e.preventDefault()}
          className="absolute top-3.5 right-3.5 w-9 h-9 bg-deep/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gold/30 transition-colors border border-white/10"
          aria-label="Favoritar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        {/* Price + CTA row */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 flex items-end justify-between">
          <span className="font-serif text-[1.3rem] text-white font-semibold drop-shadow-lg leading-none">
            {formatPreco(imovel)}
          </span>
          <span className="text-[0.68rem] font-bold text-deep bg-gold px-3 py-1.5 rounded-lg tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
            Ver Imóvel →
          </span>
        </div>
      </div>

      <div className="p-5 relative">
        {/* Top gold shimmer line on hover */}
        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <h3 className="font-serif text-[1.05rem] mb-1.5 group-hover:text-gold transition-colors duration-200 leading-tight">
          {imovel.titulo}
        </h3>
        <p className="flex items-center gap-1.5 text-muted text-xs mb-4">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {imovel.bairro}, {imovel.cidade}
        </p>

        <div className="flex gap-4 text-muted text-xs border-t border-border pt-3.5">
          <span className="flex items-center gap-1.5">
            <AreaIcon /> {imovel.area}m²
          </span>
          <span className="flex items-center gap-1.5">
            <BedIcon /> {imovel.quartos} {imovel.suite ? 'suítes' : 'quartos'}
          </span>
          <span className="flex items-center gap-1.5">
            <CarIcon /> {imovel.vagas} {imovel.vagas === 1 ? 'vaga' : 'vagas'}
          </span>
        </div>
      </div>
    </Link>
  )
}

function AreaIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
}
function BedIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M22 4v16M2 12h20M7 4v8M17 4v8"/></svg>
}
function CarIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="12" rx="2"/><path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>
}
