import { render, screen } from '@testing-library/react'
import CardArticle from '@/components/ui/CardArticle'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import moment from 'moment'
import { articleMock } from './mock'

describe('CardArticle', () => {
  test('renders title', () => {
    render(
      <MemoryRouter>
        <CardArticle data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-title')).toHaveTextContent(articleMock.title)
  })
  test('renders formatted date', () => {
    const formatted = moment(articleMock.publishedAt).format('DD MMMM YYYY')
    render(
      <MemoryRouter>
        <CardArticle data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-date')).toHaveTextContent(formatted)
  })

  test('renders image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <CardArticle data={articleMock} />
      </MemoryRouter>
    )
    const img = screen.getByTestId('article-image') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.alt).toBe(articleMock.title)
    expect(img.src).toContain(articleMock.urlToImage)
  })

  test('renders read more link with correct href and target', () => {
    render(
      <MemoryRouter>
        <CardArticle data={articleMock} />
      </MemoryRouter>
    )
    const link = screen.getByTestId('read-more-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', articleMock.url)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
