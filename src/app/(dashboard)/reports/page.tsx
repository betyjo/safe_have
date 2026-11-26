import { requireAuth } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  awaiting_safe_contact: 'bg-orange-100 text-orange-800',
  in_progress: 'bg-purple-100 text-purple-800',
  referred: 'bg-teal-100 text-teal-800',
  closed: 'bg-gray-100 text-gray-700',
}

export default async function MyReportsPage() {
  await requireAuth()
  const supabase = await createClient()

  const { data: reports, error } = await supabase
    .from('reports')
    .select('id, report_type, status, created_at, is_third_party')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
        <Link href="/report" className="inline-flex items-center justify-center h-9 px-4 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors">
          New report
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load reports.</div>
      )}

      {!error && (!reports || reports.length === 0) ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">No reports yet</p>
          <Link href="/report" className="text-[#0d6b75] underline text-sm">Submit your first report</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reports?.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800 capitalize">{r.report_type?.replace('_', ' ')} {r.is_third_party ? '(third-party)' : ''}</p>
                <p className="text-xs text-gray-500 mt-0.5">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] ?? 'bg-gray-100 text-gray-700'}`}>
                {r.status?.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
