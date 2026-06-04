import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PageHero({ title, breadcrumb, backgroundImage }) {
  return (
    <section className="relative min-h-[500px] flex items-end overflow-hidden -mt-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Subtle overlay matching CapacityHive */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/45" />

      <div className="relative z-10 w-full text-center pb-16 pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
        >
          {title}
        </motion.h1>
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/80 text-sm"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>{breadcrumb}</span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
