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

const schema = z.object({
  file: z.custom<File>(
    (file) => file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
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
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('✅ Form submitted:', data)
  }
  const categoryOptions = [{ value: 'category', label: 'Category' }]
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
