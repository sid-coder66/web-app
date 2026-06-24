import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
            openIndex === i
              ? 'border-green-300 shadow-md shadow-green-50'
              : 'border-gray-200 hover:border-green-200 bg-white'
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors duration-200 ${
              openIndex === i ? 'text-green-700 bg-green-50/60' : 'text-gray-900 hover:text-green-700 bg-white'
            }`}
          >
            <span className="pr-4">{item.question}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex-shrink-0"
            >
              <FaChevronDown className={`text-sm transition-colors duration-200 ${openIndex === i ? 'text-green-600' : 'text-gray-400'}`} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { type: 'spring', stiffness: 200, damping: 28 }, opacity: { duration: 0.2 } }}
              >
                <div className="px-5 pb-5 pt-1 text-gray-600 leading-relaxed text-sm sm:text-base border-t border-green-100">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
