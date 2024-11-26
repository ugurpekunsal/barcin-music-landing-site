import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get response
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;

  // HSTS
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // XSS Protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy
  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.spotify.com *.twitch.tv *.kick.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "media-src 'self' https:; " +
    "connect-src 'self' *.contentful.com; " +
    "frame-src 'self' *.spotify.com *.twitch.tv *.kick.com *.discord.com; " +
    "font-src 'self' data:;"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 