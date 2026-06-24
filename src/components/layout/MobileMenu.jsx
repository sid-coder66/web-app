import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import navigationConfig from '../../config/navigationConfig'
import { openCalendly } from '../../hooks/useCalendly'

export default function MobileMenu({ isOpen, onClose }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-72 bg-white z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-bold text-lg">
                <span className="text-green-800">Comply</span>
                <span className="text-[#71B850]">Wise</span>
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-gray-500 hover:text-gray-800 text-xl p-1"
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Nav links */}
            <nav className="px-6 py-6 space-y-1 flex-1">
              {navigationConfig.mainNav.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="block py-3 px-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-6 pb-8">
              <motion.button
                onClick={() => { onClose(); openCalendly() }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
              >
                {navigationConfig.ctaButton.label}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
