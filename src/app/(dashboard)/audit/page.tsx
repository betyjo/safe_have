import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuditLogsPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  if (role !== 'admin') redirect('/dashboard')

  const supabase = await createClient()
  const { data: logs, error } = await supabase
    .from('audit_logs')
    .select('id, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Audit Logs</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">Could not load audit logs.</div>
      )}

      {!error && (!logs || logs.length === 0) ? (
        <div className="text-center py-16 text-gray-500"><p>No audit log entries found.</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f8faf9] border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">ID</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {logs?.map(l => (
                <tr key={l.id}>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{l.id.slice(0, 8)}…</td>
                  <td className="px-5 py-3 text-gray-600">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
