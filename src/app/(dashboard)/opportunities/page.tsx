import { requireAuth } from '@/lib/auth'
import Link from 'next/link'

export default async function OpportunitiesPage() {
  await requireAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Volunteering Opportunities</h1>
      <p className="text-gray-600 text-sm mb-6">Available opportunities will appear here once the volunteer coordination system is live.</p>
      <div className="bg-[#e0f2f4] rounded-xl p-6">
        <p className="text-[#0d6b75] font-medium mb-1">Coming soon</p>
        <p className="text-gray-700 text-sm">In the meantime, you can visit the <Link href="/volunteer" className="underline">volunteer page</Link> for more information or <Link href="/contact" className="underline">contact us</Link> directly.</p>
      </div>
    </div>
  )
}
