import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700',
  secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50',
  outline: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
}

const MotionLink = motion(Link)

export default function Button({ label, path, variant = 'primary', className = '', onClick }) {
  const base = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center cursor-pointer relative overflow-hidden'

  const motionProps = {
    whileHover: { scale: 1.04, y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  }

  if (onClick) {
    return (
      <motion.button
        {...motionProps}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {label}
      </motion.button>
    )
  }

  return (
    <MotionLink
      {...motionProps}
      to={path}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {label}
    </MotionLink>
  )
}
