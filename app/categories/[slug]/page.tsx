// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Category header */}
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
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 mb-2">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-navy-500 max-w-xl">
            {category.metadata.description}
          </p>
        )}
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-navy-400">
          <p className="text-lg">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}