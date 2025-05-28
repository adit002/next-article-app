import { create } from 'zustand'
import api from '@/lib/axios'
import { AxiosError } from 'axios'

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  message: null,
  user: null,
  setUser: (user) => set({ user }),

  login: async (payload) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.post('/auth/login', payload)
      document.cookie = `token=${res.data.token}; path=/; SameSite=Lax`
      set({ loading: false, message: res?.data?.message || 'Login success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Login failed', loading: false })
    }
  },

  registerUser: async (payload) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.post('/auth/register', payload)
      set({ loading: false, message: res?.data?.message || 'Register success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Register failed', loading: false })
    }
  },

  logout: () => {
    set({ loading: true, error: null, message: null })
    document.cookie = 'token=; Max-Age=0; path=/;'
    setTimeout(() => {
      set({
        loading: false,
        error: null,
        message: 'Logout success',
      })
    }, 500)
  },
}))
