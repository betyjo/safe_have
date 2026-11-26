import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminProvidersPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  if (role !== 'admin') redirect('/dashboard')

  const supabase = await createClient()
  const { data: providers, error } = await supabase
    .from('service_providers')
    .select('id, name, category, verification_status, referral_available')
    .order('verification_status', { ascending: true })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Provider Verification</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load providers.</div>
      )}

      {!error && (!providers || providers.length === 0) ? (
        <div className="text-center py-16 text-gray-500"><p>No providers found.</p></div>
      ) : (
        <div className="space-y-3">
          {providers?.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{p.category}</p>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                p.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                p.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                p.verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-700'
              }`}>
                {p.verification_status}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-6">To update verification status, modify records directly in the Supabase dashboard until the admin UI is fully implemented.</p>
    </div>
  )
}
