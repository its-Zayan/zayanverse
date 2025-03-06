import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // If user is on auth page and has auth cookie, redirect to home
  if (pathname === '/auth' && authCookie?.value === 'true') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not on auth page and has no auth cookie, redirect to auth
  if (pathname !== '/auth' && (!authCookie || authCookie.value !== 'true')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
}; 