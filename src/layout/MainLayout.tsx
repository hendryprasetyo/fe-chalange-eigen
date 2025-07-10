import Navbar from '@/components/Navbar'
import { FC, ReactNode } from 'react'

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen w-full flex-col px-1 text-gray-700 antialiased">
      <div className="mx-auto flex w-full flex-grow flex-col lg:max-w-screen-lg xl:max-w-screen-xl xl:px-[2rem]">
        <Navbar />
        <main>{children}</main>
      </div>
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-600">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            © {currentYear} <strong>Boiler Plate</strong>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
