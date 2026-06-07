import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FaIcons from 'react-icons/fa'

export default function ServiceCard({ title, description, link, icon }) {
  const IconComponent = FaIcons[icon]
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl shadow-md p-8 hover:shadow-2xl transition-shadow duration-300 group"
    >
      {IconComponent && (
        <div className="w-14 h-14 bg-green-50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors duration-300">
          <IconComponent className="text-green-600 text-2xl group-hover:text-white transition-colors duration-300" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* <Link to={link} className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all duration-300">
        Read More <span className="text-lg">&rarr;</span>
      </Link> */}
    </motion.div>
  )
}
