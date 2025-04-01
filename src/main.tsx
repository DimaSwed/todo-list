import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from '@/app/providers/provider-store'
import { ThemeWrapper } from '@/app/providers/provider-theme'
import App from '@/app/App'
import '@/app/styles/reset.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </StoreProvider>
  </StrictMode>
)
