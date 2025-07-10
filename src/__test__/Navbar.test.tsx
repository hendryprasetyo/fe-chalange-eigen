import Navbar from '@/components/Navbar'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test, vi, beforeEach } from 'vitest'

// Mock useNavigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe('Navbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('should render logo name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByTestId('logo-name')).toBeInTheDocument()
  })

  test('should render search input', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/search news/i)).toBeInTheDocument()
  })

  test('should sync search input from URL query param', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=testing']}>
        <Navbar />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText(/search news/i)
    expect(input).toHaveValue('testing')
  })

  test('should call navigate on search with valid value', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText(/search news/i)
    await user.type(input, 'vitest')
    await user.keyboard('{enter}')

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=vitest&page=1&limit=30')
  })

  test('should not navigate on empty search value', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText(/search news/i)
    await user.clear(input)
    await user.keyboard('{enter}')

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
