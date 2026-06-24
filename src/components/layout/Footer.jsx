import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import siteConfig from '../../config/siteConfig'
import OfficeCard from '../ui/OfficeCard'

export default function Footer() {
  const cols = [
    { delay: 0 },
    { delay: 0.08 },
    { delay: 0.16 },
    { delay: 0.24 },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-600/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.55, delay: cols[0].delay }}
          >
            <h3 className="text-white font-bold text-lg mb-4">{siteConfig.companyName}</h3>
            <p className="text-sm text-gray-400">{siteConfig.description}</p>
            <div className="flex gap-4 mt-6">
              <motion.a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#ffffff' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.55, delay: cols[1].delay }}
          >
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { to: '/about-us', label: 'About Us' },
                { to: '/leadership-team', label: 'Team' },
                { to: '/blog', label: 'Blog' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:pl-1 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.55, delay: cols[2].delay }}
          >
            <h4 className="text-white font-bold mb-4">Offices</h4>
            <div className="space-y-4">
              {siteConfig.offices.map((office) => (
                <OfficeCard key={office.country} {...office} />
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.55, delay: cols[3].delay }}
          >
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="mailto:thecomplywise@gmail.com" className="block hover:text-white transition-colors duration-200 underline underline-offset-2">
                thecomplywise@gmail.com
              </a>
              <p>+91 9993114795</p>
              <p>+44 7823616522</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-800 pt-8 flex justify-center"
        >
          <p className="text-sm text-gray-500">
            &copy;2026 {siteConfig.companyName} {siteConfig.tagline}, All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
