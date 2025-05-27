'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Newspaper, LogOut, Tag } from 'lucide-react'
import LogoWhite from '@/app/logo-white.png'
import Image from 'next/image'
import ConfirmModal from '../modal/Confirm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function Sidebar() {
  const { logout, loading } = useAuthStore()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const handleConfirm = async () => {
    await logout()
    router.push('/login')
    setIsOpen(false)
  }
  const linkClass = (path: string) =>
    `flex items-center px-4 py-2 rounded-md transition ${
      pathname.startsWith(path) && path ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'
    }`

  return (
    <aside className="w-64 min-h-screen bg-blue-600 p-4 text-white flex flex-col">
      <div className="flex gap-3 items-center pl-4">
        <Image src={LogoWhite} width={20} height={22} alt="logo white" className="w-6 h-6 mb-8" />
        <div className="text-2xl font-bold text-center mb-8">Logoipsum</div>
      </div>
      <nav className="space-y-2 flex-1">
        <Link href="/articles" className={linkClass('/articles')}>
          <Newspaper className="w-4 h-4 mr-2" />
          Articles
        </Link>
        <Link href="/category" className={linkClass('/category')}>
          <Tag className="w-4 h-4 mr-2" />
          Category
        </Link>
        <a
          onClick={() => setIsOpen(true)}
          className="flex items-center px-4 py-2 rounded-md transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </a>
      </nav>
      <ConfirmModal
        isOpen={isOpen}
        title="Logout"
        cancelText="Cancel"
        confirmText="Logout"
        message="Are you sure want to logout?"
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </aside>
  )
}
