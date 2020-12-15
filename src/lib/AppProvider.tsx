import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import GlobalStyles from './GlobalStyles'
import 'antd/dist/antd.less'

const AppProvider = ({ children }: any) => (
    <ThemeProvider theme={theme}>
        <>
            <GlobalStyles />
            {children}
        </>
    </ThemeProvider>
)

export default AppProvider