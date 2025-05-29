'use client'

import { MoveLeft } from 'lucide-react'
import FileUpload from '@/components/common/FileUpload'
import Input from '@/components/form/Input'
import Select from '@/components/form/Select'
import Button from '@/components/common/Button'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import TextEditor from '@/components/common/TextEditor'
import { useParams } from 'next/navigation'
import { useArticlesState } from '@/store/articlesStore'
import { useEffect, useRef, useState } from 'react'
import { useCategoriesState } from '@/store/categoryStore'
import Toast from '@/components/common/Toast'

const schema = z.object({
  file: z
    .string({
      required_error: 'Please upload an image.',
    })
    .trim()
    .url({ message: 'Must be a valid image URL.' })
    .refine(
      (url) =>
        url.toLowerCase().endsWith('.jpg') ||
        url.toLowerCase().endsWith('.jpeg') ||
        url.toLowerCase().endsWith('.png'),
      {
        message: 'Only JPG or PNG images are supported.',
      }
    ),

  title: z.string().min(1, 'Please enter title'),
  category: z.string().min(1, 'Please select category'),
  content: z.string().refine((val) => val.replace(/<[^>]+>/g, '').trim().length > 0, {
    message: 'Content cannot be empty',
  }),
})

type FormData = z.infer<typeof schema>

export default function CreateArticlePage() {
  const [categoryOptions, setCategoryOptions] = useState<OptionSelection[]>([])
  const [resetKey, setResetKey] = useState(0)
  const [typeButton, setTypeButton] = useState('')
  const params = useParams()
  const id = params.slug as string[]
  const fetched = useRef(false)
  const { categoryDataList, categoryList } = useCategoriesState()
  const { articlesDetail, articlesAdd, articlesEdit, articlesDataDetail, setDataDetail } =
    useArticlesState()
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const getState = useArticlesState.getState
  const router = useRouter()
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const payload = {
      imageUrl: data.file,
      title: data.title,
      content: data.content,
      categoryId: data.category,
    }

    if (typeButton == 'upload') {
      if (id?.[0]) {
        await articlesEdit(payload, id?.[0])
      } else {
        await articlesAdd(payload)
      }
      toastMessageSetting()
      resetForm()
      router.push('/articles')
    } else if (typeButton == 'preview') {
      setDataDetail({
        id: '',
        userId: '',
        createdAt: new Date().toString(),
        updatedAt: '',
        ...payload,
      })
      router.push('/detailarticle/preview')
    }
  }

  const toastMessageSetting = () => {
    const { error, message } = getState()
    setToast({
      type: error ? 'error' : 'success',
      message: error ?? message ?? 'Something went wrong',
    })
  }

  const resetForm = () => {
    reset({
      title: '',
      category: '',
      content: '',
    })
    setResetKey((prev) => prev + 1)
  }

  useEffect(() => {
    categoryList(1, '', 100)
  }, [categoryList])

  useEffect(() => {
    setCategoryOptions(
      categoryDataList.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    )
  }, [categoryDataList])

  useEffect(() => {
    if (!id?.[0]) {
      resetForm()
    } else if (!fetched.current) {
      fetched.current = true
      articlesDetail(id?.[0])
    }
  }, [id, articlesDetail, reset])

  useEffect(() => {
    if (articlesDataDetail) {
      reset({
        title: articlesDataDetail.title ?? '',
        category: articlesDataDetail.categoryId ?? '',
        content: id?.[0] ? articlesDataDetail.content : '',
        file: id?.[0] ? articlesDataDetail.imageUrl ?? '' : '',
      })
    }
  }, [articlesDataDetail, reset])
  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6">
        <div
          className="flex gap-3 font-semibold pt-4 pb-5 cursor-pointer"
          onClick={() => router.push('/articles')}
        >
          <MoveLeft />
          {`${id?.[0] ? 'Edit' : 'Create'} Article`}
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUpload
                  label="Thumbnails"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.file?.message as string}
                  resetKey={resetKey}
                  initialPreviewUrl={articlesDataDetail?.imageUrl}
                />
              )}
            />

            <Input
              label="Title"
              name="title"
              register={register('title')}
              error={errors.title?.message}
              className="my-4"
            />
            <Select
              label="Category"
              name="category"
              register={register('category')}
              options={categoryOptions}
              error={errors.category?.message}
              className="my-4"
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.content?.message}
                />
              )}
            />
            <div className="flex justify-end gap-3 mt-14">
              <Button variant="white" type="button" onClick={() => router.push('/articles')}>
                Cancel
              </Button>
              <Button variant="secondary" type="submit" onClick={() => setTypeButton('preview')}>
                Preview
              </Button>
              <Button variant="primary" type="submit" onClick={() => setTypeButton('upload')}>
                Upload
              </Button>
            </div>
          </form>
        </div>
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
