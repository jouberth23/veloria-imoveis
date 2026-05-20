import Link from 'next/link'
import { EMPRESA, WHATSAPP_URL } from '@/lib/constants'

const QUICK_LINKS = [
  { href: '/',        label: 'Início' },
  { href: '/imoveis', label: 'Imóveis à Venda' },
  { href: '/imoveis', label: 'Imóveis para Alugar' },
  { href: '/imoveis', label: 'Lançamentos' },
  { href: '/#sobre',  label: 'Sobre Nós' },
  { href: '/#servicos', label: 'Serviços' },
]

const SERVICE_LINKS = [
  'Compra e Venda', 'Locação', 'Avaliação',
  'Consultoria Jurídica', 'Financiamento', 'Adm. Condomínios',
]

export function Footer() {
  return (
    <footer className="bg-[#060E1A] pt-18 pb-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14 pt-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <svg width="30" height="30" viewBox="0 0 38 38" fill="none">
                <polygon points="19,4 34,20 19,28 4,20" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <polygon points="19,10 29,20 19,25 9,20" fill="#C9A84C" opacity=".25"/>
              </svg>
              <span className="font-serif text-xl">Velória <span className="text-gold">Imóveis</span></span>
            </div>
            <p className="text-muted text-sm italic mb-6">{EMPRESA.slogan}</p>
            <div className="flex gap-2">
              {SOCIAL_ICONS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                   className="w-9 h-9 bg-white/5 border border-border rounded-lg flex items-center justify-center hover:bg-gold/15 hover:border-gold/40 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-serif text-base mb-5">Links Rápidos</h5>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-muted text-sm hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-base mb-5">Nossos Serviços</h5>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(s => (
                <li key={s}>
                  <Link href="/#servicos" className="text-muted text-sm hover:text-gold transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-base mb-5">Contato</h5>
            <div className="space-y-3">
              {[
                { icon: <MapIcon />, text: EMPRESA.endereco },
                { icon: <PhoneIcon />, text: EMPRESA.telefone },
                { icon: <MailIcon />, text: EMPRESA.email },
                { icon: <ClockIcon />, text: EMPRESA.horario },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-muted text-sm">
                  <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-7 flex flex-wrap justify-between items-center gap-4">
          <p className="text-muted text-xs">© 2024 Velória Imóveis. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5 text-gold text-xs bg-gold/8 border border-gold/20 px-3.5 py-1.5 rounded-full">
            <ShieldIcon />
            {EMPRESA.creci}
          </div>
          <p className="text-muted text-xs">
            <a href="#" className="hover:text-gold transition-colors">Política de Privacidade</a>
            {' · '}
            <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

const SOCIAL_ICONS = [
  {
    label: 'Instagram', href: '#',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: 'Facebook', href: '#',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="#C9A84C"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: 'LinkedIn', href: '#',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
]

function MapIcon()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function PhoneIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg> }
function MailIcon()  { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function ClockIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function ShieldIcon(){ return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
