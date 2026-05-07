import type { Imovel, Depoimento, Servico, Categoria } from './types'

export const WHATSAPP_NUMBER = '5531999999999'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const EMPRESA = {
  nome: 'Velória Imóveis',
  slogan: 'Cada imóvel conta uma história. Conte a sua conosco.',
  creci: 'CRECI-MG 12.345-J',
  endereco: 'Av. Getúlio Vargas, 1.250 · Savassi, Belo Horizonte – MG',
  telefone: '(31) 9 9999-9999',
  email: 'contato@veloriaimoveis.com.br',
  horario: 'Seg–Sex: 8h–18h · Sáb: 9h–13h',
  stats: [
    { valor: '340+',   label: 'Imóveis Disponíveis' },
    { valor: '15',     label: 'Anos de Mercado' },
    { valor: '2.800+', label: 'Clientes Atendidos' },
    { valor: '98%',    label: 'Satisfação' },
  ],
  numeros: [
    { valor: '15+',    label: 'Anos no mercado' },
    { valor: '1.200+', label: 'Imóveis vendidos' },
    { valor: '8',      label: 'Cidades atendidas' },
    { valor: '32',     label: 'Corretores' },
  ],
}

export const IMOVEIS: Imovel[] = [
  {
    id: '1',
    slug: 'apartamento-jardim-das-flores-savassi',
    titulo: 'Apartamento Jardim das Flores',
    bairro: 'Savassi',
    cidade: 'Belo Horizonte',
    preco: 890000,
    area: 120,
    quartos: 3,
    vagas: 2,
    badge: 'Venda',
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    descricao: 'Apartamento sofisticado no coração do Savassi, com acabamentos premium e vista privilegiada. Varanda gourmet, piscina no terraço e portaria 24h.',
  },
  {
    id: '2',
    slug: 'casa-duplex-vila-aurora-buritis',
    titulo: 'Casa Duplex Vila Aurora',
    bairro: 'Buritis',
    cidade: 'Belo Horizonte',
    preco: 1250000,
    area: 280,
    quartos: 4,
    vagas: 3,
    badge: 'Venda',
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    descricao: 'Casa duplex contemporânea com ampla área de lazer no sofisticado bairro Buritis. Piscina, churrasqueira, jardim e acabamentos de primeira linha.',
  },
  {
    id: '3',
    slug: 'cobertura-terraco-nobre-lourdes',
    titulo: 'Cobertura Terraço Nobre',
    bairro: 'Lourdes',
    cidade: 'Belo Horizonte',
    preco: 2350000,
    area: 380,
    quartos: 4,
    vagas: 4,
    badge: 'Lançamento',
    suite: true,
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    descricao: 'Cobertura exclusiva de lançamento com terraço panorâmico e suítes master no nobre bairro Lourdes. Vista 360° da cidade, spa privativo e heliponto.',
  },
  {
    id: '4',
    slug: 'apartamento-pinheiros-verde-funcionarios',
    titulo: 'Apartamento Pinheiros Verde',
    bairro: 'Funcionários',
    cidade: 'Belo Horizonte',
    precoAluguel: 4200,
    preco: 0,
    area: 85,
    quartos: 2,
    vagas: 1,
    badge: 'Aluguel',
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    descricao: 'Apartamento moderno em localização privilegiada, próximo às melhores opções de gastronomia e lazer. Decorado, mobiliado e pronto para morar.',
  },
  {
    id: '5',
    slug: 'studio-moderno-centro',
    titulo: 'Studio Moderno Centro',
    bairro: 'Centro',
    cidade: 'Belo Horizonte',
    preco: 280000,
    area: 42,
    quartos: 1,
    vagas: 1,
    badge: 'Venda',
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    descricao: 'Studio compacto e inteligente, ideal para investimento ou moradia no Centro de BH. Projeto arquitetônico assinado, otimizado para conforto e estilo.',
  },
  {
    id: '6',
    slug: 'casa-terrea-jardim-real-venda-nova',
    titulo: 'Casa Térrea Jardim Real',
    bairro: 'Venda Nova',
    cidade: 'Belo Horizonte',
    preco: 520000,
    area: 180,
    quartos: 3,
    vagas: 2,
    badge: 'Venda',
    destaque: true,
    imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    descricao: 'Casa térrea com quintal amplo em condomínio fechado, excelente custo-benefício. Área gourmet coberta, jardim paisagístico e segurança 24h.',
  },
]

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: '1',
    nome: 'Marcos Ferreira',
    iniciais: 'MF',
    tipo: 'Compra de Apartamento · Savassi',
    estrelas: 5,
    texto: 'A equipe da Velória foi impecável do início ao fim. Encontraram exatamente o apartamento que eu buscava no Savassi, dentro do meu orçamento e com toda a documentação em ordem. Recomendo sem hesitar.',
  },
  {
    id: '2',
    nome: 'Ana Santos',
    iniciais: 'AS',
    tipo: 'Venda de Casa · Buritis',
    estrelas: 5,
    texto: 'Vendi minha casa em apenas 23 dias pelo valor que eu queria. A estratégia de divulgação deles é diferente — trouxeram compradores qualificados desde o primeiro dia. Atendimento de altíssimo nível.',
  },
  {
    id: '3',
    nome: 'Roberto Lima',
    iniciais: 'RL',
    tipo: 'Administração de Condomínio · Lourdes',
    estrelas: 5,
    texto: 'Administração de condomínio transparente e eficiente. As assembleias são bem organizadas, as finanças sempre claras e a manutenção preventiva reduziu nossos custos em 30% no primeiro ano.',
  },
]

