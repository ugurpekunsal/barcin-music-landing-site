const requiredEnvVars = [
	"NEXT_PUBLIC_CONTENTFUL_SPACE_ID",
	"CONTENTFUL_DELIVERY_TOKEN",
	"NEXT_PUBLIC_SUPABASE_URL",
	"NEXT_PUBLIC_SUPABASE_ANON_KEY",
	"SPOTIFY_CLIENT_ID",
	"SPOTIFY_CLIENT_SECRET",
	"OPENCAGE_API_KEY"
];

export function validateEnv() {
	// Check for missing variables
	const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

	if (missingVars.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingVars.join(", ")}`
		);
	}

	// Validate OpenCage API Key format (should be 32 characters)
	if (!/^[a-f0-9]{32}$/.test(process.env.OPENCAGE_API_KEY)) {
		throw new Error("Invalid OPENCAGE_API_KEY format");
	}

	return true;
}
