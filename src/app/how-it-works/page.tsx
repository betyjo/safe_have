import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works',
}

const steps = [
  {
    number: 1,
    title: 'Submit a report',
    description:
      'Complete a confidential report at your own pace. You can report abuse you experienced directly, or raise concerns about someone else. No account is required — you can remain completely anonymous. The form asks only what is relevant and skips questions you are not comfortable answering.',
    action: { label: 'Start a report', href: '/report' },
  },
  {
    number: 2,
    title: 'Caseworker review',
    description:
      'Once submitted, a trained caseworker reviews your report. They assess the situation, identify the most appropriate support services, and determine next steps. All caseworkers follow a strict code of conduct and treat every report with confidentiality and respect.',
    action: null,
  },
  {
    number: 3,
    title: 'Connection to support',
    description:
      'The caseworker refers your case to one or more verified service providers — such as emergency shelters, legal advisors, healthcare professionals, or counsellors. If you consented to contact, they will reach out using your preferred method. If you chose to remain anonymous, support options are communicated through the platform.',
    action: { label: 'Find support services', href: '/find-support' },
  },
  {
    number: 4,
    title: 'Recovery and independence',
    description:
      'Support does not stop at crisis response. SAFEHAVEN connects survivors with resources to rebuild financial independence, access training and employment opportunities, and find stable housing. Volunteers and community partners play an active role in this stage.',
    action: { label: 'Rebuild resources', href: '/rebuild' },
  },
]

export default function HowItWorksPage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d6b75] mb-4">How it works</h1>
        <p className="text-gray-600 text-lg mb-12">
          SAFEHAVEN guides you through a clear, safe process — from first report to long-term support.
        </p>

        <div className="space-y-10">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#0d6b75] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{step.number}</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{step.description}</p>
                {step.action && (
                  <Link
                    href={step.action.href}
                    className="inline-flex items-center text-sm font-semibold text-[#0d6b75] hover:underline"
                  >
                    {step.action.label} →
                  </Link>
                )}
                {step.number < steps.length && (
                  <div className="mt-6 border-b border-gray-100" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800 font-semibold mb-1">If you are in immediate danger</p>
          <p className="text-red-700 text-sm">
            Do not wait to submit a report. Call your local emergency services immediately.
            SAFEHAVEN does not provide emergency response — it is a support and coordination platform.
          </p>
        </div>
      </div>
    </main>
  )
}
