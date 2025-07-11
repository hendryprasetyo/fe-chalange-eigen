import ClientRoutes from '@/components/ClientRoutes/ClientRoutes'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/routes', async () => {
  const DummyComponent = () => <div data-testid="dummy-page">Page</div>
  return {
    default: [
      {
        path: '/',
        component: DummyComponent,
        isProtected: false
      },
      {
        path: '/protected',
        component: DummyComponent,
        isProtected: true,
        layout: ({ children }: { children: React.ReactNode }) => (
          <div data-testid="layout">{children}</div>
        )
      }
    ]
  }
})

vi.mock('@/container/Client', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="client-wrapper">{children}</div>
  )
}))

describe('ClientRoutes', () => {
  it('renders routes correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ClientRoutes />
      </MemoryRouter>
    )

    expect(await screen.findByTestId('dummy-page')).toBeInTheDocument()
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('client-wrapper')).toBeInTheDocument()
  })
})
