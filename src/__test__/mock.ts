import { JSX } from 'react'

export const articleMock = {
  source: {
    id: 'cnn',
    name: 'cnn'
  },
  author: 'jhon',
  title: 'test',
  description: 'test',
  url: '/test',
  urlToImage: 'test',
  publishedAt: '2023-12-10T10:00:00Z',
  content: 'test'
}

export const makeArticleMock = (i: number) => ({
  source: { id: null, name: 'Mock' },
  author: `Penulis ${i}`,
  title: `Judul ${i}`,
  description: `Deskripsi ${i}`,
  url: `https://example.com/${i}`,
  urlToImage: `https://example.com/img-${i}.jpg`,
  publishedAt: '2025-07-10T00:00:00Z',
  content: `Konten ${i}`
})

export const BadChild = (): JSX.Element | null => {
  throw new Error('Boom!')
}
