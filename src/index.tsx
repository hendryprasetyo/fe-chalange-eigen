import '@/styles/index.css'
import '@/lib/dynamicImportErrorListener.ts'

import App from '@/container/App/index.tsx'
import ErrorBoundary from '@/components/errorBoundary/errorBoundary'

import { Toaster } from 'sonner'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Providers } from '@/StoreProvider.tsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <HelmetProvider>
          <BrowserRouter>
            <Toaster richColors position="top-center" />
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </Providers>
    </ErrorBoundary>
  </StrictMode>
)
