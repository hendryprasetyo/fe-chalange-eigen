import { TResponseArticles } from '@/types/type'
import { Image, Typography } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PlaceholderImage from '@/assets/placeholder_image.jpg'
const { Paragraph } = Typography

type Props = { data: TResponseArticles }

const CardHeadlineItem: FC<Props> = ({ data }) => {
  return (
    <Link
      data-testid="detail-link"
      to={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex gap-3 rounded-lg p-2 shadow-sm transition hover:bg-gray-100">
        <div className="flex flex-1 flex-col justify-between">
          <Paragraph className="mb-1 text-xs text-neutral-500" style={{ marginBottom: 0 }}>
            {moment(data.publishedAt).locale('id').format('DD MMMM YYYY')} • {data.source.name}
          </Paragraph>
          <Paragraph
            data-testid="article-title"
            className="mb-0 text-sm font-medium text-gray-900"
            ellipsis={{ rows: 3 }}
            style={{ marginBottom: 0 }}
          >
            {data.title}
          </Paragraph>
        </div>
        <Image
          data-testid="article-image"
          src={data.urlToImage || '/placeholder.jpg'}
          alt={data.title}
          width={100}
          height={75}
          className="rounded-md object-cover"
          preview={false}
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

export default CardHeadlineItem
