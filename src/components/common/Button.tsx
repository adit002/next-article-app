'use client'

import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'white' | 'danger'
  className?: string
  disabled?: boolean
  loading?: boolean
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-sm'

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
    white: 'bg-white hover:bg-gray-300 focus:ring-gray-400 border border-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  const combinedClassName =
    `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`.trim()

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
