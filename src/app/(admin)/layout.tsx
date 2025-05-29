import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/getUser'
import ClientLayout from './ClientLayout'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    redirect('/login')
  }
  const user = await getUser()
  if (user?.role !== 'Admin') {
    redirect('/home')
  }

  return <ClientLayout user={user}>{children}</ClientLayout>
}
