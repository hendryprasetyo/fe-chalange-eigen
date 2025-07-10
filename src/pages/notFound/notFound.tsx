import { Link } from 'react-router-dom'

import notFoundIcon from '@/assets/notFound.svg'
import LazyImage from '@/components/Image/LazyImage'

const NotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center py-20">
      <LazyImage
        data-testid="image-notfound"
        height={400}
        width={400}
        alt="image-notfound"
        src={notFoundIcon}
        titleImage="Image Notfound"
      />
      <p className="my-6 p-2 text-sm text-slate-500 md:text-base">Page not found!</p>
      <Link className="cursor-pointer rounded-md bg-gray-100 p-2" to="/">
        Redirect Home
      </Link>
    </main>
  )
}
export default NotFound
