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

export default function HomePage() {
  const ctaWords = homeContent.secondCtaBanner?.heading?.split(' ') || []

  return (
    <>
      <HeroSection {...homeContent.hero} />

      {/* Value Proposition */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {homeContent.valueProposition.subheading && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            >
              {homeContent.valueProposition.subheading}
            </motion.span>
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
        <section className="py-14 sm:py-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-800 opacity-20 blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute inset-0 m-auto w-[500px] h-[500px] rounded-full border border-white/5"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {ctaWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-[0.27em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: ctaWords.length * 0.07 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.button
                onClick={openCalendly}
                whileHover={{ scale: 1.06, y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="inline-block bg-white text-green-700 px-6 sm:px-8 py-3 rounded-lg font-semibold cursor-pointer"
              >
                Schedule a Meeting
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      <FAQSection items={homeContent.faq} />
    </>
  )
}
