import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rebuild Independence',
}

const resources = [
  {
    emoji: '💰',
    title: 'Financial support',
    description:
      'Emergency grants, benefits guidance, and links to organisations that provide financial assistance to survivors rebuilding their lives.',
    links: [{ label: 'Find financial support', href: '/find-support?category=Financial' }],
  },
  {
    emoji: '🏠',
    title: 'Housing',
    description:
      'Safe housing options including emergency shelters, transitional housing, and long-term accommodation support for survivors and their dependants.',
    links: [{ label: 'Find shelter services', href: '/find-support?category=Shelter' }],
  },
  {
    emoji: '📚',
    title: 'Training & education',
    description:
      'Vocational training, skills development programmes, and educational pathways to open new employment opportunities.',
    links: [{ label: 'Browse organisations', href: '/find-support' }],
  },
  {
    emoji: '💼',
    title: 'Employment',
    description:
      'CV support, job placement assistance, and employer partnerships specifically mindful of the needs of survivors entering or re-entering the workforce.',
    links: [{ label: 'Browse organisations', href: '/find-support' }],
  },
  {
    emoji: '🤝',
    title: 'Volunteering',
    description:
      'If you are ready to give back or simply want to connect with a supportive community, our volunteer programme welcomes people of all backgrounds and skill sets.',
    links: [{ label: 'Volunteer with us', href: '/volunteer' }],
  },
  {
    emoji: '❤️',
    title: 'Support the platform',
    description:
      'Donations help us maintain the platform, recruit trained caseworkers, and expand our network of verified service providers.',
    links: [{ label: 'Donate', href: '/donate' }],
  },
]

export default function RebuildPage() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#0d6b75] mb-4">Rebuild your independence</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Recovery is not just about immediate safety — it is about building a stable, independent
            future. These resources are here to help you get there.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
            >
              <div className="text-3xl mb-3">{r.emoji}</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{r.title}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-1">{r.description}</p>
              <div className="flex flex-wrap gap-2">
                {r.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-[#0d6b75] hover:underline"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#e0f2f4] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#0d6b75] mb-2">Get involved</h2>
            <p className="text-gray-700 text-sm">
              Whether you want to volunteer your time, donate resources, or simply share the platform
              with someone who needs it — every contribution makes a difference.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center h-10 px-5 bg-[#0d6b75] hover:bg-[#094d55] text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center h-10 px-5 border border-[#0d6b75] text-[#0d6b75] hover:bg-[#e0f2f4] font-semibold rounded-lg transition-colors text-sm"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
