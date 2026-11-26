'use client'

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Alert } from '@/components/ui/Alert'

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, email: email || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
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
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Message received</h1>
          <p className="text-gray-600">
            Thank you for getting in touch. We will review your message and respond if
            a reply address was provided. This is a demonstration platform, so responses
            may be limited.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0d6b75] mb-3">Contact us</h1>
        <p className="text-gray-600 mb-2">
          Have a question, feedback, or need to report a platform issue? Send us a message below.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Note: This is a demonstration platform. For genuine emergencies, contact your local
          emergency services. For support, visit{' '}
          <a href="/find-support" className="text-[#0d6b75] underline">Find Support</a>.
        </p>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="e.g. Question about reports"
          />
          <Textarea
            id="message"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message..."
            className="min-h-[140px]"
          />
          <Input
            id="email"
            label="Your email (optional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="only if you want a reply"
            helperText="Leave blank to send anonymously."
          />
          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </div>
    </main>
  )
}
