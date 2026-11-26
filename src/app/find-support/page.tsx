import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { ServiceProvider } from '@/types'

export const metadata: Metadata = { title: 'Find Support' }

const CATEGORIES = ['Emergency', 'Healthcare', 'Legal', 'Counselling', 'Shelter', 'Financial', 'Education', 'Employment']

const DEMO_PROVIDERS: ServiceProvider[] = [
  { id: 'd1', name: 'Crisis Response Centre', description: 'Emergency support and safe accommodation for people in immediate danger.', category: 'Emergency', location: 'City Centre', contact_info: 'Available 24/7', operating_hours: '24 hours', verification_status: 'verified', referral_available: true },
  { id: 'd2', name: 'Healing Hands Clinic', description: 'Confidential healthcare and trauma-informed medical support for survivors.', category: 'Healthcare', location: 'North District', contact_info: 'By appointment', operating_hours: 'Mon–Fri 8am–6pm', verification_status: 'verified', referral_available: true },
  { id: 'd3', name: 'Justice for All Legal Aid', description: 'Free legal advice, protection orders, and court support for survivors.', category: 'Legal', location: 'Central', contact_info: 'Walk-in or referral', operating_hours: 'Mon–Fri 9am–5pm', verification_status: 'verified', referral_available: true },
  { id: 'd4', name: 'Safe Minds Counselling', description: 'Individual and group counselling with trauma-specialist therapists.', category: 'Counselling', location: 'Various locations', contact_info: 'Referral required', operating_hours: 'Mon–Sat 8am–8pm', verification_status: 'verified', referral_available: true },
  { id: 'd5', name: 'Haven Shelter Network', description: 'Emergency and transitional safe housing for survivors and their children.', category: 'Shelter', location: 'Undisclosed for safety', contact_info: 'Contact via caseworker', operating_hours: '24 hours', verification_status: 'verified', referral_available: true },
  { id: 'd6', name: 'Rebuild Financial Aid', description: 'Emergency grants, budgeting support, and links to social benefits.', category: 'Financial', location: 'Online + in-person', contact_info: 'Open to referrals', operating_hours: 'Mon–Fri 9am–4pm', verification_status: 'verified', referral_available: false },
]

const categoryColors: Record<string, string> = {
  Emergency: 'bg-red-100 text-red-800',
  Healthcare: 'bg-blue-100 text-blue-800',
  Legal: 'bg-purple-100 text-purple-800',
  Counselling: 'bg-pink-100 text-pink-800',
  Shelter: 'bg-orange-100 text-orange-800',
  Financial: 'bg-yellow-100 text-yellow-800',
  Education: 'bg-green-100 text-green-800',
  Employment: 'bg-teal-100 text-teal-800',
}

export default async function FindSupportPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const supabase = await createClient()
  const query = supabase
    .from('service_providers')
    .select('id, name, description, category, location, contact_info, operating_hours, verification_status, referral_available')
    .eq('verification_status', 'verified')

  const { data: dbProviders, error } = await query
  const isDemo = error || !dbProviders || dbProviders.length === 0
  const allProviders: ServiceProvider[] = isDemo ? DEMO_PROVIDERS : (dbProviders as ServiceProvider[])
  const filtered = category ? allProviders.filter(p => p.category.toLowerCase() === category.toLowerCase()) : allProviders

  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0d6b75] mb-3">Find Support</h1>
          <p className="text-gray-600 text-lg">Connect with verified organisations offering confidential, professional support.</p>
        </div>

        {isDemo && (
          <div className="mb-6 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-yellow-800">
            <strong>DEMONSTRATION DATA</strong> — These are not real organisations. This content is placeholder until verified providers are confirmed.
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/find-support"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-[#0d6b75] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/find-support?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category?.toLowerCase() === cat.toLowerCase() ? 'bg-[#0d6b75] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-2">No services found in this category.</p>
            <Link href="/find-support" className="text-[#0d6b75] underline text-sm">View all services</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[p.category] ?? 'bg-gray-100 text-gray-700'}`}>{p.category}</span>
                  {p.referral_available && (
                    <span className="text-xs text-[#0d6b75] font-medium">Referrals available</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h2>
                {p.description && <p className="text-gray-600 text-sm mb-4 flex-1">{p.description}</p>}
                <div className="space-y-1 text-sm text-gray-500 mt-auto">
                  {p.location && <p>📍 {p.location}</p>}
                  {p.contact_info && <p>📞 {p.contact_info}</p>}
                  {p.operating_hours && <p>🕐 {p.operating_hours}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-red-800 font-semibold text-sm">Need help immediately?</p>
          <p className="text-red-700 text-sm mt-1">If you are in immediate danger, do not wait — call your local emergency services now. SAFEHAVEN is a support platform and cannot dispatch emergency assistance.</p>
        </div>
      </div>
    </main>
  )
}
