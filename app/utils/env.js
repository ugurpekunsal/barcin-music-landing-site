const requiredEnvVars = [
  'NEXT_PUBLIC_CONTENTFUL_SPACE_ID',
  'NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN',
];

export function validateEnv() {
  // Check for missing variables
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate Contentful Space ID format
  if (!/^[a-z0-9]+$/.test(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)) {
    throw new Error('Invalid CONTENTFUL_SPACE_ID format');
  }

  return true;
} 