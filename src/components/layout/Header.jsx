import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import siteConfig from '../../config/siteConfig'
import navigationConfig from '../../config/navigationConfig'
import { openCalendly } from '../../hooks/useCalendly'
import MobileMenu from './MobileMenu'

// Pages without a dark hero background need the header in solid mode
const LIGHT_BG_PAGES = ['/', '/contact-us', '/get-in-touch', '/terms', '/privacy']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  // Force solid header on pages with light backgrounds (no hero image)
  const forceSolid = LIGHT_BG_PAGES.includes(pathname)
  const isSolid = forceSolid || scrolled

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      // Hide header on scroll down, show on scroll up
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={siteConfig.logo} alt={siteConfig.companyName} className="h-12" />
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

        <nav className="hidden md:flex items-center gap-8">
          {navigationConfig.mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-300 ${
                  isSolid
                    ? isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                    : isActive ? 'text-green-400' : 'text-white hover:text-green-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={openCalendly}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isSolid
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
            }`}
          >
            {navigationConfig.ctaButton.label}
          </button>
        </nav>

        <button onClick={() => setMobileOpen(true)} className={`md:hidden text-2xl transition-colors duration-300 ${isSolid ? 'text-gray-700' : 'text-white'}`}>
          <FaBars />
        </button>
      </div>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
