import '@/styles/loader.css'

type LoaderProps = {
  isOpen: boolean
  variant?: 'default' | 'blank' | 'transparent'
}

const Loader: React.FC<LoaderProps> = ({ isOpen = false }) => {
  return (
    <div
      data-testid="loader-wrapper"
      className={`${isOpen ? 'flex' : 'hidden'} bg-black/151 fixed inset-0 z-50 h-screen w-full items-center justify-center`}
    >
      <div className="loader z-55 grid w-fit rounded-lg duration-200">
        {[...Array(7)].map((_, i) => (
          <div key={i} data-testid="loader-square" className="loader-square"></div>
        ))}
      </div>
    </div>
  )
}

export default Loader
