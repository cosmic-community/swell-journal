import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🏄</span>
            <span className="text-sm font-semibold text-navy-800 tracking-tight">Swell Journal</span>
          </Link>
          <p className="text-sm text-navy-400">
            © {new Date().getFullYear()} Swell Journal. Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-800 transition-colors"
            >
              Cosmic
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}