import { requireAuth } from '@/lib/auth'

export default async function SettingsPage() {
  const user = await requireAuth()

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account settings</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4 mb-6">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</p>
          <p className="text-sm text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Account ID</p>
          <p className="text-sm font-mono text-gray-500">{user.id.slice(0, 8)}…</p>
        </div>
      </div>

      <div className="bg-[#f8faf9] rounded-xl p-5 text-sm text-gray-600">
        <p className="font-medium text-gray-800 mb-1">Password</p>
        <p>To change your password, sign out and use &ldquo;Forgot password&rdquo; on the login page.</p>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-sm text-yellow-800">
        <p className="font-medium mb-1">Data deletion</p>
        <p>To request deletion of your account and associated data, please use the <a href="/contact" className="underline">contact page</a>.</p>
      </div>
    </div>
  )
}
