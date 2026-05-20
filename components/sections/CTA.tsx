'use client'

import Image from 'next/image'
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
    <section id="cta" className="py-24 bg-deep" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden border border-border">

          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
              alt="Contato"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep/97 via-deep/92 to-deep/75" />
          </div>

          {/* Gold glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%)' }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-16">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center"
            >
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Pronto para começar?</span>
              <h2 className="font-serif text-[clamp(1.7rem,3vw,2.6rem)] mt-3 mb-4">
                Seu próximo imóvel <span className="text-gold">começa aqui.</span>
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                Fale agora com um de nossos especialistas e dê o primeiro passo rumo ao imóvel dos seus sonhos. Atendimento personalizado, sem compromisso.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.847L.057 23.885a.5.5 0 00.611.628l6.218-1.632A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 01-5.073-1.381l-.363-.215-3.767.988.988-3.671-.236-.38A9.964 9.964 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Falar no WhatsApp
                </a>
                <a
                  href="tel:+5531999999999"
                  className="border border-border text-gold text-sm font-medium px-6 py-3 rounded-xl hover:bg-gold/10 hover:border-gold transition-all"
                >
                  Ligar Agora
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-5 text-xs text-muted">
                {['Resposta em até 1h', 'Sem compromisso', 'Corretor exclusivo'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col gap-4 bg-deep/50 backdrop-blur-sm rounded-xl p-7 border border-border"
            >
              <h3 className="font-serif text-lg mb-1">Solicite Atendimento</h3>

              <FormField label="Nome Completo">
                <input
                  type="text" required placeholder="Seu nome"
                  value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                  className="form-input"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <FormField label="Interesse">
                <select
                  value={form.interesse} onChange={e => setForm(f => ({ ...f, interesse: e.target.value }))}
                  className="form-input"
                >
                  <option value="">Selecione...</option>
                  <option>Comprar um imóvel</option>
                  <option>Vender meu imóvel</option>
                  <option>Alugar um imóvel</option>
                  <option>Avaliação de imóvel</option>
                  <option>Financiamento</option>
                  <option>Administração de condomínio</option>
                </select>
              </FormField>

              <button
                type="submit"
                className="w-full bg-gold text-deep font-bold py-3.5 rounded-xl hover:bg-gold-light transition-colors tracking-wide text-sm mt-1"
              >
                {sent ? '✓ Mensagem enviada! Em breve entraremos em contato.' : 'Solicitar Atendimento →'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.7rem] font-semibold tracking-widest uppercase text-gold">{label}</label>
      {children}
    </div>
  )
}
