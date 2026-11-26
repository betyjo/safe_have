import type { Metadata } from 'next'
import Link from 'next/link'
import { QuickExit } from '@/components/layout/QuickExit'

export const metadata: Metadata = { title: 'Report Abuse' }

export default function ReportPage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-[#0d6b75]">Report abuse</h1>
          <QuickExit />
        </div>

        <p className="text-gray-600 text-lg mb-4">
          Your report will be reviewed by a trained caseworker. You can remain anonymous.
          No information will be shared without your consent.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-10 text-sm text-yellow-800">
          <strong>If you are in immediate danger</strong> — do not wait to submit a report. Call your local emergency services now.
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Direct report */}
          <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm p-8 flex flex-col">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">I experienced abuse</h2>
            <p className="text-gray-600 text-sm mb-6 flex-1">
              Submit a direct report about abuse you have personally experienced. You are in
              control of what you share and how you can be contacted.
            </p>
            <Link
              href="/report/direct"
              className="inline-flex items-center justify-center h-11 px-6 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Start a direct report
            </Link>
          </div>

          {/* Third-party report */}
          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-8 flex flex-col">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">I&apos;m concerned about someone</h2>
            <p className="text-gray-600 text-sm mb-6 flex-1">
              Report on behalf of someone you believe may be experiencing abuse.
              You can remain anonymous. This report will be reviewed carefully.
            </p>
            <Link
              href="/report/third-party"
              className="inline-flex items-center justify-center h-11 px-6 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Submit a concern
            </Link>
          </div>
        </div>

        <div className="bg-[#f8faf9] rounded-xl p-6 space-y-3">
          <h3 className="font-semibold text-gray-900">What happens after you report?</h3>
          <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
            <li>Your report is securely received and assigned to a trained caseworker.</li>
            <li>The caseworker reviews the report and assesses urgency.</li>
            <li>If you consented to contact, they will reach out using your chosen method.</li>
            <li>Appropriate referrals to support services are made with your consent.</li>
          </ol>
          <p className="text-gray-500 text-xs pt-2">
            Submitting a report does not automatically trigger contact with law enforcement unless required by mandatory reporting obligations in your jurisdiction.
          </p>
        </div>
      </div>
    </main>
  )
}
