import { motion } from 'framer-motion'

export default function ProcessStep({ step, title, description }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.92 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
      }}
      className="text-center relative group"
    >
      <div className="relative inline-block mb-6">
        <motion.div
          whileHover={{ scale: 1.12, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 350, damping: 15 }}
          className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto shadow-md group-hover:shadow-green-600/40 group-hover:shadow-xl transition-shadow duration-300"
        >
          {step}
        </motion.div>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Second slower ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-green-300"
          animate={{ scale: [1, 1.9, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
    </motion.div>
  )
}
