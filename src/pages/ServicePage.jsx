import { useParams, Link } from 'react-router-dom'
import servicesContent from '../config/servicesContent'
import Button from '../components/ui/Button'
import { openCalendly } from '../hooks/useCalendly'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function ServicePage() {
  const { slug } = useParams()
  const service = servicesContent.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
        <Link to="/" className="text-green-600 hover:underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <section
        className="relative min-h-[450px] flex items-center bg-cover bg-center -mt-20"
        style={{ backgroundImage: `url(${service.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-gray-200">{service.heroTagline}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg text-gray-700 mb-12">{service.overview}</p>

          {service.sections.map((section, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
              {section.description && <p className="text-gray-600">{section.description}</p>}
              {section.items && (
                <ul className="space-y-2 mt-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600">
                      <span className="text-green-600 mt-1">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="bg-green-50 rounded-xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.cta.heading}</h2>
            <p className="text-gray-600 mb-6">{service.cta.description}</p>
            <Button label="Schedule a Meeting" onClick={openCalendly} />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
