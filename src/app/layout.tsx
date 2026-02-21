import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GaadiBaazar — UP Vehicle Price Transparency Tool',
  description:
    'Know the exact on-road price of any car or two-wheeler in Uttar Pradesh. RTO tax, insurance, and handling — no surprises.',
  keywords: ['car price UP', 'on road price Lucknow', 'RTO tax calculator UP', 'vehicle price India'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2 text-xl font-bold text-saffron-600">
              <span className="text-2xl">🚗</span>
              GaadiBaazar
            </a>
            <nav className="hidden gap-6 text-sm font-medium text-gray-600 sm:flex">
              <a href="/" className="hover:text-saffron-600 transition">
                Price Report
              </a>
              <a href="/book-consultation" className="hover:text-saffron-600 transition">
                Expert Help
              </a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="mt-16 border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-500">
          <div className="mx-auto max-w-5xl px-4">
            <p className="font-semibold text-gray-700">GaadiBaazar</p>
            <p className="mt-1">
              Empowering UP vehicle buyers with transparent pricing. Prices are indicative and
              updated monthly from manufacturer sources.
            </p>
            <p className="mt-3 text-xs">
              © {new Date().getFullYear()} GaadiBaazar. For informational purposes only.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
