import { JSX, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Client from '@/container/Client'
import routes from '@/routes'
import { TAppRoute } from '@/types/type'
import Loader from '@/components/ui/Loader'

const ClientRoutes = () => {
  const getRoutes = (): { path: string; element: JSX.Element }[] => {
    const routeList: { path: string; element: JSX.Element }[] = []

    const renderElement = (route: TAppRoute): JSX.Element => {
      const { layout: Layout, component: Component, isProtected } = route

      let element = <Component />

      if (Layout) {
        element = <Layout>{element}</Layout>
      }

      return isProtected ? <Client>{element}</Client> : element
    }

    routes.forEach(route => {
      if (route.subRoutes && route.subRoutes.length > 0) {
        route.subRoutes.forEach(subRoute => {
          const fullPath = `${route.path}${subRoute.path}`
          const element = renderElement(subRoute)
          routeList.push({ path: fullPath, element })
        })
      } else {
        const element = renderElement(route)
        routeList.push({ path: route.path, element })
      }
    })

    return routeList
  }

  const routeList = getRoutes()

  return (
    <Suspense fallback={<Loader variant="blank" isOpen />}>
      <Routes>
        {routeList.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  )
}

export default ClientRoutes
