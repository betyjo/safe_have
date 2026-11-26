import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Account' }

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf9] px-4 py-12">
      <Link href="/" className="font-bold text-2xl text-[#0d6b75] mb-8 tracking-tight">SAFEHAVEN</Link>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {children}
      </div>
      <p className="text-xs text-gray-400 mt-6 text-center max-w-xs">
        If you are in immediate danger, do not wait — call emergency services now.
      </p>
    </div>
  )
}
