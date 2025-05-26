export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white sm:bg-[#f3f4f6]">
      {children}
    </div>
  )
}
