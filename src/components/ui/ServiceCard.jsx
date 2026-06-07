import { motion } from 'framer-motion'
import * as FaIcons from 'react-icons/fa'

export default function ServiceCard({ title, description, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-xl hover:border-green-200 transition-all duration-300 group overflow-hidden"
    >
      {/* Animated green accent line on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-2xl origin-bottom"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3 }}
      />

      {IconComponent && (
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors duration-300">
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
    </motion.div>
  )
}
