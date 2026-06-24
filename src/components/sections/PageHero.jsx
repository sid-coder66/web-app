import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function PageHero({ title, breadcrumb, backgroundImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40])

  const words = title?.split(' ') || []

  return (
    <section ref={ref} className="relative min-h-[500px] flex items-end overflow-hidden -mt-20">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-15%] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />

      <motion.div style={{ y: contentY }} className="relative z-10 w-full text-center pb-16 pt-32">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: words.length * 0.09 + 0.1 }}
            className="text-white/80 text-sm"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>{breadcrumb}</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
