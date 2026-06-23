import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Deterministic color from name
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

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        }}
        onClick={() => setOpen(true)}
        className="text-center group cursor-pointer"
      >
        {/* Avatar circle with initials */}
        <div className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full flex items-center justify-center ${bg} ring-4 ring-transparent group-hover:ring-green-200 group-hover:scale-105 transition-all duration-300 shadow-md`}>
          <span className={`text-3xl sm:text-4xl font-bold ${fg} select-none`}>{initials}</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">{name}</h3>
        <p className="text-gray-500 text-sm">{title}</p>
        {bio && (
          <p className="text-green-600 text-xs mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Profile →
          </p>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className={`${bg} rounded-t-2xl p-6 flex items-center gap-4`}>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className={`text-2xl font-bold ${fg}`}>{initials}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{name}</h2>
                  <p className="text-white/80 text-sm">{title}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Bio */}
              <div className="p-6">
                {bio?.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
