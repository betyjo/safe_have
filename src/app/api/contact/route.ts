import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(2000),
  email: z.string().email().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 422 })
  }

  // In a real deployment this would send an email or create a support ticket.
  // For the demonstration platform we simply acknowledge receipt.
  console.log('Contact form submission received — subject:', result.data.subject)

  return NextResponse.json({ success: true })
}
