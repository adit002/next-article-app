import { create } from 'zustand'
import api from '@/lib/axios'
import { AxiosError } from 'axios'

export const useArticlesState = create<ArticlesState>((set) => ({
  loading: false,
  error: null,
  message: null,
  articlesDataList: [],
  articlesDataListPage: 0,
  articlesDataListData: 0,
  articlesDataDetail: undefined,
  filterArticles: undefined,
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
  articlesList: async (page: number, search?: string, category?: string, limit?: number) => {
    set({ loading: true, error: null, message: null })
    try {
      const res = await api.get(
        `/articles?page=${page}&search=${encodeURIComponent(search ?? '')}&category=${
          category ?? ''
        }&limit=${limit ?? 10}`
      )
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
  setDataDetail: async (payload) => {
    set({ loading: true, error: null, message: null, articlesDataDetail: payload })
  },
  setAttributeFilter: async (payload) => {
    set({ loading: true, error: null, message: null, filterArticles: payload })
  },
}))
