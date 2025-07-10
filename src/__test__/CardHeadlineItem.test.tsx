import { render, screen } from '@testing-library/react'
import CardHeadlineItem from '@/components/ui/CardHeadlineItem'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { articleMock } from './mock'

describe('CardHeadlineItem', () => {
  test('renders title', () => {
    render(
      <MemoryRouter>
        <CardHeadlineItem data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-title')).toHaveTextContent(articleMock.title)
  })

  test('renders image with correct alt', () => {
    render(
      <MemoryRouter>
        <CardHeadlineItem data={articleMock} />
      </MemoryRouter>
    )
    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.alt).toBe(articleMock.title)
  })
  test('renders read more link with correct href and target', () => {
    render(
      <MemoryRouter>
        <CardHeadlineItem data={articleMock} />
      </MemoryRouter>
    )
    const link = screen.getByTestId('detail-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', articleMock.url)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
