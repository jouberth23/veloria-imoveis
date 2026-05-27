import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_COOKIE = 'veloria_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 dias

export async function POST(request: Request) {
  const { pin } = await request.json()

  const adminPin = process.env.ADMIN_PIN || '23424531'
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!sessionSecret) {
    return NextResponse.json(
      { error: 'Servidor não configurado. Defina ADMIN_SESSION_SECRET no .env.local.' },
      { status: 500 }
    )
  }

  if (pin !== adminPin) {
    return NextResponse.json({ error: 'Código incorreto' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  return NextResponse.json({ success: true })
}
