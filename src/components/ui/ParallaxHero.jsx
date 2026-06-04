import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxHero({ backgroundImage, overlay, children, minHeight = '600px' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden flex items-center" style={{ minHeight }}>
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
      />
      <div className={`absolute inset-0 ${overlay || 'bg-gradient-to-r from-green-950/90 to-green-900/70'}`} />
      <motion.div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full" style={{ opacity: contentOpacity }}>
        {children}
      </motion.div>
    </section>
  )
}
