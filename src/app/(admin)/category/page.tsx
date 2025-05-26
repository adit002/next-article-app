'use client'
import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Pagination from '@/components/common/Pagination'
import { useState } from 'react'
import ConfirmModal from '@/components/modal/Confirm'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  category: z.string().min(1, 'Please select category'),
})
type FormData = z.infer<typeof schema>
export default function CategoryPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [message, setMessage] = useState('')

  const handleConfirm = () => {
    console.log('confirm')
  }
  const clickAction = (type: string) => {
    setIsOpen(!isOpen)
    switch (type) {
      case 'add':
        setTitle('Add Category')
        setConfirmText('Add')
        setMessage('')
        reset()
        break
      case 'edit':
        setTitle('Edit Category')
        setConfirmText('Save Changes')
        setMessage('')
        break
      case 'delete':
        setTitle('Delete Category')
        setConfirmText('Delete')
        setMessage(
          'Delete category “Technology”? This will remove it from master data permanently.'
        )
        break
      default:
        break
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log('✅ Form submitted:', data)
  }
  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6 border-b border-[#e3e8ef]">
        <h4 className="font-bold">Total Category : 25</h4>
      </div>
      <div className="p-6 border-b border-[#e3e8ef] flex justify-between">
        <Input name="search" type="search" icon="search" placeholder="Search by title" />
        <Button
          variant="primary"
          type="button"
          className="flex items-center"
          onClick={() => clickAction('add')}
        >
          <Plus />
          Add Category
        </Button>
      </div>
      <div className="border-b border-[#e3e8ef]">
        <div className=" px-4 py-3 grid grid-cols-3 gap-4 text-center bg-[#f3f4f6]">
          <h5>Category</h5>
          <h5>Created at</h5>
          <h5>Action</h5>
        </div>
      </div>
      <div className="border-b border-[#e3e8ef]">
        <div className=" px-4 py-3 grid grid-cols-3 gap-4 text-center items-center text-sm">
          <h6>Technology</h6>
          <h6>April 13, 2025 10:55:12</h6>
          <div className="flex gap-3 justify-center">
            <a
              onClick={() => clickAction('edit')}
              className="text-blue-600 font-medium underline cursor-pointer underline"
            >
              Edit
            </a>
            <a
              onClick={() => clickAction('delete')}
              className="text-red-600 font-medium underline cursor-pointer underline"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-[#e3e8ef]">
        <div className=" px-4 py-3 grid grid-cols-3 gap-4 text-center items-center text-sm">
          <h6>Technology</h6>
          <h6>April 13, 2025 10:55:12</h6>
          <div className="flex gap-3 justify-center">
            <Link href="/edit" className="text-blue-600 font-medium underline">
              Edit
            </Link>
            <Link href="/delete" className="text-red-600 font-medium underline">
              Delete
            </Link>
          </div>
        </div>
      </div>
      <Pagination currentPage={1} pageCount={10} basePath="/articles" />
      <ConfirmModal
        isOpen={isOpen}
        title={title}
        cancelText="Cancel"
        confirmText={confirmText}
        message={message}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        hideFooter={['Add Category', 'Edit Category'].includes(title)}
      >
        {['Add Category', 'Edit Category'].includes(title) && (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 space-y-4">
            <Input
              label="Category"
              name="category"
              register={register('category')}
              error={errors.category?.message}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </ConfirmModal>
    </div>
  )
}
