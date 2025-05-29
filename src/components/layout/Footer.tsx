'use client'

import Image from 'next/image'
import Logo from '@/app/logo-white.png'

export default function Footer() {
  return (
    <footer className="bg-[#2563EBDB] text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={20} height={22} />
          <span className="font-bold text-lg">Logoipsum</span>
        </div>
        <p className="text-sm text-center sm:text-right mt-3 sm:mt-0">
          © {new Date().getFullYear()} Blog genzet. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
