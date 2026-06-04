import { FaQuoteLeft } from 'react-icons/fa'
import AnimateOnScroll from './AnimateOnScroll'

export default function TestimonialCard({ quote, author, role, company }) {
  return (
    <AnimateOnScroll animation="fadeUp">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
        <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
        <p className="text-gray-700 text-lg italic mb-6">{quote}</p>
        <div>
          <span className="font-bold text-gray-900">{author}</span>
          <span className="text-gray-500"> — {role}, {company}</span>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
