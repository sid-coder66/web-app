import SectionHeading from '../ui/SectionHeading'
import ProcessStep from '../ui/ProcessStep'
import StaggerContainer from '../ui/StaggerContainer'

export default function ProcessSection({ title, subtitle, steps }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={title} subtitle={subtitle} />
        <StaggerContainer className="grid md:grid-cols-3 gap-12" staggerDelay={0.2}>
          {steps.map((step) => (
            <ProcessStep key={step.step} {...step} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
