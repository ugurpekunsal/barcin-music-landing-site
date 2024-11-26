import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="mb-4">Page not found</p>
        <Link href="/" className="text-purple-600">
          Return Home
        </Link>
      </div>
    </div>
  );
} 