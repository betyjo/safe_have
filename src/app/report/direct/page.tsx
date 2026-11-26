'use client'

import { useState } from 'react'
import Link from 'next/link'
import { QuickExit } from '@/components/layout/QuickExit'

type AbuseType = 'physical' | 'sexual' | 'emotional' | 'economic' | 'digital' | 'other'

const ABUSE_TYPES: { value: AbuseType; label: string }[] = [
  { value: 'physical', label: 'Physical abuse' },
  { value: 'sexual', label: 'Sexual abuse' },
  { value: 'emotional', label: 'Emotional or psychological abuse' },
  { value: 'economic', label: 'Economic or financial abuse' },
  { value: 'digital', label: 'Digital or online abuse' },
  { value: 'other', label: 'Other' },
]

const TOTAL_STEPS = 5

export default function DirectReportPage() {
  const [step, setStep] = useState(1)
  const [abuseTypes, setAbuseTypes] = useState<AbuseType[]>([])
  const [description, setDescription] = useState('')
  const [incidentDate, setIncidentDate] = useState('')
  const [location, setLocation] = useState('')
  const [inDanger, setInDanger] = useState<boolean | null>(null)
  const [consentToContact, setConsentToContact] = useState(false)
  const [contactMethod, setContactMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState('')
  const [error, setError] = useState('')

  function toggleType(t: AbuseType) {
    setAbuseTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function canProceed(): boolean {
    if (step === 1) return abuseTypes.length > 0 && description.trim().length >= 10
    if (step === 3) return inDanger !== null
    return true
  }

  async function handleSubmit() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_type: abuseTypes[0] ?? 'other',
          description,
          incident_date: incidentDate || undefined,
          location: location || undefined,
          currently_in_danger: inDanger ?? false,
          consent_to_contact: consentToContact,
          safe_contact_method: consentToContact && contactMethod ? contactMethod : 'none',
          is_third_party: false,
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
      setError('Network error. Please check your connection and try again.')
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
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Report submitted</h1>
          <p className="text-gray-600 mb-4">Thank you for trusting SAFEHAVEN. Your report has been received and will be reviewed by a trained caseworker.</p>
          {reference && (
            <div className="bg-[#e0f2f4] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Your reference number</p>
              <p className="text-2xl font-mono font-bold text-[#0d6b75]">{reference}</p>
              <p className="text-xs text-gray-500 mt-1">Save this if you want to follow up. Do not share it with anyone.</p>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Report abuse</h1>
          <QuickExit />
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? 'bg-[#0d6b75]' : 'bg-gray-200'}`} />
          ))}
        </div>
        <p className="text-xs text-gray-500 mb-6">Step {step} of {TOTAL_STEPS}</p>

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        {/* Step 1 — What happened */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">What happened?</h2>
              <p className="text-gray-500 text-sm mb-4">Select all types that apply. You are in control of what you share.</p>
              <div className="grid grid-cols-2 gap-3">
                {ABUSE_TYPES.map(t => (
                  <label key={t.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${abuseTypes.includes(t.value) ? 'border-[#0d6b75] bg-[#e0f2f4]' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={abuseTypes.includes(t.value)} onChange={() => toggleType(t.value)} className="accent-[#0d6b75]" />
                    <span className="text-sm font-medium text-gray-700">{t.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Describe what happened <span className="text-red-600">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Share only what you are comfortable sharing. There is no minimum length requirement beyond a brief description.</p>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe what happened in your own words…"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]"
              />
              {description.length > 0 && description.length < 10 && (
                <p className="text-xs text-red-600 mt-1">Please provide at least a brief description.</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2 — When & where */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">When and where?</h2>
              <p className="text-gray-500 text-sm mb-4">Both fields are optional. Approximate information is fine — do not include your exact address.</p>
            </div>
            <div>
              <label htmlFor="incident-date" className="block text-sm font-medium text-gray-700 mb-1">Approximate date (optional)</label>
              <input
                id="incident-date"
                type="date"
                value={incidentDate}
                onChange={e => setIncidentDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank if you are unsure or prefer not to say.</p>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">General area or city (optional)</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Johannesburg, Western Cape — do NOT enter a street address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]"
              />
            </div>
          </div>
        )}

        {/* Step 3 — Safety */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Your safety right now</h2>
              <p className="text-gray-500 text-sm mb-4">This helps the caseworker understand the urgency of your situation.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Are you currently in immediate danger? <span className="text-red-600">*</span></p>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${inDanger === true ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="danger" checked={inDanger === true} onChange={() => setInDanger(true)} className="accent-red-600" />
                  <span className="text-sm font-medium text-gray-700">Yes</span>
                </label>
                <label className={`flex-1 flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${inDanger === false ? 'border-[#0d6b75] bg-[#e0f2f4]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="danger" checked={inDanger === false} onChange={() => setInDanger(false)} className="accent-[#0d6b75]" />
                  <span className="text-sm font-medium text-gray-700">No</span>
                </label>
              </div>
            </div>
            {inDanger === true && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-5">
                <p className="text-red-800 font-semibold mb-2">Please seek immediate help</p>
                <p className="text-red-700 text-sm">Call your local emergency services now. SAFEHAVEN cannot dispatch emergency assistance. You can still submit this report, but please prioritise your immediate safety first.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4 — Contact preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Contact preferences</h2>
              <p className="text-gray-500 text-sm mb-4">You are never obligated to allow contact. If you prefer to remain anonymous, that is completely valid.</p>
            </div>
            <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${consentToContact ? 'border-[#0d6b75] bg-[#e0f2f4]' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="checkbox" checked={consentToContact} onChange={e => setConsentToContact(e.target.checked)} className="mt-0.5 accent-[#0d6b75]" />
              <div>
                <p className="text-sm font-medium text-gray-700">I consent to being contacted by a caseworker</p>
                <p className="text-xs text-gray-500 mt-0.5">This is optional. Contact will only be made using the method you choose.</p>
              </div>
            </label>
            {consentToContact && (
              <div>
                <label htmlFor="contact-method" className="block text-sm font-medium text-gray-700 mb-1">Preferred contact method</label>
                <select id="contact-method" value={contactMethod} onChange={e => setContactMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]">
                  <option value="">Select…</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="none">Prefer not to say</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 5 — Review */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Review your report</h2>
              <p className="text-gray-500 text-sm mb-4">Please check the information below before submitting.</p>
            </div>
            <div className="bg-[#f8faf9] rounded-xl divide-y divide-gray-200">
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Type of abuse</p><p className="text-sm text-gray-800">{abuseTypes.length > 0 ? abuseTypes.join(', ') : '—'}</p></div>
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Description</p><p className="text-sm text-gray-800 whitespace-pre-wrap">{description}</p></div>
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Approximate date</p><p className="text-sm text-gray-800">{incidentDate || 'Not provided'}</p></div>
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">General area</p><p className="text-sm text-gray-800">{location || 'Not provided'}</p></div>
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Currently in danger</p><p className="text-sm text-gray-800">{inDanger === true ? 'Yes' : inDanger === false ? 'No' : '—'}</p></div>
              <div className="p-4"><p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Consent to contact</p><p className="text-sm text-gray-800">{consentToContact ? `Yes — via ${contactMethod || 'not specified'}` : 'No'}</p></div>
            </div>
            <p className="text-xs text-gray-500">By submitting you confirm that the information is accurate to the best of your knowledge. Anonymous submission — no account required.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button onClick={() => setStep(s => s - 1)} className="text-sm font-medium text-gray-600 hover:text-gray-900">← Back</button>
          ) : (
            <Link href="/report" className="text-sm font-medium text-gray-600 hover:text-gray-900">← Cancel</Link>
          )}
          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="h-10 px-6 bg-[#0d6b75] hover:bg-[#094d55] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="h-10 px-6 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting…' : 'Submit report'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
