'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

const NAV_LINKS = [
  { href: '/',          label: 'Início' },
  { href: '/imoveis',   label: 'Imóveis' },
  { href: '/#sobre',    label: 'Sobre' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#cta',      label: 'Contato' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep/85 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,.5)] py-3'
            : 'py-5'
        }`}
      >
        {/* Bottom border that appears on scroll */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon />
            <span className="font-serif text-[1.25rem] tracking-wide">
              Velória <span className="text-gold group-hover:text-gold-light transition-colors duration-200">Imóveis</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-off-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-deep text-sm font-semibold px-5 py-2.5 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #D4B86A)', boxShadow: '0 2px 12px rgba(201,168,76,0.25)' }}
            >
              <WhatsAppIcon size={15} />
              Falar com Corretor
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Abrir menu"
          >
            <span className="w-6 h-0.5 bg-off-white rounded transition-all" />
            <span className="w-6 h-0.5 bg-off-white rounded transition-all" />
            <span className="w-4 h-0.5 bg-off-white rounded transition-all" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-deep/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            {/* Gold glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,.06) 0%, transparent 60%)' }}
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-muted hover:text-off-white hover:bg-white/5 rounded-xl transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="relative flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-off-white hover:text-gold transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-4 text-white px-8 py-3.5 rounded-2xl font-semibold text-lg"
                style={{ background: 'linear-gradient(135deg, #25D366, #1aad52)', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
              >
                Falar com Corretor
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function LogoIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
      <polygon points="19,4 34,20 19,28 4,20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      <polygon points="19,10 29,20 19,25 9,20" fill="#C9A84C" opacity=".22"/>
      <line x1="19" y1="4" x2="19" y2="34" stroke="#C9A84C" strokeWidth="1" opacity=".35"/>
    </svg>
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
