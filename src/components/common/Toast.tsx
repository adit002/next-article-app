'use client'

import { useEffect } from 'react'
import { X, CheckCircle2, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error'

interface ToastProps {
  type: ToastType
  message: string
  onDismiss: () => void
  duration?: number
}

const iconMap = {
  success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  error: <AlertTriangle className="h-5 w-5 text-red-600" />,
}

const styleMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

export default function Toast({ type, message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        role="alert"
        className={`flex items-start gap-3 rounded-lg border px-4 py-3 shadow-md ${styleMap[type]} animate-slide-in-right`}
      >
        {iconMap[type]}
        <div className="text-sm flex-1">{message}</div>
        <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
