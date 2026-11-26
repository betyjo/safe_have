import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const STATUS_COLORS: Record<string, string> = {
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  awaiting_safe_contact: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-purple-100 text-purple-800',
  referred: 'bg-teal-100 text-teal-800',
  closed: 'bg-gray-100 text-gray-700',
}

export default async function IncomingReportsPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  if (role !== 'caseworker' && role !== 'admin') redirect('/dashboard')

  const supabase = await createClient()
  const { data: reports, error } = await supabase
    .from('reports')
    .select('id, report_type, status, created_at, is_third_party, description')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Incoming Reports</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load reports.</div>
      )}

      {!error && (!reports || reports.length === 0) ? (
        <div className="text-center py-16 text-gray-500">
          <p>No reports to review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports?.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {r.report_type?.replace('_', ' ')}
                    {r.is_third_party && <span className="ml-2 text-xs text-gray-500">(third-party)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <span className={`flex-shrink-0 inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] ?? 'bg-gray-100 text-gray-700'}`}>
                  {r.status?.replace(/_/g, ' ')}
                </span>
              </div>
              {r.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{r.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
