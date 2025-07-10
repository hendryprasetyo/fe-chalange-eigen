import { TAppRoute } from '@/types/type'
import { lazy } from 'react'

const MainLayout = lazy(() => import('@/layout/MainLayout'))
const HomePage = lazy(() => import('@/pages/home/home'))
const SearchPage = lazy(() => import('@/pages/search/search'))
const NotFound = lazy(() => import('@/pages/notFound/notFound'))

const routes: TAppRoute[] = [
  {
    path: '/',
    name: 'HomePage',
    isProtected: true,
    component: HomePage,
    layout: MainLayout
  },
  {
    path: '/search',
    name: 'HomePage',
    isProtected: true,
    component: SearchPage,
    layout: MainLayout
  },
  {
    path: '*',
    name: 'Notfound',
    isProtected: false,
    component: NotFound,
    layout: MainLayout
  }
]

export default routes
