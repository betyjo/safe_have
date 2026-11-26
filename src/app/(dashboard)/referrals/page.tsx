import { requireAuth } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
  completed: 'bg-gray-100 text-gray-700',
}

export default async function ReferralsPage() {
  await requireAuth()
  const supabase = await createClient()

  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('id, status, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Referrals</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load referrals.</div>
      )}

      {!error && (!referrals || referrals.length === 0) ? (
        <div className="text-center py-16 text-gray-500"><p>No referrals yet.</p></div>
      ) : (
        <div className="space-y-3">
          {referrals?.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4">
              <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleDateString()}</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] ?? 'bg-gray-100 text-gray-700'}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
