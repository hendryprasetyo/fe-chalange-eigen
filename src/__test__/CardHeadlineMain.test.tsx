import { render, screen } from '@testing-library/react'
import CardHeadlineMain from '@/components/ui/CardHeadlineMain'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { articleMock } from './mock'

describe('CardHeadlineMain', () => {
  test('renders title', () => {
    render(
      <MemoryRouter>
        <CardHeadlineMain data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-title')).toHaveTextContent(articleMock.title)
  })
  test('renders description', () => {
    render(
      <MemoryRouter>
        <CardHeadlineMain data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-description')).toHaveTextContent(articleMock.description)
  })

  test('renders read more link with correct href and target', () => {
    render(
      <MemoryRouter>
        <CardHeadlineMain data={articleMock} />
      </MemoryRouter>
    )
    const link = screen.getByTestId('detail-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', articleMock.url)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
