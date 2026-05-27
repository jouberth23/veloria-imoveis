import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'veloria_admin'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE)
    const sessionSecret = process.env.ADMIN_SESSION_SECRET

    const authenticated =
      sessionSecret &&
      sessionCookie?.value &&
      sessionCookie.value === sessionSecret

    if (!authenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
