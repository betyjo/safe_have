import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d6b75] mb-6">About SAFEHAVEN</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SAFEHAVEN exists to give every survivor of gender-based violence a safe, dignified,
            and confidential way to seek help. We believe that every person deserves access to
            support regardless of their circumstances, and that technology can lower the barriers
            that prevent survivors from coming forward.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We connect people in need with verified support organisations, trained caseworkers,
            and community resources — all within a platform designed with safety and privacy first.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What we do</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[#0d6b75] font-bold flex-shrink-0">→</span>
              <span>Provide a secure, anonymous reporting pathway for survivors of abuse.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0d6b75] font-bold flex-shrink-0">→</span>
              <span>Connect people with verified service providers across emergency, healthcare, legal, counselling, shelter, and financial categories.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0d6b75] font-bold flex-shrink-0">→</span>
              <span>Support survivors in rebuilding independence through training, employment, and housing resources.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#0d6b75] font-bold flex-shrink-0">→</span>
              <span>Enable community members to volunteer and support the work of caseworkers and service providers.</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Safety first</h3>
              <p className="text-gray-600 text-sm">Every design decision prioritises the physical and digital safety of the people using this platform.</p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Dignity and respect</h3>
              <p className="text-gray-600 text-sm">Survivors are believed and treated with compassion. We never re-traumatise through unnecessarily intrusive processes.</p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Privacy by design</h3>
              <p className="text-gray-600 text-sm">We collect only what is necessary and give users control over their information and how they are contacted.</p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Community-led</h3>
              <p className="text-gray-600 text-sm">We work in partnership with local organisations, volunteers, and community members who understand the context on the ground.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#e0f2f4] rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[#0d6b75] mb-2">Demonstration platform</h2>
          <p className="text-gray-700 text-sm">
            SAFEHAVEN is currently in active development. Some features, service provider listings,
            and integrations represent demonstration content and may not reflect live operational data.
            If you are in a real emergency, please contact your local emergency services or a trusted
            support organisation directly.
          </p>
        </section>
      </div>
    </main>
  )
}
