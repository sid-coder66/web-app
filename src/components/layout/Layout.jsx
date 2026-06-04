import Header from './Header'
import Footer from './Footer'
import useScrollToTop from '../../hooks/useScrollToTop'

export default function Layout({ children }) {
  useScrollToTop()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
