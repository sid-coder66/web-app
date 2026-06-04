import { useState } from 'react'
import { motion } from 'framer-motion'
import siteConfig from '../../config/siteConfig'

export default function NewsletterSignup({ variant = 'default' }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Subscribed: ${email}`)
    setEmail('')
  }

  const isFullWidth = variant === 'banner'
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${isFullWidth ? 'bg-gradient-to-r from-green-700 to-green-600 py-16' : 'py-12'}`}
    >
      <div className="max-w-xl mx-auto text-center px-4">
        <h3 className={`text-2xl font-bold mb-3 ${isFullWidth ? 'text-white' : 'text-gray-900'}`}>
          {siteConfig.newsletter.heading}
        </h3>
        <p className={`mb-6 ${isFullWidth ? 'text-green-100' : 'text-gray-600'}`}>
          {siteConfig.newsletter.description}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition-colors"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
