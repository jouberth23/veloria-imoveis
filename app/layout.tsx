import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Velória Imóveis — Alto Padrão em Belo Horizonte',
  description: 'Há mais de 15 anos conectando pessoas aos melhores imóveis de Belo Horizonte. Compra, venda, locação e administração de imóveis de alto padrão.',
  keywords: ['imóveis belo horizonte', 'apartamento savassi', 'imobiliária bh', 'alto padrão', 'velória imóveis'],
  openGraph: {
    title: 'Velória Imóveis',
    description: 'Imóveis de alto padrão em Belo Horizonte',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