export const SERVICOS: Servico[] = [
  { id: '1', titulo: 'Compra e Venda',           descricao: 'Negociação estratégica com avaliação de mercado precisa. Encontramos o imóvel ideal ou o comprador certo.',                   icon: 'home' },
  { id: '2', titulo: 'Locação',                  descricao: 'Gestão completa: divulgação, análise cadastral, contratos e acompanhamento durante toda a vigência.',                       icon: 'list' },
  { id: '3', titulo: 'Avaliação de Imóveis',     descricao: 'Laudos técnicos precisos com base em análise comparativa de mercado reconhecida pelo CRECI-MG.',                           icon: 'star' },
  { id: '4', titulo: 'Consultoria Jurídica',     descricao: 'Análise documental completa, regularização de imóveis e suporte jurídico especializado em direito imobiliário.',           icon: 'file' },
  { id: '5', titulo: 'Financiamento',            descricao: 'Assessoria completa: simulações, orientação na escolha da melhor linha de crédito e apoio na aprovação.',                  icon: 'card' },
  { id: '6', titulo: 'Adm. de Condomínios',      descricao: 'Gestão profissional: assembleias, financeiro, manutenção e atendimento aos condôminos.',                                  icon: 'building' },
]

export const CATEGORIAS: Categoria[] = [
  { id: '1', nome: 'Apartamento', icon: 'apartment', slug: 'apartamento' },
  { id: '2', nome: 'Casa',        icon: 'house',     slug: 'casa' },
  { id: '3', nome: 'Cobertura',   icon: 'penthouse', slug: 'cobertura' },
  { id: '4', nome: 'Terreno',     icon: 'terrain',   slug: 'terreno' },
  { id: '5', nome: 'Comercial',   icon: 'commercial',slug: 'comercial' },
  { id: '6', nome: 'Lançamentos', icon: 'launch',    slug: 'lancamentos' },
]

export const PARCEIROS = [
  { nome: 'CAIXA',     label: 'Caixa Econômica' },
  { nome: 'ITAÚ',      label: 'Banco Itaú' },
  { nome: 'BRADESCO',  label: 'Bradesco' },
  { nome: 'SANTANDER', label: 'Santander' },
  { nome: 'MCMV',      label: 'Minha Casa Minha Vida' },
]

export function formatPreco(imovel: Imovel): string {
  if (imovel.badge === 'Aluguel' && imovel.precoAluguel) {
    return `R$ ${imovel.precoAluguel.toLocaleString('pt-BR')}/mês`
  }
  return `R$ ${imovel.preco.toLocaleString('pt-BR')}`
}
