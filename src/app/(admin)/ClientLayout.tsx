'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

type Props = {
  user: { id: string; username: string; role: string }
  children: React.ReactNode
}

export default function ClientLayout({ user, children }: Props) {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col bg-[#f3f4f6]">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  )
}
