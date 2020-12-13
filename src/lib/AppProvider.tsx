import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import 'antd/dist/antd.less'

const AppProvider = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

export default AppProvider