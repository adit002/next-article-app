import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
  fullScreen?: boolean
}

export default function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? 'h-screen w-full' : 'py-8'
      } text-gray-600 animate-fade-in`}
      role="status"
    >
      <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-2" />
      <span className="text-sm">{message}</span>
    </div>
  )
}
