import SectionHeading from '../components/ui/SectionHeading'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function GetInTouchPage() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Schedule a Meeting" subtitle="Let's discuss how we can support your team." />
          <div className="bg-gray-100 rounded-xl p-12 text-center">
            <p className="text-gray-500 text-lg">
              Scheduling widget placeholder — integrate Calendly, HubSpot, or your preferred booking tool here.
            </p>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
