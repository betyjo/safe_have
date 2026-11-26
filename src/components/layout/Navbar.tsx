'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { QuickExit } from './QuickExit'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/find-support', label: 'Find Support' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[#0d6b75] tracking-tight">SAFEHAVEN</Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#0d6b75]'
                    : 'text-gray-600 hover:text-[#0d6b75]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/report"
              className="inline-flex items-center justify-center h-9 px-4 bg-red-700 hover:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Report Abuse
            </Link>
            <QuickExit />
          </div>

          <div className="flex md:hidden items-center gap-3">
            <QuickExit />
            <button onClick={() => setOpen(!open)} className="p-2 rounded-md text-gray-600">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href ? 'text-[#0d6b75]' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/report"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-9 px-4 bg-red-700 text-white text-sm font-semibold rounded-lg"
            >
              Report Abuse
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
