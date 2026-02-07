import Link from 'next/link'
import { getAuthors } from '@/lib/cosmic'

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm text-teal-700 hover:text-teal-900 transition-colors inline-flex items-center gap-1 mb-4"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900">
          Our Writers
        </h1>
      </div>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group bg-white rounded-xl border border-navy-100 p-6 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h2 className="text-lg font-serif font-bold text-navy-900 group-hover:text-teal-800 transition-colors">
                    {author.metadata?.name || author.title}
                  </h2>
                  {author.metadata?.bio && (
                    <p className="text-sm text-navy-500 mt-1 line-clamp-3">
                      {author.metadata.bio}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-navy-400">
          <p className="text-lg">No authors yet.</p>
        </div>
      )}
    </div>
  )
}