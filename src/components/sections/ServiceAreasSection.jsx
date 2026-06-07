import * as FaIcons from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import StaggerContainer from '../ui/StaggerContainer'
import { openCalendly } from '../../hooks/useCalendly'

function ServiceAreaCard({ title, description, icon, stat, features, ctaLabel, ctaPath }) {
  const IconComponent = icon ? FaIcons[icon] : null

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
    >
      {IconComponent && (
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
          <IconComponent className="text-green-600 text-2xl" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

      {stat && (
        <p className="text-green-600 font-semibold text-sm mb-5">{stat}</p>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="text-sm font-semibold text-gray-800">{feature.title}</span>
                {feature.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

    </motion.div>
  )
}

export default function ServiceAreasSection({ heading, subheading, areas }) {
  if (!areas || areas.length === 0) return null

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {(heading || subheading) && (
          <SectionHeading title={heading || 'Our Service Areas'} subtitle={subheading} />
        )}
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {areas.map((area, i) => (
            <ServiceAreaCard key={i} {...area} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
