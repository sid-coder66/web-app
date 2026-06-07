import * as FaIcons from 'react-icons/fa'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import StaggerContainer from '../ui/StaggerContainer'

function ServiceAreaCard({ title, description, icon, stat, features }) {
  const IconComponent = icon ? FaIcons[icon] : null

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col group"
    >
      {IconComponent && (
        <motion.div
          whileHover={{ rotate: 6, scale: 1.1 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors duration-300"
        >
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

      {stat && (
        <p className="text-green-600 font-semibold text-sm mb-5">{stat}</p>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-3 flex-1">
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
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {(heading || subheading) && (
          <SectionHeading title={heading || 'Our Service Areas'} subtitle={subheading} />
        )}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.15}>
          {areas.map((area, i) => (
            <ServiceAreaCard key={i} {...area} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
