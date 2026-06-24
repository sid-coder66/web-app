import { useRef } from 'react'
import * as FaIcons from 'react-icons/fa'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import StaggerContainer from '../ui/StaggerContainer'

function ServiceAreaCard({ title, description, icon, stat, features }) {
  const IconComponent = icon ? FaIcons[icon] : null
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.94 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-green-200 transition-shadow duration-300 flex flex-col group cursor-default"
    >
      {/* Top gradient shimmer */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

      {IconComponent && (
        <motion.div
          whileHover={{ rotate: 8, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-200/50 transition-all duration-300 relative"
        >
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

      {stat && (
        <p className="text-green-600 font-semibold text-sm mb-5">{stat}</p>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.06 + 0.1 }}
              className="flex gap-3"
            >
              <span className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <svg className="w-3 h-3 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="text-sm font-semibold text-gray-800">{feature.title}</span>
                {feature.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default function ServiceAreasSection({ heading, subheading, areas }) {
  if (!areas || areas.length === 0) return null

  return (
    <section className="py-12 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {(heading || subheading) && (
          <SectionHeading title={heading || 'Our Service Areas'} subtitle={subheading} />
        )}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.12}>
          {areas.map((area, i) => (
            <ServiceAreaCard key={i} {...area} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
