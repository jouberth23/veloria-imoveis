import { NextResponse } from 'next/server'
import { isSupabaseConfigured, createPublicClient } from '@/lib/supabase'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ properties: [], source: 'unconfigured' })
  }

  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('imoveis')
      .select('*')
      .eq('status', 'ativo')
      .order('destaque', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ properties: data || [], source: 'supabase' })
  } catch {
    return NextResponse.json({ properties: [], source: 'error' })
  }
}
