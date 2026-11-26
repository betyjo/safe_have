'use client'

import { useState, type FormEvent } from 'react'

const CATEGORIES = ['Emergency', 'Healthcare', 'Legal', 'Counselling', 'Shelter', 'Financial', 'Education', 'Employment']

export default function RequestSupportPage() {
  const [category, setCategory] = useState('')
  const [needs, setNeeds] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    // In a full implementation this would POST to /api/referrals
    // For now we simulate a successful request
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 800)
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Request received</h1>
        <p className="text-gray-600 text-sm">A caseworker will review your request and connect you with appropriate services.</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Request support</h1>
      <p className="text-gray-500 text-sm mb-6">Tell us what kind of support you need. A caseworker will follow up.</p>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Type of support needed</label>
          <select id="category" required value={category} onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]">
            <option value="">Select…</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">Describe your needs</label>
          <textarea id="needs" required value={needs} onChange={e => setNeeds(e.target.value)} rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full h-11 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Submitting…' : 'Submit request'}
        </button>
      </form>
    </div>
  )
}
