import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase-admin'
import { PropertyTable } from '@/components/admin/PropertyTable'
import type { ImovelDB } from '@/lib/types'

async function getProperties(): Promise<{ data: ImovelDB[]; error: string | null }> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('imoveis')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { data: [], error: error.message }
    return { data: data || [], error: null }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erro desconhecido'
    return { data: [], error: msg }
  }
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className={`text-2xl font-serif ${color}`}>{value}</div>
      <div className="text-muted text-xs mt-1 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default async function AdminPage() {
  const { data: properties, error } = await getProperties()

  const stats = {
    total: properties.length,
    ativos: properties.filter((p) => p.status === 'ativo').length,
    venda: properties.filter((p) => p.tipo === 'Venda').length,
    aluguel: properties.filter((p) => p.tipo === 'Aluguel').length,
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl text-off-white">Imóveis</h1>
          <p className="text-muted text-sm mt-0.5">Gerencie o portfólio de imóveis</p>
        </div>
        <Link
          href="/admin/imovel/novo"
          className="flex items-center gap-2 bg-gold text-deep px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Adicionar Imóvel
        </Link>
      </div>

      {/* Stats */}
      {properties.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard label="Total" value={stats.total} color="text-off-white" />
          <StatCard label="Ativos" value={stats.ativos} color="text-emerald-400" />
          <StatCard label="Venda" value={stats.venda} color="text-gold" />
          <StatCard label="Aluguel" value={stats.aluguel} color="text-blue-400" />
        </div>
      )}

      {/* Error or Table */}
      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <p className="text-red-400 font-semibold mb-1">Erro ao conectar com o banco de dados</p>
          <p className="text-red-400/70 text-sm">{error}</p>
          <p className="text-muted text-sm mt-3">
            Verifique se o arquivo <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs">.env.local</code> está configurado com as credenciais do Supabase.
          </p>
        </div>
      ) : (
        <PropertyTable properties={properties} />
      )}
    </div>
  )
}
