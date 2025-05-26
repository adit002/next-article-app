import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen flex flex-col bg-[#f3f4f6]">
        <Topbar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  )
}
