import type { Metadata } from 'next'
import { QuickExit } from '@/components/layout/QuickExit'

export const metadata: Metadata = {
  title: 'Safety & Privacy',
}

export default function SafetyPage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-[#0d6b75]">Safety &amp; Privacy</h1>
          <QuickExit />
        </div>
        <p className="text-gray-600 text-lg mb-12">
          Your safety is our highest priority. This page explains how to use SAFEHAVEN
          as safely as possible, what we collect, and your rights.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Exit button</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-4">
            <p className="text-yellow-900 text-sm font-medium mb-2">
              The red Quick Exit button appears in the navigation bar on every page.
            </p>
            <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
              <li>Clicking it immediately navigates your browser to Google.</li>
              <li>It works as fast as possible — useful if someone enters the room unexpectedly.</li>
              <li>
                <strong>It does not erase your browser history.</strong> Your visit to this site will
                still appear in your browser history unless you clear it manually.
              </li>
            </ul>
          </div>
          <p className="text-gray-700 text-sm">
            To leave no trace in browser history, use a private or incognito window before visiting
            this site. Close the window when you are done — private windows do not save history.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser history warning</h2>
          <p className="text-gray-700 mb-3">
            Your web browser automatically stores a record of every website you visit. If someone
            else has access to your device, they can see this list unless you take steps to prevent it.
          </p>
          <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
            <li>Use a private/incognito window (Ctrl+Shift+N in Chrome, Ctrl+Shift+P in Firefox).</li>
            <li>Alternatively, clear your browser history after your visit (usually in Settings → History).</li>
            <li>Consider using a device that is not shared with the person you are concerned about.</li>
            <li>A library computer or a trusted friend&apos;s device is a safer option if yours is monitored.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What data we collect</h2>
          <div className="space-y-4">
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">If you submit a report anonymously</h3>
              <p className="text-gray-600 text-sm">
                We store only the information you enter in the form — your description of events,
                the type of abuse, and optional details like approximate date and area. We do not
                record your IP address in the report itself, though standard server logs may capture
                connection metadata temporarily.
              </p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">If you create an account</h3>
              <p className="text-gray-600 text-sm">
                We store your email address, chosen display name, and role. We use this to link
                your reports to your account so a caseworker can follow up with you. Your password
                is never stored in plain text.
              </p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">If you consent to contact</h3>
              <p className="text-gray-600 text-sm">
                If you explicitly choose to allow follow-up contact, we store your preferred contact
                method. You can withdraw this consent at any time from your account settings.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Anonymity limitations</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="text-red-800 text-sm mb-3 font-medium">
              Full anonymity cannot be guaranteed in all circumstances.
            </p>
            <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
              <li>Web servers log connection information (IP addresses) as a standard technical process.</li>
              <li>If you are legally compelled to disclose your actions, your visit records may be retrievable from device or network logs.</li>
              <li>Submitting a report does not trigger any automatic disclosure to law enforcement, but serious disclosures may carry mandatory reporting obligations depending on jurisdiction.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Safe browsing tips</h2>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li>Use private/incognito browsing mode whenever you visit this site.</li>
            <li>Do not save your SAFEHAVEN password in a shared browser.</li>
            <li>Log out after every session if you use an account.</li>
            <li>Be aware of anyone watching your screen (screen-peeking risk).</li>
            <li>If you use email for contact, consider a new email account that the person you are concerned about does not know about.</li>
            <li>Use a VPN or the Tor browser if you need an extra layer of privacy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your rights</h2>
          <p className="text-gray-700 mb-3">
            If you have created an account, you can request to have your data deleted at any time
            by contacting us through the{' '}
            <a href="/contact" className="text-[#0d6b75] underline">contact page</a>.
            Anonymous reports cannot be linked back to you once submitted without an account.
          </p>
        </section>
      </div>
    </main>
  )
}
