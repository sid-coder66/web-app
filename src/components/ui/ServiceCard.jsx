import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import * as FaIcons from 'react-icons/fa'

export default function ServiceCard({ title, description, icon }) {
  const IconComponent = FaIcons[icon]
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-2xl hover:border-green-200 transition-shadow duration-300 group overflow-hidden cursor-default"
    >
      {/* Gradient shimmer on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(134,239,172,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Animated green accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-l-2xl origin-bottom"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {IconComponent && (
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors duration-300"
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <IconComponent className="text-green-600 text-xl sm:text-2xl group-hover:text-white transition-colors duration-300" />
        </motion.div>
      )}

      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{description}</p>
    </motion.div>
  )
}
