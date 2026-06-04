import { motion } from 'framer-motion'
import { openCalendly } from '../../hooks/useCalendly'

export default function MethodologySection({ heading, subheading, description, description2, description3, videoImage, videoUrl }) {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {subheading && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {subheading}
            </span>
          )}
          {!subheading && (
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Our Approach</span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{heading}</h2>
          {description && <p className="text-gray-600 text-lg leading-relaxed mb-4">{description}</p>}
          {description2 && <p className="text-gray-600 text-lg leading-relaxed mb-4">{description2}</p>}
          {description3 && <p className="text-gray-600 text-lg leading-relaxed mb-6">{description3}</p>}
          <button
            onClick={openCalendly}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
          >
            Schedule a Meeting
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {videoImage ? (
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img src={videoImage} alt="Methodology" className="w-full h-auto object-cover" />
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-green-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
              )}
            </div>
          ) : videoUrl ? (
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-200">
              <iframe
                src={videoUrl}
                title="Methodology Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Video coming soon</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
