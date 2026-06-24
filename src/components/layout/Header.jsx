import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { motion, useScroll, useSpring } from 'framer-motion'
import siteConfig from '../../config/siteConfig'
import navigationConfig from '../../config/navigationConfig'
import { openCalendly } from '../../hooks/useCalendly'
import MobileMenu from './MobileMenu'

const LIGHT_BG_PAGES = ['/', '/contact-us', '/get-in-touch', '/terms', '/privacy']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  const forceSolid = LIGHT_BG_PAGES.includes(pathname)
  const isSolid = forceSolid || scrolled

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      if (currentY > 100) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolid ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 origin-left"
      />

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={siteConfig.logo}
            alt={siteConfig.companyName}
            className="h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
          <div>
            <span className="font-bold text-xl">
              <span className="text-green-800">Comply</span>
              <span className="text-[#71B850]">Wise</span>
            </span>
            <span className={`block text-xs transition-colors duration-300 ${isSolid ? 'text-gray-500' : 'text-white/70'}`}>
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navigationConfig.mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 group/link ${
                  isSolid
                    ? isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                    : isActive ? 'text-green-400' : 'text-white hover:text-green-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 rounded-full"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: isActive ? 0 : 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                </>
              )}
            </NavLink>
          ))}
          <motion.button
            onClick={openCalendly}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isSolid
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-green-200 hover:shadow-md'
                : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
            }`}
          >
            {navigationConfig.ctaButton.label}
          </motion.button>
        </nav>

        <button onClick={() => setMobileOpen(true)} className={`lg:hidden text-2xl transition-colors duration-300 ${isSolid ? 'text-gray-700' : 'text-white'}`}>
          <FaBars />
        </button>
      </div>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  )
}
