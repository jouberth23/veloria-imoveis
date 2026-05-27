import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AdminLoginButton } from '@/components/layout/AdminLoginButton'
import { WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL('https://veloriaimoveis.com.br'),
  title: 'Velória Imóveis — Alto Padrão em Belo Horizonte',
  description: 'Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Compra, venda, locação e administração de imóveis de alto padrão.',
  keywords: ['imóveis belo horizonte', 'apartamento savassi', 'imobiliária bh', 'alto padrão', 'velória imóveis'],
  openGraph: {
    title: 'Velória Imóveis — Alto Padrão em Belo Horizonte',
    description: 'Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Exclusividade, transparência e resultados reais.',
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Velória Imóveis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velória Imóveis — Alto Padrão em Belo Horizonte',
    description: 'Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header whatsappUrl={WHATSAPP_URL} />
        <main>{children}</main>
        <Suspense fallback={<div className="h-64 bg-[#060E1A]" />}>
          <Footer />
        </Suspense>
        <WhatsAppButton url={WHATSAPP_URL} />
        <AdminLoginButton />
      </body>
    </html>
  )
}
