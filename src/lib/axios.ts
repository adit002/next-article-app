import axios, { InternalAxiosRequestConfig } from 'axios'

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  isMultipart?: boolean
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

api.interceptors.request.use((config: CustomRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = getCookie('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  if (config.isMultipart && config.headers) {
    delete config.headers['Content-Type']
  } else if (config.headers && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

export default api
