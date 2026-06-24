import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

const COLORS = [
  ['bg-green-600', 'text-white'],
  ['bg-emerald-700', 'text-white'],
  ['bg-teal-600', 'text-white'],
  ['bg-green-800', 'text-white'],
  ['bg-lime-700', 'text-white'],
]
function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
  return COLORS[hash % COLORS.length]
}

export default function TeamCard({ name, title, bio }) {
  const [open, setOpen] = useState(false)
  const initials = getInitials(name)
  const [bg, fg] = getColor(name)
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.92 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] } },
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(true)}
        className="text-center group cursor-pointer p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300"
      >
        {/* Avatar with pulse ring */}
        <div className="relative mx-auto mb-4 w-32 h-32 sm:w-40 sm:h-40">
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute inset-0 rounded-full ${bg} opacity-20`}
          />
          <motion.div
            className={`w-full h-full rounded-full flex items-center justify-center ${bg} ring-4 ring-transparent group-hover:ring-green-200 transition-all duration-300 shadow-md`}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <span className={`text-3xl sm:text-4xl font-bold ${fg} select-none`}>{initials}</span>
          </motion.div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{name}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
        {bio && (
          <motion.p
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="text-green-600 text-xs mt-1 font-medium"
          >
            View Profile →
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <div className={`${bg} rounded-t-2xl p-6 flex items-center gap-4`}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
                  className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
                >
                  <span className={`text-2xl font-bold ${fg}`}>{initials}</span>
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{name}</h2>
                  <p className="text-white/80 text-sm">{title}</p>
                </div>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              <div className="p-6">
                {bio?.split('\n\n').map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="text-gray-600 text-sm leading-relaxed mb-4 last:mb-0"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
