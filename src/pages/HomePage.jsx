import { motion } from 'framer-motion'
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
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {homeContent.valueProposition.subheading && (
            <AnimateOnScroll animation="fadeUp">
              <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
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

      <ServiceAreasSection
        heading="Our Expertise"
        areas={homeContent.serviceAreas}
      />

      <DifferentiatorsSection items={homeContent.differentiators} />

      <BlogPreviewSection {...homeContent.blogPreview} />

      {/* Second CTA Banner */}
      {homeContent.secondCtaBanner && (
        <section className="py-14 sm:py-20 bg-gradient-to-br from-green-600 to-green-700 overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-800 opacity-20 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6"
            >
              {homeContent.secondCtaBanner.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={openCalendly}
                className="inline-block bg-white text-green-700 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Schedule a Meeting
              </button>
            </motion.div>
          </div>
        </section>
      )}

      <FAQSection items={homeContent.faq} />
    </>
  )
}
