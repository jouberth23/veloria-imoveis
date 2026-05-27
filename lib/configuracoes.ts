import { cache } from 'react'
import { isSupabaseConfigured, createPublicClient } from './supabase'
import { EMPRESA, WHATSAPP_NUMBER } from './constants'

export type Configuracoes = {
  whatsapp_number: string
  instagram_url: string
  facebook_url: string
  linkedin_url: string
  telefone: string
  email: string
  endereco: string
  horario: string
  creci: string
}

export const CONFIG_DEFAULTS: Configuracoes = {
  whatsapp_number: WHATSAPP_NUMBER,
  instagram_url: '',
  facebook_url: '',
  linkedin_url: '',
  telefone: EMPRESA.telefone,
  email: EMPRESA.email,
  endereco: EMPRESA.endereco,
  horario: EMPRESA.horario,
  creci: EMPRESA.creci,
}

export const getConfiguracoes = cache(async (): Promise<Configuracoes> => {
  if (!isSupabaseConfigured()) return CONFIG_DEFAULTS

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 3000)

  try {
    const supabase = createPublicClient()
    const { data } = await supabase
      .from('configuracoes')
      .select('chave, valor')
      .abortSignal(controller.signal)

    clearTimeout(timer)
    if (!data || data.length === 0) return CONFIG_DEFAULTS

    const config = { ...CONFIG_DEFAULTS }
    for (const row of data) {
      if (row.chave in config) {
        config[row.chave as keyof Configuracoes] = row.valor || config[row.chave as keyof Configuracoes]
      }
    }
    return config
  } catch {
    clearTimeout(timer)
    return CONFIG_DEFAULTS
  }
})
