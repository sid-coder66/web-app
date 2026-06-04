import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'

export default function TestimonialsSection({ testimonials, heading, subheading }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title={heading || 'What Our Clients Say'}
          subtitle={subheading}
        />
        <div className="space-y-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
