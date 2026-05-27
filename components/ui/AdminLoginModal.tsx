'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  onClose: () => void
}

export function AdminLoginModal({ onClose }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      const data = await res.json()

      if (res.ok) {
        window.location.href = '/admin'
      } else {
        setError(data.error || 'Código incorreto')
        setPin('')
        inputRef.current?.focus()
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-deep/85 backdrop-blur-sm" />

      <div className="relative bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-[0_32px_80px_rgba(0,0,0,.7)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-off-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="text-center mb-7">
          <div className="w-13 h-13 mx-auto mb-4 w-[52px] h-[52px] rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h2 className="font-serif text-xl text-off-white">Acesso Restrito</h2>
          <p className="text-muted text-xs mt-1">Área exclusiva para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError('') }}
            placeholder="••••••••"
            className="input-field w-full text-center tracking-[0.5em] text-lg placeholder:tracking-normal"
            maxLength={20}
            autoComplete="current-password"
          />

          {error && (
            <p className="text-red-400 text-sm text-center flex items-center justify-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || pin.length === 0}
            className="w-full bg-gold text-deep font-semibold py-3 rounded-xl hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm tracking-wide"
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
