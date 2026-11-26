import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminUsersPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  if (role !== 'admin') redirect('/dashboard')

  const supabase = await createClient()
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load users.</div>
      )}

      {!error && (!profiles || profiles.length === 0) ? (
        <div className="text-center py-16 text-gray-500"><p>No users found.</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f8faf9] border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {profiles?.map(p => (
                <tr key={p.id}>
                  <td className="px-5 py-3 text-gray-800">{p.full_name ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-600">{p.email ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
