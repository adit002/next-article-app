import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

type DecodedToken = { userId: string }

export async function getUser(): Promise<UserData> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  const decoded = jwt.decode(token) as DecodedToken
  if (!decoded?.userId) {
    redirect('/login')
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/login')
  }

  const user = await res.json()
  return user
}
