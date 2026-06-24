import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle, centered = true, light = false }) {
  const words = title.split(' ')

  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Animated underline accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.6, delay: words.length * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`h-1 w-16 bg-gradient-to-r from-green-500 to-green-300 rounded-full mb-5 origin-left ${centered ? 'mx-auto' : ''}`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.5, delay: words.length * 0.07 + 0.1 }}
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-200' : 'text-gray-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
