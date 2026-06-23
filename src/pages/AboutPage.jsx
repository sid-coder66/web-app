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
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <div className="space-y-5 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>{aboutContent.founder.description1}</p>
            <p>{aboutContent.founder.description2}</p>
            <p>{aboutContent.founder.description3}</p>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">{aboutContent.founder.whyChooseTitle}</h4>
              <ul className="space-y-1">
                {aboutContent.founder.whyChoosePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">Our Mission</h4>
              <p>{aboutContent.founder.mission}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-1">Our Vision</h4>
              <p>{aboutContent.founder.vision}</p>
            </div>
          </div>

          {/* Right: image */}
          <div>
            <img src={aboutContent.founder.image} alt="ComplyWise team" className="rounded-2xl w-full shadow-lg" />
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

<ProcessSection
        title={aboutContent.processHeading || 'How We Fit Into Your Team'}
        steps={aboutContent.process}
      />


      <NewsletterSection />
    </>
  )
}
