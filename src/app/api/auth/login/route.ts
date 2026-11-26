import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = loginSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid email or password format.' }, { status: 422 })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  return NextResponse.json({ success: true })
}
