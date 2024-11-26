const requiredEnvVars = [
  'NEXT_PUBLIC_CONTENTFUL_SPACE_ID',
  'CONTENTFUL_MANAGEMENT_TOKEN',
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

  // Validate Management Token format (should be a long string)
  if (process.env.CONTENTFUL_MANAGEMENT_TOKEN.length < 20) {
    throw new Error('CONTENTFUL_MANAGEMENT_TOKEN seems invalid');
  }

  return true; // If we get here, all validations passed
} 