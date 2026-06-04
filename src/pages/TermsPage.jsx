import legalContent from '../config/legalContent'

export default function TermsPage() {
  const { title, sections } = legalContent.terms
  return (
    <section className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        {sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{s.heading}</h2>
            <p className="text-gray-600">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
