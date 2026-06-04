import { useState } from 'react'
import blogContent from '../config/blogContent'
import BlogCard from '../components/ui/BlogCard'
import PageHero from '../components/sections/PageHero'

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = blogContent.postsPerPage
  const totalPages = Math.ceil(blogContent.posts.length / perPage)
  const paginatedPosts = blogContent.posts.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <>
    <PageHero
      title="Blogs"
      breadcrumb="Blog"
      backgroundImage="/images/blog-hero.webp"
    />
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  )
}
