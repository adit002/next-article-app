'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import Topbar from '@/components/layout/Topbar'
import Footer from '@/components/layout/Footer'

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
    <div>
      <Topbar />
      <main className="p-6 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
