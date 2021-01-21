import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { Provider, useAtom } from 'jotai'
import { themeAtom } from '../../src/atoms'
import { antDThemeMap } from '../../src/lib/themes'
import 'src/lib/iconLibrary'

const ThemeContainer = ({ children }) => {
    const [theme] = useAtom(themeAtom)
    return (
        <ThemeSwitcherProvider themeMap={antDThemeMap} defaultTheme={theme.type}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeSwitcherProvider >
    )
}

const withJotaiTheme = (storyFn: any) => {
    return (
        <Provider>
            <ThemeContainer>{storyFn()}</ThemeContainer>
        </Provider>
    )
}

export default withJotaiTheme
