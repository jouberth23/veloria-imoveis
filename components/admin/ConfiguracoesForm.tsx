'use client'

import { useEffect, useState } from 'react'
import type { Configuracoes } from '@/lib/configuracoes'
import { CONFIG_DEFAULTS } from '@/lib/configuracoes'

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-off-white font-semibold text-sm uppercase tracking-wider">{children}</h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export function ConfiguracoesForm() {
  const [config, setConfig] = useState<Configuracoes>(CONFIG_DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/configuracoes')
      .then((r) => r.json())
      .then((data) => {
        setConfig((prev) => ({ ...prev, ...data }))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function set<K extends keyof Configuracoes>(key: K, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const res = await fetch('/api/admin/configuracoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        const d = await res.json()
        setError(d.error || 'Erro ao salvar configurações')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-muted py-12">
        <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        Carregando configurações...
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* WhatsApp */}
      <div>
        <SectionTitle>WhatsApp</SectionTitle>
        <div>
          <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">
            Número do WhatsApp
          </label>
          <input
            value={config.whatsapp_number}
            onChange={(e) => set('whatsapp_number', e.target.value.replace(/\D/g, ''))}
            placeholder="5531999999999"
            className="input-field w-full"
          />
          <p className="text-muted/60 text-xs mt-1.5">
            Somente dígitos com DDI (ex: 5531999999999). Este número aparece no botão flutuante e no cabeçalho.
          </p>
        </div>
      </div>

      {/* Redes Sociais */}
      <div>
        <SectionTitle>Redes Sociais</SectionTitle>
        <div className="space-y-4">
          {[
            { key: 'instagram_url' as const, label: 'Instagram', placeholder: 'https://instagram.com/veloriaimoveis' },
            { key: 'facebook_url' as const, label: 'Facebook', placeholder: 'https://facebook.com/veloriaimoveis' },
            { key: 'linkedin_url' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/veloriaimoveis' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">{label}</label>
              <input
                type="url"
                value={config[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className="input-field w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Contato */}
      <div>
        <SectionTitle>Informações de Contato</SectionTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Telefone</label>
            <input
              value={config.telefone}
              onChange={(e) => set('telefone', e.target.value)}
              placeholder="(31) 9 9999-9999"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">E-mail</label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="contato@veloriaimoveis.com.br"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Endereço</label>
            <input
              value={config.endereco}
              onChange={(e) => set('endereco', e.target.value)}
              placeholder="Av. Getúlio Vargas, 1.250 · Savassi, Belo Horizonte – MG"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">Horário de Atendimento</label>
            <input
              value={config.horario}
              onChange={(e) => set('horario', e.target.value)}
              placeholder="Seg–Sex: 8h–18h · Sáb: 9h–13h"
              className="input-field w-full"
            />
          </div>
        </div>
      </div>

      {/* Empresa */}
      <div>
        <SectionTitle>Empresa</SectionTitle>
        <div>
          <label className="block text-muted text-xs mb-1.5 uppercase tracking-wider">CRECI</label>
          <input
            value={config.creci}
            onChange={(e) => set('creci', e.target.value)}
            placeholder="CRECI-MG 12.345-J"
            className="input-field w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <button
          type="submit"
          disabled={saving}
          className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Salvo com sucesso
          </span>
        )}
      </div>
    </form>
  )
}
