'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useArticlesState } from '@/store/articlesStore'
import { useEffect } from 'react'
import { formatDate } from '@/utils/formatDate'
import { redirect } from 'next/navigation'

export default function DetailArticleDetail() {
  const { articlesDetail, articlesDataDetail, articlesList, articlesDataList } = useArticlesState()
  const params = useParams()
  const id = params.slug as string[]

  useEffect(() => {
    if (id?.[0] !== 'preview') {
      articlesDetail(id?.[0])
    } else {
      if (!articlesDataDetail) {
        redirect('/articles')
      }
    }
    articlesList(1, '', '', 100)
  }, [id, articlesDetail])

  return (
    <div className="min-h-screen">
      {articlesDataDetail && (
        <div className="max-w-5/6 mx-auto px-4 py-10 black">
          <div className="text-center text-sm text-gray-500 mb-3">
            {formatDate(articlesDataDetail?.createdAt)} &nbsp; • &nbsp; Created by Admin
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {articlesDataDetail.title}
          </h1>

          <div className="rounded-xl overflow-hidden mb-6">
            <Image
              src={articlesDataDetail.imageUrl}
              alt="Figma Dev Mode"
              width={300}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              {articlesDataDetail?.category?.name}
            </span>
          </div>
          <div className="prose prose-sm sm:prose-base max-w-none text-justify mt-20"></div>
          <div
            dangerouslySetInnerHTML={{ __html: articlesDataDetail.content }}
            className="prose prose-sm sm:prose-base max-w-none text-justify mt-20"
          />
        </div>
      )}
      {articlesDataList &&
      articlesDataList.filter((item) => item?.categoryId == articlesDataDetail?.categoryId)
        .length ? (
        <div className="max-w-5/6 mx-auto px-4 py-10 black">
          <h2 className="font-bold">Other articles</h2>
          <pre></pre>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articlesDataList
              .filter((item) => item?.categoryId == articlesDataDetail?.categoryId)
              .splice(0, 3)
              .map((article) => (
                <div
                  className="bg-white overflow-hidden max-w-md mx-auto px-0 mt-5 cursor-pointer"
                  key={article.id}
                >
                  <Image
                    src={article.imageUrl}
                    alt="article image"
                    width={386}
                    height={240}
                    className="rounded-xl h-60 w-96 object-fill"
                  />
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-500">{formatDate(article.createdAt)}</p>
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
        </div>
      ) : (
        <div className="max-w-5/6 mx-auto px-4 black">Data not found</div>
      )}
    </div>
  )
}
