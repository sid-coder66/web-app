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
      className="text-center p-6 group"
    >
      {IconComponent && (
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-green-600 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
          <IconComponent className="text-green-600 text-2xl group-hover:text-white transition-colors duration-300" />
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  )
}
