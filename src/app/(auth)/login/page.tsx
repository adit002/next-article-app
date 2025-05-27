'use client'

import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Logo from '@/app/logo.png'
import Link from 'next/link'
import Toast from '@/components/common/Toast'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(8, 'Password must be at least 8 characters long'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { login, loading } = useAuthStore()
  const getState = useAuthStore.getState
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await login(data)
    const { error, message } = getState()
    setToast({
      type: error ? 'error' : 'success',
      message: error ?? message ?? 'Something went wrong',
    })
    router.push('/articles')
  }

  return (
    <div>
      <div className="bg-white sm:bg-shadow-md sm:bg-rounded-lg w-[400px] p-1">
        <div className="flex justify-center my-10 gap-2">
          <Image src={Logo} width={20} alt="logo" />
          <span className="text-xl font-bold">Logoipsum</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-6">
          <Input
            label="Username"
            name="username"
            register={register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            register={register('password')}
            error={errors.password?.message}
            className="my-5"
          />
          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Login
          </Button>
        </form>

        <p className="text-center text-sm my-10 text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  )
}
