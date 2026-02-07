import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        {featuredPost ? (
          <PostCard post={featuredPost} featured />
        ) : (
          <div className="text-center py-20 text-navy-400">
            <p className="text-lg">No posts yet. Add some in your Cosmic dashboard.</p>
          </div>
        )}
      </section>

      {/* Categories bar */}
      {categories.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-4 py-2 text-sm font-medium text-navy-600 bg-white border border-navy-100 rounded-full hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all"
              >
                {cat.metadata?.name || cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Post grid */}
      {remainingPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-xl font-serif font-bold text-navy-900 mb-6">Latest Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}