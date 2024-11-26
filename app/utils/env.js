const requiredEnvVars = [
  'NEXT_PUBLIC_CONTENTFUL_SPACE_ID',
  'CONTENTFUL_MANAGEMENT_TOKEN',
  // Add other required env vars
];

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate format of specific variables if needed
  if (!/^[a-z0-9]+$/.test(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)) {
    throw new Error('Invalid CONTENTFUL_SPACE_ID format');
  }
} 