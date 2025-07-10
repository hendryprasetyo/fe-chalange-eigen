import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { store } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from '@/components/ui/Loader'

const persistor = persistStore(store)

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader variant="blank" isOpen />} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
