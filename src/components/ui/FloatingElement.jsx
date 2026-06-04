import { motion } from 'framer-motion'

export default function FloatingElement({ children, className = '', duration = 3, distance = 10 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [-distance, distance, -distance] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
