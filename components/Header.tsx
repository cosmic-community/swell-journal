import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import MobileNav from '@/components/MobileNav'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="border-b border-navy-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🏄</span>
          <span className="text-lg font-semibold text-navy-900 tracking-tight group-hover:text-teal-700 transition-colors">
            Swell Journal
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-sm font-medium text-navy-500 hover:text-teal-700 transition-colors"
            >
              {cat.metadata?.name || cat.title}
            </Link>
          ))}
          <Link
            href="/authors"
            className="text-sm font-medium text-navy-500 hover:text-teal-700 transition-colors"
          >
            Authors
          </Link>
        </nav>

        <MobileNav categories={categories} />
      </div>
    </header>
  )
}