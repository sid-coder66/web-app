import { Link } from 'react-router-dom'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import siteConfig from '../../config/siteConfig'
import navigationConfig from '../../config/navigationConfig'
import { openCalendly } from '../../hooks/useCalendly'
import OfficeCard from '../ui/OfficeCard'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand + Description + Socials */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{siteConfig.companyName}</h3>
            <p className="text-sm text-gray-400">{siteConfig.description}</p>
            <div className="flex gap-4 mt-6">
              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/leadership-team" className="text-sm text-gray-400 hover:text-white transition-colors">Team</Link>
              </li>
            </ul>
          </div>

          {/* Office Addresses */}
          <div>
            <h4 className="text-white font-bold mb-4">Offices</h4>
            <div className="space-y-4">
              {siteConfig.offices.map((office) => (
                <OfficeCard key={office.country} {...office} />
              ))}
            </div>
          </div>

          {/* Newsletter + Get Started */}
          <div>
            <h4 className="text-white font-bold mb-2">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Sign up for industry alerts, deals, news and insights from us.
            </p>
            <button
              onClick={openCalendly}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy;2026 {siteConfig.companyName} {siteConfig.tagline}, All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {navigationConfig.footerLinks.legal.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-gray-500 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
