import { TResponseArticles } from '@/types/type'
import { Image } from 'antd'
import { Typography } from 'antd'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImage from '@/assets/placeholder_image.jpg'
import moment from 'moment'
import { useWindowWidth } from '@/lib/hooks'

const { Title, Paragraph, Text } = Typography
type Props = { data: TResponseArticles }
const CardSearch: FC<Props> = ({ data }) => {
  const width = useWindowWidth()
  const { url, title, description, source, urlToImage, publishedAt } = data

  let rowsElipsis = 5
  if (width < 670) {
    rowsElipsis = 1
  } else {
    rowsElipsis = 2
  }
  return (
    <Link
      to={url}
      target="_blank"
      data-testid="detail-link"
      rel="noopener noreferrer"
      className="group flex w-full items-start justify-between gap-4 rounded-lg p-2 transition hover:bg-gray-100"
    >
      {/* Text content */}
      <div className="flex w-1/2 flex-1 flex-col gap-2 sm:w-full">
        <Text
          data-testid="article-source-name"
          type="secondary"
          className="text-xs font-semibold !text-blue-600"
        >
          {source.name}
        </Text>

        <Title
          data-testid="article-title"
          level={5}
          className="!mb-0 group-hover:underline"
          ellipsis={{ rows: rowsElipsis }}
        >
          {title}
        </Title>
        <Paragraph
          data-testid="article-description"
          className="!mb-0 text-sm text-gray-700"
          ellipsis={{ rows: rowsElipsis }}
        >
          {description}
        </Paragraph>
        <Text type="secondary" className="text-xs">
          {moment(publishedAt).fromNow()}
        </Text>
      </div>

      {/* Image */}
      <div className="h-[70px] w-[120px] flex-shrink-0 self-stretch overflow-hidden rounded-md sm:h-[130px] sm:w-[200px]">
        <Image
          src={urlToImage}
          alt={title}
          data-testid="article-image"
          title={title}
          height={'100%'}
          width={'100%'}
          preview={false}
          className="!h-full !w-full object-cover"
          fallback={PlaceholderImage}
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PlaceholderImage
          }}
        />
      </div>
    </Link>
  )
}

export default memo(CardSearch)
