import { ThemeProvider } from '@emotion/react'
import theme from './theme'

const AppProvider = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

export default AppProvider