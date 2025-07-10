import NotFound from '@/pages/notFound/notFound'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

describe('NotFound Page', () => {
  it('should render image, message, and redirect link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    // ✅ Check if image renders
    const image = screen.getByTestId('image-notfound')
    expect(image).toBeInTheDocument()

    // ✅ Check if message appears
    const message = screen.getByText(/Page not found!/i)
    expect(message).toBeInTheDocument()

    // ✅ Check if redirect link is rendered
    const link = screen.getByRole('link', { name: /Redirect Home/i })
    expect(link).toHaveAttribute('href', '/')
  })
})
