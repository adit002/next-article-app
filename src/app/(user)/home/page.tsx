'use client'

import Image from 'next/image'
import { useArticlesState } from '@/store/articlesStore'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { formatDateTime } from '@/utils/formatDate'
import Pagination from '@/components/common/Pagination'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const { articlesDataList, articlesDataListPage, articlesDataListData, articlesList } =
    useArticlesState()

  useEffect(() => {
    articlesList(page)
  }, [articlesList, page])

  return (
    <div className="px-4 min-h-screen">
      {articlesDataList.length ? (
        <>
          <h6 className="pl-16">
            Showing : {articlesDataList.length} of {articlesDataListData} articles
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articlesDataList.map((article) => (
              <div
                className="bg-white overflow-hidden max-w-md mx-auto p-4 cursor-pointer"
                key={article.id}
                onClick={() => router.push(`/detailarticle/${article.id}`)}
              >
                <Image
                  src={article.imageUrl}
                  alt="article image"
                  width={386}
                  height={240}
                  className="rounded-xl h-60 w-96 object-fill"
                />
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-500">{formatDateTime(article.createdAt)}</p>
                  <h2 className="text-lg font-semibold text-gray-900">{article.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: article.content.slice(0, 200) }}
                    className="prose max-w-none"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      {article?.category?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={page} pageCount={articlesDataListPage} basePath="/home" />
        </>
      ) : (
        <div>Data not found</div>
      )}
    </div>
  )
}
