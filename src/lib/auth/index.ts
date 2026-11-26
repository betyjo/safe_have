import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { AppRole } from '@/types'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

export async function getUserRole(userId: string): Promise<AppRole | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()
  return (data?.role as AppRole) ?? null
}
