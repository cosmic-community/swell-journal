import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const category = post.metadata?.category
  const author = post.metadata?.author
  const image = post.metadata?.featured_image
  const location = post.metadata?.location

  if (featured && image) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
          <img
            src={`${image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            {category && (
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-900/50 rounded-full">
                {category.metadata?.name || category.title}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-2">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 text-sm text-navy-200">
              {author && <span>{author.metadata?.name || author.title}</span>}
              {location && (
                <>
                  <span className="text-navy-400">·</span>
                  <span className="flex items-center gap-1">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {location}
                  </span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden border border-navy-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
        {image && (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                {category.metadata?.name || category.title}
              </span>
            )}
            {location && (
              <span className="text-xs text-navy-400 flex items-center gap-1">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </span>
            )}
          </div>
          <h3 className="text-lg font-serif font-bold text-navy-900 leading-snug mb-2 group-hover:text-teal-800 transition-colors">
            {post.title}
          </h3>
          {author && (
            <div className="flex items-center gap-2 mt-3">
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-navy-500">
                {author.metadata?.name || author.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}