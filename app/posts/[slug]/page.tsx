// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getPosts } from '@/lib/cosmic'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const image = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const location = post.metadata?.location
  const content = post.metadata?.content || ''

  return (
    <article>
      {/* Hero image */}
      {image && (
        <div className="relative aspect-[21/9] max-h-[480px] overflow-hidden">
          <img
            src={`${image.imgix_url}?w=1600&h=700&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Post header */}
        <header className={`${image ? '-mt-20 relative z-10' : 'pt-10'} pb-8`}>
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}
            {location && (
              <span className={`text-xs flex items-center gap-1 ${image ? 'text-navy-200' : 'text-navy-400'}`}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </span>
            )}
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight ${image ? 'text-white' : 'text-navy-900'}`}>
            {post.title}
          </h1>
        </header>

        {/* Author bar */}
        {author && (
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-navy-100">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="text-sm font-semibold text-navy-900 hover:text-teal-700 transition-colors"
              >
                {author.metadata?.name || author.title}
              </Link>
              {author.metadata?.bio && (
                <p className="text-xs text-navy-400 line-clamp-1 max-w-md">
                  {author.metadata.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="prose prose-lg prose-navy max-w-none pb-16 prose-headings:font-serif prose-headings:text-navy-900 prose-p:text-navy-700 prose-a:text-teal-700 prose-strong:text-navy-800 prose-li:text-navy-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {/* Back link */}
        <div className="pb-12 border-t border-navy-100 pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors inline-flex items-center gap-1"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to all stories
          </Link>
        </div>
      </div>
    </article>
  )
}