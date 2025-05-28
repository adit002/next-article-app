'use client'

import Select from '@/components/form/Select'
import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Pagination from '@/components/common/Pagination'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/Confirm'
import { useState, useEffect } from 'react'
import Toast from '@/components/common/Toast'
import { useArticlesState } from '@/store/articlesStore'
import { useSearchParams } from 'next/navigation'
import { formatDateTime } from '@/utils/formatDate'
import { useCategoriesState } from '@/store/categoryStore'
import Link from 'next/link'

export default function ArticlePage() {
  const router = useRouter()
  const [categoryOptions, setCategoryOptions] = useState<OptionSelection[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { categoryDataList, categoryList } = useCategoriesState()
  const getState = useArticlesState.getState
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [dataDetailArticles, setDataDetailArticles] = useState<ArticleList>()
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const page = Number(searchParams.get('page')) || 1
  const {
    articlesDataList,
    articlesDataListPage,
    articlesDataListData,
    articlesDelete,
    articlesList,
  } = useArticlesState()

  const handleConfirm = async () => {
    await articlesDelete(dataDetailArticles!.id)
    toastMessageSetting()
    await articlesList(page, debouncedSearch)
  }

  const clickAction = (data: ArticleList) => {
    setDataDetailArticles(data)
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
    setCategoryOptions(
      categoryDataList.map((item) => ({
        value: item.name,
        label: item.name,
      }))
    )
  }, [categoryDataList])

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        articlesList(page, debouncedSearch),
        categoryList(page, debouncedSearch, 100),
      ])
      toastMessageSetting()
    }

    fetchData()
  }, [articlesList, categoryList, page, debouncedSearch])

  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6 border-b border-[#e3e8ef]">
        <h4 className="font-bold">Total Articles : {articlesDataListData}</h4>
      </div>
      <div className="p-6 border-b border-[#e3e8ef] flex justify-between">
        <div className="flex gap-3">
          <Select name="category" options={categoryOptions} />
          <Input
            name="search"
            type="search"
            icon="search"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          type="button"
          className="flex items-center"
          onClick={() => router.push('/articles/create')}
        >
          <Plus />
          Add Articles
        </Button>
      </div>
      <div className="border-b border-[#e3e8ef]">
        <div className=" px-4 py-3 grid grid-cols-5 gap-4 text-center bg-[#f3f4f6]">
          <h5>Thumbnails</h5>
          <h5>Title</h5>
          <h5>Category</h5>
          <h5>Created at</h5>
          <h5>Action</h5>
        </div>
      </div>
      {articlesDataList.map((article) => (
        <div className="border-b border-[#e3e8ef]" key={article.id}>
          <div className=" px-4 py-3 grid grid-cols-5 gap-4 text-center items-center text-sm">
            <Image
              src={article.imageUrl}
              width={80}
              height={80}
              alt="image article"
              className="flex place-self-center rounded-md"
            />
            <h6>{article.title}</h6>
            <h6>{article.category.name}</h6>
            <h6>{formatDateTime(article.createdAt)}</h6>
            <div className="flex gap-3 justify-center">
              <a
                onClick={() => clickAction(article)}
                className="text-blue-600 font-medium cursor-pointer underline"
              >
                Preview
              </a>
              <Link
                href={`/articles/create/${article.id}`}
                className="text-blue-600 font-medium underline"
              >
                Edit
              </Link>
              <a
                onClick={() => {
                  clickAction(article)
                  setIsOpen(!isOpen)
                }}
                className="text-red-600 font-medium underline cursor-pointer underline"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      ))}
      <Pagination currentPage={page} pageCount={articlesDataListPage} basePath="/articles" />
      <ConfirmModal
        isOpen={isOpen}
        title="Delete Articles"
        cancelText="Cancel"
        confirmText="Delete"
        message="Deleting this article is permanent and cannot be undone. All related content will be removed."
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
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
