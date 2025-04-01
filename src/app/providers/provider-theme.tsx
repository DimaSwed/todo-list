import { FC, ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { lightTheme } from '@/app/styles/theme'

interface IProviderThemeProps {
  children: ReactNode
}

export const ThemeWrapper: FC<IProviderThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
