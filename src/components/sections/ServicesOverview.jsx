import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import StaggerContainer from '../ui/StaggerContainer'

export default function ServicesOverview({ services, heading }) {
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {heading && <SectionHeading title={heading} />}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8" staggerDelay={0.15}>
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
