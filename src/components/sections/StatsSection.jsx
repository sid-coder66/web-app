import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

export default function StatsSection({ stats }) {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-green-600 to-green-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
              className="relative text-center px-6 sm:px-10 py-6 w-1/2 sm:w-auto"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-green-100 text-xs sm:text-sm max-w-[150px] sm:max-w-[180px] mx-auto leading-snug">
                {stat.label}
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-green-400/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
