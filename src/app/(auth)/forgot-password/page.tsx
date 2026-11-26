'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const supabase = createClient()
      const { error: sbError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (sbError) {
        setError('Failed to send reset email. Please check the address and try again.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-sm text-gray-600 mb-4">We&apos;ve sent a password reset link to <strong>{email}</strong>. Check your spam folder if you don&apos;t see it.</p>
        <Link href="/login" className="text-[#0d6b75] underline text-sm">Back to sign in</Link>
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset your password</h1>
      <p className="text-sm text-gray-500 mb-6">Enter your email and we&apos;ll send you a reset link.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6b75]" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full h-11 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="text-sm text-center mt-5">
        <Link href="/login" className="text-[#0d6b75] hover:underline">Back to sign in</Link>
      </p>
    </>
  )
}
