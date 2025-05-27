import { create } from 'zustand'
import api from '@/lib/axios'
import { AxiosError } from 'axios'

interface CategoriesList {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

interface CategoriesState {
  loading: boolean
  error: string | null
  message: string | null
  categoryDataList: CategoriesList[]
  categoryDataListPage: number
  categoryDataListData: number
  categoryAdd: (payload: { name: string }) => Promise<void>
  categoryEdit: (payload: { name: string }, id: string) => Promise<void>
  categoryDelete: (id: string) => Promise<void>
  categoryList: (page: number, search: string, limit?: number) => Promise<void>
}

export const useCategoriesState = create<CategoriesState>((set) => ({
  loading: false,
  error: null,
  message: null,
  categoryDataList: [],
  categoryDataListPage: 0,
  categoryDataListData: 0,
  categoryAdd: async (payload) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.post('/categories', payload)
      set({ loading: false, message: res?.data?.message || 'Add category success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Add category failed', loading: false })
    }
  },
  categoryEdit: async (payload, id) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.put(`/categories/${id}`, payload)
      set({ loading: false, message: res?.data?.message || 'Edit category success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Edit category failed', loading: false })
    }
  },
  categoryDelete: async (id) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.delete(`/categories/${id}`)
      set({ loading: false, message: res?.data?.message || 'Delete category success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Delete category failed', loading: false })
    }
  },
  categoryList: async (page: number, search: string, limit?: number) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.get(
        `/categories?page=${page}&limit=${limit ? limit : 10}&search=${encodeURIComponent(search)}`
      )
      set({
        loading: false,
        message: res?.data?.message || 'Get list category success',
        categoryDataList: res.data.data,
        categoryDataListPage: res.data.totalPages,
        categoryDataListData: res.data.totalData,
      })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Get list category failed', loading: false })
    }
  },
}))
