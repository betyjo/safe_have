import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Donate' }

export default function DonatePage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d6b75] mb-4">Support SAFEHAVEN</h1>
        <p className="text-gray-600 text-lg mb-10">
          Your contribution helps us maintain the platform, train caseworkers, and expand our network of verified support providers.
        </p>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-10 text-sm text-yellow-800">
          <strong>Payment integration coming soon.</strong> Online donations are not yet enabled. This page will be updated once a verified payment provider is configured. In the meantime, please reach out via the <Link href="/contact" className="underline">contact page</Link> if you wish to support us directly.
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { emoji: '🧑‍💻', title: 'Platform maintenance', desc: 'Keeps the platform secure, fast, and accessible to survivors.' },
            { emoji: '🧑‍🏫', title: 'Caseworker training', desc: 'Funds trauma-informed training for the people who review reports.' },
            { emoji: '🤝', title: 'Provider verification', desc: 'Supports the process of verifying and onboarding support organisations.' },
            { emoji: '📢', title: 'Community outreach', desc: 'Helps us reach survivors who might not know support exists.' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h2 className="font-semibold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#e0f2f4] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[#0d6b75] mb-2">Other ways to help</h2>
          <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
            <li>Volunteer your time and skills — <Link href="/volunteer" className="text-[#0d6b75] underline">see volunteering opportunities</Link>.</li>
            <li>Share the platform with someone who might need it.</li>
            <li>Partner with us as a verified service provider — <Link href="/contact" className="text-[#0d6b75] underline">contact us</Link>.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
