import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import StaggerContainer from '../ui/StaggerContainer'

export default function ServicesOverview({ services, heading }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {heading && <SectionHeading title={heading} />}
        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
