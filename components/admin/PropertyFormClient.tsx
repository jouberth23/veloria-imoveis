'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from './ImageUpload'
import { VideoUpload } from './VideoUpload'
import type { ImovelDB } from '@/lib/types'

type Tipo = 'Venda' | 'Aluguel' | 'Lançamento'
type Status = 'ativo' | 'inativo'

interface FormData {
  titulo: string
  descricao: string
  tipo: Tipo
  status: Status
  destaque: boolean
  bairro: string
  cidade: string
  preco: string
  preco_aluguel: string
  area: string
  quartos: string
  suites: string
  vagas: string
}

interface Props {
  initialData?: ImovelDB
}

const DEFAULT: FormData = {
  titulo: '',
  descricao: '',
  tipo: 'Venda',
  status: 'ativo',
  destaque: false,
  bairro: '',
  cidade: 'Belo Horizonte',
  preco: '',
  preco_aluguel: '',
  area: '',
  quartos: '',
  suites: '',
  vagas: '',
}

function inputClass(error?: boolean) {
  return `input-field w-full ${error ? 'border-red-500/60' : ''}`
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-off-white font-semibold text-sm uppercase tracking-wider">{children}</h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export function PropertyFormClient({ initialData }: Props) {
  const router = useRouter()
  const isEdit = !!initialData

  const [form, setForm] = useState<FormData>(() =>
    initialData
      ? {
          titulo: initialData.titulo,
          descricao: initialData.descricao || '',
          tipo: initialData.tipo,
          status: initialData.status,
          destaque: initialData.destaque,
          bairro: initialData.bairro,
          cidade: initialData.cidade,
          preco: initialData.preco?.toString() || '',
          preco_aluguel: initialData.preco_aluguel?.toString() || '',
          area: initialData.area?.toString() || '',
          quartos: initialData.quartos?.toString() || '',
          suites: initialData.suites?.toString() || '',
          vagas: initialData.vagas?.toString() || '',
        }
      : DEFAULT
  )
  const [images, setImages] = useState<string[]>(initialData?.imagens || [])
  const [videos, setVideos] = useState<string[]>(() => {
    if (initialData?.videos?.length) return initialData.videos
    if (initialData?.video_url) return [initialData.video_url]
    return []
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [apiError, setApiError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.titulo.trim()) e.titulo = 'Título é obrigatório'
    if (!form.bairro.trim()) e.bairro = 'Bairro é obrigatório'
    if (!form.cidade.trim()) e.cidade = 'Cidade é obrigatória'
    if (form.tipo !== 'Aluguel' && !form.preco) e.preco = 'Preço é obrigatório'
    if (form.tipo === 'Aluguel' && !form.preco_aluguel) e.preco_aluguel = 'Preço de aluguel é obrigatório'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setApiError('')

    const payload = {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim() || null,
      tipo: form.tipo,
      status: form.status,
      destaque: form.destaque,
      bairro: form.bairro.trim(),
      cidade: form.cidade.trim(),
      preco: form.preco ? Number(form.preco) : null,
      preco_aluguel: form.preco_aluguel ? Number(form.preco_aluguel) : null,
      area: form.area ? Number(form.area) : null,
      quartos: form.quartos ? Number(form.quartos) : null,
      suites: form.suites ? Number(form.suites) : null,
      vagas: form.vagas ? Number(form.vagas) : null,
      imagens: images,
      videos: videos,
      video_url: videos[0] || null,
    }

    const url = isEdit ? `/api/admin/imoveis/${initialData!.id}` : '/api/admin/imoveis'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setApiError(data.error || 'Erro ao salvar imóvel')
      }
    } catch {
      setApiError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 lg:space-y-8">
      {apiError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {apiError}
        </div>
      )}

      {/* Informações Básicas */}
      <div>
        <SectionTitle>Informações Básicas</SectionTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Título *</label>
            <input
              value={form.titulo}
              onChange={(e) => set('titulo', e.target.value)}
              placeholder="Ex: Apartamento Jardim das Flores"
              className={inputClass(!!errors.titulo)}
            />
            {errors.titulo && <p className="text-red-400 text-xs mt-1">{errors.titulo}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Tipo *</label>
              <select
                value={form.tipo}
                onChange={(e) => set('tipo', e.target.value as Tipo)}
                className="input-field w-full"
              >
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
                <option value="Lançamento">Lançamento</option>
              </select>
            </div>

            <div>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value as Status)}
                className="input-field w-full"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>

            <div className="flex items-end pb-px">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.destaque}
                    onChange={(e) => set('destaque', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-5 rounded-full transition-colors ${form.destaque ? 'bg-gold' : 'bg-light border border-border'}`}
                    onClick={() => set('destaque', !form.destaque)}
                  />
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.destaque ? 'translate-x-5' : ''}`}
                    onClick={() => set('destaque', !form.destaque)}
                  />
                </div>
                <span className="text-sm text-muted">Destaque</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Localização */}
      <div>
        <SectionTitle>Localização</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Bairro *</label>
            <input
              value={form.bairro}
              onChange={(e) => set('bairro', e.target.value)}
              placeholder="Ex: Savassi"
              className={inputClass(!!errors.bairro)}
            />
            {errors.bairro && <p className="text-red-400 text-xs mt-1">{errors.bairro}</p>}
          </div>
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Cidade *</label>
            <input
              value={form.cidade}
              onChange={(e) => set('cidade', e.target.value)}
              className={inputClass(!!errors.cidade)}
            />
            {errors.cidade && <p className="text-red-400 text-xs mt-1">{errors.cidade}</p>}
          </div>
        </div>
      </div>

      {/* Preço */}
      <div>
        <SectionTitle>Preço</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.tipo !== 'Aluguel' && (
            <div>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">
                Preço de Venda (R$) *
              </label>
              <input
                type="number"
                value={form.preco}
                onChange={(e) => set('preco', e.target.value)}
                placeholder="890000"
                min={0}
                className={inputClass(!!errors.preco)}
              />
              {errors.preco && <p className="text-red-400 text-xs mt-1">{errors.preco}</p>}
            </div>
          )}
          {form.tipo === 'Aluguel' && (
            <div>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">
                Preço de Aluguel / mês (R$) *
              </label>
              <input
                type="number"
                value={form.preco_aluguel}
                onChange={(e) => set('preco_aluguel', e.target.value)}
                placeholder="4200"
                min={0}
                className={inputClass(!!errors.preco_aluguel)}
              />
              {errors.preco_aluguel && <p className="text-red-400 text-xs mt-1">{errors.preco_aluguel}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Características */}
      <div>
        <SectionTitle>Características</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { key: 'area' as const, label: 'Área (m²)', placeholder: '120' },
            { key: 'quartos' as const, label: 'Quartos', placeholder: '3' },
            { key: 'suites' as const, label: 'Suítes', placeholder: '1' },
            { key: 'vagas' as const, label: 'Vagas', placeholder: '2' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">{label}</label>
              <input
                type="number"
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                min={0}
                className="input-field w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <SectionTitle>Descrição</SectionTitle>
        <textarea
          value={form.descricao}
          onChange={(e) => set('descricao', e.target.value)}
          placeholder="Descreva o imóvel — localização, acabamentos, diferenciais..."
          rows={5}
          className="input-field w-full resize-none"
        />
      </div>

      {/* Mídia */}
      <div>
        <SectionTitle>Imagens</SectionTitle>
        <ImageUpload images={images} onChange={setImages} />
      </div>

      <div>
        <SectionTitle>Vídeos</SectionTitle>
        <VideoUpload videos={videos} onChange={setVideos} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {submitting ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Publicar Imóvel'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="text-muted hover:text-off-white transition-colors text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
