// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Author header */}
      <div className="mb-10">
        <Link
          href="/authors"
          className="text-sm text-teal-700 hover:text-teal-900 transition-colors inline-flex items-center gap-1 mb-6"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Authors
        </Link>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              className="w-24 h-24 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mb-2">
              {author.metadata?.name || author.title}
            </h1>
            {author.metadata?.bio && (
              <p className="text-navy-500 leading-relaxed max-w-xl">
                {author.metadata.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Author posts */}
      <div>
        <h2 className="text-xl font-serif font-bold text-navy-900 mb-6">
          Stories by {author.metadata?.name || author.title}
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-navy-400">
            <p className="text-lg">No posts by this author yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}