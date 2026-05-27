import { PropertyFormClient } from '@/components/admin/PropertyFormClient'

export const metadata = {
  title: 'Novo Imóvel — Admin Velória',
}

export default function NovoImovelPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-off-white">Novo Imóvel</h1>
        <p className="text-muted text-sm mt-0.5">Preencha os dados para publicar um novo imóvel</p>
      </div>
      <PropertyFormClient />
    </div>
  )
}
