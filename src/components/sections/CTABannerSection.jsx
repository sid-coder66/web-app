import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '../ui/Button'
import { openCalendly } from '../../hooks/useCalendly'

export default function CTABannerSection({ heading, image, ctaLabel, ctaPath }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const words = heading?.split(' ') || []

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-15%] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: words.length * 0.07 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Button label={ctaLabel || 'Get In Touch'} onClick={openCalendly} variant="outline" />
        </motion.div>
      </div>
    </section>
  )
}
