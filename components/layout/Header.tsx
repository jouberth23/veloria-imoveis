'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

interface HeaderProps {
  whatsappUrl?: string
}

const NAV_LINKS = [
  { href: '/#imoveis',  label: 'Imóveis' },
  { href: '/#sobre',    label: 'Sobre' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/imoveis',   label: 'Portfólio' },
]

export function Header({ whatsappUrl }: HeaderProps) {
  const pathname = usePathname()
  const waUrl = whatsappUrl || WHATSAPP_URL
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname.startsWith('/admin')) return null

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep/85 backdrop-blur-lg border-b border-white/6 py-3.5'
            : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none" className="group-hover:rotate-45 transition-transform duration-500">
              <polygon points="19,4 34,20 19,28 4,20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
              <polygon points="19,10 29,20 19,25 9,20" fill="#C9A84C" opacity=".3"/>
              <line x1="19" y1="4" x2="19" y2="34" stroke="#C9A84C" strokeWidth="1" opacity=".4"/>
            </svg>
            <span className="font-serif text-[1.2rem] tracking-wide">
              Velória <span className="text-gold">Imóveis</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.8rem] font-medium text-off-white/55 hover:text-off-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-deep text-[0.8rem] font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-light transition-colors"
            >
              <WhatsAppIcon size={14} />
              Falar com Corretor
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-1.5"
            aria-label="Abrir menu"
          >
            <span className="w-5 h-0.5 bg-off-white/80 rounded" />
            <span className="w-5 h-0.5 bg-off-white/80 rounded" />
            <span className="w-3 h-0.5 bg-gold rounded" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-deep flex flex-col px-8 py-10"
          >
            {/* Close + logo row */}
            <div className="flex items-center justify-between mb-16">
              <span className="font-serif text-lg">
                Velória <span className="text-gold">Imóveis</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted hover:text-off-white hover:border-off-white/20 transition-colors"
                aria-label="Fechar menu"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 py-4 border-b border-border/50 group"
                  >
                    <span className="text-gold/30 font-serif text-sm group-hover:text-gold/60 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-2xl text-off-white/80 group-hover:text-off-white transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer CTA */}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-semibold py-4 rounded-xl text-sm mt-8"
            >
              <WhatsAppIcon size={17} />
              Falar no WhatsApp
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.885a.5.5 0 00.611.628l6.218-1.632A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.381l-.363-.215-3.767.988.988-3.671-.236-.38A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}
