import React from 'react'
import { ThemeProvider } from '@emotion/react'
import ComposeProviders from './ComposeProviders'
import { BreakpointProvider } from '@w11r/use-breakpoint'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'antd/dist/antd.less'
import 'src/lib/iconLibrary'
import 'src/lib/dayjs'

import theme from 'src/lib/theme'
import GlobalStyles from './GlobalStyles'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <ComposeProviders components={[[ThemeProvider, { theme }], BreakpointProvider]}>{children}</ComposeProviders>
}

const Wrapper = (props: any) => (
  <>
    <GlobalStyles />
    <AppProvider {...props} />
  </>
)

export default Wrapper
