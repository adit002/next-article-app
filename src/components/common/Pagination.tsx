'use client'

import ReactPaginate from 'react-paginate'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  pageCount: number
  currentPage: number
  basePath: string
}

export default function Pagination({ pageCount, currentPage, basePath }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = ({ selected }: { selected: number }) => {
    const page = selected + 1
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) params.delete('page')
    else params.set('page', String(page))
    router.push(`${basePath}?${params.toString()}`)
  }

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
      onPageChange={handlePageChange}
      containerClassName="flex gap-1 justify-center mt-6 text-sm"
      pageClassName="px-3 py-1 rounded cursor-pointer"
      activeClassName="bg-white  border border-[#E2E8F0]"
      previousLabel="< Previous"
      nextLabel="Next ›"
      previousClassName="px-3 py-1 cursor-pointer"
      nextClassName="px-3 py-1 cursor-pointer"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  )
}
