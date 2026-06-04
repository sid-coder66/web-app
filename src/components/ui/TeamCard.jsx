import { motion } from 'framer-motion'

export default function TeamCard({ name, title, image }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="text-center group"
    >
      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 ring-4 ring-transparent group-hover:ring-green-200 transition-all duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{name}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </motion.div>
  )
}
