import { useParams, Link } from 'react-router-dom'
import blogContent from '../config/blogContent'
import BlogCard from '../components/ui/BlogCard'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogContent.posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-green-600 hover:underline">Back to Blog</Link>
      </div>
    )
  }

  const relatedPosts = blogContent.posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-green-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
          <span className="text-green-600 text-sm font-semibold uppercase tracking-wide">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">{post.title}</h1>
          {post.date && <p className="text-gray-500 text-sm mb-8">{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
          <img src={post.image} alt={post.title} className="w-full rounded-xl mb-8" />
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </>
  )
}
