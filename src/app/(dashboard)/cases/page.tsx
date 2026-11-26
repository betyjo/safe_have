import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}

export default async function CasesPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  if (role !== 'caseworker' && role !== 'admin') redirect('/dashboard')

  const supabase = await createClient()
  const { data: cases, error } = await supabase
    .from('cases')
    .select('id, status, priority, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cases</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load cases.</div>
      )}

      {!error && (!cases || cases.length === 0) ? (
        <div className="text-center py-16 text-gray-500"><p>No cases found.</p></div>
      ) : (
        <div className="space-y-3">
          {cases?.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800 capitalize">{c.status?.replace(/_/g, ' ')}</p>
                <p className="text-xs text-gray-500">{new Date(c.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[c.priority] ?? 'bg-gray-100 text-gray-700'}`}>
                {c.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
