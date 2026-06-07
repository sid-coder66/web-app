import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '../ui/Button'
import { openCalendly } from '../../hooks/useCalendly'

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function AnimatedTitle({ text }) {
  const lines = text.split('\n')
  let wordIndex = 0
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word) => {
            const idx = wordIndex++
            return (
              <motion.span
                key={idx}
                custom={idx}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            )
          })}
        </span>
      ))}
    </>
  )
}

export default function HeroSection({ title, subtitle, ctas, backgroundImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -50])

  const hasBackground = !!backgroundImage

  const formatText = (text) =>
    text?.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ))

  if (!hasBackground) {
    return (
      <section ref={ref} className="relative overflow-hidden -mt-20 pt-20 bg-white">
        {/* Decorative green blob */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-green-50 opacity-60 blur-2xl" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-20 w-full"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-4"
              >
                Offshore Audit & Accounting Partner
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                <AnimatedTitle text={title} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed"
              >
                {formatText(subtitle)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap gap-3 sm:gap-4"
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

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-8 border-t border-gray-100"
              >
                {['Big-4 Experienced Team', 'GDPR Compliant', '3-Day Turnaround'].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: video */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mt-6 md:mt-0"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-green-200 to-green-50 rounded-2xl blur-xl opacity-60" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100 ring-1 ring-green-100">
                <video
                  className="w-full h-full object-cover"
                  controls
                  controlsList="nodownload"
                  playsInline
                >
                  <source src="/videos/COMPLYWISE_VSL_MASTER_VIDEO_GE.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden -mt-20">
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24 w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl drop-shadow-lg">
          <AnimatedTitle text={title} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md"
        >
          {formatText(subtitle)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
