import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

export default function StatsSection({ stats }) {
  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
      {/* Background decorative circles */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-black/10 blur-3xl" />

      {/* Floating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              className="relative text-center px-8 sm:px-12 py-8 w-1/2 sm:w-auto cursor-default"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-sm">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-green-100 text-xs sm:text-sm max-w-[150px] sm:max-w-[180px] mx-auto leading-snug">
                {stat.label}
              </div>

              {i < stats.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.18 + 0.3 }}
                  className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-gradient-to-b from-transparent via-green-300/50 to-transparent origin-top"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
