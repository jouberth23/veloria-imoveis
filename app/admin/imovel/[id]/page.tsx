import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase-admin'
import { PropertyFormClient } from '@/components/admin/PropertyFormClient'
import type { ImovelDB } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = {
  title: 'Editar Imóvel — Admin Velória',
}

async function getImovel(id: string): Promise<ImovelDB | null> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('imoveis')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data as ImovelDB
  } catch {
    return null
  }
}

export default async function EditarImovelPage({ params }: Props) {
  const { id } = await params
  const imovel = await getImovel(id)

  if (!imovel) notFound()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-off-white">Editar Imóvel</h1>
        <p className="text-muted text-sm mt-0.5 line-clamp-1">{imovel.titulo}</p>
      </div>
      <PropertyFormClient initialData={imovel} />
    </div>
  )
}
