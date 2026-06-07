import * as FaIcons from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FeatureBlock({ title, description, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="text-center p-5 sm:p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 group"
    >
      {IconComponent && (
        <motion.div
          whileInView={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-300"
        >
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
