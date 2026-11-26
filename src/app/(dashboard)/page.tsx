import { redirect } from 'next/navigation'
import { requireAuth, getUserRole } from '@/lib/auth'

export default async function DashboardRootPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)

  if (role === 'caseworker') redirect('/dashboard/incoming')
  if (role === 'provider') redirect('/dashboard/services')
  if (role === 'admin') redirect('/dashboard/users')

  redirect('/dashboard/overview')
}
