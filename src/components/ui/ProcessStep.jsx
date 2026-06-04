import { motion } from 'framer-motion'

export default function ProcessStep({ step, title, description }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
      className="text-center relative group"
    >
      <div className="relative inline-block mb-6">
        <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-600/30 transition-all duration-300">
          {step}
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-600"
          initial={{ scale: 1, opacity: 0.5 }}
          whileInView={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          viewport={{ once: false }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
