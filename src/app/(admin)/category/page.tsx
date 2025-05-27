'use client'
import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { Plus } from 'lucide-react'
import Pagination from '@/components/common/Pagination'
import { useState, useEffect } from 'react'
import ConfirmModal from '@/components/modal/Confirm'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCategoriesState } from '@/store/categoryStore'
import { formatDateTime } from '@/utils/formatDate'
import { useSearchParams } from 'next/navigation'
import Toast from '@/components/common/Toast'

const schema = z.object({
  category: z.string().min(1, 'Please select category'),
})
type FormData = z.infer<typeof schema>

export default function CategoryPage() {
  const getState = useCategoriesState.getState
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [dataDetailCategory, setDataDetailCategory] = useState<{ id: string; name: string }>()
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const page = Number(searchParams.get('page')) || 1
  const {
    categoryDataList,
    categoryDataListPage,
    categoryDataListData,
    categoryAdd,
    categoryEdit,
    categoryDelete,
  } = useCategoriesState()
  const fetchCategories = useCategoriesState((state) => state.categoryList)
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState({ title: '', confirmText: '', message: '' })
  const handleConfirm = async () => {
    await categoryDelete(dataDetailCategory!.id)
    toastMessageSetting()
    fetchCategories(page, debouncedSearch)
  }
  const clickAction = (type: string, data: { id: string; name: string }) => {
    setIsOpen(!isOpen)
    switch (type) {
      case 'add':
        setModalData({ title: 'Add Category', confirmText: 'Add', message: '' })
        reset({ category: '' })
        break
      case 'edit':
        setModalData({ title: 'Edit Category', confirmText: 'Save Changes', message: '' })
        reset({ category: data?.name || '' })
        setDataDetailCategory({ id: data.id, name: data.name })
        break
      case 'delete':
        setModalData({
          title: 'Delete Category',
          confirmText: 'Delete',
          message:
            'Delete category “Technology”? This will remove it from master data permanently.',
        })
        setDataDetailCategory({ id: data.id, name: data.name })
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

  const onSubmit = async (data: FormData) => {
    if (modalData.title === 'Add Category') {
      await categoryAdd({ name: data.category })
    } else {
      await categoryEdit({ name: data.category }, dataDetailCategory!.id)
    }

    toastMessageSetting()
    await fetchCategories(page, debouncedSearch)
  }

  const toastMessageSetting = () => {
    const { error, message } = getState()
    setToast({
      type: error ? 'error' : 'success',
      message: error ?? message ?? 'Something went wrong',
    })
    setIsOpen(false)
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [search])
  useEffect(() => {
    ;(async () => {
      await fetchCategories(page, debouncedSearch)
      toastMessageSetting()
    })()
  }, [fetchCategories, page, debouncedSearch])
  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6 border-b border-[#e3e8ef]">
        <h4 className="font-bold">Total Category : {categoryDataListData}</h4>
      </div>
      <div className="p-6 border-b border-[#e3e8ef] flex justify-between">
        <Input
          name="search"
          type="search"
          icon="search"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="primary"
          type="button"
          className="flex items-center"
          onClick={() => clickAction('add', { id: '', name: '' })}
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
      {categoryDataList.map((cat) => (
        <div className="border-b border-[#e3e8ef]" key={cat.id}>
          <div className="px-4 py-3 grid grid-cols-3 gap-4 text-center items-center text-sm">
            <h6>{cat.name}</h6>
            <h6>{formatDateTime(cat.createdAt)}</h6>
            <div className="flex gap-3 justify-center">
              <a
                onClick={() => clickAction('edit', cat)}
                className="text-blue-600 font-medium underline cursor-pointer"
              >
                Edit
              </a>
              <a
                onClick={() => clickAction('delete', cat)}
                className="text-red-600 font-medium underline cursor-pointer"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      ))}

      <Pagination currentPage={page} pageCount={categoryDataListPage} basePath="/category" />
      <ConfirmModal
        isOpen={isOpen}
        title={modalData.title}
        cancelText="Cancel"
        confirmText={modalData.confirmText}
        message={modalData.message}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        hideFooter={['Add Category', 'Edit Category'].includes(modalData.title)}
      >
        {['Add Category', 'Edit Category'].includes(modalData.title) && (
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
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </ConfirmModal>
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
