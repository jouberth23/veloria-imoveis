'use client'

import { useEffect } from 'react'

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    const t = setTimeout(reset, 1500)
    return () => clearTimeout(t)
  }, [reset])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-muted text-sm">Carregando painel...</p>
      </div>
    </div>
  )
}
