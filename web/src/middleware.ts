import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname
  const baseUrl = request.nextUrl.origin

  if (!pathname.includes('/app') && token) {
    return NextResponse.redirect(new URL(getUrl('/app'), baseUrl))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/auth/sign-in'), baseUrl))
  }
}

export const config = {
  matcher: ['/app/:path*', '/auth'],
}