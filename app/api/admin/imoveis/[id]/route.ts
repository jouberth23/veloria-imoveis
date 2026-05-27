import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase-admin'

async function isAuthenticated() {
  const store = await cookies()
  const cookie = store.get('veloria_admin')
  const secret = process.env.ADMIN_SESSION_SECRET
  return !!(secret && cookie?.value && cookie.value === secret)
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase.from('imoveis').select('*').eq('id', id).single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ imovel: data })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const supabase = createAdminClient()

  const payload = {
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

  const { data, error } = await supabase
    .from('imoveis')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ imovel: data })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params
  const supabase = createAdminClient()

  const { data: imovel } = await supabase
    .from('imoveis')
    .select('imagens')
    .eq('id', id)
    .single()

  if (imovel?.imagens?.length) {
    const paths = imovel.imagens.map((url: string) => {
      const parts = url.split('/storage/v1/object/public/imoveis/')
      return parts[1] || ''
    }).filter(Boolean)

    if (paths.length) {
      await supabase.storage.from('imoveis').remove(paths)
    }
  }

  const { error } = await supabase.from('imoveis').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
