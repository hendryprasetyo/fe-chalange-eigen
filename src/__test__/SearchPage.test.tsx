import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import SearchPage from '@/pages/search/search'
import * as appApi from '@/service/baseQuery/appApi'
import { makeArticleMock } from './mock'
import { TResponseArticles } from '@/types/type'

vi.mock('@/service/baseQuery/appApi', () => ({
  useGetEverithingQuery: vi.fn(),
  useGetTopHeadlinesQuery: vi.fn()
}))

/* Resolve lazy components instantly in tests ----------------------- */
vi.mock('@/components/ui/CardSearch', () => ({
  default: ({ data }: { data: TResponseArticles }) => (
    <div data-testid="card-search">{data.title}</div>
  )
}))
vi.mock('@/components/ui/CardArticle', () => ({
  default: ({ data }: { data: TResponseArticles }) => (
    <div data-testid="card-article">{data.title}</div>
  )
}))

/* -------------------- helpers & aliases --------------------------- */
const mockedUseGetEverything = appApi.useGetEverithingQuery as ReturnType<typeof vi.fn>
const mockedUseGetTopHeadlines = appApi.useGetTopHeadlinesQuery as ReturnType<typeof vi.fn>

const makeMany = (n: number) => Array.from({ length: n }, (_, i) => makeArticleMock(i + 1))

const dummySearchArticles = makeMany(20)
const dummyHeadlineArticles = makeMany(5)

const renderPage = (initial = '/search?q=lorem') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initial]}>
        <SearchPage />
      </MemoryRouter>
    </HelmetProvider>
  )

/* ------------------------------------------------------------------ */
describe('SearchPage', () => {
  afterEach(() => vi.clearAllMocks())

  /* 1. Loading state --------------------------------------------- */
  it('shows skeletons while loading', () => {
    mockedUseGetEverything.mockReturnValue({
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      data: undefined
    })
    mockedUseGetTopHeadlines.mockReturnValue({
      isLoading: true,
      data: undefined
    })

    renderPage()

    const skeletons = screen.getAllByTestId('card-search-skeleton')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  /* 2. Empty state ----------------------------------------------- */
  it('displays an empty‑results message when no articles are found', () => {
    mockedUseGetEverything.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      data: { articles: [], totalResults: 0 }
    })
    mockedUseGetTopHeadlines.mockReturnValue({
      isLoading: true,
      data: undefined
    })

    renderPage()

    expect(
      screen.getByText(/Tidak ditemukan hasil dari "lorem"/i) // original Indonesian text in UI
    ).toBeInTheDocument()
  })

  /* 3. Success state --------------------------------------------- */
  it('renders search results and recommendations on success', async () => {
    mockedUseGetEverything.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      data: { articles: dummySearchArticles, totalResults: 1000 }
    })
    mockedUseGetTopHeadlines.mockReturnValue({
      isLoading: false,
      data: { articles: dummyHeadlineArticles }
    })

    renderPage()

    /* Search result cards */
    const searchCards = await screen.findAllByTestId('card-search')
    expect(searchCards.length).toBe(dummySearchArticles.length)

    /* Recommendation section */
    expect(screen.getByRole('heading', { name: /kamu mungkin penasaran/i })).toBeInTheDocument()

    const recCards = await screen.findAllByTestId('card-article')
    expect(recCards.length).toBe(dummyHeadlineArticles.length)
  })
})
