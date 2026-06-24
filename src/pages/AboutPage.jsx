import { motion } from 'framer-motion'
import aboutContent from '../config/aboutContent'
import PageHero from '../components/sections/PageHero'
import StatsSection from '../components/sections/StatsSection'
import ProcessSection from '../components/sections/ProcessSection'
import CTABannerSection from '../components/sections/CTABannerSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureBlock from '../components/ui/FeatureBlock'
import StaggerContainer from '../components/ui/StaggerContainer'

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={aboutContent.hero.title}
        breadcrumb="About Us"
        backgroundImage="/images/about-hero.webp"
      />

      {/* About Section */}
      <section className="py-16 sm:py-24 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: text with stagger */}
          <div className="space-y-5 text-gray-600 text-sm sm:text-base leading-relaxed">
            {[aboutContent.founder.description1, aboutContent.founder.description2, aboutContent.founder.description3].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold text-gray-900 mb-3">{aboutContent.founder.whyChooseTitle}</h4>
              <ul className="space-y-2">
                {aboutContent.founder.whyChoosePoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 4 }}
                      className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"
                    />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {[
              { heading: 'Our Mission', text: aboutContent.founder.mission },
              { heading: 'Our Vision', text: aboutContent.founder.vision },
            ].map(({ heading, text }, i) => (
              <motion.div
                key={heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="p-4 rounded-xl bg-green-50/60 border border-green-100"
              >
                <h4 className="font-bold text-gray-900 mb-1 text-green-800">{heading}</h4>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: image with entrance */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-br from-green-200 to-emerald-100 rounded-3xl blur-2xl"
            />
            <img src={aboutContent.founder.image} alt="ComplyWise team" className="relative rounded-2xl w-full shadow-xl" />
          </motion.div>
        </div>
      </section>

      <StatsSection stats={aboutContent.stats} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <StaggerContainer
            className={`grid gap-8 ${aboutContent.features.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}
            staggerDelay={0.1}
          >
            {aboutContent.features.map((f, i) => (
              <FeatureBlock key={i} {...f} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABannerSection heading={aboutContent.ctaBanner.heading} image={aboutContent.ctaBanner.image} />

      <ProcessSection
        title={aboutContent.processHeading || 'How We Fit Into Your Team'}
        steps={aboutContent.process}
      />

      <NewsletterSection />
    </>
  )
}
