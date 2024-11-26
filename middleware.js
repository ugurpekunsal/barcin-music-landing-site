import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  const headers = response.headers;

  // Security Headers
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.spotify.com *.twitch.tv *.kick.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: *.ctfassets.net; " +
    "media-src 'self' https:; " +
    "connect-src 'self' *.contentful.com; " +
    "frame-src 'self' *.spotify.com *.twitch.tv *.kick.com *.discord.com; " +
    "font-src 'self' data:;"
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 