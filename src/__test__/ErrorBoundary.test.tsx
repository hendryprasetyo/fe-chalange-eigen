import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from '@/components/errorBoundary/errorBoundary'
import { BadChild } from './mock'

/* ------------------------------------------------------------------ */
/* Dummy component for test purposes                                 */
function GoodChild() {
  return <div data-testid="good-child">OK</div>
}

/* ------------------------------------------------------------------ */
describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks() // restore console.error spy
  })

  /* 1. Normal children render ------------------------------------ */
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('good-child')).toBeInTheDocument()
    /* ensure fallback UI does not appear */
    expect(screen.queryByText(/Something Went Wrong/i)).not.toBeInTheDocument()
  })

  /* 2. Renders fallback on error --------------------------------- */
  it('catches child error and displays fallback UI', () => {
    /* Silence console.error for cleaner test output */
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    )

    /* Fallback UI is shown */
    expect(screen.getByText(/Something Went Wrong/i)).toBeInTheDocument()

    /* GoodChild is clearly not rendered */
    expect(screen.queryByTestId('good-child')).not.toBeInTheDocument()
  })
})
