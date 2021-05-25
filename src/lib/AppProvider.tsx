import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from '@emotion/react'
import ComposeProviders from './ComposeProviders'
import { BreakpointProvider } from '@w11r/use-breakpoint'

import 'antd/dist/antd.less'
import 'src/lib/iconLibrary'

import theme from 'src/lib/theme'
import GlobalStyles from './GlobalStyles'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <ComposeProviders components={[[ThemeProvider, { theme }], BreakpointProvider]}>{children}</ComposeProviders>
}

const Wrapper = (props: any) => (
  <JotaiProvider>
    <GlobalStyles />
    <AppProvider {...props} />
  </JotaiProvider>
)

export default Wrapper
