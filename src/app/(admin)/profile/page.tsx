'use client'

import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl p-6 space-y-6">
        <h1 className="text-xl font-semibold text-center">User Profile</h1>

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-xl">
            J
          </div>
        </div>

        <div className="space-y-3">
          <ProfileRow label="Username" value="James Dean" />
          <ProfileRow label="Password" value="Admin123" />
          <ProfileRow label="Role" value="Admin" />
        </div>

        <button
          onClick={() => router.push('/articles')}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition cursor-pointer"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md">
      <span className="font-medium text-gray-700">{label} </span>
      <span>:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  )
}
