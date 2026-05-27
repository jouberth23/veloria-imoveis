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

  const { fileName } = await request.json()
  const supabase = createAdminClient()

  const { data, error } = await supabase.storage
    .from('imoveis')
    .createSignedUploadUrl(fileName)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('imoveis')
    .getPublicUrl(data.path)

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl })
}
