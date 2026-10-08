import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-[#121212] text-white">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-black font-poppins text-skin mb-4">404</h1>
        <h2 className="text-2xl font-bold font-poppins mb-2">Page Not Found</h2>
        <p className="text-sm text-zinc-400 font-sans mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-skin text-black font-bold font-poppins text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
