import { render, screen } from '@testing-library/react'
import CardSearch from '@/components/ui/CardSearch'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import { articleMock } from './mock'

describe('CardSearch', () => {
  test('renders surce name', () => {
    render(
      <MemoryRouter>
        <CardSearch data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-source-name')).toHaveTextContent(articleMock.source.name)
  })

  test('renders image with correct alt', () => {
    render(
      <MemoryRouter>
        <CardSearch data={articleMock} />
      </MemoryRouter>
    )
    const img = screen.getByRole('img') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.alt).toBe(articleMock.title)
  })

  test('renders title', () => {
    render(
      <MemoryRouter>
        <CardSearch data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-title')).toHaveTextContent(articleMock.title)
  })
  test('renders description', () => {
    render(
      <MemoryRouter>
        <CardSearch data={articleMock} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('article-description')).toHaveTextContent(articleMock.description)
  })

  test('renders read more link with correct href and target', () => {
    render(
      <MemoryRouter>
        <CardSearch data={articleMock} />
      </MemoryRouter>
    )
    const link = screen.getByTestId('detail-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', articleMock.url)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
