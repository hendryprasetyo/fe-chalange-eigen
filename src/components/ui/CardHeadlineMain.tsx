import { TResponseArticles } from '@/types/type'
import { Typography, Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImage from '@/assets/placeholder_image.jpg'

const { Title, Paragraph } = Typography

type Props = {
  data: TResponseArticles
}

const CardHeadlineMain: FC<Props> = ({ data }) => {
  const [backgroundUrl, setBackgroundUrl] = useState(PlaceholderImage)

  useEffect(() => {
    const img = new Image()
    const url = data.urlToImage || ''
    img.src = url

    img.onload = () => setBackgroundUrl(url)
    img.onerror = () => setBackgroundUrl(PlaceholderImage)
  }, [data.urlToImage])

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-cover bg-center shadow-md sm:h-[350px] md:h-[500px]"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4 text-white sm:p-6">
        <Paragraph className="text-xs text-neutral-100">
          {new Date(data.publishedAt).toLocaleDateString()} • {data.source.name}
        </Paragraph>
        <Title
          data-testid="article-title"
          level={3}
          className="!mb-2 !text-base !text-white sm:!text-lg md:!text-2xl"
        >
          {data.title}
        </Title>
        <Paragraph
          data-testid="article-description"
          className="mb-3 text-sm text-gray-200"
          ellipsis={{ rows: 2 }}
        >
          {data.description}
        </Paragraph>
        <Link data-testid="detail-link" to={data.url} target="_blank" rel="noopener noreferrer">
          <Button type="primary">Lanjutkan Membaca</Button>
        </Link>
      </div>
    </div>
  )
}

export default CardHeadlineMain
