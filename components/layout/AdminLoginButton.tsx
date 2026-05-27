'use client'

import { useState } from 'react'
import { AdminLoginModal } from '@/components/ui/AdminLoginModal'

export function AdminLoginButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-5 z-50 flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-700"
        aria-label="Acessar painel administrativo"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
        Admin
      </button>

      {open && <AdminLoginModal onClose={() => setOpen(false)} />}
    </>
  )
}
