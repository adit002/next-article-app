'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import LogoWhite from '@/app/logo-white.png'
import BGHome from '@/app/bg-home.jpg'
import Logo from '@/app/logo.png'
import { LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ConfirmModal from '../modal/Confirm'

export default function Topbar() {
  const { user } = useAuthStore()
  const pathname = usePathname().split('/')[1]
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { logout, loading } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = async () => {
    await logout()
    router.push('/login')
    setIsOpen(false)
  }
  const toggle = () => setOpen(!open)

  const clickAccount = () => {
    if (user?.role == 'Admin') {
      router.push('/profile')
    } else {
      toggle()
    }
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header>
      <div
        className={`h-16 px-6  ${
          user?.role == 'User' ? 'bg-white' : 'bg-[#f9fafb]'
        } border-b border-[#e3e8ef] flex items-center justify-between ${
          user?.role == 'User' && pathname == 'home' ? 'sm:hidden' : ''
        }`}
      >
        {user?.role == 'Admin' && pathname != 'detailarticle' ? (
          <h1 className="text-lg font-bold text-gray-800 capitalize">
            {pathname == 'profile' ? 'user profile' : pathname}
          </h1>
        ) : (
          <div className="flex items-center gap-2 ">
            <Image src={Logo} alt="Logo" width={20} height={22} />
            <span className="font-bold text-lg">Logoipsum</span>
          </div>
        )}
        <div className="flex items-center gap-2 cursor-pointer relative" onClick={clickAccount}>
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold capitalize">
            {user?.username.charAt(0)}
          </div>
          <div className="text-sm font-bold underline hidden md:block">{user?.username}</div>
          {open && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-11 right-0 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-40 ">
                <div
                  className="px-4 py-3 text-gray-800 hover:bg-gray-40 cursor-pointer text-left"
                  onClick={() => {
                    router.push('/account')
                    setOpen(false)
                  }}
                >
                  My Account
                </div>
                <div className="border-t border-gray-100" />
                <div
                  onClick={() => {
                    setIsOpen(true)
                    setOpen(false)
                  }}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Log out
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {user?.role == 'User' && pathname == 'home' && (
        <div className="relative text-white py-16 px-4 text-center">
          <div className="mt-10">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
              style={{ backgroundImage: `url(${BGHome.src})` }}
            ></div>
            <div className="absolute inset-0 bg-[#2563EBDB] z-10" />
          </div>
          <div
            className="relative z-10 w-full flex justify-between items-center px-6 bottom-[5rem] hidden md:flex"
            ref={dropdownRef}
          >
            <div className="flex items-center gap-2">
              <Image src={LogoWhite} alt="Logo" width={20} height={22} />
              <span className="font-bold text-lg">Logoipsum</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggle}>
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold capitalize">
                {user?.username.charAt(0)}
              </div>
              <div className="text-sm font-bold underline">{user?.username}</div>
            </div>
            {open && (
              <>
                <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
                <div className="absolute top-11 right-0 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-40 ">
                  <div
                    className="px-4 py-3 text-gray-800 hover:bg-gray-40 cursor-pointer text-left"
                    onClick={() => {
                      router.push('/account')
                      setOpen(false)
                    }}
                  >
                    My Account
                  </div>
                  <div className="border-t border-gray-100" />
                  <div
                    onClick={() => {
                      setIsOpen(true)
                      setOpen(false)
                    }}
                    className="px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Log out
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center h-full content-center">
            <p className="text-sm mb-2">Blog genzet</p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-snug mb-2">
              The Journal: Design Resources, <br /> Interviews, and Industry News
            </h1>
            <p className="text-base sm:text-lg mb-6">Your daily dose of design insights!</p>
          </div>
        </div>
      )}
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
    </header>
  )
}
