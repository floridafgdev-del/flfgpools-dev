import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pool-aqua">404</p>
      <h1 className="mt-4 text-4xl font-display font-bold text-pool-deep">Page not found</h1>
      <p className="mx-auto mt-4 max-w-lg text-pool-deep/70">
        The page you requested does not exist or may have moved.
      </p>
      <Link href="/en" className="mt-8 inline-flex rounded-full bg-pool-deep px-6 py-3 font-semibold text-white">
        Return to homepage
      </Link>
    </main>
  );
}
