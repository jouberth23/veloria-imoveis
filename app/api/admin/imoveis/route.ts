import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase-admin'
import { slugify } from '@/lib/slugify'

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
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ imoveis: data })
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()
  const supabase = createAdminClient()

  const baseSlug = slugify(body.titulo)
  let slug = baseSlug
  let attempt = 0

  while (true) {
    const { data: existing } = await supabase
      .from('imoveis')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!existing) break

    attempt++
    slug = `${baseSlug}-${attempt}`
  }

  const payload = {
    slug,
    titulo: body.titulo,
    descricao: body.descricao || null,
    preco: body.preco ? Number(body.preco) : null,
    preco_aluguel: body.preco_aluguel ? Number(body.preco_aluguel) : null,
    bairro: body.bairro,
    cidade: body.cidade || 'Belo Horizonte',
    area: body.area ? Number(body.area) : null,
    quartos: body.quartos ? Number(body.quartos) : null,
    suites: body.suites ? Number(body.suites) : null,
    vagas: body.vagas ? Number(body.vagas) : null,
    tipo: body.tipo,
    status: body.status || 'ativo',
    destaque: body.destaque || false,
    imagens: body.imagens || [],
    videos: body.videos || [],
    video_url: body.video_url || null,
  }

  const { data, error } = await supabase.from('imoveis').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ imovel: data }, { status: 201 })
}
