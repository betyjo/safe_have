import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-xl text-[#4dd9e8] mb-2">SAFEHAVEN</div>
            <p className="text-sm">A platform dedicated to supporting survivors of gender-based violence with confidential reporting and access to services.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Platform</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/report" className="hover:text-white">Report Abuse</Link></li>
              <li><Link href="/find-support" className="hover:text-white">Find Support</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Resources</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/safety" className="hover:text-white">Safety &amp; Privacy</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/volunteer" className="hover:text-white">Volunteer</Link></li>
              <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-xs text-gray-500">
          <p className="font-semibold text-yellow-400">DEMONSTRATION PLATFORM — Not a substitute for emergency services. If you are in immediate danger, call your local emergency services immediately.</p>
          <p className="mt-2">&copy; 2025 SAFEHAVEN. All rights reserved.</p>
          <p className="mt-1">If you need immediate help, please contact a local helpline or emergency services.</p>
        </div>
      </div>
    </footer>
  )
}
