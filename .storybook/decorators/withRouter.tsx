import { RouterContext } from 'next/dist/next-server/lib/router-context'
import React from 'react'

// temp fix for: https://github.com/storybookjs/storybook/issues/12114
const withRouter = (storyFn: any) => (
  <RouterContext.Provider
    value={{
      // @ts-ignore
      push: () => Promise.resolve(),
      // @ts-ignore
      replace: () => Promise.resolve(),
      prefetch: () => Promise.resolve(),
    }}
  >
    {storyFn()}
  </RouterContext.Provider>
)

export default withRouter
