'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { QuickExit } from '@/components/layout/QuickExit'

const ABUSE_TYPES = [
  { value: 'physical', label: 'Physical abuse' },
  { value: 'sexual', label: 'Sexual abuse' },
  { value: 'emotional', label: 'Emotional or psychological abuse' },
  { value: 'economic', label: 'Economic or financial abuse' },
  { value: 'digital', label: 'Digital or online abuse' },
  { value: 'other', label: 'Unsure / other' },
]

export default function ThirdPartyReportPage() {
  const [abuseType, setAbuseType] = useState('')
  const [description, setDescription] = useState('')
  const [reporterContact, setReporterContact] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!acknowledged) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_type: abuseType || 'other',
          description,
          reporter_contact: reporterContact || undefined,
          acknowledge_disclaimer: true,
          is_third_party: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to submit. Please try again.')
      } else {
        setReference(data.reference)
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="flex-1 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Concern submitted</h1>
          <p className="text-gray-600 mb-4">Thank you for caring enough to reach out. A trained caseworker will review your submission.</p>
          {reference && (
            <div className="bg-[#e0f2f4] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Reference number</p>
              <p className="text-2xl font-mono font-bold text-[#0d6b75]">{reference}</p>
            </div>
          )}
          <Link href="/" className="text-[#0d6b75] underline text-sm">Return to home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">I&apos;m concerned about someone</h1>
          <QuickExit />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-sm text-blue-800">
          <p className="font-semibold mb-1">About third-party reports</p>
          <p>This form is for reporting concerns about someone else. You can remain completely anonymous. The caseworker who reviews this report will treat it as a concern to investigate — it does not automatically verify or confirm any allegations.</p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="abuse-type" className="block text-sm font-medium text-gray-700 mb-1">
              Type of abuse suspected
            </label>
            <select id="abuse-type" value={abuseType} onChange={e => setAbuseType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]">
              <option value="">Select…</option>
              {ABUSE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              What you have observed or are concerned about <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">Describe only what you have directly observed or what the person has told you. Avoid speculation beyond what you know.</p>
            <textarea
              id="description"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="Describe your concern…"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]"
            />
          </div>

          <div>
            <label htmlFor="reporter-contact" className="block text-sm font-medium text-gray-700 mb-1">
              Your contact information (optional)
            </label>
            <input id="reporter-contact" type="text" value={reporterContact} onChange={e => setReporterContact(e.target.value)}
              placeholder="Email or phone — only if you are comfortable sharing"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
            <p className="text-xs text-gray-500 mt-1">Leave blank to submit anonymously. Your details will never be shared with the person the report is about.</p>
          </div>

          <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${acknowledged ? 'border-[#0d6b75] bg-[#e0f2f4]' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="checkbox" required checked={acknowledged} onChange={e => setAcknowledged(e.target.checked)} className="mt-0.5 accent-[#0d6b75]" />
            <p className="text-sm text-gray-700">
              I understand that this report will be reviewed by a caseworker and is <strong>not automatically treated as verified evidence</strong>. I have submitted this in good faith based on genuine concern.
            </p>
          </label>

          <div className="flex justify-between pt-4 border-t border-gray-100">
            <Link href="/report" className="text-sm font-medium text-gray-600 hover:text-gray-900">← Back</Link>
            <button
              type="submit"
              disabled={loading || !acknowledged || description.trim().length < 10}
              className="h-10 px-6 bg-[#0d6b75] hover:bg-[#094d55] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-40"
            >
              {loading ? 'Submitting…' : 'Submit concern'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
