import { create } from 'zustand'
import api from '@/lib/axios'
import { AxiosError } from 'axios'

export interface ArticleList {
  id: string
  userId: string
  categoryId: string
  title: string
  content: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  category: Category
  user: User
}

export interface Category {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
}

interface ArticlesState {
  loading: boolean
  error: string | null
  message: string | null
  articlesDataList: ArticleList[]
  articlesDataDetail: ArticleList | undefined
  articlesDataListPage: number
  articlesDataListData: number
  articlesAdd: (payload: { name: string }) => Promise<void>
  articlesEdit: (payload: { name: string }, id: string) => Promise<void>
  articlesDelete: (id: string) => Promise<void>
  articlesList: (page: number, search: string) => Promise<void>
  articlesDetail: (id: string) => Promise<void>
}

export const useArticlesState = create<ArticlesState>((set) => ({
  loading: false,
  error: null,
  message: null,
  articlesDataList: [],
  articlesDataListPage: 0,
  articlesDataListData: 0,
  articlesDataDetail: undefined,
  articlesAdd: async (payload) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.post('/articles', payload)
      set({ loading: false, message: res?.data?.message || 'Add articles success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Add articles failed', loading: false })
    }
  },
  articlesEdit: async (payload, id) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.put(`/articles/${id}`, payload)
      set({ loading: false, message: res?.data?.message || 'Edit articles success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Edit articles failed', loading: false })
    }
  },
  articlesDelete: async (id) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.delete(`/articles/${id}`)
      set({ loading: false, message: res?.data?.message || 'Delete articles success' })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Delete articles failed', loading: false })
    }
  },
  articlesList: async (page: number, search: string) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.get(`/articles?page=${page}&search=${encodeURIComponent(search)}`)
      set({
        loading: false,
        message: res?.data?.message || 'Get list articles success',
        articlesDataList: res.data.data,
        articlesDataListPage: res.data.total / 10,
        articlesDataListData: res.data.total,
      })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Get list articles failed', loading: false })
    }
  },
  articlesDetail: async (id: string) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.get(`/articles/${id}`)
      set({
        loading: false,
        message: res?.data?.message || 'Get detail articles success',
        articlesDataDetail: res.data,
      })
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>
      set({ error: err.response?.data?.error || 'Get detail articles failed', loading: false })
    }
  },
}))
