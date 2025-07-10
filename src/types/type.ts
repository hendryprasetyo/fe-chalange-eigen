import type { ReactNode, LazyExoticComponent, JSX } from 'react'

export type TAppRoute = {
  path: string
  name: string
  isProtected: boolean
  component: LazyExoticComponent<() => JSX.Element | null>
  layout?: LazyExoticComponent<React.ComponentType<{ children: ReactNode }>>
  subRoutes?: TAppRoute[]
}

export type TResponseApiSuccess<T> = {
  status: string
  totalResults: number
  articles: T
}
export type TLocale = 'id' | 'en'

export type TResponseArticles = {
  source: {
    id: string | null
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}