import React from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../src/lib/theme'

console.log('theme', theme)

const withTheme = (storyFn: any) => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>

export default withTheme
