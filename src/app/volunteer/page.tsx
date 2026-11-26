'use client'

import type { Metadata } from 'next'
import { useState, type FormEvent } from 'react'

// Note: metadata export is ignored in client components — set via generateMetadata or move to a server wrapper if needed

export default function VolunteerPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState('')
  const [availability, setAvailability] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, skills, availability }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="flex-1 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank you for volunteering!</h1>
          <p className="text-gray-600">We&apos;ve received your expression of interest. A member of our team will be in touch when suitable opportunities arise.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0d6b75] mb-4">Volunteer with SAFEHAVEN</h1>
        <p className="text-gray-600 text-lg mb-8">
          Volunteers play a vital role in supporting survivors and strengthening our community. If you have time, skills, or expertise to offer, we&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { emoji: '💬', title: 'Peer support', desc: 'Provide compassionate listening and community connection.' },
            { emoji: '🧑‍💼', title: 'Professional skills', desc: 'Offer legal, financial, medical, or counselling expertise.' },
            { emoji: '🛠️', title: 'Practical help', desc: 'Assist with logistics, training, or platform development.' },
          ].map(r => (
            <div key={r.title} className="bg-[#f8faf9] rounded-xl p-5">
              <div className="text-2xl mb-2">{r.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{r.title}</h3>
              <p className="text-gray-600 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Express your interest</h2>

          <div>
            <label htmlFor="vol-name" className="block text-sm font-medium text-gray-700 mb-1">Full name <span className="text-red-600">*</span></label>
            <input id="vol-name" type="text" required value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
          </div>

          <div>
            <label htmlFor="vol-email" className="block text-sm font-medium text-gray-700 mb-1">Email address <span className="text-red-600">*</span></label>
            <input id="vol-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
          </div>

          <div>
            <label htmlFor="vol-skills" className="block text-sm font-medium text-gray-700 mb-1">Skills or areas of interest <span className="text-red-600">*</span></label>
            <textarea id="vol-skills" required value={skills} onChange={e => setSkills(e.target.value)} rows={3}
              placeholder="e.g. counselling, legal advice, translation, administration…"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
          </div>

          <div>
            <label htmlFor="vol-avail" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <input id="vol-avail" type="text" value={availability} onChange={e => setAvailability(e.target.value)}
              placeholder="e.g. weekends, evenings, flexible"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full h-11 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Submitting…' : 'Submit expression of interest'}
          </button>
        </form>
      </div>
    </main>
  )
}
