import CardArticle from '@/components/ui/CardArticle'
import CardHeadlineItem from '@/components/ui/CardHeadlineItem'
import CardHeadlineMain from '@/components/ui/CardHeadlineMain'
import { useGetTopHeadlinesQuery } from '@/service/baseQuery/appApi'
import { Carousel, Image, Skeleton, Typography, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import iklan1 from '../../assets/images/iklan_1.jpg'
import iklan2 from '../../assets/images/iklan_2.jpg'
import iklan3 from '../../assets/images/iklan_3.jpg'
import { useWindowWidth } from '@/lib/hooks'
import PlaceholderImage from '@/assets/placeholder_image.jpg'
const { Title } = Typography

const Home = () => {
  const width = useWindowWidth()
  const { isSuccess, data, isLoading } = useGetTopHeadlinesQuery({
    country: 'us',
    category: 'general',
    page: 1,
    pageSize: 20
  })

  const carouselRef = useRef<any>(null)

  if (isLoading) {
    return (
      <>
        {/* Headline Section Skeleton */}
        <section className="px-4 py-6" data-testid="headline-skeleton">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {/* Headline Main (2 col) */}
            <div className="rounded-lg bg-white p-4 shadow md:col-span-2">
              <div className="mb-4 h-[240px] w-full overflow-hidden rounded-md">
                <Skeleton.Image style={{ width: 20000, height: 240 }} active />
              </div>
              <Skeleton.Input style={{ width: '30%', marginBottom: 8 }} size="small" active />
              <Skeleton
                active
                title={{ width: '80%' }}
                paragraph={{ rows: 2, width: ['100%', '90%'] }}
              />
              <Skeleton.Button style={{ marginTop: 12 }} active size="small" />
            </div>

            {/* Side headlines (1 col) */}
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-md bg-white p-2 shadow">
                  <Skeleton.Image style={{ width: 80, height: 60 }} active />
                  <div className="flex-1">
                    <Skeleton.Input style={{ width: '70%', marginBottom: 4 }} size="small" active />
                    <Skeleton paragraph={{ rows: 1, width: '90%' }} active title={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Iklan Carousel Section */}
        <section className="flex justify-center px-4 py-10">
          <div className="w-full max-w-6xl overflow-hidden rounded-xl shadow-md">
            <div className="h-[200px] w-full animate-pulse rounded-xl bg-gray-200" />
          </div>
        </section>

        {/* Popular Section Skeleton */}
        <section className="flex flex-col items-center justify-center gap-6 py-10">
          <Title level={4}>Terpopuler</Title>

          <div className="relative w-full max-w-7xl px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="w-[200px] overflow-hidden rounded-lg bg-white shadow">
                  <Skeleton.Image style={{ width: 200000, height: 120, marginBottom: 12 }} active />
                  <Skeleton.Input style={{ width: '60%', marginBottom: 8 }} size="small" active />
                  <Skeleton active title={false} paragraph={{ rows: 2, width: ['100%', '80%'] }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  if (!isSuccess || !data?.articles?.length) return null

  let itemsPerSlide = 5
  if (width < 570) {
    itemsPerSlide = 1
  } else if (width < 770) {
    itemsPerSlide = 2
  } else if (width < 980) {
    itemsPerSlide = 3
  } else if (width < 1280) {
    itemsPerSlide = 4
  } else if (width < 1536) {
    itemsPerSlide = 5
  }

  const headlineArticles = data.articles.slice(0, 6)
  const popularArticles = data.articles.slice(6, 20)
  const [mainArticle, ...sideArticles] = headlineArticles

  const iklanImages = [iklan1, iklan2, iklan3]

  return (
    <>
      {/* Headline Section */}
      <section className="px-4 py-6" data-testid="headline-main">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <CardHeadlineMain data={mainArticle} />
          </div>
          <div className="flex flex-col gap-4">
            {sideArticles.map(article => (
              <CardHeadlineItem key={article.url} data={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Iklan Carousel Section */}
      <section className="flex justify-center px-4 py-10" data-testid="ads-carousel">
        <div className="w-full max-w-6xl overflow-hidden rounded-xl shadow-md">
          <Carousel autoplay dots>
            {iklanImages.map((imgSrc, index) => (
              <Image
                key={index}
                src={imgSrc}
                alt={`Iklan ${index + 1}`}
                width="100%"
                height={width < 768 ? 120 : 200}
                style={{ objectFit: 'cover', borderRadius: 12 }}
                preview={false}
                fallback="/placeholder.jpg"
                placeholder={<div style={{ height: 200, backgroundColor: '#f0f0f0' }} />}
                onError={e => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = PlaceholderImage
                }}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Popular Section with Manual Carousel */}
      <section
        className="flex flex-col items-center justify-center gap-6 py-10"
        data-testid="popular-section"
      >
        <Title level={4}>Terpopuler</Title>

        <div className="relative w-full max-w-7xl">
          <Carousel ref={carouselRef} dots={false}>
            {Array.from({ length: Math.ceil(popularArticles.length / itemsPerSlide) }).map(
              (_, groupIndex) => (
                <div key={groupIndex}>
                  <div className="flex flex-wrap justify-center gap-4 px-4">
                    {popularArticles
                      .slice(groupIndex * itemsPerSlide, groupIndex * itemsPerSlide + itemsPerSlide)
                      .map(article => (
                        <CardArticle key={article.url} data={article} />
                      ))}
                  </div>
                </div>
              )
            )}
          </Carousel>

          <Button
            type="text"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current?.prev()}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md"
          />
          <Button
            type="text"
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => carouselRef.current?.next()}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md"
          />
        </div>
      </section>
    </>
  )
}

export default Home
