import { ConfiguracoesForm } from '@/components/admin/ConfiguracoesForm'

export default function ConfiguracoesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-off-white mb-1">Configurações do Site</h1>
        <p className="text-muted text-sm">WhatsApp, redes sociais e informações de contato.</p>
      </div>
      <ConfiguracoesForm />
    </div>
  )
}
