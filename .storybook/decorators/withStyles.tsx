import React from 'react'
import GlobalStyles from '~/lib/GlobalStyles'
import '~/lib/iconLibrary'
// load antd less styles for theming to work.
import 'antd/dist/antd.less'

const withStyles = (storyFn: any) => (
    <>
        <GlobalStyles />
        {storyFn()}
    </>
)

export default withStyles
