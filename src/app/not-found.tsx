import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Vehicle Not Found</h1>
      <p className="mt-2 text-gray-600">
        We couldn&apos;t find that vehicle. It may have been removed or the URL is incorrect.
      </p>
      <Link href="/" className="btn-primary mt-6">
        ← Search Again
      </Link>
    </div>
  );
}
