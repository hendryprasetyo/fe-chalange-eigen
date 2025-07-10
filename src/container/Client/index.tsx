import { RootState } from '@/lib/redux/store'
import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type ClientProps = {
  children: ReactNode
}

const Client: FC<ClientProps> = ({ children }) => {
  const navigate = useNavigate()
  const { isLogin } = useSelector((state: RootState) => state.root.client)
  useEffect(() => {
    const handleNavigation = () => {
      if (!isLogin) navigate('/login')
    }

    handleNavigation()
  }, [isLogin, navigate])

  return children
}

export default Client
