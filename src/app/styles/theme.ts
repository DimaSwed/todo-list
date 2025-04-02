import { createTheme, ThemeOptions } from '@mui/material/styles'

const commonSettings: ThemeOptions = {
  breakpoints: { values: { xs: 320, sm: 480, md: 768, lg: 1280, xl: 1440 } }
}

const lightTheme = createTheme({
  ...commonSettings,
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    allVariants: {
      color: 'text.primary'
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '18px'
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '14px'
    },
    button: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px'
    },
    subtitle1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '20px'
    }
  },

  palette: {
    mode: 'light',
    primary: {
      dark: '#949494',
      main: '#888',
      light: '#fff'
    },
    secondary: {
      main: '#10466d'
    },
    background: {
      default: '#e4e9ec',
      paper: '#cfd7de'
    },
    text: {
      primary: '#1c1c1c',
      secondary: '#2a6ca0'
    },
    success: {
      main: '#f2f2f2'
    },
    error: {
      main: '#FF0004'
    },
    divider: '#515151'
  }
})

export { lightTheme }
