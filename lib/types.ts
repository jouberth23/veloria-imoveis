export type BadgeType = 'Venda' | 'Aluguel' | 'Lançamento'

export interface Imovel {
  id: string
  slug: string
  titulo: string
  bairro: string
  cidade: string
  preco: number
  precoAluguel?: number
  area: number
  quartos: number
  vagas: number
  badge: BadgeType
  destaque?: boolean
  imagem?: string
  imagens?: string[]
  video_url?: string
  videos?: string[]
  descricao?: string
  suite?: boolean
}

export interface Depoimento {
  id: string
  nome: string
  iniciais: string
  tipo: string
  texto: string
  estrelas: number
}

export interface Servico {
  id: string
  titulo: string
  descricao: string
  icon: string
}

export interface Categoria {
  id: string
  nome: string
  icon: string
  slug: string
}

export interface SearchFilters {
  tipo?: string
  localizacao?: string
  faixaPreco?: string
  finalidade?: 'Comprar' | 'Alugar' | 'Lançamentos'
}

export interface ImovelDB {
  id: string
  slug: string
  titulo: string
  descricao: string | null
  preco: number | null
  preco_aluguel: number | null
  bairro: string
  cidade: string
  area: number | null
  quartos: number | null
  suites: number | null
  vagas: number | null
  tipo: BadgeType
  status: 'ativo' | 'inativo'
  destaque: boolean
  imagens: string[] | null
  video_url: string | null
  videos: string[] | null
  created_at: string
  updated_at: string
}

export function imovelDBToImovel(db: ImovelDB): Imovel {
  const allVideos = db.videos?.length
    ? db.videos
    : db.video_url
    ? [db.video_url]
    : []

  return {
    id: db.id,
    slug: db.slug,
    titulo: db.titulo,
    bairro: db.bairro,
    cidade: db.cidade,
    preco: db.preco ?? 0,
    precoAluguel: db.preco_aluguel ?? undefined,
    area: db.area ?? 0,
    quartos: db.quartos ?? 0,
    vagas: db.vagas ?? 0,
    badge: db.tipo,
    destaque: db.destaque,
    imagem: db.imagens?.[0] ?? undefined,
    imagens: db.imagens ?? [],
    video_url: db.video_url ?? undefined,
    videos: allVideos,
    descricao: db.descricao ?? undefined,
    suite: db.suites ? db.suites > 0 : undefined,
  }
}
