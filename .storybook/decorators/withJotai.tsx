import React from 'react'
import { Provider as JotaiProvider } from 'jotai'

const withJotai = (storyFn: any) => <JotaiProvider>{storyFn()}</JotaiProvider>

export default withJotai
