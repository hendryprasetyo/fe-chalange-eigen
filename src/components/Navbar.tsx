import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LazyImage from './Image/LazyImage'
import { Input } from 'antd'
import { useEffect, useState } from 'react'

const { Search } = Input

const Navbar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchValue(q)
  }, [searchParams])

  const onSearch = (value: string) => {
    // Navigate to /search with ?q=value
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}&page=1&limit=30`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur">
      <nav className="mx-auto flex w-full items-center justify-between px-4 py-2.5 lg:max-w-screen-lg xl:max-w-screen-xl xl:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <LazyImage
              alt="Logo"
              height={32}
              width={32}
              src="/logo.svg"
              loading="eager"
              placeholderSrc="/logo.svg"
              titleImage="Logo"
            />
            <h2 data-testid="logo-name" className="hidden text-2xl font-bold text-black sm:block">
              Hend News
            </h2>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-1 justify-end px-2 sm:justify-center">
          <div className="w-full max-w-[250px] sm:max-w-md">
            <Search
              placeholder="Search news..."
              enterButton
              value={searchValue}
              required
              onChange={e => setSearchValue(e.target.value)}
              onSearch={onSearch}
              className="w-full"
            />
          </div>
        </div>

        <div className="w-[32px] sm:w-[80px]" />
      </nav>
    </header>
  )
}

export default Navbar
