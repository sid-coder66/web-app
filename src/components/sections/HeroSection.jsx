import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '../ui/Button'
import { openCalendly } from '../../hooks/useCalendly'

export default function HeroSection({ title, subtitle, ctas, backgroundImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -50])

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden -mt-20">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
      />
      {/* Light overlay — image stays clearly visible like CapacityHive */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-24 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl drop-shadow-lg"
          >
            {title}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap gap-4"
        >
          {ctas?.map((cta, i) => (
            <Button
              key={i}
              label={cta.label}
              path={cta.calendly ? undefined : cta.path}
              onClick={cta.calendly ? openCalendly : undefined}
              variant={i === 0 ? 'primary' : 'outline'}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </section>
  )
}
