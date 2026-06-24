import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Button from '../ui/Button'
import { openCalendly } from '../../hooks/useCalendly'

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
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

function FloatingOrb({ className, animate, transition }) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  )
}

export default function HeroSection({ title, subtitle, ctas, backgroundImage }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -60])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const formatText = (text) =>
    text?.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ))

  if (!backgroundImage) {
    return (
      <section ref={ref} className="relative overflow-hidden -mt-20 pt-20 bg-white">
        {/* Animated dot grid */}
        <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#166534" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Animated gradient sweep line */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
          className="pointer-events-none absolute top-1/3 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-60"
        />
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5, delay: 2 }}
          className="pointer-events-none absolute top-2/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-40"
        />

        {/* Floating background orbs */}
        <FloatingOrb
          className="w-[600px] h-[600px] -top-48 -right-48 bg-green-100 opacity-50"
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] -bottom-24 -left-24 bg-emerald-50 opacity-70"
          animate={{ scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <FloatingOrb
          className="w-[200px] h-[200px] top-1/2 left-1/3 bg-green-200 opacity-20"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating green particles */}
        {[
          { top: '20%', left: '8%', delay: 0, duration: 6 },
          { top: '55%', left: '15%', delay: 1.5, duration: 8 },
          { top: '75%', left: '40%', delay: 0.8, duration: 7 },
          { top: '30%', left: '60%', delay: 2.2, duration: 9 },
          { top: '65%', left: '75%', delay: 0.3, duration: 6.5 },
        ].map((p, i) => (
          <motion.span
            key={i}
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -18, 0], opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute w-2 h-2 rounded-full bg-green-400"
          />
        ))}

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-20 w-full"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-4"
              >
                Offshore Audit &amp; Accounting Partner
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                <AnimatedTitle text={title} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed"
              >
                {formatText(subtitle)}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
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

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.6 }}
                className="flex flex-wrap gap-4 sm:gap-6 mt-8 pt-8 border-t border-gray-100"
              >
                {['Big-4 Experienced Team', 'GDPR Compliant', '3-Day Turnaround'].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-500"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, delay: 1.5 + i * 0.3, repeat: Infinity, repeatDelay: 3 }}
                      className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                    />
                    {badge}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: video with glow + tilt on scroll */}
            <motion.div
              initial={{ opacity: 0, x: 70, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative mt-6 md:mt-0"
            >
              {/* Glow halo */}
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-4 bg-gradient-to-br from-green-300 to-emerald-200 rounded-3xl blur-2xl"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-green-100 h-[420px] sm:h-[480px] md:h-[520px]">
                <video
                  className="w-full h-full object-cover object-center"
                  controls
                  controlsList="nodownload"
                  playsInline
                >
                  <source src="/videos/hero-web.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Floating badge on video */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-2 border border-green-100"
              >
                <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Trusted by growing firms</span>
              </motion.div>
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
