import { useGetEverithingQuery, useGetTopHeadlinesQuery } from '@/service/baseQuery/appApi'
import { Pagination, Skeleton, Typography } from 'antd'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { lazy, Suspense, useEffect, useMemo } from 'react'
const { Title, Paragraph } = Typography
const CardSearch = lazy(() => import('@/components/ui/CardSearch'))
const CardArticle = lazy(() => import('@/components/ui/CardArticle'))

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currPage = Number(searchParams.get('page') || '1')
  const currLimit = Number(searchParams.get('limit') || '20')
  const search = searchParams.get('q') || ''

  const queryArgs = useMemo(
    () => ({
      q: search,
      page: currPage,
      pageSize: currLimit
    }),
    [search, currPage, currLimit]
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [search])

  const { data, isLoading, isFetching } = useGetEverithingQuery(queryArgs)

  const { data: dataHeadlines, isLoading: isLoadingHeadlines } = useGetTopHeadlinesQuery({
    category: 'technology',
    page: 1,
    pageSize: 50
  })

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>{search} | Hend News</title>
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_BASE_URL}/products${window.location.search}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={search} />
        <meta property="og:image" content="http://localhost:3000/images/og-image.png" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_BASE_URL}/products${window.location.search}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={search} />
        <meta
          name="twitter:url"
          content={`${import.meta.env.VITE_BASE_URL}/products${window.location.search}`}
        />
        <meta name="twitter:image" content="http://localhost:3000/images/og-image.png" />
      </Helmet>
      <section className="w-full px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4">
            {isLoading || isFetching ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex gap-4 rounded-lg bg-white p-4 shadow">
                  <div className="flex flex-1 flex-col justify-between">
                    <Skeleton active style={{ width: '70%', marginBottom: 0 }} />
                    <Skeleton
                      active
                      title={false}
                      paragraph={{ rows: 1, width: ['100%', '80%'] }}
                    />
                  </div>
                  <div className="h-[100px] w-[150px] flex-shrink-0 rounded-md bg-gray-200">
                    <Skeleton.Image style={{ width: 150, height: 100 }} active />
                  </div>
                </div>
              ))
            ) : data?.articles?.length === 0 ? (
              <div className="p-6 text-center">
                <Title level={4}>Tidak ditemukan hasil dari "{search}"</Title>
                <Paragraph className="m-0 p-0 text-sm leading-tight">
                  Coba gunakan kata kunci lain atau periksa ejaan kamu.
                </Paragraph>
              </div>
            ) : (
              <>
                <Suspense
                  fallback={Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="flex gap-4 rounded-lg bg-white p-4 shadow">
                      <div className="flex flex-1 flex-col justify-between">
                        <Skeleton active style={{ width: '70%', marginBottom: 0 }} />
                        <Skeleton
                          active
                          title={false}
                          paragraph={{ rows: 1, width: ['100%', '80%'] }}
                        />
                      </div>
                      <div className="h-[100px] w-[150px] flex-shrink-0 rounded-md bg-gray-200">
                        <Skeleton.Image style={{ width: 150, height: 100 }} active />
                      </div>
                    </div>
                  ))}
                >
                  {data?.articles?.map(article => (
                    <CardSearch key={article.url} data={article} />
                  ))}
                </Suspense>
                {(data?.totalResults ?? 0) > currLimit && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      current={currPage}
                      pageSize={currLimit}
                      total={Math.min(data?.totalResults ?? 0, 1000)}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-6 py-10">
        <Title level={4}>Kamu Mungkin Penasaran</Title>

        <div className="relative w-full max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {isLoadingHeadlines ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="w-[200px] overflow-hidden rounded-lg bg-white shadow">
                  <Skeleton.Image style={{ width: 200000, height: 120, marginBottom: 12 }} active />
                  <Skeleton.Input style={{ width: '60%', marginBottom: 8 }} size="small" active />
                  <Skeleton active title={false} paragraph={{ rows: 2, width: ['100%', '80%'] }} />
                </div>
              ))
            ) : (
              <Suspense
                fallback={Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="w-[200px] overflow-hidden rounded-lg bg-white shadow">
                    <Skeleton.Image style={{ width: 200, height: 120, marginBottom: 12 }} active />
                    <Skeleton.Input style={{ width: '60%', marginBottom: 8 }} size="small" active />
                    <Skeleton
                      active
                      title={false}
                      paragraph={{ rows: 2, width: ['100%', '80%'] }}
                    />
                  </div>
                ))}
              >
                {dataHeadlines?.articles?.map(article => (
                  <CardArticle key={article.url} data={article} />
                ))}
              </Suspense>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchPage
