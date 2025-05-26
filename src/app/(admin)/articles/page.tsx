'use client'

import Select from '@/components/form/Select'
import Input from '@/components/form/Input'
import Button from '@/components/common/Button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '@/components/common/Pagination'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/modal/Confirm'
import { useState } from 'react'

export default function ArticlePage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const categoryOptions = [{ value: 'category', label: 'Category' }]
  const image =
    'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg'
  const handleConfirm = () => {
    console.log('confirm')
  }
  return (
    <div className="bg-[#f9fafb] border border-[#e3e8ef] rounded-xl pb-10">
      <div className="p-6 border-b border-[#e3e8ef]">
        <h4 className="font-bold">Total Articles : 25</h4>
      </div>
      <div className="p-6 border-b border-[#e3e8ef] flex justify-between">
        <div className="flex gap-3">
          <Select name="category" options={categoryOptions} />
          <Input name="search" type="search" icon="search" placeholder="Search by title" />
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
      <div className="border-b border-[#e3e8ef]">
        <div className=" px-4 py-3 grid grid-cols-5 gap-4 text-center items-center text-sm">
          <Image
            src={image}
            width={80}
            height={80}
            alt="image article"
            className="flex place-self-center rounded-md"
          />
          <h6>Cybersecurity Essentials Every Developer Should Know</h6>
          <h6>Technology</h6>
          <h6>April 13, 2025 10:55:12</h6>
          <div className="flex gap-3 justify-center">
            <Link href="/preview" className="text-blue-600 font-medium underline">
              Preview
            </Link>
            <Link href="/edit" className="text-blue-600 font-medium underline">
              Edit
            </Link>
            <a
              onClick={() => setIsOpen(true)}
              className="text-red-600 font-medium underline cursor-pointer underline"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
      <Pagination currentPage={1} pageCount={10} basePath="/articles" />
      <ConfirmModal
        isOpen={isOpen}
        title="Delete Articles"
        cancelText="Cancel"
        confirmText="Delete"
        message="Deleting this article is permanent and cannot be undone. All related content will be removed."
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
