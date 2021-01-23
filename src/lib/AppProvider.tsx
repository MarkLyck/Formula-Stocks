import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from '@emotion/react'
import ComposeProviders from './ComposeProviders'
import FlagProvider from './FlagProvider'
import 'src/lib/iconLibrary'
import theme from 'src/lib/theme'
import 'antd/dist/antd.less'

type AppProviderProps = {
    children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <ComposeProviders components={[
            [ThemeProvider, { theme }],
            FlagProvider,
        ]}>
            {children}
        </ComposeProviders>
    )
}

const Wrapper = (props: any) => (
    <JotaiProvider>
        <AppProvider {...props} />
    </JotaiProvider>
)

export default Wrapper
