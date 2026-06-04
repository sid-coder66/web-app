import siteConfig from '../config/siteConfig'
import SectionHeading from '../components/ui/SectionHeading'
import NewsletterSection from '../components/sections/NewsletterSection'
import { FaEnvelope } from 'react-icons/fa'

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Contact Us" subtitle="We'd love to hear from you." />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Offices</h3>
              <div className="space-y-6">
                {siteConfig.offices.map((office) => (
                  <div key={office.country} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-bold text-gray-900">{office.country}</h4>
                      <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 text-sm">
                        {office.address}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get In Touch</h3>
              <div className="flex items-center gap-3 mb-6">
                <FaEnvelope className="text-green-600" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-700 hover:text-green-600">
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-gray-600">Reach out to us directly or schedule a meeting at your convenience.</p>
            </div>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  )
}
