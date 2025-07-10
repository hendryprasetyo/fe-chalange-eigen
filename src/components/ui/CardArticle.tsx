import { FC, memo } from 'react'
import { TResponseArticles } from '@/types/type'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import LazyImage from '../Image/LazyImage'

const { Paragraph } = Typography

type Props = {
  data: TResponseArticles
}

const CardArticle: FC<Props> = ({ data }) => {
  return (
    <div className="w-[220px] shrink-0 rounded-xl bg-white shadow transition hover:shadow-md">
      {/* Image */}
      <div className="mb-2 h-[120px] w-full overflow-hidden rounded-t-lg">
        <LazyImage
          data-testid="article-image"
          height={'100%'}
          width={'100%'}
          alt={data.title}
          src={data.urlToImage}
          titleImage={data.title}
        />
      </div>
      <div className="w-full p-2">
        {/* Date and Label */}
        <div className="mb-1 flex items-center justify-between px-1 text-[11px] text-gray-500">
          <span data-testid="article-date">{moment(data.publishedAt).format('DD MMMM YYYY')}</span>
        </div>

        {/* Title */}
        <Paragraph
          data-testid="article-title"
          ellipsis={{ rows: 2 }}
          className="m-0 p-0 px-1 text-xs font-semibold leading-tight"
        >
          {data.title}
        </Paragraph>
        <Link
          data-testid="read-more-link"
          to={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
          aria-label={`Baca selengkapnya tentang ${data.title}`}
        >
          Baca selengkapnya →
        </Link>
      </div>
    </div>
  )
}

export default memo(CardArticle)
