import Button from '../ui/Button'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import { openCalendly } from '../../hooks/useCalendly'

export default function CTABannerSection({ heading, image, ctaLabel, ctaPath }) {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <AnimateOnScroll animation="fadeUp">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{heading}</h2>
          <Button label={ctaLabel || 'Get In Touch'} onClick={openCalendly} variant="outline" />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
