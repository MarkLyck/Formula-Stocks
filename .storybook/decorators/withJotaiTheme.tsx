import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { Provider, useAtom, themeAtom } from '../../src/atoms'
// import { antDThemeMap } from '../../src/lib/themes'

const ThemeContainer = ({ children }) => {
  const [theme] = useAtom(themeAtom)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const withJotaiTheme = (storyFn: any) => {
  return (
    <Provider>
      <ThemeContainer>{storyFn()}</ThemeContainer>
    </Provider>
  )
}

export default withJotaiTheme
