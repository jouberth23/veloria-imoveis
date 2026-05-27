import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase-admin'
import { CONFIG_DEFAULTS } from '@/lib/configuracoes'

async function isAuthenticated() {
  const store = await cookies()
  const cookie = store.get('veloria_admin')
  const secret = process.env.ADMIN_SESSION_SECRET
  return !!(secret && cookie?.value && cookie.value === secret)
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase.from('configuracoes').select('chave, valor')

  if (error) {
    return NextResponse.json(CONFIG_DEFAULTS)
  }

  const config: Record<string, string> = { ...CONFIG_DEFAULTS }
  for (const row of data || []) {
    config[row.chave] = row.valor
  }

  return NextResponse.json(config)
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createAdminClient()

  const allowedKeys = Object.keys(CONFIG_DEFAULTS)
  const updates = Object.entries(body)
    .filter(([chave]) => allowedKeys.includes(chave))
    .map(([chave, valor]) => ({ chave, valor: String(valor) }))

  const { error } = await supabase
    .from('configuracoes')
    .upsert(updates, { onConflict: 'chave' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
