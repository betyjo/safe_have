import { createClient } from '@/lib/supabase/server'
import { signupSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = signupSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your details and try again.' }, { status: 422 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.full_name,
        role: result.data.role,
      },
    },
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to create account. The email may already be in use.' }, { status: 400 })
  }

  return NextResponse.json({ success: true, message: 'Check your email to confirm your account.' })
}
