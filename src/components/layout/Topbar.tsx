'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Topbar() {
  const { user } = useAuthStore()

  const pathname = usePathname().split('/')[1]
  const router = useRouter()
  return (
    <header className="h-16 px-6 bg-[#f9fafb] border-b border-[#e3e8ef] flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-800 capitalize">
        {pathname == 'profile' ? 'user profile' : pathname}
      </h1>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push('/profile')}
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold capitalize">
          {user?.username.charAt(0)}
        </div>
        <div className="text-sm font-bold underline">{user?.username}</div>
      </div>
    </header>
  )
}
