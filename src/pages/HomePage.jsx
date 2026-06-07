import homeContent from '../config/homeContent'
import { openCalendly } from '../hooks/useCalendly'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ServicesOverview from '../components/sections/ServicesOverview'
import DifferentiatorsSection from '../components/sections/DifferentiatorsSection'
import ServiceAreasSection from '../components/sections/ServiceAreasSection'
import BlogPreviewSection from '../components/sections/BlogPreviewSection'
import FAQSection from '../components/sections/FAQSection'
import SectionHeading from '../components/ui/SectionHeading'
import AnimateOnScroll from '../components/ui/AnimateOnScroll'

export default function HomePage() {
  return (
    <>
      <HeroSection {...homeContent.hero} />

      {/* Value Proposition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {homeContent.valueProposition.subheading && (
            <AnimateOnScroll animation="fadeUp">
              <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {homeContent.valueProposition.subheading}
              </span>
            </AnimateOnScroll>
          )}
          <SectionHeading
            title={homeContent.valueProposition.heading}
            subtitle={homeContent.valueProposition.description}
          />
        </div>
      </section>

      <ServicesOverview services={homeContent.services} />

<StatsSection stats={homeContent.stats} />

      {/* Service Areas */}
      <ServiceAreasSection
        heading="Our Expertise"
        areas={homeContent.serviceAreas}
      />

      <DifferentiatorsSection items={homeContent.differentiators} />


      <BlogPreviewSection {...homeContent.blogPreview} />

      {/* Second CTA Banner (text-only) */}
      {homeContent.secondCtaBanner && (
        <section className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <AnimateOnScroll animation="fadeUp">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {homeContent.secondCtaBanner.heading}
              </h2>
              <button
                onClick={openCalendly}
                className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Schedule a Meeting
              </button>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <FAQSection items={homeContent.faq} />

    </>
  )
}
