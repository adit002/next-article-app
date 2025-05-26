'use client'

import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { EyeOff, Eye, Search } from 'lucide-react'

type InputProps = {
  label?: string
  name: string
  type?: 'text' | 'password' | 'search'
  error?: string
  placeholder?: string
  register?: UseFormRegisterReturn
  icon?: 'search'
  className?: string
}

export default function Input({
  label,
  name,
  type = 'text',
  error,
  placeholder,
  register,
  icon,
  className = '',
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const isSearch = icon === 'search'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block font-medium text-gray-800 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {isSearch && (
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </div>
        )}

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register}
          className={`bg-white w-full px-4 py-2 rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none ${isSearch ? 'pl-10' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
