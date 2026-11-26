import { requireAuth, getUserRole } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardOverviewPage() {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  const supabase = await createClient()

  // Fetch counts safely — handle missing columns/tables gracefully
  const { count: reportCount } = await supabase
    .from('reports')
    .select('id', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8 capitalize">Role: {role ?? 'unknown'}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Reports</p>
          <p className="text-3xl font-bold text-[#0d6b75]">{reportCount ?? '—'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/report" className="inline-flex items-center justify-center h-10 px-5 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors">
          Submit a report
        </Link>
        <Link href="/find-support" className="inline-flex items-center justify-center h-10 px-5 bg-[#0d6b75] hover:bg-[#094d55] text-white text-sm font-semibold rounded-lg transition-colors">
          Find support
        </Link>
      </div>
    </div>
  )
}
