import teamContent from '../config/teamContent'
import TeamCard from '../components/ui/TeamCard'
import SectionHeading from '../components/ui/SectionHeading'
import PageHero from '../components/sections/PageHero'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function TeamPage() {
  return (
    <>
      <PageHero
        title={teamContent.heading || 'Our Team'}
        breadcrumb="Team"
        backgroundImage="/images/team-hero.webp"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title={teamContent.mission} />
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">{teamContent.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamContent.members.map((m, i) => (
              <TeamCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
