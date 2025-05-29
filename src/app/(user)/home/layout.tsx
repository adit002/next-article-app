import { redirect } from 'next/navigation'
import { getUser } from '@/lib/getUser'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (user?.role === 'Admin') {
    redirect('/articles')
  }
  return <div>{children}</div>
}
