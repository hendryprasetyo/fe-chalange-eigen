import Home from '@/pages/home/home'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as appApi from '@/service/baseQuery/appApi'
import { makeArticleMock } from './mock'
vi.mock('@/lib/hooks', () => ({
  useWindowWidth: () => 1024 // cukup besar → itemsPerSlide = 4
}))
vi.mock('@/service/baseQuery/appApi', () => ({
  useGetTopHeadlinesQuery: vi.fn() // kita isi nilai return‑nya di tiap tes
}))
const mockedUseGetTopHeadlinesQuery = appApi.useGetTopHeadlinesQuery as ReturnType<typeof vi.fn>
const dummyArticles = Array.from({ length: 20 }, (_, i) => makeArticleMock(i + 1))
describe('Home Page', () => {
  afterEach(() => vi.clearAllMocks())
  it('It should return skeleton if loading true', () => {
    mockedUseGetTopHeadlinesQuery.mockReturnValue({
      isLoading: true,
      isSuccess: false,
      data: undefined
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByTestId('headline-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('headline-main')).not.toBeInTheDocument()
  })

  it('merender headline, iklan, dan section Terpopuler pada state sukses', () => {
    mockedUseGetTopHeadlinesQuery.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: { articles: dummyArticles }
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByTestId('headline-main')).toBeInTheDocument()
    expect(screen.getByTestId('ads-carousel')).toBeInTheDocument()
    expect(screen.getByTestId('popular-section')).toBeInTheDocument()
  })
})
