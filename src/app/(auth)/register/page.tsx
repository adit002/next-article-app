'use client'

import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Logo from '@/app/logo.png'
import Link from 'next/link'
import Select from '@/components/form/Select'
import Toast from '@/components/common/Toast'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(8, 'Password must be at least 8 characters long'),
  role: z.string().min(1, 'Please select your role'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { registerUser, loading } = useAuthStore()
  const getState = useAuthStore.getState
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await registerUser(data)
    const { error, message } = getState()
    setToast({
      type: error ? 'error' : 'success',
      message: error ?? message ?? 'Something went wrong',
    })
    router.push('/login')
    reset()
  }
  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
  ]
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
          <Select
            label="Role"
            name="role"
            register={register('role')}
            options={roleOptions}
            error={errors.role?.message}
            className="my-5"
          />
          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Register
          </Button>
        </form>

        <p className="text-center text-sm my-10 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
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
