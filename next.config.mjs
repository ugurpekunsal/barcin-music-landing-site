/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'images.ctfassets.net',
			'faqugyfltlyzbqramjtc.supabase.co'
		],
		formats: ['image/avif', 'image/webp'],
	},
	compress: true,
	poweredByHeader: false,
};

export default nextConfig;
