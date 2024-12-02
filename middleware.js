import { NextResponse } from "next/server";

export function middleware() {
	const response = NextResponse.next();

	// Add CSP headers
	response.headers.set(
		"Content-Security-Policy",
		`
            default-src 'self';
            connect-src 'self' https://*.supabase.co *.contentful.com;
            script-src 'self' 'unsafe-eval' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            img-src 'self' blob: data:;
            font-src 'self';
            frame-src 'self' https://discord.com https://player.twitch.tv https://player.kick.com;
        `
			.replace(/\s+/g, " ")
			.trim()
	);

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
