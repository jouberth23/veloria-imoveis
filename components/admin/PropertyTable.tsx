'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ImovelDB } from '@/lib/types'

interface Props {
  properties: ImovelDB[]
}

function formatPrice(p: ImovelDB) {
  if (p.tipo === 'Aluguel' && p.preco_aluguel) {
    return `R$ ${p.preco_aluguel.toLocaleString('pt-BR')}/mês`
  }
  if (p.preco) {
    return `R$ ${p.preco.toLocaleString('pt-BR')}`
  }
  return 'A consultar'
}

const tipoBadge: Record<string, string> = {
  Venda: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  Aluguel: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Lançamento: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
}

export function PropertyTable({ properties }: Props) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [list, setList] = useState<ImovelDB[]>(properties)

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/imoveis/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setList((prev) => prev.filter((p) => p.id !== id))
      }
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  if (list.length === 0) {
    return (
      <div className="border border-border rounded-xl p-16 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.2" className="mx-auto mb-4 opacity-40">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <p className="text-muted font-serif text-lg mb-1">Nenhum imóvel cadastrado</p>
        <p className="text-muted/60 text-sm mb-5">Comece adicionando o primeiro imóvel.</p>
        <Link
          href="/admin/imovel/novo"
          className="inline-flex items-center gap-2 bg-gold text-deep px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          Adicionar Imóvel
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-[#070F1C]">
                <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium w-16">Foto</th>
                <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium">Imóvel</th>
                <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium hidden md:table-cell">Preço</th>
                <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium hidden sm:table-cell">Tipo</th>
                <th className="text-left text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium hidden lg:table-cell">Status</th>
                <th className="text-right text-muted text-xs uppercase tracking-wider px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-light flex-shrink-0 relative border border-border">
                      {p.imagens?.[0] ? (
                        <Image src={p.imagens[0]} alt="" fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A97A8" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Title + location */}
                  <td className="px-4 py-3">
                    <div className="text-off-white font-medium line-clamp-1">{p.titulo}</div>
                    <div className="text-muted text-xs mt-0.5">{p.bairro}, {p.cidade}</div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-gold font-serif hidden md:table-cell whitespace-nowrap">
                    {formatPrice(p)}
                  </td>

                  {/* Tipo */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${tipoBadge[p.tipo] || ''}`}>
                      {p.tipo}
                    </span>
                    {p.destaque && (
                      <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">
                        ★
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1.5 text-xs ${p.status === 'ativo' ? 'text-emerald-400' : 'text-muted'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'ativo' ? 'bg-emerald-400' : 'bg-muted'}`} />
                      {p.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/imovel/${p.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-gold hover:bg-gold/10 transition-all"
                        title="Editar"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </Link>

                      {confirmId === p.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="px-2 py-1 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                          >
                            {deletingId === p.id ? '...' : 'Confirmar'}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1 text-xs text-muted hover:text-off-white rounded-lg hover:bg-white/5 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(p.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Excluir"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-muted/50 text-xs mt-3">{list.length} imóvel{list.length !== 1 ? 'is' : ''} no total</p>
    </>
  )
}
