'use client'

import { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-deep text-off-white">

      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#070F1C] border-b border-border flex items-center justify-between px-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-off-white hover:bg-white/5 transition-all"
          aria-label="Abrir menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gold/15 border border-gold/30 flex items-center justify-center">
            <span className="font-serif text-gold text-xs leading-none">V</span>
          </div>
          <span className="font-serif text-sm text-off-white">
            Velória <span className="text-gold">Admin</span>
          </span>
        </div>

        {/* Spacer to center title */}
        <div className="w-9" />
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 shadow-2xl">
            <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
