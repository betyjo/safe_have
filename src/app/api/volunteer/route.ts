import { NextResponse } from 'next/server'
import { z } from 'zod'

const volunteerSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  skills: z.string().min(1).max(1000),
  availability: z.string().max(200).optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = volunteerSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 422 })
  }

  // Demonstration platform — log receipt only. Real deployment would store to DB or send email.
  console.log('Volunteer expression of interest received for:', result.data.email)

  return NextResponse.json({ success: true })
}
