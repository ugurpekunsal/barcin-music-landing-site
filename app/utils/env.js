export function validateEnv() {
	const requiredEnvVars = [
		'SPOTIFY_CLIENT_ID',
		'SPOTIFY_CLIENT_SECRET',
		'NEXT_PUBLIC_SUPABASE_URL',
		'NEXT_PUBLIC_SUPABASE_ANON_KEY',
		'KV_REST_API_URL',
		'KV_REST_API_TOKEN'
	];

	const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

	if (missingEnvVars.length > 0) {
		throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
	}
}
