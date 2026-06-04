import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import navigationConfig from '../../config/navigationConfig'

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-xl"
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="text-gray-600 text-2xl">
                <FaTimes />
              </button>
            </div>
            <nav className="px-6 py-4 space-y-6">
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="block text-lg font-medium text-gray-800 hover:text-green-600"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to={navigationConfig.ctaButton.path}
                onClick={onClose}
                className="block bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
              >
                {navigationConfig.ctaButton.label}
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
