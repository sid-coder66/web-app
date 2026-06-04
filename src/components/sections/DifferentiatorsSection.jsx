import SectionHeading from '../ui/SectionHeading'
import FeatureBlock from '../ui/FeatureBlock'
import StaggerContainer from '../ui/StaggerContainer'

export default function DifferentiatorsSection({ title, items }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title || 'Why Choose Us'} />
        <StaggerContainer className="grid md:grid-cols-4 gap-8" staggerDelay={0.1}>
          {items.map((item, i) => (
            <FeatureBlock key={i} {...item} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
