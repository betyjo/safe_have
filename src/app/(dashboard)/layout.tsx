import Link from 'next/link'
import { requireAuth, getUserRole } from '@/lib/auth'
import type { AppRole } from '@/types'

const NAV: Record<AppRole, { href: string; label: string }[]> = {
  survivor: [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/reports', label: 'My Reports' },
    { href: '/dashboard/request-support', label: 'Request Support' },
    { href: '/dashboard/settings', label: 'Settings' },
  ],
  caseworker: [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/incoming', label: 'Incoming Reports' },
    { href: '/dashboard/cases', label: 'Cases' },
    { href: '/dashboard/referrals', label: 'Referrals' },
  ],
  provider: [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/services', label: 'My Services' },
    { href: '/dashboard/referrals', label: 'Referrals' },
  ],
  volunteer: [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/opportunities', label: 'Opportunities' },
  ],
  admin: [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/users', label: 'Users' },
    { href: '/dashboard/providers', label: 'Providers' },
    { href: '/dashboard/audit', label: 'Audit Logs' },
  ],
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth()
  const role = await getUserRole(user.id)
  const navLinks = role ? NAV[role] : [{ href: '/dashboard', label: 'Overview' }]

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-[#f8faf9] border-b md:border-b-0 md:border-r border-gray-200 py-6 px-4 flex-shrink-0">
        <div className="mb-6 hidden md:block">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Signed in as</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
          {role && <p className="text-xs text-[#0d6b75] font-medium mt-0.5 capitalize">{role}</p>}
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:text-[#0d6b75] transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 hidden md:block">
          <form action="/logout" method="POST">
            <button type="submit" className="text-sm text-gray-500 hover:text-red-600 transition-colors">Sign out</button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
