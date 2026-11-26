import Link from 'next/link'
import { QuickExit } from '@/components/layout/QuickExit'

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[#0d6b75] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            You are not alone. Help is here.
          </h1>
          <p className="text-xl text-[#e0f2f4] mb-8 max-w-2xl mx-auto">
            SAFEHAVEN provides a confidential, secure space to report abuse, access support services,
            and begin the journey toward safety and recovery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/report"
              className="inline-flex items-center justify-center h-12 px-8 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition-colors text-base"
            >
              Report Abuse Safely
            </Link>
            <Link
              href="/find-support"
              className="inline-flex items-center justify-center h-12 px-8 bg-white text-[#0d6b75] hover:bg-[#e0f2f4] font-semibold rounded-lg transition-colors text-base"
            >
              Find Support
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="py-16 px-4 bg-[#f8faf9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Report Abuse Safely</h2>
              <p className="text-gray-600 mb-6 flex-1">
                Submit a confidential report about abuse you experienced or witnessed.
                You can remain anonymous.
              </p>
              <Link
                href="/report"
                className="inline-flex items-center justify-center h-10 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Start a Report
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#e0f2f4] rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Find Support</h2>
              <p className="text-gray-600 mb-6 flex-1">
                Connect with verified support organisations offering emergency help,
                healthcare, legal aid, counselling, shelter, and financial assistance.
              </p>
              <Link
                href="/find-support"
                className="inline-flex items-center justify-center h-10 px-4 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Browse Services
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Rebuild Independence</h2>
              <p className="text-gray-600 mb-6 flex-1">
                Access resources for financial independence, training, employment, housing,
                and volunteering opportunities.
              </p>
              <Link
                href="/rebuild"
                className="inline-flex items-center justify-center h-10 px-4 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-10 px-4 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Your safety while using this site</h3>
              <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                <li>
                  The <strong>Quick Exit</strong> button (red button in the navigation bar) will immediately
                  navigate you to Google if you need to leave quickly.
                </li>
                <li>
                  Quick Exit does <strong>not</strong> erase your browser history. Use private/incognito
                  mode to avoid leaving traces, or clear your history manually afterwards.
                </li>
                <li>
                  You can submit reports without creating an account to protect your anonymity.
                </li>
              </ul>
              <div className="mt-3">
                <QuickExit />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#e0f2f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d6b75]">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit a report</h3>
              <p className="text-gray-600 text-sm">
                Complete a confidential report at your own pace. No account required.
                Your privacy is protected throughout.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#e0f2f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d6b75]">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Caseworker review</h3>
              <p className="text-gray-600 text-sm">
                A trained caseworker reviews your report and identifies the most
                appropriate support services.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#e0f2f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0d6b75]">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect & recover</h3>
              <p className="text-gray-600 text-sm">
                Get connected with verified support organisations and begin
                your path toward safety and independence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="py-8 px-4 bg-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-semibold text-lg">
            If you are in immediate danger, call emergency services immediately.
          </p>
          <p className="text-red-200 text-sm mt-1">
            This platform does not provide emergency response. Please contact your local emergency number.
          </p>
        </div>
      </section>
    </main>
  )
}
