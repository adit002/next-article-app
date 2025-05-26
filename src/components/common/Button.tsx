'use client'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'white' | 'danger'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-sm'

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
    white: 'bg-white hover:bg-gray-300 focus:ring-gray-400 border border-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
  const combinedClassName =
    `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`.trim()

  return (
    <button type={type} onClick={onClick} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  )
}
