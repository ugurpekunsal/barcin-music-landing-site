import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	await supabase.auth.getSession();

	// Add CSP headers
	const cspHeader = `
		default-src 'self';
		script-src 'self' 'unsafe-inline' 'unsafe-eval' 
			https://*.twitch.tv
			https://*.cloudfront.net
			https://player.twitch.tv;
		style-src 'self' 'unsafe-inline';
		img-src 'self' blob: data: 
			https://*.tile.openstreetmap.org
			https://*.twitch.tv
			https://*.cloudfront.net
			https://i.scdn.co
			${process.env.NEXT_PUBLIC_SUPABASE_URL};
		font-src 'self';
		connect-src 'self' 
			https://*.supabase.co
			https://*.supabase.in
			https://faqugyfltlyzbqramjtc.supabase.co
			https://ip-api.com
			wss://*.twitch.tv
			https://*.twitch.tv
			https://*.cloudfront.net
			*.contentful.com;
		frame-src 'self' 
			https://player.twitch.tv
			https://www.youtube.com 
			https://youtube.com
			https://open.spotify.com;
		media-src 'self' 
			blob: 
			https://*.twitch.tv
			https://*.cloudfront.net;
		frame-ancestors 'none';
	`.replace(/\s{2,}/g, ' ').trim();

	// Set security headers
	res.headers.set('Content-Security-Policy', cspHeader);

	// Add CORS headers
	res.headers.set('Access-Control-Allow-Credentials', 'true');
	res.headers.set('Access-Control-Allow-Origin', '*');
	res.headers.set(
		'Access-Control-Allow-Methods',
		'GET,DELETE,PATCH,POST,PUT,OPTIONS'
	);
	res.headers.set(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	);

	// Handle preflight requests
	if (req.method === 'OPTIONS') {
		return res;
	}

	// If no session and trying to access protected route
	if (req.nextUrl.pathname.startsWith('/admin') && 
		req.nextUrl.pathname !== '/admin/login') {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		
		if (!session) {
			const redirectUrl = new URL('/admin/login', req.url);
			return NextResponse.redirect(redirectUrl);
		}
	}

	return res;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public (public files)
		 */
		'/((?!_next/static|_next/image|favicon.ico|public).*)',
	]
}
