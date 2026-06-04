import SectionHeading from '../ui/SectionHeading'
import BlogCard from '../ui/BlogCard'
import blogContent from '../../config/blogContent'
import StaggerContainer from '../ui/StaggerContainer'

export default function BlogPreviewSection({ heading, subheading }) {
  const latestPosts = blogContent.posts.slice(0, 3)
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={heading} subtitle={subheading} />
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
