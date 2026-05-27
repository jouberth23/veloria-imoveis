import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase-admin'

async function isAuthenticated() {
  const store = await cookies()
  const cookie = store.get('veloria_admin')
  const secret = process.env.ADMIN_SESSION_SECRET
  return !!(secret && cookie?.value && cookie.value === secret)
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeBase = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 40)
  const fileName = `${Date.now()}_${safeBase}.${ext}`

  const buffer = await file.arrayBuffer()
  const supabase = createAdminClient()

  const { data, error } = await supabase.storage
    .from('imoveis')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('imoveis')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
