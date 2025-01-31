import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = pathname === '/' || pathname === '/login' || pathname === '/signup';
  const token = request.cookies.get('privy-token');

  // Redirect to dashboard if logged in and trying to access public path
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if not logged in and trying to access protected path
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard/:path*',
    '/portfolio/:path*',
    '/transactions/:path*',
    '/settings/:path*',
  ],
}; 