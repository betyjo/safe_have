import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { reportDirectSchema, reportThirdPartySchema } from '@/lib/validations'

// Simple in-memory rate limiter — resets on server restart; acceptable for MVP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

function generateRef(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const isThirdParty = typeof body === 'object' && body !== null && (body as Record<string, unknown>).is_third_party === true
  const schema = isThirdParty ? reportThirdPartySchema : reportDirectSchema
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed.', details: result.error.flatten() }, { status: 422 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const insertData: Record<string, unknown> = {
    report_type: result.data.report_type,
    description: result.data.description,
    status: 'submitted',
    is_third_party: isThirdParty,
  }

  if (user) insertData.user_id = user.id

  const { error: dbError } = await supabase.from('reports').insert(insertData)

  if (dbError) {
    // Log the code only — never expose internal messages to client
    console.error('Report insert error:', dbError.code)
    return NextResponse.json({ error: 'Failed to submit report. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, reference: generateRef() })
}
