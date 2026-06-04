import aboutContent from '../config/aboutContent'
import teamContent from '../config/teamContent'
import PageHero from '../components/sections/PageHero'
import StatsSection from '../components/sections/StatsSection'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTABannerSection from '../components/sections/CTABannerSection'
import NewsletterSection from '../components/sections/NewsletterSection'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureBlock from '../components/ui/FeatureBlock'
import TeamCard from '../components/ui/TeamCard'
import StaggerContainer from '../components/ui/StaggerContainer'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  // Normalize testimonials: support both array (legacy) and object with items (new)
  const testimonialItems = Array.isArray(aboutContent.testimonials)
    ? aboutContent.testimonials
    : aboutContent.testimonials?.items || []

  const testimonialsHeading = !Array.isArray(aboutContent.testimonials)
    ? aboutContent.testimonials?.heading
    : undefined

  const testimonialsSubheading = !Array.isArray(aboutContent.testimonials)
    ? aboutContent.testimonials?.subheading
    : undefined

  return (
    <>
      <PageHero
        title={aboutContent.hero.title}
        breadcrumb="About Us"
        backgroundImage="/images/about-hero.webp"
      />

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            {aboutContent.founder.signatureImage && (
              <img src={aboutContent.founder.signatureImage} alt="Signature" className="h-16 mb-4" />
            )}
            <h3 className="text-2xl font-bold text-gray-900">{aboutContent.founder.name}</h3>
            <p className="text-gray-500">{aboutContent.founder.title}</p>
          </div>
          <div>
            <img src={aboutContent.founder.image} alt={aboutContent.founder.name} className="rounded-xl w-full" />
          </div>
        </div>
      </section>

      <StatsSection stats={aboutContent.stats} />

      {/* Features — supports 3 or 4 items */}
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

      {/* Testimonials */}
      {testimonialItems.length > 0 && (
        <TestimonialsSection
          testimonials={testimonialItems}
          heading={testimonialsHeading}
          subheading={testimonialsSubheading}
        />
      )}

      <ProcessSection
        title={aboutContent.processHeading || 'How We Fit Into Your Team'}
        steps={aboutContent.process}
      />

      {/* Team Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title={aboutContent.teamPreview?.heading || 'People Who Lead Our Mission'}
            subtitle={aboutContent.teamPreview?.description}
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {teamContent.members.slice(0, 5).map((m, i) => (
              <TeamCard key={i} {...m} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/leadership-team" className="text-green-600 font-semibold hover:underline">
              Our Team &rarr;
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
