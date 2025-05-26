'use client'

import { UseFormRegisterReturn } from 'react-hook-form'

type SelectProps = {
  label?: string
  name: string
  options: { value: string; label: string }[]
  register?: UseFormRegisterReturn
  error?: string
  className?: string
}

export default function Select({ label, name, options, register, error, className }: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block font-medium text-gray-800 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          {...register}
          className={`bg-white appearance-none w-full px-4 py-2 pr-10 rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none `}
        >
          <option value="">Please select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
