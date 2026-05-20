'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WHATSAPP_URL } from '@/lib/constants'

export function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', interesse: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ nome: '', email: '', telefone: '', interesse: '' })
  }

  return (
    <section id="cta" className="py-32 bg-deep relative overflow-hidden" ref={ref}>
      {/* Top gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Eyelet */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-gold/40" />
          <span className="eyelet">Pronto para começar?</span>
          <div className="h-px w-12 bg-gold/40" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-tight mb-5"
        >
          Seu próximo imóvel<br />
          <em className="text-gold not-italic">começa com uma conversa.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted text-base mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Fale com um especialista agora mesmo. Atendimento personalizado, sem compromisso.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-8 py-4 rounded-xl hover:brightness-110 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.885a.5.5 0 00.611.628l6.218-1.632A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.381l-.363-.215-3.767.988.988-3.671-.236-.38A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Falar no WhatsApp
          </a>
          <a
            href="tel:+5531999999999"
            className="inline-flex items-center gap-2 border border-border text-off-white/80 text-sm font-medium px-8 py-4 rounded-xl hover:border-off-white/25 hover:text-off-white transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Ligar Agora
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center flex-wrap gap-6 text-xs text-muted mb-20"
        >
          {['Resposta em até 1h', 'Sem compromisso', 'Corretor exclusivo'].map(item => (
            <div key={item} className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-5 mb-12"
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted text-[0.68rem] tracking-widest uppercase flex-shrink-0">ou envie uma mensagem</span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-left grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <FormField label="Nome Completo" className="sm:col-span-2">
            <input
              type="text" required placeholder="Seu nome completo"
              value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              className="form-input"
            />
          </FormField>

          <FormField label="E-mail">
            <input
              type="email" required placeholder="seu@email.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="form-input"
            />
          </FormField>

          <FormField label="Telefone">
            <input
              type="tel" required placeholder="(31) 9 0000-0000"
              value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))}
              className="form-input"
            />
          </FormField>

          <FormField label="Interesse" className="sm:col-span-2">
            <select
              value={form.interesse} onChange={e => setForm(f => ({ ...f, interesse: e.target.value }))}
              className="form-input"
            >
              <option value="">Selecione seu interesse...</option>
              <option>Comprar um imóvel</option>
              <option>Vender meu imóvel</option>
              <option>Alugar um imóvel</option>
              <option>Avaliação de imóvel</option>
              <option>Financiamento</option>
              <option>Administração de condomínio</option>
            </select>
          </FormField>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gold text-deep font-bold py-4 rounded-xl hover:bg-gold-light transition-colors tracking-wide text-sm"
            >
              {sent ? '✓ Mensagem enviada — em breve entraremos em contato.' : 'Solicitar Atendimento'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

function FormField({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="eyelet">{label}</label>
      {children}
    </div>
  )
}
