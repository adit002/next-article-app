import { create } from 'zustand'
import api from '@/lib/axios'

type UploadState = {
  uploadFileToS3: (file: File) => Promise<string>
}

export const useUploadStore = create<UploadState>(() => ({
  uploadFileToS3: async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await api.post('/upload', formData, {
      isMultipart: true,
    })

    return res.data.imageUrl
  },
}))
