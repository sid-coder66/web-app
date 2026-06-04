import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import ServicePage from './pages/ServicePage'
import ContactPage from './pages/ContactPage'
import GetInTouchPage from './pages/GetInTouchPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/leadership-team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/get-in-touch" element={<GetInTouchPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="*" element={<div className="py-20 text-center text-2xl">404 — Page Not Found</div>} />
      </Routes>
    </Layout>
  )
}
