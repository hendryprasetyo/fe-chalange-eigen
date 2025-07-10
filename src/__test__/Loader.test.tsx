import { render, screen } from '@testing-library/react'
import Loader from '@/components/ui/Loader'
import { describe, test, expect } from 'vitest'

describe('Loader', () => {
  test('renders loader when isOpen is true', () => {
    render(<Loader isOpen={true} />)
    const loaderElement = screen.getByTestId('loader-wrapper')
    expect(loaderElement).toBeInTheDocument()
    expect(loaderElement).toHaveClass('flex')
  })

  test('does not render loader when isOpen is false', () => {
    render(<Loader isOpen={false} />)
    const loaderElement = screen.getByTestId('loader-wrapper')
    expect(loaderElement).toHaveClass('hidden')
  })

  test('renders all loader squares', () => {
    render(<Loader isOpen={true} />)
    const squares = screen.getAllByTestId('loader-square')
    expect(squares.length).toBe(7)
  })
})
