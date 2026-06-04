import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function BlogCard({ slug, title, category, image }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
    >
      <div className="h-52 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/20 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <span className="inline-block bg-green-50 text-green-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">{category}</span>
        <h3 className="text-lg font-bold text-gray-900 mt-3 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">{title}</h3>
        <Link to={`/blog/${slug}`} className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
          Read More <span>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  )
}
