'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useUploadStore } from '@/store/uploadStore'

type FileUploadProps = {
  label?: string
  error?: string
  initialPreviewUrl?: string
  resetKey?: number
  value: File | string | null
  onChange: (value: File | string | null) => void
}

export default function FileUpload({
  label,
  error,
  initialPreviewUrl,
  resetKey,
  value,
  onChange,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = () => {
    setPreviewUrl(null)
    onChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      alert('Please select a JPG or PNG image.')
      e.target.value = ''
      onChange(null)
      return
    }

    const tempUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(tempUrl)

    try {
      const uploadedUrl = await useUploadStore.getState().uploadFileToS3(selectedFile)

      if (!uploadedUrl || typeof uploadedUrl !== 'string') {
        throw new Error('Upload did not return a valid URL')
      }

      onChange(uploadedUrl)
    } catch (err) {
      alert('Upload failed')
      console.error(err)
      onChange(null)
    }
  }

  useEffect(() => {
    if (typeof value === 'string') {
      setPreviewUrl(value)
    } else if (!value) {
      setPreviewUrl(null)
    }
  }, [value, resetKey])

  useEffect(() => {
    if (initialPreviewUrl) {
      setPreviewUrl(initialPreviewUrl)
    }
  }, [initialPreviewUrl])

  return (
    <div>
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-2xl bg-white inline-block">
        {!previewUrl ? (
          <div
            onClick={handleClick}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">Click to select files</p>
              <p className="text-xs text-gray-400">Support File Type: jpg or png</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Image
              className="rounded-xl"
              src={previewUrl}
              alt="Preview"
              width={199}
              height={115}
              priority
            />
            <div className="flex justify-center space-x-8 text-base font-medium">
              <button onClick={handleClick} className="text-blue-600 hover:underline">
                Change
              </button>
              <button onClick={handleDelete} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  )
}
