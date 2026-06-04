import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

export default function StatCard({ value, label }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className="text-center p-6"
    >
      <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
        <AnimatedCounter value={value} />
      </div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  )
}
