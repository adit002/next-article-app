'use client'

import { ReactNode, useEffect } from 'react'

type ConfirmModalProps = {
  isOpen: boolean
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  onCancel: () => void
  onConfirm?: () => void
  children?: ReactNode
  hideFooter?: boolean
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
  children,
  hideFooter = false,
}: ConfirmModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative z-10">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {children ? (
          <div className="mb-6">{children}</div>
        ) : message ? (
          <p className="text-sm text-gray-600 mb-6">{message}</p>
        ) : null}

        {!hideFooter && (
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              {cancelText}
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm ${
                  confirmText === 'Delete'
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-blue-600 hover:bg-blue-500'
                } text-white rounded-md transition`}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
