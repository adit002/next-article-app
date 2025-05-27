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

const schema = z.object({
  file: z
    .any()
    .transform((val) => {
      if (val instanceof FileList) return val[0]
      return val
    })
    .refine(
      (file) => {
        if (!file) return false

        if (file instanceof File) {
          const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
          const hasContent = file.size > 0
          return isValidType && hasContent
        }

        if (typeof file === 'string') {
          return file.startsWith('http') && file.trim() !== ''
        }

        return false
      },
      {
        message: 'Please enter picture',
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
  const params = useParams()
  const id = params?.slug as string[] | undefined
  const fetched = useRef(false)
  const { categoryDataList } = useCategoriesState()
  const fetchCategories = useCategoriesState((state) => state.categoryList)
  const [resetKey, setResetKey] = useState(0)
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

  const onSubmit = (data: FormData) => {
    console.log('✅ Form submitted:', data)
  }
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])
  const fetchArticlesDetail = useArticlesState((state) => state.articlesDetail)
  const article = useArticlesState((state) => state.articlesDataDetail)
  useEffect(() => {
    fetchCategories(1, '', 100)
  }, [fetchCategories])

  useEffect(() => {
    setCategoryOptions(
      categoryDataList.map((item) => ({
        value: item.name,
        label: item.name,
      }))
    )
  }, [categoryDataList])

  useEffect(() => {
    const slugId = id?.[0]
    if (!slugId) {
      reset({
        title: '',
        category: '',
        content: '',
        file: undefined,
      })
      setResetKey((prev) => prev + 1)
    } else if (!fetched.current) {
      fetched.current = true
      fetchArticlesDetail(slugId)
    }
  }, [id, fetchArticlesDetail, reset])

  useEffect(() => {
    if (article) {
      reset({
        title: article.title ?? '',
        category: article.category.name ?? '',
        content: id?.[0] ? article.content : '',
        file: id?.[0] ? article.imageUrl : undefined,
      })
    }
  }, [article, reset])
  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6">
        <div
          className="flex gap-3 font-semibold pt-4 pb-5 cursor-pointer"
          onClick={() => router.push('/articles')}
        >
          <MoveLeft />
          Create Articles
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <FileUpload
              label="Thumbnails"
              register={register('file')}
              error={errors.file?.message as string}
              initialPreviewUrl={article?.imageUrl}
              resetKey={resetKey}
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
              <Button variant="secondary" type="submit">
                Preview
              </Button>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
