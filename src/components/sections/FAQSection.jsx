import SectionHeading from '../ui/SectionHeading'
import FAQAccordion from '../ui/FAQAccordion'

export default function FAQSection({ items }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title="Frequently Asked Questions" />
        <FAQAccordion items={items} />
      </div>
    </section>
  )
}
