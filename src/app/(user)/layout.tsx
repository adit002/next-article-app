import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ClientLayout from './ClientLayout'
import { getUser } from '@/lib/getUser'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    redirect('/login')
  }
  const user = await getUser()

  return <ClientLayout user={user}>{children}</ClientLayout>
}
