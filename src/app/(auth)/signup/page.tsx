'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('survivor')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Registration failed. Please try again.')
      } else {
        setSuccess(data.message ?? 'Account created! Please check your email to confirm.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Account created</h1>
        <p className="text-sm text-gray-600 mb-4">{success}</p>
        <Link href="/login" className="text-[#0d6b75] underline text-sm">Go to sign in</Link>
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
      <p className="text-sm text-gray-500 mb-6">Join SAFEHAVEN to access your dashboard and track your reports.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
          <input id="full-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am joining as</label>
          <select id="role" value={role} onChange={e => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]">
            <option value="survivor">A survivor seeking support</option>
            <option value="volunteer">A volunteer</option>
            <option value="provider">A service provider organisation</option>
          </select>
        </div>
        <button type="submit" disabled={loading}
          className="w-full h-11 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-[#0d6b75] font-medium hover:underline">Sign in</Link>
      </p>
    </>
  )
}
