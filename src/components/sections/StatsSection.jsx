import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import StaggerContainer from '../ui/StaggerContainer'

export default function StatsSection({ stats }) {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <StaggerContainer className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.15}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
            }}
            className="text-center p-6 relative"
          >
            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
            {i < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-300" />
            )}
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  )
}
