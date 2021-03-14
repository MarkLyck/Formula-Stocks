import React from 'react'
import GlobalStyles from 'src/lib/GlobalStyles'
import 'src/lib/iconLibrary'
// load antd less styles for theming to work.
import 'antd/dist/antd.less'

const withStyles = (storyFn: any) => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
)

export default withStyles
