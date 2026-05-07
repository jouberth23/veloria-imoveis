import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { IMOVEIS, formatPreco, WHATSAPP_URL } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return IMOVEIS.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const imovel = IMOVEIS.find(i => i.slug === slug)
  if (!imovel) return { title: 'Imóvel não encontrado' }
  return {
    title: `${imovel.titulo} | Velória Imóveis`,
    description: imovel.descricao,
  }
}

export default async function ImovelPage({ params }: Props) {
  const { slug } = await params
  const imovel = IMOVEIS.find(i => i.slug === slug)
  if (!imovel) notFound()

  const waMsg = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${imovel.titulo} — ${formatPreco(imovel)}`)

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep">
      <div className="max-w-5xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <a href="/" className="hover:text-gold transition-colors">Início</a>
          <span>/</span>
          <a href="/imoveis" className="hover:text-gold transition-colors">Imóveis</a>
          <span>/</span>
          <span className="text-off-white">{imovel.titulo}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">

            {/* Main image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border mb-6 bg-card-gradient">
              {imovel.imagem ? (
                <Image
                  src={imovel.imagem}
                  alt={imovel.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px, transparent 1px, transparent 12px)' }}
                >
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth=".8" opacity={.2}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <Badge type={imovel.badge} />
              </div>
            </div>

            <h1 className="font-serif text-3xl mb-2">{imovel.titulo}</h1>
            <p className="text-muted flex items-center gap-2 mb-7">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {imovel.bairro}, {imovel.cidade}
            </p>

            {/* Attributes */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Área total', value: `${imovel.area}m²` },
                { label: imovel.suite ? 'Suítes' : 'Quartos', value: String(imovel.quartos) },
                { label: 'Vagas de garagem', value: String(imovel.vagas) },
              ].map(attr => (
                <div key={attr.label} className="bg-card border border-border rounded-xl p-5 text-center hover:border-gold/30 transition-colors">
                  <div className="font-serif text-2xl text-gold">{attr.value}</div>
                  <div className="text-xs text-muted mt-1.5 uppercase tracking-wider">{attr.label}</div>
                </div>
              ))}
            </div>

            {imovel.descricao && (
              <div className="bg-card border border-border rounded-xl p-7 mb-6">
                <h2 className="font-serif text-xl mb-4">Sobre o imóvel</h2>
                <p className="text-muted leading-relaxed">{imovel.descricao}</p>
              </div>
            )}

            {/* Features */}
            <div className="bg-card border border-border rounded-xl p-7">
              <h2 className="font-serif text-xl mb-5">Diferenciais</h2>
              <div className="grid grid-cols-2 gap-3">
                {['Portaria 24h', 'Área de lazer', 'Vaga coberta', 'Interfone', 'Elevador', 'Salão de festas'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
              <div className="font-serif text-3xl text-gold mb-1">{formatPreco(imovel)}</div>
              <div className="text-xs text-muted uppercase tracking-wider mb-7">Preço</div>

              <a
                href={`${WHATSAPP_URL}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gold text-deep font-bold py-3.5 rounded-xl mb-3 hover:bg-gold-light transition-colors text-sm tracking-wide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.885a.5.5 0 00.611.628l6.218-1.632A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.381l-.363-.215-3.767.988.988-3.671-.236-.38A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Tenho Interesse
              </a>

              <a
                href="tel:+5531999999999"
                className="flex items-center justify-center gap-2 w-full border border-border text-muted py-3 rounded-xl hover:border-gold hover:text-gold transition-colors text-sm mb-6"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                (31) 9 9999-9999
              </a>

              <div className="border-t border-border pt-5 space-y-2.5 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  CRECI-MG 12.345-J
                </div>
                <p className="leading-relaxed">Negociação 100% segura e documentação completa garantida pela Velória Imóveis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
