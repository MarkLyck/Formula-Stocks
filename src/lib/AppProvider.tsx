import React from 'react'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import { ThemeProvider } from '@emotion/react'
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ComposeProviders from './ComposeProviders'
import { themeAtom } from 'src/atoms'
import 'src/lib/iconLibrary'
import { antDThemeMap } from 'src/lib/themes'

import "antd/dist/antd.css"

type AppProviderProps = {
    children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
    const [theme] = useAtom(themeAtom)

    return <ComposeProviders components={[
        [ThemeSwitcherProvider, { themeMap: antDThemeMap, defaultTheme: theme.type }],
        [ThemeProvider, { theme }]
    ]}>{children}</ComposeProviders>
}

const Wrapper = (props: any) => (
    <JotaiProvider>
        <AppProvider {...props} />
    </JotaiProvider>
)

export default Wrapper
