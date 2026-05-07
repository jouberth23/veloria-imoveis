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
