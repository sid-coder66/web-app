import * as FaIcons from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FeatureBlock({ title, description, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.93 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
        },
      }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="text-center p-5 sm:p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-shadow duration-300 group"
    >
      {IconComponent && (
        <motion.div
          whileInView={{ rotate: [0, -10, 10, -4, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeInOut' }}
          viewport={{ once: false }}
          whileHover={{ rotate: 8, scale: 1.15, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:shadow-lg group-hover:shadow-green-200 transition-all duration-300"
        >
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
